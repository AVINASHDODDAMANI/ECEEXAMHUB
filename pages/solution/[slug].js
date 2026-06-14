import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/router";
import CircuitDiagram from "../../components/CircuitDiagram";
import FormattedText, { InlineFormattedText } from "../../components/FormattedText";
import QuestionStem from "../../components/QuestionStem";
import Layout from "../../components/layout";
import { getOfficialPaper } from "../../data/official-previous-papers";
import { getPracticeSlug } from "../../data/practice-sections";
import seedQuestions from "../../data/questions";
import { fetchQuestions } from "../../lib/api-client";
import {
  buildPaperPdfMarkup,
  getQuestionStudyLinks,
  getPaperQuestions,
  getPaperTypeFromExamName,
  getSolvedPercentage,
  slugifyPaper,
} from "../../lib/paper-document";
import {
  buildBreadcrumbList,
  generateCanonical,
  generateStructuredData,
} from "../../lib/seo";

const MIN_READY_PAPER_QUESTIONS = 10;

function parsePaperSlug(slug = "") {
  const monthMatch = String(slug).match(/^(.+)-(january|february|march|april|may|june|july|august|september|october|november|december)-(\d{4})$/i);

  if (monthMatch) {
    return {
      exam: monthMatch[1].replace(/-/g, " ").toUpperCase(),
      month: monthMatch[2].replace(/^\w/, (letter) => letter.toUpperCase()),
      year: Number(monthMatch[3]),
      paperSlug: String(slug),
    };
  }

  const match = String(slug).match(/^(.+)-(\d{4})$/);

  if (!match) {
    return { exam: "", month: "", year: 0, paperSlug: String(slug) };
  }

  return {
    exam: match[1].replace(/-/g, " ").toUpperCase(),
    month: "",
    year: Number(match[2]),
    paperSlug: String(slug),
  };
}

function buildPaperSummary(questions = [], exam, year, options = {}) {
  const officialPaper = getOfficialPaper({
    exam,
    year,
    id: options.paperId,
    slug: options.paperSlug,
    month: options.month,
  });
  const paperQuestions = questions.filter(
    (question) =>
      question.year === year &&
      (question.exam || []).includes(exam) &&
      (!officialPaper?.month || !question.month || question.month === officialPaper.month)
  );
  const subjectSet = new Set(paperQuestions.map((question) => question.subject).filter(Boolean));
  const topicSet = new Set(paperQuestions.map((question) => question.topic).filter(Boolean));

  return {
    id: officialPaper?.id || `${exam}-${year}`,
    slug: officialPaper?.slug,
    exam,
    year,
    month: officialPaper?.month || options.month || "",
    paperType: getPaperTypeFromExamName(exam),
    title: officialPaper?.title,
    seoTitle: officialPaper?.seoTitle,
    seoDescription: officialPaper?.seoDescription,
    seoKeywords: officialPaper?.seoKeywords,
    role: officialPaper?.role,
    questionCount: officialPaper?.questionCount || paperQuestions.length,
    solvedCount:
      officialPaper?.solvedCount ?? paperQuestions.filter((question) => question.explanation).length,
    repeatedCount:
      officialPaper?.repeatedCount ??
      paperQuestions.filter((question) => (question.tags || []).includes("repeated")).length,
    importantCount:
      officialPaper?.importantCount ??
      paperQuestions.filter((question) => (question.tags || []).includes("important")).length,
    subjectCount: officialPaper?.subjectCount || subjectSet.size,
    topicCount: officialPaper?.topicCount || topicSet.size,
    subjects: officialPaper?.subjects || [...subjectSet],
    topics: officialPaper?.topics || [...topicSet],
    isOfficialPdf: Boolean(officialPaper),
    pdfHref: officialPaper?.pdfHref,
    sourceLabel: officialPaper?.sourceLabel,
    summary: officialPaper?.summary,
  };
}

function buildRelatedPapers(questions = [], currentPaper) {
  const paperMap = new Map();

  questions.forEach((question) => {
    (question.exam || []).forEach((examName) => {
      const key = [examName, question.year, question.month].filter(Boolean).join("-");
      const officialPaper = getOfficialPaper({
        exam: examName,
        year: question.year,
        month: question.month,
      });
      const current =
        paperMap.get(key) || {
          exam: examName,
          year: question.year,
          month: question.month || officialPaper?.month || "",
          slug: officialPaper?.slug,
          count: 0,
        };

      current.count += 1;
      paperMap.set(key, current);
    });
  });

  return [...paperMap.values()]
    .filter(
      (paper) =>
        paper.exam !== currentPaper.exam ||
        paper.year !== currentPaper.year ||
        (paper.month || "") !== (currentPaper.month || "")
    )
    .sort(
      (left, right) =>
        right.year - left.year ||
        left.exam.localeCompare(right.exam) ||
        String(left.month || "").localeCompare(String(right.month || ""))
    )
    .slice(0, 6);
}

function getPaperDisplayTitle(paper) {
  return paper.title || `${paper.exam} ${paper.year} ECE Previous Paper`;
}

function getPaperShortTitle(paper) {
  return [paper.exam, paper.month, paper.year].filter(Boolean).join(" ");
}

function isBelPaper(paper = {}) {
  return String(paper.exam || "").toUpperCase() === "BEL";
}

function getBelPaperDateLabel(paper = {}) {
  return [paper.month, paper.year].filter(Boolean).join(" ") || String(paper.year || "").trim();
}

function getBelPaperHeading(paper = {}) {
  return `BEL Probationary Engineer (ECE) Question Paper ${getBelPaperDateLabel(paper)} with Solutions`;
}

function getBelPaperSeoTitle(paper = {}) {
  return `BEL Probationary Engineer ECE Question Paper ${getBelPaperDateLabel(paper)} with Detailed Solutions | Previous Year Papers`;
}

function getBelPaperDescription(paper = {}) {
  return `Download and solve BEL Probationary Engineer ECE Question Paper ${getBelPaperDateLabel(paper)} with detailed solutions, answer explanations, topic-wise analysis, previous year papers, exam pattern and preparation resources.`;
}

function getBelPaperBreadcrumbLabel(paper = {}) {
  return `BEL ECE ${getBelPaperDateLabel(paper)}`;
}

function getBelPaperSummary(paper = {}) {
  return `Practice the BEL Probationary Engineer ECE ${getBelPaperDateLabel(paper)} paper with detailed solutions, answer explanations, topic-wise analysis and exam-pattern focused revision.`;
}

function getPaperSolutionSlug(paper) {
  return paper.slug || slugifyPaper(paper.exam, paper.year);
}

function getQuestionMetric(paper, paperQuestions = []) {
  if (paper.pdfHref || paper.isOfficialPdf) {
    return paper.questionCount || paperQuestions.length || "PDF";
  }

  if (Number(paper.questionCount || paperQuestions.length || 0) >= MIN_READY_PAPER_QUESTIONS) {
    return paper.questionCount || paperQuestions.length;
  }

  return paper.pdfHref ? "PDF" : "Coming Soon";
}

function getSolvedMetric(paper) {
  if (
    !paper.pdfHref &&
    !paper.isOfficialPdf &&
    Number(paper.questionCount || 0) < MIN_READY_PAPER_QUESTIONS
  ) {
    return "Coming Soon";
  }

  if (paper.isOfficialPdf && !paper.solvedCount) {
    return "Official";
  }

  return `${getSolvedPercentage(paper.solvedCount, paper.questionCount)}%`;
}

function hasPaperContent(paper, paperQuestions = []) {
  return Boolean(
    paper?.pdfHref ||
      paper?.isOfficialPdf ||
      Number(paper?.questionCount || paperQuestions.length || 0) >= MIN_READY_PAPER_QUESTIONS
  );
}

function getPreviewQuestionNumber(questions = [], index = 0) {
  const currentSection = questions[index]?.subject || "ECE";

  return questions
    .slice(0, index + 1)
    .filter((question) => (question.subject || "ECE") === currentSection).length;
}

function StudyLinks({ question }) {
  const studyLinks = getQuestionStudyLinks(question);

  if (!studyLinks.length) {
    return null;
  }

  return (
    <div className="mt-3 rounded-xl border border-blue-100 bg-blue-50 px-4 py-3">
      <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-blue-700">
        Study this concept
      </p>
      <div className="mt-2 flex flex-wrap gap-2">
        {studyLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="inline-flex min-h-9 items-center rounded-lg border border-blue-200 bg-white px-3 py-2 text-xs font-extrabold text-blue-700 transition hover:border-blue-300 hover:bg-blue-100"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

function buildQuestionSectionTabs(questions = [], exam = "") {
  const examName = String(exam).toUpperCase();
  const gateTabs = [
    {
      key: "general-aptitude",
      label: "General Aptitude",
      match: (question) => question.subject === "General Aptitude",
    },
    {
      key: "engineering-mathematics",
      label: "Engineering Mathematics",
      match: (question) => question.subject === "Engineering Mathematics",
    },
    {
      key: "ece-subjects",
      label: "ECE Notes",
      match: (question) =>
        question.subject !== "General Aptitude" &&
        question.subject !== "Engineering Mathematics",
    },
  ];
  const belTabs = [
    {
      key: "general-aptitude",
      label: "General Aptitude",
      match: (question) => question.subject === "General Aptitude",
    },
    {
      key: "reasoning",
      label: "Reasoning",
      match: (question) => question.subject === "Reasoning",
    },
    {
      key: "related-subject",
      label: "Related Subject",
      match: (question) =>
        question.subject !== "General Aptitude" && question.subject !== "Reasoning",
    },
  ];
  const fallbackTabs = Array.from(
    new Set(questions.map((question) => question.subject || "ECE"))
  ).map((subject) => ({
    key: subject.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
    label: subject,
    match: (question) => (question.subject || "ECE") === subject,
  }));
  const sectionTabs =
    examName === "GATE" ? gateTabs : examName === "BEL" ? belTabs : fallbackTabs;

  return sectionTabs
    .map((tab) => ({
      ...tab,
      firstIndex: questions.findIndex(tab.match),
      count: questions.filter(tab.match).length,
    }))
    .filter((tab) => tab.firstIndex >= 0);
}

function getCorrectAnswers(question = {}) {
  return Array.isArray(question.correctAnswers) && question.correctAnswers.length
    ? question.correctAnswers
    : question.correctAnswer
      ? [question.correctAnswer]
      : [];
}

function getCorrectAnswerText(question = {}) {
  const correctAnswers = getCorrectAnswers(question);

  return question.correctAnswer || correctAnswers.join(", ");
}

function sameAnswerSet(left = [], right = []) {
  return (
    left.length === right.length &&
    left.every((answer) => right.includes(answer))
  );
}

function cleanQuestionText(value = "") {
  return String(value || "")
    .replace(/\s+/g, " ")
    .trim();
}

function getQuestionSeoExamLabel(question = {}) {
  const exam = (question.exam || []).includes("GATE")
    ? "GATE"
    : (question.exam || [])[0] || "ECE";
  const year = question.year ? ` ${question.year}` : "";
  const branch = exam === "GATE" ? " ECE" : "";

  return `${exam}${year}${branch}`.trim();
}

function getQuestionSeoTitle(question = {}) {
  const questionNumber = question.questionId ? ` Question ${question.questionId}` : " Question";
  const subject = question.subject || "Electronics";

  return `${getQuestionSeoExamLabel(question)} ${subject}${questionNumber}`;
}

function getQuestionDifficulty(question = {}) {
  if (question.difficulty) {
    return question.difficulty;
  }

  if (Number(question.marks || 0) >= 2) {
    return "Medium";
  }

  return "Easy";
}

function getQuestionConcept(question = {}) {
  return question.concept || question.topic || question.subject || "ECE concept";
}

function buildQuestionStructuredData(questions = [], canonicalPath = "") {
  const itemList = questions.slice(0, 65).map((question, index) => {
    const title = getQuestionSeoTitle(question);
    const topic = question.topic || "Previous year question";
    const concept = getQuestionConcept(question);
    const difficulty = getQuestionDifficulty(question);
    const answerText = cleanQuestionText(
      [
        question.correctAnswer ? `Correct answer: ${question.correctAnswer}.` : "",
        question.explanation,
      ].filter(Boolean).join(" ")
    );

    return {
      "@type": "ListItem",
      position: index + 1,
      url: `${generateCanonical(canonicalPath)}#question-${question.questionId || index + 1}`,
      item: {
        "@type": "Question",
        name: title,
        text: cleanQuestionText(question.question || title),
        educationalLevel: "GATE ECE",
        about: [question.subject, topic, concept].filter(Boolean),
        keywords: [
          title,
          `${getQuestionSeoExamLabel(question)} ${topic}`,
          `${getQuestionSeoExamLabel(question)} ${concept}`,
          "GATE ECE solved questions",
          "GATE ECE PYQ",
          "GATE ECE numerical solutions",
        ].join(", "),
        educationalAlignment: {
          "@type": "AlignmentObject",
          alignmentType: "educationalSubject",
          targetName: `${topic} | ${concept} | Difficulty: ${difficulty}`,
        },
        acceptedAnswer: answerText
          ? {
              "@type": "Answer",
              text: answerText,
            }
          : undefined,
      },
    };
  });

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Question-level GATE ECE PYQ solutions",
    itemListElement: itemList,
  };
}

function OfficialQuestionPreview({ questions = [], exam = "" }) {
  const questionStripRef = useRef(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [revealedAnswers, setRevealedAnswers] = useState({});
  const [selectedAnswers, setSelectedAnswers] = useState({});

  if (!questions.length) {
    return null;
  }

  const currentQuestion = questions[currentQuestionIndex] || questions[0];
  const section = currentQuestion.subject || "ECE";
  const questionKey = currentQuestion._id || currentQuestionIndex;
  const selectedAnswer = selectedAnswers[questionKey];
  const correctAnswers = getCorrectAnswers(currentQuestion);
  const isMultiAnswer = correctAnswers.length > 1 || currentQuestion.questionType === "MSQ";
  const maxSelectableAnswers =
    isMultiAnswer && correctAnswers.length > 1
      ? correctAnswers.length
      : currentQuestion.options?.length || 0;
  const selectedAnswerList = Array.isArray(selectedAnswer)
    ? selectedAnswer
    : selectedAnswer
      ? [selectedAnswer]
      : [];
  const selectedAnswerText = selectedAnswerList.join(", ");
  const isAnswerRevealed = revealedAnswers[questionKey];
  const hasSelectedAnswer = selectedAnswerList.length > 0;
  const hasAnswerKey = correctAnswers.length > 0;
  const correctAnswerText = getCorrectAnswerText(currentQuestion);
  const shouldGradeSelection = Boolean(isAnswerRevealed) || (!isMultiAnswer && hasSelectedAnswer);
  const selectedAnswerIsCorrect = isMultiAnswer
    ? sameAnswerSet(selectedAnswerList, correctAnswers)
    : selectedAnswer === correctAnswers[0];
  const sectionQuestionNumber = getPreviewQuestionNumber(questions, currentQuestionIndex);
  const displayQuestionNumber = currentQuestion.questionId || sectionQuestionNumber;
  const canGoPrevious = currentQuestionIndex > 0;
  const canGoNext = currentQuestionIndex < questions.length - 1;
  const sectionTabs = buildQuestionSectionTabs(questions, exam);
  const activeSectionTab =
    sectionTabs.find((tab) => tab.match(currentQuestion))?.key || sectionTabs[0]?.key;
  const currentSeoTitle = getQuestionSeoTitle(currentQuestion);
  const currentConcept = getQuestionConcept(currentQuestion);
  const currentDifficulty = getQuestionDifficulty(currentQuestion);
  const isBlankQuestion =
    !String(currentQuestion.question || "").trim() &&
    !String(currentQuestion.diagram || "").trim() &&
    !(currentQuestion.options || []).length &&
    !(currentQuestion.optionDiagrams || []).length &&
    !getCorrectAnswers(currentQuestion).length &&
    !String(currentQuestion.explanation || "").trim();

  function toggleAnswer(questionKey) {
    setRevealedAnswers((current) => ({
      ...current,
      [questionKey]: !current[questionKey],
    }));
  }

  function selectAnswer(questionKey, option) {
    setSelectedAnswers((current) => ({
      ...current,
      [questionKey]: isMultiAnswer
        ? (() => {
            const currentAnswers = Array.isArray(current[questionKey])
              ? current[questionKey]
              : [];

            if (currentAnswers.includes(option)) {
              return currentAnswers.filter((item) => item !== option);
            }

            if (currentAnswers.length >= maxSelectableAnswers) {
              return currentAnswers;
            }

            return [...currentAnswers, option];
          })()
        : option,
    }));
  }

  function jumpToQuestion(index) {
    setCurrentQuestionIndex(index);
  }

  function scrollQuestionStrip(direction) {
    const scrollContainer = questionStripRef.current;

    if (!scrollContainer) {
      return;
    }

    scrollContainer.scrollBy({
      left: direction * Math.max(240, Math.floor(scrollContainer.clientWidth * 0.75)),
      behavior: "smooth",
    });
  }

  return (
    <section className="mt-4 w-full min-w-0 max-w-full overflow-hidden sm:rounded-xl sm:border sm:border-slate-200 sm:bg-slate-50 sm:p-5">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-portal-700">
            Single Paper View
          </p>
          <h3 className="mt-1 text-lg font-extrabold text-slate-950">
            Interactive solved questions
          </h3>
        </div>
        <span className="text-sm font-bold text-slate-500">
          Question {currentQuestionIndex + 1} of {questions.length}
        </span>
      </div>

      <div className="mt-4 flex w-full min-w-0 max-w-full snap-x gap-2 overflow-x-auto pb-2 [-webkit-overflow-scrolling:touch] [overscroll-behavior-inline:contain] [scrollbar-width:thin] [touch-action:pan-x] [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-slate-300 [&::-webkit-scrollbar-track]:bg-slate-100 sm:flex-wrap sm:overflow-visible sm:pb-1">
        {sectionTabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => jumpToQuestion(tab.firstIndex)}
            className={`inline-flex min-h-10 shrink-0 snap-start items-center justify-center rounded-xl border px-4 py-2 text-sm font-extrabold transition ${
              activeSectionTab === tab.key
                ? "border-portal-700 bg-portal-700 text-white"
                : "border-slate-200 bg-white text-slate-700 hover:border-portal-300 hover:text-portal-700"
            }`}
          >
            {tab.label}
            <span
              className={`ml-2 rounded-lg px-2 py-0.5 text-xs ${
                activeSectionTab === tab.key
                  ? "bg-white/15 text-white"
                  : "bg-slate-100 text-slate-500"
              }`}
            >
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      <div className="mt-4 flex w-full min-w-0 max-w-full items-center gap-2">
        <button
          type="button"
          onClick={() => scrollQuestionStrip(-1)}
          aria-label="Scroll question numbers left"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-lg font-extrabold text-slate-700 transition hover:border-portal-300 hover:text-portal-700"
        >
          &lt;
        </button>
        <div
          ref={questionStripRef}
          className="min-w-0 flex-1 snap-x overflow-x-auto pb-2 [-webkit-overflow-scrolling:touch] [overscroll-behavior-inline:contain] [scrollbar-width:thin] [touch-action:pan-x] [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-slate-300 [&::-webkit-scrollbar-track]:bg-slate-100"
        >
          <div className="flex min-w-max items-center gap-2 pr-1">
            {questions.map((question, index) => {
              const isActive = index === currentQuestionIndex;
              const hasAnswer = Boolean(selectedAnswers[question._id || index]);

              return (
                <button
                  key={question._id || `${question.question}-${index}`}
                  type="button"
                  onClick={() => jumpToQuestion(index)}
                  aria-label={`Open question ${index + 1}`}
                  aria-current={isActive ? "true" : undefined}
                  className={`flex h-10 w-10 shrink-0 snap-start items-center justify-center rounded-lg border text-sm font-extrabold transition ${
                    isActive
                      ? "border-portal-700 bg-portal-700 text-white shadow-sm"
                      : hasAnswer
                        ? "border-emerald-200 bg-emerald-50 text-emerald-700 hover:border-emerald-300"
                        : "border-slate-200 bg-white text-slate-700 hover:border-portal-300 hover:text-portal-700"
                  }`}
                >
                  {index + 1}
                </button>
              );
            })}
          </div>
        </div>
        <button
          type="button"
          onClick={() => scrollQuestionStrip(1)}
          aria-label="Scroll question numbers right"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-lg font-extrabold text-slate-700 transition hover:border-portal-300 hover:text-portal-700"
        >
          &gt;
        </button>
      </div>

      <div className="mt-4 grid gap-3 sm:mt-5">
        <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-slate-500">
          Section : {section}
        </p>
        {isBlankQuestion ? (
          <article
            className="min-h-[220px] w-full min-w-0 max-w-full overflow-hidden rounded-xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4"
            aria-label={`Question ${displayQuestionNumber} intentionally blank`}
          />
        ) : (
        <article
          id={`question-${displayQuestionNumber}`}
          className="w-full min-w-0 max-w-full overflow-hidden rounded-xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4"
        >
          <div className="flex min-w-0 flex-wrap items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.12em] text-slate-500">
            <span>Q.{displayQuestionNumber}</span>
            <span className="text-slate-300">|</span>
            <span className="min-w-0 break-words">{currentQuestion.topic || "Previous Paper"}</span>
          </div>

          <h4 className="mt-2 text-lg font-black leading-7 text-slate-950">
            {currentSeoTitle}
          </h4>

          <dl className="mt-3 grid gap-2 rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Topic", currentQuestion.topic || "Previous year question"],
              ["Concept", currentConcept],
              ["Difficulty", currentDifficulty],
              ["Solution", currentQuestion.explanation ? "Step-by-step explanation" : "Answer key pending"],
            ].map(([label, value]) => (
              <div key={label}>
                <dt className="font-extrabold uppercase tracking-[0.12em] text-slate-500">{label}</dt>
                <dd className="mt-1 font-semibold text-slate-800">{value}</dd>
              </div>
            ))}
          </dl>

          <QuestionStem
            question={currentQuestion}
            className="mt-3 max-w-full break-words text-base font-bold leading-7 text-slate-950 [overflow-wrap:anywhere]"
          />

          <div className="mt-3 max-w-[640px]">
            <CircuitDiagram question={currentQuestion} />
          </div>

          {currentQuestion.diagram?.includes(".pdf") ? (
            <a
              href={currentQuestion.diagram}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex min-h-10 items-center rounded-xl border border-portal-200 bg-portal-50 px-4 py-2 text-sm font-extrabold text-portal-700 transition hover:border-portal-300 hover:bg-white"
            >
              Open PDF figure
            </a>
          ) : null}

          <p className="mt-3 text-sm font-semibold text-slate-600">
            {isMultiAnswer
              ? `Multiple correct options may apply. Select exactly ${maxSelectableAnswers} options, then reveal the answer.`
              : "Select one option, then reveal the answer."}
          </p>

          <div className={currentQuestion.optionDiagrams ? "mt-4 grid grid-cols-2 gap-3" : "mt-4 grid gap-2"}>
            {(currentQuestion.options || []).map((option, optionIndex) => {
                const optionDiagram = currentQuestion.optionDiagrams?.[optionIndex];
                const isSelected = selectedAnswerList.includes(option);
                const isCorrectOption = correctAnswers.includes(option);
                const isSelectionLimitReached =
                  isMultiAnswer &&
                  !isSelected &&
                  selectedAnswerList.length >= maxSelectableAnswers;
                const showCorrectOption = hasAnswerKey && shouldGradeSelection && isCorrectOption;
                const showWrongOption =
                  hasAnswerKey && shouldGradeSelection && isSelected && !isCorrectOption;

                return (
                  <button
                    type="button"
                    key={`${option}-${optionIndex}`}
                    onClick={() => selectAnswer(questionKey, option)}
                    aria-pressed={isSelected}
                    className={`rounded-xl border px-3 py-2 text-left text-sm transition ${
                      showCorrectOption
                        ? "border-emerald-300 bg-emerald-50 text-emerald-800"
                        : showWrongOption
                          ? "border-rose-300 bg-rose-50 text-rose-800"
                          : isSelected
                        ? "border-portal-300 bg-portal-50 text-portal-800"
                        : "border-slate-200 bg-slate-50 text-slate-700"
                    } ${isSelectionLimitReached ? "cursor-not-allowed opacity-60" : ""}`}
                  >
                    <div className="flex min-w-0 items-start gap-3">
                      {isMultiAnswer ? (
                        <span
                          aria-hidden="true"
                          className={`mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded border text-[11px] font-extrabold ${
                            isSelected
                              ? "border-portal-700 bg-portal-700 text-white"
                              : "border-slate-300 bg-white text-transparent"
                          }`}
                        >
                          ✓
                        </span>
                      ) : null}
                      <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white text-xs font-extrabold text-slate-500">
                        {showCorrectOption ? "OK" : showWrongOption ? "X" : String.fromCharCode(65 + optionIndex)}
                      </span>
                      {optionDiagram ? (
                        <span className="flex min-w-0 flex-1 items-center justify-center">
                          <CircuitDiagram question={{ ...currentQuestion, diagram: optionDiagram }} />
                        </span>
                      ) : (
                        <span className="min-w-0 flex-1 break-words [overflow-wrap:anywhere]">
                          <InlineFormattedText text={option} />
                        </span>
                      )}
                      {showCorrectOption ? (
                        <span className="text-xs font-extrabold uppercase tracking-[0.12em] text-emerald-700">
                          Correct
                        </span>
                      ) : showWrongOption ? (
                        <span className="text-xs font-extrabold uppercase tracking-[0.12em] text-rose-700">
                          Wrong
                        </span>
                      ) : isMultiAnswer && isSelected ? (
                        <span className="text-xs font-extrabold uppercase tracking-[0.12em] text-portal-700">
                          Selected
                        </span>
                      ) : null}
                    </div>
                  </button>
                );
            })}
          </div>

          <div className="mt-4 flex min-w-0 flex-wrap items-center gap-3 overflow-hidden">
            {hasAnswerKey ? (
              <button
                type="button"
                onClick={() => toggleAnswer(questionKey)}
                className="inline-flex min-h-10 items-center justify-center rounded-xl border border-portal-300 bg-white px-4 py-2 text-sm font-extrabold text-portal-700 transition hover:bg-portal-50"
              >
                {isAnswerRevealed ? "Hide answer" : "Show answer"}
              </button>
            ) : null}
            {!hasAnswerKey ? (
              <p className="text-sm font-semibold text-amber-700">
                Answer key pending for this uploaded paper question.
              </p>
            ) : isAnswerRevealed ? (
              <p className="text-sm font-semibold text-emerald-700">
                Answer: <InlineFormattedText text={correctAnswerText} />
              </p>
            ) : hasSelectedAnswer ? (
              <p
                className={`text-sm font-semibold ${
                  isMultiAnswer
                    ? "text-portal-700"
                    : selectedAnswerIsCorrect
                      ? "text-emerald-700"
                      : "text-rose-700"
                }`}
              >
                {isMultiAnswer
                  ? `Selected: ${selectedAnswerText}. Reveal the answer to check the complete set.`
                  : selectedAnswerIsCorrect
                  ? "Correct answer selected."
                  : `Selected: ${selectedAnswerText}. Correct option is highlighted.`}
              </p>
            ) : (
              <p className="min-w-0 break-words text-sm text-slate-500">
                {isMultiAnswer
                  ? `Select exactly ${maxSelectableAnswers} options, then reveal the answer.`
                  : "Select an option, then reveal the answer."}
              </p>
            )}
          </div>

          {isAnswerRevealed && currentQuestion.explanation ? (
            <div className="mt-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm leading-6 text-emerald-900">
              <p className="font-extrabold">Explanation:</p>
              <FormattedText text={currentQuestion.explanation} className="mt-2" />
            </div>
          ) : null}
          {isAnswerRevealed ? (
            <StudyLinks question={currentQuestion} />
          ) : null}
        </article>
        )}

        <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-2 sm:flex sm:justify-between sm:gap-3">
          <button
            type="button"
            onClick={() => setCurrentQuestionIndex((index) => Math.max(0, index - 1))}
            disabled={!canGoPrevious}
            className="inline-flex min-h-11 min-w-0 items-center justify-center rounded-xl border border-slate-200 bg-white px-2 py-2 text-xs font-extrabold text-slate-700 transition hover:border-portal-300 hover:text-portal-700 disabled:cursor-not-allowed disabled:opacity-45 sm:min-w-[124px] sm:px-4 sm:text-sm"
          >
            Previous Que
          </button>
          <span className="whitespace-nowrap rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-extrabold text-slate-700 sm:px-4">
            {currentQuestionIndex + 1} / {questions.length}
          </span>
          <button
            type="button"
            onClick={() => setCurrentQuestionIndex((index) => Math.min(questions.length - 1, index + 1))}
            disabled={!canGoNext}
            className="inline-flex min-h-11 min-w-0 items-center justify-center rounded-xl border border-portal-300 bg-portal-50 px-2 py-2 text-xs font-extrabold text-portal-700 transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-45 sm:min-w-[124px] sm:px-4 sm:text-sm"
          >
            Next Que
          </button>
        </div>
      </div>
    </section>
  );
}

export async function getServerSideProps({ params }) {
  const initialSlug = typeof params?.slug === "string" ? params.slug : "";
  const slugPaper = parsePaperSlug(initialSlug);
  const paper = buildPaperSummary(seedQuestions, slugPaper.exam, slugPaper.year, {
    month: slugPaper.month,
    paperSlug: slugPaper.paperSlug,
  });
  const paperQuestions = getPaperQuestions(seedQuestions, paper, "All Types");

  if (!hasPaperContent(paper, paperQuestions)) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      initialSlug,
    },
  };
}

export default function SolutionPage({
  initialSlug = "",
  seoOverride = null,
  introContent = null,
}) {
  const router = useRouter();
  const viewerRef = useRef(null);
  const [questions, setQuestions] = useState(seedQuestions);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  const slug = typeof router.query.slug === "string" ? router.query.slug : initialSlug;
  const slugPaper = parsePaperSlug(slug);
  const exam = typeof router.query.exam === "string" ? router.query.exam : slugPaper.exam;
  const year =
    typeof router.query.year === "string" ? Number(router.query.year) : slugPaper.year;
  const search = typeof router.query.search === "string" ? router.query.search : "";
  const subject = typeof router.query.subject === "string" ? router.query.subject : "All Subjects";
  const topic = typeof router.query.topic === "string" ? router.query.topic : "All Topics";
  const paperType = typeof router.query.paperType === "string" ? router.query.paperType : "All Types";

  useEffect(() => {
    if (!router.isReady || !exam || !year) {
      return undefined;
    }

    let mounted = true;
    const controller = new AbortController();

    async function loadQuestions() {
      setLoading(true);
      setLoadError("");

      try {
        const data = await fetchQuestions(
          {
            search,
            exam,
            year: String(year),
            subject,
            topic,
          },
          { signal: controller.signal }
        );

        if (mounted) {
          setQuestions(data.length ? data : seedQuestions);
        }
      } catch (error) {
        if (mounted && error.name !== "AbortError") {
          setQuestions(seedQuestions);
          setLoadError("Using offline question data because the live paper source is unavailable.");
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadQuestions();

    return () => {
      mounted = false;
      controller.abort();
    };
  }, [exam, router.isReady, search, subject, topic, year]);

  useEffect(() => {
    if (typeof window !== "undefined") {
    }
  }, []);

  const paperId = typeof router.query.paperId === "string" ? router.query.paperId : "";
  const paperMonth = typeof router.query.month === "string" ? router.query.month : slugPaper.month;
  const paper = useMemo(
    () =>
      buildPaperSummary(questions, exam || "ECE", year || new Date().getFullYear(), {
        month: paperMonth,
        paperId,
        paperSlug: slugPaper.paperSlug,
      }),
    [exam, paperId, paperMonth, slugPaper.paperSlug, questions, year]
  );
  const paperQuestions = useMemo(
    () => getPaperQuestions(questions, paper, paperType),
    [paper, paperType, questions]
  );
  const paperHasContent = hasPaperContent(paper, paperQuestions);
  const viewerMarkup = useMemo(
    () => buildPaperPdfMarkup(paper, paperQuestions),
    [paper, paperQuestions]
  );
  const relatedPapers = useMemo(
    () => buildRelatedPapers(questions, paper),
    [paper, questions]
  );
  const practiceSlug = getPracticeSlug(paper.exam);
  const practiceHref = practiceSlug ? `/practice/${practiceSlug}` : "/practice";
  const canonicalPath = `/solution/${getPaperSolutionSlug(paper)}`;
  const defaultPaperTitle = getPaperDisplayTitle(paper);
  const belPaper = isBelPaper(paper);
  const belPaperHeading = belPaper ? getBelPaperHeading(paper) : "";
  const belPaperDescription = belPaper ? getBelPaperDescription(paper) : "";
  const belPaperSummary = belPaper ? getBelPaperSummary(paper) : "";
  const paperTitle = belPaperHeading || seoOverride?.heading || defaultPaperTitle;
  const paperDescription =
    belPaperDescription ||
    seoOverride?.description ||
    paper.seoDescription ||
    `View ${defaultPaperTitle} with ECE previous year questions, solutions, paper preview, download support, and related study resources.`;
  const pageTitle =
    paper.seoTitle ||
    (belPaper
      ? getBelPaperSeoTitle(paper)
      : seoOverride?.title
        ? `${seoOverride.title} | ECE Exam Guide`
        : `${paperTitle} | ECE Exam Guide`);
  const structuredData = [
    ...generateStructuredData({
      type: "topic",
      title: paperTitle,
      description: paperDescription,
      path: canonicalPath,
      subjectName: "Electronics and Communication Engineering",
      chapterTitle: `${paper.exam} Previous Year Paper`,
      keywords: belPaper
        ? [
            `BEL Probationary Engineer ECE Question Paper ${getBelPaperDateLabel(paper)}`,
            `BEL ECE ${paper.year} solved paper`,
            "BEL previous year question papers",
            "BEL ECE detailed solutions",
            "BEL ECE topic-wise analysis",
            "BEL ECE exam pattern",
          ].join(", ")
        : `${paper.exam} ${paper.year} ECE previous paper, ${paper.exam} question paper, GATE ECE previous year questions, ECE solved paper`,
      about: [
        paper.exam,
        "ECE previous year questions",
        "question paper solutions",
        ...(paper.topics || []),
      ],
    }),
    buildBreadcrumbList([
      { name: "Home", item: "/" },
      { name: belPaper ? "BEL Previous Papers" : "Previous Papers", item: "/previous-year" },
      { name: belPaper ? getBelPaperBreadcrumbLabel(paper) : paperTitle, item: canonicalPath },
    ]),
    buildQuestionStructuredData(paperQuestions, canonicalPath),
  ];

  function handleDownloadPdf() {
    if (typeof window === "undefined") {
      return;
    }

    if (!paperHasContent) {
      return;
    }

    if (paperQuestions.length) {
      const pdfWindow = window.open("", "_blank");

      if (!pdfWindow) {
        window.alert("Please allow pop-ups to generate the paper PDF.");
        return;
      }

      pdfWindow.document.open();
      pdfWindow.document.write(viewerMarkup);
      pdfWindow.document.close();
      let printStarted = false;
      const printPaper = () => {
        if (printStarted || pdfWindow.closed) {
          return;
        }

        printStarted = true;
        pdfWindow.focus();
        pdfWindow.print();
      };

      pdfWindow.addEventListener("load", printPaper);
      window.setTimeout(printPaper, 500);
      return;
    }

    if (paper.pdfHref) {
      window.open(paper.pdfHref, "_blank", "noopener,noreferrer");
      return;
    }

    const frameWindow = viewerRef.current?.contentWindow;

    if (!frameWindow) {
      return;
    }

    frameWindow.focus();
    frameWindow.print();
  }

  return (
    <Layout
      title={pageTitle}
      description={paperDescription}
      canonicalUrl={generateCanonical(canonicalPath)}
      keywords={
        paper.seoKeywords ||
        (belPaper
          ? [
              `BEL Probationary Engineer ECE Question Paper ${getBelPaperDateLabel(paper)}`,
              `BEL ECE ${paper.year} question paper with solutions`,
              `BEL ECE previous year papers`,
              `BEL Probationary Engineer previous year question paper`,
              `BEL Electronics solved paper`,
              `BEL ECE answer explanations`,
              `BEL ECE exam pattern`,
            ]
          : [
              `${paper.exam} ${paper.year} ECE previous paper`,
              `${paper.exam} ${paper.year} ECE question paper`,
              `${paper.exam} ${paper.year} EC question paper`,
              `${paper.exam} ECE previous year questions`,
              `${paper.exam} ECE solved paper`,
              `${paper.exam} ${paper.year} answer key`,
              `${paper.exam} ${paper.year} paper PDF`,
              paper.exam === "GATE" ? `GATE ${paper.year} ECE question paper with solutions` : "",
              paper.exam === "GATE" ? `GATE EC ${paper.year} solved paper` : "",
            ]).filter(Boolean).join(", ")
      }
      appendSiteName={!paper.seoTitle && !belPaper}
      structuredData={structuredData}
      ogType="article"
      noIndex={!paperHasContent}
      pageClassName="py-5 sm:py-6"
    >
      <div className="mx-auto max-w-[1440px] space-y-6">
        <nav className="flex flex-wrap items-center gap-2 text-sm text-slate-500" aria-label="Breadcrumb">
          <Link href="/" className="font-semibold transition hover:text-portal-700">
            Home
          </Link>
          <span aria-hidden="true">&gt;</span>
          <Link href="/previous-year" className="font-semibold transition hover:text-portal-700">
            {belPaper ? "BEL Papers" : "Previous Papers"}
          </Link>
          <span aria-hidden="true">&gt;</span>
          <span className="font-extrabold text-slate-800">
            {belPaper ? getBelPaperBreadcrumbLabel(paper) : getPaperShortTitle(paper)}
          </span>
        </nav>

        <section className="overflow-hidden rounded-[18px] border border-slate-200 bg-white shadow-[0_14px_32px_rgba(15,23,42,0.08)]">
          <div className="grid gap-0 lg:grid-cols-[minmax(0,1fr)_220px]">
            <div className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.3),_transparent_30%),linear-gradient(135deg,_#0c4286_0%,_#0a3875_45%,_#062956_100%)] p-3 text-white sm:p-3.5 lg:p-3.5">
              <div className="absolute inset-0 opacity-25">
                <div className="absolute -left-10 top-8 h-44 w-44 rounded-full bg-sky-400 blur-3xl" />
                <div className="absolute right-0 top-0 h-full w-[42%] bg-[linear-gradient(180deg,transparent,rgba(255,255,255,0.05))]" />
              </div>
              <div className="relative z-10 max-w-2xl">
                <div className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/8 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.12em] text-sky-100 backdrop-blur-sm sm:px-3 sm:py-1.5 sm:text-[11px]">
                  <span className="inline-flex h-4 w-4 items-center justify-center rounded-md bg-white/12 sm:h-5 sm:w-5">
                    <svg viewBox="0 0 20 20" className="h-2.5 w-2.5 text-white sm:h-3 sm:w-3" aria-hidden="true">
                      <path fill="currentColor" d="M5 2.5A1.5 1.5 0 0 0 3.5 4v12A1.5 1.5 0 0 0 5 17.5h10A1.5 1.5 0 0 0 16.5 16V7.8a1.5 1.5 0 0 0-.44-1.06l-3.3-3.3A1.5 1.5 0 0 0 11.7 3H5Zm6 .9v2.85c0 .41.34.75.75.75h2.85L11 3.4ZM6.5 9.25c0-.41.34-.75.75-.75h5.5a.75.75 0 1 1 0 1.5h-5.5a.75.75 0 0 1-.75-.75Zm0 3c0-.41.34-.75.75-.75h5.5a.75.75 0 1 1 0 1.5h-5.5a.75.75 0 0 1-.75-.75Z" />
                    </svg>
                  </span>
                  {belPaper ? "BEL ECE PYQ" : "Previous Paper"}
                </div>
                <h1 className="mt-2.5 max-w-3xl text-[1.2rem] font-extrabold leading-tight tracking-tight text-white sm:text-[1.45rem] lg:text-[1.65rem]">
                  {paperTitle}
                </h1>
                <div className="mt-2 h-px w-full max-w-[180px] bg-gradient-to-r from-sky-200/40 via-sky-200/15 to-transparent sm:max-w-[220px]" />
                <p className="mt-2 max-w-lg text-[11px] leading-5 text-slate-100/90 sm:text-[12px] sm:leading-5">
                  {paperHasContent
                    ? belPaperSummary ||
                      introContent?.summary ||
                      `Go through solved ${paper.exam} questions with clear explanations and easy navigation, all in one place.`
                    : "This paper page is reserved for the archive. Questions and solutions will appear here once the content is ready."}
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {paperHasContent ? (
                    <>
                      <a
                        href="#viewer"
                        className="inline-flex min-h-8 items-center justify-center rounded-lg bg-[linear-gradient(90deg,#b02cff,#0796e8)] px-3 py-1.5 text-[11px] font-extrabold text-white shadow-[0_10px_22px_rgba(120,55,230,0.25)] transition hover:opacity-90 sm:min-h-9 sm:px-3.5 sm:py-1.5"
                      >
                        <svg className="mr-1.5 h-3.5 w-3.5" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                          <path d="M2.5 10s2.7-4.5 7.5-4.5S17.5 10 17.5 10 14.8 14.5 10 14.5 2.5 10 2.5 10Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                          <circle cx="10" cy="10" r="2" stroke="currentColor" strokeWidth="1.8" />
                        </svg>
                        Open Questions
                      </a>
                      <button
                        type="button"
                        onClick={handleDownloadPdf}
                        className="inline-flex min-h-8 items-center justify-center rounded-lg bg-[linear-gradient(90deg,#b02cff,#0796e8)] px-3 py-1.5 text-[11px] font-extrabold text-white shadow-[0_10px_22px_rgba(120,55,230,0.22)] transition hover:opacity-90 sm:min-h-9 sm:px-3.5 sm:py-1.5"
                      >
                        Download PDF
                      </button>
                    </>
                  ) : (
                    <span className="inline-flex min-h-8 items-center justify-center rounded-lg border border-white/25 bg-white/10 px-3 py-1.5 text-[11px] font-extrabold text-white sm:min-h-9 sm:px-3.5 sm:py-1.5">
                      Coming Soon
                    </span>
                  )}
                  <Link
                    href={practiceHref}
                    className="inline-flex min-h-8 items-center justify-center rounded-lg bg-[linear-gradient(90deg,#b02cff,#0796e8)] px-3 py-1.5 text-[11px] font-extrabold text-white shadow-[0_10px_22px_rgba(120,55,230,0.22)] transition hover:opacity-90 sm:min-h-9 sm:px-3.5 sm:py-1.5"
                  >
                    Practice Online
                  </Link>
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden bg-[linear-gradient(180deg,#0b3a79_0%,#0a3268_100%)] p-2.5 text-white sm:p-3 lg:p-3">
              <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_62%_28%,rgba(96,165,250,0.42),transparent_16%),linear-gradient(135deg,transparent_0%,rgba(255,255,255,0.06)_100%)]" />
              </div>
              <div className="relative z-10 flex h-full flex-col items-center justify-center gap-2.5">
                <div className="w-full rounded-[14px] border border-white/70 bg-[linear-gradient(135deg,rgba(176,44,255,0.22),rgba(7,150,232,0.20))] p-2 backdrop-blur-sm sm:p-2.5">
                  <p className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-white sm:text-[11px] sm:tracking-[0.16em]">
                    {belPaper ? "BEL ECE Details" : "Paper Info"}
                  </p>
                  <div className="mt-2 grid grid-cols-2 gap-1.5 sm:mt-2.5 sm:gap-2">
                    {(belPaper
                      ? [
                          ["Questions", getQuestionMetric(paper, paperQuestions)],
                          ["Solutions", getSolvedMetric(paper)],
                          ["Sections", paperHasContent ? paper.subjectCount || paper.subjects?.length || "-" : "-"],
                          ["Topics", paperHasContent ? paper.topicCount || paper.topics?.length || "-" : "-"],
                        ]
                      : [
                          ["Questions", getQuestionMetric(paper, paperQuestions)],
                          ["Solved", getSolvedMetric(paper)],
                          ["Repeated", paperHasContent ? paper.repeatedCount : "-"],
                          ["Important", paperHasContent ? paper.importantCount : "-"],
                        ]).map(([label, value]) => (
                      <div key={label} className="rounded-lg border border-white/70 bg-white p-2 text-slate-950 shadow-[0_8px_18px_rgba(11,31,85,0.10)] sm:rounded-lg sm:p-2.5">
                        <p className="text-base font-extrabold text-[#1f2f47] sm:text-lg">{value}</p>
                        <p className="mt-0.5 text-[9px] font-extrabold uppercase tracking-[0.1em] text-[#64748b]">
                          {label}
                        </p>
                      </div>
                    ))}
                  </div>
                  {loadError ? (
                    <p className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-800">
                      {loadError}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </section>

        {introContent ? (
          <section className="rounded-[18px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-950">
              {introContent.heading}
            </h2>
            <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-700 sm:text-base">
              {introContent.body}
            </p>
          </section>
        ) : null}

        {belPaper ? (
          <section className="rounded-[18px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-portal-700">
              Paper Overview
            </p>
            <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-950">
              BEL ECE {getBelPaperDateLabel(paper)} solved paper overview
            </h2>
            <p className="mt-3 max-w-5xl text-sm leading-7 text-slate-700 sm:text-base">
              {belPaperSummary} Use this page to move from the year-wise BEL previous paper into solved questions, quick notes, MCQs and preparation resources without opening duplicate paper views.
            </p>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {[
                {
                  title: "Detailed Solutions",
                  text: `${getQuestionMetric(paper, paperQuestions)} questions are arranged for step-by-step answer review and objective-question practice.`,
                },
                {
                  title: "Topic-Wise Analysis",
                  text: `Revise high-value areas such as ${(paper.topics || []).slice(0, 5).join(", ") || "Reasoning, General Aptitude and Electronics"}.`,
                },
                {
                  title: "Exam Pattern Resources",
                  text: "Use section counts, topic coverage, related notes and MCQs to plan BEL Probationary Engineer ECE preparation.",
                },
              ].map((item) => (
                <article key={item.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <h3 className="text-base font-extrabold text-slate-950">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{item.text}</p>
                </article>
              ))}
            </div>
          </section>
        ) : null}

        <section className="grid gap-6">
          <div id="viewer" className="min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white p-3 shadow-[0_18px_60px_rgba(15,23,42,0.08)] sm:p-4">
            <div className="flex flex-col gap-3 border-b border-slate-200 pb-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-portal-700">
                  {belPaper ? "Solved Questions" : "Question Paper"}
                </p>
                <h2 className="mt-1 text-xl font-extrabold text-slate-950">
                  {paperQuestions.length
                    ? belPaper
                      ? "Interactive BEL ECE solutions"
                      : "Interactive solved paper"
                    : paper.pdfHref
                      ? "Official paper viewer"
                      : "Coming Soon"}
                </h2>
              </div>
              {paperHasContent && !belPaper ? (
                <button
                  type="button"
                  onClick={handleDownloadPdf}
                  className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[linear-gradient(90deg,#b02cff,#0796e8)] px-5 py-3 text-sm font-extrabold text-white shadow-[0_10px_24px_rgba(120,55,230,0.18)] transition hover:opacity-90"
                >
                  Download PDF
                </button>
              ) : null}
            </div>
            {loading ? (
              <div className="flex min-h-[540px] items-center justify-center text-sm font-semibold text-slate-600">
                Loading embedded paper viewer...
              </div>
            ) : paperQuestions.length ? (
              <div className="mt-4 space-y-4">
                <OfficialQuestionPreview questions={paperQuestions} exam={paper.exam} />
                <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-600">
                  This is the only in-site question view for this paper. Use the question tabs instead of a separate long scrolling duplicate page.
                  {paper.pdfHref ? (
                    <>
                      {" "}
                      <a
                        href={paper.pdfHref}
                        target="_blank"
                        rel="noreferrer"
                        className="font-extrabold text-portal-700 underline decoration-portal-300 underline-offset-4"
                      >
                        Open original official PDF
                      </a>
                    </>
                  ) : null}
                </div>
              </div>
            ) : paper.pdfHref ? (
              <>
                <iframe
                  ref={viewerRef}
                  title={`${paper.exam} ${paper.year} official paper viewer`}
                  src={paper.pdfHref}
                  className="mt-4 h-[760px] w-full rounded-xl border border-slate-200 bg-white"
                />
              </>
            ) : (
              <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-5 sm:px-6 sm:py-7">
                <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-amber-700">
                  Coming Soon
                </p>
                <h3 className="mt-2 text-xl font-extrabold text-slate-950">
                  Questions are being prepared
                </h3>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-700">
                  This paper is listed for archive completeness, but the question set is not ready yet.
                  It is marked noindex until real questions or an official PDF are available.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Link
                    href="/previous-year"
                    className="inline-flex min-h-10 items-center justify-center rounded-xl bg-slate-950 px-4 py-2 text-sm font-extrabold text-white transition hover:bg-slate-800"
                  >
                    Browse Available Papers
                  </Link>
                  <Link
                    href={practiceHref}
                    className="inline-flex min-h-10 items-center justify-center rounded-xl border border-amber-300 bg-white px-4 py-2 text-sm font-extrabold text-amber-800 transition hover:border-amber-400"
                  >
                    Practice Similar Questions
                  </Link>
                </div>
              </div>
            )}
          </div>

          <aside className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.7fr)]">
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-portal-700">
                Other papers
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {relatedPapers.map((item) => (
                  <Link
                    key={`${item.exam}-${item.year}-${item.month || ""}`}
                    href={
                      item.slug
                        ? `/solution/${item.slug}`
                        : `/solution/${slugifyPaper(item.exam, item.year)}?exam=${encodeURIComponent(item.exam)}&year=${encodeURIComponent(item.year)}`
                    }
                    className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 transition hover:border-portal-300 hover:bg-white"
                  >
                    <p className="font-extrabold text-slate-950">
                      {getPaperShortTitle(item)}
                    </p>
                    <p className="mt-1 text-sm text-slate-600">{item.count} questions</p>
                  </Link>
                ))}
              </div>
            </section>

            <section className="rounded-2xl border border-orange-200 bg-orange-50 p-5 shadow-sm">
              <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-orange-700">
                Related resources
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {[
                  ["Important PYQs", "/practice?search=important"],
                  ["Repeated Questions", "/previous-year?search=repeated"],
                  ["Subject Quick Notes", "/notes"],
                  ["Mock Tests", "/mock-tests"],
                ].map(([label, href]) => (
                  <Link
                    key={label}
                    href={href}
                    className="rounded-xl bg-white px-4 py-3 text-sm font-extrabold text-slate-800 transition hover:text-portal-700"
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </section>
          </aside>
        </section>
      </div>
    </Layout>
  );
}


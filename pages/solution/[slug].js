import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/router";
import CircuitDiagram from "../../components/CircuitDiagram";
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

function parsePaperSlug(slug = "") {
  const match = String(slug).match(/^(.+)-(\d{4})$/);

  if (!match) {
    return { exam: "", year: 0 };
  }

  return {
    exam: match[1].replace(/-/g, " ").toUpperCase(),
    year: Number(match[2]),
  };
}

function buildPaperSummary(questions = [], exam, year) {
  const officialPaper = getOfficialPaper(exam, year);
  const paperQuestions = questions.filter(
    (question) => question.year === year && (question.exam || []).includes(exam)
  );
  const subjectSet = new Set(paperQuestions.map((question) => question.subject).filter(Boolean));
  const topicSet = new Set(paperQuestions.map((question) => question.topic).filter(Boolean));

  return {
    id: officialPaper?.id || `${exam}-${year}`,
    exam,
    year,
    paperType: getPaperTypeFromExamName(exam),
    title: officialPaper?.title,
    role: officialPaper?.role,
    questionCount: officialPaper?.questionCount || paperQuestions.length,
    solvedCount: paperQuestions.filter((question) => question.explanation).length,
    repeatedCount: paperQuestions.filter((question) => (question.tags || []).includes("repeated")).length,
    importantCount: paperQuestions.filter((question) => (question.tags || []).includes("important")).length,
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
      const key = `${examName}-${question.year}`;
      const current =
        paperMap.get(key) || {
          exam: examName,
          year: question.year,
          count: 0,
        };

      current.count += 1;
      paperMap.set(key, current);
    });
  });

  return [...paperMap.values()]
    .filter((paper) => paper.exam !== currentPaper.exam || paper.year !== currentPaper.year)
    .sort((left, right) => right.year - left.year || left.exam.localeCompare(right.exam))
    .slice(0, 6);
}

function getPaperDisplayTitle(paper) {
  return paper.title || `${paper.exam} ${paper.year} ECE Previous Paper`;
}

function getQuestionMetric(paper, paperQuestions = []) {
  return paper.questionCount || paperQuestions.length || "PDF";
}

function getSolvedMetric(paper) {
  if (paper.isOfficialPdf && !paper.solvedCount) {
    return "Official";
  }

  return `${getSolvedPercentage(paper.solvedCount, paper.questionCount)}%`;
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

function OfficialQuestionPreview({ questions = [] }) {
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
  const isAnswerRevealed = revealedAnswers[questionKey];
  const hasSelectedAnswer = Boolean(selectedAnswer);
  const hasAnswerKey = Boolean(currentQuestion.correctAnswer);
  const selectedAnswerIsCorrect = selectedAnswer === currentQuestion.correctAnswer;
  const sectionQuestionNumber = getPreviewQuestionNumber(questions, currentQuestionIndex);
  const canGoPrevious = currentQuestionIndex > 0;
  const canGoNext = currentQuestionIndex < questions.length - 1;
  const sectionTabs = [
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
  ]
    .map((tab) => ({
      ...tab,
      firstIndex: questions.findIndex(tab.match),
      count: questions.filter(tab.match).length,
    }))
    .filter((tab) => tab.firstIndex >= 0);
  const activeSectionTab =
    sectionTabs.find((tab) => tab.match(currentQuestion))?.key || sectionTabs[0]?.key;

  function toggleAnswer(questionKey) {
    setRevealedAnswers((current) => ({
      ...current,
      [questionKey]: !current[questionKey],
    }));
  }

  function selectAnswer(questionKey, option) {
    setSelectedAnswers((current) => ({
      ...current,
      [questionKey]: option,
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
    <section className="mt-4 sm:rounded-xl sm:border sm:border-slate-200 sm:bg-slate-50 sm:p-5">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-portal-700">
            Added Questions
          </p>
          <h3 className="mt-1 text-lg font-extrabold text-slate-950">
            Official paper questions
          </h3>
        </div>
        <span className="text-sm font-bold text-slate-500">
          Question {currentQuestionIndex + 1} of {questions.length}
        </span>
      </div>

      <div className="mt-4 flex gap-2 overflow-x-auto pb-1 [-webkit-overflow-scrolling:touch] [overscroll-behavior-inline:contain] [touch-action:pan-x] sm:flex-wrap sm:overflow-visible">
        {sectionTabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => jumpToQuestion(tab.firstIndex)}
            className={`inline-flex min-h-10 shrink-0 items-center justify-center rounded-xl border px-3 py-2 text-xs font-extrabold transition sm:px-4 sm:text-sm ${
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

      <div className="mt-4 flex items-center gap-2">
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
          className="question-strip-scroll flex-1 overflow-x-auto pb-2 [-webkit-overflow-scrolling:touch] [overscroll-behavior-inline:contain] [scrollbar-width:thin] [touch-action:pan-x] [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-slate-300 [&::-webkit-scrollbar-track]:bg-slate-100"
        >
          <div className="flex min-w-max items-center gap-2">
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
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border text-sm font-extrabold transition ${
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
        <article className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4">
          <div className="flex min-w-0 flex-wrap items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.12em] text-slate-500">
            <span>Q.{sectionQuestionNumber}</span>
            <span className="text-slate-300">|</span>
            <span className="min-w-0 break-words">{currentQuestion.topic || "Previous Paper"}</span>
          </div>

          <p className="mt-3 break-words text-sm font-bold leading-7 text-slate-950 sm:text-base">
            {currentQuestion.question}
          </p>

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

          <div className="mt-4 grid gap-2">
            {(currentQuestion.options || []).map((option, optionIndex) => {
                const isSelected = selectedAnswer === option;
                const isCorrectOption = option === currentQuestion.correctAnswer;
                const showCorrectOption = hasAnswerKey && hasSelectedAnswer && isCorrectOption;
                const showWrongOption =
                  hasAnswerKey && hasSelectedAnswer && isSelected && !isCorrectOption;

                return (
                  <button
                    type="button"
                    key={`${option}-${optionIndex}`}
                    onClick={() => selectAnswer(questionKey, option)}
                    className={`rounded-xl border px-3 py-2 text-left text-sm transition ${
                      showCorrectOption
                        ? "border-emerald-300 bg-emerald-50 text-emerald-800"
                        : showWrongOption
                          ? "border-rose-300 bg-rose-50 text-rose-800"
                          : isSelected
                            ? "border-portal-300 bg-portal-50 text-portal-800"
                            : "border-slate-200 bg-slate-50 text-slate-700"
                    }`}
                  >
                    <div className="flex min-w-0 items-start gap-3">
                      <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white text-xs font-extrabold text-slate-500">
                        {showCorrectOption ? "OK" : showWrongOption ? "X" : String.fromCharCode(65 + optionIndex)}
                      </span>
                      <span className="min-w-0 flex-1 break-words">
                        {option}
                      </span>
                      {showCorrectOption ? (
                        <span className="text-xs font-extrabold uppercase tracking-[0.12em] text-emerald-700">
                          Correct
                        </span>
                      ) : showWrongOption ? (
                        <span className="text-xs font-extrabold uppercase tracking-[0.12em] text-rose-700">
                          Wrong
                        </span>
                      ) : null}
                    </div>
                  </button>
                );
            })}
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-3">
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
                Answer: {currentQuestion.correctAnswer}
              </p>
            ) : selectedAnswer ? (
              <p className={`text-sm font-semibold ${selectedAnswerIsCorrect ? "text-emerald-700" : "text-rose-700"}`}>
                {selectedAnswerIsCorrect ? "Correct answer selected." : "Wrong answer selected. Correct option is highlighted."}
              </p>
            ) : (
              <p className="text-sm text-slate-500">
                Select an option, then reveal the answer.
              </p>
            )}
          </div>

          {isAnswerRevealed && currentQuestion.explanation ? (
            <p className="mt-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm leading-6 text-emerald-900">
              <span className="font-extrabold">Explanation:</span> {currentQuestion.explanation}
            </p>
          ) : null}
          {isAnswerRevealed ? (
            <StudyLinks question={currentQuestion} />
          ) : null}
        </article>

        <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => setCurrentQuestionIndex((index) => Math.max(0, index - 1))}
            disabled={!canGoPrevious}
            className="inline-flex min-h-11 min-w-0 items-center justify-center rounded-xl border border-slate-200 bg-white px-2 py-2 text-xs font-extrabold text-slate-700 transition hover:border-portal-300 hover:text-portal-700 disabled:cursor-not-allowed disabled:opacity-45 sm:px-4 sm:text-sm"
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
            className="inline-flex min-h-11 min-w-0 items-center justify-center rounded-xl border border-portal-300 bg-portal-50 px-2 py-2 text-xs font-extrabold text-portal-700 transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-45 sm:px-4 sm:text-sm"
          >
            Next Que
          </button>
        </div>
      </div>
    </section>
  );
}

export async function getServerSideProps({ params }) {
  return {
    props: {
      initialSlug: typeof params?.slug === "string" ? params.slug : "",
    },
  };
}

export default function SolutionPage({ initialSlug = "" }) {
  const router = useRouter();
  const viewerRef = useRef(null);
  const [questions, setQuestions] = useState(seedQuestions);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [siteUrl, setSiteUrl] = useState("");

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
      setSiteUrl(window.location.origin);
    }
  }, []);

  const paper = useMemo(
    () => buildPaperSummary(questions, exam || "ECE", year || new Date().getFullYear()),
    [exam, questions, year]
  );
  const paperQuestions = useMemo(
    () => getPaperQuestions(questions, paper, paperType),
    [paper, paperType, questions]
  );
  const viewerMarkup = useMemo(
    () => buildPaperPdfMarkup(paper, paperQuestions, { siteUrl }),
    [paper, paperQuestions, siteUrl]
  );
  const relatedPapers = useMemo(
    () => buildRelatedPapers(questions, paper),
    [paper, questions]
  );
  const practiceSlug = getPracticeSlug(paper.exam);
  const practiceHref = practiceSlug ? `/practice/${practiceSlug}` : "/practice";
  const canonicalPath = `/solution/${slugifyPaper(paper.exam, paper.year)}`;
  const paperTitle = getPaperDisplayTitle(paper);
  const paperDescription = `View ${paperTitle} with ECE previous year questions, solutions, paper preview, download support, and related study resources.`;
  const structuredData = [
    ...generateStructuredData({
      type: "topic",
      title: paperTitle,
      description: paperDescription,
      path: canonicalPath,
      subjectName: "Electronics and Communication Engineering",
      chapterTitle: `${paper.exam} Previous Year Paper`,
      keywords: `${paper.exam} ${paper.year} ECE previous paper, ${paper.exam} question paper, GATE ECE previous year questions, ECE solved paper`,
      about: [
        paper.exam,
        "ECE previous year questions",
        "question paper solutions",
        ...(paper.topics || []),
      ],
    }),
    buildBreadcrumbList([
      { name: "Home", item: "/" },
      { name: "Previous Papers", item: "/previous-year" },
      { name: paperTitle, item: canonicalPath },
    ]),
  ];

  function handleDownloadPdf() {
    if (typeof window === "undefined") {
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
      title={`${paperTitle} | ECE Exam Guide`}
      description={paperDescription}
      canonicalUrl={generateCanonical(canonicalPath)}
      keywords={`${paper.exam} ${paper.year} ECE previous paper, ${paper.exam} ECE question paper, ECE previous year questions, solved paper`}
      structuredData={structuredData}
      ogType="article"
      pageClassName="py-5 sm:py-6"
    >
      <div className="mx-auto max-w-[1440px] space-y-6">
        <nav className="flex flex-wrap items-center gap-2 text-sm text-slate-500" aria-label="Breadcrumb">
          <Link href="/" className="font-semibold transition hover:text-portal-700">
            Home
          </Link>
          <span aria-hidden="true">&gt;</span>
          <Link href="/previous-year" className="font-semibold transition hover:text-portal-700">
            Previous Papers
          </Link>
          <span aria-hidden="true">&gt;</span>
          <span className="font-extrabold text-slate-800">
            {paper.exam} {paper.year}
          </span>
        </nav>

        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_24px_70px_rgba(15,23,42,0.12)]">
          <div className="grid gap-0 lg:grid-cols-[1fr_420px]">
            <div className="bg-slate-950 p-6 text-white sm:p-8">
              <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-cyan-200">
                In-website solution viewer
              </p>
              <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-5xl">
                {getPaperDisplayTitle(paper)}
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-200 sm:text-base">
                Read the paper inside the platform with clean navigation and related study resources. Download is available as a secondary action.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="#viewer"
                  className="inline-flex min-h-12 items-center justify-center rounded-xl bg-white px-6 py-3 text-sm font-extrabold text-slate-950 transition hover:bg-cyan-50"
                >
                  View Solution
                </a>
                <button
                  type="button"
                  onClick={handleDownloadPdf}
                  className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/20 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10"
                >
                  Download PDF
                </button>
                <Link
                  href={practiceHref}
                  className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/20 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10"
                >
                  Practice Online
                </Link>
              </div>
            </div>

            <div className="bg-slate-50 p-5 sm:p-6">
              <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-slate-500">
                Paper info
              </p>
              <div className="mt-4 grid grid-cols-2 gap-3">
                {[
                  ["Questions", getQuestionMetric(paper, paperQuestions)],
                  ["Solved", getSolvedMetric(paper)],
                  ["Repeated", paper.repeatedCount],
                  ["Important", paper.importantCount],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                    <p className="text-2xl font-extrabold text-slate-950">{value}</p>
                    <p className="mt-1 text-[11px] font-extrabold uppercase tracking-[0.14em] text-slate-500">
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
        </section>

        <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
          <div id="viewer" className="rounded-2xl border border-slate-200 bg-white p-3 shadow-[0_18px_60px_rgba(15,23,42,0.08)] sm:p-4">
            <div className="flex flex-col gap-3 border-b border-slate-200 pb-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-portal-700">
                  Question Paper Preview
                </p>
                <h2 className="mt-1 text-xl font-extrabold text-slate-950">
                  {paper.pdfHref && paperQuestions.length
                    ? "Official paper question viewer"
                    : paper.pdfHref
                      ? "Official paper viewer"
                      : "Embedded solution viewer"}
                </h2>
              </div>
              <button
                type="button"
                onClick={handleDownloadPdf}
                className="inline-flex min-h-11 items-center justify-center rounded-xl border border-portal-300 bg-portal-50 px-5 py-3 text-sm font-extrabold text-portal-700 transition hover:bg-white"
              >
                Download PDF
              </button>
            </div>
            {loading ? (
              <div className="flex min-h-[540px] items-center justify-center text-sm font-semibold text-slate-600">
                Loading embedded paper viewer...
              </div>
            ) : paper.pdfHref && paperQuestions.length ? (
              <div className="mt-4 space-y-4">
                <OfficialQuestionPreview questions={paperQuestions} />
                <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-600">
                  Download PDF now generates the clean ECE Exam Guide printable paper from these solved questions.
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
              <iframe
                ref={viewerRef}
                title={`${paper.exam} ${paper.year} paper viewer`}
                srcDoc={viewerMarkup}
                className="mt-4 h-[760px] w-full rounded-xl border border-slate-200 bg-white"
              />
            )}
          </div>

          <aside className="space-y-5">
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-portal-700">
                Other papers
              </p>
              <div className="mt-4 grid gap-3">
                {relatedPapers.map((item) => (
                  <Link
                    key={`${item.exam}-${item.year}`}
                    href={`/solution/${slugifyPaper(item.exam, item.year)}?exam=${encodeURIComponent(item.exam)}&year=${encodeURIComponent(item.year)}`}
                    className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 transition hover:border-portal-300 hover:bg-white"
                  >
                    <p className="font-extrabold text-slate-950">
                      {item.exam} {item.year}
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
              <div className="mt-4 grid gap-3">
                {[
                  ["Important PYQs", "/practice?search=important"],
                  ["Repeated Questions", "/previous-year?search=repeated"],
                  ["Subject Notes", "/notes"],
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

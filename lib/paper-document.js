import { SITE_URL } from "./seo";

function normalizeBaseUrl(value = "") {
  const normalizedValue = String(value || "").trim().replace(/\/+$/, "");

  return normalizedValue || SITE_URL;
}

export function escapeHtml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function slugifyPaper(exam = "paper", year = "") {
  return `${String(exam).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}-${year}`;
}

export function getPaperTypeFromExamName(examName) {
  return examName === "GATE" ? "General Aptitude + Engineering" : "Objective";
}

export function getSolvedPercentage(solvedCount, questionCount) {
  if (!questionCount) {
    return 0;
  }

  return Math.round((solvedCount / questionCount) * 100);
}

export function getPaperQuestions(questions = [], paper, selectedPaperType = "All Types") {
  return questions.filter((question) => {
    const matchesPaper =
      question.year === paper.year &&
      (question.exam || []).includes(paper.exam) &&
      (!paper.month || !question.month || question.month === paper.month);
    const matchesType =
      selectedPaperType === "All Types" ||
      (question.exam || []).some(
        (examName) => getPaperTypeFromExamName(examName) === selectedPaperType
      );

    return matchesPaper && matchesType;
  });
}

function getCorrectAnswers(question = {}) {
  return Array.isArray(question.correctAnswers) && question.correctAnswers.length
    ? question.correctAnswers
    : question.correctAnswer
      ? [question.correctAnswer]
      : [];
}

const TOPIC_STUDY_LINKS = {
  "Analog Communication": [
    { label: "AM and DSB-SC theory", href: "/learn/communications/amplitude-modulation" },
    { label: "Communication Systems quick notes", href: "/subjects/communication-systems" },
  ],
  BJT: [
    { label: "BJT operating regions", href: "/bipolar-junction-transistor" },
    { label: "BJT and MOSFET revision", href: "/bjt-and-mosfet" },
  ],
  Controllers: [
    { label: "Controllers and compensators", href: "/controllers-and-compensators" },
    { label: "Time response and steady-state error", href: "/time-response-analysis" },
  ],
  DFT: [
    { label: "DFT theory and examples", href: "/learn/dsp/discrete-fourier-transform-dft" },
    { label: "Digital Signal Processing notes", href: "/subjects/digital-signal-processing" },
  ],
  "Digital Communication": [
    { label: "Digital communication theory", href: "/learn/communications/digital-communication" },
    { label: "Noise and SNR", href: "/learn/communications/noise-in-communication-systems" },
  ],
  "Fourier Series": [
    { label: "Fourier Series theory", href: "/fourier-series" },
    { label: "Signals and Systems notes", href: "/subjects/signals-and-systems" },
  ],
  "Line-of-Sight Communication": [
    { label: "Wireless propagation basics", href: "/subjects/antenna-and-wave-propagation" },
    { label: "Communication receivers", href: "/learn/communications/communication-receivers" },
    { label: "Antenna and propagation notes", href: "/subjects/antenna-and-wave-propagation" },
  ],
  Noise: [
    { label: "Noise in communication systems", href: "/learn/communications/noise-in-communication-systems" },
    { label: "Signals and spectra", href: "/learn/communications/signals-and-spectra" },
  ],
  "Number Systems": [
    { label: "Number systems and codes", href: "/number-systems-and-codes" },
    { label: "Digital Electronics quick notes", href: "/subjects/digital-electronics" },
  ],
  "Root Locus": [
    { label: "Root locus technique", href: "/root-locus-technique" },
    { label: "Control Systems notes", href: "/subjects/control-systems" },
  ],
  "Routh-Hurwitz Stability": [
    { label: "Stability analysis", href: "/stability-analysis" },
    { label: "Control Systems notes", href: "/subjects/control-systems" },
  ],
  Semiconductors: [
    { label: "Semiconductor fundamentals", href: "/semiconductor-fundamentals" },
    { label: "Analog Electronics quick notes", href: "/subjects/analog-electronics" },
  ],
  TDMA: [
    { label: "Digital communication theory", href: "/learn/communications/digital-communication" },
    { label: "Communication Systems quick notes", href: "/subjects/communication-systems" },
  ],
  "Transmission Lines": [
    { label: "Transmission lines theory", href: "/learn/electromagnetics/transmission-lines" },
    { label: "Electromagnetic Theory notes", href: "/subjects/electromagnetic-theory" },
  ],
  "Transient Response": [
    { label: "Transient analysis", href: "/transient-analysis" },
    { label: "Network Analysis quick notes", href: "/subjects/network-analysis" },
  ],
  "Two-Port Networks": [
    { label: "Two-port networks theory", href: "/two-port-networks" },
    { label: "Network Analysis quick notes", href: "/subjects/network-analysis" },
  ],
};

export function getQuestionStudyLinks(question = {}) {
  const topicLinks = TOPIC_STUDY_LINKS[question.topic] || [];
  const uniqueLinks = new Map();

  topicLinks.forEach((link) => {
    if (link?.href && !uniqueLinks.has(link.href)) {
      uniqueLinks.set(link.href, link);
    }
  });

  return [...uniqueLinks.values()].slice(0, 3);
}

function getQuestionSection(question = {}) {
  return question.subject || "ECE";
}

export function buildPaperPdfMarkup(paper, paperQuestions = [], options = {}) {
  const title = `${paper.exam} ${paper.year} ECE Previous Paper`;
  const explanationUrl = `${normalizeBaseUrl(options.siteUrl)}/solution/${
    paper.slug || slugifyPaper(paper.exam, paper.year)
  }`;
  const solvedPercent = getSolvedPercentage(
    paper.solvedCount || paperQuestions.filter((question) => question.explanation).length,
    paper.questionCount || paperQuestions.length
  );
  const sectionQuestionCounts = new Map();
  const questionRows = paperQuestions
    .map((question, questionIndex) => {
      const section = getQuestionSection(question);
      const sectionQuestionNumber = (sectionQuestionCounts.get(section) || 0) + 1;
      const previousSection =
        questionIndex > 0 ? getQuestionSection(paperQuestions[questionIndex - 1]) : "";
      const sectionHeader =
        section !== previousSection
          ? `<p class="section-title">Section : ${escapeHtml(section)}</p>`
          : "";

      sectionQuestionCounts.set(section, sectionQuestionNumber);

      const optionRows = (question.options || [])
        .map((option, optionIndex) => {
          const correctAnswers = getCorrectAnswers(question);
          const isCorrectOption = correctAnswers.includes(option);
          const optionClassName = isCorrectOption ? ` class="correct-option"` : "";

          return `<li${optionClassName}><span class="option-box">${
            isCorrectOption ? "&#10003;" : ""
          }</span><strong>${String.fromCharCode(65 + optionIndex)}.</strong> ${escapeHtml(option)}</li>`;
        })
        .join("");
      const tags = (question.tags || []).length
        ? `<p class="tags">Tags: ${(question.tags || []).map(escapeHtml).join(", ")}</p>`
        : "";
      const studyLinks = getQuestionStudyLinks(question);
      const studyLinkRows = studyLinks.length
        ? `<div class="study-links"><strong>Study this concept:</strong> ${studyLinks
            .map(
              (link) =>
                `<a href="${escapeHtml(link.href)}">${escapeHtml(link.label)}</a>`
            )
            .join(" | ")}</div>`
        : "";

      return `
        ${sectionHeader}
        <article class="question">
          <div class="meta">
            <span>${escapeHtml(question.subject || "ECE")}</span>
            <span>${escapeHtml(question.topic || "Previous Paper")}</span>
            <span>Year ${escapeHtml(question.year)}</span>
          </div>
          <h2>Q${sectionQuestionNumber}. ${escapeHtml(question.question)}</h2>
          <ol class="options">${optionRows}</ol>
          <div class="answer">
            <p><strong>Correct Answer:</strong> ${escapeHtml(question.correctAnswer || "Not available")}</p>
            <p class="explanation-link">
              For detailed explanation, visit:
              <a href="${escapeHtml(explanationUrl)}">${escapeHtml(explanationUrl)}</a>
            </p>
            ${studyLinkRows}
          </div>
          ${tags}
        </article>
      `;
    })
    .join("");

  return `<!doctype html>
    <html>
      <head>
        <meta charset="utf-8" />
        <title>${escapeHtml(title)}</title>
        <style>
          @page { margin: 18mm; }
          * { box-sizing: border-box; }
          body {
            color: #0f172a;
            font-family: Arial, Helvetica, sans-serif;
            line-height: 1.45;
            margin: 0;
            padding: 18px;
          }
          header {
            border-bottom: 2px solid #154a96;
            margin-bottom: 18px;
            padding-bottom: 14px;
          }
          .eyebrow {
            color: #154a96;
            font-size: 11px;
            font-weight: 800;
            letter-spacing: 0.12em;
            text-transform: uppercase;
          }
          h1 {
            font-size: 26px;
            margin: 6px 0 8px;
          }
          .summary {
            color: #475569;
            display: grid;
            font-size: 12px;
            gap: 4px;
            grid-template-columns: repeat(4, 1fr);
          }
          .section-title {
            color: #64748b;
            font-size: 12px;
            font-weight: 800;
            margin: 20px 0 10px;
          }
          .question {
            border: 1px solid #dbe4f0;
            border-radius: 12px;
            break-inside: avoid;
            margin: 0 0 14px;
            padding: 14px;
          }
          .meta {
            color: #475569;
            display: flex;
            flex-wrap: wrap;
            font-size: 11px;
            font-weight: 700;
            gap: 8px;
            text-transform: uppercase;
          }
          h2 {
            font-size: 15px;
            margin: 10px 0;
          }
          .options {
            display: grid;
            gap: 7px;
            margin: 0;
            padding-left: 0;
          }
          .options li {
            align-items: flex-start;
            border: 1px solid #dbe4f0;
            border-radius: 8px;
            display: flex;
            gap: 8px;
            list-style: none;
            padding: 8px;
          }
          .options li.correct-option {
            background: #ecfdf5;
            border-color: #86efac;
            color: #166534;
          }
          .option-box {
            align-items: center;
            border: 1px solid #94a3b8;
            border-radius: 4px;
            display: inline-flex;
            flex: 0 0 auto;
            font-size: 11px;
            font-weight: 800;
            height: 16px;
            justify-content: center;
            margin-top: 2px;
            width: 16px;
          }
          .answer {
            background: #f8fafc;
            border-radius: 10px;
            margin-top: 12px;
            padding: 10px;
          }
          .answer p,
          .tags {
            font-size: 12px;
            margin: 4px 0;
          }
          .explanation-link {
            color: #475569;
          }
          .explanation-link a {
            color: #154a96;
            font-weight: 800;
            word-break: break-all;
          }
          .study-links {
            border-top: 1px solid #dbe4f0;
            font-size: 12px;
            margin-top: 8px;
            padding-top: 8px;
          }
          .study-links a {
            color: #154a96;
            font-weight: 700;
            text-decoration: none;
          }
          footer {
            border-top: 1px solid #dbe4f0;
            color: #64748b;
            font-size: 11px;
            margin-top: 18px;
            padding-top: 10px;
          }
          @media print {
            body { padding: 0; }
          }
        </style>
      </head>
      <body>
        <header>
          <p class="eyebrow">ECE Exam Guide Previous Paper</p>
          <h1>${escapeHtml(title)}</h1>
          <div class="summary">
            <span><strong>Type:</strong> ${escapeHtml(paper.paperType || "Objective")}</span>
            <span><strong>Questions:</strong> ${paperQuestions.length}</span>
            <span><strong>Notes:</strong> ${paper.subjectCount || "Mixed"}</span>
            <span><strong>Solved:</strong> ${solvedPercent}%</span>
          </div>
        </header>
        <main>${questionRows || "<p>No questions found for this paper.</p>"}</main>
        <footer>
          Generated from ECE Exam Guide for educational practice. Verify official papers and notices from the original exam authority.
        </footer>
      </body>
    </html>`;
}

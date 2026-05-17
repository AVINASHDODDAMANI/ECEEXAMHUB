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
      question.year === paper.year && (question.exam || []).includes(paper.exam);
    const matchesType =
      selectedPaperType === "All Types" ||
      (question.exam || []).some(
        (examName) => getPaperTypeFromExamName(examName) === selectedPaperType
      );

    return matchesPaper && matchesType;
  });
}

export function buildPaperPdfMarkup(paper, paperQuestions = []) {
  const title = `${paper.exam} ${paper.year} ECE Previous Paper`;
  const solvedPercent = getSolvedPercentage(
    paper.solvedCount || paperQuestions.filter((question) => question.explanation).length,
    paper.questionCount || paperQuestions.length
  );
  const questionRows = paperQuestions
    .map((question, questionIndex) => {
      const optionRows = (question.options || [])
        .map(
          (option, optionIndex) =>
            `<li><strong>${String.fromCharCode(65 + optionIndex)}.</strong> ${escapeHtml(option)}</li>`
        )
        .join("");
      const tags = (question.tags || []).length
        ? `<p class="tags">Tags: ${(question.tags || []).map(escapeHtml).join(", ")}</p>`
        : "";

      return `
        <article class="question">
          <div class="meta">
            <span>${escapeHtml(question.subject || "ECE")}</span>
            <span>${escapeHtml(question.topic || "Previous Paper")}</span>
            <span>Year ${escapeHtml(question.year)}</span>
          </div>
          <h2>Q${questionIndex + 1}. ${escapeHtml(question.question)}</h2>
          <ol class="options">${optionRows}</ol>
          <div class="answer">
            <p><strong>Correct Answer:</strong> ${escapeHtml(question.correctAnswer || "Not available")}</p>
            ${
              question.explanation
                ? `<p><strong>Explanation:</strong> ${escapeHtml(question.explanation)}</p>`
                : ""
            }
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
            padding-left: 20px;
          }
          .options li {
            padding-left: 4px;
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
            <span><strong>Subjects:</strong> ${paper.subjectCount || "Mixed"}</span>
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

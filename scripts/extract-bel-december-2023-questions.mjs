import fs from "node:fs/promises";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";

const sourcePdf =
  "public/papers/bel-probationary-engineer-electronics-official-paper-december-2023.pdf";
const outputPath = "data/bel-december-2023-remaining-questions.js";

function cleanText(value = "") {
  return String(value)
    .replace(/\s+/g, " ")
    .replace(/(\w)\s+fi\s+(\w)/g, "$1fi$2")
    .replace(/(\w)\s+fl\s+(\w)/g, "$1fl$2")
    .replace(/\s+([,.:;?])/g, "$1")
    .trim();
}

function readOptions(chunk = "") {
  const answerText = chunk.match(/\bAns\b([\s\S]*?)\bQuestion ID\s*:/)?.[1] || "";
  const matches = [...answerText.matchAll(/(?:^|\s)([1-4])\.\s*([\s\S]*?)(?=\s[1-4]\.\s|$)/g)];
  const options = matches.map((match) => cleanText(match[2])).slice(0, 4);

  return Array.from({ length: 4 }, (_, index) =>
    options[index] || `Option ${index + 1} shown in official PDF`
  );
}

function readOptionIds(chunk = "") {
  return [...chunk.matchAll(/Option [1-4] ID\s*:\s*(\d+)/g)].map((match) => match[1]);
}

function readChunk(pageNumber, chunk = "") {
  const paperQuestionNumber = Number(chunk.match(/^Q\.(\d+)/)?.[1]);

  if (!paperQuestionNumber || paperQuestionNumber < 17) {
    return null;
  }

  const questionId = chunk.match(/Question ID\s*:\s*(\d+)/)?.[1] || "";
  const questionText = cleanText(
    chunk
      .replace(/^Q\.\d+\s*/, "")
      .split(/\bAns\b/)[0]
      .replace(/Section\s*:\s*Question based on Electronics Engineering/g, "")
  );
  const options = readOptions(chunk);

  return {
    _id: `bel-dec-2023-electronics-q${paperQuestionNumber}`,
    question:
      questionText ||
      `Refer to the official PDF figure for BEL Electronics Question ${paperQuestionNumber}.`,
    options,
    correctAnswer: "",
    explanation: "",
    subject: "Question based on Electronics Engineering",
    topic: "Official BEL Electronics Paper",
    exam: ["BEL"],
    tags: ["official-paper", "answer-key-pending"],
    year: 2023,
    questionId,
    optionIds: readOptionIds(chunk),
    status: cleanText(chunk.match(/Status\s*:\s*([\s\S]*?)\sChosen Option\s*:/)?.[1] || ""),
    chosenOption: cleanText(chunk.match(/Chosen Option\s*:\s*([^\s]+)/)?.[1] || "-"),
    sourcePage: pageNumber,
    diagram:
      questionText && options.every((option) => !option.includes("shown in official PDF"))
        ? ""
        : `/papers/bel-probationary-engineer-electronics-official-paper-december-2023.pdf#page=${pageNumber}`,
  };
}

const pdf = await pdfjsLib.getDocument(sourcePdf).promise;
const questions = [];

for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
  const page = await pdf.getPage(pageNumber);
  const content = await page.getTextContent();
  const pageText = cleanText(content.items.map((item) => item.str).join(" "));
  const chunks = pageText
    .split(/(?=Q\.\d+\s)/)
    .filter((chunk) => /^Q\.\d+\s/.test(chunk));

  chunks.forEach((chunk) => {
    const question = readChunk(pageNumber, chunk);

    if (question) {
      questions.push(question);
    }
  });
}

const output = `// Generated from ${sourcePdf} by scripts/extract-bel-december-2023-questions.mjs.\n// The uploaded response PDF includes the remaining question text/options and the candidate's chosen option.\nconst belDecember2023RemainingQuestions = ${JSON.stringify(questions, null, 2)};\n\nexport default belDecember2023RemainingQuestions;\n`;

await fs.writeFile(outputPath, output, "utf8");
console.log(`Wrote ${questions.length} questions to ${outputPath}.`);

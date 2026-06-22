import { sanitizeSearchInput, sanitizeSlugLikeInput } from "./sanitize";

export const SUBJECTS = [
  "All Subjects",
  "Analog",
  "Digital",
  "Signals",
  "Networks",
  "Control Systems",
];

export const EXAMS = ["All Exams", "GATE", "ISRO", "BEL", "BARC"];
export const QUESTION_TAGS = ["important", "repeated"];

export function hasQuestionTag(question, tagName) {
  return (question?.tags || []).includes(tagName);
}

export function formatQuestionTag(tagName = "") {
  return tagName.charAt(0).toUpperCase() + tagName.slice(1);
}

function normalizeQuestionText(value = "") {
  return String(value).toLowerCase().replace(/<[^>]*>/g, " ").replace(/[^a-z0-9]+/g, " ").trim();
}

export function getQuestionFingerprint(question = {}) {
  const stem = normalizeQuestionText(question.question);
  const options = (question.options || []).map(normalizeQuestionText).join("|");
  return stem ? `${stem}::${options}` : String(question._id || "");
}

export function getUniqueQuestions(questions = []) {
  const fingerprints = new Set();
  return questions.filter((question) => {
    const fingerprint = getQuestionFingerprint(question);
    if (!fingerprint || fingerprints.has(fingerprint)) return false;
    fingerprints.add(fingerprint);
    return true;
  });
}

export function getTopics(questions, subject = "All Subjects") {
  const safeSubject = sanitizeSlugLikeInput(subject, 120) || "All Subjects";
  const filteredQuestions =
    safeSubject === "All Subjects"
      ? questions
      : questions.filter((question) => question.subject === safeSubject);

  return [
    "All Topics",
    ...Array.from(new Set(filteredQuestions.map((question) => question.topic))),
  ];
}

export function filterQuestions(questions, filters = {}) {
  const search = sanitizeSearchInput(filters.search);
  const subject = sanitizeSlugLikeInput(filters.subject, 120);
  const topic = sanitizeSearchInput(filters.topic, 200);
  const exam = sanitizeSlugLikeInput(filters.exam, 60);
  const year = sanitizeSearchInput(filters.year, 4);

  return questions.filter((question) => {
    const matchesSearch = search
      ? [
          question.question,
          question.topic,
          question.subject,
          question.explanation,
          ...(question.exam || []),
          ...(question.tags || []),
        ]
          .join(" ")
          .toLowerCase()
          .includes(search.toLowerCase())
      : true;
    const matchesSubject =
      !subject ||
      subject === "All Subjects" ||
      question.subject === subject;
    const matchesTopic =
      !topic ||
      topic === "All Topics" ||
      question.topic === topic;
    const matchesExam =
      !exam ||
      exam === "All Exams" ||
      question.exam.includes(exam);
    const matchesYear =
      !year || String(question.year) === String(year);

    return (
      matchesSearch &&
      matchesSubject &&
      matchesTopic &&
      matchesExam &&
      matchesYear
    );
  });
}

export function getInsightData(questions) {
  const subjectMap = {};

  questions.forEach((question) => {
    question.exam.forEach((exam) => {
      if (!subjectMap[question.subject]) {
        subjectMap[question.subject] = {
          subject: question.subject,
          total: 0,
          GATE: 0,
          ISRO: 0,
          BEL: 0,
          BARC: 0,
        };
      }

      subjectMap[question.subject].total += 1;
      subjectMap[question.subject][exam] += 1;
    });
  });

  return Object.values(subjectMap).sort((left, right) => right.total - left.total);
}

export function getAvailableYears(questions, exam = "All Exams") {
  const relevantQuestions =
    exam === "All Exams"
      ? questions
      : questions.filter((question) => question.exam.includes(exam));

  return Array.from(new Set(relevantQuestions.map((question) => question.year))).sort(
    (left, right) => right - left
  );
}

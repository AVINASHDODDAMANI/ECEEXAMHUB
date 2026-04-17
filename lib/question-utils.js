export const SUBJECTS = [
  "All Subjects",
  "Analog",
  "Digital",
  "Signals",
  "Networks",
  "Control Systems",
];

export const EXAMS = ["All Exams", "GATE", "ISRO", "BEL", "BARC"];

export function getTopics(questions, subject = "All Subjects") {
  const filteredQuestions =
    subject === "All Subjects"
      ? questions
      : questions.filter((question) => question.subject === subject);

  return [
    "All Topics",
    ...Array.from(new Set(filteredQuestions.map((question) => question.topic))),
  ];
}

export function filterQuestions(questions, filters = {}) {
  return questions.filter((question) => {
    const matchesSearch = filters.search
      ? `${question.question} ${question.topic} ${question.subject}`
          .toLowerCase()
          .includes(filters.search.toLowerCase())
      : true;
    const matchesSubject =
      !filters.subject ||
      filters.subject === "All Subjects" ||
      question.subject === filters.subject;
    const matchesTopic =
      !filters.topic ||
      filters.topic === "All Topics" ||
      question.topic === filters.topic;
    const matchesExam =
      !filters.exam ||
      filters.exam === "All Exams" ||
      question.exam.includes(filters.exam);
    const matchesYear =
      !filters.year || String(question.year) === String(filters.year);

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

export const officialPreviousPapers = [
  {
    id: "bel-probationary-engineer-electronics-december-2023",
    exam: "BEL",
    year: 2023,
    title: "BEL Probationary Engineer Electronics Official Paper - December 2023",
    role: "Probationary Engineer (Electronics)",
    paperType: "Objective",
    subjects: ["General Awareness", "Electronics"],
    topics: [
      "Sustainable Agriculture",
      "Hindi Language Institutions",
      "Gupta Dynasty",
    ],
    questionCount: 3,
    solvedCount: 3,
    repeatedCount: 0,
    importantCount: 0,
    subjectCount: 2,
    topicCount: 3,
    sourceLabel: "Official BEL paper PDF",
    pdfHref: "/papers/bel-probationary-engineer-electronics-official-paper-december-2023.pdf",
    summary:
      "Official BEL December 2023 paper added as a clean in-site reference with structured questions for practice and review.",
  },
];

export function getOfficialPaper(exam, year) {
  return officialPreviousPapers.find(
    (paper) => paper.exam === exam && Number(paper.year) === Number(year)
  );
}

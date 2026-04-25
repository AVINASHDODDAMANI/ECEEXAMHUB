export const practiceSections = [
  {
    id: 1,
    exam: "GATE",
    title: "Practice Section 1",
    label: "GATE Practice",
    description: "Mixed MCQs from all available ECE subjects for GATE preparation.",
  },
  {
    id: 2,
    exam: "ISRO",
    title: "Practice Section 2",
    label: "ISRO Practice",
    description: "Mixed technical MCQs across subjects for ISRO-style revision.",
  },
  {
    id: 3,
    exam: "BEL",
    title: "Practice Section 3",
    label: "BEL Practice",
    description: "Mixed ECE MCQs for BEL and PSU technical practice.",
  },
  {
    id: 4,
    exam: "BARC",
    title: "Practice Section 4",
    label: "BARC Practice",
    description: "Mixed subject questions for BARC-focused practice.",
  },
];

export function getPracticeSlug(exam = "") {
  return exam.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

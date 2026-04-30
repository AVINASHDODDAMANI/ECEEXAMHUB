import { examGuideSections } from "./exam-guides";

export const examDirectory = examGuideSections.map((exam) => ({
  id: exam.id,
  title: exam.title,
  href: exam.href,
  shortDescription: exam.shortDescription,
  description: exam.description,
  icon: exam.icon,
  accent: {
    bg: exam.accent.bg,
    border: exam.accent.border,
    text: exam.accent.text,
  },
}));

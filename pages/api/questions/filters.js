import Question from "../../../models/Question";
import seedQuestions from "../../../data/questions";
import { connectToDatabase } from "../../../lib/mongodb";
import { EXAMS, SUBJECTS, getAvailableYears, getTopics } from "../../../lib/question-utils";

function buildSeedFilters(subject, exam) {
  return {
    subjects: SUBJECTS,
    exams: EXAMS,
    topics: getTopics(seedQuestions, subject || "All Subjects"),
    years: getAvailableYears(seedQuestions, exam || "All Exams"),
  };
}

export default async function handler(req, res) {
  const { subject, exam } = req.query;

  if (!process.env.MONGODB_URI) {
    return res.status(200).json(buildSeedFilters(subject, exam));
  }

  try {
    await connectToDatabase();

    const topicQuery = {};
    const yearQuery = {};

    if (subject && subject !== "All Subjects") {
      topicQuery.subject = subject;
    }

    if (exam && exam !== "All Exams") {
      yearQuery.exam = exam;
    }

    const [subjectsFromDb, topicsFromDb, yearsFromDb, examsFromDb] = await Promise.all([
      Question.distinct("subject"),
      Question.distinct("topic", topicQuery),
      Question.distinct("year", yearQuery),
      Question.distinct("exam"),
    ]);

    const subjects = [
      "All Subjects",
      ...Array.from(new Set(subjectsFromDb.filter(Boolean))).sort((left, right) =>
        left.localeCompare(right)
      ),
    ];

    const topics = [
      "All Topics",
      ...Array.from(new Set(topicsFromDb.filter(Boolean))).sort((left, right) =>
        left.localeCompare(right)
      ),
    ];

    const years = Array.from(
      new Set(yearsFromDb.filter((value) => Number.isFinite(Number(value))))
    ).sort((left, right) => Number(right) - Number(left));

    const exams = [
      "All Exams",
      ...Array.from(new Set(examsFromDb.filter(Boolean))).sort((left, right) =>
        left.localeCompare(right)
      ),
    ];

    return res.status(200).json({
      subjects: subjects.length > 1 ? subjects : SUBJECTS,
      exams: exams.length > 1 ? exams : EXAMS,
      topics,
      years,
    });
  } catch (error) {
    return res.status(200).json({
      ...buildSeedFilters(subject, exam),
      message: error.message || "Falling back to seed filters.",
    });
  }
}

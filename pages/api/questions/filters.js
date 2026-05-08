import Question from "../../../models/Question";
import seedQuestions from "../../../data/questions";
import { connectToDatabase } from "../../../lib/mongodb";
import { EXAMS, SUBJECTS, filterQuestions } from "../../../lib/question-utils";

function toSortedList(values = []) {
  return Array.from(new Set(values.filter(Boolean))).sort((left, right) =>
    String(left).localeCompare(String(right))
  );
}

function toSortedYears(values = []) {
  return Array.from(
    new Set(values.filter((value) => Number.isFinite(Number(value))).map(Number))
  ).sort((left, right) => right - left);
}

function buildSeedFilters(filters = {}) {
  const subjects = [
    "All Subjects",
    ...toSortedList(
      filterQuestions(seedQuestions, {
        topic: filters.topic,
        exam: filters.exam,
        year: filters.year,
      }).map((question) => question.subject)
    ),
  ];

  const topics = [
    "All Topics",
    ...toSortedList(
      filterQuestions(seedQuestions, {
        subject: filters.subject,
        exam: filters.exam,
        year: filters.year,
      }).map((question) => question.topic)
    ),
  ];

  const exams = [
    "All Exams",
    ...toSortedList(
      filterQuestions(seedQuestions, {
        subject: filters.subject,
        topic: filters.topic,
        year: filters.year,
      }).flatMap((question) => question.exam || [])
    ),
  ];

  const years = toSortedYears(
    filterQuestions(seedQuestions, {
      subject: filters.subject,
      topic: filters.topic,
      exam: filters.exam,
    }).map((question) => question.year)
  );

  return {
    subjects: subjects.length > 1 ? subjects : SUBJECTS,
    exams: exams.length > 1 ? exams : EXAMS,
    topics,
    years,
  };
}

function buildMongoFilters(filters = {}) {
  const query = {};

  if (filters.subject && filters.subject !== "All Subjects") {
    query.subject = filters.subject;
  }

  if (filters.topic && filters.topic !== "All Topics") {
    query.topic = filters.topic;
  }

  if (filters.exam && filters.exam !== "All Exams") {
    query.exam = filters.exam;
  }

  if (filters.year) {
    const yearNumber = Number(filters.year);
    if (Number.isFinite(yearNumber)) {
      query.year = yearNumber;
    }
  }

  return query;
}

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed." });
  }

  const { subject, topic, exam, year } = req.query;

  if (!process.env.MONGODB_URI) {
    return res.status(200).json(
      buildSeedFilters({
        subject,
        topic,
        exam,
        year,
      })
    );
  }

  try {
    await connectToDatabase();

    const [subjectsFromDb, topicsFromDb, yearsFromDb, examsFromDb] = await Promise.all([
      Question.distinct(
        "subject",
        buildMongoFilters({
          topic,
          exam,
          year,
        })
      ),
      Question.distinct(
        "topic",
        buildMongoFilters({
          subject,
          exam,
          year,
        })
      ),
      Question.distinct(
        "year",
        buildMongoFilters({
          subject,
          topic,
          exam,
        })
      ),
      Question.distinct(
        "exam",
        buildMongoFilters({
          subject,
          topic,
          year,
        })
      ),
    ]);

    const subjects = [
      "All Subjects",
      ...toSortedList(subjectsFromDb),
    ];

    const topics = [
      "All Topics",
      ...toSortedList(topicsFromDb),
    ];

    const years = toSortedYears(yearsFromDb);

    const exams = [
      "All Exams",
      ...toSortedList(examsFromDb),
    ];

    return res.status(200).json({
      subjects: subjects.length > 1 ? subjects : SUBJECTS,
      exams: exams.length > 1 ? exams : EXAMS,
      topics,
      years,
    });
  } catch (error) {
    return res.status(200).json({
      ...buildSeedFilters({
        subject,
        topic,
        exam,
        year,
      }),
      message: error.message || "Falling back to seed filters.",
    });
  }
}

import Question from "../../../models/Question";
import seedQuestions from "../../../data/questions";
import { connectToDatabase } from "../../../lib/mongodb";
import { filterQuestions } from "../../../lib/question-utils";
import {
  sanitizeDiagramReference,
  sanitizeSearchInput,
  sanitizeSlugLikeInput,
  sanitizeStoredText,
  sanitizeStoredTextList,
} from "../../../lib/sanitize";

function escapeRegex(text) {
  return String(text).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function isAdminAuthorized(req) {
  const requiredAdminKey = process.env.ADMIN_API_KEY;

  if (!requiredAdminKey) {
    return process.env.NODE_ENV !== "production";
  }

  const providedKey = req.headers["x-admin-key"];
  return typeof providedKey === "string" && providedKey === requiredAdminKey;
}

function normalizePayload(rawPayload = {}) {
  const options = Array.isArray(rawPayload.options)
    ? rawPayload.options.map((option) => sanitizeStoredText(option, { maxLength: 1000 }))
    : [];
  const exam = Array.isArray(rawPayload.exam)
    ? Array.from(
        new Set(
          rawPayload.exam
            .map((item) => sanitizeSlugLikeInput(item, 60))
            .filter(Boolean)
        )
      )
    : [];
  const tags = Array.isArray(rawPayload.tags)
    ? Array.from(
        new Set(
          rawPayload.tags
            .map((item) => sanitizeSlugLikeInput(item, 60).toLowerCase())
            .filter(Boolean)
        )
      )
    : [];

  const payload = {
    question: sanitizeStoredText(rawPayload.question),
    options,
    correctAnswer: sanitizeStoredText(rawPayload.correctAnswer, { maxLength: 1000 }),
    explanation: sanitizeStoredText(rawPayload.explanation),
    subject: sanitizeSlugLikeInput(rawPayload.subject, 120),
    topic: sanitizeStoredText(rawPayload.topic, { maxLength: 200 }),
    exam,
    tags: sanitizeStoredTextList(tags, { maxLength: 60 }),
    year: Number(rawPayload.year),
    diagram: sanitizeDiagramReference(rawPayload.diagram),
  };

  if (!payload.question) {
    throw new Error("Question is required.");
  }

  if (payload.options.length !== 4 || payload.options.some((option) => !option)) {
    throw new Error("Provide exactly four non-empty options.");
  }

  if (!payload.correctAnswer) {
    throw new Error("Correct answer is required.");
  }

  if (!payload.options.includes(payload.correctAnswer)) {
    throw new Error("Correct answer must match one of the four options.");
  }

  if (!payload.explanation) {
    throw new Error("Explanation is required.");
  }

  if (!payload.subject) {
    throw new Error("Subject is required.");
  }

  if (!payload.topic) {
    throw new Error("Topic is required.");
  }

  if (!payload.exam.length) {
    throw new Error("Select at least one exam tag.");
  }

  if (!Number.isFinite(payload.year)) {
    throw new Error("Year must be a valid number.");
  }

  return payload;
}

function getQuestionKey(question, fallbackIndex) {
  return String(question?._id || question?.id || question?.questionId || fallbackIndex);
}

function mergeQuestions(primaryQuestions = [], fallbackQuestions = []) {
  const questionMap = new Map();

  fallbackQuestions.forEach((question, index) => {
    questionMap.set(getQuestionKey(question, `seed-${index}`), question);
  });

  primaryQuestions.forEach((question, index) => {
    questionMap.set(getQuestionKey(question, `db-${index}`), question);
  });

  return Array.from(questionMap.values());
}

export default async function handler(req, res) {
  if (req.method === "GET") {
    const subject = sanitizeSlugLikeInput(req.query.subject, 120);
    const topic = sanitizeSearchInput(req.query.topic, 200);
    const exam = sanitizeSlugLikeInput(req.query.exam, 60);
    const year = sanitizeSearchInput(req.query.year, 4);
    const search = sanitizeSearchInput(req.query.search);
    const seedFilteredQuestions = filterQuestions(seedQuestions, {
      subject,
      topic,
      exam,
      year,
      search,
    });

    if (!process.env.MONGODB_URI) {
      return res.status(200).json({
        source: "seed",
        questions: seedFilteredQuestions,
      });
    }

    try {
      await connectToDatabase();

      const filters = {};

      if (subject && subject !== "All Subjects") {
        filters.subject = subject;
      }

      if (topic && topic !== "All Topics") {
        filters.topic = topic;
      }

      if (exam && exam !== "All Exams") {
        filters.exam = exam;
      }

      if (year) {
        const yearNumber = Number(year);
        if (Number.isFinite(yearNumber)) {
          filters.year = yearNumber;
        }
      }

      if (search) {
        const safeSearch = escapeRegex(search);
        filters.$or = [
          { question: { $regex: safeSearch, $options: "i" } },
          { topic: { $regex: safeSearch, $options: "i" } },
          { subject: { $regex: safeSearch, $options: "i" } },
          { explanation: { $regex: safeSearch, $options: "i" } },
          { exam: { $regex: safeSearch, $options: "i" } },
          { tags: { $regex: safeSearch, $options: "i" } },
        ];
      }

      const questions = await Question.find(filters)
        .sort({ year: -1, createdAt: -1 })
        .lean();

      return res.status(200).json({
        source: questions.length ? "mongodb+seed" : "seed",
        questions: mergeQuestions(questions, seedFilteredQuestions),
      });
    } catch (error) {
      return res.status(200).json({
        source: "seed-fallback",
        questions: seedFilteredQuestions,
        message:
          error.message ||
          "MongoDB unavailable. Falling back to local seed questions.",
      });
    }
  }

  if (req.method === "POST") {
    if (!isAdminAuthorized(req)) {
      return res.status(401).json({
        message: "Unauthorized. Provide a valid admin key.",
      });
    }

    if (!process.env.MONGODB_URI) {
      return res.status(500).json({
        message: "Set MONGODB_URI to enable question creation.",
      });
    }

    try {
      await connectToDatabase();
      const payload = normalizePayload(req.body);

      const question = await Question.create(payload);

      return res.status(201).json({
        message: "Question created successfully.",
        question,
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message || "Unable to create question.",
      });
    }
  }

  return res.status(405).json({ message: "Method not allowed." });
}

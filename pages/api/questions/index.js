import Question from "../../../models/Question";
import seedQuestions from "../../../data/questions";
import { connectToDatabase } from "../../../lib/mongodb";
import { filterQuestions } from "../../../lib/question-utils";

function escapeRegex(text) {
  return String(text).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function isAdminAuthorized(req) {
  const requiredAdminKey = process.env.ADMIN_API_KEY;

  if (!requiredAdminKey) {
    return true;
  }

  const providedKey = req.headers["x-admin-key"];
  return typeof providedKey === "string" && providedKey === requiredAdminKey;
}

function normalizePayload(rawPayload = {}) {
  const options = Array.isArray(rawPayload.options)
    ? rawPayload.options.map((option) => String(option || "").trim())
    : [];
  const exam = Array.isArray(rawPayload.exam)
    ? Array.from(
        new Set(
          rawPayload.exam
            .map((item) => String(item || "").trim())
            .filter(Boolean)
        )
      )
    : [];
  const tags = Array.isArray(rawPayload.tags)
    ? Array.from(
        new Set(
          rawPayload.tags
            .map((item) => String(item || "").trim().toLowerCase())
            .filter(Boolean)
        )
      )
    : [];

  const payload = {
    question: String(rawPayload.question || "").trim(),
    options,
    correctAnswer: String(rawPayload.correctAnswer || "").trim(),
    explanation: String(rawPayload.explanation || "").trim(),
    subject: String(rawPayload.subject || "").trim(),
    topic: String(rawPayload.topic || "").trim(),
    exam,
    tags,
    year: Number(rawPayload.year),
    diagram: String(rawPayload.diagram || "").trim(),
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

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { subject, topic, exam, year, search } = req.query;

    if (!process.env.MONGODB_URI) {
      const questions = filterQuestions(seedQuestions, {
        subject,
        topic,
        exam,
        year,
        search,
      });

      return res.status(200).json({
        source: "seed",
        questions,
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

      const questions = await Question.find(filters).sort({ year: -1, createdAt: -1 });

      return res.status(200).json({
        source: "mongodb",
        questions,
      });
    } catch (error) {
      const questions = filterQuestions(seedQuestions, {
        subject,
        topic,
        exam,
        year,
        search,
      });

      return res.status(200).json({
        source: "seed-fallback",
        questions,
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

import Question from "../../../models/Question";
import seedQuestions from "../../../data/questions";
import { connectToDatabase } from "../../../lib/mongodb";

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed." });
  }

  if (!process.env.MONGODB_URI) {
    const question = seedQuestions.find((item) => item._id === id);

    if (!question) {
      return res.status(404).json({ message: "Question not found." });
    }

    return res.status(200).json({ source: "seed", question });
  }

  try {
    await connectToDatabase();
    const question = await Question.findById(id);

    if (!question) {
      return res.status(404).json({ message: "Question not found." });
    }

    return res.status(200).json({ source: "mongodb", question });
  } catch (error) {
    const fallbackQuestion = seedQuestions.find((item) => item._id === id);

    if (fallbackQuestion) {
      return res.status(200).json({
        source: "seed-fallback",
        question: fallbackQuestion,
        message:
          error.message ||
          "MongoDB unavailable. Falling back to local seed questions.",
      });
    }

    return res.status(400).json({
      message: error.message || "Unable to fetch question.",
    });
  }
}

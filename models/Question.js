import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
      trim: true,
    },
    options: {
      type: [String],
      required: true,
      validate: {
        validator(value) {
          return value.length === 4;
        },
        message: "Each question must contain exactly four options.",
      },
    },
    correctAnswer: {
      type: String,
      required: true,
      trim: true,
    },
    explanation: {
      type: String,
      required: true,
      trim: true,
    },
    subject: {
      type: String,
      required: true,
      trim: true,
    },
    topic: {
      type: String,
      required: true,
      trim: true,
    },
    exam: {
      type: [String],
      required: true,
      default: [],
    },
    tags: {
      type: [String],
      default: [],
    },
    year: {
      type: Number,
      required: true,
    },
    diagram: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Question ||
  mongoose.model("Question", QuestionSchema);

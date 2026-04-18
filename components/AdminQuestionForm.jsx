import { useState } from "react";
import { EXAMS, QUESTION_TAGS } from "../lib/question-utils";

const initialState = {
  question: "",
  options: ["", "", "", ""],
  correctAnswer: "",
  explanation: "",
  subject: "Analog",
  topic: "",
  exam: ["GATE"],
  tags: [],
  year: new Date().getFullYear(),
  diagram: "",
};

const availableExams = EXAMS.filter((exam) => exam !== "All Exams");

export default function AdminQuestionForm({ onCreated }) {
  const [formState, setFormState] = useState(initialState);
  const [adminKey, setAdminKey] = useState("");
  const [status, setStatus] = useState({ type: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const updateOption = (index, value) => {
    const nextOptions = [...formState.options];
    nextOptions[index] = value;
    setFormState((current) => ({ ...current, options: nextOptions }));
  };

  const toggleExam = (examName) => {
    const hasExam = formState.exam.includes(examName);

    if (hasExam && formState.exam.length === 1) {
      return;
    }

    const nextExams = hasExam
      ? formState.exam.filter((item) => item !== examName)
      : [...formState.exam, examName];

    setFormState((current) => ({ ...current, exam: nextExams }));
  };

  const toggleTag = (tagName) => {
    const hasTag = formState.tags.includes(tagName);
    const nextTags = hasTag
      ? formState.tags.filter((item) => item !== tagName)
      : [...formState.tags, tagName];

    setFormState((current) => ({ ...current, tags: nextTags }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setStatus({ type: "", message: "" });

    try {
      const response = await fetch("/api/questions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(adminKey ? { "x-admin-key": adminKey } : {}),
        },
        body: JSON.stringify({
          ...formState,
          exam: formState.exam.length ? formState.exam : ["GATE"],
        }),
      });

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.message || "Unable to save question.");
      }

      setStatus({ type: "success", message: "Question saved successfully." });
      setFormState(initialState);
      onCreated?.(payload.question);
    } catch (error) {
      setStatus({
        type: "error",
        message: error.message || "Unable to save question.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-white/60 bg-white/90 p-6 shadow-panel"
    >
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slatebrand-500">
            Admin Panel
          </p>
          <h2 className="mt-1 text-2xl font-semibold text-slate-900">
            Add a New Question
          </h2>
        </div>
        <div className="rounded-full bg-accent-100 px-3 py-1 text-xs font-semibold text-accent-700">
          MongoDB API Ready
        </div>
      </div>

      <div className="grid gap-5">
        <label className="grid gap-2 text-sm font-medium text-slate-700">
          Question
          <textarea
            value={formState.question}
            onChange={(event) =>
              setFormState((current) => ({ ...current, question: event.target.value }))
            }
            required
            rows={4}
            className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-slatebrand-400"
          />
        </label>

        <div className="grid gap-4 md:grid-cols-2">
          {formState.options.map((option, index) => (
            <label
              key={`option-${index + 1}`}
              className="grid gap-2 text-sm font-medium text-slate-700"
            >
              Option {String.fromCharCode(65 + index)}
              <input
                value={option}
                onChange={(event) => updateOption(index, event.target.value)}
                required
                className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-slatebrand-400"
              />
            </label>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <label className="grid gap-2 text-sm font-medium text-slate-700">
            Correct Answer
            <select
              value={formState.correctAnswer}
              onChange={(event) =>
                setFormState((current) => ({
                  ...current,
                  correctAnswer: event.target.value,
                }))
              }
              required
              className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-slatebrand-400"
            >
              <option value="">Select correct option</option>
              {formState.options.map((option, index) => (
                <option key={index} value={option}>
                  {option || `Option ${String.fromCharCode(65 + index)}`}
                </option>
              ))}
            </select>
          </label>

          <label className="grid gap-2 text-sm font-medium text-slate-700">
            Subject
            <select
              value={formState.subject}
              onChange={(event) =>
                setFormState((current) => ({ ...current, subject: event.target.value }))
              }
              className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-slatebrand-400"
            >
              <option>Analog</option>
              <option>Digital</option>
              <option>Signals</option>
              <option>Networks</option>
              <option>Control Systems</option>
            </select>
          </label>

          <label className="grid gap-2 text-sm font-medium text-slate-700">
            Topic
            <input
              value={formState.topic}
              onChange={(event) =>
                setFormState((current) => ({ ...current, topic: event.target.value }))
              }
              required
              className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-slatebrand-400"
            />
          </label>

          <label className="grid gap-2 text-sm font-medium text-slate-700">
            Year
            <input
              type="number"
              value={formState.year}
              onChange={(event) =>
                setFormState((current) => ({ ...current, year: Number(event.target.value) }))
              }
              required
              className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-slatebrand-400"
            />
          </label>
        </div>

        <label className="grid gap-2 text-sm font-medium text-slate-700">
          Explanation
          <textarea
            value={formState.explanation}
            onChange={(event) =>
              setFormState((current) => ({
                ...current,
                explanation: event.target.value,
              }))
            }
            required
            rows={4}
            className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-slatebrand-400"
          />
        </label>

        <label className="grid gap-2 text-sm font-medium text-slate-700">
          Circuit Diagram URL
          <input
            value={formState.diagram}
            onChange={(event) =>
              setFormState((current) => ({ ...current, diagram: event.target.value }))
            }
            placeholder="https://..."
            className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-slatebrand-400"
          />
        </label>

        <div>
          <p className="text-sm font-medium text-slate-700">Exam Tags</p>
          <div className="mt-3 flex flex-wrap gap-3">
            {availableExams.map((examName) => {
              const selected = formState.exam.includes(examName);

              return (
                <button
                  key={examName}
                  type="button"
                  onClick={() => toggleExam(examName)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                    selected
                      ? "bg-slatebrand-900 text-white"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {examName}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <p className="text-sm font-medium text-slate-700">Question Flags</p>
          <div className="mt-3 flex flex-wrap gap-3">
            {QUESTION_TAGS.map((tagName) => {
              const selected = formState.tags.includes(tagName);

              return (
                <button
                  key={tagName}
                  type="button"
                  onClick={() => toggleTag(tagName)}
                  className={`rounded-full px-4 py-2 text-sm font-medium capitalize transition ${
                    selected
                      ? "bg-amber-100 text-amber-800"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {tagName}
                </button>
              );
            })}
          </div>
        </div>

        <label className="grid gap-2 text-sm font-medium text-slate-700">
          Admin API Key (optional for local dev)
          <input
            type="password"
            value={adminKey}
            onChange={(event) => setAdminKey(event.target.value)}
            placeholder="Enter ADMIN_API_KEY if configured"
            className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-slatebrand-400"
          />
        </label>

        <div className="flex flex-col gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            {status.message ? (
              <p
                className={`text-sm ${
                  status.type === "success" ? "text-emerald-600" : "text-rose-600"
                }`}
              >
                {status.message}
              </p>
            ) : (
              <p className="text-sm text-slate-500">
                Questions are saved through the `/api/questions` route.
              </p>
            )}
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="rounded-2xl bg-slatebrand-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slatebrand-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? "Saving..." : "Save Question"}
          </button>
        </div>
      </div>
    </form>
  );
}

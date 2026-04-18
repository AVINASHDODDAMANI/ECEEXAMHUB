import { useEffect, useState } from "react";
import Layout from "../components/layout";
import AdminQuestionForm from "../components/AdminQuestionForm";
import StatCard from "../components/StatCard";

export default function AdminPage() {
  const [savedCount, setSavedCount] = useState(0);
  const [dbStatus, setDbStatus] = useState({
    configured: false,
    connected: false,
    isAtlas: false,
    maskedUri: "",
    message: "Checking database status...",
  });

  useEffect(() => {
    let active = true;

    async function loadStatus() {
      try {
        const response = await fetch("/api/admin/database-status");
        const payload = await response.json();

        if (active) {
          setDbStatus(payload);
        }
      } catch (error) {
        if (active) {
          setDbStatus({
            configured: false,
            connected: false,
            isAtlas: false,
            maskedUri: "",
            message: "Unable to check database status.",
          });
        }
      }
    }

    loadStatus();

    return () => {
      active = false;
    };
  }, []);

  return (
    <Layout title="ECEExamHub | Admin">
      <section className="grid gap-4 md:grid-cols-3">
        <StatCard label="Admin Mode" value="Enabled" tone="dark" />
        <StatCard
          label="Database"
          value={dbStatus.connected ? "Connected" : "Not Ready"}
          tone="light"
        />
        <StatCard label="Saved This Session" value={savedCount} tone="accent" />
      </section>

      <section className="mt-6 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <AdminQuestionForm onCreated={() => setSavedCount((count) => count + 1)} />

        <div className="rounded-[2rem] border border-white/60 bg-white/90 p-6 shadow-panel">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slatebrand-500">
            Question Schema
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-900">
            Stored fields for every document
          </h2>
          <div className="mt-6 space-y-3 text-sm text-slate-700">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
              question
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
              options[4]
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
              correctAnswer
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
              explanation
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
              subject, topic, exam[], tags[], year
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
              diagram URL (optional)
            </div>
          </div>

          <div className="mt-6 rounded-3xl bg-slatebrand-900 p-5 text-sm leading-7 text-slatebrand-100">
            <p className="font-semibold text-white">Database status</p>
            <p className="mt-2">{dbStatus.message}</p>
            <p className="mt-3">
              URI: {dbStatus.maskedUri || "Add MONGODB_URI in .env.local"}
            </p>
            <p className="mt-2">
              Mode: {dbStatus.isAtlas ? "MongoDB Atlas" : "Local / Not configured"}
            </p>
            <p className="mt-4 text-slatebrand-200">
              Paste your Atlas connection string into `.env.local`, restart `npm run dev`, then refresh this page.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}

import Layout from "../components/layout";

const contactReasons = [
  {
    title: "Report a content correction",
    text: "If a formula, explanation, answer, spelling, or link looks wrong, send the page URL and a short note. Clear reports are easier to verify and fix.",
  },
  {
    title: "Suggest a topic",
    text: "If an important ECE topic, PYQ set, or revision resource is missing, share the subject name and what you expected to find.",
  },
  {
    title: "Collaboration or feedback",
    text: "For educational collaboration, improvement ideas, or platform feedback, write with a simple summary of what you want to discuss.",
  },
];

export default function ContactPage() {
  return (
    <Layout
      title="Contact ECE Exam Guide"
      description="Contact ECE Exam Guide for feedback, corrections, collaboration, or support."
    >
      <div className="mx-auto max-w-5xl space-y-5">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-portal-600">Contact</p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
            Tell us what needs attention
          </h1>
          <p className="mt-4 text-base leading-8 text-slate-700">
            ECE Exam Guide is built for students, so corrections and feedback matter. If
            something is unclear, outdated, broken, or missing, use this page to reach out
            with the details.
          </p>
          <div className="mt-6 rounded-2xl border border-portal-100 bg-portal-50/70 p-5">
            <p className="text-sm font-bold text-slate-950">Email</p>
            <a href="mailto:support@eceexamguide.com" className="mt-1 inline-flex text-base font-extrabold text-portal-700 hover:text-portal-800">
              support@eceexamguide.com
            </a>
            <p className="mt-3 text-sm leading-7 text-slate-700">
              When reporting an issue, include the page link, topic name, and what should
              be checked. That small detail saves a lot of review time.
            </p>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          {contactReasons.map((item) => (
            <article key={item.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-base font-extrabold text-slate-950">{item.title}</h2>
              <p className="mt-2 text-sm leading-7 text-slate-600">{item.text}</p>
            </article>
          ))}
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-extrabold text-slate-950">Helpful message format</h2>
          <div className="mt-4 grid gap-3 text-sm leading-7 text-slate-700">
            <p className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              Page URL: the exact page where you found the issue.
            </p>
            <p className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              Topic: the subject or chapter name, such as Network Theorems or Op-Amps.
            </p>
            <p className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              Details: what looks wrong, what is missing, or what would make the page more useful.
            </p>
          </div>
        </section>
      </div>
    </Layout>
  );
}

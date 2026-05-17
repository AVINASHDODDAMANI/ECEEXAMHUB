import Layout from "../components/layout";

const sections = [
  {
    title: "Information used for study features",
    text: "Some preparation features may store progress-like activity in your browser, such as completed topics or saved revision items. This helps the platform remember your study state without asking you to start again each time.",
  },
  {
    title: "Contact messages",
    text: "If you contact us by email, the information you send is used to understand your request, review corrections, or respond to collaboration and support messages.",
  },
  {
    title: "What we do not want to do",
    text: "Student preparation data should not be treated casually. We do not sell student preparation data, and the platform should avoid collecting information that is not needed for learning or support.",
  },
  {
    title: "Future account features",
    text: "If login, subscriptions, or account-based analytics are added later, this policy should be updated with clear details about what is collected, why it is collected, and how users can request changes.",
  },
];

export default function PrivacyPage() {
  return (
    <Layout
      title="Privacy Policy | ECE Exam Guide"
      description="Privacy policy for ECE Exam Guide."
    >
      <section className="mx-auto max-w-5xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-portal-600">Privacy</p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
          Privacy Policy
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-8 text-slate-700">
          ECE Exam Guide is an educational preparation platform. The privacy approach is to
          keep things practical: use only what is needed to run study features, improve the
          experience, and respond to user messages.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {sections.map((item) => (
            <article key={item.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <h2 className="text-base font-extrabold text-slate-950">{item.title}</h2>
              <p className="mt-2 text-sm leading-7 text-slate-700">{item.text}</p>
            </article>
          ))}
        </div>

        <div className="mt-6 rounded-2xl border border-portal-100 bg-portal-50/70 p-5">
          <h2 className="text-base font-extrabold text-slate-950">Privacy questions</h2>
          <p className="mt-2 text-sm leading-7 text-slate-700">
            For privacy-related questions, corrections, or data concerns, contact
            support@eceexamguide.com with a clear subject line.
          </p>
        </div>
      </section>
    </Layout>
  );
}

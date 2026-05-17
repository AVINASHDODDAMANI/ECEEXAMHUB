import Layout from "../components/layout";

const terms = [
  {
    title: "Educational purpose",
    text: "ECE Exam Guide provides study content for learning, revision, and practice. The resources are meant to support preparation, not replace official exam notices, textbooks, or teacher guidance where those are required.",
  },
  {
    title: "Accuracy and official information",
    text: "We try to keep explanations useful and accurate, but students should verify official details such as exam dates, eligibility, syllabus changes, application rules, and results from the relevant exam authority.",
  },
  {
    title: "Responsible use",
    text: "Use the platform for genuine study. Do not misuse pages, interfere with the service, scrape content at scale, or redistribute material in a way that harms the platform or confuses students.",
  },
  {
    title: "Corrections and permissions",
    text: "If you find an error or want permission for a specific educational use, contact support@eceexamguide.com with the page URL and a clear explanation.",
  },
];

export default function TermsPage() {
  return (
    <Layout
      title="Terms of Use | ECE Exam Guide"
      description="Terms of use for ECE Exam Guide."
    >
      <section className="mx-auto max-w-5xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-portal-600">Terms</p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
          Terms of Use
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-8 text-slate-700">
          These terms explain the basic expectations for using ECE Exam Guide. They are
          written in plain language because students should understand what the platform is
          for and what it is not for.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {terms.map((item) => (
            <article key={item.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <h2 className="text-base font-extrabold text-slate-950">{item.title}</h2>
              <p className="mt-2 text-sm leading-7 text-slate-700">{item.text}</p>
            </article>
          ))}
        </div>

        <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-5">
          <h2 className="text-base font-extrabold text-slate-950">Important student note</h2>
          <p className="mt-2 text-sm leading-7 text-slate-700">
            Always cross-check official exam notifications from the official organizing
            body. This site is a preparation guide, not an official exam authority.
          </p>
        </div>
      </section>
    </Layout>
  );
}

import Link from "next/link";
import Layout from "./layout";
import { subjectDirectory } from "../data/subject-directory";
import { buildBreadcrumbList, generateCanonical, SITE_NAME } from "../lib/seo";

function Metric({ label, value }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
      <p className="text-xl font-black tracking-tight text-slate-950">{value}</p>
      <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500">
        {label}
      </p>
    </div>
  );
}

function LinkCard({ label, href }) {
  return (
    <Link
      href={href}
      className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold text-slate-800 transition hover:border-portal-300 hover:bg-white hover:text-portal-700"
    >
      <span>{label}</span>
      <span className="ml-2 text-slate-400" aria-hidden="true">-&gt;</span>
    </Link>
  );
}

export default function SeoLandingPage({ page }) {
  const structuredData = [
    buildBreadcrumbList([
      { name: "Home", item: "/" },
      { name: page.heading, item: page.path },
    ]),
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: page.heading,
      headline: page.title,
      description: page.description,
      url: generateCanonical(page.path),
      publisher: {
        "@type": "EducationalOrganization",
        name: SITE_NAME,
      },
      about: page.sections.map((section) => section.title),
      keywords: page.keywords,
    },
    ...(page.faqs?.length
      ? [
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: page.faqs.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: item.answer,
              },
            })),
          },
        ]
      : []),
  ];

  return (
    <Layout
      title={page.title}
      description={page.description}
      keywords={page.keywords}
      canonicalUrl={page.path}
      structuredData={structuredData}
      pageClassName="py-3 sm:py-4"
    >
      <div className="mx-auto max-w-6xl pb-12">
        <nav
          aria-label="Breadcrumb"
          className="mb-5 flex items-center gap-2.5 border-b border-portal-100 pb-4 pt-1 text-sm text-slate-500"
        >
          <Link href="/" className="font-medium text-portal-600 transition hover:text-portal-700">
            Home
          </Link>
          <span className="text-slate-300" aria-hidden="true">/</span>
          <span className="font-medium text-slate-700">{page.heading}</span>
        </nav>

        <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-panel sm:p-6">
          <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-portal-700">
            {page.eyebrow}
          </p>
          <div className="mt-3 grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start">
            <div>
              <h1 className="text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                {page.heading}
              </h1>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">
                {page.summary}
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href={page.primaryAction.href}
                  className="inline-flex min-h-11 items-center rounded-xl bg-portal-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-portal-700"
                >
                  {page.primaryAction.label}
                </Link>
                <Link
                  href={page.secondaryAction.href}
                  className="inline-flex min-h-11 items-center rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-800 transition hover:bg-slate-50"
                >
                  {page.secondaryAction.label}
                </Link>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              {page.metrics.map((metric) => (
                <Metric key={metric.label} {...metric} />
              ))}
            </div>
          </div>
        </section>

        <section className="mt-5 grid gap-4 md:grid-cols-3">
          {page.sections.map((section) => (
            <article key={section.title} className="rounded-[20px] border border-slate-200 bg-white p-4 shadow-sm">
              <h2 className="text-lg font-black tracking-tight text-slate-950">{section.title}</h2>
              <p className="mt-2 text-sm leading-7 text-slate-600">{section.text}</p>
            </article>
          ))}
        </section>

        <section className="mt-5 rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
          <h2 className="text-xl font-black tracking-tight text-slate-950">
            Fast Study Links
          </h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {page.links.map((item) => (
              <LinkCard key={`${item.href}-${item.label}`} {...item} />
            ))}
          </div>
        </section>

        {page.faqs?.length ? (
          <section className="mt-5 rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
            <h2 className="text-xl font-black tracking-tight text-slate-950">
              Common Searches
            </h2>
            <div className="mt-4 grid gap-3">
              {page.faqs.map((item) => (
                <article key={item.question} className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                  <h3 className="text-sm font-black text-slate-900">{item.question}</h3>
                  <p className="mt-1 text-sm leading-7 text-slate-600">{item.answer}</p>
                </article>
              ))}
            </div>
          </section>
        ) : null}

        <section className="mt-5 rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
          <h2 className="text-xl font-black tracking-tight text-slate-950">
            Notes-Wise ECE Revision
          </h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {subjectDirectory.slice(0, 6).map((subject) => (
              <Link
                key={subject.title}
                href={subject.href}
                className={`rounded-xl border px-4 py-3 transition hover:bg-white ${subject.accent.border} ${subject.accent.bg}`}
              >
                <h3 className={`text-sm font-black ${subject.accent.text}`}>{subject.title}</h3>
                <p className="mt-1 text-xs leading-5 text-slate-600">{subject.description}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
}

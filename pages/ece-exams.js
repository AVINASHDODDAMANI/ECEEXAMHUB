import Link from "next/link";
import Layout from "../components/layout";
import { examGuidePillars, examGuideSections } from "../data/exam-guides";

function ExamIcon({ type }) {
  const common = "h-7 w-7";

  if (type === "gate" || type === "graduation") {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M3.5 9 12 4l8.5 5L12 14 3.5 9Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path
          d="M6.5 11v3.5L12 18l5.5-3.5V11"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (type === "government" || type === "state") {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M4 10h16M6 10V8l6-4 6 4v2M7 20v-6m5 6v-6m5 6v-6M4 20h16"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (type === "industry") {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M4 20V9l6 3V7l6 3V4l4 2v14H4Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (type === "document") {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M8 3h6l5 5v13H8a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path
          d="M14 3v5h5M9 13h6M9 17h4"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (type === "train") {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M8 4h8a4 4 0 0 1 4 4v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V8a4 4 0 0 1 4-4Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path
          d="M8 18 6 21m10-3 2 3M8 9h8M9 13h.01M15 13h.01"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  return (
    <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M8 3h6l5 5v13H8a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path d="M14 3v5h5" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M5.5 14.5 14.5 5.5M8 5.5h6.5V12"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function GuideCard({ title, items, accentText }) {
  return (
    <article className="rounded-[22px] border border-[#e4eaf6] bg-white p-4 shadow-[0_10px_30px_rgba(15,23,42,0.04)] sm:p-5">
      <h3 className={`text-lg font-bold tracking-tight ${accentText}`}>{title}</h3>
      <div className="mt-3 grid gap-3">
        {items.map((item) => (
          <div key={item} className="flex items-start gap-3 text-sm leading-7 text-slate-600 sm:text-[15px]">
            <span className={`mt-2 h-2.5 w-2.5 shrink-0 rounded-full ${accentText.replace("text", "bg")}`} />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </article>
  );
}

function RoadmapStep({ step, index, accent }) {
  return (
    <article className={`rounded-[22px] border ${accent.border} ${accent.soft} p-4 sm:p-5`}>
      <div className="flex items-center justify-between gap-3">
        <span className={`inline-flex h-9 w-9 items-center justify-center rounded-full bg-white text-sm font-bold ${accent.text}`}>
          {index + 1}
        </span>
        <span className="rounded-full border border-white/70 bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-slate-600">
          {step.duration}
        </span>
      </div>
      <h4 className={`mt-4 text-base font-bold ${accent.text} sm:text-lg`}>{step.phase}</h4>
      <div className="mt-3 grid gap-2.5">
        {step.points.map((point) => (
          <p key={point} className="text-sm leading-7 text-slate-700">
            {point}
          </p>
        ))}
      </div>
    </article>
  );
}

export default function EceExamsPage() {
  return (
    <Layout
      title="ECE Exam Guide | Exam Guides"
      description="Exam-wise guidance for ECE aspirants with syllabus focus, eligibility basics, selection stages, cutoff planning, strategy, and roadmaps."
    >
      <div className="mx-auto max-w-[1440px] space-y-6">
        <div className="mb-1 flex items-center gap-2 border-b border-portal-100 pb-4 text-sm text-slate-500">
          <Link href="/" className="font-medium text-portal-600 transition hover:text-portal-700">
            Home
          </Link>
          <span aria-hidden="true">&gt;</span>
          <span className="font-medium text-slate-700">ECE Exams</span>
        </div>

        <section className="overflow-hidden rounded-[30px] border border-[#dbe6f8] bg-white shadow-[0_18px_60px_rgba(17,43,92,0.08)]">
          <div className="bg-[linear-gradient(135deg,#f7fbff_0%,#eef5ff_48%,#f8fbff_100%)] p-5 sm:p-6 lg:p-8">
            <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
              <div className="max-w-4xl">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-portal-600">
                  Strategy Before PYQs
                </p>
                <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                  Use ECE Exams as your guide section. Use Previous Papers only as the PYQ bank.
                </h1>
                <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
                  This page is for exam-wise guidance: syllabus focus, eligibility basics,
                  selection stages, cutoff thinking, strategy, and roadmap. When you want
                  actual year-wise question practice, jump to the Previous Papers library.
                </p>
              </div>

              <div className="flex flex-wrap gap-3 xl:justify-end">
                <Link
                  href="/previous-year"
                  className="inline-flex items-center gap-2 rounded-full border border-portal-200 bg-white px-4 py-2.5 text-sm font-semibold text-portal-700 transition hover:border-portal-300"
                >
                  Open PYQ Bank
                  <ArrowIcon />
                </Link>
                <Link
                  href="#guide-map"
                  className="inline-flex items-center gap-2 rounded-full border border-portal-600 bg-portal-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-portal-700"
                >
                  Explore Guides
                  <ArrowIcon />
                </Link>
              </div>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {examGuidePillars.map((item) => (
                <article
                  key={item.title}
                  className="rounded-[22px] border border-white/80 bg-white/80 p-4 shadow-[0_10px_30px_rgba(15,23,42,0.04)]"
                >
                  <h2 className="text-base font-bold text-slate-900">{item.title}</h2>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="guide-map"
          className="rounded-[28px] border border-[#e2e9f7] bg-white p-5 shadow-[0_18px_60px_rgba(17,43,92,0.06)] sm:p-6"
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-portal-600">
                Exam Map
              </p>
              <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Choose an exam guide first
              </h2>
              <p className="mt-2 text-sm leading-7 text-slate-600">
                Each guide section explains how that exam works before you move into the PYQ library.
              </p>
            </div>
            <span className="rounded-full border border-[#dfe7f6] bg-[#f7faff] px-3 py-1.5 text-xs font-semibold text-portal-700 sm:text-sm">
              {examGuideSections.length} focused guides
            </span>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {examGuideSections.map((exam) => (
              <article
                key={exam.slug}
                className="rounded-[24px] border border-[#e3eaf7] bg-white p-5 shadow-[0_12px_32px_rgba(15,23,42,0.04)] transition hover:-translate-y-0.5 hover:border-portal-300"
              >
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl border ${exam.accent.bg} ${exam.accent.border} ${exam.accent.text}`}
                >
                  <ExamIcon type={exam.icon} />
                </div>
                <p className="mt-4 text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
                  {exam.eyebrow}
                </p>
                <h3 className={`mt-2 text-xl font-bold tracking-tight ${exam.accent.text}`}>
                  {exam.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{exam.shortDescription}</p>
                <div className="mt-4 grid gap-2 text-xs text-slate-500 sm:text-sm">
                  {exam.quickFacts.slice(0, 2).map((fact) => (
                    <p key={`${exam.slug}-${fact.label}`}>
                      <span className="font-semibold text-slate-700">{fact.label}:</span> {fact.value}
                    </p>
                  ))}
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  <Link
                    href={exam.href}
                    className="inline-flex items-center gap-2 rounded-full border border-portal-600 bg-portal-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-portal-700"
                  >
                    Open Guide
                    <ArrowIcon />
                  </Link>
                  <Link
                    href={exam.pyqHref}
                    className="inline-flex items-center gap-2 rounded-full border border-[#dfe7f6] bg-white px-4 py-2 text-sm font-semibold text-portal-700 transition hover:border-portal-300"
                  >
                    PYQs
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        {examGuideSections.map((exam) => (
          <section
            key={exam.slug}
            id={exam.slug}
            className="scroll-mt-32 rounded-[28px] border border-[#e2e9f7] bg-white shadow-[0_18px_60px_rgba(17,43,92,0.06)]"
          >
            <div className="border-b border-[#e9eef8] p-5 sm:p-6">
              <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
                <div className="max-w-4xl">
                  <div className="flex items-center gap-4">
                    <span
                      className={`flex h-14 w-14 items-center justify-center rounded-2xl border ${exam.accent.bg} ${exam.accent.border} ${exam.accent.text}`}
                    >
                      <ExamIcon type={exam.icon} />
                    </span>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
                        {exam.eyebrow}
                      </p>
                      <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                        {exam.title}
                      </h2>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
                    {exam.summary}
                  </p>
                </div>

                <div className="flex flex-wrap gap-3 xl:justify-end">
                  <Link
                    href={exam.pyqHref}
                    className="inline-flex items-center gap-2 rounded-full border border-portal-600 bg-portal-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-portal-700"
                  >
                    Open PYQs
                    <ArrowIcon />
                  </Link>
                  <Link
                    href="#guide-map"
                    className="inline-flex items-center gap-2 rounded-full border border-[#dfe7f6] bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-portal-300 hover:text-portal-700"
                  >
                    Back to guide map
                  </Link>
                </div>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {exam.quickFacts.map((fact) => (
                  <article
                    key={`${exam.slug}-${fact.label}`}
                    className={`rounded-[22px] border ${exam.accent.border} ${exam.accent.soft} p-4`}
                  >
                    <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500">
                      {fact.label}
                    </p>
                    <p className="mt-2 text-sm font-semibold leading-6 text-slate-800">
                      {fact.value}
                    </p>
                  </article>
                ))}
              </div>
            </div>

            <div className="p-5 sm:p-6">
              <div className="grid gap-4 xl:grid-cols-2">
                <GuideCard
                  title="Syllabus Focus"
                  items={exam.syllabus}
                  accentText={exam.accent.text}
                />
                <GuideCard
                  title="Eligibility Basics"
                  items={exam.eligibility}
                  accentText={exam.accent.text}
                />
                <GuideCard
                  title="Selection Process"
                  items={exam.selectionProcess}
                  accentText={exam.accent.text}
                />
                <GuideCard
                  title="Cutoff Lens"
                  items={exam.cutoffLens}
                  accentText={exam.accent.text}
                />
              </div>

              <div className="mt-4 grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
                <GuideCard
                  title="Preparation Strategy"
                  items={exam.strategy}
                  accentText={exam.accent.text}
                />

                <article className={`rounded-[22px] border ${exam.accent.border} ${exam.accent.soft} p-5`}>
                  <h3 className={`text-lg font-bold tracking-tight ${exam.accent.text}`}>
                    Official Reminder
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-700">{exam.officialNote}</p>
                  <div className="mt-5 rounded-2xl border border-white/80 bg-white/80 p-4">
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
                      Best workflow
                    </p>
                    <div className="mt-3 grid gap-2 text-sm leading-7 text-slate-700">
                      <p>1. Read the guide and lock your target exam first.</p>
                      <p>2. Build notes and topic revision around the guide sections.</p>
                      <p>3. Open Previous Papers only when you are ready for PYQ drilling.</p>
                    </div>
                  </div>
                </article>
              </div>

              <div className="mt-6">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-portal-600">
                      Roadmap
                    </p>
                    <h3 className="mt-1 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
                      A practical preparation sequence for {exam.title}
                    </h3>
                  </div>
                  <Link
                    href={exam.pyqHref}
                    className="text-sm font-semibold text-portal-700 transition hover:text-portal-800"
                  >
                    When ready, continue into the PYQ bank
                  </Link>
                </div>

                <div className="mt-4 grid gap-4 lg:grid-cols-2 2xl:grid-cols-4">
                  {exam.roadmap.map((step, index) => (
                    <RoadmapStep
                      key={`${exam.slug}-${step.phase}`}
                      step={step}
                      index={index}
                      accent={exam.accent}
                    />
                  ))}
                </div>
              </div>
            </div>
          </section>
        ))}

        <section className="rounded-[24px] border border-[#f5dfae] bg-[#fffaf0] p-5 sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#f59f0b]">
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M12 4v9m0 4h.01M4.93 19.07l14.14-14.14"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            <div>
              <h2 className="text-xl font-bold tracking-tight text-slate-900">
                Final note before you apply
              </h2>
              <p className="mt-2 text-sm leading-7 text-slate-700 sm:text-base sm:leading-8">
                This page is designed to help you choose and prepare intelligently, but
                eligibility, paper structure, vacancies, age rules, and cutoffs can change
                across cycles. Always verify the latest official notification before relying on
                any exam for applications or career decisions.
              </p>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}

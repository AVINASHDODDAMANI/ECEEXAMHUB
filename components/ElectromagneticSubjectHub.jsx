import Link from "next/link";

function SectionTitle({ eyebrow, title, description }) {
  return (
    <div>
      <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-portal-700">
        {eyebrow}
      </p>
      <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">
          {description}
        </p>
      ) : null}
    </div>
  );
}

function MiniStat({ label, value }) {
  return (
    <div className="rounded-2xl border border-white/15 bg-white/10 px-4 py-4 backdrop-blur">
      <p className="text-2xl font-extrabold text-white">{value}</p>
      <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.14em] text-cyan-100/85">
        {label}
      </p>
    </div>
  );
}

function ActionCard({ title, description, href, tone = "default" }) {
  const toneClassName =
    tone === "primary"
      ? "border-portal-300 bg-portal-700 text-white"
      : tone === "accent"
      ? "border-cyan-200 bg-cyan-50 text-slate-950"
      : "border-slate-200 bg-white text-slate-950";

  const descriptionClassName =
    tone === "primary" ? "text-blue-50" : "text-slate-600";

  return (
    <Link
      href={href}
      className={`rounded-[26px] border p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${toneClassName}`}
    >
      <h3 className="text-lg font-extrabold tracking-tight">{title}</h3>
      <p className={`mt-2 text-sm leading-6 ${descriptionClassName}`}>{description}</p>
    </Link>
  );
}

export default function ElectromagneticSubjectHub({
  subject,
  chapterMeta,
  steps = [],
  concepts = [],
  learningTopics = [],
  notesHref,
  completionPercent = 0,
  completedTopics = 0,
  readyTopics = 0,
}) {
  const formulaPreview = concepts
    .flatMap((concept) =>
      (concept.formulas || []).slice(0, 1).map((formula) => ({
        ...formula,
        conceptTitle: concept.shortTitle || concept.title,
      }))
    )
    .slice(0, 4);

  const featuredTopics = learningTopics.slice(0, 6);
  const examFocus = chapterMeta.examFocus || [];
  const keyConcepts = chapterMeta.keyConcepts || [];
  const quickActions = [
    {
      title: "Start EMFT Learning Path",
      description: "Open the guided topic sequence and move from vector calculus to waves with a clear next step.",
      href: learningTopics[0]?.href || "/learn/electromagnetics/electromagnetic-basics",
      tone: "primary",
    },
    {
      title: "Open EMFT Quick Notes",
      description: "Use chapter-wise notes when you need fast revision before class tests, internals, or semester exams.",
      href: notesHref,
      tone: "default",
    },
    {
      title: "Practice EMFT Questions",
      description: "Jump into practice and previous patterns when you want to test formula recall and concept application.",
      href: `/practice?search=${encodeURIComponent(subject.search)}`,
      tone: "accent",
    },
  ];

  return (
    <div className="mt-5 grid gap-6">
      <section className="overflow-hidden rounded-[32px] border border-slate-200 bg-[linear-gradient(140deg,#08203f_0%,#144f8f_42%,#0f766e_100%)] text-white shadow-[0_24px_80px_rgba(15,23,42,0.2)]">
        <div className="grid gap-8 px-5 py-6 sm:px-6 sm:py-8 xl:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]">
          <div>
            <p className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.18em] text-cyan-100">
              Gold-standard subject hub
            </p>
            <h2 className="mt-5 max-w-4xl text-3xl font-extrabold tracking-tight sm:text-5xl">
              Master {subject.title} without getting lost in formulas.
            </h2>
            <p className="mt-4 max-w-3xl text-sm leading-8 text-blue-50/92 sm:text-base">
              This subject hub is built for how Indian ECE students actually prepare:
              understand the physical picture, find the repeated exam patterns, and
              revise the highest-value chapters in the right order.
            </p>

            <div className="mt-7 grid gap-3 sm:grid-cols-4">
              <MiniStat label="Ready topics" value={readyTopics} />
              <MiniStat label="Completed" value={completedTopics} />
              <MiniStat label="Progress" value={`${completionPercent}%`} />
              <MiniStat label="Difficulty" value={chapterMeta.difficulty} />
            </div>
          </div>

          <div className="rounded-[28px] border border-white/14 bg-white/10 p-5 backdrop-blur">
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-cyan-100">
              Why this page is different
            </p>
            <div className="mt-4 grid gap-3">
              {[
                "Vector calculus, electrostatics, Maxwell equations, and wave propagation are connected as one study flow.",
                "Quick actions take you straight into learning, quick notes, and practice instead of making you hunt across the site.",
                "Formula preview and topic selection help you identify what to revise before the next exam or mock.",
              ].map((item) => (
                <div key={item} className="rounded-2xl bg-slate-950/18 px-4 py-3 text-sm leading-6 text-blue-50">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        {quickActions.map((item) => (
          <ActionCard
            key={item.title}
            title={item.title}
            description={item.description}
            href={item.href}
            tone={item.tone}
          />
        ))}
      </section>

      <section className="rounded-[30px] border border-slate-200 bg-white p-5 shadow-panel sm:p-6">
        <SectionTitle
          eyebrow="Study roadmap"
          title="Follow the exact EMFT order that makes later chapters easier."
          description="Electromagnetic Theory becomes much more manageable when you learn it as a chain instead of disconnected formulas."
        />

        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          {steps.map((step, index) => (
            <article
              key={step.title}
              className="rounded-[26px] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] p-5"
            >
              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 flex-none items-center justify-center rounded-2xl bg-portal-700 text-sm font-extrabold text-white">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-lg font-extrabold tracking-tight text-slate-950">
                    {step.title}
                  </h3>
                  <ul className="mt-3 grid gap-2 text-sm leading-6 text-slate-700">
                    {step.points.map((point) => (
                      <li key={point} className="flex gap-2">
                        <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-portal-600" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
        <div className="rounded-[30px] border border-slate-200 bg-white p-5 shadow-panel sm:p-6">
          <SectionTitle
            eyebrow="Topic map"
            title="Start with the topics that build the entire subject."
            description="These are the best entry points when you want a strong EMFT foundation that also helps with questions later."
          />

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {featuredTopics.map((topic, index) => (
              <Link
                key={topic.slug}
                href={topic.href}
                className="rounded-[24px] border border-slate-200 bg-slate-50/80 p-4 transition hover:border-portal-300 hover:bg-portal-50"
              >
                <div className="flex items-start gap-3">
                  <span className="flex h-9 w-9 flex-none items-center justify-center rounded-xl bg-white text-xs font-extrabold text-portal-700 shadow-sm">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500">
                      {topic.chapterTitle}
                    </p>
                    <h3 className="mt-1 text-base font-extrabold text-slate-950">
                      {topic.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{topic.summary}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="grid gap-6">
          <section className="rounded-[30px] border border-slate-200 bg-white p-5 shadow-panel">
            <SectionTitle
              eyebrow="Formula preview"
              title="High-value relations worth revising often"
            />
            <div className="mt-5 grid gap-3">
              {formulaPreview.map((formula) => (
                <article
                  key={`${formula.conceptTitle}-${formula.label}`}
                  className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4"
                >
                  <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500">
                    {formula.conceptTitle}
                  </p>
                  <h3 className="mt-1 text-sm font-extrabold text-slate-950">{formula.label}</h3>
                  <p className="mt-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-extrabold text-slate-950">
                    {formula.expression}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{formula.note}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-[30px] border border-slate-200 bg-white p-5 shadow-panel">
            <SectionTitle
              eyebrow="Exam focus"
              title="What usually decides marks"
            />
            <ul className="mt-5 grid gap-2 text-sm leading-6 text-slate-700">
              {examFocus.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-emerald-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-5 rounded-2xl border border-orange-200 bg-orange-50 p-4">
              <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-orange-700">
                Study tip
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-700">{chapterMeta.studyTip}</p>
            </div>
          </section>
        </div>
      </section>

      <section className="rounded-[30px] border border-slate-200 bg-white p-5 shadow-panel sm:p-6">
        <SectionTitle
          eyebrow="What to remember"
          title="The key ideas that should stay visible while you study"
        />
        <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {keyConcepts.map((item) => (
            <div
              key={item}
              className="rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-4 text-sm font-semibold text-slate-700"
            >
              {item}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

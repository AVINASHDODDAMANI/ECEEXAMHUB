function normalizeText(value = "") {
  return String(value)
    .toLowerCase()
    .replace(/['']/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function slugify(value = "") {
  return normalizeText(value).replace(/\s+/g, "-");
}

function findSubtopicTarget(label = "") {
  const normalizedLabel = normalizeText(label);
  const directTarget = document.getElementById(slugify(label));

  if (directTarget) {
    return directTarget;
  }

  const headings = Array.from(document.querySelectorAll("h2, h3, h4"));
  const matchedHeading =
    headings.find((heading) => normalizeText(heading.textContent) === normalizedLabel) ||
    headings.find((heading) => normalizeText(heading.textContent).includes(normalizedLabel)) ||
    headings.find((heading) => normalizedLabel.includes(normalizeText(heading.textContent)));

  return (
    matchedHeading ||
    document.getElementById("theory") ||
    document.getElementById("core-theory") ||
    document.getElementById("introduction")
  );
}

export default function LearningTopicNavigationMenus({ topic, mode = "subtopics" }) {
  const subtopics = Array.isArray(topic?.subtopics) ? topic.subtopics.filter(Boolean) : [];

  if (!subtopics.length || mode !== "subtopics") {
    return null;
  }

  function jumpToSubtopic(event, subtopic) {
    const target = findSubtopicTarget(subtopic);

    if (!target) {
      return;
    }

    event.preventDefault();
    const top = target.getBoundingClientRect().top + window.scrollY - 96;
    window.scrollTo({ top: Math.max(top, 0), left: 0, behavior: "auto" });

    if (target.id) {
      window.history.replaceState(null, "", `#${target.id}`);
    }
  }

  const title = topic.shortTitle || topic.title || "Topic";

  return (
    <section
      aria-labelledby={`${slugify(title)}-subtopic-title`}
      className="mt-3 w-full basis-full rounded-xl border border-emerald-200 bg-emerald-50/35 px-4 py-5 sm:px-5"
    >
      <div className="flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-emerald-700 shadow-sm">
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M9 5h9M9 12h9M9 19h9M5 5h.01M5 12h.01M5 19h.01"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <div>
          <p className="text-[11px] font-black uppercase tracking-[0.14em] text-emerald-700">
            {title} Path
          </p>
          <h2 id={`${slugify(title)}-subtopic-title`} className="text-2xl font-black tracking-tight text-emerald-800">
            Table of Contents
          </h2>
        </div>
      </div>

      <nav aria-label={`${title} subtopic links`} className="mt-5 grid gap-x-7 gap-y-0 sm:grid-cols-2 lg:grid-cols-3">
        {subtopics.map((subtopic, index) => (
          <a
            key={`${topic.slug || title}-${subtopic}`}
            href={`#${slugify(subtopic)}`}
            onClick={(event) => jumpToSubtopic(event, subtopic)}
            className="group flex min-h-[58px] items-center gap-3 border-b border-emerald-100 py-3 text-left"
          >
            <span className="flex h-8 w-8 flex-none items-center justify-center rounded-md bg-emerald-600 text-sm font-black text-white transition group-hover:bg-emerald-700">
              {index + 1}
            </span>
            <span className="text-sm font-black leading-5 text-emerald-700 transition group-hover:text-emerald-900">
              {subtopic}
            </span>
          </a>
        ))}
      </nav>
    </section>
  );
}

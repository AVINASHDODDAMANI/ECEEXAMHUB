export function BrandMark({
  className = "",
  alt = "ECEExamGuide logo mark",
}) {
  return (
    <img
      src="/favicon-v4-192x192.png"
      alt={alt}
      width="48"
      height="48"
      className={className}
      decoding="async"
      loading="eager"
      draggable="false"
    />
  );
}

export function BrandLogo({
  className = "",
  markClassName = "",
  titleClassName = "",
  taglineClassName = "",
  showTagline = true,
}) {
  return (
    <div className={`flex min-w-0 items-center gap-2.5 sm:gap-3 ${className}`.trim()}>
      <BrandMark className={`h-12 w-12 shrink-0 ${markClassName}`.trim()} />

      <div className="min-w-0">
        <p
          className={`font-extrabold leading-[0.95] tracking-tight sm:whitespace-nowrap ${titleClassName}`.trim()}
        >
          <span className="text-[#0d2a66]">ECE</span>
          <span className="text-[#ff6b00]">Exam</span>
          <span className="text-[#0d2a66]">Guide</span>
        </p>

        {showTagline ? (
          <p
            className={`mt-1 hidden truncate font-semibold uppercase tracking-[0.16em] text-[#20386f] sm:block ${taglineClassName}`.trim()}
          >
            ECEExamGuide for Quick Notes, PYQs &amp; Revision
          </p>
        ) : null}
      </div>
    </div>
  );
}

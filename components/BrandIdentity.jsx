export function BrandMark({
  className = "",
  alt = "ECE Exam Guide logo mark",
}) {
  return (
    <img
      src="/brand/ece-exam-guide-mark-v2.svg"
      alt={alt}
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
          <span className="text-[#0d2a66]">ECE </span>
          <span className="text-[#ff6b00]">EXAM </span>
          <span className="text-[#0d2a66]">GUIDE</span>
        </p>

        {showTagline ? (
          <p
            className={`mt-1 hidden truncate font-semibold uppercase tracking-[0.16em] text-[#20386f] sm:block ${taglineClassName}`.trim()}
          >
            ECE Preparation, PYQs &amp; Revision Resources
          </p>
        ) : null}
      </div>
    </div>
  );
}

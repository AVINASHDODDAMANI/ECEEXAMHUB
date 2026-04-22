export default function PageBanner({
  eyebrow,
  title,
  description,
  metrics = [],
}) {
  return (
    <section className="rounded-[1rem] border border-blue-200/20 bg-[linear-gradient(135deg,#1b53d1_0%,#2b66e4_40%,#1743b0_100%)] px-4 py-3.5 text-white shadow-[0_20px_46px_rgba(23,67,176,0.22)] sm:px-5">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-3xl">
          {eyebrow ? (
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-blue-100">
              {eyebrow}
            </p>
          ) : null}
          <h1 className="mt-1 text-lg font-semibold tracking-tight text-white sm:text-xl">{title}</h1>
          {description ? (
            <p className="mt-1.5 max-w-2xl text-sm leading-5 text-blue-50">{description}</p>
          ) : null}
        </div>

        {metrics.length ? (
          <div className="grid gap-2 sm:grid-cols-3">
            {metrics.map((item) => (
              <div
                key={item.label}
                className="rounded-lg border border-white/15 bg-white/10 px-3 py-1.5"
              >
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-blue-100">
                  {item.label}
                </p>
                <p className="mt-0.5 text-base font-semibold text-white">{item.value}</p>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}

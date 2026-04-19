export default function PageBanner({
  eyebrow,
  title,
  description,
  metrics = [],
}) {
  return (
    <section className="rounded-[1.8rem] border border-blue-200/20 bg-[linear-gradient(135deg,#1b53d1_0%,#2b66e4_40%,#1743b0_100%)] px-5 py-6 text-white shadow-[0_20px_46px_rgba(23,67,176,0.22)] sm:px-6">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          {eyebrow ? (
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-blue-100">
              {eyebrow}
            </p>
          ) : null}
          <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">{title}</h1>
          {description ? (
            <p className="mt-3 max-w-2xl text-sm leading-6 text-blue-50">{description}</p>
          ) : null}
        </div>

        {metrics.length ? (
          <div className="grid gap-3 sm:grid-cols-3">
            {metrics.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur-sm"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-blue-100">
                  {item.label}
                </p>
                <p className="mt-1 text-xl font-bold text-white">{item.value}</p>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}

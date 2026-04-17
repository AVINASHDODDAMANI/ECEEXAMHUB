export default function Navbar({ searchValue, onSearchChange }) {
  return (
    <header className="sticky top-0 z-20 border-b border-white/60 bg-white/85 backdrop-blur">
      <div className="flex flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slatebrand-500">
            Exam Practice Dashboard
          </p>
          <h1 className="mt-1 text-2xl font-semibold text-slatebrand-900">
            ECEExamHub
          </h1>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 shadow-sm">
            <input
              value={searchValue}
              onChange={(event) => onSearchChange?.(event.target.value)}
              placeholder="Search by topic, subject, or keyword"
              className="w-full min-w-0 bg-transparent text-sm text-slate-700 outline-none sm:w-72"
            />
          </div>
          <div className="rounded-2xl bg-slatebrand-900 px-4 py-3 text-sm font-medium text-white shadow-panel">
            Target Exams: GATE, ISRO, BEL, BARC
          </div>
        </div>
      </div>
    </header>
  );
}

import { useRouter } from "next/router";

export default function CompactHeader({ title = "Practice" }) {
  const router = useRouter();

  return (
    <div className="sticky top-0 z-40 border-b border-slate-800/80 bg-slate-950/95 backdrop-blur-sm">
      <div className="mx-auto flex h-[56px] max-w-[1280px] items-center justify-between px-4 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={() => router.back()}
          className="inline-flex h-9 items-center justify-center rounded-lg border border-slate-700/80 bg-slate-900/95 px-3 text-sm font-medium text-slate-100 transition hover:border-slate-500 hover:bg-slate-800"
        >
          ← Back
        </button>
        <p className="text-sm font-medium text-slate-100">
          {title}
        </p>
        <div className="w-16" />
      </div>
    </div>
  );
}

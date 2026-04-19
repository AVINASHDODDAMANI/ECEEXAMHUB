import { useRouter } from "next/router";

export default function CompactHeader({ title = "Practice" }) {
  const router = useRouter();

  return (
    <div className="sticky top-0 z-40 border-b border-blue-200/20 bg-[linear-gradient(180deg,#1743b0_0%,#123792_100%)] backdrop-blur-sm">
      <div className="mx-auto flex h-[54px] max-w-[1280px] items-center justify-between px-4 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={() => router.back()}
          className="inline-flex h-8 items-center justify-center rounded-lg border border-white/20 bg-white/10 px-3 text-sm font-medium text-white transition hover:bg-white/20"
        >
          ← Back
        </button>
        <p className="text-sm font-medium text-white">{title}</p>
        <div className="w-16" />
      </div>
    </div>
  );
}

import Link from "next/link";
import EceIQChallenge from "../components/ece-iq/EceIQChallenge";
import Layout from "../components/layout";

export default function EceIQChallengePage() {
  return (
    <Layout
      title="ECE IQ Challenge | Engineering Brain Games"
      description="Play circuit, logic gate, signal, aptitude, network, and memory challenges built for Electronics and Communication Engineering students."
      canonicalUrl="/ece-iq-challenge"
      keywords="ECE IQ challenge, electronics engineering games, circuit puzzles, logic gate quiz, GATE aptitude"
      showAds={false}
      onSearchChange={undefined}
      pageClassName="py-3 sm:py-5"
    >
      <nav aria-label="Breadcrumb" className="mb-4 flex items-center gap-2 text-xs font-semibold text-slate-500">
        <Link href="/" className="transition hover:text-portal-700">Home</Link>
        <span aria-hidden="true">/</span>
        <Link href="/practice" className="transition hover:text-portal-700">Practice</Link>
        <span aria-hidden="true">/</span>
        <span className="text-slate-700">ECE IQ Challenge</span>
      </nav>
      <EceIQChallenge />
    </Layout>
  );
}

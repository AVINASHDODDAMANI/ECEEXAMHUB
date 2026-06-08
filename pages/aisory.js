import Layout from "../components/layout";

export default function AisoryPage() {
  return (
    <Layout
      title="Aisory | ECE Exam Guide"
      description="Aisory section for focused ECE learning support, study tools, and exam preparation updates."
      pageClassName="py-4 sm:py-6"
    >
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-panel sm:p-8">
          <p className="text-sm font-extrabold uppercase tracking-[0.12em] text-[#ff7417]">
            Aisory
          </p>
          <h1 className="mt-3 text-3xl font-black leading-tight text-slate-950 sm:text-4xl">
            Aisory Learning Support
          </h1>
          <p className="mt-4 max-w-3xl text-base font-medium leading-7 text-slate-700">
            A dedicated space for smart study guidance, useful learning tools, and future updates for ECE exam preparation.
          </p>
        </div>
      </section>
    </Layout>
  );
}

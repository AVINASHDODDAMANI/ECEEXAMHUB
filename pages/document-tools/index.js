import Link from "next/link";
import { useMemo, useState } from "react";
import DocumentToolPage, { DocumentToolCard } from "../../components/DocumentToolPage";
import Layout from "../../components/layout";
import { DOCUMENT_TOOL_CATEGORIES, documentTools } from "../../data/document-tools";
import { SITE_URL, buildBreadcrumbList } from "../../lib/seo";

function DocumentToolsHomeStructuredData() {
  return [
    buildBreadcrumbList([
      { name: "Home", item: "/" },
      { name: "Document Tools", item: "/document-tools" },
    ]),
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Document Tools",
      url: `${SITE_URL}/document-tools`,
      description:
        "Free document tools for converting, organizing, compressing, and extracting PDF, image, Word, Excel, PowerPoint, OCR, and text files.",
      isPartOf: {
        "@id": `${SITE_URL}/#website`,
      },
    },
  ];
}

function normalizeSearch(value = "") {
  return String(value).toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

export default function DocumentToolsIndexPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Popular");
  const normalizedQuery = normalizeSearch(query);

  const filteredTools = useMemo(() => {
    return documentTools.filter((tool) => {
      const matchesCategory =
        category === "Popular"
          ? ["enabled", "planned"].includes(tool.status)
          : tool.category === category;
      const haystack = normalizeSearch(
        `${tool.name} ${tool.shortName} ${tool.category} ${tool.acceptedFormats.join(" ")} ${tool.outputFormat}`
      );
      const matchesSearch = !normalizedQuery || haystack.includes(normalizedQuery);

      return matchesCategory && matchesSearch;
    });
  }, [category, normalizedQuery]);

  return (
    <Layout
      title="Document Tools Online | PDF, Image, Word, Excel and OCR Tools"
      description="Use ECEExamGuide Document Tools to convert JPG to PDF, organize PDFs, extract text, and prepare document files with private temporary processing and mobile-friendly uploads."
      keywords="document tools, PDF tools, JPG to PDF, PDF converter, image to PDF, merge PDF, split PDF, OCR online, Word to PDF, Excel to PDF"
      canonicalUrl="/document-tools"
      structuredData={DocumentToolsHomeStructuredData()}
      pageClassName="py-3 sm:py-4"
    >
      <div className="document-tools-shell mx-auto max-w-[1180px]">
        <nav aria-label="Breadcrumb" className="mb-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-4 py-2 text-sm text-slate-600 shadow-sm">
          <Link href="/" className="font-semibold text-portal-600 hover:text-[#ff7417]">Home</Link>
          <span aria-hidden="true">/</span>
          <span className="font-bold text-slate-800">Document Tools</span>
        </nav>

        <header className="rounded-lg border border-[#dfe6f1] bg-white p-5 shadow-[0_12px_30px_rgba(15,23,42,0.055)] sm:p-6">
          <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#ff7417]">PDF and file converters</p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-[#071d49] sm:text-4xl">
            Document Tools
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">
            Convert, organize, and prepare documents with a simple upload, automatic processing, preview, and download flow. Start with JPG/PNG to PDF today; heavier Office, OCR, compression, and raster tools are mapped to the same secure worker architecture for deployment.
          </p>

          <div className="mt-5 grid gap-3 lg:grid-cols-[minmax(0,1fr)_auto]">
            <label className="flex min-h-12 items-center gap-3 rounded-lg border border-slate-200 bg-slate-50/80 px-4">
              <span className="text-[#071d49]" aria-hidden="true">Search</span>
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search PDF, JPG, Word, OCR..."
                className="min-w-0 flex-1 border-0 bg-transparent text-sm font-semibold text-slate-800 outline-none placeholder:text-slate-400"
              />
            </label>
            <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {DOCUMENT_TOOL_CATEGORIES.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setCategory(item)}
                  className={`min-h-12 flex-none rounded-md border px-4 text-sm font-extrabold transition ${
                    category === item
                      ? "border-[#061b4f] bg-[#061b4f] text-white"
                      : "border-slate-200 bg-white text-[#071d49] hover:border-[#ff7417]"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </header>

        <section className="mt-5">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-2xl font-extrabold text-[#071d49]">Choose a tool</h2>
            <p className="text-sm font-bold text-slate-500">{filteredTools.length} tools</p>
          </div>

          {filteredTools.length ? (
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredTools.map((tool) => (
                <DocumentToolCard key={tool.slug} tool={tool} />
              ))}
            </div>
          ) : (
            <div className="document-tools-card mt-4 rounded-lg border border-slate-200 bg-white p-5 text-sm font-semibold text-slate-600">
              No tools match your search. Try PDF, JPG, Word, OCR, merge, split, or compress.
            </div>
          )}
        </section>

        <section className="mt-6 grid gap-4 lg:grid-cols-3">
          {[
            ["Automatic processing", "Every tool is designed for upload, process, preview, and download without manual handling."],
            ["Temporary files", "Uploads are validated, placed in safe temporary folders, and removed after processing."],
            ["Search intent pages", "Each converter has its own useful page with matching title, description, H1, FAQ schema, and internal links."],
          ].map(([title, text]) => (
            <div key={title} className="document-tools-card rounded-lg border border-[#dfe6f1] bg-white p-4 shadow-[0_8px_20px_rgba(15,23,42,0.04)]">
              <h2 className="text-lg font-extrabold text-[#071d49]">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
            </div>
          ))}
        </section>
      </div>
    </Layout>
  );
}

export { DocumentToolPage };

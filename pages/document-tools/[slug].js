import DocumentToolPage from "../../components/DocumentToolPage";
import Layout from "../../components/layout";
import { documentTools, getDocumentTool } from "../../data/document-tools";
import { SITE_URL, buildBreadcrumbList } from "../../lib/seo";

function buildToolStructuredData(tool) {
  const toolUrl = `${SITE_URL}/document-tools/${tool.slug}`;

  return [
    buildBreadcrumbList([
      { name: "Home", item: "/" },
      { name: "Document Tools", item: "/document-tools" },
      { name: tool.name, item: `/document-tools/${tool.slug}` },
    ]),
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: tool.name,
      url: toolUrl,
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "Any",
      browserRequirements: "Requires JavaScript and a modern browser.",
      isAccessibleForFree: true,
      description: tool.metaDescription,
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: `How do I use the ${tool.name} tool?`,
          acceptedAnswer: {
            "@type": "Answer",
            text: `Upload a supported file, press Process, preview the result when available, and download the converted ${tool.outputFormat} file.`,
          },
        },
        {
          "@type": "Question",
          name: "Are uploaded files stored permanently?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. Files are processed automatically in a temporary workspace and deleted after completion by default.",
          },
        },
        {
          "@type": "Question",
          name: `What file formats does ${tool.name} accept?`,
          acceptedAnswer: {
            "@type": "Answer",
            text: `${tool.name} accepts ${tool.acceptedFormats.join(", ")} files. The current limit is ${tool.limitLabel}.`,
          },
        },
      ],
    },
  ];
}

export async function getStaticPaths() {
  return {
    paths: documentTools.map((tool) => ({
      params: { slug: tool.slug },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const tool = getDocumentTool(params.slug);

  if (!tool) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      tool,
    },
  };
}

export default function DocumentToolSlugPage({ tool }) {
  return (
    <Layout
      title={tool.title}
      description={tool.metaDescription}
      keywords={`${tool.name}, ${tool.shortName}, document tools, PDF converter, online file converter, ${tool.acceptedFormats.join(", ")}`}
      canonicalUrl={`/document-tools/${tool.slug}`}
      structuredData={buildToolStructuredData(tool)}
      pageClassName="py-3 sm:py-4"
    >
      <DocumentToolPage tool={tool} />
    </Layout>
  );
}

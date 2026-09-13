export const DOCUMENT_TOOL_MAX_FILE_BYTES = 10 * 1024 * 1024;

export const DOCUMENT_TOOL_CATEGORIES = [
  "Popular",
  "PDF",
  "Images",
  "Office",
  "Text",
];

export const documentTools = [
  {
    slug: "word-to-pdf",
    name: "Word to PDF",
    shortName: "Word -> PDF",
    category: "Office",
    status: "requires-service",
    acceptedFormats: [".doc", ".docx"],
    outputFormat: "PDF",
    limitLabel: "10 MB per file",
    title: "Word to PDF Converter Online",
    metaDescription:
      "Convert Word documents to PDF with a simple upload, automatic processing, and private temporary file handling.",
    intro:
      "Convert DOC and DOCX files into clean PDF documents while preserving document layout as closely as the processing backend allows.",
    backendNote:
      "Needs LibreOffice headless or a compatible document conversion worker.",
  },
  {
    slug: "pdf-to-word",
    name: "PDF to Word",
    shortName: "PDF -> Word",
    category: "Office",
    status: "requires-service",
    acceptedFormats: [".pdf"],
    outputFormat: "DOCX",
    limitLabel: "10 MB per file",
    title: "PDF to Word Converter Online",
    metaDescription:
      "Convert PDF files to editable Word documents with automatic processing and temporary file cleanup.",
    intro:
      "Turn PDFs into editable Word files for quick corrections, reuse, or formatting updates.",
    backendNote:
      "Needs a PDF-to-DOCX engine such as LibreOffice, Poppler-assisted conversion, or a dedicated worker.",
  },
  {
    slug: "jpg-to-pdf",
    name: "JPG/PNG to PDF",
    shortName: "JPG/PNG -> PDF",
    category: "Images",
    status: "enabled",
    acceptedFormats: [".jpg", ".jpeg", ".png"],
    outputFormat: "PDF",
    limitLabel: "10 MB per image, up to 12 images",
    title: "JPG to PDF Converter Online",
    metaDescription:
      "Convert JPG and PNG images into a PDF online. Upload images, preview the result, download instantly, and files are deleted after processing.",
    intro:
      "Upload JPG or PNG images and combine them into a neat PDF. Each image is placed on its own PDF page with margins for easy sharing and printing.",
    related: ["pdf-to-jpg", "merge-pdf", "compress-pdf"],
  },
  {
    slug: "pdf-to-jpg",
    name: "PDF to JPG/PNG",
    shortName: "PDF -> JPG/PNG",
    category: "Images",
    status: "requires-service",
    acceptedFormats: [".pdf"],
    outputFormat: "JPG or PNG",
    limitLabel: "10 MB per file",
    title: "PDF to JPG Converter Online",
    metaDescription:
      "Convert PDF pages to JPG or PNG images with automatic processing and temporary file deletion.",
    intro:
      "Export PDF pages as image files for sharing, screenshots, thumbnails, or quick visual review.",
    backendNote:
      "Needs Poppler, Ghostscript, ImageMagick, or another rasterization worker.",
    related: ["jpg-to-pdf", "split-pdf", "extract-delete-reorder-pdf-pages"],
  },
  {
    slug: "merge-pdf",
    name: "Merge PDF",
    shortName: "Merge PDF",
    category: "PDF",
    status: "planned",
    acceptedFormats: [".pdf"],
    outputFormat: "PDF",
    limitLabel: "10 MB per PDF, up to 12 PDFs",
    title: "Merge PDF Online",
    metaDescription:
      "Merge multiple PDF files into one organized document with automatic temporary processing.",
    intro:
      "Combine multiple PDFs into a single file in the order you choose.",
    related: ["split-pdf", "compress-pdf", "extract-delete-reorder-pdf-pages"],
  },
  {
    slug: "split-pdf",
    name: "Split PDF",
    shortName: "Split PDF",
    category: "PDF",
    status: "planned",
    acceptedFormats: [".pdf"],
    outputFormat: "PDF or ZIP",
    limitLabel: "10 MB per file",
    title: "Split PDF Online",
    metaDescription:
      "Split a PDF into selected pages or smaller documents with simple automatic processing.",
    intro:
      "Extract page ranges from a PDF so you can keep only the pages you need.",
    related: ["merge-pdf", "extract-delete-reorder-pdf-pages", "rotate-pdf"],
  },
  {
    slug: "compress-pdf",
    name: "Compress PDF",
    shortName: "Compress PDF",
    category: "PDF",
    status: "requires-service",
    acceptedFormats: [".pdf"],
    outputFormat: "PDF",
    limitLabel: "10 MB per file",
    title: "Compress PDF Online",
    metaDescription:
      "Reduce PDF file size for uploads, forms, and email with automatic compression and cleanup.",
    intro:
      "Make PDF files smaller while keeping them readable for exams, forms, emails, and uploads.",
    backendNote:
      "Needs Ghostscript, qpdf, or an equivalent PDF optimization worker.",
    related: ["merge-pdf", "split-pdf", "pdf-to-jpg"],
  },
  {
    slug: "rotate-pdf",
    name: "Rotate PDF",
    shortName: "Rotate PDF",
    category: "PDF",
    status: "planned",
    acceptedFormats: [".pdf"],
    outputFormat: "PDF",
    limitLabel: "10 MB per file",
    title: "Rotate PDF Online",
    metaDescription:
      "Rotate PDF pages online and download a corrected PDF with private temporary processing.",
    intro:
      "Fix sideways or upside-down PDF pages before printing, submitting, or sharing.",
    related: ["split-pdf", "extract-delete-reorder-pdf-pages", "merge-pdf"],
  },
  {
    slug: "extract-delete-reorder-pdf-pages",
    name: "Extract/Delete/Reorder PDF Pages",
    shortName: "Organize PDF Pages",
    category: "PDF",
    status: "planned",
    acceptedFormats: [".pdf"],
    outputFormat: "PDF",
    limitLabel: "10 MB per file",
    title: "Extract, Delete, and Reorder PDF Pages Online",
    metaDescription:
      "Organize PDF pages by extracting, deleting, or reordering pages with automatic temporary processing.",
    intro:
      "Clean up a PDF by keeping the right pages, removing unwanted pages, and arranging pages in the correct order.",
    related: ["split-pdf", "merge-pdf", "rotate-pdf"],
  },
  {
    slug: "pdf-to-text",
    name: "PDF to Text",
    shortName: "PDF -> Text",
    category: "Text",
    status: "planned",
    acceptedFormats: [".pdf"],
    outputFormat: "TXT",
    limitLabel: "10 MB per file",
    title: "PDF to Text Converter Online",
    metaDescription:
      "Extract selectable text from PDF files into a plain text download with temporary file cleanup.",
    intro:
      "Extract readable text from PDFs for notes, summaries, search, or revision.",
    related: ["text-to-pdf", "ocr", "pdf-to-word"],
  },
  {
    slug: "text-to-pdf",
    name: "Text to PDF",
    shortName: "Text -> PDF",
    category: "Text",
    status: "planned",
    acceptedFormats: [".txt"],
    outputFormat: "PDF",
    limitLabel: "2 MB per file",
    title: "Text to PDF Converter Online",
    metaDescription:
      "Convert plain text files to clean PDF documents with automatic processing and instant download.",
    intro:
      "Turn TXT notes into a printable PDF document for sharing or revision.",
    related: ["pdf-to-text", "jpg-to-pdf", "word-to-pdf"],
  },
  {
    slug: "ocr",
    name: "OCR",
    shortName: "OCR",
    category: "Text",
    status: "requires-service",
    acceptedFormats: [".jpg", ".jpeg", ".png", ".pdf"],
    outputFormat: "TXT",
    limitLabel: "10 MB per file",
    title: "OCR Online Image and PDF Text Extractor",
    metaDescription:
      "Extract text from scanned images or PDFs using OCR with automatic temporary file handling.",
    intro:
      "Use OCR to read text from scanned notes, images, forms, and image-based PDFs.",
    backendNote:
      "Needs Tesseract OCR and, for scanned PDFs, a PDF rasterization worker.",
    related: ["pdf-to-text", "jpg-to-pdf", "pdf-to-word"],
  },
  {
    slug: "excel-to-pdf",
    name: "Excel to PDF",
    shortName: "Excel -> PDF",
    category: "Office",
    status: "requires-service",
    acceptedFormats: [".xls", ".xlsx", ".csv"],
    outputFormat: "PDF",
    limitLabel: "10 MB per file",
    title: "Excel to PDF Converter Online",
    metaDescription:
      "Convert Excel spreadsheets to PDF with automatic processing and temporary cleanup.",
    intro:
      "Convert spreadsheets, tables, and CSV files into PDFs for submission, printing, or sharing.",
    backendNote:
      "Needs LibreOffice headless or a compatible spreadsheet conversion worker.",
    related: ["word-to-pdf", "powerpoint-to-pdf", "text-to-pdf"],
  },
  {
    slug: "powerpoint-to-pdf",
    name: "PowerPoint to PDF",
    shortName: "PowerPoint -> PDF",
    category: "Office",
    status: "requires-service",
    acceptedFormats: [".ppt", ".pptx"],
    outputFormat: "PDF",
    limitLabel: "10 MB per file",
    title: "PowerPoint to PDF Converter Online",
    metaDescription:
      "Convert PowerPoint presentations to PDF slides with automatic processing and temporary file cleanup.",
    intro:
      "Turn PPT and PPTX slides into a PDF that is easier to submit, print, or share.",
    backendNote:
      "Needs LibreOffice headless or a compatible presentation conversion worker.",
    related: ["word-to-pdf", "excel-to-pdf", "compress-pdf"],
  },
];

export function getDocumentTool(slug = "") {
  return documentTools.find((tool) => tool.slug === slug) || null;
}

export function getRelatedDocumentTools(tool) {
  const relatedSlugs = tool?.related?.length
    ? tool.related
    : documentTools
        .filter((item) => item.category === tool?.category && item.slug !== tool?.slug)
        .slice(0, 3)
        .map((item) => item.slug);

  return relatedSlugs
    .map((slug) => getDocumentTool(slug))
    .filter(Boolean)
    .slice(0, 4);
}

import crypto from "crypto";
import fs from "fs/promises";
import os from "os";
import path from "path";
import formidable from "formidable";
import JSZip from "jszip";
import { degrees, PDFDocument, rgb, StandardFonts } from "pdf-lib";
import sharp from "sharp";
import { DOCUMENT_TOOL_MAX_FILE_BYTES } from "../data/document-tools";

const MAX_FILES = 24;
const MAX_TOTAL_UPLOAD_BYTES = 80 * 1024 * 1024;
const TXT_MAX_BYTES = 2 * 1024 * 1024;
const PDF_MARGIN_DEFAULT = 36;

const MIME_BY_EXTENSION = new Map([
  [".pdf", ["application/pdf"]],
  [".jpg", ["image/jpeg"]],
  [".jpeg", ["image/jpeg"]],
  [".png", ["image/png"]],
  [".webp", ["image/webp"]],
  [".txt", ["text/plain", "application/octet-stream"]],
  [".csv", ["text/csv", "application/csv", "application/vnd.ms-excel", "text/plain", "application/octet-stream"]],
  [".doc", ["application/msword", "application/octet-stream"]],
  [".docx", ["application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/zip", "application/octet-stream"]],
  [".xls", ["application/vnd.ms-excel", "application/octet-stream"]],
  [".xlsx", ["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "application/zip", "application/octet-stream"]],
  [".ppt", ["application/vnd.ms-powerpoint", "application/octet-stream"]],
  [".pptx", ["application/vnd.openxmlformats-officedocument.presentationml.presentation", "application/zip", "application/octet-stream"]],
]);

const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp"]);
const PDF_EXTENSIONS = new Set([".pdf"]);
const TEXT_EXTENSIONS = new Set([".txt"]);
const OFFICE_EXTENSIONS = new Set([".doc", ".docx", ".xls", ".xlsx", ".ppt", ".pptx", ".csv"]);
const BLOCKED_UPLOAD_EXTENSIONS = new Set([
  ".apk", ".app", ".bat", ".bin", ".cmd", ".com", ".cpl", ".dll", ".dmg", ".exe",
  ".hta", ".jar", ".js", ".jse", ".msi", ".ps1", ".scr", ".sh", ".vb", ".vbe",
  ".vbs", ".wsf",
]);

const PAGE_SIZES = {
  a4: [595.28, 841.89],
  a3: [841.89, 1190.55],
  letter: [612, 792],
  legal: [612, 1008],
};

function getExtension(fileName = "") {
  return path.extname(String(fileName || "")).toLowerCase();
}

function hasUnsafeName(fileName = "") {
  const normalizedName = String(fileName || "").toLowerCase();
  return normalizedName.includes("/") || normalizedName.includes("\\") || normalizedName.includes("..");
}

function hasBlockedExtension(fileName = "") {
  return String(fileName || "")
    .toLowerCase()
    .split(".")
    .slice(1)
    .some((part) => BLOCKED_UPLOAD_EXTENSIONS.has(`.${part}`));
}

function clampNumber(value, min, max, fallback) {
  const numericValue = Number(value);
  if (!Number.isFinite(numericValue)) return fallback;
  return Math.min(max, Math.max(min, numericValue));
}

function getString(value, fallback = "") {
  if (Array.isArray(value)) return String(value[0] ?? fallback);
  return String(value ?? fallback);
}

export function parseOptions(fields = {}) {
  const rawOptions = getString(fields.options, "{}");

  try {
    const parsedOptions = JSON.parse(rawOptions);
    return parsedOptions && typeof parsedOptions === "object" ? parsedOptions : {};
  } catch {
    return {};
  }
}

function hasMagicBytes(buffer, signature) {
  return signature.every((byte, index) => buffer[index] === byte);
}

function detectMime(buffer) {
  if (hasMagicBytes(buffer, [0x25, 0x50, 0x44, 0x46, 0x2d])) return "application/pdf";
  if (hasMagicBytes(buffer, [0xff, 0xd8, 0xff])) return "image/jpeg";
  if (hasMagicBytes(buffer, [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])) return "image/png";
  if (hasMagicBytes(buffer, [0x52, 0x49, 0x46, 0x46]) && buffer[8] === 0x57 && buffer[9] === 0x45 && buffer[10] === 0x42 && buffer[11] === 0x50) return "image/webp";
  if (hasMagicBytes(buffer, [0x50, 0x4b, 0x03, 0x04])) return "application/zip";
  if (hasMagicBytes(buffer, [0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1])) return "application/x-ole-storage";
  return "";
}

function isProbablyText(buffer) {
  const sample = buffer.subarray(0, Math.min(buffer.length, 4096));
  if (!sample.length) return false;
  return !sample.includes(0);
}

function getAllowedExtensions(tool) {
  return new Set((tool.acceptedFormats || []).map((item) => item.toLowerCase()));
}

function getMaxBytesForExtension(extension) {
  return extension === ".txt" ? TXT_MAX_BYTES : DOCUMENT_TOOL_MAX_FILE_BYTES;
}

function validateDetectedType({ extension, declaredMimeType, detectedMimeType, buffer }) {
  const allowedMimes = MIME_BY_EXTENSION.get(extension) || [];

  if (declaredMimeType && !allowedMimes.includes(declaredMimeType)) {
    throw new Error("File type does not match the selected tool.");
  }

  if (PDF_EXTENSIONS.has(extension) && detectedMimeType !== "application/pdf") {
    throw new Error("PDF content could not be verified.");
  }

  if (IMAGE_EXTENSIONS.has(extension)) {
    const expectedImageMime = extension === ".png" ? "image/png" : extension === ".webp" ? "image/webp" : "image/jpeg";
    if (detectedMimeType !== expectedImageMime) {
      throw new Error("Image content does not match the file extension.");
    }
  }

  if (TEXT_EXTENSIONS.has(extension) && !isProbablyText(buffer)) {
    throw new Error("Text file content could not be verified.");
  }

  if (OFFICE_EXTENSIONS.has(extension)) {
    const officeLooksValid =
      extension === ".csv"
        ? isProbablyText(buffer)
        : detectedMimeType === "application/zip" || detectedMimeType === "application/x-ole-storage";
    if (!officeLooksValid) {
      throw new Error("Office document content could not be verified.");
    }
  }
}

export async function createDocumentToolWorkspace() {
  const root = path.join(os.tmpdir(), "ece-document-tools");
  await fs.mkdir(root, { recursive: true });
  return fs.mkdtemp(path.join(root, `${crypto.randomUUID()}-`));
}

export async function cleanupDocumentToolWorkspace(workspacePath) {
  if (!workspacePath) return;

  const root = path.resolve(path.join(os.tmpdir(), "ece-document-tools"));
  const resolvedWorkspace = path.resolve(workspacePath);

  if (!resolvedWorkspace.startsWith(`${root}${path.sep}`)) return;

  await fs.rm(resolvedWorkspace, { recursive: true, force: true });
}

export function parseDocumentToolUpload(req, workspacePath) {
  const form = formidable({
    uploadDir: workspacePath,
    keepExtensions: false,
    multiples: true,
    maxFiles: MAX_FILES,
    maxFileSize: DOCUMENT_TOOL_MAX_FILE_BYTES,
    maxTotalFileSize: MAX_TOTAL_UPLOAD_BYTES,
    filename: () => crypto.randomUUID(),
    filter(part) {
      return part.name === "files";
    },
  });

  return new Promise((resolve, reject) => {
    form.parse(req, (error, fields, files) => {
      if (error) {
        reject(error);
        return;
      }
      resolve({ fields, files });
    });
  });
}

export async function validateDocumentToolUploads(files, tool) {
  const uploadedFiles = Array.isArray(files?.files) ? files.files : files?.files ? [files.files] : [];
  const allowedExtensions = getAllowedExtensions(tool);

  if (!uploadedFiles.length) throw new Error("Upload at least one supported file.");
  if (uploadedFiles.length > MAX_FILES) throw new Error(`Upload up to ${MAX_FILES} files at a time.`);

  let totalBytes = 0;
  const validatedFiles = [];

  for (const file of uploadedFiles) {
    const originalFilename = file.originalFilename || "";
    const extension = getExtension(originalFilename);
    const declaredMimeType = String(file.mimetype || "").toLowerCase();
    const size = Number(file.size || 0);
    const maxBytes = getMaxBytesForExtension(extension);

    if (!originalFilename || hasUnsafeName(originalFilename) || hasBlockedExtension(originalFilename)) {
      throw new Error("Upload uses an unsafe file name.");
    }

    if (!allowedExtensions.has(extension)) {
      throw new Error(`Only ${tool.acceptedFormats.join(", ")} files are accepted.`);
    }

    if (!Number.isFinite(size) || size <= 0 || size > maxBytes) {
      throw new Error(`Each file must be between 1 byte and ${Math.round(maxBytes / 1024 / 1024)} MB.`);
    }

    totalBytes += size;
    if (totalBytes > MAX_TOTAL_UPLOAD_BYTES) throw new Error("Total upload size must stay under 80 MB.");

    const buffer = await fs.readFile(file.filepath);
    const detectedMimeType = detectMime(buffer);
    validateDetectedType({ extension, declaredMimeType, detectedMimeType, buffer });

    validatedFiles.push({
      buffer,
      detectedMimeType,
      extension,
      originalFilename: path.basename(originalFilename),
      size,
    });
  }

  return validatedFiles;
}

function parsePageNumbers(value, totalPages) {
  const rawValue = String(value || "").trim();
  if (!rawValue || rawValue.toLowerCase() === "all") {
    return Array.from({ length: totalPages }, (_, index) => index);
  }

  const pageIndexes = [];
  for (const part of rawValue.split(",")) {
    const trimmedPart = part.trim();
    if (!trimmedPart) continue;

    const rangeMatch = trimmedPart.match(/^(\d+)\s*-\s*(\d+)$/);
    if (rangeMatch) {
      const start = clampNumber(rangeMatch[1], 1, totalPages, 1);
      const end = clampNumber(rangeMatch[2], 1, totalPages, totalPages);
      const step = start <= end ? 1 : -1;
      for (let page = start; step > 0 ? page <= end : page >= end; page += step) pageIndexes.push(page - 1);
      continue;
    }

    if (/^\d+$/.test(trimmedPart)) pageIndexes.push(clampNumber(trimmedPart, 1, totalPages, 1) - 1);
  }

  return Array.from(new Set(pageIndexes)).filter((pageIndex) => pageIndex >= 0 && pageIndex < totalPages);
}

function getPageSize(options = {}) {
  const pageSizeKey = String(options.pageSize || "a4").toLowerCase();
  let [width, height] = PAGE_SIZES[pageSizeKey] || PAGE_SIZES.a4;

  if (pageSizeKey === "custom") {
    width = clampNumber(options.customWidthMm, 20, 2000, 210) * 2.83465;
    height = clampNumber(options.customHeightMm, 20, 2000, 297) * 2.83465;
  }

  if (String(options.orientation || "portrait") === "landscape" && height > width) [width, height] = [height, width];
  if (String(options.orientation || "portrait") === "portrait" && width > height) [width, height] = [height, width];

  return [width, height];
}

async function normalizeImageForEmbedding(imageFile, options = {}) {
  const quality = clampNumber(options.imageQuality, 1, 100, 92);
  const dpi = clampNumber(options.dpi, 72, 600, 300);
  const shouldReencode = quality < 100 || imageFile.extension === ".webp";

  if (!shouldReencode) {
    return {
      buffer: imageFile.buffer,
      mimeType: imageFile.detectedMimeType,
      dpi,
    };
  }

  const jpegBuffer = await sharp(imageFile.buffer, { failOn: "error" })
    .rotate()
    .jpeg({ quality, mozjpeg: true })
    .toBuffer();

  return {
    buffer: jpegBuffer,
    mimeType: "image/jpeg",
    dpi,
  };
}

export async function convertImagesToPdf(imageFiles, options = {}) {
  const pdfDoc = await PDFDocument.create();
  const [pageWidth, pageHeight] = getPageSize(options);
  const margin = clampNumber(options.marginPt, 0, 144, PDF_MARGIN_DEFAULT);
  const fit = ["contain", "cover", "original"].includes(options.imageFit) ? options.imageFit : "contain";

  for (const imageFile of imageFiles) {
    const normalizedImage = await normalizeImageForEmbedding(imageFile, options);
    const embeddedImage =
      normalizedImage.mimeType === "image/png"
        ? await pdfDoc.embedPng(normalizedImage.buffer)
        : await pdfDoc.embedJpg(normalizedImage.buffer);
    const page = pdfDoc.addPage([pageWidth, pageHeight]);
    const maxWidth = Math.max(1, pageWidth - margin * 2);
    const maxHeight = Math.max(1, pageHeight - margin * 2);
    const naturalWidth = (embeddedImage.width / normalizedImage.dpi) * 72;
    const naturalHeight = (embeddedImage.height / normalizedImage.dpi) * 72;
    const containScale = Math.min(maxWidth / naturalWidth, maxHeight / naturalHeight);
    const coverScale = Math.max(maxWidth / naturalWidth, maxHeight / naturalHeight);
    const scale = fit === "cover" ? coverScale : fit === "original" ? 1 : Math.min(containScale, 1);
    const width = naturalWidth * scale;
    const height = naturalHeight * scale;

    page.drawImage(embeddedImage, {
      x: (pageWidth - width) / 2,
      y: (pageHeight - height) / 2,
      width,
      height,
    });
  }

  return Buffer.from(await pdfDoc.save({ useObjectStreams: true }));
}

export async function mergePdfs(pdfFiles) {
  const outputDoc = await PDFDocument.create();

  for (const pdfFile of pdfFiles) {
    const sourceDoc = await PDFDocument.load(pdfFile.buffer, { ignoreEncryption: false });
    const pages = await outputDoc.copyPages(sourceDoc, sourceDoc.getPageIndices());
    pages.forEach((page) => outputDoc.addPage(page));
  }

  return Buffer.from(await outputDoc.save({ useObjectStreams: true }));
}

export async function splitPdf(pdfFile, options = {}) {
  const sourceDoc = await PDFDocument.load(pdfFile.buffer, { ignoreEncryption: false });
  const totalPages = sourceDoc.getPageCount();
  const splitMode = String(options.splitMode || "ranges");

  if (splitMode === "individual") {
    const zip = new JSZip();
    for (let index = 0; index < totalPages; index += 1) {
      const outputDoc = await PDFDocument.create();
      const [page] = await outputDoc.copyPages(sourceDoc, [index]);
      outputDoc.addPage(page);
      zip.file(`page-${String(index + 1).padStart(3, "0")}.pdf`, await outputDoc.save({ useObjectStreams: true }));
    }
    return {
      buffer: Buffer.from(await zip.generateAsync({ type: "nodebuffer", compression: "DEFLATE" })),
      contentType: "application/zip",
      fileName: "split-pages.zip",
    };
  }

  const pageIndexes = parsePageNumbers(options.pageRanges, totalPages);
  if (!pageIndexes.length) throw new Error("Enter valid page ranges, for example 1-3,5.");

  const outputDoc = await PDFDocument.create();
  const pages = await outputDoc.copyPages(sourceDoc, pageIndexes);
  pages.forEach((page) => outputDoc.addPage(page));
  return {
    buffer: Buffer.from(await outputDoc.save({ useObjectStreams: true })),
    contentType: "application/pdf",
    fileName: "split.pdf",
  };
}

export async function rotatePdf(pdfFile, options = {}) {
  const sourceDoc = await PDFDocument.load(pdfFile.buffer, { ignoreEncryption: false });
  const totalPages = sourceDoc.getPageCount();
  const pageIndexes = parsePageNumbers(options.pageSelection, totalPages);
  const rotation = clampNumber(options.rotation, 0, 270, 90);

  if (!pageIndexes.length) throw new Error("Enter valid pages to rotate.");

  pageIndexes.forEach((pageIndex) => {
    const page = sourceDoc.getPage(pageIndex);
    const currentRotation = page.getRotation().angle || 0;
    page.setRotation(degrees((currentRotation + rotation) % 360));
  });

  return Buffer.from(await sourceDoc.save({ useObjectStreams: true }));
}

export async function organizePdfPages(pdfFile, options = {}) {
  const sourceDoc = await PDFDocument.load(pdfFile.buffer, { ignoreEncryption: false });
  const totalPages = sourceDoc.getPageCount();
  const deletePages = new Set(parsePageNumbers(options.deletePages || "", totalPages));
  const orderedPages = String(options.pageOrder || "").trim()
    ? parsePageNumbers(options.pageOrder, totalPages)
    : Array.from({ length: totalPages }, (_, index) => index).filter((pageIndex) => !deletePages.has(pageIndex));

  if (!orderedPages.length) throw new Error("Choose at least one page to keep.");

  const outputDoc = await PDFDocument.create();
  const pages = await outputDoc.copyPages(sourceDoc, orderedPages);
  pages.forEach((page) => outputDoc.addPage(page));
  return Buffer.from(await outputDoc.save({ useObjectStreams: true }));
}

export async function extractPdfText(pdfFile, options = {}) {
  const pdfjs = await import("pdfjs-dist/legacy/build/pdf.mjs");
  const loadingTask = pdfjs.getDocument({
    data: new Uint8Array(pdfFile.buffer),
    disableWorker: true,
    useSystemFonts: true,
  });
  const pdf = await loadingTask.promise;
  const pageIndexes = parsePageNumbers(options.pageSelection, pdf.numPages);
  const output = [];

  for (const pageIndex of pageIndexes) {
    const page = await pdf.getPage(pageIndex + 1);
    const textContent = await page.getTextContent();
    const pageText = textContent.items
      .map((item) => item.str)
      .join(" ")
      .replace(/[ \t]+/g, " ")
      .trim();
    output.push(`--- Page ${pageIndex + 1} ---\n${pageText}`);
  }

  const text = output.join("\n\n").trim();
  await pdf.destroy();

  if (!text || text.replace(/--- Page \d+ ---/g, "").trim().length < 3) {
    throw new Error("No selectable text was found. Scanned PDFs need the OCR worker.");
  }

  return Buffer.from(`${text}\n`, "utf8");
}

function wrapText(text, font, fontSize, maxWidth) {
  const words = String(text || "").split(/\s+/);
  const lines = [];
  let line = "";

  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (font.widthOfTextAtSize(candidate, fontSize) <= maxWidth) {
      line = candidate;
    } else {
      if (line) lines.push(line);
      line = word;
    }
  }

  if (line) lines.push(line);
  return lines.length ? lines : [""];
}

export async function textToPdf(textFile, options = {}) {
  const text = textFile.buffer.toString("utf8").replace(/\r\n/g, "\n");
  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontSize = clampNumber(options.fontSize, 8, 24, 11);
  const margin = clampNumber(options.marginPt, 18, 144, 54);
  const [pageWidth, pageHeight] = getPageSize(options);
  const lineHeight = fontSize * 1.45;
  let page = pdfDoc.addPage([pageWidth, pageHeight]);
  let y = pageHeight - margin;

  for (const paragraph of text.split("\n")) {
    const lines = wrapText(paragraph, font, fontSize, pageWidth - margin * 2);
    for (const line of lines) {
      if (y < margin + lineHeight) {
        page = pdfDoc.addPage([pageWidth, pageHeight]);
        y = pageHeight - margin;
      }
      page.drawText(line, {
        x: margin,
        y,
        size: fontSize,
        font,
        color: rgb(0.08, 0.12, 0.2),
      });
      y -= lineHeight;
    }
    y -= lineHeight * 0.4;
  }

  return Buffer.from(await pdfDoc.save({ useObjectStreams: true }));
}

async function compressOneImage(imageFile, options = {}) {
  const outputFormat = ["jpeg", "png", "webp"].includes(options.outputFormat) ? options.outputFormat : "jpeg";
  const quality = clampNumber(options.imageQuality, 1, 100, 82);
  const width = options.widthPx ? clampNumber(options.widthPx, 1, 12000, null) : null;
  const height = options.heightPx ? clampNumber(options.heightPx, 1, 12000, null) : null;
  const maintainAspectRatio = options.maintainAspectRatio !== false;
  let pipeline = sharp(imageFile.buffer, { failOn: "error" }).rotate();

  if (width || height) {
    pipeline = pipeline.resize({
      width: width || undefined,
      height: height || undefined,
      fit: maintainAspectRatio ? "inside" : "fill",
      withoutEnlargement: true,
    });
  }

  if (outputFormat === "png") {
    pipeline = pipeline.png({ compressionLevel: clampNumber(options.pngCompression, 0, 9, 9), quality });
  } else if (outputFormat === "webp") {
    pipeline = pipeline.webp({ quality });
  } else {
    pipeline = pipeline.jpeg({ quality, mozjpeg: true });
  }

  const buffer = await pipeline.toBuffer();
  const extension = outputFormat === "jpeg" ? "jpg" : outputFormat;
  return {
    buffer,
    fileName: `${path.parse(imageFile.originalFilename).name || "image"}.${extension}`,
    contentType: outputFormat === "jpeg" ? "image/jpeg" : `image/${outputFormat}`,
  };
}

export async function compressImages(imageFiles, options = {}) {
  const outputs = [];
  for (const imageFile of imageFiles) outputs.push(await compressOneImage(imageFile, options));

  if (outputs.length === 1) return outputs[0];

  const zip = new JSZip();
  outputs.forEach((output) => zip.file(output.fileName, output.buffer));
  return {
    buffer: Buffer.from(await zip.generateAsync({ type: "nodebuffer", compression: "DEFLATE" })),
    contentType: "application/zip",
    fileName: "compressed-images.zip",
  };
}

export async function processDocumentTool(tool, files, options = {}) {
  switch (tool.slug) {
    case "jpg-to-pdf":
      return {
        buffer: await convertImagesToPdf(files, options),
        contentType: "application/pdf",
        fileName: files.length === 1 ? "eceexamguide-image.pdf" : "eceexamguide-images.pdf",
      };
    case "compress-image":
      return compressImages(files, options);
    case "merge-pdf":
      return {
        buffer: await mergePdfs(files),
        contentType: "application/pdf",
        fileName: "merged.pdf",
      };
    case "split-pdf":
      return splitPdf(files[0], options);
    case "rotate-pdf":
      return {
        buffer: await rotatePdf(files[0], options),
        contentType: "application/pdf",
        fileName: "rotated.pdf",
      };
    case "extract-delete-reorder-pdf-pages":
      return {
        buffer: await organizePdfPages(files[0], options),
        contentType: "application/pdf",
        fileName: "organized.pdf",
      };
    case "pdf-to-text":
      return {
        buffer: await extractPdfText(files[0], options),
        contentType: "text/plain; charset=utf-8",
        fileName: "extracted-text.txt",
      };
    case "text-to-pdf":
      return {
        buffer: await textToPdf(files[0], options),
        contentType: "application/pdf",
        fileName: "text.pdf",
      };
    default:
      throw new Error(`${tool.name} needs a separate document-processing worker before it can run on production.`);
  }
}

export const documentToolServerLimits = {
  maxFiles: MAX_FILES,
  maxBytes: DOCUMENT_TOOL_MAX_FILE_BYTES,
  maxTextBytes: TXT_MAX_BYTES,
  maxTotalBytes: MAX_TOTAL_UPLOAD_BYTES,
};

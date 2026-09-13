import crypto from "crypto";
import fs from "fs/promises";
import os from "os";
import path from "path";
import formidable from "formidable";
import { PDFDocument } from "pdf-lib";
import { DOCUMENT_TOOL_MAX_FILE_BYTES } from "../data/document-tools";

const PDF_A4_WIDTH = 595.28;
const PDF_A4_HEIGHT = 841.89;
const PDF_MARGIN = 36;
const MAX_IMAGE_FILES = 12;
const MAX_TOTAL_UPLOAD_BYTES = 30 * 1024 * 1024;

const IMAGE_MIME_BY_EXTENSION = new Map([
  [".jpg", "image/jpeg"],
  [".jpeg", "image/jpeg"],
  [".png", "image/png"],
]);

function getExtension(fileName = "") {
  return path.extname(String(fileName || "")).toLowerCase();
}

function hasBlockedName(fileName = "") {
  const normalizedName = String(fileName || "").toLowerCase();
  return normalizedName.includes("/") || normalizedName.includes("\\") || normalizedName.includes("..");
}

function hasMagicBytes(buffer, signature) {
  return signature.every((byte, index) => buffer[index] === byte);
}

function detectImageMime(buffer) {
  if (hasMagicBytes(buffer, [0xff, 0xd8, 0xff])) {
    return "image/jpeg";
  }

  if (hasMagicBytes(buffer, [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])) {
    return "image/png";
  }

  return "";
}

export async function createDocumentToolWorkspace() {
  const root = path.join(os.tmpdir(), "ece-document-tools");
  await fs.mkdir(root, { recursive: true });
  return fs.mkdtemp(path.join(root, `${crypto.randomUUID()}-`));
}

export async function cleanupDocumentToolWorkspace(workspacePath) {
  if (!workspacePath) {
    return;
  }

  const root = path.resolve(path.join(os.tmpdir(), "ece-document-tools"));
  const resolvedWorkspace = path.resolve(workspacePath);

  if (!resolvedWorkspace.startsWith(`${root}${path.sep}`)) {
    return;
  }

  await fs.rm(resolvedWorkspace, { recursive: true, force: true });
}

export function parseDocumentToolUpload(req, workspacePath) {
  const form = formidable({
    uploadDir: workspacePath,
    keepExtensions: false,
    multiples: true,
    maxFiles: MAX_IMAGE_FILES,
    maxFileSize: DOCUMENT_TOOL_MAX_FILE_BYTES,
    maxTotalFileSize: MAX_TOTAL_UPLOAD_BYTES,
    filename: () => crypto.randomUUID(),
    filter(part) {
      return part.name === "files" && IMAGE_MIME_BY_EXTENSION.has(getExtension(part.originalFilename));
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

export async function validateImageUploads(files) {
  const uploadedFiles = Array.isArray(files?.files)
    ? files.files
    : files?.files
      ? [files.files]
      : [];

  if (!uploadedFiles.length) {
    throw new Error("Upload at least one JPG or PNG image.");
  }

  if (uploadedFiles.length > MAX_IMAGE_FILES) {
    throw new Error(`Upload up to ${MAX_IMAGE_FILES} images at a time.`);
  }

  let totalBytes = 0;

  const validatedFiles = await Promise.all(
    uploadedFiles.map(async (file) => {
      const originalFilename = file.originalFilename || "";
      const extension = getExtension(originalFilename);
      const declaredMimeType = String(file.mimetype || "").toLowerCase();
      const expectedMimeType = IMAGE_MIME_BY_EXTENSION.get(extension);
      const size = Number(file.size || 0);

      if (!originalFilename || hasBlockedName(originalFilename)) {
        throw new Error("Upload uses an unsafe file name.");
      }

      if (!expectedMimeType || expectedMimeType !== declaredMimeType) {
        throw new Error("Only JPG, JPEG, and PNG images are accepted.");
      }

      if (!Number.isFinite(size) || size <= 0 || size > DOCUMENT_TOOL_MAX_FILE_BYTES) {
        throw new Error("Each image must be between 1 byte and 10 MB.");
      }

      totalBytes += size;

      if (totalBytes > MAX_TOTAL_UPLOAD_BYTES) {
        throw new Error("Total upload size must stay under 30 MB.");
      }

      const buffer = await fs.readFile(file.filepath);
      const detectedMimeType = detectImageMime(buffer);

      if (detectedMimeType !== declaredMimeType) {
        throw new Error("File content does not match the selected image type.");
      }

      return {
        buffer,
        detectedMimeType,
        originalFilename,
        size,
      };
    })
  );

  return validatedFiles;
}

export async function convertImagesToPdf(imageFiles) {
  const pdfDoc = await PDFDocument.create();

  for (const imageFile of imageFiles) {
    const embeddedImage =
      imageFile.detectedMimeType === "image/png"
        ? await pdfDoc.embedPng(imageFile.buffer)
        : await pdfDoc.embedJpg(imageFile.buffer);
    const page = pdfDoc.addPage([PDF_A4_WIDTH, PDF_A4_HEIGHT]);
    const maxWidth = PDF_A4_WIDTH - PDF_MARGIN * 2;
    const maxHeight = PDF_A4_HEIGHT - PDF_MARGIN * 2;
    const scale = Math.min(maxWidth / embeddedImage.width, maxHeight / embeddedImage.height, 1);
    const width = embeddedImage.width * scale;
    const height = embeddedImage.height * scale;

    page.drawImage(embeddedImage, {
      x: (PDF_A4_WIDTH - width) / 2,
      y: (PDF_A4_HEIGHT - height) / 2,
      width,
      height,
    });
  }

  return Buffer.from(await pdfDoc.save());
}

export const documentToolServerLimits = {
  maxImageFiles: MAX_IMAGE_FILES,
  maxImageBytes: DOCUMENT_TOOL_MAX_FILE_BYTES,
  maxTotalBytes: MAX_TOTAL_UPLOAD_BYTES,
};

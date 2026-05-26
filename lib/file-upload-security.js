const MAX_UPLOAD_BYTES = 10 * 1024 * 1024;

const ALLOWED_UPLOAD_TYPES = new Map([
  ["application/pdf", [".pdf"]],
  ["image/jpeg", [".jpg", ".jpeg"]],
  ["image/png", [".png"]],
  ["image/gif", [".gif"]],
  ["image/webp", [".webp"]],
]);

const BLOCKED_UPLOAD_EXTENSIONS = new Set([
  ".apk",
  ".app",
  ".bat",
  ".bin",
  ".cmd",
  ".com",
  ".cpl",
  ".dll",
  ".dmg",
  ".exe",
  ".hta",
  ".jar",
  ".js",
  ".jse",
  ".msi",
  ".ps1",
  ".scr",
  ".sh",
  ".vb",
  ".vbe",
  ".vbs",
  ".wsf",
]);

function getExtension(fileName = "") {
  const normalizedName = String(fileName).trim().toLowerCase();
  const lastDotIndex = normalizedName.lastIndexOf(".");
  return lastDotIndex >= 0 ? normalizedName.slice(lastDotIndex) : "";
}

function hasBlockedExtension(fileName = "") {
  const normalizedName = String(fileName).trim().toLowerCase();
  return normalizedName
    .split(".")
    .slice(1)
    .some((part) => BLOCKED_UPLOAD_EXTENSIONS.has(`.${part}`));
}

function hasMagicBytes(bytes = [], signature = []) {
  return signature.every((byte, index) => bytes[index] === byte);
}

function detectMimeFromMagicBytes(buffer) {
  const bytes = new Uint8Array(buffer).slice(0, 16);

  if (hasMagicBytes(bytes, [0x25, 0x50, 0x44, 0x46, 0x2d])) {
    return "application/pdf";
  }

  if (hasMagicBytes(bytes, [0xff, 0xd8, 0xff])) {
    return "image/jpeg";
  }

  if (hasMagicBytes(bytes, [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])) {
    return "image/png";
  }

  if (
    hasMagicBytes(bytes, [0x47, 0x49, 0x46, 0x38, 0x37, 0x61]) ||
    hasMagicBytes(bytes, [0x47, 0x49, 0x46, 0x38, 0x39, 0x61])
  ) {
    return "image/gif";
  }

  if (
    hasMagicBytes(bytes, [0x52, 0x49, 0x46, 0x46]) &&
    bytes[8] === 0x57 &&
    bytes[9] === 0x45 &&
    bytes[10] === 0x42 &&
    bytes[11] === 0x50
  ) {
    return "image/webp";
  }

  return "";
}

async function toArrayBuffer(file) {
  if (!file) {
    return new ArrayBuffer(0);
  }

  if (file instanceof ArrayBuffer) {
    return file;
  }

  if (ArrayBuffer.isView(file)) {
    return file.buffer.slice(file.byteOffset, file.byteOffset + file.byteLength);
  }

  if (typeof file.arrayBuffer === "function") {
    return file.arrayBuffer();
  }

  return new ArrayBuffer(0);
}

export function isAllowedUploadType({ fileName = "", mimeType = "" } = {}) {
  const extension = getExtension(fileName);
  const allowedExtensions = ALLOWED_UPLOAD_TYPES.get(String(mimeType).toLowerCase());

  return Boolean(
    extension &&
      allowedExtensions?.includes(extension) &&
      !hasBlockedExtension(fileName)
  );
}

export async function validateUploadFile(file, options = {}) {
  const maxBytes = options.maxBytes || MAX_UPLOAD_BYTES;
  const fileName = file?.name || file?.originalFilename || file?.filename || "";
  const declaredMimeType = String(file?.type || file?.mimetype || file?.mimeType || "").toLowerCase();
  const fileSize = Number(file?.size || file?.byteLength || file?.length || 0);
  const extension = getExtension(fileName);

  if (!fileName || !extension) {
    throw new Error("Upload must include a file name with a valid extension.");
  }

  if (hasBlockedExtension(fileName)) {
    throw new Error("Executable uploads are not allowed.");
  }

  if (!isAllowedUploadType({ fileName, mimeType: declaredMimeType })) {
    throw new Error("Only PDF and image uploads are allowed.");
  }

  if (!Number.isFinite(fileSize) || fileSize <= 0 || fileSize > maxBytes) {
    throw new Error(`Upload must be between 1 byte and ${maxBytes} bytes.`);
  }

  const buffer = await toArrayBuffer(file);
  const detectedMimeType = detectMimeFromMagicBytes(buffer);

  if (detectedMimeType !== declaredMimeType) {
    throw new Error("File content does not match the declared upload type.");
  }

  if (!ALLOWED_UPLOAD_TYPES.get(detectedMimeType)?.includes(extension)) {
    throw new Error("File extension does not match the uploaded content.");
  }

  if (typeof options.scanFile === "function") {
    const scanResult = await options.scanFile({ file, buffer, detectedMimeType });

    if (scanResult !== true) {
      throw new Error("Upload failed malware scan.");
    }
  }

  return {
    fileName,
    mimeType: detectedMimeType,
    extension,
    size: fileSize,
  };
}

export {
  ALLOWED_UPLOAD_TYPES,
  BLOCKED_UPLOAD_EXTENSIONS,
  MAX_UPLOAD_BYTES,
};

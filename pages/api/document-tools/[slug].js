import { getDocumentTool } from "../../../data/document-tools";
import { checkRateLimit, getClientIp } from "../../../lib/auth/rate-limit";
import {
  cleanupDocumentToolWorkspace,
  convertImagesToPdf,
  createDocumentToolWorkspace,
  parseDocumentToolUpload,
  validateImageUploads,
} from "../../../lib/document-tools-server";

export const config = {
  api: {
    bodyParser: false,
    responseLimit: false,
  },
};

function sendError(res, statusCode, message, details = {}) {
  res.status(statusCode).json({
    ok: false,
    error: message,
    ...details,
  });
}

export default async function documentToolHandler(req, res) {
  const tool = getDocumentTool(req.query.slug);

  if (!tool) {
    sendError(res, 404, "Document tool not found.");
    return;
  }

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    sendError(res, 405, "Use POST to process files.");
    return;
  }

  const clientIp = getClientIp(req);
  const rateLimit = checkRateLimit(`document-tools:${tool.slug}:${clientIp}`, {
    limit: 12,
    windowMs: 10 * 60 * 1000,
  });

  if (!rateLimit.allowed) {
    res.setHeader("Retry-After", String(rateLimit.retryAfterSeconds));
    sendError(res, 429, "Too many conversion attempts. Please try again shortly.", {
      retryAfterSeconds: rateLimit.retryAfterSeconds,
    });
    return;
  }

  if (tool.slug !== "jpg-to-pdf") {
    sendError(
      res,
      501,
      `${tool.name} needs a separate document-processing worker before it can run on production.`,
      {
        backendNote: tool.backendNote || "This tool is configured in the UI and SEO catalog but not enabled on this server yet.",
      }
    );
    return;
  }

  let workspacePath = "";

  try {
    workspacePath = await createDocumentToolWorkspace();
    const { files } = await parseDocumentToolUpload(req, workspacePath);
    const imageFiles = await validateImageUploads(files);
    const pdfBuffer = await convertImagesToPdf(imageFiles);
    const fileBaseName = imageFiles.length === 1 ? "eceexamguide-image" : "eceexamguide-images";

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Length", String(pdfBuffer.length));
    res.setHeader("Content-Disposition", `attachment; filename="${fileBaseName}.pdf"`);
    res.setHeader("Cache-Control", "no-store, max-age=0");
    res.status(200).send(pdfBuffer);
  } catch (error) {
    const message = error?.message || "Unable to process the uploaded images.";
    const statusCode = /maxFileSize|maxTotalFileSize|larger|under|10 MB|30 MB/i.test(message)
      ? 413
      : 400;

    sendError(res, statusCode, message);
  } finally {
    await cleanupDocumentToolWorkspace(workspacePath);
  }
}

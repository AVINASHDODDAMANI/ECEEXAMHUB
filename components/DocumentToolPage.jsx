import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { DOCUMENT_TOOL_MAX_FILE_BYTES, getRelatedDocumentTools } from "../data/document-tools";

const enabledButtonClass = "bg-[#061b4f] text-white hover:bg-[#0b2a70]";
const disabledButtonClass = "cursor-not-allowed bg-slate-200 text-slate-500";

function Icon({ type, className = "h-5 w-5" }) {
  const icons = {
    upload: <path d="M12 16V4m0 0L7 9m5-5 5 5M5 16v3h14v-3" />,
    file: <path d="M8 3.5h6l4 4V20a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 6 20V5A1.5 1.5 0 0 1 7.5 3.5ZM14 3.5V8h4M9 12h6M9 16h4" />,
    shield: <path d="M12 3.5 19 6v5.5c0 4.2-2.8 7.8-7 9-4.2-1.2-7-4.8-7-9V6l7-2.5ZM9 12l2 2 4-4" />,
    refresh: <path d="M20 12a8 8 0 1 1-2.35-5.65M20 5v5h-5" />,
    download: <path d="M12 4v10m0 0 4-4m-4 4-4-4M5 20h14" />,
    search: <path d="M14.2 14.2 18 18M16 9.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0Z" />,
    arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  };

  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <g stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        {icons[type] || icons.file}
      </g>
    </svg>
  );
}

function formatBytes(bytes) {
  if (!Number.isFinite(bytes)) {
    return "";
  }

  if (bytes >= 1024 * 1024) {
    return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
  }

  return `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

function getExtension(fileName = "") {
  const dotIndex = String(fileName).lastIndexOf(".");
  return dotIndex >= 0 ? String(fileName).slice(dotIndex).toLowerCase() : "";
}

export function DocumentToolCard({ tool }) {
  return (
    <Link
      href={`/document-tools/${tool.slug}`}
      className="document-tools-card group flex min-h-[156px] flex-col rounded-lg border border-[#dfe6f1] bg-white p-4 shadow-[0_10px_24px_rgba(15,23,42,0.045)] transition hover:-translate-y-0.5 hover:border-[#ff7417] hover:shadow-[0_18px_38px_rgba(15,23,42,0.08)]"
    >
      <div className="flex items-start justify-between gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-lg border border-blue-100 bg-blue-50 text-[#145dff]">
          <Icon type="file" className="h-6 w-6" />
        </span>
        <span className={`rounded-full px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.08em] ${
          tool.status === "enabled"
            ? "bg-emerald-50 text-emerald-700"
            : "bg-amber-50 text-amber-700"
        }`}>
          {tool.status === "enabled" ? "Live" : "Worker"}
        </span>
      </div>
      <h3 className="mt-4 text-base font-extrabold leading-6 text-[#071d49]">{tool.name}</h3>
      <p className="mt-1 text-sm leading-6 text-slate-600">
        {tool.acceptedFormats.join(", ")} to {tool.outputFormat}
      </p>
      <span className="mt-auto inline-flex items-center gap-2 pt-4 text-sm font-extrabold text-[#004ce8] group-hover:text-[#ff7417]">
        Open tool
        <Icon type="arrow" className="h-4 w-4" />
      </span>
    </Link>
  );
}

export function DocumentToolRunner({ tool }) {
  const fileInputRef = useRef(null);
  const [files, setFiles] = useState([]);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("idle");
  const [result, setResult] = useState(null);
  const [dragging, setDragging] = useState(false);
  const acceptedFormatsLabel = tool.acceptedFormats.join(", ");
  const acceptValue = tool.acceptedFormats.join(",");
  const isProcessing = status === "processing";
  const canSubmit = files.length > 0 && !isProcessing;

  const totalSize = useMemo(
    () => files.reduce((sum, file) => sum + Number(file.size || 0), 0),
    [files]
  );

  function validateSelectedFiles(nextFiles) {
    const selectedFiles = Array.from(nextFiles || []);

    if (!selectedFiles.length) {
      return [];
    }

    if (tool.slug === "jpg-to-pdf" && selectedFiles.length > 12) {
      throw new Error("Upload up to 12 images at a time.");
    }

    selectedFiles.forEach((file) => {
      const extension = getExtension(file.name);
      const isAccepted = tool.acceptedFormats.includes(extension);

      if (!isAccepted) {
        throw new Error(`Only ${acceptedFormatsLabel} files are accepted.`);
      }

      if (file.size <= 0 || file.size > DOCUMENT_TOOL_MAX_FILE_BYTES) {
        throw new Error(`Each file must be between 1 byte and ${tool.limitLabel}.`);
      }
    });

    return selectedFiles;
  }

  function handleFiles(nextFiles) {
    try {
      setError("");
      setResult((currentResult) => {
        if (currentResult?.url) {
          URL.revokeObjectURL(currentResult.url);
        }
        return null;
      });
      setFiles(validateSelectedFiles(nextFiles));
      setStatus("idle");
    } catch (nextError) {
      setFiles([]);
      setError(nextError.message || "Select a supported file.");
      setStatus("error");
    }
  }

  function resetTool() {
    if (result?.url) {
      URL.revokeObjectURL(result.url);
    }

    setFiles([]);
    setError("");
    setResult(null);
    setStatus("idle");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  async function processFiles() {
    if (!canSubmit) {
      return;
    }

    setStatus("processing");
    setError("");

    try {
      const formData = new FormData();
      files.forEach((file) => formData.append("files", file));

      const response = await fetch(`/api/document-tools/${tool.slug}`, {
        method: "POST",
        body: formData,
      });

      const contentType = response.headers.get("content-type") || "";

      if (!response.ok) {
        const payload = contentType.includes("application/json")
          ? await response.json()
          : { error: "The server could not process this file." };
        throw new Error(payload.error || "The server could not process this file.");
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const disposition = response.headers.get("content-disposition") || "";
      const matchedName = disposition.match(/filename="([^"]+)"/i);

      setResult({
        url,
        fileName: matchedName?.[1] || `${tool.slug}.${tool.outputFormat.toLowerCase()}`,
        size: blob.size,
        type: blob.type,
      });
      setStatus("done");
    } catch (nextError) {
      setError(nextError.message || "Processing failed. Please try again.");
      setStatus("error");
    }
  }

  return (
    <div className="document-tools-card rounded-lg border border-[#dfe6f1] bg-white p-4 shadow-[0_12px_30px_rgba(15,23,42,0.055)] sm:p-5">
      <div className="grid gap-4 lg:grid-cols-[minmax(0,0.95fr)_minmax(280px,0.55fr)]">
        <div>
          <label
            onDragOver={(event) => {
              event.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={(event) => {
              event.preventDefault();
              setDragging(false);
              handleFiles(event.dataTransfer.files);
            }}
            className={`flex min-h-[220px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-5 text-center transition ${
              dragging ? "border-[#ff7417] bg-orange-50" : "border-slate-200 bg-slate-50/80 hover:border-[#ff7417]"
            }`}
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#061b4f] text-white">
              <Icon type="upload" className="h-7 w-7" />
            </span>
            <span className="mt-4 text-lg font-extrabold text-[#071d49]">Upload or drag files here</span>
            <span className="mt-2 max-w-md text-sm leading-6 text-slate-600">
              Accepted formats: {acceptedFormatsLabel}. File-size limit: {tool.limitLabel}.
            </span>
            <input
              ref={fileInputRef}
              type="file"
              accept={acceptValue}
              multiple={tool.slug === "jpg-to-pdf" || tool.slug === "merge-pdf"}
              className="sr-only"
              onChange={(event) => handleFiles(event.target.files)}
            />
          </label>

          {files.length ? (
            <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50/80 p-3">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-extrabold text-[#071d49]">
                  {files.length} file{files.length > 1 ? "s" : ""} selected
                </p>
                <p className="text-xs font-bold text-slate-500">{formatBytes(totalSize)}</p>
              </div>
              <ul className="mt-2 grid gap-2">
                {files.map((file) => (
                  <li key={`${file.name}-${file.size}`} className="flex items-center justify-between gap-3 rounded-md bg-white px-3 py-2 text-sm">
                    <span className="min-w-0 truncate font-semibold text-slate-700">{file.name}</span>
                    <span className="flex-none text-xs font-bold text-slate-500">{formatBytes(file.size)}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {error ? (
            <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold leading-6 text-red-700">
              {error}
            </div>
          ) : null}

          <div className="mt-4 grid gap-2 sm:grid-cols-[minmax(0,1fr)_auto]">
            <button
              type="button"
              onClick={processFiles}
              disabled={!canSubmit}
              className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-extrabold transition ${
                canSubmit ? enabledButtonClass : disabledButtonClass
              }`}
            >
              {isProcessing ? "Processing..." : "Process"}
            </button>
            <button
              type="button"
              onClick={resetTool}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-slate-200 bg-white px-5 py-3 text-sm font-extrabold text-[#071d49] transition hover:border-[#ff7417] hover:text-[#ff7417]"
            >
              <Icon type="refresh" className="h-4 w-4" />
              Reset
            </button>
          </div>
        </div>

        <aside className="rounded-lg border border-slate-200 bg-slate-50/80 p-4">
          <h2 className="text-lg font-extrabold text-[#071d49]">Result preview</h2>
          {isProcessing ? (
            <div className="mt-4">
              <div className="h-2 overflow-hidden rounded-full bg-white">
                <div className="h-full w-2/3 animate-pulse rounded-full bg-[#ff7417]" />
              </div>
              <p className="mt-3 text-sm font-semibold leading-6 text-slate-600">
                Processing automatically. Keep this tab open until the download is ready.
              </p>
            </div>
          ) : result ? (
            <div className="mt-4">
              {result.type === "application/pdf" ? (
                <iframe
                  title={`${tool.name} result preview`}
                  src={result.url}
                  className="h-[360px] w-full rounded-lg border border-slate-200 bg-white"
                />
              ) : null}
              <a
                href={result.url}
                download={result.fileName}
                className="mt-3 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md bg-[#ff7417] px-5 py-3 text-sm font-extrabold text-white transition hover:bg-[#e96009]"
              >
                <Icon type="download" className="h-4 w-4" />
                Download {result.fileName}
              </a>
              <p className="mt-2 text-xs font-semibold text-slate-500">
                Output size: {formatBytes(result.size)}
              </p>
            </div>
          ) : (
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Your processed file preview and download button will appear here.
            </p>
          )}

          <div className="mt-4 rounded-lg border border-emerald-100 bg-emerald-50 px-4 py-3">
            <div className="flex items-start gap-3">
              <Icon type="shield" className="mt-0.5 h-5 w-5 flex-none text-emerald-700" />
              <p className="text-sm font-semibold leading-6 text-emerald-800">
                Files are processed automatically in a temporary workspace and deleted after completion. Documents are not permanently stored by default.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default function DocumentToolPage({ tool }) {
  const relatedTools = getRelatedDocumentTools(tool);

  return (
    <div className="document-tools-shell mx-auto max-w-[1180px]">
      <nav aria-label="Breadcrumb" className="mb-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-4 py-2 text-sm text-slate-600 shadow-sm">
        <Link href="/" className="font-semibold text-portal-600 hover:text-[#ff7417]">Home</Link>
        <span aria-hidden="true">/</span>
        <Link href="/document-tools" className="font-semibold text-portal-600 hover:text-[#ff7417]">Document Tools</Link>
        <span aria-hidden="true">/</span>
        <span className="font-bold text-slate-800">{tool.name}</span>
      </nav>

      <header className="rounded-lg border border-[#dfe6f1] bg-white p-5 shadow-[0_12px_30px_rgba(15,23,42,0.055)] sm:p-6">
        <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#ff7417]">Document Tools</p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-[#071d49] sm:text-4xl">{tool.title}</h1>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">{tool.intro}</p>
      </header>

      <div className="mt-5">
        <DocumentToolRunner tool={tool} />
      </div>

      <section className="mt-6 grid gap-4 lg:grid-cols-3">
        {[
          ["Simple workflow", "Upload your file, process automatically, preview the result, and download."],
          ["Private by default", "Temporary files are removed after each request; no manual human processing is used."],
          ["Mobile ready", "The upload flow, status messages, preview, reset, and download controls are built for small screens first."],
        ].map(([title, text]) => (
          <div key={title} className="document-tools-card rounded-lg border border-[#dfe6f1] bg-white p-4 shadow-[0_8px_20px_rgba(15,23,42,0.04)]">
            <h2 className="text-lg font-extrabold text-[#071d49]">{title}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
          </div>
        ))}
      </section>

      {tool.backendNote ? (
        <div className="mt-5 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-semibold leading-6 text-amber-800">
          Server requirement: {tool.backendNote}
        </div>
      ) : null}

      <section className="mt-6">
        <h2 className="text-2xl font-extrabold text-[#071d49]">Related document tools</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {relatedTools.map((relatedTool) => (
            <DocumentToolCard key={relatedTool.slug} tool={relatedTool} />
          ))}
        </div>
      </section>
    </div>
  );
}

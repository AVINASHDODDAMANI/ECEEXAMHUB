import { useEffect, useRef, useState } from "react";

const MIN_SCALE = 0.75;
const MAX_SCALE = 1.8;
const SCALE_STEP = 0.15;

export default function PdfDocumentViewer({ fileUrl, title = "PDF document" }) {
  const canvasRef = useRef(null);
  const renderTaskRef = useRef(null);
  const [pdfDocument, setPdfDocument] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [scale, setScale] = useState(1);
  const [status, setStatus] = useState("Loading PDF...");
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    let loadingTask;

    async function loadPdf() {
      if (!fileUrl) {
        return;
      }

      setStatus("Loading PDF...");
      setError("");
      setPdfDocument(null);
      setPageNumber(1);
      setPageCount(0);

      try {
        const pdfjs = await import("pdfjs-dist/build/pdf.mjs");
        pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
        loadingTask = pdfjs.getDocument(fileUrl);
        const loadedDocument = await loadingTask.promise;

        if (!cancelled) {
          setPdfDocument(loadedDocument);
          setPageCount(loadedDocument.numPages);
          setStatus("");
        }
      } catch (loadError) {
        if (!cancelled) {
          setError("Unable to load the PDF preview. Use Download PDF to open the source file.");
          setStatus("");
        }
      }
    }

    loadPdf();

    return () => {
      cancelled = true;
      loadingTask?.destroy?.();
      renderTaskRef.current?.cancel?.();
    };
  }, [fileUrl]);

  useEffect(() => {
    let cancelled = false;

    async function renderPage() {
      if (!pdfDocument || !canvasRef.current) {
        return;
      }

      renderTaskRef.current?.cancel?.();
      setStatus("Rendering page...");

      try {
        const page = await pdfDocument.getPage(pageNumber);
        const viewport = page.getViewport({ scale });
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        const deviceScale = window.devicePixelRatio || 1;

        canvas.width = Math.floor(viewport.width * deviceScale);
        canvas.height = Math.floor(viewport.height * deviceScale);
        canvas.style.width = `${Math.floor(viewport.width)}px`;
        canvas.style.height = `${Math.floor(viewport.height)}px`;

        context.setTransform(deviceScale, 0, 0, deviceScale, 0, 0);
        context.clearRect(0, 0, viewport.width, viewport.height);

        const renderTask = page.render({ canvasContext: context, viewport });
        renderTaskRef.current = renderTask;
        await renderTask.promise;

        if (!cancelled) {
          setStatus("");
        }
      } catch (renderError) {
        if (!cancelled && renderError?.name !== "RenderingCancelledException") {
          setError("Unable to render this PDF page.");
          setStatus("");
        }
      }
    }

    renderPage();

    return () => {
      cancelled = true;
      renderTaskRef.current?.cancel?.();
    };
  }, [pageNumber, pdfDocument, scale]);

  return (
    <section className="mt-4 overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
      <div className="flex flex-col gap-3 border-b border-slate-200 bg-white p-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-portal-700">
            PDF.js Viewer
          </p>
          <h3 className="mt-1 text-base font-extrabold text-slate-950">
            {title}
          </h3>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setPageNumber((page) => Math.max(1, page - 1))}
            disabled={pageNumber <= 1}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-700 transition hover:border-portal-300 hover:text-portal-700 disabled:cursor-not-allowed disabled:opacity-45"
          >
            Previous
          </button>
          <span className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-bold text-slate-700">
            {pageNumber} / {pageCount || "-"}
          </span>
          <button
            type="button"
            onClick={() => setPageNumber((page) => Math.min(pageCount || page, page + 1))}
            disabled={!pageCount || pageNumber >= pageCount}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-700 transition hover:border-portal-300 hover:text-portal-700 disabled:cursor-not-allowed disabled:opacity-45"
          >
            Next
          </button>
          <button
            type="button"
            onClick={() => setScale((value) => Math.max(MIN_SCALE, Number((value - SCALE_STEP).toFixed(2))))}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-700 transition hover:border-portal-300 hover:text-portal-700"
          >
            Zoom -
          </button>
          <button
            type="button"
            onClick={() => setScale((value) => Math.min(MAX_SCALE, Number((value + SCALE_STEP).toFixed(2))))}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-700 transition hover:border-portal-300 hover:text-portal-700"
          >
            Zoom +
          </button>
        </div>
      </div>

      {status ? (
        <p className="px-4 py-3 text-sm font-semibold text-slate-600" aria-live="polite">
          {status}
        </p>
      ) : null}
      {error ? (
        <p className="m-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-800">
          {error}
        </p>
      ) : null}

      <div className="max-h-[760px] overflow-auto bg-slate-100 p-3 sm:p-5">
        <canvas
          ref={canvasRef}
          className="mx-auto block max-w-none rounded-lg bg-white shadow-[0_12px_35px_rgba(15,23,42,0.18)]"
          role="img"
          aria-label={`${title} page ${pageNumber}`}
        />
      </div>
    </section>
  );
}

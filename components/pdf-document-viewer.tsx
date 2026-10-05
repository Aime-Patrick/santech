"use client";

import { useEffect, useRef, useState } from "react";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";

type PdfModule = typeof import("react-pdf");

export function PdfDocumentViewer({ url }: { url: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pdfModule, setPdfModule] = useState<PdfModule | null>(null);
  const [loadError, setLoadError] = useState(false);
  const [pageWidth, setPageWidth] = useState(640);
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    let active = true;
    import("react-pdf").then((module) => {
      module.pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${module.pdfjs.version}/build/pdf.worker.min.mjs`;
      if (active) setPdfModule(module);
    }).catch(() => {
      if (active) setLoadError(true);
    });

    return () => { active = false; };
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || typeof ResizeObserver === "undefined") return;

    const updateWidth = () => setPageWidth(Math.max(280, Math.min(container.clientWidth - 24, 760)));
    updateWidth();
    const observer = new ResizeObserver(updateWidth);
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  if (loadError) {
    return <div className="grid min-h-[300px] place-items-center bg-slate-100 p-6 text-center text-xs text-red-600 sm:min-h-[380px]">Unable to initialize the PDF viewer.</div>;
  }

  if (!pdfModule) {
    return <div className="grid min-h-[300px] place-items-center bg-slate-100 text-xs text-slate-500 sm:min-h-[380px]">Loading company profile…</div>;
  }

  const { Document, Page } = pdfModule;

  return (
    <div ref={containerRef} className="overflow-hidden bg-slate-100 p-3">
      <div className="flex items-center justify-between gap-3 border-b border-slate-200 pb-3 text-[10px] font-black uppercase tracking-[0.12em] text-[#0a1f44]">
        <span>Company profile</span>
        <span>{numPages > 0 ? `Page ${pageNumber} of ${numPages}` : "Loading PDF"}</span>
      </div>

      <div className="mt-3 flex min-h-[300px] justify-center overflow-auto bg-slate-200 p-3 sm:min-h-[380px]">
        <Document
          file={url}
          onLoadSuccess={({ numPages: loadedPages }) => {
            setNumPages(loadedPages);
            setPageNumber(1);
          }}
          loading={<p className="self-center text-xs text-slate-500">Loading company profile…</p>}
          error={<p className="self-center text-xs text-red-600">Unable to load the company profile PDF.</p>}
        >
          <Page pageNumber={pageNumber} width={pageWidth} renderTextLayer={false} renderAnnotationLayer={false} />
        </Document>
      </div>

      {numPages > 1 && (
        <div className="mt-3 flex items-center justify-between gap-3">
          <button type="button" disabled={pageNumber <= 1} onClick={() => setPageNumber((current) => Math.max(1, current - 1))} className="rounded-md border border-slate-300 px-3 py-1.5 text-[10px] font-bold text-[#0a1f44] transition-colors hover:bg-white disabled:cursor-not-allowed disabled:opacity-40">Previous</button>
          <button type="button" disabled={pageNumber >= numPages} onClick={() => setPageNumber((current) => Math.min(numPages, current + 1))} className="rounded-md border border-slate-300 px-3 py-1.5 text-[10px] font-bold text-[#0a1f44] transition-colors hover:bg-white disabled:cursor-not-allowed disabled:opacity-40">Next</button>
        </div>
      )}
    </div>
  );
}

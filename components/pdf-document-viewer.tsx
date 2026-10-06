"use client";

import { useState } from "react";
import { FileText, AlertCircle, ExternalLink } from "lucide-react";
import { getInlinePdfUrl } from "@/lib/pdf-utils";

/**
 * Displays a PDF using the browser's built-in PDF viewer via an iframe.
 * 
 * Why not react-pdf?
 * - react-pdf requires exact pdfjs-dist version matching (worker ↔ core mismatch = silent failure)
 * - ESM/CJS conflicts with Next.js Turbopack
 * - Large PDFs (~19MB) crash the ArrayBuffer fetch approach
 * - Every modern browser already has a built-in PDF viewer that handles all of this
 */
export function PdfDocumentViewer({ url }: { url: string }) {
  const [iframeError, setIframeError] = useState(false);
  const inlineUrl = getInlinePdfUrl(url);

  if (iframeError) {
    return (
      <div className="grid min-h-[420px] place-items-center gap-4 bg-slate-50 p-8 text-center">
        <div className="flex flex-col items-center gap-3">
          <AlertCircle className="size-8 text-slate-400" />
          <p className="text-sm font-medium text-slate-600">
            Your browser could not display this PDF inline.
          </p>
          <a
            href={inlineUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-[#0a1f44] px-5 py-2.5 text-xs font-bold text-white transition-colors hover:bg-brand-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary focus-visible:ring-offset-2"
          >
            Open company profile
            <ExternalLink className="size-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-[420px] bg-slate-100 sm:min-h-[520px]">
      {/* Loading state shown behind the iframe */}
      <div className="absolute inset-0 z-0 grid place-items-center">
        <div className="flex flex-col items-center gap-3 text-slate-400">
          <FileText className="size-8 animate-pulse" />
          <p className="text-xs font-medium">Loading company profile…</p>
        </div>
      </div>

      <iframe
        src={inlineUrl}
        title="SAN TECH Company Profile"
        className="relative z-10 h-full min-h-[420px] w-full border-0 sm:min-h-[520px]"
        onError={() => setIframeError(true)}
      />
    </div>
  );
}

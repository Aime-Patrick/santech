"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  X, 
  Download, 
  ArrowUpRight,
  FileText,
  LayoutGrid
} from "lucide-react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import { getInlinePdfUrl } from "@/lib/pdf-utils";

const TOTAL_PAGES = 12;

const PAGES = Array.from({ length: TOTAL_PAGES }, (_, i) => ({
  pageNumber: i + 1,
  src: `/images/company-profile/page-${i + 1}.jpg`,
}));

export function CompanyProfilePdf({
  url = "/images/SAN TECH COMPANY PROFILE (1).pdf",
}: {
  url?: string;
}) {
  const isExternalUrl = url.startsWith("http://") || url.startsWith("https://");
  const [currentPage, setCurrentPage] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showThumbnails, setShowThumbnails] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (isExternalUrl) return;

    if (e.key === "ArrowRight") {
      setCurrentPage((p) => Math.min(TOTAL_PAGES, p + 1));
    } else if (e.key === "ArrowLeft") {
      setCurrentPage((p) => Math.max(1, p - 1));
    } else if (e.key === "Escape" && isFullscreen) {
      setIsFullscreen(false);
    }
  }, [isExternalUrl, isFullscreen]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (!isFullscreen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isFullscreen]);

  const inlinePdfUrl = getInlinePdfUrl(url);

  // If viewing an external PDF link
  if (isExternalUrl) {
    return (
      <div className="flex flex-col border border-slate-200 bg-white">
        {/* Single Unified Header with ONE clear Action Button */}
        <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-3.5 py-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#0a1f44]">
            <FileText className="size-3.5 text-brand-secondary" />
            <span className="font-bold truncate max-w-[200px] sm:max-w-xs">
              {url.split("/").pop() || "Document"}
            </span>
            <span className="bg-slate-200 px-1.5 py-0.5 text-[9px] font-black text-slate-700">
              PDF
            </span>
          </div>

          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 bg-[#0a1f44] px-3 py-1.5 text-xs font-bold text-white transition-colors hover:bg-brand-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary"
          >
            <span>Open in New Tab</span>
            <ArrowUpRight className="size-3.5" />
          </a>
        </div>

        {/* Embedded Viewer */}
        <div className="relative h-[380px] w-full bg-slate-100">
          <object
            data={url}
            type="application/pdf"
            className="h-full w-full border-0"
          >
            <div className="flex h-full flex-col items-center justify-center gap-3 p-6 text-center">
              <FileText className="size-8 text-slate-400" />
              <p className="text-xs text-slate-600">
                Preview not directly embeddable for this external domain.
              </p>
              <a
                href={url}
                target="_blank"
                rel="noreferrer"
                className="bg-[#0a1f44] px-3.5 py-1.5 text-xs font-bold text-white transition-colors hover:bg-brand-secondary"
              >
                Open PDF in new tab
              </a>
            </div>
          </object>
        </div>
      </div>
    );
  }

  // Internal SAN TECH Document Reader
  return (
    <div className="flex flex-col border border-slate-200 bg-white">
      {/* Top Toolbar */}
      <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-3 py-2">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#0a1f44]">
          <FileText className="size-3.5 text-brand-secondary" />
          <span className="font-bold">SAN TECH Company Profile</span>
          <span className="bg-slate-200 px-1.5 py-0.5 text-[10px] font-black text-slate-700">
            {TOTAL_PAGES} PAGES
          </span>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setShowThumbnails((v) => !v)}
            title={showThumbnails ? "Return to single page view" : "View all page thumbnails"}
            className={`flex items-center gap-1.5 border px-2.5 py-1 text-[11px] font-bold transition-colors ${
              showThumbnails
                ? "border-[#0a1f44] bg-[#0a1f44] text-white"
                : "border-slate-300 bg-white text-slate-700 hover:border-brand-secondary hover:text-[#0a1f44]"
            }`}
          >
            <LayoutGrid className="size-3.5" />
            <span>{showThumbnails ? "Single Page" : "Grid View"}</span>
          </button>

          <button
            type="button"
            onClick={() => setIsFullscreen(true)}
            title="Expand fullscreen view"
            className="flex items-center gap-1 border border-slate-300 bg-white px-2.5 py-1 text-[11px] font-bold text-slate-700 transition-colors hover:border-brand-secondary hover:text-[#0a1f44]"
          >
            <Maximize2 className="size-3.5" />
            <span className="hidden sm:inline">Fullscreen</span>
          </button>
        </div>
      </div>

      {/* Main View: Thumbnail Grid OR Single Page */}
      {showThumbnails ? (
        <div className="grid h-[370px] grid-cols-4 gap-2 overflow-y-auto bg-slate-100 p-2.5 sm:grid-cols-6">
          {PAGES.map((page) => {
            const isSelected = currentPage === page.pageNumber;
            return (
              <button
                key={page.pageNumber}
                type="button"
                onClick={() => {
                  setCurrentPage(page.pageNumber);
                  setShowThumbnails(false);
                }}
                className={`group relative flex flex-col border bg-white p-1 text-left transition-all ${
                  isSelected
                    ? "border-brand-secondary ring-2 ring-brand-secondary/40 shadow-sm"
                    : "border-slate-300 hover:border-[#0a1f44] hover:shadow-xs"
                }`}
              >
                <div className="relative aspect-[1/1.414] w-full overflow-hidden bg-slate-50">
                  <Image
                    src={page.src}
                    alt={`Page ${page.pageNumber}`}
                    fill
                    sizes="(min-width: 640px) 140px, 80px"
                    className="object-contain"
                  />
                </div>
                <div className="mt-1 flex items-center justify-between border-t border-slate-100 px-0.5 pt-0.5 text-[10px] font-black">
                  <span className={isSelected ? "text-brand-secondary" : "text-slate-600"}>
                    P. {String(page.pageNumber).padStart(2, "0")}
                  </span>
                  {isSelected && (
                    <span className="size-1.5 bg-brand-secondary" />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      ) : (
        <div className="relative flex h-[370px] flex-col items-center justify-between bg-slate-100 p-3">
          {/* Active Page Image */}
          <div className="relative h-[300px] aspect-[1/1.414] overflow-hidden border border-slate-300 bg-white shadow-sm">
            <Image
              src={PAGES[currentPage - 1].src}
              alt={`SAN TECH Company Profile - Page ${currentPage}`}
              fill
              priority={currentPage === 1}
              sizes="450px"
              className="object-contain"
            />
          </div>

          {/* Clean Navigation Bar */}
          <div className="flex w-full max-w-[380px] items-center justify-between gap-2 pt-1.5">
            <button
              type="button"
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="flex items-center gap-1 border border-slate-300 bg-white px-3 py-1 text-[11px] font-bold text-[#0a1f44] transition-all hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft className="size-3.5" />
              Prev
            </button>

            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
              <span className="border border-slate-200 bg-white px-2 py-0.5 font-black text-[#0a1f44]">
                {String(currentPage).padStart(2, "0")}
              </span>
              <span className="text-slate-400">/</span>
              <span className="text-slate-600">{String(TOTAL_PAGES).padStart(2, "0")}</span>
            </div>

            <button
              type="button"
              disabled={currentPage >= TOTAL_PAGES}
              onClick={() => setCurrentPage((p) => Math.min(TOTAL_PAGES, p + 1))}
              className="flex items-center gap-1 border border-slate-300 bg-white px-3 py-1 text-[11px] font-bold text-[#0a1f44] transition-all hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
              <ChevronRight className="size-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Bottom Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-200 bg-slate-50 px-3 py-2">
        <span className="text-[10px] font-medium text-slate-500">
          Keyboard: Press ← or → to navigate
        </span>

        <div className="flex items-center gap-2">
          <a
            href={inlinePdfUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 bg-[#0a1f44] px-3 py-1.5 text-xs font-bold text-white transition-colors hover:bg-brand-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary"
          >
            <span>Open PDF File</span>
            <ArrowUpRight className="size-3.5" />
          </a>

          <a
            href={url}
            download="SAN-TECH-Company-Profile.pdf"
            className="inline-flex items-center gap-1.5 border border-slate-300 bg-white px-3 py-1.5 text-xs font-bold text-[#0a1f44] transition-colors hover:bg-slate-100"
            title="Download original document"
          >
            <Download className="size-3.5" />
            <span className="hidden sm:inline">Download</span>
          </a>
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {isFullscreen && mounted && createPortal(
        <AnimatePresence>
          <motion.div
            className="fixed inset-0 z-[100] flex flex-col bg-[#07152d]/95 p-3 sm:p-6 backdrop-blur-md"
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Modal Header */}
            <div className="flex shrink-0 items-center justify-between border-b border-white/10 pb-3 text-white">
              <div className="flex items-center gap-3">
                <FileText className="size-5 text-brand-secondary" />
                <div>
                  <h2 className="text-sm font-bold sm:text-base">SAN TECH Company Profile</h2>
                  <p className="text-[11px] text-slate-300">
                    Page {currentPage} of {TOTAL_PAGES}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={inlinePdfUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="hidden sm:inline-flex items-center gap-1.5 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-white/20"
                >
                  <span>Open PDF in Tab</span>
                  <ArrowUpRight className="size-3.5" />
                </a>

                <button
                  type="button"
                  onClick={() => setIsFullscreen(false)}
                  aria-label="Close fullscreen view"
                  className="grid size-9 place-items-center bg-white/10 text-white transition-colors hover:bg-white/20"
                >
                  <X className="size-5" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="relative min-h-0 flex-1 overflow-auto p-2 sm:p-4 flex items-center justify-center">
              <div className="relative h-full w-full max-w-4xl aspect-[1/1.414] max-h-[82vh] overflow-hidden bg-white shadow-2xl">
                <Image
                  src={PAGES[currentPage - 1].src}
                  alt={`SAN TECH Company Profile - Page ${currentPage}`}
                  fill
                  sizes="1000px"
                  className="object-contain"
                />
              </div>
            </div>

            {/* Modal Navigation Footer */}
            <div className="flex shrink-0 items-center justify-center gap-4 pt-3 border-t border-white/10">
              <button
                type="button"
                disabled={currentPage <= 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="flex items-center gap-1.5 bg-white/10 px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-30"
              >
                <ChevronLeft className="size-4" />
                Previous Page
              </button>

              <span className="text-xs font-bold text-white">
                {currentPage} / {TOTAL_PAGES}
              </span>

              <button
                type="button"
                disabled={currentPage >= TOTAL_PAGES}
                onClick={() => setCurrentPage((p) => Math.min(TOTAL_PAGES, p + 1))}
                className="flex items-center gap-1.5 bg-white/10 px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-30"
              >
                Next Page
                <ChevronRight className="size-4" />
              </button>
            </div>
          </motion.div>
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
}

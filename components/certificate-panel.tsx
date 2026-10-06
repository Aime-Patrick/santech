"use client";

import Image from "next/image";
import { ArrowUpRight, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";

type CertificateOrientation = "portrait" | "landscape" | "square";

type CertificateItem = {
  title: string;
  issuer: string;
  image: string;
  file?: string;
  orientation: CertificateOrientation;
};

// These records are ready to be replaced by CMS data later. The orientation is
// kept with each record so a portrait certificate never gets forced into a
// landscape modal (or cropped to fit one).
const certificateItems: readonly CertificateItem[] = [
  {
    title: "Data Processor Certificate",
    issuer: "National Cyber Security Authority · Data Protection and Privacy Office",
    image: "/images/SAN TECH Data Processor Certificate_page-0001.jpg",
    file: "/images/SAN TECH Data Processor Certificate.pdf",
    orientation: "portrait",
  },
  {
    title: "Technology Excellence Recognition",
    issuer: "SAN TECH innovation ecosystem",
    image: "/certificates/recognition-technology-excellence.png",
    orientation: "square",
  },
  {
    title: "Digital Innovation Recognition",
    issuer: "SAN TECH innovation ecosystem",
    image: "/certificates/recognition-digital-innovation.png",
    orientation: "square",
  },
  {
    title: "Community Impact Recognition",
    issuer: "SAN TECH innovation ecosystem",
    image: "/certificates/recognition-community-impact.png",
    orientation: "square",
  },
  {
    title: "EdTech Trust Seal",
    issuer: "Digital Bridge Institute",
    image: "/certificates/edtech-trust-seal.png",
    orientation: "square",
  },
];

const cardAspect: Record<CertificateOrientation, string> = {
  portrait: "aspect-[3/4]",
  landscape: "aspect-[4/3]",
  square: "aspect-square",
};

const modalImageSize: Record<CertificateOrientation, string> = {
  portrait: "h-[70svh] max-w-xl",
  landscape: "h-[52svh] max-w-5xl",
  square: "h-[65svh] max-w-2xl",
};

export function CertificatePanel() {
  const [selectedCertificate, setSelectedCertificate] = useState<CertificateItem | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!selectedCertificate) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedCertificate(null);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedCertificate]);

  return (
    <div className="space-y-8">
      <div className="max-w-2xl">
        <p className="text-[11px] font-black uppercase tracking-[0.2em] text-brand-secondary">Certificates &amp; trust</p>
        <h1 className="font-exo mt-4 text-xl font-normal leading-[1.18] tracking-[-0.035em] text-[#303755] sm:text-2xl lg:text-[2rem]">Proof behind the work.</h1>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {certificateItems.map((certificate) => (
          <button
            key={certificate.title}
            type="button"
            onClick={() => setSelectedCertificate(certificate)}
            className="group overflow-hidden rounded-xl border border-slate-200 bg-white text-left shadow-[0_8px_22px_rgba(10,31,68,0.05)] transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-0.5 hover:border-brand-secondary/50 hover:shadow-[0_14px_30px_rgba(10,31,68,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary focus-visible:ring-offset-2"
            aria-label={`View ${certificate.title}`}
          >
            <div className={`relative overflow-hidden bg-[#eef4fa] ${cardAspect[certificate.orientation]}`}>
              <Image
                src={certificate.image}
                alt={certificate.title}
                fill
                sizes="(min-width: 1280px) 300px, (min-width: 640px) 45vw, 100vw"
                className="object-contain p-3 transition-transform duration-500 group-hover:scale-[1.02]"
              />
            </div>
            <div className="p-4">
              <p className="text-sm font-bold leading-5 text-[#0a1f44]">{certificate.title}</p>
              <p className="mt-1 line-clamp-2 text-xs leading-5 text-[#68718a]">{certificate.issuer}</p>
              <span className="mt-3 inline-flex items-center text-[10px] font-black uppercase tracking-[0.14em] text-brand-secondary">
                View certificate <ArrowUpRight className="ml-1 size-3.5" aria-hidden="true" />
              </span>
            </div>
          </button>
        ))}
      </div>

      {typeof document !== "undefined" && createPortal(
        <AnimatePresence>
          {selectedCertificate && (
            <motion.div
              className="fixed inset-0 z-[120] flex items-center justify-center bg-[#07152d]/70 p-3 backdrop-blur-sm sm:p-6"
              role="dialog"
              aria-modal="true"
              aria-labelledby="certificate-dialog-title"
              onMouseDown={() => setSelectedCertificate(null)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="relative flex max-h-[94svh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-white shadow-[0_24px_70px_rgba(7,21,45,0.3)]"
                onMouseDown={(event) => event.stopPropagation()}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 14, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={prefersReducedMotion ? undefined : { opacity: 0, y: 8, scale: 0.98 }}
                transition={{ duration: prefersReducedMotion ? 0.01 : 0.22, ease: "easeOut" }}
              >
                <div className="flex shrink-0 items-start justify-between gap-4 border-b border-slate-200 px-5 py-4 sm:px-6">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.18em] text-brand-secondary">SAN TECH / CERTIFICATE</p>
                    <h2 id="certificate-dialog-title" className="font-exo mt-1 text-lg font-bold leading-tight text-[#0a1f44] sm:text-xl">{selectedCertificate.title}</h2>
                    <p className="mt-1 text-xs text-slate-500">{selectedCertificate.issuer}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedCertificate(null)}
                    aria-label="Close certificate viewer"
                    className="grid size-9 shrink-0 place-items-center rounded-full border border-slate-200 text-[#0a1f44] transition-colors hover:border-brand-secondary hover:text-brand-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary"
                  >
                    <X className="size-4" aria-hidden="true" />
                  </button>
                </div>

                <div className="min-h-0 flex-1 overflow-auto bg-[#eef4fa] p-3 sm:p-6">
                  <div className={`relative mx-auto w-full ${modalImageSize[selectedCertificate.orientation]}`}>
                    <Image
                      src={selectedCertificate.image}
                      alt={selectedCertificate.title}
                      fill
                      sizes="(min-width: 1024px) 960px, 100vw"
                      className="object-contain"
                    />
                  </div>
                </div>

                {selectedCertificate.file && (
                  <div className="flex shrink-0 justify-end border-t border-slate-200 px-5 py-3 sm:px-6">
                    <a
                      href={selectedCertificate.file}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg bg-[#0a1f44] px-3.5 py-2 text-xs font-bold text-white transition-colors hover:bg-brand-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary focus-visible:ring-offset-2"
                    >
                      Open PDF <ArrowUpRight className="size-3.5" aria-hidden="true" />
                    </a>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </div>
  );
}

"use client";

import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { useState } from "react";
import { useEffect } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ComputerScreenFrame } from "@/components/computer-screen-frame";
import { Safari } from "@/components/ui/safari";

export type CoreFeature = {
  label: string;
  icon?: LucideIcon;
  description: string;
};

export type SplitFeatureMedia = {
  kind: "image" | "video";
  src: string;
  alt: string;
  fit?: "cover" | "contain";
  transparent?: boolean;
  images?: string[];
};

export type SplitFeatureFact = {
  label: string;
  value: string;
};

export type SplitFeatureTimelineItem = {
  year: string;
  description: string;
};

export function SplitFeaturePanel({
  title,
  description,
  details = [],
  facts = [],
  timeline = [],
  subItems = [],
  coreFeatures,
  media,
  detailHref,
  browser = "computer",
  browserUrl = "santech.rw",
  showFeatureDescriptions = true,
  combined = false,
}: {
  title: string;
  description?: string;
  details?: string[];
  facts?: SplitFeatureFact[];
  timeline?: SplitFeatureTimelineItem[];
  subItems?: string[];
  coreFeatures?: CoreFeature[];
  media?: SplitFeatureMedia;
  detailHref?: string;
  browser?: "computer" | "safari";
  browserUrl?: string;
  showFeatureDescriptions?: boolean;
  combined?: boolean;
}) {
  const [expandedFeature, setExpandedFeature] = useState<string | null>(coreFeatures?.[0]?.label ?? null);
  const mediaImages = media?.images?.length ? media.images : media ? [media.src] : [];
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    setActiveMediaIndex(0);
  }, [media?.src]);

  useEffect(() => {
    if (mediaImages.length < 2) return;
    const timer = window.setInterval(() => {
      setActiveMediaIndex((current) => (current + 1) % mediaImages.length);
    }, 4500);
    return () => window.clearInterval(timer);
  }, [mediaImages.length]);

  return (
    <div className={`grid ${combined ? "gap-4 lg:gap-5" : "gap-7 lg:gap-10"} lg:items-start ${media ? "lg:grid-cols-[0.82fr_1.18fr]" : combined ? "lg:grid-cols-1" : "lg:grid-cols-[0.9fr_1.1fr]"}`}>
      <div className="flex min-w-0 flex-col justify-start">
        <h1 className={`font-exo max-w-[32rem] font-normal leading-[1.06] tracking-[-0.035em] text-[#303755] ${combined ? "text-xl sm:text-2xl lg:text-[2rem]" : "text-2xl sm:text-3xl lg:text-[2.1rem]"}`}>{title}</h1>

        {media && description && <p className="mt-4 max-w-xl text-sm leading-6 text-[#68718a] sm:text-base">{description}</p>}

        {subItems.length > 0 && <motion.div layout className="mt-7 grid gap-x-6 gap-y-3 border-t border-slate-200 pt-5 sm:grid-cols-2" aria-label="Solution capabilities">
          {subItems.map((item) => <motion.div layout key={item} className="flex items-start gap-2 text-sm leading-5 text-[#68718a]"><span className="mt-0.5 text-brand-secondary" aria-hidden="true">+</span><span>{item}</span></motion.div>)}
        </motion.div>}

        {coreFeatures && coreFeatures.length > 0 && <motion.div layout transition={{ layout: { duration: prefersReducedMotion ? 0.01 : 0.22, ease: "easeOut" } }} className="mt-5 border-l border-slate-300 pl-3" role="tablist" aria-label="Features">
          {coreFeatures.map(({ label, icon: Icon, description }) => {
            const expanded = expandedFeature === label;

            return (
              <motion.button
                key={label}
                type="button"
                role="tab"
                layout
                onClick={() => setExpandedFeature(label)}
                aria-selected={expanded}
                transition={{ layout: { duration: prefersReducedMotion ? 0.01 : 0.22, ease: "easeOut" } }}
                className={`relative flex w-full items-start gap-3 py-2 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#075eaa] focus-visible:ring-offset-2 ${expanded ? "text-[#0a1f44]" : "text-slate-500 hover:text-[#0a1f44]"}`}
              >
                  <span className={`grid size-8 shrink-0 place-items-center rounded-lg text-[#075eaa] transition-colors ${expanded ? "bg-[#d9eafa]" : "bg-[#e6eef8]"}`}>
                    {Icon && <Icon className="size-4" strokeWidth={1.8} aria-hidden="true" />}
                  </span>
                  <span className="min-w-0 flex-1 pt-0.5">
                    <span className={`block text-[10px] font-black uppercase tracking-[0.1em] transition-colors sm:text-[11px] ${expanded ? "text-[#0a1f44]" : "text-slate-500"}`}>{label}</span>
                    <AnimatePresence initial={false} mode="wait">
                      {expanded && showFeatureDescriptions && (
                        <motion.span
                          key={`${label}-description`}
                          initial={prefersReducedMotion ? false : { opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={prefersReducedMotion ? undefined : { opacity: 0, y: -4 }}
                          transition={{ duration: prefersReducedMotion ? 0.01 : 0.18, ease: "easeOut" }}
                          className="mt-1 block max-w-xl text-xs font-normal leading-5 text-[#68718a] sm:text-[13px]"
                        >
                          {description}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </span>
                  {expanded && <span className="absolute -left-[17px] top-0 h-full w-0.5 bg-brand-secondary" aria-hidden="true" />}
              </motion.button>
            );
          })}
        </motion.div>}

      </div>

      {media ? (
        <div className="min-w-0">
          {browser === "safari" ? (
            <Safari
              url={browserUrl}
              imageSrc={mediaImages[activeMediaIndex] ?? media.src}
              className="mx-auto w-full max-w-[760px]"
              aria-label={`${title} product preview`}
            />
          ) : (
            <ComputerScreenFrame kind={media.kind} src={media.src} alt={media.alt} fit={media.fit} priority compact label="SAN TECH / PRODUCT VIEW" />
          )}
          {detailHref && (
            <Link
              href={detailHref}
              className="mx-auto mt-3 flex w-fit text-xs font-bold uppercase tracking-[0.1em] text-[#0a1f44] underline decoration-1 decoration-[#0a1f44]/55 underline-offset-4 transition-colors hover:text-brand-secondary hover:decoration-brand-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary focus-visible:ring-offset-2"
            >
              <span>Explore more</span>
            </Link>
          )}
        </div>
      ) : (
        <div className={combined ? "pl-0" : "border-l border-slate-300 pl-6 lg:pl-10"}>
          {description && <p className="max-w-2xl text-lg leading-8 text-[#68718a] sm:text-xl">{description}</p>}
          {timeline.length > 0 && <div className="mt-6 grid gap-4">{timeline.map((item) => <div key={item.year} className="grid grid-cols-[5.5rem_1fr] gap-4 border-l-2 border-[#dce7f5] pl-4"><p className="font-exo text-lg font-bold leading-6 tracking-[-0.02em] text-brand-secondary">{item.year}</p><p className="max-w-2xl text-sm leading-6 text-[#68718a] sm:text-base">{item.description}</p></div>)}</div>}
          {details.length > 0 && <div className="mt-7 grid gap-5">{details.map((detail) => <p key={detail} className="max-w-2xl text-base leading-7 text-[#68718a] sm:text-lg">{detail}</p>)}</div>}
          {facts.length > 0 && <div className="mt-8 grid gap-5 border-t border-slate-300 pt-6 sm:grid-cols-2">{facts.map((fact) => <div key={fact.label}><p className="text-[10px] font-black uppercase tracking-[0.18em] text-brand-secondary">{fact.label}</p><p className="mt-2 text-base font-bold text-[#0a1f44] sm:text-lg">{fact.value}</p></div>)}</div>}
        </div>
      )}
    </div>
  );
}

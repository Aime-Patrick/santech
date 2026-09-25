"use client";

import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

export type CoreFeature = {
  label: string;
  icon: LucideIcon;
  description: string;
};

export type SplitFeatureMedia = {
  kind: "image" | "video";
  src: string;
  alt: string;
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
  coreFeatures,
  media,
}: {
  title: string;
  description?: string;
  details?: string[];
  facts?: SplitFeatureFact[];
  timeline?: SplitFeatureTimelineItem[];
  coreFeatures?: CoreFeature[];
  media?: SplitFeatureMedia;
}) {
  const [expandedFeature, setExpandedFeature] = useState<string | null>(coreFeatures?.[0]?.label ?? null);
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className={`grid gap-10 lg:items-stretch lg:gap-14 ${media ? "lg:grid-cols-[0.82fr_1.18fr]" : "lg:grid-cols-[0.9fr_1.1fr]"}`}>
      <div className="flex min-w-0 flex-col justify-start">
        <h1 className="font-exo max-w-xl text-xl font-normal leading-[1.18] tracking-[-0.035em] text-[#303755] sm:text-2xl lg:text-[2rem]">{title}</h1>

        {media && description && <p className="mt-5 max-w-xl text-base leading-7 text-[#68718a]">{description}</p>}

        {coreFeatures && coreFeatures.length > 0 && <div className="mt-7 border-l border-slate-300 pl-4" role="tablist" aria-label="Features">
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
                className={`relative flex w-full items-start gap-4 py-2.5 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#075eaa] focus-visible:ring-offset-2 ${expanded ? "text-[#0a1f44]" : "text-slate-500 hover:text-[#0a1f44]"}`}
              >
                  <span className={`grid size-9 shrink-0 place-items-center rounded-xl text-[#075eaa] transition-colors ${expanded ? "bg-[#d9eafa]" : "bg-[#e6eef8]"}`}>
                    <Icon className="size-5" strokeWidth={1.8} aria-hidden="true" />
                  </span>
                  <span className="min-w-0 flex-1 pt-1">
                    <span className={`block text-[11px] font-black uppercase tracking-[0.1em] transition-colors sm:text-xs ${expanded ? "text-[#0a1f44]" : "text-slate-500"}`}>{label}</span>
                    <AnimatePresence initial={false} mode="wait">
                      {expanded && (
                        <motion.span
                          key={`${label}-description`}
                          initial={prefersReducedMotion ? false : { opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={prefersReducedMotion ? undefined : { opacity: 0, y: -4 }}
                          transition={{ duration: prefersReducedMotion ? 0.01 : 0.18, ease: "easeOut" }}
                          className="mt-1.5 block max-w-xl text-xs font-normal leading-5 text-[#68718a]"
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
        </div>}
      </div>

      {media ? (
        <div className="relative min-h-[360px] overflow-hidden rounded-xl bg-[#dceaf8] shadow-[0_24px_70px_rgba(10,31,68,0.1)] sm:min-h-[480px]">
          {media.kind === "video" ? (
            <video src={media.src} className="size-full object-cover" autoPlay muted loop playsInline preload="metadata" aria-label={media.alt} />
          ) : (
            <Image src={media.src} alt={media.alt} fill sizes="(max-width: 1024px) 100vw, 60vw" className="object-cover" />
          )}
        </div>
      ) : (
        <div className="border-l border-slate-300 pl-6 lg:pl-10">
          {description && <p className="max-w-2xl text-base leading-7 text-[#68718a] sm:text-lg">{description}</p>}
          {timeline.length > 0 && <div className="mt-6 grid gap-4">{timeline.map((item) => <div key={item.year} className="grid grid-cols-[5.5rem_1fr] gap-4 border-l-2 border-[#dce7f5] pl-4"><p className="font-exo text-lg font-bold leading-6 tracking-[-0.02em] text-brand-secondary">{item.year}</p><p className="max-w-2xl text-sm leading-6 text-[#68718a] sm:text-base">{item.description}</p></div>)}</div>}
          {details.length > 0 && <div className="mt-6 grid gap-4">{details.map((detail) => <p key={detail} className="max-w-2xl text-sm leading-6 text-[#68718a] sm:text-base">{detail}</p>)}</div>}
          {facts.length > 0 && <div className="mt-8 grid gap-5 border-t border-slate-300 pt-6 sm:grid-cols-2">{facts.map((fact) => <div key={fact.label}><p className="text-[10px] font-black uppercase tracking-[0.18em] text-brand-secondary">{fact.label}</p><p className="mt-2 text-sm font-bold text-[#0a1f44] sm:text-base">{fact.value}</p></div>)}</div>}
        </div>
      )}
    </div>
  );
}

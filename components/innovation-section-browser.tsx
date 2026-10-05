"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { innovationItems, type InnovationSection } from "@/lib/innovation-data";
import { SplitFeaturePanel } from "@/components/split-feature-panel";

export type { InnovationSection } from "@/lib/innovation-data";

export function InnovationSectionBrowser({ section }: { section: InnovationSection }) {
  const items = innovationItems[section];
  const isCompactListing = section === "services" || section === "solutions";
  const [selectedId, setSelectedId] = useState(items[0].id);
  const selected = items.find((item) => item.id === selectedId) ?? items[0];
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className={`grid gap-8 lg:items-start lg:gap-7 ${isCompactListing ? "lg:grid-cols-[215px_minmax(0,1fr)]" : "lg:grid-cols-[185px_minmax(0,1fr)]"}`}>
      <aside className="lg:sticky lg:top-32">
        <div className="border-l border-slate-300 pl-4">
          {items.map((item, index) => {
            const active = item.id === selected.id;
            return (
              <button key={item.id} type="button" onClick={() => setSelectedId(item.id)} aria-pressed={active} className={`group flex w-full items-center gap-3 py-2.5 text-left transition-colors ${active ? "text-[#0a1f44]" : "text-slate-500 hover:text-brand-secondary"}`}>
                <span className={`w-5 shrink-0 text-[10px] font-black tracking-[0.12em] ${active ? "text-brand-secondary" : "text-slate-400 group-hover:text-brand-secondary"}`}>{String(index + 1).padStart(2, "0")}</span>
                <span className={`min-w-0 flex-1 font-bold ${isCompactListing ? "text-xs leading-5" : "text-sm"}`}>{item.label}</span>
              </button>
            );
          })}
        </div>
      </aside>

      <AnimatePresence mode="wait">
        <motion.div key={selected.id} initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={prefersReducedMotion ? undefined : { opacity: 0, y: -8 }} transition={{ duration: prefersReducedMotion ? 0.01 : 0.28, ease: "easeOut" }}>
          <SplitFeaturePanel title={selected.title} description={selected.description} subItems={selected.subItems} coreFeatures={selected.coreFeatures} media={selected.media} detailHref={`/innovation-lab/${section}/${selected.id}`} browser={section === "product" ? "safari" : "computer"} browserUrl={`${selected.id}.santech.rw`} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

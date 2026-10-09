"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { innovationItems, type InnovationSection, type InnovationItem } from "@/lib/innovation-data";
import { SplitFeaturePanel } from "@/components/split-feature-panel";
import { SanHrmIsModuleTable } from "@/components/san-hrmis-module-table";

export type { InnovationSection } from "@/lib/innovation-data";

export function InnovationSectionBrowser({
  section,
  cmsItems,
}: {
  section: InnovationSection;
  cmsItems?: readonly InnovationItem[];
}) {
  // Keep locally defined products available while CMS records are being updated.
  // This also makes newly introduced products visible when the CMS still returns
  // an older product list.
  const items = cmsItems && cmsItems.length > 0
    ? [...cmsItems, ...innovationItems[section].filter((fallback) => !cmsItems.some((item) => item.id === fallback.id))]
    : innovationItems[section];
  const isCompactListing = section === "services" || section === "solutions";
  const [selectedId, setSelectedId] = useState(items[0].id);
  const selected = items.find((item) => item.id === selectedId) ?? items[0];
  const prefersReducedMotion = useReducedMotion();
  const isEVisitorsProduct = section === "product" && selected.id === "e-visitors";
  const isSanHrmIsProduct = section === "product" && selected.id === "san-hrmis";

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
          {isSanHrmIsProduct ? (
            <SanHrmIsModuleTable modules={selected.modules ?? []} description={selected.description} />
          ) : (
            <SplitFeaturePanel title={selected.title} description={selected.description} subItems={selected.subItems} coreFeatures={selected.coreFeatures} showFeatureDescriptions={!isEVisitorsProduct} media={selected.media} detailHref={isEVisitorsProduct ? "/e-visitors" : `/innovation-lab/${section}/${selected.id}`} browser={section === "product" ? "safari" : "computer"} browserUrl={`${selected.id}.santech.rw`} />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

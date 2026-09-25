"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { LeadershipBrowser } from "@/components/leadership-browser";
import { SplitFeaturePanel, type CoreFeature, type SplitFeatureFact, type SplitFeatureMedia, type SplitFeatureTimelineItem } from "@/components/split-feature-panel";

export type SharedContentItem = {
  id: string;
  label: string;
  title: string;
  description?: string;
  details?: string[];
  facts?: SplitFeatureFact[];
  timeline?: SplitFeatureTimelineItem[];
  coreFeatures?: CoreFeature[];
  media?: SplitFeatureMedia;
  content?: "leadership";
};

export function SharedContentBrowser({ items, initialItemId, initialLeadershipView = "executive" }: { items: readonly SharedContentItem[]; initialItemId?: string; initialLeadershipView?: "executive" | "team" }) {
  const [firstItem] = items;
  const [selectedId, setSelectedId] = useState(initialItemId ?? firstItem.id);
  const selected = items.find((item) => item.id === selectedId) ?? firstItem;
  const prefersReducedMotion = useReducedMotion();
  const timeline = selected.timeline ?? (selected.id === "journey" ? selected.details?.flatMap((detail) => {
    const match = detail.match(/^(\d{4}(?:\D+?\d{4})?)\s+\D+?\s+(.+)$/);
    return match ? [{ year: match[1], description: match[2] }] : [];
  }) : undefined);

  useEffect(() => {
    setSelectedId(initialItemId ?? firstItem.id);
  }, [firstItem.id, initialItemId]);

  return (
    <div className="grid gap-8 lg:grid-cols-[185px_minmax(0,1fr)] lg:items-start lg:gap-7">
      <aside className="lg:sticky lg:top-32">
        <div className="border-l border-slate-300 pl-4">
          {items.map((item, index) => {
            const active = item.id === selected.id;
            return (
              <button key={item.id} type="button" onClick={() => setSelectedId(item.id)} aria-pressed={active} className={`group flex w-full items-center gap-3 py-2.5 text-left transition-colors ${active ? "text-[#0a1f44]" : "text-slate-500 hover:text-brand-secondary"}`}>
                <span className={`w-5 shrink-0 text-[10px] font-black tracking-[0.12em] ${active ? "text-brand-secondary" : "text-slate-400 group-hover:text-brand-secondary"}`}>{String(index + 1).padStart(2, "0")}</span>
                <span className="min-w-0 flex-1 text-sm font-bold">{item.label}</span>
              </button>
            );
          })}
        </div>
      </aside>

      <AnimatePresence mode="wait">
        <motion.div key={selected.id} initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={prefersReducedMotion ? undefined : { opacity: 0, y: -8 }} transition={{ duration: prefersReducedMotion ? 0.01 : 0.28, ease: "easeOut" }}>
          {selected.content === "leadership" ? <LeadershipBrowser key={initialLeadershipView} initialView={initialLeadershipView} /> : <SplitFeaturePanel title={selected.title} description={selected.description} details={timeline ? [] : selected.details} facts={selected.facts} timeline={timeline} coreFeatures={selected.coreFeatures} media={selected.media} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

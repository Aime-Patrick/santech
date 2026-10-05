"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { LeadershipBrowser } from "@/components/leadership-browser";
import { SplitFeaturePanel, type CoreFeature, type SplitFeatureFact, type SplitFeatureMedia, type SplitFeatureTimelineItem } from "@/components/split-feature-panel";
import { CertificatePanel, CompanyProfilePanel, FocusPanel, IdentityPanel, JourneyPanel, MissionPanel, RecognitionPanel } from "@/components/legacy-sections";

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
  content?: "leadership" | "identity" | "mission" | "focus" | "profile" | "journey" | "recognition" | "certificate";
};

export function SharedContentBrowser({ items, initialItemId, initialLeadershipView = "executive", syncUrl = false, showSidebar = true, combinedPanel = false }: { items: readonly SharedContentItem[]; initialItemId?: string; initialLeadershipView?: "executive" | "team"; syncUrl?: boolean; showSidebar?: boolean; combinedPanel?: boolean }) {
  const [firstItem] = items;
  const [selectedId, setSelectedId] = useState(initialItemId ?? firstItem.id);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const selected = items.find((item) => item.id === selectedId) ?? firstItem;
  const prefersReducedMotion = useReducedMotion();
  const timeline = selected.timeline ?? (selected.id === "journey" ? selected.details?.flatMap((detail) => {
    const match = detail.match(/^(\d{4}(?:\D+?\d{4})?)\s+\D+?\s+(.+)$/);
    return match ? [{ year: match[1], description: match[2] }] : [];
  }) : undefined);

  useEffect(() => {
    setSelectedId(initialItemId ?? firstItem.id);
  }, [firstItem.id, initialItemId]);

  function selectItem(id: string) {
    setSelectedId(id);
    if (!syncUrl) return;

    const params = new URLSearchParams(searchParams.toString());
    params.set("section", id);
    if (id !== "leadership") params.delete("view");
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <div className={showSidebar ? "grid gap-8 lg:grid-cols-[185px_minmax(0,1fr)] lg:items-start lg:gap-7" : "block"}>
      {showSidebar && <aside className="lg:self-start">
        <div className="border-l border-slate-300 pl-4">
          {items.map((item, index) => {
            const active = item.id === selected.id;
            return (
              <button key={item.id} type="button" onClick={() => selectItem(item.id)} aria-pressed={active} className={`group flex w-full items-center gap-3 py-2.5 text-left transition-colors ${active ? "text-[#0a1f44]" : "text-slate-500 hover:text-brand-secondary"}`}>
                <span className={`w-5 shrink-0 text-[10px] font-black tracking-[0.12em] ${active ? "text-brand-secondary" : "text-slate-400 group-hover:text-brand-secondary"}`}>{String(index + 1).padStart(2, "0")}</span>
                <span className="min-w-0 flex-1 text-base font-bold">{item.label}</span>
              </button>
            );
          })}
        </div>
      </aside>}

      <AnimatePresence mode="wait">
        <motion.div key={selected.id} initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={prefersReducedMotion ? undefined : { opacity: 0, y: -8 }} transition={{ duration: prefersReducedMotion ? 0.01 : 0.28, ease: "easeOut" }}>
          {selected.content === "leadership" ? <LeadershipBrowser key={initialLeadershipView} initialView={initialLeadershipView} /> : selected.content === "identity" ? <IdentityPanel /> : selected.content === "mission" ? <MissionPanel /> : selected.content === "focus" ? <FocusPanel /> : selected.content === "profile" ? <CompanyProfilePanel /> : selected.content === "journey" ? <JourneyPanel /> : selected.content === "recognition" ? <RecognitionPanel /> : selected.content === "certificate" ? <CertificatePanel /> : <SplitFeaturePanel title={selected.title} description={selected.description} details={timeline ? [] : selected.details} facts={selected.facts} timeline={timeline} coreFeatures={selected.coreFeatures} media={selected.media} combined={combinedPanel} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

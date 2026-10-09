"use client";

import type { InnovationModule } from "@/lib/innovation-data";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

const MODULES_PER_VIEW = 4;
const DISPLAY_TIME = 60_000;

function HighlightedDescription({ text }: { text: string }) {
  const marker = "SAN HRMIS";
  const markerIndex = text.indexOf(marker);

  if (markerIndex === -1) return <>{text}</>;

  return (
    <>
      {text.slice(0, markerIndex)}
      <strong className="font-bold text-[#0a1f44]">{marker}</strong>
      {text.slice(markerIndex + marker.length)}
    </>
  );
}

export function SanHrmIsModuleTable({ modules, description, detail = false }: { modules: readonly InnovationModule[]; description?: string; detail?: boolean }) {
  const prefersReducedMotion = useReducedMotion();
  const [activeGroup, setActiveGroup] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const groups = useMemo(() => {
    const result: InnovationModule[][] = [];
    for (let index = 0; index < modules.length; index += MODULES_PER_VIEW) {
      result.push(modules.slice(index, index + MODULES_PER_VIEW));
    }
    return result.length > 0 ? result : [[]];
  }, [modules]);
  const groupCount = groups.length;
  const visibleModules = groups[activeGroup] ?? groups[0];

  function moveGroup(direction: 1 | -1) {
    setActiveGroup((current) => (current + direction + groupCount) % groupCount);
  }

  useEffect(() => {
    if (isPaused || isHovering || groupCount <= 1) return;
    const timer = window.setInterval(() => {
      setActiveGroup((current) => (current + 1) % groupCount);
    }, DISPLAY_TIME);
    return () => window.clearInterval(timer);
  }, [groupCount, isHovering, isPaused]);

  useEffect(() => {
    if (activeGroup >= groupCount) setActiveGroup(0);
  }, [activeGroup, groupCount]);

  const animationDuration = prefersReducedMotion ? 0.01 : 0.42;

  return (
    <section
      className={`overflow-hidden border border-[#b8c9df] bg-white shadow-[0_14px_36px_rgba(10,31,68,0.07)] ${detail ? "w-full" : "h-full"}`}
      aria-label="SAN HRMIS modules and their main functions"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {description && (
        <div className="flex flex-col gap-4 border-b border-[#dce7f5] px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p className="max-w-4xl text-[18px] leading-6 text-[#222427] bg-[#eff2f6] p-2 text-justify "><HighlightedDescription text={description} /></p>
          <div className="flex shrink-0 items-center gap-1.5 self-end sm:self-center">
            <button type="button" onClick={() => moveGroup(-1)} disabled={groupCount <= 1} aria-label="Show previous SAN HRMIS modules" className="grid size-8 place-items-center border border-[#b8c9df] text-[#0a1f44] transition-colors hover:border-brand-secondary hover:text-brand-secondary disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary focus-visible:ring-offset-2">
              <ChevronLeft className="size-4" aria-hidden="true" />
            </button>
            <button type="button" onClick={() => setIsPaused((paused) => !paused)} aria-label={isPaused ? "Play SAN HRMIS module animation" : "Pause SAN HRMIS module animation"} aria-pressed={isPaused} className="grid size-8 place-items-center border border-[#b8c9df] bg-[#0a1f44] text-white transition-colors hover:bg-brand-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary focus-visible:ring-offset-2">
              {isPaused ? <Play className="size-3.5" aria-hidden="true" /> : <Pause className="size-3.5" aria-hidden="true" />}
            </button>
            <button type="button" onClick={() => moveGroup(1)} disabled={groupCount <= 1} aria-label="Show next SAN HRMIS modules" className="grid size-8 place-items-center border border-[#b8c9df] text-[#0a1f44] transition-colors hover:border-brand-secondary hover:text-brand-secondary disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary focus-visible:ring-offset-2">
              <ChevronRight className="size-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      )}

      <div role="table" aria-label="SAN HRMIS modules" className="hidden sm:block">
        <div role="row" className="grid grid-cols-[34%_1fr] border-b border-[#dce7f5] bg-white text-[10px] font-black uppercase tracking-[0.16em] text-[#526989]">
          <div role="columnheader" className="px-5 py-3.5 sm:px-6">Module</div>
          <div role="columnheader" className="px-5 py-3.5 sm:px-6">Main functions</div>
        </div>

        <div className="relative min-h-[300px] overflow-hidden" role="rowgroup" aria-live="polite" aria-atomic="false">
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={activeGroup}
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 28 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -12 }}
              transition={{ duration: animationDuration, ease: "easeOut" }}
              className="absolute inset-x-0 top-0"
            >
              {visibleModules.map((item, index) => (
                <motion.div
                  key={item.module}
                  role="row"
                  initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: prefersReducedMotion ? 0.01 : 0.25, delay: prefersReducedMotion ? 0 : index * 0.04, ease: "easeOut" }}
                  className={`grid min-h-[75px] grid-cols-[34%_1fr] items-center border-b border-[#e7edf5] align-middle last:border-0 ${index % 2 === 0 ? "bg-white" : "bg-[#fbfdff]"}`}
                >
                  <div role="cell" className="px-5 py-3 text-sm font-bold leading-5 text-[#0a1f44] sm:px-6">{item.module}</div>
                  <div role="cell" className="px-5 py-3 text-sm leading-5 text-[#68718a] sm:px-6">{item.functions}</div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="sm:hidden" aria-live="polite" aria-atomic="false">
        <div className="border-b border-[#dce7f5] px-5 py-3 text-[10px] font-black uppercase tracking-[0.16em] text-[#526989]">Module details</div>
        <div className="relative min-h-[390px] overflow-hidden">
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={`mobile-${activeGroup}`}
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -10 }}
              transition={{ duration: animationDuration, ease: "easeOut" }}
              className="absolute inset-x-0 top-0 divide-y divide-[#e7edf5]"
            >
              {visibleModules.map((item, index) => (
                <motion.article
                  key={item.module}
                  initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: prefersReducedMotion ? 0.01 : 0.22, delay: prefersReducedMotion ? 0 : index * 0.04, ease: "easeOut" }}
                  className={`px-5 py-4 ${index % 2 === 0 ? "bg-white" : "bg-[#fbfdff]"}`}
                >
                  <p className="text-sm font-bold leading-5 text-[#0a1f44]">{item.module}</p>
                  <p className="mt-1 text-xs leading-5 text-[#68718a]">{item.functions}</p>
                </motion.article>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <p className="sr-only">Showing four HRMIS modules at a time. The next group appears automatically every minute.</p>
    </section>
  );
}

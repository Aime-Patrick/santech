"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

export type StoryTimelineItem = {
  id: string;
  year: string;
  title: string;
  description: string;
};

type StoryTimelineProps = {
  items: readonly StoryTimelineItem[];
  ariaLabel?: string;
};

export function StoryTimeline({ items, ariaLabel = "Story timeline" }: StoryTimelineProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (items.length < 2) return;

    const timer = window.setInterval(() => {
      setActiveIndex((currentIndex) => {
        const nextIndex = (currentIndex + 1) % items.length;
        setDirection(nextIndex > currentIndex ? 1 : -1);
        return nextIndex;
      });
    }, 3200);

    return () => window.clearInterval(timer);
  }, [items.length]);

  if (items.length === 0) return null;

  const activeItem = items[activeIndex] ?? items[0];
  const activeProgress = items.length === 1 ? 0 : (activeIndex / (items.length - 1)) * 100;
  const contentId = `${ariaLabel.replaceAll(" ", "-").toLowerCase()}-content`;

  function selectItem(index: number) {
    setDirection(index >= activeIndex ? 1 : -1);
    setActiveIndex(index);
  }

  return (
    <section className="relative w-full px-4 py-5 sm:px-7 sm:py-6 lg:px-9" aria-label={ariaLabel}>
      <div className="relative min-h-[320px] pt-2">
        <div className="relative h-8" role="tablist" aria-label={`${ariaLabel} markers`}>
          <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-[#b9cce1]" aria-hidden="true" />
          <motion.span
            aria-hidden="true"
            className="pointer-events-none absolute left-0 top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#0a1f44] bg-[#00a3e0] ring-2 ring-[#bce8f7]"
            animate={{ left: `${activeProgress}%` }}
            transition={{ duration: prefersReducedMotion ? 0.01 : 0.45, ease: "easeOut" }}
          />

          {items.map((item, index) => {
            const active = index === activeIndex;
            const position = items.length === 1 ? 0 : (index / (items.length - 1)) * 100;

            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={active}
                aria-controls={contentId}
                aria-label={`${item.year}: ${item.title}`}
                onClick={() => selectItem(index)}
                className="group absolute top-1/2 -translate-x-1/2 -translate-y-1/2 p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00a3e0]"
                style={{ left: `${position}%` }}
              >
                <span className={`block size-2.5 rounded-full border transition-transform group-hover:scale-125 ${active ? "border-[#0a1f44] bg-[#00a3e0] ring-2 ring-[#bce8f7]" : "border-[#8ea5c1] bg-white"}`} aria-hidden="true" />
              </button>
            );
          })}
        </div>

        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute top-6 z-0 h-[4.5rem] w-2 -translate-x-1/2"
          animate={{ left: `${activeProgress}%` }}
          transition={{ duration: prefersReducedMotion ? 0.01 : 0.45, ease: "easeOut" }}
        >
          <motion.span
            key={activeIndex}
            initial={prefersReducedMotion ? false : { scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: prefersReducedMotion ? 0.01 : 0.55, ease: "easeOut" }}
            className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 origin-top rounded-full bg-[#00a3e0]"
          />
          <span className="absolute bottom-0 left-1/2 size-2.5 -translate-x-1/2 rounded-full border-2 border-[#0a1f44] bg-white" />
        </motion.div>

        <div className="relative h-8 pt-2" role="presentation">
          {items.map((item, index) => (
            <button
              key={`${item.id}-year`}
              type="button"
              onClick={() => selectItem(index)}
              className={`absolute top-2 whitespace-nowrap font-mono text-xs font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00a3e0] ${index === activeIndex ? (index === items.length - 1 ? "-translate-x-[calc(100%+0.5rem)] text-[#0a1f44]" : "translate-x-2 text-[#0a1f44]") : "-translate-x-1/2 text-[#8195b1] hover:text-[#0a1f44]"}`}
              style={{ left: `${items.length === 1 ? 0 : (index / (items.length - 1)) * 100}%` }}
            >
              {item.year}
            </button>
          ))}
        </div>

        <div id={contentId} className="relative mt-3 min-h-[130px]" aria-live="polite">
          <AnimatePresence initial={false} mode="wait" custom={direction}>
            <motion.div
              key={activeItem.id}
              custom={direction}
              initial={prefersReducedMotion ? false : { opacity: 0, x: direction * 14 }}
              animate={{ opacity: 1, x: 0 }}
              exit={prefersReducedMotion ? undefined : { opacity: 0, x: direction * -14 }}
              transition={{ duration: prefersReducedMotion ? 0.01 : 0.3, ease: "easeOut" }}
              className={`absolute top-4 w-[min(100%,20rem)] py-2 sm:py-3 ${activeIndex >= items.length - 3 ? "-translate-x-full" : "translate-x-0"}`}
              style={{ left: `${activeProgress}%` }}
            >
              <h3 className="font-exo text-xl font-semibold text-[#0a1f44] sm:text-2xl">{activeItem.title}</h3>
              <p className="mt-2 text-sm leading-6 text-[#607492] sm:text-base">{activeItem.description}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

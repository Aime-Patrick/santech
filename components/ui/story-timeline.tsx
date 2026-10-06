"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

export type StoryTimelineItem = {
  id: string;
  year: string;
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
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
  const previousItem = activeIndex > 0 ? items[activeIndex - 1] : undefined;
  const nextItem = activeIndex < items.length - 1 ? items[activeIndex + 1] : undefined;
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
          <motion.div
            aria-hidden="true"
            className="absolute left-0 top-1/2 h-0.5 -translate-y-1/2 bg-[#00a3e0]"
            animate={{ width: `${activeProgress}%` }}
            transition={{ duration: prefersReducedMotion ? 0.01 : 0.45, ease: "easeOut" }}
          />
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

        <div id={contentId} className="relative mt-3" aria-live="polite">
          <AnimatePresence initial={false} mode="wait" custom={direction}>
            <motion.div
              key={activeItem.id}
              custom={direction}
              initial={prefersReducedMotion ? false : { opacity: 0, x: direction * 14 }}
              animate={{ opacity: 1, x: 0 }}
              exit={prefersReducedMotion ? undefined : { opacity: 0, x: direction * -14 }}
              transition={{ duration: prefersReducedMotion ? 0.01 : 0.3, ease: "easeOut" }}
              className="relative w-full py-2 pb-6 sm:py-3 sm:pb-6"
            >
              <div className="grid gap-5 border-y border-[#d8e4ef] py-5 sm:grid-cols-[210px_minmax(0,1fr)] sm:items-center sm:gap-8">
                {activeItem.image && (
                  <figure className="relative aspect-[4/3] overflow-hidden rounded-xl bg-[#dce8f2]">
                    <Image src={activeItem.image} alt={activeItem.imageAlt ?? `${activeItem.title} milestone`} fill sizes="(min-width: 640px) 210px, 100vw" className="object-cover object-top" />
                    <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0a1f44]/75 to-transparent px-3 pb-2 pt-7 text-[9px] font-black uppercase tracking-[0.16em] text-white/90">SAN TECH / {activeItem.year}</figcaption>
                  </figure>
                )}

                <div className="min-w-0">
                  <h3 className="font-exo text-2xl font-semibold tracking-[-0.035em] text-[#0a1f44] sm:text-3xl">{activeItem.title}</h3>
                  <p className="mt-2 max-w-xl text-sm leading-6 text-[#607492] sm:text-base">{activeItem.description}</p>

                  <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-[10px] font-semibold text-[#8195b1]">
                    <span title={previousItem?.title}>{previousItem ? `From ${previousItem.year} / ${previousItem.title}` : "The beginning"}</span>
                    {nextItem && <span title={nextItem.title}>Next: {nextItem.year} / {nextItem.title}</span>}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

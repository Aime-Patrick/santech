"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type StoryEvent = {
  year: string;
  title: string;
  description: string;
  side: "left" | "right";
};

const storyEvents: StoryEvent[] = [
  {
    year: "2019",
    title: "The beginning",
    description: "SAN TECH starts with a practical question: how can technology create more useful opportunities for people?",
    side: "left",
  },
  {
    year: "2022",
    title: "Training and innovation",
    description: "Learning programs and experiments begin connecting skills, ideas, and the communities they can serve.",
    side: "right",
  },
  {
    year: "2023",
    title: "SAN HUB expands",
    description: "SAN HUB grows into a shared space for courses, community, mentorship, and measurable progress.",
    side: "left",
  },
  {
    year: "2024",
    title: "Digital solutions",
    description: "Products and platforms move from prototypes into real environments where clarity and reliability matter.",
    side: "right",
  },
  {
    year: "2026",
    title: "A wider ecosystem",
    description: "The next chapter connects technology, skills, partners, and impact across a growing African innovation ecosystem.",
    side: "left",
  },
];

function DateCard({ event }: { event: StoryEvent }) {
  return (
    <div className="grid w-20 shrink-0 place-items-center px-2 py-3 text-center">
      <span className="text-2xl font-black leading-none tracking-[-0.08em] text-brand-secondary">{event.year}</span>
    </div>
  );
}

function EventCopy({ event, align = "left" }: { event: StoryEvent; align?: "left" | "right" }) {
  return (
    <div className={align === "right" ? "text-right" : "text-left"}>
      <p className="text-sm font-black uppercase tracking-[0.16em] text-brand-secondary">{event.year} — {event.title}</p>
      <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">{event.description}</p>
    </div>
  );
}

export function StoryTimeline() {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const root = scope.current;
    if (!root) return;

    const items = gsap.utils.toArray<HTMLElement>("[data-story-event]", root);
    const dots = gsap.utils.toArray<HTMLElement>("[data-story-dot]", root);
    const progress = root.querySelector<HTMLElement>("[data-story-progress]");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!progress || reduceMotion) {
      gsap.set(items, { opacity: 1, y: 0 });
      gsap.set(dots, { scale: 1, opacity: 1 });
      if (progress) gsap.set(progress, { scaleY: 1 });
      return;
    }

    gsap.set(items, { opacity: 0, y: 28 });
    gsap.set(dots, { scale: 0.55, opacity: 0.35 });
    gsap.set(progress, { scaleY: 0, transformOrigin: "top center" });

    gsap.to(progress, {
      scaleY: 1,
      ease: "none",
      scrollTrigger: {
        trigger: root,
        start: "top 74%",
        end: "bottom 68%",
        scrub: 0.8,
      },
    });

    items.forEach((item) => {
      const dot = item.querySelector<HTMLElement>("[data-story-dot]");
      gsap.to(item, {
        opacity: 1,
        y: 0,
        ease: "power2.out",
        scrollTrigger: {
          trigger: item,
          start: "top 82%",
          end: "top 62%",
          scrub: 0.5,
        },
      });
      if (dot) {
        gsap.to(dot, {
          scale: 1,
          opacity: 1,
          ease: "back.out(1.4)",
          scrollTrigger: {
            trigger: item,
            start: "top 82%",
            end: "top 68%",
            scrub: 0.5,
          },
        });
      }
    });
  }, { scope });

  return (
    <div ref={scope} className="relative">
      <div className="pointer-events-none absolute bottom-0 left-5 top-0 w-px bg-slate-200 md:left-1/2 md:-translate-x-1/2">
        <span data-story-progress className="absolute inset-x-0 top-0 block h-full origin-top scale-y-0 bg-brand-secondary" />
      </div>

      <div className="md:hidden">
        {storyEvents.map((event) => (
          <article key={`mobile-${event.year}`} data-story-event className="relative pb-12 pl-12 last:pb-0">
            <span data-story-dot className="absolute left-[11px] top-1.5 size-3 rounded-full border-4 border-slate-950 bg-brand-secondary" />
            <div className="flex items-start gap-4">
              <DateCard event={event} />
              <EventCopy event={event} />
            </div>
          </article>
        ))}
      </div>

      <div className="hidden md:grid">
        {storyEvents.map((event) => (
          <article key={`desktop-${event.year}`} data-story-event className="relative grid grid-cols-[minmax(0,1fr)_72px_minmax(0,1fr)] items-center gap-8 py-8">
            <div className={event.side === "left" ? "col-start-1 row-start-1 flex items-center justify-end gap-5" : "col-start-3 row-start-1 flex items-center justify-start gap-5"}>
              {event.side === "left" ? <><EventCopy event={event} align="right" /><DateCard event={event} /></> : <><DateCard event={event} /><EventCopy event={event} /></>}
            </div>
            <span data-story-dot className="relative z-10 col-start-2 row-start-1 mx-auto size-4 rounded-full border-4 border-slate-950 bg-brand-secondary shadow-[0_0_0_5px_rgba(11,14,135,0.12)]" />
          </article>
        ))}
      </div>
    </div>
  );
}

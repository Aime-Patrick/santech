"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

type AboutHeroSlide = {
  eyebrow: string;
  title: string;
  description: string;
  cta: string;
  href: string;
  image: string;
};

const aboutHeroSlides: readonly AboutHeroSlide[] = [
  {
    eyebrow: "Practical learning",
    title: "Build skills for useful work.",
    description: "Move from curiosity to confidence with focused pathways and project-based learning.",
    cta: "See learning pathways",
    href: "/san-hub/courses",
    image: "/images/graduates.jpg",
  },
  {
    eyebrow: "Trending programs",
    title: "Turn ideas into working prototypes.",
    description: "Join practical innovation programs that help people test problems, build solutions, and create momentum.",
    cta: "Explore programs",
    href: "/san-hub?section=programs",
    image: "/images/fieldwork.jpg",
  },
  {
    eyebrow: "Featured courses",
    title: "Learn technology that becomes useful capability.",
    description: "Build practical digital skills through guided courses, projects, mentorship, and community.",
    cta: "Explore courses",
    href: "/san-hub/courses",
    image: "/images/team.jpg",
  },
] as const;

export function SanHubAboutHero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const activeSlide = aboutHeroSlides[activeIndex];

  useEffect(() => {
    if (prefersReducedMotion) return;
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % aboutHeroSlides.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [prefersReducedMotion]);

  function changeSlide(direction: 1 | -1) {
    setActiveIndex((current) => (current + direction + aboutHeroSlides.length) % aboutHeroSlides.length);
  }

  return (
    <div>
      <div className="relative isolate min-h-[280px] overflow-hidden rounded-[1.45rem] bg-[#0a1f44] text-white">
        <div className="absolute inset-y-0 right-0 w-[54%] overflow-hidden">
          <motion.div
            key={activeSlide.image}
            initial={prefersReducedMotion ? false : { opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: prefersReducedMotion ? 0.01 : 0.45, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <Image src={activeSlide.image} alt="" fill loading={activeIndex === 0 ? "eager" : "lazy"} sizes="(min-width: 1024px) 42vw, 100vw" className="object-cover" />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a1f44] via-[#0a1f44cc] to-transparent" />
        </div>

        <motion.div
          key={activeSlide.title}
          initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0.01 : 0.3, ease: "easeOut" }}
          className="relative z-10 flex min-h-[280px] max-w-[62%] flex-col justify-center px-6 py-7 sm:px-8"
        >
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-cyan">{activeSlide.eyebrow}</p>
          <h2 className="font-exo mt-2 text-xl font-bold leading-[1.08] tracking-[-0.04em] sm:text-2xl">{activeSlide.title}</h2>
          <p className="mt-2 max-w-sm text-sm leading-5 text-white/75">{activeSlide.description}</p>
          <Link href={activeSlide.href} className="mt-4 inline-flex w-fit items-center gap-2 rounded-lg bg-brand-cyan px-3.5 py-2.5 text-xs font-black text-[#07152d] transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a1f44]">
            {activeSlide.cta} <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </motion.div>

        <div className="absolute bottom-3 right-4 z-20 flex items-center gap-1.5 sm:right-6">
          {aboutHeroSlides.map((slide, index) => (
            <button
              key={slide.title}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Show slide ${index + 1}: ${slide.title}`}
              aria-current={index === activeIndex ? "true" : undefined}
              className={`h-1.5 rounded-full transition-all ${index === activeIndex ? "w-7 bg-brand-cyan" : "w-1.5 bg-white/45 hover:bg-white/75"}`}
            />
          ))}
        </div>

        <div className="absolute bottom-3 left-4 z-20 flex items-center gap-1 sm:left-6">
          <button type="button" onClick={() => changeSlide(-1)} aria-label="Previous SAN HUB highlight" className="grid size-7 place-items-center rounded-full border border-white/30 bg-[#07152d]/45 text-white transition-colors hover:bg-[#07152d]/75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan"><ChevronLeft className="size-3.5" /></button>
          <button type="button" onClick={() => changeSlide(1)} aria-label="Next SAN HUB highlight" className="grid size-7 place-items-center rounded-full border border-white/30 bg-[#07152d]/45 text-white transition-colors hover:bg-[#07152d]/75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan"><ChevronRight className="size-3.5" /></button>
        </div>
      </div>
    </div>
  );
}

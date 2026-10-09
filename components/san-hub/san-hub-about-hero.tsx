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
    title: "Learn by doing.",
    description: "Focused pathways and project-based learning.",
    cta: "See learning pathways",
    href: "/san-hub/courses",
    image: "/images/mmkk.jpeg",
  },
  {
    eyebrow: "Trending programs",
    title: "Build the next idea.",
    description: "Practical programs for testing and building solutions.",
    cta: "Explore programs",
    href: "/san-hub?section=programs",
    image: "/images/second-image.jpeg",
  },
  {
    eyebrow: "Featured courses",
    title: "Grow useful capability.",
    description: "Courses, mentorship, and community for practical digital skills.",
    cta: "Explore courses",
    href: "/san-hub/courses",
    image: "/images/mmkk.jpeg",
  },
] as const;

export function SanHubAboutHero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const activeSlide = aboutHeroSlides[activeIndex];

  useEffect(() => {
    if (prefersReducedMotion || isPaused) return;
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % aboutHeroSlides.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [isPaused, prefersReducedMotion]);

  function changeSlide(direction: 1 | -1) {
    setActiveIndex((current) => (current + direction + aboutHeroSlides.length) % aboutHeroSlides.length);
  }

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <div className="relative isolate min-h-[400px] overflow-hidden text-white sm:min-h-[380px] lg:min-h-[500px]">
        <motion.div
          key={activeSlide.image}
          initial={prefersReducedMotion ? false : { opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: prefersReducedMotion ? 0.01 : 0.45, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <Image src={activeSlide.image} alt="" fill loading={activeIndex === 0 ? "eager" : "lazy"} sizes="(min-width: 1024px) 80vw, 100vw" className="object-cover" />
        </motion.div>
        <motion.div
          key={activeSlide.title}
          initial={prefersReducedMotion ? false : { opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: prefersReducedMotion ? 0.01 : 0.3, ease: "easeOut" }}
          className="absolute left-[8%] top-1/2 z-10 -translate-y-1/2"
          aria-live="polite"
        >
          <Link
            href={activeSlide.href}
            aria-label={`${activeSlide.cta}: ${activeSlide.title}`}
            className="group block max-w-[min(78vw,30rem)] bg-[#07152d]/75 px-5 py-4 backdrop-blur-[2px] transition-colors hover:bg-[#07152d]/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-[#07152d] sm:px-7 sm:py-5"
          >
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-cyan">{activeSlide.eyebrow}</p>
            <h2 className="font-exo mt-2 text-2xl font-bold leading-none tracking-[-0.04em] sm:text-4xl lg:text-5xl">{activeSlide.title}</h2>
            <p className="mt-2 text-xs text-white/75 sm:text-sm">{activeSlide.description}</p>
            <span className="mt-3 inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.16em] text-white/80 transition-colors group-hover:text-brand-cyan">
              {activeSlide.cta} <ArrowRight className="size-3.5" aria-hidden="true" />
            </span>
          </Link>
        </motion.div>

        <button type="button" onClick={() => changeSlide(-1)} aria-label="Previous SAN HUB highlight" className="absolute left-3 top-1/2 z-20 grid size-10 -translate-y-1/2 place-items-center rounded-full border border-white/45 bg-[#0875d1]/90 text-white shadow-lg transition-transform hover:scale-105 hover:bg-[#075ca5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-[#07152d] sm:left-5 sm:size-12"><ChevronLeft className="size-6" /></button>
        <button type="button" onClick={() => changeSlide(1)} aria-label="Next SAN HUB highlight" className="absolute right-3 top-1/2 z-20 grid size-10 -translate-y-1/2 place-items-center rounded-full border border-white/45 bg-[#0875d1]/90 text-white shadow-lg transition-transform hover:scale-105 hover:bg-[#075ca5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-[#07152d] sm:right-5 sm:size-12"><ChevronRight className="size-6" /></button>

        <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1.5">
          {aboutHeroSlides.map((slide, index) => (
            <button
              key={slide.title}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Show slide ${index + 1}: ${slide.title}`}
              aria-current={index === activeIndex ? "true" : undefined}
              className={`h-1.5 rounded-full transition-all ${index === activeIndex ? "w-7 bg-brand-cyan" : "w-1.5 bg-white/60 hover:bg-white"}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

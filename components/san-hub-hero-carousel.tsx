"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

const slides = [
  {
    id: "technology-training",
    category: "Technology Training",
    title: "Build the skills behind useful systems.",
    description: "Practical learning in software engineering, AI, cybersecurity, IoT, embedded systems, and digital literacy.",
    tags: ["Software engineering", "AI & cybersecurity", "IoT & embedded systems"],
    image: "/images/techforwardlive2026-photo-download-1of1/Highlights/CEPSTUDIO(1).jpg",
    alt: "Emerging youth and STEM students learning practical technology in a SAN HUB cohort",
  },
  {
    id: "innovation-development",
    category: "Innovation Development",
    title: "Turn a difficult question into a tested idea.",
    description: "Move from ideation and prototyping to product development, research, pitching, and commercialization.",
    tags: ["Ideation", "Prototyping", "Product development"],
    image: "/images/techforwardlive2026-photo-download-1of1/Highlights/CEPSTUDIO(108).jpg",
    alt: "SAN HUB innovator presenting AI and digital solutions on stage during Tech Forward Live pitch day",
  },
  {
    id: "career-development",
    category: "Career Development",
    title: "Move from learning into meaningful technology work.",
    description: "Create clearer routes through apprenticeships, internships, mentorship, career guidance, and industry exposure.",
    tags: ["Apprenticeships", "Internships", "Mentorship"],
    image: "/images/techforwardlive2026-photo-download-1of1/Highlights/CEPSTUDIO(174).jpg",
    alt: "SAN TECH leadership and partners awarding official certificates to SAN HUB program graduates",
  },
] as const;

export function SanHubHeroCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const activeSlide = slides[activeIndex];

  useEffect(() => {
    if (prefersReducedMotion) return;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, 6500);

    return () => window.clearInterval(timer);
  }, [prefersReducedMotion]);

  function moveSlide(direction: -1 | 1) {
    setActiveIndex((current) => (current + direction + slides.length) % slides.length);
  }

  return (
    <section id="san-hub-about" className="relative isolate min-h-[620px] scroll-mt-40 overflow-hidden bg-[#07152d] text-white sm:min-h-[660px] lg:min-h-[calc(100svh-7rem)]" aria-roledescription="carousel" aria-label="SAN HUB learning pathways">
      <AnimatePresence initial={false} mode="sync">
        <motion.div
          key={activeSlide.id}
          className="absolute inset-0 -z-20"
          initial={{ opacity: prefersReducedMotion ? 1 : 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: prefersReducedMotion ? 0.01 : 0.5, ease: "easeOut" }}
        >
          <Image src={activeSlide.image} alt={activeSlide.alt} fill priority={activeIndex === 0} sizes="100vw" className="object-cover object-[68%_center]" />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#061126]/95 via-[#061126]/75 to-[#061126]/15" aria-hidden="true" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(6,17,38,0.08),transparent_55%)]" aria-hidden="true" />

      <div className="mx-auto flex min-h-[620px] max-w-7xl flex-col justify-between px-6 py-14 sm:min-h-[660px] sm:px-10 sm:py-16 lg:min-h-[calc(100svh-7rem)] lg:px-16 lg:py-20">
        <div className="max-w-2xl">
          <p className="text-xs font-black uppercase tracking-[0.28em] text-white">SAN HUB / Learning ecosystem</p>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activeSlide.id}
              initial={{ opacity: prefersReducedMotion ? 1 : 0, y: prefersReducedMotion ? 0 : 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -8 }}
              transition={{ duration: prefersReducedMotion ? 0.01 : 0.35, ease: "easeOut" }}
            >
              <p className="mt-8 text-sm font-bold uppercase tracking-[0.22em] text-white/65">{activeSlide.category}</p>
              <h1 className="font-exo mt-4 max-w-2xl text-2xl font-bold leading-[0.98] tracking-[-0.055em] text-white sm:text-3xl lg:text-4xl">{activeSlide.title}</h1>
              <p className="mt-6 max-w-xl text-base leading-7 text-white/75 sm:text-lg">{activeSlide.description}</p>

              <div className="mt-7 flex flex-wrap gap-2">
                {activeSlide.tags.map((tag) => <span key={tag} className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white/80 backdrop-blur-sm">{tag}</span>)}
              </div>

              <Link href="/join-the-community" className="mt-9 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-[#0a1f44] transition-colors hover:bg-cyan-300">
                Join this pathway <ArrowUpRight className="size-4" aria-hidden="true" />
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-6 border-t border-white/20 pt-5">
          <div className="flex items-center gap-2" role="tablist" aria-label="SAN HUB categories">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                role="tab"
                aria-selected={index === activeIndex}
                aria-label={`Show ${slide.category}`}
                onClick={() => setActiveIndex(index)}
                className={`h-1.5 rounded-full transition-all ${index === activeIndex ? "w-12 bg-cyan-300" : "w-6 bg-white/35 hover:bg-white/70"}`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span className="mr-2 text-xs font-bold uppercase tracking-[0.16em] text-white/55">0{activeIndex + 1} / 0{slides.length}</span>
            <button type="button" onClick={() => moveSlide(-1)} className="grid size-10 place-items-center rounded-full border border-white/25 text-white transition-colors hover:bg-white hover:text-[#0a1f44]" aria-label="Previous SAN HUB category">
              <ChevronLeft className="size-4" aria-hidden="true" />
            </button>
            <button type="button" onClick={() => moveSlide(1)} className="grid size-10 place-items-center rounded-full border border-white/25 text-white transition-colors hover:bg-white hover:text-[#0a1f44]" aria-label="Next SAN HUB category">
              <ChevronRight className="size-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

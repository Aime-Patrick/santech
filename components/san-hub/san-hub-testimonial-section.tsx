"use client";

import { Quote } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

const testimonials = [
  {
    quote: "SAN HUB helped me move from learning concepts to building something people could actually use.",
    name: "Aline M.",
    role: "SAN HUB learner",
  },
  {
    quote: "The practical projects and mentorship gave our team the confidence to take an idea further.",
    name: "Eric N.",
    role: "Innovation program participant",
  },
  {
    quote: "SAN HUB creates a useful bridge between technology skills, opportunity, and the needs of our community.",
    name: "Diane U.",
    role: "Community partner",
  },
  {
    quote: "The practical sessions helped me turn a difficult problem into a clear plan I could start building.",
    name: "Mugisha T.",
    role: "SAN HUB builder",
  },
  {
    quote: "SAN HUB gave our team the tools, guidance, and confidence to keep improving after the programme ended.",
    name: "Claudine R.",
    role: "Programme participant",
  },
  {
    quote: "The strongest value was learning with people who understand the realities of building technology here.",
    name: "Patrick K.",
    role: "Community collaborator",
  },
  {
    quote: "I left with more than new skills. I left with a useful project and a clearer direction for my next step.",
    name: "Jeanette N.",
    role: "SAN HUB learner",
  },
  {
    quote: "The mentorship made it easier to ask better questions, test ideas, and make steady progress.",
    name: "Kevin M.",
    role: "Innovation participant",
  },
  {
    quote: "SAN HUB connects learning to action in a way that makes technology feel practical and achievable.",
    name: "Beata A.",
    role: "Community partner",
  },
] as const;

// Keep the testimonial copy in one place. The row order changes only to create
// the vertical card transition; additional testimonial rows can be added here later.
const testimonialRows = [
  [testimonials[0], testimonials[1], testimonials[2]],
  [testimonials[3], testimonials[4], testimonials[5]],
  [testimonials[6], testimonials[7], testimonials[8]],
] as const;

export function SanHubTestimonialSection() {
  const prefersReducedMotion = useReducedMotion();
  const [activeRow, setActiveRow] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion || isPaused) return;

    const timer = window.setInterval(() => {
      setActiveRow((row) => (row + 1) % testimonialRows.length);
    }, 5200);

    return () => window.clearInterval(timer);
  }, [isPaused, prefersReducedMotion]);

  return (
    <section id="san-hub-testimonials" className="san-hub-graphic-section scroll-mt-40 border-b border-slate-200 px-6 py-10 sm:px-10 lg:px-16 lg:py-16">
      <div className="mx-auto max-w-[1500px] bg-white px-5 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-12">
        <div className="grid gap-8 border-b border-slate-200 pb-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.24em] text-brand-secondary">SAN HUB / Testimonials</p>
            <h1 className="font-exo mt-4 max-w-xl text-3xl font-bold leading-[1.02] tracking-[-0.055em] text-[#0a1f44] sm:text-4xl">What people are building from here.</h1>
          </div>
          <p className="max-w-2xl text-base leading-7 text-slate-600">SAN HUB is measured by the people who leave with more clarity, stronger capability, and a next step they can act on.</p>
        </div>

        <div
          className="relative min-h-[640px] overflow-hidden sm:min-h-[540px] lg:min-h-[275px]"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          aria-label="SAN HUB testimonials"
          aria-live="polite"
        >
          <AnimatePresence initial={false} mode="popLayout">
            <motion.div
              key={activeRow}
              initial={prefersReducedMotion ? false : { y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={prefersReducedMotion ? undefined : { y: "-100%", opacity: 0 }}
              transition={{ duration: prefersReducedMotion ? 0.01 : 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 grid divide-y divide-slate-200 lg:grid-cols-3 lg:divide-x lg:divide-y-0"
            >
              {testimonialRows[activeRow].map((testimonial) => (
                <blockquote key={`${activeRow}-${testimonial.name}`} className="flex min-h-[210px] flex-col justify-start py-6 lg:min-h-0 lg:px-7 lg:first:pl-0 lg:last:pr-0">
                  <div>
                    <Quote className="size-7 text-brand-cyan" aria-hidden="true" />
                    <p className="mt-4 text-lg leading-8 text-[#303755]">&ldquo;{testimonial.quote}&rdquo;</p>
                  </div>
                  <footer className="mt-6">
                    <cite className="not-italic text-sm font-bold text-[#0a1f44]">{testimonial.name}</cite>
                    <p className="mt-1 text-xs font-bold uppercase tracking-[0.12em] text-slate-400">{testimonial.role}</p>
                  </footer>
                </blockquote>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

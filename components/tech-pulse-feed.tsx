"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, CalendarDays, Clock3 } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useMemo, useState } from "react";
import { techPulseArticles, techPulseCategoryOptions, type TechPulseCategory } from "@/lib/tech-pulse-data";

const cardsPerPage = 3;
type SelectedCategory = "all" | TechPulseCategory;

export function TechPulseFeed() {
  const [category, setCategory] = useState<SelectedCategory>("all");
  const [page, setPage] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  const filteredArticles = useMemo(
    () => category === "all" ? techPulseArticles : techPulseArticles.filter((article) => article.category === category),
    [category],
  );
  const pageCount = Math.max(1, Math.ceil(filteredArticles.length / cardsPerPage));
  const visibleArticles = filteredArticles.slice(page * cardsPerPage, page * cardsPerPage + cardsPerPage);

  function selectCategory(nextCategory: SelectedCategory) {
    setCategory(nextCategory);
    setPage(0);
  }

  function movePage(direction: -1 | 1) {
    setPage((current) => Math.min(Math.max(current + direction, 0), pageCount - 1));
  }

  return (
    <div className="mx-auto max-w-7xl">
      <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" role="tablist" aria-label="Tech Pulse categories">
        {techPulseCategoryOptions.map((option) => {
          const active = option.id === category;
          return (
            <button
              key={option.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => selectCategory(option.id)}
              className={`shrink-0 rounded-full border px-4 py-2 text-xs font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary focus-visible:ring-offset-2 ${active ? "border-[#0a1f44] bg-[#0a1f44] text-white" : "border-slate-200 bg-white text-slate-600 hover:border-brand-secondary hover:text-[#0a1f44]"}`}
            >
              {option.label}
            </button>
          );
        })}
      </div>

      <div className="mt-8" role="tabpanel" aria-live="polite">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={`${category}-${page}`}
            initial={prefersReducedMotion ? false : { opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            exit={prefersReducedMotion ? undefined : { opacity: 0, x: -18 }}
            transition={{ duration: prefersReducedMotion ? 0.01 : 0.24, ease: "easeOut" }}
            className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3"
          >
            {visibleArticles.map((article, index) => (
              <article key={article.slug} className="group flex min-w-0 flex-col">
                <Link href={`/tech-pulse/${article.slug}`} className="relative block aspect-[16/9] overflow-hidden bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary focus-visible:ring-offset-4">
                  <Image
                    src={article.image}
                    alt={article.imageAlt}
                    fill
                    loading={page === 0 && index === 0 ? "eager" : "lazy"}
                    sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.14em] text-[#0a1f44] shadow-sm">{article.categoryLabel}</span>
                </Link>

                <div className="flex flex-1 flex-col pt-5">
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
                    <span className="inline-flex items-center gap-1.5"><CalendarDays className="size-3.5 text-brand-secondary" aria-hidden="true" />{article.date}</span>
                    <span className="inline-flex items-center gap-1.5"><Clock3 className="size-3.5 text-brand-secondary" aria-hidden="true" />{article.readingTime}</span>
                  </div>
                  <h3 className="font-exo mt-3 text-xl font-bold leading-tight tracking-[-0.035em] text-[#0a1f44] transition-colors group-hover:text-brand-secondary">{article.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-6 text-slate-600">{article.excerpt}</p>
                  <Link href={`/tech-pulse/${article.slug}`} className="mt-6 inline-flex w-fit items-center gap-2 text-sm font-bold text-[#0a1f44] transition-colors hover:text-brand-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary focus-visible:ring-offset-2">Read more <ArrowUpRight className="size-4" aria-hidden="true" /></Link>
                </div>
              </article>
            ))}
          </motion.div>
        </AnimatePresence>

        <div className="mt-10 flex items-center justify-between border-t border-slate-200 pt-5">
          <div className="flex items-center gap-1.5" aria-label={`Page ${page + 1} of ${pageCount}`}>
            {Array.from({ length: pageCount }, (_, index) => (
              <button key={index} type="button" onClick={() => setPage(index)} aria-label={`Go to page ${index + 1}`} aria-current={page === index ? "page" : undefined} className={`h-1.5 rounded-full transition-all ${page === index ? "w-8 bg-[#0a1f44]" : "w-1.5 bg-slate-300 hover:bg-slate-400"}`} />
            ))}
          </div>
          <div className="flex items-center gap-2">
            <span className="mr-2 text-xs font-bold tabular-nums text-slate-400">{String(page + 1).padStart(2, "0")} / {String(pageCount).padStart(2, "0")}</span>
            <button type="button" onClick={() => movePage(-1)} disabled={page === 0} aria-label="Previous stories" className="grid size-10 place-items-center rounded-full border border-slate-200 bg-white text-[#0a1f44] transition-colors hover:border-[#0a1f44] disabled:cursor-not-allowed disabled:opacity-35"><ArrowLeft className="size-4" /></button>
            <button type="button" onClick={() => movePage(1)} disabled={page === pageCount - 1} aria-label="Next stories" className="grid size-10 place-items-center rounded-full border border-slate-200 bg-white text-[#0a1f44] transition-colors hover:border-[#0a1f44] disabled:cursor-not-allowed disabled:opacity-35"><ArrowRight className="size-4" /></button>
          </div>
        </div>
      </div>
    </div>
  );
}

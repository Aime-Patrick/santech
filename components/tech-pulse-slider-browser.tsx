"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useCallback, useMemo } from "react";
import { 
  ArrowLeft, 
  ArrowRight, 
  ArrowUpRight, 
  CalendarDays, 
  Clock3, 
  Pause, 
  Play 
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { techPulseArticles, type TechPulseArticle, type TechPulseCategory } from "@/lib/tech-pulse-data";

export type TechPulseTopic = {
  id: string;
  label: string;
  category: TechPulseCategory;
};

const TOPICS: TechPulseTopic[] = [
  { id: "fellowship", label: "Fellowship", category: "fellowship" },
  { id: "news", label: "News", category: "news" },
  { id: "announcements", label: "Announcements", category: "announcements" },
  { id: "event", label: "Event", category: "event" },
  { id: "recognition", label: "Recognition", category: "recognition" },
  { id: "trends", label: "Trends", category: "trends" },
  { id: "impact", label: "Impact", category: "impact" },
];

export function TechPulseSliderBrowser({
  initialCategory = "fellowship",
}: {
  initialCategory?: string;
}) {
  // Determine starting category
  const defaultTopic = TOPICS.find((t) => t.category === initialCategory) ?? TOPICS[0];
  const [selectedCategory, setSelectedCategory] = useState<TechPulseCategory>(defaultTopic.category);
  const [cardOffset, setCardOffset] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Filter articles strictly for the currently selected category
  const categoryArticles = useMemo(() => {
    return techPulseArticles.filter((article) => article.category === selectedCategory);
  }, [selectedCategory]);

  const totalInCat = categoryArticles.length;

  // Reset offset when switching categories
  const selectTopic = (category: TechPulseCategory) => {
    setSelectedCategory(category);
    setCardOffset(0);
  };

  const nextSlide = useCallback(() => {
    if (totalInCat <= 1) return;
    setCardOffset((prev) => (prev + 1) % totalInCat);
  }, [totalInCat]);

  const prevSlide = useCallback(() => {
    if (totalInCat <= 1) return;
    setCardOffset((prev) => (prev - 1 + totalInCat) % totalInCat);
  }, [totalInCat]);

  // Auto-slide effect (every 5 seconds if multiple cards exist in category)
  useEffect(() => {
    if (!isAutoPlaying || totalInCat <= 3) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, totalInCat, nextSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") nextSlide();
      else if (e.key === "ArrowLeft") prevSlide();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide]);

  // Determine which cards to display (up to 3 cards for this category)
  const visibleCards: TechPulseArticle[] = useMemo(() => {
    if (totalInCat === 0) return [];
    if (totalInCat <= 3) return categoryArticles;
    
    // Circular window of 3 cards from cardOffset
    return [
      categoryArticles[cardOffset % totalInCat],
      categoryArticles[(cardOffset + 1) % totalInCat],
      categoryArticles[(cardOffset + 2) % totalInCat],
    ];
  }, [categoryArticles, cardOffset, totalInCat]);

  const activeTopicObj = TOPICS.find((t) => t.category === selectedCategory) ?? TOPICS[0];

  return (
    <div 
      className="grid gap-6 lg:grid-cols-[180px_minmax(0,1fr)] lg:items-start lg:gap-8"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Left Column: Topics Navigation */}
      <aside className="border-l border-slate-300 pl-4 lg:self-start">
        <div className="flex flex-row flex-wrap gap-x-4 gap-y-1 lg:flex-col lg:gap-y-1">
          {TOPICS.map((topic, idx) => {
            const isActive = selectedCategory === topic.category;
            const count = techPulseArticles.filter((a) => a.category === topic.category).length;
            return (
              <button
                key={topic.id}
                type="button"
                onClick={() => selectTopic(topic.category)}
                aria-pressed={isActive}
                className={`group flex items-center justify-between py-1.5 text-left transition-colors ${
                  isActive
                    ? "text-[#0a1f44]"
                    : "text-slate-500 hover:text-brand-secondary"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`w-5 shrink-0 text-[10px] font-black tracking-[0.12em] ${
                      isActive
                        ? "text-brand-secondary"
                        : "text-slate-400 group-hover:text-brand-secondary"
                    }`}
                  >
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm font-bold">
                    {topic.label}
                  </span>
                </div>
                
                <span
                  className={`hidden lg:inline-block text-[10px] font-bold px-1.5 py-0.2 rounded ${
                    isActive
                      ? "bg-[#0a1f44] text-white"
                      : "bg-slate-100 text-slate-400 group-hover:bg-slate-200 group-hover:text-slate-600"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </aside>

      {/* Right Column: Category-Filtered 3-Card Carousel Pane */}
      <div className="flex flex-col overflow-hidden">
        {/* Carousel Header with Category Label & Controllers */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-2.5 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-black uppercase tracking-[0.15em] text-brand-secondary">
              {activeTopicObj.label} Stories
            </span>
            <span className="text-slate-300">·</span>
            <span className="text-xs font-bold text-slate-500">
              {totalInCat} {totalInCat === 1 ? "article" : "articles"} available
            </span>
          </div>

          {/* Navigation Controls (active when multiple stories exist) */}
          {totalInCat > 1 && (
            <div className="flex items-center gap-1.5">
              {totalInCat > 3 && (
                <button
                  type="button"
                  onClick={() => setIsAutoPlaying((v) => !v)}
                  title={isAutoPlaying ? "Pause auto-slide" : "Play auto-slide"}
                  className="grid size-7 place-items-center rounded border border-slate-200 text-slate-600 transition-colors hover:border-[#0a1f44] hover:text-[#0a1f44]"
                >
                  {isAutoPlaying ? <Pause className="size-3" /> : <Play className="size-3" />}
                </button>
              )}

              <button
                type="button"
                onClick={prevSlide}
                aria-label="Previous story"
                className="grid size-7 place-items-center rounded border border-slate-200 bg-white text-[#0a1f44] shadow-2xs transition-colors hover:border-[#0a1f44] hover:bg-slate-50"
              >
                <ArrowLeft className="size-3.5" />
              </button>

              <button
                type="button"
                onClick={nextSlide}
                aria-label="Next story"
                className="grid size-7 place-items-center rounded border border-slate-200 bg-white text-[#0a1f44] shadow-2xs transition-colors hover:border-[#0a1f44] hover:bg-slate-50"
              >
                <ArrowRight className="size-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* Cards Grid with Category Filtered Content */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={`${selectedCategory}-${cardOffset}`}
            initial={{ opacity: 0, x: 14 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -14 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className={`grid gap-4 ${
              visibleCards.length === 1
                ? "grid-cols-1 max-w-md"
                : visibleCards.length === 2
                ? "grid-cols-1 sm:grid-cols-2 max-w-3xl"
                : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            }`}
          >
            {visibleCards.map((article, idx) => (
              <article
                key={`${article.slug}-${idx}`}
                className="group flex flex-col justify-between overflow-hidden border border-slate-200 bg-white p-3 shadow-sm transition-all hover:border-brand-secondary hover:shadow-md"
              >
                {/* Image & Header */}
                <div>
                  <Link
                    href={`/tech-pulse/${article.slug}`}
                    className="relative block aspect-[16/10] w-full overflow-hidden bg-slate-100"
                  >
                    <Image
                      src={article.image}
                      alt={article.imageAlt}
                      fill
                      sizes="(min-width: 1024px) 280px, (min-width: 640px) 340px, 100vw"
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute left-2.5 top-2.5 bg-[#0a1f44] px-2 py-0.5 text-[9px] font-black uppercase tracking-[0.1em] text-white">
                      {article.categoryLabel}
                    </span>
                  </Link>

                  {/* Metadata */}
                  <div className="mt-2.5 flex items-center justify-between text-[10px] font-semibold text-slate-500">
                    <span className="inline-flex items-center gap-1">
                      <CalendarDays className="size-3 text-brand-secondary" />
                      {article.date}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Clock3 className="size-3 text-brand-secondary" />
                      {article.readingTime}
                    </span>
                  </div>

                  {/* Title & Excerpt */}
                  <h3 className="font-exo mt-2 line-clamp-2 text-sm font-bold leading-snug text-[#0a1f44] group-hover:text-brand-secondary transition-colors">
                    {article.title}
                  </h3>

                  <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-slate-600">
                    {article.excerpt}
                  </p>
                </div>

                {/* Footer Action */}
                <div className="mt-3.5 border-t border-slate-100 pt-2 flex items-center justify-between">
                  <Link
                    href={`/tech-pulse/${article.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#0a1f44] transition-colors group-hover:text-brand-secondary"
                  >
                    <span>Read story</span>
                    <ArrowUpRight className="size-3.5" />
                  </Link>

                  <span className="text-[10px] font-bold text-slate-400">
                    #{String(idx + 1).padStart(2, "0")}
                  </span>
                </div>
              </article>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Bottom Bar: Indicators & Full Story Links */}
        <div className="mt-4 flex items-center justify-between border-t border-slate-200 pt-3">
          {totalInCat > 3 ? (
            <div className="flex items-center gap-1">
              {categoryArticles.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setCardOffset(i)}
                  aria-label={`Jump to article ${i + 1}`}
                  className={`h-1 transition-all ${
                    cardOffset === i
                      ? "w-6 bg-[#0a1f44]"
                      : "w-2 bg-slate-300 hover:bg-slate-400"
                  }`}
                />
              ))}
            </div>
          ) : (
            <span className="text-[11px] font-semibold text-slate-500">
              Showing all stories in {activeTopicObj.label}
            </span>
          )}

          <div className="flex items-center gap-2 text-[11px] font-bold">
            <span className="text-slate-400">Category:</span>
            <span className="font-black text-[#0a1f44] uppercase tracking-wider">
              {activeTopicObj.label}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

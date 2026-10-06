"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Search,
  SlidersHorizontal,
  Users,
  X,
} from "lucide-react";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { BorderBeam } from "@/components/ui/border-beam";
import type { SanHubCatalogItem } from "@/lib/san-hub-catalog-data";

type CourseCatalogProps = {
  items: readonly SanHubCatalogItem[];
};

const learningTypes = ["All learning", "Courses", "Upcoming training", "Upskilling programs", "Apprenticeships / Internships"] as const;
type LearningType = (typeof learningTypes)[number];

const learningFormats = ["All formats", "Cohort", "Weekend labs", "Intensive labs", "Evening cohort", "Workshop", "Programme"] as const;

function normalize(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function formatLabel(item: SanHubCatalogItem) {
  if (item.format.toLowerCase().includes("programme")) return "Programme";
  if (item.format.toLowerCase().includes("workshop")) return "Workshop";
  return item.format;
}

function EnrollmentDialog({ item, onClose }: { item: SanHubCatalogItem; onClose: () => void }) {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="fixed inset-0 z-[100] grid place-items-center bg-[#07152d]/65 p-4 backdrop-blur-sm" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <motion.div initial={{ opacity: 0, y: 18, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} className="relative max-h-[min(720px,calc(100svh-2rem))] w-full max-w-xl overflow-y-auto rounded-2xl bg-white p-5 shadow-[0_24px_70px_rgba(7,21,45,0.28)] sm:p-7" role="dialog" aria-modal="true" aria-labelledby="enrollment-title">
        <button type="button" onClick={onClose} aria-label="Close enrollment form" className="absolute right-4 top-4 grid size-9 place-items-center rounded-full border border-slate-200 text-[#526989] transition-colors hover:bg-slate-50 hover:text-[#07152d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0875d1]"><X className="size-4" /></button>
        {!submitted ? (
          <>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#0875d1]">SAN HUB / ENROLLMENT</p>
            <h2 id="enrollment-title" className="font-exo mt-3 max-w-lg text-2xl font-bold leading-tight tracking-[-0.04em] text-[#07152d] sm:text-3xl">Start learning with {item.title}.</h2>
            <p className="mt-3 max-w-lg text-sm leading-6 text-[#526989]">Share your details and the SAN HUB team will confirm the next available intake, schedule, and next steps.</p>
            <div className="mt-5 rounded-xl bg-[#edf4fd] p-3.5"><p className="text-sm font-bold text-[#07152d]">{item.title}</p><p className="mt-1 text-xs text-[#526989]">{item.format} · {item.duration} · {item.level}</p></div>
            <form onSubmit={handleSubmit} className="mt-5 grid gap-4 sm:grid-cols-2">
              <label className="grid gap-1.5 text-xs font-bold text-[#07152d]">Full name<input required name="name" type="text" autoComplete="name" placeholder="Your full name" className="h-11 rounded-lg border border-slate-200 bg-[#f8fafc] px-3 text-sm font-normal outline-none transition-colors placeholder:text-slate-400 focus:border-[#0875d1] focus:ring-2 focus:ring-[#0875d1]/15" /></label>
              <label className="grid gap-1.5 text-xs font-bold text-[#07152d]">Email address<input required name="email" type="email" autoComplete="email" placeholder="you@example.com" className="h-11 rounded-lg border border-slate-200 bg-[#f8fafc] px-3 text-sm font-normal outline-none transition-colors placeholder:text-slate-400 focus:border-[#0875d1] focus:ring-2 focus:ring-[#0875d1]/15" /></label>
              <label className="grid gap-1.5 text-xs font-bold text-[#07152d]">Phone number<input name="phone" type="tel" autoComplete="tel" placeholder="+250 7xx xxx xxx" className="h-11 rounded-lg border border-slate-200 bg-[#f8fafc] px-3 text-sm font-normal outline-none transition-colors placeholder:text-slate-400 focus:border-[#0875d1] focus:ring-2 focus:ring-[#0875d1]/15" /></label>
              <label className="grid gap-1.5 text-xs font-bold text-[#07152d]">Current experience<select name="experience" className="h-11 rounded-lg border border-slate-200 bg-[#f8fafc] px-3 text-sm font-normal outline-none focus:border-[#0875d1] focus:ring-2 focus:ring-[#0875d1]/15"><option>Getting started</option><option>Some experience</option><option>Professional</option><option>Organization or team</option></select></label>
              <label className="grid gap-1.5 text-xs font-bold text-[#07152d] sm:col-span-2">What do you hope to achieve?<textarea name="goals" rows={3} placeholder="Tell us briefly about your learning goal..." className="resize-y rounded-lg border border-slate-200 bg-[#f8fafc] px-3 py-2.5 text-sm font-normal outline-none transition-colors placeholder:text-slate-400 focus:border-[#0875d1] focus:ring-2 focus:ring-[#0875d1]/15" /></label>
              <button type="submit" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[#07152d] px-5 text-sm font-bold text-white transition-colors hover:bg-[#0875d1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0875d1] sm:col-span-2">Request enrollment <ArrowRight className="size-4" /></button>
            </form>
          </>
        ) : (
          <div className="py-8 text-center sm:py-12">
            <span className="mx-auto grid size-14 place-items-center rounded-full bg-[#e7f7ef] text-[#087d55]"><Check className="size-7" /></span>
            <h2 id="enrollment-title" className="font-exo mt-5 text-2xl font-bold tracking-[-0.04em] text-[#07152d]">Your enrollment request is ready.</h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#526989]">Thank you for your interest in {item.title}. The SAN HUB team will follow up with the intake details.</p>
            <button type="button" onClick={onClose} className="mt-6 rounded-lg bg-[#07152d] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#0875d1]">Done</button>
          </div>
        )}
      </motion.div>
    </div>
  );
}

function CourseCard({ item, onEnroll }: { item: SanHubCatalogItem; onEnroll: (item: SanHubCatalogItem) => void }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[#d8e2ef] bg-white shadow-[0_8px_24px_rgba(7,21,45,0.04)] transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-1 hover:border-[#0875d1]/50 hover:shadow-[0_16px_34px_rgba(7,21,45,0.1)]">
      <Link href={item.href} className="relative block aspect-[16/9] overflow-hidden bg-[#dceaf8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#0875d1]">
        <Image src={item.image} alt="" fill sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07152d]/55 via-transparent to-transparent" />
      </Link>
      <div className="flex flex-1 flex-col p-3 sm:p-4">
        <p className="text-[10px] font-black uppercase tracking-[0.14em] text-[#0875d1]">{item.provider}</p>
        <Link href={item.href} className="mt-2 font-exo text-lg font-bold leading-[1.1] tracking-[-0.03em] text-[#07152d] hover:text-[#0875d1]">{item.title}</Link>
        <p className="mt-2 line-clamp-2 text-sm leading-5 text-[#526989]">{item.description}</p>
        <div className="mt-4 grid gap-2 border-t border-slate-100 pt-3 text-xs text-[#526989] sm:grid-cols-2">
          <span className="inline-flex items-center gap-1.5"><Clock3 className="size-3.5 text-[#0875d1]" />{item.duration}</span>
          <span className="inline-flex items-center gap-1.5"><Users className="size-3.5 text-[#0875d1]" />{item.level}</span>
        </div>
        <div className="mt-4">
          <button type="button" onClick={() => onEnroll(item)} className="inline-flex min-h-10 w-full items-center justify-center gap-1.5 rounded-lg bg-[#07152d] px-3 text-xs font-bold text-white transition-colors hover:bg-[#0875d1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0875d1]">Enroll now <ArrowRight className="size-3.5" /></button>
        </div>
      </div>
      <BorderBeam size={104} duration={7} initialOffset={12} borderWidth={1.5} colorFrom="#09bce7" colorTo="#0a1f44" className="from-transparent via-[#09bce7] to-transparent opacity-85" />
      <BorderBeam size={104} duration={7} delay={3.5} initialOffset={58} borderWidth={1.25} colorFrom="#0a1f44" colorTo="#4d8dff" className="from-transparent via-[#4d8dff] to-transparent opacity-70" reverse />
    </article>
  );
}

export function SanHubCourseCatalog({ items }: CourseCatalogProps) {
  const [query, setQuery] = useState("");
  const [type, setType] = useState<LearningType>("All learning");
  const [format, setFormat] = useState("All formats");
  const [level, setLevel] = useState("All levels");
  const [currentPage, setCurrentPage] = useState(0);
  const [slideDirection, setSlideDirection] = useState(1);
  const [selectedItem, setSelectedItem] = useState<SanHubCatalogItem | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const levels = useMemo(() => ["All levels", ...Array.from(new Set(items.map((item) => item.level)))], [items]);
  const filteredItems = useMemo(() => {
    const normalizedQuery = normalize(query);
    return items.filter((item) => {
      const matchesType = type === "All learning" || item.category === type;
      const matchesFormat = format === "All formats" || formatLabel(item) === format;
      const matchesLevel = level === "All levels" || item.level === level;
      const searchable = normalize(`${item.title} ${item.category} ${item.provider} ${item.description} ${item.format} ${item.level}`);
      return matchesType && matchesFormat && matchesLevel && (!normalizedQuery || searchable.includes(normalizedQuery));
    });
  }, [format, items, level, query, type]);

  const pageSize = 3;
  const pageCount = Math.max(1, Math.ceil(filteredItems.length / pageSize));
  const visibleItems = filteredItems.slice(currentPage * pageSize, currentPage * pageSize + pageSize);

  useEffect(() => {
    setCurrentPage(0);
  }, [format, level, query, type]);

  useEffect(() => {
    if (prefersReducedMotion || pageCount < 2) return;
    const timer = window.setInterval(() => {
      setSlideDirection(1);
      setCurrentPage((page) => (page + 1) % pageCount);
    }, 5200);
    return () => window.clearInterval(timer);
  }, [pageCount, prefersReducedMotion]);

  function goToPage(page: number, direction: 1 | -1) {
    setSlideDirection(direction);
    setCurrentPage(page);
  }

  function clearFilters() {
    setQuery("");
    setType("All learning");
    setFormat("All formats");
    setLevel("All levels");
  }

  return (
    <>
      <section className="border-t border-slate-200 px-3 pb-8 pt-2 sm:px-8 lg:px-12 lg:pb-10 lg:pt-3">
      <div className="mx-auto max-w-[1600px] border border-slate-200 bg-white p-2 shadow-xs sm:p-4 lg:p-5">
      <section className="px-4 py-4 sm:px-6 lg:px-8 lg:py-5">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3">
          <h1 className="font-exo shrink-0 text-2xl font-bold tracking-[-0.04em] text-[#07152d]">Courses</h1>
          <label className="relative block min-w-[220px] flex-1">
            <span className="sr-only">Search courses</span>
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="What do you want to learn?" className="h-14 w-full rounded-full border border-[#d8e2ef] bg-white px-5 pr-16 text-base text-[#526989] outline-none transition-[border-color,box-shadow] placeholder:text-[#526989] focus:border-[#0875d1] focus:ring-4 focus:ring-[#0875d1]/10" />
            <button type="button" aria-label="Search courses" className="absolute right-1.5 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-[#075dcc] text-white transition-colors hover:bg-[#07152d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0875d1] focus-visible:ring-offset-2"><Search className="size-5" /></button>
          </label>
          <div className="flex w-full flex-wrap items-center justify-end gap-2 lg:w-auto">
            <span className="inline-flex items-center gap-1.5 px-1 text-xs font-black uppercase tracking-[0.14em] text-[#07152d]"><SlidersHorizontal className="size-4 text-[#0875d1]" /> Filters</span>
            <select aria-label="Learning type" value={type} onChange={(event) => setType(event.target.value as LearningType)} className="h-10 min-w-[132px] rounded-full border border-[#d8e2ef] bg-white px-3 text-xs text-[#07152d] outline-none focus:border-[#0875d1] focus:ring-2 focus:ring-[#0875d1]/10"><option>All learning</option>{learningTypes.slice(1).map((value) => <option key={value}>{value}</option>)}</select>
            <select aria-label="Format" value={format} onChange={(event) => setFormat(event.target.value)} className="h-10 min-w-[118px] rounded-full border border-[#d8e2ef] bg-white px-3 text-xs text-[#07152d] outline-none focus:border-[#0875d1] focus:ring-2 focus:ring-[#0875d1]/10"><option>All formats</option>{learningFormats.slice(1).map((value) => <option key={value}>{value}</option>)}</select>
            <select aria-label="Level" value={level} onChange={(event) => setLevel(event.target.value)} className="h-10 min-w-[112px] rounded-full border border-[#d8e2ef] bg-white px-3 text-xs text-[#07152d] outline-none focus:border-[#0875d1] focus:ring-2 focus:ring-[#0875d1]/10"><option>All levels</option>{levels.slice(1).map((value) => <option key={value}>{value}</option>)}</select>
            <button type="button" onClick={clearFilters} className="h-10 rounded-full px-2 text-xs font-bold text-[#0875d1] hover:underline">Clear</button>
          </div>
        </div>
      </section>

      <section className="px-4 pb-7 pt-0 sm:px-6 lg:px-8 lg:pb-9">
        <div className="mx-auto max-w-7xl">
          <div>
            {filteredItems.length > 0 ? (
              <>
                <AnimatePresence initial={false} mode="wait">
                  <motion.div key={currentPage} initial={{ opacity: 0, x: prefersReducedMotion ? 0 : slideDirection * 22 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: prefersReducedMotion ? 0 : slideDirection * -22 }} transition={{ duration: prefersReducedMotion ? 0.01 : 0.38, ease: [0.22, 1, 0.36, 1] }} className="mx-auto grid w-full max-w-[1180px] gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {visibleItems.map((item) => <CourseCard key={item.id} item={item} onEnroll={setSelectedItem} />)}
                  </motion.div>
                </AnimatePresence>
                {pageCount > 1 && (
                  <div className="mt-4 flex items-center justify-end gap-3">
                    <div className="flex items-center gap-1.5" aria-label="Course pages">
                      {Array.from({ length: pageCount }, (_, index) => <button key={index} type="button" aria-label={`Show course page ${index + 1}`} aria-current={index === currentPage} onClick={() => goToPage(index, index >= currentPage ? 1 : -1)} className={`h-2 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0875d1] focus-visible:ring-offset-2 ${index === currentPage ? "w-7 bg-[#075dcc]" : "w-2 bg-[#b8c9df] hover:bg-[#075dcc]"}`} />)}
                    </div>
                    <button type="button" aria-label="Previous courses" onClick={() => goToPage((currentPage - 1 + pageCount) % pageCount, -1)} className="grid size-9 place-items-center rounded-full border border-[#d8e2ef] text-[#07152d] transition-colors hover:border-[#075dcc] hover:text-[#075dcc] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#075dcc]"><ChevronLeft className="size-4" /></button>
                    <button type="button" aria-label="Next courses" onClick={() => goToPage((currentPage + 1) % pageCount, 1)} className="grid size-9 place-items-center rounded-full border border-[#d8e2ef] text-[#07152d] transition-colors hover:border-[#075dcc] hover:text-[#075dcc] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#075dcc]"><ChevronRight className="size-4" /></button>
                  </div>
                )}
              </>
            ) : <div className="rounded-2xl border border-dashed border-[#b8c9df] px-6 py-14 text-center"><Search className="mx-auto size-7 text-[#0875d1]" /><h3 className="font-exo mt-4 text-xl font-bold text-[#07152d]">No learning options found.</h3><p className="mt-2 text-sm text-[#526989]">Try a different search or clear the filters to explore everything available.</p><button type="button" onClick={clearFilters} className="mt-5 rounded-lg bg-[#07152d] px-4 py-2.5 text-xs font-bold text-white hover:bg-[#0875d1]">Show all learning</button></div>}
          </div>

        </div>
      </section>
      </div>
      </section>
      {selectedItem && <EnrollmentDialog item={selectedItem} onClose={() => setSelectedItem(null)} />}
    </>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, BookOpen, CalendarDays, Check, ChevronDown, Clock3, Filter, Search, Sparkles, Users } from "lucide-react";
import { useMemo, useState } from "react";

export const sanHubCategories = [
  "Courses",
  "Upcoming training",
  "Innovation programs",
  "Apprenticeships / Internships",
  "Upskilling programs",
  "Events",
] as const;

export type SanHubCategory = (typeof sanHubCategories)[number];

export type SanHubCatalogItem = {
  id: string;
  category: SanHubCategory;
  title: string;
  provider: string;
  description: string;
  image: string;
  format: string;
  duration: string;
  level: string;
  badge?: string;
  href: string;
};

export const sanHubCatalogItems: readonly SanHubCatalogItem[] = [
  { id: "full-stack-software-engineering", category: "Courses", title: "Full-Stack Software Engineering", provider: "SAN TECH / SAN HUB", description: "Build reliable web and platform experiences from user needs to deployment.", image: "/images/team.jpg", format: "Cohort", duration: "16 weeks", level: "Intermediate", badge: "Featured pathway", href: "/san-hub/course/full-stack-software-engineering" },
  { id: "applied-ai-machine-learning", category: "Courses", title: "Applied AI & Machine Learning", provider: "SAN TECH / SAN HUB", description: "Use computer vision, analytics, and responsible AI to solve practical problems.", image: "/images/summit.jpg", format: "Weekend labs", duration: "12 weeks", level: "All levels", href: "/san-hub/course/applied-ai-machine-learning" },
  { id: "cybersecurity-defense", category: "Courses", title: "Cybersecurity & Threat Intelligence", provider: "SAN TECH / SAN HUB", description: "Learn the habits, tools, and thinking needed to protect systems and information.", image: "/images/fieldwork.jpg", format: "Intensive labs", duration: "10 weeks", level: "Intermediate", href: "/san-hub/course/cybersecurity-defense" },
  { id: "build-with-ai", category: "Upcoming training", title: "Build with AI: practical problem solving", provider: "SAN HUB learning calendar", description: "A guided cohort for turning everyday challenges into useful, testable AI workflows.", image: "/images/graduates.jpg", format: "Evening cohort", duration: "Starts 14 Oct 2026", level: "Beginner friendly", badge: "Next cohort", href: "/connect?topic=upcoming-training" },
  { id: "digital-product-workshop", category: "Upcoming training", title: "Designing a useful digital product", provider: "SAN HUB learning calendar", description: "A focused workshop on research, prototyping, and making a product easier to use.", image: "/images/team.jpg", format: "One-day workshop", duration: "03 Nov 2026", level: "Open to all", href: "/connect?topic=upcoming-training" },
  { id: "innovation-challenge-lab", category: "Innovation programs", title: "Innovation Challenge Lab", provider: "SAN TECH innovation team", description: "Move a promising question from research and prototyping toward a tested possibility.", image: "/images/summit.jpg", format: "Challenge lab", duration: "8-week cycle", level: "Teams and innovators", badge: "Build with us", href: "/innovation-lab" },
  { id: "startup-product-studio", category: "Innovation programs", title: "Startup & Product Studio", provider: "SAN HUB innovation programs", description: "Shape an early idea through validation, product thinking, mentorship, and partner feedback.", image: "/images/fieldwork.jpg", format: "Studio program", duration: "Rolling intake", level: "Early-stage teams", href: "/innovation-lab" },
  { id: "software-apprenticeship", category: "Apprenticeships / Internships", title: "Software Engineering Apprenticeship", provider: "SAN TECH delivery teams", description: "Learn through guided contribution to real systems, reviews, and team delivery habits.", image: "/images/team.jpg", format: "Placement", duration: "3–6 months", level: "Emerging practitioners", href: "/join-the-community?role=Intern" },
  { id: "innovation-internship", category: "Apprenticeships / Internships", title: "Innovation & Research Internship", provider: "SAN TECH research team", description: "Work with researchers and builders to explore context, evidence, prototypes, and impact.", image: "/images/graduates.jpg", format: "Mentored placement", duration: "By placement", level: "Students and graduates", href: "/join-the-community?role=Intern" },
  { id: "team-digital-transformation", category: "Upskilling programs", title: "Digital Transformation for Teams", provider: "SAN HUB professional learning", description: "Help teams move from disconnected work to clearer digital processes and systems.", image: "/images/fieldwork.jpg", format: "Team programme", duration: "Custom schedule", level: "Organizations", badge: "For teams", href: "/connect?topic=upskilling" },
  { id: "ai-literacy-for-work", category: "Upskilling programs", title: "AI Literacy for Everyday Work", provider: "SAN HUB professional learning", description: "Build practical confidence with AI tools, responsible use, and better everyday decisions.", image: "/images/summit.jpg", format: "Short programme", duration: "2–4 weeks", level: "Professionals", href: "/connect?topic=upskilling" },
  { id: "innovation-open-day", category: "Events", title: "SAN TECH Innovation Open Day", provider: "SAN TECH community", description: "Meet builders, see working demos, and find practical ways to participate in the ecosystem.", image: "/images/summit.jpg", format: "Showcase and demos", duration: "21 Nov 2026", level: "Open to all", badge: "Community event", href: "/tech-pulse" },
  { id: "tech-community-talks", category: "Events", title: "SAN HUB Tech Community Talks", provider: "SAN HUB events", description: "Join conversations with practitioners, mentors, and innovators working on useful technology.", image: "/images/fieldwork.jpg", format: "Talks and panels", duration: "Monthly", level: "Open to all", href: "/tech-pulse" },
];

const categoryIcons: Record<SanHubCategory, typeof BookOpen> = {
  Courses: BookOpen,
  "Upcoming training": CalendarDays,
  "Innovation programs": Sparkles,
  "Apprenticeships / Internships": Users,
  "Upskilling programs": BookOpen,
  Events: CalendarDays,
};

export function SanHubCatalogCard({ item }: { item: SanHubCatalogItem }) {
  const Icon = categoryIcons[item.category];

  return (
    <article className="group flex min-h-[440px] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_14px_34px_rgba(10,31,68,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-brand-secondary/40 hover:shadow-[0_24px_50px_rgba(10,31,68,0.12)]">
      <Link href={item.href} className="relative block h-44 overflow-hidden bg-[#dceaf8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary focus-visible:ring-inset">
        <Image src={item.image} alt="" fill sizes="(max-width: 768px) 100vw, (max-width: 1280px) 33vw, 25vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1f44]/75 via-[#0a1f44]/10 to-transparent" />
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-[#0a1f44] shadow-sm">{item.category}</span>
        {item.badge && <span className="absolute bottom-4 left-4 rounded-full bg-brand-secondary px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.1em] text-white">{item.badge}</span>}
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-500">
          <span className="grid size-7 place-items-center rounded-lg bg-[#e6eef8] text-brand-secondary"><Icon className="size-3.5" aria-hidden="true" /></span>
          <span>{item.provider}</span>
        </div>
        <Link href={item.href} className="mt-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary focus-visible:ring-offset-2">
          <h3 className="font-exo text-lg font-bold leading-tight tracking-[-0.025em] text-[#0a1f44] transition-colors group-hover:text-brand-secondary">{item.title}</h3>
        </Link>
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">{item.description}</p>
        <div className="mt-auto grid grid-cols-2 gap-3 border-t border-slate-100 pt-4 text-xs text-slate-500">
          <span><strong className="block font-black uppercase tracking-[0.1em] text-slate-400">Format</strong><span className="mt-1 block font-semibold text-slate-700">{item.format}</span></span>
          <span><strong className="block font-black uppercase tracking-[0.1em] text-slate-400">Level</strong><span className="mt-1 block font-semibold text-slate-700">{item.level}</span></span>
        </div>
        <div className="mt-4 flex items-center justify-between gap-3 text-xs font-bold text-slate-500">
          <span className="inline-flex items-center gap-1.5"><Clock3 className="size-3.5 text-brand-secondary" />{item.duration}</span>
          <Link href={item.href} className="inline-flex items-center gap-1 text-brand-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary focus-visible:ring-offset-2">Explore <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></Link>
        </div>
      </div>
    </article>
  );
}

export function SanHubCatalog({ items = sanHubCatalogItems }: { items?: readonly SanHubCatalogItem[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<SanHubCategory | "All">("All");
  const [format, setFormat] = useState("All formats");
  const [level, setLevel] = useState("All levels");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  const formats = useMemo(() => ["All formats", ...Array.from(new Set(items.map((item) => item.format)))], [items]);
  const levels = useMemo(() => ["All levels", ...Array.from(new Set(items.map((item) => item.level)))], [items]);
  const filteredItems = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return items.filter((item) => {
      const matchesCategory = category === "All" || item.category === category;
      const matchesFormat = format === "All formats" || item.format === format;
      const matchesLevel = level === "All levels" || item.level === level;
      const matchesQuery = !normalizedQuery || [item.title, item.category, item.provider, item.description].some((value) => value.toLowerCase().includes(normalizedQuery));
      return matchesCategory && matchesFormat && matchesLevel && matchesQuery;
    });
  }, [category, format, items, level, query]);
  const pageCount = Math.max(1, Math.ceil(filteredItems.length / pageSize));
  const safePage = Math.min(currentPage, pageCount);
  const visibleItems = filteredItems.slice((safePage - 1) * pageSize, safePage * pageSize);

  function clearFilters() {
    setQuery("");
    setCategory("All");
    setFormat("All formats");
    setLevel("All levels");
    setCurrentPage(1);
  }

  return (
    <section className="border-y border-slate-200 bg-white px-6 py-12 sm:px-10 lg:px-16 lg:py-16">
      <div className="mx-auto max-w-[1500px]">
        <div id="san-hub-catalog" className="sticky top-[104px] z-40 -mx-6 bg-white/95 px-6 shadow-[0_8px_18px_rgba(10,31,68,0.04)] backdrop-blur-md sm:-mx-10 sm:px-10 lg:-mx-16 lg:px-16">
          <div className="flex flex-col gap-3 border-y border-slate-200 py-4 lg:flex-row lg:items-center">
          <label className="relative min-w-0 flex-1">
            <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
            <span className="sr-only">Search SAN HUB catalog</span>
            <input value={query} onChange={(event) => { setQuery(event.target.value); setCurrentPage(1); }} placeholder="What do you want to learn or join?" className="h-12 w-full rounded-xl border border-slate-200 bg-[#f8fafc] pl-11 pr-4 text-sm text-slate-800 outline-none transition-colors placeholder:text-slate-400 focus:border-brand-secondary focus:bg-white" />
          </label>
          <button type="button" onClick={() => setFiltersOpen((open) => !open)} aria-expanded={filtersOpen} className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 text-sm font-bold text-[#0a1f44] transition-colors hover:border-brand-secondary hover:bg-[#f8fafc]"><Filter className="size-4" />Filter & sort<ChevronDown className={`size-4 text-slate-400 transition-transform ${filtersOpen ? "rotate-180" : ""}`} /></button>
          </div>

          <div className="flex gap-2 overflow-x-auto py-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <button type="button" onClick={() => { setCategory("All"); setCurrentPage(1); }} className={`shrink-0 rounded-full border px-4 py-2 text-xs font-bold transition-colors ${category === "All" ? "border-[#0a1f44] bg-[#0a1f44] text-white" : "border-slate-200 bg-white text-slate-600 hover:border-brand-secondary hover:text-[#0a1f44]"}`}>All results</button>
          {sanHubCategories.map((itemCategory) => <button key={itemCategory} type="button" onClick={() => { setCategory(itemCategory); setCurrentPage(1); }} className={`shrink-0 rounded-full border px-4 py-2 text-xs font-bold transition-colors ${category === itemCategory ? "border-[#0a1f44] bg-[#0a1f44] text-white" : "border-slate-200 bg-white text-slate-600 hover:border-brand-secondary hover:text-[#0a1f44]"}`}>{itemCategory}</button>)}
          </div>

          {filtersOpen && (
            <div className="grid gap-3 rounded-2xl bg-[#f8fafc] p-4 sm:grid-cols-3">
            <label className="grid gap-1.5 text-xs font-bold text-slate-600">Format<select value={format} onChange={(event) => { setFormat(event.target.value); setCurrentPage(1); }} className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 outline-none focus:border-brand-secondary">{formats.map((option) => <option key={option}>{option}</option>)}</select></label>
            <label className="grid gap-1.5 text-xs font-bold text-slate-600">Level<select value={level} onChange={(event) => { setLevel(event.target.value); setCurrentPage(1); }} className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 outline-none focus:border-brand-secondary">{levels.map((option) => <option key={option}>{option}</option>)}</select></label>
            <div className="flex items-end"><button type="button" onClick={clearFilters} className="inline-flex h-11 items-center gap-2 rounded-xl px-3 text-sm font-bold text-brand-secondary transition-colors hover:bg-white"><Check className="size-4" />Clear filters</button></div>
            </div>
          )}
        </div>

        <div className="mt-7 flex items-center justify-between gap-4"><p className="text-sm font-bold text-[#0a1f44]">{filteredItems.length} {filteredItems.length === 1 ? "result" : "results"}</p><p className="hidden text-xs font-semibold uppercase tracking-[0.14em] text-slate-400 sm:block">Learn · build · keep going</p></div>

        {filteredItems.length > 0 ? <>
          <div className="mt-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">{visibleItems.map((item) => <SanHubCatalogCard key={item.id} item={item} />)}</div>
          {pageCount > 1 && <nav aria-label="SAN HUB catalog pagination" className="mt-9 flex items-center justify-center gap-2">
            <button type="button" disabled={safePage === 1} onClick={() => setCurrentPage((page) => Math.max(1, page - 1))} className="rounded-xl border border-slate-200 px-3 py-2 text-xs font-bold text-slate-600 transition-colors hover:border-brand-secondary hover:text-[#0a1f44] disabled:cursor-not-allowed disabled:opacity-40">Previous</button>
            {Array.from({ length: pageCount }, (_, index) => index + 1).map((page) => <button key={page} type="button" onClick={() => setCurrentPage(page)} aria-current={safePage === page ? "page" : undefined} className={`grid size-9 place-items-center rounded-xl border text-xs font-bold transition-colors ${safePage === page ? "border-[#0a1f44] bg-[#0a1f44] text-white" : "border-slate-200 text-slate-600 hover:border-brand-secondary hover:text-[#0a1f44]"}`}>{page}</button>)}
            <button type="button" disabled={safePage === pageCount} onClick={() => setCurrentPage((page) => Math.min(pageCount, page + 1))} className="rounded-xl border border-slate-200 px-3 py-2 text-xs font-bold text-slate-600 transition-colors hover:border-brand-secondary hover:text-[#0a1f44] disabled:cursor-not-allowed disabled:opacity-40">Next</button>
          </nav>}
        </> : <div className="mt-5 rounded-2xl border border-dashed border-slate-300 bg-[#f8fafc] px-6 py-16 text-center"><p className="font-exo text-2xl font-bold text-[#0a1f44]">No SAN HUB opportunities match that search.</p><button type="button" onClick={clearFilters} className="mt-4 text-sm font-bold text-brand-secondary hover:underline">Clear filters and show everything</button></div>}
      </div>
    </section>
  );
}

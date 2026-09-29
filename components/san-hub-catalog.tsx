"use client";

import { Check, ChevronDown, Filter, Search } from "lucide-react";
import { useMemo, useState } from "react";

import { SanHubCatalogCard } from "@/components/san-hub/san-hub-course-card";
import { sanHubCatalogItems, sanHubCategories, type SanHubCatalogItem, type SanHubCategory } from "@/lib/san-hub-catalog-data";

export function SanHubCatalog({ items = sanHubCatalogItems, showFilters = true, categories = sanHubCategories }: { items?: readonly SanHubCatalogItem[]; showFilters?: boolean; categories?: readonly SanHubCategory[] }) {
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
    <section
      id="san-hub-digital-library"
      className="san-hub-graphic-section border-y border-slate-200 px-6 pb-12 pt-0 sm:px-10 lg:px-16 lg:pb-16"
    >
      <div className="mx-auto max-w-[1500px]">
        {(showFilters || categories.length > 0) && <div id="san-hub-catalog" className="scroll-mt-40 sticky top-[104px] z-40 -mx-6 bg-white/95 px-6 shadow-[0_8px_18px_rgba(10,31,68,0.04)] backdrop-blur-md sm:-mx-10 sm:px-10 lg:-mx-16 lg:px-16">
          {showFilters && <div className="flex flex-col gap-3 border-y border-slate-200 py-4 lg:flex-row lg:items-center">
            <label className="relative min-w-0 flex-1">
              <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
              <span className="sr-only">Search SAN HUB catalog</span>
              <input value={query} onChange={(event) => { setQuery(event.target.value); setCurrentPage(1); }} placeholder="What do you want to learn or join?" className="h-12 w-full rounded-xl border border-slate-200 bg-[#f8fafc] pl-11 pr-4 text-sm text-slate-800 outline-none transition-colors placeholder:text-slate-400 focus:border-brand-secondary focus:bg-white" />
            </label>
            <button type="button" onClick={() => setFiltersOpen((open) => !open)} aria-expanded={filtersOpen} className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 text-sm font-bold text-[#0a1f44] transition-colors hover:border-brand-secondary hover:bg-[#f8fafc]"><Filter className="size-4" />Filter &amp; sort<ChevronDown className={`size-4 text-slate-400 transition-transform ${filtersOpen ? "rotate-180" : ""}`} /></button>
          </div>}

          <div className="flex gap-2 overflow-x-auto py-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <button type="button" onClick={() => { setCategory("All"); setCurrentPage(1); }} className={`shrink-0 rounded-full border px-4 py-2 text-xs font-bold transition-colors ${category === "All" ? "border-[#0a1f44] bg-[#0a1f44] text-white" : "border-slate-200 bg-white text-slate-600 hover:border-brand-secondary hover:text-[#0a1f44]"}`}>{showFilters ? "All results" : "All programs"}</button>
            {categories.map((itemCategory) => <button key={itemCategory} type="button" onClick={() => { setCategory(itemCategory); setCurrentPage(1); }} className={`shrink-0 rounded-full border px-4 py-2 text-xs font-bold transition-colors ${category === itemCategory ? "border-[#0a1f44] bg-[#0a1f44] text-white" : "border-slate-200 bg-white text-slate-600 hover:border-brand-secondary hover:text-[#0a1f44]"}`}>{itemCategory}</button>)}
          </div>

          {showFilters && filtersOpen && (
            <div className="grid gap-3 rounded-2xl bg-[#f8fafc] p-4 sm:grid-cols-3">
              <label className="grid gap-1.5 text-xs font-bold text-slate-600">Format<select value={format} onChange={(event) => { setFormat(event.target.value); setCurrentPage(1); }} className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 outline-none focus:border-brand-secondary">{formats.map((option) => <option key={option}>{option}</option>)}</select></label>
              <label className="grid gap-1.5 text-xs font-bold text-slate-600">Level<select value={level} onChange={(event) => { setLevel(event.target.value); setCurrentPage(1); }} className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 outline-none focus:border-brand-secondary">{levels.map((option) => <option key={option}>{option}</option>)}</select></label>
              <div className="flex items-end"><button type="button" onClick={clearFilters} className="inline-flex h-11 items-center gap-2 rounded-xl px-3 text-sm font-bold text-brand-secondary transition-colors hover:bg-white"><Check className="size-4" />Clear filters</button></div>
            </div>
          )}
        </div>}

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

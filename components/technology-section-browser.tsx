"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { technologyCategories } from "@/lib/technology-data";

const programmingLanguages = technologyCategories[0];

export function TechnologySectionBrowser({ mode = "technologies" }: { mode?: "technologies" | "programming-languages" }) {
  return mode === "programming-languages" ? <ProgrammingLanguagesPanel /> : <TechnologyAccordion />;
}

function TechnologyAccordion() {
  const [expandedId, setExpandedId] = useState<string>(technologyCategories[0].id);
  const categories = technologyCategories.filter((category) => category.id !== programmingLanguages.id);

  return (
    <div className="grid gap-10 lg:grid-cols-[0.68fr_1.32fr] lg:gap-14">
      <div><p className="text-[11px] font-black uppercase tracking-[0.2em] text-brand-secondary">Technologies</p><p className="mt-6 max-w-md text-base leading-7 text-[#68718a]">SAN TECH uses a broad technology stack covering software engineering, AI, cybersecurity, IoT, networking, cloud, data, automation, and digital transformation.</p></div>
      <div className="border-y border-slate-300" role="list" aria-label="SAN TECH technology categories">
        {categories.map((category, index) => { const expanded = expandedId === category.id; const Icon = category.icon; return <div key={category.id} className="border-b border-slate-200 last:border-b-0"><button type="button" onClick={() => setExpandedId(expanded ? "" : category.id)} aria-expanded={expanded} className="flex w-full items-center gap-4 py-4 text-left transition-colors hover:text-brand-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary focus-visible:ring-offset-2"><span className="w-6 shrink-0 text-[10px] font-black text-brand-secondary/55">{String(index + 1).padStart(2, "0")}</span><span className={`grid size-8 shrink-0 place-items-center rounded-lg ${expanded ? "bg-[#d9eafa] text-brand-secondary" : "bg-[#eef3f9] text-[#71809a]"}`}><Icon className="size-4" strokeWidth={1.8} aria-hidden="true" /></span><span className="flex-1 text-sm font-bold text-[#0a1f44]">{category.label}</span><ChevronDown className={`size-4 shrink-0 text-brand-secondary transition-transform ${expanded ? "rotate-180" : ""}`} aria-hidden="true" /></button>{expanded && <div className="pb-5 pl-10 pr-4"><p className="max-w-2xl text-sm leading-6 text-[#68718a]">{category.description}</p><div className="mt-4 flex flex-wrap gap-2">{category.items.map((item) => <span key={item} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-[#0a1f44]">{item}</span>)}</div></div>}</div>; })}
      </div>
    </div>
  );
}

function ProgrammingLanguagesPanel() {
  const ProgrammingLanguagesIcon = programmingLanguages.icon;

  return (
    <div className="grid gap-10 lg:grid-cols-[0.68fr_1.32fr] lg:gap-14">
      <div><p className="text-[11px] font-black uppercase tracking-[0.2em] text-brand-secondary">Programming languages</p><p className="mt-6 max-w-md text-base leading-7 text-[#68718a]">The languages SAN TECH uses to build software, automate work, work with data, and connect technology to real environments.</p></div>
      <div className="border-y border-slate-300"><div className="flex items-center gap-4 border-b border-slate-200 py-4"><span className="grid size-8 shrink-0 place-items-center rounded-lg bg-[#d9eafa] text-brand-secondary"><ProgrammingLanguagesIcon className="size-4" strokeWidth={1.8} aria-hidden="true" /></span><span className="text-sm font-bold text-[#0a1f44]">{programmingLanguages.label}</span></div><div className="flex flex-wrap gap-2 py-5">{programmingLanguages.items.map((item) => <span key={item} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-[#0a1f44]">{item}</span>)}</div></div>
    </div>
  );
}

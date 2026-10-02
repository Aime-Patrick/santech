"use client";

import Link from "next/link";
import { ArrowUpRight, CalendarDays, MapPin } from "lucide-react";
import { useState } from "react";

const opportunityTabs = [
  { id: "featured", label: "Featured" },
  { id: "jobs", label: "Jobs" },
  { id: "tenders", label: "Tenders" },
  { id: "consultancy", label: "Consultancy" },
  { id: "internships", label: "Internships" },
  { id: "others", label: "Others" },
] as const;

type OpportunityTabId = (typeof opportunityTabs)[number]["id"];

const opportunities: Record<OpportunityTabId, { label: string; title: string; description: string; location: string; date: string; action: string; href: string }[]> = {
  featured: [{ label: "SAN HUB FELLOWSHIP", title: "SAN HUB Tech & AI Innovation Fellowship 2026", description: "A full scholarship and incubation pathway for African developers building high-impact AI and embedded systems.", location: "Kigali, Rwanda", date: "Open until Nov 30, 2026", action: "Explore pathway", href: "/join-the-community?path=innovation" }],
  jobs: [{ label: "CAREER OPPORTUNITY", title: "Build useful technology with SAN TECH", description: "Explore roles across software engineering, artificial intelligence, cybersecurity, product delivery, and operations.", location: "Rwanda · Hybrid", date: "See open positions", action: "Talk about careers", href: "/connect?topic=talk" }],
  tenders: [{ label: "TENDER", title: "Technology delivery and systems integration opportunities", description: "Find procurement opportunities for practical digital systems, infrastructure, integration, and support services.", location: "East Africa", date: "View active tenders", action: "Discuss a tender", href: "/connect?topic=partnership" }],
  consultancy: [{ label: "CONSULTANCY", title: "Digital transformation and implementation support", description: "Partner with SAN TECH on research, design, engineering, implementation, and technology capacity building.", location: "Remote · Africa", date: "Expressions of interest", action: "Start a conversation", href: "/connect?topic=partnership" }],
  internships: [{ label: "INTERNSHIP", title: "Learn inside real technology projects", description: "Build practical experience through guided work, mentorship, and contribution to live delivery teams.", location: "Kigali, Rwanda", date: "Applications by cohort", action: "Apply for internship", href: "/join-the-community?path=internship" }],
  others: [{ label: "ECOSYSTEM OPPORTUNITY", title: "Discover events, grants, and community calls", description: "Find opportunities to learn, contribute, collaborate, and connect across the SAN TECH ecosystem.", location: "Africa and beyond", date: "Explore opportunities", action: "Talk with us", href: "/connect?topic=talk" }],
};

export function TechPulseOpportunities() {
  const [activeTab, setActiveTab] = useState<OpportunityTabId>("featured");
  const activeOpportunities = opportunities[activeTab];

  return (
    <div className="w-full">
      <div role="tablist" aria-label="Opportunity categories" className="flex w-full min-w-max overflow-x-auto rounded-xl bg-[#f7fafc] p-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {opportunityTabs.map((tab) => {
          const active = tab.id === activeTab;
          return <button key={tab.id} type="button" role="tab" aria-selected={active} onClick={() => setActiveTab(tab.id)} className={`inline-flex min-h-9 shrink-0 items-center rounded-full px-3 text-[13px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan focus-visible:ring-offset-2 sm:px-4 ${active ? "bg-white text-[#0a1f44] shadow-sm" : "text-slate-600 hover:bg-white/70 hover:text-[#0a1f44]"}`}>{tab.label}</button>;
        })}
      </div>

      <div className="mt-5" role="tabpanel" aria-label={`${activeTab} opportunities`}>
        <div className="grid gap-4 lg:grid-cols-2">
          {activeOpportunities.map((opportunity) => <article key={opportunity.title} className="relative rounded-2xl border border-slate-200 border-l-4 border-l-[#0a1f44]/35 bg-[#fbfcfe] p-5 shadow-[0_8px_24px_rgba(10,31,68,0.05)]"><span className="absolute -left-[5px] top-4 size-2 rounded-full bg-brand-cyan ring-4 ring-white" aria-hidden="true" /><p className="text-[10px] font-black uppercase tracking-[0.16em] text-brand-secondary">{opportunity.label}</p><h2 className="font-exo mt-2 max-w-xl text-xl font-bold leading-tight tracking-[-0.035em] text-[#0a1f44] sm:text-[1.4rem]">{opportunity.title}</h2><p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">{opportunity.description}</p><div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs text-slate-500"><span className="inline-flex items-center gap-2"><MapPin className="size-3.5 text-brand-cyan" aria-hidden="true" />{opportunity.location}</span><span className="inline-flex items-center gap-2"><CalendarDays className="size-3.5 text-brand-cyan" aria-hidden="true" />{opportunity.date}</span></div><Link href={opportunity.href} className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#0a1f44] px-3 py-2 text-xs font-bold text-white transition-[background-color,transform] hover:-translate-y-0.5 hover:bg-brand-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary focus-visible:ring-offset-2">{opportunity.action} <ArrowUpRight className="size-3.5" aria-hidden="true" /></Link></article>)}
        </div>
      </div>
    </div>
  );
}

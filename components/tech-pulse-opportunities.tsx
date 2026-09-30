"use client";

import { ArrowUpRight, CalendarDays, MapPin } from "lucide-react";
import { useState } from "react";

const opportunityTabs = [
  { id: "featured", label: "Featured", count: 168 },
  { id: "jobs", label: "Jobs", count: 86 },
  { id: "tenders", label: "Tenders", count: 57 },
  { id: "consultancy", label: "Consultancy", count: 17 },
  { id: "internships", label: "Internships", count: 2 },
  { id: "others", label: "Others", count: 6 },
] as const;

type OpportunityTabId = (typeof opportunityTabs)[number]["id"];

const opportunities: Record<OpportunityTabId, { label: string; title: string; description: string; location: string; date: string }[]> = {
  featured: [
    {
      label: "SAN HUB FELLOWSHIP",
      title: "SAN HUB Tech & AI Innovation Fellowship 2026",
      description: "A full scholarship and incubation pathway for African developers building high-impact AI and embedded systems.",
      location: "Kigali, Rwanda",
      date: "Open until Nov 30, 2026",
    },
  ],
  jobs: [
    {
      label: "CAREER OPPORTUNITY",
      title: "Build useful technology with SAN TECH",
      description: "Explore roles across software engineering, artificial intelligence, cybersecurity, product delivery, and operations.",
      location: "Rwanda · Hybrid",
      date: "See open positions",
    },
  ],
  tenders: [
    {
      label: "TENDER",
      title: "Technology delivery and systems integration opportunities",
      description: "Find procurement opportunities for practical digital systems, infrastructure, integration, and support services.",
      location: "East Africa",
      date: "View active tenders",
    },
  ],
  consultancy: [
    {
      label: "CONSULTANCY",
      title: "Digital transformation and implementation support",
      description: "Partner with SAN TECH on research, design, engineering, implementation, and technology capacity building.",
      location: "Remote · Africa",
      date: "Expressions of interest",
    },
  ],
  internships: [
    {
      label: "INTERNSHIP",
      title: "Learn inside real technology projects",
      description: "Build practical experience through guided work, mentorship, and contribution to live delivery teams.",
      location: "Kigali, Rwanda",
      date: "Applications by cohort",
    },
  ],
  others: [
    {
      label: "ECOSYSTEM OPPORTUNITY",
      title: "Discover events, grants, and community calls",
      description: "Find opportunities to learn, contribute, collaborate, and connect across the SAN TECH ecosystem.",
      location: "Africa and beyond",
      date: "Explore opportunities",
    },
  ],
};

export function TechPulseOpportunities() {
  const [activeTab, setActiveTab] = useState<OpportunityTabId>("featured");
  const activeOpportunities = opportunities[activeTab];

  return (
    <div className="w-full">
      <div role="tablist" aria-label="Opportunity categories" className="flex w-full min-w-max overflow-x-auto border-b-2 border-brand-cyan [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {opportunityTabs.map((tab) => {
          const active = tab.id === activeTab;

          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setActiveTab(tab.id)}
              className={`-mb-0.5 inline-flex min-h-10 shrink-0 items-center gap-2 px-3 text-[13px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan focus-visible:ring-offset-2 sm:px-4 ${active ? "border-b-2 border-brand-cyan text-[#0a1f44]" : "text-slate-600 hover:text-[#0a1f44]"}`}
            >
              {tab.label}
              <span className="inline-flex min-w-7 items-center justify-center rounded-full bg-[#202831] px-1.5 py-0.5 text-xs font-bold text-white">{tab.count}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-5" role="tabpanel" aria-label={`${activeTab} opportunities`}>
        <div className="grid gap-4 lg:grid-cols-2">
          {activeOpportunities.map((opportunity) => (
            <article key={opportunity.title} className="rounded-xl border border-slate-200 bg-white p-4 shadow-[0_12px_30px_rgba(10,31,68,0.05)] sm:p-5">
              <p className="text-[9px] font-black uppercase tracking-[0.18em] text-brand-cyan">{opportunity.label}</p>
              <h2 className="font-exo mt-2 max-w-xl text-xl font-bold leading-tight tracking-[-0.035em] text-[#0a1f44] sm:text-[1.4rem]">{opportunity.title}</h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">{opportunity.description}</p>
              <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs text-slate-500">
                <span className="inline-flex items-center gap-2"><MapPin className="size-3.5 text-brand-cyan" aria-hidden="true" />{opportunity.location}</span>
                <span className="inline-flex items-center gap-2"><CalendarDays className="size-3.5 text-brand-cyan" aria-hidden="true" />{opportunity.date}</span>
              </div>
              <button type="button" className="mt-5 inline-flex items-center gap-2 text-xs font-bold text-[#0a1f44] transition-colors hover:text-brand-cyan">
                View opportunity <ArrowUpRight className="size-3.5" aria-hidden="true" />
              </button>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

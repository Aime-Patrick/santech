"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";

type LeadershipView = "executive" | "team";

const executives = [
  { role: "CEO", title: "Chief Executive Officer", description: "Sets SAN TECH's direction, partnerships, and long-term technology strategy.", image: "/images/team.jpg" },
  { role: "OP", title: "Operations and Programs", description: "Turns strategy into coordinated delivery across products, programs, and people.", image: "/images/fieldwork.jpg" },
];

const teamMembers = [
  { name: "SAN TECH Software Team", position: "Software Engineering Team", department: "Software Engineering", expertise: "Full-stack systems, APIs, product delivery", bio: "Builders turning practical requirements into reliable digital systems.", image: "/images/team.jpg", profile: "https://www.linkedin.com/company/santechinnovate" },
  { name: "SAN TECH Product Team", position: "Product and Design Team", department: "Product and Design", expertise: "User research, service design, product thinking", bio: "People shaping useful experiences around real users and institutions.", image: "/images/fieldwork.jpg", profile: "https://www.linkedin.com/company/santechinnovate" },
  { name: "SAN TECH Innovation Team", position: "Innovation and Research Team", department: "Research & Development", expertise: "Research, prototyping, digital systems", bio: "Researchers and problem-solvers testing what can work next.", image: "/images/summit.jpg", profile: "https://www.linkedin.com/company/santechinnovate" },
  { name: "SAN TECH Programs Team", position: "Community and Programs Team", department: "Training & Capacity Building", expertise: "Mentorship, learning, ecosystem programs", bio: "Coordinators connecting learning, opportunity, and participation.", image: "/images/graduates.jpg", profile: "https://www.linkedin.com/company/santechinnovate" },
];

function TeamProfileCard({ member }: { member: (typeof teamMembers)[number] }) {
  return (
    <article className="min-w-0 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_16px_36px_rgba(10,31,68,0.08)]">
      <div className="relative h-44 overflow-hidden bg-[#dceaf8] sm:h-48">
        <Image src={member.image} alt={`${member.position} at SAN TECH`} fill sizes="(max-width: 640px) 100vw, 28vw" className="object-cover" />
        <span className="absolute left-2.5 top-2.5 rounded-full bg-white/90 px-2 py-1 text-[8px] font-black uppercase tracking-[0.1em] text-[#0a1f44] shadow-sm">SAN TECH team</span>
      </div>
      <div className="space-y-2.5 p-3.5">
        <div>
          <p className="text-[8px] font-black uppercase tracking-[0.14em] text-brand-secondary">{member.department}</p>
          <h3 className="font-exo mt-1 text-sm font-bold leading-tight tracking-[-0.025em] text-[#0a1f44]">{member.name}</h3>
          <p className="mt-1 text-[11px] font-semibold leading-4 text-[#68718a]">{member.position}</p>
        </div>
        <div className="border-t border-slate-200 pt-2.5 text-[11px] leading-4 text-[#68718a]">
          <p><span className="font-black uppercase tracking-[0.1em] text-slate-400">Expertise</span><br />{member.expertise}</p>
        </div>
        <a href={member.profile} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-[11px] font-bold text-brand-secondary transition-colors hover:text-[#0a1f44]">Professional profile <ArrowUpRight className="size-3" /></a>
      </div>
    </article>
  );
}

export function LeadershipBrowser({ initialView = "executive" }: { initialView?: LeadershipView }) {
  const [view, setView] = useState<LeadershipView>(initialView);
  const [teamIndex, setTeamIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const visibleMembers = [teamMembers[teamIndex], teamMembers[(teamIndex + 1) % teamMembers.length]];

  function moveTeam(direction: 1 | -1) {
    setTeamIndex((current) => (current + direction + teamMembers.length) % teamMembers.length);
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[0.58fr_1.42fr] lg:items-stretch lg:gap-10">
      <div className="flex min-w-0 flex-col">
        <div className="border-l border-slate-300 pl-4" role="tablist" aria-label="Leadership sections">
          {([["executive", "Executive direction"], ["team", "Our team"]] as const).map(([key, label]) => (
            <button key={key} type="button" role="tab" aria-selected={view === key} onClick={() => setView(key)} className={`relative flex w-full items-center py-2.5 text-left text-xs font-black uppercase tracking-[0.1em] transition-colors ${view === key ? "text-[#0a1f44]" : "text-slate-500 hover:text-[#0a1f44]"}`}>
              <span>{label}</span>
              {view === key && <span className="absolute -left-[17px] top-0 h-full w-0.5 bg-brand-secondary" />}
            </button>
          ))}
        </div>
      </div>

      <div className="min-w-0">
        <AnimatePresence mode="wait">
          {view === "executive" ? (
            <motion.section key="executive-panel" role="tabpanel" initial={prefersReducedMotion ? false : { opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={prefersReducedMotion ? undefined : { opacity: 0, x: -8 }} transition={{ duration: prefersReducedMotion ? 0.01 : 0.25 }} className="grid gap-4 sm:grid-cols-2">
              {executives.map((executive) => (
                <article key={executive.role} className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_16px_36px_rgba(10,31,68,0.08)]">
                  <div className="relative h-36 overflow-hidden bg-[#dceaf8] sm:h-40">
                    <Image src={executive.image} alt={`${executive.title} at SAN TECH`} fill sizes="(max-width: 640px) 100vw, 28vw" className="object-cover" />
                    <span className="absolute left-2.5 top-2.5 rounded-full bg-white/90 px-2 py-1 text-[8px] font-black uppercase tracking-[0.1em] text-[#0a1f44] shadow-sm">SAN TECH direction</span>
                  </div>
                  <div className="p-3.5 sm:p-4">
                    <p className="text-[8px] font-black uppercase tracking-[0.14em] text-brand-secondary">{executive.role}</p>
                    <h3 className="font-exo mt-1.5 text-base font-bold leading-tight tracking-[-0.025em] text-[#0a1f44]">{executive.title}</h3>
                    <p className="mt-2 text-xs leading-5 text-[#68718a]">{executive.description}</p>
                  </div>
                </article>
              ))}
            </motion.section>
          ) : (
            <motion.section key="team-panel" role="tabpanel" initial={prefersReducedMotion ? false : { opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={prefersReducedMotion ? undefined : { opacity: 0, x: -8 }} transition={{ duration: prefersReducedMotion ? 0.01 : 0.25 }}>
              <AnimatePresence mode="wait">
                <motion.div key={teamIndex} className="grid gap-4 sm:grid-cols-2" initial={prefersReducedMotion ? false : { opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={prefersReducedMotion ? undefined : { opacity: 0, x: -12 }} transition={{ duration: prefersReducedMotion ? 0.01 : 0.25 }}>
                  {visibleMembers.map((member) => <TeamProfileCard key={member.name} member={member} />)}
                </motion.div>
              </AnimatePresence>
              <div className="mt-4 flex justify-end">
                <div className="flex items-center gap-1 rounded-full border border-slate-200 bg-white p-1 text-[#0a1f44]">
                  <button type="button" onClick={() => moveTeam(-1)} className="grid size-8 place-items-center rounded-full transition-colors hover:bg-[#0a1f44] hover:text-white" aria-label="Previous team"><ArrowLeft className="size-3.5" /></button>
                  <button type="button" onClick={() => moveTeam(1)} className="grid size-8 place-items-center rounded-full transition-colors hover:bg-[#0a1f44] hover:text-white" aria-label="Next team"><ArrowRight className="size-3.5" /></button>
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

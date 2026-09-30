"use client";

import Image from "next/image";
import { FaLinkedinIn } from "react-icons/fa6";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

type LeadershipView = "executive" | "team";

const executives = [
  { name: "Shema Pacifique", role: "Founder & CEO", title: "Founder & Chief Executive Officer", image: "/images/CEO.jpeg", profile: "https://www.linkedin.com/company/santechinnovate" },
  { name: "Claudine Niyonzima", role: "Co-founder & COO/CFO", title: "Co-founder & Chief Operating / Financial Officer", image: "/images/Niyonzima_Claudine-removebg.png", profile: "https://www.linkedin.com/company/santechinnovate" },
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
      <div className="relative h-96 overflow-hidden bg-[#dceaf8] sm:h-96">
        <Image src={member.image} alt={`${member.position} at SAN TECH`} fill sizes="(max-width: 640px) 100vw, 28vw" className="object-cover" />
      </div>
      <div className="flex items-end justify-between gap-4 p-3.5 sm:p-4">
        <div>
          <p className="text-[11px] font-black uppercase tracking-[0.14em] text-brand-secondary sm:text-xs">{member.name}</p>
          <h3 className="font-exo mt-1 text-sm font-bold leading-tight tracking-[-0.025em] text-[#0a1f44]">{member.position}</h3>
        </div>
        <a href={member.profile} target="_blank" rel="noreferrer" aria-label={`Open LinkedIn profile for ${member.name}`} className="grid size-8 shrink-0 place-items-center rounded-full border border-slate-200 text-[#0a1f44] transition-colors hover:border-brand-secondary hover:bg-brand-secondary hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary focus-visible:ring-offset-2">
          <FaLinkedinIn className="size-3.5" aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}

export function LeadershipBrowser({ initialView = "executive" }: { initialView?: LeadershipView }) {
  const [view, setView] = useState<LeadershipView>(initialView);
  const [teamIndex, setTeamIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const visibleMembers = [teamMembers[teamIndex], teamMembers[(teamIndex + 1) % teamMembers.length]];

  useEffect(() => {
    if (view !== "team" || prefersReducedMotion) return;

    const timer = window.setInterval(() => {
      setTeamIndex((current) => (current + 1) % teamMembers.length);
    }, 4800);

    return () => window.clearInterval(timer);
  }, [prefersReducedMotion, view]);

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
                  <div className="relative h-96 overflow-hidden bg-[#dceaf8] sm:h-96">
                    <Image src={executive.image} alt={`${executive.title} at SAN TECH`} fill sizes="(max-width: 640px) 100vw, 28vw" className={executive.name === "Claudine Niyonzima" ? "object-contain object-bottom" : "object-cover"} />
                  </div>
                  <div className="flex items-end justify-between gap-4 p-3.5 sm:p-4">
                    <div>
                      <p className="text-[11px] font-black uppercase tracking-[0.14em] text-brand-secondary sm:text-xs">{executive.name ?? executive.role}</p>
                      <h3 className="font-exo mt-1.5 text-base font-bold leading-tight tracking-[-0.025em] text-[#0a1f44]">{executive.title}</h3>
                    </div>
                    <a href={executive.profile} target="_blank" rel="noreferrer" aria-label={`Open LinkedIn profile for ${executive.title}`} className="grid size-8 shrink-0 place-items-center rounded-full border border-slate-200 text-[#0a1f44] transition-colors hover:border-brand-secondary hover:bg-brand-secondary hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary focus-visible:ring-offset-2">
                      <FaLinkedinIn className="size-3.5" aria-hidden="true" />
                    </a>
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
            </motion.section>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

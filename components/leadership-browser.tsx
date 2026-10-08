"use client";

import Image from "next/image";
import { FaLinkedinIn } from "react-icons/fa6";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { OrganizationChart } from "@/components/organization-chart";

type LeadershipView = "executive" | "team" | "organization";

const executives = [
  { name: "Shema Pacifique", role: "Founder & CEO", title: "Founder & Chief Executive Officer", image: "/images/ceo.png", profile: "https://www.linkedin.com/in/shema-pacifique-6b9321164/" },
  { name: "Claudine Niyonzima", role: "Co-founder & COO/CFO", title: "Co-founder & Chief Operating / Financial Officer", image: "/images/claudine.png", profile: "https://www.linkedin.com/in/claudine-niyonzima-3584a6240/" },
];

const teamMembers = [
  { name: "Felix", position: "Software developer", department: "Software Engineering", expertise: "Software development", bio: "Building practical digital products and reliable systems at SAN TECH.", image: "/images/felix  santech.png", profile: "https://www.linkedin.com/company/santechinnovate" },
  { name: "Placide", position: "Software developer", department: "Software Engineering", expertise: "Software development", bio: "Building practical digital products and reliable systems at SAN TECH.", image: "/images/placide.png", profile: "https://www.linkedin.com/in/ikundabayo-placide-b63b07284/" },
  { name: "Aime Patrick", position: "Software developer", department: "Software Engineering", expertise: "Software development", bio: "Builders turning practical requirements into reliable digital systems at SAN TECH.", image: "/images/patrick.png", profile: "https://www.linkedin.com/company/santechinnovate" },
  { name: "KAMI", position: "IOT & Hardware", department: "IOT & Hardware", expertise: "IOT & Hardware", bio: "Builders turning practical requirements into reliable digital systems.", image: "/images/kami.png", profile: "https://www.linkedin.com/in/kami-pierre" },
  { name: "Ndayishimiye G. Bonheur", position: "Software developer", department: "Software Engineering", expertise: "Full-stack systems, APIs, product delivery", bio: "Builders turning practical requirements into reliable digital systems.", image: "/images/bobo1.png", profile: "https://www.linkedin.com/company/santechinnovate" },
  { name: "Chris Umurerwa", position: "Sales & Marketing Lead", department: "Sales & Marketing", expertise: "Sales & Marketing", bio: "Driving growth through   strategic market engagement and client partnerships.", image: "/images/umurerwa.png", profile: "https://www.linkedin.com/in/umurerwa-christine-238125288/" },
  { name: "CYUSA Saleh", position: "Sales & Marketing Lead", department: "Sales & Marketing", expertise: "Sales & Marketing", bio: "Driving growth through   strategic market engagement and client partnerships.", image: "/images/saleh.jpeg", profile: "https://www.linkedin.com/company/santechinnovate" },
  { name: "Emmanuel", position: "IOT & Hardware Lead", department: "IOT & Hardware", expertise: "IOT & Hardware", bio: "Driving growth through   strategic market engagement and client partnerships.", image: "/images/_SIM0884.png", profile: "https://www.linkedin.com/in/emmy6" },
  { name: "Hertilan", position: "Software Developer", department: "Software Engineering", expertise: "Software development", bio: "Building practical digital products and reliable systems at SAN TECH.", image: "/images/Hertilan.jpg", profile: "https://www.linkedin.com/company/santechinnovate" },
  { name: "Yves", position: "Software Developer", department: "Software Engineering", expertise: "Software development", bio: "Building practical digital products and reliable systems at SAN TECH.", image: "/images/yves.png", profile: "https://www.linkedin.com/company/santechinnovate" },
];

function TeamProfileCard({ member }: { member: (typeof teamMembers)[number] }) {
  return (
    <article className="relative min-w-0">
      <div className="relative h-80 overflow-hidden bg-[#2d79c7] sm:h-[360px]">
        
      <Image src={member.image} alt={`${member.position} at SAN TECH`} fill sizes="(max-width: 620px) 100vw, 28vw" className="object-cover object-top" />
      </div>
      <div className="absolute inset-x-3 bottom-3 flex items-end justify-between gap-4 bg-white/95 p-3.5 backdrop-blur-sm sm:p-4">
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

export function LeadershipBrowser({ initialView = "executive", members = teamMembers }: { initialView?: LeadershipView; members?: typeof teamMembers }) {
  const [view, setView] = useState<LeadershipView>(initialView);
  const [teamIndex, setTeamIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const visibleMembers = [members[teamIndex], members[(teamIndex + 1) % members.length]];

  useEffect(() => {
    if (view !== "team" || prefersReducedMotion) return;

    const timer = window.setInterval(() => {
      setTeamIndex((current) => (current + 1) % members.length);
    }, 4800);

    return () => window.clearInterval(timer);
  }, [prefersReducedMotion, view]);

  return (
    <div className="grid gap-8 lg:grid-cols-[240px_minmax(0,1fr)] lg:items-stretch lg:gap-4">
      <div className="flex min-w-0 flex-col">
        <div className="border-l border-slate-300 pl-4" role="tablist" aria-label="Leadership sections">
          {([["executive", "Executive direction"], ["team", "Our team"], ["organization", "Organization"]] as const).map(([key, label]) => (
            <button key={key} type="button" role="tab" aria-selected={view === key} onClick={() => setView(key)} className={`relative flex w-full items-center py-2.5 text-left text-xs font-black uppercase tracking-[0.1em] transition-colors ${view === key ? "text-[#0a1f44]" : "text-slate-500 hover:text-[#0a1f44]"}`}>
              <span>{label}</span>
              {view === key && <span className="absolute -left-[17px] top-0 h-full w-0.5 bg-brand-secondary" />}
            </button>
          ))}
        </div>
      </div>

      <div className="min-w-0 lg:w-full">
        <AnimatePresence mode="wait">
          {view === "executive" ? (
            <motion.section key="executive-panel" role="tabpanel" initial={prefersReducedMotion ? false : { opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={prefersReducedMotion ? undefined : { opacity: 0, x: -8 }} transition={{ duration: prefersReducedMotion ? 0.01 : 0.25 }} className="grid gap-4 sm:grid-cols-2">
              {executives.map((executive) => (
                  <article key={executive.role} className="relative min-w-0">
                    <div className={`relative h-80 overflow-hidden sm:h-[360px] bg-[#2d79c7]`}>
                      <Image src={executive.image} alt={`${executive.title} at SAN TECH`} fill sizes="(max-width: 640px) 100vw, 28vw" className="object-contain object-center" />
                    </div>
                  <div className="absolute inset-x-3 bottom-3 flex items-end justify-between gap-4 bg-white/95 p-3.5 backdrop-blur-sm sm:p-4">
                    <div>
                      <p className="text-[11px] font-black uppercase tracking-[0.14em] text-brand-secondary sm:text-xs">{executive.name ?? executive.role}</p>
                      <h3 className="font-exo mt-1.5 text-sm font-bold leading-tight tracking-[-0.025em] text-[#0a1f44]">{executive.title}</h3>
                    </div>
                    <a href={executive.profile} target="_blank" rel="noreferrer" aria-label={`Open LinkedIn profile for ${executive.title}`} className="grid size-8 shrink-0 place-items-center rounded-full border border-slate-200 text-[#0a1f44] transition-colors hover:border-brand-secondary hover:bg-brand-secondary hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary focus-visible:ring-offset-2">
                      <FaLinkedinIn className="size-3.5" aria-hidden="true" />
                    </a>
                  </div>
                </article>
              ))}
            </motion.section>
          ) : view === "team" ? (
            <motion.section key="team-panel" role="tabpanel" initial={prefersReducedMotion ? false : { opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={prefersReducedMotion ? undefined : { opacity: 0, x: -8 }} transition={{ duration: prefersReducedMotion ? 0.01 : 0.25 }}>
              <AnimatePresence mode="wait">
                <motion.div key={teamIndex} className="grid gap-4 sm:grid-cols-2" initial={prefersReducedMotion ? false : { opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={prefersReducedMotion ? undefined : { opacity: 0, x: -12 }} transition={{ duration: prefersReducedMotion ? 0.01 : 0.25 }}>
                  {visibleMembers.map((member) => <TeamProfileCard key={member.name} member={member} />)}
                </motion.div>
              </AnimatePresence>
              <div className="mt-4 flex items-center justify-end gap-2">
                <button type="button" onClick={() => setTeamIndex((current) => (current - 1 + members.length) % members.length)} aria-label="Previous team members" className="grid size-9 place-items-center rounded-full border border-slate-200 bg-white text-[#0a1f44] transition-colors hover:border-brand-secondary hover:bg-[#eef7fb] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary">
                  <ChevronLeft className="size-4" aria-hidden="true" />
                </button>
                <button type="button" onClick={() => setTeamIndex((current) => (current + 1) % members.length)} aria-label="Next team members" className="grid size-9 place-items-center rounded-full border border-slate-200 bg-white text-[#0a1f44] transition-colors hover:border-brand-secondary hover:bg-[#eef7fb] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary">
                  <ChevronRight className="size-4" aria-hidden="true" />
                </button>
              </div>
            </motion.section>
          ) : (
            <motion.section key="organization-panel" role="tabpanel" initial={prefersReducedMotion ? false : { opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={prefersReducedMotion ? undefined : { opacity: 0, x: -8 }} transition={{ duration: prefersReducedMotion ? 0.01 : 0.25 }}>
              <OrganizationChart />
            </motion.section>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

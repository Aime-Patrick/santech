"use client";

import Link from "next/link";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";

const identity = [
  ["Founded", "1 August 2019"],
  ["Founder & CEO", "Mr. Shema Pacifique"],
  ["Co-founder & COO/CFO", "Claudine Niyonzima"],
  ["Head office", "Kigali, Rwanda"],
  ["Registration no.", "109014654"],
  ["Core philosophy", "From Ideation to Transformative Impact"],
  ["Stamp motto", "Innovate · Empower · Deliver"],
  ["Certificate footer", "Making Your Ideas Happen"],
] as const;

const values = [
  { label: "Innovation", description: "We transform ideas, challenges, and opportunities into practical technological solutions." },
  { label: "Excellence", description: "We pursue high standards in technology, service delivery, engineering, and customer experience." },
  { label: "Integrity", description: "We operate with honesty, transparency, accountability, confidentiality, and professional ethics." },
  { label: "Customer Centricity", description: "We understand our clients and end users and design solutions around their real needs." },
  { label: "Impact", description: "We measure success by the positive economic, institutional, social, and technological results our work creates." },
  { label: "Collaboration", description: "We work with clients, government, academia, innovators, communities, and technology partners to achieve shared objectives." },
  { label: "Continuous Learning", description: "We continuously develop our people, adopt emerging technologies, conduct research, and improve our solutions." },
  { label: "Ownership", description: "We believe our engineers and innovators can design, develop, own, and scale world-class technology for African challenges and global markets." },
  { label: "Security & Responsibility", description: "We build technology with cybersecurity, privacy, reliability, safety, and responsible technology use at its foundation." },
  { label: "Empowerment", description: "Through SAN HUB and other initiatives, we equip young people, professionals, entrepreneurs, and organizations with knowledge and opportunities to create value." },
] as const;

const focusAreas = [
  ["Software", "Builds customized digital systems and applications"],
  ["AI", "Develops intelligent automation and data-driven solutions"],
  ["Cybersecurity", "Helps organizations secure systems, networks and data"],
  ["IoT", "Connects physical devices, sensors and software"],
  ["Embedded technology", "Develops hardware/software integrated solutions"],
  ["Digital transformation", "Converts manual processes into digital workflows"],
  ["Systems integration", "Connects different technologies and organizational systems"],
  ["Innovation", "Converts ideas and prototypes into usable products"],
  ["Training", "Develops technology skills through SAN HUB"],
  ["Research & development", "Experiments with emerging technologies and new products"],
  ["Consultancy", "Provides technical and digital transformation guidance"],
  ["Product deployment", "Installs, integrates, trains users and supports solutions"],
] as const;

const journeyStages = [
  ["2018", "Idea", "Founders identify problems with manual visitor management"],
  ["2019", "Inception", "SAN TECH founded; E-Visitors prototype and IP journey begins"],
  ["2019", "Validation", "E-Visitors recognized through NIRDA Innovate for Industry"],
  ["2020", "Testing", "Prototype moves toward real users and institutional applications"],
  ["2021", "Institutionalization", "Technology supports institutional resilience and digital processes"],
  ["2022", "Ecosystem", "Recognition and emergence of SAN HUB"],
  ["2023", "Market Validation", "SAN HUB officially launched; E-Visitors adopted by National Bank of Rwanda (BNR)"],
  ["2024", "Partnerships", "International partnerships and innovators from multiple countries"],
  ["2025", "Scaling", "SAN HUB expands; international and continental ambitions grow"],
  ["2026", "African Tech Vision", "SAN TECH expands its technology, training, innovation, and systems-integration ecosystem"],
] as const;

const recognitionItems = [
  ["2026", "Best Exhibitor in ICT & Innovation", "SAN TECH was recognized as Best Exhibitor in ICT and Innovation at the 29th Rwanda International Trade Fair (Expo 2026), among 494 participating companies."],
  ["2019", "Innovate for Industry Hackathon Winner", "SAN TECH’s E-Visitors project emerged as one of the winners of the Innovate for Industry Hackathon organized by the National Industrial Research and Development Agency (NIRDA). NIRDA subsequently supported the product through incubation and product improvement."],
  ["", "AMI Resilience Prize", "The E-Visitors project received recognition through the AMI Resilience Prize, associated with AMI Rwanda and the Youth Challenge Programme."],
  ["2022", "Generation Unlimited / UNICEF Recognition", "SAN TECH reports recognition through Generation Unlimited and UNICEF, including the Best Performing Entrepreneurs Award in 2022."],
  ["2024", "Bridge International / TBI Global Impact Recognition", "SAN TECH reports receiving recognition from The Bridge International (TBI) for its global and sustainable impact in 2024."],
  ["", "E-Visitors Intellectual Property", "SAN TECH secured intellectual-property rights for its E-Visitors innovation, with the company’s innovation journey beginning around the development and registration of the E-Visitors prototype."],
  ["", "Cybersecurity / Technical Verification", "SAN TECH’s company profile states that E-Visitors was verified and approved by the relevant cybersecurity institution, identified in the profile as the National Cyber Security Authority (NCSA)."],
  ["2025", "Digital Bridge Institute – EdTech Recognition", "A 2025 sustainability and impact profile reports that SAN TECH received an EdTech Seal from the Digital Bridge Institute."],
  ["2025", "Rwanda National Cyber Security Authority – Data Protection/Data Controller Certification", "The same 2025 profile reports SAN TECH’s Data Protection and Data Controller certification from the Rwanda National Cyber Security Authority."],
  ["2021", "National Recognition for COVID-19 Recovery Capacity", "SAN TECH’s published achievements timeline records national recognition in 2021 for supporting institutional COVID-19 recovery and resilience through technology."],
  ["2023", "Central Bank of Rwanda (BNR) – E-Visitors Institutional Adoption", "In 2023, SAN TECH recorded a major industry-validation milestone when its E-Visitors System was adopted by the National Bank of Rwanda (BNR)."],
  ["", "International Partnership & Innovation Recognition", "SAN TECH reports partnerships with institutions including DAESSA and PERPEDINE Universities, while its SAN HUB attracted innovators from multiple countries."],
] as const;

export function IdentityPanel() {
  return (
    <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:gap-14">
      <div>
        <p className="text-[11px] font-black uppercase tracking-[0.2em] text-brand-secondary">Who we are</p>
        <p className="mt-6 max-w-xl text-base leading-7 text-[#68718a]">SAN TECH is a technological company focused on digital transformation and innovation. We develop smart digital products and integrated technology solutions while building the human talent and innovation ecosystem needed to create and deploy them.</p>
        <p className="mt-5 max-w-xl text-base leading-7 text-[#68718a]">SAN TECH connects people, ideas and technology — helping organizations solve real problems while helping the next generation develop the skills and products needed to create new innovative solutions.</p>
      </div>
      <aside className="border-l border-slate-300 pl-6 lg:pl-10">
        <p className="text-[11px] font-black uppercase tracking-[0.2em] text-brand-secondary">Core identity</p>
        <div className="mt-6 grid gap-x-8 gap-y-6 sm:grid-cols-2">
          {identity.map(([label, value]) => <div key={label} className="border-t border-slate-200 pt-3"><p className="text-[10px] font-black uppercase tracking-[0.14em] text-[#7c879d]">{label}</p><p className="mt-2 text-sm font-bold leading-5 text-[#0a1f44]">{value}</p></div>)}
        </div>
      </aside>
    </div>
  );
}

export function MissionPanel() {
  const [expandedValue, setExpandedValue] = useState<string | null>(values[0].label);
  const prefersReducedMotion = useReducedMotion();
  return (
    <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
      <div>
        <div className="grid gap-6">
          <div><p className="text-[10px] font-black uppercase tracking-[0.18em] text-brand-secondary">Our mission</p><p className="mt-3 max-w-md text-base leading-7 text-[#68718a]">To create and deliver innovative, secure, affordable, and sustainable technology solutions while developing the people and ecosystems that make innovation happen.</p></div>
          <div className="border-t border-slate-300 pt-4"><p className="text-[10px] font-black uppercase tracking-[0.18em] text-brand-secondary">Our vision</p><p className="mt-3 max-w-md text-base leading-7 text-[#68718a]">To be a leading African technology and innovation hub transforming ideas into smart solutions that improve lives and drive economic growth.</p></div>
          <p className="max-w-md text-sm leading-6 text-[#68718a]">SAN TECH brings technology solutions, SAN HUB, innovation and research, and capacity building into one corporate direction — positioning the company around technological products, talent development, innovation, and contribution to economic development.</p>
        </div>
      </div>
      <div className="border-l border-slate-300 pl-6 lg:pl-10">
        <p className="text-[11px] font-black uppercase tracking-[0.2em] text-brand-secondary">Core values</p>
        <div className="mt-5" role="list" aria-label="SAN TECH core values">
          {values.map((value) => { const expanded = expandedValue === value.label; return <div key={value.label} className="border-b border-slate-200 last:border-b-0"><button type="button" onClick={() => setExpandedValue(expanded ? null : value.label)} aria-expanded={expanded} className="flex w-full items-center justify-between gap-5 py-4 text-left text-sm font-bold text-[#0a1f44] transition-colors hover:text-brand-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary focus-visible:ring-offset-2"><span>{value.label}</span><ChevronDown className={`size-4 shrink-0 text-brand-secondary transition-transform ${expanded ? "rotate-180" : ""}`} aria-hidden="true" /></button><AnimatePresence initial={false}>{expanded && <motion.div key={`${value.label}-description`} initial={prefersReducedMotion ? false : { height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={prefersReducedMotion ? undefined : { height: 0, opacity: 0 }} transition={{ duration: prefersReducedMotion ? 0.01 : 0.22, ease: "easeOut" }} className="overflow-hidden"><p className="-mt-1 pb-4 pr-8 text-sm leading-6 text-[#68718a]">{value.description}</p></motion.div>}</AnimatePresence></div>; })}
        </div>
      </div>
    </div>
  );
}

export function JourneyPanel() {
  return (
    <div className="grid gap-8 lg:grid-cols-[1.32fr_0.68fr] lg:gap-12">
      <div className="grid gap-3 sm:grid-cols-2">
        {journeyStages.map(([year, stage, description], index) => <article key={`${year}-${stage}`} className="border border-slate-200 bg-slate-50/60 px-4 py-3 transition-colors hover:border-[#b7cbe3] hover:bg-white"><div className="flex items-start justify-between gap-3"><h3 className="text-sm font-bold leading-5 text-[#0a1f44]">{year} — {stage}</h3><span className="text-[10px] font-black tracking-[0.16em] text-brand-secondary/45">{String(index + 1).padStart(2, "0")}</span></div><p className="mt-2 text-xs leading-5 text-[#68718a]">{description}</p></article>)}
      </div>
      <div className="flex flex-col justify-center border-l border-slate-300 pl-6 lg:pl-8"><p className="text-[11px] font-black uppercase tracking-[0.2em] text-brand-secondary">Our journey</p><h1 className="font-exo mt-4 max-w-md text-xl font-normal leading-[1.18] tracking-[-0.035em] text-[#303755] sm:text-2xl lg:text-[2rem]">SAN TECH Journey at a Glance</h1><p className="mt-6 max-w-md text-base leading-7 text-[#68718a]">A decade of turning practical problems into technology, capability, partnerships, and a growing African innovation ecosystem.</p><div className="mt-8 border-t border-slate-300 pt-4"><p className="text-[10px] font-black uppercase tracking-[0.16em] text-brand-secondary">2018 — 2026</p><p className="mt-2 text-sm font-bold leading-6 text-[#0a1f44]">From first idea to African technology vision.</p></div></div>
    </div>
  );
}

export function RecognitionPanel() {
  const [expandedRecognition, setExpandedRecognition] = useState<string | null>(recognitionItems[0][1]);
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="grid gap-3 sm:grid-cols-2" role="list" aria-label="SAN TECH recognitions and awards">
        {recognitionItems.map(([year, title, description]) => { const expanded = expandedRecognition === title; return <article key={title} className={`border border-slate-200 bg-slate-50/60 ${expanded ? "sm:col-span-2" : ""}`}><button type="button" onClick={() => setExpandedRecognition(expanded ? null : title)} aria-expanded={expanded} className="flex w-full items-start gap-3 px-4 py-3 text-left transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary focus-visible:ring-inset"><span className="w-10 shrink-0 text-[10px] font-black tracking-[0.12em] text-brand-secondary">{year || "—"}</span><span className="flex-1 text-sm font-bold leading-5 text-[#0a1f44]">{title}</span><ChevronDown className={`mt-0.5 size-4 shrink-0 text-brand-secondary transition-transform ${expanded ? "rotate-180" : ""}`} aria-hidden="true" /></button><AnimatePresence initial={false}>{expanded && <motion.div initial={prefersReducedMotion ? false : { height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={prefersReducedMotion ? undefined : { height: 0, opacity: 0 }} transition={{ duration: prefersReducedMotion ? 0.01 : 0.22, ease: "easeOut" }} className="overflow-hidden"><p className="border-t border-slate-200 px-4 pb-4 pt-3 text-sm leading-6 text-[#68718a]">{description}</p></motion.div>}</AnimatePresence></article>; })}
    </div>
  );
}

export function FocusPanel() {
  const [expandedArea, setExpandedArea] = useState<string>(focusAreas[0][0]);
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="grid gap-10 lg:grid-cols-[1.28fr_0.72fr] lg:gap-14">
      <div className="border-y border-slate-300">
        <div className="grid sm:grid-cols-2 sm:gap-x-8" role="list" aria-label="SAN TECH areas of focus">
          {focusAreas.map(([area, description], index) => {
            const expanded = expandedArea === area;
            return <div key={area} className={`border-b border-slate-200 last:border-b-0 ${expanded ? "sm:col-span-2" : ""}`}><button type="button" onClick={() => setExpandedArea(expanded ? "" : area)} aria-expanded={expanded} className="flex w-full items-center gap-3 py-3.5 text-left transition-colors hover:text-brand-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary focus-visible:ring-offset-2"><span className="w-5 shrink-0 text-[10px] font-black text-brand-secondary/55">{String(index + 1).padStart(2, "0")}</span><span className="flex-1 text-sm font-bold text-[#0a1f44]">{area}</span><ChevronDown className={`size-4 shrink-0 text-brand-secondary transition-transform ${expanded ? "rotate-180" : ""}`} aria-hidden="true" /></button><AnimatePresence initial={false}>{expanded && <motion.div key={`${area}-description`} initial={prefersReducedMotion ? false : { height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={prefersReducedMotion ? undefined : { height: 0, opacity: 0 }} transition={{ duration: prefersReducedMotion ? 0.01 : 0.22, ease: "easeOut" }} className="overflow-hidden"><p className="pb-4 pl-8 pr-4 text-sm leading-6 text-[#68718a]">{description}</p></motion.div>}</AnimatePresence></div>;
          })}
        </div>
      </div>
      <div className="flex flex-col justify-center border-l border-slate-300 pl-6 lg:pl-8"><p className="text-[11px] font-black uppercase tracking-[0.2em] text-brand-secondary">Our focus</p><p className="mt-6 max-w-md text-base leading-7 text-[#68718a]">From software and AI to training and deployment, SAN TECH brings the capabilities needed to move from a challenge or idea to a working solution.</p></div>
    </div>
  );
}

export function CompanyProfilePanel() {
  return (
    <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:gap-14">
      <div><p className="text-[11px] font-black uppercase tracking-[0.2em] text-brand-secondary">Company profile</p><h1 className="font-exo mt-4 max-w-xl text-xl font-normal leading-[1.18] tracking-[-0.035em] text-[#303755] sm:text-2xl lg:text-[2rem]">From ideation to transformative impact.</h1><p className="mt-6 max-w-xl text-base leading-7 text-[#68718a]">SAN TECH is a Kigali-based technology and innovation company that connects people, ideas, and technology to create digital products, strengthen organizations, and grow the next generation of builders.</p><Link href="/connect" className="mt-8 inline-flex items-center gap-2 rounded-lg bg-brand-secondary px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-cyan hover:text-brand-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary focus-visible:ring-offset-2">Start a conversation <ArrowUpRight className="size-4" /></Link></div>
      <div className="border-l border-slate-300 pl-6 lg:pl-10"><div className="border-y border-slate-300 py-5"><p className="text-[10px] font-black uppercase tracking-[0.18em] text-brand-secondary">Our model</p><p className="mt-3 max-w-2xl text-lg font-bold leading-7 text-[#0a1f44]">Connect people. Develop ideas. Deploy technology. Create impact.</p></div><div className="mt-6 grid gap-5 sm:grid-cols-2"><div><p className="text-[10px] font-black uppercase tracking-[0.15em] text-[#7c879d]">Established</p><p className="mt-2 text-sm font-bold text-[#0a1f44]">2019 · Kigali, Rwanda</p></div><div><p className="text-[10px] font-black uppercase tracking-[0.15em] text-[#7c879d]">Registration</p><p className="mt-2 text-sm font-bold text-[#0a1f44]">109014654</p></div><div><p className="text-[10px] font-black uppercase tracking-[0.15em] text-[#7c879d]">Motto</p><p className="mt-2 text-sm font-bold text-[#0a1f44]">Innovate · Empower · Deliver</p></div><div><p className="text-[10px] font-black uppercase tracking-[0.15em] text-[#7c879d]">Certificate footer</p><p className="mt-2 text-sm font-bold text-[#0a1f44]">Making Your Ideas Happen</p></div></div></div>
    </div>
  );
}

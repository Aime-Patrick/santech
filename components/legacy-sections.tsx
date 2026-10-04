"use client";

import Image from "next/image";
import { ArrowUpRight, BrainCircuit, ChevronDown, Code2, Compass, Cpu, Eye, FlaskConical, GraduationCap, Lightbulb, Network, Radio, Rocket, ShieldCheck, Target, Workflow, X, type LucideIcon } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

const identity = [
  ["Founded", "1 August 2019"],
  ["Founder & CEO", "Mr. Shema Pacifique"],
  ["Co-founder & COO/CFO", "Claudine Niyonzima"],
  ["Head office", "Kigali, Rwanda"],
  ["Core philosophy", "From Ideation to Transformative Impact"],
  ["Stamp motto", "Innovate · Empower · Deliver"],
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
  ["Software Engineering", "Builds customized digital systems, enterprise platforms, and secure web & mobile applications."],
  ["Artificial Intelligence", "Develops intelligent automation, machine learning models, and predictive data solutions."],
  ["Cybersecurity", "Protects institutional infrastructure, networks, systems, and compliance data."],
  ["IoT & Connected Devices", "Connects smart physical sensors, telemetry hardware, and central software."],
  ["Embedded Technology", "Engineers hardware/software integrated microcontroller solutions and firmware."],
  ["Digital Transformation", "Converts manual operations into streamlined, automated digital workflows."],
  ["Systems Integration", "Connects diverse technologies, APIs, and institutional organizational systems."],
  ["Innovation & Incubation", "Converts ideas and prototypes into tested, usable, market-ready products."],
  ["Training & Capacity", "Develops practical, job-ready technology and engineering skills through SAN HUB."],
  ["Research & Development", "Experiments with emerging technologies, prototype testing, and applied science."],
  ["Technology Consultancy", "Provides technical advisory, digital architecture, and transformation guidance."],
  ["Product Deployment", "Installs, integrates, trains users, and supports long-term operational systems."],
] as const;

const focusIcons: readonly LucideIcon[] = [
  Code2,
  BrainCircuit,
  ShieldCheck,
  Radio,
  Cpu,
  Workflow,
  Network,
  Lightbulb,
  GraduationCap,
  FlaskConical,
  Compass,
  Rocket,
];

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

const modelStages = [
  ["Challenge", "Start with a real operational problem."],
  ["Discover", "Study workflows, users, and constraints."],
  ["Design", "Shape a practical solution around the context."],
  ["Develop", "Build the software and hardware required."],
  ["Test", "Validate the solution with real users."],
  ["Deploy", "Integrate the technology into daily operations."],
  ["Train", "Build the human capability to use it well."],
  ["Support", "Keep the system reliable after launch."],
  ["Improve", "Measure results and keep making it better."],
] as const;

type RecognitionItem = {
  year: string;
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
  badge?: string;
};

const recognitionItems: readonly RecognitionItem[] = [
  {
    year: "2026",
    title: "Best Exhibitor in ICT & Innovation",
    description: "SAN TECH was recognized as Best Exhibitor in ICT and Innovation at the 29th Rwanda International Trade Fair (Expo 2026), emerging top among 494 participating companies for outstanding technological innovation and ecosystem delivery.",
    image: "/images/techforwardlive2026-photo-download-1of1/Highlights/CEPSTUDIO(172).jpg",
    imageAlt: "SAN TECH leadership and dignitaries holding the Best Exhibitor in ICT & Innovation trophy on stage",
    badge: "Expo 2026 Winner",
  },
  {
    year: "2026",
    title: "Tech Forward Live 2026 Summit",
    description: "SAN TECH convened Tech Forward Live 2026 under the theme 'From Ideation to Transformative Impact', bringing together youth innovators, government leaders, university partners, and industry experts to champion technology adoption, prototype incubation, and youth tech employment across Africa.",
    image: "/images/techforwardlive2026-photo-download-1of1/Highlights/CEPSTUDIO(80).jpg",
    imageAlt: "Tech Forward Live 2026 summit hall packed with delegates, partners, and innovators",
    badge: "Flagship Summit",
  },
  {
    year: "2019",
    title: "Innovate for Industry Hackathon Winner",
    description: "SAN TECH’s E-Visitors project emerged as one of the winners of the Innovate for Industry Hackathon organized by the National Industrial Research and Development Agency (NIRDA). NIRDA subsequently supported the product through incubation and product improvement.",
  },
  {
    year: "",
    title: "AMI Resilience Prize",
    description: "The E-Visitors project received recognition through the AMI Resilience Prize, associated with AMI Rwanda and the Youth Challenge Programme.",
  },
  {
    year: "2022",
    title: "Generation Unlimited / UNICEF Recognition",
    description: "SAN TECH reports recognition through Generation Unlimited and UNICEF, including the Best Performing Entrepreneurs Award in 2022.",
  },
  {
    year: "2024",
    title: "Bridge International / TBI Global Impact Recognition",
    description: "SAN TECH reports receiving recognition from The Bridge International (TBI) for its global and sustainable impact in 2024.",
  },
  {
    year: "",
    title: "E-Visitors Intellectual Property",
    description: "SAN TECH secured intellectual-property rights for its E-Visitors innovation, with the company’s innovation journey beginning around the development and registration of the E-Visitors prototype.",
  },
  {
    year: "",
    title: "Cybersecurity / Technical Verification",
    description: "SAN TECH’s company profile states that E-Visitors was verified and approved by the relevant cybersecurity institution, identified in the profile as the National Cyber Security Authority (NCSA).",
  },
  {
    year: "2025",
    title: "Digital Bridge Institute – EdTech Recognition",
    description: "A 2025 sustainability and impact profile reports that SAN TECH received an EdTech Seal from the Digital Bridge Institute.",
  },
  {
    year: "2025",
    title: "Rwanda National Cyber Security Authority – Data Protection/Data Controller Certification",
    description: "The same 2025 profile reports SAN TECH’s Data Protection and Data Controller certification from the Rwanda National Cyber Security Authority.",
    image: "/images/SAN TECH Data Processor Certificate_page-0001.jpg",
    imageAlt: "SAN TECH Data Processor Certificate issued by Rwanda's National Cyber Security Authority",
    badge: "Data Processor Certificate",
  },
  {
    year: "2021",
    title: "National Recognition for COVID-19 Recovery Capacity",
    description: "SAN TECH’s published achievements timeline records national recognition in 2021 for supporting institutional COVID-19 recovery and resilience through technology.",
  },
  {
    year: "2023",
    title: "Central Bank of Rwanda (BNR) – E-Visitors Institutional Adoption",
    description: "In 2023, SAN TECH recorded a major industry-validation milestone when its E-Visitors System was adopted by the National Bank of Rwanda (BNR).",
  },
  {
    year: "",
    title: "International Partnership & Innovation Recognition",
    description: "SAN TECH reports partnerships with institutions including DAESSA and PERPEDINE Universities, while its SAN HUB attracted innovators from multiple countries.",
  },
];

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
  const [selectedValue, setSelectedValue] = useState<string>(values[0].label);
  const prefersReducedMotion = useReducedMotion();
  const activeValue = values.find((value) => value.label === selectedValue) ?? values[0];

  return (
    <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
      <div className="relative">
        <div className="mb-5 flex items-center gap-3">
          <span className="grid size-8 place-items-center rounded-full bg-[#e8f1fc] text-[10px] font-black text-brand-secondary">01</span>
          <p className="text-[11px] font-black uppercase tracking-[0.2em] text-brand-secondary">Our direction</p>
        </div>
        <div className="relative grid gap-3 pl-5">
          <span className="absolute bottom-8 left-9 top-8 w-px bg-gradient-to-b from-brand-cyan via-brand-secondary to-[#0a1f44]" aria-hidden="true" />
          <article className="relative rounded-2xl border border-[#bdeaf3] bg-[#f2fcfe] p-5 shadow-[0_8px_22px_rgba(8,198,231,0.08)]">
            <div className="flex items-center gap-3">
              <span className="grid size-9 place-items-center rounded-xl bg-white text-brand-secondary shadow-sm"><Target className="size-5" aria-hidden="true" /></span>
              <div><p className="text-[10px] font-black uppercase tracking-[0.16em] text-brand-secondary">Mission</p><p className="text-xs font-bold text-[#0a1f44]">Build useful capability</p></div>
            </div>
            <p className="mt-4 text-sm leading-6 text-[#526989]">To create and deliver innovative, secure, affordable, and sustainable technology solutions while developing the people and ecosystems that make innovation happen.</p>
          </article>
          <article className="relative rounded-2xl border border-[#d4def0] bg-[#f8faff] p-5 shadow-[0_8px_22px_rgba(10,31,68,0.06)]">
            <div className="flex items-center gap-3">
              <span className="grid size-9 place-items-center rounded-xl bg-white text-[#0a1f44] shadow-sm"><Eye className="size-5" aria-hidden="true" /></span>
              <div><p className="text-[10px] font-black uppercase tracking-[0.16em] text-brand-secondary">Vision</p><p className="text-xs font-bold text-[#0a1f44]">Widen what is possible</p></div>
            </div>
            <p className="mt-4 text-sm leading-6 text-[#526989]">To be a leading African technology and innovation hub transforming ideas into smart solutions that improve lives and drive economic growth.</p>
          </article>
        </div>
      </div>
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_8px_24px_rgba(10,31,68,0.05)] sm:p-6">
        <div>
          <p className="text-[11px] font-black uppercase tracking-[0.2em] text-brand-secondary">Core values</p>
        </div>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={activeValue.label} initial={prefersReducedMotion ? false : { opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={prefersReducedMotion ? undefined : { opacity: 0, y: -6 }} transition={{ duration: prefersReducedMotion ? 0.01 : 0.2, ease: "easeOut" }} className="mt-4 rounded-xl border border-[#bdeaf3] bg-[#f2fcfe] p-4">
            <p className="text-[10px] font-black uppercase tracking-[0.16em] text-brand-secondary">{activeValue.label}</p>
            <p className="mt-2 text-sm leading-6 text-[#526989]">{activeValue.description}</p>
          </motion.div>
        </AnimatePresence>
        <div className="mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-3" role="list" aria-label="SAN TECH core values">
          {values.map((value) => { const selected = selectedValue === value.label; return <button key={value.label} type="button" onClick={() => setSelectedValue(value.label)} aria-pressed={selected} className={`group min-h-14 rounded-xl border p-3 text-left transition-[transform,background-color,border-color,box-shadow] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary focus-visible:ring-offset-2 ${selected ? "border-[#0a1f44] bg-[#0a1f44] text-white shadow-[0_10px_20px_rgba(10,31,68,0.16)]" : "border-slate-200 bg-[#f8faff] text-[#0a1f44] hover:-translate-y-0.5 hover:border-brand-secondary/50 hover:bg-white"}`}><span className="text-xs font-bold leading-4">{value.label}</span></button>; })}
        </div>
      </div>
    </div>
  );
}

export { JourneyPanel } from "@/components/journey-panel";


function LegacyJourneyGrid() {
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
  const [selectedRecognition, setSelectedRecognition] = useState<RecognitionItem | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const orderedRecognitions = [...recognitionItems].sort((a, b) => {
    const yearA = a.year ? Number(a.year) : -1;
    const yearB = b.year ? Number(b.year) : -1;
    return yearB - yearA;
  });

  useEffect(() => {
    if (!selectedRecognition) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedRecognition(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedRecognition]);

  return (
    <div className="relative" role="list" aria-label="SAN TECH recognitions and awards">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {orderedRecognitions.map((item, index) => (
          <motion.button
            key={item.title}
            type="button"
            onClick={() => setSelectedRecognition(item)}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0.01 : 0.22, delay: prefersReducedMotion ? 0 : index * 0.025, ease: "easeOut" }}
            className="group relative flex min-h-[108px] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 pl-5 text-left shadow-[0_6px_18px_rgba(10,31,68,0.05)] transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-brand-secondary/50 hover:shadow-[0_16px_32px_rgba(10,31,68,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary focus-visible:ring-offset-2"
          >
            <span className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-brand-cyan via-brand-secondary to-[#0a1f44]" aria-hidden="true" />
            <span className="pointer-events-none absolute -right-7 -top-7 size-20 rounded-full bg-[#e8f8fc] transition-transform duration-300 group-hover:scale-150" aria-hidden="true" />
            <div className="relative flex items-center justify-between gap-3">
              <span className="inline-flex rounded-full bg-[#e8f1fc] px-2 py-1 text-[10px] font-black tracking-[0.12em] text-brand-secondary">{item.year || "DATE N/A"}</span>
              <span className="text-[10px] font-black tracking-[0.16em] text-slate-400">{String(index + 1).padStart(2, "0")}</span>
            </div>
            <h3 className="relative mt-3 text-sm font-bold leading-4 text-[#0a1f44]">{item.title}</h3>
            <span className="relative mt-auto inline-flex items-center gap-2 pt-3 text-[9px] font-black uppercase tracking-[0.12em] text-[#0a1f44] transition-colors group-hover:text-brand-secondary">
              View details
              <ArrowUpRight className="size-3.5" aria-hidden="true" />
            </span>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {selectedRecognition && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#07152d]/55 p-4 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-labelledby="recognition-dialog-title"
            onMouseDown={() => setSelectedRecognition(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative w-full max-w-2xl overflow-hidden rounded-2xl bg-white p-6 shadow-[0_24px_70px_rgba(7,21,45,0.25)] sm:p-8"
              onMouseDown={(event) => event.stopPropagation()}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={prefersReducedMotion ? undefined : { opacity: 0, y: 10, scale: 0.98 }}
              transition={{ duration: prefersReducedMotion ? 0.01 : 0.22, ease: "easeOut" }}
            >
              <button type="button" onClick={() => setSelectedRecognition(null)} aria-label="Close recognition details" className="absolute right-4 top-4 z-10 grid size-9 place-items-center rounded-full bg-white/80 text-[#0a1f44] shadow-sm transition-colors hover:bg-[#e8f1fc] hover:text-brand-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary">
                <X className="size-4" aria-hidden="true" />
              </button>

              {selectedRecognition.image && (
                <div className="relative -mx-6 -mt-6 mb-5 h-72 max-h-[60vh] overflow-hidden bg-[#07152d] sm:-mx-8 sm:-mt-8 sm:h-80">
                  <Image
                    src={selectedRecognition.image}
                    alt=""
                    fill
                    sizes="(min-width: 640px) 672px, 100vw"
                    aria-hidden="true"
                    className="scale-110 object-cover opacity-30 blur-2xl"
                  />
                  <div className="absolute inset-0 bg-[#07152d]/35" />
                  <Image
                    src={selectedRecognition.image}
                    alt={selectedRecognition.imageAlt ?? selectedRecognition.title}
                    fill
                    sizes="(min-width: 640px) 672px, 100vw"
                    className="z-[1] object-contain"
                  />
                  <div className="absolute inset-x-0 bottom-0 z-[2] h-24 bg-gradient-to-t from-black/55 to-transparent" />
                  {selectedRecognition.badge && (
                    <span className="absolute bottom-3 left-4 z-[3] rounded-full bg-brand-cyan px-3 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-[#07152d]">
                      {selectedRecognition.badge}
                    </span>
                  )}
                </div>
              )}

              <p className="text-[11px] font-black uppercase tracking-[0.2em] text-brand-secondary">{selectedRecognition.year || "Recognition detail"}</p>
              <h2 id="recognition-dialog-title" className="font-exo mt-2 max-w-xl pr-8 text-2xl font-bold leading-tight tracking-[-0.04em] text-[#0a1f44] sm:text-3xl">{selectedRecognition.title}</h2>
              <p className="mt-4 text-base leading-7 text-[#68718a]">{selectedRecognition.description}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FocusPanel() {
  const [selectedArea, setSelectedArea] = useState<{ area: string; description: string; Icon: LucideIcon } | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!selectedArea) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedArea(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedArea]);

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(260px,0.72fr)_minmax(0,1.28fr)] lg:items-start lg:gap-10">
      {/* Light Overview Card on Left */}
      <aside className="rounded-2xl border border-slate-200 bg-[#f8faff] p-6 shadow-[0_8px_24px_rgba(10,31,68,0.05)] sm:p-7">
        <p className="text-[11px] font-black uppercase tracking-[0.2em] text-brand-secondary">Our focus</p>
        <h2 className="font-exo mt-3 text-2xl font-bold leading-tight tracking-[-0.035em] text-[#0a1f44] sm:text-3xl">
          From challenge to working solution.
        </h2>
        <p className="mt-4 text-sm leading-6 text-[#526989]">
          From software and AI to training and deployment, SAN TECH brings the end-to-end capabilities needed to move an idea into useful, working technology.
        </p>
      </aside>

      {/* Rich 2-Column Capability Showcase Grid */}
      <div>
        <div role="list" aria-label="SAN TECH areas of focus" className="grid gap-4 sm:grid-cols-2">
          {focusAreas.map(([area, description], index) => {
            const Icon = focusIcons[index] ?? Code2;

            return (
              <button
                key={area}
                type="button"
                onClick={() => setSelectedArea({ area, description, Icon })}
                className="group relative flex cursor-pointer items-center gap-3 rounded-2xl border border-slate-200/90 bg-white p-4 text-left shadow-[0_4px_16px_rgba(10,31,68,0.03)] transition-all duration-300 hover:-translate-y-1 hover:border-brand-secondary/40 hover:bg-[#fafcff] hover:shadow-[0_14px_30px_rgba(10,31,68,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary focus-visible:ring-offset-2"
              >
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-[#edf4fa] text-brand-secondary shadow-sm transition-colors group-hover:bg-brand-secondary group-hover:text-white">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <h3 className="font-exo text-base font-bold leading-snug text-[#0a1f44] transition-colors group-hover:text-brand-secondary">
                  {area}
                </h3>
              </button>
            );
          })}
        </div>
      </div>

      {/* Focus Area Dialog */}
      <AnimatePresence>
        {selectedArea && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#07152d]/55 p-4 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-labelledby="focus-dialog-title"
            onMouseDown={() => setSelectedArea(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-[0_24px_70px_rgba(7,21,45,0.25)] sm:p-8"
              onMouseDown={(event) => event.stopPropagation()}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={prefersReducedMotion ? undefined : { opacity: 0, y: 10, scale: 0.98 }}
              transition={{ duration: prefersReducedMotion ? 0.01 : 0.22, ease: "easeOut" }}
            >
              <button
                type="button"
                onClick={() => setSelectedArea(null)}
                aria-label="Close capability details"
                className="absolute right-4 top-4 grid size-9 place-items-center rounded-full text-[#0a1f44] transition-colors hover:bg-[#e8f1fc] hover:text-brand-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary"
              >
                <X className="size-4" aria-hidden="true" />
              </button>

              <div className="flex items-center gap-3">
                <span className="grid size-11 place-items-center rounded-xl bg-[#edf4fa] text-brand-secondary">
                  <selectedArea.Icon className="size-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.16em] text-brand-secondary">Capability</p>
                  <h2 id="focus-dialog-title" className="font-exo text-2xl font-bold leading-tight tracking-[-0.03em] text-[#0a1f44]">
                    {selectedArea.area}
                  </h2>
                </div>
              </div>

              <div className="mt-5 border-t border-slate-100 pt-4">
                <p className="text-base leading-7 text-[#526989]">{selectedArea.description}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function CompanyProfilePanel() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:gap-14">
      <div>
        <p className="text-[11px] font-black uppercase tracking-[0.2em] text-brand-secondary">Company profile</p>
        <h1 className="font-exo mt-4 max-w-xl text-xl font-normal leading-[1.18] tracking-[-0.035em] text-[#303755] sm:text-2xl lg:text-[2rem]">From Ideation to Transformative Impact.</h1>
        <p className="mt-6 max-w-xl text-base leading-7 text-[#68718a]">SAN TECH stands for Smart Applications and Networking Technology. Founded in Rwanda in 2019, with a branch in Bamako, Mali, we develop practical digital solutions, technology products, and technical capacity for organizations, businesses, institutions, and communities.</p>
      </div>
      <div className="border-l border-slate-300 pl-6 lg:pl-10">
        <div className="py-4">
          <p className="text-[10px] font-black uppercase tracking-[0.18em] text-brand-secondary">Our model</p>
          <div className="mt-3 flex flex-wrap items-center gap-1.5" role="list" aria-label="SAN TECH delivery model">
            {modelStages.map(([stage], index) => (
              <motion.span
                key={stage}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={prefersReducedMotion ? undefined : { y: -2 }}
                transition={{ duration: prefersReducedMotion ? 0.01 : 0.24, delay: prefersReducedMotion ? 0 : index * 0.04, ease: "easeOut" }}
                className="inline-flex items-center rounded-full border border-[#d4def0] bg-[#f8faff] px-2.5 py-1.5 text-[10px] font-bold text-[#0a1f44] transition-colors hover:border-brand-secondary/50 hover:bg-white"
              >
                {stage}
              </motion.span>
            ))}
          </div>
        </div>
        <div className="mt-5 grid gap-4 border-t border-slate-300 pt-4 sm:grid-cols-2">
          <div><p className="text-[10px] font-black uppercase tracking-[0.15em] text-[#7c879d]">Established</p><p className="mt-2 text-sm font-bold text-[#0a1f44]">2019 · Rwanda</p></div>
          <div><p className="text-[10px] font-black uppercase tracking-[0.15em] text-[#7c879d]">Footprint</p><p className="mt-2 text-sm font-bold text-[#0a1f44]">Kigali · Bamako</p></div>
          <div><p className="text-[10px] font-black uppercase tracking-[0.15em] text-[#7c879d]">Impact</p><p className="mt-2 text-sm font-bold text-[#0a1f44]">47+ institutions · 2,550+ beneficiaries</p></div>
          <div><p className="text-[10px] font-black uppercase tracking-[0.15em] text-[#7c879d]">Compliance</p><p className="mt-2 text-sm font-bold text-[#0a1f44]">Certified Data Controller &amp; Processor</p></div>
        </div>
      </div>
    </div>
  );
}

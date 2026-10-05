"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, ArrowUpRight, BarChart3, Building2, Car, CheckCircle2, FileText, Hospital, Landmark, LockKeyhole, MapPin, Pause, Play, QrCode, ScanLine, School, ShieldCheck, Users, Volume2, VolumeX } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { PublicPage } from "@/components/public-page";
import { EVisitorsImpactSection } from "@/components/e-visitors-impact-section";
import { Safari } from "@/components/ui/safari";
import { calendlyDemoUrl } from "@/lib/calendly";

gsap.registerPlugin(ScrollTrigger, useGSAP);

function ScrollReveal({ children, reducedMotion, className = "" }: { children: ReactNode; reducedMotion: boolean; className?: string }) {
  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: reducedMotion ? 0.01 : 0.45, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const journey = [
  { number: "01", label: "Register", title: "Create a visit before the visitor arrives.", description: "Capture the visitor, host, appointment, purpose, and identity details in one record.", panel: "New visitor", status: "Ready for review", icon: Users, screen: "/images/e-visitors-register.png", details: ["Guest: Dr. Alice Mukamana", "Host: Operations office", "Purpose: Partner meeting"] },
  { number: "02", label: "Verify", title: "Make identity and access requirements visible.", description: "Use ID or passport OCR, watchlists, and visit rules to help authorized teams make a faster decision.", panel: "Identity check", status: "Document verified", icon: ScanLine, screen: "/images/e-visitors-verify.png", details: ["Document: Rwanda national ID", "Match: Confirmed", "Risk check: Clear"] },
  { number: "03", label: "Approve", title: "Give the right people the right access.", description: "Route requests to hosts and security teams before issuing a pass or gate instruction.", panel: "Approval queue", status: "Approved by host", icon: ShieldCheck, screen: "/images/e-visitors-approve.png", details: ["Access zone: Main office", "Pass type: Visitor", "Valid until: 17:30"] },
  { number: "04", label: "Monitor", title: "See who is inside your environment.", description: "Keep reception, security, and operations teams aligned on arrivals, departures, vehicles, and exceptions.", panel: "Live presence", status: "On site now", icon: MapPin, screen: "/images/e-visitors-monitor.png", details: ["Current visitors: 38", "Open visits: 07", "Active gate: Muhima"] },
  { number: "05", label: "Report", title: "Turn movements into accountable records.", description: "Use searchable history, reports, and audit trails to improve safety, service, and institutional decisions.", panel: "Activity report", status: "Export ready", icon: BarChart3, screen: "/images/e-visitors-report.png", details: ["Report: Visitor activity", "Period: September 2026", "Format: PDF / CSV"] },
] as const;

const capabilityGroups = [
  ["Capture", "Registration · appointments · ID/passport OCR"],
  ["Control", "Approvals · VIP management · gate passes · QR/barcodes"],
  ["Protect", "Watchlists · access rules · audit trails · secure records"],
  ["Understand", "Attendance · vehicle tracking · analytics · reports"],
] as const;

const environments: Array<{ label: string; description: string; icon: LucideIcon; details: string[] }> = [
  { label: "Corporate offices", description: "Manage guests, meetings, contractors, and workplace access across a busy Kigali office environment.", icon: Building2, details: ["Host approvals", "Contractor records", "Workplace access"] },
  { label: "Government and institutions", description: "Create clearer visitor records, approvals, and accountability for public-facing institutions.", icon: Landmark, details: ["Controlled entry", "Audit visibility", "Institutional reporting"] },
  { label: "Hospitals and health facilities", description: "Support controlled access in sensitive environments where people, timing, and safety matter.", icon: Hospital, details: ["Sensitive areas", "Visitor history", "Exception tracking"] },
  { label: "Schools and universities", description: "Coordinate visitors, guardians, staff, events, and campus access from one place.", icon: School, details: ["Guardian visits", "Campus events", "Campus security"] },
];

const milestones = [
  ["2019", "Inception", "E-Visitors prototype and IP journey begins; the product is recognized through NIRDA Innovate for Industry."],
  ["2021", "Resilience", "Technology supports institutional digital processes and resilience during the COVID-19 recovery period."],
  ["2023", "Institutional adoption", "E-Visitors reaches a major market-validation milestone through adoption by the National Bank of Rwanda."],
] as const;

export function EVisitorsProductPage() {
  const [activeJourney, setActiveJourney] = useState(0);
  const [activeEnvironment, setActiveEnvironment] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const pageAnimationRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const activeContext = environments[activeEnvironment];
  const ActiveContextIcon = activeContext.icon;

  useEffect(() => {
    if (prefersReducedMotion) return;

    const journeyTimer = window.setInterval(() => {
      setActiveJourney((current) => (current + 1) % journey.length);
    }, 3500);

    return () => window.clearInterval(journeyTimer);
  }, [prefersReducedMotion]);

  useGSAP(() => {
    if (prefersReducedMotion) return;

    const sections = gsap.utils.toArray<HTMLElement>("section");
    sections.forEach((section) => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 22 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 88%",
            toggleActions: "play none none none",
            once: true,
          },
        },
      );
    });
  }, { scope: pageAnimationRef, dependencies: [prefersReducedMotion], revertOnUpdate: true });

  function toggleVideoPlayback() {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      void video.play();
    } else {
      video.pause();
    }
  }

  function toggleVideoMute() {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !video.muted;
    if (!video.muted) video.volume = 0.65;
    setIsVideoMuted(video.muted);
  }

  return (
    <PublicPage>
      <div ref={pageAnimationRef}>
      <section className="border-b border-slate-200 bg-white px-6 pb-8 pt-4 sm:px-10 sm:pb-10 sm:pt-6 lg:px-16 lg:pb-12 lg:pt-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.84fr_1.16fr] lg:items-center lg:gap-16">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.24em] text-brand-secondary">SAN TECH / Flagship product</p>
              <h1 className="font-exo mt-4 max-w-xl text-4xl font-bold leading-[0.94] tracking-[-0.06em] text-[#0a1f44] sm:text-5xl lg:text-6xl">E-Visitors</h1>
              <h2 className="font-exo mt-5 max-w-xl text-xl leading-tight tracking-[-0.035em] text-[#303755] sm:text-2xl">Built in Rwanda for safer, more visible institutions.</h2>
              <p className="mt-4 max-w-xl text-sm leading-6 text-[#68718a] sm:text-base">A connected visitor and access-management platform for the people, places, and institutions that keep Rwanda moving.</p>
              <div className="mt-7 flex flex-wrap gap-3"><a href={calendlyDemoUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-lg bg-[#0a1f44] px-5 py-3 text-sm font-bold text-white transition-[background-color,transform] hover:-translate-y-0.5 hover:bg-brand-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary focus-visible:ring-offset-2">Request a demo <ArrowUpRight className="size-4" aria-hidden="true" /></a><a href="#platform-console" className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-5 py-3 text-sm font-bold text-[#0a1f44] transition-colors hover:border-brand-secondary hover:text-brand-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary focus-visible:ring-offset-2">See the platform <ArrowRight className="size-4" aria-hidden="true" /></a></div>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-slate-200 pt-5 text-xs font-bold uppercase tracking-[0.13em] text-slate-500"><span className="inline-flex items-center gap-2"><MapPin className="size-3.5 text-brand-secondary" />Kigali, Rwanda</span><span>Visitor operations</span><span>Institutional security</span></div>
            </div>

            <div className="relative overflow-hidden rounded-2xl bg-[#0a1f44] shadow-[0_24px_70px_rgba(10,31,68,0.16)]"><video ref={videoRef} src="/E-VS.mp4" className="aspect-[16/10] w-full object-cover" autoPlay muted loop playsInline preload="metadata" aria-label="E-Visitors visitor management platform" onPlay={() => setIsVideoPlaying(true)} onPause={() => setIsVideoPlaying(false)} /><div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-4 bg-gradient-to-t from-[#0a1f44] via-[#0a1f44]/90 to-transparent px-5 pb-5 pt-16 text-white sm:px-7 sm:pb-7"><div><p className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-cyan">Kigali operations / sample view</p><p className="font-exo mt-1 text-xl font-bold">From arrival to audit trail.</p></div><div className="flex shrink-0 items-center gap-2"><button type="button" onClick={toggleVideoPlayback} aria-label={isVideoPlaying ? "Pause E-Visitors video" : "Play E-Visitors video"} className="grid size-10 place-items-center rounded-full border border-white/30 bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan">{isVideoPlaying ? <Pause className="size-4" aria-hidden="true" /> : <Play className="size-4 translate-x-px" aria-hidden="true" />}</button><button type="button" onClick={toggleVideoMute} aria-label={isVideoMuted ? "Unmute E-Visitors video" : "Mute E-Visitors video"} className="grid size-10 place-items-center rounded-full border border-white/30 bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan">{isVideoMuted ? <VolumeX className="size-4" aria-hidden="true" /> : <Volume2 className="size-4" aria-hidden="true" />}</button></div></div></div>
          </div>
        </div>
      </section>

      <EVisitorsImpactSection />

      <section id="platform-console" className="border-b border-slate-200 bg-gradient-to-br from-[#edf7fb] via-[#f7fafc] to-[#e1f0f7] px-6 py-8 sm:px-10 sm:py-10 lg:px-16 lg:py-12"><div className="mx-auto max-w-7xl"><div className="max-w-2xl"><p className="text-[11px] font-black uppercase tracking-[0.24em] text-brand-secondary">One visitor. One traceable journey.</p><h2 className="font-exo mt-3 text-2xl font-bold leading-tight tracking-[-0.045em] text-[#0a1f44] sm:text-3xl">See how E-Visitors turns a visit into a visible process.</h2><p className="mt-3 text-sm leading-6 text-[#68718a]">Select a step to see what the team is doing, what the system records, and what becomes easier to manage.</p></div>
        <div className="mt-8 grid gap-3 lg:gap-8 lg:grid-cols-[0.33fr_0.67fr] lg:items-center"><div className="contents"><div className="order-2 lg:col-start-2"><ScrollReveal reducedMotion={Boolean(prefersReducedMotion)}><Safari url="e-visitors.santech.rw" imageSrc={journey[activeJourney].screen} className="mx-auto w-full lg:w-[92%]" /></ScrollReveal></div>
          <div className="border-l-2 border-[#d6e4f1] pl-4">{journey.map((step, index) => { const selected = index === activeJourney; return <motion.button key={step.label} type="button" onClick={() => setActiveJourney(index)} animate={prefersReducedMotion ? undefined : { scale: selected ? 1.025 : 1 }} transition={{ duration: prefersReducedMotion ? 0.01 : 0.35, ease: "easeOut" }} style={{ transformOrigin: "left center" }} whileTap={prefersReducedMotion ? undefined : { scale: 0.99 }} className={selected ? "relative grid w-full grid-cols-[2.25rem_1fr] items-start gap-3 py-3 text-left text-[#0a1f44] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary focus-visible:ring-offset-2" : "relative grid w-full grid-cols-[2.25rem_1fr] items-start gap-3 py-3 text-left text-slate-500 transition-colors hover:text-[#0a1f44] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary focus-visible:ring-offset-2"}><span className="pt-1 text-[10px] font-black uppercase tracking-[0.16em] text-brand-secondary">{step.number}</span><span><span className="block text-sm font-bold">{step.label}</span><span className="mt-1 block max-w-md text-xs leading-5 text-[#68718a]">{step.description}</span></span>{selected && <motion.span layoutId="evisitor-step" className="absolute -left-[18px] top-0 h-full w-0.5 bg-brand-secondary" />}</motion.button>; })}</div>

        </div></div>
      </div></section>

      <section className="border-b border-slate-200 bg-gradient-to-br from-white via-white to-[#eef8fb] px-6 py-8 sm:px-10 sm:py-10 lg:px-16 lg:py-12"><div className="mx-auto max-w-7xl"><div className="grid gap-8 lg:grid-cols-[0.65fr_1.35fr] lg:gap-16"><div><p className="text-[11px] font-black uppercase tracking-[0.24em] text-brand-secondary">Designed for Rwanda</p><h2 className="font-exo mt-3 max-w-md text-2xl font-bold leading-tight tracking-[-0.045em] text-[#0a1f44] sm:text-3xl">Different doors. One clearer system.</h2><p className="mt-4 max-w-md text-sm leading-6 text-[#68718a]">Choose the environment closest to your work and see how E-Visitors adapts to its people, movement, and responsibility.</p></div><div><div className="flex gap-2 overflow-x-auto border-b border-slate-200 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">{environments.map((environment, index) => <button key={environment.label} type="button" onClick={() => setActiveEnvironment(index)} className={`shrink-0 border-b-2 px-3 py-3 text-xs font-bold transition-colors ${index === activeEnvironment ? "border-brand-secondary text-[#0a1f44]" : "border-transparent text-slate-500 hover:text-[#0a1f44]"}`}>{environment.label}</button>)}</div><AnimatePresence mode="wait" initial={false}><motion.div key={activeContext.label} initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={prefersReducedMotion ? undefined : { opacity: 0, y: -8 }} transition={{ duration: prefersReducedMotion ? 0.01 : 0.2, ease: "easeOut" }} className="grid gap-5 bg-white/75 p-5 sm:grid-cols-[auto_1fr] sm:p-6"><span className="grid size-11 place-items-center rounded-xl bg-[#dceaf8] text-brand-secondary"><ActiveContextIcon className="size-5" aria-hidden="true" /></span><div><p className="text-[11px] font-black uppercase tracking-[0.18em] text-brand-secondary">{activeContext.label} / Rwanda</p><h3 className="font-exo mt-2 text-xl font-bold tracking-[-0.04em] text-[#0a1f44]">A welcome that matches the work.</h3><p className="mt-2 max-w-2xl text-sm leading-6 text-[#68718a]">{activeContext.description}</p><div className="mt-4 flex flex-wrap gap-2">{activeContext.details.map((detail) => <span key={detail} className="inline-flex items-center gap-2 bg-white px-3 py-2 text-xs font-bold text-[#303755]"><CheckCircle2 className="size-3.5 text-brand-secondary" />{detail}</span>)}</div></div></motion.div></AnimatePresence></div></div></div></section>

      <section className="border-b border-slate-200 bg-gradient-to-br from-[#f7fafc] via-[#f7fafc] to-[#e6f3f8] px-6 py-8 sm:px-10 sm:py-10 lg:px-16 lg:py-12"><div className="mx-auto max-w-7xl"><div className="pb-5"><p className="text-[11px] font-black uppercase tracking-[0.24em] text-brand-secondary">Product journey</p><h2 className="font-exo mt-3 max-w-3xl text-2xl font-bold leading-tight tracking-[-0.045em] text-[#0a1f44] sm:text-3xl">From a Rwandan idea to a system used in real institutions.</h2></div><div className="relative grid gap-0 md:grid-cols-3 md:before:absolute md:before:left-0 md:before:right-0 md:before:top-[3.35rem] md:before:h-px md:before:bg-[#cfe5f1]">{milestones.map(([year, title, description]) => <article key={year} className="relative border-b border-slate-200 px-0 py-5 md:border-b-0 md:px-6 md:first:pl-0 md:last:pr-0"><span className="relative z-10 grid size-11 place-items-center rounded-full border-4 border-[#f7fafc] bg-brand-secondary font-exo text-sm font-bold text-white">{year}</span><h3 className="mt-3 text-sm font-bold text-[#0a1f44]">{title}</h3><p className="mt-1 text-xs leading-5 text-[#68718a]">{description}</p></article>)}</div></div></section>

      <section className="bg-gradient-to-br from-[#081b3d] via-[#0a1f44] to-[#123365] px-6 py-8 text-white sm:px-10 sm:py-10 lg:px-16 lg:py-12"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 lg:flex-row lg:items-end"><div><p className="text-[11px] font-black uppercase tracking-[0.24em] text-brand-cyan">Bring E-Visitors to your environment</p><h2 className="font-exo mt-3 max-w-2xl text-2xl font-bold leading-tight tracking-[-0.045em] sm:text-3xl">Make every arrival safer, clearer, and more useful.</h2><p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">Talk to SAN TECH about your visitor, access, attendance, or institutional security requirements in Rwanda.</p></div><a href={calendlyDemoUrl} target="_blank" rel="noreferrer" className="inline-flex w-fit items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-bold text-[#0a1f44] transition-[background-color,transform] hover:-translate-y-0.5 hover:bg-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a1f44]">Request an E-Visitors demo <ArrowUpRight className="size-4" aria-hidden="true" /></a></div></section>
      </div>
    </PublicPage>
  );
}

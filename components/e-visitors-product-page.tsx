"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, ArrowUp, BarChart3, Building2, ChevronDown, Hospital, Landmark, Pause, Play, ScanLine, School, ShieldCheck, Users, Volume2, VolumeX } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { PublicPage } from "@/components/public-page";
import { EVisitorsImpactSection } from "@/components/e-visitors-impact-section";
import { Safari } from "@/components/ui/safari";
import { CalendlyDialog } from "@/components/calendly-dialog";

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

const journeysByEnvironment = [
  [
    { number: "01", label: "Capture", title: "Create a complete visitor record.", description: "Register guests, hosts, appointments, purposes, and identity details before the visit begins.", panel: "Visitor capture", status: "Ready for review", icon: Users, screen: "/images/e-visitors-register.png", details: ["Guest: Dr. Alice Mukamana", "Host: Operations office", "Purpose: Partner meeting"] },
    { number: "02", label: "Control", title: "Give the right people the right access.", description: "Route approvals and issue passes or gate instructions with clear rules for every visit.", panel: "Access control", status: "Approved by host", icon: ShieldCheck, screen: "/images/e-visitors-approve.png", details: ["Access zone: Main office", "Pass type: Visitor", "Valid until: 17:30"] },
    { number: "03", label: "Protect", title: "Make identity and safety requirements visible.", description: "Use ID or passport OCR, watchlists, and visit rules to help authorized teams make faster decisions.", panel: "Identity protection", status: "Document verified", icon: ScanLine, screen: "/images/e-visitors-verify.png", details: ["Document: Rwanda national ID", "Match: Confirmed", "Risk check: Clear"] },
    { number: "04", label: "Understand", title: "Turn movements into accountable insight.", description: "See who is inside, track exceptions, and use searchable reports to improve operations and decisions.", panel: "Operations insight", status: "Export ready", icon: BarChart3, screen: "/images/e-visitors-report.png", details: ["Current visitors: 38", "Open visits: 07", "Format: PDF / CSV"] },
  ],
  [
    { number: "01", label: "Receive", title: "Make every institutional arrival traceable.", description: "Register visitors, official appointments, delegations, and access purposes in one accountable record.", panel: "Official reception", status: "Record created", icon: Users, screen: "/images/e-visitors-register.png", details: ["Visitor: Official delegation", "Host: Executive office", "Purpose: Institutional meeting"] },
    { number: "02", label: "Authorize", title: "Apply clear approval and access rules.", description: "Route requests through the right host, department, or security team before access is granted.", panel: "Authorization queue", status: "Cleared for entry", icon: ShieldCheck, screen: "/images/e-visitors-approve.png", details: ["Access zone: Restricted floor", "Approval: Security desk", "Pass type: Official"] },
    { number: "03", label: "Verify", title: "Protect sensitive institutional spaces.", description: "Verify identity, watchlists, documents, and visit conditions before a guest reaches a controlled area.", panel: "Security verification", status: "Identity confirmed", icon: ScanLine, screen: "/images/e-visitors-verify.png", details: ["Document: Official ID", "Watchlist: Clear", "Visit rule: Compliant"] },
    { number: "04", label: "Audit", title: "Keep a dependable record of movement.", description: "Use searchable visit history and reports to support accountability, safety reviews, and institutional decisions.", panel: "Audit record", status: "Report ready", icon: BarChart3, screen: "/images/e-visitors-report.png", details: ["Report: Daily arrivals", "Period: September 2026", "Format: PDF / CSV"] },
  ],
  [
    { number: "01", label: "Pre-register", title: "Prepare a safer welcome for every guest.", description: "Capture patient visitors, caregivers, contractors, and appointment details before they arrive.", panel: "Pre-registration", status: "Visit scheduled", icon: Users, screen: "/images/e-visitors-register.png", details: ["Visitor: Caregiver", "Host: Outpatient services", "Purpose: Patient support"] },
    { number: "02", label: "Direct", title: "Guide visitors to the right care area.", description: "Use approval rules and access instructions to reduce confusion around sensitive hospital spaces.", panel: "Access direction", status: "Route approved", icon: ShieldCheck, screen: "/images/e-visitors-approve.png", details: ["Access zone: Outpatient wing", "Pass type: Visitor", "Escort: Required"] },
    { number: "03", label: "Screen", title: "Keep identity and safety checks visible.", description: "Confirm documents and visit conditions while giving reception and security teams one shared record.", panel: "Safety screening", status: "Screening complete", icon: ScanLine, screen: "/images/e-visitors-verify.png", details: ["Document: National ID", "Visitor rule: Cleared", "Sensitive area: Restricted"] },
    { number: "04", label: "Monitor", title: "Know who is inside each facility.", description: "Track arrivals, departures, vehicles, and exceptions when safety depends on accurate presence information.", panel: "Facility presence", status: "Live view active", icon: BarChart3, screen: "/images/e-visitors-monitor.png", details: ["Current visitors: 38", "Open visits: 07", "Active gate: Main reception"] },
  ],
  [
    { number: "01", label: "Register", title: "Welcome guardians, guests, and campus partners.", description: "Capture the person, host, appointment, purpose, and campus location before arrival.", panel: "Campus registration", status: "Visit created", icon: Users, screen: "/images/e-visitors-register.png", details: ["Visitor: Parent / guardian", "Host: Student affairs", "Purpose: Campus visit"] },
    { number: "02", label: "Approve", title: "Make campus access simple and accountable.", description: "Give hosts and security teams a clear way to approve visits, passes, events, and restricted areas.", panel: "Campus approval", status: "Host approved", icon: ShieldCheck, screen: "/images/e-visitors-approve.png", details: ["Access zone: Main campus", "Pass type: Guest", "Valid until: 17:30"] },
    { number: "03", label: "Verify", title: "Keep every campus entry responsible.", description: "Check identity and visit rules for guardians, contractors, event guests, and other visitors.", panel: "Visitor verification", status: "Details verified", icon: ScanLine, screen: "/images/e-visitors-verify.png", details: ["Document: National ID", "Match: Confirmed", "Event rule: Compliant"] },
    { number: "04", label: "Report", title: "Turn campus movement into useful insight.", description: "Review visitor history, attendance, and exceptions to improve safety and campus operations.", panel: "Campus report", status: "Export ready", icon: BarChart3, screen: "/images/e-visitors-report.png", details: ["Report: Campus activity", "Period: September 2026", "Format: PDF / CSV"] },
  ],
] as const;

const testimonialAvatars = [
  "/images/techforwardlive2026-photo-download-1of1/Highlights/CEPSTUDIO(1).jpg",
  "/images/techforwardlive2026-photo-download-1of1/Highlights/CEPSTUDIO(108).jpg",
  "/images/techforwardlive2026-photo-download-1of1/Highlights/CEPSTUDIO(174).jpg",
  "/images/techforwardlive2026-photo-download-1of1/Highlights/CEPSTUDIO(110).jpg",
  "/images/techforwardlive2026-photo-download-1of1/Highlights/CEPSTUDIO(111).jpg",
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

const faqItems = [
  ["What is E-Visitors?", "E-Visitors is a visitor, access, and attendance management platform that helps institutions register guests, verify identities, approve access, monitor movement, and keep accountable records."],
  ["Who is E-Visitors designed for?", "It supports corporate offices, government institutions, hospitals, schools, universities, and other environments that need a clearer and safer way to manage people entering their premises."],
  ["What can the platform manage?", "Teams can manage visitor registration, appointments, ID or passport checks, approvals, QR or barcode passes, watchlists, vehicles, live presence, reports, and audit trails."],
  ["Can E-Visitors fit our existing workflow?", "Yes. The platform is designed around the way reception, security, hosts, and operations teams already work, with configurable access rules and a rollout that can grow with your institution."],
  ["How can we request a demonstration?", "Use the Request a demo button to book a conversation with SAN TECH. We can review your visitor, access, attendance, and institutional security requirements together."],
] as const;

export function EVisitorsProductPage() {
  const [activeJourney, setActiveJourney] = useState(0);
  const [activeEnvironment, setActiveEnvironment] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const pageAnimationRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const activeJourneySteps = journeysByEnvironment[activeEnvironment];

  useEffect(() => {
    if (prefersReducedMotion) return;

    const journeyTimer = window.setInterval(() => {
      setActiveJourney((current) => (current + 1) % activeJourneySteps.length);
    }, 3500);

    return () => window.clearInterval(journeyTimer);
  }, [activeJourneySteps.length, prefersReducedMotion]);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 480);

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  function selectEnvironment(index: number) {
    setActiveEnvironment(index);
    setActiveJourney(0);
  }

  function scrollToTop() {
    setShowScrollTop(false);
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
  }

  return (
    <PublicPage>
      <div ref={pageAnimationRef}>
      <section className="relative isolate min-h-[min(760px,calc(100svh-7rem))] overflow-hidden border-b border-[#0a1f44] bg-[#07152d] text-white">
        <video
          ref={videoRef}
          src="/E-VS.mp4"
          className="absolute inset-0 size-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-label="E-Visitors visitor management platform"
          onPlay={() => setIsVideoPlaying(true)}
          onPause={() => setIsVideoPlaying(false)}
        />
        <div className="absolute inset-0 -z-0 bg-[linear-gradient(90deg,rgba(7,21,45,0.68)_0%,rgba(7,21,45,0.5)_34%,rgba(7,21,45,0.08)_72%,rgba(7,21,45,0.15)_100%)]" aria-hidden="true" />
        <div className="absolute inset-0 -z-0 bg-[linear-gradient(0deg,rgba(7,21,45,0.58)_0%,transparent_44%,rgba(7,21,45,0.08)_100%)]" aria-hidden="true" />

        <div className="relative z-10 mx-auto flex min-h-[min(760px,calc(100svh-7rem))] max-w-7xl items-center px-6 pb-28 pt-16 sm:px-10 sm:pb-32 sm:pt-20 lg:px-16">
          <div className="max-w-2xl">
            <p className="text-xs font-black uppercase tracking-[0.24em] text-brand-cyan">SAN TECH / Flagship product</p>
            <h1 className="font-exo mt-4 max-w-xl text-5xl font-bold leading-[0.94] tracking-[-0.06em] text-white sm:text-6xl lg:text-8xl">E-Visitors</h1>
            <h2 className="font-exo mt-5 max-w-xl text-xl leading-tight tracking-[-0.035em] text-white/90 sm:text-2xl">Built in Rwanda for safer, more visible institutions.</h2>
            <p className="mt-4 max-w-xl text-sm leading-6 text-white/70 sm:text-base">A connected visitor and access-management platform for the people, places, and institutions that keep Rwanda moving.</p>
            <div className="mt-7 flex flex-wrap gap-3"><CalendlyDialog label="Request a demo" className="inline-flex items-center gap-2 rounded-lg bg-brand-cyan px-5 py-3 text-sm font-bold text-[#07152d] transition-[background-color,transform] hover:-translate-y-0.5 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-[#07152d]" /><a href="#platform-console" className="inline-flex items-center gap-2 rounded-lg border border-white/35 bg-white/10 px-5 py-3 text-sm font-bold text-white backdrop-blur-sm transition-colors hover:border-white hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-[#07152d]">See the platform <ArrowRight className="size-4" aria-hidden="true" /></a></div>
            <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-white/20 pt-5">
              <p className="shrink-0 text-[10px] font-black uppercase tracking-[0.2em] text-white sm:text-xs">Testimonials</p>
              <div className="flex items-center pl-2" aria-label="E-Visitors testimonials">
                {testimonialAvatars.map((avatar, index) => (
                  <span key={avatar} className={`relative size-10 shrink-0 overflow-hidden rounded-full border-2 border-white bg-[#dfe8f2] shadow-[0_4px_14px_rgba(7,21,45,0.22)] sm:size-12 ${index === 0 ? "" : "-ml-2"}`}>
                    <Image src={avatar} alt="" fill className="object-cover" sizes="48px" />
                  </span>
                ))}
                <Link href="/san-hub?section=testimonials" aria-label="See all testimonials" className="ml-2 grid size-10 shrink-0 place-items-center rounded-full border-2 border-white bg-white text-[#1268bd] shadow-[0_4px_14px_rgba(7,21,45,0.2)] transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-[#07152d] sm:size-12">
                  <ArrowRight className="size-5 sm:size-6" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 z-20 flex items-end justify-end gap-4 px-6 pb-5 sm:px-10 sm:pb-7 lg:px-16">
          <div className="ml-auto flex shrink-0 items-center gap-2 rounded-full border border-white/20 bg-[#07152d]/45 p-1.5 backdrop-blur-md"><button type="button" onClick={toggleVideoPlayback} aria-label={isVideoPlaying ? "Pause E-Visitors video" : "Play E-Visitors video"} aria-pressed={!isVideoPlaying} className="grid size-10 place-items-center rounded-full border border-white/30 bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan">{isVideoPlaying ? <Pause className="size-4" aria-hidden="true" /> : <Play className="size-4 translate-x-px" aria-hidden="true" />}</button><button type="button" onClick={toggleVideoMute} aria-label={isVideoMuted ? "Unmute E-Visitors video" : "Mute E-Visitors video"} aria-pressed={!isVideoMuted} className="grid size-10 place-items-center rounded-full border border-white/30 bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan">{isVideoMuted ? <VolumeX className="size-4" aria-hidden="true" /> : <Volume2 className="size-4" aria-hidden="true" />}</button></div>
        </div>
      </section>

      <EVisitorsImpactSection />

      <section id="platform-console" className="border-b border-slate-200 bg-gradient-to-br from-[#edf7fb] via-[#f7fafc] to-[#e1f0f7] px-6 py-8 sm:px-10 sm:py-10 lg:px-16 lg:py-12"><div className="mx-auto max-w-7xl">
        <div className="mb-8 overflow-x-auto border-b border-[#d6e4f1] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"><div className="mx-auto flex w-max min-w-full justify-center gap-2">{environments.map((environment, index) => <button key={environment.label} type="button" onClick={() => selectEnvironment(index)} className={`shrink-0 border-b-2 px-4 py-3 text-sm font-bold transition-colors ${index === activeEnvironment ? "border-brand-secondary text-[#0a1f44]" : "border-transparent text-slate-500 hover:text-[#0a1f44]"}`}>{environment.label}</button>)}</div></div>
        <div className="grid gap-3 lg:gap-8 lg:grid-cols-[0.33fr_0.67fr] lg:items-center"><div className="contents"><div className="order-2 lg:col-start-2"><ScrollReveal reducedMotion={Boolean(prefersReducedMotion)}><Safari url="e-visitors.santech.rw" imageSrc={activeJourneySteps[activeJourney].screen} className="mx-auto w-full lg:w-[92%]" /></ScrollReveal></div>
          <div className="border-l-2 border-[#d6e4f1] pl-4">{activeJourneySteps.map((step, index) => { const selected = index === activeJourney; return <motion.button key={step.label} type="button" onClick={() => setActiveJourney(index)} animate={prefersReducedMotion ? undefined : { scale: selected ? 1.025 : 1 }} transition={{ duration: prefersReducedMotion ? 0.01 : 0.35, ease: "easeOut" }} style={{ transformOrigin: "left center" }} whileTap={prefersReducedMotion ? undefined : { scale: 0.99 }} className={selected ? "relative grid w-full grid-cols-[2.25rem_1fr] items-start gap-3 py-3 text-left text-[#0a1f44] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary focus-visible:ring-offset-2" : "relative grid w-full grid-cols-[2.25rem_1fr] items-start gap-3 py-3 text-left text-slate-500 transition-colors hover:text-[#0a1f44] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary focus-visible:ring-offset-2"}><span className="pt-1 text-[10px] font-black uppercase tracking-[0.16em] text-brand-secondary">{step.number}</span><span><span className="block text-sm font-bold">{step.label}</span><span className="mt-1 block max-w-md text-xs leading-5 text-[#68718a]">{step.description}</span></span>{selected && <motion.span layoutId="evisitor-step" className="absolute -left-[18px] top-0 h-full w-0.5 bg-brand-secondary" />}</motion.button>; })}</div>

        </div></div>
      </div></section>

      <section className="border-b border-slate-200 bg-gradient-to-br from-[#f7fafc] via-[#f7fafc] to-[#e6f3f8] px-6 py-8 sm:px-10 sm:py-10 lg:px-16 lg:py-12"><div className="mx-auto max-w-7xl"><div className="pb-5"><p className="text-[11px] font-black uppercase tracking-[0.24em] text-brand-secondary">Product journey</p><h2 className="font-exo mt-3 max-w-3xl text-2xl font-bold leading-tight tracking-[-0.045em] text-[#0a1f44] sm:text-3xl">From a Rwandan idea to a system used in real institutions.</h2></div><div className="relative grid gap-0 md:grid-cols-3 md:before:absolute md:before:left-0 md:before:right-0 md:before:top-[3.35rem] md:before:h-px md:before:bg-[#cfe5f1]">{milestones.map(([year, title, description]) => <article key={year} className="relative border-b border-slate-200 px-0 py-5 md:border-b-0 md:px-6 md:first:pl-0 md:last:pr-0"><span className="relative z-10 grid size-11 place-items-center rounded-full border-4 border-[#f7fafc] bg-brand-secondary font-exo text-sm font-bold text-white">{year}</span><h3 className="mt-3 text-sm font-bold text-[#0a1f44]">{title}</h3><p className="mt-1 text-xs leading-5 text-[#68718a]">{description}</p></article>)}</div></div></section>

      <section className="bg-gradient-to-br from-[#081b3d] via-[#0a1f44] to-[#123365] px-6 py-8 text-white sm:px-10 sm:py-10 lg:px-16 lg:py-12"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 lg:flex-row lg:items-end"><div><p className="text-[11px] font-black uppercase tracking-[0.24em] text-brand-cyan">Bring E-Visitors to your environment</p><h2 className="font-exo mt-3 max-w-2xl text-2xl font-bold leading-tight tracking-[-0.045em] sm:text-3xl">Make every arrival safer, clearer, and more useful.</h2><p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">Talk to SAN TECH about your visitor, access, attendance, or institutional security requirements in Rwanda.</p></div><CalendlyDialog label="Request an E-Visitors demo" className="inline-flex w-fit items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-bold text-[#0a1f44] transition-[background-color,transform] hover:-translate-y-0.5 hover:bg-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a1f44]" /></div></section>

      <section id="faq" className="border-b border-slate-200 bg-white px-6 py-10 sm:px-10 sm:py-14 lg:px-16 lg:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.24em] text-brand-secondary">Frequently asked questions</p>
            <h2 className="font-exo mt-3 max-w-md text-2xl font-bold leading-tight tracking-[-0.045em] text-[#0a1f44] sm:text-3xl">A clearer answer before your next arrival.</h2>
            <p className="mt-4 max-w-md text-sm leading-6 text-[#68718a]">Learn how E-Visitors supports safer access and more accountable visitor operations.</p>
          </div>

          <div className="divide-y divide-slate-200 border-y border-slate-200">
            {faqItems.map(([question, answer], index) => {
              const isOpen = openFaq === index;

              return (
                <div key={question}>
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-6 py-5 text-left text-sm font-bold text-[#0a1f44] transition-colors hover:text-brand-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary focus-visible:ring-inset"
                  >
                    <span>{question}</span>
                    <ChevronDown className={`size-4 shrink-0 text-brand-secondary transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} aria-hidden="true" />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={prefersReducedMotion ? false : { opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={prefersReducedMotion ? undefined : { opacity: 0, y: -6 }}
                        transition={{ duration: prefersReducedMotion ? 0.01 : 0.2, ease: "easeOut" }}
                        className="pb-5 pr-8 text-sm leading-6 text-[#68718a]"
                      >
                        {answer}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            type="button"
            onClick={scrollToTop}
            aria-label="Scroll to top"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={prefersReducedMotion ? undefined : { opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: prefersReducedMotion ? 0.01 : 0.2, ease: "easeOut" }}
            whileHover={prefersReducedMotion ? undefined : { y: -2 }}
            whileTap={prefersReducedMotion ? undefined : { scale: 0.95 }}
            className="fixed bottom-6 right-6 z-[110] grid size-12 place-items-center rounded-full bg-brand-cyan text-[#07152d] shadow-[0_12px_30px_rgba(0,163,224,0.32)] transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan focus-visible:ring-offset-2 sm:bottom-8 sm:right-8"
          >
            <ArrowUp className="size-5" aria-hidden="true" />
          </motion.button>
        )}
      </AnimatePresence>
      </div>
    </PublicPage>
  );
}

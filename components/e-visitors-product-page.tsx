"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, ArrowUp, BarChart3, Building2, CalendarDays, ChevronDown, Pause, Play, ScanLine, ShieldCheck, Truck, Users, Volume2, VolumeX } from "lucide-react";
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

const platformFeatures = [
  { number: "01", label: "Gate Movement Management", title: "Track every arrival and departure.", description: "Monitor gate activity, entries, exits, and exceptions with one dependable operational record.", panel: "Gate movement", status: "Live movement view", icon: BarChart3, screen: "/images/e-visitors-monitor.png", details: ["Gate entries: 02", "Current visitors: 38", "Status: Live"] },
  { number: "02", label: "Appointment & VIP Management", title: "Prepare every important visit.", description: "Coordinate appointments, hosts, VIP guests, schedules, and visit purposes before arrival.", panel: "Appointments and VIPs", status: "Appointment ready", icon: Users, screen: "/images/e-visitors-register.png", details: ["Host: Executive office", "Visit type: VIP", "Status: Scheduled"] },
  { number: "03", label: "Access Control", title: "Give the right people the right access.", description: "Route approvals, issue passes, and apply clear access rules for every person and location.", panel: "Access control", status: "Approved by host", icon: ShieldCheck, screen: "/images/e-visitors-approve.png", details: ["Access zone: Main office", "Pass type: Visitor", "Valid until: 17:30"] },
  { number: "04", label: "Emergency & Safety Management", title: "Respond with a clearer view of people on site.", description: "Keep presence, safety checks, alerts, and exceptions visible when teams need to act quickly.", panel: "Emergency and safety", status: "Safety view active", icon: ScanLine, screen: "/images/e-visitors-verify.png", details: ["Identity: Verified", "Watchlist: Clear", "Risk check: Complete"] },
  { number: "05", label: "Multi-Organization / Multi-Site Management", title: "Manage more than one environment.", description: "Connect organizations, branches, departments, and sites while keeping local teams and rules visible.", panel: "Multi-site operations", status: "Sites connected", icon: Building2, screen: "/images/e-visitors-report.png", details: ["Organizations: 04", "Sites: 12", "Report: Consolidated"] },
  { number: "06", label: "Events & Meeting Management", title: "Make gatherings easier to coordinate.", description: "Plan event access, meeting attendance, guest lists, hosts, and venue entry from one place.", panel: "Events and meetings", status: "Event ready", icon: CalendarDays, screen: "/images/e-visitors-register.png", details: ["Event: Partner meeting", "Guests: 24", "Venue: Main hall"] },
  { number: "07", label: "Equipment & Vehicle Tracking Management", title: "Keep assets and movement accountable.", description: "Track equipment, vehicles, drivers, access times, and movement history across your sites.", panel: "Equipment and vehicles", status: "Tracking active", icon: Truck, screen: "/images/e-visitors-monitor.png", details: ["Vehicles on site: 12", "Equipment records: 47", "Tracking: Active"] },
] as const;

const testimonialAvatars = [
  "/images/techforwardlive2026-photo-download-1of1/Highlights/CEPSTUDIO(1).jpg",
  "/images/techforwardlive2026-photo-download-1of1/Highlights/CEPSTUDIO(108).jpg",
  "/images/techforwardlive2026-photo-download-1of1/Highlights/CEPSTUDIO(174).jpg",
  "/images/techforwardlive2026-photo-download-1of1/Highlights/CEPSTUDIO(110).jpg",
  "/images/techforwardlive2026-photo-download-1of1/Highlights/CEPSTUDIO(111).jpg",
] as const;

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
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const pageAnimationRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const activeJourneySteps = platformFeatures;

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
        <div className="grid gap-3 lg:gap-8 lg:grid-cols-[0.33fr_0.67fr] lg:items-center"><div className="contents"><div className="order-2 lg:col-start-2"><ScrollReveal reducedMotion={Boolean(prefersReducedMotion)}><Safari url="e-visitors.santech.rw" imageSrc={activeJourneySteps[activeJourney].screen} className="mx-auto w-full lg:w-[92%]" /></ScrollReveal></div>
          <div className="border-l-2 border-[#d6e4f1] pl-4">{activeJourneySteps.map((step, index) => { const selected = index === activeJourney; return <motion.button key={step.label} type="button" onClick={() => setActiveJourney(index)} animate={prefersReducedMotion ? undefined : { scale: selected ? 1.025 : 1 }} transition={{ duration: prefersReducedMotion ? 0.01 : 0.35, ease: "easeOut" }} style={{ transformOrigin: "left center" }} whileTap={prefersReducedMotion ? undefined : { scale: 0.99 }} className={selected ? "relative grid w-full grid-cols-[2.25rem_1fr] items-start gap-3 py-3 text-left text-[#0a1f44] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary focus-visible:ring-offset-2" : "relative grid w-full grid-cols-[2.25rem_1fr] items-start gap-3 py-3 text-left text-slate-500 transition-colors hover:text-[#0a1f44] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary focus-visible:ring-offset-2"}><span className="pt-1 text-[10px] font-black uppercase tracking-[0.16em] text-brand-secondary">{step.number}</span><span><span className="block text-sm font-bold">{step.label}</span>{selected && <span className="mt-1 block max-w-md text-xs leading-5 text-[#68718a]">{step.description}</span>}</span>{selected && <motion.span layoutId="evisitor-step" className="absolute -left-[18px] top-0 h-full w-0.5 bg-brand-secondary" />}</motion.button>; })}</div>

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

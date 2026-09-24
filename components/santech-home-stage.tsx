"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Pause, Play, Volume2, VolumeX } from "lucide-react";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaWhatsapp, FaXTwitter, FaYoutube } from "react-icons/fa6";
import { AnimatePresence, animate, motion, useAnimationFrame, useInView } from "motion/react";
import { useMotionValue, useTransform } from "motion/react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useEffect, useRef, useState } from "react";

type StorySlide = {
  id: string;
  index: string;
  eyebrow: string;
  title: string;
  body: string;
  detail: string;
  facts: { label: string; value: string }[];
  highlights: { label: string; href: string }[];
};

type PartnerBrand = {
  label: string;
  src: string;
  href?: string;
  showLabel?: boolean;
  displayLabel?: string;
  government?: boolean;
};

const storySlides: StorySlide[] = [
  {
    id: "about",
    index: "01",
    eyebrow: "SAN TECH / ABOUT SAN TECH",
    title: "Making your ideas happen with us!",
    body: "SAN TECH is technological and digital transformation company that develops smart systems, AI, IoT, cybersecurity, embedded and digital solutions while building technology skills and innovation capacity through SAN HUB.",
    detail: "SAN TECH helps insitutions, organizations and innovators  to move from an idea or problem → design → development → deployment → impact.",
    facts: [
      { label: "Established", value: "2019" },
      { label: "Focus", value: "Digital Transformation" },
      { label: "Promise", value: "Practical impact" },
    ],
    highlights: [
      { label: "Who we are", href: "/our-story" },
      { label: "Mission & vision", href: "/our-story#mission" },
      { label: "Leadership", href: "/our-story#leadership" },
    ],
  },
  {
    id: "mission",
    index: "02",
    eyebrow: "SAN TECH / TECHNOLOGIES",
    title: "Technology built around real-world challenges.",
    body: "SAN TECH works at the intersection of software engineering, artificial intelligence, cybersecurity, IoT, embedded systems, robotics, data, and digital transformation.",
    detail: "We develop technology from the ground up—from identifying a problem and researching the context to prototyping, testing, deploying, and supporting systems in real environments.",
    facts: [
      { label: "Explore", value: "AI & data systems" },
      { label: "Connect", value: "IoT & devices" },
      { label: "Protect", value: "People & information" },
    ],
    highlights: [
      { label: "Artificial intelligence", href: "/innovation-lab?focus=ai-solutions" },
      { label: "IoT & embedded systems", href: "/innovation-lab?focus=iot" },
      { label: "Cybersecurity", href: "/innovation-lab?focus=cybersecurity" },
    ],
  },
  {
    id: "services",
    index: "03",
    eyebrow: "SAN TECH / SERVICES",
    title: "From a complex need to a dependable system.",
    body: "We design and develop software, web and mobile platforms, AI solutions, cybersecurity programs, IoT systems, and digital transformation services.",
    detail: "Our work also covers systems integration, technology infrastructure, research and innovation, product development, training, and consultancy—delivered around the people who use it.",
    facts: [
      { label: "Start", value: "Assess the challenge" },
      { label: "Build", value: "Design & integrate" },
      { label: "Grow", value: "Train & support" },
    ],
    highlights: [
      { label: "Software development", href: "/innovation-lab?focus=software-development" },
      { label: "AI solutions", href: "/innovation-lab?focus=ai-solutions" },
      { label: "Digital transformation", href: "/innovation-lab?focus=digital-transformation" },
    ],
  },
  {
    id: "san-hub",
    index: "04",
    eyebrow: "SAN TECH / SAN HUB",
    title: "Learn. Build. Innovate. Impact.",
    body: "SAN HUB is SAN TECH’s learning, innovation, talent, and entrepreneurship ecosystem for learners, innovators, researchers, mentors, trainers, institutions, and businesses.",
    detail: "The Hub connects technology training, innovation development, career development, entrepreneurship, internships, mentorship, scholarships, and community opportunities.",
    facts: [
      { label: "Learn", value: "Practical technology" },
      { label: "Build", value: "Ideas into products" },
      { label: "Join", value: "A growing ecosystem" },
    ],
    highlights: [
      { label: "Courses & training", href: "/san-hub/courses" },
      { label: "Innovation programs", href: "/innovation-lab" },
      { label: "Internships & mentorship", href: "/join-the-community" },
    ],
  },
  {
    id: "e-visitors",
    index: "05",
    eyebrow: "SAN TECH / E-VISITORS",
    title: "Smart visitor, access, and attendance management.",
    body: "E-Visitors is SAN TECH’s flagship platform for managing visitors, access, attendance, movements, and institutional security.",
    detail: "Registration, appointments, ID and passport scanning, OCR, access cards, gate management, watchlists, vehicle tracking, dashboards, role-based access, and audit logs work together in one system.",
    facts: [
      { label: "Register", value: "Visitors & appointments" },
      { label: "Verify", value: "Identity with OCR" },
      { label: "Report", value: "Access & attendance" },
    ],
    highlights: [
      { label: "ID & OCR scanning", href: "/e-visitors#features" },
      { label: "Access & attendance", href: "/e-visitors#features" },
      { label: "Reports & audit trails", href: "/e-visitors#features" },
    ],
  },
  {
    id: "tech-pulse",
    index: "06",
    eyebrow: "SAN TECH / TECH PULSE",
    title: "Stay close to the ideas shaping a connected Africa.",
    body: "Tech Pulse is SAN TECH’s media and knowledge platform for company news, opportunities, tenders, events, research, technology trends, and impact stories.",
    detail: "It gives partners, learners, innovators, and technology users one place to discover useful signals, share knowledge, and find the next opportunity to participate.",
    facts: [
      { label: "Follow", value: "News & trends" },
      { label: "Find", value: "Jobs & tenders" },
      { label: "Join", value: "Events & research" },
    ],
    highlights: [
      { label: "News & announcements", href: "/tech-pulse" },
      { label: "Opportunities & tenders", href: "/tech-pulse?type=opportunities" },
      { label: "Research & impact", href: "/tech-pulse?type=research" },
    ],
  },
];

const impactStats = [
  [40, "+", "organizations & clients served"],
  [2500, "+", "SAN HUB beneficiaries"],
  [17, "+", "countries reached"],
  [15, "+", "technology professionals"],
  [54, "+", "startup / innovation projects"],
  [700, "+", "jobs & opportunities influenced"],
  [10, "+", "years combined leadership experience"],
] as const;

function ImpactCount({ value, suffix }: { value: number; suffix: string }) {
  const count = useMotionValue(0);
  const displayValue = useTransform(count, (current) => `${Math.round(current).toLocaleString("en-US")}${suffix}`);
  const counterRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(counterRef, { amount: 0.6 });

  useEffect(() => {
    if (!isInView) {
      count.set(0);
      return;
    }

    const controls = animate(count, value, {
      duration: value < 50 ? 1.6 : 0.75,
      ease: "easeOut",
    });

    return () => controls.stop();
  }, [count, isInView, value]);

  return <motion.span ref={counterRef}>{displayValue}</motion.span>;
}

function ImpactMarquee() {
  const firstGroupRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const [loopWidth, setLoopWidth] = useState(0);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const group = firstGroupRef.current;
    if (!group) return;

    const updateWidth = () => setLoopWidth(group.getBoundingClientRect().width);
    updateWidth();
    const observer = new ResizeObserver(updateWidth);
    observer.observe(group);
    return () => observer.disconnect();
  }, []);

  useAnimationFrame((_, delta) => {
    if (!loopWidth || hovered) return;
    const next = x.get() - delta * 0.012;
    x.set(next <= -loopWidth ? next + loopWidth : next);
  });

  return (
    <div
      className="min-w-0 flex-1 overflow-hidden"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label="SAN TECH impact statistics"
    >
      <motion.div style={{ x }} className="flex w-max select-none whitespace-nowrap">
        {[0, 1].map((group) => (
          <div ref={group === 0 ? firstGroupRef : undefined} key={group} className="flex shrink-0 items-center gap-8 pr-8 sm:gap-10">
            {impactStats.map(([value, suffix, label]) => (
              <div key={`${group}-${label}`} className="min-w-[130px] shrink-0">
                <p className="font-exo text-[clamp(1.35rem,2vw,2rem)] font-black leading-none tracking-[-0.06em] text-[#0a1f44]">
                  <ImpactCount value={value} suffix={suffix} />
                </p>
                <p className="mt-1 max-w-[150px] whitespace-normal text-[9px] font-bold uppercase leading-tight tracking-[0.03em] text-slate-500">{label}</p>
              </div>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

function StoryPlaybackIcon({ playing }: { playing: boolean }) {
  return (
    <motion.svg
      viewBox="4 4 28 28"
      className="size-7"
      fill="none"
      aria-hidden="true"
      animate={{ rotate: playing ? 360 : 0 }}
      transition={{ duration: 8, repeat: playing ? Infinity : 0, ease: "linear" }}
      style={{ transformOrigin: "50% 50%" }}
    >
      <circle cx="18" cy="18" r="12.5" stroke="currentColor" strokeWidth="1" opacity="0.3" strokeDasharray="2 3" />
      <path d="M6.5 18a11.5 11.5 0 0 1 8-10.8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="m12 6.3 3.2.5-1.5 2.8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M29.5 18a11.5 11.5 0 0 1-8 10.8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
      <circle cx="18" cy="18" r="3" fill="currentColor" />
      {playing ? (
        <>
          <path d="M11 13.5c1.7 2.8 1.7 6.2 0 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M25 13.5c-1.7 2.8-1.7 6.2 0 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </>
      ) : (
        <path d="m12.5 14 8 4-8 4v-8Z" fill="currentColor" />
      )}
    </motion.svg>
  );
}

const partnerBrands: PartnerBrand[] = [
  { label: "Pallotti Presse Ltd", src: "/palloti.png", href: "https://pallottipresse.com/", showLabel: true },
  { label: "RICH Ubuzima", src: "/richubuzima.png", href: "https://richubuzima.rw/" },
  { label: "H&M Group", src: "/H&M-Logo.png", href: "https://handmgroup.rw/" },
  { label: "Eva Wellness Spa", src: "/eva_spa.jpg", href: "https://www.evawellnessspa.com/" },
  { label: "BNR", src: "/bnr-logo.webp", href: "https://www.bnr.rw/", showLabel: true },
  { label: "MINICOM", src: "/Coat_of_arms_of_Rwanda.svg", href: "https://minicom.gov.rw/", government: true },
];

const socialLinks = [
  { label: "Facebook", href: "https://www.facebook.com/santechinnovate", icon: FaFacebookF },
  { label: "YouTube", href: "https://www.youtube.com/@santechinnovate", icon: FaYoutube },
  { label: "X / Twitter", href: "https://twitter.com/santechinnovate", icon: FaXTwitter },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/santechinnovate", icon: FaLinkedinIn },
  { label: "WhatsApp", href: "https://wa.me/250780309833", icon: FaWhatsapp },
  { label: "Instagram", href: "https://www.instagram.com/santechinnovate", icon: FaInstagram },
];

function PartnerMark({ partner }: { partner: PartnerBrand }) {
  const content = (
    <>
      <span className={`relative block h-10 shrink-0 ${partner.government ? "w-10" : partner.showLabel ? "w-12" : "w-32"}`}>
        <Image
          src={partner.src}
          alt={partner.label}
          fill
          sizes={partner.government || partner.showLabel ? "48px" : "128px"}
          className="object-contain mix-blend-multiply"
        />
      </span>
      {(partner.government || partner.showLabel) && <span className="font-exo text-sm font-bold tracking-[-0.02em] text-slate-600">{partner.displayLabel ?? partner.label}</span>}
    </>
  );

  if (partner.href) {
    return (
      <a href={partner.href} target="_blank" rel="noreferrer" aria-label={`Visit ${partner.label}`} title={`Visit ${partner.label}`} className="inline-flex h-8 shrink-0 items-center gap-2 transition-opacity hover:opacity-70">
        {content}
      </a>
    );
  }

  return (
    <span className="inline-flex h-8 shrink-0 items-center gap-2" title={partner.label}>
      {content}
    </span>
  );
}

function PartnerMarquee() {
  const trackRef = useRef<HTMLDivElement>(null);
  const firstGroupRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const direction = useRef(-1);
  const [loopWidth, setLoopWidth] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    const group = firstGroupRef.current;
    if (!group) return;

    const updateWidth = () => setLoopWidth(group.getBoundingClientRect().width);
    updateWidth();
    const observer = new ResizeObserver(updateWidth);
    observer.observe(group);
    return () => observer.disconnect();
  }, []);

  useAnimationFrame((_, delta) => {
    if (!loopWidth || hovered || dragging) return;
    const next = x.get() + direction.current * delta * 0.035;
    if (next <= -loopWidth) x.set(next + loopWidth);
    else if (next >= 0) x.set(next - loopWidth);
    else x.set(next);
  });

  return (
    <div
      className="min-w-0 flex-1 cursor-grab overflow-hidden active:cursor-grabbing"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label="Drag partner and client logos left or right"
    >
      <motion.div
        ref={trackRef}
        style={{ x }}
        drag="x"
        dragMomentum={false}
        dragElastic={0.08}
        onDragStart={() => setDragging(true)}
        onDragEnd={(_, info) => {
          if (Math.abs(info.velocity.x) > 10) direction.current = info.velocity.x > 0 ? 1 : -1;
          setDragging(false);
        }}
        className="flex w-max select-none whitespace-nowrap"
      >
        {[0, 1].map((group) => (
          <div ref={group === 0 ? firstGroupRef : undefined} key={group} className="flex shrink-0 items-center gap-8 pr-8">
            {partnerBrands.map((partner) => (
              <PartnerMark key={`${group}-${partner.label}`} partner={partner} />
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export function SantechHomeStage() {
  const [activeStoryIndex, setActiveStoryIndex] = useState(0);
  const [storyPlaying, setStoryPlaying] = useState(true);
  const [storyHovered, setStoryHovered] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(true);
  const [muted, setMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const slideArrowRef = useRef<HTMLSpanElement>(null);
  const activeStory = storySlides[activeStoryIndex];

  useGSAP(() => {
    const arrow = slideArrowRef.current;
    if (!arrow || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const tween = gsap.to(arrow, { x: 5, opacity: 0.45, duration: 0.8, repeat: -1, yoyo: true, ease: "power1.inOut" });
    return () => tween.kill();
  }, { dependencies: [] });

  useEffect(() => {
    if (!storyPlaying || storyHovered) return;
    const timer = window.setTimeout(() => {
      setActiveStoryIndex((current) => (current + 1) % storySlides.length);
    }, 6800);

    return () => window.clearTimeout(timer);
  }, [activeStoryIndex, storyPlaying, storyHovered]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    void video.play().then(() => setVideoPlaying(true)).catch(() => setVideoPlaying(false));
  }, []);

  function toggleSound() {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  }

  function toggleVideoPlayback() {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      void video.play().then(() => setVideoPlaying(true)).catch(() => setVideoPlaying(false));
    } else {
      video.pause();
      setVideoPlaying(false);
    }
  }

  return (
    <>
      <section className="h-[calc(100svh-240px)] min-h-0 overflow-hidden bg-[#edf1f7] px-3 py-3 text-[#0c1230] sm:h-[calc(100svh-240px)] sm:px-5 sm:py-4 lg:px-7">
        <div className="relative z-10 mx-auto flex h-full min-h-0 max-w-[1600px] flex-col">
          <div className="grid min-h-0 flex-1 gap-3 lg:grid-cols-[minmax(0,1fr)_minmax(330px,0.68fr)] lg:gap-4">
            <div className="relative flex min-h-0 flex-col overflow-hidden bg-[#111735]">
              <div className="relative min-h-0 flex-1 overflow-hidden">
                <video
                  ref={videoRef}
                  src="/E-VS.mp4"
                  className="size-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  onPlay={() => setVideoPlaying(true)}
                  onPause={() => setVideoPlaying(false)}
                  aria-label="E-Visitors visitor management platform"
                />
              </div>
              <div className="flex shrink-0 items-center justify-between gap-4 bg-[#111735] px-4 py-3 text-white sm:px-6">
                <div className="min-w-0">
                  <p className="truncate text-[9px] font-black uppercase tracking-[0.2em] text-white">FLAGSHIP PRODUCT: E-VISITOR SYSTEM</p>
                  <p className="mt-1 truncate text-xs font-semibold leading-snug sm:text-sm">Front-desk check-ins management system and premises-access platform.</p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <button type="button" onClick={toggleSound} className="grid size-8 place-items-center border border-white/30 text-white transition-colors hover:bg-white hover:text-[#111735]" aria-label={muted ? "Turn video sound on" : "Mute video sound"}>
                    {muted ? <VolumeX className="size-3.5" /> : <Volume2 className="size-3.5" />}
                  </button>
                  <button type="button" onClick={toggleVideoPlayback} className="grid size-8 place-items-center border border-white/30 text-white transition-colors hover:bg-white hover:text-[#111735]" aria-label={videoPlaying ? "Pause E-Visitors video" : "Play E-Visitors video"} aria-pressed={!videoPlaying}>
                    {videoPlaying ? <Pause className="size-3.5" /> : <Play className="size-3.5" />}
                  </button>
                </div>
              </div>
            </div>

            <article
              className="relative flex min-h-0 flex-col overflow-hidden border border-slate-300/80 bg-[#f8f9fc] p-4 sm:p-5 lg:p-6"
              onMouseEnter={() => setStoryHovered(true)}
              onMouseLeave={() => setStoryHovered(false)}
            >
              <div className="flex items-center justify-between gap-4 border-b border-slate-200 pb-3">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#0a1f44]">{activeStory.eyebrow}</p>
                <div className="flex items-center gap-2" aria-label="SAN TECH story slides">
                  <span ref={slideArrowRef} className="inline-flex shrink-0" aria-hidden="true">
                    <Image src="/undraw_arrow.svg" alt="" width={62} height={17} />
                  </span>
                  <div className="flex items-center gap-1">
                    {storySlides.map((slide, index) => (
                      <button
                        key={slide.id}
                        type="button"
                        onClick={() => setActiveStoryIndex(index)}
                        aria-label={`Show slide ${slide.index}: ${slide.eyebrow}`}
                        aria-current={index === activeStoryIndex ? "true" : undefined}
                        className={`px-1 text-[11px] font-black tracking-[0.12em] transition-colors duration-200 ${index === activeStoryIndex ? "text-[#0a1f44]" : "text-slate-400 hover:text-[#0a1f44]"}`}
                      >
                        {slide.index}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="min-h-0 flex-1 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStory.id}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="h-full min-h-0 overflow-hidden pb-12 pt-1"
                  >
                  <h1 className="font-exo mt-3 max-w-3xl text-[clamp(1.35rem,2vw,2.45rem)] font-bold leading-[1.1] tracking-[-0.025em] text-[#0c1230]">{activeStory.title}</h1>
                  <p className="mt-5 max-w-2xl text-justify text-[15px] leading-7 tracking-[0.005em] text-slate-600 sm:text-base">{activeStory.body}</p>
                  <p className="mt-4 max-w-2xl text-justify text-sm leading-6.5 tracking-[0.01em] text-slate-600 sm:text-[16px]">{activeStory.detail}</p>

                  <div className="mt-4 grid grid-cols-3 gap-2 border-y border-slate-200 py-3">
                    {activeStory.facts.map((fact) => (
                      <div key={fact.label} className="min-w-0 px-1">
                        <p className="text-[10px] font-black uppercase tracking-[0.16em] text-slate-600 sm:text-[11px]">{fact.label}</p>
                        <p className="mt-1 text-sm font-bold leading-tight text-[#0a1f44] sm:text-[15px]">{fact.value}</p>
                      </div>
                    ))}
                  </div>

                    {/* <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
                      {activeStory.highlights.map((highlight) => (
                        <Link key={highlight.label} href={highlight.href} className="group flex min-h-9 items-center justify-between gap-2 border border-slate-200 bg-white px-2.5 py-2 text-xs font-bold leading-tight text-slate-700 transition-colors hover:border-[#0a1f44] hover:bg-[#0a1f44] hover:text-white sm:text-sm">
                          <span>{highlight.label}</span>
                          <ArrowUpRight className="size-3 shrink-0 text-[#0a1f44] transition-colors group-hover:text-white" />
                        </Link>
                      ))}
                    </div> */}

                  </motion.div>
                </AnimatePresence>
              </div>

              <button
                type="button"
                onClick={() => setStoryPlaying((playing) => !playing)}
                aria-label={storyPlaying ? "Pause homepage slides" : "Play homepage slides"}
                aria-pressed={!storyPlaying}
                className="absolute bottom-2 right-2 grid size-12 place-items-center rounded-full bg-transparent text-[#0a1f44] transition-transform duration-200 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0a1f44] focus-visible:ring-offset-2"
              >
                <StoryPlaybackIcon playing={storyPlaying} />
              </button>
            </article>
          </div>
        </div>
      </section>

      <div className="grid min-h-[152px] shrink-0 border-t border-slate-300/80 bg-[#f8f9fc] text-[11px] font-semibold text-slate-500 sm:h-[80px] sm:min-h-0 sm:grid-cols-[minmax(350px,1.15fr)_minmax(0,1.35fr)]">
        <div className="flex items-center border-b border-slate-300/80 px-4 py-2 sm:border-b-0 sm:border-r sm:px-7">
          <div className="flex min-w-0 flex-1 items-center gap-4">
            <p className="shrink-0 font-black uppercase tracking-[0.2em] text-[#0a1f44] whitespace-pre-wrap w-20">SAN TECH  Impacts</p>
            <ImpactMarquee />
          </div>
        </div>
        <div className="flex min-w-0 items-center gap-4 overflow-hidden px-4 py-2 sm:px-7">
          <span className="z-10 shrink-0 text-[11px] font-black uppercase tracking-[0.2em] text-[#0a1f44]">Partners / Clients</span>
          <PartnerMarquee />
        </div>
      </div>

      <footer className="relative flex h-12.5 shrink-0 items-center justify-between gap-4 overflow-hidden bg-[#0c1230] px-4 pb-1 text-xs text-white sm:px-7">
        <span>© 2026 SAN TECH. All rights reserved.</span>
        <div className="flex items-center gap-2 sm:gap-3">
          <Link href="/connect" className="transition-colors hover:text-white">Connect</Link>
          <a href="mailto:info@santechinnovate.com" className="hidden transition-colors hover:text-white sm:inline">info@santechinnovate.com</a>
          <span className="hidden h-4 w-px bg-white/20 sm:block" aria-hidden="true" />
          <div className="flex items-center gap-2" aria-label="SAN TECH social media">
            {socialLinks.map(({ label, href, icon: Icon }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} title={label} className="text-white transition-colors hover:text-white/75">
                <Icon className="size-4" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-2 bg-white"
          style={{ backgroundImage: "url('/imingogo-trimmed.png')", backgroundPosition: "center bottom", backgroundRepeat: "repeat-x", backgroundSize: "44px 22px" }}
        />
      </footer>
    </>
  );
}

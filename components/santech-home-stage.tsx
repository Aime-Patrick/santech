"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Pause, Play, Volume2, VolumeX } from "lucide-react";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaWhatsapp, FaXTwitter, FaYoutube } from "react-icons/fa6";
import { AnimatePresence, motion, useAnimationFrame } from "motion/react";
import { useMotionValue, useSpring, useTransform } from "motion/react";
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
    eyebrow: "SAN TECH / ABOUT US",
    title: "Technology made useful for the places we call home.",
    body: "SAN TECH builds smart products, resilient systems, and practical pathways that help African organizations move with confidence.",
    detail: "We connect local insight with dependable technology so teams can solve real operational problems, serve people better, and build for the long term.",
    facts: [
      { label: "Built for", value: "African organizations" },
      { label: "Approach", value: "Useful by design" },
      { label: "Measure", value: "Practical impact" },
    ],
    highlights: [
      { label: "Products", href: "/innovation-lab" },
      { label: "Digital systems", href: "/innovation-lab" },
      { label: "Technology skills", href: "/san-hub" },
    ],
  },
  {
    id: "mission",
    index: "02",
    eyebrow: "SAN TECH / TECHNOLOGIES",
    title: "Tools that turn ambitious ideas into working systems.",
    body: "We combine software, AI, connected devices, and secure infrastructure to help organizations see clearly and move faster.",
    detail: "From the first prototype to a platform people use every day, our technology choices stay focused on useful outcomes, responsible data, and room to grow.",
    facts: [
      { label: "Connect", value: "People and systems" },
      { label: "Protect", value: "Data and access" },
      { label: "Enable", value: "Better decisions" },
    ],
    highlights: [
      { label: "AI & automation", href: "/innovation-lab?focus=ai-solutions" },
      { label: "IoT & embedded systems", href: "/innovation-lab?focus=iot" },
      { label: "Secure cloud & data", href: "/innovation-lab?focus=cybersecurity" },
    ],
  },
  {
    id: "services",
    index: "03",
    eyebrow: "SAN TECH / SERVICES",
    title: "One technology partner for the work that matters.",
    body: "From software and AI to cybersecurity, IoT, and digital transformation, we turn complex needs into systems people can rely on.",
    detail: "We listen first, map the opportunity, then design and deliver the right system with the people who will operate it—not around them.",
    facts: [
      { label: "Discover", value: "The real need" },
      { label: "Deliver", value: "The right system" },
      { label: "Support", value: "The next stage" },
    ],
    highlights: [
      { label: "Software development", href: "/innovation-lab?focus=software-development" },
      { label: "AI solutions", href: "/innovation-lab?focus=ai-solutions" },
      { label: "Cybersecurity", href: "/innovation-lab?focus=cybersecurity" },
      { label: "Digital transformation", href: "/innovation-lab?focus=digital-transformation" },
    ],
  },
  {
    id: "san-hub",
    index: "04",
    eyebrow: "SAN TECH / SAN HUB",
    title: "A clear path from learning to contribution.",
    body: "SAN HUB connects courses, training, innovation programmes, internships, and community opportunities in one ecosystem.",
    detail: "Whether someone is starting out, changing direction, or helping others grow, the Hub makes technology skills practical, connected, and actionable.",
    facts: [
      { label: "Learn", value: "Practical skills" },
      { label: "Build", value: "With a community" },
      { label: "Grow", value: "Into opportunity" },
    ],
    highlights: [
      { label: "Courses & training", href: "/san-hub/courses" },
      { label: "Innovation programmes", href: "/innovation-lab" },
      { label: "Community & internships", href: "/join-the-community" },
    ],
  },
  {
    id: "e-visitors",
    index: "05",
    eyebrow: "SAN TECH / E-VISITORS",
    title: "Every arrival becomes a clearer, safer operation.",
    body: "Our flagship visitor platform brings registration, ID and OCR scanning, access, attendance, and reporting into one operational picture.",
    detail: "E-Visitors helps institutions welcome people with less friction while giving teams the visibility, accountability, and control they need at every point of entry.",
    facts: [
      { label: "Register", value: "Every visitor" },
      { label: "Verify", value: "Identity faster" },
      { label: "Report", value: "With confidence" },
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
    title: "Find the opportunities that move work forward.",
    body: "Stay close to SAN TECH news, tenders, events, training opportunities, and the ideas shaping a more connected Africa.",
    detail: "Tech Pulse keeps useful signals in one place so partners, learners, and builders can spot the next conversation, opportunity, or collaboration.",
    facts: [
      { label: "Follow", value: "What is changing" },
      { label: "Find", value: "New opportunities" },
      { label: "Join", value: "The conversation" },
    ],
    highlights: [
      { label: "News & updates", href: "/tech-pulse" },
      { label: "Opportunities & tenders", href: "/tech-pulse?type=opportunities" },
      { label: "Events & trends", href: "/tech-pulse?type=events" },
    ],
  },
];

const impactStats = [
  [10, "k+", "people empowered"],
  [12, "+", "countries reached"],
  [47, "+", "institutions served"],
] as const;

function ImpactCount({ value, suffix }: { value: number; suffix: string }) {
  const count = useMotionValue(0);
  const spring = useSpring(count, { damping: 24, stiffness: 80, mass: 0.8 });
  const displayValue = useTransform(spring, (current) => `${Math.round(current)}${suffix}`);

  useEffect(() => {
    count.set(value);
  }, [count, value]);

  return <motion.span>{displayValue}</motion.span>;
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
                  <p className="truncate text-[9px] font-black uppercase tracking-[0.2em] text-white">FLAGSHIP PRODUCT / E-VISITORS</p>
                  <p className="mt-1 truncate text-xs font-semibold leading-snug sm:text-sm">Every arrival becomes a clearer, safer operation.</p>
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
              className="flex min-h-0 flex-col overflow-hidden border border-slate-300/80 bg-[#f8f9fc] p-5 sm:p-7 lg:p-8"
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
                    className="h-full min-h-0 overflow-hidden pt-1"
                  >
                  <h1 className="font-exo mt-2 max-w-xl text-[clamp(1.25rem,1.8vw,2.25rem)] font-black leading-[0.96] tracking-[-0.06em] text-[#0c1230]">{activeStory.title}</h1>
                  <p className="mt-3 max-w-lg text-sm leading-5.5 text-slate-600 sm:text-[15px]">{activeStory.body}</p>
                  <p className="mt-2 max-w-lg text-xs leading-5 text-slate-500 sm:text-sm">{activeStory.detail}</p>

                  <div className="mt-4 grid grid-cols-3 gap-2 border-y border-slate-200 py-3">
                    {activeStory.facts.map((fact) => (
                      <div key={fact.label} className="min-w-0 px-1">
                        <p className="text-[10px] font-black uppercase tracking-[0.16em] text-slate-400 sm:text-[11px]">{fact.label}</p>
                        <p className="mt-1 text-sm font-bold leading-tight text-[#0a1f44] sm:text-[15px]">{fact.value}</p>
                      </div>
                    ))}
                  </div>

                    <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
                      {activeStory.highlights.map((highlight) => (
                        <Link key={highlight.label} href={highlight.href} className="group flex min-h-9 items-center justify-between gap-2 border border-slate-200 bg-white px-2.5 py-2 text-[11px] font-bold leading-tight text-slate-700 transition-colors hover:border-[#0a1f44] hover:bg-[#0a1f44] hover:text-white sm:text-xs">
                          <span>{highlight.label}</span>
                          <ArrowUpRight className="size-3 shrink-0 text-[#0a1f44] transition-colors group-hover:text-white" />
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="flex shrink-0 items-center justify-end border-t border-slate-200 pt-4">
                <button
                  type="button"
                  onClick={() => setStoryPlaying((playing) => !playing)}
                  aria-label={storyPlaying ? "Pause homepage slides" : "Play homepage slides"}
                  aria-pressed={!storyPlaying}
                  className="grid size-9 place-items-center border border-slate-300 bg-white text-[#0a1f44] transition-colors hover:border-[#0a1f44] hover:bg-[#0a1f44] hover:text-white"
                >
                  {storyPlaying ? <Pause className="size-4" /> : <Play className="size-4" />}
                </button>
              </div>
            </article>
          </div>
        </div>
      </section>

      <div className="grid min-h-[152px] shrink-0 border-t border-slate-300/80 bg-[#f8f9fc] text-[11px] font-semibold text-slate-500 sm:h-[80px] sm:min-h-0 sm:grid-cols-[minmax(270px,0.9fr)_minmax(0,1.6fr)]">
        <div className="flex items-center border-b border-slate-300/80 px-4 py-2 sm:border-b-0 sm:border-r sm:px-7">
          <div className="min-w-0 flex-1">
            <p className="mb-1 font-black uppercase tracking-[0.2em] text-[#0a1f44]">Impact</p>
            <div className="grid grid-cols-3 gap-3">
              {impactStats.map(([value, suffix, label]) => (
                <div key={label} className="min-w-0">
                  <p className="font-exo text-[clamp(1.3rem,2vw,2rem)] font-black leading-none tracking-[-0.06em] text-[#0a1f44]"><ImpactCount value={value} suffix={suffix} /></p>
                  <p className="mt-1 text-[9px] font-bold uppercase leading-tight tracking-[0.06em] text-slate-500">{label}</p>
                </div>
              ))}
            </div>
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

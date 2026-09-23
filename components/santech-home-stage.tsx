"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Volume2, VolumeX } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useMotionValue, useSpring, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";

type StorySlide = {
  id: string;
  index: string;
  eyebrow: string;
  title: string;
  body: string;
  action: string;
  href: string;
  services: string[];
};

const storySlides: StorySlide[] = [
  {
    id: "about",
    index: "01",
    eyebrow: "SAN TECH / ABOUT US",
    title: "Technology made useful for the places we call home.",
    body: "SAN TECH builds smart products, resilient systems, and practical pathways that help African organizations move with confidence.",
    action: "Explore our story",
    href: "/our-story",
    services: ["Products", "Digital systems", "Technology skills"],
  },
  {
    id: "mission",
    index: "02",
    eyebrow: "SAN TECH / MISSION & VISION",
    title: "Build the systems that make progress possible.",
    body: "Our mission is to make useful technology more accessible. Our vision is an Africa where strong digital systems, skills, and ideas create lasting opportunity.",
    action: "See our direction",
    href: "/our-story#mission",
    services: ["Useful innovation", "African talent", "Measurable impact"],
  },
  {
    id: "services",
    index: "03",
    eyebrow: "SAN TECH / SERVICES",
    title: "One technology partner for the work that matters.",
    body: "From software and AI to cybersecurity, IoT, and digital transformation, we turn complex needs into systems people can rely on.",
    action: "Explore our services",
    href: "/innovation-lab",
    services: ["Software development", "AI solutions", "IoT systems", "Cybersecurity", "Digital transformation", "Training & capacity"],
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

const partnerBrands = [
  { label: "Pallotti Presse", src: "/palloti.png" },
  { label: "RICH Ubuzima", src: "/richubuzima.png" },
  { label: "H&M Group", src: "/H&M-Logo.png" },
  { label: "Eva Wellness Spa", src: "/eva_spa.jpg" },
  { label: "BNR", src: "/bnr-logo.webp" },
  { label: "MINICOM", src: "/Coat_of_arms_of_Rwanda.svg", government: true },
];

function PartnerMark({ partner }: { partner: (typeof partnerBrands)[number] }) {
  return (
    <span className="inline-flex h-8 shrink-0 items-center gap-2" title={partner.label}>
      <Image
        src={partner.src}
        alt={partner.label}
        width={partner.government ? 40 : 128}
        height={40}
        className={`${partner.government ? "size-10" : "h-10 w-32"} object-contain mix-blend-multiply`}
      />
      {partner.government && <span className="font-exo text-sm font-bold tracking-[-0.02em] text-slate-600">MINICOM</span>}
    </span>
  );
}

export function SantechHomeStage() {
  const [activeStoryIndex, setActiveStoryIndex] = useState(0);
  const [muted, setMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const activeStory = storySlides[activeStoryIndex];

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setActiveStoryIndex((current) => (current + 1) % storySlides.length);
    }, 7500);

    return () => window.clearTimeout(timer);
  }, [activeStoryIndex]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    void video.play().catch(() => undefined);
  }, []);

  function toggleSound() {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  }

  return (
    <>
      <section className="h-[calc(100svh-240px)] min-h-0 overflow-hidden bg-[#edf1f7] px-3 py-3 text-[#0c1230] sm:h-[calc(100svh-240px)] sm:px-5 sm:py-4 lg:px-7">
        <div className="relative z-10 mx-auto flex h-full min-h-0 max-w-[1600px] flex-col">
          <div className="grid min-h-0 flex-1 gap-3 lg:grid-cols-[minmax(0,1fr)_minmax(330px,0.68fr)] lg:gap-4">
            <div className="relative min-h-0 overflow-hidden bg-[#111735]">
              <video
                ref={videoRef}
                src="/E-VS.mp4"
                className="size-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-label="E-Visitors visitor management platform"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070b25]/90 via-[#070b25]/15 to-transparent" />
              <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4 text-white sm:inset-x-7 sm:bottom-7">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#65e6d1]">FLAGSHIP PRODUCT / E-VISITORS</p>
                  <p className="mt-2 max-w-md text-sm font-semibold leading-snug sm:text-lg">Every arrival becomes a clearer, safer operation.</p>
                </div>
                <button type="button" onClick={toggleSound} className="grid size-9 shrink-0 place-items-center border border-white/35 bg-black/30 text-white backdrop-blur-sm transition-colors hover:bg-white hover:text-[#111735]" aria-label={muted ? "Turn video sound on" : "Mute video sound"}>
                  {muted ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}
                </button>
              </div>
            </div>

            <article className="flex min-h-0 flex-col overflow-hidden border border-slate-300/80 bg-[#f8f9fc] p-5 sm:p-7 lg:p-8">
              <div className="flex items-center justify-between gap-4 border-b border-slate-200 pb-3">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#0a1f44]">{activeStory.eyebrow}</p>
                <nav className="flex items-center gap-2" aria-label="SAN TECH story slides">
                  {storySlides.map((slide, index) => (
                    <button
                      key={slide.id}
                      type="button"
                      onClick={() => setActiveStoryIndex(index)}
                      className={`text-[10px] font-black tracking-[0.12em] transition-colors ${index === activeStoryIndex ? "text-[#0a1f44]" : "text-slate-400 hover:text-[#0a1f44]"}`}
                      aria-label={`Show ${slide.eyebrow}`}
                    >
                      {slide.index}
                    </button>
                  ))}
                </nav>
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

                    {activeStory.id === "services" && (
                      <div className="mt-5 grid grid-cols-2 gap-2 border-y border-slate-200 py-3 sm:grid-cols-3">
                      {activeStory.services.map((service) => (
                        <span key={service} className="flex min-h-9 items-center border border-slate-200 bg-white px-2.5 py-2 text-[11px] font-bold leading-tight text-slate-700 sm:text-xs">
                          {service}
                        </span>
                      ))}
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="shrink-0 border-y border-slate-200 py-3 sm:py-4">
                <p className="mb-3 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Impact</p>
                <div className="grid grid-cols-3 gap-3">
                  {impactStats.map(([value, suffix, label]) => (
                    <div key={label} className="min-w-0">
                      <p className="font-exo text-[clamp(1.45rem,2.4vw,2.5rem)] font-black leading-none tracking-[-0.06em] text-[#0a1f44]"><ImpactCount value={value} suffix={suffix} /></p>
                      <p className="mt-1 text-[9px] font-bold uppercase leading-tight tracking-[0.08em] text-slate-500">{label}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex shrink-0 flex-wrap gap-2 pt-4">
                <Link href={activeStory.href} className="inline-flex items-center gap-2 bg-[#0a1f44] px-4 py-3 text-xs font-bold text-white transition-colors hover:bg-[#132f61]">
                  {activeStory.action}<ArrowUpRight className="size-3.5" />
                </Link>
                <Link href="/connect" className="inline-flex items-center gap-2 border border-slate-300 bg-white px-4 py-3 text-xs font-bold text-slate-700 transition-colors hover:border-[#0a1f44] hover:text-[#0a1f44]">
                  Request Demo<ArrowUpRight className="size-3.5" />
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      <div className="flex h-[80px] shrink-0 items-center gap-5 overflow-hidden border-t border-slate-300/80 bg-[#f8f9fc] px-4 text-[10px] font-semibold text-slate-500 sm:px-7">
        <span className="z-10 shrink-0 border-r border-slate-300 pr-5 font-black uppercase tracking-[0.2em] text-[#0a1f44]">Partner / Client</span>
        <div className="min-w-0 flex-1 overflow-hidden">
          <motion.div className="santech-partner-loop flex w-max whitespace-nowrap">
            {[0, 1].map((group) => (
              <div key={group} className="flex shrink-0 items-center gap-8 pr-8">
                {partnerBrands.map((partner) => (
                  <PartnerMark key={`${group}-${partner.label}`} partner={partner} />
                ))}
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <footer className="relative flex h-[48px] shrink-0 items-center justify-between gap-4 overflow-hidden bg-[#0c1230] px-4 pb-2 text-[10px] text-white/65 sm:px-7">
        <span>© 2026 SAN TECH. All rights reserved.</span>
        <div className="flex items-center gap-4">
          <Link href="/connect" className="transition-colors hover:text-white">Connect</Link>
          <a href="mailto:info@santechinnovate.com" className="hidden transition-colors hover:text-white sm:inline">info@santechinnovate.com</a>
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

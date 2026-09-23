"use client";

import Link from "next/link";
import { ArrowUpRight, Volume2, VolumeX } from "lucide-react";
import { FaJava } from "react-icons/fa6";
import { TbBrandCSharp } from "react-icons/tb";
import { SiGo, SiJavascript, SiKotlin, SiPhp, SiPython, SiRust, SiTypescript } from "react-icons/si";
import type { IconType } from "react-icons";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { OrbitingCircles } from "@/components/ui/orbiting-circles";
import InfiniteSpiral from "@/components/InfiniteSpiral";

gsap.registerPlugin(useGSAP);

type SlideFeature = {
  title: string;
  detail: string;
};

type HeroSlide = {
  eyebrow: string;
  title: string[];
  body: string;
  featureLabel: string;
  features: SlideFeature[];
  stats?: { value: string; label: string; target: number; suffix?: string }[];
  background: string;
  accent: string;
  visual?: "portal" | "languages";
  video?: string;
};

const slides: HeroSlide[] = [
  {
    eyebrow: "SAN TECH · ENABLE",
    title: ["Ideas into", "impact."],
    body: "We turn ambitious ideas into useful technology, stronger systems, and measurable progress.",
    featureLabel: "Technology · Innovation · Skills · Impact",
    features: [
      { title: "Build", detail: "Digital products that move ideas forward." },
      { title: "Enable", detail: "People, teams, and systems with clarity." },
      { title: "Scale", detail: "Progress that can be seen and measured." },
    ],
    stats: [
      { value: "7+", label: "Years building", target: 7, suffix: "+" },
      { value: "12", label: "Countries reached", target: 12 },
      { value: "10k+", label: "People empowered", target: 10000, suffix: "k+" },
    ],
    background: "linear-gradient(135deg, #f0fdfa 0%, #f8fafc 52%, #e0f2fe 100%)",
    accent: "#0d9488",
    video: "/videos4.mp4",
  },
  {
    eyebrow: "AI · AUGMENT",
    title: ["Make intelligence", "useful."],
    body: "Practical AI that helps teams see more clearly, decide faster, and create with confidence.",
    featureLabel: "AI solutions",
    features: [
      { title: "See clearly", detail: "Turn complex signals into useful insight." },
      { title: "Decide faster", detail: "Give teams confidence at the right moment." },
      { title: "Stay human", detail: "Design intelligence around real people." },
    ],
    background: "linear-gradient(135deg, #faf5ff 0%, #f8fafc 52%, #eef2ff 100%)",
    accent: "#7c3aed",
  },
  {
    eyebrow: "IOT · CONNECT",
    title: ["Connect the", "real world."],
    body: "Connected devices and data flows that make operations more visible, responsive, and human.",
    featureLabel: "IoT & embedded systems",
    features: [
      { title: "Sense", detail: "Listen to the world through connected devices." },
      { title: "Connect", detail: "Move live data where it creates value." },
      { title: "Respond", detail: "Make operations visible and responsive." },
    ],
    background: "linear-gradient(135deg, #ecfeff 0%, #f8fafc 52%, #f0fdf4 100%)",
    accent: "#0891b2",
  },
  {
    eyebrow: "CYBERSECURITY · PROTECT",
    title: ["Build trust into", "everything."],
    body: "Security-minded systems that protect the people, information, and momentum behind your work.",
    featureLabel: "Cybersecurity",
    features: [
      { title: "Harden", detail: "Build protection into the foundation." },
      { title: "Understand", detail: "See risk before it becomes disruption." },
      { title: "Keep moving", detail: "Protect trust, people, and momentum." },
    ],
    background: "linear-gradient(135deg, #fff1f2 0%, #f8fafc 52%, #fdf2f8 100%)",
    accent: "#e11d48",
  },
  {
    eyebrow: "SOFTWARE DEVELOPMENT · SHIP",
    title: ["Build what", "moves people."],
    body: "From a focused prototype to a platform at scale, we make software that is ready for the real world.",
    featureLabel: "Software development",
    features: [
      { title: "Web products", detail: "Fast, focused experiences for the web." },
      { title: "Mobile apps", detail: "Useful tools that travel with your team." },
      { title: "Platforms", detail: "Foundations ready for the next release." },
    ],
    background: "linear-gradient(135deg, #eff6ff 0%, #f8fafc 50%, #f0fdfa 100%)",
    accent: "#2563eb",
    visual: "languages",
  },
  {
    eyebrow: "DIGITAL TRANSFORMATION · SCALE",
    title: ["Change the way", "work moves."],
    body: "Clearer processes, connected teams, and digital foundations built for the next chapter.",
    featureLabel: "Digital transformation",
    features: [
      { title: "Integrate", detail: "Bring disconnected systems into one view." },
      { title: "Simplify", detail: "Replace friction with clear processes." },
      { title: "Align", detail: "Help teams move in the same direction." },
    ],
    background: "linear-gradient(135deg, #f5f3ff 0%, #f8fafc 52%, #ecfeff 100%)",
    accent: "#6d28d9",
  },
  {
    eyebrow: "INNOVATION · EXPLORE",
    title: ["Find the next", "possibility."],
    body: "Research, partnerships, and bold experiments that turn useful questions into new directions.",
    featureLabel: "Innovation Lab",
    features: [
      { title: "Question", detail: "Start with the problem worth solving." },
      { title: "Prototype", detail: "Make new possibilities tangible early." },
      { title: "Partner", detail: "Grow ideas through shared expertise." },
    ],
    background: "linear-gradient(135deg, #f0f9ff 0%, #f8fafc 52%, #e0e7ff 100%)",
    accent: "#0284c7",
  },
  {
    eyebrow: "SAN HUB · GROW",
    title: ["Learn something.", "Build something."],
    body: "Practical pathways for people ready to turn curiosity into capability.",
    featureLabel: "SAN HUB ecosystem",
    features: [
      { title: "Learn", detail: "Practical pathways into new capability." },
      { title: "Connect", detail: "A community that turns knowledge outward." },
      { title: "Contribute", detail: "Track progress from skill to impact." },
    ],
    background: "linear-gradient(135deg, #f0fdf4 0%, #f8fafc 52%, #ecfdf5 100%)",
    accent: "#059669",
  },
  {
    eyebrow: "E-VISITORS · WELCOME",
    title: ["Make every", "arrival count."],
    body: "A calmer, smarter way to understand the people and places you serve.",
    featureLabel: "Smart visitor operations",
    features: [
      { title: "Welcome", detail: "Make every arrival feel considered." },
      { title: "Guide", detail: "Give people a clear path through the space." },
      { title: "Remember", detail: "Turn visits into useful operational insight." },
    ],
    background: "linear-gradient(135deg, #fffbeb 0%, #f8fafc 52%, #f0fdfa 100%)",
    accent: "#d97706",
    video: "/E-VS.mp4",
  },
];

const ctaLinks = [
  { label: "Explore Our Solutions", href: "/innovation-lab" },
  { label: "Join SAN HUB", href: "/san-hub" },
  { label: "Discover E-Visitors", href: "/e-visitors" },
];

const programmingLanguages = [
  { name: "JavaScript", color: "#eab308", icon: SiJavascript },
  { name: "TypeScript", color: "#3178c6", icon: SiTypescript },
  { name: "Python", color: "#0284c7", icon: SiPython },
  { name: "Java", color: "#ea580c", icon: FaJava },
  { name: "C#", color: "#7c3aed", icon: TbBrandCSharp },
  { name: "PHP", color: "#6366f1", icon: SiPhp },
  { name: "Go", color: "#00add8", icon: SiGo },
  { name: "Rust", color: "#c2410c", icon: SiRust },
  { name: "Kotlin", color: "#8b5cf6", icon: SiKotlin },
];

type ProgrammingLanguage = (typeof programmingLanguages)[number] & { icon: IconType };

const outerLanguages = programmingLanguages.filter((_, index) => index % 2 === 0);
const innerLanguages = programmingLanguages.filter((_, index) => index % 2 !== 0);

const recognitionItems = [
  { src: "/certificates/recognition-digital-innovation.png", alt: "SAN TECH digital innovation recognition concept" },
  { src: "/certificates/recognition-community-impact.png", alt: "SAN TECH community impact recognition concept" },
  { src: "/certificates/recognition-technology-excellence.png", alt: "SAN TECH technology excellence recognition concept" },
  { src: "/troph.jpg", alt: "SAN TECH Best Exhibitor recognition" },
  { src: "/certificates/edtech-trust-seal.png", alt: "SAN TECH EdTech trust seal" },
];

function LanguageCard({ language }: { language: ProgrammingLanguage }) {
  const Icon = language.icon;

  return (
    <div className="flex size-12 items-center justify-center rounded-xl border border-slate-200/90 bg-white shadow-[0_4px_14px_rgba(0,0,0,0.06),0_1px_3px_rgba(0,0,0,0.04)] transition-all duration-300 hover:scale-115 hover:border-slate-300 hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] sm:size-14" title={language.name} aria-label={language.name}>
      <Icon className="size-6 sm:size-7" style={{ color: language.color }} aria-hidden="true" />
    </div>
  );
}

function RecognitionSpiral() {
  return (
    <div className="relative size-full overflow-hidden">
      <InfiniteSpiral items={recognitionItems} animationMode="all" speed={0.24} radius={205} cardWidth={156} cardHeight={148} verticalSpacing={58} perspective={1000} cardRadius={10} centerScale={1.2} edgeBlur={0} cardsPerTurn={7} pauseOnHover cardTilt={-1} edgeFade={0.25} imageFit="contain" className="relative z-10" />
      <div className="pointer-events-none absolute inset-x-0 bottom-6 z-20 text-center">
        <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-brand-secondary">Trust & recognition</p>
        <p className="mt-1 text-xs font-medium text-slate-500">Moving with the SAN TECH story</p>
      </div>
    </div>
  );
}

function HeroCtas({ video }: { video: boolean }) {
  return (
    <div data-portal-copy={video ? "true" : undefined} data-video-actions={video ? "true" : undefined} className={`relative z-30 flex w-max max-w-[calc(100vw-2rem)] flex-nowrap gap-2.5 overflow-x-auto pb-1 ${video ? "absolute left-1/2 top-[62%] mx-auto -translate-x-1/2 justify-center" : "mt-8"}`}>
      {ctaLinks.map((cta, ctaIndex) => (
        <Link key={cta.label} href={cta.href} className={`inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-xl px-5 py-3 text-sm font-bold tracking-wide transition-all ${ctaIndex === 0 ? "bg-brand-secondary text-white shadow-md hover:bg-[#1519ad] hover:shadow-lg" : "border border-slate-200/90 bg-white/80 text-slate-800 shadow-sm backdrop-blur-sm hover:border-slate-300 hover:bg-white hover:shadow"}`}>
          {cta.label}<ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      ))}
    </div>
  );
}

function SlideFeatureRail({ slide }: { slide: HeroSlide }) {
  const video = Boolean(slide.video);
  const tone = video ? "text-white" : "text-slate-900";
  const rule = video ? "border-white/25" : "border-slate-900/15";
  const muted = video ? "text-white/65" : "text-slate-500";
  const accent = slide.eyebrow.startsWith("E-VISITORS") ? "text-brand-secondary" : video ? "text-white" : "text-brand-secondary";

  return (
    <div data-portal-copy className={`absolute bottom-16 left-7 z-20 max-w-[min(680px,calc(100%-2rem))] sm:bottom-20 sm:left-12 lg:bottom-14 lg:left-16 ${tone}`}>
      <div className="flex items-center gap-3">
        <span className={`h-px w-8 ${video ? "bg-white/70" : "bg-brand-secondary"}`} aria-hidden="true" />
        <p className={`text-[10px] font-black uppercase tracking-[0.24em] ${accent}`}>{slide.featureLabel}</p>
        <span className={`hidden text-[10px] font-bold tracking-[0.18em] sm:inline ${muted}`}>/ 03</span>
      </div>
      <div className={`mt-4 grid grid-cols-1 border-y ${rule} sm:grid-cols-3`}>
        {slide.stats ? slide.stats.map((stat) => (
          <div key={stat.label} className={`min-w-24 py-3 pr-5 sm:py-4 ${rule} sm:border-r sm:last:border-r-0 sm:pl-5 sm:first:pl-0`}>
            <p data-counter data-counter-target={stat.target} data-counter-suffix={stat.suffix ?? ""} className={`text-3xl font-light leading-none tracking-[-0.06em] sm:text-4xl ${video ? "text-white" : "text-brand-secondary"}`}>{stat.value}</p>
            <p className={`mt-2 text-[10px] font-bold uppercase tracking-[0.12em] ${muted}`}>{stat.label}</p>
          </div>
        )) : slide.features.map((feature, featureIndex) => (
          <div key={feature.title} className={`group relative py-3 pr-5 sm:py-4 ${rule} sm:border-r sm:last:border-r-0 sm:pl-5 sm:first:pl-0`}>
            <div className="flex items-center gap-2">
              <span className={`text-[10px] font-black tracking-[0.16em] ${muted}`}>{String(featureIndex + 1).padStart(2, "0")}</span>
              <span className={`h-1.5 w-1.5 rounded-full ${video ? "bg-white" : "bg-brand-secondary"}`} aria-hidden="true" />
            </div>
            <p className={`mt-2 text-sm font-black tracking-[-0.02em] ${accent}`}>{feature.title}</p>
            <p className={`mt-1 max-w-40 text-[11px] leading-relaxed ${muted}`}>{feature.detail}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ImigongoPattern({ id }: { id: string }) {
  return (
    <svg className="pointer-events-none absolute inset-0 z-0 h-full w-full opacity-[0.11] mix-blend-multiply" viewBox="0 0 800 800" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <pattern id={id} width="240" height="240" patternUnits="userSpaceOnUse">
          <path d="M120 0 240 120 120 240 0 120Z" fill="none" stroke="#0B0E87" strokeWidth="2" />
          <path d="M120 28 212 120 120 212 28 120Z" fill="none" stroke="#0B0E87" strokeWidth="1.25" />
          <path d="M120 64 176 120 120 176 64 120Z" fill="#0B0E87" fillOpacity="0.12" />
          <path d="M0 0 120 120 0 240ZM240 0 120 120 240 240Z" fill="#0B0E87" fillOpacity="0.05" />
          <circle cx="120" cy="120" r="7" fill="#0B0E87" fillOpacity="0.2" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

function getVideoMotionTargets(copy: HTMLElement, actions: HTMLElement) {
  if (window.innerWidth < 768) return null;

  const copyBounds = copy.getBoundingClientRect();
  const actionBounds = actions.getBoundingClientRect();
  const copyScale = 0.8;
  const actionScale = 0.82;
  // Keep the animated copy on the same horizontal rail as the desktop header.
  const copyLeft = window.innerWidth >= 1024 ? 64 : 48;
  const copyTop = Math.min(Math.max(window.innerHeight * 0.2, 140), 220);
  const actionRight = window.innerWidth >= 640 ? 104 : 84;
  const actionBottom = window.innerWidth >= 640 ? 96 : 80;
  const actionLeft = window.innerWidth - actionRight - actionBounds.width * actionScale;
  const actionTop = window.innerHeight - actionBottom - actionBounds.height * actionScale;

  return {
    copyX: copyLeft + (copyBounds.width * copyScale) / 2 - (copyBounds.left + copyBounds.width / 2),
    copyY: copyTop + (copyBounds.height * copyScale) / 2 - (copyBounds.top + copyBounds.height / 2),
    actionX: actionLeft + (actionBounds.width * actionScale) / 2 - (actionBounds.left + actionBounds.width / 2),
    actionY: actionTop + (actionBounds.height * actionScale) / 2 - (actionBounds.top + actionBounds.height / 2),
    copyScale,
    actionScale,
  };
}

function formatCounterValue(value: number, suffix: string) {
  if (suffix === "k+") return `${Math.floor(value / 1000)}k+`;
  return `${Math.round(value)}${suffix}`;
}

function createCounterAnimation(counters: NodeListOf<HTMLElement>, reduceMotion: boolean) {
  const timeline = gsap.timeline();

  counters.forEach((counter, index) => {
    const target = Number(counter.dataset.counterTarget ?? 0);
    const suffix = counter.dataset.counterSuffix ?? "";
    const value = { current: 0 };

    if (reduceMotion) {
      counter.textContent = formatCounterValue(target, suffix);
      return;
    }

    counter.textContent = formatCounterValue(0, suffix);
    timeline.to(value, { current: target, duration: 1.15, ease: "power2.out", onUpdate: () => { counter.textContent = formatCounterValue(value.current, suffix); } }, index * 0.08);
  });

  return timeline;
}

export function HeroVisual() {
  const scope = useRef<HTMLDivElement>(null);
  const previousSlide = useRef(0);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduceMotion.matches) return;

    const advanceAfterVideo = () => setActiveSlide((current) => (current + 1) % slides.length);
    window.addEventListener("santech-hero-video-ended", advanceAfterVideo);

    if (slides[activeSlide]?.video) return () => window.removeEventListener("santech-hero-video-ended", advanceAfterVideo);

    const timer = window.setTimeout(() => setActiveSlide((current) => (current + 1) % slides.length), 5600);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("santech-hero-video-ended", advanceAfterVideo);
    };
  }, [activeSlide]);

  useEffect(() => {
    window.dispatchEvent(new CustomEvent("santech-hero-theme", { detail: { dark: Boolean(slides[activeSlide]?.video) } }));
  }, [activeSlide]);

  useGSAP(() => {
    const incoming = scope.current?.querySelector<HTMLElement>(`[data-slide="${activeSlide}"]`);
    if (!incoming) return;
    const outgoing = scope.current?.querySelector<HTMLElement>(`[data-slide="${previousSlide.current}"]`) ?? incoming;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const incomingCopy = incoming.querySelectorAll<HTMLElement>("[data-portal-copy]");
    const incomingCounters = incoming.querySelectorAll<HTMLElement>("[data-counter]");
    const counterTimeline = createCounterAnimation(incomingCounters, reduceMotion);
    const incomingMark = incoming.querySelector<HTMLElement>("[data-portal-mark]") ?? incoming;
    const incomingVideoCopy = incoming.querySelector<HTMLElement>("[data-video-copy]");
    const incomingVideoActions = incoming.querySelector<HTMLElement>("[data-video-actions]");

    gsap.set(incoming, { xPercent: 0, yPercent: 0, x: 0, y: 0, scale: 1, rotate: 0 });
    gsap.set(incomingMark, { x: 0, y: 0, scale: 1, rotate: 0 });
    if (incomingVideoCopy && incomingVideoActions) {
      gsap.set(incomingVideoCopy, { x: 0, y: 0, scale: 1 });
      gsap.set(incomingVideoActions, { x: 0, y: 0, scale: 1 });
    }
    const videoTargets = incomingVideoCopy && incomingVideoActions ? getVideoMotionTargets(incomingVideoCopy, incomingVideoActions) : null;
    const initialMount = previousSlide.current === activeSlide;

    if (reduceMotion || initialMount) {
      gsap.set("[data-portal-slide]", { autoAlpha: 0, xPercent: 0, scale: 1 });
      gsap.set(incoming, { autoAlpha: 1 });
      gsap.set(incomingCopy, { autoAlpha: 1, y: 0 });
      if (reduceMotion && videoTargets && incomingVideoCopy && incomingVideoActions) {
        gsap.set(incomingVideoCopy, { x: videoTargets.copyX, y: videoTargets.copyY, scale: videoTargets.copyScale });
        gsap.set(incomingVideoActions, { x: videoTargets.actionX, y: videoTargets.actionY, scale: videoTargets.actionScale });
      }
      previousSlide.current = activeSlide;

      if (!reduceMotion && initialMount && videoTargets && incomingVideoCopy && incomingVideoActions) {
        const introTimeline = gsap.timeline({ defaults: { overwrite: "auto" } });
        introTimeline.to(incomingVideoCopy, { x: videoTargets.copyX, y: videoTargets.copyY, scale: videoTargets.copyScale, duration: 1.1, delay: 1.2, ease: "power3.inOut" }).to(incomingVideoActions, { x: videoTargets.actionX, y: videoTargets.actionY, scale: videoTargets.actionScale, duration: 1.1, ease: "power3.inOut" }, "<");
        return () => { introTimeline.kill(); counterTimeline.kill(); };
      }

      return () => counterTimeline.kill();
    }

    const timeline = gsap.timeline({ defaults: { overwrite: "auto" } });
    timeline.to(outgoing, { autoAlpha: 0, xPercent: -10, scale: 1.12, duration: 0.72, ease: "power3.inOut" }, 0).fromTo(incoming, { autoAlpha: 0, xPercent: 12, scale: 1.14 }, { autoAlpha: 1, xPercent: 0, scale: 1, duration: 0.92, ease: "power3.out" }, 0.12).fromTo(incomingCopy, { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.48, stagger: 0.06, ease: "power2.out" }, 0.44).fromTo(incomingMark, { scale: 0.84, rotate: -4 }, { scale: 1, rotate: 0, duration: 0.8, ease: "back.out(1.2)" }, 0.2);

    if (videoTargets && incomingVideoCopy && incomingVideoActions) {
      timeline.to(incomingVideoCopy, { x: videoTargets.copyX, y: videoTargets.copyY, scale: videoTargets.copyScale, duration: 1.1, ease: "power3.inOut" }, 1.25).to(incomingVideoActions, { x: videoTargets.actionX, y: videoTargets.actionY, scale: videoTargets.actionScale, duration: 1.1, ease: "power3.inOut" }, "<");
    }

    previousSlide.current = activeSlide;
    return () => { timeline.kill(); counterTimeline.kill(); };
  }, { scope, dependencies: [activeSlide] });

  return (
    <div ref={scope} className="relative mx-auto h-screen w-full max-w-none overflow-hidden rounded-none border-0 bg-slate-50 shadow-none">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_35%,rgba(59,130,246,0.09),transparent_48%),radial-gradient(circle_at_20%_80%,rgba(13,148,136,0.08),transparent_45%)]" />
      <div className="absolute inset-0 opacity-40 [background-image:radial-gradient(rgba(15,23,42,0.12)_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,#000_70%,transparent_100%)]" />
      <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(15,23,42,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.05)_1px,transparent_1px)] [background-size:64px_64px]" />

      {slides.map((slide, index) => (
        <div key={slide.eyebrow} data-portal-slide data-slide={index} className="absolute inset-0 overflow-hidden px-7 pb-8 pt-28 sm:px-12 sm:pb-12 sm:pt-32 lg:px-16 lg:pb-14 lg:pt-36" style={{ background: slide.background }}>
          <ImigongoPattern id={`imigongo-${index}`} />
          <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-56 bg-gradient-to-b from-black/30 via-black/10 to-transparent sm:h-64" />
          <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-48 bg-gradient-to-t from-black/30 via-black/10 to-transparent sm:h-56" />
          {slide.visual === "languages" ? (
            <div className="absolute right-10 top-1/2 aspect-square w-[50%] max-w-[520px] -translate-y-1/2 sm:right-16 sm:w-[45%] lg:right-24 lg:w-[42%] xl:w-[38%]" aria-label="Programming languages orbiting the software development hub">
              <div className="relative size-full"><OrbitingCircles radius={205} duration={32} iconSize={54}>{outerLanguages.map((language) => <LanguageCard key={language.name} language={language} />)}</OrbitingCircles></div>
              <div className="absolute inset-0"><OrbitingCircles radius={125} duration={24} iconSize={54} reverse>{innerLanguages.map((language) => <LanguageCard key={language.name} language={language} />)}</OrbitingCircles></div>
            </div>
          ) : (
            <div data-portal-mark className={slide.video ? "absolute inset-0 z-0 overflow-hidden" : "absolute right-10 top-1/2 flex aspect-square w-[50%] -translate-y-1/2 items-center justify-end overflow-hidden rounded-xl sm:right-16 sm:w-[45%] lg:right-24 lg:w-[42%] xl:w-[38%]"}>
              {slide.video ? <HeroStoryVideo src={slide.video} label={`${slide.eyebrow.split(" · ")[0]} story video`} isActive={activeSlide === index} /> : <RecognitionSpiral />}
            </div>
          )}

          <div className={`relative z-10 flex h-full w-full flex-col justify-center ${slide.video ? "mx-auto max-w-4xl items-start text-left" : "-translate-y-10 max-w-[92%] sm:-translate-y-12 sm:max-w-[75%] lg:-translate-y-16 lg:max-w-[58%] xl:-translate-y-20 xl:max-w-[54%]"}`}>
            <div data-video-copy={slide.video ? "true" : undefined} className={slide.video ? "w-full" : undefined}>
              <h2 data-portal-copy className={`font-exo ${slide.video ? "max-w-none text-[clamp(1.75rem,5.2vw,5.5rem)] text-white drop-shadow-[0_5px_16px_rgba(0,0,0,0.65)]" : "max-w-2xl text-[clamp(2.75rem,5.2vw,5.5rem)] text-slate-900"} font-black leading-[0.94] tracking-[-0.06em]`}>
                {(slide.video ? [slide.title.join(" ")] : slide.title).map((line, lineIndex) => <span key={`${slide.eyebrow}-${lineIndex}`} className="block whitespace-nowrap">{line}</span>)}
              </h2>
              <p data-portal-copy className={`mt-5 max-w-[520px] text-base font-medium leading-relaxed sm:text-lg ${slide.video ? "text-white/75" : "text-slate-600"}`}>{slide.body}</p>
            </div>
            <HeroCtas video={Boolean(slide.video)} />
          </div>
          <SlideFeatureRail slide={slide} />
        </div>
      ))}

      <div className="absolute right-5 top-1/2 z-20 -translate-y-1/2 sm:right-8 lg:right-12" aria-label="Hero slides"><div className="flex flex-col items-center gap-2.5">{slides.map((slide, index) => <button key={slide.eyebrow} type="button" aria-label={`Show ${slide.eyebrow.split(" · ")[0]} slide`} onClick={() => setActiveSlide(index)} className={`rounded-full transition-all duration-300 ${index === activeSlide ? "h-8 w-1.5" : "h-1.5 w-1.5 bg-slate-300 hover:bg-slate-400"}`} style={index === activeSlide ? { background: "#0B0E87" } : undefined} />)}</div></div>

      <div data-hero-footer className="absolute inset-x-7 bottom-5 z-20 flex flex-col items-start gap-1.5 sm:inset-x-12 sm:flex-row sm:items-center sm:justify-between lg:inset-x-16">
        <span className="text-[10px] font-semibold tracking-[0.08em] text-slate-400">© 2026 SAN TECH. All rights reserved.</span>
        <span className="text-[10px] font-medium text-slate-400">Making your ideas happen.</span>
        <a href="mailto:info@santechinnovate.com" className="text-[10px] font-semibold text-brand-secondary transition-colors hover:text-slate-900">info@santechinnovate.com</a>
      </div>
    </div>
  );
}

function HeroStoryVideo({ src, label, isActive }: { src: string; label: string; isActive: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  function handleEnded() { window.dispatchEvent(new Event("santech-hero-video-ended")); }

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    setMuted(true);
    if (isActive) void video.play().catch(() => undefined);
    else video.pause();
  }, [isActive]);

  function toggleSound() {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    if (!video.muted) video.volume = 1;
    setMuted(video.muted);
  }

  return (
    <div className="relative h-full w-full bg-slate-950">
      <video ref={videoRef} className="h-full w-full object-cover" src={src} autoPlay muted playsInline preload="metadata" onEnded={handleEnded} aria-label={label} />
      <button type="button" onClick={toggleSound} className="absolute bottom-20 right-7 z-10 grid size-10 place-items-center rounded-xl border border-white/30 bg-slate-950/70 text-white shadow-lg backdrop-blur-sm transition-colors hover:bg-slate-950 sm:bottom-24 sm:right-12" aria-label={muted ? "Turn video sound on" : "Mute video sound"}>
        {muted ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}
      </button>
    </div>
  );
}

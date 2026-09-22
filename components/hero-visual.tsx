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

type HeroSlide = {
  eyebrow: string;
  title: string[];
  body: string;
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
    background: "linear-gradient(135deg, #f0fdfa 0%, #f8fafc 52%, #e0f2fe 100%)",
    accent: "#0d9488",
    video: "/videos4.mp4",
  },
  {
    eyebrow: "AI · AUGMENT",
    title: ["Make intelligence", "useful."],
    body: "Practical AI that helps teams see more clearly, decide faster, and create with confidence.",
    background: "linear-gradient(135deg, #faf5ff 0%, #f8fafc 52%, #eef2ff 100%)",
    accent: "#7c3aed",
  },
  {
    eyebrow: "IOT · CONNECT",
    title: ["Connect the", "real world."],
    body: "Connected devices and data flows that make operations more visible, responsive, and human.",
    background: "linear-gradient(135deg, #ecfeff 0%, #f8fafc 52%, #f0fdf4 100%)",
    accent: "#0891b2",
  },
  {
    eyebrow: "CYBERSECURITY · PROTECT",
    title: ["Build trust into", "everything."],
    body: "Security-minded systems that protect the people, information, and momentum behind your work.",
    background: "linear-gradient(135deg, #fff1f2 0%, #f8fafc 52%, #fdf2f8 100%)",
    accent: "#e11d48",
  },
  {
    eyebrow: "SOFTWARE DEVELOPMENT · SHIP",
    title: ["Build what", "moves people."],
    body: "From a focused prototype to a platform at scale, we make software that is ready for the real world.",
    background: "linear-gradient(135deg, #eff6ff 0%, #f8fafc 50%, #f0fdfa 100%)",
    accent: "#2563eb",
    visual: "languages",
  },
  {
    eyebrow: "DIGITAL TRANSFORMATION · SCALE",
    title: ["Change the way", "work moves."],
    body: "Clearer processes, connected teams, and digital foundations built for the next chapter.",
    background: "linear-gradient(135deg, #f5f3ff 0%, #f8fafc 52%, #ecfeff 100%)",
    accent: "#6d28d9",
  },
  {
    eyebrow: "INNOVATION · EXPLORE",
    title: ["Find the next", "possibility."],
    body: "Research, partnerships, and bold experiments that turn useful questions into new directions.",
    background: "linear-gradient(135deg, #f0f9ff 0%, #f8fafc 52%, #e0e7ff 100%)",
    accent: "#0284c7",
  },
  {
    eyebrow: "SAN HUB · GROW",
    title: ["Learn something.", "Build something."],
    body: "Practical pathways for people ready to turn curiosity into capability.",
    background: "linear-gradient(135deg, #f0fdf4 0%, #f8fafc 52%, #ecfdf5 100%)",
    accent: "#059669",
  },
  {
    eyebrow: "E-VISITORS · WELCOME",
    title: ["Make every", "arrival count."],
    body: "A calmer, smarter way to understand the people and places you serve.",
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
  {
    src: "/certificates/recognition-digital-innovation.png",
    alt: "SAN TECH digital innovation recognition concept",
  },
  {
    src: "/certificates/recognition-community-impact.png",
    alt: "SAN TECH community impact recognition concept",
  },
  {
    src: "/certificates/recognition-technology-excellence.png",
    alt: "SAN TECH technology excellence recognition concept",
  },
  {
    src: "/troph.jpg",
    alt: "SAN TECH Best Exhibitor recognition",
  },
  {
    src: "/certificates/edtech-trust-seal.png",
    alt: "SAN TECH EdTech trust seal",
  },
];

function LanguageCard({ language }: { language: ProgrammingLanguage }) {
  const Icon = language.icon;

  return (
    <div
      className="flex items-center justify-center size-12 sm:size-14 rounded-xl bg-white border border-slate-200/90 shadow-[0_4px_14px_rgba(0,0,0,0.06),0_1px_3px_rgba(0,0,0,0.04)] transition-all duration-300 hover:scale-115 hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] hover:border-slate-300"
      title={language.name}
      aria-label={language.name}
    >
      <Icon className="size-6 sm:size-7" style={{ color: language.color }} aria-hidden="true" />
    </div>
  );
}

function RecognitionSpiral() {
  return (
    <div className="relative size-full overflow-hidden">
      <InfiniteSpiral
        items={recognitionItems}
        animationMode="all"
        speed={0.24}
        radius={205}
        cardWidth={156}
        cardHeight={112}
        verticalSpacing={48}
        perspective={1000}
        cardRadius={10}
        centerScale={1.2}
        edgeBlur={2}
        cardsPerTurn={7}
        pauseOnHover
        cardTilt={-1}
        edgeFade={0.25}
        className="relative z-10"
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-6 z-20 text-center">
        <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-brand-secondary">Trust & recognition</p>
        <p className="mt-1 text-xs font-medium text-slate-500">Moving with the SAN TECH story</p>
      </div>
    </div>
  );
}

function HeroCtas({ video }: { video: boolean }) {
  return (
    <div data-portal-copy={video ? "true" : undefined} data-video-actions={video ? "true" : undefined} className={`flex max-w-[480px] flex-wrap gap-2.5 ${video ? "absolute left-1/2 top-[62%] mx-auto w-max max-w-[calc(100%-2rem)] -translate-x-1/2 justify-center" : "mt-8"}`}>
      {ctaLinks.map((cta, ctaIndex) => (
        <Link
          key={cta.label}
          href={cta.href}
          className={`inline-flex items-center gap-1.5 rounded-full px-4.5 py-2.5 text-[11px] font-bold tracking-wide transition-all ${
            ctaIndex === 0
              ? video
                ? "bg-brand-secondary text-white shadow-md hover:bg-[#1519ad] hover:shadow-lg"
                : "bg-slate-900 text-white shadow-md hover:bg-slate-800 hover:shadow-lg"
              : "border border-slate-200/90 bg-white/80 text-slate-800 shadow-sm backdrop-blur-sm hover:border-slate-300 hover:bg-white hover:shadow"
          }`}
        >
          {cta.label}<ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      ))}
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
  const copyLeft = Math.min(Math.max(window.innerWidth * 0.06, 48), 120);
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

export function HeroVisual() {
  const scope = useRef<HTMLDivElement>(null);
  const previousSlide = useRef(0);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduceMotion.matches) return;

    const advanceAfterVideo = () => {
      setActiveSlide((current) => (current + 1) % slides.length);
    };
    window.addEventListener("santech-hero-video-ended", advanceAfterVideo);

    if (slides[activeSlide]?.video) {
      return () => window.removeEventListener("santech-hero-video-ended", advanceAfterVideo);
    }

    const timer = window.setTimeout(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 5600);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("santech-hero-video-ended", advanceAfterVideo);
    };
  }, [activeSlide]);

  useEffect(() => {
    window.dispatchEvent(new CustomEvent("santech-hero-theme", { detail: { dark: Boolean(slides[activeSlide]?.video) } }));
  }, [activeSlide]);

  useGSAP(
    () => {
      const incoming = scope.current?.querySelector<HTMLElement>(`[data-slide="${activeSlide}"]`);
      if (!incoming) return;
      const outgoing = scope.current?.querySelector<HTMLElement>(`[data-slide="${previousSlide.current}"]`) ?? incoming;
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const incomingCopy = incoming.querySelectorAll<HTMLElement>("[data-portal-copy]");
      const incomingMark = incoming.querySelector<HTMLElement>("[data-portal-mark]") ?? incoming;
      const incomingVideoCopy = incoming.querySelector<HTMLElement>("[data-video-copy]");
      const incomingVideoActions = incoming.querySelector<HTMLElement>("[data-video-actions]");
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
          introTimeline
            .to(incomingVideoCopy, { x: videoTargets.copyX, y: videoTargets.copyY, scale: videoTargets.copyScale, duration: 1.1, delay: 1.2, ease: "power3.inOut" })
            .to(incomingVideoActions, { x: videoTargets.actionX, y: videoTargets.actionY, scale: videoTargets.actionScale, duration: 1.1, ease: "power3.inOut" }, "<");
          return () => introTimeline.kill();
        }

        return;
      }

      const timeline = gsap.timeline({ defaults: { overwrite: "auto" } });
      timeline
        .to(outgoing, { autoAlpha: 0, xPercent: -10, scale: 1.12, duration: 0.72, ease: "power3.inOut" }, 0)
        .fromTo(incoming, { autoAlpha: 0, xPercent: 12, scale: 1.14 }, { autoAlpha: 1, xPercent: 0, scale: 1, duration: 0.92, ease: "power3.out" }, 0.12)
        .fromTo(incomingCopy, { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.48, stagger: 0.06, ease: "power2.out" }, 0.44)
        .fromTo(incomingMark, { scale: 0.84, rotate: -4 }, { scale: 1, rotate: 0, duration: 0.8, ease: "back.out(1.2)" }, 0.2);

      if (videoTargets && incomingVideoCopy && incomingVideoActions) {
        timeline
          .to(incomingVideoCopy, { x: videoTargets.copyX, y: videoTargets.copyY, scale: videoTargets.copyScale, duration: 1.1, ease: "power3.inOut" }, 1.25)
          .to(incomingVideoActions, { x: videoTargets.actionX, y: videoTargets.actionY, scale: videoTargets.actionScale, duration: 1.1, ease: "power3.inOut" }, "<");
      }

      previousSlide.current = activeSlide;
      return () => timeline.kill();
    },
    { scope, dependencies: [activeSlide] },
  );

  return (
    <div ref={scope} className="relative mx-auto h-screen w-full max-w-none overflow-hidden rounded-none border-0 bg-slate-50 shadow-none">
      {/* Background texture layers: radial ambient mesh, dot matrix, and subtle technical grid */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_35%,rgba(59,130,246,0.09),transparent_48%),radial-gradient(circle_at_20%_80%,rgba(13,148,136,0.08),transparent_45%)]" />
      <div className="absolute inset-0 opacity-40 [background-image:radial-gradient(rgba(15,23,42,0.12)_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,#000_70%,transparent_100%)]" />
      <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(15,23,42,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.05)_1px,transparent_1px)] [background-size:64px_64px]" />

      {slides.map((slide, index) => (
        <div key={slide.eyebrow} data-portal-slide data-slide={index} className="absolute inset-0 overflow-hidden px-7 pb-8 pt-28 sm:px-12 sm:pb-12 sm:pt-32 lg:px-16 lg:pb-14 lg:pt-36" style={{ background: slide.background, opacity: index === 0 ? 1 : 0, visibility: index === 0 ? "visible" : "hidden" }}>
          <ImigongoPattern id={`imigongo-${index}`} />
          {slide.visual === "languages" ? (
            <div className="absolute top-1/2 right-10 aspect-square w-[50%] -translate-y-1/2 max-w-[520px] sm:right-16 sm:w-[45%] lg:right-24 lg:w-[42%] xl:w-[38%]" aria-label="Programming languages orbiting the software development hub">
              <div className="relative size-full">
                <OrbitingCircles radius={205} duration={32} iconSize={54}>
                  {outerLanguages.map((language) => (
                    <LanguageCard key={language.name} language={language} />
                  ))}
                </OrbitingCircles>
              </div>
              <div className="absolute inset-0">
                <OrbitingCircles radius={125} duration={24} iconSize={54} reverse>
                  {innerLanguages.map((language) => (
                    <LanguageCard key={language.name} language={language} />
                  ))}
                </OrbitingCircles>
              </div>
            </div>
          ) : (
            <div data-portal-mark className={slide.video ? "absolute inset-0 z-0 overflow-hidden" : "absolute top-1/2 right-10 flex aspect-square w-[50%] -translate-y-1/2 items-center justify-end overflow-hidden rounded-[2rem] sm:right-16 sm:w-[45%] lg:right-24 lg:w-[42%] xl:w-[38%]"}>
              {slide.video ? (
                <HeroStoryVideo src={slide.video} label={`${slide.eyebrow.split(" Â· ")[0]} story video`} isActive={activeSlide === index} />
              ) : (
                <RecognitionSpiral />
              )}
            </div>
          )}

          {/* Center video-slide copy; keep the focused left composition for non-video slides. */}
          <div className={`relative z-10 flex h-full w-full flex-col justify-center ${slide.video ? "mx-auto max-w-4xl items-center text-center" : "max-w-[92%] sm:max-w-[75%] lg:max-w-[58%] xl:max-w-[54%]"}`}>
            <div data-video-copy={slide.video ? "true" : undefined} className={slide.video ? "w-full" : undefined}>
              <h2 data-portal-copy className={`${slide.video ? "max-w-none text-[clamp(1.75rem,5.2vw,5.5rem)] text-white drop-shadow-[0_5px_16px_rgba(0,0,0,0.65)]" : "max-w-2xl text-[clamp(2.75rem,5.2vw,5.5rem)] text-slate-900"} font-black leading-[0.94] tracking-[-0.06em]`}>
                {(slide.video ? [slide.title.join(" ")] : slide.title).map((line, lineIndex) => (
                  <span key={`${slide.eyebrow}-${lineIndex}`} className="block whitespace-nowrap">
                    {line}
                  </span>
                ))}
              </h2>
              <p data-portal-copy className={`mt-5 max-w-[480px] text-sm font-medium leading-relaxed sm:text-base ${slide.video ? "mx-auto text-white/75" : "text-slate-600"}`}>
                {slide.body}
              </p>
            </div>
            <HeroCtas video={Boolean(slide.video)} />
          </div>
        </div>
      ))}

      {/* Vertical slide nav dots — right side */}
      <div className="absolute right-5 top-1/2 z-20 -translate-y-1/2 sm:right-8 lg:right-12" aria-label="Hero slides">
        <div className="flex flex-col items-center gap-2.5">
          {slides.map((slide, index) => (
            <button
              key={slide.eyebrow}
              type="button"
              aria-label={`Show ${slide.eyebrow.split(" · ")[0]} slide`}
              onClick={() => setActiveSlide(index)}
              className={`rounded-full transition-all duration-300 ${index === activeSlide ? "h-8 w-1.5" : "h-1.5 w-1.5 bg-slate-300 hover:bg-slate-400"}`}
              style={index === activeSlide ? { background: slide.accent } : undefined}
            />
          ))}
        </div>
      </div>

      {/* Footer content — bottom */}
      <div className="absolute inset-x-7 bottom-5 z-20 flex flex-col items-start gap-1 sm:inset-x-12 sm:flex-row sm:items-center sm:justify-between lg:inset-x-16">
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

  function handleEnded() {
    window.dispatchEvent(new Event("santech-hero-video-ended"));
  }

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    setMuted(true);

    if (isActive) {
      void video.play().catch(() => undefined);
    } else {
      video.pause();
    }
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
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-56 bg-gradient-to-b from-slate-950/75 via-slate-950/30 to-transparent sm:h-64" />
      <button type="button" onClick={toggleSound} className="absolute bottom-20 right-7 z-10 grid size-10 place-items-center rounded-full border border-white/30 bg-slate-950/70 text-white shadow-lg backdrop-blur-sm transition-colors hover:bg-slate-950 sm:bottom-24 sm:right-12" aria-label={muted ? "Turn video sound on" : "Mute video sound"}>
        {muted ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}
      </button>
    </div>
  );
}

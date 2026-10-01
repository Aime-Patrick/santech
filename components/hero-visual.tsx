"use client";

import Image from "next/image";
import Link from "next/link";
import { 
  Volume2, 
  VolumeX, 
  ExternalLink,
  ArrowRight
} from "lucide-react";
import { 
  FaInstagram, 
  FaXTwitter, 
  FaYoutube, 
  FaLinkedinIn, 
  FaJava 
} from "react-icons/fa6";
import { TbBrandCSharp } from "react-icons/tb";
import { 
  SiGo, 
  SiJavascript, 
  SiKotlin, 
  SiPhp, 
  SiPython, 
  SiRust, 
  SiTypescript 
} from "react-icons/si";
import type { IconType } from "react-icons";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { OrbitingCircles } from "@/components/ui/orbiting-circles";
import InfiniteSpiral from "@/components/InfiniteSpiral";
import { clientLogos, dynamicStats, heroCTAs } from "@/lib/site-data";

gsap.registerPlugin(useGSAP);

type Language = "en" | "rw";

const heroImageItems = [
  { src: "/images/team.jpg", alt: "SAN TECH team and community" },
  { src: "/images/fieldwork.jpg", alt: "SAN TECH community fieldwork" },
  { src: "/images/summit.jpg", alt: "SAN TECH innovation summit" },
  { src: "/images/graduates.jpg", alt: "SAN TECH graduates and learners" },
  { src: "/certificates/recognition-digital-innovation.png", alt: "SAN TECH digital innovation recognition" },
  { src: "/certificates/recognition-community-impact.png", alt: "SAN TECH community impact recognition" },
  { src: "/certificates/recognition-technology-excellence.png", alt: "SAN TECH technology excellence recognition" },
  { src: "/troph.jpg", alt: "SAN TECH Best Exhibitor recognition" },
  { src: "/certificates/edtech-trust-seal.png", alt: "SAN TECH EdTech trust seal" },
] as const;

type SlideData = {
  id: string;
  eyebrowEn: string;
  eyebrowRw: string;
  titleEn: string;
  titleRw: string;
  subtitleEn: string;
  subtitleRw: string;
  bodyEn: string;
  bodyRw: string;
  badgeEn: string;
  badgeRw: string;
  badgeHref: string;
  cardTitleEn: string;
  cardTitleRw: string;
  statLabelEn: string;
  statLabelRw: string;
  statValueEn: string;
  statValueRw: string;
  gallery: readonly (typeof heroImageItems)[number][];
  image?: string;
  video?: string;
  visual?: "languages" | "recognition";
};

const heroSlides: SlideData[] = [
  {
    id: "santech-lead",
    gallery: [heroImageItems[0], heroImageItems[2], heroImageItems[4]],
    eyebrowEn: "SMART TECHNOLOGIES · INNOVATION · IMPACT",
    eyebrowRw: "IKORANABUHANGA · UDUSHYA · ITERAMBERE",
    titleEn: "From Local Innovation to Technology Manufacturing & Digital Transformation",
    titleRw: "Kuva ku Gushakira Ibisubizo Hano Iwacu kugeza ku Gukora Ikoranabuhanga Rikomeye",
    subtitleEn: "Technology. Innovation. Skills. Impact.",
    subtitleRw: "Ikoranabuhanga. Udushya. Ubumenyi. Iterambere.",
    bodyEn: "We build smart solutions, develop top African tech talent, and create transformative digital systems for a connected, prosperous Africa.",
    bodyRw: "Twubaka ibisubizo by'ikoranabuhanga bugezweho, tugaha ubumenyi urubyiruko rw'u Rwanda n'Afurika, tugateza imbere ubukungu bushingiye ku ikoranabuhanga.",
    badgeEn: "Discover SAN TECH",
    badgeRw: "Vumbura SAN TECH",
    badgeHref: "/our-legacy",
    cardTitleEn: "SAN TECH at a Glance",
    cardTitleRw: "SAN TECH mu Mibare",
    statLabelEn: "Beneficiaries & Innovators",
    statLabelRw: "Abamaze Guhabwa Ubumenyi",
    statValueEn: "10k+ Empowered",
    statValueRw: "10k+ bahawe ubumenyi",
    video: "/videos4.mp4",
  },
  {
    id: "cls-mis",
    gallery: [heroImageItems[1], heroImageItems[3], heroImageItems[5]],
    eyebrowEn: "COMMUNITY LISTENING SYSTEMS · MIS",
    eyebrowRw: "SISITEMU ZO KUMVA ABATURAGE · CLS & MIS",
    titleEn: "Community Listening Systems (CLS) and Management Information Systems (MIS)",
    titleRw: "Community Listening Systems (CLS) and Management Information Systems (MIS)",
    subtitleEn: "For you & your community",
    subtitleRw: "Kuri wowe",
    bodyEn: "Advancing community voices through faith-based and technology-enabled collaboration. Join our network supporting health, unity, and sustainable systems across Rwanda.",
    bodyRw: "Guteza imbere amajwi y'umuryango binyuze mu bufatanye bushingiye ku myemerere. Jya mu muryango wacu w'iyobokamana ushyigikira ubuzima, ubumwe, n'iterambere rirambye mu Rwanda.",
    badgeEn: "Share your idea now",
    badgeRw: "Tanga igitekerezo ubu",
    badgeHref: "/connect",
    cardTitleEn: "Training & Fieldwork Outcomes",
    cardTitleRw: "Ibyavuye mu Mahugurwa",
    statLabelEn: "Community Health & Tech Advisors",
    statLabelRw: "Abajyanama b'Ubuzima b'Abaturage",
    statValueEn: "450+ Trained",
    statValueRw: "450+ bahuguwe",
    image: "/images/graduates.jpg",
  },
  {
    id: "e-visitors",
    gallery: [heroImageItems[7], heroImageItems[8], heroImageItems[6]],
    eyebrowEn: "E-VISITORS · FLAGSHIP PRODUCT",
    eyebrowRw: "E-VISITORS · SISITEMU Y'ABASHYITSI",
    titleEn: "Smart Visitor, Access & Attendance Management Platform",
    titleRw: "Kwakira Abashyitsi no Gucunga Ibigo mu Buryo Bugezweho bwa E-Visitors",
    subtitleEn: "Security & Operational Intelligence",
    subtitleRw: "Umutekano & Ubudasa",
    bodyEn: "Automated visitor registration, instant badge issuance, ID/OCR scanning, VIP tracking, and real-time security audit trails deployed in 47+ institutions.",
    bodyRw: "Sisitemu ifasha ibigo bya leta n'iby'abikorera gucunga no kwandika abashyitsi mu buryo bwihuse, bunoze kandi buha umutekano uzuye ibiro n'ahakorerwa.",
    badgeEn: "Request E-Visitors Demo",
    badgeRw: "Tangira E-Visitors",
    badgeHref: "/e-visitors",
    cardTitleEn: "E-Visitors Deployment",
    cardTitleRw: "Ibigo Bikoresha E-Visitors",
    statLabelEn: "Active Deployments",
    statLabelRw: "Ibigo bya Leta n'Ibyigenga",
    statValueEn: "47+ Institutions",
    statValueRw: "47+ Ibigo",
    video: "/E-VS.mp4",
  },
  {
    id: "software-dev",
    gallery: [heroImageItems[6], heroImageItems[4], heroImageItems[2]],
    eyebrowEn: "SOFTWARE DEVELOPMENT & AI · SHIP",
    eyebrowRw: "IKORANABUHANGA & AI · POROGARAMU",
    titleEn: "Engineering Resilient Software, AI Systems & Embedded IoT",
    titleRw: "Twubaka Porogaramu za Mudasobwa, AI na Sisitemu z'Ikoranabuhanga",
    subtitleEn: "Cutting-edge Modern Stacks",
    subtitleRw: "Ubuhanga & Ubuziranenge",
    bodyEn: "From focused prototypes to national-scale platforms, we engineer resilient software using Next.js, Python, TypeScript, Java, Go, and enterprise cloud frameworks.",
    bodyRw: "Uhereye ku mishinga mito kugeza kuri porogaramu zikomeye z'ibigo bya leta n'ibyigenga, twubaka ikoranabuhanga rikomeye rikoresha indimi zigezweho zo ku rwego rw'isi.",
    badgeEn: "Explore Innovation Lab",
    badgeRw: "Reba Innovation Lab",
    badgeHref: "/innovation-lab",
    cardTitleEn: "Active Engineering Stacks",
    cardTitleRw: "Indimi Z'Ikoranabuhanga",
    statLabelEn: "Supported Languages & Tools",
    statLabelRw: "Indimi n'Ikoranabuhanga",
    statValueEn: "9+ Modern Stacks",
    statValueRw: "9+ Stacks Zikoreshwa",
    visual: "languages",
  },
  {
    id: "san-hub",
    gallery: [heroImageItems[3], heroImageItems[5], heroImageItems[7]],
    eyebrowEn: "SAN HUB · DIGITAL ECOSYSTEM",
    eyebrowRw: "SAN HUB · GUHANGA UDUSHYA",
    titleEn: "Practical Capacity Building for the Next Generation of African Creators",
    titleRw: "Urubuga rwo Kwiga no Guhanga Udushya ku Urubyiruko rw'u Rwanda n'Afurika",
    subtitleEn: "Curiosity into Capability",
    subtitleRw: "Ubumenyi & Amahirwe",
    bodyEn: "Hands-on bootcamps, apprenticeships, verified certifications, and mentorship equipping youth with high-demand engineering and AI skills.",
    bodyRw: "Amahugurwa y'ikoranabuhanga, ubumenyi bugezweho muri AI, ubuhanga bwo gukora porogaramu, no guhuza urubyiruko n'amahirwe yo kwiteza imbere.",
    badgeEn: "Join SAN HUB Cohort",
    badgeRw: "Injira muri SAN HUB",
    badgeHref: "/san-hub",
    cardTitleEn: "SAN HUB Ecosystem",
    cardTitleRw: "SAN HUB Hub & Innovation",
    statLabelEn: "Graduates & Active Members",
    statLabelRw: "Urubyiruko n'Abanyeshuri",
    statValueEn: "2,500+ Graduates",
    statValueRw: "2,500+ Bahuguwe",
    visual: "recognition",
  },
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

const slideImpactIndexes: Record<string, number[]> = {
  "santech-lead": [0, 1, 2],
  "cls-mis": [1, 3, 5],
  "e-visitors": [2, 4, 0],
  "software-dev": [3, 4, 2],
  "san-hub": [5, 0, 3],
};

function LanguageCard({ language }: { language: ProgrammingLanguage }) {
  const Icon = language.icon;
  return (
    <div 
      className="flex size-11 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-md transition-all duration-300 hover:scale-110 sm:size-13" 
      title={language.name} 
      aria-label={language.name}
    >
      <Icon className="size-5 sm:size-6" style={{ color: language.color }} aria-hidden="true" />
    </div>
  );
}

export function HeroVisual() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [impactIndex, setImpactIndex] = useState(0);
  const [language, setLanguage] = useState<Language>("en");
  const previousSlide = useRef(0);
  const slideContainerRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const slideCardRef = useRef<HTMLDivElement>(null);
  const impactStackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedLang = localStorage.getItem("santech_lang") as Language | null;
    if (savedLang === "en" || savedLang === "rw") {
      setLanguage(savedLang);
    }

    const handleLangChange = (event: Event) => {
      const detail = (event as CustomEvent<{ lang?: Language }>).detail;
      if (detail?.lang) {
        setLanguage(detail.lang);
      }
    };

    window.addEventListener("santech-language-change", handleLangChange);
    return () => window.removeEventListener("santech-language-change", handleLangChange);
  }, []);

  // Auto advance slides unless current is a video that handles its own timing
  useEffect(() => {
    const advanceAfterVideo = () => setActiveSlide((current) => (current + 1) % heroSlides.length);
    window.addEventListener("santech-hero-video-ended", advanceAfterVideo);

    if (heroSlides[activeSlide]?.video) {
      return () => window.removeEventListener("santech-hero-video-ended", advanceAfterVideo);
    }

    const timer = window.setTimeout(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length);
    }, 7000);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("santech-hero-video-ended", advanceAfterVideo);
    };
  }, [activeSlide]);

  useEffect(() => {
    setImpactIndex(0);
    const timer = window.setInterval(() => {
      setImpactIndex((current) => (current + 1) % 3);
    }, 2600);

    return () => window.clearInterval(timer);
  }, [activeSlide]);

  useGSAP(() => {
    const incoming = slideContainerRef.current?.querySelector<HTMLElement>(`[data-slide-index="${activeSlide}"]`);
    if (!incoming) return;
    const outgoing = slideContainerRef.current?.querySelector<HTMLElement>(`[data-slide-index="${previousSlide.current}"]`) ?? incoming;
    
    if (previousSlide.current === activeSlide) {
      gsap.set("[data-hero-slide-item]", { autoAlpha: 0 });
      gsap.set(incoming, { autoAlpha: 1 });
      return;
    }

    gsap.timeline({ defaults: { overwrite: "auto" } })
      .to(outgoing, { autoAlpha: 0, duration: 0.5, ease: "power2.inOut" }, 0)
      .fromTo(incoming, { autoAlpha: 0, scale: 1.02 }, { autoAlpha: 1, scale: 1, duration: 0.6, ease: "power2.out" }, 0.1);

    previousSlide.current = activeSlide;
  }, { scope: slideContainerRef, dependencies: [activeSlide] });

  const currentSlide = heroSlides[activeSlide];
  const activeGallery = currentSlide.gallery;
  const activeImpactStats = (slideImpactIndexes[currentSlide.id] ?? [0, 1, 2]).map((statIndex) => dynamicStats[statIndex]);
  const metricOptions = currentSlide.id === "santech-lead"
    ? activeImpactStats
    : [{
        value: language === "rw" ? currentSlide.statValueRw : currentSlide.statValueEn,
        label: language === "rw" ? currentSlide.statLabelRw : currentSlide.statLabelEn,
      }];
  const activeMetricIndex = currentSlide.id === "santech-lead" ? impactIndex : 0;

  useGSAP(() => {
    const cards = galleryRef.current?.querySelectorAll<HTMLElement>("[data-gallery-card]");
    if (!cards?.length) return;

    gsap.fromTo(
      cards,
      { autoAlpha: 0, y: 14, scale: 0.97 },
      { autoAlpha: 1, y: 0, scale: 1, duration: 0.45, stagger: 0.08, ease: "power2.out", overwrite: true },
    );
  }, { scope: galleryRef, dependencies: [activeSlide] });

  useGSAP(() => {
    const card = slideCardRef.current;
    if (!card) return;

    gsap.fromTo(
      card,
      { autoAlpha: 0, y: 36 },
      { autoAlpha: 1, y: 0, duration: 0.65, delay: 0.12, ease: "power3.out", overwrite: true },
    );
  }, { scope: slideCardRef, dependencies: [activeSlide] });

  useGSAP(() => {
    const stack = impactStackRef.current;
    if (!stack) return;

    const cards = stack.querySelectorAll<HTMLElement>("[data-impact-card]");
    const activeCard = stack.querySelector<HTMLElement>(`[data-impact-index="${activeMetricIndex}"]`);
    if (!cards.length || !activeCard) return;

    gsap.set(cards, { autoAlpha: 0, y: 10 });
    gsap.to(activeCard, { autoAlpha: 1, y: 0, duration: 0.35, ease: "power2.out", overwrite: true });
  }, { scope: impactStackRef, dependencies: [activeSlide, activeMetricIndex] });


  return (
    <div className="relative h-full min-h-0 w-full overflow-hidden bg-slate-100/70 p-3 sm:p-4 lg:p-5">
      {/* 3-Column / Asymmetrical Layout Matching User's Reference with #333292 Brand Scheme */}
      <div className="mx-auto flex h-full min-h-0 max-w-[1440px] flex-col">
        <div className="grid min-h-0 flex-1 grid-cols-1 gap-3 sm:gap-4 lg:grid-cols-12 lg:items-stretch">
          
          {/* ========================================================
              LEFT COLUMN: Active Slide Showcase (~6 cols on desktop)
             ======================================================== */}
          <div className="relative lg:col-span-6 xl:col-span-6 flex flex-col justify-between overflow-hidden rounded-none bg-[#1e1b4b] shadow-xl border border-slate-200/40 min-h-[380px] sm:min-h-[460px] lg:min-h-full">
            
            {/* Slide media container */}
            <div ref={slideContainerRef} className="absolute inset-0 size-full overflow-hidden">
              {heroSlides.map((slide, index) => (
                <div
                  key={slide.id}
                  data-hero-slide-item
                  data-slide-index={index}
                  className="absolute inset-0 size-full overflow-hidden"
                >
                  {slide.video ? (
                    <HeroVideoPlayer
                      src={slide.video}
                      isActive={activeSlide === index}
                      label={slide.titleEn}
                    />
                  ) : slide.visual === "languages" ? (
                    <div className="relative flex size-full items-center justify-center bg-gradient-to-br from-[#1e1b4b] via-[#333292] to-slate-950 p-6">
                      <div className="relative aspect-square w-[75%] max-w-[360px]">
                        <div className="relative size-full">
                          <OrbitingCircles radius={135} duration={28} iconSize={44}>
                            {outerLanguages.map((lang) => (
                              <LanguageCard key={lang.name} language={lang} />
                            ))}
                          </OrbitingCircles>
                        </div>
                        <div className="absolute inset-0">
                          <OrbitingCircles radius={80} duration={20} iconSize={44} reverse>
                            {innerLanguages.map((lang) => (
                              <LanguageCard key={lang.name} language={lang} />
                            ))}
                          </OrbitingCircles>
                        </div>
                      </div>
                    </div>
                  ) : slide.visual === "recognition" ? (
                    <div className="relative flex size-full items-center justify-center bg-gradient-to-br from-[#1e1b4b] via-[#333292] to-slate-950 p-4">
                      <div className="relative size-full overflow-hidden">
                        <InfiniteSpiral
                          items={[...activeGallery]}
                          animationMode="all"
                          speed={0.25}
                          radius={160}
                          cardWidth={130}
                          cardHeight={120}
                          verticalSpacing={48}
                          perspective={800}
                          cardRadius={8}
                          centerScale={1.15}
                          edgeBlur={0}
                          cardsPerTurn={6}
                          pauseOnHover
                          edgeFade={0.2}
                          imageFit="contain"
                        />
                      </div>
                    </div>
                  ) : slide.image ? (
                    <div className="relative size-full">
                      <Image
                        src={slide.image}
                        alt={slide.titleEn}
                        fill
                        className="object-cover object-center"
                        priority
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10" />
                    </div>
                  ) : null}
                </div>
              ))}
            </div>

            {/* Subtle top gradient overlay */}
            <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-20 bg-gradient-to-b from-black/50 to-transparent" />

            {/* LOWER OVERLAY CARD (Bottom-Left Badge from Reference in #333292) */}
            <div className="relative z-20 mt-auto p-4 sm:p-6">
              <div ref={slideCardRef} className="relative w-full max-w-lg overflow-hidden rounded-xl border border-white/20 bg-[#333292]/95 p-4 text-white shadow-2xl backdrop-blur-md will-change-transform sm:p-5">
                <div className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-[#00A3E0] animate-pulse" />
                  <h3 className="text-base sm:text-lg font-bold tracking-tight text-white drop-shadow-xs">
                    {currentSlide.id === "santech-lead"
                      ? language === "rw" ? "SAN TECH mu Mibare" : "SAN TECH at a Glance"
                      : language === "rw" ? currentSlide.cardTitleRw : currentSlide.cardTitleEn}
                  </h3>
                </div>

                <div ref={impactStackRef} className="relative mt-3 min-h-[91px]" aria-live="polite">
                  {metricOptions.map((impact, index) => {
                    const isActive = index === activeMetricIndex;
                    return (
                      <div
                        key={impact.label}
                        data-impact-card
                        data-impact-index={index}
                        aria-hidden={!isActive}
                        className={`px-1 py-3 ${isActive ? "relative" : "pointer-events-none absolute inset-0 opacity-0"}`}
                      >
                        <div className="flex items-end justify-between gap-4">
                          <div>
                            <p className="font-exo text-3xl font-black leading-none tracking-[-0.05em] text-white sm:text-4xl">{impact.value}</p>
                            <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.12em] text-white/65">{impact.label}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

              </div>

              {/* Slider Dots at Bottom Left */}
              <div className="mt-4 flex items-center gap-2" aria-label="Hero slide indicators">
                {heroSlides.map((slide, idx) => (
                  <button
                    key={slide.id}
                    type="button"
                    onClick={() => setActiveSlide(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                    className={`transition-all duration-300 rounded-full ${
                      idx === activeSlide
                        ? "h-2.5 w-8 bg-white shadow-md"
                        : "size-2.5 bg-white/50 hover:bg-white/80"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* ========================================================
              CENTER COLUMN: 3 Vertical Photo/Story Cards (~2 cols)
             ======================================================== */}
          <div ref={galleryRef} className="hidden md:flex lg:col-span-2 xl:col-span-2 flex-col justify-between gap-3">
            {activeGallery.map((image, imageIndex) => (
              <div
                key={`${activeSlide}-${image.src}`}
                data-gallery-card
                onClick={() => setActiveSlide((activeSlide + imageIndex + 1) % heroSlides.length)}
                className={`group relative flex-1 min-h-[120px] cursor-pointer overflow-hidden rounded-none border border-slate-200/80 shadow-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-md ${imageIndex === 1 ? "grid grid-cols-5 bg-[#333292]" : "bg-white"}`}
              >
                <div className={imageIndex === 1 ? "relative col-span-3 h-full" : "relative size-full"}>
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 1024px) 30vw, 20vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
                </div>
                {imageIndex === 1 ? (
                  <div className="col-span-2 flex flex-col items-center justify-center bg-[#333292] p-2 text-center text-white">
                    <span className="text-[10px] font-black uppercase tracking-wider text-cyan-300">SAN TECH</span>
                    <p className="mt-0.5 text-[10px] font-bold leading-tight">
                      {language === "rw" ? "Ibyerekanwa" : "In focus"}
                    </p>
                  </div>
                ) : (
                  <div className="absolute inset-x-2.5 bottom-2.5 text-white">
                    <p className="text-[11px] font-bold leading-tight drop-shadow-xs">{image.alt.replace("SAN TECH ", "")}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* ========================================================
              RIGHT COLUMN: #333292 Deep Blue Info & Branding Card (~4-5 cols)
             ======================================================== */}
          <div className="relative lg:col-span-4 xl:col-span-4 flex flex-col items-center justify-between overflow-hidden rounded-none border-l-4 border-[#333292] bg-[#f7f8fc] p-5 text-center text-slate-950 shadow-xl sm:p-7 lg:p-8">
            
            <div className="relative z-10 flex w-full max-w-xl flex-col items-center">
              {/* Simple slide marker: clear, editorial, and tied to the active story. */}
              <div className="flex items-center justify-center gap-3">
                <span className="h-px w-8 bg-[#333292]" aria-hidden="true" />
                <Link
                  href={currentSlide.badgeHref}
                  className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#333292] transition-colors hover:text-[#1519ad]"
                >
                  <span>{language === "rw" ? currentSlide.badgeRw : currentSlide.badgeEn}</span>
                </Link>
                <span className="h-px w-8 bg-[#333292]" aria-hidden="true" />
              </div>

              {/* Main Heading */}
              <h1 className="font-exo mx-auto mt-5 max-w-lg text-xl font-bold leading-[1.08] tracking-[-0.03em] text-slate-950 sm:text-2xl lg:text-[2rem]">
                {language === "rw" ? currentSlide.titleRw : currentSlide.titleEn}
              </h1>

              {/* Subheading */}
              <p className="mt-3 max-w-md text-xs font-semibold tracking-wide text-[#333292] sm:text-sm">
                {language === "rw" ? currentSlide.subtitleRw : currentSlide.subtitleEn}
              </p>

              {/* Description Body */}
              <p className="mx-auto mt-3 max-w-lg text-xs font-normal leading-relaxed text-slate-600 sm:text-sm">
                {language === "rw" ? currentSlide.bodyRw : currentSlide.bodyEn}
              </p>

              {/* Quick CTAs from PDF Section 3.1 */}
              <div className="mt-7 flex flex-wrap justify-center gap-2">
                {heroCTAs.map((cta, ctaIdx) => (
                  <Link
                    key={cta.label}
                    href={cta.href}
                    className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-[11px] font-bold tracking-wide transition-all ${
                      ctaIdx === 0
                        ? "bg-[#333292] text-white hover:bg-[#1519ad] shadow-sm"
                        : "border border-slate-300 bg-white text-slate-700 hover:border-[#333292] hover:text-[#333292]"
                    }`}
                  >
                    <span>{cta.label}</span>
                    <ArrowRight className="size-3" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Bottom Actions: Social Icons Row & Direct Link */}
            <div className="relative z-10 mt-6 flex w-full max-w-xl flex-col items-center gap-3 border-t border-slate-200 pt-4">
              {/* Social Media Circular Buttons */}
              <div className="flex items-center gap-2">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="grid size-8 place-items-center rounded-full bg-white text-slate-600 shadow-sm transition-all duration-200 hover:bg-[#333292] hover:text-white hover:scale-110"
                >
                  <FaInstagram className="size-3.5" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter / X"
                  className="grid size-8 place-items-center rounded-full bg-white text-slate-600 shadow-sm transition-all duration-200 hover:bg-[#333292] hover:text-white hover:scale-110"
                >
                  <FaXTwitter className="size-3" />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="grid size-8 place-items-center rounded-full bg-white text-slate-600 shadow-sm transition-all duration-200 hover:bg-[#333292] hover:text-white hover:scale-110"
                >
                  <FaYoutube className="size-3.5" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="grid size-8 place-items-center rounded-full bg-white text-slate-600 shadow-sm transition-all duration-200 hover:bg-[#333292] hover:text-white hover:scale-110"
                >
                  <FaLinkedinIn className="size-3" />
                </a>
              </div>

              {/* Direct Quick Link */}
              <Link
                href="/connect"
                className="inline-flex items-center gap-1 text-xs font-bold text-[#333292] transition-colors hover:text-[#1519ad]"
              >
                <span>{language === "rw" ? "Twandikire" : "Contact Us"}</span>
                <ExternalLink className="size-3" />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-3 grid shrink-0 items-center gap-3 border-t border-slate-300/80 pt-3 text-[10px] sm:grid-cols-[auto_1fr_auto] sm:gap-5">
          <span className="font-black uppercase tracking-[0.2em] text-[#333292]">Trusted by teams building forward</span>
          <div className="flex min-w-0 items-center gap-4 overflow-hidden text-slate-500">
            {clientLogos.slice(0, 4).map((partner) => (
              <span key={partner.name} className="shrink-0 truncate font-semibold uppercase tracking-[0.08em]" title={partner.name}>
                {partner.name.replace("National Bank of Rwanda (BNR)", "BNR").replace("KIGEME District Hospital", "Kigeme Hospital")}
              </span>
            ))}
          </div>
          <span className="text-slate-500 sm:text-right">© 2026 SAN TECH · Kigali, Rwanda</span>
        </div>
      </div>

    </div>
  );
}

function HeroVideoPlayer({ src, label, isActive }: { src: string; label: string; isActive: boolean }) {
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
    <div className="relative size-full bg-slate-950">
      <video
        ref={videoRef}
        className="size-full object-cover"
        src={src}
        autoPlay
        muted
        playsInline
        preload="metadata"
        onEnded={handleEnded}
        aria-label={label}
      />
      <button
        type="button"
        onClick={toggleSound}
        className="absolute top-4 right-4 z-20 grid size-9 place-items-center rounded-xl border border-white/20 bg-black/60 text-white shadow-lg backdrop-blur-md transition-colors hover:bg-black/80"
        aria-label={muted ? "Turn video sound on" : "Mute video sound"}
      >
        {muted ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}
      </button>
    </div>
  );
}

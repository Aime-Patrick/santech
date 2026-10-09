"use client";
import { useUiCopy } from "@/lib/use-ui-copy";
import { 
  ArrowLeft, 
  ArrowRight, 
  ArrowUpRight, 
  CalendarDays, 
  MapPin, 
  Search, 
  X, 
  Pause, 
  Play,
  Briefcase,
  CheckCircle2,
  Send,
  Sparkles
} from "lucide-react";
import { useState, useMemo, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import { useDebounce } from "@/lib/use-debounce";

export const opportunityTabs = [
  { id: "featured", label: "Featured" },
  { id: "jobs", label: "Jobs" },
  { id: "consultancy", label: "Consultancy" },
  { id: "internships", label: "Internships" },
  { id: "others", label: "Others" },
] as const;

export type OpportunityTabId = (typeof opportunityTabs)[number]["id"];

export type OpportunityItem = {
  id: string;
  category: OpportunityTabId;
  label: string;
  title: string;
  description: string;
  location: string;
  date: string;
  action: string;
  type: string;
  scope: string;
  requirements: string[];
  benefits: string[];
  tags?: string[];
};

export const allOpportunities: OpportunityItem[] = [
  // FEATURED
  {
    id: "feat-1",
    category: "featured",
    label: "SAN HUB FELLOWSHIP",
    title: "SAN HUB Tech & AI Innovation Fellowship 2026",
    description: "A full scholarship and incubation pathway for African developers building high-impact AI and embedded systems.",
    location: "Kigali, Rwanda",
    date: "Open until Nov 30, 2026",
    action: "Explore pathway",
    type: "Full Scholarship & Incubation",
    scope: "12-month intensive engineering & product incubation program",
    requirements: [
      "Demonstrated proficiency in Python, TypeScript, or C/C++",
      "Passion for building AI, IoT, or digital public infrastructure systems",
      "Availability for hands-on prototyping and weekly mentorship in Kigali or hybrid",
      "Commitment to solving tangible challenges in African communities",
    ],
    benefits: [
      "Full tuition scholarship and monthly development stipend",
      "Access to SAN HUB prototyping hardware labs and cloud GPU compute",
      "Direct mentorship from senior SAN TECH engineering leads",
      "Pathway to commercial launch, pilot deployments, and seed incubation",
    ],
    tags: ["Fellowship", "AI", "Scholarship"],
  },
  {
    id: "feat-2",
    category: "featured",
    label: "ENTERPRISE INCUBATION",
    title: "Digital Public Infrastructure Accelerator (50-in-5)",
    description: "Hands-on acceleration for teams building open-source, interoperable identity, data exchange, and digital credential modules.",
    location: "Rwanda & Regional",
    date: "Applications open",
    action: "Apply for accelerator",
    type: "6-Month Acceleration",
    scope: "DPI module development, API compliance testing, and sovereign deployment support",
    requirements: [
      "Early-stage prototype or working architecture in identity or data exchange",
      "Commitment to open standards (e.g. OpenID, W3C Verifiable Credentials)",
      "Founding engineering team of at least 2 full-time builders",
    ],
    benefits: [
      "Technical advisory on institutional compliance & data protection",
      "Direct integration testing with SAN TECH digital public platforms",
      "Introductions to government & regional development partners",
    ],
    tags: ["DPI", "Incubation", "Open Source"],
  },
  {
    id: "feat-3",
    category: "featured",
    label: "INNOVATION LAB GRANT",
    title: "IoT Hardware & Edge Computing Prototype Grants",
    description: "Grants and lab access for engineering cohorts prototyping smart municipal monitoring and sensor networks.",
    location: "Kigali, Rwanda",
    date: "Cohort 4 Intake",
    action: "View grant details",
    type: "Prototype Seed Grant",
    scope: "Sensor firmware, solar telemetry units, and real-time field trials",
    requirements: [
      "Working knowledge of microcontrollers (ESP32, STM32, Raspberry Pi Pico)",
      "Clear deployment thesis for utilities, agriculture, or logistics",
    ],
    benefits: [
      "Up to $5,000 prototype development funding",
      "Hardware testing benches, 3D printing, and PCB fabrication tooling",
    ],
    tags: ["Hardware", "Grants", "IoT"],
  },

  // JOBS
  {
    id: "job-1",
    category: "jobs",
    label: "CAREER OPPORTUNITY",
    title: "Senior Full-Stack Software Engineer (Next.js / Node.js)",
    description: "Lead the core engineering team building high-availability enterprise applications and distributed backend microservices.",
    location: "Kigali, Rwanda · Hybrid",
    date: "Full-Time · Immediate",
    action: "Apply for role",
    type: "Full-Time Position",
    scope: "Architecture, code review, distributed database optimization, and CI/CD pipelines",
    requirements: [
      "4+ years of production experience in TypeScript, React / Next.js, and Node.js",
      "Deep understanding of PostgreSQL, Redis, Docker, and REST/GraphQL APIs",
      "Experience deploying robust systems adhering to security & compliance standards",
    ],
    benefits: [
      "Competitive compensation package with performance incentives",
      "Comprehensive medical insurance coverage for employee & family",
      "Continuous learning budget and conference sponsorship",
    ],
    tags: ["Engineering", "TypeScript", "Next.js"],
  },
  {
    id: "job-2",
    category: "jobs",
    label: "CAREER OPPORTUNITY",
    title: "Cybersecurity Analyst & SOC Operations Specialist",
    description: "Oversee data controller compliance, automated penetration audits, and real-time security monitoring for client infrastructures.",
    location: "Kigali, Rwanda",
    date: "Full-Time · Open now",
    action: "Submit application",
    type: "Full-Time Position",
    scope: "Threat detection, SIEM log monitoring, vulnerability scans, and incident response",
    requirements: [
      "Experience with SIEM tools, network packet analyzers, and Linux hardening",
      "Familiarity with ISO 27001, GDPR, and Rwanda Data Protection Law N° 058/2021",
      "Industry certification (Security+, CySA+, CEH, or equivalent) preferred",
    ],
    benefits: [
      "Direct work with national-grade security operations centers",
      "Certification sponsorship and ongoing advanced defense training",
    ],
    tags: ["Cybersecurity", "SOC", "Compliance"],
  },
  {
    id: "job-3",
    category: "jobs",
    label: "CAREER OPPORTUNITY",
    title: "AI & Embedded Systems Integration Engineer",
    description: "Design firmware and real-time computer vision models for E-Visitors and smart access biometric scanners.",
    location: "Kigali / Bamako",
    date: "Full-Time · Urgent",
    action: "Join the team",
    type: "Full-Time Position",
    scope: "Edge AI inference optimization, camera sensor pipeline, and optical scanning",
    requirements: [
      "Strong background in C/C++, OpenCV, TensorFlow Lite / ONNX, and Linux kernel drivers",
      "Experience optimizing neural network models for low-power edge hardware",
    ],
    benefits: [
      "High-impact role shaping national biometric security infrastructure",
      "State-of-the-art embedded lab workstations and tooling",
    ],
    tags: ["AI", "Embedded", "Firmware"],
  },

  // CONSULTANCY
  {
    id: "cons-1",
    category: "consultancy",
    label: "CONSULTANCY",
    title: "Digital Transformation & Institutional Process Audits",
    description: "Partner with SAN TECH on advisory, technical specifications, and system integration for public and financial bodies.",
    location: "Remote · Africa",
    date: "Expressions of interest",
    action: "Express interest",
    type: "Advisory Consultancy",
    scope: "Workflow mapping, digital maturity assessment, and system specification",
    requirements: [
      "Track record in digital government, enterprise ERP, or banking systems advisory",
      "Strong stakeholder facilitation and bilingual capability (English/French)",
    ],
    benefits: [
      "Competitive daily consulting rates and project milestone compensation",
      "Executive collaboration with SAN TECH leadership on high-level initiatives",
    ],
    tags: ["Advisory", "Strategy", "Transformation"],
  },
  {
    id: "cons-2",
    category: "consultancy",
    label: "CONSULTANCY",
    title: "Data Privacy & DPIA Compliance Advisory",
    description: "Expert consultancy on national Data Protection regulations, GDPR compliance, and statutory DPIA implementation.",
    location: "Rwanda / Mali",
    date: "Ongoing partnerships",
    action: "Express interest",
    type: "Compliance Advisory",
    scope: "Data mapping, Privacy by Design audits, DPIA documentation",
    requirements: [
      "Certified Information Privacy Professional (CIPP/E, CIPM, or CDPO)",
      "Direct experience auditing financial or healthcare software systems",
    ],
    benefits: [
      "Retainer-based consulting engagement with institutional reach",
    ],
    tags: ["Compliance", "Legal Tech", "Privacy"],
  },

  // INTERNSHIPS
  {
    id: "intern-1",
    category: "internships",
    label: "INTERNSHIP",
    title: "Junior Software Developer Apprenticeship (Cohort 5)",
    description: "Accelerated 6-month hands-on apprenticeship working directly on production deployments under senior mentor guidance.",
    location: "Kigali, Rwanda",
    date: "Applications by cohort",
    action: "Apply for internship",
    type: "6-Month Paid Apprenticeship",
    scope: "Feature development, bug fixes, automated unit testing, and code review",
    requirements: [
      "Recent graduate or final-year student in Computer Science or self-taught builder",
      "Solid understanding of HTML, CSS, JavaScript/TypeScript, and Git workflows",
    ],
    benefits: [
      "Monthly living stipend and workstation equipment",
      "Direct transition opportunity to full-time junior engineer based on review",
    ],
    tags: ["Mentorship", "Full-Stack", "Apprenticeship"],
  },
  {
    id: "intern-2",
    category: "internships",
    label: "INTERNSHIP",
    title: "Quality Assurance & Automated Testing Fellowship",
    description: "Learn automated end-to-end testing, CI/CD pipeline integration, and stress-testing for high-throughput public systems.",
    location: "Kigali, Rwanda",
    date: "Spring Cohort",
    action: "Apply for internship",
    type: "6-Month Fellowship",
    scope: "Playwright / Cypress test suites, API endpoint regression, load testing",
    requirements: [
      "Familiarity with JavaScript / Python scripting and attention to detail",
    ],
    benefits: [
      "Direct hands-on experience on live national software deployments",
    ],
    tags: ["QA", "Testing", "DevOps"],
  },

  // OTHERS
  {
    id: "other-1",
    category: "others",
    label: "ECOSYSTEM OPPORTUNITY",
    title: "Open Source Community Hackathons & Micro-Grants",
    description: "Participate in weekend engineering challenges to build plugins, UI widgets, and extensions for the SAN TECH stack.",
    location: "Africa & Virtual",
    date: "Quarterly Calls",
    action: "Join hackathon",
    type: "Community Hackathon",
    scope: "48-hour prototype sprint with mentor support and prizes",
    requirements: [
      "Open to all developers, designers, and students across Africa",
    ],
    benefits: [
      "Cash prizes, cloud credits, and SAN TECH recognition badges",
    ],
    tags: ["Community", "Hackathon", "Grants"],
  },
  {
    id: "other-2",
    category: "others",
    label: "ECOSYSTEM OPPORTUNITY",
    title: "Technical Guest Lectures & Masterclasses at SAN HUB",
    description: "Calling experienced engineering leads and founders to lead specialized workshops for cohort developers.",
    location: "Kigali & Online",
    date: "Ongoing call for speakers",
    action: "Propose a session",
    type: "Guest Speaker / Masterclass",
    scope: "2-hour masterclass session on specialized tech or architecture topics",
    requirements: [
      "Subject matter expertise in software, AI, hardware, or startup scaling",
    ],
    benefits: [
      "Honorarium, ecosystem visibility, and talent recruitment access",
    ],
    tags: ["Speaking", "Workshops", "Community"],
  },
];

const CARDS_PER_VIEW = 2;


export function TechPulseOpportunities({ cmsOpportunities }: { cmsOpportunities?: import("@/lib/strapi").Opportunity[] }) {
  const t= useUiCopy();
  const [activeTab, setActiveTab] = useState<OpportunityTabId>("featured");
  const [searchQuery, setSearchQuery] = useState("");

  // Use CMS opportunities when available, mapped to OpportunityItem shape.
  // Falls back to hardcoded allOpportunities when CMS returns nothing.
  const opportunities: OpportunityItem[] = cmsOpportunities && cmsOpportunities.length > 0
    ? cmsOpportunities.map((o) => ({
        id: String(o.id),
        category: (o.type.toLowerCase() === "fellowship" ? "featured"
          : o.type.toLowerCase() === "job" ? "jobs"
          : o.type.toLowerCase() === "internship" ? "internships"
          : o.type.toLowerCase() === "grant" ? "featured"
          : o.type.toLowerCase() === "tender" ? "others"
          : "others") as OpportunityTabId,
        label: o.type.toUpperCase(),
        title: o.title,
        description: o.description,
        location: "",
        date: o.deadline ?? "",
        action: "View details",
        type: o.type,
        scope: "",
        requirements: [],
        benefits: [],
        tags: o.badge ? [o.badge] : [],
      }))
    : allOpportunities;
  const [cardOffset, setCardOffset] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [selectedOpportunity, setSelectedOpportunity] = useState<OpportunityItem | null>(null);
  const [mounted, setMounted] = useState(false);

  // Form submission state inside dialog
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [applicantData, setApplicantData] = useState({
    fullName: "",
    email: "",
    phoneCountryCode: "+250",
    phone: "",
    portfolio: "",
    coverNote: "",
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll when dialog is open
  useEffect(() => {
    if (!selectedOpportunity) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedOpportunity(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedOpportunity]);

  // Debounced search query
  const debouncedQuery = useDebounce(searchQuery, 300);

  // Filter opportunities
  const filteredOpportunities = useMemo(() => {
    let list = opportunities.filter((item) => item.category === activeTab);

    if (debouncedQuery.trim()) {
      const q = debouncedQuery.toLowerCase();
      list = opportunities.filter((item) => {
        const matchesCategory = item.category === activeTab;
        const matchesText =
          item.title.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.location.toLowerCase().includes(q) ||
          item.label.toLowerCase().includes(q) ||
          (item.tags && item.tags.some((t) => t.toLowerCase().includes(q)));
        return matchesCategory && matchesText;
      });
    }

    return list;
  }, [activeTab, debouncedQuery]);

  const totalCards = filteredOpportunities.length;

  useEffect(() => {
    setCardOffset(0);
  }, [activeTab, debouncedQuery]);

  const nextSlide = useCallback(() => {
    if (totalCards <= CARDS_PER_VIEW) return;
    setCardOffset((prev) => (prev + 1) % totalCards);
  }, [totalCards]);

  const prevSlide = useCallback(() => {
    if (totalCards <= CARDS_PER_VIEW) return;
    setCardOffset((prev) => (prev - 1 + totalCards) % totalCards);
  }, [totalCards]);

  useEffect(() => {
    if (!isAutoPlaying || totalCards <= CARDS_PER_VIEW || selectedOpportunity !== null) return;
    const interval = setInterval(nextSlide, 5500);
    return () => clearInterval(interval);
  }, [isAutoPlaying, totalCards, selectedOpportunity, nextSlide]);

  const visibleCards = useMemo(() => {
    if (totalCards === 0) return [];
    if (totalCards <= CARDS_PER_VIEW) return filteredOpportunities;

    const cards: OpportunityItem[] = [];
    for (let i = 0; i < CARDS_PER_VIEW; i++) {
      cards.push(filteredOpportunities[(cardOffset + i) % totalCards]);
    }
    return cards;
  }, [filteredOpportunities, cardOffset, totalCards]);

  const handleOpenDialog = (opportunity: OpportunityItem) => {
    setSelectedOpportunity(opportunity);
    setFormSubmitted(false);
    setIsSubmitting(false);
    setApplicantData({
      fullName: "",
      email: "",
      phoneCountryCode: "+250",
      phone: "",
      portfolio: "",
      coverNote: "",
    });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API request (ready to plug into React Query / Backend Mutation)
    setTimeout(() => {
      setIsSubmitting(false);
      setFormSubmitted(true);
    }, 800);
  };

  return (
    <div 
      className="w-full"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* 1. Advanced Debounced Search Input on Top of Tabs */}
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-xl">
          <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search opportunities by title, skill, location, or tag…"
            className="w-full border border-slate-200 bg-white py-2 pl-10 pr-9 text-xs font-semibold text-[#0a1f44] placeholder-slate-400 shadow-2xs transition-colors focus:border-brand-secondary focus:outline-none focus:ring-1 focus:ring-brand-secondary"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              aria-label={t.clearSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="size-3.5" />
            </button>
          )}
        </div>

        {/* Live Status */}
        <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
          <Briefcase className="size-3.5 text-brand-secondary" />
          <span>
            {totalCards} {totalCards === 1 ? "opportunity" : "opportunities"} in {activeTab}
          </span>
          {debouncedQuery && (
            <span className="bg-brand-secondary/10 text-brand-secondary px-1.5 py-0.5 text-[10px] font-black">
              Filtered
            </span>
          )}
        </div>
      </div>

      {/* 2. Category Filter Tabs */}
      <div className="flex items-center justify-between gap-3 border-b border-slate-200 pb-3">
        <div
          role="tablist"
          aria-label="Opportunity categories"
          className="flex flex-wrap gap-1.5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {opportunityTabs.map((tab) => {
            const active = tab.id === activeTab;
            const count = opportunities.filter((o) => o.category === tab.id).length;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex items-center gap-1.5 border px-3 py-1.5 text-xs font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary ${
                  active
                    ? "border-[#0a1f44] bg-[#0a1f44] text-white shadow-xs"
                    : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-[#0a1f44]"
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`px-1 py-0.2 text-[10px] font-black ${
                    active ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Carousel Controller Arrows */}
        {totalCards > CARDS_PER_VIEW && (
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={() => setIsAutoPlaying((v) => !v)}
              title={isAutoPlaying ? "Pause auto-slide" : "Play auto-slide"}
              className="grid size-7 place-items-center border border-slate-200 bg-white text-slate-600 transition-colors hover:border-[#0a1f44] hover:text-[#0a1f44]"
            >
              {isAutoPlaying ? <Pause className="size-3" /> : <Play className="size-3" />}
            </button>

            <button
              type="button"
              onClick={prevSlide}
              aria-label="Previous opportunity"
              className="grid size-7 place-items-center border border-slate-200 bg-white text-[#0a1f44] shadow-2xs transition-colors hover:border-[#0a1f44] hover:bg-slate-50"
            >
              <ArrowLeft className="size-3.5" />
            </button>

            <button
              type="button"
              onClick={nextSlide}
              aria-label="Next opportunity"
              className="grid size-7 place-items-center border border-slate-200 bg-white text-[#0a1f44] shadow-2xs transition-colors hover:border-[#0a1f44] hover:bg-slate-50"
            >
              <ArrowRight className="size-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* 3. Opportunities Grid Cards */}
      <div className="mt-5" role="tabpanel" aria-label={`${activeTab} opportunities`}>
        {totalCards === 0 ? (
          <div className="flex flex-col items-center justify-center border border-dashed border-slate-200 bg-slate-50/50 p-10 text-center">
            <Search className="size-8 text-slate-300" />
            <p className="mt-2 text-sm font-bold text-[#0a1f44]">{t.noOpportunities}</p>
            <p className="mt-1 text-xs text-slate-500">
              Try adjusting your search query or selecting a different category tab.
            </p>
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="mt-3 bg-[#0a1f44] px-3.5 py-1.5 text-xs font-bold text-white transition-colors hover:bg-brand-secondary"
              >
                Clear search filter
              </button>
            )}
          </div>
        ) : (
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={`${activeTab}-${debouncedQuery}-${cardOffset}`}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className={`grid gap-4 ${
                visibleCards.length === 1 ? "grid-cols-1 max-w-2xl" : "grid-cols-1 lg:grid-cols-2"
              }`}
            >
              {visibleCards.map((opportunity) => (
                <article
                  key={opportunity.id}
                  onClick={() => handleOpenDialog(opportunity)}
                  className="group relative flex cursor-pointer flex-col justify-between border border-slate-200 border-l-4 border-l-brand-secondary bg-[#fbfcfe] p-5 shadow-xs transition-all hover:border-slate-300 hover:shadow-md"
                >
                  {/* Top Left Indicator Dot */}
                  <span
                    className="absolute -left-[5.5px] top-4 size-2 rounded-full bg-brand-secondary ring-4 ring-white"
                    aria-hidden="true"
                  />

                  <div>
                    {/* Category / Tag */}
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-[10px] font-black uppercase tracking-[0.16em] text-brand-secondary">
                        {opportunity.label}
                      </p>
                      {opportunity.tags && (
                        <div className="flex items-center gap-1">
                          {opportunity.tags.slice(0, 2).map((tag) => (
                            <span
                              key={tag}
                              className="bg-slate-200/70 px-1.5 py-0.2 text-[9px] font-bold text-slate-600"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Title */}
                    <h2 className="font-exo mt-2 text-lg font-bold leading-snug tracking-[-0.03em] text-[#0a1f44] sm:text-xl group-hover:text-brand-secondary transition-colors">
                      {opportunity.title}
                    </h2>

                    {/* Description */}
                    <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-600 line-clamp-3">
                      {opportunity.description}
                    </p>

                    {/* Metadata Badges */}
                    <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs font-semibold text-slate-500">
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin className="size-3.5 text-brand-secondary" aria-hidden="true" />
                        {opportunity.location}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <CalendarDays className="size-3.5 text-brand-secondary" aria-hidden="true" />
                        {opportunity.date}
                      </span>
                    </div>
                  </div>

                  {/* Action Link Button - Opens Dialog */}
                  <div className="mt-5 border-t border-slate-100 pt-3 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenDialog(opportunity);
                      }}
                      className="inline-flex items-center gap-2 bg-[#0a1f44] px-4 py-2 text-xs font-bold text-white transition-[background-color,transform] hover:-translate-y-0.5 hover:bg-brand-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary"
                    >
                      <span>{opportunity.action}</span>
                      <ArrowUpRight className="size-3.5" aria-hidden="true" />
                    </button>

                    <span className="text-[11px] font-bold text-slate-400 group-hover:text-[#0a1f44] transition-colors">
                      View details →
                    </span>
                  </div>
                </article>
              ))}
            </motion.div>
          </AnimatePresence>
        )}

        {/* Bottom Carousel Indicator Bar */}
        {totalCards > CARDS_PER_VIEW && (
          <div className="mt-4 flex items-center justify-between border-t border-slate-200 pt-3">
            <div className="flex items-center gap-1">
              {filteredOpportunities.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setCardOffset(i)}
                  aria-label={`Jump to item ${i + 1}`}
                  className={`h-1 transition-all ${
                    cardOffset === i ? "w-6 bg-[#0a1f44]" : "w-2 bg-slate-300 hover:bg-slate-400"
                  }`}
                />
              ))}
            </div>

            <div className="text-[11px] font-bold text-slate-500">
              Showing card {cardOffset + 1}–{Math.min(cardOffset + CARDS_PER_VIEW, totalCards)} of {totalCards}
            </div>
          </div>
        )}
      </div>

      {/* 4. DYNAMIC SINGLE-PAGE MODAL DIALOG (No Redirection) */}
      {selectedOpportunity && mounted && createPortal(
        <AnimatePresence>
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#07152d]/85 p-3 sm:p-6 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-labelledby="opportunity-dialog-title"
            onClick={() => setSelectedOpportunity(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative flex max-h-[92svh] w-full max-w-4xl flex-col overflow-hidden border border-slate-200 bg-white shadow-2xl"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.97, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 12 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              {/* Dialog Header */}
              <div className="flex shrink-0 items-start justify-between border-b border-slate-200 bg-slate-50/90 px-6 py-4">
                <div className="pr-4">
                  <div className="flex items-center gap-2">
                    <span className="bg-[#0a1f44] px-2 py-0.5 text-[9px] font-black uppercase tracking-[0.15em] text-white">
                      {selectedOpportunity.label}
                    </span>
                    <span className="text-[11px] font-bold text-slate-500">
                      {selectedOpportunity.type}
                    </span>
                  </div>
                  <h2
                    id="opportunity-dialog-title"
                    className="font-exo mt-1.5 text-lg font-bold leading-snug text-[#0a1f44] sm:text-xl"
                  >
                    {selectedOpportunity.title}
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedOpportunity(null)}
                  aria-label="Close opportunity dialog"
                  className="grid size-8 shrink-0 place-items-center border border-slate-200 text-slate-600 transition-colors hover:border-[#0a1f44] hover:bg-slate-100 hover:text-[#0a1f44]"
                >
                  <X className="size-4" />
                </button>
              </div>

              {/* Dialog Body: Two Independent Scrollable Columns */}
              <div className="min-h-0 flex-1 overflow-hidden grid lg:grid-cols-[1.15fr_0.85fr]">
                {/* Left Column: Independently Scrollable Details */}
                <div className="h-full overflow-y-auto p-6 space-y-5 lg:pr-7 [scrollbar-width:thin]">
                  {/* Metadata Strip */}
                  <div className="grid grid-cols-2 gap-3 border border-slate-200 bg-slate-50 p-3 text-xs">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Location
                      </span>
                      <p className="mt-0.5 font-bold text-[#0a1f44]">
                        {selectedOpportunity.location}
                      </p>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Timeline / Deadline
                      </span>
                      <p className="mt-0.5 font-bold text-[#0a1f44]">
                        {selectedOpportunity.date}
                      </p>
                    </div>
                  </div>

                  {/* Overview */}
                  <div>
                    <h3 className="text-xs font-black uppercase tracking-wider text-[#0a1f44]">
                      Program &amp; Role Overview
                    </h3>
                    <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-slate-600">
                      {selectedOpportunity.description}
                    </p>
                  </div>

                  {/* Requirements */}
                  <div>
                    <h3 className="text-xs font-black uppercase tracking-wider text-[#0a1f44]">
                      Key Requirements &amp; Eligibility
                    </h3>
                    <ul className="mt-2 space-y-1.5 text-xs text-slate-600">
                      {selectedOpportunity.requirements.map((req, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="mt-1 size-1.5 shrink-0 bg-brand-secondary" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Benefits & Support */}
                  <div>
                    <h3 className="text-xs font-black uppercase tracking-wider text-[#0a1f44]">
                      What is Provided
                    </h3>
                    <ul className="mt-2 space-y-1.5 text-xs text-slate-600">
                      {selectedOpportunity.benefits.map((ben, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-emerald-600" />
                          <span>{ben}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Right Column: Independent Sticky / Scrollable Application Form */}
                <div className="h-full overflow-y-auto border-t border-slate-200 p-6 lg:border-l lg:border-t-0 lg:border-slate-200 bg-slate-50/60 [scrollbar-width:thin]">
                  <div className="border border-slate-200 bg-white p-4 sm:p-5 shadow-2xs">
                    <div className="flex items-center gap-2">
                      <Sparkles className="size-4 text-brand-secondary" />
                      <h3 className="text-sm font-bold text-[#0a1f44]">
                        Direct Submission / Apply
                      </h3>
                    </div>
                    <p className="mt-1 text-[11px] text-slate-500">
                      Submit your details directly for this opportunity. No external redirect required.
                    </p>

                      {formSubmitted ? (
                        <div className="mt-6 flex flex-col items-center justify-center p-6 text-center">
                          <CheckCircle2 className="size-10 text-emerald-600" />
                          <h4 className="font-exo mt-3 text-base font-bold text-[#0a1f44]">
                            Application Received!
                          </h4>
                          <p className="mt-1.5 text-xs text-slate-600">
                            Thank you, <span className="font-bold">{applicantData.fullName || "Applicant"}</span>. Your submission for <span className="font-semibold">{selectedOpportunity.title}</span> has been logged. Our admissions and review team will reach out via email shortly.
                          </p>
                          <button
                            type="button"
                            onClick={() => setSelectedOpportunity(null)}
                            className="mt-5 bg-[#0a1f44] px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-brand-secondary"
                          >
                            Done
                          </button>
                        </div>
                      ) : (
                        <form onSubmit={handleFormSubmit} className="mt-4 space-y-3">
                          <div>
                            <label className="block text-[10px] font-black uppercase tracking-wider text-slate-600">
                              Full Name <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              required
                              value={applicantData.fullName}
                              onChange={(e) => setApplicantData({ ...applicantData, fullName: e.target.value })}
                              placeholder="e.g. Jean Damascene"
                              className="mt-1 w-full border border-slate-300 bg-white px-3 py-1.5 text-xs text-[#0a1f44] focus:border-[#0a1f44] focus:outline-none"
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] font-black uppercase tracking-wider text-slate-600">
                              Email Address <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="email"
                              required
                              value={applicantData.email}
                              onChange={(e) => setApplicantData({ ...applicantData, email: e.target.value })}
                              placeholder="name@organization.com"
                              className="mt-1 w-full border border-slate-300 bg-white px-3 py-1.5 text-xs text-[#0a1f44] focus:border-[#0a1f44] focus:outline-none"
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] font-black uppercase tracking-wider text-slate-600">
                              Phone / WhatsApp (Optional)
                            </label>
                            <div className="mt-1 grid grid-cols-[5.5rem_minmax(0,1fr)] gap-2">
                              <select
                                value={applicantData.phoneCountryCode}
                                onChange={(e) => setApplicantData({ ...applicantData, phoneCountryCode: e.target.value })}
                                aria-label="Phone country code"
                                className="w-full border border-slate-300 bg-white px-2 py-1.5 text-xs text-[#0a1f44] focus:border-[#0a1f44] focus:outline-none"
                              >
                                {['+250', '+223', '+254', '+255', '+256', '+234', '+27', '+44', '+1'].map((code) => <option key={code}>{code}</option>)}
                              </select>
                              <input
                                type="tel"
                                value={applicantData.phone}
                                onChange={(e) => setApplicantData({ ...applicantData, phone: e.target.value })}
                                placeholder="7X XXX XXX"
                                className="w-full border border-slate-300 bg-white px-3 py-1.5 text-xs text-[#0a1f44] focus:border-[#0a1f44] focus:outline-none"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-[10px] font-black uppercase tracking-wider text-slate-600">
                              Portfolio / LinkedIn / GitHub URL
                            </label>
                            <input
                              type="url"
                              value={applicantData.portfolio}
                              onChange={(e) => setApplicantData({ ...applicantData, portfolio: e.target.value })}
                              placeholder="https://..."
                              className="mt-1 w-full border border-slate-300 bg-white px-3 py-1.5 text-xs text-[#0a1f44] focus:border-[#0a1f44] focus:outline-none"
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] font-black uppercase tracking-wider text-slate-600">
                              Short Cover Note / Background
                            </label>
                            <textarea
                              rows={3}
                              value={applicantData.coverNote}
                              onChange={(e) => setApplicantData({ ...applicantData, coverNote: e.target.value })}
                              placeholder="Briefly describe your experience or why you are applying…"
                              className="mt-1 w-full border border-slate-300 bg-white px-3 py-1.5 text-xs text-[#0a1f44] focus:border-[#0a1f44] focus:outline-none"
                            />
                          </div>

                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="mt-2 flex w-full items-center justify-center gap-2 bg-[#0a1f44] py-2.5 text-xs font-bold text-white transition-colors hover:bg-brand-secondary disabled:opacity-50"
                          >
                            {isSubmitting ? (
                              <span>Submitting Application…</span>
                            ) : (
                              <>
                                <span>{selectedOpportunity.action}</span>
                                <Send className="size-3.5" />
                              </>
                            )}
                          </button>
                        </form>
                      )}
                    </div>
                  </div>
                </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
}

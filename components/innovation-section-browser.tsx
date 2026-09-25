"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  BrainCircuit,
  Boxes,
  Code2,
  Cpu,
  Database,
  FileText,
  Globe2,
  GraduationCap,
  LockKeyhole,
  Network,
  Radar,
  ScanLine,
  ShieldCheck,
  Smartphone,
  Workflow,
} from "lucide-react";
import { SplitFeaturePanel, type CoreFeature, type SplitFeatureMedia } from "@/components/split-feature-panel";

export type InnovationSection = "product" | "services" | "solutions";

type InnovationItem = {
  id: string;
  label: string;
  title: string;
  description: string;
  coreFeatures: CoreFeature[];
  media: SplitFeatureMedia;
};

const productItems: InnovationItem[] = [
  {
    id: "e-visitors",
    label: "E-Visitors",
    title: "Make every arrival count.",
    description: "A smarter way to manage visitors, access, attendance, and institutional security.",
    coreFeatures: [
      { label: "Visitor registration", description: "Capture visitor details, appointments, and host information before issuing a pass.", icon: ScanLine },
      { label: "ID and OCR scanning", description: "Scan a national ID or passport to reduce manual entry and verify identity faster.", icon: FileText },
      { label: "Access and attendance", description: "Issue access cards, record entry and exit, and track attendance across gates.", icon: ShieldCheck },
      { label: "Reports and audit trails", description: "Give authorized teams a clear history of movements, exceptions, and approvals.", icon: Boxes },
    ],
    media: { kind: "video", src: "/E-VS.mp4", alt: "E-Visitors visitor management platform" },
  },
  {
    id: "san-track",
    label: "SAN TRACK",
    title: "See operations as they move.",
    description: "Track assets, fleets, and field operations with clearer visibility and better decisions.",
    coreFeatures: [
      { label: "Asset tracking", description: "Register important assets and follow their status, location, and history over time.", icon: Radar },
      { label: "Fleet visibility", description: "See where vehicles are, how they are being used, and when action is needed.", icon: Network },
      { label: "Location intelligence", description: "Turn location data into a clearer view of field activity and operational patterns.", icon: Globe2 },
      { label: "Operations dashboards", description: "Bring live operational signals into one view for faster, better-informed decisions.", icon: Workflow },
    ],
    media: { kind: "image", src: "/images/summit.jpg", alt: "SAN TECH operations and innovation" },
  },
  {
    id: "san-book",
    label: "SAN BOOK",
    title: "Make knowledge easier to use.",
    description: "Bring digital libraries, records, and institutional knowledge into one useful system.",
    coreFeatures: [
      { label: "Digital records", description: "Store important documents and records in a structured place that is easier to maintain.", icon: FileText },
      { label: "Searchable knowledge", description: "Find the right information quickly with organized content and useful search.", icon: Database },
      { label: "Secure access", description: "Give the right people access to the right knowledge while protecting sensitive records.", icon: LockKeyhole },
      { label: "Institutional workflows", description: "Move requests, reviews, and approvals through clear digital steps.", icon: Workflow },
    ],
    media: { kind: "image", src: "/images/team.jpg", alt: "SAN TECH team working with knowledge systems" },
  },
  {
    id: "revixsan",
    label: "REVIXSAN",
    title: "Turn review into improvement.",
    description: "Support quality assurance, audit reviews, and operational compliance with practical evidence.",
    coreFeatures: [
      { label: "Quality reviews", description: "Review work against clear standards and identify where quality can improve.", icon: ShieldCheck },
      { label: "Compliance checks", description: "Check required controls and make gaps visible before they become bigger problems.", icon: ScanLine },
      { label: "Action tracking", description: "Assign follow-up actions, monitor progress, and keep improvement work accountable.", icon: Workflow },
      { label: "Evidence reporting", description: "Collect the evidence behind decisions, reviews, and compliance outcomes.", icon: FileText },
    ],
    media: { kind: "image", src: "/troph.jpg", alt: "SAN TECH recognition and trust" },
  },
  {
    id: "sanverse",
    label: "SANVERSE",
    title: "Build spaces for what comes next.",
    description: "Explore immersive digital platforms and spatial experiences for learning, collaboration, and impact.",
    coreFeatures: [
      { label: "Immersive environments", description: "Create digital spaces that help people learn, explore, and collaborate in new ways.", icon: Boxes },
      { label: "Interactive experiences", description: "Make information and participation more engaging through responsive digital experiences.", icon: Cpu },
      { label: "Virtual collaboration", description: "Bring people together around shared work, ideas, and activities from different places.", icon: Network },
      { label: "Digital storytelling", description: "Use connected media and interaction to make important ideas easier to understand and remember.", icon: Globe2 },
    ],
    media: { kind: "image", src: "/images/summit.jpg", alt: "SAN TECH innovation experience" },
  },
];

const serviceItems: InnovationItem[] = [
  ["Software development", "Build dependable systems around the way people work.", Code2],
  ["Web and mobile applications", "Create accessible experiences across the devices people use every day.", Smartphone],
  ["AI solutions", "Apply practical intelligence to decisions, services, and operations.", BrainCircuit],
  ["IoT and embedded systems", "Connect devices, environments, and useful data.", Cpu],
  ["Cybersecurity", "Protect systems, people, and information from changing risks.", LockKeyhole],
  ["Digital transformation", "Move from disconnected processes to systems that work together.", Workflow],
  ["Training and capacity building", "Grow the skills needed to keep technology useful.", GraduationCap],
  ["Systems integration", "Bring tools and workflows together into one dependable operation.", Network],
  ["Consultancy", "Turn a difficult question into a practical technology direction.", Globe2],
].map(([label, description, icon]) => ({
  id: String(label).toLowerCase().replaceAll(" ", "-"),
  label: String(label),
  title: String(label),
  description: String(description),
  coreFeatures: [
    { label: "Discovery and planning", description: "Map the challenge, users, and constraints before choosing the right technology approach.", icon: icon as typeof Code2 },
    { label: "Design and delivery", description: "Turn the agreed direction into a tested system that people can use with confidence.", icon: Code2 },
    { label: "Integration and support", description: "Connect the new work to existing operations and keep it useful after launch.", icon: Workflow },
  ],
  media: { kind: "image", src: "/images/team.jpg", alt: `SAN TECH ${String(label)} team` },
}));

const solutionItems: InnovationItem[] = [
  ["Web platforms", "Create digital foundations that are clear, accessible, and ready to grow.", Globe2],
  ["Mobile apps", "Put useful services and workflows where people already work.", Smartphone],
  ["Cloud systems", "Make infrastructure more flexible, secure, and easier to operate.", Database],
  ["AI and machine learning", "Find patterns and support better decisions with responsible intelligence.", BrainCircuit],
  ["IoT", "Connect devices and environments to the systems that guide action.", Cpu],
  ["Data and analytics", "Turn scattered information into signals teams can use.", Workflow],
  ["Cybersecurity", "Design protection into systems from the beginning.", ShieldCheck],
  ["Automation", "Reduce repetitive work and give teams more room to focus.", Code2],
].map(([label, description, icon]) => ({
  id: String(label).toLowerCase().replaceAll(" ", "-"),
  label: String(label),
  title: String(label),
  description: String(description),
  coreFeatures: [
    { label: "Applied technology", description: "Choose tools and methods that fit the real environment, people, and outcome being pursued.", icon: icon as typeof Code2 },
    { label: "Secure foundations", description: "Build privacy, resilience, and responsible access into the system from the start.", icon: ShieldCheck },
    { label: "Useful outcomes", description: "Measure the work by what it helps people do better, faster, or more safely.", icon: Workflow },
  ],
  media: { kind: "image", src: "/images/summit.jpg", alt: `SAN TECH ${String(label)} innovation` },
}));

const sectionItems: Record<InnovationSection, InnovationItem[]> = {
  product: productItems,
  services: serviceItems,
  solutions: solutionItems,
};

export function InnovationSectionBrowser({ section }: { section: InnovationSection }) {
  const items = sectionItems[section];
  const [selectedId, setSelectedId] = useState(items[0].id);
  const selected = items.find((item) => item.id === selectedId) ?? items[0];
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="grid gap-8 lg:grid-cols-[185px_minmax(0,1fr)] lg:items-start lg:gap-7">
      <aside className="lg:sticky lg:top-32">
        <div className="border-l border-slate-300 pl-4">
          {items.map((item, index) => {
            const active = item.id === selected.id;
            return (
              <button key={item.id} type="button" onClick={() => setSelectedId(item.id)} aria-pressed={active} className={`group flex w-full items-center gap-3 py-2.5 text-left transition-colors ${active ? "text-[#0a1f44]" : "text-slate-500 hover:text-brand-secondary"}`}>
                <span className={`w-5 shrink-0 text-[10px] font-black tracking-[0.12em] ${active ? "text-brand-secondary" : "text-slate-400 group-hover:text-brand-secondary"}`}>{String(index + 1).padStart(2, "0")}</span>
                <span className="min-w-0 flex-1 text-sm font-bold">{item.label}</span>
              </button>
            );
          })}
        </div>
      </aside>

      <AnimatePresence mode="wait">
        <motion.div key={selected.id} initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={prefersReducedMotion ? undefined : { opacity: 0, y: -8 }} transition={{ duration: prefersReducedMotion ? 0.01 : 0.28, ease: "easeOut" }}>
          <SplitFeaturePanel title={selected.title} coreFeatures={selected.coreFeatures} media={selected.media} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

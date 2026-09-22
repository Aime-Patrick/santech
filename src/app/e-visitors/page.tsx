import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { PageIntro, PublicPage, SectionHeading } from "@/components/public-page";

const features = ["Visitor registration", "Appointment management", "ID/OCR scanning", "Access cards and gate management", "VIP management and watchlists", "Staff, patient, and casual worker attendance", "Vehicle and item tracking", "Reports, RBAC, and audit logs"];
const audiences = ["Hospitals", "Schools", "Industries", "Institutions", "Research centers", "Mining centers"];

export default function EVisitorsPage() {
  return (
    <PublicPage>
      <PageIntro eyebrow="Flagship product / E-Visitors" title="Smart visitor, access, and attendance management." description="A calmer, connected front door for the people, places, and patterns that matter to your organization." actions={[{ label: "Request a demo", href: "/connect" }, { label: "Explore features", href: "#features", tone: "secondary" }]} />
      <section className="px-6 py-10 sm:px-10 lg:px-16 lg:py-16"><div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-slate-950"><video className="aspect-video w-full object-cover" src="/E-VS.mp4" autoPlay muted loop playsInline preload="metadata" aria-label="E-Visitors product showcase video" /></div></section>
      <section id="features" className="px-6 py-20 sm:px-10 lg:px-16 lg:py-28"><div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.75fr_1.25fr]"><SectionHeading eyebrow="The solution" title="Less friction at the front door." description="E-Visitors brings registration, access, attendance, and reporting into one operational picture." /><div className="grid gap-3 sm:grid-cols-2">{features.map((feature) => <div key={feature} className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-5 text-sm font-semibold text-slate-700"><span className="grid size-7 place-items-center rounded-full bg-emerald-50 text-emerald-600"><Check className="size-3.5" /></span>{feature}</div>)}</div></div></section>
      <section className="bg-slate-100 px-6 py-20 sm:px-10 lg:px-16 lg:py-28"><div className="mx-auto max-w-7xl"><SectionHeading eyebrow="Built for real environments" title="One platform, many doors." /><div className="mt-8 flex flex-wrap gap-3">{audiences.map((audience) => <span key={audience} className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700">{audience}</span>)}</div><Link href="/connect" className="mt-9 inline-flex items-center gap-2 text-sm font-bold text-brand-secondary">Request an E-Visitors demo <ArrowUpRight className="size-4" /></Link></div></section>
    </PublicPage>
  );
}

import Link from "next/link";
import { ArrowUpRight, Check, DoorOpen, FileCheck2, ScanLine, ShieldCheck } from "lucide-react";
import { PageIntro, PublicPage, SectionHeading } from "@/components/public-page";

const features = ["Visitor registration", "Appointment management", "ID/OCR scanning", "Access cards and gate management", "VIP management and watchlists", "Staff, patient, and casual worker attendance", "Vehicle and item tracking", "Reports, RBAC, and audit logs"];
const audiences = ["Hospitals", "Schools", "Industries", "Institutions", "Research centers", "Mining centers"];
const workflow = [
  { step: "01", title: "Scan", description: "Capture identity and visitor details at the point of entry.", icon: ScanLine },
  { step: "02", title: "Verify", description: "Check appointments, permissions, watchlists, and host details.", icon: ShieldCheck },
  { step: "03", title: "Allow access", description: "Issue the right access pass for the right environment.", icon: DoorOpen },
  { step: "04", title: "Report", description: "Keep a reliable record of movement, attendance, and activity.", icon: FileCheck2 },
];

export default function EVisitorsPage() {
  return (
    <PublicPage>
      <PageIntro eyebrow="Flagship product / E-Visitors" title="Smart visitor, access, and attendance management." description="A calmer, connected front door for the people, places, and patterns that matter to your organization." actions={[{ label: "Request a demo", href: "/connect" }, { label: "Explore features", href: "#features", tone: "secondary" }]} />
      <section className="px-6 py-10 sm:px-10 lg:px-16 lg:py-16"><div className="mx-auto max-w-7xl overflow-hidden rounded-xl bg-slate-950"><video className="aspect-video w-full object-cover" src="/E-VS.mp4" autoPlay muted loop playsInline preload="metadata" aria-label="E-Visitors product showcase video" /></div></section>
      <section className="bg-brand-secondary px-6 py-20 text-white sm:px-10 lg:px-16 lg:py-28"><div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:items-start"><SectionHeading dark eyebrow="The scanner workflow" title="From the first scan to a clear operational record." description="E-Visitors connects the moment someone arrives with the information your team needs to make a confident decision." /><div className="grid gap-3 sm:grid-cols-2">{workflow.map((item) => { const Icon = item.icon; return <div key={item.step} className="rounded-xl border border-white/20 bg-white/10 p-5"><div className="flex items-center justify-between"><span className="text-sm font-black text-white/60">{item.step}</span><Icon className="size-5 text-white" aria-hidden="true" /></div><h2 className="mt-8 text-xl font-bold tracking-[-0.03em]">{item.title}</h2><p className="mt-2 text-sm leading-6 text-white/70">{item.description}</p></div>; })}</div></div></section>
      <section id="features" className="px-6 py-20 sm:px-10 lg:px-16 lg:py-28"><div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.75fr_1.25fr]"><SectionHeading eyebrow="The solution" title="Less friction at the front door." description="E-Visitors brings registration, access, attendance, and reporting into one operational picture." /><div className="grid gap-3 sm:grid-cols-2">{features.map((feature) => <div key={feature} className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-5 text-sm font-semibold text-slate-700"><span className="grid size-7 place-items-center rounded-xl bg-emerald-50 text-emerald-600"><Check className="size-3.5" /></span>{feature}</div>)}</div></div></section>
      <section className="bg-slate-100 px-6 py-20 sm:px-10 lg:px-16 lg:py-28"><div className="mx-auto max-w-7xl"><SectionHeading eyebrow="Built for real environments" title="One platform, many doors." /><div className="mt-8 flex flex-wrap gap-3">{audiences.map((audience) => <span key={audience} className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700">{audience}</span>)}</div><Link href="/connect" className="mt-9 inline-flex items-center gap-2 text-sm font-bold text-brand-secondary">Request an E-Visitors demo <ArrowUpRight className="size-4" /></Link></div></section>
    </PublicPage>
  );
}

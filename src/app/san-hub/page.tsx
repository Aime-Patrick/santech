import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { PageIntro, PublicPage, SectionHeading } from "@/components/public-page";

const modules = ["Programs", "Courses", "Innovation labs", "Registration", "Beneficiaries", "Certifications", "Opportunities", "Community"];
const paths = ["Trainee", "Intern", "Researcher", "Mentor", "Trainer", "Volunteer", "Partner", "Community member"];

export default function SanHubPage() {
  return (
    <PublicPage>
      <PageIntro eyebrow="SAN HUB" title="Learn, connect, build, keep going." description="SAN HUB is the learning and innovation ecosystem inside SAN TECH - a place for practical skills, programs, opportunities, and community." actions={[{ label: "Join SAN HUB", href: "/join-the-community" }, { label: "Explore courses", href: "/san-hub/courses", tone: "secondary" }]} />
      <section className="px-6 py-20 sm:px-10 lg:px-16 lg:py-28"><div className="mx-auto max-w-7xl"><SectionHeading eyebrow="The ecosystem" title="Everything connected around your next move." /><div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{modules.map((module, index) => <div key={module} className="rounded-[1.5rem] border border-slate-200 bg-white p-6"><span className="text-xs font-black text-brand-secondary">0{index + 1}</span><h3 className="mt-14 text-xl font-black tracking-[-0.03em]">{module}</h3><p className="mt-3 text-sm leading-6 text-slate-500">A connected part of the SAN HUB journey.</p></div>)}</div></div></section>
      <section className="bg-slate-950 px-6 py-20 text-white sm:px-10 lg:px-16 lg:py-28"><div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr]"><SectionHeading dark eyebrow="Find your path" title="There is a place for your contribution." description="Choose the role that best describes how you want to learn, help, research, mentor, or partner with the ecosystem." /><div className="grid gap-3 sm:grid-cols-2">{paths.map((path) => <div key={path} className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/[0.04] p-4 text-sm font-semibold text-white/80"><span className="grid size-7 place-items-center rounded-full bg-white text-brand-secondary"><Check className="size-3.5" /></span>{path}</div>)}</div></div></section>
      <section className="px-6 py-20 text-center sm:px-10 lg:px-16 lg:py-28"><p className="text-[10px] font-bold uppercase tracking-[0.24em] text-brand-secondary">Your next move starts here</p><h2 className="mx-auto mt-4 max-w-3xl text-5xl font-black leading-[0.94] tracking-[-0.07em] sm:text-7xl">Build capability that travels.</h2><Link href="/join-the-community" className="mt-8 inline-flex items-center gap-2 rounded-full bg-slate-950 px-6 py-3.5 text-sm font-bold text-white hover:bg-brand-secondary">Join the community <ArrowUpRight className="size-4" /></Link></section>
    </PublicPage>
  );
}

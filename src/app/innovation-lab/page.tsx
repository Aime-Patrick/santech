import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageIntro, Pill, PublicPage, SectionHeading } from "@/components/public-page";

const products = ["E-Visitors", "SAN TRACK", "SAN BOOK", "REVIXSAN", "SANVERSE"];
const services = ["Software development", "Web and mobile applications", "AI solutions", "IoT and embedded systems", "Cybersecurity", "Digital transformation", "Training and capacity building", "Systems integration", "Consultancy"];
const technologies = ["Web platforms", "Mobile apps", "Cloud systems", "AI and machine learning", "IoT", "Data and analytics", "Cybersecurity", "Automation"];
const sectors = ["Government", "Education", "Healthcare", "Tourism", "Manufacturing", "Agriculture", "Transport", "Financial services", "SMEs", "NGOs"];

export default function InnovationLabPage() {
  return (
    <PublicPage>
      <PageIntro eyebrow="Explore us / Innovation Lab" title="A catalogue of what SAN TECH can make possible." description="Explore products, services, solutions, projects, and technologies built for the work that matters." actions={[{ label: "Start a conversation", href: "/connect" }, { label: "View E-Visitors", href: "/e-visitors", tone: "secondary" }]} />
      <section className="px-6 py-20 sm:px-10 lg:px-16 lg:py-28"><div className="mx-auto max-w-7xl"><SectionHeading eyebrow="Products" title="Tools made for momentum." /><div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{products.map((product, index) => <Link key={product} href={product === "E-Visitors" ? "/e-visitors" : "/connect"} className="group rounded-[1.75rem] border border-slate-200 bg-white p-7 shadow-[0_18px_50px_rgba(15,23,42,0.05)] transition-all hover:-translate-y-1 hover:border-brand-secondary/30 hover:shadow-[0_24px_60px_rgba(15,23,42,0.1)]"><span className="text-sm font-black text-brand-secondary">0{index + 1}</span><div className="mt-16 flex items-end justify-between gap-4"><h3 className="text-2xl font-black tracking-[-0.04em]">{product}</h3><span className="grid size-10 place-items-center rounded-full bg-slate-100 transition-colors group-hover:bg-brand-secondary group-hover:text-white"><ArrowUpRight className="size-4" /></span></div></Link>)}</div></div></section>
      <section className="bg-slate-100 px-6 py-20 sm:px-10 lg:px-16 lg:py-28"><div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.7fr_1.3fr]"><SectionHeading eyebrow="Services" title="Capability that meets the challenge." description="From first question to long-term support, our teams connect strategy, technology, and delivery." /><div className="flex flex-wrap content-start gap-3">{services.map((service) => <Pill key={service}>{service}</Pill>)}</div></div></section>
      <section className="px-6 py-20 sm:px-10 lg:px-16 lg:py-28"><div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2"><div><SectionHeading eyebrow="Technologies" title="The tools behind the outcomes." /><div className="mt-8 flex flex-wrap gap-3">{technologies.map((technology) => <Pill key={technology}>{technology}</Pill>)}</div></div><div><SectionHeading eyebrow="By sector" title="Designed for real contexts." /><div className="mt-8 flex flex-wrap gap-3">{sectors.map((sector) => <Pill key={sector}>{sector}</Pill>)}</div></div></div></section>
    </PublicPage>
  );
}

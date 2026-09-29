import { ArrowUpRight, Globe2, GraduationCap, Landmark, Users } from "lucide-react";

const impactStats = [
  { value: "10k+", label: "Beneficiaries empowered", description: "People reached through SAN TECH programs, projects, and community work.", icon: Users },
  { value: "2,500+", label: "Training graduates", description: "Learners who have strengthened their digital and technology capability.", icon: GraduationCap },
  { value: "47+", label: "Institutions served", description: "Organizations supported with systems, skills, and practical innovation.", icon: Landmark },
  { value: "12+", label: "Countries reached", description: "A growing network of people and partners across Africa and beyond.", icon: Globe2 },
] as const;

export function SanHubImpactSection() {
  return (
    <section id="san-hub-impact" className="san-hub-graphic-section border-b border-slate-200 py-4 sm:px-4 lg:px-10 lg:py-8">
      <div className="mx-auto max-w-[1500px] bg-white px-4 py-2">
        <p className="text-xs font-black uppercase tracking-[0.24em] text-brand-secondary">SAN HUB / Impact in action</p>
        <div className="mt-4 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end lg:gap-16">
          <h1 className="font-exo max-w-xl text-3xl font-bold leading-[1.02] tracking-[-0.055em] text-[#0a1f44] sm:text-4xl">Impact is what remains after the program ends.</h1>
          <div className="max-w-2xl">
            <p className="text-lg leading-8 text-[#303755]">SAN HUB brings people, practical learning, innovation, and opportunity closer together.</p>
            <p className="mt-3 text-sm leading-6 text-slate-600">These milestones reflect a wider ecosystem of learners, institutions, partners, and teams building useful technology together.</p>
          </div>
        </div>

        <div className="mt-12 grid border-y border-slate-200 sm:grid-cols-2 lg:grid-cols-4  ">
          {impactStats.map(({ value, label, description, icon: Icon }, index) => (
            <article key={label} className={`py-6 sm:px-6 lg:py-7 ${index > 0 ? "border-t border-slate-200 sm:border-l sm:border-t-0 lg:border-t-0" : "sm:pl-0"}`}>
              <div className="flex items-center justify-between gap-4"><span className="grid size-10 place-items-center rounded-xl bg-white text-brand-secondary shadow-sm"><Icon className="size-5" aria-hidden="true" /></span><ArrowUpRight className="size-4 text-slate-400" aria-hidden="true" /></div>
              <p className="font-exo mt-6 text-3xl font-bold tracking-[-0.04em] text-[#0a1f44]">{value}</p>
              <h2 className="mt-1 text-sm font-bold text-[#0a1f44]">{label}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

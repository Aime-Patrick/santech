import { ArrowUpRight, GraduationCap, Network, Users } from "lucide-react";

const tractionPoints = [
  { value: "10k+", label: "Beneficiaries reached", description: "People connected to SAN TECH programs and practical technology work.", icon: Users },
  { value: "2,500+", label: "Training graduates", description: "Learners who have taken a step toward stronger digital capability.", icon: GraduationCap },
  { value: "47+", label: "Institutions served", description: "Organizations using technology to improve how they work and serve people.", icon: Network },
] as const;

export function SanHubTractionSection() {
  return (
    <section className="san-hub-graphic-section border-b border-slate-200 px-6 py-14 sm:px-10 lg:px-16 lg:py-20">
      <div className="mx-auto max-w-[1500px]">
        <p className="text-xs font-black uppercase tracking-[0.24em] text-brand-secondary">SAN HUB / Traction</p>
        <div className="mt-4 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end lg:gap-16">
          <h1 className="font-exo max-w-xl text-3xl font-bold leading-[1.02] tracking-[-0.055em] text-[#0a1f44] sm:text-4xl">Progress is useful when it keeps moving.</h1>
          <p className="max-w-2xl text-base leading-7 text-slate-600">SAN HUB connects learning to systems, projects, people, and opportunities that can continue after a program ends.</p>
        </div>
        <div className="mt-10 grid border-y border-slate-200 sm:grid-cols-3">
          {tractionPoints.map(({ value, label, description, icon: Icon }, index) => (
            <div key={label} className={`py-6 sm:px-6 ${index > 0 ? "border-t border-slate-200 sm:border-l sm:border-t-0" : "sm:pl-0"}`}>
              <div className="flex items-center justify-between gap-4"><span className="grid size-10 place-items-center rounded-xl bg-white text-brand-secondary shadow-sm"><Icon className="size-5" aria-hidden="true" /></span><ArrowUpRight className="size-4 text-slate-400" aria-hidden="true" /></div>
              <p className="font-exo mt-6 text-3xl font-bold tracking-[-0.04em] text-[#0a1f44]">{value}</p>
              <p className="mt-1 text-sm font-bold text-[#0a1f44]">{label}</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

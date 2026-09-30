import { ArrowRight, BookOpen, Hammer, Network } from "lucide-react";

const aboutSteps = [
  { label: "Learn", description: "Technology and digital skills.", icon: BookOpen },
  { label: "Build", description: "Practical projects and prototypes.", icon: Hammer },
  { label: "Connect", description: "Mentors, experts, and industry.", icon: Network },
] as const;

export function SanHubAboutSection() {
  return (
    <section id="san-hub-about" className="san-hub-graphic-section scroll-mt-40 border-b border-slate-200 px-6 py-14 sm:px-10 lg:px-16 lg:py-20">
      <div className="mx-auto max-w-[1500px] bg-white px-5 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-12">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-end lg:gap-20">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.24em] text-brand-secondary">SAN HUB</p>
            <h1 className="font-exo mt-4 max-w-2xl text-3xl font-bold leading-[1.02] tracking-[-0.055em] text-[#0a1f44] sm:text-4xl lg:text-5xl">From learning to innovation, from innovation to impact.</h1>
          </div>
          <div className="max-w-2xl">
            <p className="text-lg leading-8 text-[#303755]">SAN HUB is the innovation, technology, learning, and venture-building ecosystem of SAN TECH.</p>
            <p className="mt-4 text-sm leading-6 text-slate-600">It connects learners, innovators, researchers, entrepreneurs, institutions, industry, mentors, and technology partners to transform ideas into practical solutions, businesses, careers, and measurable social impact.</p>
          </div>
        </div>

        <div className="mt-12 grid border-y border-slate-200 sm:grid-cols-3">
          {aboutSteps.map(({ label, description, icon: Icon }, index) => (
            <div key={label} className={`flex items-start gap-4 py-6 sm:px-6 ${index > 0 ? "border-t border-slate-200 sm:border-l sm:border-t-0" : "sm:pl-0"}`}>
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-white text-brand-secondary shadow-sm"><Icon className="size-5" aria-hidden="true" /></span>
              <div>
                <p className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.12em] text-[#0a1f44]">{label} <ArrowRight className="size-3.5 text-brand-secondary" aria-hidden="true" /></p>
                <p className="mt-2 max-w-xs text-sm leading-6 text-slate-600">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

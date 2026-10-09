import { ArrowRight, BookOpen, Hammer, Network } from "lucide-react";
import { SanHubAboutHero } from "@/components/san-hub/san-hub-about-hero";
import { SanHubAboutLearning } from "@/components/san-hub/san-hub-about-learning";
import { SanHubAboutMoments } from "@/components/san-hub/san-hub-about-moments";
import type { SanHubCatalogItem } from "@/lib/san-hub-catalog-data";

const aboutSteps = [
  { label: "Learn", description: "Technology and digital skills.", icon: BookOpen },
  { label: "Build", description: "Practical projects and prototypes.", icon: Hammer },
  { label: "Connect with us", description: "Mentors, experts, and industry.", icon: Network },
] as const;

export function SanHubAboutSection({ items = [] }: { items?: readonly SanHubCatalogItem[] }) {
  return (
    <section id="san-hub-about" className="san-hub-graphic-section ">
      <SanHubAboutHero />
      <div className="mx-auto bg-white px-5 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-12">
        <SanHubAboutLearning items={items} />

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

        {/* Authentic Photographic Showcase */}
        <div className="mt-12">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-secondary">Authentic Moments</p>
              <h2 className="font-exo mt-1 text-xl font-bold text-[#0a1f44]">Cohorts, Innovation & Graduate Recognition</h2>
            </div>
          </div>

          <SanHubAboutMoments />
        </div>
      </div>
    </section>
  );
}

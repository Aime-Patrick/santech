import Image from "next/image";
import { ArrowRight, BookOpen, Hammer, Network, Sparkles } from "lucide-react";

const aboutSteps = [
  { label: "Learn", description: "Technology and digital skills.", icon: BookOpen },
  { label: "Build", description: "Practical projects and prototypes.", icon: Hammer },
  { label: "Connect", description: "Mentors, experts, and industry.", icon: Network },
] as const;

const showcaseMoments = [
  {
    title: "Practical Cohorts & Youth STEM",
    category: "Learning",
    image: "/images/techforwardlive2026-photo-download-1of1/Highlights/CEPSTUDIO(1).jpg",
    alt: "Young students and STEM tech cohort in a learning session",
  },
  {
    title: "Innovation & Pitch Days",
    category: "Prototyping",
    image: "/images/techforwardlive2026-photo-download-1of1/Highlights/CEPSTUDIO(108).jpg",
    alt: "Innovator presenting digital solutions and AI systems on stage",
  },
  {
    title: "Certifications & Recognition",
    category: "Graduation",
    image: "/images/techforwardlive2026-photo-download-1of1/Highlights/CEPSTUDIO(174).jpg",
    alt: "SAN TECH leadership presenting official graduation and recognition certificates",
  },
] as const;

export function SanHubAboutSection() {
  return (
    <section id="san-hub-about" className="san-hub-graphic-section scroll-mt-40 border-b border-slate-200 px-6 py-14 sm:px-10 lg:px-16 lg:py-20">
      <div className="mx-auto max-w-[1500px] rounded-2xl bg-white px-5 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-12">
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

        {/* Authentic Photographic Showcase */}
        <div className="mt-12">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-secondary">Authentic Moments</p>
              <h2 className="font-exo mt-1 text-xl font-bold text-[#0a1f44]">Cohorts, Innovation & Graduate Recognition</h2>
            </div>
            <span className="hidden items-center gap-1.5 rounded-full bg-[#e8f1fc] px-3 py-1 text-xs font-bold text-brand-secondary sm:inline-flex">
              <Sparkles className="size-3.5" aria-hidden="true" />
              Tech Forward Live
            </span>
          </div>

          <div className="grid gap-5 sm:grid-cols-3">
            {showcaseMoments.map((moment) => (
              <figure key={moment.title} className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_8px_24px_rgba(10,31,68,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-brand-secondary/40 hover:shadow-[0_16px_36px_rgba(10,31,68,0.12)]">
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                  <Image
                    src={moment.image}
                    alt={moment.alt}
                    fill
                    sizes="(min-width: 640px) 33vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-[#07152d]/80 px-2.5 py-0.5 text-[9px] font-black uppercase tracking-[0.14em] text-white backdrop-blur-sm">
                    {moment.category}
                  </span>
                </div>
                <figcaption className="p-4">
                  <h3 className="font-exo text-sm font-bold text-[#0a1f44]">{moment.title}</h3>
                  <p className="mt-1 text-xs text-slate-500">{moment.alt}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

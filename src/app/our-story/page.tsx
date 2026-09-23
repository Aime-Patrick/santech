import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageIntro, PublicPage, SectionHeading } from "@/components/public-page";
import { StoryTimeline } from "@/components/story-timeline";

const pillars = [
  { title: "Mission", description: "Build useful technology and pathways that help people and institutions move forward." },
  { title: "Vision", description: "Grow an African innovation ecosystem where ideas become trusted, lasting impact." },
  { title: "Core values", description: "Stay practical, curious, inclusive, accountable, and generous with knowledge." },
  { title: "Team and impact", description: "Bring together builders, educators, researchers, partners, and communities to create measurable change." },
];

export default function OurStoryPage() {
  return (
    <PublicPage>
      <PageIntro eyebrow="Our Legacy" title="Technology with a human reason." description="SAN TECH is a technology company and innovation ecosystem helping people, institutions, and ideas move forward." actions={[{ label: "Connect with us", href: "/connect" }, { label: "Join the community", href: "/join-the-community", tone: "secondary" }]} />

      <section className="px-6 py-20 sm:px-10 lg:px-16 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading eyebrow="Who we are" title="A practical partner for progress." description="We bring together software, skills, research, and partnerships to solve meaningful problems in the places where technology has to work in real life." />
          <div className="grid gap-5 sm:grid-cols-2">
            {pillars.map((pillar, index) => (
              <div key={pillar.title} className="rounded-xl border border-slate-200 bg-white p-7 shadow-[0_18px_50px_rgba(15,23,42,0.05)]">
                <span className="text-sm font-black text-brand-secondary">0{index + 1}</span>
                <h3 className="mt-12 text-2xl font-black tracking-[-0.04em]">{pillar.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-500">{pillar.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-6 py-20 sm:px-10 lg:px-16 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.7fr_1.3fr]">
          <SectionHeading eyebrow="Our journey" title="Built one useful step at a time." description="The story keeps moving through products, programs, partnerships, and people empowered to create more." />
          <StoryTimeline />
        </div>
      </section>

      <section className="px-6 py-20 sm:px-10 lg:px-16 lg:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-brand-secondary">Awards & recognition</p>
            <h2 className="mt-5 text-4xl font-black leading-[0.94] tracking-[-0.06em] sm:text-6xl">Recognition belongs to the ecosystem.</h2>
            <p className="mt-6 max-w-lg text-base leading-7 text-slate-600">Our work is shaped by the people and partners who make every product, program, and outcome possible. This recognition marks that shared effort.</p>
            <Link href="/connect" className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-brand-secondary">Work with SAN TECH <ArrowUpRight className="h-4 w-4" /></Link>
          </div>
          <div className="mx-auto w-full max-w-md">
            <Image src="/troph.jpg" alt="SAN TECH Best Exhibitor - ICT and Innovation Sector recognition" width={720} height={1024} className="mx-auto h-[320px] w-auto object-contain sm:h-[380px]" />
          </div>
        </div>
      </section>
    </PublicPage>
  );
}

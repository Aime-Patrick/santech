import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageIntro, Pill, PublicPage, SectionHeading } from "@/components/public-page";

const stories = [
  { type: "Opportunity", title: "Build your next chapter with SAN HUB", date: "Open now" },
  { type: "News", title: "Designing technology for the realities people live", date: "SAN TECH journal" },
  { type: "Event", title: "The next generation of African innovation", date: "Coming soon" },
  { type: "Award", title: "SAN TECH recognized for ICT and innovation", date: "Latest" },
  { type: "Trend", title: "Technology that strengthens sustainable growth", date: "In focus" },
  { type: "Impact", title: "Tracking contribution beyond the launch", date: "SAN TECH journal" },
];

export default function TechPulsePage() {
  return (
    <PublicPage>
      <PageIntro
        eyebrow="Trends / Tech Pulse"
        title="Keep moving with the signal."
        description="Opportunities, news, tenders, events, achievements, partnerships, technology trends, and sustainable contribution from across the SAN TECH ecosystem."
        actions={[{ label: "Submit an opportunity", href: "/connect" }]}
      />

      <section className="px-6 py-20 sm:px-10 lg:px-16 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-6">
            <Pill>All</Pill>
            <Pill>Opportunities</Pill>
            <Pill>News</Pill>
            <Pill>Tenders</Pill>
            <Pill>Events</Pill>
            <Pill>Trends</Pill>
            <Pill>Sustainable contribution</Pill>
          </div>

          <div className="mt-10 divide-y divide-slate-200 border-y border-slate-200">
            {stories.map((story) => (
              <Link
                key={story.title}
                href="/connect"
                className="group grid gap-4 py-7 sm:grid-cols-[150px_1fr_auto] sm:items-center"
              >
                <span className="text-sm font-black uppercase tracking-[0.2em] text-brand-secondary">{story.type}</span>
                <span className="text-xl font-black tracking-[-0.03em] text-slate-900 transition-colors group-hover:text-brand-secondary">{story.title}</span>
                <span className="flex items-center gap-2 text-xs font-semibold text-slate-400">
                  {story.date}
                  <ArrowUpRight className="size-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-950 px-6 py-20 text-white sm:px-10 lg:px-16 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.7fr_1.3fr]">
          <SectionHeading
            dark
            eyebrow="Tenders, trends, and contribution"
            title="Useful information, easy to find."
            description="The full platform will support search, category, date, deadline, and impact filters from the CMS."
          />
          <div className="rounded-xl border border-white/15 bg-white/[0.04] p-7">
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="flex h-12 items-center rounded-xl border border-white/15 bg-white/5 px-4 text-xs font-bold text-white/65">Opportunities</div>
              <div className="flex h-12 items-center rounded-xl border border-white/15 bg-white/5 px-4 text-xs font-bold text-white/65">Technology trends</div>
              <div className="flex h-12 items-center rounded-xl border border-white/15 bg-white/5 px-4 text-xs font-bold text-white/65">Sustainable contribution</div>
            </div>
            <p className="mt-6 text-sm leading-6 text-white/50">Search and filtering will connect opportunities, tenders, news, and events into one pulse.</p>
          </div>
        </div>
      </section>
    </PublicPage>
  );
}

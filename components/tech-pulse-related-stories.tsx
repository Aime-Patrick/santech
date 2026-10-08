import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CalendarDays, Clock3 } from "lucide-react";
import type { TechPulseArticle } from "@/lib/tech-pulse-data";

export type RelatedTechPulseStory = Pick<
  TechPulseArticle,
  "slug" | "categoryLabel" | "title" | "date" | "readingTime" | "image" | "imageAlt" | "excerpt"
>;

export function TechPulseRelatedStories({ stories }: { stories: RelatedTechPulseStory[] }) {
  if (stories.length === 0) return null;

  return (
    <section className="border-t border-slate-200 bg-[#f7fafc] px-5 py-10 sm:px-8 sm:py-12 lg:px-16 lg:py-14">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-slate-200 pb-5">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-brand-secondary">Keep exploring</p>
            <h2 className="font-exo mt-2 text-2xl font-bold leading-tight tracking-[-0.04em] text-[#0a1f44] sm:text-3xl">Related news and announcements</h2>
          </div>
          <Link href="/tech-pulse" className="inline-flex items-center gap-2 text-sm font-bold text-[#0a1f44] transition-colors hover:text-brand-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary focus-visible:ring-offset-4">
            View all Tech Pulse <ArrowUpRight className="size-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-7 grid gap-6 md:grid-cols-3">
          {stories.map((story) => (
            <article key={story.slug} className="group flex min-w-0 flex-col">
              <Link href={`/tech-pulse/${story.slug}`} className="relative block aspect-[16/9] overflow-hidden rounded-xl bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary focus-visible:ring-offset-4">
                <Image src={story.image} alt={story.imageAlt} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]" />
                <span className="absolute left-3 top-3 rounded-full bg-white px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.14em] text-[#0a1f44] shadow-sm">{story.categoryLabel}</span>
              </Link>
              <div className="flex flex-1 flex-col pt-4">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-slate-500">
                  <span className="inline-flex items-center gap-1.5"><CalendarDays className="size-3.5 text-brand-secondary" aria-hidden="true" />{story.date}</span>
                  <span className="inline-flex items-center gap-1.5"><Clock3 className="size-3.5 text-brand-secondary" aria-hidden="true" />{story.readingTime}</span>
                </div>
                <h3 className="font-exo mt-3 text-lg font-bold leading-tight tracking-[-0.03em] text-[#0a1f44] transition-colors group-hover:text-brand-secondary">{story.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-6 text-slate-600">{story.excerpt}</p>
                <Link href={`/tech-pulse/${story.slug}`} className="mt-4 inline-flex w-fit items-center gap-2 text-sm font-bold text-[#0a1f44] transition-colors hover:text-brand-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary focus-visible:ring-offset-2">
                  Read story <ArrowUpRight className="size-4" aria-hidden="true" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, CalendarDays, Clock3 } from "lucide-react";
import { notFound } from "next/navigation";
import { PublicPage } from "@/components/public-page";
import { TechPulseShare } from "@/components/tech-pulse-share";
import { getTechPulseArticle, techPulseArticles } from "@/lib/tech-pulse-data";

export function generateStaticParams() {
  return techPulseArticles.map((article) => ({ slug: article.slug }));
}

export default async function TechPulseArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getTechPulseArticle(slug);

  if (!article) notFound();

  return (
    <PublicPage>
      <article className="border-b border-slate-200 bg-white px-5 pb-10 pt-6 sm:px-8 lg:px-16 lg:pb-14 lg:pt-8">
        <div className="mx-auto max-w-5xl">
          <Link href="/tech-pulse" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-slate-500 transition-colors hover:text-brand-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary focus-visible:ring-offset-4"><ArrowLeft className="size-4" /> Back to Tech Pulse</Link>

          <div className="mt-7 max-w-4xl">
            <p className="text-xs font-black uppercase tracking-[0.24em] text-brand-secondary">{article.categoryLabel}</p>
            <h1 className="font-exo mt-3 text-3xl font-bold leading-[1.04] tracking-[-0.05em] text-[#0a1f44] sm:text-4xl lg:text-5xl">{article.title}</h1>
            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-500">
              <span className="inline-flex items-center gap-2"><CalendarDays className="size-4 text-brand-secondary" aria-hidden="true" />{article.date}</span>
              <span className="inline-flex items-center gap-2"><Clock3 className="size-4 text-brand-secondary" aria-hidden="true" />{article.readingTime}</span>
            </div>
          </div>

          <div className="relative mt-7 aspect-[16/7] max-w-4xl overflow-hidden bg-slate-100 sm:mt-8">
            <Image src={article.image} alt={article.imageAlt} fill priority sizes="(min-width: 1024px) 1024px, 100vw" className="object-cover" />
          </div>

          <div className="grid gap-10 pt-10 lg:grid-cols-[minmax(0,1fr)_220px] lg:gap-16">
            <div className="max-w-3xl">
              <p className="text-lg leading-7 text-[#0a1f44]">{article.excerpt}</p>
              <div className="mt-7 space-y-5 text-[15px] leading-7 text-slate-600">
                {article.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
            </div>
            <aside className="h-fit border-t border-slate-200 pt-5 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Tech Pulse</p>
              <p className="mt-3 text-sm leading-6 text-slate-600">Stories from the SAN TECH ecosystem, prepared for the future content platform.</p>
              <Link href="/connect" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#0a1f44] hover:text-brand-secondary">Connect with us <ArrowUpRight className="size-4" /></Link>
              <div className="mt-4">
                <TechPulseShare title={article.title} />
              </div>
            </aside>
          </div>
        </div>
      </article>
    </PublicPage>
  );
}

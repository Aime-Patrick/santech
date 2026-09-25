import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageIntro, PublicPage } from "@/components/public-page";
import { SanHubCatalog } from "@/components/san-hub-catalog";

export default function SanHubPage() {
  return (
    <PublicPage>
      <PageIntro eyebrow="SAN HUB" title="Learn, connect, build, keep going." description="SAN HUB is the learning and innovation ecosystem inside SAN TECH — a place for practical skills, programs, opportunities, and community." actions={[{ label: "Join SAN HUB", href: "/join-the-community" }, { label: "Explore courses", href: "/san-hub", tone: "secondary" }]} />
      <SanHubCatalog />
      <section className="px-6 py-20 text-center sm:px-10 lg:px-16 lg:py-28">
        <p className="text-sm font-bold uppercase tracking-[0.24em] text-brand-secondary">Your next move starts here</p>
        <h2 className="font-exo mx-auto mt-4 max-w-3xl text-4xl font-bold leading-[1] tracking-[-0.05em] sm:text-5xl">Build capability that travels.</h2>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/join-the-community" className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-6 py-3.5 text-sm font-bold text-white hover:bg-brand-secondary">Join the community <ArrowUpRight className="size-4" /></Link>
          <Link href="/connect?topic=partnership" className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-bold text-slate-800 hover:border-brand-secondary">Partner with SAN HUB <ArrowUpRight className="size-4" /></Link>
        </div>
      </section>
    </PublicPage>
  );
}

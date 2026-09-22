import { HeroVisual } from "@/components/hero-visual";
import { SiteHeader } from "@/components/site-header";

export default function HomePage() {
  return (
    <main className="h-screen overflow-hidden bg-slate-50 text-slate-900">
      <section className="relative isolate h-screen min-h-screen">
        <SiteHeader />
        <HeroVisual />
      </section>
    </main>
  );
}

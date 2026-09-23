import { SantechHomeStage } from "@/components/santech-home-stage";
import { SiteHeader } from "@/components/site-header";

export default function HomePage() {
  return (
    <main className="h-svh overflow-hidden bg-slate-100/60 pt-[112px] text-slate-900 sm:pt-[112px]">
      <SiteHeader />
      <SantechHomeStage />
    </main>
  );
}

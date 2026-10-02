import { SantechHomeStage } from "@/components/santech-home-stage";
import { SiteHeader } from "@/components/site-header";
import { CircuitBackground } from "@/components/ui/circuit-background";

export default function HomePage() {
  return (
    <CircuitBackground as="main" className="min-h-svh overflow-x-hidden pt-[112px] text-slate-900 lg:fixed lg:inset-x-0 lg:top-[112px] lg:bottom-0 lg:h-auto lg:min-h-0 lg:overflow-hidden lg:pt-0">
      <SiteHeader landing />
      <SantechHomeStage />
    </CircuitBackground>
  );
}

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Tiles } from "@/components/ui/tiles";
import { CircuitBackground } from "@/components/ui/circuit-background";

type Action = { label: string; href: string; tone?: "primary" | "secondary" };

export function PublicPage({ children }: { children: ReactNode }) {
  return (
    <CircuitBackground className="overflow-x-hidden text-slate-900">
      <div className="flex min-h-svh flex-col">
        <SiteHeader />
        <main className="min-h-0 flex-1 pt-28">{children}</main>
        <SiteFooter />
      </div>
    </CircuitBackground>
  );
}

export function PageIntro({
  eyebrow,
  title,
  description,
  actions = [],
  titleClassName = "",
  compact = false,
}: {
  eyebrow: string;
  title: string;
  description: string;
  actions?: Action[];
  titleClassName?: string;
  compact?: boolean;
}) {
  return (
    <section className={`relative isolate overflow-hidden border-b border-slate-200/80 bg-gradient-to-b from-[#edf1f7] via-[#edf1f7] to-[#e4eaf3] px-6 sm:px-10 lg:px-16 ${compact ? "pb-8 pt-8 sm:pb-10 sm:pt-10" : "pb-14 pt-14 sm:pt-20 lg:pb-20"}`}>
      <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center opacity-40 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_60%,transparent_100%)]">
        <Tiles rows={40} cols={6} tileSize="lg" className="h-full w-full" />
      </div>
      <div className={`mx-auto grid max-w-7xl lg:grid-cols-[1.2fr_0.8fr] lg:items-end ${compact ? "gap-6" : "gap-10"}`}>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-secondary">{eyebrow}</p>
          <h1 className={`font-exo max-w-4xl font-bold leading-[0.98] tracking-[-0.055em] text-slate-950 ${compact ? "mt-3 text-2xl sm:text-3xl lg:text-4xl" : `mt-5 ${titleClassName || "text-2xl sm:text-3xl lg:text-4xl"}`}`}>{title}</h1>
        </div>
        <div className="max-w-md lg:justify-self-end">
          <p className={`${compact ? "text-sm leading-6" : "text-base leading-7"} text-slate-600`}>{description}</p>
          {actions.length > 0 && (
            <div className={`${compact ? "mt-5 gap-2" : "mt-7 gap-3"} flex flex-wrap`}>
              {actions.map((action) => (
                <Link
                  key={action.label}
                  href={action.href}
                  className={`inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-xs font-bold transition-all ${
                    action.tone === "secondary"
                      ? "border border-slate-200 bg-white text-slate-800 hover:border-slate-300 hover:shadow-sm"
                      : "bg-brand-secondary text-white hover:bg-[#1519ad]"
                  }`}
                >
                  {action.label}
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  dark = false,
  titleClassName = "",
  className = "",
}: {
  eyebrow: string;
  title: string;
  description?: string;
  dark?: boolean;
  titleClassName?: string;
  className?: string;
}) {
  return (
    <div className={`max-w-2xl ${className}`}>
      <p className={`text-sm font-bold uppercase tracking-[0.24em] ${dark ? "text-white" : "text-brand-secondary"}`}>
        {eyebrow}
      </p>
      <h2
        className={`font-exo mt-4 font-bold leading-[1] tracking-[-0.045em] ${
          titleClassName
            ? `${dark ? "text-white" : "text-slate-950"} ${titleClassName}`
            : dark
              ? "text-2xl text-white sm:text-4xl"
              : "text-2xl text-slate-950 sm:text-4xl"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p className={`mt-5 text-base leading-7 ${dark ? "text-white/60" : "text-slate-600"}`}>
          {description}
        </p>
      )}
    </div>
  );
}

export function Pill({ children }: { children: ReactNode }) {
  return <span className="inline-flex rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600">{children}</span>;
}

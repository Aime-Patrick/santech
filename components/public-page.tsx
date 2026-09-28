import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import type { ReactNode } from "react";
import { SiteHeader } from "@/components/site-header";
import { Tiles } from "@/components/ui/tiles";

type Action = { label: string; href: string; tone?: "primary" | "secondary" };

export function PublicPage({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-[#edf1f7] text-slate-900">
      <SiteHeader />
      <main className="flex-1 pt-28">{children}</main>
      <footer className="relative overflow-hidden bg-[#0c1230] text-white">
        <div className="mx-auto max-w-7xl px-6 py-8 sm:px-10 lg:px-16 lg:py-10">
          <div className="grid gap-6 border-white/15 sm:grid-cols-[1fr_auto] sm:items-end">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-cyan">Connect with SAN TECH</p>
              <div className="mt-3 flex flex-col gap-2 text-sm font-medium text-white/75 sm:flex-row sm:flex-wrap sm:gap-x-6">
                <a href="mailto:info@santechinnovate.com" className="flex items-center gap-2 transition-colors hover:text-brand-cyan">
                  <Mail className="size-4 text-brand-cyan" />
                  info@santechinnovate.com
                </a>
                <a href="tel:+250780309833" className="flex items-center gap-2 transition-colors hover:text-brand-cyan">
                  <Phone className="size-4 text-brand-cyan" />
                  +250 780 309 833 / +223 710 058 73
                </a>
                <span className="flex items-center gap-2"><MapPin className="size-4 text-brand-cyan" />Kigali, Rwanda</span>
              </div>
            </div>
            <Link href="/connect" className="inline-flex w-fit items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-brand-secondary transition-colors hover:bg-brand-cyan hover:text-brand-secondary">
              Start a conversation <ArrowUpRight className="size-4" />
            </Link>
          </div>

          <div className="mt-6 flex flex-col gap-2 border-t border-white/15 pt-4 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
            <span>Copyright 2026 SAN TECH. All rights reserved.</span>
            <span>Technology · Innovation · Skills · Impact</span>
          </div>
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-2 bg-white"
          style={{ backgroundImage: "url('/imingogo-trimmed.png')", backgroundPosition: "center bottom", backgroundRepeat: "repeat-x", backgroundSize: "44px 22px" }}
        />
      </footer>
    </div>
  );
}

export function PageIntro({
  eyebrow,
  title,
  description,
  actions = [],
  titleClassName = "",
}: {
  eyebrow: string;
  title: string;
  description: string;
  actions?: Action[];
  titleClassName?: string;
}) {
  return (
    <section className="relative isolate overflow-hidden border-b border-slate-200/80 bg-gradient-to-b from-[#edf1f7] via-[#edf1f7] to-[#e4eaf3] px-6 pb-14 pt-14 sm:px-10 sm:pt-20 lg:px-16 lg:pb-20">
      <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center opacity-40 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_60%,transparent_100%)]">
        <Tiles rows={40} cols={6} tileSize="lg" className="w-full h-full" />
      </div>
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-brand-secondary">{eyebrow}</p>
          <h1 className={`font-exo mt-5 max-w-4xl font-bold leading-[0.98] tracking-[-0.055em] text-slate-950 ${titleClassName || "text-2xl sm:text-3xl lg:text-4xl"}`}>{title}</h1>
        </div>
        <div className="max-w-md lg:justify-self-end">
          <p className="text-base leading-7 text-slate-600">{description}</p>
          {actions.length > 0 && (
            <div className="mt-7 flex flex-wrap gap-3">
              {actions.map((action) => (
                <Link
                  key={action.label}
                  href={action.href}
                  className={`inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-bold transition-all ${
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

export function  SectionHeading({
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
              ? "text-2xl sm:text-4xl text-white"
              : "text-2xl sm:text-4xl text-slate-950"
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

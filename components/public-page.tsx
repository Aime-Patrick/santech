import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import type { ReactNode } from "react";
import { SiteHeader } from "@/components/site-header";
import { navigation } from "@/lib/site-data";
import { FooterBackgroundGradient } from "@/components/ui/text-hover-effect";
import { Tiles } from "@/components/ui/tiles";
import santechLogo from "@/src/assets/santech.png";

type Action = { label: string; href: string; tone?: "primary" | "secondary" };

export function PublicPage({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <SiteHeader />
      <main className="pt-32">{children}</main>
      <footer className="relative isolate overflow-hidden bg-brand-secondary text-white">
        <FooterBackgroundGradient />
        <div aria-hidden="true" className="relative z-10 h-2 overflow-hidden bg-[#c9a313]">
          <svg className="h-full w-full" width="100%" height="8" preserveAspectRatio="none">
            <defs><pattern id="imigongo-footer-band" width="48" height="8" patternUnits="userSpaceOnUse"><path d="M0 8 6 1 12 8 18 1 24 8 30 1 36 8 42 1 48 8" fill="none" stroke="#0B0E87" strokeWidth="1.7" /><path d="M0 1 6 8 12 1 18 8 24 1 30 8 36 1 42 8 48 1" fill="none" stroke="#f3d45c" strokeWidth="0.8" opacity="0.9" /></pattern></defs>
            <rect width="100%" height="100%" fill="url(#imigongo-footer-band)" />
          </svg>
        </div>
        <div aria-hidden="true" className="pointer-events-none absolute right-[-7rem] top-20 z-0 size-[34rem] opacity-[0.12]"><svg viewBox="0 0 240 240" className="size-full"><defs><pattern id="imigongo-footer-art" width="80" height="80" patternUnits="userSpaceOnUse"><path d="M40 0 80 40 40 80 0 40Z" fill="none" stroke="#f3d45c" strokeWidth="2" /><path d="M40 15 65 40 40 65 15 40Z" fill="none" stroke="#fff" strokeWidth="1" /><path d="M40 29 51 40 40 51 29 40Z" fill="#c9a313" fillOpacity="0.28" /></pattern></defs><rect width="100%" height="100%" fill="url(#imigongo-footer-art)" /></svg></div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 py-14 sm:px-10 lg:px-16 lg:py-20">
          <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div>
              <Link href="/" className="inline-block transition-transform hover:scale-105">
                <Image
                  src={santechLogo}
                  alt="SAN TECH"
                  className="h-10 w-auto max-w-[170px] object-contain brightness-0 invert sm:h-11 sm:max-w-[190px]"
                />
              </Link>
              <p className="mt-3 text-xs font-bold uppercase tracking-[0.28em] text-[#f3d45c]">Making ideas happen</p>
              <h2 className="font-exo mt-4 max-w-xl text-3xl font-black leading-[0.98] tracking-[-0.055em] sm:text-5xl">Useful technology. Stronger systems. More possibility.</h2>
              <p className="mt-5 max-w-xl text-sm leading-6 text-white/65">From E-Visitors to SAN HUB, we build products, skills, and innovation pathways that help people and institutions move forward.</p>
            </div>
            <Link href="/connect" className="inline-flex w-fit items-center gap-2 rounded-xl bg-[#c9a313] px-5 py-3.5 text-sm font-bold text-brand-secondary transition-colors hover:bg-white">Start a conversation <ArrowUpRight className="size-4" /></Link>
          </div>

          <div className="mt-14 grid gap-10 border-t border-white/15 pt-10 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1.2fr]">
            <div><p className="text-xs font-bold uppercase tracking-[0.22em] text-[#f3d45c]">Explore</p><div className="mt-5 grid gap-3 text-sm font-semibold text-white/75">{navigation.slice(0, 4).map((item) => <Link key={item.href} href={item.href} className="w-fit transition-colors hover:text-white">{item.label}</Link>)}</div></div>
            <div><p className="text-xs font-bold uppercase tracking-[0.22em] text-[#f3d45c]">SAN HUB</p><div className="mt-5 grid gap-3 text-sm font-semibold text-white/75"><Link href="/san-hub/courses" className="w-fit transition-colors hover:text-white">Courses</Link><Link href="/san-hub" className="w-fit transition-colors hover:text-white">Training & programs</Link><Link href="/join-the-community" className="w-fit transition-colors hover:text-white">Join the community</Link><Link href="/tech-pulse" className="w-fit transition-colors hover:text-white">Events & updates</Link></div></div>
            <div><p className="text-xs font-bold uppercase tracking-[0.22em] text-[#f3d45c]">Reach SAN TECH</p><div className="mt-5 grid gap-3 text-sm font-semibold text-white/75"><a href="mailto:info@santechinnovate.com" className="flex items-center gap-3 transition-colors hover:text-white"><Mail className="size-4 text-[#f3d45c]" />info@santechinnovate.com</a><a href="tel:+250780309833" className="flex items-center gap-3 transition-colors hover:text-white"><Phone className="size-4 text-[#f3d45c]" />+250 780 309 833 / +223 710 058 73</a><span className="flex items-center gap-3"><MapPin className="size-4 text-[#f3d45c]" />Plot 48, KN 1 Road, Kigali-Rwanda</span></div></div>
          </div>

          <div className="mt-10 flex flex-col gap-3 border-t border-white/15 pt-6 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between"><span>Copyright 2026 SAN TECH. All rights reserved.</span><span>Making your ideas happen.</span><Link href="/connect" className="font-semibold text-[#f3d45c] transition-colors hover:text-white">info@santechinnovate.com <ArrowUpRight className="inline size-3" /></Link></div>
        </div>
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
    <section className="relative isolate overflow-hidden border-b border-slate-200/80 bg-gradient-to-b from-white via-slate-50/50 to-slate-100/40 px-6 pb-20 pt-20 sm:px-10 sm:pt-28 lg:px-16 lg:pb-28">
      <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center opacity-40 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_60%,transparent_100%)]">
        <Tiles rows={40} cols={6} tileSize="lg" className="w-full h-full" />
      </div>
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-brand-secondary">{eyebrow}</p>
          <h1 className={`font-exo mt-5 max-w-4xl font-black leading-[0.92] tracking-[-0.07em] text-slate-950 ${titleClassName || "text-5xl sm:text-7xl lg:text-8xl"}`}>{title}</h1>
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
        className={`font-exo mt-4 font-black leading-[0.98] tracking-[-0.05em] ${
          titleClassName
            ? `${dark ? "text-white" : "text-slate-950"} ${titleClassName}`
            : dark
              ? "text-4xl sm:text-6xl text-white"
              : "text-4xl sm:text-6xl text-slate-950"
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

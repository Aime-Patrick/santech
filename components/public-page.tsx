import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { SiteHeader } from "@/components/site-header";

type Action = { label: string; href: string; tone?: "primary" | "secondary" };

export function PublicPage({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <SiteHeader />
      <main className="pt-32">{children}</main>
      <footer className="border-t border-slate-200 bg-white px-6 py-8 sm:px-10 lg:px-16">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 SAN TECH. All rights reserved.</span>
          <span>Making your ideas happen.</span>
          <Link href="/connect" className="font-semibold text-brand-secondary hover:text-slate-900">info@santechinnovate.com</Link>
        </div>
      </footer>
    </div>
  );
}

export function PageIntro({ eyebrow, title, description, actions = [] }: { eyebrow: string; title: string; description: string; actions?: Action[] }) {
  return (
    <section className="border-b border-slate-200 px-6 pb-20 pt-20 sm:px-10 sm:pt-28 lg:px-16 lg:pb-28">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-brand-secondary">{eyebrow}</p>
          <h1 className="mt-5 max-w-4xl text-5xl font-black leading-[0.92] tracking-[-0.07em] text-slate-950 sm:text-7xl lg:text-8xl">{title}</h1>
        </div>
        <div className="max-w-md lg:justify-self-end">
          <p className="text-base leading-7 text-slate-600">{description}</p>
          {actions.length > 0 && (
            <div className="mt-7 flex flex-wrap gap-3">
              {actions.map((action) => (
                <Link key={action.label} href={action.href} className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-bold transition-all ${action.tone === "secondary" ? "border border-slate-200 bg-white text-slate-800 hover:border-slate-300 hover:shadow-sm" : "bg-slate-950 text-white hover:bg-brand-secondary"}`}>
                  {action.label}<ArrowUpRight className="h-4 w-4" />
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export function SectionHeading({ eyebrow, title, description, dark = false }: { eyebrow: string; title: string; description?: string; dark?: boolean }) {
  return (
    <div className="max-w-2xl">
      <p className={`text-[10px] font-bold uppercase tracking-[0.24em] ${dark ? "text-[#5cefcf]" : "text-brand-secondary"}`}>{eyebrow}</p>
      <h2 className={`mt-4 text-4xl font-black leading-[0.94] tracking-[-0.06em] sm:text-6xl ${dark ? "text-white" : "text-slate-950"}`}>{title}</h2>
      {description && <p className={`mt-5 text-base leading-7 ${dark ? "text-white/60" : "text-slate-600"}`}>{description}</p>}
    </div>
  );
}

export function Pill({ children }: { children: ReactNode }) {
  return <span className="inline-flex rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600">{children}</span>;
}

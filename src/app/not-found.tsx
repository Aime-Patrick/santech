import Link from "next/link";
import { ArrowLeft, CircleHelp } from "lucide-react";

export default function NotFound() {
  return (
    <main className="grid min-h-svh place-items-center bg-[#edf3fb] px-6 py-16 text-center text-[#0a1f44]">
      <div className="max-w-md">
        <CircleHelp className="mx-auto size-12 text-brand-secondary" aria-hidden="true" />
        <p className="mt-6 text-xs font-black uppercase tracking-[0.24em] text-brand-secondary">SAN TECH</p>
        <h1 className="font-exo mt-3 text-4xl font-bold tracking-[-0.05em] sm:text-5xl">Page not found.</h1>
        <p className="mt-4 text-sm leading-6 text-slate-600">The page may have moved, or the content is not available yet.</p>
        <Link href="/" className="mt-7 inline-flex items-center gap-2 rounded-lg bg-[#0a1f44] px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-brand-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary focus-visible:ring-offset-2">
          <ArrowLeft className="size-4" aria-hidden="true" />
          Return home
        </Link>
      </div>
    </main>
  );
}


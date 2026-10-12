"use client";

import { useEffect } from "react";
import { RefreshCcw } from "lucide-react";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="grid min-h-svh place-items-center bg-[#edf3fb] px-6 py-16 text-center text-[#0a1f44]">
      <div className="max-w-md">
        <p className="text-xs font-black uppercase tracking-[0.24em] text-brand-secondary">SAN TECH</p>
        <h1 className="font-exo mt-3 text-3xl font-bold tracking-[-0.05em] sm:text-4xl">Something needs a retry.</h1>
        <p className="mt-4 text-sm leading-6 text-slate-600">The page could not finish loading. Please try again.</p>
        <button type="button" onClick={() => reset()} className="mt-7 inline-flex items-center gap-2 rounded-lg bg-[#0a1f44] px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-brand-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary focus-visible:ring-offset-2">
          <RefreshCcw className="size-4" aria-hidden="true" />
          Try again
        </button>
      </div>
    </main>
  );
}


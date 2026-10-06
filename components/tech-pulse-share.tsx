"use client";

import { Check, Share2 } from "lucide-react";
import { useState } from "react";

export function TechPulseShare({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);

  async function shareArticle() {
    const url = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: `Read this Tech Pulse story: ${title}`,
          url,
        });
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return;
      }
      return;
    }

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      window.prompt("Copy this article link:", url);
    }
  }

  return (
    <button
      type="button"
      onClick={shareArticle}
      className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-[#0a1f44] transition-colors hover:border-brand-secondary hover:text-brand-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary focus-visible:ring-offset-2"
      aria-label={copied ? "Article link copied" : "Share this article"}
    >
      {copied ? <Check className="size-3.5" aria-hidden="true" /> : <Share2 className="size-3.5" aria-hidden="true" />}
      {copied ? "Link copied" : "Share story"}
    </button>
  );
}

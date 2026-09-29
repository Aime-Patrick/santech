"use client";

import Link from "next/link";
import { motion } from "motion/react";
import type { SanHubAudienceId } from "@/lib/san-hub-audience-data";
import { sanHubAudienceTabs } from "@/lib/san-hub-audience-data";

export function SanHubAudienceNav({ activeAudience }: { activeAudience: SanHubAudienceId }) {
  return (
    <nav aria-label="SAN HUB audience pathways" className="sticky top-[104px] z-40 border-y border-white/10 bg-[#0b0f14] px-6 text-white shadow-[0_8px_20px_rgba(7,21,45,0.12)] sm:px-10 lg:px-16">
      <div className="mx-auto flex max-w-[1500px] items-center justify-center gap-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:gap-4 lg:gap-8">
        {sanHubAudienceTabs.map((audience) => {
          const isActive = audience.id === activeAudience;

          return (
            <Link
              key={audience.id}
              href={audience.href}
              className="relative flex min-h-12 shrink-0 items-center px-3 text-sm font-semibold tracking-[-0.01em] text-white/80 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0f14] sm:min-h-14 sm:px-4 sm:text-base"
            >
              {audience.label}
              {isActive && <motion.span layoutId="san-hub-audience-active" className="absolute inset-x-0 bottom-0 h-0.5 bg-cyan-300" transition={{ duration: 0.22, ease: "easeOut" }} aria-hidden="true" />}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

"use client";

import Link from "next/link";
import { motion } from "motion/react";

export type SanHubSectionId = "about" | "courses" | "explore" | "impact" | "programs" | "traction" | "insights" | "library" | "testimonials";

const menuItems: readonly { id: SanHubSectionId; label: string; href: string }[] = [
  { id: "about", label: "About", href: "/san-hub?section=about" },
  { id: "courses", label: "Courses", href: "/san-hub/courses" },
  { id: "explore", label: "Explore", href: "/san-hub?section=explore" },
  { id: "impact", label: "Impact", href: "/san-hub?section=impact" },
  { id: "programs", label: "Programs", href: "/san-hub?section=programs" },
  { id: "traction", label: "Traction", href: "/san-hub?section=traction" },
  { id: "insights", label: "Insights", href: "/san-hub?section=insights" },
  { id: "library", label: "Digital library", href: "/san-hub?section=library" },
  { id: "testimonials", label: "Testimonials", href: "/san-hub?section=testimonials" },
] as const;

export function SanHubSectionMenu({ activeSection }: { activeSection: SanHubSectionId }) {
  return (
    <nav aria-label="SAN HUB page sections" className="sticky top-[104px] z-40 border-y border-white/10 bg-[#07152d] px-2 text-white shadow-[0_8px_20px_rgba(7,21,45,0.14)] sm:px-4 lg:px-8 2xl:px-16">
      <div className="mx-auto flex w-full max-w-[1500px] items-center gap-1 overflow-x-auto overflow-y-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex min-w-max items-center gap-0.5 sm:gap-1 lg:gap-2 2xl:gap-5">
          {menuItems.map((item) => {
            const isActive = item.id === activeSection;

            return (
              <Link key={item.id} href={item.href} className="relative flex min-h-12 items-center px-1.5 text-[11px] font-bold uppercase tracking-[0.03em] text-white/70 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#07152d] sm:min-h-14 sm:px-2 sm:text-xs 2xl:px-3 2xl:text-sm">
                {item.label}
                {isActive && <motion.span layoutId="san-hub-section-active" className="absolute inset-x-2 bottom-0 h-0.5 bg-cyan-300 sm:inset-x-3" transition={{ duration: 0.2, ease: "easeOut" }} aria-hidden="true" />}
              </Link>
            );
          })}
        </div>
        <Link href="/join-the-community?source=san-hub" className="ml-auto inline-flex min-h-9 shrink-0 items-center rounded-lg bg-slate-200 px-3 text-[11px] font-black text-[#07152d] transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#07152d] sm:min-h-10 sm:px-3 sm:text-xs 2xl:px-5 2xl:text-sm">
          Join SAN HUB <span className="ml-1" aria-hidden="true">↗</span>
        </Link>
      </div>
    </nav>
  );
}

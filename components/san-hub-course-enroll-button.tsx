"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { TrainingApplicationDialog } from "@/components/join-community-page";

export function SanHubCourseEnrollButton({ courseTitle }: { courseTitle: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button type="button" onClick={() => setIsOpen(true)} className="mt-6 inline-flex items-center gap-2 rounded-xl bg-brand-secondary px-6 py-3 text-sm font-bold text-white shadow-[0_10px_20px_rgba(11,14,135,0.16)] transition-all hover:-translate-y-0.5 hover:bg-[#1519ad] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary focus-visible:ring-offset-2">
        Enroll for SAN HUB <ArrowUpRight className="size-4" />
      </button>
      <TrainingApplicationDialog key={isOpen ? courseTitle : "closed"} isOpen={isOpen} onClose={() => setIsOpen(false)} initialCourse={courseTitle} />
    </>
  );
}

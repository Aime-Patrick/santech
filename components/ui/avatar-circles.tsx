"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface AvatarCirclesProps {
  className?: string;
  numPeople?: number;
  avatarUrls: string[];
  href?: string;
  onAvatarClick?: (index: number) => void;
}

const AvatarCircles = ({
  numPeople,
  className,
  avatarUrls,
  href = "#",
  onAvatarClick,
}: AvatarCirclesProps) => {
  return (
    <div className={cn("z-10 flex -space-x-4 rtl:space-x-reverse", className)}>
      {avatarUrls.map((url, index) => {
        const avatar = (
          <img
            src={url}
            width={40}
            height={40}
            alt={`Testimonial ${index + 1}`}
            className="h-10 w-10 rounded-full border-2 border-white object-cover dark:border-gray-800"
          />
        );

        if (!onAvatarClick) {
          return <React.Fragment key={`${url}-${index}`}>{avatar}</React.Fragment>;
        }

        return (
          <button
            key={`${url}-${index}`}
            type="button"
            onClick={() => onAvatarClick(index)}
            aria-label={`Read testimonial ${index + 1}`}
            className="relative rounded-full transition-transform hover:z-20 hover:scale-110 focus-visible:z-20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-[#07152d]"
          >
            {avatar}
          </button>
        );
      })}
      <a
        className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-black text-center text-xs font-medium text-white transition-colors hover:bg-gray-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-[#07152d] dark:border-gray-800 dark:bg-white dark:text-black"
        href={href}
        aria-label={`See ${numPeople ?? 0} more testimonials`}
      >
        +{numPeople ?? 0}
      </a>
    </div>
  );
};

export { AvatarCircles };

"use client";

import Link from "next/link";
import { useRef } from "react";
import type { CSSProperties } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import "./BubbleMenu.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

export type BubbleMenuItem = {
  label: string;
  href: string;
  ariaLabel?: string;
  rotation?: number;
  hoverStyles?: {
    bgColor?: string;
    textColor?: string;
  };
};

export type BubbleMenuProps = {
  items?: BubbleMenuItem[];
  className?: string;
  style?: CSSProperties;
  layout?: "grid" | "flex";
  size?: "sm" | "md" | "lg";
  columns?: 1 | 2 | 3 | 4;
  animationEase?: string;
  animationDuration?: number;
  staggerDelay?: number;
  scrollTriggerStart?: string;
};

const DEFAULT_ITEMS: BubbleMenuItem[] = [
  {
    label: "Software development",
    href: "/connect?service=Software%20development",
    rotation: -4,
    hoverStyles: { bgColor: "#0B0E87", textColor: "#ffffff" },
  },
  {
    label: "Web and mobile applications",
    href: "/connect?service=Web%20and%20mobile%20applications",
    rotation: 3,
    hoverStyles: { bgColor: "#1d4ed8", textColor: "#ffffff" },
  },
  {
    label: "AI solutions",
    href: "/connect?service=AI%20solutions",
    rotation: -3,
    hoverStyles: { bgColor: "#7c3aed", textColor: "#ffffff" },
  },
  {
    label: "IoT and embedded systems",
    href: "/connect?service=IoT%20and%20embedded%20systems",
    rotation: 4,
    hoverStyles: { bgColor: "#0891b2", textColor: "#ffffff" },
  },
  {
    label: "Cybersecurity",
    href: "/connect?service=Cybersecurity",
    rotation: -2,
    hoverStyles: { bgColor: "#e11d48", textColor: "#ffffff" },
  },
  {
    label: "Digital transformation",
    href: "/connect?service=Digital%20transformation",
    rotation: 3,
    hoverStyles: { bgColor: "#6d28d9", textColor: "#ffffff" },
  },
  {
    label: "Training and capacity building",
    href: "/connect?service=Training%20and%20capacity%20building",
    rotation: -4,
    hoverStyles: { bgColor: "#059669", textColor: "#ffffff" },
  },
  {
    label: "Systems integration",
    href: "/connect?service=Systems%20integration",
    rotation: 3,
    hoverStyles: { bgColor: "#0284c7", textColor: "#ffffff" },
  },
  {
    label: "Consultancy",
    href: "/connect?service=Consultancy",
    rotation: -3,
    hoverStyles: { bgColor: "#0B0E87", textColor: "#ffffff" },
  },
];

export default function BubbleMenu({
  items = DEFAULT_ITEMS,
  className = "",
  style,
  layout = "grid",
  size = "md",
  columns = 3,
  animationEase = "back.out(1.5)",
  animationDuration = 0.55,
  staggerDelay = 0.06,
  scrollTriggerStart = "top 88%",
}: BubbleMenuProps) {
  const scope = useRef<HTMLDivElement>(null);
  const menuItems = items?.length ? items : DEFAULT_ITEMS;

  useGSAP(
    () => {
      const container = scope.current;
      if (!container) return;

      const pills = gsap.utils.toArray<HTMLElement>("[data-bubble-pill]", container);
      const labels = gsap.utils.toArray<HTMLElement>("[data-bubble-label]", container);
      if (pills.length === 0) return;

      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reduceMotion) {
        gsap.set(pills, { scale: 1, autoAlpha: 1 });
        gsap.set(labels, { y: 0, autoAlpha: 1 });
        return;
      }

      const isDesktop = window.innerWidth >= 900;

      // Initial state
      gsap.set(pills, { scale: 0, autoAlpha: 0, transformOrigin: "50% 50%" });
      gsap.set(labels, { y: 12, autoAlpha: 0 });

      // Apply initial rotation on desktop
      pills.forEach((pill, i) => {
        const item = menuItems[i];
        const rot = isDesktop ? (item?.rotation ?? 0) : 0;
        gsap.set(pill, { rotation: rot });
      });

      // ScrollTrigger timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: scrollTriggerStart,
          toggleActions: "play none none none",
          once: true,
        },
      });

      pills.forEach((pill, i) => {
        const delay = i * staggerDelay;

        tl.to(
          pill,
          {
            scale: 1,
            autoAlpha: 1,
            duration: animationDuration,
            ease: animationEase,
          },
          delay
        );

        if (labels[i]) {
          tl.to(
            labels[i],
            {
              y: 0,
              autoAlpha: 1,
              duration: animationDuration,
              ease: "power3.out",
            },
            delay + animationDuration * 0.2
          );
        }
      });
    },
    { scope, dependencies: [menuItems, animationDuration, animationEase, staggerDelay, scrollTriggerStart] }
  );

  const containerClasses = [
    "bubble-menu-showcase",
    `layout-${layout}`,
    `size-${size}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const inlineStyles: CSSProperties = {
    ...style,
    ["--bubble-cols" as string]: columns,
  };

  return (
    <div ref={scope} className={containerClasses} style={inlineStyles}>
      <ul className="bubble-pill-list" role="list">
        {menuItems.map((item, idx) => {
          const isExternal =
            item.href?.startsWith("http") || item.href?.startsWith("mailto:") || item.href?.startsWith("tel:");

          const linkProps = {
            "data-bubble-pill": true,
            "aria-label": item.ariaLabel || item.label,
            className: `bubble-pill-link size-${size}`,
            style: {
              "--item-rot": `${item.rotation ?? 0}deg`,
              "--hover-bg": item.hoverStyles?.bgColor || "#0B0E87",
              "--hover-color": item.hoverStyles?.textColor || "#ffffff",
            } as CSSProperties,
          };

          const content = (
            <span data-bubble-label className="bubble-pill-label">
              {item.label}
            </span>
          );

          return (
            <li key={idx} className="bubble-pill-col">
              {isExternal ? (
                <a href={item.href} {...linkProps}>
                  {content}
                </a>
              ) : (
                <Link href={item.href} {...linkProps}>
                  {content}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

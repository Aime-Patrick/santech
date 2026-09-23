"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useId, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type TextHoverEffectProps = {
  text: string;
  duration?: number;
  automatic?: boolean;
  className?: string;
};

export function TextHoverEffect({ text, duration = 0.2, automatic = false, className }: TextHoverEffectProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(automatic);
  const [maskPosition, setMaskPosition] = useState({ cx: "50%", cy: "50%" });
  const prefersReducedMotion = useReducedMotion();
  const id = useId().replace(/:/g, "");

  useEffect(() => {
    if (!svgRef.current) return;
    const svgRect = svgRef.current.getBoundingClientRect();
    if (!svgRect.width || !svgRect.height) return;

    setMaskPosition({
      cx: `${((cursor.x - svgRect.left) / svgRect.width) * 100}%`,
      cy: `${((cursor.y - svgRect.top) / svgRect.height) * 100}%`,
    });
  }, [cursor]);

  const revealId = `text-reveal-${id}`;
  const maskId = `text-mask-${id}`;
  const gradientId = `text-gradient-${id}`;

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="100%"
      viewBox="0 0 300 100"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={text}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { if (!automatic) setHovered(false); }}
      onMouseMove={(event) => setCursor({ x: event.clientX, y: event.clientY })}
      className={cn("cursor-pointer select-none uppercase", className)}
    >
      <defs>
        <linearGradient id={gradientId} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="300" y2="100">
          <stop offset="0%" stopColor="#f3d45c" />
          <stop offset="42%" stopColor="#ffffff" />
          <stop offset="72%" stopColor="#c9a313" />
          <stop offset="100%" stopColor="#ffffff" />
        </linearGradient>
        <motion.radialGradient
          id={revealId}
          gradientUnits="userSpaceOnUse"
          r="22%"
          initial={{ cx: "50%", cy: "50%" }}
          animate={maskPosition}
          transition={{ duration: prefersReducedMotion ? 0 : duration, ease: "easeOut" }}
        >
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </motion.radialGradient>
        <mask id={maskId}>
          <rect x="0" y="0" width="100%" height="100%" fill={`url(#${revealId})`} />
        </mask>
      </defs>

      <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" strokeWidth="0.45" className="fill-transparent font-[var(--font-display)] text-7xl font-black" stroke="#ffffff" style={{ opacity: hovered ? 0.25 : 0.7 }}>
        {text}
      </text>
      <motion.text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="0.45"
        className="fill-transparent font-[var(--font-display)] text-7xl font-black"
        stroke="#f3d45c"
        initial={prefersReducedMotion ? false : { strokeDashoffset: 1000, strokeDasharray: 1000 }}
        animate={{ strokeDashoffset: 0, strokeDasharray: 1000 }}
        transition={{ duration: prefersReducedMotion ? 0 : 2.2, ease: "easeInOut" }}
      >
        {text}
      </motion.text>
      <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" stroke={`url(#${gradientId})`} strokeWidth="0.55" mask={`url(#${maskId})`} className="fill-transparent font-[var(--font-display)] text-7xl font-black">
        {text}
      </text>
    </svg>
  );
}

export function FooterBackgroundGradient() {
  return <div className="absolute inset-0 z-0" style={{ background: "radial-gradient(125% 125% at 50% 10%, rgba(11,14,135,0.55) 50%, rgba(201,163,19,0.2) 100%)" }} />;
}

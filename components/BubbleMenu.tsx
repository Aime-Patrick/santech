"use client";

import { useEffect, useRef, useState, type CSSProperties, type MouseEvent as ReactMouseEvent, type ReactNode } from "react";
import { gsap } from "gsap";
import { BorderBeam } from "@/components/ui/border-beam";

import "./BubbleMenu.css";

export type BubbleMenuItem = {
  label: string;
  href: string;
  ariaLabel?: string;
  rotation?: number;
  hoverStyles?: { bgColor?: string; textColor?: string };
};

type BubbleMenuProps = {
  logo?: ReactNode;
  onMenuClick?: (open: boolean) => void;
  onItemClick?: (item: BubbleMenuItem, index: number, event: ReactMouseEvent<HTMLAnchorElement>) => void;
  openOnView?: boolean;
  className?: string;
  style?: CSSProperties;
  menuAriaLabel?: string;
  menuBg?: string;
  menuContentColor?: string;
  useFixedPosition?: boolean;
  items?: BubbleMenuItem[];
  animationEase?: string;
  animationDuration?: number;
  staggerDelay?: number;
};

const DEFAULT_ITEMS: BubbleMenuItem[] = [
  { label: "home", href: "#", ariaLabel: "Home", rotation: -8, hoverStyles: { bgColor: "#3b82f6", textColor: "#ffffff" } },
  { label: "about", href: "#", ariaLabel: "About", rotation: 8, hoverStyles: { bgColor: "#10b981", textColor: "#ffffff" } },
  { label: "projects", href: "#", ariaLabel: "Documentation", rotation: 8, hoverStyles: { bgColor: "#f59e0b", textColor: "#ffffff" } },
  { label: "blog", href: "#", ariaLabel: "Blog", rotation: 8, hoverStyles: { bgColor: "#ef4444", textColor: "#ffffff" } },
  { label: "contact", href: "#", ariaLabel: "Contact", rotation: -8, hoverStyles: { bgColor: "#8b5cf6", textColor: "#ffffff" } },
];

export default function BubbleMenu({
  logo,
  onMenuClick,
  onItemClick,
  openOnView = false,
  className,
  style,
  menuAriaLabel = "Toggle menu",
  menuBg = "#fff",
  menuContentColor = "#111",
  useFixedPosition = false,
  items,
  animationEase = "back.out(1.5)",
  animationDuration = 0.5,
  staggerDelay = 0.12,
}: BubbleMenuProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const bubblesRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const labelRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const menuItems = items?.length ? items : DEFAULT_ITEMS;

  const handleToggle = () => {
    const nextState = !isMenuOpen;
    if (nextState) setShowOverlay(true);
    setIsMenuOpen(nextState);
    onMenuClick?.(nextState);
  };

  useEffect(() => {
    if (!openOnView || !navRef.current || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShowOverlay(true);
        setIsMenuOpen(true);
        onMenuClick?.(true);
        observer.disconnect();
      },
      { threshold: 0.2 },
    );

    observer.observe(navRef.current);
    return () => observer.disconnect();
  }, [onMenuClick, openOnView]);

  useEffect(() => {
    const overlay = overlayRef.current;
    const bubbles = bubblesRef.current.filter(Boolean) as HTMLAnchorElement[];
    const labels = labelRefs.current.filter(Boolean) as HTMLSpanElement[];
    if (!overlay || !bubbles.length) return;

    if (isMenuOpen) {
      gsap.set(overlay, { display: "flex" });
      gsap.killTweensOf([...bubbles, ...labels]);
      gsap.set(bubbles, { scale: 0, transformOrigin: "50% 50%" });
      gsap.set(labels, { y: 24, autoAlpha: 0 });

      bubbles.forEach((bubble, index) => {
        const rotation = window.innerWidth >= 900 ? menuItems[index]?.rotation ?? 0 : 0;
        gsap.set(bubble, { rotation });
        const delay = index * staggerDelay + gsap.utils.random(-0.05, 0.05);
        const timeline = gsap.timeline({ delay });
        timeline.to(bubble, { scale: 1, duration: animationDuration, ease: animationEase });
        if (labels[index]) {
          timeline.to(labels[index], { y: 0, autoAlpha: 1, duration: animationDuration, ease: "power3.out" }, `-=${animationDuration * 0.9}`);
        }
      });
    } else if (showOverlay) {
      gsap.killTweensOf([...bubbles, ...labels]);
      gsap.to(labels, { y: 24, autoAlpha: 0, duration: 0.2, ease: "power3.in" });
      gsap.to(bubbles, {
        scale: 0,
        duration: 0.2,
        ease: "power3.in",
        onComplete: () => {
          gsap.set(overlay, { display: "none" });
          setShowOverlay(false);
        },
      });
    }
  }, [animationDuration, animationEase, isMenuOpen, showOverlay, staggerDelay]);

  useEffect(() => {
    const handleResize = () => {
      if (!isMenuOpen) return;
      const bubbles = bubblesRef.current.filter(Boolean) as HTMLAnchorElement[];
      const isDesktop = window.innerWidth >= 900;
      bubbles.forEach((bubble, index) => {
        const item = menuItems[index];
        if (item) gsap.set(bubble, { rotation: isDesktop ? item.rotation ?? 0 : 0 });
      });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMenuOpen, menuItems]);

  const containerClassName = ["bubble-menu", useFixedPosition ? "fixed" : "absolute", className].filter(Boolean).join(" ");

  return (
    <>
      <nav ref={navRef} className={containerClassName} style={style} aria-label="Main navigation">
        <div className="bubble logo-bubble" aria-label="Logo" style={{ background: menuBg }}>
          <span className="logo-content">{typeof logo === "string" ? <img src={logo} alt="Logo" className="bubble-logo" /> : logo}</span>
        </div>
        <button type="button" className={`bubble toggle-bubble menu-btn ${isMenuOpen ? "open" : ""}`} onClick={handleToggle} aria-label={menuAriaLabel} aria-pressed={isMenuOpen} style={{ background: menuBg }}>
          <span className="menu-line" style={{ background: menuContentColor }} />
          <span className="menu-line short" style={{ background: menuContentColor }} />
        </button>
      </nav>

      {showOverlay && (
        <div ref={overlayRef} className={`bubble-menu-items ${useFixedPosition ? "fixed" : "absolute"}`} aria-hidden={!isMenuOpen}>
          <ul className="pill-list" role="menu" aria-label="Menu links">
            {menuItems.map((item, index) => (
              <li key={item.label} role="none" className="pill-col">
                <a
                  role="menuitem"
                  href={item.href}
                  aria-label={item.ariaLabel || item.label}
                  className="pill-link"
                  onClick={(event) => {
                    if (!onItemClick) return;
                    event.preventDefault();
                    onItemClick(item, index, event);
                  }}
                  style={{
                    "--item-rot": `${item.rotation ?? 0}deg`,
                    "--pill-bg": menuBg,
                    "--pill-color": menuContentColor,
                    "--hover-bg": item.hoverStyles?.bgColor || "#f3f4f6",
                    "--hover-color": item.hoverStyles?.textColor || menuContentColor,
                  } as CSSProperties}
                  ref={(element) => { bubblesRef.current[index] = element; }}
                >
                  <span className="pill-label" ref={(element) => { labelRefs.current[index] = element; }}>
                    {item.label}
                  </span>
                  <BorderBeam
                    size={56}
                    duration={5.5}
                    initialOffset={index % 2 === 0 ? 8 : 58}
                    borderWidth={1.25}
                    colorFrom="#09bce7"
                    colorTo="#0a1f44"
                    className="from-transparent via-brand-cyan to-transparent opacity-80"
                  />
                  <BorderBeam
                    size={56}
                    duration={5.5}
                    delay={2.75}
                    initialOffset={index % 2 === 0 ? 58 : 8}
                    borderWidth={1}
                    colorFrom="#0a1f44"
                    colorTo="#4d8dff"
                    className="from-transparent via-[#4d8dff] to-transparent opacity-60"
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

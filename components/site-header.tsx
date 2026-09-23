"use client";

import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Menu, Phone, Radio, ArrowUpRight, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navigation } from "@/lib/site-data";
import santechLogo from "@/src/assets/santech.png";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHeroDark, setIsHeroDark] = useState(false);
  const pathname = usePathname();
  const darkHeader = isHeroDark && !isScrolled;

  function isActiveRoute(href: string) {
    return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleHeroTheme = (event: Event) => {
      const detail = (event as CustomEvent<{ dark?: boolean }>).detail;
      setIsHeroDark(Boolean(detail?.dark));
    };

    window.addEventListener("santech-hero-theme", handleHeroTheme);
    return () => window.removeEventListener("santech-hero-theme", handleHeroTheme);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="relative bg-brand-secondary text-white">
        <div className="mx-auto flex min-h-11 max-w-7xl items-center justify-center px-5 py-2 text-sm font-medium sm:px-8 lg:justify-between lg:px-10">
          <div className="flex items-center gap-2 sm:gap-3">
            <Phone className="size-3.5 shrink-0" aria-hidden="true" />
            <a href="tel:+250780309833" className="whitespace-nowrap transition-colors hover:text-white/70">+250780309833 / +22371005873</a>
          </div>
          <div className="hidden items-center gap-2 lg:flex">
            <MapPin className="size-3.5 shrink-0" aria-hidden="true" />
            <span>Plot 48, KN 1 Road, Sofaru Building; Kigali-Rwanda</span>
          </div>
          <div className="hidden items-center gap-5 sm:flex">
            <a href="mailto:info@santechinnovate.com" className="inline-flex items-center gap-2 transition-colors hover:text-white/70">
              <Mail className="size-3.5" aria-hidden="true" />
              info@santechinnovate.com
            </a>
            <span className="hidden items-center gap-2 md:inline-flex"><Radio className="size-3.5" aria-hidden="true" /> santech</span>
          </div>
        </div>
        <div aria-hidden="true" className="h-2 overflow-hidden bg-[#c9a313]">
          <svg className="h-full w-full" width="100%" height="8" preserveAspectRatio="none">
            <defs>
              <pattern id="imigongo-header-band" width="48" height="8" patternUnits="userSpaceOnUse">
                <path d="M0 8 6 1 12 8 18 1 24 8 30 1 36 8 42 1 48 8" fill="none" stroke="#0B0E87" strokeWidth="1.7" />
                <path d="M0 1 6 8 12 1 18 8 24 1 30 8 36 1 42 8 48 1" fill="none" stroke="#f3d45c" strokeWidth="0.8" opacity="0.9" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#imigongo-header-band)" />
          </svg>
        </div>
      </div>
      <motion.div
        animate={{
          paddingTop: isScrolled ? "14px" : "0px",
          paddingLeft: isScrolled ? "20px" : "0px",
          paddingRight: isScrolled ? "20px" : "0px",
        }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto w-full"
      >
        <motion.div
          initial={{
            maxWidth: "100%",
            borderRadius: "0px",
            backgroundColor: "rgba(255, 255, 255, 0)",
            boxShadow: "0 0 0 0 rgba(226, 232, 240, 0), 0 0 0 0 rgba(0, 0, 0, 0)",
            height: "80px",
          }}
          animate={{
            maxWidth: isScrolled ? "1280px" : "100%",
            borderRadius: isScrolled ? "20px" : "0px",
            backgroundColor: isScrolled ? "rgba(255, 255, 255, 0.95)" : "rgba(255, 255, 255, 0)",
            boxShadow: isScrolled
              ? "0 0 0 1px rgba(226, 232, 240, 0.9), 0 14px 40px -8px rgba(15, 23, 42, 0.1), 0 4px 12px -2px rgba(15, 23, 42, 0.04)"
              : "0 0 0 0 rgba(226, 232, 240, 0), 0 0 0 0 rgba(0, 0, 0, 0)",
            height: isScrolled ? "64px" : "80px",
          }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className={`mx-auto flex w-full items-center justify-between transition-colors ${
            isScrolled
              ? "px-5 sm:px-7 backdrop-blur-xl"
              : "px-7 sm:px-12 lg:px-16"
          }`}
        >
          {/* Logo on Far Left Side */}
          <Link href="/" className="group flex items-center gap-3" onClick={() => setOpen(false)}>
            <Image
              src={santechLogo}
              alt="SAN TECH"
              className={`h-10 w-auto max-w-[160px] object-contain transition-[filter,transform] duration-300 group-hover:scale-105 sm:h-11 sm:max-w-[190px] ${darkHeader ? "brightness-0 invert" : ""}`}
              priority
            />
          </Link>

          {/* Navigation Items and CTA on Far Right Side */}
          <div className="hidden items-center gap-1 lg:flex xl:gap-2">
            <nav className="flex items-center gap-1 xl:gap-2" aria-label="Main navigation">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActiveRoute(item.href) ? "page" : undefined}
                  className={`relative rounded-xl px-2 py-2 text-sm font-semibold tracking-[0.04em] transition-colors duration-200 after:absolute after:-bottom-1 after:left-1/2 after:h-0.5 after:-translate-x-1/2 after:rounded-full after:bg-brand-secondary after:transition-all after:duration-200 ${
                    isActiveRoute(item.href)
                      ? darkHeader
                        ? "text-white after:w-8"
                        : "text-brand-secondary after:w-8"
                      : darkHeader
                        ? "text-white/85 after:w-0 hover:text-white hover:after:w-5"
                        : "text-slate-700 after:w-0 hover:text-slate-950 hover:after:w-5"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <Link
              href="/join-the-community"
              className={`inline-flex items-center gap-1.5 rounded-xl px-5 py-2.5 text-sm font-bold tracking-[0.06em] shadow-sm transition-all hover:shadow-md ${darkHeader ? "bg-white text-brand-secondary hover:bg-brand-secondary hover:text-white" : "bg-brand-secondary text-white hover:opacity-90"}`}
            >
              JOIN THE COMMUNITY <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Mobile Menu Button on Far Right Side */}
          <button
            type="button"
            aria-label={open ? "Close navigation" : "Open navigation"}
            className={`grid h-10 w-10 place-items-center rounded-xl border p-2 shadow-sm transition-colors lg:hidden ${darkHeader ? "border-white/30 bg-white/10 text-white hover:bg-white/20" : "border-slate-200/90 bg-white/80 text-slate-800 hover:bg-slate-100"}`}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </motion.div>
      </motion.div>

      {/* Mobile Drawer Navigation with Motion */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0, y: -10 }}
            animate={{ height: "auto", opacity: 1, y: 0 }}
            exit={{ height: 0, opacity: 0, y: -10 }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
            className="mx-4 mt-2 overflow-hidden rounded-xl border border-slate-200/90 bg-white/95 shadow-[0_20px_50px_rgba(15,23,42,0.15)] backdrop-blur-2xl lg:hidden"
          >
            <div className="flex flex-col gap-1.5 p-5 sm:p-6">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActiveRoute(item.href) ? "page" : undefined}
                  className={`rounded-xl border-l-2 px-4 py-3 text-sm font-semibold transition-colors ${
                    isActiveRoute(item.href)
                      ? "border-brand-secondary bg-brand-secondary/10 text-brand-secondary"
                      : "border-transparent text-slate-700 hover:text-slate-950"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/join-the-community"
                onClick={() => setOpen(false)}
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-brand-secondary px-5 py-3.5 text-sm font-bold text-white shadow-sm transition-opacity hover:opacity-90"
              >
                Join the community <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

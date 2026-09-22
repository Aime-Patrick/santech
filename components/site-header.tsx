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
        <div className="mx-auto flex min-h-11 max-w-7xl items-center justify-center px-5 py-2 text-[11px] font-medium sm:px-8 lg:justify-between lg:px-10">
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
        <div aria-hidden="true" className="h-1.5 bg-[#c9a313] [clip-path:polygon(0_55%,1%_0,2%_55%,3%_0,4%_55%,5%_0,6%_55%,7%_0,8%_55%,9%_0,10%_55%,11%_0,12%_55%,13%_0,14%_55%,15%_0,16%_55%,17%_0,18%_55%,19%_0,20%_55%,21%_0,22%_55%,23%_0,24%_55%,25%_0,26%_55%,27%_0,28%_55%,29%_0,30%_55%,31%_0,32%_55%,33%_0,34%_55%,35%_0,36%_55%,37%_0,38%_55%,39%_0,40%_55%,41%_0,42%_55%,43%_0,44%_55%,45%_0,46%_55%,47%_0,48%_55%,49%_0,50%_55%,51%_0,52%_55%,53%_0,54%_55%,55%_0,56%_55%,57%_0,58%_55%,59%_0,60%_55%,61%_0,62%_55%,63%_0,64%_55%,65%_0,66%_55%,67%_0,68%_55%,69%_0,70%_55%,71%_0,72%_55%,73%_0,74%_55%,75%_0,76%_55%,77%_0,78%_55%,79%_0,80%_55%,81%_0,82%_55%,83%_0,84%_55%,85%_0,86%_55%,87%_0,88%_55%,89%_0,90%_55%,91%_0,92%_55%,93%_0,94%_55%,95%_0,96%_55%,97%_0,98%_55%,99%_0,100%_55%)]" />
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
            borderRadius: isScrolled ? "9999px" : "0px",
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
          <div className="hidden items-center gap-6 lg:flex xl:gap-8">
            <nav className="flex items-center gap-6 xl:gap-7" aria-label="Main navigation">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActiveRoute(item.href) ? "page" : undefined}
                  className={`relative rounded-full px-3 py-2 text-[13px] font-semibold tracking-[0.04em] transition-all duration-200 after:absolute after:-bottom-1 after:left-1/2 after:h-0.5 after:-translate-x-1/2 after:rounded-full after:bg-brand-secondary after:transition-all after:duration-200 ${
                    isActiveRoute(item.href)
                      ? "text-brand-secondary after:w-8"
                      : darkHeader
                        ? "text-white/85 after:w-0 hover:bg-white/10 hover:text-white hover:after:w-5"
                        : "text-slate-700 after:w-0 hover:bg-slate-100 hover:text-slate-950 hover:after:w-5"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <Link
              href="/join-the-community"
              className={`inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 text-[11px] font-bold tracking-[0.06em] shadow-sm transition-all hover:shadow-md ${darkHeader ? "bg-white text-brand-secondary hover:bg-[#5cefcf]" : "bg-brand-secondary text-white hover:opacity-90"}`}
            >
              JOIN THE COMMUNITY <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Mobile Menu Button on Far Right Side */}
          <button
            type="button"
            aria-label={open ? "Close navigation" : "Open navigation"}
            className={`grid h-10 w-10 place-items-center rounded-full border p-2 shadow-sm transition-colors lg:hidden ${darkHeader ? "border-white/30 bg-white/10 text-white hover:bg-white/20" : "border-slate-200/90 bg-white/80 text-slate-800 hover:bg-slate-100"}`}
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
            className="mx-4 mt-2 overflow-hidden rounded-[1.75rem] border border-slate-200/90 bg-white/95 shadow-[0_20px_50px_rgba(15,23,42,0.15)] backdrop-blur-2xl lg:hidden"
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
                      : "border-transparent text-slate-700 hover:bg-slate-100 hover:text-slate-950"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/join-the-community"
                onClick={() => setOpen(false)}
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-brand-secondary px-5 py-3.5 text-sm font-bold text-white shadow-sm transition-opacity hover:opacity-90"
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

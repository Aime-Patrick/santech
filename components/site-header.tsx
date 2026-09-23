"use client";

import Image from "next/image";
import Link from "next/link";
import { 
  Globe, 
  ChevronDown, 
  ArrowUpRight, 
  Menu, 
  X, 
  Check,
  Mail,
  MapPin,
  Phone,
  Radio,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { navigation } from "@/lib/site-data";
import santechLogo from "@/src/assets/santech.png";

type Language = "en" | "rw";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [language, setLanguage] = useState<Language>("en");
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const savedLang = localStorage.getItem("santech_lang") as Language | null;
    if (savedLang === "en" || savedLang === "rw") {
      setLanguage(savedLang);
    }
  }, []);

  function handleLanguageChange(newLang: Language) {
    setLanguage(newLang);
    setLangDropdownOpen(false);
    localStorage.setItem("santech_lang", newLang);
    window.dispatchEvent(new CustomEvent("santech-language-change", { detail: { lang: newLang } }));
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setLangDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function isActiveRoute(href: string) {
    return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 transition-all">
      <div className="relative overflow-hidden bg-[#0a1f44] text-white">
        <div className="mx-auto flex min-h-9 max-w-[1600px] items-center justify-between gap-3 px-4 py-1 text-[10px] font-semibold sm:px-6 sm:text-[11px] lg:px-8">
          <a href="tel:+250780309833" className="inline-flex shrink-0 items-center gap-2 transition-colors hover:text-[#00A3E0]">
            <Phone className="size-3.5" />
            <span>+250780309833 / +22371005873</span>
          </a>
          <span className="hidden items-center gap-2 md:inline-flex">
            <MapPin className="size-3.5" />
            <span>Plot 48, KN 1 Road, Sofaru Building; Kigali-Rwanda</span>
          </span>
          <a href="mailto:info@santechinnovate.com" className="hidden items-center gap-2 transition-colors hover:text-[#00A3E0] sm:inline-flex">
            <Mail className="size-3.5" />
            <span>info@santechinnovate.com</span>
          </a>
          <span className="hidden items-center gap-2 lg:inline-flex">
            <Radio className="size-3.5" />
            <span>santech</span>
          </span>
        </div>
      </div>

      {/* Main Navbar */}
      <div className={`transition-all duration-300 ${
        isScrolled 
          ? "bg-white/95 backdrop-blur-md shadow-md border-b border-slate-200/80 py-2.5" 
          : "bg-white border-b border-slate-200/60 py-3.5"
      }`}>
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo on Left */}
          <Link href="/" className="group flex items-center gap-3 shrink-0" onClick={() => setOpen(false)}>
            <Image
              src={santechLogo}
              alt="SAN TECH - Technology · Innovation · Skills · Impact"
              className="h-9 w-auto max-w-[155px] object-contain transition-transform duration-300 group-hover:scale-105 sm:h-10 sm:max-w-[175px]"
              priority
            />
          </Link>

          {/* Navigation Links from PDF Spec */}
          <div className="hidden items-center gap-2 lg:flex xl:gap-4">
            <nav className="flex items-center gap-1 xl:gap-1.5" aria-label="Main navigation">
              {navigation.map((item) => {
                const active = isActiveRoute(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`relative rounded-lg px-2.5 py-1.5 text-xs font-bold tracking-[0.04em] transition-all duration-200 ${
                      active
                        ? "text-[#0a1f44]"
                        : "text-slate-700 hover:text-[#0a1f44]"
                    }`}
                  >
                    {item.label}
                    {active && (
                      <span className="absolute bottom-0 left-1/2 h-0.5 w-10 -translate-x-1/2 rounded-full bg-[#0a1f44]" />
                    )}
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-2.5 pl-2 border-l border-slate-200">
              {/* Language Selector Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-700 shadow-2xs transition-colors hover:border-slate-300 hover:bg-slate-50"
                  aria-expanded={langDropdownOpen}
                  aria-label="Select language"
                >
                  <Globe className="size-3.5 text-[#333292]" />
                  <span>{language === "rw" ? "Kinyarwanda" : "English"}</span>
                  <ChevronDown className={`size-3 text-slate-400 transition-transform duration-200 ${langDropdownOpen ? "rotate-180" : ""}`} />
                </button>

                <AnimatePresence>
                  {langDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 6, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 4, scale: 0.96 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-1.5 w-36 rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl z-50"
                    >
                      <button
                        type="button"
                        onClick={() => handleLanguageChange("en")}
                        className={`flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors ${
                          language === "en" ? "bg-[#333292]/10 text-[#333292] font-bold" : "text-slate-700 hover:bg-slate-100"
                        }`}
                      >
                        <span>English</span>
                        {language === "en" && <Check className="size-3.5 text-[#333292]" />}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleLanguageChange("rw")}
                        className={`flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors ${
                          language === "rw" ? "bg-[#333292]/10 text-[#333292] font-bold" : "text-slate-700 hover:bg-slate-100"
                        }`}
                      >
                        <span>Kinyarwanda</span>
                        {language === "rw" && <Check className="size-3.5 text-[#333292]" />}
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Visually Prominent CTA Button: JOIN THE COMMUNITY */}
              <Link
                href="/join-the-community"
                className="inline-flex items-center gap-1.5 rounded-xl bg-[#0a1f44] px-4 py-2 text-xs font-extrabold uppercase tracking-wider text-white shadow-md transition-all duration-200 hover:bg-[#132f61] hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>JOIN THE COMMUNITY</span>
                <ArrowUpRight className="size-3.5" />
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              type="button"
              onClick={() => handleLanguageChange(language === "rw" ? "en" : "rw")}
              className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs font-bold text-[#333292]"
            >
              {language === "rw" ? "RW" : "EN"}
            </button>
            <button
              type="button"
              aria-label={open ? "Close navigation" : "Open navigation"}
              className="grid size-10 place-items-center rounded-xl border border-slate-200 bg-white text-slate-800 shadow-xs hover:bg-slate-100"
              onClick={() => setOpen((value) => !value)}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </div>

      <div className="relative h-2 overflow-hidden bg-white" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{ backgroundImage: "url('/imingogo-trimmed.png')", backgroundPosition: "center bottom", backgroundRepeat: "repeat-x", backgroundSize: "44px 22px" }}
        />
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="mx-3 mt-2 overflow-hidden rounded-2xl border border-slate-200/90 bg-white/98 shadow-2xl backdrop-blur-2xl lg:hidden"
          >
            <div className="flex flex-col gap-1 p-5">
              {navigation.map((item) => {
                const active = isActiveRoute(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={`flex items-center justify-between rounded-xl px-4 py-2.5 text-sm font-bold transition-colors ${
                      active
                        ? "bg-[#333292]/10 text-[#333292]"
                        : "text-slate-700 hover:bg-slate-50 hover:text-[#333292]"
                    }`}
                  >
                    <span>{item.label}</span>
                    {active && <span className="size-1.5 rounded-full bg-[#333292]" />}
                  </Link>
                );
              })}

              <div className="my-2 border-t border-slate-100 pt-3 flex items-center justify-between px-2">
                <span className="text-xs font-semibold text-slate-500">Language / Ururimi</span>
                <div className="flex gap-1.5">
                  <button
                    type="button"
                    onClick={() => handleLanguageChange("en")}
                    className={`rounded-lg px-3 py-1 text-xs font-bold ${
                      language === "en" ? "bg-[#333292] text-white" : "bg-slate-100 text-slate-700"
                    }`}
                  >
                    English
                  </button>
                  <button
                    type="button"
                    onClick={() => handleLanguageChange("rw")}
                    className={`rounded-lg px-3 py-1 text-xs font-bold ${
                      language === "rw" ? "bg-[#333292] text-white" : "bg-slate-100 text-slate-700"
                    }`}
                  >
                    Kinyarwanda
                  </button>
                </div>
              </div>

              <Link
                href="/join-the-community"
                onClick={() => setOpen(false)}
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-[#0a1f44] px-5 py-3.5 text-sm font-extrabold uppercase tracking-wider text-white shadow-md transition-all hover:bg-[#132f61]"
              >
                <span>JOIN THE COMMUNITY</span>
                <ArrowUpRight className="size-4" />
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { 
  ChevronDown, 
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

type Language = "en" | "rw" | "fr" | "sw" | "ar" | "ch" | "hi" | "ur" | "br";

const languageLabels: Record<Language, string> = {
  en: "English",
  rw: "Kinyarwanda",
  fr: "Français",
  sw: "Kiswahili",
  ch: "Chinese",
  ar: "Arabic",
  hi: "Hindi",
  ur: "Urdu",
  br: "Bambara",
};

const languageOptions: { code: Language; label: string; flag: string }[] = [
  { code: "en", label: "English", flag: "gb" },
  { code: "rw", label: "Kinyarwanda", flag: "rw" },
  { code: "fr", label: "Français", flag: "fr" },
  { code: "sw", label: "Kiswahili", flag: "tz" },
  { code: "ar", label: "Arabic", flag: "sa" },
  { code: "ch", label: "Chinese", flag: "cn" },
  { code: "hi", label: "Hindi", flag: "in" },
  { code: "ur", label: "Urdu", flag: "pk" },
  { code: "br", label: "Bambara", flag: "ml" },
];

export function SiteHeader({ landing = false }: { landing?: boolean }) {
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [language, setLanguage] = useState<Language>("en");
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileDropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const selectedLanguage = languageOptions.find((option) => option.code === language) ?? languageOptions[0];

  useEffect(() => {
    const savedLang = localStorage.getItem("santech_lang") as Language | null;
    if (savedLang === "en" || savedLang === "rw" || savedLang === "fr" || savedLang === "sw") {
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
      const target = event.target as Node;
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(target) &&
        mobileDropdownRef.current &&
        !mobileDropdownRef.current.contains(target)
      ) {
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
    <header className="fixed inset-x-0 top-0 z-[100] transition-all">
      <div className="relative overflow-hidden bg-[#0a1f44] text-white">
        <div className="mx-auto flex min-h-9 min-w-0 max-w-[1600px] items-center justify-between gap-2 px-4 py-1 text-[10px] font-semibold sm:px-6 sm:text-xs 2xl:px-8">
          <a href="tel:+250780309833" className="inline-flex min-w-0 flex-1 items-center gap-1.5 transition-colors hover:text-[#00A3E0] xl:flex-none xl:gap-2">
            <Phone className="size-3 shrink-0 sm:size-3.5" />
            <span className="truncate">+250780309833 / +22371005873</span>
          </a>
          <span className="inline-flex min-w-0 flex-1 items-center justify-end gap-1.5 text-right xl:flex-none xl:gap-2">
            <MapPin className="size-3 shrink-0 sm:size-3.5" />
            <span className="truncate">Plot 48, KN 1 Road, Sofaru Building; Kigali-Rwanda</span>
          </span>
          <a href="mailto:info@santechinnovate.com" className="hidden items-center gap-2 transition-colors hover:text-[#00A3E0] xl:inline-flex">
            <Mail className="size-4" />
            <span className="truncate">info@santechinnovate.com</span>
          </a>
          <span className="hidden items-center gap-2 2xl:inline-flex">
            <Radio className="size-4" />
            <span>santech</span>
          </span>
        </div>
      </div>

      {/* Main Navbar */}
      <div className={`relative z-30 transition-all duration-300 ${
        isScrolled 
          ? "bg-white/95 backdrop-blur-md shadow-md border-b border-slate-200/80 py-2.5" 
          : "bg-white border-b border-slate-200/60 py-3.5"
      }`}>
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-3 sm:px-6 2xl:px-8">
          {/* Logo on Left */}
          <Link href="/" className="group flex items-center gap-3 shrink-0" onClick={() => setOpen(false)}>
            <Image
              src={santechLogo}
              alt="SAN TECH - Technology · Innovation · Skills · Impact"
              className="h-8 w-auto max-w-[135px] object-contain transition-transform duration-300 group-hover:scale-105 sm:h-9 sm:max-w-[150px] 2xl:h-10 2xl:max-w-[175px]"
              priority
            />
          </Link>

          {/* Navigation Links from PDF Spec */}
          <div className="hidden items-center gap-1 xl:flex 2xl:gap-4">
            <nav className="flex items-center gap-0 2xl:gap-1.5" aria-label="Main navigation">
              {navigation.map((item) => {
                const active = isActiveRoute(item.href);
                const linkClassName = `relative rounded-lg px-2 py-1.5 text-[11px] font-bold tracking-[0.03em] transition-all duration-200 2xl:px-2.5 2xl:text-xs 2xl:tracking-[0.04em] ${
                  active
                    ? "text-[#0a1f44]"
                    : "text-slate-700 hover:text-[#0a1f44]"
                }`;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={linkClassName}
                  >
                    {item.label}
                    {active && (
                      <span className="absolute bottom-0 left-1/2 h-0.5 w-10 -translate-x-1/2 rounded-full bg-[#0a1f44]" />
                    )}
                  </Link>
                );
              })}
            </nav>

            <div className="relative z-[110] flex items-center gap-1.5 border-l border-slate-200 pl-1.5 2xl:gap-2.5 2xl:pl-2">
              {/* Language Selector Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                  className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-[11px] font-semibold text-slate-700 shadow-2xs transition-colors hover:border-slate-300 hover:bg-slate-50 2xl:gap-1.5 2xl:px-2.5 2xl:text-xs"
                  aria-expanded={langDropdownOpen}
                  aria-label="Select language"
                >
                  <img src={`https://flagcdn.com/w20/${selectedLanguage.flag}.png`} alt="" aria-hidden="true" className="h-3.5 w-5 object-cover" />
                  <span>{languageLabels[language]}</span>
                  <ChevronDown className={`size-3 text-slate-400 transition-transform duration-200 ${langDropdownOpen ? "rotate-180" : ""}`} />
                </button>

                <AnimatePresence>
                  {langDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 6, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 4, scale: 0.96 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 z-[120] mt-1.5 w-40 rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl"
                    >
                      {languageOptions.map(({ code, label, flag }) => (
                        <button
                          key={code}
                          type="button"
                          onClick={() => handleLanguageChange(code)}
                          className={`flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors ${
                            language === code ? "bg-[#333292]/10 text-[#333292] font-bold" : "text-slate-700 hover:bg-slate-100"
                          }`}
                        >
                          <span className="inline-flex items-center gap-2"><img src={`https://flagcdn.com/w20/${flag}.png`} alt="" aria-hidden="true" className="h-3.5 w-5 object-cover" />{label}</span>
                          {language === code && <Check className="size-3.5 text-[#333292]" />}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Visually Prominent CTA Button: JOIN THE COMMUNITY */}
              <Link
                href="/join-the-community"
                className="inline-flex items-center gap-1 rounded-xl bg-[#0a1f44] px-3 py-2 text-[11px] font-extrabold uppercase tracking-[0.06em] text-white shadow-md transition-all duration-200 hover:scale-[1.02] hover:bg-[#132f61] hover:shadow-lg active:scale-[0.98] 2xl:gap-1.5 2xl:px-4 2xl:text-xs 2xl:tracking-wider"
              >
                <span>JOIN THE COMMUNITY</span>
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 xl:hidden">
            <div ref={mobileDropdownRef} className="relative">
              <button
                type="button"
                onClick={() => setLangDropdownOpen((open) => !open)}
                aria-expanded={langDropdownOpen}
                aria-label="Select language"
                className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs font-bold text-[#333292]"
              >
                <img src={`https://flagcdn.com/w20/${selectedLanguage.flag}.png`} alt="" aria-hidden="true" className="h-3.5 w-5 object-cover" />
                <span>{language.toUpperCase()}</span>
                <ChevronDown className={`size-3 transition-transform ${langDropdownOpen ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {langDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 5, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 3, scale: 0.96 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full z-[130] mt-2 w-44 rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl"
                  >
                    {languageOptions.map(({ code, label, flag }) => (
                      <button
                        key={code}
                        type="button"
                        onClick={() => handleLanguageChange(code)}
                        className={`flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-xs font-semibold transition-colors ${
                          language === code ? "bg-[#333292]/10 font-bold text-[#333292]" : "text-slate-700 hover:bg-slate-100"
                        }`}
                      >
                        <span className="inline-flex items-center gap-2"><img src={`https://flagcdn.com/w20/${flag}.png`} alt="" aria-hidden="true" className="h-3.5 w-5 object-cover" />{label}</span>
                        {language === code && <Check className="size-3.5 text-[#333292]" />}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
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
            className="mx-3 mt-2 overflow-hidden rounded-2xl border border-slate-200/90 bg-white/98 shadow-2xl backdrop-blur-2xl xl:hidden"
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

              <Link
                href="/join-the-community"
                onClick={() => setOpen(false)}
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-[#0a1f44] px-5 py-3.5 text-sm font-extrabold uppercase tracking-wider text-white shadow-md transition-all hover:bg-[#132f61]"
              >
                <span>JOIN THE COMMUNITY</span>
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

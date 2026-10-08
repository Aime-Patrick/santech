"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { pageMenuCopy, type SupportedLanguage, type PageMenuTranslations } from "@/lib/manual-translations";

export type StickyPageMenuItem = {
  key: string;
  label: string;
  href: string;
};

export function StickyPageMenu({
  items,
  activeKey,
  ariaLabel,
  translationKey,
}: {
  items: readonly StickyPageMenuItem[];
  activeKey: string;
  ariaLabel: string;
  /** Which page menu translation group to use: "legacy" | "pulse" | "change" | "innovation" */
  translationKey?: keyof PageMenuTranslations;
}) {
  const [language, setLanguage] = useState<SupportedLanguage>("en");

  // Read saved language on mount
  useEffect(() => {
    const saved = localStorage.getItem("santech_lang") as SupportedLanguage | null;
    if (saved && saved in pageMenuCopy) {
      setLanguage(saved);
    }
  }, []);

  // Listen for language change events from the header
  useEffect(() => {
    function handleLangChange(e: Event) {
      const lang = (e as CustomEvent<{ lang: SupportedLanguage }>).detail?.lang;
      if (lang && lang in pageMenuCopy) setLanguage(lang);
    }
    window.addEventListener("santech-language-change", handleLangChange);
    return () => window.removeEventListener("santech-language-change", handleLangChange);
  }, []);

  const translations = translationKey ? pageMenuCopy[language][translationKey] : null;

  return (
    <div className="sticky top-[104px] z-40 bg-white/95 px-3 pt-2 backdrop-blur-sm sm:px-6 2xl:px-8">
      <div className="mx-auto max-w-[1600px]">
        <nav aria-label={ariaLabel} className="mb-3 flex flex-wrap items-center justify-start gap-x-7 gap-y-1 py-1 sm:gap-x-8">
          {items.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              aria-current={activeKey === item.key ? "page" : undefined}
              className={`relative inline-flex min-h-10 items-center px-1 text-[11px] font-black uppercase tracking-[0.08em] transition-colors sm:text-xs ${
                activeKey === item.key ? "text-[#0a1f44]" : "text-slate-600 hover:text-[#0a1f44]"
              }`}
            >
              <span>{translations?.[item.label] ?? item.label}</span>
              {activeKey === item.key && <span className="absolute inset-x-0 bottom-0 h-0.5 bg-brand-secondary" />}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}

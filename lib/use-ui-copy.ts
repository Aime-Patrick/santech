"use client";

/**
 * useUiCopy — React hook for Tier 1 UI string translations.
 *
 * Usage:
 *   const t = useUiCopy();
 *   <button>{t.readStory}</button>
 *
 * Reads the saved language from localStorage and listens for
 * "santech-language-change" events dispatched by the site header.
 */

import { useEffect, useState } from "react";
import { uiCopy, type SupportedLanguage } from "@/lib/manual-translations";

export function useUiCopy() {
  const [language, setLanguage] = useState<SupportedLanguage>("en");

  // Read saved language on mount
  useEffect(() => {
    const saved = localStorage.getItem("santech_lang") as SupportedLanguage | null;
    if (saved && saved in uiCopy) setLanguage(saved);
  }, []);

  // Listen for language changes from the header
  useEffect(() => {
    function handleChange(e: Event) {
      const lang = (e as CustomEvent<{ lang: SupportedLanguage }>).detail?.lang;
      if (lang && lang in uiCopy) setLanguage(lang);
    }
    window.addEventListener("santech-language-change", handleChange);
    return () => window.removeEventListener("santech-language-change", handleChange);
  }, []);

  return uiCopy[language];
}

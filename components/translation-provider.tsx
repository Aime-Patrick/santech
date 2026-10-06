"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";
import type { ReactNode } from "react";

type TranslationLanguage = "en" | "rw" | "fr" | "sw" | "ar" | "ch" | "hi" | "ur" | "br";

const googleTargets: Record<Exclude<TranslationLanguage, "en">, string> = {
  rw: "rw",
  fr: "fr",
  sw: "sw",
  ar: "ar",
  ch: "zh-CN",
  hi: "hi",
  ur: "ur",
  br: "bm",
};

const ignoredTags = new Set(["SCRIPT", "STYLE", "NOSCRIPT", "TEMPLATE", "CODE", "PRE", "SVG"]);

function getTextNodes(root: Node) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const nodes: Text[] = [];
  let current = walker.nextNode();

  while (current) {
    const node = current as Text;
    const parent = node.parentElement;

    if (parent && !ignoredTags.has(parent.tagName) && !parent.closest("[data-no-translate]") && node.nodeValue?.trim()) {
      nodes.push(node);
    }

    current = walker.nextNode();
  }

  return nodes;
}

function withWhitespace(original: string, translated: string) {
  const leading = original.match(/^\s*/)?.[0] ?? "";
  const trailing = original.match(/\s*$/)?.[0] ?? "";
  return `${leading}${translated.trim()}${trailing}`;
}

export function TranslationProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const originalText = useRef(new Map<Text, string>());
  const translating = useRef(false);
  const observer = useRef<MutationObserver | null>(null);
  const currentLanguage = useRef<TranslationLanguage>("en");
  const translationRun = useRef(0);

  const restoreEnglish = useCallback(() => {
    originalText.current.forEach((original, node) => {
      if (node.isConnected) node.nodeValue = original;
    });
    originalText.current.clear();
    currentLanguage.current = "en";
    document.documentElement.lang = "en";
  }, []);

  const translatePage = useCallback(async (language: TranslationLanguage, force = true) => {
    if (typeof document === "undefined") return;

    if (language === "en") {
      translationRun.current += 1;
      observer.current?.disconnect();
      restoreEnglish();
      observer.current?.observe(document.body, { childList: true, subtree: true });
      return;
    }

    const target = googleTargets[language];
    if (!target || translating.current) return;

    currentLanguage.current = language;
    const run = ++translationRun.current;
    const nodes = getTextNodes(document.body)
      .filter((node) => (node.nodeValue?.trim().length ?? 0) >= 2)
      .filter((node) => force || !originalText.current.has(node));
    const pending = nodes.map((node) => {
      const current = node.nodeValue ?? "";
      const original = originalText.current.get(node) ?? current;
      originalText.current.set(node, original);
      return { node, original };
    });

    if (pending.length === 0) return;

    translating.current = true;
    observer.current?.disconnect();

    try {
      const translated: string[] = [];
      for (let index = 0; index < pending.length; index += 128) {
        const batch = pending.slice(index, index + 128);
        const response = await fetch("/api/translate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ target, texts: batch.map(({ original }) => original) }),
        });

        if (!response.ok) throw new Error("Translation request failed");
        const result = (await response.json()) as { translations?: string[] };
        translated.push(...(result.translations ?? []));
      }

      if (run !== translationRun.current || currentLanguage.current !== language) return;

      pending.forEach(({ node, original }, index) => {
        const value = translated[index];
        if (value) node.nodeValue = withWhitespace(original, value);
      });
      document.documentElement.lang = target;
    } catch (error) {
      console.error("SAN TECH translation failed", error);
    } finally {
      translating.current = false;
      observer.current?.observe(document.body, { childList: true, subtree: true });
    }
  }, [restoreEnglish]);

  useEffect(() => {
    const saved = localStorage.getItem("santech_lang") as TranslationLanguage | null;
    const language = saved && (saved === "en" || saved in googleTargets) ? saved : "en";

    currentLanguage.current = language;
    observer.current = new MutationObserver(() => {
      if (currentLanguage.current !== "en" && !translating.current) void translatePage(currentLanguage.current, false);
    });
    observer.current.observe(document.body, { childList: true, subtree: true });

    const handleLanguageChange = (event: Event) => {
      const nextLanguage = (event as CustomEvent<{ lang?: TranslationLanguage }>).detail?.lang ?? "en";
      currentLanguage.current = nextLanguage;
      void translatePage(nextLanguage);
    };

    window.addEventListener("santech-language-change", handleLanguageChange);
    if (language !== "en") void translatePage(language);

    return () => {
      observer.current?.disconnect();
      observer.current = null;
      window.removeEventListener("santech-language-change", handleLanguageChange);
    };
  }, [pathname, translatePage]);

  return children;
}

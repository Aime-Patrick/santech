import type { Metadata } from "next";
import { Exo } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const exo = Exo({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-exo",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SAN TECH | Technology. Innovation. Impact.",
  description:
    "SAN TECH builds technology, skills, and innovation systems for a more connected Africa.",
  icons: {
    icon: "/santech.png",
    shortcut: "/santech.png",
    apple: "/santech.png",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={exo.variable} data-scroll-behavior="smooth">
      <body className={exo.className}>
        {children}
        <Script id="google-translate-init" strategy="afterInteractive">
          {`window.googleTranslateElementInit = function () {
            var target = document.getElementById("google_translate_element");

            if (target && !target.childElementCount && window.google && window.google.translate) {
              new window.google.translate.TranslateElement(
                { pageLanguage: "en", autoDisplay: false },
                "google_translate_element"
              );
            }

            window.santechApplyGoogleLanguage = function (language, attempt) {
              var googleLanguage = language === "ch" ? "zh-CN" : language;
              var targetValue = googleLanguage;
              var selects = document.querySelectorAll("select.goog-te-combo");
              var applied = false;

              selects.forEach(function (select) {
                var hasTarget = Array.prototype.some.call(select.options, function (option) {
                  return option.value === targetValue;
                });

                if (!hasTarget) return;
                select.value = targetValue;
                select.dispatchEvent(new Event("change"));
                applied = true;
              });

              // Google adds the options asynchronously. Retry until the exact
              // language exists so rw cannot fall back to a previous language.
              var nextAttempt = (attempt || 0) + 1;
              if (!applied && nextAttempt < 40) {
                window.setTimeout(function () {
                  window.santechApplyGoogleLanguage(language, nextAttempt);
                }, 150);
              }
            };

            window.santechResetGoogleLanguage = function () {
              var expires = "expires=Thu, 01 Jan 1970 00:00:00 GMT";
              document.cookie = "googtrans=; " + expires + "; path=/";
              document.cookie = "googtrans=; " + expires + "; path=/; domain=" + window.location.hostname;
              window.location.reload();
            };

            var savedLanguage = window.localStorage && window.localStorage.getItem("santech_lang");
            if (savedLanguage && savedLanguage !== "en") {
              window.santechApplyGoogleLanguage(savedLanguage);
            }
          };`}
        </Script>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Exo } from "next/font/google";
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
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={exo.variable} style={{ fontFamily: "var(--font-exo), 'Exo', sans-serif" }} data-scroll-behavior="smooth">
      <body className={exo.className} style={{ fontFamily: "var(--font-exo), 'Exo', sans-serif" }}>
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SAN TECH | Technology. Innovation. Impact.",
  description:
    "SAN TECH builds technology, skills, and innovation systems for a more connected Africa.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>{children}</body>
    </html>
  );
}

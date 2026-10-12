import type { MetadataRoute } from "next";
import { fetchAllTechPulseSlugs } from "@/lib/strapi";

const staticRoutes = [
  "/",
  "/our-legacy",
  "/innovation-lab",
  "/driving-change",
  "/e-visitors",
  "/san-hub",
  "/san-hub/courses",
  "/join-the-community",
  "/tech-pulse",
  "/connect",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://santechconnect.com").replace(/\/$/, "");
  let articleSlugs: string[] = [];

  try {
    articleSlugs = await fetchAllTechPulseSlugs();
  } catch {
    // The static routes should remain available when the CMS is offline.
  }

  const routes = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    changeFrequency: route === "/" ? "weekly" as const : "monthly" as const,
    priority: route === "/" ? 1 : 0.7,
  }));

  return [
    ...routes,
    ...articleSlugs.map((slug) => ({
      url: `${baseUrl}/tech-pulse/${slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}


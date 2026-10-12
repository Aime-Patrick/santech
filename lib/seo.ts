import type { Metadata } from "next";
import { fetchSiteSettings } from "@/lib/strapi";

const FALLBACK_SITE_NAME = "SAN TECH";
const FALLBACK_SITE_DESCRIPTION =
  "SAN TECH builds technology, skills, and innovation systems for a more connected Africa.";

function getSiteUrl() {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!configuredUrl) return "https://santechconnect.com";

  try {
    return new URL(configuredUrl).toString().replace(/\/$/, "");
  } catch {
    return "https://santechconnect.com";
  }
}

export async function createPageMetadata({
  title,
  description,
  path,
  image,
}: {
  title: string;
  description?: string;
  path: string;
  image?: string;
}): Promise<Metadata> {
  const settings = await fetchSiteSettings();
  const siteName = settings?.siteName || FALLBACK_SITE_NAME;
  const pageDescription = description || settings?.siteDescription || FALLBACK_SITE_DESCRIPTION;
  const siteUrl = getSiteUrl();
  const canonicalPath = path.startsWith("/") ? path : `/${path}`;
  const shareImage = image || settings?.seo?.shareImage || settings?.logo || "/santech.png";

  return {
    title: `${title} | ${siteName}`,
    description: pageDescription,
    metadataBase: new URL(siteUrl),
    alternates: { canonical: canonicalPath },
    openGraph: {
      type: "website",
      url: canonicalPath,
      siteName,
      title: `${title} | ${siteName}`,
      description: pageDescription,
      images: [{ url: shareImage, alt: `${siteName} — ${title}` }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${siteName}`,
      description: pageDescription,
      images: [shareImage],
    },
  };
}


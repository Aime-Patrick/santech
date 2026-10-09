/**
 * Strapi API client for santech-f.
 *
 * Strapi 5 returns FLAT objects — no more { data: { attributes: {} } } wrapper.
 * Response shape: { data: [ { id, documentId, title, slug, coverImage: { url, ... } } ] }
 */

import type { TechPulseCategory } from "./tech-pulse-data";

// ─── Environment ─────────────────────────────────────────────────────────────

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL?.replace(/\/$/, "") ?? "http://localhost:1337";

// ─── Safe fetch helper ───────────────────────────────────────────────────────
// Wraps every Strapi call so a network error (ECONNREFUSED, timeout, etc.)
// never crashes the Next.js build — it just returns null.

async function safeFetch(url: string, init?: RequestInit): Promise<Response | null> {
  try {
    return await fetch(url, init);
  } catch {
    console.warn(`[strapi] fetch failed (Strapi unreachable): ${url}`);
    return null;
  }
}

function reportStrapiResponseFailure(operation: string, response: Response | null) {
  if (response && !response.ok) {
    console.warn(`[strapi] ${operation} failed: ${response.status} ${response.statusText}`);
  }
}

// ─── Raw Strapi 5 response shapes ────────────────────────────────────────────

/** A single block node from Strapi's "blocks" rich-text field */
type BlockNode =
  | { type: "paragraph"; children: Array<{ type: "text"; text: string }> }
  | { type: string; children?: Array<{ type: string; text?: string }> };

/** Strapi 5 media object — flat, no attributes wrapper */
interface StrapiMedia {
  id: number;
  url: string;
  alternativeText: string | null;
}

/** Strapi 5 article item — flat, no attributes wrapper */
interface StrapiArticleItem {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  category: TechPulseCategory;
  excerpt: string;
  body: BlockNode[] | null;
  coverImage: StrapiMedia | null;
  coverImageAlt: string | null;
  readingTime: string | null;
  publishedDate: string;   // "YYYY-MM-DD"
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

interface StrapiListResponse {
  data: StrapiArticleItem[];
  meta: {
    pagination: { page: number; pageSize: number; pageCount: number; total: number };
  };
}

// ─── Normalised type (what the app uses) ─────────────────────────────────────

export type CmsArticle = {
  id: number;
  slug: string;
  category: TechPulseCategory;
  categoryLabel: string;
  title: string;
  /** Formatted for display, e.g. "June 18, 2026" */
  date: string;
  /** ISO date, e.g. "2026-06-18" */
  publishedAt: string;
  readingTime: string;
  /** Absolute URL ready for <Image src={…}> */
  image: string;
  imageAlt: string;
  excerpt: string;
  /** Plain-text paragraphs extracted from blocks body */
  body: string[];
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

function resolveMediaUrl(url: string): string {
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  return `${STRAPI_URL}${url}`;
}

function blocksToText(blocks: BlockNode[] | null): string[] {
  if (!blocks) return [];
  return blocks
    .filter((b) => b.type === "paragraph")
    .map((b) =>
      (b.children ?? [])
        .filter((c) => c.type === "text")
        .map((c) => c.text ?? "")
        .join("")
    )
    .filter(Boolean);
}

function formatDate(isoDate: string): string {
  if (!isoDate) return "";
  const [year, month, day] = isoDate.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/** Strapi 5 flat item → CmsArticle */
function normalise(item: StrapiArticleItem): CmsArticle {
  const rawUrl = item.coverImage?.url ?? "";
  const altText =
    item.coverImageAlt ??
    item.coverImage?.alternativeText ??
    item.title;

  return {
    id: item.id,
    slug: item.slug,
    category: item.category,
    categoryLabel: capitalize(item.category),
    title: item.title,
    date: formatDate(item.publishedDate),
    publishedAt: item.publishedDate,
    readingTime: item.readingTime ?? "3 min read",
    image: resolveMediaUrl(rawUrl),
    imageAlt: altText,
    excerpt: item.excerpt,
    body: blocksToText(item.body),
  };
}

// ─── API functions ────────────────────────────────────────────────────────────

/**
 * Fetch all published articles, optionally filtered by category.
 * Sorted by publishedDate descending (newest first).
 */
export async function fetchTechPulseArticles(
  options: {
    category?: TechPulseCategory;
    page?: number;
    pageSize?: number;
  } = {}
): Promise<CmsArticle[]> {
  const { category, page = 1, pageSize = 100 } = options;

  const params = new URLSearchParams();
  params.set("pagination[page]", String(page));
  params.set("pagination[pageSize]", String(pageSize));
  params.set("sort[0]", "publishedDate:desc");
  params.set("populate[coverImage][fields][0]", "url");
  params.set("populate[coverImage][fields][1]", "alternativeText");

  if (category) {
    params.set("filters[category][$eq]", category);
  }

  const url = `${STRAPI_URL}/api/tech-pulse-articles?${params.toString()}`;

  const res = await safeFetch(url, {
    next: { revalidate: 60 },
  });

  if (!res || !res.ok) {
    reportStrapiResponseFailure("fetchTechPulseArticles", res);
    return [];
  }

  const json: StrapiListResponse = await res!.json();
  return (json.data ?? []).map(normalise);
}

/**
 * Fetch a single published article by slug.
 * Returns null if not found.
 */
export async function fetchTechPulseArticleBySlug(
  slug: string
): Promise<CmsArticle | null> {
  const params = new URLSearchParams();
  params.set("filters[slug][$eq]", slug);
  params.set("populate[coverImage][fields][0]", "url");
  params.set("populate[coverImage][fields][1]", "alternativeText");

  const url = `${STRAPI_URL}/api/tech-pulse-articles?${params.toString()}`;

  const res = await safeFetch(url, {
    next: { revalidate: 60 },
  });

  if (!res || !res.ok) {
    reportStrapiResponseFailure(`fetchTechPulseArticleBySlug("${slug}")`, res);
    return null;
  }

  const json: StrapiListResponse = await res!.json();
  const item = json.data?.[0];
  return item ? normalise(item) : null;
}

/**
 * Returns all slugs for generateStaticParams in the [slug] page.
 */
export async function fetchAllTechPulseSlugs(): Promise<string[]> {
  const params = new URLSearchParams();
  params.set("fields[0]", "slug");
  params.set("pagination[pageSize]", "500");

  const url = `${STRAPI_URL}/api/tech-pulse-articles?${params.toString()}`;

  const res = await safeFetch(url, { next: { revalidate: 3600 } });
  if (!res || !res.ok) return [];

  const json: StrapiListResponse = await res!.json();
  return (json.data ?? []).map((item) => item.slug);
}

// ═══════════════════════════════════════════════════════════════════════════
// ADDITIONAL COLLECTION TYPES
// ═══════════════════════════════════════════════════════════════════════════

// ─── Home — Impact Stats ─────────────────────────────────────────────────────

export type SiteStat = {
  id: number;
  value: number;
  suffix: string;
  label: string;
};

export async function fetchSiteStats(): Promise<SiteStat[]> {
  const url = `${STRAPI_URL}/api/site-stats?sort[0]=sortOrder:asc&pagination[pageSize]=20`;
  const res = await safeFetch(url, { next: { revalidate: 300 } });
  if (!res || !res.ok) {
    reportStrapiResponseFailure("fetchSiteStats", res);
    return [];
  }
  const json: { data: Array<{ id: number; value: number; suffix: string; label: string }> } = await res!.json();
  return json.data ?? [];
}

// ─── Home + E-Visitors — Partner Brands ──────────────────────────────────────

export type PartnerBrand = {
  id: number;
  label: string;
  logo: string;
  href: string | null;
  showLabel: boolean;
  displayLabel: string | null;
  isGovernment: boolean;
};

export async function fetchPartnerBrands(): Promise<PartnerBrand[]> {
  const url = `${STRAPI_URL}/api/partner-brands?sort[0]=sortOrder:asc&populate[logo][fields][0]=url&pagination[pageSize]=50`;
  const res = await safeFetch(url, { next: { revalidate: 300 } });
  if (!res || !res.ok) {
    reportStrapiResponseFailure("fetchPartnerBrands", res);
    return [];
  }
  const json: {
    data: Array<{
      id: number;
      label: string;
      logo: { url: string } | null;
      href: string | null;
      showLabel: boolean;
      displayLabel: string | null;
      isGovernment: boolean;
    }>;
  } = await res!.json();
  return (json.data ?? []).map((item) => ({
    id: item.id,
    label: item.label,
    logo: item.logo?.url ? resolveMediaUrl(item.logo.url) : "",
    href: item.href,
    showLabel: item.showLabel,
    displayLabel: item.displayLabel,
    isGovernment: item.isGovernment,
  }));
}

// ─── Driving Change Stories ──────────────────────────────────────────────────

export type DrivingChangeStory = {
  id: number;
  slug: string;
  sectionKey: "impact" | "career";
  category: string;
  categoryLabel: string;
  title: string;
  date: string;
  publishedAt: string;
  readingTime: string;
  image: string;
  imageAlt: string;
  excerpt: string;
  location: string;
  institution: string | null;
  body: string[];
  stats: { label: string; value: string } | null;
};

export async function fetchDrivingChangeStories(
  sectionKey?: "impact" | "career"
): Promise<DrivingChangeStory[]> {
  const params = new URLSearchParams();
  params.set("sort[0]", "publishedDate:desc");
  params.set("populate[coverImage][fields][0]", "url");
  params.set("populate[coverImage][fields][1]", "alternativeText");
  params.set("pagination[pageSize]", "100");
  if (sectionKey) params.set("filters[sectionKey][$eq]", sectionKey);

  const url = `${STRAPI_URL}/api/driving-change-stories?${params.toString()}`;
  const res = await safeFetch(url, { next: { revalidate: 60 } });
  if (!res || !res.ok) {
    reportStrapiResponseFailure("fetchDrivingChangeStories", res);
    return [];
  }

  const json: {
    data: Array<{
      id: number;
      slug: string;
      sectionKey: "impact" | "career";
      category: string;
      categoryLabel: string;
      title: string;
      excerpt: string;
      body: BlockNode[] | null;
      coverImage: StrapiMedia | null;
      coverImageAlt: string | null;
      location: string;
      institution: string | null;
      statLabel: string | null;
      statValue: string | null;
      readingTime: string | null;
      publishedDate: string;
    }>;
  } = await res!.json();

  return (json.data ?? []).map((item) => ({
    id: item.id,
    slug: item.slug,
    sectionKey: item.sectionKey,
    category: item.category,
    categoryLabel: item.categoryLabel,
    title: item.title,
    date: formatDate(item.publishedDate),
    publishedAt: item.publishedDate,
    readingTime: item.readingTime ?? "3 min read",
    image: item.coverImage?.url ? resolveMediaUrl(item.coverImage.url) : "",
    imageAlt: item.coverImageAlt ?? item.coverImage?.alternativeText ?? item.title,
    excerpt: item.excerpt,
    location: item.location,
    institution: item.institution,
    body: blocksToText(item.body),
    stats:
      item.statLabel && item.statValue
        ? { label: item.statLabel, value: item.statValue }
        : null,
  }));
}

export async function fetchDrivingChangeStoryBySlug(
  slug: string
): Promise<DrivingChangeStory | null> {
  const params = new URLSearchParams();
  params.set("filters[slug][$eq]", slug);
  params.set("populate[coverImage][fields][0]", "url");
  params.set("populate[coverImage][fields][1]", "alternativeText");

  const url = `${STRAPI_URL}/api/driving-change-stories?${params.toString()}`;
  const res = await safeFetch(url, { next: { revalidate: 60 } });
  if (!res || !res.ok) return null;

  const json: {
    data: Array<{
      id: number;
      slug: string;
      sectionKey: "impact" | "career";
      category: string;
      categoryLabel: string;
      title: string;
      excerpt: string;
      body: BlockNode[] | null;
      coverImage: StrapiMedia | null;
      coverImageAlt: string | null;
      location: string;
      institution: string | null;
      statLabel: string | null;
      statValue: string | null;
      readingTime: string | null;
      publishedDate: string;
    }>;
  } = await res!.json();

  const item = json.data?.[0];
  if (!item) return null;

  return {
    id: item.id,
    slug: item.slug,
    sectionKey: item.sectionKey,
    category: item.category,
    categoryLabel: item.categoryLabel,
    title: item.title,
    date: formatDate(item.publishedDate),
    publishedAt: item.publishedDate,
    readingTime: item.readingTime ?? "3 min read",
    image: item.coverImage?.url ? resolveMediaUrl(item.coverImage.url) : "",
    imageAlt: item.coverImageAlt ?? item.coverImage?.alternativeText ?? item.title,
    excerpt: item.excerpt,
    location: item.location,
    institution: item.institution,
    body: blocksToText(item.body),
    stats:
      item.statLabel && item.statValue
        ? { label: item.statLabel, value: item.statValue }
        : null,
  };
}

// ─── SAN HUB Catalog Items ───────────────────────────────────────────────────

export type SanHubCatalogItem = {
  id: number;
  itemId: string;
  category: string;
  focus: string | null;
  title: string;
  provider: string | null;
  description: string;
  image: string;
  format: string | null;
  duration: string | null;
  level: string | null;
  badge: string | null;
  href: string | null;
};

export async function fetchSanHubCatalogItems(
  category?: string,
  options: { fresh?: boolean } = {}
): Promise<SanHubCatalogItem[]> {
  const params = new URLSearchParams();
  params.set("sort[0]", "sortOrder:asc");
  params.set("populate[image][fields][0]", "url");
  params.set("pagination[pageSize]", "100");
  if (category) params.set("filters[category][$eq]", category);

  const url = `${STRAPI_URL}/api/san-hub-catalog-items?${params.toString()}`;
  const res = await safeFetch(url, options.fresh ? { cache: "no-store" } : { next: { revalidate: 60 } });
  if (!res || !res.ok) {
    reportStrapiResponseFailure("fetchSanHubCatalogItems", res);
    return [];
  }

  const json: {
    data: Array<{
      id: number;
      itemId: string;
      category: string;
      focus: string | null;
      title: string;
      provider: string | null;
      description: string;
      image: { url: string } | null;
      format: string | null;
      duration: string | null;
      level: string | null;
      badge: string | null;
      href: string | null;
    }>;
  } = await res!.json();

  return (json.data ?? []).map((item) => ({
    id: item.id,
    itemId: item.itemId,
    category: item.category,
    focus: item.focus,
    title: item.title,
    provider: item.provider,
    description: item.description,
    image: item.image?.url ? resolveMediaUrl(item.image.url) : "",
    format: item.format,
    duration: item.duration,
    level: item.level,
    badge: item.badge,
    href: item.href,
  }));
}

// ─── Tech Pulse Opportunities ────────────────────────────────────────────────

export type Opportunity = {
  id: number;
  title: string;
  type: string;
  badge: string | null;
  description: string;
  deadline: string | null;
  href: string | null;
  image: string;
};

export async function fetchOpportunities(): Promise<Opportunity[]> {
  const url = `${STRAPI_URL}/api/opportunities?sort[0]=sortOrder:asc&populate[coverImage][fields][0]=url&pagination[pageSize]=50`;
  const res = await safeFetch(url, { next: { revalidate: 60 } });
  if (!res || !res.ok) {
    reportStrapiResponseFailure("fetchOpportunities", res);
    return [];
  }

  const json: {
    data: Array<{
      id: number;
      title: string;
      type: string;
      badge: string | null;
      description: string;
      deadline: string | null;
      href: string | null;
      coverImage: { url: string } | null;
    }>;
  } = await res!.json();

  return (json.data ?? []).map((item) => ({
    id: item.id,
    title: item.title,
    type: item.type,
    badge: item.badge,
    description: item.description,
    deadline: item.deadline,
    href: item.href,
    image: item.coverImage?.url ? resolveMediaUrl(item.coverImage.url) : "",
  }));
}

// ─── Our Legacy — Recognition ────────────────────────────────────────────────

export type Recognition = {
  id: number;
  title: string;
  year: string;
  description: string;
  badge: string | null;
  image: string;
  imageAlt: string | null;
};

export async function fetchRecognitions(): Promise<Recognition[]> {
  const url = `${STRAPI_URL}/api/recognitions?sort[0]=year:desc&populate[image][fields][0]=url&pagination[pageSize]=50`;
  const res = await safeFetch(url, { next: { revalidate: 300 } });
  if (!res) return [];
  if (!res.ok) { console.warn(`[strapi] fetchRecognitions failed: ${res.status} ${res.statusText}`); return []; }

  const json: {
    data: Array<{
      id: number;
      title: string;
      year: string;
      description: string;
      badge: string | null;
      image: { url: string } | null;
      imageAlt: string | null;
    }>;
  } = await res!.json();

  return (json.data ?? []).map((item) => ({
    id: item.id,
    title: item.title,
    year: item.year,
    description: item.description,
    badge: item.badge,
    image: item.image?.url ? resolveMediaUrl(item.image.url) : "",
    imageAlt: item.imageAlt,
  }));
}

// ─── Our Legacy — Team Members ───────────────────────────────────────────────

export type TeamMember = {
  id: number;
  name: string;
  position: string;
  department: string | null;
  expertise: string | null;
  bio: string | null;
  photo: string;
  linkedIn: string | null;
};

export async function fetchTeamMembers(): Promise<TeamMember[]> {
  const url = `${STRAPI_URL}/api/team-members?sort[0]=sortOrder:asc&populate[photo][fields][0]=url&pagination[pageSize]=100`;
  const res = await safeFetch(url, { next: { revalidate: 300 } });
  if (!res) return [];
  if (!res.ok) { console.warn(`[strapi] fetchTeamMembers failed: ${res.status} ${res.statusText}`); return []; }

  const json: {
    data: Array<{
      id: number;
      name: string;
      position: string;
      department: string | null;
      expertise: string | null;
      bio: string | null;
      photo: { url: string } | null;
      linkedIn: string | null;
    }>;
  } = await res!.json();

  return (json.data ?? []).map((item) => ({
    id: item.id,
    name: item.name,
    position: item.position,
    department: item.department,
    expertise: item.expertise,
    bio: item.bio,
    photo: item.photo?.url ? resolveMediaUrl(item.photo.url) : "",
    linkedIn: item.linkedIn,
  }));
}

// ─── E-Visitors — Testimonials ───────────────────────────────────────────────

export type Testimonial = {
  id: number;
  name: string;
  role: string;
  quote: string;
  rating: number;
  avatar: string;
};

export async function fetchTestimonials(): Promise<Testimonial[]> {
  const url = `${STRAPI_URL}/api/testimonials?sort[0]=sortOrder:asc&populate[avatar][fields][0]=url&pagination[pageSize]=50`;
  const res = await safeFetch(url, { next: { revalidate: 300 } });
  if (!res || !res.ok) {
    reportStrapiResponseFailure("fetchTestimonials", res);
    return [];
  }

  const json: {
    data: Array<{
      id: number;
      name: string;
      role: string;
      quote: string;
      rating: number;
      avatar: { url: string } | null;
    }>;
  } = await res!.json();

  return (json.data ?? []).map((item) => ({
    id: item.id,
    name: item.name,
    role: item.role,
    quote: item.quote,
    rating: item.rating,
    avatar: item.avatar?.url ? resolveMediaUrl(item.avatar.url) : "",
  }));
}

// ─── Connect Page — Contact Info (Single Type) ───────────────────────────────

export type ContactInfo = {
  phone1: string | null;
  phone2: string | null;
  whatsapp: string | null;
  email: string | null;
  emailAlt: string | null;
  address: string | null;
  radioUrl: string | null;
  radioLabel: string | null;
  mapsEmbedUrl: string | null;
  mapsDirectionsUrl: string | null;
};

export async function fetchContactInfo(): Promise<ContactInfo | null> {
  const url = `${STRAPI_URL}/api/contact-info`;
  const res = await safeFetch(url, { next: { revalidate: 3600 } });
  if (!res || !res.ok) {
    reportStrapiResponseFailure("fetchContactInfo", res);
    return null;
  }

  const json: { data: ContactInfo | null } = await res!.json();
  return json.data;
}

// ═══════════════════════════════════════════════════════════════════════════
// REMAINING CONTENT COLLECTIONS
// ═══════════════════════════════════════════════════════════════════════════

// ─── E-Visitors Features ─────────────────────────────────────────────────────

export type EVisitorsFeature = {
  id: number;
  number: string;
  label: string;
  title: string;
  description: string;
  panel: string | null;
  displayStatus: string | null;
  iconName: string;
  screen: string;
  details: string[];
};

export async function fetchEVisitorsFeatures(): Promise<EVisitorsFeature[]> {
  const url = `${STRAPI_URL}/api/e-visitors-features?sort[0]=sortOrder:asc&populate[screen][fields][0]=url&pagination[pageSize]=20`;
  const res = await safeFetch(url, { next: { revalidate: 300 } });
  if (!res || !res.ok) { reportStrapiResponseFailure("fetchEVisitorsFeatures", res); return []; }
  const json: { data: Array<{ id: number; number: string; label: string; title: string; description: string; panel: string | null; displayStatus: string | null; iconName: string; screen: { url: string } | null; details: string[] | null }> } = await res!.json();
  return (json.data ?? []).map((item) => ({
    id: item.id,
    number: item.number,
    label: item.label,
    title: item.title,
    description: item.description,
    panel: item.panel,
    displayStatus: item.displayStatus,
    iconName: item.iconName ?? "BarChart3",
    screen: item.screen?.url ? resolveMediaUrl(item.screen.url) : "",
    details: item.details ?? [],
  }));
}

// ─── Product Milestones ───────────────────────────────────────────────────────

export type ProductMilestone = {
  id: number;
  year: string;
  title: string;
  description: string;
  product: string;
};

export async function fetchProductMilestones(product?: string): Promise<ProductMilestone[]> {
  const params = new URLSearchParams();
  params.set("sort[0]", "sortOrder:asc");
  params.set("pagination[pageSize]", "50");
  if (product) params.set("filters[product][$eq]", product);
  const url = `${STRAPI_URL}/api/product-milestones?${params.toString()}`;
  const res = await safeFetch(url, { next: { revalidate: 300 } });
  if (!res || !res.ok) { reportStrapiResponseFailure("fetchProductMilestones", res); return []; }
  const json: { data: Array<{ id: number; year: string; title: string; description: string; product: string }> } = await res!.json();
  return json.data ?? [];
}

// ─── FAQ Items ────────────────────────────────────────────────────────────────

export type FaqItem = {
  id: number;
  question: string;
  answer: string;
  product: string;
};

export async function fetchFaqItems(product?: string): Promise<FaqItem[]> {
  const params = new URLSearchParams();
  params.set("sort[0]", "sortOrder:asc");
  params.set("pagination[pageSize]", "50");
  if (product) params.set("filters[product][$eq]", product);
  const url = `${STRAPI_URL}/api/faq-items?${params.toString()}`;
  const res = await safeFetch(url, { next: { revalidate: 300 } });
  if (!res || !res.ok) { reportStrapiResponseFailure("fetchFaqItems", res); return []; }
  const json: { data: Array<{ id: number; question: string; answer: string; product: string }> } = await res!.json();
  return json.data ?? [];
}

// ─── Journey Stages ───────────────────────────────────────────────────────────

export type JourneyStage = {
  id: number;
  year: string;
  stage: string;
  description: string;
};

export async function fetchJourneyStages(): Promise<JourneyStage[]> {
  const url = `${STRAPI_URL}/api/journey-stages?sort[0]=sortOrder:asc&pagination[pageSize]=50`;
  const res = await safeFetch(url, { next: { revalidate: 300 } });
  if (!res) return [];
  if (!res.ok) { console.warn(`[strapi] fetchJourneyStages failed: ${res.status} ${res.statusText}`); return []; }
  const json: { data: Array<{ id: number; year: string; stage: string; description: string }> } = await res!.json();
  return json.data ?? [];
}

// ─── Company Values ───────────────────────────────────────────────────────────

export type CompanyValue = {
  id: number;
  label: string;
  description: string;
};

export async function fetchCompanyValues(): Promise<CompanyValue[]> {
  const url = `${STRAPI_URL}/api/company-values?sort[0]=sortOrder:asc&pagination[pageSize]=20`;
  const res = await safeFetch(url, { next: { revalidate: 300 } });
  if (!res) return [];
  if (!res.ok) { console.warn(`[strapi] fetchCompanyValues failed: ${res.status} ${res.statusText}`); return []; }
  const json: { data: Array<{ id: number; label: string; description: string }> } = await res!.json();
  return json.data ?? [];
}

// ─── Focus Areas ──────────────────────────────────────────────────────────────

export type FocusArea = {
  id: number;
  label: string;
  description: string;
  iconName: string;
};

export async function fetchFocusAreas(): Promise<FocusArea[]> {
  const url = `${STRAPI_URL}/api/focus-areas?sort[0]=sortOrder:asc&pagination[pageSize]=20`;
  const res = await safeFetch(url, { next: { revalidate: 300 } });
  if (!res) return [];
  if (!res.ok) { console.warn(`[strapi] fetchFocusAreas failed: ${res.status} ${res.statusText}`); return []; }
  const json: { data: Array<{ id: number; label: string; description: string; iconName: string }> } = await res!.json();
  return (json.data ?? []).map((item) => ({ ...item, iconName: item.iconName ?? "Code2" }));
}

// ─── Home Story Slides ────────────────────────────────────────────────────────

export type HomeStorySlide = {
  id: number;
  slideId: string;
  index: string;
  eyebrow: string;
  title: string | null;
  body: string;
  detail: string | null;
  additional: string | null;
  note: string | null;
  variant: "default" | "services" | null;
  facts: Array<{ label: string; value: string }>;
  flow: string[] | null;
  groups: Array<{ label: string; items: string }> | null;
  items: string[] | null;
};

export async function fetchHomeStorySlides(): Promise<HomeStorySlide[]> {
  const url = `${STRAPI_URL}/api/home-story-slides?sort[0]=sortOrder:asc&pagination[pageSize]=20`;
  const res = await safeFetch(url, { next: { revalidate: 300 } });
  if (!res || !res.ok) { reportStrapiResponseFailure("fetchHomeStorySlides", res); return []; }
  const json: {
    data: Array<{
      id: number;
      slideId: string;
      index: string;
      eyebrow: string;
      title: string | null;
      body: string;
      detail: string | null;
      additional: string | null;
      note: string | null;
      variant: "default" | "services" | null;
      facts: Array<{ label: string; value: string }> | null;
      flow: string[] | null;
      groups: Array<{ label: string; items: string }> | null;
      items: string[] | null;
    }>;
  } = await res!.json();
  return (json.data ?? []).map((item) => ({
    ...item,
    facts: item.facts ?? [],
  }));
}

// ─── Innovation Products ──────────────────────────────────────────────────────

export type InnovationProduct = {
  id: number;
  productId: string;
  label: string;
  title: string;
  description: string;
  coreFeatures: Array<{ label: string; description: string; iconName: string }>;
  mediaKind: "image" | "video";
  mediaImage: string;
  mediaImages: string[];
  mediaAlt: string;
};

export async function fetchInnovationProducts(): Promise<InnovationProduct[]> {
  const params = new URLSearchParams();
  params.set("sort[0]", "sortOrder:asc");
  params.set("populate[mediaImage][fields][0]", "url");
  params.set("populate[mediaImages][fields][0]", "url");
  params.set("pagination[pageSize]", "20");
  const url = `${STRAPI_URL}/api/innovation-products?${params.toString()}`;
  const res = await safeFetch(url, { next: { revalidate: 300 } });
  if (!res) return [];
  if (!res.ok) { console.warn(`[strapi] fetchInnovationProducts failed: ${res.status} ${res.statusText}`); return []; }
  const json: {
    data: Array<{
      id: number;
      productId: string;
      label: string;
      title: string;
      description: string | null;
      coreFeatures: Array<{ label: string; description: string; iconName: string }> | null;
      mediaKind: "image" | "video";
      mediaImage: { url: string } | null;
      mediaImages: Array<{ url: string }> | null;
      mediaAlt: string | null;
    }>;
  } = await res!.json();
  return (json.data ?? []).map((item) => ({
    id: item.id,
    productId: item.productId,
    label: item.label,
    title: item.title,
    description: item.description ?? "",
    coreFeatures: item.coreFeatures ?? [],
    mediaKind: item.mediaKind ?? "image",
    mediaImage: item.mediaImage?.url ? resolveMediaUrl(item.mediaImage.url) : "",
    mediaImages: (item.mediaImages ?? []).map((img) => resolveMediaUrl(img.url)),
    mediaAlt: item.mediaAlt ?? item.label,
  }));
}

// ─── Innovation Services ──────────────────────────────────────────────────────

export type InnovationService = {
  id: number;
  serviceId: string;
  label: string;
  description: string;
  iconName: string;
};

export async function fetchInnovationServices(): Promise<InnovationService[]> {
  const url = `${STRAPI_URL}/api/innovation-services?sort[0]=sortOrder:asc&pagination[pageSize]=20`;
  const res = await safeFetch(url, { next: { revalidate: 300 } });
  if (!res || !res.ok) { reportStrapiResponseFailure("fetchInnovationServices", res); return []; }
  const json: { data: Array<{ id: number; serviceId: string; label: string; description: string; iconName: string }> } = await res!.json();
  return (json.data ?? []).map((item) => ({ ...item, iconName: item.iconName ?? "Code2" }));
}

// ─── Innovation Solutions ─────────────────────────────────────────────────────

export type InnovationSolution = {
  id: number;
  solutionId: string;
  label: string;
  description: string;
  subItems: string[];
  iconName: string;
};

export async function fetchInnovationSolutions(): Promise<InnovationSolution[]> {
  const url = `${STRAPI_URL}/api/innovation-solutions?sort[0]=sortOrder:asc&pagination[pageSize]=20`;
  const res = await safeFetch(url, { next: { revalidate: 300 } });
  if (!res || !res.ok) { reportStrapiResponseFailure("fetchInnovationSolutions", res); return []; }
  const json: { data: Array<{ id: number; solutionId: string; label: string; description: string; subItems: string[] | null; iconName: string }> } = await res!.json();
  return (json.data ?? []).map((item) => ({
    ...item,
    subItems: item.subItems ?? [],
    iconName: item.iconName ?? "Globe2",
  }));
}

// ─── Technology Categories ────────────────────────────────────────────────────

export type TechnologyCategory = {
  id: number;
  categoryId: string;
  label: string;
  description: string;
  items: string[];
  iconName: string;
};

export async function fetchTechnologyCategories(): Promise<TechnologyCategory[]> {
  const url = `${STRAPI_URL}/api/technology-categories?sort[0]=sortOrder:asc&pagination[pageSize]=20`;
  const res = await safeFetch(url, { next: { revalidate: 300 } });
  if (!res || !res.ok) { reportStrapiResponseFailure("fetchTechnologyCategories", res); return []; }
  const json: { data: Array<{ id: number; categoryId: string; label: string; description: string | null; items: string[] | null; iconName: string }> } = await res!.json();
  return (json.data ?? []).map((item) => ({
    ...item,
    description: item.description ?? "",
    items: item.items ?? [],
    iconName: item.iconName ?? "Code2",
  }));
}

// ─── Standards / Trust Seals ─────────────────────────────────────────────────

export type Standard = {
  id: number;
  title: string;
  issuer: string;
  description: string | null;
  image: string;
  imageAlt: string | null;
  url: string | null;
};

export async function fetchStandards(): Promise<Standard[]> {
  const url = `${STRAPI_URL}/api/standards?sort[0]=sortOrder:asc&populate[image][fields][0]=url&pagination[pageSize]=50`;
  const res = await safeFetch(url, { next: { revalidate: 300 } });
  if (!res) return [];
  if (!res.ok) { console.warn(`[strapi] fetchStandards failed: ${res.status} ${res.statusText}`); return []; }
  const json: { data: Array<{ id: number; title: string; issuer: string; description: string | null; image: { url: string } | null; imageAlt: string | null; url: string | null }> } = await res!.json();
  return (json.data ?? []).map((item) => ({
    id: item.id,
    title: item.title,
    issuer: item.issuer,
    description: item.description,
    image: item.image?.url ? resolveMediaUrl(item.image.url) : "",
    imageAlt: item.imageAlt,
    url: item.url,
  }));
}

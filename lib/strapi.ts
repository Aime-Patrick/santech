/**
 * Strapi API client for santech-f.
 *
 * Strapi 5 returns FLAT objects — no more { data: { attributes: {} } } wrapper.
 * Response shape: { data: [ { id, documentId, title, slug, coverImage: { url, ... } } ] }
 */

import type { TechPulseCategory } from "./tech-pulse-data";
import { drivingChangeSections, type DrivingChangeMenuKey, type DrivingChangeSection } from "./driving-change-data";

// ─── Environment ─────────────────────────────────────────────────────────────

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL?.replace(/\/$/, "") ?? "http://localhost:1337";
const IS_LOCAL_STRAPI = /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i.test(STRAPI_URL);
const SKIP_UNAVAILABLE_LOCAL_STRAPI =
  process.env.NODE_ENV === "production" && IS_LOCAL_STRAPI && process.env.STRAPI_ALLOW_LOCAL_FETCH !== "true";
const LOG_STRAPI_FAILURES =
  process.env.STRAPI_LOG_FAILURES === "true" || !IS_LOCAL_STRAPI;

const STRAPI_TIMEOUT_MS = Number(process.env.STRAPI_TIMEOUT_MS || 3000);

// ─── Safe fetch helper ───────────────────────────────────────────────────────
// Wraps every Strapi call so a network error (ECONNREFUSED, timeout, etc.)
// never crashes the Next.js build or hangs the page — it returns null
// so the page can immediately render with hardcoded fallback data.

async function safeFetch(url: string, init?: RequestInit): Promise<Response | null> {
  if (SKIP_UNAVAILABLE_LOCAL_STRAPI) return null;

  try {
    const signal = init?.signal ?? AbortSignal.timeout(STRAPI_TIMEOUT_MS);
    return await fetch(url, { ...init, signal });
  } catch {
    if (LOG_STRAPI_FAILURES) {
      console.warn(`[strapi] fetch failed (Strapi unreachable or timed out): ${url}`);
    }
    return null;
  }
}

function reportStrapiResponseFailure(operation: string, response: Response | null) {
  if (LOG_STRAPI_FAILURES && response && !response.ok) {
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
  categoryLabel: string | null;
  relatedSlugs: unknown;
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
  relatedSlugs: string[];
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

function normaliseRelatedSlugs(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((slug): slug is string => typeof slug === "string" && slug.trim().length > 0);
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
    categoryLabel: item.categoryLabel?.trim() || capitalize(item.category),
    relatedSlugs: normaliseRelatedSlugs(item.relatedSlugs),
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

export type SanHubCourseDetails = {
  subtitle: string | null;
  instructor: string | null;
  stats: Array<{ label: string; value: string; detail: string }> | null;
  learningOutcomes: string[] | null;
  skills: string[] | null;
  tools: string[] | null;
  details: Array<{ title: string; detail: string; icon: "certificate" | "language" | "schedule" | "access" }> | null;
  courseSeries: Array<{ title: string; description: string; duration: string }> | null;
  courseTestimonials: Array<{ initials: string; name: string; quote: string }> | null;
  rating: number | null;
  reviewCount: string | null;
};

type StrapiCourseListItem = { value?: string | null } | string;
type StrapiCourseRelation = { name?: string | null } | string;

function normalizeCourseList(items: StrapiCourseListItem[] | null | undefined): string[] | null {
  if (!items) return null;
  return items.map((item) => typeof item === "string" ? item : item.value ?? "").filter(Boolean);
}

function normalizeCourseRelations(items: StrapiCourseRelation[] | null | undefined): string[] | null {
  if (!items) return null;
  return items.map((item) => typeof item === "string" ? item : item.name ?? "").filter(Boolean);
}

export type SanHubCatalogItem = {
  id: number;
  documentId: string;
  slug: string;
  category: string;
  courseCategory: { name: string; slug: string } | null;
  title: string;
  provider: string | null;
  description: string;
  image: string;
  format: string | null;
  duration: string | null;
  level: string | null;
  badge: string | null;
  courseDetails: SanHubCourseDetails | null;
};

export async function fetchSanHubCatalogItems(
  category?: string,
  options: { fresh?: boolean } = {}
): Promise<SanHubCatalogItem[]> {
  const params = new URLSearchParams();
  params.set("sort[0]", "sortOrder:asc");
  params.set("populate[image][fields][0]", "url");
  params.set("populate[courseCategory]", "true");
  params.set("populate[stats]", "true");
  params.set("populate[learningOutcomes]", "true");
  params.set("populate[skills]", "true");
  params.set("populate[tools]", "true");
  params.set("populate[details]", "true");
  params.set("populate[courseSeries]", "true");
  params.set("populate[courseTestimonials]", "true");
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
      documentId: string;
      slug: string;
      category: string;
      courseCategory: { name: string; slug: string } | null;
      title: string;
      provider: string | null;
      description: string;
      image: { url: string } | null;
      format: string | null;
      duration: string | null;
      level: string | null;
      badge: string | null;
      subtitle: string | null;
      instructor: string | null;
      stats: SanHubCourseDetails["stats"];
      learningOutcomes: StrapiCourseListItem[] | null;
      skills: StrapiCourseRelation[] | null;
      tools: StrapiCourseRelation[] | null;
      details: SanHubCourseDetails["details"];
      courseSeries: SanHubCourseDetails["courseSeries"];
      courseTestimonials: SanHubCourseDetails["courseTestimonials"];
      rating: number | null;
      reviewCount: string | null;
    }>;
  } = await res!.json();

  return (json.data ?? []).map((item) => ({
    id: item.id,
    documentId: item.documentId,
    slug: item.slug,
    category: item.category,
    courseCategory: item.courseCategory,
    title: item.title,
    provider: item.provider,
    description: item.description,
    image: item.image?.url ? resolveMediaUrl(item.image.url) : "",
    format: item.format,
    duration: item.duration,
    level: item.level,
    badge: item.badge,
    courseDetails: item.category === "Courses"
      ? {
          subtitle: item.subtitle,
          instructor: item.instructor,
          stats: item.stats,
          learningOutcomes: normalizeCourseList(item.learningOutcomes),
          skills: normalizeCourseRelations(item.skills),
          tools: normalizeCourseRelations(item.tools),
          details: item.details,
          courseSeries: item.courseSeries,
          courseTestimonials: item.courseTestimonials,
          rating: item.rating,
          reviewCount: item.reviewCount,
        }
      : null,
  }));
}

// ─── Driving Change topics ───────────────────────────────────────────────────

export type DrivingChangeTopic = {
  id: number;
  topicId: string;
  sectionKey: DrivingChangeMenuKey;
  label: string;
  subtitle: string;
  sortOrder: number;
};

export async function fetchDrivingChangeTopics(): Promise<DrivingChangeTopic[]> {
  const url = `${STRAPI_URL}/api/driving-change-topics?sort[0]=sectionKey:asc&sort[1]=sortOrder:asc&pagination[pageSize]=50`;
  const res = await safeFetch(url, { next: { revalidate: 300 } });
  if (!res || !res.ok) {
    reportStrapiResponseFailure("fetchDrivingChangeTopics", res);
    return [];
  }

  const json: { data: Array<{ id: number; topicId: string; sectionKey: DrivingChangeMenuKey; label: string; subtitle: string; sortOrder: number }> } = await res.json();
  return json.data ?? [];
}

export function mapDrivingChangeTopicsToSections(topics: DrivingChangeTopic[]): DrivingChangeSection[] {
  return (["impact", "career"] as const).map((sectionKey) => ({
    key: sectionKey,
    label: sectionKey === "impact" ? "IMPACT IN ACTION" : "CAREER OUTREACH",
    categories: (() => {
      const cmsCategories = topics
      .filter((topic) => topic.sectionKey === sectionKey)
      .sort((a, b) => a.sortOrder - b.sortOrder)
      .map((topic, index) => ({
        id: topic.topicId,
        num: String(index + 1).padStart(2, "0"),
        label: topic.label,
        subtitle: topic.subtitle,
      }));
      return cmsCategories.length
        ? cmsCategories
        : drivingChangeSections.find((section) => section.key === sectionKey)?.categories ?? [];
    })(),
  }));
}

// ─── Tech Pulse Opportunities ────────────────────────────────────────────────

export type SanHubBook = {
  id: number;
  bookId: string;
  title: string;
  description: string;
  category: string;
  coverImage: string;
  readerUrl: string | null;
  coverTitle: string | null;
  coverSubtitle: string | null;
  accent: string | null;
  coverInk: string | null;
  pageLabel: string | null;
};

export async function fetchSanHubBooks(): Promise<SanHubBook[]> {
  const url = `${STRAPI_URL}/api/san-hub-books?sort[0]=sortOrder:asc&populate[category]=*&populate[coverImage][fields][0]=url&populate[file][fields][0]=url&pagination[pageSize]=100`;
  const res = await safeFetch(url, { next: { revalidate: 300 } });
  if (!res || !res.ok) {
    reportStrapiResponseFailure("fetchSanHubBooks", res);
    return [];
  }

  const json: {
    data: Array<{
      id: number;
      bookId: string;
      title: string;
      description: string;
      category: { name: string } | null;
      coverImage: { url: string } | null;
      file: { url: string } | null;
      readerUrl: string | null;
      coverTitle: string | null;
      coverSubtitle: string | null;
      accent: string | null;
      coverInk: string | null;
      pageLabel: string | null;
    }>;
  } = await res.json();

  return (json.data ?? []).map((item) => ({
    id: item.id,
    bookId: item.bookId,
    title: item.title,
    description: item.description,
    category: item.category?.name ?? "SAN HUB collection",
    coverImage: item.coverImage?.url ? resolveMediaUrl(item.coverImage.url) : "",
    readerUrl: item.readerUrl || (item.file?.url ? resolveMediaUrl(item.file.url) : null),
    coverTitle: item.coverTitle,
    coverSubtitle: item.coverSubtitle,
    accent: item.accent,
    coverInk: item.coverInk,
    pageLabel: item.pageLabel,
  }));
}

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

export type LegacyContent = {
  whoWeAreBody: string | null;
  whoWeAreSecondaryBody: string | null;
  identityFacts: Array<{ label: string; value: string }>;
  missionTitle: string | null;
  missionTagline: string | null;
  missionDescription: string | null;
  visionTitle: string | null;
  visionTagline: string | null;
  visionDescription: string | null;
  profileTitle: string | null;
  profileDescription: string | null;
  profileFacts: Array<{ label: string; value: string }>;
  impactStats: Array<{ value: string; label: string; description: string }>;
};

export async function fetchLegacyContent(): Promise<LegacyContent | null> {
  const url = `${STRAPI_URL}/api/legacy-page`;
  const res = await safeFetch(url, { next: { revalidate: 300 } });
  if (!res || !res.ok) {
    if (res) reportStrapiResponseFailure("fetchLegacyContent", res);
    return null;
  }

  const json: { data: Record<string, unknown> | null } = await res.json();
  const item = json.data;
  if (!item) return null;

  const records = (value: unknown): Array<{ label: string; value: string }> =>
    Array.isArray(value)
      ? value.filter((entry): entry is { label: string; value: string } => Boolean(entry && typeof entry === "object" && "label" in entry && "value" in entry && typeof entry.label === "string" && typeof entry.value === "string"))
      : [];
  const stats = (value: unknown): Array<{ value: string; label: string; description: string }> =>
    Array.isArray(value)
      ? value.filter((entry): entry is { value: string; label: string; description: string } => Boolean(entry && typeof entry === "object" && "value" in entry && "label" in entry && "description" in entry && typeof entry.value === "string" && typeof entry.label === "string" && typeof entry.description === "string"))
      : [];

  return {
    whoWeAreBody: typeof item.whoWeAreBody === "string" ? item.whoWeAreBody : null,
    whoWeAreSecondaryBody: typeof item.whoWeAreSecondaryBody === "string" ? item.whoWeAreSecondaryBody : null,
    identityFacts: records(item.identityFacts),
    missionTitle: typeof item.missionTitle === "string" ? item.missionTitle : null,
    missionTagline: typeof item.missionTagline === "string" ? item.missionTagline : null,
    missionDescription: typeof item.missionDescription === "string" ? item.missionDescription : null,
    visionTitle: typeof item.visionTitle === "string" ? item.visionTitle : null,
    visionTagline: typeof item.visionTagline === "string" ? item.visionTagline : null,
    visionDescription: typeof item.visionDescription === "string" ? item.visionDescription : null,
    profileTitle: typeof item.profileTitle === "string" ? item.profileTitle : null,
    profileDescription: typeof item.profileDescription === "string" ? item.profileDescription : null,
    profileFacts: records(item.profileFacts),
    impactStats: stats(item.impactStats),
  };
}

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
  if (!res.ok) { reportStrapiResponseFailure("fetchRecognitions", res); return []; }

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
  if (!res.ok) { reportStrapiResponseFailure("fetchTeamMembers", res); return []; }

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
  context: "e-visitors" | "san-hub" | "general" | "course" | null;
  courseId: string | null;
  dateLabel: string | null;
  sourceLabel: string | null;
};

export async function fetchTestimonials(context?: Testimonial["context"], courseId?: string): Promise<Testimonial[]> {
  const params = new URLSearchParams("sort[0]=sortOrder:asc&populate[avatar][fields][0]=url&pagination[pageSize]=50");
  if (context) params.set("filters[context][$eq]", context);
  if (courseId) params.set("filters[courseId][$eq]", courseId);
  const url = `${STRAPI_URL}/api/testimonials?${params.toString()}`;
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
      context: Testimonial["context"];
      courseId: string | null;
      dateLabel: string | null;
      sourceLabel: string | null;
    }>;
  } = await res!.json();

  return (json.data ?? []).map((item) => ({
    id: item.id,
    name: item.name,
    role: item.role,
    quote: item.quote,
    rating: item.rating,
    avatar: item.avatar?.url ? resolveMediaUrl(item.avatar.url) : "",
    context: item.context ?? null,
    courseId: item.courseId ?? null,
    dateLabel: item.dateLabel ?? null,
    sourceLabel: item.sourceLabel ?? null,
  }));
}

// ─── Connect Page — Contact Info (Single Type) ───────────────────────────────

export type TraineeAward = {
  id: number;
  name: string;
  year: string;
  title: string;
  description: string;
  image: string;
  category: string | null;
  featured: boolean;
};

export async function fetchTraineeAwards(): Promise<TraineeAward[]> {
  const url = `${STRAPI_URL}/api/trainee-awards?sort[0]=sortOrder:asc&populate[image][fields][0]=url&pagination[pageSize]=50`;
  const res = await safeFetch(url, { next: { revalidate: 300 } });
  if (!res || !res.ok) {
    reportStrapiResponseFailure("fetchTraineeAwards", res);
    return [];
  }

  const json: {
    data: Array<{
      id: number;
      name: string;
      year: string;
      title: string;
      description: string;
      image: { url: string } | null;
      category: string | null;
      featured: boolean;
    }>;
  } = await res.json();

  return (json.data ?? []).map((item) => ({
    id: item.id,
    name: item.name,
    year: item.year,
    title: item.title,
    description: item.description,
    image: item.image?.url ? resolveMediaUrl(item.image.url) : "",
    category: item.category,
    featured: item.featured,
  }));
}

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

// ─── Global Site Settings (Single Type) ──────────────────────────────────────

export type SiteSocialLink = {
  id?: number;
  label: string;
  platform: "facebook" | "instagram" | "linkedin" | "x" | "youtube" | "whatsapp" | "other";
  url: string;
  iconName: string | null;
  sortOrder: number;
};

export type SiteSeo = {
  title: string | null;
  description: string | null;
  keywords: string | null;
  canonicalUrl: string | null;
  shareImage: string | null;
  noIndex: boolean;
};

export type SiteSettings = {
  siteName: string;
  siteTitle: string;
  siteDescription: string | null;
  defaultLanguage: "en" | "rw";
  supportedLanguages: string[];
  calendlyUrl: string | null;
  logo: string | null;
  favicon: string | null;
  homepageVideo: string | null;
  homepageVideoPoster: string | null;
  eVisitorsVideoPoster: string | null;
  companyProfilePdf: string | null;
  socialLinks: SiteSocialLink[];
  seo: SiteSeo | null;
};

type SiteSettingsResponse = {
  data: {
    siteName?: string;
    siteTitle?: string;
    siteDescription?: string | null;
    defaultLanguage?: "en" | "rw";
    supportedLanguages?: string[] | null;
    calendlyUrl?: string | null;
    logo?: StrapiMedia | null;
    favicon?: StrapiMedia | null;
    homepageVideo?: StrapiMedia | null;
    homepageVideoPoster?: StrapiMedia | null;
    eVisitorsVideoPoster?: StrapiMedia | null;
    companyProfilePdf?: StrapiMedia | null;
    socialLinks?: SiteSocialLink[] | null;
    seo?: {
      title?: string | null;
      description?: string | null;
      keywords?: string | null;
      canonicalUrl?: string | null;
      shareImage?: StrapiMedia | null;
      noIndex?: boolean;
    } | null;
  } | null;
};

export async function fetchSiteSettings(): Promise<SiteSettings | null> {
  const params = new URLSearchParams();
  params.set("populate[logo][fields][0]", "url");
  params.set("populate[favicon][fields][0]", "url");
  params.set("populate[homepageVideo][fields][0]", "url");
  params.set("populate[homepageVideoPoster][fields][0]", "url");
  params.set("populate[eVisitorsVideoPoster][fields][0]", "url");
  params.set("populate[companyProfilePdf][fields][0]", "url");
  params.set("populate[seo][populate][shareImage][fields][0]", "url");
  params.set("populate[socialLinks]", "*");

  const url = `${STRAPI_URL}/api/site-setting?${params.toString()}`;
  const res = await safeFetch(url, { next: { revalidate: 3600 } });
  if (!res || !res.ok) {
    reportStrapiResponseFailure("fetchSiteSettings", res);
    return null;
  }

  const json: SiteSettingsResponse = await res.json();
  const item = json.data;
  if (!item) return null;

  return {
    siteName: item.siteName ?? "SAN TECH",
    siteTitle: item.siteTitle ?? "SAN TECH | Technology. Innovation. Impact.",
    siteDescription: item.siteDescription ?? null,
    defaultLanguage: item.defaultLanguage ?? "en",
    supportedLanguages: Array.isArray(item.supportedLanguages) && item.supportedLanguages.length
      ? item.supportedLanguages
      : ["en", "rw"],
    calendlyUrl: item.calendlyUrl ?? null,
    logo: item.logo?.url ? resolveMediaUrl(item.logo.url) : null,
    favicon: item.favicon?.url ? resolveMediaUrl(item.favicon.url) : null,
    homepageVideo: item.homepageVideo?.url ? resolveMediaUrl(item.homepageVideo.url) : null,
    homepageVideoPoster: item.homepageVideoPoster?.url ? resolveMediaUrl(item.homepageVideoPoster.url) : null,
    eVisitorsVideoPoster: item.eVisitorsVideoPoster?.url ? resolveMediaUrl(item.eVisitorsVideoPoster.url) : null,
    companyProfilePdf: item.companyProfilePdf?.url ? resolveMediaUrl(item.companyProfilePdf.url) : null,
    socialLinks: (item.socialLinks ?? []).slice().sort((a, b) => a.sortOrder - b.sortOrder),
    seo: item.seo
      ? {
          title: item.seo.title ?? null,
          description: item.seo.description ?? null,
          keywords: item.seo.keywords ?? null,
          canonicalUrl: item.seo.canonicalUrl ?? null,
          shareImage: item.seo.shareImage?.url ? resolveMediaUrl(item.seo.shareImage.url) : null,
          noIndex: item.seo.noIndex ?? false,
        }
      : null,
  };
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
  if (!res.ok) { reportStrapiResponseFailure("fetchJourneyStages", res); return []; }
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
  if (!res.ok) { reportStrapiResponseFailure("fetchCompanyValues", res); return []; }
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
  if (!res.ok) { reportStrapiResponseFailure("fetchFocusAreas", res); return []; }
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
  modules: Array<{ module: string; functions: string }>;
  mediaKind: "image" | "video";
  mediaImage: string;
  mediaImages: string[];
  mediaAlt: string;
  detailImage: string;
  detailImages: string[];
};

export async function fetchInnovationProducts(): Promise<InnovationProduct[]> {
  const params = new URLSearchParams();
  params.set("sort[0]", "sortOrder:asc");
  params.set("populate[mediaImage][fields][0]", "url");
  params.set("populate[mediaImages][fields][0]", "url");
  params.set("populate[detailImage][fields][0]", "url");
  params.set("populate[detailImages][fields][0]", "url");
  params.set("pagination[pageSize]", "20");
  const url = `${STRAPI_URL}/api/innovation-products?${params.toString()}`;
  const res = await safeFetch(url, { next: { revalidate: 300 } });
  if (!res) return [];
  if (!res.ok) { reportStrapiResponseFailure("fetchInnovationProducts", res); return []; }
  const json: {
    data: Array<{
      id: number;
      productId: string;
      label: string;
      title: string;
      description: string | null;
      coreFeatures: Array<{ label: string; description: string; iconName: string }> | null;
      modules: Array<{ module: string; functions: string }> | null;
      mediaKind: "image" | "video";
      mediaImage: { url: string } | null;
      mediaImages: Array<{ url: string }> | null;
      mediaAlt: string | null;
      detailImage: { url: string } | null;
      detailImages: Array<{ url: string }> | null;
    }>;
  } = await res!.json();
  return (json.data ?? []).map((item) => ({
    id: item.id,
    productId: item.productId,
    label: item.label,
    title: item.title,
    description: item.description ?? "",
    coreFeatures: item.coreFeatures ?? [],
    modules: item.modules ?? [],
    mediaKind: item.mediaKind ?? "image",
    mediaImage: item.mediaImage?.url ? resolveMediaUrl(item.mediaImage.url) : "",
    mediaImages: (item.mediaImages ?? []).map((img) => resolveMediaUrl(img.url)),
    mediaAlt: item.mediaAlt ?? item.label,
    detailImage: item.detailImage?.url ? resolveMediaUrl(item.detailImage.url) : "",
    detailImages: (item.detailImages ?? []).map((img) => resolveMediaUrl(img.url)),
  }));
}

// ─── Innovation Services ──────────────────────────────────────────────────────

export type InnovationService = {
  id: number;
  serviceId: string;
  label: string;
  description: string;
  iconName: string;
  coreFeatures: Array<{ label: string; description: string; iconName?: string }>;
  mediaKind: "image" | "video";
  mediaImage: string;
  mediaImages: string[];
  mediaAlt: string;
};

export async function fetchInnovationServices(): Promise<InnovationService[]> {
  const params = new URLSearchParams();
  params.set("sort[0]", "sortOrder:asc");
  params.set("populate[mediaImage][fields][0]", "url");
  params.set("populate[mediaImages][fields][0]", "url");
  params.set("pagination[pageSize]", "20");
  const url = `${STRAPI_URL}/api/innovation-services?${params.toString()}`;
  const res = await safeFetch(url, { next: { revalidate: 300 } });
  if (!res || !res.ok) { reportStrapiResponseFailure("fetchInnovationServices", res); return []; }
  const json: { data: Array<{
    id: number;
    serviceId: string;
    label: string;
    description: string;
    iconName: string;
    coreFeatures: Array<{ label: string; description: string; iconName?: string }> | null;
    mediaKind: "image" | "video";
    mediaImage: { url: string } | null;
    mediaImages: Array<{ url: string }> | null;
    mediaAlt: string | null;
  }> } = await res!.json();
  return (json.data ?? []).map((item) => ({
    ...item,
    iconName: item.iconName ?? "Code2",
    coreFeatures: item.coreFeatures ?? [],
    mediaKind: item.mediaKind ?? "image",
    mediaImage: item.mediaImage?.url ? resolveMediaUrl(item.mediaImage.url) : "",
    mediaImages: (item.mediaImages ?? []).map((img) => resolveMediaUrl(img.url)),
    mediaAlt: item.mediaAlt ?? item.label,
  }));
}

// ─── Innovation Solutions ─────────────────────────────────────────────────────

export type InnovationSolution = {
  id: number;
  solutionId: string;
  label: string;
  description: string;
  subItems: string[];
  iconName: string;
  coreFeatures: Array<{ label: string; description: string; iconName?: string }>;
  mediaKind: "image" | "video";
  mediaImage: string;
  mediaImages: string[];
  mediaAlt: string;
};

export async function fetchInnovationSolutions(): Promise<InnovationSolution[]> {
  const params = new URLSearchParams();
  params.set("sort[0]", "sortOrder:asc");
  params.set("populate[mediaImage][fields][0]", "url");
  params.set("populate[mediaImages][fields][0]", "url");
  params.set("pagination[pageSize]", "20");
  const url = `${STRAPI_URL}/api/innovation-solutions?${params.toString()}`;
  const res = await safeFetch(url, { next: { revalidate: 300 } });
  if (!res || !res.ok) { reportStrapiResponseFailure("fetchInnovationSolutions", res); return []; }
  const json: { data: Array<{
    id: number;
    solutionId: string;
    label: string;
    description: string;
    subItems: string[] | null;
    iconName: string;
    coreFeatures: Array<{ label: string; description: string; iconName?: string }> | null;
    mediaKind: "image" | "video";
    mediaImage: { url: string } | null;
    mediaImages: Array<{ url: string }> | null;
    mediaAlt: string | null;
  }> } = await res!.json();
  return (json.data ?? []).map((item) => ({
    ...item,
    subItems: item.subItems ?? [],
    iconName: item.iconName ?? "Globe2",
    coreFeatures: item.coreFeatures ?? [],
    mediaKind: item.mediaKind ?? "image",
    mediaImage: item.mediaImage?.url ? resolveMediaUrl(item.mediaImage.url) : "",
    mediaImages: (item.mediaImages ?? []).map((img) => resolveMediaUrl(img.url)),
    mediaAlt: item.mediaAlt ?? item.label,
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
  if (!res.ok) { reportStrapiResponseFailure("fetchStandards", res); return []; }
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

export type SanHubCourseCategory = {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  sortOrder: number;
};

export async function fetchSanHubCourseCategories(): Promise<SanHubCourseCategory[]> {
  const params = new URLSearchParams();
  params.set("sort[0]", "sortOrder:asc");
  params.set("filters[isActive][$eq]", "true");
  params.set("pagination[pageSize]", "100");

  const url = `${STRAPI_URL}/api/course-categories?${params.toString()}`;
  const res = await safeFetch(url, { next: { revalidate: 60 } });
  if (!res || !res.ok) {
    reportStrapiResponseFailure("fetchSanHubCourseCategories", res);
    return [];
  }

  const json: {
    data: Array<{
      id: number;
      name: string;
      slug: string;
      description: string | null;
      sortOrder: number;
    }>;
  } = await res.json();

  return (json.data ?? []).map((item) => ({
    id: item.id,
    name: item.name,
    slug: item.slug,
    description: item.description,
    sortOrder: item.sortOrder ?? 0,
  }));
}

/**
 * Blog preview configuration shaped to mirror future Sanity post schema.
 * TODO(client): Replace placeholder titles, excerpts, dates, and images with published SMMIPL articles.
 */

export interface BlogPostPreview {
  _id: string;
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  alt: string;
  blurDataURL: string;
  publishedAt: string; // ISO date YYYY-MM-DD
  readingMinutes: number;
  category: string;
}

// Flat neutral-gray 1x1 PNG blur placeholder (replaces Sanity LQIP until real images arrive)
const NEUTRAL_BLUR_DATA_URL =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==";

export const BLOG_SECTION_HEADER = {
  eyebrow: "JOURNAL",
  heading: "Latest Blogs & News",
  ctaLabel: "All articles",
  ctaHref: "/blog",
} as const;

// TODO(client): Replace with real Sanity CMS articles
export const BLOG_POSTS: BlogPostPreview[] = [
  {
    _id: "blog-01",
    slug: "extending-hpdc-die-life-with-thermal-management",
    title:
      "Extending HPDC Die Life Through Conformal Cooling & Thermal Balance",
    excerpt:
      "How disciplined cooling channel layout reduces thermal fatigue, shortens cycle times, and protects critical parting lines across long aluminium casting runs.",
    image: "/blog/post-1.svg",
    alt: "High-pressure die casting mould thermal inspection placeholder",
    blurDataURL: NEUTRAL_BLUR_DATA_URL,
    publishedAt: "2026-01-06",
    readingMinutes: 4,
    category: "Die Engineering",
  },
  {
    _id: "blog-02",
    slug: "dfm-checklist-multi-cavity-automotive-moulds",
    title:
      "DFM Checklist for Multi-Cavity Automotive Injection Moulds",
    excerpt:
      "Key gate-balancing, draft angle, and steel selection decisions tool engineers review before cutting hardened cavity inserts.",
    image: "/blog/post-2.svg",
    alt: "Multi-cavity automotive plastic injection mould placeholder",
    blurDataURL: NEUTRAL_BLUR_DATA_URL,
    publishedAt: "2025-12-14",
    readingMinutes: 5,
    category: "Injection Moulding",
  },
  {
    _id: "blog-03",
    slug: "selecting-checking-and-trimming-fixtures-for-sheet-metal",
    title:
      "Precision Checking & Trimming Fixtures for Tandem Sheet Metal Lines",
    excerpt:
      "Why repeatable datum locators and hardened wear pads keep high-volume automotive stampings within assembly tolerance.",
    image: "/blog/post-3.svg",
    alt: "Sheet metal checking and trimming fixture placeholder",
    blurDataURL: NEUTRAL_BLUR_DATA_URL,
    publishedAt: "2025-11-22",
    readingMinutes: 3,
    category: "Fixtures & Gauges",
  },
];

export function getRecentBlogPosts(limit = 3): BlogPostPreview[] {
  return [...BLOG_POSTS]
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )
    .slice(0, limit);
}

const MONTHS_SHORT = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const;

export function formatBlogDate(isoDate: string): string {
  const parts = isoDate.split("-");
  if (parts.length !== 3) return isoDate;
  const year = parts[0];
  const monthIdx = Number(parts[1]) - 1;
  const day = parts[2].padStart(2, "0");
  const month = MONTHS_SHORT[monthIdx] ?? parts[1];
  return `${day} ${month} ${year}`;
}

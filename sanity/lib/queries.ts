import { defineQuery } from "next-sanity";
import type { SanityImageSource } from "@sanity/image-url";
import { HERO_SLIDES, type HeroSlide } from "@/lib/hero-slides";
import { PRODUCT_CATEGORIES, type ProductCategory } from "@/lib/products";
import { HOME_STATS, type StatItem } from "@/lib/stats";
import { CLIENT_ROW_ONE, CLIENT_ROW_TWO, type ClientItem } from "@/lib/clients";
import { getRecentBlogPosts, type BlogPostPreview } from "@/lib/blog-preview";
import { siteConfig, type FooterSocial } from "@/lib/site-config";
import { client } from "./client";
import { urlFor } from "./image";

export interface LeadershipMember {
  id: string;
  name: string;
  role: string;
  image: string;
  alt: string;
  blurDataURL?: string;
  isPrimary?: boolean;
}

export interface IndustryItem {
  id: string;
  name: string;
  image: string;
  alt: string;
  blurDataURL?: string;
  tag: string;
  specs: string;
  tolerance: string;
  description: string;
  href: string;
}

export interface SiteLayoutData {
  phonePrimary: string;
  phoneSecondary: string;
  email: string;
  address: string;
  mapsUrl: string;
  socialLinks: FooterSocial[];
}

export interface HomePageData {
  heroSlides: HeroSlide[];
  leaders: LeadershipMember[];
  industries: IndustryItem[];
  products: ProductCategory[];
  stats: StatItem[];
  clientRows: {
    rowOne: ClientItem[];
    rowTwo: ClientItem[];
  };
  posts: BlogPostPreview[];
}

export const DEFAULT_LEADERS: LeadershipMember[] = [
  {
    id: "arvind-rana",
    name: "Mr. Arvind Rana",
    role: "MD",
    image: "/about/arvind-rana.svg",
    alt: "Mr. Arvind Rana, MD - Shri Maruti Moulds India Private Limited",
    isPrimary: true,
  },
  {
    id: "anuj-kumar",
    name: "Mr. Anuj Kumar",
    role: "GM - Business Development",
    image: "/about/anuj-kumar.svg",
    alt: "Mr. Anuj Kumar, GM - Business Development - Shri Maruti Moulds India Private Limited",
    isPrimary: false,
  },
];

export const DEFAULT_INDUSTRIES: IndustryItem[] = [
  {
    id: "automotive",
    name: "Automotive",
    image: "/industries/automotive.svg",
    alt: "High-precision automotive injection moulding and HPDC dies",
    tag: "TIER-1 OEM SUPPLIER",
    specs: "HPDC Dies, Tandem Tools, Checking Fixtures",
    tolerance: "±0.010 mm",
    description:
      "Robust high-tonnage tooling for powertrain, structural chassis, and exterior trim components.",
    href: "/products/casting-dies",
  },
  {
    id: "home-appliances",
    name: "Home Appliances",
    image: "/industries/home-appliances.svg",
    alt: "Aesthetic Class-A surface finish injection moulds for appliances",
    tag: "CONSUMER DURABLES",
    specs: "Plastic Moulds, High-Gloss Bezels, Snap-Fits",
    tolerance: "SPI A1 Finish",
    description:
      "Flawless cosmetic surfaces (Ra < 0.05 µm) for refrigeration, laundry, and climate control systems.",
    href: "/products/plastic-moulds",
  },
  {
    id: "medical",
    name: "Medical",
    image: "/industries/medical.svg",
    alt: "Cleanroom micro-tolerance multi-cavity moulds for medical devices",
    tag: "HEALTHCARE & CLEANROOM",
    specs: "Micro-Fluidic Manifolds, Multi-Cavity Tools",
    tolerance: "±0.002 mm",
    description:
      "Micron-level repeatable cavities for diagnostic consumables, surgical devices, and fluidic housings.",
    href: "/products/plastic-moulds",
  },
];

const NEUTRAL_BLUR_DATA_URL =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==";

type SanityImageField = SanityImageSource & {
  alt?: string;
  asset?: {
    _id: string;
    mimeType?: string;
    metadata?: {
      lqip?: string;
      dimensions?: {
        width: number;
        height: number;
      };
    };
  };
};

interface RawSiteSettings {
  phonePrimary?: string;
  phoneSecondary?: string;
  email?: string;
  address?: string;
  socials?: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    x?: string;
  };
  stats?: Array<{
    _key: string;
    value: number;
    suffix?: string;
    label: string;
  }>;
  leaders?: Array<{
    _key: string;
    name: string;
    role: string;
    isPrimary?: boolean;
    image: SanityImageField;
  }>;
}

interface RawHomeQueryResult {
  siteSettings?: RawSiteSettings | null;
  heroSlides?: Array<{
    _id: string;
    productName: string;
    image: SanityImageField;
  }>;
  industries?: Array<{
    _id: string;
    name: string;
    tag: string;
    specs: string;
    tolerance: string;
    description: string;
    href?: string;
    image: SanityImageField;
  }>;
  products?: Array<{
    _id: string;
    title: string;
    slug?: { current?: string };
    description: string;
    image: SanityImageField;
  }>;
  clients?: Array<{
    _id: string;
    name: string;
    logo?: SanityImageField;
  }>;
  posts?: Array<{
    _id: string;
    title: string;
    slug?: { current?: string };
    category: string;
    publishedAt: string;
    readingMinutes?: number;
    excerpt: string;
    mainImage: SanityImageField;
  }>;
}

export const SITE_SETTINGS_QUERY = defineQuery(`
  *[_type == "siteSettings" && _id == "siteSettings"][0] {
    phonePrimary,
    phoneSecondary,
    email,
    address,
    socials
  }
`);

export const HOME_PAGE_QUERY = defineQuery(`{
  "siteSettings": *[_type == "siteSettings" && _id == "siteSettings"][0] {
    stats[] {
      _key,
      value,
      suffix,
      label
    },
    leaders[] {
      _key,
      name,
      role,
      isPrimary,
      image {
        asset->{ _id, metadata { lqip } },
        alt,
        hotspot,
        crop
      }
    }
  },
  "heroSlides": *[_type == "heroSlide" && defined(image.asset)] | order(coalesce(order, 999) asc, _createdAt asc) {
    _id,
    productName,
    image {
      asset->{ _id, metadata { lqip } },
      alt,
      hotspot,
      crop
    }
  },
  "industries": *[_type == "industry" && defined(image.asset)] | order(coalesce(order, 999) asc, _createdAt asc) {
    _id,
    name,
    tag,
    specs,
    tolerance,
    description,
    href,
    image {
      asset->{ _id, metadata { lqip } },
      alt,
      hotspot,
      crop
    }
  },
  "products": *[_type == "product" && defined(image.asset)] | order(coalesce(order, 999) asc, _createdAt asc) {
    _id,
    title,
    slug,
    description,
    image {
      asset->{ _id, metadata { lqip } },
      alt,
      hotspot,
      crop
    }
  },
  "clients": *[_type == "client"] | order(coalesce(order, 999) asc, _createdAt asc) {
    _id,
    name,
    logo {
      asset->{
        _id,
        mimeType,
        metadata { dimensions { width, height } }
      },
      alt
    }
  },
  "posts": *[_type == "post" && defined(mainImage.asset)] | order(publishedAt desc) [0...3] {
    _id,
    title,
    slug,
    category,
    publishedAt,
    readingMinutes,
    excerpt,
    mainImage {
      asset->{ _id, metadata { lqip } },
      alt,
      hotspot,
      crop
    }
  }
}`);

function mapSocialLinks(socials?: RawSiteSettings["socials"]): FooterSocial[] {
  if (!socials) return siteConfig.socialLinks;
  const entries: Array<{ key: keyof NonNullable<RawSiteSettings["socials"]>; name: string; icon: FooterSocial["icon"] }> = [
    { key: "facebook", name: "Facebook", icon: "Facebook" },
    { key: "instagram", name: "Instagram", icon: "Instagram" },
    { key: "linkedin", name: "LinkedIn", icon: "LinkedIn" },
    { key: "x", name: "X", icon: "X" },
  ];

  const mapped = entries
    .map((entry) => {
      const fallback = siteConfig.socialLinks.find((s) => s.icon === entry.icon);
      const href = socials[entry.key] || fallback?.href;
      if (!href) return null;
      return { name: entry.name, href, icon: entry.icon };
    })
    .filter((item): item is FooterSocial => item !== null);

  return mapped.length > 0 ? mapped : siteConfig.socialLinks;
}

export async function getSiteLayoutSettings(): Promise<SiteLayoutData> {
  try {
    const data = await client
      .withConfig({ useCdn: false })
      .fetch<RawSiteSettings | null>(
        SITE_SETTINGS_QUERY,
        {},
        { next: { revalidate: 30, tags: ["siteSettings"] } }
      );

    const address = data?.address || siteConfig.contact.address;
    return {
      phonePrimary: data?.phonePrimary || siteConfig.contact.phonePrimary,
      phoneSecondary: data?.phoneSecondary || siteConfig.contact.phoneSecondary,
      email: data?.email || siteConfig.contact.email,
      address,
      mapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`,
      socialLinks: mapSocialLinks(data?.socials),
    };
  } catch (error) {
    console.error("Failed to fetch siteSettings from Sanity, using fallback:", error);
    return {
      phonePrimary: siteConfig.contact.phonePrimary,
      phoneSecondary: siteConfig.contact.phoneSecondary,
      email: siteConfig.contact.email,
      address: siteConfig.contact.address,
      mapsUrl: siteConfig.contact.mapsUrl,
      socialLinks: siteConfig.socialLinks,
    };
  }
}

function splitClientsIntoRows(clients: ClientItem[]): {
  rowOne: ClientItem[];
  rowTwo: ClientItem[];
} {
  if (clients.length < 4) {
    return { rowOne: clients, rowTwo: [] };
  }
  const midpoint = Math.ceil(clients.length / 2);
  return {
    rowOne: clients.slice(0, midpoint),
    rowTwo: clients.slice(midpoint),
  };
}

export async function getHomePageData(): Promise<HomePageData> {
  try {
    const data = await client
      .withConfig({ useCdn: false })
      .fetch<RawHomeQueryResult>(
        HOME_PAGE_QUERY,
        {},
        { next: { revalidate: 30, tags: ["home"] } }
      );

    const heroSlides: HeroSlide[] =
      data.heroSlides && data.heroSlides.length > 0
        ? data.heroSlides.map((doc) => ({
            id: doc._id,
            productName: doc.productName,
            image: urlFor(doc.image)
              .width(1920)
              .height(1080)
              .fit("crop")
              .auto("format")
              .quality(85)
              .url(),
            alt: doc.image?.alt || doc.productName,
            blurDataURL: doc.image?.asset?.metadata?.lqip,
            ctaHref: "/contact",
            secondaryCtaHref: "/products",
          }))
        : HERO_SLIDES;

    const validLeaders = (data.siteSettings?.leaders ?? []).filter(
      (item) => item?.image?.asset
    );
    const leaders: LeadershipMember[] =
      validLeaders.length > 0
        ? validLeaders.map((item) => ({
            id: item._key,
            name: item.name,
            role: item.role,
            image: urlFor(item.image)
              .width(720)
              .height(900)
              .fit("crop")
              .auto("format")
              .quality(85)
              .url(),
            alt: item.image?.alt || `${item.name}, ${item.role}`,
            blurDataURL: item.image?.asset?.metadata?.lqip,
            isPrimary: Boolean(item.isPrimary),
          }))
        : DEFAULT_LEADERS;

    const industries: IndustryItem[] =
      data.industries && data.industries.length > 0
        ? data.industries.map((doc) => ({
            id: doc._id,
            name: doc.name,
            image: urlFor(doc.image)
              .width(1400)
              .height(1050)
              .fit("crop")
              .auto("format")
              .quality(85)
              .url(),
            alt: doc.image?.alt || doc.name,
            blurDataURL: doc.image?.asset?.metadata?.lqip,
            tag: doc.tag,
            specs: doc.specs,
            tolerance: doc.tolerance,
            description: doc.description,
            href: doc.href || "/products",
          }))
        : DEFAULT_INDUSTRIES;

    const products: ProductCategory[] =
      data.products && data.products.length > 0
        ? data.products.map((doc, idx) => ({
            _id: doc._id,
            number: String(idx + 1).padStart(2, "0"),
            title: doc.title,
            slug: doc.slug?.current || `product-${idx + 1}`,
            description: doc.description,
            image: {
              url: urlFor(doc.image)
                .width(960)
                .height(1200)
                .fit("crop")
                .auto("format")
                .quality(85)
                .url(),
              alt: doc.image?.alt || doc.title,
              blurDataURL: doc.image?.asset?.metadata?.lqip,
            },
          }))
        : PRODUCT_CATEGORIES;

    const validStats = (data.siteSettings?.stats ?? []).filter(
      (item) => typeof item?.value === "number" && Boolean(item?.label)
    );
    const stats: StatItem[] =
      validStats.length > 0
        ? validStats.map((item) => ({
            _id: item._key,
            value: item.value,
            suffix: item.suffix ?? "+",
            label: item.label,
          }))
        : HOME_STATS;

    const clientRows =
      data.clients && data.clients.length > 0
        ? splitClientsIntoRows(
            data.clients.map((doc) => {
              const hasLogo = Boolean(doc.logo?.asset);
              const isSvg = doc.logo?.asset?.mimeType === "image/svg+xml";
              const dims = doc.logo?.asset?.metadata?.dimensions;
              const aspectRatio =
                dims && dims.height > 0 ? dims.width / dims.height : 3;

              return {
                _id: doc._id,
                name: doc.name,
                isPlaceholder: !hasLogo,
                logo:
                  hasLogo && doc.logo
                    ? {
                        url: isSvg
                          ? urlFor(doc.logo).url()
                          : urlFor(doc.logo)
                              .height(120)
                              .fit("max")
                              .auto("format")
                              .quality(90)
                              .url(),
                        alt: doc.logo.alt || doc.name,
                        width: Math.round(40 * aspectRatio),
                        height: 40,
                      }
                    : undefined,
              };
            })
          )
        : { rowOne: CLIENT_ROW_ONE, rowTwo: CLIENT_ROW_TWO };

    const posts: BlogPostPreview[] =
      data.posts && data.posts.length > 0
        ? data.posts.map((doc, idx) => ({
            _id: doc._id,
            slug: doc.slug?.current || `post-${idx + 1}`,
            title: doc.title,
            excerpt: doc.excerpt,
            image: urlFor(doc.mainImage)
              .width(1200)
              .height(900)
              .fit("crop")
              .auto("format")
              .quality(85)
              .url(),
            alt: doc.mainImage?.alt || doc.title,
            blurDataURL:
              doc.mainImage?.asset?.metadata?.lqip || NEUTRAL_BLUR_DATA_URL,
            publishedAt: doc.publishedAt,
            readingMinutes: doc.readingMinutes || 4,
            category: doc.category,
          }))
        : getRecentBlogPosts(3);

    return {
      heroSlides,
      leaders,
      industries,
      products,
      stats,
      clientRows,
      posts,
    };
  } catch (error) {
    console.error("Failed to fetch homepage data from Sanity, using fallbacks:", error);
    return {
      heroSlides: HERO_SLIDES,
      leaders: DEFAULT_LEADERS,
      industries: DEFAULT_INDUSTRIES,
      products: PRODUCT_CATEGORIES,
      stats: HOME_STATS,
      clientRows: { rowOne: CLIENT_ROW_ONE, rowTwo: CLIENT_ROW_TWO },
      posts: getRecentBlogPosts(3),
    };
  }
}

export interface NavChildItem {
  label: string;
  href: string;
  icon?:
    | "OurStory"
    | "MissionVision"
    | "PlasticMoulds"
    | "CastingDies"
    | "CastingSpares"
    | "SheetMetalTool"
    | "ChromePlating";
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavChildItem[];
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterSocial {
  name: string;
  href: string;
  icon: "Facebook" | "Instagram" | "LinkedIn" | "X";
}

export const siteConfig = {
  name: "SMMIPL",
  legalName: "SHRI MARUTI MOULDS PRIVATE LIMITED",
  tagline: "Molding Excellence, Shaping Futures",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://smmipl.com",

  cta: {
    headline: "Have a project in mind?",
    subheadline:
      "Partner with our tooling engineers for high-precision plastic moulds, casting dies, and micron-tolerance manufacturing.",
    buttonText: "Get a Quote",
    buttonHref: "/contact",
  },

  aboutParagraph:
    "To be the world renowned player in the global arena through its world class manufacturing systems, high precision quality work performance, and employee centric work environment that delights its customers, vendors contribute to the overall growth of stakeholders and society.",

  contact: {
    email: "info@marutiindia.co.in",
    phonePrimary: "+91-9266125704",
    phoneSecondary: "+91-9012535955",
    address:
      "Plot No. 154K, Sector 7, IMT Manesar, Gurugram, Haryana - 122 052",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Plot+No.+154K,+Sector+7,+IMT+Manesar,+Gurugram,+Haryana+-+122+052",
  },

  socialLinks: [
    {
      name: "Facebook",
      href: "https://facebook.com/smmipl",
      icon: "Facebook",
    },
    {
      name: "Instagram",
      href: "https://instagram.com/smmipl",
      icon: "Instagram",
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com/company/smmipl",
      icon: "LinkedIn",
    },
    {
      name: "X",
      href: "https://x.com/smmipl",
      icon: "X",
    },
  ] as FooterSocial[],

  footerNavigation: {
    information: [
      { label: "Home", href: "/" },
      { label: "Our Story", href: "/about/our-story" },
      { label: "Blogs", href: "/blog" },
      { label: "Careers", href: "/careers" },
      { label: "Contact Us", href: "/contact" },
    ] as FooterLink[],

    products: [
      { label: "Plastic Moulds", href: "/products/plastic-moulds" },
      { label: "Casting Dies", href: "/products/casting-dies" },
      { label: "Casting Spares", href: "/products/casting-spares" },
      { label: "Sheet Metal Tool", href: "/products/sheet-metal-tool" },
      { label: "Chrome Plating", href: "/products/chrome-plating" },
      { label: "Infrastructure", href: "/infrastructure" },
      { label: "Our Clients", href: "/clients" },
    ] as FooterLink[],
  },

  // Legacy compatibility for components using siteConfig.phone / siteConfig.email
  phone: "+91-9266125704",
  email: "info@marutiindia.co.in",
  address: "Plot No. 154K, Sector 7, IMT Manesar, Gurugram, Haryana - 122 052",

  navLinks: [
    { label: "Home", href: "/" },
    {
      label: "About Us",
      href: "/about",
      children: [
        { label: "Our Story", href: "/about/our-story", icon: "OurStory" },
        { label: "Our Mission & Vision", href: "/about/mission-vision", icon: "MissionVision" },
      ],
    },
    {
      label: "Products",
      href: "/products",
      children: [
        { label: "Plastic Moulds", href: "/products/plastic-moulds", icon: "PlasticMoulds" },
        { label: "Casting Dies", href: "/products/casting-dies", icon: "CastingDies" },
        { label: "Casting Spares", href: "/products/casting-spares", icon: "CastingSpares" },
        { label: "Sheet Metal Tool", href: "/products/sheet-metal-tool", icon: "SheetMetalTool" },
        { label: "Chrome Plating", href: "/products/chrome-plating", icon: "ChromePlating" },
      ],
    },
    { label: "Infrastructure", href: "/infrastructure" },
    { label: "Our Clients", href: "/clients" },
    { label: "Blog", href: "/blog" },
    { label: "Careers", href: "/careers" },
    { label: "Contact Us", href: "/contact" },
  ] as NavItem[],
};

export type SiteConfig = typeof siteConfig;

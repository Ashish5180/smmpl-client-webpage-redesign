export const siteConfig = {
  name: "SMMIPL",
  tagline: "Molding Excellence, Shaping Futures",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://smmipl.com",
  navLinks: [
    { label: "About", href: "/about" },
    { label: "Products", href: "/products" },
    { label: "Quality", href: "/quality" },
    { label: "Contact", href: "/contact" },
  ],
  phone: "",
  email: "",
  address: "",
  contact: {
    phone: "",
    email: "",
    address: "",
  },
};

export type SiteConfig = typeof siteConfig;

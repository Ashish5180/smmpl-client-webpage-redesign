import type { Metadata } from "next";
import React from "react";
import { QuoteBuilder } from "@/components/quote/QuoteBuilder";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: `Get a Quote & Contact Us | ${siteConfig.name}`,
  description:
    "Request a quote from SMMIPL for plastic injection moulds, casting dies, sheet metal tools, and precision tooling spares.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: `Get a Quote & Contact Us | ${siteConfig.name}`,
    description:
      "Share your tooling scope, timeline, and CAD drawings with SMMIPL engineers.",
    url: "/contact",
  },
};

export default function ContactPage() {
  return (
    <div className="pt-20 sm:pt-24">
      <QuoteBuilder asHeadingOne />
    </div>
  );
}

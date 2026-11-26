import React from "react";
import { Hero } from "@/components/home/Hero";
import { AboutSection } from "@/components/home/AboutSection";
import { IndustriesSection } from "@/components/home/IndustriesSection";
import { ProductsSection } from "@/components/home/ProductsSection";
import { TrustedSection } from "@/components/home/TrustedSection";
import { QuoteBuilder } from "@/components/quote/QuoteBuilder";
import { BlogSection } from "@/components/home/BlogSection";
import { getHomePageData } from "@/sanity/lib/queries";

export default async function HomePage() {
  const {
    heroSlides,
    leaders,
    industries,
    products,
    stats,
    clientRows,
    posts,
  } = await getHomePageData();

  return (
    <div>
      {/* 1. Hero Section */}
      <Hero slides={heroSlides} />

      {/* 2. About SMMIPL Section */}
      <AboutSection leaders={leaders} />

      {/* 3. Industries We Served Section */}
      <IndustriesSection industries={industries} />

      {/* 4. Our Products Section */}
      <ProductsSection products={products} />

      {/* 5. Trusted By (Stats + Clients) Section */}
      <TrustedSection stats={stats} clientRows={clientRows} />

      {/* 6. Get A Quote Section */}
      <QuoteBuilder />

      {/* 7. Latest Blogs & News Section */}
      <BlogSection posts={posts} />
    </div>
  );
}

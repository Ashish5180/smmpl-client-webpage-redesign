import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import {
  PRODUCTS_HEADER,
  PRODUCT_CATEGORIES,
  type ProductCategory,
} from "@/lib/products";
import { ProductsShowcase } from "./ProductsShowcase";
import { ProductsAccordion } from "./ProductsAccordion";

interface ProductsSectionProps {
  products?: ProductCategory[];
}

export function ProductsSection({ products }: ProductsSectionProps) {
  const activeProducts =
    products && products.length > 0 ? products : PRODUCT_CATEGORIES;
  return (
    <section
      id="our-products"
      aria-labelledby="our-products-heading"
      className="py-16 md:py-24 bg-paper text-ink border-t border-line"
    >
      <Container>
        {/* Header: Left Eyebrow + H2 + One-line subtext, Right All Products link */}
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-14">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2.5 mb-3">
                <span className="w-5 h-[2px] bg-brand inline-block" />
                <span className="text-xs font-semibold tracking-wider uppercase text-neutral-600 font-body">
                  {PRODUCTS_HEADER.eyebrow}
                </span>
              </div>

              <h2
                id="our-products-heading"
                className="font-heading font-bold text-ink text-[clamp(1.85rem,3.6vw,2.85rem)] leading-[1.12] tracking-[-0.015em] text-balance"
              >
                {PRODUCTS_HEADER.heading}
              </h2>

              <p className="text-neutral-600 text-base leading-[1.6] font-body mt-3">
                {PRODUCTS_HEADER.subtext}
              </p>
            </div>

            <Link
              href={PRODUCTS_HEADER.ctaHref}
              className="group inline-flex items-center gap-2 text-sm font-semibold text-ink hover:text-brand-action transition-colors self-start md:self-end min-h-[44px] focus-visible:outline-2 focus-visible:outline-brand-action focus-visible:outline-offset-2 rounded-sm"
            >
              <span>{PRODUCTS_HEADER.ctaLabel}</span>
              <ArrowRight
                className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </div>
        </Reveal>

        {/* Desktop (>=1024px) 55/45 Interactive Index & Sticky Preview */}
        <ProductsShowcase products={activeProducts} />

        {/* Tablet & Mobile (<1024px) Accordion */}
        <ProductsAccordion products={activeProducts} />
      </Container>
    </section>
  );
}

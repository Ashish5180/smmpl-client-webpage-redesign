"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { ChevronDown, ArrowRight } from "lucide-react";
import type { ProductCategory } from "@/lib/products";

interface ProductsAccordionProps {
  products: ProductCategory[];
}

export function ProductsAccordion({ products }: ProductsAccordionProps) {
  const [openSlug, setOpenSlug] = useState<string | null>(
    products[0]?.slug ?? null
  );
  const prefersReduced = useReducedMotion();

  const toggleItem = (slug: string) => {
    setOpenSlug((prev) => (prev === slug ? null : slug));
  };

  return (
    <ul className="lg:hidden border-t border-line divide-y divide-line">
      {products.map((product, index) => {
        const isOpen = openSlug === product.slug;
        const panelId = `product-accordion-panel-${product.slug}`;

        return (
          <motion.li
            key={product._id}
            initial={{ opacity: 0, y: prefersReduced ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: prefersReduced ? 0.15 : 0.45,
              ease: "easeOut",
              delay: prefersReduced ? 0 : index * 0.06,
            }}
          >
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => toggleItem(product.slug)}
              className="w-full min-h-[56px] py-4 flex items-center justify-between gap-4 text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-brand-action focus-visible:outline-offset-[-2px]"
            >
              <div className="flex items-baseline gap-4">
                <span
                  className={`font-mono text-xs tabular-nums transition-colors duration-200 ${
                    isOpen ? "text-brand font-medium" : "text-gray-400"
                  }`}
                >
                  {product.number}
                </span>
                <span
                  className={`font-heading font-semibold text-2xl sm:text-3xl tracking-tight transition-colors duration-200 ${
                    isOpen ? "text-ink" : "text-gray-400"
                  }`}
                >
                  {product.title}
                </span>
              </div>

              <ChevronDown
                className={`w-5 h-5 shrink-0 transition-transform duration-200 ${
                  isOpen ? "rotate-180 text-brand" : "text-gray-400"
                }`}
                aria-hidden="true"
              />
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  initial={
                    prefersReduced
                      ? { opacity: 0 }
                      : { height: 0, opacity: 0 }
                  }
                  animate={{ height: "auto", opacity: 1 }}
                  exit={
                    prefersReduced
                      ? { opacity: 0 }
                      : { height: 0, opacity: 0 }
                  }
                  transition={{
                    duration: prefersReduced ? 0.15 : 0.3,
                    ease: "easeOut",
                  }}
                  className="overflow-hidden"
                >
                  <div className="pb-6 pt-1 space-y-4">
                    <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-neutral-100">
                      <Image
                        src={product.image.url}
                        alt={product.image.alt}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover"
                        unoptimized={product.image.url.endsWith(".svg")}
                        placeholder={product.image.blurDataURL ? "blur" : "empty"}
                        blurDataURL={product.image.blurDataURL}
                      />
                    </div>

                    <p className="text-neutral-600 text-sm sm:text-base leading-relaxed max-w-[60ch]">
                      {product.description}
                    </p>

                    <Link
                      href={`/products/${product.slug}`}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-ink hover:text-brand-action transition-colors min-h-[44px] focus-visible:outline-2 focus-visible:outline-brand-action focus-visible:outline-offset-2 rounded-sm"
                    >
                      <span>View product</span>
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.li>
        );
      })}
    </ul>
  );
}

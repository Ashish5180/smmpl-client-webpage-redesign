"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import type { ProductCategory } from "@/lib/products";

interface ProductsShowcaseProps {
  products: ProductCategory[];
}

export function ProductsShowcase({ products }: ProductsShowcaseProps) {
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const prefersReduced = useReducedMotion();
  const hoverTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rowRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  const clearPendingTimer = useCallback(() => {
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => clearPendingTimer();
  }, [clearPendingTimer]);

  const scheduleActivate = useCallback(
    (index: number) => {
      clearPendingTimer();
      hoverTimerRef.current = setTimeout(() => {
        setActiveIdx(index);
      }, 80);
    },
    [clearPendingTimer]
  );

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLAnchorElement>,
    index: number
  ) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      clearPendingTimer();
      const next = (index + 1) % products.length;
      setActiveIdx(next);
      rowRefs.current[next]?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      clearPendingTimer();
      const prev = (index - 1 + products.length) % products.length;
      setActiveIdx(prev);
      rowRefs.current[prev]?.focus();
    }
  };

  const activeProduct = products[activeIdx] ?? products[0];

  return (
    <div className="hidden lg:grid lg:grid-cols-[55fr_45fr] lg:gap-12 xl:gap-16 items-start">
      {/* Left: 6-Row Vertical Product Index */}
      <ul className="border-t border-line">
        {products.map((product, index) => {
          const isActive = index === activeIdx;

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
              className="relative border-b border-line"
            >
              <Link
                ref={(el) => {
                  rowRefs.current[index] = el;
                }}
                href={`/products/${product.slug}`}
                aria-current={isActive ? "true" : undefined}
                onMouseEnter={() => scheduleActivate(index)}
                onMouseLeave={clearPendingTimer}
                onFocus={() => scheduleActivate(index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="group flex items-center justify-between gap-6 py-6 xl:py-7 cursor-pointer focus-visible:outline-2 focus-visible:outline-brand-action focus-visible:outline-offset-2"
              >
                <div className="flex items-baseline gap-6 xl:gap-8">
                  <span
                    className={`font-mono text-xs tabular-nums transition-colors duration-200 ${
                      isActive ? "text-brand font-medium" : "text-gray-400"
                    }`}
                  >
                    {product.number}
                  </span>
                  <span
                    className={`font-heading font-semibold text-[clamp(1.75rem,2.8vw,2.75rem)] leading-[1.1] tracking-[-0.015em] transition-colors duration-200 ${
                      isActive ? "text-ink" : "text-gray-400"
                    }`}
                  >
                    {product.title}
                  </span>
                </div>

                <ArrowRight
                  className={`w-6 h-6 shrink-0 transition-[transform,color] duration-300 ease-out ${
                    isActive
                      ? "text-brand -rotate-45"
                      : "text-gray-400 rotate-0"
                  }`}
                  aria-hidden="true"
                />
              </Link>

              {/* 2px red line growing under the active row */}
              <span
                aria-hidden="true"
                className={`pointer-events-none absolute bottom-0 left-0 right-0 h-[2px] bg-brand origin-left transition-transform duration-300 ease-out ${
                  isActive ? "scale-x-100" : "scale-x-0"
                }`}
              />
            </motion.li>
          );
        })}
      </ul>

      {/* Right: Sticky Flat Preview Panel (never remounted) */}
      <div className="sticky top-24" aria-live="polite">
        <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden bg-neutral-100">
          {/* Tiny flat chip at top-left */}
          <span className="absolute top-4 left-4 z-10 inline-flex items-center px-3 py-1 rounded-full bg-paper border border-line font-mono text-xs text-ink tabular-nums">
            {activeProduct.number}
          </span>

          <AnimatePresence initial={false}>
            <motion.div
              key={activeProduct._id}
              initial={
                prefersReduced
                  ? { opacity: 0 }
                  : { opacity: 0, scale: 1.04 }
              }
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: prefersReduced ? 0.15 : 0.5,
                ease: "easeOut",
              }}
              className="absolute inset-0"
            >
              <Image
                src={activeProduct.image.url}
                alt={activeProduct.image.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
                unoptimized
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Description + View product link */}
        <div className="mt-6 min-h-[5.5rem]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activeProduct._id}
              initial={
                prefersReduced ? { opacity: 0 } : { opacity: 0, y: 12 }
              }
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: prefersReduced ? 0.12 : 0.25,
                ease: "easeOut",
              }}
            >
              <p className="text-neutral-600 text-base leading-relaxed line-clamp-2 max-w-[54ch]">
                {activeProduct.description}
              </p>

              <Link
                href={`/products/${activeProduct.slug}`}
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-ink hover:text-brand-action transition-colors focus-visible:outline-2 focus-visible:outline-brand-action focus-visible:outline-offset-2 rounded-sm"
              >
                <span>View product</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

"use client";

import React from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  Layers,
  Cpu,
  Wrench,
  Ruler,
  Package,
  CircleDot,
  HelpCircle,
} from "lucide-react";
import { QUOTE_PRODUCTS, type ProductIconKey } from "@/lib/quote-config";

const ICON_MAP: Record<
  ProductIconKey,
  React.ComponentType<{ className?: string }>
> = {
  Layers,
  Cpu,
  Wrench,
  Ruler,
  Package,
  CircleDot,
  HelpCircle,
};

interface QuoteStepProductProps {
  selectedProduct: string;
  error?: string;
  onSelect: (productId: string) => void;
  firstFieldRef: React.RefObject<HTMLButtonElement | null>;
}

export function QuoteStepProduct({
  selectedProduct,
  error,
  onSelect,
  firstFieldRef,
}: QuoteStepProductProps) {
  const prefersReduced = useReducedMotion();

  return (
    <div>
      <p className="text-sm font-medium text-ink mb-4">
        Select the tooling solution you need{" "}
        <span className="text-brand">*</span>
      </p>

      <div
        role="radiogroup"
        aria-label="Product category"
        className="grid grid-cols-1 sm:grid-cols-2 gap-3"
      >
        {QUOTE_PRODUCTS.map((item, idx) => {
          const Icon = ICON_MAP[item.icon];
          const isSelected = selectedProduct === item.id;
          const isOther = item.id === "Not sure / Other";
          const code = String(idx + 1).padStart(2, "0");

          return (
            <motion.button
              key={item.id}
              ref={idx === 0 ? firstFieldRef : undefined}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => onSelect(item.id)}
              initial={
                prefersReduced
                  ? { opacity: 0 }
                  : { opacity: 0, y: 14, clipPath: "inset(0 0 100% 0)" }
              }
              animate={{ opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" }}
              transition={{
                duration: prefersReduced ? 0.12 : 0.35,
                ease: [0.16, 1, 0.3, 1],
                delay: prefersReduced ? 0 : idx * 0.04,
              }}
              whileTap={prefersReduced ? undefined : { scale: 0.985 }}
              className={`relative min-h-[72px] p-4 rounded-xl border text-left flex items-center justify-between gap-3 transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-brand-action focus-visible:outline-offset-2 ${
                isOther ? "sm:col-span-2" : ""
              } ${
                isSelected
                  ? "border-transparent bg-paper text-ink"
                  : "border-gray-200 bg-paper text-ink hover:border-gray-400"
              }`}
            >
              {/* Sliding shared active border highlight */}
              {isSelected && (
                <motion.span
                  layoutId="quote-product-active-ring"
                  transition={
                    prefersReduced
                      ? { duration: 0.1 }
                      : { type: "spring", stiffness: 420, damping: 32 }
                  }
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 rounded-xl border-2 border-brand bg-brand/[0.02]"
                />
              )}

              <div className="relative z-10 flex items-center gap-3.5">
                <span
                  className={`font-mono text-[11px] tabular-nums transition-colors ${
                    isSelected ? "text-brand font-semibold" : "text-gray-400"
                  }`}
                >
                  {code}
                </span>
                <Icon
                  className={`w-5 h-5 shrink-0 transition-colors ${
                    isSelected ? "text-brand" : "text-muted"
                  }`}
                />
                <span className="font-heading font-semibold text-base sm:text-lg tracking-tight">
                  {item.label}
                </span>
              </div>

              {/* Drawn red check mark */}
              <span
                aria-hidden="true"
                className={`relative z-10 w-5 h-5 rounded-full flex items-center justify-center shrink-0 border transition-colors ${
                  isSelected
                    ? "border-brand bg-brand/5"
                    : "border-gray-300 bg-transparent"
                }`}
              >
                {isSelected && (
                  <svg
                    viewBox="0 0 16 16"
                    className="w-3.5 h-3.5 text-brand"
                    fill="none"
                  >
                    <motion.path
                      d="M3.5 8.5L6.5 11.5L12.5 4.5"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ pathLength: prefersReduced ? 1 : 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{
                        duration: 0.22,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    />
                  </svg>
                )}
              </span>
            </motion.button>
          );
        })}
      </div>

      {error && (
        <p role="alert" className="mt-3 text-sm text-brand font-medium">
          {error}
        </p>
      )}
    </div>
  );
}

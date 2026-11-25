"use client";

import React, { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Copy, Check } from "lucide-react";
import { QUOTE_SUCCESS_CONFIG } from "@/lib/quote-config";

interface QuoteSuccessProps {
  reference: string;
}

export function QuoteSuccess({ reference }: QuoteSuccessProps) {
  const [copied, setCopied] = useState(false);
  const prefersReduced = useReducedMotion();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(reference);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: prefersReduced ? 0.15 : 0.35, ease: "easeOut" }}
      className="py-4"
    >
      {/* Two-Stage SVG Circle + Checkmark Draw */}
      <div className="w-14 h-14 flex items-center justify-center mb-6">
        <svg viewBox="0 0 48 48" className="w-14 h-14 text-brand" fill="none">
          <motion.circle
            cx="24"
            cy="24"
            r="21"
            stroke="currentColor"
            strokeWidth="2"
            initial={{ pathLength: prefersReduced ? 1 : 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
          />
          <motion.path
            d="M15 24.5L21 30.5L33 17.5"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: prefersReduced ? 1 : 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 0.28,
              ease: [0.16, 1, 0.3, 1],
              delay: prefersReduced ? 0 : 0.25,
            }}
          />
        </svg>
      </div>

      <motion.div
        initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.35,
          ease: [0.16, 1, 0.3, 1],
          delay: prefersReduced ? 0 : 0.12,
        }}
      >
        <h3 className="font-heading font-bold text-ink text-2xl sm:text-3xl tracking-tight">
          {QUOTE_SUCCESS_CONFIG.heading}
        </h3>
        <p className="text-neutral-600 text-sm sm:text-base mt-2 max-w-[56ch]">
          {QUOTE_SUCCESS_CONFIG.summary}
        </p>

        {/* Reference Copy Row */}
        <div className="mt-6 inline-flex items-center gap-3 px-4 py-2.5 rounded-xl border border-gray-200 bg-neutral-50">
          <span className="font-mono text-xs text-muted uppercase">REF</span>
          <span className="font-mono text-sm font-semibold text-ink tabular-nums">
            {reference}
          </span>
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 min-h-[36px] px-2.5 rounded-lg border border-gray-200 bg-paper text-xs font-medium text-ink hover:border-gray-400 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-brand-action"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-brand" aria-hidden="true" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-muted" aria-hidden="true" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </motion.div>

      {/* Animated Vertical 3-Step Timeline */}
      <div className="mt-10 pt-8 border-t border-gray-200">
        <p className="font-mono text-xs font-semibold uppercase tracking-wider text-muted mb-5">
          {QUOTE_SUCCESS_CONFIG.timelineHeading}
        </p>

        <div className="relative ml-2 pl-6">
          <motion.span
            aria-hidden="true"
            initial={prefersReduced ? { scaleY: 1 } : { scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{
              duration: 0.45,
              ease: [0.16, 1, 0.3, 1],
              delay: prefersReduced ? 0 : 0.2,
            }}
            className="absolute left-0 top-2 bottom-2 w-px bg-gray-200 origin-top"
          />

          <ol className="space-y-6">
            {QUOTE_SUCCESS_CONFIG.timelineSteps.map((step, index) => (
              <motion.li
                key={step.id}
                initial={
                  prefersReduced ? { opacity: 0 } : { opacity: 0, x: -12 }
                }
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.3,
                  ease: [0.16, 1, 0.3, 1],
                  delay: prefersReduced ? 0 : 0.25 + index * 0.08,
                }}
                className="relative"
              >
                <span
                  aria-hidden="true"
                  className={`absolute -left-[29px] top-1.5 w-2.5 h-2.5 rounded-full border-2 border-paper ${
                    index === 0 ? "bg-brand" : "bg-gray-300"
                  }`}
                />
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="font-heading font-semibold text-base text-ink">
                    {step.title}
                  </p>
                  <span className="font-mono text-xs text-muted">
                    {step.timeframe}
                  </span>
                </div>
                <p className="text-sm text-neutral-600 mt-1">
                  {step.description}
                </p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </motion.div>
  );
}

"use client";

import React from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import {
  QUOTE_INDUSTRIES,
  QUOTE_QUANTITIES,
  QUOTE_TIMELINES,
  type QuoteOption,
} from "@/lib/quote-config";

interface QuoteStepProjectProps {
  industry: string;
  industryOther: string;
  quantity: string;
  timeline: string;
  onSelectIndustry: (val: string) => void;
  onChangeIndustryOther: (val: string) => void;
  onSelectQuantity: (val: string) => void;
  onSelectTimeline: (val: string) => void;
  firstFieldRef: React.RefObject<HTMLButtonElement | null>;
}

function AnimatedChipGroup({
  groupId,
  label,
  options,
  value,
  onChange,
  firstRef,
}: {
  groupId: string;
  label: string;
  options: QuoteOption[];
  value: string;
  onChange: (val: string) => void;
  firstRef?: React.RefObject<HTMLButtonElement | null>;
}) {
  const prefersReduced = useReducedMotion();

  return (
    <div>
      <p className="text-sm font-medium text-ink mb-3">{label}</p>
      <div
        role="radiogroup"
        aria-label={label}
        className="flex flex-wrap gap-2.5"
      >
        {options.map((option, idx) => {
          const isSelected = value === option.id;
          return (
            <motion.button
              key={option.id}
              ref={idx === 0 ? firstRef : undefined}
              type="button"
              role="radio"
              aria-checked={isSelected}
              whileTap={prefersReduced ? undefined : { scale: 0.96 }}
              onClick={() => onChange(isSelected ? "" : option.id)}
              className={`relative min-h-[44px] px-4 py-2 rounded-full border text-sm font-medium transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-brand-action focus-visible:outline-offset-2 ${
                isSelected
                  ? "border-transparent text-ink"
                  : "border-gray-200 bg-paper text-neutral-600 hover:border-gray-400 hover:text-ink"
              }`}
            >
              {isSelected && (
                <motion.span
                  layoutId={`quote-chip-${groupId}`}
                  transition={
                    prefersReduced
                      ? { duration: 0.1 }
                      : { type: "spring", stiffness: 460, damping: 32 }
                  }
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 rounded-full border border-brand bg-brand/[0.05]"
                />
              )}
              <span className="relative z-10">{option.label}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

export function QuoteStepProject({
  industry,
  industryOther,
  quantity,
  timeline,
  onSelectIndustry,
  onChangeIndustryOther,
  onSelectQuantity,
  onSelectTimeline,
  firstFieldRef,
}: QuoteStepProjectProps) {
  const prefersReduced = useReducedMotion();

  return (
    <div className="space-y-7">
      <div>
        <AnimatedChipGroup
          groupId="industry"
          label="Industry (Optional)"
          options={QUOTE_INDUSTRIES}
          value={industry}
          onChange={onSelectIndustry}
          firstRef={firstFieldRef}
        />

        <AnimatePresence initial={false}>
          {industry === "Other" && (
            <motion.div
              initial={
                prefersReduced
                  ? { opacity: 0 }
                  : { opacity: 0, height: 0, y: -6 }
              }
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={
                prefersReduced
                  ? { opacity: 0 }
                  : { opacity: 0, height: 0, y: -6 }
              }
              transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="pt-3">
                <label
                  htmlFor="quote-industry-other"
                  className="block text-xs font-medium text-muted mb-1.5"
                >
                  Specify your industry
                </label>
                <input
                  id="quote-industry-other"
                  type="text"
                  value={industryOther}
                  onChange={(e) => onChangeIndustryOther(e.target.value)}
                  placeholder="e.g., Medical devices, Packaging, Aerospace"
                  maxLength={120}
                  className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl border border-gray-200 bg-paper text-sm text-ink placeholder:text-gray-400 focus:border-brand-action focus-visible:outline-2 focus-visible:outline-brand-action"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatedChipGroup
        groupId="quantity"
        label="Estimated production volume (Optional)"
        options={QUOTE_QUANTITIES}
        value={quantity}
        onChange={onSelectQuantity}
      />

      <AnimatedChipGroup
        groupId="timeline"
        label="Target timeline (Optional)"
        options={QUOTE_TIMELINES}
        value={timeline}
        onChange={onSelectTimeline}
      />
    </div>
  );
}

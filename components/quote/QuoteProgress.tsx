"use client";

import React from "react";
import { motion, useReducedMotion } from "motion/react";
import { QUOTE_STEPS } from "@/lib/quote-config";

interface QuoteProgressProps {
  currentStep: number;
  maxVisitedStep: number;
  onJumpToStep: (targetStep: number) => void;
}

export function QuoteProgress({
  currentStep,
  maxVisitedStep,
  onJumpToStep,
}: QuoteProgressProps) {
  const prefersReduced = useReducedMotion();
  const activeStepMeta = QUOTE_STEPS[currentStep - 1];
  const progressPercent = (currentStep / QUOTE_STEPS.length) * 100;

  return (
    <div className="mb-8">
      {/* Interactive Stage Index Strip */}
      <div
        role="navigation"
        aria-label="Enquiry steps"
        className="grid grid-cols-4 gap-2 mb-4"
      >
        {QUOTE_STEPS.map((item) => {
          const isCurrent = item.number === currentStep;
          const isCompleted = item.number < currentStep;
          const canJump = item.number <= maxVisitedStep && item.number !== currentStep;

          return (
            <button
              key={item.id}
              type="button"
              disabled={!canJump && !isCurrent}
              onClick={() => {
                if (canJump) onJumpToStep(item.number);
              }}
              aria-current={isCurrent ? "step" : undefined}
              className={`relative pb-2.5 text-left transition-colors focus-visible:outline-2 focus-visible:outline-brand-action focus-visible:outline-offset-2 ${
                canJump ? "cursor-pointer" : "cursor-default"
              }`}
            >
              <span
                className={`block font-mono text-[10px] tabular-nums transition-colors duration-200 ${
                  isCurrent
                    ? "text-brand font-semibold"
                    : isCompleted
                      ? "text-ink font-medium"
                      : "text-gray-400"
                }`}
              >
                0{item.number}
              </span>
              <span
                className={`block font-heading text-xs sm:text-sm tracking-tight mt-0.5 truncate transition-colors duration-200 ${
                  isCurrent
                    ? "text-ink font-bold"
                    : isCompleted
                      ? "text-ink font-medium"
                      : "text-gray-400"
                }`}
              >
                {item.label}
              </span>

              {isCurrent && (
                <motion.span
                  layoutId="quote-step-indicator"
                  transition={
                    prefersReduced
                      ? { duration: 0.1 }
                      : { type: "spring", stiffness: 460, damping: 32 }
                  }
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand"
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Live Step Announcement + 3px Spring Progress Track */}
      <div
        aria-live="polite"
        className="flex items-center justify-between text-xs font-mono text-muted mb-2"
      >
        <span>
          Step {activeStepMeta.number} of {QUOTE_STEPS.length} ·{" "}
          <span className="text-ink font-medium">{activeStepMeta.label}</span>
        </span>
        <span className="tabular-nums">{Math.round(progressPercent)}%</span>
      </div>

      <div className="h-[3px] w-full bg-gray-200 overflow-hidden">
        <motion.div
          className="h-full bg-brand"
          initial={false}
          animate={{ width: `${progressPercent}%` }}
          transition={
            prefersReduced
              ? { duration: 0.1 }
              : { type: "spring", stiffness: 340, damping: 30 }
          }
        />
      </div>
    </div>
  );
}

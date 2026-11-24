"use client";

import React from "react";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import type { HeroSlide } from "@/lib/hero-slides";

interface HeroControlsProps {
  slides: HeroSlide[];
  activeIdx: number;
  progressPercent: number;
  isPaused: boolean;
  onSelectSlide: (index: number) => void;
  onTogglePause: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export function HeroControls({
  slides,
  activeIdx,
  progressPercent,
  isPaused,
  onSelectSlide,
  onTogglePause,
  onPrev,
  onNext,
}: HeroControlsProps) {
  const currentSlide = slides[activeIdx];
  const totalSlides = slides.length;

  return (
    <>
      {/* 1. Progress-line indicators: anchored bottom-center */}
      <div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2"
        role="tablist"
        aria-label="Slide selectors"
      >
        {slides.map((slide, idx) => {
          const isActive = idx === activeIdx;
          const isPassed = idx < activeIdx;

          return (
            <button
              key={slide.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-label={`Go to slide ${idx + 1}: ${slide.productName}`}
              onClick={() => onSelectSlide(idx)}
              className="py-2 cursor-pointer focus:outline-none"
            >
              <div
                className={`h-[2px] rounded-full transition-all duration-300 relative overflow-hidden ${
                  isActive
                    ? "w-8 sm:w-12 bg-black/15"
                    : "w-5 sm:w-8 bg-black/10 hover:bg-black/20"
                }`}
              >
                {/* Active progress fill */}
                {isActive && (
                  <div
                    className="h-full bg-brand rounded-full transition-none"
                    style={{ width: `${progressPercent}%` }}
                  />
                )}
                {/* Completed slides fill */}
                {isPassed && (
                  <div className="h-full w-full bg-black/30 rounded-full" />
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* 2. Slide chip + Navigation buttons: anchored bottom-right, 24px from edges */}
      <div className="absolute bottom-6 right-6 z-20 flex items-center gap-2 sm:gap-2.5">
        {/* Slide chip: product name + "01 / 04" */}
        <div className="bg-white/95 border border-black/10 px-3 sm:px-3.5 py-1.5 rounded-full text-xs font-mono text-ink shadow-sm flex items-center gap-2 select-none">
          <span className="font-medium text-neutral-800 text-[11px] sm:text-xs">
            {currentSlide.productName}
          </span>
          <span className="w-1 h-1 rounded-full bg-brand" />
          <span className="text-neutral-500 tabular-nums text-[11px] sm:text-xs">
            {String(activeIdx + 1).padStart(2, "0")} /{" "}
            {String(totalSlides).padStart(2, "0")}
          </span>
        </div>

        {/* Play/Pause Toggle for WCAG compliance */}
        <button
          type="button"
          onClick={onTogglePause}
          aria-label={isPaused ? "Play slide rotation" : "Pause slide rotation"}
          className="w-8 h-8 rounded-full bg-white hover:bg-neutral-50 border border-black/10 text-ink shadow-sm flex items-center justify-center transition-colors active:scale-95 cursor-pointer focus-visible:outline-2 focus-visible:outline-ink"
        >
          {isPaused ? (
            <Play className="w-3 h-3 text-ink fill-current translate-x-0.5" />
          ) : (
            <Pause className="w-3 h-3 text-ink fill-current" />
          )}
        </button>

        {/* Previous Slide */}
        <button
          type="button"
          onClick={onPrev}
          aria-label="Previous slide"
          className="w-8 h-8 rounded-full bg-white hover:bg-neutral-50 border border-black/10 text-ink shadow-sm flex items-center justify-center transition-colors active:scale-95 cursor-pointer focus-visible:outline-2 focus-visible:outline-ink"
        >
          <ChevronLeft className="w-3.5 h-3.5 text-ink" />
        </button>

        {/* Next Slide */}
        <button
          type="button"
          onClick={onNext}
          aria-label="Next slide"
          className="w-8 h-8 rounded-full bg-white hover:bg-neutral-50 border border-black/10 text-ink shadow-sm flex items-center justify-center transition-colors active:scale-95 cursor-pointer focus-visible:outline-2 focus-visible:outline-ink"
        >
          <ChevronRight className="w-3.5 h-3.5 text-ink" />
        </button>
      </div>
    </>
  );
}

"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import {
  HERO_CONTENT,
  HERO_SLIDES,
  HERO_STATS,
  HERO_AUTOPLAY_DURATION_MS,
  type HeroSlide,
} from "@/lib/hero-slides";
import { HeroControls } from "./HeroControls";
import { HeroStats } from "./HeroStats";

interface HeroProps {
  slides?: HeroSlide[];
}

export function Hero({ slides }: HeroProps) {
  const activeSlides = slides && slides.length > 0 ? slides : HERO_SLIDES;
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isTabHidden, setIsTabHidden] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

  const prefersReduced = useReducedMotion();
  const touchStartXRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const totalSlides = activeSlides.length;
  const safeActiveIdx = activeIdx % totalSlides;

  const nextSlide = useCallback(() => {
    setActiveIdx((prev) => (prev + 1) % totalSlides);
    setProgress(0);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setActiveIdx((prev) => (prev - 1 + totalSlides) % totalSlides);
    setProgress(0);
  }, [totalSlides]);

  const selectSlide = useCallback((index: number) => {
    setActiveIdx(index);
    setProgress(0);
  }, []);

  const togglePause = useCallback(() => {
    setIsPaused((prev) => !prev);
  }, []);

  // Listen for tab visibility
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsTabHidden(document.hidden);
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  // Keyboard navigation: left / right arrows
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        prevSlide();
      } else if (e.key === "ArrowRight") {
        nextSlide();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide]);

  // Autoplay loop using requestAnimationFrame
  useEffect(() => {
    if (prefersReduced) return;

    const isFrozen = isPaused || isHovered || isTabHidden;

    if (isFrozen) {
      lastTimeRef.current = null;
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      return;
    }

    const loop = (timestamp: number) => {
      if (lastTimeRef.current === null) {
        lastTimeRef.current = timestamp;
      }

      const elapsed = timestamp - lastTimeRef.current;
      lastTimeRef.current = timestamp;

      setProgress((prev) => {
        const nextVal = prev + (elapsed / HERO_AUTOPLAY_DURATION_MS) * 100;
        if (nextVal >= 100) {
          nextSlide();
          return 0;
        }
        return nextVal;
      });

      animationFrameRef.current = requestAnimationFrame(loop);
    };

    animationFrameRef.current = requestAnimationFrame(loop);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPaused, isHovered, isTabHidden, prefersReduced, nextSlide]);

  // Touch swipe handling for mobile
  const handleTouchStart = (e: React.TouchEvent<HTMLElement>) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLElement>) => {
    if (touchStartXRef.current === null) return;
    const deltaX = touchStartXRef.current - e.changedTouches[0].clientX;

    if (deltaX > 50) {
      nextSlide();
    } else if (deltaX < -50) {
      prevSlide();
    }
    touchStartXRef.current = null;
  };

  // Mount only active and next slide for optimal performance
  const nextIdx = (safeActiveIdx + 1) % totalSlides;
  const visibleIndices = totalSlides === 1 ? [0] : [safeActiveIdx, nextIdx];

  return (
    <section
      role="region"
      aria-roledescription="carousel"
      aria-label="SMMIPL Precision Engineering Capabilities"
      aria-live={isPaused ? "polite" : "off"}
      className="relative w-full bg-[#f9f9fb] pt-24 sm:pt-28 md:pt-32 pb-10 sm:pb-14"
    >
      {/* Inset Rounded Image Panel */}
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="w-[calc(100%-2rem)] sm:w-[calc(100%-3rem)] lg:w-[calc(100%-4rem)] max-w-[1440px] mx-auto rounded-[28px] overflow-hidden relative shadow-[0_20px_50px_-15px_rgba(0,0,0,0.05)] border border-black/[0.06] bg-[#f0f1f4] h-[min(78svh,760px)] min-h-[540px] flex flex-col justify-between"
      >
        {/* Full-bleed image slider */}
        <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
          {activeSlides.map((slide, idx) => {
            if (!visibleIndices.includes(idx)) return null;
            const isActive = idx === safeActiveIdx;

            return (
              <motion.div
                key={slide.id}
                initial={false}
                animate={{
                  opacity: isActive ? 1 : 0,
                }}
                transition={{
                  opacity: { duration: 0.9, ease: "easeInOut" },
                }}
                className="absolute inset-0 pointer-events-none"
                style={{ zIndex: isActive ? 2 : 1 }}
              >
                <Image
                  src={slide.image}
                  alt={slide.alt}
                  fill
                  sizes="100vw"
                  priority={idx === 0}
                  fetchPriority={idx === 0 ? "high" : "auto"}
                  unoptimized={slide.image.endsWith(".svg")}
                  placeholder={slide.blurDataURL ? "blur" : "empty"}
                  blurDataURL={slide.blurDataURL}
                  className="object-cover object-center w-full h-full"
                />
              </motion.div>
            );
          })}

          {/* Soft multi-stop editorial scrim: lets the photo bleed through on the left while preserving text legibility */}
          <div
            className="absolute inset-0 z-10 pointer-events-none"
            style={{
              background: [
                "linear-gradient(100deg, rgba(255,255,255,0.84) 0%, rgba(255,255,255,0.70) 22%, rgba(255,255,255,0.42) 42%, rgba(255,255,255,0.12) 60%, rgba(255,255,255,0) 76%)",
                "radial-gradient(ellipse 48% 36% at 16% 92%, rgba(255,255,255,0.62) 0%, rgba(255,255,255,0) 100%)",
              ].join(", "),
            }}
          />
        </div>

        {/* Text Block: Left-aligned, vertically centered over the gradient (max-w 560px) */}
        <div className="relative z-20 w-full h-full flex flex-col justify-between p-6 sm:p-10 lg:p-12 pointer-events-none">
          <div className="flex-1 flex flex-col justify-center max-w-[560px] pointer-events-auto">
            {/* Eyebrow: "Precision Manufacturing" with the red line */}
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <span className="w-5 h-[2px] bg-brand inline-block rounded-full" />
              <span className="text-xs font-semibold tracking-wider uppercase text-neutral-700 font-body">
                {HERO_CONTENT.eyebrow}
              </span>
            </div>

            {/* Headline: clamp(2.25rem, 4vw, 3.5rem), weight 600, line-height 1.08, letter-spacing -0.02em */}
            <h1 className="font-heading font-semibold text-ink text-[clamp(2.25rem,4vw,3.5rem)] leading-[1.08] tracking-[-0.02em]">
              {HERO_CONTENT.headlineLine1}
              <span className="text-brand">{HERO_CONTENT.highlightWord}</span>,
              <br className="hidden sm:inline" />
              {" "}{HERO_CONTENT.headlineLine2}
            </h1>

            {/* Subtext: max-width 480px, 1.05rem, gray-700, 2 lines max */}
            <p className="text-neutral-700 text-[1rem] sm:text-[1.05rem] leading-[1.45] mt-3 sm:mt-4 max-w-[480px] font-body">
              {HERO_CONTENT.subtext}
            </p>

            {/* Buttons: "Get a Quote" (filled) and "Explore Products" (outlined), both h-12, rounded-full, 12px gap */}
            <div className="mt-6 sm:mt-7 flex flex-wrap items-center gap-3">
              <Link
                href={HERO_CONTENT.ctaHref}
                className="bg-brand-action hover:bg-brand-dark text-paper font-medium h-12 px-7 rounded-full inline-flex items-center justify-center transition-colors text-sm sm:text-base cursor-pointer focus-visible:outline-2 focus-visible:outline-ink select-none"
              >
                <span>{HERO_CONTENT.ctaLabel}</span>
              </Link>

              <Link
                href={HERO_CONTENT.secondaryCtaHref}
                className="border border-ink/80 hover:border-ink hover:bg-ink hover:text-paper text-ink font-medium h-12 px-7 rounded-full inline-flex items-center justify-center transition-colors text-sm sm:text-base cursor-pointer focus-visible:outline-2 focus-visible:outline-ink select-none"
              >
                <span>{HERO_CONTENT.secondaryCtaLabel}</span>
              </Link>
            </div>
          </div>

          {/* Stats: Anchored to the bottom-left of the panel, 3 items separated by thin dividers */}
          <div className="mt-6 sm:mt-0 sm:absolute sm:bottom-6 sm:left-6 lg:left-8 z-20 pointer-events-auto">
            <HeroStats stats={HERO_STATS} />
          </div>
        </div>

        {/* Controls: Progress indicators bottom-center, Chip & Next/Prev buttons bottom-right */}
        <HeroControls
          slides={activeSlides}
          activeIdx={safeActiveIdx}
          progressPercent={progress}
          isPaused={isPaused}
          onSelectSlide={selectSlide}
          onTogglePause={togglePause}
          onPrev={prevSlide}
          onNext={nextSlide}
        />
      </div>
    </section>
  );
}

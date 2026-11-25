"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "motion/react";
import { ArrowRight } from "lucide-react";
import { formatBlogDate, type BlogPostPreview } from "@/lib/blog-preview";

interface BlogDesktopPanelProps {
  post: BlogPostPreview;
  index: number;
  isActive: boolean;
  isInView: boolean;
  linkRef: (el: HTMLAnchorElement | null) => void;
  onActivateIntent: () => void;
  onCancelIntent: () => void;
  onFocusActivate: () => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLAnchorElement>) => void;
}

export function BlogDesktopPanel({
  post,
  index,
  isActive,
  isInView,
  linkRef,
  onActivateIntent,
  onCancelIntent,
  onFocusActivate,
  onKeyDown,
}: BlogDesktopPanelProps) {
  const prefersReduced = useReducedMotion();
  const [isFinePointer, setIsFinePointer] = useState(false);
  const [isPointerInside, setIsPointerInside] = useState(false);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springX = useSpring(rawX, { stiffness: 300, damping: 30 });
  const springY = useSpring(rawY, { stiffness: 300, damping: 30 });

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    const update = () => setIsFinePointer(mq.matches);
    const timer = setTimeout(update, 0);
    mq.addEventListener("change", update);
    return () => {
      clearTimeout(timer);
      mq.removeEventListener("change", update);
    };
  }, []);

  const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    rawX.set(e.clientX - rect.left - 36);
    rawY.set(e.clientY - rect.top - 36);
    setIsPointerInside(true);
    onActivateIntent();
  };

  const handleMouseLeave = () => {
    setIsPointerInside(false);
    onCancelIntent();
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!isFinePointer || prefersReduced) return;
    const rect = e.currentTarget.getBoundingClientRect();
    rawX.set(e.clientX - rect.left - 36);
    rawY.set(e.clientY - rect.top - 36);
  };

  const numberLabel = String(index + 1).padStart(2, "0");
  const formattedDate = formatBlogDate(post.publishedAt);

  return (
    <motion.div
      initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 24 }}
      animate={
        isInView
          ? { opacity: 1, y: 0 }
          : prefersReduced
            ? { opacity: 0 }
            : { opacity: 0, y: 24 }
      }
      transition={{
        duration: prefersReduced ? 0.15 : 0.6,
        ease: [0.22, 1, 0.36, 1],
        delay: prefersReduced ? 0 : index * 0.1,
      }}
      style={{ flexGrow: isActive ? 4 : 1 }}
      className={`relative basis-0 min-w-0 h-full ${
        prefersReduced
          ? ""
          : "transition-[flex-grow] duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
      }`}
    >
      <Link
        ref={linkRef}
        href={`/blog/${post.slug}`}
        aria-current={isActive ? "true" : undefined}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        onFocus={onFocusActivate}
        onKeyDown={onKeyDown}
        className="group relative block w-full h-full rounded-3xl overflow-hidden bg-neutral-200 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-brand focus-visible:ring-offset-2"
      >
        {/* Background Image */}
        <motion.div
          initial={false}
          animate={{ scale: prefersReduced ? 1 : isActive ? 1 : 1.06 }}
          transition={{
            duration: prefersReduced ? 0 : 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="absolute inset-0"
        >
          <Image
            src={post.image}
            alt={post.alt}
            fill
            sizes="(max-width: 1023px) 100vw, 55vw"
            placeholder="blur"
            blurDataURL={post.blurDataURL}
            unoptimized={post.image.endsWith(".svg")}
            className={`object-cover transition-[filter,opacity] duration-500 ${
              isActive ? "grayscale-0 opacity-100" : "grayscale opacity-85"
            }`}
          />
        </motion.div>

        {/* White 35% Overlay for Inactive Panels */}
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 bg-white/35 transition-opacity duration-500 ${
            isActive ? "opacity-0" : "opacity-100"
          }`}
        />

        {/* Bottom 55% Black-to-Transparent Gradient Scrim */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 inset-x-0 h-[55%] bg-gradient-to-t from-black/85 via-black/45 to-transparent z-10"
        />

        {/* INACTIVE Overlay: Top-left mono number pill + vertical rotated 1-line title */}
        <div
          aria-hidden={isActive}
          className={`pointer-events-none absolute inset-0 z-20 p-6 flex flex-col justify-between transition-opacity duration-200 ${
            isActive ? "opacity-0" : "opacity-100"
          }`}
        >
          <span className="self-start inline-flex items-center px-3 py-1 rounded-full bg-ink text-paper font-mono text-xs tabular-nums">
            {numberLabel}
          </span>

          <p className="self-start text-paper font-heading font-semibold text-xl tracking-tight line-clamp-1 [writing-mode:vertical-rl] rotate-180 max-h-[60%]">
            {post.title}
          </p>
        </div>

        {/* ACTIVE Content: Always in DOM (never display:none), staggered entrance after 200ms */}
        <div
          className={`absolute inset-x-0 bottom-0 z-20 p-8 flex items-end justify-between gap-6 ${
            isActive ? "pointer-events-auto" : "pointer-events-none"
          }`}
        >
          <div className="min-w-0 max-w-[38rem]">
            {/* Category + Date + Reading Time */}
            <motion.div
              initial={false}
              animate={
                isActive
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: prefersReduced ? 0 : 16 }
              }
              transition={{
                duration: prefersReduced ? 0 : 0.3,
                ease: [0.22, 1, 0.36, 1],
                delay: isActive && !prefersReduced ? 0.2 : 0,
              }}
              className="flex flex-wrap items-center gap-3 mb-3.5"
            >
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/90 text-ink text-xs font-medium">
                {post.category}
              </span>
              <span className="font-mono text-xs text-white/90 tabular-nums">
                {formattedDate}
              </span>
              <span className="font-mono text-xs text-white/80">
                {post.readingMinutes} min read
              </span>
            </motion.div>

            {/* Title (Full title always in DOM) */}
            <motion.h3
              initial={false}
              animate={
                isActive
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: prefersReduced ? 0 : 16 }
              }
              transition={{
                duration: prefersReduced ? 0 : 0.32,
                ease: [0.22, 1, 0.36, 1],
                delay: isActive && !prefersReduced ? 0.26 : 0,
              }}
              className="font-heading font-semibold text-white text-[clamp(1.5rem,2.2vw,2.25rem)] leading-[1.15] tracking-[-0.015em] line-clamp-3"
            >
              {post.title}
            </motion.h3>

            {/* Excerpt (2 lines, white at 80%) */}
            <motion.p
              initial={false}
              animate={
                isActive
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: prefersReduced ? 0 : 16 }
              }
              transition={{
                duration: prefersReduced ? 0 : 0.32,
                ease: [0.22, 1, 0.36, 1],
                delay: isActive && !prefersReduced ? 0.32 : 0,
              }}
              className="mt-2.5 text-sm sm:text-base text-white/80 leading-relaxed line-clamp-2 max-w-[56ch]"
            >
              {post.excerpt}
            </motion.p>
          </div>

          {/* Circular Red Read Button (56px) */}
          <motion.span
            initial={false}
            animate={
              isActive
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: prefersReduced ? 0 : 16 }
            }
            transition={{
              duration: prefersReduced ? 0 : 0.32,
              ease: [0.22, 1, 0.36, 1],
              delay: isActive && !prefersReduced ? 0.32 : 0,
            }}
            aria-hidden="true"
            className="w-14 h-14 rounded-full bg-brand-action text-paper shrink-0 flex items-center justify-center"
          >
            <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:-rotate-45" />
          </motion.span>
        </div>

        {/* Cursor Follower (pointer: fine & non-reduced motion only) */}
        {isFinePointer && !prefersReduced && (
          <motion.div
            aria-hidden="true"
            style={{ x: springX, y: springY }}
            animate={{
              scale: isActive && isPointerInside ? 1 : 0,
              opacity: isActive && isPointerInside ? 1 : 0,
            }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="pointer-events-none absolute top-0 left-0 z-30 w-[72px] h-[72px] rounded-full bg-brand-action text-paper font-mono text-xs font-semibold flex items-center justify-center"
          >
            Read
          </motion.div>
        )}
      </Link>
    </motion.div>
  );
}

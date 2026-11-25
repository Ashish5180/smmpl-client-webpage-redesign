"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { formatBlogDate, type BlogPostPreview } from "@/lib/blog-preview";

interface BlogMobileCardsProps {
  posts: BlogPostPreview[];
}

export function BlogMobileCards({ posts }: BlogMobileCardsProps) {
  const [openIdx, setOpenIdx] = useState<number>(0);
  const prefersReduced = useReducedMotion();

  return (
    <div className="lg:hidden flex flex-col gap-3">
      {posts.map((post, index) => {
        const isOpen = openIdx === index;
        const numberLabel = String(index + 1).padStart(2, "0");
        const formattedDate = formatBlogDate(post.publishedAt);
        const cardId = `mobile-blog-card-${post.slug}`;

        return (
          <motion.div
            key={post._id}
            layout={!prefersReduced}
            transition={{
              duration: prefersReduced ? 0 : 0.4,
              ease: [0.22, 1, 0.36, 1],
            }}
            className={`relative rounded-2xl overflow-hidden bg-neutral-200 ${
              isOpen ? "h-[380px]" : "h-[96px]"
            }`}
          >
            {/* Background Image */}
            <Image
              src={post.image}
              alt={post.alt}
              fill
              sizes="(max-width: 1023px) 100vw, 50vw"
              placeholder="blur"
              blurDataURL={post.blurDataURL}
              unoptimized={post.image.endsWith(".svg")}
              className={`object-cover transition-[filter,opacity] duration-300 ${
                isOpen ? "grayscale-0 opacity-100" : "grayscale opacity-85"
              }`}
            />

            {!isOpen && (
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-white/35"
              />
            )}

            <div
              aria-hidden="true"
              className={`pointer-events-none absolute inset-0 ${
                isOpen
                  ? "bg-gradient-to-t from-black/85 via-black/45 to-black/15"
                  : "bg-gradient-to-r from-black/75 via-black/55 to-black/40"
              }`}
            />

            {!isOpen ? (
              <button
                type="button"
                aria-expanded={false}
                aria-controls={cardId}
                onClick={() => setOpenIdx(index)}
                className="relative z-20 w-full h-full px-5 flex items-center gap-3.5 text-left cursor-pointer focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-brand rounded-2xl"
              >
                <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-ink text-paper font-mono text-xs tabular-nums shrink-0">
                  {numberLabel}
                </span>
                <span className="font-heading font-semibold text-lg text-white line-clamp-1">
                  {post.title}
                </span>
              </button>
            ) : (
              <div
                id={cardId}
                className="relative z-20 w-full h-full p-5 sm:p-6 flex flex-col justify-between"
              >
                {/* Top row: Toggle number badge */}
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    aria-expanded={true}
                    aria-controls={cardId}
                    onClick={() => setOpenIdx(-1)}
                    aria-label={`Collapse ${post.title}`}
                    className="inline-flex items-center px-3 py-1 rounded-full bg-ink/85 text-paper font-mono text-xs tabular-nums min-h-[32px] cursor-pointer focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-brand"
                  >
                    {numberLabel}
                  </button>
                </div>

                {/* Bottom Active Content */}
                <div className="flex items-end justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2.5 mb-2.5">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-white/90 text-ink text-xs font-medium">
                        {post.category}
                      </span>
                      <span className="font-mono text-xs text-white/90 tabular-nums">
                        {formattedDate}
                      </span>
                      <span className="font-mono text-xs text-white/80">
                        {post.readingMinutes} min read
                      </span>
                    </div>

                    <h3 className="font-heading font-semibold text-white text-xl sm:text-2xl leading-[1.15] line-clamp-3">
                      {post.title}
                    </h3>

                    <p className="mt-2 text-sm text-white/80 line-clamp-2">
                      {post.excerpt}
                    </p>
                  </div>

                  <Link
                    href={`/blog/${post.slug}`}
                    aria-label={`Read ${post.title}`}
                    className="w-14 h-14 rounded-full bg-brand-action text-paper shrink-0 flex items-center justify-center focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-brand focus-visible:ring-offset-2"
                  >
                    <ArrowRight className="w-5 h-5" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}

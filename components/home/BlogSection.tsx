import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import {
  BLOG_SECTION_HEADER,
  getRecentBlogPosts,
  type BlogPostPreview,
} from "@/lib/blog-preview";
import { BlogPanels } from "./BlogPanels";

interface BlogSectionProps {
  posts?: BlogPostPreview[];
}

export function BlogSection({ posts }: BlogSectionProps) {
  const recentPosts = posts && posts.length > 0 ? posts : getRecentBlogPosts(3);

  return (
    <section
      id="latest-blogs"
      aria-labelledby="latest-blogs-heading"
      className="py-16 md:py-24 bg-paper text-ink border-t border-line"
    >
      <Container>
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 md:mb-12">
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <span className="w-5 h-[2px] bg-brand inline-block" />
                <span className="text-xs font-semibold tracking-wider uppercase text-neutral-600 font-body">
                  {BLOG_SECTION_HEADER.eyebrow}
                </span>
              </div>

              <h2
                id="latest-blogs-heading"
                className="font-heading font-bold text-ink text-[clamp(1.85rem,3.6vw,2.85rem)] leading-[1.12] tracking-[-0.015em] text-balance"
              >
                {BLOG_SECTION_HEADER.heading}
              </h2>
            </div>

            <Link
              href={BLOG_SECTION_HEADER.ctaHref}
              className="group inline-flex items-center gap-2 text-sm font-semibold text-ink hover:text-brand-action transition-colors self-start md:self-end min-h-[44px] focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-brand rounded-sm"
            >
              <span>{BLOG_SECTION_HEADER.ctaLabel}</span>
              <ArrowRight
                className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </div>
        </Reveal>

        <BlogPanels posts={recentPosts} />
      </Container>
    </section>
  );
}

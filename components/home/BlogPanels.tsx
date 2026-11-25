"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";
import type { BlogPostPreview } from "@/lib/blog-preview";
import { BlogDesktopPanel } from "./BlogDesktopPanel";
import { BlogMobileCards } from "./BlogMobileCards";

interface BlogPanelsProps {
  posts: BlogPostPreview[];
}

export function BlogPanels({ posts }: BlogPanelsProps) {
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const hoverTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const desktopRowRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(desktopRowRef, { once: true });

  const clearIntent = useCallback(() => {
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => clearIntent();
  }, [clearIntent]);

  const scheduleActivate = useCallback(
    (index: number) => {
      clearIntent();
      hoverTimerRef.current = setTimeout(() => {
        setActiveIdx(index);
      }, 80);
    },
    [clearIntent]
  );

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLAnchorElement>,
    index: number
  ) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      clearIntent();
      const next = (index + 1) % posts.length;
      setActiveIdx(next);
      linkRefs.current[next]?.focus();
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      clearIntent();
      const prev = (index - 1 + posts.length) % posts.length;
      setActiveIdx(prev);
      linkRefs.current[prev]?.focus();
    }
  };

  return (
    <div>
      {/* Desktop (>=1024px) Expanding Panels */}
      <div
        ref={desktopRowRef}
        className="hidden lg:flex gap-3 h-[min(70svh,640px)] w-full"
      >
        {posts.map((post, index) => (
          <BlogDesktopPanel
            key={post._id}
            post={post}
            index={index}
            isActive={activeIdx === index}
            isInView={isInView}
            linkRef={(el) => {
              linkRefs.current[index] = el;
            }}
            onActivateIntent={() => scheduleActivate(index)}
            onCancelIntent={clearIntent}
            onFocusActivate={() => scheduleActivate(index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
          />
        ))}
      </div>

      {/* Tablet & Mobile (<1024px) Vertical Accordion Cards */}
      <BlogMobileCards posts={posts} />
    </div>
  );
}

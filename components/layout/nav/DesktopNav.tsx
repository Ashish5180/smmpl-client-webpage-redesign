"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { type NavItem } from "@/lib/site";
import { cn } from "@/lib/utils";

interface DesktopNavProps {
  navItems: NavItem[];
  activeItem: NavItem | null;
  isOpen: boolean;
  onOpenItem: (item: NavItem, el: HTMLElement) => void;
  onClose: () => void;
  triggerRefs: React.MutableRefObject<Record<string, HTMLElement | null>>;
  panelRef: React.RefObject<HTMLDivElement | null>;
  closeTimeoutRef: React.MutableRefObject<NodeJS.Timeout | null>;
}

export function DesktopNav({
  navItems,
  activeItem,
  isOpen,
  onOpenItem,
  onClose,
  triggerRefs,
  panelRef,
  closeTimeoutRef,
}: DesktopNavProps) {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();
  const [hoveredLabel, setHoveredLabel] = useState<string | null>(null);

  const handlePointerEnter = (item: NavItem, el: HTMLElement) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setHoveredLabel(item.label);
    if (item.children && item.children.length > 0) {
      onOpenItem(item, el);
    } else {
      // If moving to a leaf item, close the open dropdown
      onClose();
    }
  };

  const handlePointerLeave = () => {
    setHoveredLabel(null);
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    closeTimeoutRef.current = setTimeout(() => {
      onClose();
    }, 120);
  };

  // Keyboard navigation across top-level items
  const handleKeyDown = (e: React.KeyboardEvent, index: number, item: NavItem) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      const nextIdx = (index + 1) % navItems.length;
      const nextItem = navItems[nextIdx];
      const nextEl = triggerRefs.current[nextItem.label];
      if (nextEl) {
        nextEl.focus();
        if (nextItem.children && nextItem.children.length > 0) {
          onOpenItem(nextItem, nextEl);
        } else {
          onClose();
        }
      }
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      const prevIdx = (index - 1 + navItems.length) % navItems.length;
      const prevItem = navItems[prevIdx];
      const prevEl = triggerRefs.current[prevItem.label];
      if (prevEl) {
        prevEl.focus();
        if (prevItem.children && prevItem.children.length > 0) {
          onOpenItem(prevItem, prevEl);
        } else {
          onClose();
        }
      }
    } else if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
      if (item.children && item.children.length > 0) {
        e.preventDefault();
        const currentEl = triggerRefs.current[item.label];
        if (currentEl) onOpenItem(item, currentEl);

        // Move focus into first link of the panel
        setTimeout(() => {
          if (panelRef.current) {
            const firstLink = panelRef.current.querySelector<HTMLAnchorElement>("a");
            if (firstLink) firstLink.focus();
          }
        }, 50);
      }
    } else if (e.key === "Escape") {
      e.preventDefault();
      onClose();
    }
  };

  return (
    <nav
      aria-label="Primary"
      onPointerLeave={handlePointerLeave}
      className="hidden lg:flex items-center gap-0.5 xl:gap-1 relative"
    >
      {navItems.map((item, index) => {
        const hasChildren = item.children && item.children.length > 0;
        const isActiveRoute =
          pathname === item.href ||
          (item.href !== "/" && pathname.startsWith(item.href));
        const isPanelOpen = isOpen && activeItem?.label === item.label;
        const isHovered = hoveredLabel === item.label;

        const baseItemClasses =
          "relative z-10 inline-flex items-center gap-1 px-2.5 xl:px-3 py-1.5 rounded-full text-xs xl:text-sm font-semibold transition-colors duration-150 cursor-pointer select-none focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-2";

        const textClass = isPanelOpen || isActiveRoute ? "text-ink" : "text-ink/80 hover:text-ink";

        if (hasChildren) {
          return (
            <button
              key={item.label}
              ref={(el) => {
                triggerRefs.current[item.label] = el;
              }}
              type="button"
              aria-expanded={isPanelOpen}
              aria-controls="nav-dropdown-panel"
              onPointerEnter={(e) => handlePointerEnter(item, e.currentTarget)}
              onClick={(e) => {
                if (isPanelOpen) {
                  onClose();
                } else {
                  onOpenItem(item, e.currentTarget);
                }
              }}
              onFocus={(e) => {
                setHoveredLabel(item.label);
              }}
              onBlur={() => {
                // Blur handled via pointer leave or timeout
              }}
              onKeyDown={(e) => handleKeyDown(e, index, item)}
              className={cn(baseItemClasses, textClass)}
            >
              {item.label}
              <ChevronDown
                className={cn(
                  "w-3.5 h-3.5 transition-transform duration-200 text-muted",
                  isPanelOpen && "rotate-180 text-ink"
                )}
                aria-hidden="true"
              />

              {/* Shared sliding highlight pill */}
              {isHovered && !shouldReduceMotion && (
                <motion.div
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-full skeuo-recessed -z-10"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              {isHovered && shouldReduceMotion && (
                <div className="absolute inset-0 rounded-full skeuo-recessed -z-10" />
              )}
            </button>
          );
        }

        return (
          <Link
            key={item.label}
            ref={(el) => {
              triggerRefs.current[item.label] = el;
            }}
            href={item.href}
            aria-current={isActiveRoute ? "page" : undefined}
            onPointerEnter={(e) => handlePointerEnter(item, e.currentTarget)}
            onFocus={() => setHoveredLabel(item.label)}
            onKeyDown={(e) => handleKeyDown(e, index, item)}
            className={cn(baseItemClasses, textClass)}
          >
            {item.label}

            {/* Shared sliding highlight pill */}
            {isHovered && !shouldReduceMotion && (
              <motion.div
                layoutId="nav-pill"
                className="absolute inset-0 rounded-full skeuo-recessed -z-10"
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
              />
            )}
            {isHovered && shouldReduceMotion && (
              <div className="absolute inset-0 rounded-full skeuo-recessed -z-10" />
            )}
          </Link>
        );
      })}
    </nav>
  );
}

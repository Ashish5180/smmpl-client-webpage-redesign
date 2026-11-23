"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { ChevronRight } from "lucide-react";
import { type NavItem, type NavChildItem } from "@/lib/site";
import { getNavIcon } from "./NavIcons";

interface DropdownPanelProps {
  navItems: NavItem[];
  activeItem: NavItem | null;
  isOpen: boolean;
  direction: number;
  triggerRect: { center: number; width: number } | null;
  barWidth: number;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClose: () => void;
  panelRef: React.RefObject<HTMLDivElement | null>;
}

export function DropdownPanel({
  navItems,
  activeItem,
  isOpen,
  direction,
  triggerRect,
  barWidth,
  onMouseEnter,
  onMouseLeave,
  onClose,
  panelRef,
}: DropdownPanelProps) {
  const shouldReduceMotion = useReducedMotion();
  const [rendered, setRendered] = useState(false);
  const itemsWithChildren = navItems.filter((i) => i.children && i.children.length > 0);

  // Exact dimensions per dropdown
  const dimensionsMap: Record<string, { width: number; height: number }> = {
    "About Us": { width: 320, height: 144 },
    Products: { width: 360, height: 336 },
  };

  const currentDim = activeItem
    ? dimensionsMap[activeItem.label] || { width: 340, height: 240 }
    : { width: 340, height: 240 };

  // Calculate clamped horizontal position centered on trigger
  let targetX = 0;
  if (triggerRect && barWidth > 0) {
    const rawX = triggerRect.center - currentDim.width / 2;
    // Keep 16px padding inside bar bounds
    targetX = Math.max(16, Math.min(rawX, barWidth - currentDim.width - 16));
  }

  // Handle visibility transition so links stay in DOM for SEO/crawlers
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isOpen) {
      setRendered(true);
    } else {
      // Wait for closing animation (140ms) before setting visibility hidden
      timer = setTimeout(() => {
        setRendered(false);
      }, 150);
    }
    return () => clearTimeout(timer);
  }, [isOpen]);

  const panelVariants = {
    open: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.2, ease: "easeOut" as const },
    },
    closed: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : -6,
      scale: shouldReduceMotion ? 1 : 0.98,
      transition: { duration: 0.14, ease: "easeIn" as const },
    },
  };

  const slideOffset = shouldReduceMotion ? 0 : 8;

  const contentVariants = {
    enter: (dir: number) => ({
      opacity: 0,
      x: dir > 0 ? slideOffset : -slideOffset,
    }),
    center: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.18, ease: "easeOut" as const },
    },
    exit: (dir: number) => ({
      opacity: 0,
      x: dir > 0 ? -slideOffset : slideOffset,
      transition: { duration: 0.12, ease: "easeIn" as const },
    }),
  };

  return (
    <div
      ref={panelRef}
      id="nav-dropdown-panel"
      role="region"
      aria-label="Submenu"
      inert={!isOpen ? true : undefined}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        visibility: rendered ? "visible" : "hidden",
        pointerEvents: isOpen ? "auto" : "none",
      }}
      className="absolute top-[calc(100%+10px)] left-0 z-50 select-none"
    >
      <motion.div
        variants={panelVariants}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        style={{
          transformOrigin: "top center",
        }}
      >
        <motion.div
          animate={{
            x: targetX,
            width: currentDim.width,
            height: currentDim.height,
          }}
          transition={
            shouldReduceMotion
              ? { duration: 0 }
              : { type: "spring", stiffness: 420, damping: 35 }
          }
          className="skeuo-pill-bar rounded-3xl p-3 shadow-xl overflow-hidden will-change-[transform,width,height]"
        >
          {/* Active animated dropdown content view */}
          <AnimatePresence mode="wait" custom={direction}>
            {activeItem && (
              <motion.div
                key={activeItem.label}
                custom={direction}
                variants={contentVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="w-full h-full flex flex-col justify-center space-y-1.5"
              >
                {activeItem.children?.map((child: NavChildItem) => {
                  const Icon = getNavIcon(child.icon);
                  return (
                    <Link
                      key={child.href}
                      href={child.href}
                      onClick={onClose}
                      className="group flex items-center justify-between p-2 rounded-2xl hover:bg-black/[0.035] transition-colors focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-1"
                    >
                      <div className="flex items-center gap-3">
                        {/* High-craft skeuomorphic technical tile */}
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-b from-white to-[#f5f5f7] border border-black/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,1),0_2px_4px_-1px_rgba(0,0,0,0.06)] group-hover:border-brand/40 group-hover:shadow-[inset_0_1px_0_rgba(255,255,255,1),0_4px_8px_-2px_rgba(224,58,43,0.18)] transition-all duration-200">
                          <Icon className="w-5 h-5 text-ink transition-transform duration-200 group-hover:scale-105" />
                        </div>
                        <span className="font-heading text-sm font-semibold text-ink group-hover:text-brand transition-colors tracking-tight">
                          {child.label}
                        </span>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted transition-transform duration-150 group-hover:translate-x-1 group-hover:text-brand shrink-0" />
                    </Link>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Crawler-accessible static DOM links (always present in DOM for SEO) */}
          <div className="sr-only" aria-hidden="true">
            {itemsWithChildren.map((item) => (
              <div key={item.label}>
                <span>{item.label}</span>
                {item.children?.map((child) => (
                  <Link key={child.href} href={child.href}>
                    {child.label}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

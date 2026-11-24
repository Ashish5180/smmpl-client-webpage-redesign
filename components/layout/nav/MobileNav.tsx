"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { ChevronDown, ChevronRight, Phone } from "lucide-react";
import { type NavItem, type NavChildItem } from "@/lib/site";
import { cn } from "@/lib/utils";
import { getNavIcon } from "./NavIcons";

interface MobileNavProps {
  navItems: NavItem[];
  isOpen: boolean;
  onClose: () => void;
  phone: string;
}

export function MobileNav({ navItems, isOpen, onClose, phone }: MobileNavProps) {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();
  const prevPathnameRef = React.useRef(pathname);
  const [expandedAccordions, setExpandedAccordions] = useState<Record<string, boolean>>({
    "About Us": false,
    Products: false,
  });

  // Automatically close mobile menu ONLY when route actually changes
  useEffect(() => {
    if (prevPathnameRef.current !== pathname) {
      prevPathnameRef.current = pathname;
      onClose();
    }
  }, [pathname, onClose]);

  // Lock body scroll while open
  useEffect(() => {
    if (isOpen) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [isOpen]);

  // Handle Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const toggleAccordion = (label: string) => {
    setExpandedAccordions((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 backdrop-blur-xs z-40 lg:hidden"
            aria-hidden="true"
          />

          {/* Sheet below the floating pill */}
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed top-20 left-1/2 -translate-x-1/2 w-[min(1200px,calc(100%-2rem))] z-[45] lg:hidden max-h-[calc(100vh-6rem)] overflow-y-auto skeuo-pill-bar rounded-3xl p-5 shadow-2xl space-y-4"
          >
            <div className="space-y-1">
              {navItems.map((item) => {
                const hasChildren = item.children && item.children.length > 0;
                const isActiveRoute =
                  pathname === item.href ||
                  (item.href !== "/" && pathname.startsWith(item.href));

                if (hasChildren) {
                  const isExpanded = !!expandedAccordions[item.label];
                  return (
                    <div key={item.label} className="border-b border-black/[0.04] last:border-b-0 pb-1">
                      <button
                        type="button"
                        onClick={() => toggleAccordion(item.label)}
                        aria-expanded={isExpanded}
                        className="w-full flex items-center justify-between py-3 px-2 rounded-xl text-sm font-semibold text-ink hover:text-brand transition-colors text-left"
                      >
                        <span className="font-heading">{item.label}</span>
                        <ChevronDown
                          className={cn(
                            "w-4 h-4 text-muted transition-transform duration-200",
                            isExpanded && "rotate-180 text-brand"
                          )}
                        />
                      </button>

                      <motion.div
                        initial={false}
                        animate={{
                          height: isExpanded ? "auto" : 0,
                          opacity: isExpanded ? 1 : 0,
                        }}
                        transition={
                          shouldReduceMotion
                            ? { duration: 0 }
                            : { duration: 0.2, ease: "easeInOut" }
                        }
                        className="overflow-hidden pl-2 space-y-1"
                      >
                        {item.children?.map((child: NavChildItem) => {
                          const Icon = getNavIcon(child.icon);
                          const isChildActive = pathname === child.href;
                          return (
                            <Link
                              key={child.href}
                              href={child.href}
                              onClick={onClose}
                              className={cn(
                                "group flex items-center justify-between p-2 rounded-xl hover:bg-black/[0.04] transition-colors",
                                isChildActive && "bg-black/[0.04]"
                              )}
                            >
                              <div className="flex items-center gap-3">
                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-b from-white to-[#f5f5f7] border border-black/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,1),0_2px_4px_-1px_rgba(0,0,0,0.06)] text-ink">
                                  <Icon className="h-4 w-4 text-ink" />
                                </div>
                                <span className="font-heading text-xs font-semibold text-ink group-hover:text-brand transition-colors">
                                  {child.label}
                                </span>
                              </div>
                              <ChevronRight className="h-3.5 w-3.5 text-muted group-hover:translate-x-0.5 transition-transform" />
                            </Link>
                          );
                        })}
                      </motion.div>
                    </div>
                  );
                }

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={onClose}
                    className={cn(
                      "block py-3 px-2 rounded-xl font-heading text-sm font-semibold text-ink hover:text-brand transition-colors border-b border-black/[0.04] last:border-b-0",
                      isActiveRoute && "text-brand"
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>

            {/* Actions: Get a Quote button and Phone Link */}
            <div className="pt-2 space-y-3">
              <Link
                href="/contact"
                onClick={onClose}
                className="skeuo-cta text-paper font-semibold rounded-full w-full py-3 flex items-center justify-center text-sm shadow-md transition-all active:scale-[0.99]"
              >
                Get a Quote
              </Link>

              {phone && (
                <a
                  href={`tel:${phone.replace(/[^0-9+]/g, "")}`}
                  className="flex items-center justify-center gap-2 py-2 text-xs font-semibold text-ink/80 hover:text-ink transition-colors"
                >
                  <Phone className="w-4 h-4 text-brand" />
                  <span>{phone}</span>
                </a>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

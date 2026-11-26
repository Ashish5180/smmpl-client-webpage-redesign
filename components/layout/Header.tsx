"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { Phone, Menu, X } from "lucide-react";
import { siteConfig, type NavItem } from "@/lib/site";
import { cn } from "@/lib/utils";
import { DesktopNav } from "./nav/DesktopNav";
import { DropdownPanel } from "./nav/DropdownPanel";
import { MobileNav } from "./nav/MobileNav";

interface HeaderProps {
  phone?: string;
}

export function Header({ phone = siteConfig.phone }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleCloseMobile = React.useCallback(() => {
    setMobileOpen(false);
  }, []);

  // Desktop dropdown state
  const [activeItem, setActiveItem] = useState<NavItem | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [direction, setDirection] = useState<number>(0);
  const [triggerRect, setTriggerRect] = useState<{ center: number; width: number } | null>(null);
  const [barWidth, setBarWidth] = useState<number>(1200);

  const prevIndexRef = useRef<number>(-1);
  const barRef = useRef<HTMLDivElement | null>(null);
  const triggerRefs = useRef<Record<string, HTMLElement | null>>({});
  const panelRef = useRef<HTMLDivElement | null>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Monitor scroll for height compression and deeper shadow past 24px
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Update bar width on resize
  useEffect(() => {
    const updateBarWidth = () => {
      if (barRef.current) {
        setBarWidth(barRef.current.offsetWidth);
      }
    };
    updateBarWidth();
    window.addEventListener("resize", updateBarWidth, { passive: true });
    return () => window.removeEventListener("resize", updateBarWidth);
  }, []);

  const handleOpenItem = (item: NavItem, el: HTMLElement) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }

    const currentIndex = siteConfig.navLinks.findIndex((n) => n.label === item.label);
    const prevIndex = prevIndexRef.current;

    let dir = 0;
    if (prevIndex !== -1 && currentIndex !== -1) {
      if (currentIndex > prevIndex) dir = 1;
      else if (currentIndex < prevIndex) dir = -1;
    }
    setDirection(dir);
    prevIndexRef.current = currentIndex;

    if (barRef.current) {
      const barRect = barRef.current.getBoundingClientRect();
      const elRect = el.getBoundingClientRect();
      const center = elRect.left - barRect.left + elRect.width / 2;
      setTriggerRect({ center, width: elRect.width });
    }

    setActiveItem(item);
    setIsDropdownOpen(true);
  };

  const handleCloseDropdown = () => {
    setIsDropdownOpen(false);
    setActiveItem(null);
    prevIndexRef.current = -1;
  };

  const handlePanelMouseEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  };

  const handlePanelMouseLeave = () => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    closeTimeoutRef.current = setTimeout(() => {
      handleCloseDropdown();
    }, 120);
  };

  return (
    <>
      {/* 5. Accessibility: Skip to content as first focusable element */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-6 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-full focus:bg-paper focus:text-ink focus:border focus:border-line focus:shadow-md focus:outline-2 focus:outline-brand text-xs font-semibold"
      >
        Skip to content
      </a>

      {/* Floating Pill Bar */}
      <header
        ref={barRef}
        className={cn(
          "fixed top-4 left-1/2 -translate-x-1/2 w-[min(1200px,calc(100%-2rem))] z-50 rounded-full px-3 pl-5 flex items-center justify-between transition-[height,box-shadow] duration-200 skeuo-pill-bar",
          isScrolled ? "h-14 skeuo-pill-bar-scrolled" : "h-16"
        )}
      >
        {/* Left: Brand Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 shrink-0 focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-2 rounded-lg"
          aria-label="SMMIPL Home"
        >
          <Image
            src="/logo/smmipl.svg"
            alt="SMMIPL Logo"
            width={130}
            height={30}
            className="h-7 w-auto"
            priority
          />
        </Link>

        {/* Center: Desktop Navigation */}
        <DesktopNav
          navItems={siteConfig.navLinks}
          activeItem={activeItem}
          isOpen={isDropdownOpen}
          onOpenItem={handleOpenItem}
          onClose={handleCloseDropdown}
          triggerRefs={triggerRefs}
          panelRef={panelRef}
          closeTimeoutRef={closeTimeoutRef}
        />

        {/* Right (Desktop): Phone Link + Get a Quote CTA */}
        <div className="hidden lg:flex items-center gap-2 xl:gap-3 shrink-0">
          {phone && (
            <a
              href={`tel:${phone.replace(/[^0-9+]/g, "")}`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-ink/80 hover:text-ink px-2.5 py-1.5 rounded-full hover:bg-black/[0.04] transition-colors focus-visible:outline-2 focus-visible:outline-brand"
              aria-label={`Call us at ${phone}`}
            >
              <Phone className="w-3.5 h-3.5 text-brand" />
              <span className="hidden xl:inline">{phone}</span>
            </a>
          )}

          <Link
            href="/contact"
            className="skeuo-cta text-paper font-semibold text-xs xl:text-sm px-4 xl:px-5 py-2 rounded-full transition-transform duration-150 select-none focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-2"
          >
            Get a Quote
          </Link>
        </div>

        {/* Mobile Hamburger Button (below lg) */}
        <div className="flex lg:hidden items-center">
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label="Toggle Navigation Menu"
            className="inline-flex items-center justify-center p-2 rounded-full text-ink hover:text-brand focus-visible:outline-2 focus-visible:outline-brand cursor-pointer"
          >
            {mobileOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Desktop Single Shared Dropdown Panel */}
        <DropdownPanel
          navItems={siteConfig.navLinks}
          activeItem={activeItem}
          isOpen={isDropdownOpen}
          direction={direction}
          triggerRect={triggerRect}
          barWidth={barWidth}
          onMouseEnter={handlePanelMouseEnter}
          onMouseLeave={handlePanelMouseLeave}
          onClose={handleCloseDropdown}
          panelRef={panelRef}
        />
      </header>

      {/* Mobile Menu Sheet */}
      <MobileNav
        navItems={siteConfig.navLinks}
        isOpen={mobileOpen}
        onClose={handleCloseMobile}
        phone={phone}
      />
    </>
  );
}

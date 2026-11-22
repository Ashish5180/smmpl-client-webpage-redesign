"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 12);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 bg-paper/95 backdrop-blur-md transition-shadow duration-200",
        scrolled ? "shadow-xs border-b border-line" : "border-b border-line/40"
      )}
    >
      <Container>
        <div className="flex h-16 items-center justify-between gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            aria-label="SMMIPL Home"
          >
            <Image
              src="/logo/smmipl.svg"
              alt="SMMIPL Logo"
              width={140}
              height={32}
              className="h-8 w-auto"
              priority
            />
          </Link>

          <nav
            className="hidden md:flex items-center gap-8"
            aria-label="Main Navigation"
          >
            {siteConfig.navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative py-1 text-sm font-semibold text-ink transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-brand after:origin-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-200 after:ease-out"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center">
            <Button href="/contact" variant="primary">
              Get a Quote
            </Button>
          </div>

          <div className="flex md:hidden">
            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-expanded={mobileOpen}
              aria-label="Toggle Navigation Menu"
              className="inline-flex items-center justify-center p-2 rounded-md text-ink hover:text-brand focus-visible:outline-2 focus-visible:outline-brand cursor-pointer"
            >
              {mobileOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile Menu with grid-rows transition */}
      <div
        className={cn(
          "grid transition-[grid-template-rows,opacity] duration-300 ease-out md:hidden border-b border-line bg-paper",
          mobileOpen
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0 pointer-events-none"
        )}
      >
        <div className="overflow-hidden">
          <Container className="py-4 space-y-3">
            {siteConfig.navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block py-2 text-base font-semibold text-ink hover:text-brand transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2">
              <Button
                href="/contact"
                variant="primary"
                className="w-full"
                onClick={() => setMobileOpen(false)}
              >
                Get a Quote
              </Button>
            </div>
          </Container>
        </div>
      </div>
    </header>
  );
}

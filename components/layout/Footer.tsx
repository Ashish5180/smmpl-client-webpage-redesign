import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/lib/site";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-ink text-paper py-12 md:py-16 border-t border-white/10">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-white/10">
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="inline-block" aria-label="SMMIPL Home">
              <Image
                src="/logo/smmipl-white.svg"
                alt="SMMIPL Logo"
                width={140}
                height={32}
                className="h-8 w-auto"
              />
            </Link>
            <p className="text-sm text-gray-400 max-w-sm">
              {siteConfig.tagline}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-paper uppercase tracking-wider mb-4">
              Navigation
            </h3>
            <ul className="space-y-2 text-sm">
              {siteConfig.navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-paper transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-paper uppercase tracking-wider mb-4">
              Contact
            </h3>
            <div className="space-y-2 text-sm text-gray-400">
              {siteConfig.phone && <p>{siteConfig.phone}</p>}
              {siteConfig.email && <p>{siteConfig.email}</p>}
              {siteConfig.address && <p>{siteConfig.address}</p>}
              {!siteConfig.phone && !siteConfig.email && !siteConfig.address && (
                <p className="text-gray-500 italic">
                  Reach out to our engineering team at{" "}
                  <Link
                    href="/contact"
                    className="text-paper underline hover:text-brand"
                  >
                    our inquiry desk
                  </Link>
                  .
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© {currentYear} {siteConfig.name}. All rights reserved.</p>
          <p className="text-[12px]">Precision Engineering & Injection Molding Solutions</p>
        </div>
      </Container>
    </footer>
  );
}

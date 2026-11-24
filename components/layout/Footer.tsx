import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { Container } from "@/components/ui/Container";
import {
  FooterAnimationWrapper,
  FooterAnimationItem,
} from "./footer/FooterAnimationWrapper";
import { ScrollToTop } from "./footer/ScrollToTop";
import { SocialIcon } from "./footer/SocialIcons";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-ink text-paper overflow-hidden pt-16 md:pt-20 pb-12 border-t border-white/[0.08]">
      {/* Subtle Blueprint Grid Pattern Background (low contrast SVG, non-intrusive) */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden select-none opacity-[0.025]"
        aria-hidden="true"
      >
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="footer-blueprint-grid"
              width="44"
              height="44"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 44 0 L 0 0 0 44"
                fill="none"
                stroke="#ffffff"
                strokeWidth="0.75"
              />
              <circle cx="0" cy="0" r="1.5" fill="#ffffff" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#footer-blueprint-grid)" />
        </svg>
      </div>

      {/* Subtle Low-Opacity Radial Glow at Top Right */}
      <div
        className="absolute top-0 right-0 w-[550px] h-[400px] pointer-events-none select-none opacity-30 bg-[radial-gradient(ellipse_at_top_right,_var(--color-brand)_0%,_transparent_70%)] blur-3xl -z-10"
        aria-hidden="true"
      />

      <Container className="relative z-10">
        <FooterAnimationWrapper>
          {/* 1. Top CTA Strip */}
          <FooterAnimationItem>
            <div className="relative overflow-hidden rounded-3xl p-8 md:p-10 mb-16 bg-gradient-to-b from-[#18181c] to-[#111113] border border-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_8px_32px_-8px_rgba(0,0,0,0.6)] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="max-w-xl">
                <p className="eyebrow text-brand mb-2 font-semibold">
                  Industrial Tooling & Manufacturing
                </p>
                <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-paper tracking-tight">
                  {siteConfig.cta.headline}
                </h2>
                <p className="text-sm text-gray-400 mt-2 font-body max-w-lg leading-relaxed">
                  {siteConfig.cta.subheadline}
                </p>
              </div>
              <div className="shrink-0 w-full md:w-auto">
                <Link
                  href={siteConfig.cta.buttonHref}
                  className="w-full md:w-auto inline-flex items-center justify-center skeuo-cta text-paper font-semibold text-sm md:text-base px-8 py-3.5 rounded-full transition-transform duration-150 select-none hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-2"
                >
                  {siteConfig.cta.buttonText}
                </Link>
              </div>
            </div>
          </FooterAnimationItem>

          {/* 2. Four Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 pb-14 border-b border-white/[0.08]">
            {/* Column 1: Brand */}
            <FooterAnimationItem className="space-y-4">
              <Link
                href="/"
                className="inline-block focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-2 rounded-lg"
                aria-label="SMMIPL Home"
              >
                <Image
                  src="/logo/smmipl-white.svg"
                  alt="SMMIPL Logo"
                  width={140}
                  height={32}
                  className="h-8 w-auto"
                />
              </Link>
              <p className="font-heading text-xs font-semibold text-paper/90 tracking-wider uppercase">
                {siteConfig.tagline}
              </p>
              <p className="text-xs md:text-sm text-gray-400 leading-relaxed font-body">
                {siteConfig.aboutParagraph}
              </p>
            </FooterAnimationItem>

            {/* Column 2: Information */}
            <FooterAnimationItem>
              <h3 className="font-heading text-base font-bold text-paper uppercase tracking-wider">
                Information
              </h3>
              {/* Red accent underline with two short dashes */}
              <div className="flex items-center gap-1.5 mt-2 mb-5" aria-hidden="true">
                <span className="h-0.5 w-5 rounded-full bg-brand" />
                <span className="h-0.5 w-1.5 rounded-full bg-brand" />
              </div>
              <nav aria-label="Footer Information">
                <ul className="space-y-3">
                  {siteConfig.footerNavigation.information.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="group relative inline-flex items-center text-sm text-gray-400 hover:text-brand transition-all duration-200 hover:translate-x-1 focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-2 w-fit"
                      >
                        <span className="relative">
                          {item.label}
                          <span
                            className="absolute -bottom-0.5 left-0 h-[1px] w-full bg-brand origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-200 ease-out"
                            aria-hidden="true"
                          />
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </FooterAnimationItem>

            {/* Column 3: Products & Company */}
            <FooterAnimationItem>
              <h3 className="font-heading text-base font-bold text-paper uppercase tracking-wider">
                Products & Solutions
              </h3>
              {/* Red accent underline with two short dashes */}
              <div className="flex items-center gap-1.5 mt-2 mb-5" aria-hidden="true">
                <span className="h-0.5 w-5 rounded-full bg-brand" />
                <span className="h-0.5 w-1.5 rounded-full bg-brand" />
              </div>
              <nav aria-label="Footer Products">
                <ul className="space-y-3">
                  {siteConfig.footerNavigation.products.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="group relative inline-flex items-center text-sm text-gray-400 hover:text-brand transition-all duration-200 hover:translate-x-1 focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-2 w-fit"
                      >
                        <span className="relative">
                          {item.label}
                          <span
                            className="absolute -bottom-0.5 left-0 h-[1px] w-full bg-brand origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-200 ease-out"
                            aria-hidden="true"
                          />
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </FooterAnimationItem>

            {/* Column 4: Contact Info & Socials */}
            <FooterAnimationItem>
              <h3 className="font-heading text-base font-bold text-paper uppercase tracking-wider">
                Contact Info
              </h3>
              {/* Red accent underline with two short dashes */}
              <div className="flex items-center gap-1.5 mt-2 mb-5" aria-hidden="true">
                <span className="h-0.5 w-5 rounded-full bg-brand" />
                <span className="h-0.5 w-1.5 rounded-full bg-brand" />
              </div>

              <div className="space-y-3.5 text-sm text-gray-400">
                {/* Email */}
                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-brand shrink-0 mt-1" aria-hidden="true" />
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="hover:text-brand transition-colors focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-1 rounded"
                  >
                    {siteConfig.contact.email}
                  </a>
                </div>

                {/* Primary Phone */}
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-brand shrink-0" aria-hidden="true" />
                  <a
                    href={`tel:${siteConfig.contact.phonePrimary.replace(/[^0-9+]/g, "")}`}
                    className="hover:text-brand transition-colors focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-1 rounded"
                  >
                    {siteConfig.contact.phonePrimary}
                  </a>
                </div>

                {/* Secondary Phone */}
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-brand shrink-0" aria-hidden="true" />
                  <a
                    href={`tel:${siteConfig.contact.phoneSecondary.replace(/[^0-9+]/g, "")}`}
                    className="hover:text-brand transition-colors focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-1 rounded"
                  >
                    {siteConfig.contact.phoneSecondary}
                  </a>
                </div>

                {/* Address MapPin */}
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-brand shrink-0 mt-1" aria-hidden="true" />
                  <a
                    href={siteConfig.contact.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-brand transition-colors leading-relaxed focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-1 rounded"
                  >
                    {siteConfig.contact.address}
                  </a>
                </div>

                {/* Social Icons in Circular Buttons */}
                <div className="pt-3">
                  <p className="text-xs uppercase tracking-wider font-semibold text-gray-500 mb-3">
                    Connect With Us
                  </p>
                  <div className="flex items-center gap-3">
                    {siteConfig.socialLinks.map((social) => (
                      <a
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Visit SMMIPL on ${social.name}`}
                        className="h-9 w-9 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center text-gray-300 transition-all duration-200 hover:text-paper hover:bg-brand hover:border-brand hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-2"
                      >
                        <SocialIcon name={social.icon} />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </FooterAnimationItem>
          </div>
        </FooterAnimationWrapper>

        {/* 3. Bottom Bar */}
        <div className="pt-8 text-center">
          <p className="text-xs text-gray-500 tracking-wide font-normal">
            © {currentYear} {siteConfig.legalName} | All Rights Reserved.
          </p>
        </div>
      </Container>

      {/* Floating Scroll to Top Button */}
      <ScrollToTop />
    </footer>
  );
}

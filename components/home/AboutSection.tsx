import React from "react";
import Link from "next/link";
import {
  Layers,
  Cpu,
  Compass,
  Wrench,
  Gauge,
  Crosshair,
  ArrowRight,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { AboutVisual } from "./AboutVisual";

const TOOLING_CAPABILITIES = [
  { label: "Injection Molding", icon: Layers },
  { label: "HPDC Dies", icon: Cpu },
  { label: "LPDC Dies", icon: Compass },
  { label: "Sheet Metal Tandem Tools", icon: Wrench },
  { label: "Jigs & Gauges", icon: Gauge },
  { label: "Fixtures (Trimming, Checking, Shrinkage)", icon: Crosshair },
];

export function AboutSection() {
  return (
    <section
      id="about-smmipl"
      aria-labelledby="about-smmipl-heading"
      className="relative py-16 md:py-24 bg-paper text-ink border-t border-line overflow-hidden"
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Semantic Story & Technical Tooling Scope */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            {/* Eyebrow */}
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <span className="w-4 h-[2px] bg-brand inline-block rounded-full" />
              <span className="text-xs font-semibold tracking-wider uppercase text-neutral-600 font-body">
                About SMMIPL
              </span>
            </div>

            {/* Main Section Heading */}
            <h2
              id="about-smmipl-heading"
              className="font-heading font-bold text-ink text-[clamp(1.75rem,3.2vw,2.75rem)] leading-[1.14] tracking-[-0.015em] text-balance mb-6"
            >
              Welcome to Shri Maruti Moulds India Private Limited
            </h2>

            {/* Paragraph 1 */}
            <p className="text-neutral-700 text-base sm:text-[1.05rem] leading-[1.65] font-body mb-5 max-w-[65ch]">
              At Shri Maruti Moulds India Private Limited, we are excellence in the
              field of design, development and manufacturing of high-quality all
              type of tooling solutions.
            </p>

            {/* Structured Tooling Capabilities Matrix */}
            <div
              className="my-3 p-4 sm:p-5 rounded-xl border border-line bg-neutral-50/70"
              aria-label="SMMIPL Core Tooling Solutions"
            >
              <div className="flex items-center justify-between mb-3 border-b border-line pb-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted font-body">
                  Tooling Specializations
                </span>
                <span className="font-mono text-[11px] text-muted">
                  6 Core Solutions
                </span>
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {TOOLING_CAPABILITIES.map(({ label, icon: Icon }) => (
                  <li
                    key={label}
                    className="flex items-start gap-2 text-xs sm:text-sm font-medium text-ink font-body"
                  >
                    <Icon className="w-4 h-4 text-brand shrink-0 mt-0.5" />
                    <span>{label}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Paragraph 2 */}
            <p className="text-neutral-600 text-base sm:text-[1.02rem] leading-[1.65] font-body mt-4 mb-8 max-w-[65ch]">
              We have become one of India’s leading commercial tool rooms, with over
              7+ years of experience serving the automotive and engineering
              industries. Our state-of-the-art manufacturing facility, combined with
              robust project management expertise, positions us as a trusted
              tooling supplier to numerous OEMs.
            </p>

            {/* CTA Button */}
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/about/our-story"
                className="group bg-brand-action hover:bg-brand-dark text-paper font-medium h-12 px-7 rounded-lg inline-flex items-center gap-2.5 transition-colors text-sm sm:text-base cursor-pointer focus-visible:outline-2 focus-visible:outline-brand-action select-none"
              >
                <span>Know More</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>

              <span className="font-mono text-xs text-muted">
                IMT Manesar // Gurugram
              </span>
            </div>
          </div>

          {/* Right Column: Frameless Leadership Visual with Animated Drafting Shapes */}
          <div className="lg:col-span-6 w-full">
            <AboutVisual />
          </div>
        </div>
      </Container>
    </section>
  );
}
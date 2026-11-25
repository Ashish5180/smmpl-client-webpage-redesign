import React from "react";
import { Container } from "@/components/ui/Container";
import { IndustriesGrid } from "./IndustriesGrid";

export function IndustriesSection() {
  return (
    <section
      id="industries-we-serve"
      aria-labelledby="industries-heading"
      className="relative py-16 md:py-24 bg-paper text-ink border-t border-line overflow-hidden"
    >
      {/* Background Architectural Blueprint Grid Pattern (Light Theme) */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        aria-hidden="true"
      >
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="ind-grid-light"
              width="48"
              height="48"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 48 0 L 0 0 0 48"
                fill="none"
                stroke="#000000"
                strokeWidth="1"
                strokeOpacity="0.04"
              />
              <circle cx="0" cy="0" r="1" fill="#000000" fillOpacity="0.08" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#ind-grid-light)" />
        </svg>
      </div>

      <Container className="relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-4 h-[2px] bg-brand inline-block rounded-full" />
            <span className="text-xs font-semibold tracking-wider uppercase text-neutral-600 font-body">
              Sectors We Serve
            </span>
          </div>

          <h2
            id="industries-heading"
            className="font-heading font-bold text-ink text-[clamp(1.85rem,3.6vw,2.85rem)] leading-[1.12] tracking-[-0.015em] text-balance mb-4"
          >
            Industries We Served
          </h2>

          <p className="text-neutral-600 text-base sm:text-[1.05rem] leading-[1.6] font-body max-w-[65ch]">
            Delivering tailored solutions to meet the needs of: startups,
            enterprises, and everything in between, across a spectrum of
            industries.
          </p>
        </div>

        {/* 3-Panel Light Kinetic Expanding Accordion Grid */}
        <IndustriesGrid />
      </Container>
    </section>
  );
}
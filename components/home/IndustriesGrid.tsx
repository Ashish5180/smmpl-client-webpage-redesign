"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

export interface IndustryItem {
  id: string;
  name: string;
  image: string;
  alt: string;
  tag: string;
  specs: string;
  tolerance: string;
  description: string;
  href: string;
}

const INDUSTRIES: IndustryItem[] = [
  {
    id: "automotive",
    name: "Automotive",
    image: "/industries/automotive.svg",
    alt: "High-precision automotive injection moulding and HPDC dies",
    tag: "TIER-1 OEM SUPPLIER",
    specs: "HPDC Dies, Tandem Tools, Checking Fixtures",
    tolerance: "±0.010 mm",
    description:
      "Robust high-tonnage tooling for powertrain, structural chassis, and exterior trim components.",
    href: "/products/casting-dies",
  },
  {
    id: "home-appliances",
    name: "Home Appliances",
    image: "/industries/home-appliances.svg",
    alt: "Aesthetic Class-A surface finish injection moulds for appliances",
    tag: "CONSUMER DURABLES",
    specs: "Plastic Moulds, High-Gloss Bezels, Snap-Fits",
    tolerance: "SPI A1 Finish",
    description:
      "Flawless cosmetic surfaces (Ra < 0.05 µm) for refrigeration, laundry, and climate control systems.",
    href: "/products/plastic-moulds",
  },
  {
    id: "medical",
    name: "Medical",
    image: "/industries/medical.svg",
    alt: "Cleanroom micro-tolerance multi-cavity moulds for medical devices",
    tag: "HEALTHCARE & CLEANROOM",
    specs: "Micro-Fluidic Manifolds, Multi-Cavity Tools",
    tolerance: "±0.002 mm",
    description:
      "Micron-level repeatable cavities for diagnostic consumables, surgical devices, and fluidic housings.",
    href: "/products/plastic-moulds",
  },
];

export function IndustriesGrid() {
  const [hoveredId, setHoveredId] = useState<string | null>("automotive");
  const prefersReduced = useReducedMotion();

  return (
    <div className="relative w-full">
      {/* 3-Column Kinetic Expanding Stage (Light Theme) */}
      <div className="flex flex-col lg:flex-row gap-5 lg:gap-6 min-h-[520px] lg:h-[580px] w-full">
        {INDUSTRIES.map((industry, index) => {
          const isHovered = hoveredId === industry.id;

          return (
            <motion.div
              key={industry.id}
              initial={{ opacity: 0, y: prefersReduced ? 0 : 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
                delay: prefersReduced ? 0 : index * 0.12,
              }}
              onMouseEnter={() => setHoveredId(industry.id)}
              onFocus={() => setHoveredId(industry.id)}
              className={`relative overflow-hidden rounded-2xl bg-[#f8f9fb] border transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] flex flex-col justify-between group cursor-pointer ${
                isHovered
                  ? "lg:flex-[1.55] border-brand/40 shadow-[0_24px_50px_-15px_rgba(0,0,0,0.12)] bg-paper"
                  : "lg:flex-1 border-black/[0.08] hover:border-black/[0.16]"
              }`}
            >
              {/* Background Engineering Image Visual */}
              <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
                <Image
                  src={industry.image}
                  alt={industry.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className={`object-cover object-center transition-all duration-700 ease-out ${
                    isHovered
                      ? "scale-[1.03] opacity-95"
                      : "scale-100 opacity-75"
                  }`}
                  unoptimized
                />

                {/* Light Gradient Overlay to guarantee text legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-paper via-paper/90 to-transparent z-10" />
                <div className="absolute inset-0 bg-white/20 z-10" />
              </div>

              {/* Top Meta Bar */}
              <div className="relative z-20 p-5 sm:p-6 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className={`w-2 h-2 rounded-xs transition-colors duration-300 ${
                      isHovered ? "bg-brand" : "bg-neutral-400"
                    }`}
                  />
                  <span className="font-mono text-[11px] font-semibold tracking-wider uppercase text-neutral-600">
                    {industry.tag}
                  </span>
                </div>

                {/* Micro Tolerance Badge */}
                <span className="font-mono text-[11px] font-medium text-ink bg-paper/90 backdrop-blur-md px-2.5 py-1 rounded-md border border-black/[0.08] shadow-xs">
                  {industry.tolerance}
                </span>
              </div>

              {/* Bottom Content Area */}
              <div className="relative z-20 p-5 sm:p-6 flex flex-col justify-end">
                {/* Industry Name */}
                <h3 className="font-heading font-bold text-ink text-2xl sm:text-3xl tracking-tight mb-2 flex items-center justify-between">
                  <span>{industry.name}</span>
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border transition-all duration-300 ${
                      isHovered
                        ? "bg-brand-action border-brand-action text-paper shadow-cta"
                        : "bg-paper border-black/[0.08] text-ink group-hover:border-black/[0.2] shadow-xs"
                    }`}
                  >
                    <ArrowUpRight
                      className={`w-4 h-4 transition-transform duration-300 ${
                        isHovered ? "translate-x-0.5 -translate-y-0.5" : ""
                      }`}
                    />
                  </div>
                </h3>

                {/* Specs Headline */}
                <p className="font-mono text-xs text-brand font-semibold mb-2.5">
                  {industry.specs}
                </p>

                {/* Expanded Description */}
                <p
                  className={`text-sm text-neutral-600 leading-relaxed font-body transition-all duration-300 ${
                    isHovered
                      ? "opacity-100 max-h-24 mt-1"
                      : "opacity-90 lg:opacity-75 max-h-24 lg:max-h-12 line-clamp-2"
                  }`}
                >
                  {industry.description}
                </p>

                {/* Action Link overlaying entire card for accessible touch/click */}
                <Link
                  href={industry.href}
                  className="absolute inset-0 z-30 focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-2 rounded-2xl"
                  aria-label={`Explore tooling solutions for ${industry.name}`}
                >
                  <span className="sr-only">Explore {industry.name}</span>
                </Link>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
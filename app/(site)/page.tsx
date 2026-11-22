// TEMP: remove before launch

import React from "react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { SpecTable, type SpecRow } from "@/components/ui/SpecTable";
import { PartNumber } from "@/components/ui/PartNumber";

const sampleSpecs: SpecRow[] = [
  { label: "Part Number / SKU", value: "SMM-1042-A" },
  { label: "Critical Dimension", value: "12.50", unit: "mm ±0.02" },
  { label: "Mold Cavities", value: "16", unit: "cavities" },
  { label: "Clamping Force", value: "250", unit: "ton" },
  { label: "Material Specification", value: "PEEK-450G (Natural)" },
];

const testString = "Il1 O0 | SMM-1042-A | 12.5 mm ±0.02 | 0123456789";

export default function HomePage() {
  return (
    <div>
      {/* 1. Hero Section */}
      <Section variant="light" className="pt-20 md:pt-32 pb-16 md:pb-24">
        <Container>
          <Reveal>
            <p className="eyebrow text-brand mb-3 font-semibold">
              Precision Engineering & Tooling
            </p>
            <h1 className="font-heading font-bold text-ink max-w-4xl">
              Molding Excellence, Shaping Futures.
            </h1>
            <p className="readable text-muted mt-6 text-base">
              Engineered high-precision injection molding and technical tooling
              delivering sub-micron repeatability for mission-critical
              automotive, aerospace, and medical assemblies.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button href="/contact" variant="primary">
                Get a Quote
              </Button>
              <Button href="/products" variant="outline">
                Explore Products
              </Button>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* 2. Dark Section */}
      <Section variant="dark">
        <Container>
          <Reveal>
            <p className="eyebrow text-brand mb-3 font-semibold">
              Manufacturing Standards
            </p>
            <h2 className="font-heading font-bold text-paper max-w-3xl">
              Engineered for Tight Tolerances & Zero Defect Production
            </h2>
            <p className="readable text-gray-400 mt-4 text-base">
              Equipped with high-tonnage all-electric injection molding cells,
              automated CMM inspection, and closed-loop process monitoring to
              guarantee part-to-part consistency across millions of cycles.
            </p>
            <div className="mt-8">
              <Button href="/quality" variant="onDark">
                View Quality Specifications
              </Button>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* 3. Typography & Legibility Test Section */}
      <Section variant="light" className="border-t border-line">
        <Container>
          <Reveal>
            <p className="eyebrow text-brand mb-2 font-semibold">
              Legibility Verification
            </p>
            <h2 className="font-heading font-bold text-ink mb-3">
              Typography & Precision Specs Test
            </h2>
            <p className="readable text-muted text-base mb-10">
              Comparing glyph distinction (capital I vs lowercase l vs number 1,
              capital O vs digit 0), technical part numbering, and tabular numeric
              alignment at small font sizes.
            </p>

            {/* Glyph Comparison Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {/* Inter (font-body) */}
              <div className="p-6 rounded-lg border border-line bg-paper">
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-line">
                  <h3 className="text-base font-semibold text-ink">
                    Inter (Body & UI Font)
                  </h3>
                  <span className="text-xs text-muted font-mono">--font-inter</span>
                </div>
                <div className="space-y-4">
                  <div>
                    <span className="text-xs text-muted block mb-1">16px (1rem)</span>
                    <p className="font-body text-[16px] text-ink">{testString}</p>
                  </div>
                  <div>
                    <span className="text-xs text-muted block mb-1">14px (0.875rem)</span>
                    <p className="font-body text-[14px] text-ink">{testString}</p>
                  </div>
                  <div>
                    <span className="text-xs text-muted block mb-1">
                      12px (0.75rem - legal/caption only)
                    </span>
                    <p className="font-body text-[12px] text-muted">{testString}</p>
                  </div>
                </div>
              </div>

              {/* IBM Plex Mono (font-mono) */}
              <div className="p-6 rounded-lg border border-line bg-black/[0.02]">
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-line">
                  <h3 className="text-base font-semibold text-ink">
                    IBM Plex Mono (Specs & Part Numbers)
                  </h3>
                  <span className="text-xs text-muted font-mono">--font-plex-mono</span>
                </div>
                <div className="space-y-4">
                  <div>
                    <span className="text-xs text-muted block mb-1">16px (1rem)</span>
                    <p className="font-mono text-[16px] text-ink font-normal tabular-nums">
                      {testString}
                    </p>
                  </div>
                  <div>
                    <span className="text-xs text-muted block mb-1">14px (0.875rem)</span>
                    <p className="font-mono text-[14px] text-ink font-normal tabular-nums">
                      {testString}
                    </p>
                  </div>
                  <div>
                    <span className="text-xs text-muted block mb-1">
                      12px (0.75rem - legal/caption only)
                    </span>
                    <p className="font-mono text-[12px] text-muted font-normal tabular-nums">
                      {testString}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Inline PartNumber Component Showcase */}
            <div className="mb-10 p-5 rounded-lg border border-line bg-paper flex flex-wrap items-center gap-3">
              <span className="text-sm font-semibold text-ink">
                Inline Part Number Component:
              </span>
              <PartNumber>SMM-1042-A</PartNumber>
              <PartNumber>SMM-8821-B</PartNumber>
              <span className="text-sm text-muted">
                (Standardized 14px monospace badge with subtle background)
              </span>
            </div>

            {/* Sample SpecTable */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-ink">
                  Technical Specifications Table (5 Rows)
                </h3>
                <span className="text-xs text-muted font-mono">SpecTable.tsx</span>
              </div>
              <SpecTable
                rows={sampleSpecs}
                caption="SMM-1042-A Critical Engineering Specifications"
                ariaLabel="SMM-1042-A Critical Engineering Specifications"
              />
            </div>
          </Reveal>
        </Container>
      </Section>
    </div>
  );
}

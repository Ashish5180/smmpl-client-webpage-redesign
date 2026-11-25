import React from "react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { TRUSTED_HEADER, HOME_STATS } from "@/lib/stats";
import { CLIENT_ROW_ONE, CLIENT_ROW_TWO } from "@/lib/clients";
import { StatsBand } from "./StatsBand";
import { ClientsMarquee } from "./ClientsMarquee";

export function TrustedSection() {
  return (
    <section
      id="trusted-by"
      aria-labelledby="trusted-by-heading"
      className="py-24 bg-paper text-ink border-t border-line overflow-hidden"
    >
      <Container>
        {/* Centered Header */}
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-14 md:mb-16">
            <p className="eyebrow text-brand mb-3 font-semibold">
              {TRUSTED_HEADER.eyebrow}
            </p>
            <h2
              id="trusted-by-heading"
              className="font-heading font-bold text-ink text-[clamp(1.85rem,3.6vw,2.85rem)] leading-[1.12] tracking-[-0.015em] text-balance"
            >
              {TRUSTED_HEADER.heading}
            </h2>
            <p className="text-neutral-600 text-base leading-[1.6] font-body mt-3">
              {TRUSTED_HEADER.subtext}
            </p>
          </div>
        </Reveal>

        {/* Stats Band */}
        <StatsBand stats={HOME_STATS} />

        {/* Two-Row Opposite-Direction CSS Marquee */}
        <ClientsMarquee rowOne={CLIENT_ROW_ONE} rowTwo={CLIENT_ROW_TWO} />
      </Container>
    </section>
  );
}

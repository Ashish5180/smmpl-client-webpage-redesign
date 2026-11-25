"use client";

import React, { useRef } from "react";
import { useInView } from "motion/react";
import { CountUp } from "./CountUp";
import type { StatItem } from "@/lib/stats";

interface StatsBandProps {
  stats: StatItem[];
}

export function StatsBand({ stats }: StatsBandProps) {
  const bandRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(bandRef, { once: true, amount: 0.3 });

  return (
    <div
      ref={bandRef}
      className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-line border-y border-line"
    >
      {stats.map((stat) => (
        <div
          key={stat._id}
          className="flex flex-col items-center justify-center text-center py-10 md:py-12 px-6"
        >
          {/* Small red 2px line above each number, 32px wide */}
          <span
            aria-hidden="true"
            className="w-8 h-[2px] bg-brand mb-4 inline-block"
          />

          <p className="font-heading font-semibold text-ink text-[clamp(3rem,5vw,5rem)] leading-none tracking-[-0.02em] tabular-nums">
            <CountUp
              value={stat.value}
              suffix={stat.suffix}
              duration={1600}
              inView={isInView}
            />
          </p>

          <p className="mt-3 text-xs sm:text-sm font-medium uppercase tracking-[0.12em] text-muted font-body">
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );
}

"use client";

import React from "react";
import type { HeroStat } from "@/lib/hero-slides";

interface HeroStatsProps {
  stats: HeroStat[];
}

export function HeroStats({ stats }: HeroStatsProps) {
  return (
    <div
      className="grid grid-cols-3 gap-2 sm:gap-3 sm:flex sm:flex-nowrap sm:items-center sm:gap-6"
      role="region"
      aria-label="Manufacturing specifications"
    >
      {stats.map((stat, idx) => (
        <React.Fragment key={stat.id}>
          <div className="flex flex-col whitespace-nowrap">
            <span className="font-mono text-[1.15rem] sm:text-[1.5rem] font-semibold text-ink tracking-tight tabular-nums leading-none">
              {stat.value}
            </span>
            <span className="text-[0.65rem] sm:text-[0.7rem] uppercase tracking-wider text-neutral-500 font-medium font-body mt-1">
              {stat.label}
            </span>
          </div>

          {/* Thin divider between stats on desktop */}
          {idx < stats.length - 1 && (
            <div
              className="hidden sm:block w-[1px] h-7 bg-black/10 self-center"
              aria-hidden="true"
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

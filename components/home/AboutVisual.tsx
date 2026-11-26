"use client";

import React from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import type { LeadershipMember } from "@/sanity/lib/queries";

interface AboutVisualProps {
  className?: string;
  leaders: LeadershipMember[];
}

export function AboutVisual({ className, leaders }: AboutVisualProps) {
  const prefersReduced = useReducedMotion();

  return (
    <div className={`relative w-full select-none ${className || ""}`}>
      {/* Frameless Leadership Presentation */}
      <div className="w-full max-w-[560px] mx-auto py-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-6 items-end">
          {leaders.map((leader, idx) => {
            const isSvg = leader.image.endsWith(".svg");

            return (
              <motion.div
                key={leader.id}
                initial={{ opacity: 0, y: prefersReduced ? 0 : 16 + idx * 4 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5 + idx * 0.05,
                  ease: "easeOut",
                  delay: idx * 0.1,
                }}
                className="flex flex-col items-center sm:items-start group"
              >
                {/* Portrait Viewport */}
                <div
                  className={`relative w-full max-w-[240px] aspect-[4/5] mx-auto sm:mx-0 flex items-center justify-center ${
                    isSvg ? "" : "rounded-2xl overflow-hidden bg-neutral-100"
                  }`}
                >
                  <Image
                    src={leader.image}
                    alt={leader.alt}
                    fill
                    sizes="(max-width: 640px) 80vw, 240px"
                    unoptimized={isSvg}
                    placeholder={leader.blurDataURL ? "blur" : "empty"}
                    blurDataURL={leader.blurDataURL}
                    className={`transition-transform duration-300 ease-out group-hover:scale-[1.02] ${
                      isSvg ? "object-contain" : "object-cover object-top"
                    }`}
                    priority={false}
                  />
                </div>

                {/* Clean Typographic Identification */}
                <div className="mt-4 text-center sm:text-left w-full">
                  <h3 className="font-heading font-bold text-ink text-lg sm:text-xl tracking-tight">
                    {leader.name}
                  </h3>
                  <p
                    className={`font-mono text-xs font-semibold uppercase tracking-wider mt-0.5 ${
                      leader.isPrimary ? "text-brand" : "text-neutral-600"
                    }`}
                  >
                    {leader.role}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

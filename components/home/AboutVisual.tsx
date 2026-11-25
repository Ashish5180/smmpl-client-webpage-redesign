"use client";

import React from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

interface AboutVisualProps {
  className?: string;
}

export function AboutVisual({ className }: AboutVisualProps) {
  const prefersReduced = useReducedMotion();

  return (
    <div className={`relative w-full select-none ${className || ""}`}>
      {/* Frameless Leadership Presentation: Mr. Arvind Rana & Mr. Anuj Kumar */}
      <div className="w-full max-w-[560px] mx-auto py-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-6 items-end">
          {/* Mr. Arvind Rana (MD) */}
          <motion.div
            initial={{ opacity: 0, y: prefersReduced ? 0 : 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex flex-col items-center sm:items-start group"
          >
            {/* Frameless Portrait Viewport */}
            <div className="relative w-full max-w-[240px] aspect-[4/5] mx-auto sm:mx-0 flex items-center justify-center">
              <Image
                src="/about/arvind-rana.svg"
                alt="Mr. Arvind Rana, MD - Shri Maruti Moulds India Private Limited"
                fill
                sizes="(max-width: 640px) 80vw, 240px"
                className="object-contain transition-transform duration-300 ease-out group-hover:scale-[1.02]"
                priority={false}
              />
            </div>

            {/* Clean Typographic Identification */}
            <div className="mt-4 text-center sm:text-left w-full">
              <h3 className="font-heading font-bold text-ink text-lg sm:text-xl tracking-tight">
                Mr. Arvind Rana
              </h3>
              <p className="font-mono text-xs font-semibold text-brand uppercase tracking-wider mt-0.5">
                MD
              </p>
            </div>
          </motion.div>

          {/* Mr. Anuj Kumar (GM - Business Development) */}
          <motion.div
            initial={{ opacity: 0, y: prefersReduced ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: "easeOut", delay: 0.1 }}
            className="flex flex-col items-center sm:items-start group"
          >
            {/* Frameless Portrait Viewport */}
            <div className="relative w-full max-w-[240px] aspect-[4/5] mx-auto sm:mx-0 flex items-center justify-center">
              <Image
                src="/about/anuj-kumar.svg"
                alt="Mr. Anuj Kumar, GM - Business Development - Shri Maruti Moulds India Private Limited"
                fill
                sizes="(max-width: 640px) 80vw, 240px"
                className="object-contain transition-transform duration-300 ease-out group-hover:scale-[1.02]"
                priority={false}
              />
            </div>

            {/* Clean Typographic Identification */}
            <div className="mt-4 text-center sm:text-left w-full">
              <h3 className="font-heading font-bold text-ink text-lg sm:text-xl tracking-tight">
                Mr. Anuj Kumar
              </h3>
              <p className="font-mono text-xs font-semibold text-neutral-600 uppercase tracking-wider mt-0.5">
                GM - Business Development
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
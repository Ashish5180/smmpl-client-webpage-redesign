"use client";

import React, { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

interface CountUpProps {
  value: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  inView?: boolean;
}

export function CountUp({
  value,
  duration = 1800,
  decimals = 0,
  prefix = "",
  suffix = "",
  inView = true,
}: CountUpProps) {
  const [displayValue, setDisplayValue] = useState<number>(0);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (!inView) return;

    if (prefersReduced) {
      setDisplayValue(value);
      return;
    }

    let startTimestamp: number | null = null;
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const elapsed = timestamp - startTimestamp;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-out cubic formula for natural deceleration
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = easeOut * value;

      setDisplayValue(current);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setDisplayValue(value);
      }
    };

    animationFrameId = requestAnimationFrame(step);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [value, duration, inView, prefersReduced]);

  const formatted =
    decimals > 0
      ? displayValue.toFixed(decimals)
      : Math.round(displayValue).toLocaleString();

  return (
    <span>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}


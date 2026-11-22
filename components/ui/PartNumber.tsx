import React from "react";
import { cn } from "@/lib/utils";

export interface PartNumberProps {
  children: React.ReactNode;
  className?: string;
}

export function PartNumber({ children, className }: PartNumberProps) {
  return (
    <code
      className={cn(
        "inline-block font-mono text-sm px-1.5 py-0.5 rounded bg-black/[0.06] text-ink font-normal tracking-tight border border-line/60 tabular-nums",
        className
      )}
    >
      {children}
    </code>
  );
}

import React from "react";
import { cn } from "@/lib/utils";

export type SectionVariant = "light" | "dark";

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  variant?: SectionVariant;
  children: React.ReactNode;
  className?: string;
}

export function Section({
  variant = "light",
  children,
  className,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(
        "py-16 md:py-24",
        variant === "dark" ? "bg-ink text-paper" : "bg-paper text-ink",
        className
      )}
      {...props}
    >
      {children}
    </section>
  );
}

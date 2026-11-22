import React from "react";
import { cn } from "@/lib/utils";

export interface SpecRow {
  label: string;
  value: string | number;
  unit?: string;
}

export interface SpecTableProps {
  rows: SpecRow[];
  ariaLabel?: string;
  caption?: string;
  className?: string;
}

export function SpecTable({
  rows,
  ariaLabel = "Technical Specifications",
  caption,
  className,
}: SpecTableProps) {
  return (
    <div
      role="region"
      aria-label={ariaLabel}
      tabIndex={0}
      className={cn(
        "w-full overflow-x-auto border border-line rounded-lg focus-visible:outline-2 focus-visible:outline-brand",
        className
      )}
    >
      <table className="w-full min-w-[320px] text-left text-sm border-collapse">
        {caption && <caption className="sr-only">{caption}</caption>}
        <tbody className="divide-y divide-line">
          {rows.map((row, idx) => (
            <tr
              key={idx}
              className="odd:bg-paper even:bg-black/[0.02] hover:bg-black/[0.04] transition-colors"
            >
              <th
                scope="row"
                className="py-3 px-4 text-muted font-normal text-sm w-1/2 align-top"
              >
                {row.label}
              </th>
              <td className="py-3 px-4 font-mono text-ink text-sm tabular-nums w-1/2 align-top font-normal">
                {row.value}
                {row.unit && <span className="ml-1 text-muted font-mono">{row.unit}</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

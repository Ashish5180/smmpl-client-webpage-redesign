"use client";

import React, { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { QUOTE_JOB_CARD_CONFIG } from "@/lib/quote-config";

export interface JobCardData {
  product: string;
  industry: string;
  quantity: string;
  timeline: string;
  files: string;
  contact: string;
}

interface JobCardProps {
  reference: string;
  data: JobCardData;
  submitted: boolean;
  variant?: "desktop" | "mobile";
}

function TypedMonoValue({
  value,
  emptyLabel,
}: {
  value: string;
  emptyLabel: string;
}) {
  const prefersReduced = useReducedMotion();
  const [typedLen, setTypedLen] = useState<number>(value.length);

  useEffect(() => {
    if (!value || prefersReduced) {
      return;
    }

    let index = 0;
    const resetTimer = setTimeout(() => setTypedLen(0), 0);
    const interval = setInterval(() => {
      index += 1;
      setTypedLen(index);
      if (index >= value.length) {
        clearInterval(interval);
      }
    }, 30);

    return () => {
      clearTimeout(resetTimer);
      clearInterval(interval);
    };
  }, [value, prefersReduced]);

  if (!value) {
    return <span className="text-gray-400">{emptyLabel}</span>;
  }

  const isTyping = !prefersReduced && typedLen < value.length;
  const displayed = prefersReduced ? value : value.slice(0, typedLen);

  return (
    <span className="text-ink break-words inline-flex items-center justify-end gap-0.5">
      <span>{displayed}</span>
      {isTyping && (
        <span
          aria-hidden="true"
          className="inline-block w-[6px] h-[13px] bg-brand align-middle"
        />
      )}
    </span>
  );
}

function JobCardRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  const prefersReduced = useReducedMotion();
  const isSet = Boolean(value);

  return (
    <div className="relative py-3.5 flex items-start justify-between gap-4 font-mono text-xs">
      <dt className="flex items-center gap-2.5 text-muted shrink-0 pt-0.5">
        <motion.span
          key={value ? `${label}-set` : `${label}-empty`}
          initial={
            isSet && !prefersReduced ? { scale: 1.9 } : { scale: 1 }
          }
          animate={{ scale: 1 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          aria-hidden="true"
          className={`w-1.5 h-1.5 rounded-full transition-colors duration-200 ${
            isSet ? "bg-brand" : "bg-gray-300"
          }`}
        />
        <span className={isSet ? "text-ink" : "text-muted"}>{label}</span>
      </dt>
      <dd className="text-right font-medium max-w-[65%]">
        <TypedMonoValue
          value={value}
          emptyLabel={QUOTE_JOB_CARD_CONFIG.emptyValue}
        />
      </dd>
    </div>
  );
}

function JobCardBody({
  reference,
  data,
  submitted,
  filledCount,
}: {
  reference: string;
  data: JobCardData;
  submitted: boolean;
  filledCount: number;
}) {
  const prefersReduced = useReducedMotion();
  const total = QUOTE_JOB_CARD_CONFIG.totalFields;
  const percent = Math.round((filledCount / total) * 100);

  return (
    <div
      className="relative rounded-3xl border border-gray-200 bg-paper p-6 sm:p-7 shadow-[0_24px_48px_-24px_rgba(0,0,0,0.06)] overflow-hidden"
      style={{
        backgroundImage:
          "linear-gradient(to right, rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.03) 1px, transparent 1px)",
        backgroundSize: "24px 24px",
      }}
    >
      {/* Flat Red SUBMITTED Stamp */}
      {submitted && (
        <motion.div
          initial={
            prefersReduced
              ? { opacity: 1, rotate: -3, scale: 1 }
              : { opacity: 0, rotate: 8, scale: 1.4 }
          }
          animate={{ opacity: 1, rotate: -3, scale: 1 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="pointer-events-none absolute top-14 right-6 z-10 border-2 border-brand px-3.5 py-1 rounded-md bg-paper font-mono text-xs font-bold tracking-widest text-brand uppercase"
        >
          {QUOTE_JOB_CARD_CONFIG.stampLabel}
        </motion.div>
      )}

      {/* Header Row */}
      <div className="flex items-center justify-between gap-3 pb-4 border-b border-gray-200">
        <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">
          {QUOTE_JOB_CARD_CONFIG.headerLabel}
        </span>
        <span className="font-mono text-xs font-semibold text-ink tabular-nums">
          {reference}
        </span>
      </div>

      {/* Spec Rows */}
      <dl className="divide-y divide-gray-200/80 my-2">
        {QUOTE_JOB_CARD_CONFIG.rows.map((row) => (
          <JobCardRow key={row.key} label={row.label} value={data[row.key]} />
        ))}
      </dl>

      {/* Completeness Meter */}
      <div className="pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between text-xs font-mono text-muted mb-2">
          <span>COMPLETENESS</span>
          <span className="tabular-nums text-ink font-medium">
            {filledCount} of {total} fields
          </span>
        </div>
        <div className="h-[2px] w-full bg-gray-200 overflow-hidden">
          <motion.div
            className="h-full bg-brand"
            initial={false}
            animate={{ width: `${percent}%` }}
            transition={
              prefersReduced
                ? { duration: 0.1 }
                : { type: "spring", stiffness: 320, damping: 28 }
            }
          />
        </div>
      </div>
    </div>
  );
}

export function JobCard({
  reference,
  data,
  submitted,
  variant = "desktop",
}: JobCardProps) {
  const [expanded, setExpanded] = useState(false);

  const filledCount = QUOTE_JOB_CARD_CONFIG.rows.filter((r) =>
    Boolean(data[r.key])
  ).length;

  if (variant === "mobile") {
    return (
      <div className="lg:hidden mb-4">
        <button
          type="button"
          aria-expanded={expanded}
          aria-controls="mobile-job-card-panel"
          onClick={() => setExpanded((prev) => !prev)}
          className="w-full min-h-[48px] px-4 py-3 rounded-2xl border border-gray-200 bg-paper flex items-center justify-between gap-3 text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-brand-action"
        >
          <div className="flex items-center gap-3 min-w-0">
            <span className="font-mono text-xs font-semibold text-ink tabular-nums shrink-0">
              {reference}
            </span>
            <span className="text-xs text-muted truncate font-mono">
              {filledCount} of {QUOTE_JOB_CARD_CONFIG.totalFields} fields
              {data.product ? ` · ${data.product}` : ""}
            </span>
          </div>
          <ChevronDown
            className={`w-4 h-4 text-muted shrink-0 transition-transform duration-200 ${
              expanded ? "rotate-180" : ""
            }`}
            aria-hidden="true"
          />
        </button>

        {expanded && (
          <div id="mobile-job-card-panel" className="mt-3">
            <JobCardBody
              reference={reference}
              data={data}
              submitted={submitted}
              filledCount={filledCount}
            />
          </div>
        )}
      </div>
    );
  }

  return (
    <JobCardBody
      reference={reference}
      data={data}
      submitted={submitted}
      filledCount={filledCount}
    />
  );
}

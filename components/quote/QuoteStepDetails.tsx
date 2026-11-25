"use client";

import React, { useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Upload, X, FileText } from "lucide-react";
import {
  QUOTE_DETAILS_CONFIG,
  QUOTE_FILE_RULES,
} from "@/lib/quote-config";
import { formatFileSize, validateQuoteFile } from "@/lib/quote-schema";

interface QuoteStepDetailsProps {
  message: string;
  files: File[];
  error?: string;
  onChangeMessage: (val: string) => void;
  onBlurMessage: () => void;
  onChangeFiles: (files: File[]) => void;
  firstFieldRef: React.RefObject<HTMLTextAreaElement | null>;
}

export function QuoteStepDetails({
  message,
  files,
  error,
  onChangeMessage,
  onBlurMessage,
  onChangeFiles,
  firstFieldRef,
}: QuoteStepDetailsProps) {
  const [fileError, setFileError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const prefersReduced = useReducedMotion();

  const addFiles = (incoming: FileList | null) => {
    if (!incoming || incoming.length === 0) return;
    setFileError(null);

    const next = [...files];
    for (const file of Array.from(incoming)) {
      if (next.length >= QUOTE_FILE_RULES.maxFiles) {
        setFileError(`Maximum ${QUOTE_FILE_RULES.maxFiles} files allowed.`);
        break;
      }
      const validationMsg = validateQuoteFile(file);
      if (validationMsg) {
        setFileError(validationMsg);
        continue;
      }
      const duplicate = next.some(
        (f) => f.name === file.name && f.size === file.size
      );
      if (!duplicate) {
        next.push(file);
      }
    }

    onChangeFiles(next);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeFile = (index: number) => {
    setFileError(null);
    onChangeFiles(files.filter((_, i) => i !== index));
  };

  const charCount = message.length;
  const charRatio = Math.min(
    charCount / QUOTE_DETAILS_CONFIG.messageMaxLength,
    1
  );

  return (
    <div className="space-y-6">
      {/* Message / Requirements Textarea with Live Gauge Bar */}
      <div>
        <div className="flex items-baseline justify-between gap-2 mb-2">
          <label
            htmlFor="quote-message"
            className="text-sm font-medium text-ink"
          >
            Requirements / Specifications <span className="text-brand">*</span>
          </label>
          <span
            className={`font-mono text-xs tabular-nums transition-colors ${
              charCount > QUOTE_DETAILS_CONFIG.messageMaxLength * 0.9
                ? "text-brand font-semibold"
                : "text-muted"
            }`}
          >
            {charCount} / {QUOTE_DETAILS_CONFIG.messageMaxLength}
          </span>
        </div>

        <div
          className={`relative rounded-xl border bg-paper overflow-hidden transition-colors ${
            error
              ? "border-brand"
              : "border-gray-200 focus-within:border-ink"
          }`}
        >
          <textarea
            ref={firstFieldRef}
            id="quote-message"
            rows={5}
            value={message}
            maxLength={QUOTE_DETAILS_CONFIG.messageMaxLength}
            onChange={(e) => onChangeMessage(e.target.value)}
            onBlur={onBlurMessage}
            placeholder={QUOTE_DETAILS_CONFIG.messagePlaceholder}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? "quote-message-error" : undefined}
            className="w-full p-3.5 bg-transparent text-sm text-ink placeholder:text-gray-400 resize-y focus:outline-none"
          />
          <div className="h-[2px] w-full bg-gray-100">
            <motion.div
              className={`h-full origin-left ${
                charRatio > 0.9 ? "bg-brand" : "bg-ink"
              }`}
              initial={false}
              animate={{ scaleX: charRatio }}
              transition={{ duration: 0.12, ease: "easeOut" }}
            />
          </div>
        </div>

        {error && (
          <p
            id="quote-message-error"
            role="alert"
            className="mt-2 text-sm text-brand font-medium"
          >
            {error}
          </p>
        )}
      </div>

      {/* Optional Drawings Dropzone with Corner Registration Brackets */}
      <div>
        <span className="block text-sm font-medium text-ink mb-2">
          Drawings or CAD Files (Optional)
        </span>

        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragging(false);
            addFiles(e.dataTransfer.files);
          }}
          className={`relative rounded-xl border border-dashed p-5 text-center transition-colors ${
            isDragging
              ? "border-brand bg-brand/[0.03]"
              : "border-gray-300 bg-neutral-50/70"
          }`}
        >
          {/* Animated Corner Brackets */}
          <motion.span
            aria-hidden="true"
            animate={{
              scale: isDragging && !prefersReduced ? 0.96 : 1,
              opacity: isDragging ? 1 : 0.35,
            }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-none absolute inset-2.5"
          >
            <span className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-brand" />
            <span className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-brand" />
            <span className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b border-l border-brand" />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r border-brand" />
          </motion.span>

          <input
            ref={fileInputRef}
            id="quote-files-input"
            type="file"
            multiple
            accept={QUOTE_FILE_RULES.acceptedExtensions.join(",")}
            onChange={(e) => addFiles(e.target.files)}
            className="sr-only"
          />

          <label
            htmlFor="quote-files-input"
            className="relative z-10 inline-flex flex-col items-center cursor-pointer focus-within:outline-2 focus-within:outline-brand-action"
          >
            <Upload
              className={`w-5 h-5 mb-2 transition-colors ${
                isDragging ? "text-brand" : "text-muted"
              }`}
              aria-hidden="true"
            />
            <span className="text-sm font-medium text-ink">
              {QUOTE_DETAILS_CONFIG.dropzoneTitle}
            </span>
            <span className="text-xs text-muted mt-1">
              {QUOTE_DETAILS_CONFIG.dropzoneHint}
            </span>
            <span className="mt-3 inline-flex items-center min-h-[44px] px-4 rounded-lg border border-gray-200 bg-paper text-xs font-semibold text-ink hover:border-gray-400 transition-colors">
              Browse files
            </span>
          </label>
        </div>

        {fileError && (
          <p role="alert" className="mt-2 text-sm text-brand font-medium">
            {fileError}
          </p>
        )}

        <ul className="mt-3 space-y-2" aria-label="Attached files">
          <AnimatePresence initial={false}>
            {files.map((file, idx) => (
              <motion.li
                key={`${file.name}-${file.size}`}
                initial={
                  prefersReduced ? { opacity: 0 } : { opacity: 0, x: -16 }
                }
                animate={{ opacity: 1, x: 0 }}
                exit={
                  prefersReduced ? { opacity: 0 } : { opacity: 0, x: 16 }
                }
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-lg border border-gray-200 bg-paper"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <FileText
                    className="w-4 h-4 text-brand shrink-0"
                    aria-hidden="true"
                  />
                  <span className="text-sm font-medium text-ink truncate">
                    {file.name}
                  </span>
                  <span className="font-mono text-xs text-muted shrink-0">
                    {formatFileSize(file.size)}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => removeFile(idx)}
                  aria-label={`Remove ${file.name}`}
                  className="min-w-[44px] min-h-[44px] -my-2 -mr-2 flex items-center justify-center text-muted hover:text-brand transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-brand-action rounded-md"
                >
                  <X className="w-4 h-4" aria-hidden="true" />
                </button>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </div>
    </div>
  );
}

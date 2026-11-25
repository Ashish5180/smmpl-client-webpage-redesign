"use client";

import React, { useEffect, useRef } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import type { FieldErrors, UseFormRegister } from "react-hook-form";
import { QUOTE_CONTACT_CONFIG } from "@/lib/quote-config";
import type { QuoteFormValues } from "@/lib/quote-schema";

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        options: {
          sitekey: string;
          callback: (token: string) => void;
          "expired-callback"?: () => void;
        }
      ) => string;
      remove: (widgetId: string) => void;
    };
  }
}

interface QuoteStepContactProps {
  register: UseFormRegister<QuoteFormValues>;
  errors: FieldErrors<QuoteFormValues>;
  phone: string;
  onPhoneChange: (val: string) => void;
  onPhoneBlur: () => void;
  onTurnstileToken: (token: string) => void;
  firstFieldRef: React.RefObject<HTMLInputElement | null>;
}

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

export function QuoteStepContact({
  register,
  errors,
  phone,
  onPhoneChange,
  onPhoneBlur,
  onTurnstileToken,
  firstFieldRef,
}: QuoteStepContactProps) {
  const turnstileContainerRef = useRef<HTMLDivElement | null>(null);
  const nameField = register("name");

  useEffect(() => {
    if (!TURNSTILE_SITE_KEY || !turnstileContainerRef.current) return;

    let widgetId: string | undefined;
    const renderWidget = () => {
      if (window.turnstile && turnstileContainerRef.current) {
        widgetId = window.turnstile.render(turnstileContainerRef.current, {
          sitekey: TURNSTILE_SITE_KEY,
          callback: (token) => onTurnstileToken(token),
          "expired-callback": () => onTurnstileToken(""),
        });
      }
    };

    if (window.turnstile) {
      renderWidget();
    } else {
      const script = document.createElement("script");
      script.src =
        "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      script.async = true;
      script.defer = true;
      script.onload = renderWidget;
      document.head.appendChild(script);
    }

    return () => {
      if (widgetId && window.turnstile) {
        window.turnstile.remove(widgetId);
      }
    };
  }, [onTurnstileToken]);

  const inputBase =
    "w-full min-h-[44px] px-3.5 py-2.5 rounded-xl border bg-paper text-sm text-ink placeholder:text-gray-400 transition-colors focus-visible:outline-2 focus-visible:outline-brand-action";

  return (
    <div className="space-y-5">
      {/* Hidden Honeypot Field */}
      <div className="sr-only" aria-hidden="true">
        <label htmlFor="quote-website">Website</label>
        <input
          id="quote-website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("website")}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Full Name (Required) */}
        <div>
          <label
            htmlFor="quote-name"
            className="block text-sm font-medium text-ink mb-1.5"
          >
            Full name <span className="text-brand">*</span>
          </label>
          <input
            id="quote-name"
            type="text"
            autoComplete="name"
            placeholder="Rajesh Sharma"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "quote-name-error" : undefined}
            {...nameField}
            ref={(el) => {
              nameField.ref(el);
              firstFieldRef.current = el;
            }}
            className={`${inputBase} ${
              errors.name
                ? "border-brand"
                : "border-gray-200 focus:border-brand-action"
            }`}
          />
          {errors.name?.message && (
            <p
              id="quote-name-error"
              role="alert"
              className="mt-1.5 text-xs text-brand font-medium"
            >
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Company (Optional) */}
        <div>
          <label
            htmlFor="quote-company"
            className="block text-sm font-medium text-ink mb-1.5"
          >
            Company (Optional)
          </label>
          <input
            id="quote-company"
            type="text"
            autoComplete="organization"
            placeholder="Company name"
            {...register("company")}
            className={`${inputBase} border-gray-200 focus:border-brand-action`}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Email (Required) */}
        <div>
          <label
            htmlFor="quote-email"
            className="block text-sm font-medium text-ink mb-1.5"
          >
            Email <span className="text-brand">*</span>
          </label>
          <input
            id="quote-email"
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "quote-email-error" : undefined}
            {...register("email")}
            className={`${inputBase} ${
              errors.email
                ? "border-brand"
                : "border-gray-200 focus:border-brand-action"
            }`}
          />
          {errors.email?.message && (
            <p
              id="quote-email-error"
              role="alert"
              className="mt-1.5 text-xs text-brand font-medium"
            >
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Phone (Required, India +91 default) */}
        <div>
          <label
            htmlFor="quote-phone"
            className="block text-sm font-medium text-ink mb-1.5"
          >
            Phone <span className="text-brand">*</span>
          </label>
          <PhoneInput
            id="quote-phone"
            defaultCountry="IN"
            international
            countryCallingCodeEditable={false}
            value={phone}
            onChange={(val) => onPhoneChange(val ?? "")}
            onBlur={onPhoneBlur}
            className={`quote-phone-input min-h-[44px] px-3.5 py-2 rounded-xl border bg-paper transition-colors focus-within:outline-2 focus-within:outline-brand-action ${
              errors.phone ? "border-brand" : "border-gray-200"
            }`}
          />
          {errors.phone?.message && (
            <p
              id="quote-phone-error"
              role="alert"
              className="mt-1.5 text-xs text-brand font-medium"
            >
              {errors.phone.message}
            </p>
          )}
        </div>
      </div>

      {/* Consent Checkbox (Optional) */}
      <label className="flex items-start gap-3 min-h-[44px] py-2 cursor-pointer select-none">
        <input
          type="checkbox"
          {...register("consent")}
          className="mt-0.5 w-4 h-4 accent-brand-action rounded border-gray-300 cursor-pointer focus-visible:outline-2 focus-visible:outline-brand-action"
        />
        <span className="text-sm text-neutral-600">
          {QUOTE_CONTACT_CONFIG.consentLabel}
        </span>
      </label>

      {TURNSTILE_SITE_KEY && (
        <div ref={turnstileContainerRef} className="pt-1" />
      )}
    </div>
  );
}

"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/lib/site";
import { QUOTE_CONTACT_CONFIG, QUOTE_HEADER } from "@/lib/quote-config";
import {
  QUOTE_DEFAULT_VALUES,
  quoteZodResolver,
  maskEmail,
  maskPhone,
  type QuoteFormValues,
} from "@/lib/quote-schema";
import { JobCard, type JobCardData } from "./JobCard";
import { QuoteProgress } from "./QuoteProgress";
import { QuoteStepProduct } from "./QuoteStepProduct";
import { QuoteStepProject } from "./QuoteStepProject";
import { QuoteStepDetails } from "./QuoteStepDetails";
import { QuoteStepContact } from "./QuoteStepContact";
import { QuoteSuccess } from "./QuoteSuccess";

export interface QuoteBuilderProps {
  asHeadingOne?: boolean;
  className?: string;
}

export function QuoteBuilder({
  asHeadingOne = false,
  className = "",
}: QuoteBuilderProps) {
  const [step, setStep] = useState<number>(1);
  const [maxVisitedStep, setMaxVisitedStep] = useState<number>(1);
  const [direction, setDirection] = useState<number>(1);
  const [files, setFiles] = useState<File[]>([]);
  const [turnstileToken, setTurnstileToken] = useState<string>("");
  const [reference, setReference] = useState<string>("QT-2026-0000");
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const prefersReduced = useReducedMotion();

  const productFirstRef = useRef<HTMLButtonElement | null>(null);
  const projectFirstRef = useRef<HTMLButtonElement | null>(null);
  const detailsFirstRef = useRef<HTMLTextAreaElement | null>(null);
  const contactFirstRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const year = new Date().getFullYear();
      const rand = Math.floor(1000 + Math.random() * 9000);
      setReference(`QT-${year}-${rand}`);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const {
    register,
    control,
    setValue,
    trigger,
    handleSubmit,
    formState: { errors },
  } = useForm<QuoteFormValues>({
    resolver: quoteZodResolver,
    defaultValues: QUOTE_DEFAULT_VALUES,
    mode: "onBlur",
  });

  const watched = useWatch({ control });
  const values: QuoteFormValues = { ...QUOTE_DEFAULT_VALUES, ...watched };

  const focusStepFirstField = useCallback((targetStep: number) => {
    setTimeout(() => {
      if (targetStep === 1) productFirstRef.current?.focus();
      if (targetStep === 2) projectFirstRef.current?.focus();
      if (targetStep === 3) detailsFirstRef.current?.focus();
      if (targetStep === 4) contactFirstRef.current?.focus();
    }, 270);
  }, []);

  const goToStep = useCallback(
    (targetStep: number) => {
      setSubmitError(null);
      setDirection(targetStep > step ? 1 : -1);
      setStep(targetStep);
      setMaxVisitedStep((prev) => Math.max(prev, targetStep));
      focusStepFirstField(targetStep);
    },
    [step, focusStepFirstField]
  );

  const handleNext = async () => {
    setSubmitError(null);
    if (step === 1 && !(await trigger("product"))) {
      productFirstRef.current?.focus();
      return;
    }
    if (step === 3 && !(await trigger("message"))) {
      detailsFirstRef.current?.focus();
      return;
    }
    if (step < 4) goToStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) goToStep(step - 1);
  };

  const handleFormKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key !== "Enter") return;
    const tag = (e.target as HTMLElement).tagName;
    if (tag === "TEXTAREA" || tag === "BUTTON") return;
    if (step < 4) {
      e.preventDefault();
      void handleNext();
    }
  };

  const onSubmit = async (data: QuoteFormValues) => {
    setSubmitError(null);
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("reference", reference);
      formData.append("product", data.product);
      formData.append("industry", data.industry);
      formData.append("industryOther", data.industryOther);
      formData.append("quantity", data.quantity);
      formData.append("timeline", data.timeline);
      formData.append("message", data.message);
      formData.append("name", data.name);
      formData.append("company", data.company);
      formData.append("email", data.email);
      formData.append("phone", data.phone);
      formData.append("consent", String(data.consent));
      formData.append("website", data.website);
      if (turnstileToken) formData.append("turnstileToken", turnstileToken);
      for (const file of files) formData.append("files", file);

      const res = await fetch("/api/quote", { method: "POST", body: formData });
      const json = (await res.json()) as {
        ok?: boolean;
        reference?: string;
        error?: string;
      };

      if (!res.ok || !json.ok) {
        throw new Error(json.error || "Unable to send your enquiry right now.");
      }
      setSubmittedRef(json.reference || reference);
    } catch (err) {
      setSubmitError(
        err instanceof Error
          ? err.message
          : "Something went wrong while sending your enquiry."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const industryDisplay =
    values.industry === "Other" && values.industryOther.trim()
      ? values.industryOther.trim()
      : values.industry;

  const jobCardData: JobCardData = {
    product: values.product,
    industry: industryDisplay,
    quantity: values.quantity,
    timeline: values.timeline,
    files:
      files.length > 0
        ? `${files.length} file${files.length > 1 ? "s" : ""}`
        : "",
    contact: [maskEmail(values.email), maskPhone(values.phone)]
      .filter(Boolean)
      .join(" · "),
  };

  const HeadingTag = asHeadingOne ? "h1" : "h2";

  return (
    <section
      id="get-a-quote"
      aria-labelledby="get-a-quote-heading"
      className={`py-16 md:py-24 bg-paper text-ink border-t border-line ${className}`}
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-[55fr_45fr] gap-10 lg:gap-12 xl:gap-16 items-start">
          <div>
            {/* Editorial Header Reveal */}
            <motion.div
              initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="mb-8"
            >
              <div className="flex items-center gap-2.5 mb-3">
                <span className="w-6 h-[2px] bg-brand inline-block" />
                <span className="text-xs font-semibold tracking-wider uppercase text-brand font-body">
                  {QUOTE_HEADER.eyebrow}
                </span>
              </div>

              <HeadingTag
                id="get-a-quote-heading"
                className="font-heading font-bold text-ink text-[clamp(2.15rem,4vw,3.35rem)] leading-[1.06] tracking-[-0.02em] text-balance"
              >
                {QUOTE_HEADER.heading}
              </HeadingTag>

              <p className="text-neutral-600 text-base leading-[1.6] font-body mt-3 max-w-[60ch]">
                {QUOTE_HEADER.subtext}
              </p>
            </motion.div>

            {submittedRef ? (
              <QuoteSuccess reference={submittedRef} />
            ) : (
              <div>
                <QuoteProgress
                  currentStep={step}
                  maxVisitedStep={maxVisitedStep}
                  onJumpToStep={goToStep}
                />

                <form
                  onSubmit={handleSubmit(onSubmit)}
                  onKeyDown={handleFormKeyDown}
                  noValidate
                >
                  <div className="min-h-[310px] overflow-x-clip">
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.div
                        key={step}
                        initial={
                          prefersReduced
                            ? { opacity: 0 }
                            : { opacity: 0, x: direction * 24 }
                        }
                        animate={{ opacity: 1, x: 0 }}
                        exit={
                          prefersReduced
                            ? { opacity: 0 }
                            : { opacity: 0, x: direction * -24 }
                        }
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                      >
                        {step === 1 && (
                          <QuoteStepProduct
                            selectedProduct={values.product}
                            error={errors.product?.message}
                            firstFieldRef={productFirstRef}
                            onSelect={(id) =>
                              setValue("product", id, { shouldValidate: true })
                            }
                          />
                        )}

                        {step === 2 && (
                          <QuoteStepProject
                            industry={values.industry}
                            industryOther={values.industryOther}
                            quantity={values.quantity}
                            timeline={values.timeline}
                            firstFieldRef={projectFirstRef}
                            onSelectIndustry={(val) =>
                              setValue("industry", val)
                            }
                            onChangeIndustryOther={(val) =>
                              setValue("industryOther", val)
                            }
                            onSelectQuantity={(val) =>
                              setValue("quantity", val)
                            }
                            onSelectTimeline={(val) =>
                              setValue("timeline", val)
                            }
                          />
                        )}

                        {step === 3 && (
                          <QuoteStepDetails
                            message={values.message}
                            files={files}
                            error={errors.message?.message}
                            firstFieldRef={detailsFirstRef}
                            onChangeMessage={(val) =>
                              setValue("message", val, { shouldDirty: true })
                            }
                            onBlurMessage={() => void trigger("message")}
                            onChangeFiles={setFiles}
                          />
                        )}

                        {step === 4 && (
                          <QuoteStepContact
                            register={register}
                            errors={errors}
                            phone={values.phone}
                            firstFieldRef={contactFirstRef}
                            onPhoneChange={(val) =>
                              setValue("phone", val, { shouldDirty: true })
                            }
                            onPhoneBlur={() => void trigger("phone")}
                            onTurnstileToken={setTurnstileToken}
                          />
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Mobile Collapsible Job Card Summary above Next/Back */}
                  <div className="mt-8">
                    <JobCard
                      reference={reference}
                      data={jobCardData}
                      submitted={Boolean(submittedRef)}
                      variant="mobile"
                    />
                  </div>

                  {/* Inline Failure + Call Us Fallback */}
                  {submitError && (
                    <div
                      role="alert"
                      className="mb-5 p-4 rounded-xl border border-brand bg-brand/5 text-sm text-ink flex flex-wrap items-center justify-between gap-3"
                    >
                      <span>{submitError}</span>
                      <a
                        href={`tel:${siteConfig.contact.phonePrimary}`}
                        className="inline-flex items-center gap-1.5 font-semibold text-brand-action hover:underline min-h-[44px]"
                      >
                        <Phone className="w-4 h-4" aria-hidden="true" />
                        <span>Call us ({siteConfig.contact.phonePrimary})</span>
                      </a>
                    </div>
                  )}

                  {/* Navigation Controls */}
                  <div className="flex items-center justify-between gap-4 pt-4 border-t border-gray-200">
                    {step > 1 ? (
                      <motion.button
                        type="button"
                        whileTap={prefersReduced ? undefined : { scale: 0.97 }}
                        onClick={handleBack}
                        className="min-h-[48px] px-5 rounded-lg border border-gray-200 bg-paper text-sm font-medium text-ink hover:border-gray-400 transition-colors inline-flex items-center gap-2 cursor-pointer focus-visible:outline-2 focus-visible:outline-brand-action"
                      >
                        <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                        <span>Back</span>
                      </motion.button>
                    ) : (
                      <span />
                    )}

                    {step < 4 ? (
                      <motion.button
                        type="button"
                        whileTap={prefersReduced ? undefined : { scale: 0.97 }}
                        onClick={() => void handleNext()}
                        className="group min-h-[48px] px-7 rounded-lg bg-brand-action hover:bg-brand-dark text-paper text-sm font-semibold transition-colors inline-flex items-center gap-2 cursor-pointer focus-visible:outline-2 focus-visible:outline-brand-action focus-visible:outline-offset-2"
                      >
                        <span>Next</span>
                        <ArrowRight
                          className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-0.5"
                          aria-hidden="true"
                        />
                      </motion.button>
                    ) : (
                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        whileTap={prefersReduced ? undefined : { scale: 0.97 }}
                        className="group min-h-[48px] px-7 rounded-lg bg-brand-action hover:bg-brand-dark disabled:opacity-60 text-paper text-sm font-semibold transition-colors inline-flex items-center gap-2 cursor-pointer focus-visible:outline-2 focus-visible:outline-brand-action focus-visible:outline-offset-2"
                      >
                        <span>
                          {isSubmitting
                            ? QUOTE_CONTACT_CONFIG.submittingLabel
                            : QUOTE_CONTACT_CONFIG.submitLabel}
                        </span>
                        <ArrowRight
                          className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-0.5"
                          aria-hidden="true"
                        />
                      </motion.button>
                    )}
                  </div>
                </form>
              </div>
            )}
          </div>

          {/* Right Column (Desktop Sticky Job Card) */}
          <div className="hidden lg:block lg:sticky lg:top-24">
            <JobCard
              reference={reference}
              data={jobCardData}
              submitted={Boolean(submittedRef)}
              variant="desktop"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}

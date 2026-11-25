import { z } from "zod";
import { isValidPhoneNumber } from "libphonenumber-js/min";
import type { FieldError, FieldErrors, Resolver } from "react-hook-form";
import { QUOTE_DETAILS_CONFIG, QUOTE_FILE_RULES } from "./quote-config";

export const quoteSchema = z.object({
  // 5 required fields only
  product: z.string().trim().min(1, "Please select a product category."),
  message: z
    .string()
    .trim()
    .min(1, "Please enter your requirements.")
    .max(
      QUOTE_DETAILS_CONFIG.messageMaxLength,
      `Message must be ${QUOTE_DETAILS_CONFIG.messageMaxLength} characters or fewer.`
    ),
  name: z
    .string()
    .trim()
    .min(2, "Please enter your full name.")
    .max(120, "Name must be 120 characters or fewer."),
  email: z.string().trim().email("Please enter a valid email address."),
  phone: z
    .string()
    .trim()
    .min(1, "Please enter your phone number.")
    .refine(
      (val) => isValidPhoneNumber(val),
      "Please enter a valid phone number with country code."
    ),

  // Optional fields
  industry: z.string().trim(),
  industryOther: z
    .string()
    .trim()
    .max(120, "Industry name must be 120 characters or fewer."),
  quantity: z.string().trim(),
  timeline: z.string().trim(),
  company: z
    .string()
    .trim()
    .max(120, "Company name must be 120 characters or fewer."),
  consent: z.boolean(),
  website: z.string(), // Honeypot field
});

export type QuoteFormValues = z.infer<typeof quoteSchema>;

export const QUOTE_DEFAULT_VALUES: QuoteFormValues = {
  product: "",
  industry: "",
  industryOther: "",
  quantity: "",
  timeline: "",
  message: "",
  name: "",
  company: "",
  email: "",
  phone: "",
  consent: false,
  website: "",
};

/**
 * Strongly typed React Hook Form resolver backed by the shared Zod schema.
 */
export const quoteZodResolver: Resolver<QuoteFormValues> = async (values) => {
  const result = quoteSchema.safeParse(values);
  if (result.success) {
    return { values: result.data, errors: {} };
  }

  const errors: FieldErrors<QuoteFormValues> = {};
  for (const issue of result.error.issues) {
    const fieldName = issue.path[0];
    if (typeof fieldName === "string" && fieldName in QUOTE_DEFAULT_VALUES) {
      const key = fieldName as keyof QuoteFormValues;
      if (!errors[key]) {
        const err: FieldError = {
          type: issue.code,
          message: issue.message,
        };
        errors[key] = err;
      }
    }
  }

  return { values: {}, errors };
};

export function validateQuoteFile(file: {
  name: string;
  size: number;
}): string | null {
  const lower = file.name.toLowerCase();
  const hasValidExt = QUOTE_FILE_RULES.acceptedExtensions.some((ext) =>
    lower.endsWith(ext)
  );
  if (!hasValidExt) {
    return `"${file.name}" is not a supported format (${QUOTE_FILE_RULES.acceptedDisplay}).`;
  }
  if (file.size > QUOTE_FILE_RULES.maxFileSizeBytes) {
    return `"${file.name}" exceeds the ${QUOTE_FILE_RULES.maxFileSizeLabel} limit.`;
  }
  return null;
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function maskEmail(email: string): string {
  const trimmed = email.trim();
  const atIndex = trimmed.indexOf("@");
  if (atIndex <= 0) return "";
  const local = trimmed.slice(0, atIndex);
  const domain = trimmed.slice(atIndex);
  return `${local[0]}***${domain}`;
}

export function maskPhone(phone: string): string {
  const digits = phone.replace(/\s+/g, "");
  if (digits.length < 5) return "";
  const tail = digits.slice(-4);
  const prefix = digits.startsWith("+") ? digits.slice(0, 3) : "";
  return `${prefix ? `${prefix} ` : ""}••••${tail}`;
}

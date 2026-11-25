/**
 * Quote builder configuration shaped to mirror future Sanity CMS schema.
 * All copy, options, file constraints, and confirmation timeline steps live here.
 */

export type ProductIconKey =
  | "Layers"
  | "Cpu"
  | "Wrench"
  | "Ruler"
  | "Package"
  | "CircleDot"
  | "HelpCircle";

export interface QuoteProductOption {
  id: string;
  label: string;
  icon: ProductIconKey;
}

export interface QuoteOption {
  id: string;
  label: string;
}

export interface TimelineStepConfig {
  id: string;
  title: string;
  description: string;
  // TODO(client): Confirm actual SLA/response timeframe wording
  timeframe: string;
}

export const QUOTE_HEADER = {
  eyebrow: "GET A QUOTE",
  heading: "Tell us what you need to make",
  subtext:
    "Share your tooling scope, timeline, and drawings for an engineering review.",
} as const;

export const QUOTE_STEPS = [
  { id: "product", number: 1, label: "Product" },
  { id: "project", number: 2, label: "Project" },
  { id: "details", number: 3, label: "Details" },
  { id: "contact", number: 4, label: "Contact" },
] as const;

export const QUOTE_PRODUCTS: QuoteProductOption[] = [
  { id: "Plastic Moulds", label: "Plastic Moulds", icon: "Layers" },
  { id: "Casting Dies", label: "Casting Dies", icon: "Cpu" },
  { id: "Casting Spares", label: "Casting Spares", icon: "Wrench" },
  { id: "Sheet Metal Tool", label: "Sheet Metal Tool", icon: "Ruler" },
  { id: "Industry Spares", label: "Industry Spares", icon: "Package" },
  { id: "Rubber Moulds", label: "Rubber Moulds", icon: "CircleDot" },
  { id: "Not sure / Other", label: "Not sure / Other", icon: "HelpCircle" },
];

export const QUOTE_INDUSTRIES: QuoteOption[] = [
  { id: "Automotive", label: "Automotive" },
  { id: "Engineering", label: "Engineering" },
  { id: "Appliances", label: "Appliances" },
  { id: "Other", label: "Other" },
];

export const QUOTE_QUANTITIES: QuoteOption[] = [
  { id: "Prototype", label: "Prototype" },
  { id: "Small batch", label: "Small batch" },
  { id: "Mass production", label: "Mass production" },
];

export const QUOTE_TIMELINES: QuoteOption[] = [
  { id: "Urgent", label: "Urgent" },
  { id: "1 to 3 months", label: "1 to 3 months" },
  { id: "Flexible", label: "Flexible" },
];

export const QUOTE_FILE_RULES = {
  maxFiles: 3,
  maxFileSizeBytes: 10 * 1024 * 1024, // 10 MB
  maxFileSizeLabel: "10 MB",
  acceptedExtensions: [
    ".pdf",
    ".step",
    ".stp",
    ".iges",
    ".igs",
    ".dwg",
    ".dxf",
    ".jpg",
    ".jpeg",
    ".png",
  ],
  acceptedDisplay: "PDF, STEP, STP, IGES, DWG, DXF, JPG, PNG",
} as const;

export const QUOTE_DETAILS_CONFIG = {
  messageMaxLength: 1000,
  messagePlaceholder:
    "Describe part geometry, material, cavity count, tonnage, or surface finish requirements...",
  dropzoneTitle: "Drop CAD drawings or reference files here",
  dropzoneHint: `Optional · Up to ${QUOTE_FILE_RULES.maxFiles} files, max ${QUOTE_FILE_RULES.maxFileSizeLabel} each (${QUOTE_FILE_RULES.acceptedDisplay})`,
} as const;

export const QUOTE_CONTACT_CONFIG = {
  consentLabel: "I agree to be contacted about this enquiry.",
  submitLabel: "Send enquiry",
  submittingLabel: "Sending enquiry...",
} as const;

export const QUOTE_JOB_CARD_CONFIG = {
  headerLabel: "ENQUIRY / JOB CARD",
  stampLabel: "SUBMITTED",
  emptyValue: "—",
  totalFields: 6,
  rows: [
    { key: "product", label: "PRODUCT" },
    { key: "industry", label: "INDUSTRY" },
    { key: "quantity", label: "QUANTITY" },
    { key: "timeline", label: "TIMELINE" },
    { key: "files", label: "FILES" },
    { key: "contact", label: "CONTACT" },
  ] as const,
} as const;

export const QUOTE_SUCCESS_CONFIG = {
  heading: "Enquiry received",
  summary:
    "Your tooling enquiry has been logged with our engineering desk. Keep the reference number below for any follow-up.",
  timelineHeading: "What happens next",
  // TODO(client): Confirm exact response timeframes with SMMIPL engineering & sales team
  timelineSteps: [
    {
      id: "received",
      title: "Received",
      description: "Your enquiry and attached specifications are logged.",
      timeframe: "Immediate", // TODO(client): confirm copy
    },
    {
      id: "reviewed",
      title: "Reviewed by our engineers",
      description:
        "Our tooling engineers assess feasibility, tolerances, and machine capacity.",
      timeframe: "Within 1–2 business days (TODO(client): confirm)", // TODO(client): confirm SLA
    },
    {
      id: "contact",
      title: "We contact you",
      description:
        "We reach out by email or phone to discuss tooling scope and next steps.",
      timeframe: "Scheduled follow-up (TODO(client): confirm)", // TODO(client): confirm SLA
    },
  ] as TimelineStepConfig[],
} as const;

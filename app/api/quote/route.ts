import { NextResponse } from "next/server";
import { Resend } from "resend";
import { QUOTE_FILE_RULES } from "@/lib/quote-config";
import { quoteSchema, validateQuoteFile } from "@/lib/quote-schema";
import { siteConfig } from "@/lib/site";

// Sliding-window in-memory IP rate limit (5 submissions per 10 minutes)
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const ipRequests = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (ipRequests.get(ip) ?? []).filter(
    (ts) => now - ts < RATE_LIMIT_WINDOW_MS
  );
  if (timestamps.length >= RATE_LIMIT_MAX_REQUESTS) {
    ipRequests.set(ip, timestamps);
    return true;
  }
  timestamps.push(now);
  ipRequests.set(ip, timestamps);
  return false;
}

function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() || "unknown";
  }
  return request.headers.get("x-real-ip") || "unknown";
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

async function verifyTurnstile(token: string, ip: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true; // Skipped locally when Turnstile env var is unset
  if (!token) return false;

  const body = new URLSearchParams({
    secret,
    response: token,
    remoteip: ip,
  });

  const res = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      body,
    }
  );
  if (!res.ok) return false;
  const data = (await res.json()) as { success?: boolean };
  return Boolean(data.success);
}

export async function POST(request: Request) {
  const ip = getClientIp(request);
  if (isRateLimited(ip)) {
    return NextResponse.json(
      {
        ok: false,
        error: "Too many quote requests. Please wait a few minutes or call us.",
      },
      { status: 429 }
    );
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid multipart form submission." },
      { status: 400 }
    );
  }

  const rawReference = String(formData.get("reference") ?? "").trim();
  const reference = /^QT-\d{4}-\d{4}$/.test(rawReference)
    ? rawReference
    : `QT-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

  // Honeypot check: quietly succeed without emailing if bot filled hidden field
  const honeypot = String(formData.get("website") ?? "").trim();
  if (honeypot.length > 0) {
    return NextResponse.json({ ok: true, reference });
  }

  // Turnstile verification (skipped when TURNSTILE_SECRET_KEY is not configured)
  const turnstileToken = String(formData.get("turnstileToken") ?? "").trim();
  const turnstileValid = await verifyTurnstile(turnstileToken, ip);
  if (!turnstileValid) {
    return NextResponse.json(
      { ok: false, error: "Verification check failed. Please try again." },
      { status: 400 }
    );
  }

  const parsed = quoteSchema.safeParse({
    product: String(formData.get("product") ?? ""),
    industry: String(formData.get("industry") ?? ""),
    industryOther: String(formData.get("industryOther") ?? ""),
    quantity: String(formData.get("quantity") ?? ""),
    timeline: String(formData.get("timeline") ?? ""),
    message: String(formData.get("message") ?? ""),
    name: String(formData.get("name") ?? ""),
    company: String(formData.get("company") ?? ""),
    email: String(formData.get("email") ?? ""),
    phone: String(formData.get("phone") ?? ""),
    consent: formData.get("consent") === "true",
    website: honeypot,
  });

  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0];
    return NextResponse.json(
      {
        ok: false,
        error: firstIssue?.message || "Please check all required fields.",
      },
      { status: 400 }
    );
  }

  const uploadedEntries = formData
    .getAll("files")
    .filter((entry): entry is File => entry instanceof File && entry.size > 0);

  if (uploadedEntries.length > QUOTE_FILE_RULES.maxFiles) {
    return NextResponse.json(
      {
        ok: false,
        error: `Maximum ${QUOTE_FILE_RULES.maxFiles} attachments allowed.`,
      },
      { status: 400 }
    );
  }

  const attachments: { filename: string; content: Buffer }[] = [];
  for (const file of uploadedEntries) {
    const fileError = validateQuoteFile(file);
    if (fileError) {
      return NextResponse.json(
        { ok: false, error: fileError },
        { status: 400 }
      );
    }
    const arrayBuffer = await file.arrayBuffer();
    attachments.push({
      filename: file.name,
      content: Buffer.from(arrayBuffer),
    });
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const quoteToEmail = process.env.QUOTE_TO_EMAIL;
  const fromEmail =
    process.env.RESEND_FROM_EMAIL || `${siteConfig.name} <onboarding@resend.dev>`;

  if (!resendApiKey || !quoteToEmail) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Email service is not configured yet. Please call our team directly.",
      },
      { status: 500 }
    );
  }

  const resend = new Resend(resendApiKey);
  const data = parsed.data;
  const resolvedIndustry =
    data.industry === "Other" && data.industryOther
      ? `Other (${data.industryOther})`
      : data.industry || "Not specified";

  const internalHtml = `
    <h2>New Quote Enquiry (${escapeHtml(reference)})</h2>
    <table cellpadding="6" cellspacing="0" border="1" style="border-collapse:collapse;font-family:sans-serif;font-size:14px;">
      <tr><td><strong>Reference</strong></td><td>${escapeHtml(reference)}</td></tr>
      <tr><td><strong>Product</strong></td><td>${escapeHtml(data.product)}</td></tr>
      <tr><td><strong>Industry</strong></td><td>${escapeHtml(resolvedIndustry)}</td></tr>
      <tr><td><strong>Quantity</strong></td><td>${escapeHtml(data.quantity || "Not specified")}</td></tr>
      <tr><td><strong>Timeline</strong></td><td>${escapeHtml(data.timeline || "Not specified")}</td></tr>
      <tr><td><strong>Name</strong></td><td>${escapeHtml(data.name)}</td></tr>
      <tr><td><strong>Company</strong></td><td>${escapeHtml(data.company || "Not specified")}</td></tr>
      <tr><td><strong>Email</strong></td><td>${escapeHtml(data.email)}</td></tr>
      <tr><td><strong>Phone</strong></td><td>${escapeHtml(data.phone)}</td></tr>
      <tr><td><strong>Consent</strong></td><td>${data.consent ? "Yes" : "No"}</td></tr>
      <tr><td><strong>Attachments</strong></td><td>${attachments.length}</td></tr>
    </table>
    <h3>Requirements</h3>
    <p style="white-space:pre-wrap;font-family:sans-serif;">${escapeHtml(data.message)}</p>
  `;

  try {
    const internalSend = await resend.emails.send({
      from: fromEmail,
      to: quoteToEmail,
      replyTo: data.email,
      subject: `[${reference}] New Quote Enquiry — ${data.product}`,
      html: internalHtml,
      attachments: attachments.length > 0 ? attachments : undefined,
    });

    if (internalSend.error) {
      throw new Error(internalSend.error.message);
    }

    // Send confirmation email to the user with their reference number
    await resend.emails.send({
      from: fromEmail,
      to: data.email,
      subject: `We received your enquiry (${reference}) — ${siteConfig.name}`,
      html: `
        <p>Dear ${escapeHtml(data.name)},</p>
        <p>Thank you for contacting ${escapeHtml(siteConfig.legalName)}.</p>
        <p>Your tooling enquiry for <strong>${escapeHtml(data.product)}</strong> has been received under reference <strong>${escapeHtml(reference)}</strong>.</p>
        <p>Our engineering team will review your requirements and reach out to you.</p>
        <p>For urgent queries, please call us at ${escapeHtml(siteConfig.contact.phonePrimary)}.</p>
      `,
    });

    return NextResponse.json({ ok: true, reference });
  } catch {
    return NextResponse.json(
      {
        ok: false,
        error: "Unable to send your enquiry right now. Please call us directly.",
      },
      { status: 500 }
    );
  }
}

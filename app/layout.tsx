import type { Metadata } from "next";
import { Inter, Barlow, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
  variable: "--font-barlow",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  preload: false,
  display: "swap",
  variable: "--font-plex-mono",
});

export const metadata: Metadata = {
  title: "SMMIPL | Molding Excellence, Shaping Futures",
  description:
    "Precision tooling, technical injection molding, and micro-tolerance component manufacturing.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${barlow.variable} ${ibmPlexMono.variable} antialiased`}
      suppressHydrationWarning
    >
      <body
        className="min-h-screen bg-paper text-ink font-body"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}

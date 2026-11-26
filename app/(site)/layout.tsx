import React from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getSiteLayoutSettings } from "@/sanity/lib/queries";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSiteLayoutSettings();

  return (
    <div className="flex min-h-screen flex-col bg-paper text-ink">
      <Header phone={settings.phonePrimary} />
      <main id="main-content" tabIndex={-1} className="flex-1 outline-none">
        {children}
      </main>
      <Footer settings={settings} />
    </div>
  );
}

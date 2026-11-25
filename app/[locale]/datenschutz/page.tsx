import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalPage } from "@/components/LegalPage";
import { getMessages, isTranslatedLocale } from "@/lib/i18n";
import { createLegalMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: PageProps<"/[locale]/datenschutz">): Promise<Metadata> {
  const { locale } = await params;
  if (!isTranslatedLocale(locale)) notFound();
  return createLegalMetadata(locale, getMessages(locale), "privacy");
}

export default async function LocalizedPrivacyPage({ params }: PageProps<"/[locale]/datenschutz">) {
  const { locale } = await params;
  if (!isTranslatedLocale(locale)) notFound();
  return <LegalPage locale={locale} messages={getMessages(locale)} page="privacy" />;
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalPage } from "@/components/LegalPage";
import { getMessages, isTranslatedLocale } from "@/lib/i18n";
import { createLegalMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: PageProps<"/[locale]/impressum">): Promise<Metadata> {
  const { locale } = await params;
  if (!isTranslatedLocale(locale)) notFound();
  return createLegalMetadata(locale, getMessages(locale), "imprint");
}

export default async function LocalizedImprintPage({ params }: PageProps<"/[locale]/impressum">) {
  const { locale } = await params;
  if (!isTranslatedLocale(locale)) notFound();
  return <LegalPage locale={locale} messages={getMessages(locale)} page="imprint" />;
}

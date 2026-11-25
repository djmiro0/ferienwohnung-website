import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HomePage } from "@/components/HomePage";
import { getMessages, isTranslatedLocale } from "@/lib/i18n";
import { createHomeMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: PageProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!isTranslatedLocale(locale)) notFound();
  return createHomeMetadata(locale, getMessages(locale));
}

export default async function LocalizedHomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!isTranslatedLocale(locale)) notFound();
  return <HomePage locale={locale} messages={getMessages(locale)} />;
}

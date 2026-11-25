import type { Metadata } from "next";
import type { Locale, Messages } from "@/lib/i18n";
import { languageAlternates, localizedPath } from "@/lib/i18n";

const siteUrl = "https://ferienwohnungen-northeim.com";
const localeMap: Record<Locale, string> = {
  de: "de_DE",
  en: "en_GB",
  sr: "sr_RS",
};

export const rootMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "Ferienwohnungen Northeim",
  keywords: [
    "Ferienwohnung Northeim",
    "Unterkunft Northeim",
    "Monteurzimmer Northeim",
    "City Tiny House Northeim",
    "Ferienwohnung Langenholtensen",
  ],
  icons: { icon: "/icon.svg" },
};

export function createHomeMetadata(locale: Locale, messages: Messages): Metadata {
  const canonical = localizedPath(locale);

  return {
    title: messages.metadata.title,
    description: messages.metadata.description,
    alternates: {
      canonical,
      languages: languageAlternates(),
    },
    openGraph: {
      title: messages.metadata.ogTitle,
      description: messages.metadata.ogDescription,
      url: canonical,
      siteName: "Ferienwohnungen Northeim",
      locale: localeMap[locale],
      type: "website",
      images: [
        {
          url: "/images/tiny-05.jpg",
          width: 1024,
          height: 768,
          alt: messages.hero.imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: messages.metadata.ogTitle,
      description: messages.metadata.ogDescription,
      images: ["/images/tiny-05.jpg"],
    },
  };
}

export function createLegalMetadata(
  locale: Locale,
  messages: Messages,
  page: "imprint" | "privacy",
): Metadata {
  const path = page === "imprint" ? "/impressum" : "/datenschutz";
  const content = messages.legal[page];

  return {
    title: content.metadataTitle,
    description: content.metadataDescription,
    alternates: {
      canonical: localizedPath(locale, path),
      languages: languageAlternates(path),
    },
  };
}

import de from "@/messages/de.json";
import en from "@/messages/en.json";
import sr from "@/messages/sr.json";

export const locales = ["de", "en", "sr"] as const;
export const translatedLocales = ["en", "sr"] as const;

export type Locale = (typeof locales)[number];
export type TranslatedLocale = (typeof translatedLocales)[number];
export type Messages = typeof de;

const messages: Record<Locale, Messages> = { de, en, sr };

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function isTranslatedLocale(value: string): value is TranslatedLocale {
  return translatedLocales.includes(value as TranslatedLocale);
}

export function getMessages(locale: Locale): Messages {
  return messages[locale];
}

export function localizedPath(locale: Locale, path = "/"): string {
  const suffix = path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;
  if (locale === "de") return suffix || "/";
  return `/${locale}${suffix}`;
}

export function languageAlternates(path = "/") {
  return {
    "de-DE": localizedPath("de", path),
    en: localizedPath("en", path),
    "sr-Latn": localizedPath("sr", path),
    "x-default": localizedPath("de", path),
  };
}

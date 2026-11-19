import { notFound } from "next/navigation";
import { isTranslatedLocale } from "@/lib/i18n";

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "sr" }];
}

export default async function LocalizedRootLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!isTranslatedLocale(locale)) notFound();

  return children;
}

import type { MetadataRoute } from "next";
import { languageAlternates, localizedPath, locales } from "@/lib/i18n";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://ferienwohnungen-northeim.com";
  const pages = [
    { path: "/", changeFrequency: "weekly" as const, priority: 1 },
    { path: "/impressum", changeFrequency: "yearly" as const, priority: 0.2 },
    { path: "/datenschutz", changeFrequency: "yearly" as const, priority: 0.2 },
  ];

  return pages.flatMap((page) =>
    locales.map((locale) => ({
      url: `${baseUrl}${localizedPath(locale, page.path) === "/" ? "" : localizedPath(locale, page.path)}`,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
      alternates: {
        languages: Object.fromEntries(
          Object.entries(languageAlternates(page.path)).map(([language, path]) => [
            language,
            `${baseUrl}${path === "/" ? "" : path}`,
          ]),
        ),
      },
    })),
  );
}

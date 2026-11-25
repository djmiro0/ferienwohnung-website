import type { Metadata } from "next";
import Script from "next/script";
import { DocumentLanguage } from "@/components/DocumentLanguage";
import { rootMetadata } from "@/lib/metadata";
import "./globals.css";

export const metadata: Metadata = rootMetadata;

const languageScript = `document.documentElement.lang=location.pathname==="/sr"||location.pathname.startsWith("/sr/")?"sr-Latn":location.pathname==="/en"||location.pathname.startsWith("/en/")?"en":"de"`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" data-theme="light" suppressHydrationWarning>
      <body>
        <DocumentLanguage />
        {children}
        <Script id="document-language" strategy="beforeInteractive">
          {languageScript}
        </Script>
      </body>
    </html>
  );
}

import Link from "next/link";
import type { Locale, Messages } from "@/lib/i18n";
import { localizedPath, locales } from "@/lib/i18n";

export function LegalPage({
  locale,
  messages,
  page,
}: {
  locale: Locale;
  messages: Messages;
  page: "imprint" | "privacy";
}) {
  const path = page === "imprint" ? "/impressum" : "/datenschutz";
  const legal = messages.legal;

  return (
    <main className="legal-page">
      <div className="legal-shell">
        <div className="legal-topbar">
          <Link className="legal-back" href={localizedPath(locale)}>← {legal.back}</Link>
          <nav className="legal-language-switcher" aria-label={messages.navigation.languageLabel}>
            {locales.map((item) => (
              <Link
                key={item}
                href={localizedPath(item, path)}
                hrefLang={item === "sr" ? "sr-Latn" : item}
                aria-current={locale === item ? "page" : undefined}
              >
                {item.toUpperCase()}
              </Link>
            ))}
          </nav>
        </div>

        <p className="eyebrow">{legal.eyebrow}</p>

        {page === "imprint" ? (
          <>
            <h1>{legal.imprint.title}</h1>
            {legal.translationNotice && <p className="legal-notice">{legal.translationNotice}</p>}

            <section>
              <h2>{legal.imprint.providerTitle}</h2>
              <p>{legal.imprint.providerLines.map((line) => <span key={line}>{line}<br /></span>)}</p>
            </section>

            <section>
              <h2>{legal.imprint.contactTitle}</h2>
              <p>
                {legal.imprint.phoneLabel}: <a href="tel:+491728690737">+49 172 8690737</a> /{" "}
                <a href="tel:+4915122030572">+49 151 22030572</a><br />
                {legal.imprint.emailLabel}:{" "}
                <a href="mailto:info@ferienwohnungen-northeim.com">info@ferienwohnungen-northeim.com</a>
              </p>
            </section>

            <section>
              <h2>{legal.imprint.disputeTitle}</h2>
              <p>{legal.imprint.disputeBody}</p>
            </section>

            <section>
              <h2>{legal.imprint.copyrightTitle}</h2>
              <p>{legal.imprint.copyrightBody}</p>
            </section>
          </>
        ) : (
          <>
            <h1>{legal.privacy.title}</h1>
            {legal.translationNotice && <p className="legal-notice">{legal.translationNotice}</p>}

            {legal.privacy.sections.map((section) => (
              <section key={section.title}>
                <h2>{section.title}</h2>
                <p className="legal-body">{section.body}</p>
              </section>
            ))}

            <p className="legal-date">{legal.privacy.updated}</p>
          </>
        )}
      </div>
    </main>
  );
}

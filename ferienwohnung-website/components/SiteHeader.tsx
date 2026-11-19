"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Locale } from "@/lib/i18n";

type HeaderCopy = {
  common: {
    brandTop: string;
    brandBottom: string;
    localeNames: Record<Locale, string>;
  };
  navigation: {
    label: string;
    accommodations: string;
    business: string;
    contact: string;
    book: string;
    openMenu: string;
    closeMenu: string;
    languageLabel: string;
  };
};

const localeLinks: Array<{ locale: Locale; href: string; short: string }> = [
  { locale: "de", href: "/#start", short: "DE" },
  { locale: "en", href: "/en#start", short: "EN" },
  { locale: "sr", href: "/sr#start", short: "SR" },
];

export function SiteHeader({ locale, copy }: { locale: Locale; copy: HeaderCopy }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  const links = [
    { href: "#unterkuenfte", label: copy.navigation.accommodations },
    { href: "#firmen", label: copy.navigation.business },
    { href: "#kontakt", label: copy.navigation.contact },
  ];

  return (
    <header className={`site-header${open ? " menu-open" : ""}`}>
      <div className="header-inner">
        <Link className="brand" href={locale === "de" ? "/" : `/${locale}`} onClick={() => setOpen(false)}>
          <span>{copy.common.brandTop}</span>
          <strong>{copy.common.brandBottom}</strong>
        </Link>

        <button
          className="menu-toggle"
          type="button"
          aria-expanded={open}
          aria-controls="main-navigation"
          aria-label={open ? copy.navigation.closeMenu : copy.navigation.openMenu}
          onClick={() => setOpen((value) => !value)}
        >
          <span />
          <span />
        </button>

        <nav id="main-navigation" className="main-navigation" aria-label={copy.navigation.label}>
          {links.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>
              {link.label}
            </Link>
          ))}
          <Link className="button button-small button-light" href="#booking-search" onClick={() => setOpen(false)}>
            {copy.navigation.book}
          </Link>
          <div className="language-switcher" aria-label={copy.navigation.languageLabel}>
            {localeLinks.map((item) => (
              <Link
                key={item.locale}
                href={item.href}
                hrefLang={item.locale === "sr" ? "sr-Latn" : item.locale}
                lang={item.locale === "sr" ? "sr-Latn" : item.locale}
                aria-current={locale === item.locale ? "page" : undefined}
                title={copy.common.localeNames[item.locale]}
                onClick={() => setOpen(false)}
              >
                {item.short}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
}

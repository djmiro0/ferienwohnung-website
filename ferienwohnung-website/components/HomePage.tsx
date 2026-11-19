import Image from "next/image";
import Link from "next/link";
import { BookingWidget } from "@/components/BookingWidget";
import { Gallery } from "@/components/Gallery";
import { HeroBookingSearch } from "@/components/HeroBookingSearch";
import { RevealObserver } from "@/components/RevealObserver";
import { SiteHeader } from "@/components/SiteHeader";
import type { Locale, Messages } from "@/lib/i18n";
import { localizedPath } from "@/lib/i18n";

const accommodationConfig = [
  {
    schemaId: "city-tiny-house",
    prefix: "tiny" as const,
    count: 21,
    preview: [9, 1, 6, 18, 20],
    image: "tiny-01.jpg",
    address: {
      streetAddress: "Akazienstraße 9",
      postalCode: "37154",
      addressLocality: "Northeim",
    },
  },
  {
    schemaId: "ferienwohnung-langenholtensen",
    prefix: "langenholtensen" as const,
    count: 31,
    preview: [1, 4, 2, 30, 31],
    image: "langenholtensen-01.jpg",
    address: {
      streetAddress: "Brunsteiner Straße 75",
      postalCode: "37154",
      addressLocality: "Northeim-Langenholtensen",
    },
  },
];

function Lines({ value }: { value: string[] }) {
  return value.map((line, index) => (
    <span key={line}>
      {index > 0 && <br />}
      {line}
    </span>
  ));
}

export function HomePage({ locale, messages }: { locale: Locale; messages: Messages }) {
  const homePath = localizedPath(locale);
  const jsonLd = messages.accommodations.items.map((accommodation, index) => {
    const config = accommodationConfig[index];

    return {
      "@context": "https://schema.org",
      "@type": "LodgingBusiness",
      "@id": `https://ferienwohnungen-northeim.com/#${config.schemaId}`,
      name: accommodation.name,
      url: `https://ferienwohnungen-northeim.com${homePath === "/" ? "" : homePath}#${accommodation.id}`,
      description: accommodation.summary,
      image: `https://ferienwohnungen-northeim.com/images/${config.image}`,
      inLanguage: messages.htmlLang,
      telephone: ["+49 172 8690737", "+49 151 22030572"],
      address: {
        "@type": "PostalAddress",
        ...config.address,
        addressCountry: "DE",
      },
      amenityFeature: [
        { "@type": "LocationFeatureSpecification", name: "WLAN", value: true },
        { "@type": "LocationFeatureSpecification", name: "Parkplatz", value: true },
        { "@type": "LocationFeatureSpecification", name: "Nichtraucher-Unterkunft", value: true },
      ],
    };
  });

  return (
    <>
      <SiteHeader
        locale={locale}
        copy={{ common: messages.common, navigation: messages.navigation }}
      />
      <RevealObserver />

      <main id="start">
        <section className="hero" aria-labelledby="hero-title">
          <Image
            className="hero-image"
            src="/images/tiny-05.jpg"
            alt={messages.hero.imageAlt}
            fill
            priority
            quality={88}
            sizes="100vw"
          />
          <div className="hero-shade" />
          <div className="hero-content page-shell">
            <p className="eyebrow hero-eyebrow">{messages.hero.eyebrow}</p>
            <h1 id="hero-title">
              <span className="hero-title-primary">{messages.hero.titlePrimary}</span>
              <span>{messages.hero.titleSecondary}</span>
            </h1>
            <p className="hero-lead">{messages.hero.lead}</p>
            <HeroBookingSearch copy={messages.bookingSearch} />
            <a className="hero-discover text-link text-link-light" href="#unterkuenfte">
              {messages.hero.discover} <span aria-hidden="true">↓</span>
            </a>
          </div>
          <div className="hero-meta page-shell" aria-label={messages.hero.benefitsLabel}>
            {messages.hero.benefits.map((benefit) => <span key={benefit}>{benefit}</span>)}
          </div>
        </section>

        <section className="direct-section section-padding">
          <div className="page-shell direct-grid" data-reveal>
            <div>
              <p className="eyebrow">{messages.direct.eyebrow}</p>
              <h2><Lines value={messages.direct.titleLines} /></h2>
            </div>
            <div className="direct-copy">
              <p>{messages.direct.intro}</p>
              <ol className="benefit-list">
                {messages.direct.benefits.map((benefit, index) => (
                  <li key={benefit.title}>
                    <span>0{index + 1}</span>
                    <div><strong>{benefit.title}</strong><p>{benefit.body}</p></div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section id="unterkuenfte" className="accommodations-section">
          <div className="page-shell section-heading" data-reveal>
            <p className="eyebrow">{messages.accommodations.eyebrow}</p>
            <h2><Lines value={messages.accommodations.titleLines} /></h2>
            <p>{messages.accommodations.intro}</p>
          </div>

          {messages.accommodations.items.map((accommodation, index) => {
            const config = accommodationConfig[index];

            return (
              <article className="accommodation" id={accommodation.id} key={accommodation.id}>
                <div className="page-shell">
                  <header className="accommodation-header" data-reveal>
                    <div>
                      <p className="eyebrow">{accommodation.eyebrow}</p>
                      <p className="accommodation-number">0{index + 1}</p>
                      <h2>{accommodation.name}</h2>
                    </div>
                    <div>
                      <h3>{accommodation.headline}</h3>
                      <p>{accommodation.summary}</p>
                    </div>
                  </header>

                  <ul
                    className="fact-list"
                    aria-label={`${messages.accommodations.factsLabelPrefix} ${accommodation.name}`}
                    data-reveal
                  >
                    {accommodation.facts.map((fact) => <li key={fact}>{fact}</li>)}
                  </ul>

                  <div data-reveal>
                    <Gallery
                      name={accommodation.name}
                      prefix={config.prefix}
                      count={config.count}
                      preview={config.preview}
                      livingAlt={accommodation.galleryLivingAlt}
                      detailAlt={accommodation.galleryDetailAlt}
                      copy={messages.gallery}
                    />
                  </div>

                  <div className="accommodation-details" data-reveal>
                    <div className="accommodation-description">
                      <p className="eyebrow">{messages.accommodations.stayEyebrow}</p>
                      {accommodation.descriptions.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                      <a className="button button-dark" href="#booking-search">
                        {messages.accommodations.book} <span aria-hidden="true">↗</span>
                      </a>
                    </div>
                    <div>
                      <p className="detail-title">{messages.accommodations.amenitiesTitle}</p>
                      <ul className="amenity-list">
                        {accommodation.amenities.map((amenity) => <li key={amenity}>{amenity}</li>)}
                      </ul>
                    </div>
                    <div>
                      <p className="detail-title">{messages.accommodations.goodToKnow}</p>
                      <dl className="stay-list">
                        {accommodation.stay.map((item) => (
                          <div key={item.term}><dt>{item.term}</dt><dd>{item.detail}</dd></div>
                        ))}
                      </dl>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </section>

        <section id="firmen" className="business-section">
          <div className="business-image" data-reveal>
            <Image
              src="/images/langenholtensen-04.jpg"
              alt={messages.business.imageAlt}
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
            />
          </div>
          <div className="business-content" data-reveal>
            <p className="eyebrow">{messages.business.eyebrow}</p>
            <h2>{messages.business.title}</h2>
            <p>{messages.business.intro}</p>
            <ul>
              {messages.business.benefits.map((benefit) => <li key={benefit}>{benefit}</li>)}
            </ul>
            <a
              className="button button-light"
              href={`mailto:info@ferienwohnungen-northeim.com?subject=${encodeURIComponent(messages.business.mailSubject)}`}
            >
              {messages.business.cta} <span aria-hidden="true">↗</span>
            </a>
          </div>
        </section>

        <section id="buchen" className="booking-section">
          <div className="booking-utility page-shell" data-reveal>
            <BookingWidget copy={messages.booking} />
          </div>
        </section>

        <section className="location-section section-padding">
          <div className="page-shell location-grid" data-reveal>
            <div>
              <p className="eyebrow">{messages.location.eyebrow}</p>
              <h2><Lines value={messages.location.titleLines} /></h2>
            </div>
            <div className="location-facts">
              {messages.location.facts.map((fact) => (
                <div key={fact.value}><strong>{fact.value}</strong><span>{fact.label}</span></div>
              ))}
            </div>
          </div>
        </section>

        <section id="kontakt" className="contact-section section-padding">
          <div className="page-shell contact-inner" data-reveal>
            <p className="eyebrow">{messages.contact.eyebrow}</p>
            <h2><Lines value={messages.contact.titleLines} /></h2>
            <p>{messages.contact.intro}</p>
            <div className="contact-links">
              <a href="tel:+491728690737"><span>{messages.common.phone}</span>+49 172 8690737</a>
              <a href="tel:+4915122030572"><span>{messages.common.phone}</span>+49 151 22030572</a>
              <a href="mailto:info@ferienwohnungen-northeim.com"><span>{messages.common.email}</span>info@ferienwohnungen-northeim.com</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="page-shell footer-inner">
          <Link className="footer-brand" href={homePath}>
            {messages.common.brandTop} <strong>{messages.common.brandBottom}</strong>
          </Link>
          <p>{messages.footer.tagline}</p>
          <div className="footer-bottom">
            <span>{messages.footer.copyright}</span>
            <nav aria-label={messages.footer.legalLabel}>
              <Link href={localizedPath(locale, "/impressum")}>{messages.footer.imprint}</Link>
              <Link href={localizedPath(locale, "/datenschutz")}>{messages.footer.privacy}</Link>
            </nav>
          </div>
        </div>
      </footer>

      <a className="mobile-booking-bar" href="#booking-search">
        <span><small>{messages.mobileBooking.label}</small>{messages.mobileBooking.action}</span>
        <span aria-hidden="true">↗</span>
      </a>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
    </>
  );
}

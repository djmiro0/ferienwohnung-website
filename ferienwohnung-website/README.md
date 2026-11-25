# Ferienwohnungen Northeim

Moderner, mobile-first Webauftritt für das **City Tiny House** und die
**Ferienwohnung Langenholtensen**. Die Website wird mit Next.js gebaut und über
Netlify bereitgestellt. Verfügbarkeit und Preise kommen ausschließlich aus dem
eingebetteten Smoobu-Buchungssystem.

## Technik

- Next.js 16 mit App Router und React 19
- TypeScript im Strict Mode
- Drei vollständig statische Sprachversionen: Deutsch (`/`), Englisch (`/en`)
  und Serbisch (`/sr`)
- `next/image` für responsive Bildoptimierung und moderne Ausgabeformate
- Smoobu Booking Engine für Live-Preise und Live-Verfügbarkeit
- Statische SEO-Seiten, Sitemap, Robots-Datei und `LodgingBusiness` JSON-LD
- Keine Analytics, externen Karten oder extern geladenen Webfonts

## Lokale Entwicklung

Voraussetzung: Node.js 20.9 oder neuer.

```bash
npm ci
npm run dev
```

Danach ist die Seite unter [http://localhost:3000](http://localhost:3000)
erreichbar.

## Qualitätschecks

```bash
npm run lint
npm run build
```

`npm run check` führt beide Prüfungen nacheinander aus. Prettier ist aktuell
nicht als Projektabhängigkeit installiert.

## Projektstruktur

```text
app/
  (de)/              deutsche Start- und Rechtstexte unter `/`
  [locale]/          englische und serbische Routen
  layout.tsx         gemeinsames Root-Layout für Navigation ohne Seiten-Reload
  globals.css        Layout, Komponenten und responsive Regeln
  theme.css          einzige Quelle für alle UI-Farben und Theme-Tokens
components/
  BookingWidget.tsx  Smoobu-Einbettung
  DocumentLanguage.tsx  aktualisiert das Dokument-Lang bei Soft Navigation
  Gallery.tsx        responsive Galerie und Lightbox
  HeroBookingSearch.tsx  Datumssuche im sichtbaren Startbereich
  HomePage.tsx       gemeinsame, lokalisierte Startseite
  LegalPage.tsx      gemeinsame Impressum-/Datenschutzansicht
  RevealObserver.tsx Scroll-Animationen
  SiteHeader.tsx     Desktop- und Mobile-Navigation
lib/                 i18n-, Pfad- und Metadaten-Helfer
messages/            de.json, en.json und sr.json
public/images/       lokal gespeicherte Unterkunftsfotos
```

### Farben und Dark Mode

Alle UI-Farben liegen ausschließlich in [`app/theme.css`](app/theme.css).
Komponenten verwenden nur semantische CSS-Variablen. Light- und Dark-Tokens
sind vorbereitet; ein späterer Theme-Schalter muss lediglich
`data-theme="light"` oder `data-theme="dark"` am `<html>`-Element setzen.

## Smoobu

Die Startseite bindet den bestehenden Booking-Engine-Account `1852331` ein und
filtert ihn auf beide Unterkünfte:

- City Tiny House: `3464021`
- Ferienwohnung Langenholtensen: `3526331`

Preise oder Verfügbarkeiten dürfen nicht im Repository hinterlegt werden. Sie
werden live durch Smoobu geladen.

Die sofort sichtbare Buchungssuche übergibt Anreise, Abreise, Gästezahl und
optional die gewählte Unterkunft an Smoobu. Der vollständige Smoobu-Widget
bleibt zusätzlich weiter unten auf der Seite eingebettet.

## Deployment über GitHub und Netlify

1. Repository zu GitHub pushen.
2. Im bestehenden Netlify-Projekt das GitHub-Repository unter Continuous
   Deployment verbinden.
3. Das Basisverzeichnis `ferienwohnung-website` und das Publish-Verzeichnis
   `out` aus der `netlify.toml` im Repository-Stamm übernehmen.
4. Im Deploy Preview die Startseiten (`/`, `/en`, `/sr`), einen Rechtstext und
   die Bilder prüfen und erst danach als Production Deploy veröffentlichen.

`npm run build` exportiert statische HTML-Seiten und Assets nach `out`.
Netlify veröffentlicht nur diesen Ordner und benötigt dafür keinen Next.js-Server.
Die responsiven Bilder werden weiterhin über das Netlify Image CDN ausgeliefert.

Domain- und DNS-Einstellungen bleiben unverändert. Insbesondere dürfen die
bestehenden MX-Einträge für die E-Mail-Adresse nicht geändert werden.

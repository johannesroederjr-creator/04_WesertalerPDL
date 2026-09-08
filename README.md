# Wesertaler Personaldienstleistungen – Website

Statische Unternehmenswebsite für die Wesertaler Personaldienstleistungen GmbH (Arbeitnehmerüberlassung / Zeitarbeit).

## Projektstruktur

```
04_WesertalerPDL/
├── index.html          # Startseite
├── impressum.html      # Impressum
├── datenschutz.html    # Datenschutzerklärung
├── css/
│   └── shared.css      # Gemeinsame Styles (Navigation, Footer, Rechtstexte)
├── js/
│   └── nav.js          # Mobile Navigation
└── README.md
```

## Lokale Vorschau

Die Seite ist reines HTML/CSS/JS – kein Build-Schritt nötig. Datei `index.html` im Browser öffnen oder lokalen Webserver starten:

```bash
npx serve .
```

## Design

- **Überschriften:** Arial Black
- **Fließtext:** Arial
- **Unternehmensfarbe:** `#248000` (dezent als Akzentfarbe eingesetzt)
- **Unterseiten:** Schmaler grüner Seitenkopf statt Vollbild-Hero

---

## Noch offen / fehlende Inhalte

### Rechtliches (Priorität: hoch)

- [ ] **Impressum vervollständigen** – aktuell nur die Angaben der alten Website übernommen. Für eine TMG-konforme Seite fehlen typischerweise:
  - Vollständige Firmierung mit Rechtsform
  - Handelsregister (Registergericht + HRB-Nummer)
  - Umsatzsteuer-Identifikationsnummer
  - Ggf. verantwortlich für den Inhalt nach § 55 Abs. 2 RStV
- [ ] **Datenschutzerklärung rechtlich prüfen lassen** – Text basiert auf der alten Privacy-Seite (Stand 2020), wurde sprachlich bereinigt und E-Mail-Adressen aktualisiert, sollte aber von einem Anwalt oder Datenschutzbeauftragten geprüft werden
- [ ] **Seite „AÜG-Erlaubnis“** – im Footer verlinkt, existiert noch nicht
- [ ] **Cookie-Banner / Consent** – falls Tracking-Cookies oder externe Dienste (Analytics) eingesetzt werden
- [ ] **Datenschutz-Link im Kontaktformular** – optional: Hinweis mit Link zur Datenschutzerklärung direkt am Formular

### Bilder & Branding

- [x] **Firmenlogo in Navigation** – `Logo_WPDL.jpg` eingebunden (Kontrast auf grünem Header ggf. noch bewerten)
- [ ] **Logo optimieren** – falls nötig: PNG mit transparentem Hintergrund oder weißer Rahmen
- [ ] **Headerbild / Hero-Foto** – aktuell Unsplash-Platzhalter; echtes Unternehmens- oder Produktionsfoto einbinden
- [ ] **Team-Fotos** – Michael Uhde, Liviu-Ionut Tudor (Platzhalter), Markus Westermann: echte Portraits bereitstellen
- [ ] **Weitere Bilder** – Produktion, Logistik, Unterkunft, Fuhrpark (sofern gewünscht)
- [ ] **Favicon** – `.ico` / `.svg` für Browser-Tab

### Inhalte & Texte

- [ ] **Kontaktdaten Liviu-Ionut Tudor** – Telefon/E-Mail für Team-Karte ergänzen
- [ ] **Referenzen** – aktuell anonymisierte Platzhalter-Zitate; echte Kundenstimmen oder Freigaben klären
- [ ] **Branchen-Referenzen** – konkrete Firmennamen nur mit schriftlicher Freigabe
- [ ] **Schema.org-Daten** – Michael-Uhde-Jobtitel in JSON-LD ggf. an neue Team-Texte anpassen

### Technik & Deployment

- [ ] **Kontaktformular-Backend** – aktuell `mailto:`-Link; für zuverlässigen Versand z. B. Formspree, Netlify Forms oder eigenes PHP/Node-Backend einrichten
- [ ] **URL-Weiterleitungen** – alte URLs `/privacy` → `/datenschutz.html` und `/impressum` → `/impressum.html` auf dem Server einrichten
- [ ] **HTTPS & Domain** – Deployment auf `www.wesertaler-personaldienstleistungen.de` konfigurieren
- [ ] **CSS auslagern** – `index.html` enthält noch Inline-Styles; langfristig in `css/shared.css` oder `css/main.css` konsolidieren
- [ ] **Google Web Fonts** – in Datenschutzerklärung erwähnt, auf Startseite aber nicht mehr aktiv; Text anpassen oder Fonts wieder einbinden
- [ ] **SEO** – `sitemap.xml`, `robots.txt`, Open-Graph-Bild
- [ ] **Barrierefreiheit prüfen** – Kontraste, Tastaturbedienung, Alt-Texte aller Bilder

### Optional / Nice-to-have

- [ ] **Impressum & Datenschutz in Navigation** – derzeit nur im Footer verlinkt
- [ ] **Live-Chat oder WhatsApp-Button**
- [ ] **Google Business Profile** verknüpfen
- [ ] **Analytics** (Matomo / GA4) – nur mit Consent-Banner und aktualisierter Datenschutzerklärung

---

## Kontakt (Inhaltlich verantwortlich)

**Wesertaler Personaldienstleistungen GmbH**  
Bremer Str. 4, 34399 Wesertal  
Tel.: 05574 9459062 · m.uhde@wesertaler-personaldienstleistungen.de

---

*Stand: September 2026*

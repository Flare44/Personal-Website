# CLAUDE.md

Kontext für Claude Code zu diesem Repo. Alles, was sich aus dem Code selbst ablesen lässt, steht hier bewusst **nicht** drin — nur das, was man sonst raten müsste.

## Was das ist

Persönliche Portfolio-Website von Moritz Gilges (Informatik-Master, Uni Bonn). Sie hat zwei Zielgruppen gleichzeitig:

1. **Recruiter / akademisches Umfeld** — Startseite (`/`) mit Werdegang, Projekten, Zertifikaten.
2. **Firmen als Freelance-Kunden** — `/dienstleistungen` verkauft Webentwicklung und KI-Lösungen.

Deshalb ist der Ton auf der Startseite sachlich-fachlich und auf `/dienstleistungen` verkaufender. Beides muss zusammen funktionieren.

## Stack & Befehle

Astro 5 (`output: "static"`) + Tailwind 3 + `@astrojs/sitemap`. Keine Tests, kein Linter, kein `@astrojs/check` installiert.

```bash
npm run dev      # lokale Vorschau (Port 4321, weicht bei Belegung aus)
npm run build    # einzige echte Verifikation — vor jedem Push laufen lassen
npm run preview
```

`npx astro check` **nicht** aufrufen: es will `@astrojs/check` nachinstallieren. `npm run build` reicht.

## Sprache

**Alle Inhalte auf der Website sind deutsch.** Auch `<html lang="de">`, Meta-Description und JSON-LD. Code, Variablennamen und Commit-Messages sind gemischt — Commits schreibt Moritz auf Deutsch.

## Wo Inhalte herkommen

- **Projekte:** `src/data/projects.ts` ist die einzige Quelle. Sowohl die Karten in `Projects.astro` als auch die Detailseiten `/projekte/[slug]` lesen daraus. Nie an einer der beiden Stellen separat pflegen.
  Detailseiten rendern Sektionen nur, wenn Inhalt da ist (leere Arrays → Sektion fällt weg). Video-Support (`video: { src, poster?, caption? }`) ist vorbereitet, aber noch ungenutzt — für die Bachelorarbeit soll später eine Demo dazu.
- **Werdegang, Skills, Zertifikate:** aus dem Lebenslauf unter `public/documents/lebenslauf-moritz-gilges.pdf`. Der ist die Referenz — bei Widersprüchen gewinnt er.
- **Fachliche Projektdetails:** aus den PDFs in `public/documents/` und den (privaten) GitHub-Repos.

### PDFs lesen

Auf diesem Mac ist **kein poppler/pdftotext installiert** — das Read-Tool scheitert an mehrseitigen PDFs. Stattdessen macOS-nativ über PDFKit per JXA:

```js
// /tmp/pdftext.js
ObjC.import("Foundation"); ObjC.import("Quartz");
function run(argv) {
  var url = $.NSURL.fileURLWithPath($(argv[0]));
  return ObjC.unwrap($.PDFDocument.alloc.initWithURL(url).string);
}
```

```bash
osascript -l JavaScript /tmp/pdftext.js /pfad/zur/datei.pdf > /tmp/out.txt
```

Nichts per Homebrew nachinstallieren, ohne vorher zu fragen.

## Deployment

Vercel, Auto-Deploy auf Push nach `main`. Domain: **moritzgilges.de**.

GitHub Pages ist bewusst **komplett entfernt** (Workflow und `public/CNAME` gelöscht) — nicht wieder einführen. Die Domain hängt in `astro.config.mjs`, `public/robots.txt` und dem JSON-LD in `Layout.astro`; bei einer Änderung alle drei anfassen.

## Fallstricke

- **`html { font-size: 18px }`** in `Layout.astro` skaliert alle rem-basierten Tailwind-Klassen. `max-w-xs` sind also 360px, nicht 320px. Das hat schon einmal zu einem unscharfen `<Image>` geführt, weil die `widths` zu klein gewählt waren. Bei Retina immer die doppelte *effektive* Breite einplanen.
- **Kontakt-E-Mail:** `moritz-gilges@web.de` mit **Bindestrich**. Stand früher an mehreren Stellen mit Unterstrich; falls irgendwo wieder ein `_` auftaucht, ist das ein Fehler.
- **Keine Repo-Links auf den Projektseiten** — alle Projekt-Repos sind privat. `links: []` ist Absicht, nicht vergessen worden.
- **`Publications.astro`** existiert, ist in `index.astro` aber auskommentiert (noch keine Publikationen). Alle übrigen Komponenten in `src/components/` sind aktiv im Einsatz.
- **`archiv/`** enthält ausrangierte, aber bewusst aufgehobene Dateien (alter Lebenslauf, ungenutzte Grafiken). Wird nicht ausgeliefert. Nichts daraus löschen, ohne zu fragen — siehe `archiv/README.md`.
- **`public/` enthält nur noch Benutztes** (Logos, Dokumente, robots.txt). Wenn dort eine Datei landet, die nirgends referenziert wird, gehört sie ins `archiv/`.
- **Telefonnummer aus dem Lebenslauf steht bewusst nicht auf der Website.**

## Inhaltlicher Konflikt beim SemEval-Projekt

Auf `/projekte/semeval-2026-story-similarity` sind zwei PDFs verlinkt, die sich widersprechen: Das **Poster** (Zwischenstand) nennt für das Track-B-Fine-Tuning 0,802 Accuracy, der **finale Report** (09.02.2026) kommt auf 49,5 % Macro-F1 — also Zufallsniveau — und behält die vortrainierte Baseline als Abgabe.

**Der Report ist maßgeblich.** Der Seitentext ist entsprechend als sauber analysiertes negatives Ergebnis formuliert. Nicht "korrigieren", wenn jemand über die Poster-Zahl stolpert.

## Arbeitsweise

- Moritz schaut sich Änderungen **erst lokal an** und sagt dann explizit Bescheid, wenn gepusht werden soll. Nie ungefragt pushen.
- Bei Projektbeschreibungen ist leichtes Aufhübschen ausdrücklich erwünscht ("übertreib gerne ein mini bisschen"), damit sich der Text gut liest — aber keine erfundenen Fakten.
- Unklarheiten lieber am Ende gesammelt als Rückfragen stellen, statt zu raten.

## Offene Punkte

- **Abitur-Eintrag** in `Experience.astro`: steht nicht im aktuellen Lebenslauf. Drinlassen oder raus? — noch ungeklärt.
- **GitHub-Link** im Hero: im Lebenslauf verlinkt, auf der Seite fehlt das Icon (nur LinkedIn + Mail). — noch ungeklärt.
- **Demo-Video** zur Bachelorarbeit soll noch nachgereicht werden.

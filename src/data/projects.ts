export interface ProjectLink {
  label: string;
  href: string;
}

export interface ProjectDownload {
  label: string;
  href: string;
  meta?: string;
}

export interface ProjectImage {
  src: string;
  alt: string;
  caption?: string;
}

export interface ProjectVideo {
  src: string;
  poster?: string;
  caption?: string;
}

export interface TechGroup {
  group: string;
  items: string[];
}

export interface Project {
  slug: string;
  title: string;
  summary: string;
  status: "Live" | "In Arbeit" | "Abgeschlossen";
  tags: string[];
  period?: string;
  role?: string;
  context?: string;
  overview: string[];
  highlights: string[];
  techStack: TechGroup[];
  links: ProjectLink[];
  downloads: ProjectDownload[];
  images: ProjectImage[];
  video?: ProjectVideo;
}

export const projects: Project[] = [
  {
    slug: "nlp-entity-disambiguation",
    title: "Lab NLP: Disambiguating biological entities in scientific language",
    summary:
      "In biologischen Fachtexten haben gleiche Wörter je nach Kontext ganz unterschiedliche Bedeutungen. Die manuelle Zuordnung dieser Begriffe kostet Forschende viel Zeit. Eine eigene Pipeline übernimmt das automatisch — mit Embedding-basierter Ähnlichkeitssuche in medizinischen Datenbanken, domänenspezifischen Regeln und einem lokal betriebenen LLM.",
    status: "In Arbeit",
    tags: ["Python", "LLM", "API", "Embeddings", "RAG", "Prompting"],
    period: "2025 — heute",
    role: "Lab-Projekt",
    context:
      "Bonn-Aachen International Center for Information Technology (b-it) · Supervisor: Frederik Labonte",
    overview: [
      "In biologischen Fachtexten haben identische Begriffe je nach Kontext unterschiedliche Bedeutungen. Die manuelle Zuordnung dieser Begriffe zu den passenden Einträgen in Fachdatenbanken kostet Forschende viel Zeit und bremst die eigentliche wissenschaftliche Arbeit aus.",
      "Das Projekt entwickelt eine Pipeline, die diese Zuordnung automatisiert: Kandidaten werden über Embedding-basierte Ähnlichkeitssuche in medizinischen Datenbanken gefunden, über domänenspezifische Regeln gefiltert und anschließend von einem lokal betriebenen LLM final aufgelöst.",
    ],
    highlights: [
      "Embedding-basierte Ähnlichkeitssuche über medizinische Fachdatenbanken",
      "Domänenspezifische Regeln zur Vorfilterung der Kandidaten",
      "Lokales LLM für die finale Disambiguierung — die Daten verlassen die eigene Infrastruktur nicht",
    ],
    techStack: [
      { group: "Sprache", items: ["Python"] },
      { group: "NLP & KI", items: ["LLM", "Embeddings", "RAG", "Prompting"] },
      { group: "Daten", items: ["Medizinische Fachdatenbanken", "API-Anbindung"] },
    ],
    links: [],
    downloads: [],
    images: [],
  },
  {
    slug: "semeval-2026-story-similarity",
    title: "SemEval 2026: Modeling Narrative Story Similarity",
    summary:
      "Wann sind sich zwei Geschichten wirklich ähnlich — nicht in den Worten, sondern in Thema, Handlungsverlauf und Ausgang? Für diese SemEval-2026-Shared-Task haben wir im Team zwei Ansätze systematisch verglichen: Prompt Engineering mit einem LLM und Representation Learning mit Sentence-BERT.",
    status: "Abgeschlossen",
    tags: ["Python", "NLP", "SBERT", "spaCy", "Prompt Engineering", "Contrastive Learning"],
    period: "Okt 2025 — Feb 2026",
    role: "Teamprojekt (4 Personen) · mein Part: Preprocessing & Track B Fine-Tuning",
    context: "Universität Bonn · CAISA Lab · Introduction to NLP (WS 2025/26) · Team #23",
    overview: [
      "Narrative Ähnlichkeit ist überraschend schwer zu fassen. Zwei Geschichten können dieselben Wörter, Namen und Schauplätze teilen und trotzdem völlig unterschiedlich erzählen — und umgekehrt. Die SemEval-2026-Task definiert Ähnlichkeit deshalb ausschließlich über drei Dimensionen: das abstrakte Thema, den Handlungsverlauf und den Ausgang. Schreibstil, Wortüberschneidungen und Eigennamen sollen ausdrücklich keine Rolle spielen.",
      "Die Aufgabe besteht aus zwei komplementären Tracks. In Track A entscheidet ein System, welche von zwei Kandidatengeschichten einer Ankergeschichte narrativ näher steht. In Track B werden Vektorrepräsentationen erzeugt, deren Kosinus-Ähnlichkeit die narrative Ähnlichkeit widerspiegeln soll. Als Datengrundlage dienten vier Datensätze mit insgesamt 2.139 gelabelten und 400 ungelabelten Story-Triplets.",
      "Mein Beitrag lag auf der Preprocessing-Pipeline und dem Fine-Tuning in Track B. Die Pipeline baut auf spaCy auf und stellt drei Varianten bereit — von minimaler Bereinigung bis zur Ersetzung konkreter Eigennamen durch abstrakte Platzhalter per Named Entity Recognition. Genau diese Varianten machten sichtbar, wie stark die Modelle in Wahrheit auf Oberflächenmerkmale zurückgreifen.",
      "In Track A zeigte sich ein klares Muster: Der kurze Baseline-Prompt schlug auf Rohtext alle aufwendig strukturierten Varianten. Erst auf vorverarbeiteten Daten drehte sich das Bild, weil den komplexen Prompts die ablenkenden Eigennamen fehlten. In Track B verbesserten der Wechsel auf MPNet, Chunking und Tail-Embeddings die Baseline schrittweise — das anschließende Fine-Tuning mit Triplet Loss verschlechterte das Ergebnis jedoch bis auf Zufallsniveau. Die Analyse dieses Effekts wurde zu einem der interessantesten Ergebnisse der Arbeit: Die synthetische Triplet-Supervision passt nicht zum eigentlichen Ähnlichkeitsziel und verzerrt die Embedding-Geometrie, statt sie zu schärfen. Für die finale Abgabe blieb deshalb bewusst die vortrainierte Baseline im Einsatz.",
    ],
    highlights: [
      "Preprocessing-Pipeline mit spaCy — Tokenisierung, POS-Tagging, Dependency Parsing und NER, in drei Varianten von minimaler Bereinigung bis zur vollständigen Pseudonymisierung",
      "Track A: fünf Prompt-Varianten mit GPT-4o-mini, jeweils in Zero-Shot und Few-Shot, drei unabhängige Läufe bei Temperature 0 — bester Macro-F1 von 73,2 %",
      "Track B: Sentence-BERT mit 350-Zeichen-Chunks, gewichtetem Mean Pooling und zusätzlichem Tail-Embedding (e = 0,6 · e_full + 0,4 · e_tail) — Steigerung von 55 % auf 62,5 %",
      "Klares negatives Ergebnis sauber herausgearbeitet: Fine-Tuning mit Triplet Loss fiel auf 49,5 % und damit auf Zufallsniveau — Ursachenanalyse per 80/20-Split schloss Overfitting aus",
      "Zentrale Erkenntnis: Einfache Prompts schlagen komplexe, und vortrainierte Encoder sind erstaunlich starke Baselines",
    ],
    techStack: [
      { group: "Sprache", items: ["Python"] },
      {
        group: "NLP & KI",
        items: ["spaCy", "Sentence-BERT", "MPNet", "GPT-4o-mini", "Triplet Loss", "Contrastive Learning"],
      },
      {
        group: "Bibliotheken",
        items: ["sentence-transformers", "OpenAI API", "scikit-learn", "NumPy", "pandas"],
      },
      { group: "Methodik", items: ["Prompt Engineering", "Zero-/Few-Shot", "Macro-F1", "NER-Pseudonymisierung"] },
    ],
    links: [],
    downloads: [
      {
        label: "Projektbericht (Team #23)",
        href: "/documents/semeval-2026-report-team-23.pdf",
        meta: "PDF · 14 Seiten · Februar 2026",
      },
      {
        label: "Poster der Midterm-Präsentation",
        href: "/documents/semeval-2026-poster-team-23.pdf",
        meta: "PDF · 1 Seite · Zwischenstand",
      },
    ],
    images: [],
  },
  {
    slug: "bachelorarbeit-web-scraper",
    title: "Bachelorarbeit: Web-Scraper für die akademische Forschung",
    summary:
      "Forschende brauchen große Datenmengen, aber längst nicht jede Webseite bietet eine API. Diese Bachelorarbeit entwickelt einen Web-Scraper als lokale Spring-Boot-Anwendung, der Tabellen und Listen in ihren vielen Ausprägungen zuverlässig extrahiert, in einer Datenbank verwaltet und nach CSV oder JSON exportiert.",
    status: "Abgeschlossen",
    tags: ["Java", "Spring Boot", "Selenium", "MongoDB", "Docker", "Multithreading"],
    period: "Apr — Jul 2025",
    role: "Bachelorarbeit · Note-relevante Einzelarbeit",
    context:
      "Heinrich-Heine-Universität Düsseldorf · Lehrstuhl für Datenbanken und Informationssysteme · Gutachter: Prof. Dr. Stefan Conrad, Prof. Dr. Michael Leuschel",
    overview: [
      "Web Scraping ist für die akademische Forschung oft der einzige Weg an Daten, die sonst unzugänglich blieben — etwa wenn eine Webseite keine API anbietet. Genau hier setzt die Arbeit an: Statt auf externe Dienste angewiesen zu sein, sollte der Lehrstuhl ein eigenes, frei konfigurierbares System bekommen, das sich auf die jeweiligen Forschungsprojekte zuschneiden lässt.",
      "Entstanden ist eine lokale Webanwendung in Java mit Spring Boot. Sie beherrscht zwei Betriebsarten: manuelles Scraping, bei dem man eine URL eingibt und sofort eine Vorschau der extrahierten Daten bekommt, sowie automatisiertes Scraping über konfigurierbare Tasks, die ein Scheduler in Intervallen von fünf Minuten bis zu vier Wochen anstößt. Die Ergebnisse landen in einer Datenbank, lassen sich in der Oberfläche nachbearbeiten — Spalten umbenennen oder löschen — und nach CSV oder JSON exportieren, inklusive automatischer Typzuweisung.",
      "Der inhaltliche Kern liegt auf der robusten Extraktion von Tabellen- und Listenstrukturen. Da HTML in der Praxis in unzähligen Varianten auftritt, wurden spezialisierte Extraktionsmethoden mit Fallback-Strategien entworfen: tief verschachtelte Listen, Listeneinträge aus mehreren HTML-Elementen, leere und whitespace-dominierte Felder, unregelmäßige Header. Für dynamische, JavaScript-getriebene Seiten kommt Selenium zum Einsatz, das echte Nutzerszenarien simulieren kann — anders als reine HTML-Parser wie JSoup.",
      "Architektonisch folgt die Anwendung dem Ports-and-Adapters-Muster (hexagonale Architektur) mit sauber getrennten Application-, Domain- und Infrastructure-Schichten. Dependency Inversion hält den Anwendungskern frei von Infrastrukturabhängigkeiten, Datenbankobjekte sind konsequent von Domain-Modellen getrennt. Das macht das System nicht nur wartbar, sondern auch gut testbar — abgesichert durch umfangreiche Unit- und Integrationstests über Controller, Services, Datenbank und Scraper.",
      "Für Performanz sorgt Multithreading: Die zu verarbeitenden Daten werden in gleich große Blöcke aufgeteilt und parallel abgearbeitet, wobei die Threadanzahl konfigurierbar ist und gegen die real verfügbaren Kerne validiert wird. Als Datenbank fiel die Wahl bewusst auf MongoDB, weil gescrapte Inhalte heterogen und schemalos sind — alle Ergebnisse landen in einem einheitlichen ScrapedData-Modell samt Metadaten.",
    ],
    highlights: [
      "Zwei Betriebsarten: manuelles Scraping mit Live-Vorschau und automatisierte Tasks über einen Scheduler (Intervalle von 5 Minuten bis 4 Wochen, pausierbar ohne Konfigurationsverlust)",
      "Robuste Extraktion von Tabellen und Listen in vielen Ausprägungen — inklusive tief verschachtelter Listen, mehrteiliger Listeneinträge und unregelmäßiger Header, abgesichert durch Fallback-Methoden",
      "Selenium-basierter StealthWebScraper für dynamische, JavaScript-gerenderte Seiten",
      "Hexagonale Architektur (Ports and Adapters) mit Dependency Inversion und strikter Trennung von DAOs und Domain-Modellen",
      "Parallele Verarbeitung per Multithreading mit konfigurierbarer Threadanzahl und Validierung gegen die verfügbaren Kerne",
      "MongoDB als schemalose Persistenz mit einheitlichem ScrapedData-Modell inklusive Metadaten",
      "Export nach CSV und JSON mit automatischer Typzuweisung",
      "Umfangreiche Testsuite mit JUnit, Mockito und Spring Test über Controller, Services, Datenbank und Scraper",
    ],
    techStack: [
      { group: "Sprache", items: ["Java 17"] },
      {
        group: "Backend",
        items: ["Spring Boot", "Spring MVC", "Spring Data MongoDB", "Spring Validation"],
      },
      { group: "Frontend", items: ["Thymeleaf", "HTML", "CSS"] },
      { group: "Scraping", items: ["Selenium"] },
      { group: "Datenbank", items: ["MongoDB"] },
      { group: "Infrastruktur", items: ["Docker", "Docker Compose", "Gradle"] },
      { group: "Tests", items: ["JUnit", "Mockito", "AssertJ", "Spring Test"] },
    ],
    links: [],
    downloads: [
      {
        label: "Bachelorarbeit (vollständig)",
        href: "/documents/bachelorarbeit-web-scraper-moritz-gilges.pdf",
        meta: "PDF · 43 Seiten · Juli 2025",
      },
    ],
    images: [],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

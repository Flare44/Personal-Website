# Archiv

Dateien, die nicht mehr auf der Website verwendet werden, aber absichtlich aufgehoben sind. **Nichts hier wird ausgeliefert** — in den Build gelangt nur `public/`.

| Datei | Was es ist |
|---|---|
| `Profile.pdf` | Alter Lebenslauf, ersetzt durch `public/documents/lebenslauf-moritz-gilges.pdf` (Stand August 2026) |
| `Approach.png` | Ungenutzte Grafik aus einem frühen Entwurf |
| `Coding-Background.png` | Frühere Hintergrundgrafik |
| `Actual-Coding-Background.png` | Frühere Hintergrundgrafik, lag doppelt in `public/` |
| `New-Coding-Image.png` | Frühere Hintergrundgrafik, lag doppelt in `public/` |
| `komponenten/AISection.astro` | Astro-Komponente, die zuletzt nirgends mehr importiert wurde |

Wird eine dieser Dateien wieder gebraucht, gehört sie zurück nach `public/` (bzw. nach `src/assets/`, wenn sie über `astro:assets` optimiert werden soll). Die Komponente gehört nach `src/components/` und muss zusätzlich in einer Seite importiert werden.

# Changelog

All notable changes to this project will be documented in this file.

## [2.1.0] - 2026-08-25

### Added
- **Testing:** Umfassende Test-Infrastruktur mit Vitest und React Testing Library eingeführt. 6 Test-Suiten mit 53 Tests sichern nun Barrierefreiheit, View Transitions, Stabilität und den kompletten E2E-Workflow ab.
- **View Transitions:** Native View Transitions API im Wizard integriert. Ein Wechsel der Schritte löst nun eine flüssige Slide-Animation (vor/zurück) aus, die sich via `prefers-reduced-motion` bei Bewegungsempfindlichkeit abschaltet.
- **UX (Toasts):** Neues, responsives Toast-Notification-System für Erfolgs- und Fehlermeldungen (z.B. bei Backup-Fehlern) hinzugefügt, um blockierende Browser-Alerts zu ersetzen.

### Changed
- **Architektur (Steps 8–10):** Die Wizard-Schritte 8 (Hinweise), 9 (Eigene Kapitel) und 10 (Abschluss) wurden auf `react-hook-form` mit `useFormContext` und `useFieldArray` migriert. Damit nutzen nun alle 10 Schritte einheitlich `react-hook-form` und `zod` für Formular-State und Validierung.
- **Architektur (Step 8 & 9):** Die Legacy-Hilfsfunktion `useArrayField` wurde durch das native `useFieldArray` von `react-hook-form` ersetzt.
- **Architektur (Step 10):** Formular-Daten werden nun über `useFormContext` bezogen. Der App-spezifische `FormContext` steuert nur noch den Download.
- **Barrierefreiheit (Formulare):** Sämtliche Eingabefelder (`Input`, `Select`, `Textarea`, `DocumentUpload`) wurden vollständig semantisch und zugänglich aufgebaut (z.B. eindeutige `id`/`htmlFor` über `useId()`, `aria-describedby`, `<fieldset>`/`<legend>` für Radio-Groups, Wrapper-`<form>`).
- **Barrierefreiheit (Sprache):** Das `<html lang="de">`-Attribut wird nun dynamisch bei einem Sprachwechsel mit `i18next` aktualisiert, um WCAG 3.1.1 (Sprache der Seite) zu erfüllen.
- **Lokale Assets:** Alle externen CDN- und Font-Aufrufe wurden entfernt. Die App nutzt zu 100% lokale Assets, einen System-Font-Stack sowie PDF-14 Standardfonts für maximale Privatsphäre und Offline-Fähigkeit.
- **Code-Bereinigung:** Toter Code (`App.css`, `split_i18n.py`, Vite-Boilerplate-Logos) und unbenutzte Abhängigkeiten aus der `package.json` wurden entfernt. Die `vite.config.ts` nutzt nun native ECMAScript Import Attributes (`with { type: 'json' }`).

### Fixed
- **PDF-Vorschau (Step 10):** Ein kritischer Performance-Bug wurde behoben, bei dem die PDF-Vorschau in einer Endlosschleife ständig neu generiert wurde.
- **UX:** Störende und UI-blockierende native `alert()`-Aufrufe beim Import und PDF-Export wurden entfernt und durch integrierte Toast-Meldungen ersetzt.

## [2.0.0] - 2026-08-01

### Added
- **Sicherheit (Backup):** Optionale AES-256 Verschlüsselung für Backup-Dateien. Backups können nun mit einem Passwort direkt im Browser ver- und entschlüsselt werden.
- **Basisdaten:** Neue Sektion "Arbeit / Beschäftigung" zur Erfassung von Arbeitgeberdetails und betrieblichen Notfallkontakten (Schritt 1).
- **Basisdaten:** Neue Liste zur Erfassung von "Nicht zu benachrichtigenden Personen" im Notfall (Schritt 1).
- **Medizinische Daten:** Neue Sektion zur Erfassung der "Behandelnden Ärzte" wie Hausarzt, Zahnarzt oder Fachärzte (Schritt 2).
- **PDF-Export:** Die exportierte PDF-Datei enthält nun auch die neu erfassten Daten zu Arbeit/Beschäftigung, nicht zu benachrichtigenden Personen und behandelnden Ärzten.
- **Lokalisierung:** Vollständige deutsche und englische Übersetzungen für alle neuen Formularfelder und PDF-Bereiche.

### Fixed
- **Backup & Export:** Es wurden fehlende Formularfelder zur `.json`-Backupdatei hinzugefügt (z.B. neuere Dokumenten-Uploads wie die Bestattungsverfügung sowie bisher nicht inkludierte optionale Notizfelder), sodass beim Export nun alle eingegebenen Daten gesichert werden.

### Changed
- **Performance:** Die 10 Wizard-Schritte werden nun dynamisch über `React.lazy()` nachgeladen (Code Splitting), was die initiale Ladezeit der App erheblich reduziert.
- **State Management:** Schreibvorgänge des Formular-Zustands in den `sessionStorage` wurden zur Performance-Optimierung gedebounced (Verzögerung von 500ms).
- **Architektur:** Die veraltete Legacy-Migrationslogik im `FormContext.tsx` wurde in eine saubere Helferfunktion (`utils/migrateData.ts`) ausgelagert.
- **i18n:** Die Übersetzungen für Deutsch und Englisch wurden aus der Hauptdatei in separate Dateien im `src/locales/` Ordner ausgelagert, um den Code übersichtlicher zu halten.
- **Konfiguration:** Entfernung des irreführenden `packageManager`-Felds in der `package.json`.
- **Dependencies:** Aktualisierung diverser npm-Abhängigkeiten (Minor/Patch-Updates für z.B. Vite, React, Tailwind, ESLint).

## [1.3.1] - 2026-05-10

### Changed
- **Refactoring:** Wizard-Komponenten in `WizardSteps.tsx` wurden final aufgeräumt und nutzen nun konsequent die ausgelagerten Dateien aus dem `steps`-Ordner.
- **Security & Privacy:** Vollständige Code-Analyse (Privacy Check) durchgeführt und fehlende Abhängigkeiten für den Build-Prozess (`npm install`) behoben. Es ist verifiziert, dass die App zu 100 % lokal arbeitet und keinerlei externe API- oder Tracking-Aufrufe tätigt.

### Fixed
- **UI:** Überlappende Tailwind Dark Mode Klassen korrigiert (#15 von [@LucaNerlich]).

## [1.3.0] - 2026-04-28

### Added
- **CI:** Einfache GitHub Action für die Continuous Integration hinzugefügt (#10 von [@LucaNerlich]).

### Changed
- **PWA:** `vite-pwa` wurde durch einen Stub-Service-Worker ersetzt, um Chrome-Warnungen zu beheben (#13 von [@LucaNerlich]).
- **Docker:** Die Umgebungsvariable `PORT` wurde in der Compose-Datei in `HOST_PORT` umbenannt (#12 von [@LucaNerlich]).
- **Refactoring:** Die Wizard-Schritte wurden zur besseren Wartbarkeit strukturell aufgeteilt (#9 von [@LucaNerlich]).
- **Cleanup:** Ungenutzte Hilfsskripte (Helper Scripts) wurden entfernt (#7 von [@LucaNerlich]).
- **Lokalisierung:** Korrekturen und Verbesserungen an den Übersetzungs-Strings (#6 von [@LucaNerlich]).

### Fixed
- **UI (Wizard):** Eine doppelte CSS-Klasse (`className`) auf dem mobilen Menü-Button wurde entfernt (#14 von [@LucaNerlich]).
- **UI:** Fehlender Mauszeiger (`cursor: pointer`) bei den Welcome-Buttons wurde hinzugefügt.

## [1.2.0] - 2026-04-22

### Changed
- **Automatisierte Versionierung:** Die Versionsnummer der App wird nun beim Build-Prozess direkt und automatisch aus der `package.json` ausgelesen und über die Vite-Konfiguration (`import.meta.env`) im Frontend bereitgestellt. Dadurch muss die Version bei einem neuen Release nicht mehr manuell im Code nachgezogen werden. Danke für diesen hilfreichen Beitrag an [@LucaNerlich]!
- **Port-Konfiguration:** Der Standard-Port von Vite kann nun über die Umgebungsvariable `PORT` flexibel überschrieben werden und lauscht standardmäßig auf allen Netzwerk-Schnittstellen (`host: true`). Danke für diesen hilfreichen Beitrag an [@LucaNerlich]!
- **Docker & Sicherheit:** Optimierung des Docker-Setups durch Hinzufügen einer `.dockerignore` und Dockerfile-Caching. Um die Ausführung als Root-Benutzer zu vermeiden, wurde auf das Image `nginxinc/nginx-unprivileged:stable-alpine` gewechselt. Zudem wurde ein Docker Healthcheck implementiert (Merge Request #2). Danke für diesen hilfreichen Beitrag an [@LucaNerlich]!


## [1.1.0] - 2026-04-20

### Added
- **Hilfreiche Links & Vorlagen:** Neue Informationsboxen im Bereich "Vollmachten & Verfügungen" mit direkten Links zu offiziellen Vorlagen (BMJV, Verbraucherzentrale, Friedhofsverband Sauerland). Danke für den Tipp an klotzbrocken.
- **App-Version:** Die aktuelle Versionsnummer (v1.1.0) wird nun dezent am Ende der Startseite angezeigt und verlinkt direkt zum GitHub-Repository. Ebenfalls in der package.json
- **Dummy-Daten:** Die Datei `Muster_Notfallakte_Dummy_Daten.json` wurde um die neuen Standard-Dokumente und -Verfügungen (Geburtsurkunde, Patientenverfügung etc.) erweitert, um die Platzhalter-Funktion direkt demonstrieren zu können.


### Fixed
- **PDF-Export (Verfügungen):** Platzhalter-Seiten (leere Seiten) für Standard-Verfügungen werden nun korrekt im PDF erstellt, wenn "Später als Kopie einheften" ausgewählt wurde.
- **PDF-Export (Dokumente):** Platzhalter für Standard-Ausweise (z.B. Führerschein, Personalausweis) werden in der generierten PDF nun korrekt dargestellt.
- **Docker:** Die npm Version wurde von 22 auf 24 korrigiert.
- **Build Prozess:** Durch den import einer ungenutzen verweiß, ging der npm run build Prozesss nicht ordentlich druch.

## [1.0.0] - 2026-04-18

### Added
- **Initial Release:** Grundgerüst der Notfallakte-Anwendung.
- **Wizard-Navigation:** Schritt-für-Schritt-Formular zur Erfassung von Basisdaten, Kontakten, medizinischen Informationen, digitalem Nachlass und Finanzen.
- **Lokale Verarbeitung (Privacy First):** Alle Daten werden ausschließlich im Browser verarbeitet, es findet keine Server-Kommunikation statt.
- **Backup & Restore:** Möglichkeit, die eingegebenen Daten als `.json`-Datei zu exportieren und später wieder zu importieren.
- **PDF-Generierung:** Direkter Export der erfassten Notfallakte als strukturierte und formatierte PDF-Datei.
- **PWA-Unterstützung:** Die App kann als Progressive Web App (PWA) lokal installiert und offline genutzt werden.
- **Installations-Button:** Ein nativer "Als lokale App installieren"-Button auf der Startseite (wird angezeigt, wenn der Browser dies unterstützt).
- **Internationalisierung (i18n):** Vollständige Mehrsprachigkeit (Deutsch & Englisch) mit automatischer Spracherkennung implementiert.
- **Performance:** Die rechenintensive PDF-Generierung wurde in einen Web Worker ausgelagert, sodass die Benutzeroberfläche während des Exports flüssig bleibt.
- **Dark Mode:** Vollständige Unterstützung für einen dunklen Modus mit Toggle-Button auf der Welcome-Page, der Sidebar und im mobilen Header.
- **Markdown-Editor:** Integration von `@uiw/react-md-editor` in Textbereiche für einfache Formatierungen (Fett, Kursiv, Hyperlinks).
- **PDF-Formatierung:** Der PDF-Generator liest nun Markdown-Tags aus den Textfeldern und rendert fett- und kursivgedruckten Text sowie echte, klickbare Hyperlinks.
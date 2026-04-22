# Changelog

All notable changes to this project will be documented in this file.

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
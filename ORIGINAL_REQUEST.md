# Original User Request

## 2026-08-26T08:11:52Z

# Teamwork Project Prompt — Draft

> Status: Launched.
> Goal: Craft prompt → get user approval → delegate to teamwork_preview
> Requested team: [none — teamwork routes from the description]

Refaktorierung und Optimierung der Notfallakte-Frontend-App. Implementierung von semantischen HTML-Formularen, View Transitions für den Wizard, Entfernung von totem Code/unbenutzten Paketen, 100% lokale Assets (z.B. Schriftarten) und Sicherstellung eines einheitlichen Designs nach neuesten Best Practices.

Working directory: /home/alpha/test/rote-mappe
Integrity mode: demo

## Requirements

### R1. Semantische Formulare & Accessibility
Alle Formulare und Eingabefelder müssen in `<form>`-Tags gewrappt und semantisch korrekt sein (korrekte `htmlFor`/`id`-Verlinkungen, `aria-describedby` für Fehler, `autocomplete` und `inputmode`).

### R2. View Transitions
Implementierung der nativen View Transitions API für den Wizard-Ablauf, um flüssige, richtungsbasierte Slide-Animationen (vor/zurück) zwischen den Schritten zu erzeugen. Hierfür dürfen vorhandene Open-Source-Snippets als Vorlage genutzt werden.

### R3. Fokus auf Stabilität bei Code-Bereinigung
Entfernung von offensichtlich totem oder altem Code sowie Bereinigung der `package.json` von nicht mehr benötigten Abhängigkeiten. Die Dateistruktur soll beibehalten werden (Fokus auf Stabilität statt aggressivem Refactoring).

### R4. Lokale Assets & Design-Einheitlichkeit
Alle externen Abhängigkeiten (wie Web-Fonts) müssen zu 100% lokal eingebunden werden. Das Design muss über alle Komponenten hinweg konsistent sein.

## Acceptance Criteria

### Funktionalität & Build-Stabilität
- [ ] Der Befehl `npm run build` läuft ohne TypeScript- oder ESLint-Fehler erfolgreich durch.
- [ ] Formulardaten werden weiterhin korrekt erfasst und durch React Hook Form fehlerfrei validiert.

### Visuelle & Strukturelle Kriterien
- [ ] Ein Navigationswechsel (vor/zurück) im Wizard löst eine flüssige Animation über die View Transitions API aus.
- [ ] Jedes `<input>`-Feld besitzt ein passendes `<label>` mit korrektem `htmlFor`-Attribut.
- [ ] Ein Scan des Netzwerktraffics im Browser-DevTool (bzw. im Code) zeigt, dass keine externen Domains für Fonts oder Stylesheets aufgerufen werden.

### Abhängigkeiten
- [ ] `package.json` enthält keine offensichtlich ungenutzten Pakete mehr (z.B. Pakete, die weder importiert noch im Build-Prozess benötigt werden).

## Follow-up — 2026-08-26T08:27:42Z

Der Server wurde neu gestartet. Bitte setze die Arbeit an der Notfallakte-App dort fort, wo du aufgehört hast (Aufbau der Testinfrastruktur und Implementierung der Feature-Matrix). Gib Bescheid, wenn die Umsetzung abgeschlossen ist.

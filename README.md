<div align="center">
  <h1>🚨 Notfallakte Generator (Rote Mappe)</h1>
  <p>
    <strong>Eine 100% lokale, sichere und browserbasierte Anwendung zur Erstellung Ihrer persönlichen Notfallmappe.</strong>
  </p>
  <p>
    <a href="#-features">Features</a> •
    <a href="#-datenschutz--sicherheit">Datenschutz</a> •
    <a href="#-installation--bereitstellung">Installation</a> •
    <a href="#-technologien">Technologien</a> •
    <a href="#-lizenz">Lizenz</a>
  </p>
  <br />
  <a href="https://ko-fi.com/alpha63" target="_blank">
    <img src="https://storage.ko-fi.com/cdn/kofi2.png?v=3" alt="Unterstütze mich auf Ko-fi" height="55" />
  </a>
  <p><em>Dieses Projekt ist zu 100% kostenlos und werbefrei.<br/>Wenn dir dieses Tool geholfen hat, freue ich mich riesig über einen virtuellen Kaffee als Unterstützung für die Weiterentwicklung! ☕</em></p>
</div>

---

## 📖 Über das Projekt

Dieses Tool ist aus einem **eigenen Bedürfnis innerhalb der Familie** heraus entstanden. Oftmals wird das Thema Notfallvorsorge vor sich hergeschoben, weil es unangenehm, komplex oder unübersichtlich wirkt. Der Notfallakte Generator soll genau hier ansetzen und als zentraler Anlaufpunkt dienen, um dieses so wichtige Thema endlich **strukturiert, unkompliziert und vor allem sicher** angehen zu können.

Ein Unfall, eine schwere Krankheit oder andere unvorhersehbare Ereignisse können jeden treffen. In solchen Momenten ist es für Angehörige, Ärzte und Vertrauenspersonen von größter Wichtigkeit, schnell auf alle relevanten und gebündelten Informationen zugreifen zu können.

Der **Notfallakte Generator** führt den Nutzer schrittweise durch alle essenziellen Lebensbereiche:
- Persönliche Basisdaten & Kontakte
- Medizinische Daten & Organspende-Verfügungen
- Finanzen, Bankkonten & Vermögenswerte
- Laufende Verträge & Verbindlichkeiten
- Digitale Identitäten & Passwörter
- Wichtige Dokumente (Urkunden, Ausweise, Zeugnisse)
- Vollmachten & Patientenverfügungen

Am Ende des geführten Prozesses (Wizard) generiert die Anwendung ein übersichtliches, druckfertiges PDF-Dokument ("Die Rote Mappe"), welches als physischer Begleiter für den Notfall ausgedruckt und sicher hinterlegt werden kann.

## 🧪 Ausprobieren (Dummy-Daten)

Um die Anwendung schnell und unverbindlich zu testen, liegt dem Projekt die Datei `Muster_Notfallakte_Dummy_Daten.json` bei. Dabei handelt es sich um ein Demo-Backup mit fiktiven Beispieldaten (Familie Mustermann). Laden Sie diese Datei einfach über die Schaltfläche **"Bestehendes Backup laden"** auf der Startseite hoch, um die App direkt mit Daten zu füllen und sich sofort eine fertige Vorschau-PDF generieren zu lassen.

## 📸 Vorschau

![Startseite](Images/welcome.png)
*Die übersichtliche Startseite der Anwendung.*

![Wizard / Formular](Images/Basis_u_Kontakte.png)
*Schritt-für-Schritt-Datenerfassung mit dem integrierten Editor.*

![Dark Mode Ansicht](Images/Dark_Basis_u_Kontakte.png)
*Die App im neuen, augenschonenden Dark Mode.*

![PDF Vorschau](Images/PDF_Generierung.png)
*Die fertig generierte, druckfertige Rote Mappe als PDF.*

## ✨ Features

- **🛡️ 100% Lokal & Zero-Knowledge-Architektur:** Alle sensiblen Daten werden **ausschließlich** lokal in Ihrem Browser verarbeitet. Es findet **keine** Kommunikation mit externen Servern statt. Ihre Daten bleiben immer bei Ihnen.
- **♿ Barrierefreiheit (a11y):** Die Anwendung ist vollständig semantisch aufgebaut, unterstützt Screenreader (via WAI-ARIA), dynamische HTML-Spracherkennung und strebt nach WCAG-Konformität.
- **🌍 Mehrsprachigkeit (i18n):** Die Anwendung ist vollständig auf Deutsch und Englisch verfügbar.
- **📱 PWA & Offline-Fähigkeit:** Die App lässt sich direkt als Desktop- oder Mobile-App installieren und funktioniert ohne aktive Internetverbindung.
- **✨ Moderne & flüssige UX:** Nutzung der nativen View Transitions API für nahtlose Seitenwechsel im Wizard sowie unaufdringliche Toast-Notifications statt störender Browser-Alerts.
- **🌗 Dark Mode:** Elegantes, augenschonendes Design, das sich an Ihre Systemeinstellungen anpasst oder manuell umgeschaltet werden kann.
- **✏️ Rich-Text & Markdown:** Formatieren Sie Ihre Notizen und eigenen Kapitel ganz einfach mit dem integrierten Editor. Die Formatierungen (Fett, Kursiv) und Hyperlinks werden originalgetreu und klickbar in das PDF übernommen.
- **📝 Intelligente & asynchrone PDF-Generierung:** Automatische Erstellung eines Inhaltsverzeichnisses, tabellarischer Übersichten und Einbettung hochgeladener Scans direkt in das PDF. Dies geschieht blockierungsfrei im Hintergrund (via Web Worker), sodass die App stets flüssig bleibt.
- **🎨 Anpassbares Design:** Wählen Sie zwischen verschiedenen professionellen Layout-Vorlagen für Ihr fertiges PDF-Dokument (z.B. "Klassisch Rot", "Modern & Edel", "Standard Blau").
- **💾 Lokales Backup & Restore:** Exportieren Sie Ihre eingegebenen Daten zusammen mit dem PDF als verschlüsseltes ZIP-Archiv. Die enthaltene `.json`-Backupdatei können Sie jederzeit wieder in die App laden, um Ihre Notfallakte in der Zukunft einfach zu aktualisieren.
- **🔄 Session-Schutz:** Automatischer Schutz vor Datenverlust beim versehentlichen Neuladen der Seite durch Zwischenspeicherung im temporären `sessionStorage` des Browsers. Nach dem Schließen des Tabs sind alle Daten unwiderruflich gelöscht.

## 🔒 Datenschutz & Sicherheit

Der Schutz Ihrer hochsensiblen Daten steht bei diesem Projekt an oberster Stelle. 

- **Kein Backend, Keine Datenbank:** Die Anwendung besitzt keine Server-Komponente, die Daten speichert. Sie läuft komplett als statische Webanwendung in Ihrem Browser.
- **DSGVO-konform by Design:** Da keine personenbezogenen Daten den Client verlassen, ist die Anwendung inhärent datenschutzkonform.
- **Keine Tracking-Skripte:** Es werden keine externen Analyse-Tools, Tracker oder externe Schriftarten geladen.

## 🔗 Verwendete Links & Vorlagen

Um den Erstellungsprozess der Notfallakte so einfach und rechtssicher wie möglich zu gestalten, verweist die Anwendung im Bereich "Vollmachten & Verfügungen" auf externe, offizielle Vorlagen. Diese Links werden angeboten, da eigene, laienhafte Formulierungen bei solch sensiblen Dokumenten im Ernstfall von Banken, Ärzten oder Gerichten oft nicht anerkannt werden.

Folgende Quellen & Links werden in der App empfohlen:

- **Bundesministerium der Justiz (BMJV):** 
  - *Link:* [BMJ Formulare für Vorsorgevollmacht & Betreuungsverfügung](https://www.bmj.de/DE/service/formulare/form_vorsorgevollmacht/form_vorsorgevollmacht_node.html)
  - *Warum?* Das BMJV bietet die offiziellen und rechtlich geprüften Standardformulare für die **Vorsorgevollmacht** und die **Betreuungsverfügung** kostenlos an. Die in der App automatisch generierte "Konto- und Depotvollmacht" basiert ebenfalls auf den offiziellen Formulierungen des BMJV.
- **Verbraucherzentrale:**
  - *Link:* [Interaktive Patientenverfügung Online](https://www.verbraucherzentrale.de/patientenverfuegung-online)
  - *Warum?* Die Verbraucherzentrale stellt online eine interaktive Vorlage zur **Patientenverfügung** bereit. Diese erstellt durch gezielte Fragen eine auf die persönliche Situation zugeschnittene, medizinisch und rechtlich präzise Verfügung, die Ärzten im Ernstfall klare Handlungsanweisungen gibt.
- **Friedhofsverband Sauerland:**
  - *Link:* [Muster Bestattungsverfügung](https://www.friedhofsverband-sauerland.de/info-center/)
  - *Warum?* Bietet eine hilfreiche, kostenlose und bewährte Vorlage für die **Bestattungsverfügung** an, mit der letzte Wünsche für den Todesfall klar geregelt werden können.

*Hinweis: Alle verlinkten Vorlagen sind Angebote von Dritten. Die Rote Mappe ist unabhängig und verlinkt diese Ressourcen lediglich als kostenlose Hilfestellung für den Nutzer, ohne eine Gewähr für deren rechtliche Bindung zu übernehmen.*

## �️ Technologien

Dieses Projekt nutzt modernste Webtechnologien für maximale Performance und Sicherheit:

- **React 19** – Modernes Frontend-Framework
- **TypeScript** – Für eine typsichere und robuste Codebasis
- **Vite** – Extrem schnelles Build-Tool und Entwicklungsumgebung
- **Tailwind CSS 4** – Utility-first CSS-Framework für das Design
- **Vitest & React Testing Library** – Umfassende Test-Infrastruktur für hohe Code-Qualität
- **pdf-lib** – Komplexe PDF-Generierung direkt im Browser
- **@uiw/react-md-editor** – Leichtgewichtiger WYSIWYG-Editor für formatierbare Texte
- **JSZip** – Lokale Erstellung von ZIP-Archiven für das Backup

## 🚀 Installation & Bereitstellung

Das Projekt kann auf verschiedene Arten lokal ausgeführt oder auf einem eigenen Server bereitgestellt werden.

### Option 1: Schneller Start mit Docker (Empfohlen)

Die Anwendung ist für den Betrieb mit Docker optimiert.

1. **Repository klonen:**
   ```bash
   git clone https://github.com/Alpha63/rote-mappe.git
   cd rote-mappe
   ```

2. **Container starten:**
   ```bash
   docker-compose up -d
   ```

3. **Anwendung öffnen:**  
   Navigieren Sie in Ihrem Browser zu `http://localhost:8080`.

### Option 2: Lokale Entwicklung (Node.js)

Wenn Sie aktiv am Code arbeiten möchten oder die App ohne Docker lokal starten wollen:

1. **Abhängigkeiten installieren:**
   ```bash
   npm install
   ```

2. **Entwicklungsserver starten:**
   ```bash
   npm run dev
   ```
   Die App ist unter `http://localhost:5173` erreichbar.

3. **Produktions-Build erstellen:**
   ```bash
   npm run build
   ```
   Die optimierten, statischen Dateien befinden sich anschließend im `dist/`-Verzeichnis und können von jedem beliebigen Webserver (NGINX, Apache, etc.) ausgeliefert werden.

4. **Tests ausführen:**
   Die Anwendung verfügt über eine umfassende Test-Suite (Vitest & React Testing Library), die UI-Komponenten und Workflows absichert.
   ```bash
   npm run test
   ```
   *(Tipp: Um die Tests während der Entwicklung bei jeder Dateiänderung automatisch neu auszuführen, können Sie den Befehl `npx vitest` nutzen).*

## 🤝 Mitwirken (Contributing)

Beiträge zum Projekt sind jederzeit willkommen! Wenn Sie Fehler finden, Verbesserungen am Design vorschlagen möchten oder neue Funktionen entwickeln, zögern Sie nicht, ein Issue oder einen Pull Request zu erstellen.

## ⚠️ Haftungsausschluss (Disclaimer)

Dieses Projekt ist ein reines Open-Source-Hobbyprojekt und wird "wie besehen" (as is) ohne jegliche Garantien zur Verfügung gestellt. 

- **Keine Rechts- oder Fachberatung:** Die Anwendung, die vorgegebenen Texte und die generierten PDFs dienen ausschließlich der privaten, organisatorischen Hilfestellung. Sie stellen **keine rechtliche, medizinische oder notarielle Beratung** dar. Für die rechtliche Gültigkeit, Richtigkeit und Vollständigkeit der erstellten Dokumente im Ernstfall (vermeintliche Falschangaben oder unzureichende Formulierungen) wird **keine Haftung** übernommen.
- **Externe Links:** Die Anwendung verweist auf externe Webseiten Dritter (z.B. BMJV, Verbraucherzentrale, Friedhofsverbände). Auf die aktuellen und zukünftigen Inhalte dieser Seiten habe ich keinen Einfluss und übernehme dafür ausdrücklich keine Gewähr. Für die Inhalte und Richtigkeit der verlinkten Formulare und Seiten ist stets der jeweilige Anbieter oder Betreiber verantwortlich.
- **Eingebundene Bibliotheken & Software:** Die "Rote Mappe" nutzt diverse Open-Source-Bibliotheken (z.B. React, pdf-lib, JSZip). Ich übernehme keine Haftung für mögliche Fehler, Bugs, Datenverluste oder Sicherheitslücken, die durch die Nutzung dieser Fremdsoftware entstehen könnten.
- **Haftungsbeschränkung:** Die Nutzung der Software erfolgt vollständig auf eigene Gefahr. Jeder Nutzer ist selbst dafür verantwortlich, die generierten Dokumente (insbesondere Vollmachten und Verfügungen) auf ihre inhaltliche Korrektheit und rechtliche Wirksamkeit zu prüfen (ggf. durch anwaltliche oder notarielle Beratung). Eine Haftung für materielle, ideelle oder rechtliche Schäden, die durch die Nutzung oder Nichtnutzung dieser Anwendung (z.B. Nichtanerkennung der Notfallakte durch Behörden, Banken oder Ärzte) entstehen, ist grundsätzlich ausgeschlossen.

Das Projekt dient in erster Linie, einen ersten Anlaufpunkt zu bieten, wie man solch eine Rote Mappe anfertigen könnte.

## 📜 Lizenz

Dieses Projekt steht unter der **Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)** Lizenz.

Das bedeutet:
- **Teilen & Bearbeiten:** Sie dürfen das Projekt kopieren, verändern und weiterentwickeln.
- **Namensnennung:** Der ursprüngliche Autor muss genannt werden.
- **Nicht kommerziell:** Die Nutzung, Bereitstellung oder der Verkauf dieses Tools im Rahmen einer kommerziellen Dienstleistung ist **strengstens untersagt**.
- **Weitergabe unter gleichen Bedingungen:** Abgeleitete Werke müssen unter derselben Lizenz veröffentlicht werden.

Weitere Details finden Sie in der `LICENSE` Datei.
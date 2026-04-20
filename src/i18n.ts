import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  de: {
    translation: {
      common: {
        select: "Wählen..."
      },
      sidebar: {
        title: "Notfallakte",
        steps: {
          step1: { title: "Basis & Kontakte", description: "Persönliches & Angehörige" },
          step2: { title: "Medizinische Daten", description: "Ärzte & Vorerkrankungen" },
          step3: { title: "Finanzen", description: "Bankkonten & Depots" },
          step4: { title: "Verträge", description: "Policen & Miete" },
          step5: { title: "Digitale Identität", description: "Wichtige Accounts" },
          step6: { title: "Dokumente", description: "Urkunden & Ausweise" },
          step7: { title: "Vollmachten", description: "Verfügungen & Testament" },
          step8: { title: "Allgemeine Hinweise", description: "Persönliche Worte" },
          step9: { title: "Eigene Kapitel", description: "Zusätzliche Inhalte" },
          step10: { title: "Abschluss & Vorschau", description: "PDF generieren" }
        },
        buttons: {
          creatingBackup: "Erstelle Backup...",
          success: "Erfolgreich!",
          saveBackup: "Backup sichern"
        },
        footer: {
          localProcessing: "Alle Daten werden ausschließlich lokal auf Ihrem Gerät verarbeitet.",
          github: "Projekt auf GitHub ansehen"
        }
      },
      welcome: {
        title: "Notfallakte",
        subtitle: "Vorsorge treffen,\nSicherheit schenken.",
        description: "Mit dem Notfallordner-Generator erstellen Sie eine strukturierte Übersicht Ihrer wichtigsten Daten für Ihre Angehörigen.",
        welcomeTo: "Willkommen zu Ihrer Notfallakte",
        feature1: { title: "Einfach & Strukturiert", desc: "Wir führen Sie Schritt für Schritt durch alle relevanten Bereiche – von Basisdaten bis hin zu Finanzen." },
        feature2: { title: "Maximale Sicherheit", desc: "Ihre Daten gehören Ihnen. Die gesamte Verarbeitung findet lokal in Ihrem Browser statt. Es werden keine Daten an Server übertragen oder im Internet gespeichert." },
        feature3: { title: "Direkter Download", desc: "Am Ende erhalten Sie Ihre persönliche Notfallakte als fertiges PDF-Dokument zum Herunterladen und Ausdrucken." },
        startBtn: "Jetzt starten",
        loadBackup: "Bestehendes Backup laden",
        installApp: "Als lokale App installieren",
        note: "Hinweis: Dies ist eine Vorlage zur Orientierung und ersetzt keine anwaltliche Beratung.",
        backupError: "Fehler beim Lesen der Backup-Datei. Stellen Sie sicher, dass es sich um eine gültige Notfallakte-JSON handelt."
      },
      wizard: {
        back: "Zurück",
        next: "Weiter",
        warningTitle: "Hinweis zu Ihren Eingaben",
        warningDesc: "Einige Felder auf dieser Seite enthalten fehlerhafte oder unvollständige Eingaben (z.B. ungültige IBAN oder falsches Format). Möchten Sie Ihre Eingaben überprüfen oder trotzdem fortfahren?",
        checkInputs: "Eingaben überprüfen",
        continueAnyway: "Trotzdem weiter"
      },
      docUpload: {
        remove: "Dokument entfernen",
        customNamePlaceholder: "Name des Dokuments (z.B. Generalvollmacht)",
        whatToDo: "Wie möchten Sie mit diesem Dokument verfahren?",
        actionUpload: "Scan jetzt hochladen (wird im PDF integriert)",
        actionPlaceholder: "Später als Kopie einheften (erstellt leere Seite)",
        actionSkip: "Nicht in PDF aufnehmen",
        selectFile: "Datei auswählen (PNG/JPG/PDF)",
        success: "✓ Datei erfolgreich geladen",
        removeLink: "Entfernen"
      },
      wizardSteps: {
        step1: {
          title: "Basisdaten & Kontakte",
          desc: "Persönliche Angaben und wichtige Kontaktpersonen.",
          docTitle: "Dokumenttitel (Deckblatt)",
          docTitlePlaceholder: "z.B. Familie Mustermann",
          salutation: "Anrede",
          salutationMr: "Herr",
          salutationMrs: "Frau",
          salutationDiv: "Divers",
          firstName: "Vorname",
          middleName: "2. Name (optional)",
          lastName: "Nachname",
          birthDate: "Geburtsdatum",
          birthPlace: "Geburtsort",
          birthCountry: "Geburtsland",
          taxId: "Steuer-ID",
          taxIdPlaceholder: "11-stellige Nummer",
          ssn: "Sozialversicherungsnummer",
          addressTitle: "Adresse",
          street: "Straße",
          houseNumber: "Hausnr.",
          zipCode: "PLZ",
          city: "Ort",
          maritalStatusTitle: "Familienstand",
          status: "Status",
          statusSingle: "Ledig",
          statusMarried: "Verheiratet",
          statusDivorced: "Geschieden",
          marriageDate: "Hochzeitsdatum",
          divorceDate: "Scheidungsdatum",
          childrenCount: "Anzahl Kinder",
          child: "Kind",
          phone: "ggf. Telefonnummer",
          contactsTitle: "Wichtige Kontakte",
          contactsDesc: "Erfassen Sie Angehörige, Freunde, Arbeitgeber oder Vermieter.",
          contact: "Kontakt",
          contactRelation: "Beziehung",
          contactRelationPlaceholder: "z.B. Sohn, Arbeitgeber...",
          contactName: "Name",
          contactPhone: "Telefon",
          contactEmail: "E-Mail",
          contactDefaultType: "Angehöriger",
          addContact: "Kontakt hinzufügen"
        },
        step2: {
          title: "Medizinische Daten",
          desc: "Wichtige medizinische Informationen für Ärzte und Helfer im Notfall.",
          bloodType: "Blutgruppe",
          organDonor: "Organspendeausweis vorhanden?",
          yes: "Ja",
          no: "Nein",
          contradictionTitle: "Ich widerspreche einer Organspende ausdrücklich.",
          contradictionDesc: "Wenn Sie dieses Feld ankreuzen, wird in der Notfallakte ein Formular zum ausdrücklichen Widerspruch erstellt.",
          organDonorCopy: "Organspendeausweis Kopie",
          conditions: "Vorerkrankungen / chronische Leiden",
          conditionsPlaceholder: "z.B. Diabetes, Asthma...",
          medications: "Aktueller Medikamentenplan",
          medicationsPlaceholder: "Welche Medikamente nehmen Sie regelmäßig?",
          allergies: "Allergien (insb. Medikamente)",
          allergiesPlaceholder: "z.B. Penicillin...",
          notesLabel: "Weitere Hinweise, Anweisungen & Worte zu Medizinische Daten",
          notesDesc: "Gibt es weitere medizinische Aspekte, die Sie erwähnen möchten?"
        },
        step3: {
          title: "Finanzen",
          desc: "Erfassen Sie Bankkonten, Depots und Vermögen.",
          importantTitle: "WICHTIG: Bankinterne Vollmachten",
          importantDesc: "Die von den Banken selbst ausgestellten Vollmachtsformulare müssen im Notfall zwingend im Original vorliegen!",
          poaHintTitle: "Hinweis zur Konto-/ Depot-/ Schrankfachvollmacht",
          poaHintDesc: "Die automatisch generierte Vollmacht stammt von der Originalseite des Bundesministeriums der Justiz:",
          accountsTitle: "Bankverbindungen & Depots",
          bankName: "Name der Bank / Depot",
          bankAddress: "Anschrift der Bank / Depot",
          accountHolder: "Kontoinhaber",
          iban: "IBAN / Kontonr.",
          bic: "BIC",
          createPoa: "Konto-/ Depot-/ Schrankfachvollmacht erstellen",
          poaDataTitle: "Daten des Bevollmächtigten:",
          copyFromFirst: "Von Konto 1 übernehmen",
          address: "Anschrift",
          addAccount: "Konto / Depot hinzufügen",
          assetsTitle: "Weitere Vermögenswerte",
          newHeading: "Neue Überschrift",
          assetType: "Art des Vermögens",
          assetDetails: "Details & Aufbewahrungsort",
          addAsset: "Vermögenswert hinzufügen",
          insertHeading: "Überschrift einfügen",
          realEstateTitle: "Immobilien",
          realEstateType: "Immobilienart",
          country: "Land",
          fullAddress: "Vollständige Adresse / Lage",
          addRealEstate: "Immobilie hinzufügen",
          notesLabel: "Weitere Hinweise, Anweisungen & Worte zu Finanzen",
          notesDesc: "Informationen über Schließfächer, versteckte Konten etc."
        },
        step4: {
          title: "Verträge & Verbindlichkeiten",
          desc: "Erfassen Sie Versicherungen, Miete oder laufende Kredite.",
          contractType: "Vertragsart",
          provider: "Anbieter / Gesellschaft",
          contractNumber: "Vertrags- oder Policennummer",
          addContract: "Vertrag hinzufügen",
          notesLabel: "Weitere Hinweise, Anweisungen & Worte zu Verträge & Verbindlichkeiten",
          notesDesc: "Ergänzen Sie hier besondere Hinweise zu Ihren Verträgen.",
          insurance: "Versicherung"
        },
        step5: {
          title: "Digitale Identität",
          desc: "Wichtige Accounts, E-Mails und Profile.",
          accountsTitle: "Wichtige Accounts",
          service: "Dienst",
          servicePlaceholder: "z.B. Google",
          username: "Benutzername",
          password: "Passwort",
          link: "Link",
          addAccount: "Account hinzufügen",
          notesLabel: "Weitere Hinweise, Anweisungen & Worte zu Digitale Identität",
          notesDesc: "Hinweise zum Master-Passwort oder Geräte-PINs."
        },
        step6: {
          title: "Persönliche Dokumente",
          desc: "Scans hochladen oder Platzhalter erstellen.",
          addDoc: "Weiteres Dokument hinzufügen",
          certsTitle: "Zeugnisse & Weiterbildungszertifikate",
          school: "Schule / Institution",
          degree: "Abschlusstitel",
          year: "Abschlussjahr",
          addCert: "Zeugnis hinzufügen",
          notesLabel: "Weitere Hinweise, Anweisungen & Worte zu Persönliche Dokumente",
          notesDesc: "Notieren Sie hier beispielsweise, wo sich Originale oder Kopien befinden.",
          certPrefix: "Zeugnis: ",
          certNoTitle: "Ohne Titel"
        },
        step7: {
          title: "Vollmachten & Verfügungen",
          desc: "Wichtige Verfügungen und Informationen zum Testament.",
          importantTitle1: "Zwingend im Original: Testament & Vorsorgevollmacht",
          importantDesc1: "Eine Kopie ist hier rechtlich oft wirkungslos! Banken, Gerichte und Behörden verlangen im Ernstfall fast immer das Original. Eine Kopie beweist nicht, dass die Vollmacht nicht zwischenzeitlich widerrufen wurde.",
          importantTitle2: "Patientenverfügung",
          importantDesc2: "Das Original ist am sichersten. Wenn es schnell gehen muss, akzeptieren Ärzte aber oft auch eine gut lesbare Kopie oder einen Scan.",
          willTitle: "Testament",
          willHintTitle: "Hinweis zur Erstellung",
          willHintDesc: "Es gibt viele Generatoren im Internet zur Orientierung. WICHTIG: Das Testament muss anschließend zwingend komplett handschriftlich abgeschrieben und unterschrieben werden, da es sonst ungültig ist!",
          willHintLinkDesc: "Eine hilfreiche Anlaufstelle ist z.B.:",
          willLocLabel: "Aufbewahrungsort des Testaments",
          willLocPlaceholder: "z.B. Hinterlegt beim Amtsgericht Berlin...",
          poaTitle: "Verfügungen & Vollmachten als Scan",
          poaDownloadHintTitle: "Vorlagen vom Bundesministerium",
          poaDownloadHintDesc: "Offizielle Formulare für die Vorsorgevollmacht und Betreuungsverfügung finden Sie kostenlos beim Bundesministerium der Justiz:",
          poaPatientHintTitle: "Vorlage für die Patientenverfügung",
          poaPatientHintDesc: "Eine interaktive Vorlage für die Patientenverfügung bietet die Verbraucherzentrale online an:",
          poaFuneralHintTitle: "Vorlage für die Bestattungsverfügung",
          poaFuneralHintDesc: "Eine hilfreiche Vorlage für die Bestattungsverfügung finden Sie z.B. beim Friedhofsverband Sauerland unter \"Ratgeber Vorsorge\":",
          otherPoaTitle: "Weitere Vollmachten als Scan",
          docPatientenverfuegung: "Patientenverfügung",
          docVorsorgevollmacht: "Vorsorgevollmacht",
          docBetreuungsverfuegung: "Betreuungsverfügung",
          docBestattungsverfuegung: "Bestattungsverfügung",
          addOtherPoa: "Weitere Vollmacht hinzufügen",
          notesLabel: "Weitere Hinweise, Anweisungen & Worte zu Vollmachten & Verfügungen",
          notesDesc: "Ergänzen Sie hier wichtige Details, bspw. zu Notaren oder Zeugen."
        },
        step8: {
          title: "Allgemeine Hinweise & Schlüssel",
          keysTitle: "Schlüsselverzeichnis & Ersatzschlüssel",
          keyName: "Schlüsselname",
          keyPurpose: "Einsatzzweck",
          keyLocation: "Ablageort (Optional)",
          addKey: "Schlüssel hinzufügen",
          notesLabel: "Weitere Hinweise, Anweisungen & Worte zu Allgemeine Hinweise & Schlüssel",
          notesDesc: "Hinterlassen Sie hier allgemeine Hinweise, z.B. Anweisungen für Haustiere."
        },
        step9: {
          title: "Eigene Kapitel",
          chapterTitle: "Kapitel-Überschrift",
          notesLabel: "Weitere Hinweise, Anweisungen & Worte zu diesem Kapitel",
          addChapter: "Neues Kapitel hinzufügen"
        },
        step10: {
          title: "Abschluss & Vorschau",
          desc: "Ihre Daten verbleiben auf diesem Gerät.",
          templateLabel: "Design-Vorlage",
          templateDefault: "Standard (Blau)",
          templateClassic: "Klassisch (Rot)",
          templateModern: "Modern & Edel",
          includePlaceholders: "Platzhalter-Seiten einfügen",
          includeWarnings: "Wichtige Hinweise (\"Im Original beilegen\") anzeigen",
          downloading: "ZIP wird erstellt...",
          downloadSuccess: "Erfolgreich heruntergeladen!",
          downloadBtn: "ZIP (PDF & Uploads)",
          backupTitle: "Sicherung Ihrer Daten (Backup)",
          backupDesc: "Wenn Sie auf den Download-Button klicken, erhalten Sie ein ZIP-Archiv. Dieses enthält neben dem fertigen PDF und Ihren Anlagen auch eine Datei namens",
          backupDesc2: "Bewahren Sie diese Datei gut auf! Sie können diese JSON-Datei jederzeit auf der Startseite wieder einlesen, um Änderungen oder Ergänzungen vorzunehmen, ohne alles neu ausfüllen zu müssen.",
          previewTitle: "PDF Vorschau",
          previewGenerating: "Vorschau wird generiert...",
          previewWait: "Dies kann einen Moment dauern."
        }
      },
      pdf: {
        baseSection: {
          coverTitle: "BASISDATEN & KONTAKTE",
          coverDesc: "Persönliche Angaben, Adressdaten und wichtige\nKontaktpersonen für den Notfall.",
          born: "Geboren:",
          address: "Adresse:",
          maritalStatus: "Familienstand:",
          marriageDate: "Hochzeitsdatum:",
          divorceDate: "Scheidungsdatum:",
          childrenCount: "Anzahl Kinder:",
          taxId: "Steuer-ID:",
          ssn: "Sozialversicherungsnummer:",
          children: "Kinder:",
          childrenHeaders: ["Vorname", "Nachname", "Geburtsdatum", "Geburtsort", "Telefon"],
          contacts: "Wichtige Kontakte:",
          contactsHeaders: ["Beziehung", "Name", "Telefon", "E-Mail"]
        },
        contractsSection: {
          coverTitle: "VERTRÄGE & VERBINDLICHKEITEN",
          coverDesc: "Übersicht über Versicherungen, Miete,\nKredite und sonstige laufende Verträge.",
          contracts: "Laufende Verträge:",
          headers: ["Vertragsart", "Anbieter / Gesellschaft", "Vertrags- / Policennummer"]
        },
        coverPage: {
          title: "NOTFALLAKTE",
          subtitle: "Wichtige Dokumente und Informationen",
          createdOn: "Erstellt am:",
          of: "von",
          page: "Seite",
          legalNotice: "Rechtlicher Hinweis: Die in diesem Dokument enthaltenen Informationen und Anlagen stellen keine\nrechtsverbindliche Beratung dar. Die Formulare, insbesondere Vollmachten und Patientenverfügungen,\nsind Muster und können im Einzelfall eine anwaltliche oder notarielle Prüfung nicht ersetzen."
        },
        customSection: {
          notesTitle: "Weitere Hinweise, Anweisungen & Worte zu diesem Kapitel"
        },
        digitalSection: {
          coverTitle: "DIGITALE IDENTITÄT",
          coverDesc: "Zugangsdaten für Geräte, E-Mail-Konten, Social Media\nund andere digitale Dienste.",
          headers: ["Dienst", "Benutzername", "Passwort/PIN", "Link"]
        },
        documentsSection: {
          coverTitle: "DOKUMENTE & ZEUGNISSE",
          coverDesc: "Persönliche Urkunden, Ausweise und wichtige Zeugnisse.",
          docs: "Persönliche Dokumente:",
          docHeaders: ["Dokument"],
          certs: "Zeugnisse & Weiterbildungszertifikate:",
          certHeaders: ["Schule / Institution", "Abschlusstitel", "Jahr"],
          idCard: "Personalausweis",
          passport: "Reisepass",
          driversLicense: "Führerschein",
          birthCert: "Geburtsurkunde",
          marriageCert: "Heiratsurkunde",
          divorceCert: "Scheidungsurkunde",
          certPrefix: "Zeugnis: ",
          withoutTitle: "Ohne Titel"
        },
        financeSection: {
          coverTitle: "FINANZEN & VERMÖGENSWERTE",
          coverDesc: "Übersicht über Bankkonten, Depots, Immobilien und\nweitere Vermögenswerte.",
          warning: "WICHTIG: Bankinterne Vollmachten müssen im Original vorliegen!",
          accounts: "Bankkonten & Depots:",
          accountHeaders: ["Bank / Depot", "Inhaber", "IBAN / Kontonr.", "BIC"],
          assets: "Weitere Vermögenswerte (Gold, Krypto, etc.):",
          assetHeaders: ["Art des Vermögens", "Details & Aufbewahrungsort"],
          realEstate: "Immobilien:",
          realEstateHeaders: ["Immobilienart", "Land", "Adresse / Lage"]
        },
        helpers: {
          attachment: "Anhang: ",
          attachmentPdf: "Anhang (PDF): ",
          placeholderText: "(Bitte heften Sie hier an dieser Stelle später das Original oder eine Kopie von: {{name}} ein)",
          notesTitle: "Weitere Hinweise, Anweisungen & Worte zu {{sectionName}}",
          generalNotesTitle: "Weitere Hinweise, Anweisungen & Worte"
        },
        keysSection: {
          coverTitle: "ALLGEMEINE HINWEISE & SCHLÜSSEL",
          coverDesc: "Schlüsselverzeichnis und sonstige wichtige Informationen.",
          keys: "Schlüsselverzeichnis:",
          headers: ["Schlüsselname", "Einsatzzweck", "Ablageort"]
        },
        medicalSection: {
          coverTitle: "MEDIZINISCHE DATEN",
          coverDesc: "Informationen zu Blutgruppe, Organspendeausweis,\nVorerkrankungen, Medikamenten und Allergien.",
          bloodType: "Blutgruppe:",
          unknown: "Nicht bekannt",
          organDonor: "Organspendeausweis:",
          yes: "Ja",
          no: "Nein",
          noAnswer: "Keine Angabe",
          conditions: "Vorerkrankungen / Chronische Leiden:",
          medications: "Aktueller Medikamentenplan:",
          allergies: "Allergien:",
          contradictionTitle: "Widerspruch gegen Organ- und Gewebespende",
          contradictionBody: "Ich, {{name}}, geboren am {{date}},\nwiderspreche hiermit ausdrücklich einer Entnahme meiner Organe\nund Gewebe nach meinem Tod.\n\nDieser Widerspruch ist bindend und darf nicht von Angehörigen\noder Dritten übergangen werden.",
          locationDate: "Ort, Datum",
          signature: "Unterschrift"
        },
        poaSection: {
          coverTitle: "VOLLMACHTEN & VERFÜGUNGEN",
          coverDesc: "Wichtige rechtliche Dokumente, Testament und\nweitere Vollmachten.",
          warning: "WICHTIG: Testament und Vorsorgevollmacht müssen fast immer im Original vorliegen!",
          warning2: "Patientenverfügung: Original am sichersten, Kopie wird im Notfall oft akzeptiert.",
          testamentLoc: "Aufbewahrungsort des Testaments:"
        },
        tocPage: {
          title: "INHALTSVERZEICHNIS",
          attachmentPrefix: "Anhang: "
        }
      }
    }
  },
  en: {
    translation: {
      common: {
        select: "Select..."
      },
      sidebar: {
        title: "Emergency Dossier",
        steps: {
          step1: { title: "Basics & Contacts", description: "Personal & Relatives" },
          step2: { title: "Medical Data", description: "Doctors & Conditions" },
          step3: { title: "Finances", description: "Bank Accounts & Portfolios" },
          step4: { title: "Contracts", description: "Policies & Rent" },
          step5: { title: "Digital Identity", description: "Important Accounts" },
          step6: { title: "Documents", description: "Certificates & IDs" },
          step7: { title: "Powers of Attorney", description: "Directives & Will" },
          step8: { title: "General Notes", description: "Personal Words" },
          step9: { title: "Custom Chapters", description: "Additional Content" },
          step10: { title: "Finish & Preview", description: "Generate PDF" }
        },
        buttons: {
          creatingBackup: "Creating Backup...",
          success: "Success!",
          saveBackup: "Save Backup"
        },
        footer: {
          localProcessing: "All data is processed exclusively locally on your device.",
          github: "View project on GitHub"
        }
      },
      welcome: {
        title: "Emergency Dossier",
        subtitle: "Take precautions,\nprovide security.",
        description: "With the Emergency Dossier Generator, you create a structured overview of your most important data for your relatives.",
        welcomeTo: "Welcome to your Emergency Dossier",
        feature1: { title: "Simple & Structured", desc: "We guide you step-by-step through all relevant areas – from basic data to finances." },
        feature2: { title: "Maximum Security", desc: "Your data belongs to you. All processing takes place locally in your browser. No data is transferred to servers or stored on the Internet." },
        feature3: { title: "Direct Download", desc: "At the end, you will receive your personal emergency dossier as a finished PDF document to download and print." },
        startBtn: "Start now",
        loadBackup: "Load existing backup",
        installApp: "Install as local app",
        note: "Note: This is a template for orientation and does not replace legal advice.",
        backupError: "Error reading the backup file. Please ensure it is a valid Emergency Dossier JSON."
      },
      wizard: {
        back: "Back",
        next: "Next",
        warningTitle: "Notice about your inputs",
        warningDesc: "Some fields on this page contain incorrect or incomplete inputs (e.g. invalid IBAN or wrong format). Would you like to review your inputs or continue anyway?",
        checkInputs: "Review inputs",
        continueAnyway: "Continue anyway"
      },
      docUpload: {
        remove: "Remove document",
        customNamePlaceholder: "Document name (e.g. General Power of Attorney)",
        whatToDo: "How would you like to proceed with this document?",
        actionUpload: "Upload scan now (will be integrated into PDF)",
        actionPlaceholder: "Attach as a copy later (creates blank page)",
        actionSkip: "Do not include in PDF",
        selectFile: "Select file (PNG/JPG/PDF)",
        success: "✓ File successfully loaded",
        removeLink: "Remove"
      },
      wizardSteps: {
        step1: {
          title: "Basic Data & Contacts",
          desc: "Personal information and important contact persons.",
          docTitle: "Document Title (Cover)",
          docTitlePlaceholder: "e.g. Family Doe",
          salutation: "Salutation",
          salutationMr: "Mr.",
          salutationMrs: "Mrs.",
          salutationDiv: "Diverse",
          firstName: "First Name",
          middleName: "Middle Name (optional)",
          lastName: "Last Name",
          birthDate: "Date of Birth",
          birthPlace: "Place of Birth",
          birthCountry: "Country of Birth",
          taxId: "Tax ID",
          taxIdPlaceholder: "11-digit number",
          ssn: "Social Security Number",
          addressTitle: "Address",
          street: "Street",
          houseNumber: "House No.",
          zipCode: "ZIP Code",
          city: "City",
          maritalStatusTitle: "Marital Status",
          status: "Status",
          statusSingle: "Single",
          statusMarried: "Married",
          statusDivorced: "Divorced",
          marriageDate: "Marriage Date",
          divorceDate: "Divorce Date",
          childrenCount: "Number of Children",
          child: "Child",
          phone: "Phone Number (optional)",
          contactsTitle: "Important Contacts",
          contactsDesc: "Record relatives, friends, employers or landlords.",
          contact: "Contact",
          contactRelation: "Relationship",
          contactRelationPlaceholder: "e.g. Son, Employer...",
          contactName: "Name",
          contactPhone: "Phone",
          contactEmail: "E-Mail",
          contactDefaultType: "Relative",
          addContact: "Add Contact"
        },
        step2: {
          title: "Medical Data",
          desc: "Important medical information for doctors and helpers in an emergency.",
          bloodType: "Blood Type",
          organDonor: "Organ donor card available?",
          yes: "Yes",
          no: "No",
          contradictionTitle: "I expressly object to an organ donation.",
          contradictionDesc: "If you check this box, a form for explicit objection will be created in the emergency dossier.",
          organDonorCopy: "Copy of Organ Donor Card",
          conditions: "Pre-existing conditions / chronic illnesses",
          conditionsPlaceholder: "e.g. Diabetes, Asthma...",
          medications: "Current medication plan",
          medicationsPlaceholder: "Which medications do you take regularly?",
          allergies: "Allergies (esp. medications)",
          allergiesPlaceholder: "e.g. Penicillin...",
          notesLabel: "Further notes, instructions & words regarding Medical Data",
          notesDesc: "Are there any other medical aspects you would like to mention?"
        },
        step3: {
          title: "Finances",
          desc: "Record bank accounts, portfolios and assets.",
          importantTitle: "IMPORTANT: Bank-internal powers of attorney",
          importantDesc: "Power of attorney forms issued by the banks themselves must be available in the original in an emergency!",
          poaHintTitle: "Note on account/portfolio/safe deposit box power of attorney",
          poaHintDesc: "The automatically generated power of attorney comes from the original page of the Federal Ministry of Justice:",
          accountsTitle: "Bank Connections & Portfolios",
          bankName: "Name of Bank / Portfolio",
          bankAddress: "Address of Bank / Portfolio",
          accountHolder: "Account Holder",
          iban: "IBAN / Account No.",
          bic: "BIC",
          createPoa: "Create account/portfolio/safe deposit box power of attorney",
          poaDataTitle: "Data of the authorized representative:",
          copyFromFirst: "Copy from Account 1",
          address: "Address",
          addAccount: "Add Account / Portfolio",
          assetsTitle: "Other Assets",
          newHeading: "New Heading",
          assetType: "Type of Asset",
          assetDetails: "Details & Storage Location",
          addAsset: "Add Asset",
          insertHeading: "Insert Heading",
          realEstateTitle: "Real Estate",
          realEstateType: "Property Type",
          country: "Country",
          fullAddress: "Full Address / Location",
          addRealEstate: "Add Real Estate",
          notesLabel: "Further notes, instructions & words regarding Finances",
          notesDesc: "Information about safe deposit boxes, hidden accounts etc."
        },
        step4: {
          title: "Contracts & Liabilities",
          desc: "Record insurances, rent or ongoing loans.",
          contractType: "Type of Contract",
          provider: "Provider / Company",
          contractNumber: "Contract or Policy Number",
          addContract: "Add Contract",
          notesLabel: "Further notes, instructions & words regarding Contracts & Liabilities",
          notesDesc: "Add special notes about your contracts here.",
          insurance: "Insurance"
        },
        step5: {
          title: "Digital Identity",
          desc: "Important accounts, e-mails and profiles.",
          accountsTitle: "Important Accounts",
          service: "Service",
          servicePlaceholder: "e.g. Google",
          username: "Username",
          password: "Password",
          link: "Link",
          addAccount: "Add Account",
          notesLabel: "Further notes, instructions & words regarding Digital Identity",
          notesDesc: "Notes on the master password or device PINs."
        },
        step6: {
          title: "Personal Documents",
          desc: "Upload scans or create placeholders.",
          addDoc: "Add another document",
          certsTitle: "Certificates & Further Education",
          school: "School / Institution",
          degree: "Degree Title",
          year: "Graduation Year",
          addCert: "Add Certificate",
          notesLabel: "Further notes, instructions & words regarding Personal Documents",
          notesDesc: "Note here, for example, where originals or copies are located.",
          certPrefix: "Certificate: ",
          certNoTitle: "No Title"
        },
        step7: {
          title: "Powers of Attorney & Directives",
          desc: "Important directives and information on the will.",
          importantTitle1: "Mandatory in original: Will & precautionary power of attorney",
          importantDesc1: "A copy is often legally ineffective here! Banks, courts and authorities almost always demand the original in an emergency. A copy does not prove that the power of attorney has not been revoked in the meantime.",
          importantTitle2: "Living Will",
          importantDesc2: "The original is safest. If it has to be quick, doctors often accept a legible copy or a scan.",
          willTitle: "Will",
          willHintTitle: "Note on creation",
          willHintDesc: "There are many generators on the Internet for guidance. IMPORTANT: The will must then be completely handwritten and signed, otherwise it is invalid!",
          willHintLinkDesc: "A helpful starting point is e.g.:",
          willLocLabel: "Storage location of the will",
          willLocPlaceholder: "e.g. Deposited at the Berlin district court...",
          poaTitle: "Directives & Powers of Attorney as Scan",
          poaDownloadHintTitle: "Templates from the Federal Ministry",
          poaDownloadHintDesc: "Official forms for the precautionary power of attorney and care directive can be found free of charge at the Federal Ministry of Justice:",
          poaPatientHintTitle: "Template for Living Will",
          poaPatientHintDesc: "An interactive template for the living will is offered online by the Verbraucherzentrale:",
          poaFuneralHintTitle: "Template for Funeral Directive",
          poaFuneralHintDesc: "A helpful template for the funeral directive can be found e.g. at the Friedhofsverband Sauerland under \"Ratgeber Vorsorge\":",
          otherPoaTitle: "Other Powers of Attorney as Scan",
          docPatientenverfuegung: "Living Will",
          docVorsorgevollmacht: "Precautionary Power of Attorney",
          docBetreuungsverfuegung: "Care Directive",
          docBestattungsverfuegung: "Funeral Directive",
          addOtherPoa: "Add another power of attorney",
          notesLabel: "Further notes, instructions & words regarding Powers of Attorney & Directives",
          notesDesc: "Add important details here, e.g. regarding notaries or witnesses."
        },
        step8: {
          title: "General Notes & Keys",
          keysTitle: "Key Directory & Spare Keys",
          keyName: "Key Name",
          keyPurpose: "Purpose",
          keyLocation: "Storage Location (Optional)",
          addKey: "Add Key",
          notesLabel: "Further notes, instructions & words regarding General Notes & Keys",
          notesDesc: "Leave general notes here, e.g. instructions for pets."
        },
        step9: {
          title: "Custom Chapters",
          chapterTitle: "Chapter Heading",
          notesLabel: "Further notes, instructions & words regarding this chapter",
          addChapter: "Add new chapter"
        },
        step10: {
          title: "Finish & Preview",
          desc: "Your data remains on this device.",
          templateLabel: "Design Template",
          templateDefault: "Standard (Blue)",
          templateClassic: "Classic (Red)",
          templateModern: "Modern & Elegant",
          includePlaceholders: "Insert placeholder pages",
          includeWarnings: "Show important notes (\"Enclose in original\")",
          downloading: "Creating ZIP...",
          downloadSuccess: "Successfully downloaded!",
          downloadBtn: "ZIP (PDF & Uploads)",
          backupTitle: "Backup of your data",
          backupDesc: "When you click the download button, you will receive a ZIP archive. In addition to the finished PDF and your attachments, this also contains a file named",
          backupDesc2: "Keep this file safe! You can read this JSON file back in on the home page at any time to make changes or additions without having to fill everything in again.",
          previewTitle: "PDF Preview",
          previewGenerating: "Generating preview...",
          previewWait: "This may take a moment."
        }
      },
      pdf: {
        baseSection: {
          coverTitle: "BASICS & CONTACTS",
          coverDesc: "Personal information, address details and important\ncontact persons for emergencies.",
          born: "Born:",
          address: "Address:",
          maritalStatus: "Marital Status:",
          marriageDate: "Marriage Date:",
          divorceDate: "Divorce Date:",
          childrenCount: "Number of Children:",
          taxId: "Tax ID:",
          ssn: "Social Security Number:",
          children: "Children:",
          childrenHeaders: ["First Name", "Last Name", "Date of Birth", "Place of Birth", "Phone"],
          contacts: "Important Contacts:",
          contactsHeaders: ["Relationship", "Name", "Phone", "E-Mail"]
        },
        contractsSection: {
          coverTitle: "CONTRACTS & LIABILITIES",
          coverDesc: "Overview of insurances, rent,\nloans and other ongoing contracts.",
          contracts: "Ongoing Contracts:",
          headers: ["Type of Contract", "Provider / Company", "Contract / Policy Number"]
        },
        coverPage: {
          title: "EMERGENCY DOSSIER",
          subtitle: "Important Documents and Information",
          createdOn: "Created on:",
          of: "by",
          page: "Page",
          legalNotice: "Legal Notice: The information and attachments contained in this document do not constitute\nlegally binding advice. The forms, in particular powers of attorney and living wills,\nare templates and cannot replace a review by a lawyer or notary in individual cases."
        },
        customSection: {
          notesTitle: "Further notes, instructions & words regarding this chapter"
        },
        digitalSection: {
          coverTitle: "DIGITAL IDENTITY",
          coverDesc: "Access data for devices, e-mail accounts, social media\nand other digital services.",
          headers: ["Service", "Username", "Password/PIN", "Link"]
        },
        documentsSection: {
          coverTitle: "DOCUMENTS & CERTIFICATES",
          coverDesc: "Personal certificates, IDs and important testimonials.",
          docs: "Personal Documents:",
          docHeaders: ["Document"],
          certs: "Certificates & Further Education:",
          certHeaders: ["School / Institution", "Degree", "Year"],
          idCard: "Identity Card",
          passport: "Passport",
          driversLicense: "Driver's License",
          birthCert: "Birth Certificate",
          marriageCert: "Marriage Certificate",
          divorceCert: "Divorce Certificate",
          certPrefix: "Certificate: ",
          withoutTitle: "Without Title"
        },
        financeSection: {
          coverTitle: "FINANCES & ASSETS",
          coverDesc: "Overview of bank accounts, portfolios, real estate and\nother assets.",
          warning: "IMPORTANT: Bank-internal powers of attorney must be available in original!",
          accounts: "Bank Accounts & Portfolios:",
          accountHeaders: ["Bank / Portfolio", "Holder", "IBAN / Account No.", "BIC"],
          assets: "Other Assets (Gold, Crypto, etc.):",
          assetHeaders: ["Type of Asset", "Details & Storage Location"],
          realEstate: "Real Estate:",
          realEstateHeaders: ["Property Type", "Country", "Address / Location"]
        },
        helpers: {
          attachment: "Attachment: ",
          attachmentPdf: "Attachment (PDF): ",
          placeholderText: "(Please attach the original or a copy of: {{name}} here later)",
          notesTitle: "Further notes, instructions & words regarding {{sectionName}}",
          generalNotesTitle: "Further notes, instructions & words"
        },
        keysSection: {
          coverTitle: "GENERAL NOTES & KEYS",
          coverDesc: "Key directory and other important information.",
          keys: "Key Directory:",
          headers: ["Key Name", "Purpose", "Storage Location"]
        },
        medicalSection: {
          coverTitle: "MEDICAL DATA",
          coverDesc: "Information on blood type, organ donor card,\npre-existing conditions, medications and allergies.",
          bloodType: "Blood Type:",
          unknown: "Unknown",
          organDonor: "Organ Donor Card:",
          yes: "Yes",
          no: "No",
          noAnswer: "No Answer",
          conditions: "Pre-existing Conditions / Chronic Illnesses:",
          medications: "Current Medication Plan:",
          allergies: "Allergies:",
          contradictionTitle: "Objection to Organ and Tissue Donation",
          contradictionBody: "I, {{name}}, born on {{date}},\nhereby expressly object to the removal of my organs\nand tissues after my death.\n\nThis objection is binding and must not be ignored by relatives\nor third parties.",
          locationDate: "Place, Date",
          signature: "Signature"
        },
        poaSection: {
          coverTitle: "POWERS OF ATTORNEY & DIRECTIVES",
          coverDesc: "Important legal documents, will and\nother powers of attorney.",
          warning: "IMPORTANT: Will and precautionary power of attorney must almost always be available in original!",
          warning2: "Living Will: Original is safest, copy is often accepted in an emergency.",
          testamentLoc: "Storage location of the will:"
        },
        tocPage: {
          title: "TABLE OF CONTENTS",
          attachmentPrefix: "Attachment: "
        }
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;

import i18n from '../../i18n';
import { PdfBuilder } from './PdfBuilder';

export const addEmergencyChecklistSection = (builder: PdfBuilder) => {
  builder.addChapterCover(
    i18n.t('wizardSteps.step8.checklistTitle', { defaultValue: 'Checkliste: Die ersten 24 Stunden' }),
    i18n.t('wizardSteps.step8.checklistDesc', { defaultValue: 'Wichtige Schritte und Sofortmaßnahmen im Not- oder Todesfall.' })
  );

  builder.drawLineText('Sofortmaßnahmen (Erste 24 Stunden)', true, 16);
  
  const tasks = [
    'Arzt benachrichtigen (bei Haussterbefall) zur Ausstellung des Totenscheins.',
    'Engste Angehörige informieren.',
    'Wichtige Dokumente suchen (Personalausweis, Rote Mappe, Testament, Verfügungen).',
    'Bestattungsunternehmen kontaktieren und beauftragen.',
    'Arbeitgeber informieren (falls zutreffend).',
    'Haustiere versorgen (siehe Kapitel "Schlüssel & Hinweise").',
    'Wohnung sichern (Strom/Wasser abstellen, Fenster schließen, ggf. Heizung regulieren).'
  ];

  tasks.forEach((task, index) => {
    builder.currentY -= 5;
    builder.drawMultilineText(`[ ] ${index + 1}. ${task}`);
  });

  builder.currentY -= 20;
  builder.drawLineText('In den folgenden Tagen', true, 16);

  const laterTasks = [
    'Sterbeurkunde beim Standesamt beantragen (übernimmt oft der Bestatter).',
    'Krankenkasse und Lebens-/Unfallversicherungen informieren.',
    'Girokonten prüfen (siehe Kapitel "Finanzen").',
    'Abonnements, Mitgliedschaften und Dienstleister kündigen (siehe Kapitel "Verträge").',
    'Digitale Identitäten (Social Media, Cloud) sichern oder löschen (siehe "Digitale Identität").',
    'Nachlassgericht informieren (bei Vorhandensein eines Testaments).'
  ];

  laterTasks.forEach((task, index) => {
    builder.currentY -= 5;
    builder.drawMultilineText(`[ ] ${index + 1}. ${task}`);
  });
};

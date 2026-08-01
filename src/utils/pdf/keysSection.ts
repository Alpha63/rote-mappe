import i18n from '../../i18n';
import { PdfBuilder } from './PdfBuilder';

export const addKeysSection = (builder: PdfBuilder) => {
  builder.addChapterCover(
    'SCHLÜSSEL & HINWEISE',
    'Schlüsselverzeichnis, Haustiere und weitere persönliche\nAnweisungen für die Angehörigen.'
  );

  if (builder.data.keys && builder.data.keys.length > 0 && builder.data.keys.some(k => k.name || k.purpose)) {
    builder.drawLineText('Schlüsselverzeichnis & Ersatzschlüssel:', true, 12);
    const headers = (i18n.t('pdf.keysSection.headers', { returnObjects: true }) as string[]);
    const rows = builder.data.keys.filter(k => k.name || k.purpose).map(k => [k.name || '', k.purpose || '', k.location || '']);
    builder.drawTable(headers, rows);
  }

  if (builder.data.pets && builder.data.pets.length > 0 && builder.data.pets.some(p => p.name || p.species)) {
    builder.drawLineText(i18n.t('wizardSteps.step8.petsTitle'), true, 12);
    const headers = [i18n.t('wizardSteps.step8.petName'), i18n.t('wizardSteps.step8.petSpecies'), i18n.t('wizardSteps.step8.petCaregiver'), i18n.t('wizardSteps.step8.petVet'), i18n.t('wizardSteps.step8.petChipId')];
    const rows = builder.data.pets.filter(p => p.name || p.species).map(p => [p.name || '', p.species || '', p.caregiver || '', p.vetInfo || '', p.chipId || '']);
    builder.drawTable(headers, rows);

    const petsWithNotes = builder.data.pets.filter(p => p.notes);
    if (petsWithNotes.length > 0) {
      builder.currentY -= 5;
      petsWithNotes.forEach(p => {
        builder.drawLineText(`${p.name} - ${i18n.t('wizardSteps.step8.petNotes')}: ${p.notes}`, false, 11);
      });
      builder.currentY -= 5;
    }
  }

  if (builder.data.generalNotes) {
    builder.addNotesPage(builder.data.generalNotes, 'Allgemeine Hinweise & Schlüssel');
  }
};

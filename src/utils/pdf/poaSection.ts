import i18n from '../../i18n';
import { PdfBuilder } from './PdfBuilder';

export const addPoaSection = async (builder: PdfBuilder) => {
  const defaultDocs = [
    builder.data.patientenverfuegung || { id: 'patverf', name: i18n.t('wizardSteps.step7.docPatientenverfuegung') as string, documentAction: 'placeholder', fileData: null, fileType: null },
    builder.data.vorsorgevollmacht || { id: 'vorsorge', name: i18n.t('wizardSteps.step7.docVorsorgevollmacht') as string, documentAction: 'placeholder', fileData: null, fileType: null },
    builder.data.betreuungsverfuegung || { id: 'betreuung', name: i18n.t('wizardSteps.step7.docBetreuungsverfuegung') as string, documentAction: 'placeholder', fileData: null, fileType: null },
    builder.data.bestattungsverfuegung || { id: 'bestattung', name: i18n.t('wizardSteps.step7.docBestattungsverfuegung') as string, documentAction: 'placeholder', fileData: null, fileType: null }
  ];

  const hasAnyDoc = defaultDocs.some(doc => doc.documentAction !== 'skip') || builder.data.testamentDocument?.documentAction !== 'skip';
  const hasCustomDocs = builder.data.customPowersOfAttorney && builder.data.customPowersOfAttorney.length > 0;

  if (builder.data.testamentLocation || hasAnyDoc || hasCustomDocs || builder.data.poaNotes) {
    builder.addChapterCover(
      i18n.t('pdf.poaSection.coverTitle'),
      i18n.t('pdf.poaSection.coverDesc')
    );
    builder.drawWarning(i18n.t('pdf.poaSection.warning'));
    builder.drawWarning(i18n.t('pdf.poaSection.warning2'));
    builder.currentY -= 5;

    if (builder.data.testamentLocation) {
      builder.drawLineText(i18n.t('pdf.poaSection.testamentLoc'), true, 12);
      builder.drawMultilineText(builder.data.testamentLocation);
      builder.currentY -= 5;
    }
  }

  // Vollmachten
  for (const doc of defaultDocs) {
    await builder.addDocumentPage(doc);
  }
  
  if (builder.data.testamentDocument) {
    await builder.addDocumentPage(builder.data.testamentDocument);
  }
  
  // Custom POAs
  if (builder.data.customPowersOfAttorney) {
    for (const doc of builder.data.customPowersOfAttorney) {
      await builder.addDocumentPage(doc);
    }
  }

  if (builder.data.poaNotes) {
    builder.addNotesPage(builder.data.poaNotes, i18n.t('pdf.poaSection.coverTitle'));
  }
};

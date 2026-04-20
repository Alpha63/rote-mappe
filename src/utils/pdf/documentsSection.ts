import i18n from '../../i18n';
import { PdfBuilder } from './PdfBuilder';

export const addDocumentsSection = async (builder: PdfBuilder) => {
  builder.addChapterCover(
    i18n.t('pdf.documentsSection.coverTitle'),
    i18n.t('pdf.documentsSection.coverDesc')
  );

  const personalDocs = [];
  if (!builder.data.idCard || builder.data.idCard.documentAction !== 'skip') personalDocs.push([i18n.t('pdf.documentsSection.idCard')]);
  if (!builder.data.passport || builder.data.passport.documentAction !== 'skip') personalDocs.push([i18n.t('pdf.documentsSection.passport')]);
  if (!builder.data.driversLicense || builder.data.driversLicense.documentAction !== 'skip') personalDocs.push([i18n.t('pdf.documentsSection.driversLicense')]);
  if (builder.data.birthCertificate && builder.data.birthCertificate.documentAction !== 'skip') personalDocs.push([i18n.t('pdf.documentsSection.birthCert')]);
  
  if (builder.data.maritalStatus === 'verheiratet' || builder.data.maritalStatus === 'geschieden') {
    if (builder.data.marriageCertificate && builder.data.marriageCertificate.documentAction !== 'skip') personalDocs.push([i18n.t('pdf.documentsSection.marriageCert')]);
  }
  if (builder.data.maritalStatus === 'geschieden') {
    if (builder.data.divorceCertificate && builder.data.divorceCertificate.documentAction !== 'skip') personalDocs.push([i18n.t('pdf.documentsSection.divorceCert')]);
  }

  if (personalDocs.length > 0) {
    builder.drawLineText(i18n.t('pdf.documentsSection.docs'), true, 12);
    builder.drawTable((i18n.t('pdf.documentsSection.docHeaders', { returnObjects: true }) as string[]), personalDocs);
  }
  
  if (builder.data.certificates && builder.data.certificates.length > 0 && builder.data.certificates.some(c => c.school || c.degree)) {
    builder.drawLineText(i18n.t('pdf.documentsSection.certs'), true, 12);
    const headers = (i18n.t('pdf.documentsSection.certHeaders', { returnObjects: true }) as string[]);
    const rows = builder.data.certificates.filter(c => c.school || c.degree).map(c => [c.school || '', c.degree || '', c.year || '']);
    builder.drawTable(headers, rows);
  }

  // Urkunden / Ausweise
  const personalDocsToAppend = [
    builder.data.idCard || { id: 'idcard', name: i18n.t('pdf.documentsSection.idCard') as string, documentAction: 'placeholder', fileData: null, fileType: null },
    builder.data.passport || { id: 'passport', name: i18n.t('pdf.documentsSection.passport') as string, documentAction: 'placeholder', fileData: null, fileType: null },
    builder.data.driversLicense || { id: 'driverslicense', name: i18n.t('pdf.documentsSection.driversLicense') as string, documentAction: 'placeholder', fileData: null, fileType: null },
    builder.data.birthCertificate,
    (builder.data.maritalStatus === 'verheiratet' || builder.data.maritalStatus === 'geschieden') ? builder.data.marriageCertificate : null,
    builder.data.maritalStatus === 'geschieden' ? builder.data.divorceCertificate : null
  ];
  for (const doc of personalDocsToAppend) {
    if (doc) {
      await builder.addDocumentPage(doc);
    }
  }
  
  // Zeugnisse
  if (builder.data.certificates && builder.data.certificates.length > 0) {
    for (const cert of builder.data.certificates) {
      if (cert.document) {
        cert.document.name = `Zeugnis: ${cert.degree || i18n.t('pdf.documentsSection.withoutTitle')}`;
        await builder.addDocumentPage(cert.document);
      }
    }
  }

  // Weitere Dokumente
  if (builder.data.otherDocuments) {
    for (const doc of builder.data.otherDocuments) {
      await builder.addDocumentPage(doc);
    }
  }

  if (builder.data.documentNotes) {
    builder.addNotesPage(builder.data.documentNotes, 'Persönliche Dokumente');
  }
};

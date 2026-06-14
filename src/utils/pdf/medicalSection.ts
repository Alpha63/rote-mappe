import i18n from '../../i18n';
import { PdfBuilder } from './PdfBuilder';
import { formatDate } from './helpers';

export const addMedicalSection = async (builder: PdfBuilder) => {
  builder.addChapterCover(
    i18n.t('pdf.medicalSection.coverTitle'),
    i18n.t('pdf.medicalSection.coverDesc')
  );
  
  builder.drawKeyValue(i18n.t('pdf.medicalSection.bloodType'), builder.data.medicalData.bloodType || i18n.t('pdf.medicalSection.unknown'));
  const donor = builder.data.medicalData.organDonor;
  builder.drawKeyValue(i18n.t('pdf.medicalSection.organDonor'), donor === true ? i18n.t('pdf.medicalSection.yes') : donor === false ? i18n.t('pdf.medicalSection.no') : i18n.t('pdf.medicalSection.noAnswer'));
  
  if (builder.data.medicalData.doctors && builder.data.medicalData.doctors.length > 0) {
    builder.currentY -= 10;
    builder.drawLineText(i18n.t('pdf.medicalSection.doctorsTitle'), true, 11);
    const headers = (i18n.t('pdf.medicalSection.doctorHeaders', { returnObjects: true }) as string[]);
    const rows = builder.data.medicalData.doctors.map(d => [d.type, d.name, d.phone, d.website, d.address]);
    builder.drawTable(headers, rows);
  }

  if (builder.data.medicalData.conditions) {
    builder.currentY -= 5;
    builder.drawLineText(i18n.t('pdf.medicalSection.conditions'), true, 11);
    builder.drawMultilineText(builder.data.medicalData.conditions);
  }
  if (builder.data.medicalData.medications) {
    builder.currentY -= 5;
    builder.drawLineText(i18n.t('pdf.medicalSection.medications'), true, 11);
    builder.drawMultilineText(builder.data.medicalData.medications);
  }
  if (builder.data.medicalData.allergies) {
    builder.currentY -= 5;
    builder.drawLineText(i18n.t('pdf.medicalSection.allergies'), true, 11);
    builder.drawMultilineText(builder.data.medicalData.allergies);
  }
  
  if (builder.data.medicalNotes) {
    builder.addNotesPage(builder.data.medicalNotes, 'Medizinische Daten');
  }

  if (builder.data.medicalData?.organDonor === true && builder.data.organDonorDocument) {
    await builder.addDocumentPage(builder.data.organDonorDocument);
  } else if (builder.data.medicalData?.organDonor === false && builder.data.medicalData?.explicitOrganDonationContradiction) {
    const contradictionPage = builder.pdfDoc.addPage([builder.PAGE_WIDTH, builder.PAGE_HEIGHT]);
    const contradictionTextY = builder.PAGE_HEIGHT - 80;
    
    contradictionPage.drawText(i18n.t('pdf.medicalSection.contradictionTitle'), {
      x: 50,
      y: builder.PAGE_HEIGHT - 80,
      size: 18,
      font: builder.fontBold,
      color: builder.config.colors.text
    });

    const fullNameDonor = `${builder.data.firstName || ''} ${builder.data.middleName ? builder.data.middleName + ' ' : ''}${builder.data.lastName || ''}`.trim();
    const bodyText = i18n.t('pdf.medicalSection.contradictionBody', { name: fullNameDonor, date: formatDate(builder.data.birthDate || '') });

    contradictionPage.drawText(bodyText, {
      x: 50,
      y: contradictionTextY - 60,
      size: 12,
      font: builder.fontRegular,
      color: builder.config.colors.text,
      lineHeight: 18
    });

    contradictionPage.drawLine({
      start: { x: 50, y: contradictionTextY - 250 },
      end: { x: 250, y: contradictionTextY - 250 },
      thickness: 1,
      color: builder.config.colors.text
    });
    contradictionPage.drawText(i18n.t('pdf.medicalSection.locationDate'), {
      x: 50,
      y: contradictionTextY - 265,
      size: 10,
      font: builder.fontRegular,
      color: builder.config.colors.lightText
    });

    contradictionPage.drawLine({
      start: { x: 300, y: contradictionTextY - 250 },
      end: { x: 550, y: contradictionTextY - 250 },
      thickness: 1,
      color: builder.config.colors.text
    });
    contradictionPage.drawText(i18n.t('pdf.medicalSection.signature'), {
      x: 300,
      y: contradictionTextY - 265,
      size: 10,
      font: builder.fontRegular,
      color: builder.config.colors.lightText
    });
  }
};

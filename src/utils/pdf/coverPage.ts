import i18n from '../../i18n';
import { rgb } from 'pdf-lib';
import { PdfBuilder } from './PdfBuilder';
import { splitTextToLines } from './helpers';

export const addCoverPage = (builder: PdfBuilder) => {
  const coverPage = builder.pdfDoc.addPage([builder.PAGE_WIDTH, builder.PAGE_HEIGHT]);
  const fullName = `${builder.data.salutation ? builder.data.salutation + ' ' : ''}${builder.data.firstName} ${builder.data.middleName ? builder.data.middleName + ' ' : ''}${builder.data.lastName}`.trim();
  const documentTitle = builder.data.documentTitle || i18n.t('pdf.coverPage.title');

  if (builder.templateName === 'modern') {
    // Elegant frame (Double border)
    coverPage.drawRectangle({
      x: 30, y: 30,
      width: builder.PAGE_WIDTH - 60,
      height: builder.PAGE_HEIGHT - 60,
      borderColor: builder.config.colors.accent,
      borderWidth: 1,
    });
    coverPage.drawRectangle({
      x: 35, y: 35,
      width: builder.PAGE_WIDTH - 70,
      height: builder.PAGE_HEIGHT - 70,
      borderColor: builder.config.colors.primary,
      borderWidth: 0.5,
    });

    const titleLines = splitTextToLines(documentTitle, builder.PAGE_WIDTH - 120, builder.fontSerif, 42);
    let titleY = builder.PAGE_HEIGHT - 250;
    
    titleLines.forEach(line => {
      const textWidth = builder.fontSerif.widthOfTextAtSize(line, 42);
      coverPage.drawText(line, {
        x: (builder.PAGE_WIDTH - textWidth) / 2, // Centered
        y: titleY,
        size: 42,
        font: builder.fontSerif,
        color: builder.config.colors.primary,
      });
      titleY -= 55;
    });

    // Elegant Accent Line
    coverPage.drawLine({
      start: { x: (builder.PAGE_WIDTH / 2) - 40, y: titleY - 20 },
      end: { x: (builder.PAGE_WIDTH / 2) + 40, y: titleY - 20 },
      thickness: 1.5,
      color: builder.config.colors.accent,
    });

    const nameWidth = builder.fontRegular.widthOfTextAtSize(fullName, 22);
    coverPage.drawText(fullName, {
      x: (builder.PAGE_WIDTH - nameWidth) / 2,
      y: titleY - 70,
      size: 22,
      font: builder.fontRegular,
      color: builder.config.colors.lightText,
    });
    
    // Bottom subtle text
    const dateText = new Date().toLocaleDateString(i18n.language === 'en' ? 'en-US' : 'de-DE');
    const dateWidth = builder.fontRegular.widthOfTextAtSize(dateText, 12);
    coverPage.drawText(dateText, {
      x: (builder.PAGE_WIDTH - dateWidth) / 2,
      y: 80,
      size: 12,
      font: builder.fontRegular,
      color: builder.config.colors.secondaryText,
    });
  } else {
    coverPage.drawRectangle({
      x: 0,
      y: builder.PAGE_HEIGHT - 300,
      width: builder.PAGE_WIDTH,
      height: 300,
      color: builder.config.colors.primary,
    });

    const titleLines = splitTextToLines(documentTitle, builder.PAGE_WIDTH - 100, builder.fontBold, 42);
    let titleY = builder.PAGE_HEIGHT - 120;
    titleLines.forEach(line => {
      coverPage.drawText(line, {
        x: 50,
        y: titleY,
        size: 42,
        font: builder.fontBold,
        color: builder.config.colors.primaryText,
      });
      titleY -= 45;
    });

    coverPage.drawText(fullName, {
      x: 50,
      y: titleY - 15,
      size: 24,
      font: builder.fontRegular,
      color: rgb(0.9, 0.9, 0.9),
    });

    coverPage.drawLine({
      start: { x: 50, y: builder.PAGE_HEIGHT - 250 },
      end: { x: builder.PAGE_WIDTH - 50, y: builder.PAGE_HEIGHT - 250 },
      thickness: 2,
      color: builder.config.colors.accent,
    });

    coverPage.drawText('Vertrauliche Dokumente & Informationen', {
      x: 50,
      y: builder.PAGE_HEIGHT - 350,
      size: 16,
      font: builder.fontBold,
      color: builder.config.colors.text,
    });
  
    coverPage.drawText('Bitte sicher aufbewahren und im Notfall den berechtigten\nPersonen übergeben.', {
      x: 50,
      y: builder.PAGE_HEIGHT - 380,
      size: 12,
      font: builder.fontRegular,
      color: builder.config.colors.lightText,
      lineHeight: 18,
    });
  }

  coverPage.drawText('© Rote-Mappe Generator - https://github.com/Alpha63/rote-mappe', {
    x: builder.templateName === 'modern' ? (builder.PAGE_WIDTH - builder.fontRegular.widthOfTextAtSize('© Rote-Mappe Generator - https://github.com/Alpha63/rote-mappe', 7)) / 2 : 50,
    y: builder.templateName === 'modern' ? 15 : 30,
    size: 7,
    font: builder.fontRegular,
    color: builder.templateName === 'modern' ? rgb(0.7, 0.7, 0.7) : rgb(0.65, 0.65, 0.65),
  });
};

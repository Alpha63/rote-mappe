import { PDFDocument } from 'pdf-lib';
import { FormData } from '../types';
import { templates } from './pdfTemplates';
import { PdfBuilder } from './pdf/PdfBuilder';
import { addCoverPage } from './pdf/coverPage';
import { createTocPlaceholder, fillToc } from './pdf/tocPage';
import { addBaseSection } from './pdf/baseSection';
import { addMedicalSection } from './pdf/medicalSection';
import { addFinanceSection } from './pdf/financeSection';
import { addContractsSection } from './pdf/contractsSection';
import { addDigitalSection } from './pdf/digitalSection';
import { addDocumentsSection } from './pdf/documentsSection';
import { addPoaSection } from './pdf/poaSection';
import { addKeysSection } from './pdf/keysSection';
import { addCustomSections } from './pdf/customSection';
import { addEmergencyChecklistSection } from './pdf/emergencyChecklistSection';

export { formatDate, splitTextToLines } from './pdf/helpers';

export async function generatePDFBlob(data: FormData, templateName: string = 'default', includePlaceholders: boolean = true, includeWarnings: boolean = true): Promise<Blob> {
  const pdfDoc = await PDFDocument.create();
  const config = templates[templateName] || templates.default;

  const fontRegular = await pdfDoc.embedFont(config.fonts.regular);
  const fontBold = await pdfDoc.embedFont(config.fonts.bold);
  const fontItalic = config.fonts.italic ? await pdfDoc.embedFont(config.fonts.italic) : fontRegular;
  const fontBoldItalic = config.fonts.boldItalic ? await pdfDoc.embedFont(config.fonts.boldItalic) : fontBold;
  const fontSerif = config.fonts.serif ? await pdfDoc.embedFont(config.fonts.serif) : fontBold;

  const builder = new PdfBuilder(pdfDoc, data, templateName, fontRegular, fontBold, fontItalic, fontBoldItalic, fontSerif, includePlaceholders, includeWarnings);

  // --- 1. COVER PAGE ---
  addCoverPage(builder);

  // --- 2. TABLE OF CONTENTS PLACEHOLDER ---
  createTocPlaceholder(builder);

  // Initialize for content pages
  builder.currentPage = pdfDoc.getPage(0);
  builder.currentY = builder.PAGE_HEIGHT - 80;

  // --- SECTIONS ---
  addEmergencyChecklistSection(builder);
  addBaseSection(builder);
  await addMedicalSection(builder);
  await addFinanceSection(builder);
  addContractsSection(builder);
  addDigitalSection(builder);
  await addDocumentsSection(builder);
  await addPoaSection(builder);
  addKeysSection(builder);
  addCustomSections(builder);

  // --- DRAW TABLE OF CONTENTS ---
  fillToc(builder);

  const pdfBytes = await pdfDoc.save();
  return new Blob([pdfBytes], { type: 'application/pdf' });
}

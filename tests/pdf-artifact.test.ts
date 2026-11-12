import { PDFDocument } from 'pdf-lib';
import { describe, expect, it } from 'vitest';
import { initialFormData } from '../src/types';
import { generatePDFBlob } from '../src/utils/pdfGenerator';

describe('PDF export artifacts', () => {
  it('creates a readable PDF for minimal form data', async () => {
    const blob = await generatePDFBlob(initialFormData, 'default', true, true);
    const bytes = await blob.arrayBuffer();
    const document = await PDFDocument.load(bytes);

    expect(blob.type).toBe('application/pdf');
    expect(blob.size).toBeGreaterThan(0);
    expect(document.getPageCount()).toBeGreaterThan(1);
  });
});

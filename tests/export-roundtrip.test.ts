import JSZip from 'jszip';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { initialFormData } from '../src/types';
import { decryptBackup } from '../src/utils/crypto';
import { generateZipBlob } from '../src/utils/exportGenerator';

vi.mock('../src/utils/pdfWorkerWrapper', () => ({
  generatePDFAsync: vi.fn(async () => new Blob(['%PDF-test'], { type: 'application/pdf' })),
}));

describe('ZIP backup export', () => {
  const data = {
    ...initialFormData,
    firstName: 'Erika',
    lastName: 'Musterfrau',
    idCard: {
      ...initialFormData.idCard,
      documentAction: 'upload',
      fileData: 'data:image/png;base64,ZmFrZS1iaW5hcnk=',
      fileType: 'image/png',
    },
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('exports readable JSON, PDF, and uploaded files without a password', async () => {
    const blob = await generateZipBlob(data, 'default', true, true);
    const zip = await JSZip.loadAsync(blob);
    const json = JSON.parse(await zip.file('Notfallakte_Backup.json')!.async('text'));

    expect(json.firstName).toBe('Erika');
    expect(await zip.file('Notfallakte_Vollstaendig.pdf')!.async('text')).toBe('%PDF-test');
    expect(zip.file('Uploads/Persoenliche_Dokumente/Personalausweis.png')).not.toBeNull();
  });

  it('exports an encrypted backup that decrypts to the original data', async () => {
    const blob = await generateZipBlob(data, 'default', true, true, 'roundtrip-password');
    const zip = await JSZip.loadAsync(blob);
    const encrypted = await zip.file('Notfallakte_Backup.enc')!.async('text');

    const restored = JSON.parse(await decryptBackup(encrypted, 'roundtrip-password'));
    expect(restored.firstName).toBe('Erika');
    expect(restored.lastName).toBe('Musterfrau');
    expect(zip.file('Notfallakte_Backup.json')).toBeNull();
  });
});

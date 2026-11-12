import { FormData } from '../types';
import i18n from '../i18n';

export const generatePDFAsync = (
  formData: FormData,
  templateName: string = 'default',
  includePlaceholders: boolean = true,
  includeWarnings: boolean = true
): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const worker = new Worker(new URL('./pdfWorker.ts', import.meta.url), { type: 'module' });
    const timeout = window.setTimeout(() => {
      worker.terminate();
      reject(new Error('Die PDF-Erstellung hat zu lange gedauert.'));
    }, 60_000);
    let settled = false;
    const finish = (callback: () => void) => {
      if (settled) return;
      settled = true;
      window.clearTimeout(timeout);
      worker.terminate();
      callback();
    };

    worker.onmessage = (e: MessageEvent) => {
      const { success, blob, error } = e.data;
      if (success) {
        finish(() => resolve(blob));
      } else {
        finish(() => reject(new Error(error || 'Die PDF-Erstellung ist fehlgeschlagen.')));
      }
    };

    worker.onerror = (err) => {
      finish(() => reject(err));
    };

    worker.postMessage({
      formData,
      templateName,
      includePlaceholders,
      includeWarnings,
      language: i18n.language,
      origin: window.location.origin
    });
  });
};

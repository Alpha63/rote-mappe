import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { generatePDFAsync } from './pdfWorkerWrapper';
import { FormData, ScannedDocument } from '../types';

const addFileToZip = (zip: JSZip, folderName: string, doc: ScannedDocument | undefined | null) => {
  if (doc && doc.documentAction === 'upload' && doc.fileData) {
    const folder = zip.folder('Uploads')?.folder(folderName);
    if (folder) {
      // Base64 Prefix entfernen (z.B. "data:image/png;base64,")
      const parts = doc.fileData.split(',');
      const base64Data = parts.length > 1 ? parts[1] : parts[0];
      
      let ext = 'pdf'; // Standard
      if (doc.fileType) {
        ext = doc.fileType.split('/')[1] || 'pdf';
        if (ext === 'jpeg') ext = 'jpg';
      } else if (doc.fileData.startsWith('data:image/png')) {
        ext = 'png';
      } else if (doc.fileData.startsWith('data:image/jpeg')) {
        ext = 'jpg';
      }
      
      const safeName = doc.name.replace(/[^a-zA-Z0-9-]/g, '_');
      const filename = `${safeName}.${ext}`;
      folder.file(filename, base64Data, { base64: true });
    }
  }
};

export const generateAndDownloadZip = async (data: FormData, templateName: string = 'default', includePlaceholders: boolean = true, includeWarnings: boolean = true, password?: string) => {
  const zip = new JSZip();

  // 1. PDF-Datei generieren und ins Hauptverzeichnis legen
  const pdfBlob = await generatePDFAsync(data, templateName, includePlaceholders, includeWarnings);
  zip.file('Notfallakte_Vollstaendig.pdf', pdfBlob);

  // 2. Alle hochgeladenen Dokumente in die entsprechenden Ordner im ZIP-Archiv legen
  const documentGroups = [
    { folder: 'Medizinische_Daten', docs: [data.organDonorDocument] },
    { 
      folder: 'Persoenliche_Dokumente', 
      docs: [
        data.idCard, data.passport, data.driversLicense, data.birthCertificate,
        data.marriageCertificate, data.divorceCertificate,
        ...(data.certificates?.map(c => c.document) || []),
        ...(data.otherDocuments || [])
      ] 
    },
    { 
      folder: 'Vollmachten_Verfuegungen', 
      docs: [
        data.patientenverfuegung, data.vorsorgevollmacht, data.betreuungsverfuegung, data.bestattungsverfuegung,
        data.testamentDocument, ...(data.customPowersOfAttorney || [])
      ]
    }
  ];

  documentGroups.forEach(group => {
    group.docs.forEach(doc => addFileToZip(zip, group.folder, doc));
  });

  // 3. JSON-Backup-Datei für den späteren Import hinzufügen
  const backupJson = JSON.stringify(data, null, 2);
  
  if (password) {
    const { encryptBackup } = await import('./crypto');
    const encryptedData = await encryptBackup(backupJson, password);
    zip.file('Notfallakte_Backup.enc', encryptedData);
  } else {
    zip.file('Notfallakte_Backup.json', backupJson);
  }

  // 4. ZIP-Datei erstellen und Download auslösen
  const zipBlob = await zip.generateAsync({ type: 'blob' });
  const dateStr = new Date().toISOString().slice(0, 10);
  const lastName = data.lastName || 'Nachname';
  
  const safeLastName = lastName
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/Ä/g, 'Ae')
    .replace(/Ö/g, 'Oe')
    .replace(/Ü/g, 'Ue')
    .replace(/ß/g, 'ss')
    .replace(/[^a-zA-Z0-9-]/g, '_');

  saveAs(zipBlob, `Notfallakte_Export_${safeLastName}_${dateStr}.zip`);
};
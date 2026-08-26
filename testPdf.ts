import { PDFDocument } from 'pdf-lib';
import { generatePDFBlob } from './src/utils/pdfGenerator';

async function run() {
  console.log('Starting...');
  try {
    const data = { firstName: 'Max', lastName: 'Mustermann', salutation: 'Herr' };
    console.log('Generating default...');
    await generatePDFBlob(data as any, 'default');
    console.log('Generating modern...');
    await generatePDFBlob(data as any, 'modern');
    console.log('Done!');
  } catch(e) {
    console.error(e);
  }
}
run();

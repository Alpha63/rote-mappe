import { generatePDFBlob } from './src/utils/pdfGenerator';
import { initialFormData } from './src/types';

async function run() {
  console.log('Starting...');
  try {
    const data = {
      ...initialFormData,
      firstName: 'Max',
      lastName: 'Mustermann',
      salutation: 'Herr' as const,
    };
    console.log('Generating default...');
    await generatePDFBlob(data, 'default');
    console.log('Generating modern...');
    await generatePDFBlob(data, 'modern');
    console.log('Done!');
  } catch(e) {
    console.error(e);
  }
}
run();

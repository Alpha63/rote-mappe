import { PDFDocument } from 'pdf-lib';
import { afterEach, describe, expect, it } from 'vitest';
import i18n from '../src/i18n';
import { initialFormData } from '../src/types';
import { generatePDFBlob } from '../src/utils/pdfGenerator';
import { templates } from '../src/utils/pdfTemplates';

const completeData = {
  ...initialFormData,
  documentTitle: 'Familie Müller – Notfallakte',
  firstName: 'Erika',
  lastName: 'Müller',
  street: 'Lange Straße',
  houseNumber: '123',
  zipCode: '10115',
  city: 'Berlin',
  birthDate: '1975-04-12',
  birthPlace: 'Berlin',
  birthCountry: 'Deutschland',
  contacts: [{ id: 'contact-1', type: 'Tochter', name: 'Anna Müller', phone: '+49 30 123456', email: 'anna@example.test' }],
  children: [{ id: 'child-1', firstName: 'Anna', middleName: '', lastName: 'Müller', birthDate: '2002-08-03', birthPlace: 'Berlin', phone: '+49 30 654321' }],
  medicalData: {
    ...initialFormData.medicalData,
    bloodType: 'A+',
    conditions: 'Asthma und chronische Migräne',
    medications: 'Beispielmedikament 10 mg morgens',
    allergies: 'Penicillin',
    doctors: [{ id: 'doctor-1', type: 'Hausarzt', name: 'Praxis Beispiel', phone: '+49 30 111111', website: 'https://example.test', address: 'Beispielweg 1, 10115 Berlin' }],
  },
  bankAccounts: [{ id: 'bank-1', iban: 'DE02120300000000202051', bic: 'BYLADEM1001', bankName: 'Beispielbank', bankAddress: 'Bankweg 1', accountHolder: 'Erika Müller', hasPowerOfAttorney: false, poaFirstName: '', poaLastName: '', poaAddress: '', poaBirthDate: '', poaPhone: '' }],
  contracts: [{ id: 'contract-1', type: 'Versicherung', provider: 'Beispielversicherung', contractNumber: 'POL-123' }],
  digitalIdentities: [{ id: 'digital-1', type: 'account' as const, title: 'E-Mail', username: 'erika@example.test', password: 'not-a-real-password', url: 'https://example.test' }],
  customChapters: [{ id: 'chapter-1', title: 'Wichtige Hinweise', content: 'Langer Text mit **Markdown** und https://example.test für die Angehörigen.' }],
  keys: [{ id: 'key-1', name: 'Haustür', purpose: 'Zugang', location: 'Schlüsselkasten' }],
  pets: [{ id: 'pet-1', name: 'Milo', species: 'Hund', caregiver: 'Anna Müller', vetInfo: 'Praxis Beispiel', chipId: '123456789', notes: 'Futter steht im Schrank.' }],
};

afterEach(async () => {
  await i18n.changeLanguage('de');
});

describe('complete PDF export', () => {
  it('renders complete data in every template in German and English', async () => {
    for (const language of ['de', 'en']) {
      await i18n.changeLanguage(language);
      for (const template of Object.keys(templates)) {
        const blob = await generatePDFBlob(completeData, template, true, true);
        const document = await PDFDocument.load(await blob.arrayBuffer());
        expect(document.getPageCount(), `${language}/${template}`).toBeGreaterThan(5);
        expect(blob.size).toBeGreaterThan(5000);
      }
    }
  });
});

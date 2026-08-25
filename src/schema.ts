import { z } from 'zod';

const contactSchema = z.object({
  id: z.string(),
  type: z.string(),
  name: z.string(),
  phone: z.string(),
  email: z.string(),
});

const bankAccountSchema = z.object({
  id: z.string(),
  iban: z.string(),
  bic: z.string(),
  bankName: z.string(),
  bankAddress: z.string(),
  accountHolder: z.string(),
  hasPowerOfAttorney: z.boolean(),
  poaFirstName: z.string().optional(),
  poaLastName: z.string().optional(),
  poaAddress: z.string().optional(),
  poaBirthDate: z.string().optional(),
  poaPhone: z.string().optional(),
});

const childSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  middleName: z.string(),
  lastName: z.string(),
  birthDate: z.string(),
  birthPlace: z.string(),
  phone: z.string(),
});

const scannedDocumentSchema = z.object({
  id: z.string(),
  name: z.string(),
  documentAction: z.string(),
  fileData: z.string().nullable(),
  fileType: z.string().nullable(),
});

const certificateSchema = z.object({
  id: z.string(),
  school: z.string(),
  degree: z.string(),
  year: z.string(),
  document: scannedDocumentSchema,
});

const keyEntrySchema = z.object({
  id: z.string(),
  name: z.string(),
  purpose: z.string(),
  location: z.string(),
});

const digitalIdentityEntrySchema = z.object({
  id: z.string(),
  type: z.enum(['account', 'heading']),
  title: z.string(),
  username: z.string(),
  password: z.string(),
  url: z.string(),
});

const contractSchema = z.object({
  id: z.string(),
  type: z.string(),
  provider: z.string(),
  contractNumber: z.string(),
});

const otherAssetSchema = z.object({
  id: z.string(),
  type: z.string(),
  description: z.string(),
  isHeading: z.boolean().optional(),
  title: z.string().optional(),
});

const realEstateSchema = z.object({
  id: z.string(),
  type: z.string(),
  address: z.string(),
  country: z.string(),
});

const customChapterSchema = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(),
});

const vehicleSchema = z.object({
  id: z.string(),
  type: z.string(),
  licensePlate: z.string(),
  insurance: z.string(),
  financing: z.string(),
  documentLocation: z.string(),
});

const petSchema = z.object({
  id: z.string(),
  name: z.string(),
  species: z.string(),
  caregiver: z.string(),
  vetInfo: z.string(),
  chipId: z.string(),
  notes: z.string(),
});

const subscriptionSchema = z.object({
  id: z.string(),
  provider: z.string(),
  customerNumber: z.string(),
  cancellationNotice: z.string(),
});

const serviceProviderSchema = z.object({
  id: z.string(),
  role: z.string(),
  name: z.string(),
  contact: z.string(),
});

// Helper for names
const alphaRegex = /^[a-zA-ZäöüÄÖÜß\s-]*$/;

export const formSchema = z.object({
  documentTitle: z.string().optional(),
  
  salutation: z.enum(['Herr', 'Frau', 'Divers', '']),
  firstName: z.string().min(1, 'Vorname ist ein Pflichtfeld.').regex(alphaRegex, 'Darf nur Buchstaben enthalten.'),
  middleName: z.string().regex(alphaRegex, 'Darf nur Buchstaben enthalten.').optional().or(z.literal('')),
  lastName: z.string().min(1, 'Nachname ist ein Pflichtfeld.').regex(alphaRegex, 'Darf nur Buchstaben enthalten.'),
  street: z.string(),
  houseNumber: z.string(),
  zipCode: z.string().regex(/^\d*$/, 'Darf nur Zahlen enthalten.'),
  city: z.string(),
  maritalStatus: z.enum(['ledig', 'verheiratet', 'geschieden']),
  marriageDate: z.string(),
  divorceDate: z.string(),
  childrenCount: z.string().regex(/^\d*$/, 'Darf nur Zahlen enthalten.'),
  children: z.array(childSchema),

  bankAccounts: z.array(bankAccountSchema),
  financeNotes: z.string(),

  contacts: z.array(contactSchema),
  doNotNotifyContacts: z.array(contactSchema),

  employment: z.object({
    status: z.enum(['Angestellter', 'Selbstständiger', '']),
    companyName: z.string(),
    street: z.string(),
    zipCode: z.string(),
    city: z.string(),
    position: z.string(),
    employeeId: z.string(),
    workEmail: z.string(),
    emergencyContacts: z.array(contactSchema),
  }).optional(),

  digitalIdentities: z.array(digitalIdentityEntrySchema),
  devicePINs: z.string().optional(),

  idCard: scannedDocumentSchema,
  passport: scannedDocumentSchema,
  driversLicense: scannedDocumentSchema,
  birthCertificate: scannedDocumentSchema.optional(),
  marriageCertificate: scannedDocumentSchema.optional(),
  divorceCertificate: scannedDocumentSchema.optional(),
  organDonorDocument: scannedDocumentSchema.optional(),
  patientenverfuegung: scannedDocumentSchema.optional(),
  vorsorgevollmacht: scannedDocumentSchema.optional(),
  betreuungsverfuegung: scannedDocumentSchema.optional(),
  bestattungsverfuegung: scannedDocumentSchema.optional(),
  testamentDocument: scannedDocumentSchema.optional(),
  certificates: z.array(certificateSchema),
  keys: z.array(keyEntrySchema),
  customPowersOfAttorney: z.array(scannedDocumentSchema),
  otherDocuments: z.array(scannedDocumentSchema),

  birthDate: z.string().optional(),
  birthPlace: z.string().optional(),
  birthCountry: z.string().optional(),
  taxId: z.string().optional(),
  socialSecurityNumber: z.string().optional(),
  
  medicalData: z.object({
    bloodType: z.string(),
    organDonor: z.boolean().nullable(),
    explicitOrganDonationContradiction: z.boolean(),
    conditions: z.string(),
    medications: z.string(),
    allergies: z.string(),
    doctors: z.array(z.object({
      id: z.string(),
      type: z.string(),
      name: z.string(),
      phone: z.string(),
      website: z.string(),
      address: z.string(),
    })),
  }),
  
  otherAssets: z.array(otherAssetSchema),
  realEstates: z.array(realEstateSchema),
  contracts: z.array(contractSchema),
  testamentLocation: z.string().optional(),
  generalNotes: z.string().optional(),
  medicalNotes: z.string().optional(),
  documentNotes: z.string().optional(),
  poaNotes: z.string().optional(),
  contractNotes: z.string().optional(),
  customChapters: z.array(customChapterSchema),

  vehicles: z.array(vehicleSchema),
  automotiveClubs: z.string().optional(),
  pets: z.array(petSchema),
  subscriptions: z.array(subscriptionSchema),
  digitalLegacySocialMedia: z.string().optional(),
  digitalLegacyCloud: z.string().optional(),
  serviceProviders: z.array(serviceProviderSchema),
  meterNumbers: z.string().optional(),
});

export type FormSchemaType = z.infer<typeof formSchema>;

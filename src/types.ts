export type Salutation = 'Herr' | 'Frau' | 'Divers' | '';
export type MaritalStatus = 'ledig' | 'verheiratet' | 'geschieden';

export interface BankAccount {
  id: string;
  iban: string;
  bic: string;
  bankName: string;
  bankAddress: string;
  accountHolder: string;
  hasPowerOfAttorney: boolean;
  poaFirstName?: string;
  poaLastName?: string;
  poaAddress?: string;
  poaBirthDate?: string;
  poaPhone?: string;
}

export interface ScannedDocument {
  id: string;
  name: string;
  documentAction: string;
  fileData: string | null; // base64 data url for the image
  fileType: string | null; // e.g. image/png, image/jpeg
}

export interface Certificate {
  id: string;
  school: string;
  degree: string;
  year: string;
  document: ScannedDocument;
}

export interface KeyEntry {
  id: string;
  name: string;
  purpose: string;
  location: string;
}

export interface Contact {
  id: string;
  type: string;
  name: string;
  phone: string;
  email: string;
}

export interface DigitalIdentityEntry {
  id: string;
  type: 'account' | 'heading';
  title: string;
  username: string;
  password: string;
  url: string;
}

export interface Contract {
  id: string;
  type: string;
  provider: string;
  contractNumber: string;
}

export interface OtherAsset {
  id: string;
  type: string; // Used for entryType if heading, else asset type
  description: string;
  isHeading?: boolean;
  title?: string;
}

export interface RealEstate {
  id: string;
  type: string;
  address: string;
  country: string;
}

export interface Child {
  id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  birthDate: string;
  birthPlace: string;
  phone: string;
}

export interface CustomChapter {
  id: string;
  title: string;
  content: string;
}

export interface FormData {
  documentTitle?: string;
  // Basisdaten
  salutation: Salutation;
  firstName: string;
  middleName: string;
  lastName: string;
  street: string;
  houseNumber: string;
  zipCode: string;
  city: string;
  maritalStatus: MaritalStatus;
  marriageDate: string;
  divorceDate: string;
  childrenCount: string;
  children: Child[];

  // Finanzen
  bankAccounts: BankAccount[];
  financeNotes: string;

  // Kontakte
  contacts: Contact[];

  digitalIdentities: DigitalIdentityEntry[];
  devicePINs?: string;

  // Ausweise und Dokumente
  idCard: ScannedDocument;
  passport: ScannedDocument;
  driversLicense: ScannedDocument;
  birthCertificate?: ScannedDocument;
  marriageCertificate?: ScannedDocument;
  divorceCertificate?: ScannedDocument;
  organDonorDocument?: ScannedDocument;
  patientenverfuegung?: ScannedDocument;
  vorsorgevollmacht?: ScannedDocument;
  betreuungsverfuegung?: ScannedDocument;
  bestattungsverfuegung?: ScannedDocument;
  testamentDocument?: ScannedDocument;
  certificates: Certificate[];
  keys: KeyEntry[];
  customPowersOfAttorney: ScannedDocument[];
  otherDocuments: ScannedDocument[];

  birthDate?: string;
  birthPlace?: string;
  birthCountry?: string;
  taxId?: string;
  socialSecurityNumber?: string;
  medicalData: {
    bloodType: string;
    organDonor: boolean | null;
    explicitOrganDonationContradiction: boolean;
    conditions: string;
    medications: string;
    allergies: string;
  };
  otherAssets: OtherAsset[];
  realEstates: RealEstate[];
  contracts: Contract[];
  contractNotes?: string;
  testamentLocation?: string;
  generalNotes?: string;
  medicalNotes?: string;
  documentNotes?: string;
  poaNotes?: string;
  customChapters: CustomChapter[];
}

export const initialFormData: FormData = {
  documentTitle: 'NOTFALLAKTE',
  salutation: '',
  firstName: '',
  middleName: '',
  lastName: '',
  street: '',
  houseNumber: '',
  zipCode: '',
  city: '',
  maritalStatus: 'ledig',
  marriageDate: '',
  divorceDate: '',
  childrenCount: '0',
  children: [],
  bankAccounts: [],
  contacts: [],
  financeNotes: '',
  digitalIdentities: [],
  idCard: { id: 'idcard', name: 'Personalausweis', documentAction: 'placeholder', fileData: null, fileType: null },
  passport: { id: 'passport', name: 'Reisepass', documentAction: 'placeholder', fileData: null, fileType: null },
  driversLicense: { id: 'driverslicense', name: 'Führerschein', documentAction: 'placeholder', fileData: null, fileType: null },
  organDonorDocument: { id: 'organdonor', name: 'Organspendeausweis', documentAction: 'placeholder', fileData: null, fileType: null },
  certificates: [],
  keys: [],
  customPowersOfAttorney: [],
  otherDocuments: [],
  medicalData: {
    bloodType: '',
    organDonor: false,
    explicitOrganDonationContradiction: false,
    conditions: '',
    medications: '',
    allergies: ''
  },
  otherAssets: [],
  realEstates: [],
  contracts: [],
  medicalNotes: '',
  documentNotes: '',
  poaNotes: '',
  contractNotes: '',
  customChapters: [],
};

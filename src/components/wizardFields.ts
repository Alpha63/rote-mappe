export const fieldsForStep: Record<number, string[]> = {
  1: [
    'salutation', 'firstName', 'middleName', 'lastName',
    'street', 'houseNumber', 'zipCode', 'city',
    'maritalStatus', 'marriageDate', 'divorceDate',
    'childrenCount', 'children', 'birthDate', 'birthPlace', 'birthCountry',
    'taxId', 'socialSecurityNumber', 'employment', 'contacts',
    'doNotNotifyContacts', 'documentTitle'
  ],
  2: ['medicalData', 'medicalNotes', 'organDonorDocument'],
  3: ['bankAccounts', 'financeNotes', 'otherAssets', 'realEstates', 'vehicles', 'automotiveClubs'],
  4: ['contracts', 'subscriptions', 'serviceProviders', 'meterNumbers', 'contractNotes'],
  5: ['digitalIdentities', 'devicePINs', 'digitalLegacySocialMedia', 'digitalLegacyCloud'],
  6: [
    'idCard', 'passport', 'driversLicense', 'birthCertificate',
    'marriageCertificate', 'divorceCertificate', 'certificates',
    'otherDocuments', 'documentNotes'
  ],
  7: [
    'testamentLocation', 'testamentDocument', 'patientenverfuegung',
    'vorsorgevollmacht', 'betreuungsverfuegung', 'bestattungsverfuegung',
    'customPowersOfAttorney', 'poaNotes'
  ],
  8: ['keys', 'pets', 'generalNotes'],
  9: ['customChapters'],
  10: [],
};

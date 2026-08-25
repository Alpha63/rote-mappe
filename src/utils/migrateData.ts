import { FormData, initialFormData } from '../types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function migrateData(parsed: any): FormData {
  const merged = { ...initialFormData, ...parsed };

  if (parsed.employmentStatus !== undefined && !parsed.employment) {
    merged.employment = {
      status: parsed.employmentStatus || '',
      companyName: parsed.employerName || '',
      street: '',
      zipCode: '',
      city: '',
      position: parsed.position || '',
      employeeId: parsed.employeeId || '',
      workEmail: parsed.workEmail || '',
      emergencyContacts: parsed.emergencyContacts || []
    };
    if (parsed.employerAddress) {
       const parts = parsed.employerAddress.split(', ');
       merged.employment.street = parts[0] || '';
       if (parts[1]) {
          const zipCity = parts[1].split(' ');
          merged.employment.zipCode = zipCity[0] || '';
          merged.employment.city = zipCity.slice(1).join(' ') || '';
       }
    }
  } else if (parsed.employment) {
    merged.employment = {
      ...initialFormData.employment,
      ...parsed.employment
    };
  }
  
  merged.medicalData = {
    ...initialFormData.medicalData,
    ...(parsed.medicalData || {})
  };

  if (parsed.doctors !== undefined) {
    merged.medicalData.doctors = parsed.doctors;
  }

  if (parsed.birthCert) merged.birthCertificate = parsed.birthCert;
  if (parsed.marriageCert) merged.marriageCertificate = parsed.marriageCert;
  if (parsed.divorceCert) merged.divorceCertificate = parsed.divorceCert;

  // Clean up legacy root properties to prevent them from persisting
  delete merged.doctors;
  delete merged.employmentStatus;
  delete merged.employerName;
  delete merged.employerAddress;
  delete merged.position;
  delete merged.employeeId;
  delete merged.workEmail;
  delete merged.emergencyContacts;
  delete merged.birthCert;
  delete merged.marriageCert;
  delete merged.divorceCert;

  return merged;
}

import { FormData, initialFormData } from '../types';
import { unwrapBackupData } from './backupFormat';

export function migrateData(parsed: unknown): FormData {
  const unwrapped = unwrapBackupData(parsed);
  const source = unwrapped as Partial<FormData> & Record<string, unknown>;
  const merged = { ...initialFormData, ...source };

  if (source.employmentStatus !== undefined && !source.employment) {
    merged.employment = {
      status: source.employmentStatus === 'Angestellter' || source.employmentStatus === 'Selbstständiger'
        ? source.employmentStatus
        : '',
      companyName: typeof source.employerName === 'string' ? source.employerName : '',
      street: '',
      zipCode: '',
      city: '',
      position: typeof source.position === 'string' ? source.position : '',
      employeeId: typeof source.employeeId === 'string' ? source.employeeId : '',
      workEmail: typeof source.workEmail === 'string' ? source.workEmail : '',
      emergencyContacts: Array.isArray(source.emergencyContacts) ? source.emergencyContacts : []
    };
    if (typeof source.employerAddress === 'string') {
       const parts = source.employerAddress.split(', ');
       merged.employment.street = parts[0] || '';
       if (parts[1]) {
          const zipCity = parts[1].split(' ');
          merged.employment.zipCode = zipCity[0] || '';
          merged.employment.city = zipCity.slice(1).join(' ') || '';
       }
    }
  } else if (source.employment) {
    merged.employment = {
      ...initialFormData.employment,
      ...source.employment
    };
  }
  
  merged.medicalData = {
    ...initialFormData.medicalData,
    ...(source.medicalData || {})
  };

  if (source.doctors !== undefined && Array.isArray(source.doctors)) {
    merged.medicalData.doctors = source.doctors;
  }

  if (source.birthCert) merged.birthCertificate = source.birthCert as FormData['birthCertificate'];
  if (source.marriageCert) merged.marriageCertificate = source.marriageCert as FormData['marriageCertificate'];
  if (source.divorceCert) merged.divorceCertificate = source.divorceCert as FormData['divorceCertificate'];

  // Clean up legacy root properties to prevent them from persisting
  delete (merged as Record<string, unknown>).doctors;
  delete (merged as Record<string, unknown>).employmentStatus;
  delete (merged as Record<string, unknown>).employerName;
  delete (merged as Record<string, unknown>).employerAddress;
  delete (merged as Record<string, unknown>).position;
  delete (merged as Record<string, unknown>).employeeId;
  delete (merged as Record<string, unknown>).workEmail;
  delete (merged as Record<string, unknown>).emergencyContacts;
  delete (merged as Record<string, unknown>).birthCert;
  delete (merged as Record<string, unknown>).marriageCert;
  delete (merged as Record<string, unknown>).divorceCert;

  return merged;
}

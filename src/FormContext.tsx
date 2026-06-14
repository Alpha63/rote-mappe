import React, { createContext, useContext, useState, useEffect } from 'react';
import { FormData, initialFormData } from './types';

interface FormContextType {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  updateField: <K extends keyof FormData>(field: K, value: FormData[K]) => void;
  errors: Record<string, string>;
  setErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  downloadBackup: (template?: string, includePlaceholders?: boolean, includeWarnings?: boolean) => Promise<boolean>;
  isDownloading: boolean;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export function FormProvider({ children }: { children: React.ReactNode }) {
  const [formData, setFormData] = useState<FormData>(() => {
    const saved = sessionStorage.getItem('notfallakte_data');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        
        // Migrate legacy fields
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
      } catch {
        // ignore
      }
    }
    return initialFormData;
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    sessionStorage.setItem('notfallakte_data', JSON.stringify(formData));
  }, [formData]);

  const updateField = <K extends keyof FormData>(field: K, value: FormData[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const downloadBackup = async (template: string = 'rot', includePlaceholders: boolean = true, includeWarnings: boolean = true) => {
    if (isDownloading) return false;
    setIsDownloading(true);
    try {
      const { generateAndDownloadZip } = await import('./utils/exportGenerator');
      await generateAndDownloadZip(formData, template, includePlaceholders, includeWarnings);
      return true;
    } catch (error) {
      console.error('Error generating Export:', error);
      alert('Fehler bei der Erstellung der ZIP-Datei.');
      return false;
    } finally {
      setIsDownloading(false);
    }
  };

  return <FormContext.Provider value={{ formData, setFormData, updateField, errors, setErrors, downloadBackup, isDownloading }}>{children}</FormContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useFormContext() {
  const context = useContext(FormContext);
  if (!context) throw new Error('useFormContext must be used within FormProvider');
  return context;
}

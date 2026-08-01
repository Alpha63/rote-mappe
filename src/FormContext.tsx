import React, { createContext, useContext, useState, useEffect } from 'react';
import { FormData, initialFormData } from './types';
import { migrateData } from './utils/migrateData';

interface FormContextType {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  updateField: <K extends keyof FormData>(field: K, value: FormData[K]) => void;
  errors: Record<string, string>;
  setErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  downloadBackup: (template?: string, includePlaceholders?: boolean, includeWarnings?: boolean, password?: string) => Promise<boolean>;
  isDownloading: boolean;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export function FormProvider({ children }: { children: React.ReactNode }) {
  const [formData, setFormData] = useState<FormData>(() => {
    const saved = sessionStorage.getItem('notfallakte_data');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        
        return migrateData(parsed);
      } catch {
        // ignore
      }
    }
    return initialFormData;
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    const handler = setTimeout(() => {
      sessionStorage.setItem('notfallakte_data', JSON.stringify(formData));
    }, 500);
    return () => clearTimeout(handler);
  }, [formData]);

  const updateField = <K extends keyof FormData>(field: K, value: FormData[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const downloadBackup = async (template: string = 'rot', includePlaceholders: boolean = true, includeWarnings: boolean = true, password?: string) => {
    if (isDownloading) return false;
    setIsDownloading(true);
    try {
      const { generateAndDownloadZip } = await import('./utils/exportGenerator');
      await generateAndDownloadZip(formData, template, includePlaceholders, includeWarnings, password);
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

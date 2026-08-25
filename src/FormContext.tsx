import React, { createContext, useContext, useState, useEffect } from 'react';
import { useForm, UseFormReturn, FormProvider as RHFProvider, Path, PathValue } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { formSchema, FormSchemaType } from './schema';
import { initialFormData } from './types';
import { migrateData } from './utils/migrateData';

interface FormContextType {
  formData: FormSchemaType & { middleName: string };
  setFormData: (data: FormSchemaType | ((prev: FormSchemaType) => FormSchemaType)) => void;
  updateField: <K extends Path<FormSchemaType>>(field: K, value: PathValue<FormSchemaType, K>) => void;
  errors: Record<string, string>;
  setErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  downloadBackup: (template?: string, includePlaceholders?: boolean, includeWarnings?: boolean, password?: string) => Promise<boolean>;
  isDownloading: boolean;
  methods: UseFormReturn<FormSchemaType>;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

function getInitialValues(): FormSchemaType {
  const saved = sessionStorage.getItem('notfallakte_data');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      return migrateData(parsed) as unknown as FormSchemaType;
    } catch {
      // ignore
    }
  }
  return initialFormData as unknown as FormSchemaType;
}

export function FormProvider({ children }: { children: React.ReactNode }) {
  const methods = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: getInitialValues(),
    mode: 'onChange'
  });

  const formData = methods.watch() as FormSchemaType & { middleName: string };

  const rhfErrors = methods.formState.errors;
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const errMap: Record<string, string> = {};
    Object.keys(rhfErrors).forEach(key => {
      const fieldError = rhfErrors[key as keyof typeof rhfErrors];
      if (fieldError?.message) {
        errMap[key] = String(fieldError.message);
      }
    });
    setErrors(errMap);
  }, [rhfErrors]);

  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    const handler = setTimeout(() => {
      sessionStorage.setItem('notfallakte_data', JSON.stringify(formData));
    }, 500);
    return () => clearTimeout(handler);
  }, [formData]);

  const updateField = <K extends Path<FormSchemaType>>(field: K, value: PathValue<FormSchemaType, K>) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    methods.setValue(field, value as any, { shouldValidate: true, shouldDirty: true });
  };

  const setFormDataWrapper = (data: FormSchemaType | ((prev: FormSchemaType) => FormSchemaType)) => {
    if (typeof data === 'function') {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const next = (data as any)(methods.getValues());
      methods.reset(next);
    } else {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      methods.reset(data as any);
    }
  };

  const downloadBackup = async (template: string = 'rot', includePlaceholders: boolean = true, includeWarnings: boolean = true, password?: string) => {
    if (isDownloading) return false;
    setIsDownloading(true);
    try {
      const { generateAndDownloadZip } = await import('./utils/exportGenerator');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await generateAndDownloadZip(formData as any, template, includePlaceholders, includeWarnings, password);
      return true;
    } catch (error) {
      console.error('Error generating Export:', error);
      alert('Fehler bei der Erstellung der ZIP-Datei.');
      return false;
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <RHFProvider {...methods}>
      <FormContext.Provider value={{ 
        formData, 
        setFormData: setFormDataWrapper, 
        updateField, 
        errors, 
        setErrors, 
        downloadBackup, 
        isDownloading,
        methods 
      }}>
        {children}
      </FormContext.Provider>
    </RHFProvider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useFormContext() {
  const context = useContext(FormContext);
  if (!context) throw new Error('useFormContext must be used within FormProvider');
  return context;
}

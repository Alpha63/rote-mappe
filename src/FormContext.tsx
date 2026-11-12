import React, { createContext, useContext, useState, useEffect } from 'react';
import { useForm, UseFormReturn, FormProvider as RHFProvider, Path, PathValue } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { formSchema, FormSchemaType } from './schema';
import { initialFormData } from './types';
import { migrateData } from './utils/migrateData';
import { clearLocalFormState, loadLocalFormState, saveLocalFormState } from './utils/localStorage';

interface FormContextType {
  formData: FormSchemaType & { middleName: string };
  setFormData: (data: FormSchemaType | ((prev: FormSchemaType) => FormSchemaType)) => void;
  updateField: <K extends Path<FormSchemaType>>(field: K, value: PathValue<FormSchemaType, K>) => void;
  errors: Record<string, string>;
  setErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  downloadBackup: (template?: string, includePlaceholders?: boolean, includeWarnings?: boolean, password?: string) => Promise<boolean>;
  isDownloading: boolean;
  saveState: 'idle' | 'saving' | 'saved' | 'error';
  saveError: 'quota' | 'unavailable' | 'clear' | null;
  resetForm: () => Promise<void>;
  methods: UseFormReturn<FormSchemaType>;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

function collectFormErrors(value: unknown, path = '', result: Record<string, string> = {}) {
  if (!value || typeof value !== 'object') return result;
  const record = value as Record<string, unknown>;
  if (typeof record.message === 'string' && path) {
    result[path] = record.message;
  }
  Object.entries(record).forEach(([key, child]) => {
    if (key !== 'message' && key !== 'ref' && key !== 'type') {
      collectFormErrors(child, path ? `${path}.${key}` : key, result);
    }
  });
  return result;
}

function getInitialValues(): FormSchemaType {
  let saved: string | null = null;
  try {
    saved = sessionStorage.getItem('notfallakte_data');
  } catch {
    return initialFormData as unknown as FormSchemaType;
  }
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      const result = formSchema.safeParse(migrateData(parsed));
      if (result.success) return result.data;
    } catch {
      try {
        sessionStorage.removeItem('notfallakte_data');
      } catch {
        // Storage access can be blocked by browser privacy settings.
      }
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
  const [saveState, setSaveState] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [saveError, setSaveError] = useState<'quota' | 'unavailable' | 'clear' | null>(null);
  const [storageReady, setStorageReady] = useState(false);

  useEffect(() => {
    setErrors(collectFormErrors(rhfErrors));
  }, [rhfErrors]);

  useEffect(() => {
    let active = true;
    loadLocalFormState().then((saved) => {
      if (!active) return;
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          const result = formSchema.safeParse(migrateData(parsed));
          if (result.success) methods.reset(result.data);
        } catch {
          // A malformed IndexedDB entry is ignored; the session fallback remains usable.
        }
      }
      setStorageReady(true);
    });
    return () => {
      active = false;
    };
  }, [methods]);

  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    if (!storageReady) return;
    setSaveState('saving');
    const handler = setTimeout(() => {
      const serialized = JSON.stringify(formData);
      try {
        sessionStorage.setItem('notfallakte_data', serialized);
      } catch (error) {
        setSaveState('error');
        setSaveError(error instanceof DOMException && error.name === 'QuotaExceededError'
          ? 'quota'
          : 'unavailable');
        return;
      }
      saveLocalFormState(serialized)
        .then(() => {
          setSaveError(null);
          setSaveState('saved');
        })
        .catch(() => {
          setSaveState('error');
          setSaveError('unavailable');
        });
    }, 500);
    return () => clearTimeout(handler);
  }, [formData, storageReady]);

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
    } catch {
      return false;
    } finally {
      setIsDownloading(false);
    }
  };

  const resetForm = async () => {
    methods.reset(initialFormData as FormSchemaType);
    try {
      sessionStorage.removeItem('notfallakte_data');
      await clearLocalFormState();
      setSaveError(null);
      setSaveState('idle');
    } catch {
      setSaveState('error');
      setSaveError('clear');
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
        saveState,
        saveError,
        resetForm,
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

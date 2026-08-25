import { useFormContext, useFieldArray } from 'react-hook-form';
import { Input } from '../../Input';
import { Textarea } from '../../Textarea';
import { DocumentUpload } from '../DocumentUpload';
import { Info, Trash2, Plus } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { FormSchemaType } from '../../schema';
import { ScannedDocument } from '../../types';

const defaultIdCard: ScannedDocument = { id: 'idcard', name: 'Personalausweis', documentAction: 'placeholder', fileData: null, fileType: null };
const defaultPassport: ScannedDocument = { id: 'passport', name: 'Reisepass', documentAction: 'placeholder', fileData: null, fileType: null };
const defaultDriversLicense: ScannedDocument = { id: 'driverslicense', name: 'Führerschein', documentAction: 'placeholder', fileData: null, fileType: null };

export function Step6Dokumente() {
  const { register, control, watch, setValue, formState: { errors } } = useFormContext<FormSchemaType>();
  const { t } = useTranslation();

  const { fields: otherDocumentFields, append: appendOtherDocument, remove: removeOtherDocument } = useFieldArray({
    control,
    name: 'otherDocuments'
  });

  const { fields: certificateFields, append: appendCertificate, remove: removeCertificate } = useFieldArray({
    control,
    name: 'certificates'
  });

  const idCard = watch('idCard') || defaultIdCard;
  const passport = watch('passport') || defaultPassport;
  const driversLicense = watch('driversLicense') || defaultDriversLicense;
  const birthCertificate = watch('birthCertificate');
  const marriageCertificate = watch('marriageCertificate');
  const divorceCertificate = watch('divorceCertificate');
  const maritalStatus = watch('maritalStatus');
  const watchedOtherDocuments = watch('otherDocuments');
  const watchedCertificates = watch('certificates');
  const documentNotes = watch('documentNotes');

  const fixedDocs = [
    { doc: idCard, path: 'idCard' as const, show: true },
    { doc: passport, path: 'passport' as const, show: true },
    { doc: birthCertificate, path: 'birthCertificate' as const, show: !!birthCertificate },
    { doc: driversLicense, path: 'driversLicense' as const, show: true },
    { doc: marriageCertificate, path: 'marriageCertificate' as const, show: (maritalStatus === 'verheiratet' || maritalStatus === 'geschieden') && !!marriageCertificate },
    { doc: divorceCertificate, path: 'divorceCertificate' as const, show: maritalStatus === 'geschieden' && !!divorceCertificate },
  ];

  return (
    <div className="animate-in fade-in zoom-in-95 duration-500">
      <div className="mb-8">
        <h2 className="text-3xl font-serif text-slate-900 dark:text-slate-100 mb-3">{t('wizardSteps.step6.title')}</h2>
        <p className="text-slate-600 dark:text-slate-400 flex items-center gap-2">
          <Info size={18} className="text-indigo-600 dark:text-indigo-400" />
          {t('wizardSteps.step6.desc')}
        </p>
      </div>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {fixedDocs.map((item, index) => (
            item.show && item.doc ? (
              <DocumentUpload
                key={item.doc.id || index}
                document={item.doc}
                onChange={(doc) => setValue(item.path, doc, { shouldValidate: true, shouldDirty: true })}
              />
            ) : null
          ))}
          {otherDocumentFields.map((field, index) => {
            const doc = watchedOtherDocuments?.[index] || field;
            return (
              <DocumentUpload
                key={field.id}
                document={doc}
                onChange={(newDoc) => setValue(`otherDocuments.${index}`, newDoc, { shouldValidate: true, shouldDirty: true })}
                onRemove={() => removeOtherDocument(index)}
                isCustom
              />
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => appendOtherDocument({
            id: crypto.randomUUID(),
            name: '',
            documentAction: 'placeholder',
            fileData: null,
            fileType: null
          })}
          className="mt-6 w-full py-3 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl text-indigo-600 dark:text-indigo-400 font-medium flex items-center justify-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-800/50"
        >
          <Plus size={20} /> {t('wizardSteps.step6.addDoc')}
        </button>

        <div className="pt-10 mt-10 border-t border-slate-100 dark:border-slate-800">
          <h3 className="text-lg font-medium text-slate-800 dark:text-slate-200 mb-4 border-b border-slate-100 dark:border-slate-800 pb-2">
            {t('wizardSteps.step6.certsTitle')}
          </h3>
          <div className="space-y-6">
            {certificateFields.map((field, index) => {
              const certDoc = watchedCertificates?.[index]?.document || field.document;
              return (
                <div key={field.id} className="p-4 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 relative shadow-sm">
                  <button
                    type="button"
                    onClick={() => removeCertificate(index)}
                    className="absolute top-4 right-4 text-slate-300 dark:text-slate-400 hover:text-red-500 dark:hover:text-red-400"
                  >
                    <Trash2 size={20} />
                  </button>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2 mb-4">
                    <Input
                      label={t('wizardSteps.step6.school')}
                      {...register(`certificates.${index}.school`)}
                      error={errors.certificates?.[index]?.school?.message}
                      className="p-2.5"
                    />
                    <Input
                      label={t('wizardSteps.step6.degree')}
                      {...register(`certificates.${index}.degree`, {
                        onChange: (e) => {
                          const degreeVal = e.target.value;
                          setValue(
                            `certificates.${index}.document.name`,
                            `${t('wizardSteps.step6.certPrefix')}${degreeVal || t('wizardSteps.step6.certNoTitle')}`,
                            { shouldValidate: true, shouldDirty: true }
                          );
                        }
                      })}
                      error={errors.certificates?.[index]?.degree?.message}
                      className="p-2.5"
                    />
                    <Input
                      label={t('wizardSteps.step6.year')}
                      {...register(`certificates.${index}.year`)}
                      error={errors.certificates?.[index]?.year?.message}
                      className="p-2.5"
                    />
                  </div>
                  <DocumentUpload
                    document={certDoc}
                    onChange={(doc) => setValue(`certificates.${index}.document`, doc, { shouldValidate: true, shouldDirty: true })}
                  />
                </div>
              );
            })}
            <button
              type="button"
              onClick={() => appendCertificate({
                id: crypto.randomUUID(),
                school: '',
                degree: '',
                year: '',
                document: {
                  id: crypto.randomUUID(),
                  name: `${t('wizardSteps.step6.certPrefix')}${t('wizardSteps.step6.certNoTitle')}`,
                  documentAction: 'placeholder',
                  fileData: null,
                  fileType: null
                }
              })}
              className="w-full py-3 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl text-indigo-600 dark:text-indigo-400 font-medium flex items-center justify-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-800/50"
            >
              <Plus size={20} /> {t('wizardSteps.step6.addCert')}
            </button>
          </div>
        </div>
        <div className="pt-6 border-t border-slate-100 dark:border-slate-800 mt-6">
          <Textarea
            label={t('wizardSteps.step6.notesLabel')}
            description={t('wizardSteps.step6.notesDesc')}
            value={documentNotes || ''}
            onChange={(e) => setValue('documentNotes', e.target.value, { shouldValidate: true, shouldDirty: true })}
          />
        </div>
      </div>
    </div>
  );
}


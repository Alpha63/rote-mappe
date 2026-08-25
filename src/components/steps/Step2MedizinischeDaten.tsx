import { useFormContext, useFieldArray } from 'react-hook-form';
import { Select } from '../../Select';
import { Textarea } from '../../Textarea';
import { Input } from '../../Input';
import { DocumentUpload } from '../DocumentUpload';
import { Info, Plus, Trash2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { FormSchemaType } from '../../schema';
import { ScannedDocument } from '../../types';

const defaultOrganDonorDoc: ScannedDocument = {
  id: 'organdonor',
  name: 'Organspendeausweis',
  documentAction: 'placeholder',
  fileData: null,
  fileType: null
};

export function Step2MedizinischeDaten() {
  const { register, control, watch, setValue, formState: { errors } } = useFormContext<FormSchemaType>();
  const { t } = useTranslation();

  const { fields: doctorFields, append: appendDoctor, remove: removeDoctor } = useFieldArray({
    control,
    name: 'medicalData.doctors'
  });

  const organDonor = watch('medicalData.organDonor');
  const organDonorDocument = watch('organDonorDocument');
  const conditions = watch('medicalData.conditions');
  const medications = watch('medicalData.medications');
  const allergies = watch('medicalData.allergies');
  const medicalNotes = watch('medicalNotes');

  return (
    <div className="animate-in fade-in zoom-in-95 duration-500">
      <div className="mb-8">
        <h2 className="text-3xl font-serif text-slate-900 dark:text-slate-100 mb-3">{t('wizardSteps.step2.title')}</h2>
        <p className="text-slate-600 dark:text-slate-400 flex items-center gap-2"><Info size={18} className="text-indigo-600 dark:text-indigo-400" /> {t('wizardSteps.step2.desc')}</p>
      </div>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Select
            label={t('wizardSteps.step2.bloodType')}
            {...register('medicalData.bloodType')}
            error={errors.medicalData?.bloodType?.message}
            options={[
              { value: 'A+', label: 'A+' },
              { value: 'A-', label: 'A-' },
              { value: 'B+', label: 'B+' },
              { value: 'B-', label: 'B-' },
              { value: 'AB+', label: 'AB+' },
              { value: 'AB-', label: 'AB-' },
              { value: '0+', label: '0+' },
              { value: '0-', label: '0-' }
            ]}
          />
          <Select
            label={t('wizardSteps.step2.organDonor')}
            value={organDonor === null || organDonor === undefined ? '' : organDonor ? 'yes' : 'no'}
            onChange={(e) => setValue('medicalData.organDonor', e.target.value === '' ? null : e.target.value === 'yes', { shouldValidate: true, shouldDirty: true })}
            error={errors.medicalData?.organDonor?.message}
            options={[
              { value: 'yes', label: t('wizardSteps.step2.yes') },
              { value: 'no', label: t('wizardSteps.step2.no') }
            ]}
          />
          {organDonor === false && (
            <div className="md:col-span-2 mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/50 rounded-xl">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  {...register('medicalData.explicitOrganDonationContradiction')}
                  className="mt-1 w-5 h-5 text-red-600 dark:text-red-400 rounded border-red-300 dark:border-red-700 focus:ring-red-600 dark:focus:ring-red-400 dark:bg-slate-800"
                />
                <span className="text-sm text-red-800 dark:text-red-300">
                  <strong className="block mb-1">{t('wizardSteps.step2.contradictionTitle')}</strong> {t('wizardSteps.step2.contradictionDesc')}
                </span>
              </label>
            </div>
          )}
        </div>
        {organDonor === true && (
          <div className="mt-4">
            <h3 className="text-sm font-medium text-slate-800 dark:text-slate-200 mb-3 border-b border-slate-100 dark:border-slate-800 pb-2">{t('wizardSteps.step2.organDonorCopy')}</h3>
            <DocumentUpload
              document={organDonorDocument || defaultOrganDonorDoc}
              onChange={(doc) => setValue('organDonorDocument', doc, { shouldValidate: true, shouldDirty: true })}
            />
          </div>
        )}
        
        <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
          <h3 className="text-lg font-medium text-slate-800 dark:text-slate-200 mb-4">{t('wizardSteps.step2.doctorsTitle')}</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">{t('wizardSteps.step2.doctorsDesc')}</p>
          <div className="space-y-4">
            {doctorFields.map((doctor, index) => (
              <div key={doctor.id} className="p-4 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800/50 relative group shadow-sm">
                <button
                  type="button"
                  onClick={() => removeDoctor(index)}
                  className="absolute top-4 right-4 text-slate-300 dark:text-slate-400 hover:text-red-500 dark:hover:text-red-400"
                >
                  <Trash2 size={20} />
                </button>
                <h4 className="font-medium text-slate-800 dark:text-slate-200 mb-3">{t('wizardSteps.step2.doctor')} {index + 1}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <Input
                    label={t('wizardSteps.step2.doctorType')}
                    {...register(`medicalData.doctors.${index}.type`)}
                    error={errors.medicalData?.doctors?.[index]?.type?.message}
                    placeholder={t('wizardSteps.step2.doctorTypePlaceholder')}
                    className="p-2.5 bg-white dark:bg-slate-800"
                  />
                  <Input
                    label={t('wizardSteps.step2.doctorName')}
                    {...register(`medicalData.doctors.${index}.name`)}
                    error={errors.medicalData?.doctors?.[index]?.name?.message}
                    className="p-2.5 bg-white dark:bg-slate-800"
                  />
                  <Input
                    label={t('wizardSteps.step2.doctorPhone')}
                    {...register(`medicalData.doctors.${index}.phone`)}
                    error={errors.medicalData?.doctors?.[index]?.phone?.message}
                    className="p-2.5 bg-white dark:bg-slate-800"
                  />
                  <Input
                    label={t('wizardSteps.step2.doctorWebsite')}
                    {...register(`medicalData.doctors.${index}.website`)}
                    error={errors.medicalData?.doctors?.[index]?.website?.message}
                    className="p-2.5 bg-white dark:bg-slate-800"
                  />
                </div>
                <div className="grid grid-cols-1 gap-4">
                  <Input
                    label={t('wizardSteps.step2.doctorAddress')}
                    {...register(`medicalData.doctors.${index}.address`)}
                    error={errors.medicalData?.doctors?.[index]?.address?.message}
                    className="p-2.5 bg-white dark:bg-slate-800"
                  />
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={() => appendDoctor({ id: crypto.randomUUID(), type: '', name: '', phone: '', website: '', address: '' })}
              className="w-full py-3 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl text-indigo-600 dark:text-indigo-400 font-medium flex items-center justify-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
            >
              <Plus size={20} /> {t('wizardSteps.step2.addDoctor')}
            </button>
          </div>
        </div>

        <Textarea
          label={t('wizardSteps.step2.conditions')}
          value={conditions || ''}
          onChange={(e) => setValue('medicalData.conditions', e.target.value, { shouldValidate: true, shouldDirty: true })}
          placeholder={t('wizardSteps.step2.conditionsPlaceholder')}
        />
        <Textarea
          label={t('wizardSteps.step2.medications')}
          value={medications || ''}
          onChange={(e) => setValue('medicalData.medications', e.target.value, { shouldValidate: true, shouldDirty: true })}
          placeholder={t('wizardSteps.step2.medicationsPlaceholder')}
        />
        <Textarea
          label={t('wizardSteps.step2.allergies')}
          value={allergies || ''}
          onChange={(e) => setValue('medicalData.allergies', e.target.value, { shouldValidate: true, shouldDirty: true })}
          placeholder={t('wizardSteps.step2.allergiesPlaceholder')}
        />
        <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
          <Textarea
            label={t('wizardSteps.step2.notesLabel')}
            description={t('wizardSteps.step2.notesDesc')}
            value={medicalNotes || ''}
            onChange={(e) => setValue('medicalNotes', e.target.value, { shouldValidate: true, shouldDirty: true })}
          />
        </div>
      </div>
    </div>
  );
}

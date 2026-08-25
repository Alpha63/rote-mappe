import { useFormContext, useFieldArray } from 'react-hook-form';
import { Input } from '../../Input';
import { Textarea } from '../../Textarea';
import { Trash2, Plus } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { FormSchemaType } from '../../schema';

export function Step8Hinweise() {
  const { t } = useTranslation();
  const { register, control, watch, setValue, formState: { errors } } = useFormContext<FormSchemaType>();

  const { fields: keyFields, append: appendKey, remove: removeKey } = useFieldArray({
    control,
    name: 'keys'
  });

  const { fields: petFields, append: appendPet, remove: removePet } = useFieldArray({
    control,
    name: 'pets'
  });

  const generalNotes = watch('generalNotes');

  return (
    <div className="animate-in fade-in zoom-in-95 duration-500">
      <div className="mb-8">
        <h2 className="text-3xl font-serif text-slate-900 dark:text-slate-100 mb-3">{t('wizardSteps.step8.title')}</h2>
      </div>
      <div className="mb-12">
        <h3 className="text-lg font-medium text-slate-800 dark:text-slate-200 mb-4 border-b border-slate-100 dark:border-slate-800 pb-2">{t('wizardSteps.step8.keysTitle')}</h3>
        <div className="space-y-4 mb-10">
          {keyFields.map((field, index) => (
            <div key={field.id} className="p-4 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 relative shadow-sm">
              <button type="button" onClick={() => removeKey(index)} className="absolute top-4 right-4 text-slate-300 dark:text-slate-400 hover:text-red-500 dark:hover:text-red-400"><Trash2 size={20} /></button>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                <Input label={t('wizardSteps.step8.keyName')} {...register(`keys.${index}.name`)} error={errors.keys?.[index]?.name?.message} className="p-2.5" />
                <Input label={t('wizardSteps.step8.keyPurpose')} {...register(`keys.${index}.purpose`)} error={errors.keys?.[index]?.purpose?.message} className="p-2.5" />
                <Input label={t('wizardSteps.step8.keyLocation')} {...register(`keys.${index}.location`)} error={errors.keys?.[index]?.location?.message} className="p-2.5" />
              </div>
            </div>
          ))}
          <button type="button" onClick={() => appendKey({ id: crypto.randomUUID(), name: '', purpose: '', location: '' })} className="w-full py-3 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl text-indigo-600 dark:text-indigo-400 font-medium flex items-center justify-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-800/50"><Plus size={20} /> {t('wizardSteps.step8.addKey')}</button>
        </div>

        <h3 className="text-lg font-medium text-slate-800 dark:text-slate-200 mb-4 border-b border-slate-100 dark:border-slate-800 pb-2">{t('wizardSteps.step8.petsTitle')}</h3>
        <p className="text-slate-600 dark:text-slate-400 mb-4 text-sm">{t('wizardSteps.step8.petsDesc')}</p>
        <div className="space-y-4 mb-10">
          {petFields.map((field, index) => (
            <div key={field.id} className="p-4 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 relative shadow-sm">
              <button type="button" onClick={() => removePet(index)} className="absolute top-4 right-4 text-slate-300 dark:text-slate-400 hover:text-red-500 dark:hover:text-red-400"><Trash2 size={20} /></button>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                <Input label={t('wizardSteps.step8.petName')} {...register(`pets.${index}.name`)} error={errors.pets?.[index]?.name?.message} className="p-2.5" />
                <Input label={t('wizardSteps.step8.petSpecies')} {...register(`pets.${index}.species`)} error={errors.pets?.[index]?.species?.message} className="p-2.5" />
                <Input label={t('wizardSteps.step8.petCaregiver')} {...register(`pets.${index}.caregiver`)} error={errors.pets?.[index]?.caregiver?.message} className="p-2.5" />
                <Input label={t('wizardSteps.step8.petVet')} {...register(`pets.${index}.vetInfo`)} error={errors.pets?.[index]?.vetInfo?.message} className="p-2.5" />
                <Input label={t('wizardSteps.step8.petChipId')} {...register(`pets.${index}.chipId`)} error={errors.pets?.[index]?.chipId?.message} className="p-2.5" />
                <div className="md:col-span-2">
                  <Input label={t('wizardSteps.step8.petNotes')} {...register(`pets.${index}.notes`)} error={errors.pets?.[index]?.notes?.message} className="p-2.5" />
                </div>
              </div>
            </div>
          ))}
          <button type="button" onClick={() => appendPet({ id: crypto.randomUUID(), name: '', species: '', caregiver: '', vetInfo: '', chipId: '', notes: '' })} className="w-full py-3 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl text-indigo-600 dark:text-indigo-400 font-medium flex items-center justify-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-800/50"><Plus size={20} /> {t('wizardSteps.step8.addPet')}</button>
        </div>
        <div className="pt-6 border-t border-slate-100 dark:border-slate-800 mt-6">
          <Textarea label={t('wizardSteps.step8.notesLabel')} description={t('wizardSteps.step8.notesDesc')} value={generalNotes || ''} onChange={(e) => setValue('generalNotes', e.target.value, { shouldValidate: true, shouldDirty: true })} />
        </div>
      </div>
    </div>
  );
}

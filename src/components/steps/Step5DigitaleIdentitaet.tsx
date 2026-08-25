import { useFormContext, useFieldArray } from 'react-hook-form';
import { Textarea } from '../../Textarea';
import { Info, Trash2, Plus, Type } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { FormSchemaType } from '../../schema';

export function Step5DigitaleIdentitaet() {
  const { register, control, watch, setValue } = useFormContext<FormSchemaType>();
  const { t } = useTranslation();

  const { fields: digitalIdentityFields, append: appendDigitalIdentity, remove: removeDigitalIdentity } = useFieldArray({
    control,
    name: 'digitalIdentities'
  });

  const digitalLegacySocialMedia = watch('digitalLegacySocialMedia');
  const digitalLegacyCloud = watch('digitalLegacyCloud');
  const devicePINs = watch('devicePINs');

  return (
    <div className="animate-in fade-in zoom-in-95 duration-500">
      <div className="mb-8">
        <h2 className="text-3xl font-serif text-slate-900 dark:text-slate-100 mb-3">{t('wizardSteps.step5.title')}</h2>
        <p className="text-slate-600 dark:text-slate-400 flex items-center gap-2"><Info size={18} className="text-indigo-600 dark:text-indigo-400" /> {t('wizardSteps.step5.desc')}</p>
      </div>
      <div className="space-y-10">
        <section>
          <h3 className="text-lg font-medium text-slate-800 dark:text-slate-200 mb-4 border-b border-slate-100 dark:border-slate-800 pb-2">{t('wizardSteps.step5.accountsTitle')}</h3>
          <div className="space-y-4">
            {digitalIdentityFields.map((entry, index) => (
              <div key={entry.id} className="relative group">
                {entry.type === 'heading' ? (
                  <div className="flex items-center gap-4 pt-4 pb-2 border-b border-slate-200 dark:border-slate-700">
                    <input
                      type="text"
                      {...register(`digitalIdentities.${index}.title`)}
                      placeholder={t('wizardSteps.step3.newHeading')}
                      className="text-lg font-semibold text-slate-800 dark:text-slate-200 bg-transparent outline-none w-full placeholder-slate-400 dark:placeholder-slate-500"
                    />
                    <button
                      type="button"
                      onClick={() => removeDigitalIdentity(index)}
                      className="text-slate-300 dark:text-slate-400 hover:text-red-500 dark:hover:text-red-400"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-12 gap-2 bg-white dark:bg-slate-800 p-3 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm items-start">
                    <div className="col-span-3">
                      <label className="block text-[10px] uppercase text-slate-500 dark:text-slate-400 font-semibold mb-1">{t('wizardSteps.step5.service')}</label>
                      <input
                        type="text"
                        placeholder={t('wizardSteps.step5.servicePlaceholder')}
                        {...register(`digitalIdentities.${index}.title`)}
                        className="w-full text-sm bg-slate-50 dark:bg-slate-900 p-2 rounded border dark:border-slate-700 focus:border-indigo-600 dark:focus:border-indigo-500 outline-none text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500"
                      />
                    </div>
                    <div className="col-span-3">
                      <label className="block text-[10px] uppercase text-slate-500 dark:text-slate-400 font-semibold mb-1">{t('wizardSteps.step5.username')}</label>
                      <input
                        type="text"
                        {...register(`digitalIdentities.${index}.username`)}
                        className="w-full text-sm bg-slate-50 dark:bg-slate-900 p-2 rounded border dark:border-slate-700 focus:border-indigo-600 dark:focus:border-indigo-500 outline-none text-slate-900 dark:text-slate-100"
                      />
                    </div>
                    <div className="col-span-3">
                      <label className="block text-[10px] uppercase text-slate-500 dark:text-slate-400 font-semibold mb-1">{t('wizardSteps.step5.password')}</label>
                      <input
                        type="text"
                        {...register(`digitalIdentities.${index}.password`)}
                        className="w-full text-sm bg-slate-50 dark:bg-slate-900 p-2 rounded border dark:border-slate-700 focus:border-indigo-600 dark:focus:border-indigo-500 outline-none text-slate-900 dark:text-slate-100"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-[10px] uppercase text-slate-500 dark:text-slate-400 font-semibold mb-1">{t('wizardSteps.step5.link')}</label>
                      <input
                        type="text"
                        {...register(`digitalIdentities.${index}.url`)}
                        className="w-full text-sm bg-slate-50 dark:bg-slate-900 p-2 rounded border dark:border-slate-700 focus:border-indigo-600 dark:focus:border-indigo-500 outline-none text-slate-900 dark:text-slate-100"
                      />
                    </div>
                    <div className="col-span-1 flex justify-end pt-5">
                      <button
                        type="button"
                        onClick={() => removeDigitalIdentity(index)}
                        className="text-slate-300 dark:text-slate-400 hover:text-red-500 dark:hover:text-red-400 p-1"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => appendDigitalIdentity({ id: crypto.randomUUID(), type: 'account', title: '', username: '', password: '', url: '' })}
                className="flex-1 py-3 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl text-indigo-600 dark:text-indigo-400 font-medium flex items-center justify-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-800/50"
              >
                <Plus size={20} /> {t('wizardSteps.step5.addAccount')}
              </button>
              <button
                type="button"
                onClick={() => appendDigitalIdentity({ id: crypto.randomUUID(), type: 'heading', title: '', username: '', password: '', url: '' })}
                className="flex-1 py-3 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl text-indigo-600 dark:text-indigo-400 font-medium flex items-center justify-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-800/50"
              >
                <Type size={20} /> {t('wizardSteps.step3.insertHeading')}
              </button>
            </div>
          </div>
        </section>
        <section>
          <h3 className="text-lg font-medium text-slate-800 dark:text-slate-200 mb-4 border-b border-slate-100 dark:border-slate-800 pb-2">{t('wizardSteps.step5.legacyTitle')}</h3>
          <div className="space-y-4">
            <Textarea
              label={t('wizardSteps.step5.socialMedia')}
              value={digitalLegacySocialMedia || ''}
              onChange={(e) => setValue('digitalLegacySocialMedia', e.target.value, { shouldValidate: true, shouldDirty: true })}
            />
            <Textarea
              label={t('wizardSteps.step5.cloud')}
              value={digitalLegacyCloud || ''}
              onChange={(e) => setValue('digitalLegacyCloud', e.target.value, { shouldValidate: true, shouldDirty: true })}
            />
          </div>
        </section>
        <div className="pt-6 border-t border-slate-100 dark:border-slate-800 mt-6">
          <Textarea
            label={t('wizardSteps.step5.notesLabel')}
            description={t('wizardSteps.step5.notesDesc')}
            value={devicePINs || ''}
            onChange={(e) => setValue('devicePINs', e.target.value, { shouldValidate: true, shouldDirty: true })}
          />
        </div>
      </div>
    </div>
  );
}

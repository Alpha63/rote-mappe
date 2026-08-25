import { useFormContext, useFieldArray } from 'react-hook-form';
import { Input } from '../../Input';
import { Textarea } from '../../Textarea';
import { Trash2, Plus } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { FormSchemaType } from '../../schema';

export function Step9EigeneKapitel() {
  const { t } = useTranslation();
  const { register, control, watch, setValue, formState: { errors } } = useFormContext<FormSchemaType>();

  const { fields: chapterFields, append: appendChapter, remove: removeChapter } = useFieldArray({
    control,
    name: 'customChapters'
  });

  return (
    <div className="animate-in fade-in zoom-in-95 duration-500">
      <div className="mb-8">
        <h2 className="text-3xl font-serif text-slate-900 dark:text-slate-100 mb-3">{t('wizardSteps.step9.title')}</h2>
      </div>
      <div className="space-y-6">
        {chapterFields.map((field, index) => {
          const chapterContent = watch(`customChapters.${index}.content`);
          return (
            <div key={field.id} className="p-4 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 relative shadow-sm">
              <button type="button" onClick={() => removeChapter(index)} className="absolute top-4 right-4 text-slate-300 dark:text-slate-400 hover:text-red-500 dark:hover:text-red-400"><Trash2 size={20} /></button>
              <div className="mb-4 pr-8"><Input label={t('wizardSteps.step9.chapterTitle')} {...register(`customChapters.${index}.title`)} error={errors.customChapters?.[index]?.title?.message} className="p-2.5 font-medium" /></div>
              <Textarea label={t('wizardSteps.step9.notesLabel')} value={chapterContent || ''} onChange={(e) => setValue(`customChapters.${index}.content`, e.target.value, { shouldValidate: true, shouldDirty: true })} />
            </div>
          );
        })}
        <button type="button" onClick={() => appendChapter({ id: crypto.randomUUID(), title: '', content: '' })} className="w-full py-3 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl text-indigo-600 dark:text-indigo-400 font-medium flex items-center justify-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-800/50"><Plus size={20} /> {t('wizardSteps.step9.addChapter')}</button>
      </div>
    </div>
  );
}

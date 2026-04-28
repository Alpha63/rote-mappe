import { Input } from '../../Input';
import { Textarea } from '../../Textarea';
import { Trash2, Plus } from 'lucide-react';
import { useArrayField } from '../../utils/useArrayField';
import { useTranslation } from 'react-i18next';

export function Step9EigeneKapitel() {
  const { t } = useTranslation();
  const { items: customChapters, addItem: addChapter, updateItem: updateChapter, removeItem: removeChapter } = useArrayField('customChapters', { title: '', content: '' });

  return (
    <div className="animate-in fade-in zoom-in-95 duration-500">
      <div className="mb-8">
        <h2 className="text-3xl font-serif text-slate-900 dark:text-slate-100 mb-3">{t('wizardSteps.step9.title')}</h2>
      </div>
      <div className="space-y-6">
        {customChapters.map((chapter) => (
          <div key={chapter.id} className="p-4 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 relative shadow-sm">
            <button onClick={() => removeChapter(chapter.id)} className="absolute top-4 right-4 text-slate-300 dark:text-slate-400 hover:text-red-500 dark:hover:text-red-400"><Trash2 size={20} /></button>
            <div className="mb-4 pr-8"><Input label={t('wizardSteps.step9.chapterTitle')} value={chapter.title} onChange={(e) => updateChapter(chapter.id, 'title', e.target.value)} className="p-2.5 font-medium" /></div>
            <Textarea label={t('wizardSteps.step9.notesLabel')} value={chapter.content} onChange={(e) => updateChapter(chapter.id, 'content', e.target.value)} />
          </div>
        ))}
        <button onClick={addChapter} className="w-full py-3 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl text-indigo-600 dark:text-indigo-400 font-medium flex items-center justify-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-800/50"><Plus size={20} /> {t('wizardSteps.step9.addChapter')}</button>
      </div>
    </div>
  );
}

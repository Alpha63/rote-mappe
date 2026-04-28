import { useFormContext } from '../../FormContext';
import { Input } from '../../Input';
import { Textarea } from '../../Textarea';
import { Trash2, Plus } from 'lucide-react';
import { useArrayField } from '../../utils/useArrayField';
import { useTranslation } from 'react-i18next';

export function Step8Hinweise() {
  const { t } = useTranslation();
  const { formData, updateField } = useFormContext();
  const { items: keys, addItem: addKey, updateItem: updateKey, removeItem: removeKey } = useArrayField('keys', { name: '', purpose: '', location: '' });

  return (
    <div className="animate-in fade-in zoom-in-95 duration-500">
      <div className="mb-8">
        <h2 className="text-3xl font-serif text-slate-900 dark:text-slate-100 mb-3">{t('wizardSteps.step8.title')}</h2>
      </div>
      <div className="mb-12">
        <h3 className="text-lg font-medium text-slate-800 dark:text-slate-200 mb-4 border-b border-slate-100 dark:border-slate-800 pb-2">{t('wizardSteps.step8.keysTitle')}</h3>
        <div className="space-y-4 mb-10">
          {keys.map((key) => (
            <div key={key.id} className="p-4 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 relative shadow-sm">
              <button onClick={() => removeKey(key.id)} className="absolute top-4 right-4 text-slate-300 dark:text-slate-400 hover:text-red-500 dark:hover:text-red-400"><Trash2 size={20} /></button>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                <Input label={t('wizardSteps.step8.keyName')} value={key.name} onChange={(e) => updateKey(key.id, 'name', e.target.value)} className="p-2.5" />
                <Input label={t('wizardSteps.step8.keyPurpose')} value={key.purpose} onChange={(e) => updateKey(key.id, 'purpose', e.target.value)} className="p-2.5" />
                <Input label={t('wizardSteps.step8.keyLocation')} value={key.location} onChange={(e) => updateKey(key.id, 'location', e.target.value)} className="p-2.5" />
              </div>
            </div>
          ))}
          <button onClick={addKey} className="w-full py-3 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl text-indigo-600 dark:text-indigo-400 font-medium flex items-center justify-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-800/50"><Plus size={20} /> {t('wizardSteps.step8.addKey')}</button>
        </div>
        <div className="pt-6 border-t border-slate-100 dark:border-slate-800 mt-6">
          <Textarea label={t('wizardSteps.step8.notesLabel')} description={t('wizardSteps.step8.notesDesc')} value={formData.generalNotes || ''} onChange={(e) => updateField('generalNotes', e.target.value)} />
        </div>
      </div>
    </div>
  );
}

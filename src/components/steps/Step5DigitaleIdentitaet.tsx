import { useFormContext } from '../../FormContext';
import { Textarea } from '../../Textarea';
import { Info, Trash2, Plus, Type } from 'lucide-react';
import { useArrayField } from '../../utils/useArrayField';
import { useTranslation } from 'react-i18next';

export function Step5DigitaleIdentitaet() {
  const { t } = useTranslation();
  const { items: digitalIdentities, addItem: addDigitalIdentity, updateItem: updateDigitalIdentity, removeItem: removeDigitalIdentity } = useArrayField('digitalIdentities', { type: 'account', title: '', username: '', password: '', url: '' });
  const { formData, setFormData, updateField } = useFormContext();
  const addDigitalIdentityHeading = () => setFormData(prev => ({ ...prev, digitalIdentities: [...(prev.digitalIdentities || []), { id: Math.random().toString(36).substring(2, 9), type: 'heading', title: '', username: '', password: '', url: '' }] }));

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
            {digitalIdentities.map((entry) => (
              <div key={entry.id} className="relative group">
                {entry.type === 'heading' ? (
                  <div className="flex items-center gap-4 pt-4 pb-2 border-b border-slate-200 dark:border-slate-700">
                    <input type="text" value={entry.title} onChange={(e) => updateDigitalIdentity(entry.id, 'title', e.target.value)} placeholder={t('wizardSteps.step3.newHeading')} className="text-lg font-semibold text-slate-800 dark:text-slate-200 bg-transparent outline-none w-full" />
                    <button onClick={() => removeDigitalIdentity(entry.id)} className="text-slate-300 dark:text-slate-400 hover:text-red-500 dark:hover:text-red-400"><Trash2 size={18} /></button>
                  </div>
                ) : (
                  <div className="grid grid-cols-12 gap-2 bg-white dark:bg-slate-800 p-3 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm items-start">
                    <div className="col-span-3"><label className="block text-[10px] uppercase text-slate-500 dark:text-slate-400 font-semibold mb-1">{t('wizardSteps.step5.service')}</label><input type="text" placeholder={t('wizardSteps.step5.servicePlaceholder')} value={entry.title} onChange={(e) => updateDigitalIdentity(entry.id, 'title', e.target.value)} className="w-full text-sm bg-slate-50 dark:bg-slate-900 p-2 rounded border dark:border-slate-700 focus:border-indigo-600 dark:focus:border-indigo-500 outline-none text-slate-900 dark:text-slate-100" /></div>
                    <div className="col-span-3"><label className="block text-[10px] uppercase text-slate-500 dark:text-slate-400 font-semibold mb-1">{t('wizardSteps.step5.username')}</label><input type="text" value={entry.username} onChange={(e) => updateDigitalIdentity(entry.id, 'username', e.target.value)} className="w-full text-sm bg-slate-50 dark:bg-slate-900 p-2 rounded border dark:border-slate-700 focus:border-indigo-600 dark:focus:border-indigo-500 outline-none text-slate-900 dark:text-slate-100" /></div>
                    <div className="col-span-3"><label className="block text-[10px] uppercase text-slate-500 dark:text-slate-400 font-semibold mb-1">{t('wizardSteps.step5.password')}</label><input type="text" value={entry.password} onChange={(e) => updateDigitalIdentity(entry.id, 'password', e.target.value)} className="w-full text-sm bg-slate-50 dark:bg-slate-900 p-2 rounded border dark:border-slate-700 focus:border-indigo-600 dark:focus:border-indigo-500 outline-none text-slate-900 dark:text-slate-100" /></div>
                    <div className="col-span-2"><label className="block text-[10px] uppercase text-slate-500 dark:text-slate-400 font-semibold mb-1">{t('wizardSteps.step5.link')}</label><input type="text" value={entry.url} onChange={(e) => updateDigitalIdentity(entry.id, 'url', e.target.value)} className="w-full text-sm bg-slate-50 dark:bg-slate-900 p-2 rounded border dark:border-slate-700 focus:border-indigo-600 dark:focus:border-indigo-500 outline-none text-slate-900 dark:text-slate-100" /></div>
                    <div className="col-span-1 flex justify-end pt-5"><button onClick={() => removeDigitalIdentity(entry.id)} className="text-slate-300 dark:text-slate-400 hover:text-red-500 dark:hover:text-red-400 p-1"><Trash2 size={18} /></button></div>
                  </div>
                )}
              </div>
            ))}
            <div className="flex gap-4">
              <button onClick={addDigitalIdentity} className="flex-1 py-3 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl text-indigo-600 dark:text-indigo-400 font-medium flex items-center justify-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-800/50"><Plus size={20} /> {t('wizardSteps.step5.addAccount')}</button>
              <button onClick={addDigitalIdentityHeading} className="flex-1 py-3 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl text-indigo-600 dark:text-indigo-400 font-medium flex items-center justify-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-800/50"><Type size={20} /> {t('wizardSteps.step3.insertHeading')}</button>
            </div>
          </div>
        </section>
        <div className="pt-6 border-t border-slate-100 dark:border-slate-800 mt-6">
          <Textarea label={t('wizardSteps.step5.notesLabel')} description={t('wizardSteps.step5.notesDesc')} value={formData.devicePINs || ''} onChange={(e) => updateField('devicePINs', e.target.value)} />
        </div>
      </div>
    </div>
  );
}

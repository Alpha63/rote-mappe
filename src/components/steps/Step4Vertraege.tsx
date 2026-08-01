import { useFormContext } from '../../FormContext';
import { Input } from '../../Input';
import { Textarea } from '../../Textarea';
import { Info, Trash2, Plus } from 'lucide-react';
import { useArrayField } from '../../utils/useArrayField';
import { useTranslation } from 'react-i18next';

export function Step4Vertraege() {
  const { t } = useTranslation();
  const { items: contracts, addItem: addContract, updateItem: updateContract, removeItem: removeContract } = useArrayField('contracts', { type: t('wizardSteps.step4.insurance'), provider: '', contractNumber: '' });
  const { formData, updateField } = useFormContext();

  return (
    <div className="animate-in fade-in zoom-in-95 duration-500">
      <div className="mb-8">
        <h2 className="text-3xl font-serif text-slate-900 dark:text-slate-100 mb-3">{t('wizardSteps.step4.title')}</h2>
        <p className="text-slate-600 dark:text-slate-400 flex items-center gap-2"><Info size={18} className="text-indigo-600 dark:text-indigo-400" /> {t('wizardSteps.step4.desc')}</p>
      </div>
      <div className="space-y-4">
        {contracts.map((contract) => (
          <div key={contract.id} className="p-4 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 relative shadow-sm">
            <button onClick={() => removeContract(contract.id)} className="absolute top-4 right-4 text-slate-300 dark:text-slate-400 hover:text-red-500 dark:hover:text-red-400"><Trash2 size={20} /></button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              <Input label={t('wizardSteps.step4.contractType')} value={contract.type} onChange={(e) => updateContract(contract.id, 'type', e.target.value)} className="p-2.5" />
              <Input label={t('wizardSteps.step4.provider')} value={contract.provider} onChange={(e) => updateContract(contract.id, 'provider', e.target.value)} className="p-2.5" />
              <div className="md:col-span-2"><Input label={t('wizardSteps.step4.contractNumber')} value={contract.contractNumber} onChange={(e) => updateContract(contract.id, 'contractNumber', e.target.value)} className="p-2.5" /></div>
            </div>
          </div>
        ))}
        <button onClick={addContract} className="w-full py-3 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl text-indigo-600 dark:text-indigo-400 font-medium flex items-center justify-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-800/50"><Plus size={20} /> {t('wizardSteps.step4.addContract')}</button>
      </div>

      <div className="space-y-4 mt-10">
        <h3 className="text-lg font-medium text-slate-800 dark:text-slate-200 mb-4 border-b border-slate-100 dark:border-slate-800 pb-2">{t('wizardSteps.step4.subscriptionsTitle')}</h3>
        <p className="text-slate-600 dark:text-slate-400 mb-4 text-sm">{t('wizardSteps.step4.subscriptionsDesc')}</p>
        {(formData.subscriptions || []).map((sub, index) => (
          <div key={sub.id} className="p-4 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 relative shadow-sm">
            <button onClick={() => {
              const newSubs = formData.subscriptions.filter(s => s.id !== sub.id);
              updateField('subscriptions', newSubs);
            }} className="absolute top-4 right-4 text-slate-300 dark:text-slate-400 hover:text-red-500 dark:hover:text-red-400"><Trash2 size={20} /></button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              <Input label={t('wizardSteps.step4.subProvider')} value={sub.provider} onChange={(e) => {
                const newSubs = [...(formData.subscriptions || [])];
                newSubs[index] = { ...sub, provider: e.target.value };
                updateField('subscriptions', newSubs);
              }} className="p-2.5" />
              <Input label={t('wizardSteps.step4.customerNumber')} value={sub.customerNumber} onChange={(e) => {
                const newSubs = [...(formData.subscriptions || [])];
                newSubs[index] = { ...sub, customerNumber: e.target.value };
                updateField('subscriptions', newSubs);
              }} className="p-2.5" />
              <div className="md:col-span-2">
                <Input label={t('wizardSteps.step4.cancellationNotice')} value={sub.cancellationNotice} onChange={(e) => {
                  const newSubs = [...(formData.subscriptions || [])];
                  newSubs[index] = { ...sub, cancellationNotice: e.target.value };
                  updateField('subscriptions', newSubs);
                }} className="p-2.5" />
              </div>
            </div>
          </div>
        ))}
        <button onClick={() => updateField('subscriptions', [...(formData.subscriptions || []), { id: Math.random().toString(36).substring(2, 9), provider: '', customerNumber: '', cancellationNotice: '' }])} className="w-full py-3 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl text-indigo-600 dark:text-indigo-400 font-medium flex items-center justify-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-800/50"><Plus size={20} /> {t('wizardSteps.step4.addSubscription')}</button>
      </div>

      <div className="space-y-4 mt-10">
        <h3 className="text-lg font-medium text-slate-800 dark:text-slate-200 mb-4 border-b border-slate-100 dark:border-slate-800 pb-2">{t('wizardSteps.step4.servicesTitle')}</h3>
        <p className="text-slate-600 dark:text-slate-400 mb-4 text-sm">{t('wizardSteps.step4.servicesDesc')}</p>
        {(formData.serviceProviders || []).map((service, index) => (
          <div key={service.id} className="p-4 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 relative shadow-sm">
            <button onClick={() => {
              const newServices = formData.serviceProviders.filter(s => s.id !== service.id);
              updateField('serviceProviders', newServices);
            }} className="absolute top-4 right-4 text-slate-300 dark:text-slate-400 hover:text-red-500 dark:hover:text-red-400"><Trash2 size={20} /></button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              <Input label={t('wizardSteps.step4.serviceRole')} value={service.role} onChange={(e) => {
                const newServices = [...(formData.serviceProviders || [])];
                newServices[index] = { ...service, role: e.target.value };
                updateField('serviceProviders', newServices);
              }} className="p-2.5" />
              <Input label={t('wizardSteps.step4.serviceName')} value={service.name} onChange={(e) => {
                const newServices = [...(formData.serviceProviders || [])];
                newServices[index] = { ...service, name: e.target.value };
                updateField('serviceProviders', newServices);
              }} className="p-2.5" />
              <div className="md:col-span-2">
                <Input label={t('wizardSteps.step4.serviceContact')} value={service.contact} onChange={(e) => {
                  const newServices = [...(formData.serviceProviders || [])];
                  newServices[index] = { ...service, contact: e.target.value };
                  updateField('serviceProviders', newServices);
                }} className="p-2.5" />
              </div>
            </div>
          </div>
        ))}
        <button onClick={() => updateField('serviceProviders', [...(formData.serviceProviders || []), { id: Math.random().toString(36).substring(2, 9), role: '', name: '', contact: '' }])} className="w-full py-3 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl text-indigo-600 dark:text-indigo-400 font-medium flex items-center justify-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-800/50"><Plus size={20} /> {t('wizardSteps.step4.addService')}</button>
        <div className="mt-4">
          <Input label={t('wizardSteps.step4.meterNumbers')} value={formData.meterNumbers || ''} onChange={(e) => updateField('meterNumbers', e.target.value)} className="p-2.5" />
        </div>
        <div className="pt-6 border-t border-slate-100 dark:border-slate-800 mt-6">
          <Textarea label={t('wizardSteps.step4.notesLabel')} description={t('wizardSteps.step4.notesDesc')} value={formData.contractNotes || ''} onChange={(e) => updateField('contractNotes', e.target.value)} />
        </div>
      </div>
    </div>
  );
}

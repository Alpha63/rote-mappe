import { useFormContext } from '../../FormContext';
import { Input } from '../../Input';
import { Textarea } from '../../Textarea';
import { Info, Trash2, Plus, Type, AlertCircle, Copy } from 'lucide-react';
import { useArrayField } from '../../utils/useArrayField';
import { useTranslation } from 'react-i18next';

export function Step3Finanzen() {
  const { formData, setFormData, updateField } = useFormContext();
  const { t } = useTranslation();
  const { items: bankAccounts, addItem: addBankAccount, updateItem: updateBankAccount, removeItem: removeBankAccount } = useArrayField('bankAccounts', { iban: '', bic: '', bankName: '', bankAddress: '', accountHolder: '', hasPowerOfAttorney: false });
  const { items: otherAssets, addItem: addOtherAsset, updateItem: updateOtherAsset, removeItem: removeOtherAsset } = useArrayField('otherAssets', { type: '', description: '' });
  const addOtherAssetHeading = () => setFormData(prev => ({ ...prev, otherAssets: [...prev.otherAssets, { id: Math.random().toString(36).substring(2, 9), type: '', description: '', isHeading: true, title: '' }] }));
  const { items: realEstates, addItem: addRealEstate, updateItem: updateRealEstate, removeItem: removeRealEstate } = useArrayField('realEstates', { type: '', address: '', country: '' });

  return (
    <div className="animate-in fade-in zoom-in-95 duration-500">
      <div className="mb-8">
        <h2 className="text-3xl font-serif text-slate-900 dark:text-slate-100 mb-3">{t('wizardSteps.step3.title')}</h2>
        <p className="text-slate-600 dark:text-slate-400 flex items-center gap-2"><Info size={18} className="text-indigo-600 dark:text-indigo-400" /> {t('wizardSteps.step3.desc')}</p>
      </div>
      <div className="bg-rose-50 dark:bg-rose-900/20 border border-red-200 dark:border-red-900/50 rounded-xl p-4 mb-8 flex flex-col gap-2 text-red-800 dark:text-red-300">
        <div className="flex items-start gap-3">
          <AlertCircle className="shrink-0 mt-0.5" size={20} />
          <div className="text-sm">
            <strong className="font-semibold">{t('wizardSteps.step3.importantTitle')}</strong><br/>
            {t('wizardSteps.step3.importantDesc')}
          </div>
        </div>
        <div className="flex items-start gap-3 pt-2 border-t border-red-200 dark:border-red-900/50">
          <Info className="shrink-0 mt-0.5 text-red-700 dark:text-red-400" size={20} />
          <div className="text-sm text-red-700 dark:text-red-300">
            <strong className="font-semibold block mb-1">{t('wizardSteps.step3.poaHintTitle')}</strong>
            {t('wizardSteps.step3.poaHintDesc')}<br/>
            <a href="https://www.bmjv.de/DE/service/formulare/form_vorsorgevollmacht/form_vorsorgevollmacht_artikel.html?nn=17628" target="_blank" rel="noopener noreferrer" className="underline hover:text-red-900 dark:hover:text-red-100 break-all">https://www.bmjv.de/DE/service/formulare/form_vorsorgevollmacht/form_vorsorgevollmacht_artikel.html?nn=17628</a>
          </div>
        </div>
      </div>
      <div className="space-y-10">
        <section>
          <h3 className="text-lg font-medium text-slate-800 dark:text-slate-200 mb-4 border-b border-slate-100 dark:border-slate-800 pb-2">{t('wizardSteps.step3.accountsTitle')}</h3>
          <div className="space-y-4">
            {bankAccounts.map((account, index) => (
              <div key={account.id} className="p-4 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 shadow-sm relative group">
                <button onClick={() => removeBankAccount(account.id)} className="absolute top-4 right-4 text-slate-300 dark:text-slate-400 hover:text-red-500 dark:hover:text-red-400"><Trash2 size={20} /></button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  <div className="md:col-span-2"><Input label={t('wizardSteps.step3.bankName')} value={account.bankName} onChange={(e) => updateBankAccount(account.id, 'bankName', e.target.value)} className="p-2.5" /></div>
                  <div className="md:col-span-2"><Input label={t('wizardSteps.step3.bankAddress')} value={account.bankAddress || ''} onChange={(e) => updateBankAccount(account.id, 'bankAddress', e.target.value)} className="p-2.5" /></div>
                  <div className="md:col-span-2"><Input label={t('wizardSteps.step3.accountHolder')} value={account.accountHolder || ''} onChange={(e) => updateBankAccount(account.id, 'accountHolder', e.target.value)} className="p-2.5" /></div>
                  <Input label={t('wizardSteps.step3.iban')} value={account.iban} onChange={(e) => updateBankAccount(account.id, 'iban', e.target.value)} className="p-2.5 font-mono" />
                  <Input label={t('wizardSteps.step3.bic')} value={account.bic} onChange={(e) => updateBankAccount(account.id, 'bic', e.target.value)} className="p-2.5 font-mono" />
                  <div className="md:col-span-2 mt-2 p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl border border-indigo-100 dark:border-indigo-900/50">
                    <label className="flex items-center gap-3 cursor-pointer mb-3">
                      <input type="checkbox" checked={account.hasPowerOfAttorney || false} onChange={(e) => updateBankAccount(account.id, 'hasPowerOfAttorney', e.target.checked)} className="w-5 h-5 rounded border-slate-300 dark:border-slate-600 text-indigo-600 dark:text-indigo-500 focus:ring-indigo-600 dark:focus:ring-indigo-500 dark:bg-slate-800" />
                      <span className="text-sm font-medium text-indigo-900 dark:text-indigo-200">{t('wizardSteps.step3.createPoa')}</span>
                    </label>

                    {account.hasPowerOfAttorney && (
                      <div className="mt-4 border-t border-indigo-100 dark:border-indigo-900/50 pt-4">
                        <div className="flex items-center justify-between mb-4">
                          <div className="text-xs font-medium text-indigo-800 dark:text-indigo-300">{t('wizardSteps.step3.poaDataTitle')}</div>
                          {index > 0 && bankAccounts[0]?.hasPowerOfAttorney && (
                            <button
                              type="button"
                              onClick={() => {
                                const first = bankAccounts[0];
                              setFormData(prev => ({
                                ...prev,
                                bankAccounts: (prev.bankAccounts || []).map(acc => acc.id === account.id ? {
                                  ...acc,
                                  poaFirstName: first.poaFirstName || '',
                                  poaLastName: first.poaLastName || '',
                                  poaAddress: first.poaAddress || '',
                                  poaBirthDate: first.poaBirthDate || '',
                                  poaPhone: first.poaPhone || ''
                                } : acc)
                              }));
                              }}
                              className="text-xs flex items-center gap-1.5 bg-white dark:bg-slate-800 border border-indigo-200 dark:border-indigo-800/50 text-indigo-700 dark:text-indigo-300 px-3 py-1.5 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors shadow-sm"
                            >
                              <Copy size={14} /> {t('wizardSteps.step3.copyFromFirst')}
                            </button>
                          )}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <Input label={t('wizardSteps.step1.firstName')} value={account.poaFirstName || ''} onChange={(e) => updateBankAccount(account.id, 'poaFirstName', e.target.value)} className="p-2.5 bg-white dark:bg-slate-800 !border-indigo-200 dark:!border-indigo-800/50" />
                          <Input label={t('wizardSteps.step1.lastName')} value={account.poaLastName || ''} onChange={(e) => updateBankAccount(account.id, 'poaLastName', e.target.value)} className="p-2.5 bg-white dark:bg-slate-800 !border-indigo-200 dark:!border-indigo-800/50" />
                          <div className="md:col-span-2">
                            <Input label={t('wizardSteps.step3.address')} value={account.poaAddress || ''} onChange={(e) => updateBankAccount(account.id, 'poaAddress', e.target.value)} className="p-2.5 bg-white dark:bg-slate-800 !border-indigo-200 dark:!border-indigo-800/50" />
                          </div>
                          <Input label={t('wizardSteps.step1.birthDate')} type="date" value={account.poaBirthDate || ''} onChange={(e) => updateBankAccount(account.id, 'poaBirthDate', e.target.value)} className="p-2.5 bg-white dark:bg-slate-800 !border-indigo-200 dark:!border-indigo-800/50" />
                          <Input label={t('wizardSteps.step1.phone')} value={account.poaPhone || ''} onChange={(e) => updateBankAccount(account.id, 'poaPhone', e.target.value)} className="p-2.5 bg-white dark:bg-slate-800 !border-indigo-200 dark:!border-indigo-800/50" />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            <button onClick={addBankAccount} className="w-full py-3 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl text-indigo-600 dark:text-indigo-400 font-medium flex items-center justify-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-800/50"><Plus size={20} /> {t('wizardSteps.step3.addAccount')}</button>
          </div>
        </section>
        <section>
          <h3 className="text-lg font-medium text-slate-800 dark:text-slate-200 mb-4 border-b border-slate-100 dark:border-slate-800 pb-2">{t('wizardSteps.step3.assetsTitle')}</h3>
          <div className="space-y-4">
            {otherAssets.map((asset) => (
              <div key={asset.id} className="relative group">
                {asset.isHeading ? (
                  <div className="flex items-center gap-4 pt-4 pb-2 border-b border-slate-200 dark:border-slate-700">
                    <input type="text" value={asset.title || asset.type} onChange={(e) => updateOtherAsset(asset.id, 'type', e.target.value)} placeholder={t('wizardSteps.step3.newHeading')} className="text-lg font-semibold text-slate-800 dark:text-slate-200 bg-transparent outline-none w-full placeholder-slate-400 dark:placeholder-slate-500" />
                    <button onClick={() => removeOtherAsset(asset.id)} className="text-slate-300 dark:text-slate-400 hover:text-red-500 dark:hover:text-red-400"><Trash2 size={18} /></button>
                  </div>
                ) : (
                  <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 shadow-sm relative">
                    <button onClick={() => removeOtherAsset(asset.id)} className="absolute top-4 right-4 text-slate-300 dark:text-slate-400 hover:text-red-500 dark:hover:text-red-400"><Trash2 size={20} /></button>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                      <Input label={t('wizardSteps.step3.assetType')} value={asset.type} onChange={(e) => updateOtherAsset(asset.id, 'type', e.target.value)} className="p-2.5" />
                      <Input label={t('wizardSteps.step3.assetDetails')} value={asset.description} onChange={(e) => updateOtherAsset(asset.id, 'description', e.target.value)} className="p-2.5" />
                    </div>
                  </div>
                )}
              </div>
            ))}
            <div className="flex gap-4">
              <button onClick={addOtherAsset} className="flex-1 py-3 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl text-indigo-600 dark:text-indigo-400 font-medium flex items-center justify-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-800/50"><Plus size={20} /> {t('wizardSteps.step3.addAsset')}</button>
              <button onClick={addOtherAssetHeading} className="flex-1 py-3 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl text-indigo-600 dark:text-indigo-400 font-medium flex items-center justify-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-800/50"><Type size={20} /> {t('wizardSteps.step3.insertHeading')}</button>
            </div>
          </div>
        </section>
        <section>
          <h3 className="text-lg font-medium text-slate-800 dark:text-slate-200 mb-4 border-b border-slate-100 dark:border-slate-800 pb-2">{t('wizardSteps.step3.realEstateTitle')}</h3>
          <div className="space-y-4">
            {realEstates.map((estate) => (
              <div key={estate.id} className="p-4 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 shadow-sm relative group">
                <button onClick={() => removeRealEstate(estate.id)} className="absolute top-4 right-4 text-slate-300 dark:text-slate-400 hover:text-red-500 dark:hover:text-red-400"><Trash2 size={20} /></button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  <Input label={t('wizardSteps.step3.realEstateType')} value={estate.type} onChange={(e) => updateRealEstate(estate.id, 'type', e.target.value)} className="p-2.5" />
                  <Input label={t('wizardSteps.step3.country')} value={estate.country} onChange={(e) => updateRealEstate(estate.id, 'country', e.target.value)} className="p-2.5" />
                  <div className="md:col-span-2"><Input label={t('wizardSteps.step3.fullAddress')} value={estate.address} onChange={(e) => updateRealEstate(estate.id, 'address', e.target.value)} className="p-2.5" /></div>
                </div>
              </div>
            ))}
            <button onClick={addRealEstate} className="w-full py-3 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl text-indigo-600 dark:text-indigo-400 font-medium flex items-center justify-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-800/50"><Plus size={20} /> {t('wizardSteps.step3.addRealEstate')}</button>
          </div>
        </section>
        <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
          <Textarea label={t('wizardSteps.step3.notesLabel')} description={t('wizardSteps.step3.notesDesc')} value={formData.financeNotes || ''} onChange={(e) => updateField('financeNotes', e.target.value)} />
        </div>
      </div>
    </div>
  );
}

import { useState, useEffect, useCallback } from 'react';
import { useFormContext } from '../FormContext';
import { Input } from '../Input';
import { Select } from '../Select';
import { Textarea } from '../Textarea';
import { DocumentUpload } from './DocumentUpload';
import { Info, Trash2, Plus, Minus, Type, AlertCircle, ShieldCheck, Download, Loader2, CheckCircle, Copy } from 'lucide-react';
import { MaritalStatus, Salutation, ScannedDocument, FormData } from '../types';
import { useArrayField } from '../utils/useArrayField';
import { useTranslation } from 'react-i18next';

export function Step1Basisdaten() {
  const { formData, setFormData, updateField, errors } = useFormContext();
  const { t } = useTranslation();

  const handleChildrenCountChange = (val: string) => {
    const count = parseInt(val, 10);
    if (isNaN(count) || count < 0) return;
    setFormData(prev => {
      const newChildren = [...(prev.children || [])];
      if (count > newChildren.length) {
        for (let i = newChildren.length; i < count; i++) {
          newChildren.push({ id: Math.random().toString(36).substring(2, 9), firstName: '', middleName: '', lastName: '', birthDate: '', birthPlace: '', phone: '' });
        }
      } else if (count < newChildren.length) newChildren.splice(count);
      return { ...prev, childrenCount: val, children: newChildren };
    });
  };

  const updateChild = (id: string, field: keyof typeof formData.children[0], value: string) => setFormData(prev => ({ ...prev, children: prev.children.map(c => c.id === id ? { ...c, [field]: value } : c) }));
  const { items: contacts, addItem: addContact, updateItem: updateContact, removeItem: removeContact } = useArrayField<'contacts'>(
    'contacts',
    { type: t('wizardSteps.step1.contactDefaultType'), name: '', phone: '', email: '' }
  );

  return (
    <div className="animate-in fade-in zoom-in-95 duration-500">
      <div className="mb-8">
        <h2 className="text-3xl font-serif text-slate-900 dark:text-slate-100 mb-3">{t('wizardSteps.step1.title')}</h2>
        <p className="text-slate-600 dark:text-slate-400 dark:text-slate-500 flex items-center gap-2"><Info size={18} className="text-indigo-600 dark:text-indigo-400" /> {t('wizardSteps.step1.desc')}</p>
      </div>
      <div className="space-y-8">
        <div className="grid grid-cols-1 gap-6">
          <Input label={t('wizardSteps.step1.docTitle')} value={formData.documentTitle !== undefined ? formData.documentTitle : 'NOTFALLAKTE'} onChange={(e) => updateField('documentTitle', e.target.value)} placeholder={t('wizardSteps.step1.docTitlePlaceholder')} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-[auto_1fr_1fr_1fr] gap-6">
          <Select label={t('wizardSteps.step1.salutation')} value={formData.salutation} onChange={(e) => updateField('salutation', e.target.value as Salutation)} options={[{ value: 'Herr', label: t('wizardSteps.step1.salutationMr') }, { value: 'Frau', label: t('wizardSteps.step1.salutationMrs') }, { value: 'Divers', label: t('wizardSteps.step1.salutationDiv') }]} />
          <Input label={t('wizardSteps.step1.firstName')} value={formData.firstName} onChange={(e) => updateField('firstName', e.target.value)} error={errors.firstName} placeholder="Max" />
          <Input label={t('wizardSteps.step1.middleName')} value={formData.middleName} onChange={(e) => updateField('middleName', e.target.value)} error={errors.middleName} />
          <Input label={t('wizardSteps.step1.lastName')} value={formData.lastName} onChange={(e) => updateField('lastName', e.target.value)} error={errors.lastName} placeholder="Mustermann" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Input label={t('wizardSteps.step1.birthDate')} type="date" value={formData.birthDate} onChange={(e) => updateField('birthDate', e.target.value)} />
          <Input label={t('wizardSteps.step1.birthPlace')} value={formData.birthPlace} onChange={(e) => updateField('birthPlace', e.target.value)} />
          <Input label={t('wizardSteps.step1.birthCountry')} value={formData.birthCountry} onChange={(e) => updateField('birthCountry', e.target.value)} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input label={t('wizardSteps.step1.taxId')} value={formData.taxId} onChange={(e) => updateField('taxId', e.target.value)} placeholder={t('wizardSteps.step1.taxIdPlaceholder')} />
          <Input label={t('wizardSteps.step1.ssn')} value={formData.socialSecurityNumber} onChange={(e) => updateField('socialSecurityNumber', e.target.value)} />
        </div>
        <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
          <h3 className="text-lg font-medium text-slate-800 dark:text-slate-200 mb-4">{t('wizardSteps.step1.addressTitle')}</h3>
          <div className="grid grid-cols-4 gap-6 mb-6">
            <div className="col-span-4 md:col-span-3"><Input label={t('wizardSteps.step1.street')} value={formData.street} onChange={(e) => updateField('street', e.target.value)} /></div>
            <div className="col-span-4 md:col-span-1"><Input label={t('wizardSteps.step1.houseNumber')} value={formData.houseNumber} onChange={(e) => updateField('houseNumber', e.target.value)} /></div>
          </div>
          <div className="grid grid-cols-4 gap-6">
            <div className="col-span-4 md:col-span-1"><Input label={t('wizardSteps.step1.zipCode')} value={formData.zipCode} onChange={(e) => updateField('zipCode', e.target.value)} error={errors.zipCode} /></div>
            <div className="col-span-4 md:col-span-3"><Input label={t('wizardSteps.step1.city')} value={formData.city} onChange={(e) => updateField('city', e.target.value)} /></div>
          </div>
        </div>
        <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
          <h3 className="text-lg font-medium text-slate-800 dark:text-slate-200 mb-4">{t('wizardSteps.step1.maritalStatusTitle')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Select label={t('wizardSteps.step1.status')} value={formData.maritalStatus} onChange={(e) => updateField('maritalStatus', e.target.value as MaritalStatus)} options={[{ value: 'ledig', label: t('wizardSteps.step1.statusSingle') }, { value: 'verheiratet', label: t('wizardSteps.step1.statusMarried') }, { value: 'geschieden', label: t('wizardSteps.step1.statusDivorced') }]} />
            {formData.maritalStatus !== 'ledig' && <Input label={t('wizardSteps.step1.marriageDate')} type="date" value={formData.marriageDate} onChange={(e) => updateField('marriageDate', e.target.value)} />}
            {formData.maritalStatus === 'geschieden' && <Input label={t('wizardSteps.step1.divorceDate')} type="date" value={formData.divorceDate} onChange={(e) => updateField('divorceDate', e.target.value)} />}
            <div className={formData.maritalStatus === 'geschieden' ? 'md:col-span-2' : ''}>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 dark:text-slate-500 mb-1">{t('wizardSteps.step1.childrenCount')}</label>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleChildrenCountChange(String(Math.max(0, parseInt(formData.childrenCount || '0', 10) - 1)))}
                  className="w-10 h-10 rounded-lg border border-slate-200 dark:border-slate-600 flex items-center justify-center bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 dark:text-slate-500 transition-colors shadow-sm cursor-pointer"
                >
                  <Minus size={18} />
                </button>
                <div className="w-16 h-10 rounded-lg border border-slate-200 dark:border-slate-600 flex items-center justify-center bg-slate-50 dark:bg-slate-900 font-medium text-slate-800 dark:text-slate-200 shadow-inner">
                  {formData.childrenCount || '0'}
                </div>
                <button
                  type="button"
                  onClick={() => handleChildrenCountChange(String((parseInt(formData.childrenCount || '0', 10) || 0) + 1))}
                  className="w-10 h-10 rounded-lg border border-slate-200 dark:border-slate-600 flex items-center justify-center bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 dark:text-slate-500 transition-colors shadow-sm cursor-pointer"
                >
                  <Plus size={18} />
                </button>
              </div>
              {errors.childrenCount && <p className="text-red-500 dark:text-red-400 text-xs mt-1.5">{errors.childrenCount}</p>}
            </div>
          </div>
          {formData.children && formData.children.length > 0 && (
            <div className="mt-6 space-y-4">
              {formData.children.map((child, index) => (
                <div key={child.id} className="p-4 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800/50 shadow-sm">
                  <h4 className="font-medium text-slate-800 dark:text-slate-200 mb-3 border-b border-slate-200 dark:border-slate-700 pb-2">{t('wizardSteps.step1.child')} {index + 1}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <Input label={t('wizardSteps.step1.firstName')} value={child.firstName} onChange={(e) => updateChild(child.id, 'firstName', e.target.value)} className="p-2.5 bg-white dark:bg-slate-800" />
                    <Input label={t('wizardSteps.step1.middleName')} value={child.middleName} onChange={(e) => updateChild(child.id, 'middleName', e.target.value)} className="p-2.5 bg-white dark:bg-slate-800" />
                    <Input label={t('wizardSteps.step1.lastName')} value={child.lastName} onChange={(e) => updateChild(child.id, 'lastName', e.target.value)} className="p-2.5 bg-white dark:bg-slate-800" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Input label={t('wizardSteps.step1.birthDate')} type="date" value={child.birthDate} onChange={(e) => updateChild(child.id, 'birthDate', e.target.value)} className="p-2.5 bg-white dark:bg-slate-800" />
                    <Input label={t('wizardSteps.step1.birthPlace')} value={child.birthPlace} onChange={(e) => updateChild(child.id, 'birthPlace', e.target.value)} className="p-2.5 bg-white dark:bg-slate-800" />
                    <Input label={t('wizardSteps.step1.phone')} value={child.phone} onChange={(e) => updateChild(child.id, 'phone', e.target.value)} className="p-2.5 bg-white dark:bg-slate-800" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
          <h3 className="text-lg font-medium text-slate-800 dark:text-slate-200 mb-4">{t('wizardSteps.step1.contactsTitle')}</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 dark:text-slate-500 mb-4">{t('wizardSteps.step1.contactsDesc')}</p>
          <div className="space-y-4">
            {contacts.map((contact, index) => (
              <div key={contact.id} className="p-4 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 relative group shadow-sm">
                <button onClick={() => removeContact(contact.id)} className="absolute top-4 right-4 text-slate-300 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 hover:text-red-500 dark:hover:text-red-400 cursor-pointer"><Trash2 size={20} /></button>
                <h4 className="font-medium text-slate-800 dark:text-slate-200 mb-3">{t('wizardSteps.step1.contact')} {index + 1}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input label={t('wizardSteps.step1.contactRelation')} value={contact.type} onChange={(e) => updateContact(contact.id, 'type', e.target.value)} placeholder={t('wizardSteps.step1.contactRelationPlaceholder')} className="p-2.5" />
                  <Input label={t('wizardSteps.step1.contactName')} value={contact.name} onChange={(e) => updateContact(contact.id, 'name', e.target.value)} className="p-2.5" />
                  <Input label={t('wizardSteps.step1.contactPhone')} value={contact.phone} onChange={(e) => updateContact(contact.id, 'phone', e.target.value)} className="p-2.5" />
                  <Input label={t('wizardSteps.step1.contactEmail')} type="email" value={contact.email} onChange={(e) => updateContact(contact.id, 'email', e.target.value)} className="p-2.5" />
                </div>
              </div>
            ))}
            <button onClick={addContact} className="w-full py-3 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl text-indigo-600 dark:text-indigo-400 font-medium flex items-center justify-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer"><Plus size={20} /> {t('wizardSteps.step1.addContact')}</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Step2MedizinischeDaten() {
  const { formData, setFormData, updateField } = useFormContext();
  const { t } = useTranslation();
  const updateMedicalField = <K extends keyof FormData['medicalData']>(field: K, value: FormData['medicalData'][K]) => setFormData(prev => ({ ...prev, medicalData: { ...(prev.medicalData || {}), [field]: value } }));

  return (
    <div className="animate-in fade-in zoom-in-95 duration-500">
      <div className="mb-8">
        <h2 className="text-3xl font-serif text-slate-900 dark:text-slate-100 mb-3">{t('wizardSteps.step2.title')}</h2>
        <p className="text-slate-600 dark:text-slate-400 dark:text-slate-500 flex items-center gap-2"><Info size={18} className="text-indigo-600 dark:text-indigo-400" /> {t('wizardSteps.step2.desc')}</p>
      </div>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Select label={t('wizardSteps.step2.bloodType')} value={formData.medicalData?.bloodType} onChange={(e) => updateMedicalField('bloodType', e.target.value)} options={[{ value: 'A+', label: 'A+' }, { value: 'A-', label: 'A-' }, { value: 'B+', label: 'B+' }, { value: 'B-', label: 'B-' }, { value: 'AB+', label: 'AB+' }, { value: 'AB-', label: 'AB-' }, { value: '0+', label: '0+' }, { value: '0-', label: '0-' }]} />
          <Select label={t('wizardSteps.step2.organDonor')} value={formData.medicalData.organDonor === null ? '' : formData.medicalData.organDonor ? 'yes' : 'no'} onChange={(e) => updateMedicalField('organDonor', e.target.value === '' ? null : e.target.value === 'yes')} options={[{ value: 'yes', label: t('wizardSteps.step2.yes') }, { value: 'no', label: t('wizardSteps.step2.no') }]} />
          {formData.medicalData.organDonor === false && (
            <div className="md:col-span-2 mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/50 rounded-xl">
              <label className="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" checked={formData.medicalData.explicitOrganDonationContradiction} onChange={(e) => updateMedicalField('explicitOrganDonationContradiction', e.target.checked)} className="mt-1 w-5 h-5 text-red-600 dark:text-red-500 rounded border-red-300 dark:border-red-700 focus:ring-red-600 dark:focus:ring-red-500 dark:bg-slate-800" />
                <span className="text-sm text-red-800 dark:text-red-300"><strong className="block mb-1">{t('wizardSteps.step2.contradictionTitle')}</strong> {t('wizardSteps.step2.contradictionDesc')}</span>
              </label>
            </div>
          )}
        </div>
        {formData.medicalData.organDonor === true && formData.organDonorDocument && (
          <div className="mt-4"><h3 className="text-sm font-medium text-slate-800 dark:text-slate-200 mb-3 border-b border-slate-100 dark:border-slate-800 pb-2">{t('wizardSteps.step2.organDonorCopy')}</h3><DocumentUpload document={formData.organDonorDocument} onChange={(doc) => updateField('organDonorDocument', doc)} /></div>
        )}
        <Textarea label={t('wizardSteps.step2.conditions')} value={formData.medicalData?.conditions} onChange={(e) => updateMedicalField('conditions', e.target.value)} placeholder={t('wizardSteps.step2.conditionsPlaceholder')} />
        <Textarea label={t('wizardSteps.step2.medications')} value={formData.medicalData?.medications} onChange={(e) => updateMedicalField('medications', e.target.value)} placeholder={t('wizardSteps.step2.medicationsPlaceholder')} />
        <Textarea label={t('wizardSteps.step2.allergies')} value={formData.medicalData?.allergies} onChange={(e) => updateMedicalField('allergies', e.target.value)} placeholder={t('wizardSteps.step2.allergiesPlaceholder')} />
        <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
          <Textarea label={t('wizardSteps.step2.notesLabel')} description={t('wizardSteps.step2.notesDesc')} value={formData.medicalNotes || ''} onChange={(e) => updateField('medicalNotes', e.target.value)} />
        </div>
      </div>
    </div>
  );
}

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
        <p className="text-slate-600 dark:text-slate-400 dark:text-slate-500 flex items-center gap-2"><Info size={18} className="text-indigo-600 dark:text-indigo-400" /> {t('wizardSteps.step3.desc')}</p>
      </div>
      <div className="bg-rose-50 dark:bg-rose-900/20 border border-red-200 dark:border-red-900/50 rounded-xl p-4 mb-8 flex flex-col gap-2 text-red-800 dark:text-red-300">
        <div className="flex items-start gap-3">
          <AlertCircle className="shrink-0 mt-0.5" size={20} />
          <div className="text-sm">
            <strong className="font-semibold">{t('wizardSteps.step3.importantTitle')}</strong><br/>
            {t('wizardSteps.step3.importantDesc')}
          </div>
        </div>
        <div className="flex items-start gap-3 pt-2 border-t border-red-200 dark:border-red-900/50/50 dark:border-red-900/50">
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
                <button onClick={() => removeBankAccount(account.id)} className="absolute top-4 right-4 text-slate-300 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 hover:text-red-500 dark:hover:text-red-400 cursor-pointer"><Trash2 size={20} /></button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  <div className="md:col-span-2"><Input label={t('wizardSteps.step3.bankName')} value={account.bankName} onChange={(e) => updateBankAccount(account.id, 'bankName', e.target.value)} className="p-2.5" /></div>
                  <div className="md:col-span-2"><Input label={t('wizardSteps.step3.bankAddress')} value={account.bankAddress || ''} onChange={(e) => updateBankAccount(account.id, 'bankAddress', e.target.value)} className="p-2.5" /></div>
                  <div className="md:col-span-2"><Input label={t('wizardSteps.step3.accountHolder')} value={account.accountHolder || ''} onChange={(e) => updateBankAccount(account.id, 'accountHolder', e.target.value)} className="p-2.5" /></div>
                  <Input label={t('wizardSteps.step3.iban')} value={account.iban} onChange={(e) => updateBankAccount(account.id, 'iban', e.target.value)} className="p-2.5 font-mono" />
                  <Input label={t('wizardSteps.step3.bic')} value={account.bic} onChange={(e) => updateBankAccount(account.id, 'bic', e.target.value)} className="p-2.5 font-mono" />
                  <div className="md:col-span-2 mt-2 p-4 bg-indigo-50 dark:bg-indigo-900/20/50 dark:bg-indigo-900/20 rounded-xl border border-indigo-100 dark:border-indigo-900/50">
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
                              className="text-xs flex items-center gap-1.5 bg-white dark:bg-slate-800 border border-indigo-200 dark:border-indigo-800/50 text-indigo-700 dark:text-indigo-300 px-3 py-1.5 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors shadow-sm cursor-pointer"
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
            <button onClick={addBankAccount} className="w-full py-3 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl text-indigo-600 dark:text-indigo-400 font-medium flex items-center justify-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer"><Plus size={20} /> {t('wizardSteps.step3.addAccount')}</button>
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
                    <button onClick={() => removeOtherAsset(asset.id)} className="text-slate-300 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 hover:text-red-500 dark:hover:text-red-400 cursor-pointer"><Trash2 size={18} /></button>
                  </div>
                ) : (
                  <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 shadow-sm relative">
                    <button onClick={() => removeOtherAsset(asset.id)} className="absolute top-4 right-4 text-slate-300 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 hover:text-red-500 dark:hover:text-red-400 cursor-pointer"><Trash2 size={20} /></button>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                      <Input label={t('wizardSteps.step3.assetType')} value={asset.type} onChange={(e) => updateOtherAsset(asset.id, 'type', e.target.value)} className="p-2.5" />
                      <Input label={t('wizardSteps.step3.assetDetails')} value={asset.description} onChange={(e) => updateOtherAsset(asset.id, 'description', e.target.value)} className="p-2.5" />
                    </div>
                  </div>
                )}
              </div>
            ))}
            <div className="flex gap-4">
              <button onClick={addOtherAsset} className="flex-1 py-3 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl text-indigo-600 dark:text-indigo-400 font-medium flex items-center justify-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer"><Plus size={20} /> {t('wizardSteps.step3.addAsset')}</button>
              <button onClick={addOtherAssetHeading} className="flex-1 py-3 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl text-indigo-600 dark:text-indigo-400 font-medium flex items-center justify-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer"><Type size={20} /> {t('wizardSteps.step3.insertHeading')}</button>
            </div>
          </div>
        </section>
        <section>
          <h3 className="text-lg font-medium text-slate-800 dark:text-slate-200 mb-4 border-b border-slate-100 dark:border-slate-800 pb-2">{t('wizardSteps.step3.realEstateTitle')}</h3>
          <div className="space-y-4">
            {realEstates.map((estate) => (
              <div key={estate.id} className="p-4 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 shadow-sm relative group">
                <button onClick={() => removeRealEstate(estate.id)} className="absolute top-4 right-4 text-slate-300 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 hover:text-red-500 dark:hover:text-red-400 cursor-pointer"><Trash2 size={20} /></button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  <Input label={t('wizardSteps.step3.realEstateType')} value={estate.type} onChange={(e) => updateRealEstate(estate.id, 'type', e.target.value)} className="p-2.5" />
                  <Input label={t('wizardSteps.step3.country')} value={estate.country} onChange={(e) => updateRealEstate(estate.id, 'country', e.target.value)} className="p-2.5" />
                  <div className="md:col-span-2"><Input label={t('wizardSteps.step3.fullAddress')} value={estate.address} onChange={(e) => updateRealEstate(estate.id, 'address', e.target.value)} className="p-2.5" /></div>
                </div>
              </div>
            ))}
            <button onClick={addRealEstate} className="w-full py-3 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl text-indigo-600 dark:text-indigo-400 font-medium flex items-center justify-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer"><Plus size={20} /> {t('wizardSteps.step3.addRealEstate')}</button>
          </div>
        </section>
        <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
          <Textarea label={t('wizardSteps.step3.notesLabel')} description={t('wizardSteps.step3.notesDesc')} value={formData.financeNotes || ''} onChange={(e) => updateField('financeNotes', e.target.value)} />
        </div>
      </div>
    </div>
  );
}

export function Step4Vertraege() {
  const { t } = useTranslation();
  const { items: contracts, addItem: addContract, updateItem: updateContract, removeItem: removeContract } = useArrayField('contracts', { type: t('wizardSteps.step4.insurance'), provider: '', contractNumber: '' });
  const { formData, updateField } = useFormContext();

  return (
    <div className="animate-in fade-in zoom-in-95 duration-500">
      <div className="mb-8">
        <h2 className="text-3xl font-serif text-slate-900 dark:text-slate-100 mb-3">{t('wizardSteps.step4.title')}</h2>
        <p className="text-slate-600 dark:text-slate-400 dark:text-slate-500 flex items-center gap-2"><Info size={18} className="text-indigo-600 dark:text-indigo-400" /> {t('wizardSteps.step4.desc')}</p>
      </div>
      <div className="space-y-4">
        {contracts.map((contract) => (
          <div key={contract.id} className="p-4 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 relative shadow-sm">
            <button onClick={() => removeContract(contract.id)} className="absolute top-4 right-4 text-slate-300 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 hover:text-red-500 dark:hover:text-red-400 cursor-pointer"><Trash2 size={20} /></button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              <Input label={t('wizardSteps.step4.contractType')} value={contract.type} onChange={(e) => updateContract(contract.id, 'type', e.target.value)} className="p-2.5" />
              <Input label={t('wizardSteps.step4.provider')} value={contract.provider} onChange={(e) => updateContract(contract.id, 'provider', e.target.value)} className="p-2.5" />
              <div className="md:col-span-2"><Input label={t('wizardSteps.step4.contractNumber')} value={contract.contractNumber} onChange={(e) => updateContract(contract.id, 'contractNumber', e.target.value)} className="p-2.5" /></div>
            </div>
          </div>
        ))}
        <button onClick={addContract} className="w-full py-3 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl text-indigo-600 dark:text-indigo-400 font-medium flex items-center justify-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer"><Plus size={20} /> {t('wizardSteps.step4.addContract')}</button>
        <div className="pt-6 border-t border-slate-100 dark:border-slate-800 mt-6">
          <Textarea label={t('wizardSteps.step4.notesLabel')} description={t('wizardSteps.step4.notesDesc')} value={formData.contractNotes || ''} onChange={(e) => updateField('contractNotes', e.target.value)} />
        </div>
      </div>
    </div>
  );
}

export function Step5DigitaleIdentitaet() {
  const { t } = useTranslation();
  const { items: digitalIdentities, addItem: addDigitalIdentity, updateItem: updateDigitalIdentity, removeItem: removeDigitalIdentity } = useArrayField('digitalIdentities', { type: 'account', title: '', username: '', password: '', url: '' });
  const { formData, setFormData, updateField } = useFormContext();
  const addDigitalIdentityHeading = () => setFormData(prev => ({ ...prev, digitalIdentities: [...(prev.digitalIdentities || []), { id: Math.random().toString(36).substring(2, 9), type: 'heading', title: '', username: '', password: '', url: '' }] }));

  return (
    <div className="animate-in fade-in zoom-in-95 duration-500">
      <div className="mb-8">
        <h2 className="text-3xl font-serif text-slate-900 dark:text-slate-100 mb-3">{t('wizardSteps.step5.title')}</h2>
        <p className="text-slate-600 dark:text-slate-400 dark:text-slate-500 flex items-center gap-2"><Info size={18} className="text-indigo-600 dark:text-indigo-400" /> {t('wizardSteps.step5.desc')}</p>
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
                    <button onClick={() => removeDigitalIdentity(entry.id)} className="text-slate-300 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 hover:text-red-500 dark:hover:text-red-400 cursor-pointer"><Trash2 size={18} /></button>
                  </div>
                ) : (
                  <div className="grid grid-cols-12 gap-2 bg-white dark:bg-slate-800 p-3 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm items-start">
                    <div className="col-span-3"><label className="block text-[10px] uppercase text-slate-500 dark:text-slate-400 dark:text-slate-500 font-semibold mb-1">{t('wizardSteps.step5.service')}</label><input type="text" placeholder={t('wizardSteps.step5.servicePlaceholder')} value={entry.title} onChange={(e) => updateDigitalIdentity(entry.id, 'title', e.target.value)} className="w-full text-sm bg-slate-50 dark:bg-slate-900 p-2 rounded border dark:border-slate-700 focus:border-indigo-600 dark:focus:border-indigo-500 outline-none text-slate-900 dark:text-slate-100" /></div>
                    <div className="col-span-3"><label className="block text-[10px] uppercase text-slate-500 dark:text-slate-400 dark:text-slate-500 font-semibold mb-1">{t('wizardSteps.step5.username')}</label><input type="text" value={entry.username} onChange={(e) => updateDigitalIdentity(entry.id, 'username', e.target.value)} className="w-full text-sm bg-slate-50 dark:bg-slate-900 p-2 rounded border dark:border-slate-700 focus:border-indigo-600 dark:focus:border-indigo-500 outline-none text-slate-900 dark:text-slate-100" /></div>
                    <div className="col-span-3"><label className="block text-[10px] uppercase text-slate-500 dark:text-slate-400 dark:text-slate-500 font-semibold mb-1">{t('wizardSteps.step5.password')}</label><input type="text" value={entry.password} onChange={(e) => updateDigitalIdentity(entry.id, 'password', e.target.value)} className="w-full text-sm bg-slate-50 dark:bg-slate-900 p-2 rounded border dark:border-slate-700 focus:border-indigo-600 dark:focus:border-indigo-500 outline-none text-slate-900 dark:text-slate-100" /></div>
                    <div className="col-span-2"><label className="block text-[10px] uppercase text-slate-500 dark:text-slate-400 dark:text-slate-500 font-semibold mb-1">{t('wizardSteps.step5.link')}</label><input type="text" value={entry.url} onChange={(e) => updateDigitalIdentity(entry.id, 'url', e.target.value)} className="w-full text-sm bg-slate-50 dark:bg-slate-900 p-2 rounded border dark:border-slate-700 focus:border-indigo-600 dark:focus:border-indigo-500 outline-none text-slate-900 dark:text-slate-100" /></div>
                    <div className="col-span-1 flex justify-end pt-5"><button onClick={() => removeDigitalIdentity(entry.id)} className="text-slate-300 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 hover:text-red-500 dark:hover:text-red-400 p-1 cursor-pointer"><Trash2 size={18} /></button></div>
                  </div>
                )}
              </div>
            ))}
            <div className="flex gap-4">
              <button onClick={addDigitalIdentity} className="flex-1 py-3 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl text-indigo-600 dark:text-indigo-400 font-medium flex items-center justify-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer"><Plus size={20} /> {t('wizardSteps.step5.addAccount')}</button>
              <button onClick={addDigitalIdentityHeading} className="flex-1 py-3 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl text-indigo-600 dark:text-indigo-400 font-medium flex items-center justify-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer"><Type size={20} /> {t('wizardSteps.step3.insertHeading')}</button>
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

export function Step6Dokumente() {
  const { t } = useTranslation();
  const { formData, setFormData, updateField } = useFormContext();
  const { items: otherDocuments, addItem: addOtherDocument, removeItem: removeOtherDocument } = useArrayField('otherDocuments', { name: '', documentAction: 'placeholder', fileData: null, fileType: null });
  const updateOtherDocument = (doc: ScannedDocument) => setFormData(prev => ({ ...prev, otherDocuments: (prev.otherDocuments || []).map(d => d.id === doc.id ? doc : d) }));
  const updateCertificate = (id: string, field: string, value: unknown) => setFormData(prev => ({ ...prev, certificates: (prev.certificates || []).map(c => { if (c.id === id) { const updated = { ...c, [field]: value }; if (field === 'degree' && updated.document) { updated.document = { ...updated.document, name: `${t('wizardSteps.step6.certPrefix')}${value || t('wizardSteps.step6.certNoTitle')}` }; } return updated; } return c; }) }));
  const { items: certificates, addItem: addCertificate, removeItem: removeCertificate } = useArrayField('certificates', { school: '', degree: '', year: '', document: { id: Math.random().toString(36).substring(2, 9), name: `${t('wizardSteps.step6.certPrefix')}${t('wizardSteps.step6.certNoTitle')}`, documentAction: 'placeholder', fileData: null, fileType: null } });

  return (
    <div className="animate-in fade-in zoom-in-95 duration-500">
      <div className="mb-8">
        <h2 className="text-3xl font-serif text-slate-900 dark:text-slate-100 mb-3">{t('wizardSteps.step6.title')}</h2>
        <p className="text-slate-600 dark:text-slate-400 dark:text-slate-500 flex items-center gap-2"><Info size={18} className="text-indigo-600 dark:text-indigo-400" /> {t('wizardSteps.step6.desc')}</p>
      </div>
      <div className="space-y-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { doc: formData.idCard, handler: (doc: ScannedDocument) => updateField('idCard', doc), show: true },
            { doc: formData.passport, handler: (doc: ScannedDocument) => updateField('passport', doc), show: true },
            { doc: formData.birthCertificate, handler: (doc: ScannedDocument) => updateField('birthCertificate', doc), show: !!formData.birthCertificate },
            { doc: formData.driversLicense, handler: (doc: ScannedDocument) => updateField('driversLicense', doc), show: true },
            { doc: formData.marriageCertificate, handler: (doc: ScannedDocument) => updateField('marriageCertificate', doc), show: (formData.maritalStatus === 'verheiratet' || formData.maritalStatus === 'geschieden') && !!formData.marriageCertificate },
            { doc: formData.divorceCertificate, handler: (doc: ScannedDocument) => updateField('divorceCertificate', doc), show: formData.maritalStatus === 'geschieden' && !!formData.divorceCertificate },
          ].map((item, index) => (
            item.show && item.doc ? <DocumentUpload key={item.doc.id || index} document={item.doc} onChange={item.handler} /> : null
          ))}
          {(otherDocuments as ScannedDocument[]).map(doc => <DocumentUpload key={doc.id} document={doc} onChange={updateOtherDocument} onRemove={() => removeOtherDocument(doc.id)} isCustom />)}
        </div>

        <button onClick={addOtherDocument} className="mt-6 w-full py-3 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl text-indigo-600 dark:text-indigo-400 font-medium flex items-center justify-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer"><Plus size={20} /> {t('wizardSteps.step6.addDoc')}</button>
        
        <div className="pt-10 mt-10 border-t border-slate-100 dark:border-slate-800">
          <h3 className="text-lg font-medium text-slate-800 dark:text-slate-200 mb-4 border-b border-slate-100 dark:border-slate-800 pb-2">{t('wizardSteps.step6.certsTitle')}</h3>
          <div className="space-y-6">
            {certificates.map((cert) => (
              <div key={cert.id} className="p-4 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 relative shadow-sm">
                <button onClick={() => removeCertificate(cert.id)} className="absolute top-4 right-4 text-slate-300 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 hover:text-red-500 dark:hover:text-red-400 cursor-pointer"><Trash2 size={20} /></button>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2 mb-4">
                  <Input label={t('wizardSteps.step6.school')} value={cert.school} onChange={(e) => updateCertificate(cert.id, 'school', e.target.value)} className="p-2.5" />
                  <Input label={t('wizardSteps.step6.degree')} value={cert.degree} onChange={(e) => updateCertificate(cert.id, 'degree', e.target.value)} className="p-2.5" />
                  <Input label={t('wizardSteps.step6.year')} value={cert.year} onChange={(e) => updateCertificate(cert.id, 'year', e.target.value)} className="p-2.5" />
                </div>
                <DocumentUpload document={cert.document} onChange={(doc) => updateCertificate(cert.id, 'document', doc)} />
              </div>
            ))}
            <button onClick={addCertificate} className="w-full py-3 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl text-indigo-600 dark:text-indigo-400 font-medium flex items-center justify-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer"><Plus size={20} /> {t('wizardSteps.step6.addCert')}</button>
          </div>
        </div>
        <div className="pt-6 border-t border-slate-100 dark:border-slate-800 mt-6">
          <Textarea label={t('wizardSteps.step6.notesLabel')} description={t('wizardSteps.step6.notesDesc')} value={formData.documentNotes || ''} onChange={(e) => updateField('documentNotes', e.target.value)} />
        </div>
      </div>
    </div>
  );
}

export function Step7Vollmachten() {
  const { t } = useTranslation();
  const { formData, setFormData, updateField } = useFormContext();
  const { items: customPowersOfAttorney, addItem: addCustomPoa, removeItem: removeCustomPoa } = useArrayField('customPowersOfAttorney', { name: '', documentAction: 'upload', fileData: null, fileType: null });
  const updateCustomPoa = (doc: ScannedDocument) => setFormData(prev => ({ ...prev, customPowersOfAttorney: (prev.customPowersOfAttorney || []).map(d => d.id === doc.id ? doc : d) }));

  return (
    <div className="animate-in fade-in zoom-in-95 duration-500">
      <div className="mb-8">
        <h2 className="text-3xl font-serif text-slate-900 dark:text-slate-100 mb-3">{t('wizardSteps.step7.title')}</h2>
        <p className="text-slate-600 dark:text-slate-400 dark:text-slate-500 flex items-center gap-2">
          <Info size={18} className="text-indigo-600 dark:text-indigo-400" />
          {t('wizardSteps.step7.desc')}
        </p>
      </div>
      <div className="bg-rose-50 dark:bg-rose-900/20 border border-red-200 dark:border-red-900/50 rounded-xl p-4 mb-8 flex flex-col gap-2 text-red-800 dark:text-red-300">
        <div className="flex items-start gap-3">
          <AlertCircle className="shrink-0 mt-0.5" size={20} />
          <div className="text-sm">
            <strong className="font-semibold block mb-1">{t('wizardSteps.step7.importantTitle1')}</strong>
            {t('wizardSteps.step7.importantDesc1')}
          </div>
        </div>
        <div className="flex items-start gap-3 mt-2 pt-2 border-t border-red-200 dark:border-red-900/50/50 dark:border-red-900/50">
          <Info className="shrink-0 mt-0.5" size={20} />
          <div className="text-sm">
            <strong className="font-semibold block mb-1">{t('wizardSteps.step7.importantTitle2')}</strong>
            {t('wizardSteps.step7.importantDesc2')}
          </div>
        </div>
      </div>
      <div className="space-y-10">
        <section>
          <h3 className="text-lg font-medium text-slate-800 dark:text-slate-200 mb-4 border-b border-slate-100 dark:border-slate-800 pb-2">{t('wizardSteps.step7.willTitle')}</h3>
          <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-900/50 rounded-xl p-4 mb-6 flex items-start gap-3 text-indigo-900 dark:text-indigo-200">
            <Info className="shrink-0 mt-0.5 text-indigo-600 dark:text-indigo-400" size={20} />
            <div className="text-sm">
              <strong className="font-semibold block mb-1 text-indigo-800 dark:text-indigo-300">{t('wizardSteps.step7.willHintTitle')}</strong>
              {t('wizardSteps.step7.willHintDesc')}<br/>
              {t('wizardSteps.step7.willHintLinkDesc')} <a href="https://www.muster-generator.de/testament" target="_blank" rel="noopener noreferrer" className="text-indigo-600 dark:text-indigo-400 underline hover:text-indigo-800 dark:hover:text-indigo-200">www.muster-generator.de/testament</a>
            </div>
          </div>
          <Input label={t('wizardSteps.step7.willLocLabel')} value={formData.testamentLocation} onChange={(e) => updateField('testamentLocation', e.target.value)} placeholder={t('wizardSteps.step7.willLocPlaceholder')} />
          {formData.testamentDocument && <div className="mt-4"><DocumentUpload document={formData.testamentDocument} onChange={(doc) => updateField('testamentDocument', doc)} /></div>}
        </section>
        <section>
          <h3 className="text-lg font-medium text-slate-800 dark:text-slate-200 mb-4 border-b border-slate-100 dark:border-slate-800 pb-2">{t('wizardSteps.step7.poaTitle')}</h3>
          <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-900/50 rounded-xl p-4 mb-4 flex items-start gap-3 text-indigo-900 dark:text-indigo-200">
            <Info className="shrink-0 mt-0.5 text-indigo-600 dark:text-indigo-400" size={20} />
            <div className="text-sm">
              <strong className="font-semibold block mb-1 text-indigo-800 dark:text-indigo-300">{t('wizardSteps.step7.poaDownloadHintTitle')}</strong>
              {t('wizardSteps.step7.poaDownloadHintDesc')}<br/>
              <a href="https://www.bmjv.de/DE/service/formulare/form_vorsorgevollmacht/form_vorsorgevollmacht_artikel.html?nn=17628" target="_blank" rel="noopener noreferrer" className="text-indigo-600 dark:text-indigo-400 underline hover:text-indigo-800 dark:hover:text-indigo-200 break-all">https://www.bmjv.de/DE/service/formulare/form_vorsorgevollmacht/form_vorsorgevollmacht_artikel.html?nn=17628</a>
            </div>
          </div>
          <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-900/50 rounded-xl p-4 mb-4 flex items-start gap-3 text-indigo-900 dark:text-indigo-200">
            <Info className="shrink-0 mt-0.5 text-indigo-600 dark:text-indigo-400" size={20} />
            <div className="text-sm">
              <strong className="font-semibold block mb-1 text-indigo-800 dark:text-indigo-300">{t('wizardSteps.step7.poaPatientHintTitle')}</strong>
              {t('wizardSteps.step7.poaPatientHintDesc')}<br/>
              <a href="https://www.verbraucherzentrale.de/patientenverfuegung-online" target="_blank" rel="noopener noreferrer" className="text-indigo-600 dark:text-indigo-400 underline hover:text-indigo-800 dark:hover:text-indigo-200 break-all">https://www.verbraucherzentrale.de/patientenverfuegung-online</a>
            </div>
          </div>
          <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-900/50 rounded-xl p-4 mb-6 flex items-start gap-3 text-indigo-900 dark:text-indigo-200">
            <Info className="shrink-0 mt-0.5 text-indigo-600 dark:text-indigo-400" size={20} />
            <div className="text-sm">
              <strong className="font-semibold block mb-1 text-indigo-800 dark:text-indigo-300">{t('wizardSteps.step7.poaFuneralHintTitle')}</strong>
              {t('wizardSteps.step7.poaFuneralHintDesc')}<br/>
              <a href="https://www.friedhofsverband-sauerland.de/info-center.html" target="_blank" rel="noopener noreferrer" className="text-indigo-600 dark:text-indigo-400 underline hover:text-indigo-800 dark:hover:text-indigo-200 break-all">https://www.friedhofsverband-sauerland.de/info-center.html</a>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <DocumentUpload document={formData.patientenverfuegung || { id: 'patverf', name: t('wizardSteps.step7.docPatientenverfuegung'), documentAction: 'placeholder', fileData: null, fileType: null }} onChange={(doc) => updateField('patientenverfuegung', doc)} />
            <DocumentUpload document={formData.vorsorgevollmacht || { id: 'vorsorge', name: t('wizardSteps.step7.docVorsorgevollmacht'), documentAction: 'placeholder', fileData: null, fileType: null }} onChange={(doc) => updateField('vorsorgevollmacht', doc)} />
            <DocumentUpload document={formData.betreuungsverfuegung || { id: 'betreuung', name: t('wizardSteps.step7.docBetreuungsverfuegung'), documentAction: 'placeholder', fileData: null, fileType: null }} onChange={(doc) => updateField('betreuungsverfuegung', doc)} />
            <DocumentUpload document={formData.bestattungsverfuegung || { id: 'bestattung', name: t('wizardSteps.step7.docBestattungsverfuegung'), documentAction: 'placeholder', fileData: null, fileType: null }} onChange={(doc) => updateField('bestattungsverfuegung', doc)} />
          </div>
        </section>
        <section>
          <h3 className="text-lg font-medium text-slate-800 dark:text-slate-200 mb-4 border-b border-slate-100 dark:border-slate-800 pb-2">{t('wizardSteps.step7.otherPoaTitle')}</h3>
          <div className="space-y-4">
            {(customPowersOfAttorney as ScannedDocument[]).map((doc) => <DocumentUpload key={doc.id} document={doc} onChange={updateCustomPoa} onRemove={() => removeCustomPoa(doc.id)} isCustom />)}
            <button onClick={addCustomPoa} className="w-full py-3 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl text-indigo-600 dark:text-indigo-400 font-medium flex items-center justify-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer"><Plus size={20} /> {t('wizardSteps.step7.addOtherPoa')}</button>
          </div>
        </section>
        <div className="pt-6 border-t border-slate-100 dark:border-slate-800 mt-6">
          <Textarea label={t('wizardSteps.step7.notesLabel')} description={t('wizardSteps.step7.notesDesc')} value={formData.poaNotes || ''} onChange={(e) => updateField('poaNotes', e.target.value)} />
        </div>
      </div>
    </div>
  );
}

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
              <button onClick={() => removeKey(key.id)} className="absolute top-4 right-4 text-slate-300 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 hover:text-red-500 dark:hover:text-red-400 cursor-pointer"><Trash2 size={20} /></button>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                <Input label={t('wizardSteps.step8.keyName')} value={key.name} onChange={(e) => updateKey(key.id, 'name', e.target.value)} className="p-2.5" />
                <Input label={t('wizardSteps.step8.keyPurpose')} value={key.purpose} onChange={(e) => updateKey(key.id, 'purpose', e.target.value)} className="p-2.5" />
                <Input label={t('wizardSteps.step8.keyLocation')} value={key.location} onChange={(e) => updateKey(key.id, 'location', e.target.value)} className="p-2.5" />
              </div>
            </div>
          ))}
          <button onClick={addKey} className="w-full py-3 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl text-indigo-600 dark:text-indigo-400 font-medium flex items-center justify-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer"><Plus size={20} /> {t('wizardSteps.step8.addKey')}</button>
        </div>
        <div className="pt-6 border-t border-slate-100 dark:border-slate-800 mt-6">
          <Textarea label={t('wizardSteps.step8.notesLabel')} description={t('wizardSteps.step8.notesDesc')} value={formData.generalNotes || ''} onChange={(e) => updateField('generalNotes', e.target.value)} />
        </div>
      </div>
    </div>
  );
}

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
            <button onClick={() => removeChapter(chapter.id)} className="absolute top-4 right-4 text-slate-300 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 hover:text-red-500 dark:hover:text-red-400 cursor-pointer"><Trash2 size={20} /></button>
            <div className="mb-4 pr-8"><Input label={t('wizardSteps.step9.chapterTitle')} value={chapter.title} onChange={(e) => updateChapter(chapter.id, 'title', e.target.value)} className="p-2.5 font-medium" /></div>
            <Textarea label={t('wizardSteps.step9.notesLabel')} value={chapter.content} onChange={(e) => updateChapter(chapter.id, 'content', e.target.value)} />
          </div>
        ))}
        <button onClick={addChapter} className="w-full py-3 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl text-indigo-600 dark:text-indigo-400 font-medium flex items-center justify-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer"><Plus size={20} /> {t('wizardSteps.step9.addChapter')}</button>
      </div>
    </div>
  );
}

export function Step10Abschluss() {
  const { t } = useTranslation();
  const { formData, downloadBackup, isDownloading } = useFormContext();
  const [pdfPreviewUrl, setPdfPreviewUrl] = useState<string | null>(null);
  const [pdfTemplate, setPdfTemplate] = useState('rot');
  const [includePlaceholders, setIncludePlaceholders] = useState(true);
  const [includeWarnings, setIncludeWarnings] = useState(true);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleGeneratePreview = useCallback(async () => {
    try {
      const { generatePDFAsync } = await import('../utils/pdfWorkerWrapper');
      const blob = await generatePDFAsync(formData, pdfTemplate, includePlaceholders, includeWarnings);
      const url = URL.createObjectURL(blob);
      setPdfPreviewUrl(prevUrl => {
        if (prevUrl) URL.revokeObjectURL(prevUrl);
        return url;
      });
    } catch (error) {
      console.error('Error generating PDF preview:', error);
    }
  }, [formData, pdfTemplate, includePlaceholders, includeWarnings]);

  useEffect(() => {
    handleGeneratePreview();
  }, [handleGeneratePreview]);

  const handleDownload = async () => {
    setDownloadSuccess(false);
    const success = await downloadBackup(pdfTemplate, includePlaceholders, includeWarnings);
    if (success) {
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    }
  };

  return (
    <div className="animate-in fade-in zoom-in-95 duration-500 flex-1 flex flex-col min-h-[600px]">
      <div className="mb-8 flex flex-col md:flex-row md:justify-between md:items-end gap-6">
        <div>
          <h2 className="text-3xl font-serif text-slate-900 dark:text-slate-100 mb-3">{t('wizardSteps.step10.title')}</h2>
          <p className="text-slate-600 dark:text-slate-400 dark:text-slate-500 flex items-center gap-2"><ShieldCheck size={18} className="text-indigo-600 dark:text-indigo-400" /> {t('wizardSteps.step10.desc')}</p>
        </div>
        <div className="w-full md:w-auto flex flex-col gap-3">
          <Select label={t('wizardSteps.step10.templateLabel')} value={pdfTemplate} onChange={(e) => setPdfTemplate(e.target.value)} options={[{ value: 'default', label: t('wizardSteps.step10.templateDefault') }, { value: 'rot', label: t('wizardSteps.step10.templateClassic') }, { value: 'modern', label: t('wizardSteps.step10.templateModern') }]} className="md:w-64 bg-white dark:bg-slate-800" />
          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-2 cursor-pointer text-sm text-slate-700 dark:text-slate-300 dark:text-slate-500">
              <input type="checkbox" checked={includePlaceholders} onChange={(e) => setIncludePlaceholders(e.target.checked)} className="w-4 h-4 rounded border-slate-300 dark:border-slate-600 text-indigo-600 dark:text-indigo-500 focus:ring-indigo-600 dark:focus:ring-indigo-500 dark:bg-slate-800" />
              {t('wizardSteps.step10.includePlaceholders')}
            </label>
            <label className="flex items-center gap-2 cursor-pointer text-sm text-slate-700 dark:text-slate-300 dark:text-slate-500">
              <input type="checkbox" checked={includeWarnings} onChange={(e) => setIncludeWarnings(e.target.checked)} className="w-4 h-4 rounded border-slate-300 dark:border-slate-600 text-indigo-600 dark:text-indigo-500 focus:ring-indigo-600 dark:focus:ring-indigo-500 dark:bg-slate-800" />
              {t('wizardSteps.step10.includeWarnings')}
            </label>
          </div>
        </div>
        <button onClick={handleDownload} disabled={isDownloading || downloadSuccess} className={`w-full md:w-auto text-white px-8 py-3 rounded-xl font-semibold transition-all shadow-lg flex items-center justify-center gap-3 ${isDownloading ? 'bg-indigo-400 cursor-not-allowed' : downloadSuccess ? 'bg-emerald-500 hover:bg-emerald-600 cursor-default' : 'bg-indigo-600 hover:bg-indigo-700 cursor-pointer'}`}>
          {isDownloading ? (
            <><Loader2 size={20} className="animate-spin" /> {t('wizardSteps.step10.downloading')}</>
          ) : downloadSuccess ? (
            <><CheckCircle size={20} /> {t('wizardSteps.step10.downloadSuccess')}</>
          ) : (
            <><Download size={20} /> {t('wizardSteps.step10.downloadBtn')}</>
          )}
        </button>
      </div>

      <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-900/50 rounded-xl p-4 mb-8 flex items-start gap-3 text-indigo-900 dark:text-indigo-200">
        <Info className="shrink-0 mt-0.5 text-indigo-600 dark:text-indigo-400" size={20} />
        <div className="text-sm leading-relaxed">
          <strong className="font-semibold block mb-1 text-indigo-800 dark:text-indigo-300">{t('wizardSteps.step10.backupTitle')}</strong>
          {t('wizardSteps.step10.backupDesc')} <strong className="font-semibold">Notfallakte_Backup.json</strong>. {t('wizardSteps.step10.backupDesc2')}
        </div>
      </div>

      <div className="flex-1 bg-slate-100 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden flex items-center justify-center relative shadow-inner min-h-[800px] lg:min-h-[1000px]">
        {pdfPreviewUrl ? (
          <iframe src={pdfPreviewUrl} className="w-full h-full absolute inset-0" title={t('wizardSteps.step10.previewTitle')} />
        ) : (
          <div className="text-slate-500 dark:text-slate-400 dark:text-slate-500 flex flex-col items-center p-10 text-center">
             <div className="w-10 h-10 border-4 border-slate-200 dark:border-slate-700 border-t-indigo-600 dark:border-t-indigo-500 rounded-full animate-spin mb-4" />
             <p className="font-medium text-lg">{t('wizardSteps.step10.previewGenerating')}</p>
             <p className="text-sm mt-2 opacity-75">{t('wizardSteps.step10.previewWait')}</p>
          </div>
        )}
      </div>
    </div>
  );
}
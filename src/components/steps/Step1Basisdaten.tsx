import { useFormContext, useFieldArray } from 'react-hook-form';
import { Input } from '../../Input';
import { Select } from '../../Select';
import { Info, Trash2, Plus, Minus } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { FormSchemaType } from '../../schema';

export function Step1Basisdaten() {
  const { register, control, watch, setValue, formState: { errors } } = useFormContext<FormSchemaType>();
  const { t } = useTranslation();

  const { fields: childrenFields, append: appendChild, remove: removeChild } = useFieldArray({ control, name: 'children' });
  const { fields: contactsFields, append: appendContact, remove: removeContact } = useFieldArray({ control, name: 'contacts' });
  const { fields: dnnFields, append: appendDnn, remove: removeDnn } = useFieldArray({ control, name: 'doNotNotifyContacts' });
  const { fields: empContactsFields, append: appendEmpContact, remove: removeEmpContact } = useFieldArray({ control, name: 'employment.emergencyContacts' });

  const childrenCountStr = watch('childrenCount') || '0';
  const maritalStatus = watch('maritalStatus');
  const employmentStatus = watch('employment.status');

  const handleChildrenCountChange = (newCount: number) => {
    const count = Math.max(0, newCount);
    setValue('childrenCount', String(count), { shouldValidate: true });
    const currentLength = childrenFields.length;
    if (count > currentLength) {
      for (let i = currentLength; i < count; i++) {
        appendChild({ id: crypto.randomUUID(), firstName: '', middleName: '', lastName: '', birthDate: '', birthPlace: '', phone: '' });
      }
    } else if (count < currentLength) {
      for (let i = currentLength - 1; i >= count; i--) {
        removeChild(i);
      }
    }
  };

  return (
    <div className="animate-in fade-in zoom-in-95 duration-500">
      <div className="mb-8">
        <h2 className="text-3xl font-serif text-slate-900 dark:text-slate-100 mb-3">{t('wizardSteps.step1.title')}</h2>
        <p className="text-slate-600 dark:text-slate-400 flex items-center gap-2"><Info size={18} className="text-indigo-600 dark:text-indigo-400" /> {t('wizardSteps.step1.desc')}</p>
      </div>
      <div className="space-y-8">
        <div className="grid grid-cols-1 gap-6">
          <Input label={t('wizardSteps.step1.docTitle')} {...register('documentTitle')} placeholder={t('wizardSteps.step1.docTitlePlaceholder')} error={errors.documentTitle?.message} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-[auto_1fr_1fr_1fr] gap-6">
          <Select label={t('wizardSteps.step1.salutation')} {...register('salutation')} options={[{ value: 'Herr', label: t('wizardSteps.step1.salutationMr') }, { value: 'Frau', label: t('wizardSteps.step1.salutationMrs') }, { value: 'Divers', label: t('wizardSteps.step1.salutationDiv') }]} error={errors.salutation?.message} />
          <Input label={t('wizardSteps.step1.firstName')} {...register('firstName')} error={errors.firstName?.message} placeholder="Max" />
          <Input label={t('wizardSteps.step1.middleName')} {...register('middleName')} error={errors.middleName?.message} />
          <Input label={t('wizardSteps.step1.lastName')} {...register('lastName')} error={errors.lastName?.message} placeholder="Mustermann" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Input label={t('wizardSteps.step1.birthDate')} type="date" {...register('birthDate')} error={errors.birthDate?.message} />
          <Input label={t('wizardSteps.step1.birthPlace')} {...register('birthPlace')} error={errors.birthPlace?.message} />
          <Input label={t('wizardSteps.step1.birthCountry')} {...register('birthCountry')} error={errors.birthCountry?.message} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input label={t('wizardSteps.step1.taxId')} {...register('taxId')} placeholder={t('wizardSteps.step1.taxIdPlaceholder')} error={errors.taxId?.message} />
          <Input label={t('wizardSteps.step1.ssn')} {...register('socialSecurityNumber')} error={errors.socialSecurityNumber?.message} />
        </div>
        
        <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
          <h3 className="text-lg font-medium text-slate-800 dark:text-slate-200 mb-4">{t('wizardSteps.step1.addressTitle')}</h3>
          <div className="grid grid-cols-4 gap-6 mb-6">
            <div className="col-span-4 md:col-span-3"><Input label={t('wizardSteps.step1.street')} {...register('street')} error={errors.street?.message} /></div>
            <div className="col-span-4 md:col-span-1"><Input label={t('wizardSteps.step1.houseNumber')} {...register('houseNumber')} error={errors.houseNumber?.message} /></div>
          </div>
          <div className="grid grid-cols-4 gap-6">
            <div className="col-span-4 md:col-span-1"><Input label={t('wizardSteps.step1.zipCode')} {...register('zipCode')} error={errors.zipCode?.message} /></div>
            <div className="col-span-4 md:col-span-3"><Input label={t('wizardSteps.step1.city')} {...register('city')} error={errors.city?.message} /></div>
          </div>
        </div>
        
        <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
          <h3 className="text-lg font-medium text-slate-800 dark:text-slate-200 mb-4">{t('wizardSteps.step1.maritalStatusTitle')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Select label={t('wizardSteps.step1.status')} {...register('maritalStatus')} options={[{ value: 'ledig', label: t('wizardSteps.step1.statusSingle') }, { value: 'verheiratet', label: t('wizardSteps.step1.statusMarried') }, { value: 'geschieden', label: t('wizardSteps.step1.statusDivorced') }]} error={errors.maritalStatus?.message} />
            {maritalStatus !== 'ledig' && <Input label={t('wizardSteps.step1.marriageDate')} type="date" {...register('marriageDate')} error={errors.marriageDate?.message} />}
            {maritalStatus === 'geschieden' && <Input label={t('wizardSteps.step1.divorceDate')} type="date" {...register('divorceDate')} error={errors.divorceDate?.message} />}
            
            <div className={maritalStatus === 'geschieden' ? 'md:col-span-2' : ''}>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{t('wizardSteps.step1.childrenCount')}</label>
              <div className="flex items-center gap-2">
                <button type="button" onClick={() => handleChildrenCountChange(parseInt(childrenCountStr, 10) - 1)} className="w-10 h-10 rounded-lg border border-slate-200 dark:border-slate-600 flex items-center justify-center bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 transition-colors shadow-sm"><Minus size={18} /></button>
                <div className="w-16 h-10 rounded-lg border border-slate-200 dark:border-slate-600 flex items-center justify-center bg-slate-50 dark:bg-slate-900 font-medium text-slate-800 dark:text-slate-200 shadow-inner">{childrenCountStr}</div>
                <button type="button" onClick={() => handleChildrenCountChange((parseInt(childrenCountStr, 10) || 0) + 1)} className="w-10 h-10 rounded-lg border border-slate-200 dark:border-slate-600 flex items-center justify-center bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 transition-colors shadow-sm"><Plus size={18} /></button>
              </div>
              {errors.childrenCount && <p className="text-red-500 dark:text-red-400 text-xs mt-1.5">{errors.childrenCount.message}</p>}
            </div>
          </div>
          
          {childrenFields.length > 0 && (
            <div className="mt-6 space-y-4">
              {childrenFields.map((field, index) => (
                <div key={field.id} className="p-4 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800/50 shadow-sm">
                  <h4 className="font-medium text-slate-800 dark:text-slate-200 mb-3 border-b border-slate-200 dark:border-slate-700 pb-2">{t('wizardSteps.step1.child')} {index + 1}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <Input label={t('wizardSteps.step1.firstName')} {...register(`children.${index}.firstName`)} error={errors.children?.[index]?.firstName?.message} className="p-2.5 bg-white dark:bg-slate-800" />
                    <Input label={t('wizardSteps.step1.middleName')} {...register(`children.${index}.middleName`)} error={errors.children?.[index]?.middleName?.message} className="p-2.5 bg-white dark:bg-slate-800" />
                    <Input label={t('wizardSteps.step1.lastName')} {...register(`children.${index}.lastName`)} error={errors.children?.[index]?.lastName?.message} className="p-2.5 bg-white dark:bg-slate-800" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Input label={t('wizardSteps.step1.birthDate')} type="date" {...register(`children.${index}.birthDate`)} error={errors.children?.[index]?.birthDate?.message} className="p-2.5 bg-white dark:bg-slate-800" />
                    <Input label={t('wizardSteps.step1.birthPlace')} {...register(`children.${index}.birthPlace`)} error={errors.children?.[index]?.birthPlace?.message} className="p-2.5 bg-white dark:bg-slate-800" />
                    <Input label={t('wizardSteps.step1.phone')} {...register(`children.${index}.phone`)} error={errors.children?.[index]?.phone?.message} className="p-2.5 bg-white dark:bg-slate-800" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
          <h3 className="text-lg font-medium text-slate-800 dark:text-slate-200 mb-4">{t('wizardSteps.step1.employmentTitle')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Select
              label={t('wizardSteps.step1.employmentStatus')}
              {...register('employment.status')}
              options={[
                { value: '', label: t('common.select') },
                { value: 'Angestellter', label: t('wizardSteps.step1.statusEmployee') },
                { value: 'Selbstständiger', label: t('wizardSteps.step1.statusSelfEmployed') }
              ]}
              error={errors.employment?.status?.message}
            />
            {employmentStatus && (
              <>
                <Input label={t('wizardSteps.step1.position')} {...register('employment.position')} error={errors.employment?.position?.message} />
                <Input label={t('wizardSteps.step1.employeeId')} {...register('employment.employeeId')} error={errors.employment?.employeeId?.message} />
                <Input label={t('wizardSteps.step1.workEmail')} type="email" {...register('employment.workEmail')} error={errors.employment?.workEmail?.message} />
              </>
            )}
          </div>
          {employmentStatus && (
            <>
              <div className="grid grid-cols-4 gap-6 mb-6">
                <div className="col-span-4"><Input label={t('wizardSteps.step1.employerName')} {...register('employment.companyName')} error={errors.employment?.companyName?.message} /></div>
                <div className="col-span-4"><Input label={t('wizardSteps.step1.employerAddress')} {...register('employment.street')} placeholder={`${t('wizardSteps.step1.street')} & ${t('wizardSteps.step1.houseNumber')}`} error={errors.employment?.street?.message} /></div>
                <div className="col-span-4 md:col-span-1"><Input label={t('wizardSteps.step1.zipCode')} {...register('employment.zipCode')} error={errors.employment?.zipCode?.message} /></div>
                <div className="col-span-4 md:col-span-3"><Input label={t('wizardSteps.step1.city')} {...register('employment.city')} error={errors.employment?.city?.message} /></div>
              </div>

              <div className="mb-6">
                <h4 className="font-medium text-slate-800 dark:text-slate-200 mb-3">{t('wizardSteps.step1.emergencyContactTitle')}</h4>
                <div className="space-y-4">
                  {empContactsFields.map((contact, index) => (
                    <div key={contact.id} className="p-4 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800/50 relative group shadow-sm">
                      <button type="button" onClick={() => removeEmpContact(index)} className="absolute top-4 right-4 text-slate-300 dark:text-slate-400 hover:text-red-500 dark:hover:text-red-400"><Trash2 size={20} /></button>
                      <h5 className="font-medium text-slate-800 dark:text-slate-200 mb-3">{t('wizardSteps.step1.contact')} {index + 1}</h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input label={t('wizardSteps.step1.contactRelation')} {...register(`employment.emergencyContacts.${index}.type`)} error={errors.employment?.emergencyContacts?.[index]?.type?.message} className="p-2.5 bg-white dark:bg-slate-800" />
                        <Input label={t('wizardSteps.step1.contactName')} {...register(`employment.emergencyContacts.${index}.name`)} error={errors.employment?.emergencyContacts?.[index]?.name?.message} className="p-2.5 bg-white dark:bg-slate-800" />
                        <Input label={t('wizardSteps.step1.contactPhone')} {...register(`employment.emergencyContacts.${index}.phone`)} error={errors.employment?.emergencyContacts?.[index]?.phone?.message} className="p-2.5 bg-white dark:bg-slate-800" />
                        <Input label={t('wizardSteps.step1.contactEmail')} type="email" {...register(`employment.emergencyContacts.${index}.email`)} error={errors.employment?.emergencyContacts?.[index]?.email?.message} className="p-2.5 bg-white dark:bg-slate-800" />
                      </div>
                    </div>
                  ))}
                  <button type="button" onClick={() => appendEmpContact({ id: crypto.randomUUID(), type: '', name: '', phone: '', email: '' })} className="w-full py-2 border border-dashed border-slate-300 dark:border-slate-600 rounded-lg text-indigo-600 dark:text-indigo-400 font-medium flex items-center justify-center gap-2 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors"><Plus size={18} /> {t('wizardSteps.step1.addEmergencyContact')}</button>
                </div>
              </div>
            </>
          )}
        </div>
        
        <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
          <h3 className="text-lg font-medium text-slate-800 dark:text-slate-200 mb-4">{t('wizardSteps.step1.contactsTitle')}</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">{t('wizardSteps.step1.contactsDesc')}</p>
          <div className="space-y-4">
            {contactsFields.map((contact, index) => (
              <div key={contact.id} className="p-4 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 relative group shadow-sm">
                <button type="button" onClick={() => removeContact(index)} className="absolute top-4 right-4 text-slate-300 dark:text-slate-400 hover:text-red-500 dark:hover:text-red-400"><Trash2 size={20} /></button>
                <h4 className="font-medium text-slate-800 dark:text-slate-200 mb-3">{t('wizardSteps.step1.contact')} {index + 1}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input label={t('wizardSteps.step1.contactRelation')} {...register(`contacts.${index}.type`)} placeholder={t('wizardSteps.step1.contactRelationPlaceholder')} error={errors.contacts?.[index]?.type?.message} className="p-2.5" />
                  <Input label={t('wizardSteps.step1.contactName')} {...register(`contacts.${index}.name`)} error={errors.contacts?.[index]?.name?.message} className="p-2.5" />
                  <Input label={t('wizardSteps.step1.contactPhone')} {...register(`contacts.${index}.phone`)} error={errors.contacts?.[index]?.phone?.message} className="p-2.5" />
                  <Input label={t('wizardSteps.step1.contactEmail')} type="email" {...register(`contacts.${index}.email`)} error={errors.contacts?.[index]?.email?.message} className="p-2.5" />
                </div>
              </div>
            ))}
            <button type="button" onClick={() => appendContact({ id: crypto.randomUUID(), type: t('wizardSteps.step1.contactDefaultType'), name: '', phone: '', email: '' })} className="w-full py-3 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl text-indigo-600 dark:text-indigo-400 font-medium flex items-center justify-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"><Plus size={20} /> {t('wizardSteps.step1.addContact')}</button>
          </div>
        </div>
        
        <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
          <h3 className="text-lg font-medium text-slate-800 dark:text-slate-200 mb-4">{t('wizardSteps.step1.doNotNotifyTitle')}</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">{t('wizardSteps.step1.doNotNotifyDesc')}</p>
          <div className="space-y-4">
            {dnnFields.map((contact, index) => (
              <div key={contact.id} className="p-4 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 relative group shadow-sm">
                <button type="button" onClick={() => removeDnn(index)} className="absolute top-4 right-4 text-slate-300 dark:text-slate-400 hover:text-red-500 dark:hover:text-red-400"><Trash2 size={20} /></button>
                <h4 className="font-medium text-slate-800 dark:text-slate-200 mb-3">{t('wizardSteps.step1.contact')} {index + 1}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input label={t('wizardSteps.step1.contactRelation')} {...register(`doNotNotifyContacts.${index}.type`)} placeholder={t('wizardSteps.step1.contactRelationPlaceholder')} error={errors.doNotNotifyContacts?.[index]?.type?.message} className="p-2.5" />
                  <Input label={t('wizardSteps.step1.contactName')} {...register(`doNotNotifyContacts.${index}.name`)} error={errors.doNotNotifyContacts?.[index]?.name?.message} className="p-2.5" />
                  <Input label={t('wizardSteps.step1.contactPhone')} {...register(`doNotNotifyContacts.${index}.phone`)} error={errors.doNotNotifyContacts?.[index]?.phone?.message} className="p-2.5" />
                  <Input label={t('wizardSteps.step1.contactEmail')} type="email" {...register(`doNotNotifyContacts.${index}.email`)} error={errors.doNotNotifyContacts?.[index]?.email?.message} className="p-2.5" />
                </div>
              </div>
            ))}
            <button type="button" onClick={() => appendDnn({ id: crypto.randomUUID(), type: '', name: '', phone: '', email: '' })} className="w-full py-3 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl text-indigo-600 dark:text-indigo-400 font-medium flex items-center justify-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"><Plus size={20} /> {t('wizardSteps.step1.addDoNotNotifyContact')}</button>
          </div>
        </div>
      </div>
    </div>
  );
}

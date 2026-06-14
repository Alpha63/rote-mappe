import { useFormContext } from '../../FormContext';
import { Input } from '../../Input';
import { Select } from '../../Select';
import { Info, Trash2, Plus, Minus } from 'lucide-react';
import { MaritalStatus, Salutation } from '../../types';
import { useArrayField } from '../../utils/useArrayField';
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

  const { items: doNotNotifyContacts, addItem: addDoNotNotifyContact, updateItem: updateDoNotNotifyContact, removeItem: removeDoNotNotifyContact } = useArrayField<'doNotNotifyContacts'>(
    'doNotNotifyContacts',
    { type: '', name: '', phone: '', email: '' }
  );

  const handleEmploymentChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      employment: {
        ...(prev.employment || { status: '', companyName: '', street: '', zipCode: '', city: '', position: '', employeeId: '', workEmail: '', emergencyContacts: [] } as any),
        [field]: value
      }
    }));
  };

  const addEmploymentEmergencyContact = () => {
    setFormData(prev => {
      const currentEmployment = prev.employment || { status: '', companyName: '', street: '', zipCode: '', city: '', position: '', employeeId: '', workEmail: '', emergencyContacts: [] } as any;
      return {
        ...prev,
        employment: {
          ...currentEmployment,
          emergencyContacts: [...(currentEmployment.emergencyContacts || []), { id: crypto.randomUUID(), type: '', name: '', phone: '', email: '' }]
        }
      };
    });
  };

  const updateEmploymentEmergencyContact = (id: string, field: string, value: string) => {
    setFormData(prev => {
      if (!prev.employment) return prev;
      return {
        ...prev,
        employment: {
          ...prev.employment,
          emergencyContacts: prev.employment.emergencyContacts.map(c => c.id === id ? { ...c, [field]: value } : c)
        }
      };
    });
  };

  const removeEmploymentEmergencyContact = (id: string) => {
    setFormData(prev => {
      if (!prev.employment) return prev;
      return {
        ...prev,
        employment: {
          ...prev.employment,
          emergencyContacts: prev.employment.emergencyContacts.filter(c => c.id !== id)
        }
      };
    });
  };

  return (
    <div className="animate-in fade-in zoom-in-95 duration-500">
      <div className="mb-8">
        <h2 className="text-3xl font-serif text-slate-900 dark:text-slate-100 mb-3">{t('wizardSteps.step1.title')}</h2>
        <p className="text-slate-600 dark:text-slate-400 flex items-center gap-2"><Info size={18} className="text-indigo-600 dark:text-indigo-400" /> {t('wizardSteps.step1.desc')}</p>
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
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{t('wizardSteps.step1.childrenCount')}</label>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleChildrenCountChange(String(Math.max(0, parseInt(formData.childrenCount || '0', 10) - 1)))}
                  className="w-10 h-10 rounded-lg border border-slate-200 dark:border-slate-600 flex items-center justify-center bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 transition-colors shadow-sm"
                >
                  <Minus size={18} />
                </button>
                <div className="w-16 h-10 rounded-lg border border-slate-200 dark:border-slate-600 flex items-center justify-center bg-slate-50 dark:bg-slate-900 font-medium text-slate-800 dark:text-slate-200 shadow-inner">
                  {formData.childrenCount || '0'}
                </div>
                <button
                  type="button"
                  onClick={() => handleChildrenCountChange(String((parseInt(formData.childrenCount || '0', 10) || 0) + 1))}
                  className="w-10 h-10 rounded-lg border border-slate-200 dark:border-slate-600 flex items-center justify-center bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 transition-colors shadow-sm"
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
          <h3 className="text-lg font-medium text-slate-800 dark:text-slate-200 mb-4">{t('wizardSteps.step1.employmentTitle')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Select
              label={t('wizardSteps.step1.employmentStatus')}
              value={formData.employment?.status || ''}
              onChange={(e) => handleEmploymentChange('status', e.target.value)}
              options={[
                { value: '', label: t('common.select') },
                { value: 'Angestellter', label: t('wizardSteps.step1.statusEmployee') },
                { value: 'Selbstständiger', label: t('wizardSteps.step1.statusSelfEmployed') }
              ]}
            />
            {formData.employment?.status && (
              <>
                <Input label={t('wizardSteps.step1.position')} value={formData.employment?.position || ''} onChange={(e) => handleEmploymentChange('position', e.target.value)} />
                <Input label={t('wizardSteps.step1.employeeId')} value={formData.employment?.employeeId || ''} onChange={(e) => handleEmploymentChange('employeeId', e.target.value)} />
                <Input label={t('wizardSteps.step1.workEmail')} type="email" value={formData.employment?.workEmail || ''} onChange={(e) => handleEmploymentChange('workEmail', e.target.value)} />
              </>
            )}
          </div>
          {formData.employment?.status && (
            <>
              <div className="grid grid-cols-4 gap-6 mb-6">
                <div className="col-span-4"><Input label={t('wizardSteps.step1.employerName')} value={formData.employment?.companyName || ''} onChange={(e) => handleEmploymentChange('companyName', e.target.value)} /></div>
                <div className="col-span-4"><Input label={t('wizardSteps.step1.employerAddress')} value={formData.employment?.street || ''} onChange={(e) => handleEmploymentChange('street', e.target.value)} placeholder={`${t('wizardSteps.step1.street')} & ${t('wizardSteps.step1.houseNumber')}`} /></div>
                <div className="col-span-4 md:col-span-1"><Input label={t('wizardSteps.step1.zipCode')} value={formData.employment?.zipCode || ''} onChange={(e) => handleEmploymentChange('zipCode', e.target.value)} /></div>
                <div className="col-span-4 md:col-span-3"><Input label={t('wizardSteps.step1.city')} value={formData.employment?.city || ''} onChange={(e) => handleEmploymentChange('city', e.target.value)} /></div>
              </div>

              <div className="mb-6">
                <h4 className="font-medium text-slate-800 dark:text-slate-200 mb-3">{t('wizardSteps.step1.emergencyContactTitle')}</h4>
                <div className="space-y-4">
                  {(formData.employment?.emergencyContacts || []).map((contact, index) => (
                    <div key={contact.id} className="p-4 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800/50 relative group shadow-sm">
                      <button onClick={() => removeEmploymentEmergencyContact(contact.id)} className="absolute top-4 right-4 text-slate-300 dark:text-slate-400 hover:text-red-500 dark:hover:text-red-400"><Trash2 size={20} /></button>
                      <h5 className="font-medium text-slate-800 dark:text-slate-200 mb-3">{t('wizardSteps.step1.contact')} {index + 1}</h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input label={t('wizardSteps.step1.contactRelation')} value={contact.type} onChange={(e) => updateEmploymentEmergencyContact(contact.id, 'type', e.target.value)} className="p-2.5 bg-white dark:bg-slate-800" />
                        <Input label={t('wizardSteps.step1.contactName')} value={contact.name} onChange={(e) => updateEmploymentEmergencyContact(contact.id, 'name', e.target.value)} className="p-2.5 bg-white dark:bg-slate-800" />
                        <Input label={t('wizardSteps.step1.contactPhone')} value={contact.phone} onChange={(e) => updateEmploymentEmergencyContact(contact.id, 'phone', e.target.value)} className="p-2.5 bg-white dark:bg-slate-800" />
                        <Input label={t('wizardSteps.step1.contactEmail')} type="email" value={contact.email} onChange={(e) => updateEmploymentEmergencyContact(contact.id, 'email', e.target.value)} className="p-2.5 bg-white dark:bg-slate-800" />
                      </div>
                    </div>
                  ))}
                  <button onClick={addEmploymentEmergencyContact} className="w-full py-2 border border-dashed border-slate-300 dark:border-slate-600 rounded-lg text-indigo-600 dark:text-indigo-400 font-medium flex items-center justify-center gap-2 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors"><Plus size={18} /> {t('wizardSteps.step1.addEmergencyContact')}</button>
                </div>
              </div>
            </>
          )}
        </div>
        <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
          <h3 className="text-lg font-medium text-slate-800 dark:text-slate-200 mb-4">{t('wizardSteps.step1.contactsTitle')}</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">{t('wizardSteps.step1.contactsDesc')}</p>
          <div className="space-y-4">
            {contacts.map((contact, index) => (
              <div key={contact.id} className="p-4 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 relative group shadow-sm">
                <button onClick={() => removeContact(contact.id)} className="absolute top-4 right-4 text-slate-300 dark:text-slate-400 hover:text-red-500 dark:hover:text-red-400"><Trash2 size={20} /></button>
                <h4 className="font-medium text-slate-800 dark:text-slate-200 mb-3">{t('wizardSteps.step1.contact')} {index + 1}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input label={t('wizardSteps.step1.contactRelation')} value={contact.type} onChange={(e) => updateContact(contact.id, 'type', e.target.value)} placeholder={t('wizardSteps.step1.contactRelationPlaceholder')} className="p-2.5" />
                  <Input label={t('wizardSteps.step1.contactName')} value={contact.name} onChange={(e) => updateContact(contact.id, 'name', e.target.value)} className="p-2.5" />
                  <Input label={t('wizardSteps.step1.contactPhone')} value={contact.phone} onChange={(e) => updateContact(contact.id, 'phone', e.target.value)} className="p-2.5" />
                  <Input label={t('wizardSteps.step1.contactEmail')} type="email" value={contact.email} onChange={(e) => updateContact(contact.id, 'email', e.target.value)} className="p-2.5" />
                </div>
              </div>
            ))}
            <button onClick={addContact} className="w-full py-3 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl text-indigo-600 dark:text-indigo-400 font-medium flex items-center justify-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"><Plus size={20} /> {t('wizardSteps.step1.addContact')}</button>
          </div>
        </div>
        <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
          <h3 className="text-lg font-medium text-slate-800 dark:text-slate-200 mb-4">{t('wizardSteps.step1.doNotNotifyTitle')}</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">{t('wizardSteps.step1.doNotNotifyDesc')}</p>
          <div className="space-y-4">
            {doNotNotifyContacts.map((contact, index) => (
              <div key={contact.id} className="p-4 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 relative group shadow-sm">
                <button onClick={() => removeDoNotNotifyContact(contact.id)} className="absolute top-4 right-4 text-slate-300 dark:text-slate-400 hover:text-red-500 dark:hover:text-red-400"><Trash2 size={20} /></button>
                <h4 className="font-medium text-slate-800 dark:text-slate-200 mb-3">{t('wizardSteps.step1.contact')} {index + 1}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input label={t('wizardSteps.step1.contactRelation')} value={contact.type} onChange={(e) => updateDoNotNotifyContact(contact.id, 'type', e.target.value)} placeholder={t('wizardSteps.step1.contactRelationPlaceholder')} className="p-2.5" />
                  <Input label={t('wizardSteps.step1.contactName')} value={contact.name} onChange={(e) => updateDoNotNotifyContact(contact.id, 'name', e.target.value)} className="p-2.5" />
                  <Input label={t('wizardSteps.step1.contactPhone')} value={contact.phone} onChange={(e) => updateDoNotNotifyContact(contact.id, 'phone', e.target.value)} className="p-2.5" />
                  <Input label={t('wizardSteps.step1.contactEmail')} type="email" value={contact.email} onChange={(e) => updateDoNotNotifyContact(contact.id, 'email', e.target.value)} className="p-2.5" />
                </div>
              </div>
            ))}
            <button onClick={addDoNotNotifyContact} className="w-full py-3 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl text-indigo-600 dark:text-indigo-400 font-medium flex items-center justify-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"><Plus size={20} /> {t('wizardSteps.step1.addDoNotNotifyContact')}</button>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useFormContext } from '../../FormContext';
import { Select } from '../../Select';
import { Textarea } from '../../Textarea';
import { Input } from '../../Input';
import { DocumentUpload } from '../DocumentUpload';
import { Info, Plus, Trash2 } from 'lucide-react';
import { FormData } from '../../types';
import { useTranslation } from 'react-i18next';

export function Step2MedizinischeDaten() {
  const { formData, setFormData, updateField } = useFormContext();
  const { t } = useTranslation();
  const updateMedicalField = <K extends keyof FormData['medicalData']>(field: K, value: FormData['medicalData'][K]) => setFormData(prev => ({ ...prev, medicalData: { ...(prev.medicalData || {}), [field]: value } }));

  const addDoctor = () => {
    setFormData(prev => {
      const currentDoctors = prev.medicalData?.doctors || [];
      return {
        ...prev,
        medicalData: {
          ...prev.medicalData,
          doctors: [...currentDoctors, { id: crypto.randomUUID(), type: '', name: '', phone: '', website: '', address: '' }]
        }
      };
    });
  };

  const updateDoctor = (id: string, field: string, value: string) => {
    setFormData(prev => {
      const currentDoctors = prev.medicalData?.doctors || [];
      return {
        ...prev,
        medicalData: {
          ...prev.medicalData,
          doctors: currentDoctors.map(d => d.id === id ? { ...d, [field]: value } : d)
        }
      };
    });
  };

  const removeDoctor = (id: string) => {
    setFormData(prev => {
      const currentDoctors = prev.medicalData?.doctors || [];
      return {
        ...prev,
        medicalData: {
          ...prev.medicalData,
          doctors: currentDoctors.filter(d => d.id !== id)
        }
      };
    });
  };

  return (
    <div className="animate-in fade-in zoom-in-95 duration-500">
      <div className="mb-8">
        <h2 className="text-3xl font-serif text-slate-900 dark:text-slate-100 mb-3">{t('wizardSteps.step2.title')}</h2>
        <p className="text-slate-600 dark:text-slate-400 flex items-center gap-2"><Info size={18} className="text-indigo-600 dark:text-indigo-400" /> {t('wizardSteps.step2.desc')}</p>
      </div>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Select label={t('wizardSteps.step2.bloodType')} value={formData.medicalData?.bloodType} onChange={(e) => updateMedicalField('bloodType', e.target.value)} options={[{ value: 'A+', label: 'A+' }, { value: 'A-', label: 'A-' }, { value: 'B+', label: 'B+' }, { value: 'B-', label: 'B-' }, { value: 'AB+', label: 'AB+' }, { value: 'AB-', label: 'AB-' }, { value: '0+', label: '0+' }, { value: '0-', label: '0-' }]} />
          <Select label={t('wizardSteps.step2.organDonor')} value={formData.medicalData.organDonor === null ? '' : formData.medicalData.organDonor ? 'yes' : 'no'} onChange={(e) => updateMedicalField('organDonor', e.target.value === '' ? null : e.target.value === 'yes')} options={[{ value: 'yes', label: t('wizardSteps.step2.yes') }, { value: 'no', label: t('wizardSteps.step2.no') }]} />
          {formData.medicalData.organDonor === false && (
            <div className="md:col-span-2 mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/50 rounded-xl">
              <label className="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" checked={formData.medicalData.explicitOrganDonationContradiction} onChange={(e) => updateMedicalField('explicitOrganDonationContradiction', e.target.checked)} className="mt-1 w-5 h-5 text-red-600 dark:text-red-400 rounded border-red-300 dark:border-red-700 focus:ring-red-600 dark:focus:ring-red-400 dark:bg-slate-800" />
                <span className="text-sm text-red-800 dark:text-red-300"><strong className="block mb-1">{t('wizardSteps.step2.contradictionTitle')}</strong> {t('wizardSteps.step2.contradictionDesc')}</span>
              </label>
            </div>
          )}
        </div>
        {formData.medicalData.organDonor === true && formData.organDonorDocument && (
          <div className="mt-4"><h3 className="text-sm font-medium text-slate-800 dark:text-slate-200 mb-3 border-b border-slate-100 dark:border-slate-800 pb-2">{t('wizardSteps.step2.organDonorCopy')}</h3><DocumentUpload document={formData.organDonorDocument} onChange={(doc) => updateField('organDonorDocument', doc)} /></div>
        )}
        
        <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
          <h3 className="text-lg font-medium text-slate-800 dark:text-slate-200 mb-4">{t('wizardSteps.step2.doctorsTitle')}</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">{t('wizardSteps.step2.doctorsDesc')}</p>
          <div className="space-y-4">
            {(formData.medicalData?.doctors || []).map((doctor, index) => (
              <div key={doctor.id} className="p-4 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800/50 relative group shadow-sm">
                <button onClick={() => removeDoctor(doctor.id)} className="absolute top-4 right-4 text-slate-300 dark:text-slate-400 hover:text-red-500 dark:hover:text-red-400"><Trash2 size={20} /></button>
                <h4 className="font-medium text-slate-800 dark:text-slate-200 mb-3">{t('wizardSteps.step2.doctor')} {index + 1}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <Input label={t('wizardSteps.step2.doctorType')} value={doctor.type} onChange={(e) => updateDoctor(doctor.id, 'type', e.target.value)} placeholder={t('wizardSteps.step2.doctorTypePlaceholder')} className="p-2.5 bg-white dark:bg-slate-800" />
                  <Input label={t('wizardSteps.step2.doctorName')} value={doctor.name} onChange={(e) => updateDoctor(doctor.id, 'name', e.target.value)} className="p-2.5 bg-white dark:bg-slate-800" />
                  <Input label={t('wizardSteps.step2.doctorPhone')} value={doctor.phone} onChange={(e) => updateDoctor(doctor.id, 'phone', e.target.value)} className="p-2.5 bg-white dark:bg-slate-800" />
                  <Input label={t('wizardSteps.step2.doctorWebsite')} value={doctor.website} onChange={(e) => updateDoctor(doctor.id, 'website', e.target.value)} className="p-2.5 bg-white dark:bg-slate-800" />
                </div>
                <div className="grid grid-cols-1 gap-4">
                  <Input label={t('wizardSteps.step2.doctorAddress')} value={doctor.address} onChange={(e) => updateDoctor(doctor.id, 'address', e.target.value)} className="p-2.5 bg-white dark:bg-slate-800" />
                </div>
              </div>
            ))}
            <button onClick={addDoctor} className="w-full py-3 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl text-indigo-600 dark:text-indigo-400 font-medium flex items-center justify-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"><Plus size={20} /> {t('wizardSteps.step2.addDoctor')}</button>
          </div>
        </div>

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

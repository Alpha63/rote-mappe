import { useFormContext } from '../../FormContext';
import { Input } from '../../Input';
import { Textarea } from '../../Textarea';
import { DocumentUpload } from '../DocumentUpload';
import { Info, Trash2, Plus } from 'lucide-react';
import { ScannedDocument } from '../../types';
import { useArrayField } from '../../utils/useArrayField';
import { useTranslation } from 'react-i18next';

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
        <p className="text-slate-600 dark:text-slate-400 flex items-center gap-2"><Info size={18} className="text-indigo-600 dark:text-indigo-400" /> {t('wizardSteps.step6.desc')}</p>
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

        <button onClick={addOtherDocument} className="mt-6 w-full py-3 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl text-indigo-600 dark:text-indigo-400 font-medium flex items-center justify-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-800/50"><Plus size={20} /> {t('wizardSteps.step6.addDoc')}</button>

        <div className="pt-10 mt-10 border-t border-slate-100 dark:border-slate-800">
          <h3 className="text-lg font-medium text-slate-800 dark:text-slate-200 mb-4 border-b border-slate-100 dark:border-slate-800 pb-2">{t('wizardSteps.step6.certsTitle')}</h3>
          <div className="space-y-6">
            {certificates.map((cert) => (
              <div key={cert.id} className="p-4 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 relative shadow-sm">
                <button onClick={() => removeCertificate(cert.id)} className="absolute top-4 right-4 text-slate-300 dark:text-slate-400 hover:text-red-500 dark:hover:text-red-400"><Trash2 size={20} /></button>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2 mb-4">
                  <Input label={t('wizardSteps.step6.school')} value={cert.school} onChange={(e) => updateCertificate(cert.id, 'school', e.target.value)} className="p-2.5" />
                  <Input label={t('wizardSteps.step6.degree')} value={cert.degree} onChange={(e) => updateCertificate(cert.id, 'degree', e.target.value)} className="p-2.5" />
                  <Input label={t('wizardSteps.step6.year')} value={cert.year} onChange={(e) => updateCertificate(cert.id, 'year', e.target.value)} className="p-2.5" />
                </div>
                <DocumentUpload document={cert.document} onChange={(doc) => updateCertificate(cert.id, 'document', doc)} />
              </div>
            ))}
            <button onClick={addCertificate} className="w-full py-3 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl text-indigo-600 dark:text-indigo-400 font-medium flex items-center justify-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-800/50"><Plus size={20} /> {t('wizardSteps.step6.addCert')}</button>
          </div>
        </div>
        <div className="pt-6 border-t border-slate-100 dark:border-slate-800 mt-6">
          <Textarea label={t('wizardSteps.step6.notesLabel')} description={t('wizardSteps.step6.notesDesc')} value={formData.documentNotes || ''} onChange={(e) => updateField('documentNotes', e.target.value)} />
        </div>
      </div>
    </div>
  );
}

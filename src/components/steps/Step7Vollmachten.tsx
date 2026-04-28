import { useFormContext } from '../../FormContext';
import { Input } from '../../Input';
import { Textarea } from '../../Textarea';
import { DocumentUpload } from '../DocumentUpload';
import { Info, AlertCircle, Plus } from 'lucide-react';
import { ScannedDocument } from '../../types';
import { useArrayField } from '../../utils/useArrayField';
import { useTranslation } from 'react-i18next';

export function Step7Vollmachten() {
  const { t } = useTranslation();
  const { formData, setFormData, updateField } = useFormContext();
  const { items: customPowersOfAttorney, addItem: addCustomPoa, removeItem: removeCustomPoa } = useArrayField('customPowersOfAttorney', { name: '', documentAction: 'upload', fileData: null, fileType: null });
  const updateCustomPoa = (doc: ScannedDocument) => setFormData(prev => ({ ...prev, customPowersOfAttorney: (prev.customPowersOfAttorney || []).map(d => d.id === doc.id ? doc : d) }));

  return (
    <div className="animate-in fade-in zoom-in-95 duration-500">
      <div className="mb-8">
        <h2 className="text-3xl font-serif text-slate-900 dark:text-slate-100 mb-3">{t('wizardSteps.step7.title')}</h2>
        <p className="text-slate-600 dark:text-slate-400 flex items-center gap-2">
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
        <div className="flex items-start gap-3 mt-2 pt-2 border-t border-red-200 dark:border-red-900/50">
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
            <button onClick={addCustomPoa} className="w-full py-3 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl text-indigo-600 dark:text-indigo-400 font-medium flex items-center justify-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-800/50"><Plus size={20} /> {t('wizardSteps.step7.addOtherPoa')}</button>
          </div>
        </section>
        <div className="pt-6 border-t border-slate-100 dark:border-slate-800 mt-6">
          <Textarea label={t('wizardSteps.step7.notesLabel')} description={t('wizardSteps.step7.notesDesc')} value={formData.poaNotes || ''} onChange={(e) => updateField('poaNotes', e.target.value)} />
        </div>
      </div>
    </div>
  );
}

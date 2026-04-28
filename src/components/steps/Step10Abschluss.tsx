import { useState, useEffect, useCallback } from 'react';
import { useFormContext } from '../../FormContext';
import { Select } from '../../Select';
import { Info, ShieldCheck, Download, Loader2, CheckCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

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
      const { generatePDFAsync } = await import('../../utils/pdfWorkerWrapper');
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
    <div className="animate-in fade-in zoom-in-95 duration-500 flex-1 flex flex-col min-h-150">
      <div className="mb-8 flex flex-col md:flex-row md:justify-between md:items-end gap-6">
        <div>
          <h2 className="text-3xl font-serif text-slate-900 dark:text-slate-100 mb-3">{t('wizardSteps.step10.title')}</h2>
          <p className="text-slate-600 dark:text-slate-400 flex items-center gap-2"><ShieldCheck size={18} className="text-indigo-600 dark:text-indigo-400" /> {t('wizardSteps.step10.desc')}</p>
        </div>
        <div className="w-full md:w-auto flex flex-col gap-3">
          <Select label={t('wizardSteps.step10.templateLabel')} value={pdfTemplate} onChange={(e) => setPdfTemplate(e.target.value)} options={[{ value: 'default', label: t('wizardSteps.step10.templateDefault') }, { value: 'rot', label: t('wizardSteps.step10.templateClassic') }, { value: 'modern', label: t('wizardSteps.step10.templateModern') }]} className="md:w-64 bg-white dark:bg-slate-800" />
          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-2 cursor-pointer text-sm text-slate-700 dark:text-slate-300">
              <input type="checkbox" checked={includePlaceholders} onChange={(e) => setIncludePlaceholders(e.target.checked)} className="w-4 h-4 rounded border-slate-300 dark:border-slate-600 text-indigo-600 dark:text-indigo-400 focus:ring-indigo-600 dark:focus:ring-indigo-400 dark:bg-slate-800" />
              {t('wizardSteps.step10.includePlaceholders')}
            </label>
            <label className="flex items-center gap-2 cursor-pointer text-sm text-slate-700 dark:text-slate-300">
              <input type="checkbox" checked={includeWarnings} onChange={(e) => setIncludeWarnings(e.target.checked)} className="w-4 h-4 rounded border-slate-300 dark:border-slate-600 text-indigo-600 dark:text-indigo-400 focus:ring-indigo-600 dark:focus:ring-indigo-400 dark:bg-slate-800" />
              {t('wizardSteps.step10.includeWarnings')}
            </label>
          </div>
        </div>
        <button onClick={handleDownload} disabled={isDownloading || downloadSuccess} className={`w-full md:w-auto text-white px-8 py-3 rounded-xl font-semibold transition-all shadow-lg flex items-center justify-center gap-3 ${isDownloading ? 'bg-indigo-400 cursor-not-allowed' : downloadSuccess ? 'bg-emerald-500 hover:bg-emerald-600 cursor-default' : 'bg-indigo-600 hover:bg-indigo-700'}`}>
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

      <div className="flex-1 bg-slate-100 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden flex items-center justify-center relative shadow-inner min-h-200 lg:min-h-250">
        {pdfPreviewUrl ? (
          <iframe src={pdfPreviewUrl} className="w-full h-full absolute inset-0" title={t('wizardSteps.step10.previewTitle')} />
        ) : (
          <div className="text-slate-500 dark:text-slate-400 flex flex-col items-center p-10 text-center">
             <div className="w-10 h-10 border-4 border-slate-200 dark:border-slate-700 border-t-indigo-600 dark:border-t-indigo-500 rounded-full animate-spin mb-4" />
             <p className="font-medium text-lg">{t('wizardSteps.step10.previewGenerating')}</p>
             <p className="text-sm mt-2 opacity-75">{t('wizardSteps.step10.previewWait')}</p>
          </div>
        )}
      </div>
    </div>
  );
}

import { Upload, Trash2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { ScannedDocument } from '../types';

interface DocumentUploadProps {
  document: ScannedDocument;
  onChange: (doc: ScannedDocument) => void;
  onRemove?: () => void;
  isCustom?: boolean;
}

export function DocumentUpload({ document, onChange, onRemove, isCustom }: DocumentUploadProps) {
  const { t } = useTranslation();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      onChange({
        ...document,
        fileData: event.target?.result as string,
        fileType: file.type
      });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="p-5 border border-slate-300 dark:border-slate-700 rounded-2xl bg-white dark:bg-slate-800 shadow-md relative group">
      {onRemove && (
        <button
          onClick={onRemove}
          className="absolute top-4 right-4 text-slate-400 hover:text-red-600 dark:hover:text-red-500 transition-colors cursor-pointer"
          title={t('docUpload.remove')}
        >
          <Trash2 size={20} />
        </button>
      )}

      {isCustom ? (
        <input
          type="text"
          value={document.name}
          onChange={(e) => onChange({ ...document, name: e.target.value })}
          placeholder={t('docUpload.customNamePlaceholder')}
          className="font-semibold text-slate-900 dark:text-slate-100 mb-4 bg-transparent border-b-2 border-dashed border-slate-400 dark:border-slate-600 focus:border-indigo-600 dark:focus:border-indigo-500 outline-none px-1 py-0.5 w-3/4"
        />      ) : (
        <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-4">{document.name}</h4>
      )}

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-slate-800 dark:text-slate-200 mb-2.5">{t('docUpload.whatToDo')}</label>
          <div className="flex flex-col gap-2.5">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name={`upload-${document.id}`}
                checked={document.documentAction === 'upload'}
                onChange={() => onChange({ ...document, documentAction: 'upload' })}
                className="w-4 h-4 text-indigo-600 dark:text-indigo-500 focus:ring-indigo-600 dark:focus:ring-indigo-500 border-slate-400 dark:border-slate-500 dark:bg-slate-700"
              />
              <span className="text-sm font-medium text-slate-800 dark:text-slate-200">{t('docUpload.actionUpload')}</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name={`upload-${document.id}`}
                checked={document.documentAction === 'placeholder'}
                onChange={() => onChange({ ...document, documentAction: 'placeholder', fileData: null, fileType: null })}
                className="w-4 h-4 text-indigo-600 dark:text-indigo-500 focus:ring-indigo-600 dark:focus:ring-indigo-500 border-slate-400 dark:border-slate-500 dark:bg-slate-700"
              />
              <span className="text-sm font-medium text-slate-800 dark:text-slate-200">{t('docUpload.actionPlaceholder')}</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name={`upload-${document.id}`}
                checked={document.documentAction === 'skip'}
                onChange={() => onChange({ ...document, documentAction: 'skip', fileData: null, fileType: null })}
                className="w-4 h-4 text-indigo-600 dark:text-indigo-500 focus:ring-indigo-600 dark:focus:ring-indigo-500 border-slate-400 dark:border-slate-500 dark:bg-slate-700"
              />
              <span className="text-sm font-medium text-slate-800 dark:text-slate-200">{t('docUpload.actionSkip')}</span>
            </label>
          </div>
        </div>

        {document.documentAction === 'upload' && (
          <div className="mt-4">
            <label className="flex items-center justify-center w-full px-4 py-6 border-2 border-dashed border-slate-400 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-slate-700 hover:border-indigo-600 dark:hover:border-indigo-500 shadow-sm transition-all cursor-pointer group/upload">
              <div className="flex flex-col items-center gap-2 text-slate-600 dark:text-slate-400 group-hover/upload:text-indigo-700 dark:group-hover/upload:text-indigo-400">
                <Upload size={24} />
                <span className="text-sm font-semibold">{t('docUpload.selectFile')}</span>
              </div>
              <input
                type="file"
                accept="image/png, image/jpeg, application/pdf"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
            {document.fileData && (
              <div className="mt-3 flex items-center justify-between bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 px-4 py-2 rounded-lg text-sm border dark:border-indigo-800/50">
                <span>{t('docUpload.success')}</span>
                <button
                  onClick={() => onChange({ ...document, fileData: null, fileType: null })}
                  className="text-indigo-700 dark:text-indigo-300 hover:text-indigo-900 dark:hover:text-indigo-100 underline cursor-pointer"
                >
                  {t('docUpload.removeLink')}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

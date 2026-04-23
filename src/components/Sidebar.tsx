import { useState } from 'react';
import { Check, X, ShieldCheck, Download, Loader2, Globe } from 'lucide-react';
import { useFormContext } from '../FormContext';
import { useTranslation } from 'react-i18next';
import { ThemeToggle } from './ThemeToggle';

interface SidebarProps {
  currentStep: number;
  setStep: (step: number) => void;
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ currentStep, setStep, isOpen, onClose }: SidebarProps) {
  const { downloadBackup, isDownloading } = useFormContext();
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const { t, i18n } = useTranslation();

  const handleBackupClick = async () => {
    if (isDownloading) return;
    setDownloadSuccess(false);
    const success = await downloadBackup('rot');
    if (success) {
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    }
    onClose();
  };

  const steps = [
    { id: 1, title: t('sidebar.steps.step1.title'), description: t('sidebar.steps.step1.description') },
    { id: 2, title: t('sidebar.steps.step2.title'), description: t('sidebar.steps.step2.description') },
    { id: 3, title: t('sidebar.steps.step3.title'), description: t('sidebar.steps.step3.description') },
    { id: 4, title: t('sidebar.steps.step4.title'), description: t('sidebar.steps.step4.description') },
    { id: 5, title: t('sidebar.steps.step5.title'), description: t('sidebar.steps.step5.description') },
    { id: 6, title: t('sidebar.steps.step6.title'), description: t('sidebar.steps.step6.description') },
    { id: 7, title: t('sidebar.steps.step7.title'), description: t('sidebar.steps.step7.description') },
    { id: 8, title: t('sidebar.steps.step8.title'), description: t('sidebar.steps.step8.description') },
    { id: 9, title: t('sidebar.steps.step9.title'), description: t('sidebar.steps.step9.description') },
    { id: 10, title: t('sidebar.steps.step10.title'), description: t('sidebar.steps.step10.description') }
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-72 lg:w-80 bg-slate-100 dark:bg-slate-900 p-4 lg:p-6 flex flex-col shrink-0 h-screen border-r border-slate-200 dark:border-slate-800 overflow-y-auto transition-transform duration-300 ease-in-out lg:sticky lg:top-0 lg:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 text-white p-2 rounded-xl shadow-sm">
              <ShieldCheck size={24} strokeWidth={2.5} />
            </div>
            <h2 className="text-slate-900 dark:text-slate-100 font-serif text-2xl font-medium tracking-tight">{t('sidebar.title')}</h2>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden lg:block">
              <ThemeToggle />
            </div>
            <button
              onClick={onClose}
              className="lg:hidden text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 cursor-pointer"
            >
              <X size={24} />
            </button>
          </div>
        </div>
        
        <div className="space-y-4 flex-1">
          {steps.map((step, index) => {
            const isCompleted = currentStep > step.id;
            const isCurrent = currentStep === step.id;
            
            return (
              <div 
                key={step.id} 
                className="relative"
              >
                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="absolute left-[11px] top-7 bottom-[-16px] w-0.5 bg-slate-300 dark:bg-slate-700" />
                )}
                
                <button
                  onClick={() => {
                    setStep(step.id);
                    onClose();
                  }}
                  className={`flex items-start gap-4 text-left w-full group cursor-pointer`}
                >
                  <div className="mt-0.5 relative z-10 shrink-0">
                    {isCompleted ? (
                      <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-sm">
                        <Check size={14} strokeWidth={3} />
                      </div>
                    ) : isCurrent ? (
                      <div className="w-6 h-6 rounded-full bg-white dark:bg-slate-800 border-2 border-indigo-600 dark:border-indigo-500 flex items-center justify-center shadow-sm">
                        <div className="w-2 h-2 rounded-full bg-indigo-600 dark:bg-indigo-500" />
                      </div>
                    ) : (
                      <div className="w-6 h-6 rounded-full bg-white/50 dark:bg-slate-800/50 border-2 border-slate-300 dark:border-slate-600 flex items-center justify-center group-hover:border-indigo-600 dark:group-hover:border-indigo-500 transition-colors" />
                    )}
                  </div>
                  
                  <div>
                    <div className={`font-medium ${isCurrent || isCompleted ? 'text-slate-900 dark:text-slate-100' : 'text-slate-600 dark:text-slate-400'}`}>
                      {step.title}
                    </div>
                    <div className="text-sm text-slate-500 dark:text-slate-500 mt-0.5">
                      {step.description}
                    </div>
                  </div>
                </button>
              </div>
            );
          })}
        </div>
        
        <div className="mt-6 pt-4 border-t border-slate-300/50 dark:border-slate-700/50 text-xs text-slate-600 dark:text-slate-400 leading-relaxed flex flex-col gap-3">
          <button 
            onClick={handleBackupClick}
            disabled={isDownloading || downloadSuccess}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 hover:border-indigo-600 dark:hover:border-indigo-500 text-slate-700 dark:text-slate-300 hover:text-indigo-700 dark:hover:text-indigo-400 rounded-xl transition-colors shadow-sm font-medium text-sm cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isDownloading ? (
              <><Loader2 size={16} className="animate-spin" /> {t('sidebar.buttons.creatingBackup')}</>
            ) : downloadSuccess ? (
              <><Check size={16} /> {t('sidebar.buttons.success')}</>
            ) : (
              <><Download size={16} /> {t('sidebar.buttons.saveBackup')}</>
            )}
          </button>
          
          <div className="flex items-center justify-center gap-2 mt-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 py-1.5 px-3 rounded-lg mx-auto w-fit">
            <Globe size={14} className="text-slate-400 dark:text-slate-500" />
            <button
              onClick={() => i18n.changeLanguage('de')}
              className={`text-xs font-medium px-2 py-1 rounded transition-colors cursor-pointer ${i18n.language === 'de' || !i18n.language || i18n.language.startsWith('de') ? 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'}`}
            >
              DE
            </button>
            <button
              onClick={() => i18n.changeLanguage('en')}
              className={`text-xs font-medium px-2 py-1 rounded transition-colors cursor-pointer ${i18n.language === 'en' || i18n.language.startsWith('en') ? 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'}`}
            >
              EN
            </button>
          </div>

          <p className="text-center">{t('sidebar.footer.localProcessing')}</p>
          <a 
            href="https://github.com/Alpha63/rote-mappe" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-colors font-medium"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
              <path d="M9 18c-4.51 2-5-2-7-2"/>
            </svg>
            <span>{t('sidebar.footer.github')}</span>
          </a>
        </div>
      </div>
    </>
  );
}

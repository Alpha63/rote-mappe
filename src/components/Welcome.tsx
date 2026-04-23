import { useState, useEffect } from 'react';
import { ShieldCheck, FileText, Download, Lock, Upload, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { ThemeToggle } from './ThemeToggle';
import { version } from '../../package.json';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

interface WelcomeProps {
  onStart: () => void;
}

export function Welcome({ onStart }: WelcomeProps) {
  const { t, i18n } = useTranslation();
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setDeferredPrompt(null);
    }
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target?.result as string);
        sessionStorage.setItem('notfallakte_data', JSON.stringify(data));
        onStart();
      } catch {
        alert(t('welcome.backupError'));
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col items-center justify-center p-6 text-slate-800 dark:text-slate-200 relative">
      <div className="max-w-4xl w-full bg-white dark:bg-slate-800 rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row border border-slate-200 dark:border-slate-700">

        {/* Left Side: Illustration / Mood */}
        <div className="md:w-5/12 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 p-10 flex flex-col justify-center relative overflow-hidden border-r border-slate-200 dark:border-slate-700">
          <div className="absolute top-0 right-0 p-8 opacity-10 dark:opacity-5">
             <ShieldCheck size={200} />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="bg-indigo-600 text-white p-3 rounded-2xl shadow-lg shadow-indigo-600/20">
                <ShieldCheck size={32} strokeWidth={2.5} />
              </div>
              <span className="text-2xl font-serif font-semibold text-slate-900 dark:text-slate-100 tracking-tight">{t('welcome.title')}</span>
            </div>
            <h1 className="text-4xl font-serif text-slate-900 dark:text-slate-100 font-medium leading-tight mb-4 whitespace-pre-line">
              {t('welcome.subtitle')}
            </h1>
            <p className="text-indigo-700 dark:text-indigo-300 text-lg mb-8 leading-relaxed">
              {t('welcome.description')}
            </p>

            <div className="flex items-center gap-2 bg-white/50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 py-1.5 px-3 rounded-lg w-fit mx-auto">
              <Globe size={14} className="text-indigo-400 dark:text-indigo-300" />
              <button
                onClick={() => i18n.changeLanguage('de')}
                className={`text-xs font-medium px-2 py-1 rounded transition-colors cursor-pointer ${i18n.language === 'de' || !i18n.language || i18n.language.startsWith('de') ? 'bg-indigo-600 text-white shadow-sm' : 'text-indigo-700 dark:text-indigo-300 hover:bg-white/60 dark:hover:bg-slate-700/60'}`}
              >
                DE
              </button>
              <button
                onClick={() => i18n.changeLanguage('en')}
                className={`text-xs font-medium px-2 py-1 rounded transition-colors cursor-pointer ${i18n.language === 'en' || i18n.language.startsWith('en') ? 'bg-indigo-600 text-white shadow-sm' : 'text-indigo-700 dark:text-indigo-300 hover:bg-white/60 dark:hover:bg-slate-700/60'}`}
              >
                EN
              </button>
            </div>

            <div className="mt-4 flex justify-center">
              <ThemeToggle />
            </div>
          </div>
        </div>

        {/* Right Side: Content */}
        <div className="md:w-7/12 p-10 md:p-14 flex flex-col justify-center relative">

          <h2 className="text-2xl font-medium text-slate-800 dark:text-slate-200 mb-6">{t('welcome.welcomeTo')}</h2>

          <div className="space-y-6 mb-10">
            <div className="flex items-start gap-4">
              <div className="bg-red-100 dark:bg-red-900/30 p-3 rounded-2xl shrink-0 border border-transparent dark:border-red-800/50">
                <FileText className="text-red-700 dark:text-red-400 w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-800 dark:text-slate-200 text-lg mb-1">{t('welcome.feature1.title')}</h3>
                <p className="text-slate-700 dark:text-slate-400 text-sm leading-relaxed">{t('welcome.feature1.desc')}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-emerald-100 dark:bg-emerald-900/30 p-3 rounded-2xl shrink-0 border border-emerald-200 dark:border-emerald-800/50">
                <Lock className="text-emerald-700 dark:text-emerald-400 w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-800 dark:text-slate-200 text-lg mb-1">{t('welcome.feature2.title')}</h3>
                <p className="text-slate-700 dark:text-slate-400 text-sm leading-relaxed">
                  {t('welcome.feature2.desc')}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-amber-100 dark:bg-amber-900/30 p-3 rounded-2xl shrink-0 border border-amber-200 dark:border-amber-800/50">
                <Download className="text-amber-700 dark:text-amber-400 w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-800 dark:text-slate-200 text-lg mb-1">{t('welcome.feature3.title')}</h3>
                <p className="text-slate-700 dark:text-slate-400 text-sm leading-relaxed">{t('welcome.feature3.desc')}</p>
              </div>
            </div>
          </div>

          <button
            onClick={onStart}
            className="group w-full bg-indigo-600 text-white py-4 px-6 rounded-2xl font-medium text-lg shadow-lg shadow-indigo-600/20 hover:bg-indigo-700 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
          >
            {t('welcome.startBtn')}
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>

          <label className="group mt-4 w-full bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 py-4 px-6 rounded-2xl font-medium text-lg hover:bg-slate-50 dark:hover:bg-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer">
            <Upload className="w-5 h-5 text-slate-400 dark:text-slate-500 group-hover:text-indigo-500 transition-colors" />
            {t('welcome.loadBackup')}
            <input
              type="file"
              accept=".json"
              className="hidden"
              onChange={handleImport}
            />
          </label>

          {deferredPrompt && (
            <button
              onClick={handleInstallClick}
              className="mt-4 w-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 py-4 px-6 rounded-2xl font-medium text-lg border-2 border-transparent hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Download className="w-5 h-5" />
              {t('welcome.installApp')}
            </button>
          )}
        </div>

      </div>

      <div className="mt-8 flex flex-col items-center gap-2">
        <p className="text-slate-400 dark:text-slate-500 text-sm text-center max-w-lg">
          {t('welcome.note')}
        </p>
        <a
          href="https://github.com/Alpha63/rote-mappe"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-slate-400 hover:text-indigo-600 dark:text-slate-500 dark:hover:text-indigo-400 transition-colors"
        >
          v{version}
        </a>
      </div>
    </div>
  );
}

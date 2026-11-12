import { useState, useEffect, Suspense, lazy } from 'react';
import { Sidebar } from './Sidebar';
import { ArrowRight, ArrowLeft, AlertTriangle, Menu, ShieldCheck, Loader2 } from 'lucide-react';
import { FormProvider, useFormContext } from '../FormContext';
import { useTranslation } from 'react-i18next';
const Step1Basisdaten = lazy(() => import('./steps/Step1Basisdaten').then(m => ({ default: m.Step1Basisdaten })));
const Step2MedizinischeDaten = lazy(() => import('./steps/Step2MedizinischeDaten').then(m => ({ default: m.Step2MedizinischeDaten })));
const Step3Finanzen = lazy(() => import('./steps/Step3Finanzen').then(m => ({ default: m.Step3Finanzen })));
const Step4Vertraege = lazy(() => import('./steps/Step4Vertraege').then(m => ({ default: m.Step4Vertraege })));
const Step5DigitaleIdentitaet = lazy(() => import('./steps/Step5DigitaleIdentitaet').then(m => ({ default: m.Step5DigitaleIdentitaet })));
const Step6Dokumente = lazy(() => import('./steps/Step6Dokumente').then(m => ({ default: m.Step6Dokumente })));
const Step7Vollmachten = lazy(() => import('./steps/Step7Vollmachten').then(m => ({ default: m.Step7Vollmachten })));
const Step8Hinweise = lazy(() => import('./steps/Step8Hinweise').then(m => ({ default: m.Step8Hinweise })));
const Step9EigeneKapitel = lazy(() => import('./steps/Step9EigeneKapitel').then(m => ({ default: m.Step9EigeneKapitel })));
const Step10Abschluss = lazy(() => import('./steps/Step10Abschluss').then(m => ({ default: m.Step10Abschluss })));
import { ThemeToggle } from './ThemeToggle';
import { useDialogFocusTrap } from '../hooks/useDialogFocusTrap';
import { fieldsForStep } from './wizardFields';

function WizardLoading() {
  const { t } = useTranslation();

  return (
    <div
      className="flex h-full min-h-32 items-center justify-center gap-3 p-12 text-slate-500 dark:text-slate-400"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <Loader2 size={24} className="animate-spin" aria-hidden="true" />
      <span>{t('wizard.loading')}</span>
    </div>
  );
}

export function Wizard() {
  return (
    <FormProvider>
      <WizardContent />
    </FormProvider>
  );
}

function WizardContent() {
  const { t } = useTranslation();
  const [step, setStep] = useState(1);
  const { methods } = useFormContext();
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [nextStepTarget, setNextStepTarget] = useState(1);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const warningDialogRef = useDialogFocusTrap(showWarningModal);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step]);

  useEffect(() => {
    if (!showWarningModal) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setShowWarningModal(false);
    };
    window.addEventListener('keydown', handleEscape);
    return () => {
      window.removeEventListener('keydown', handleEscape);
      previouslyFocused?.focus();
    };
  }, [showWarningModal]);

  const handleNextClick = async (targetStep: number) => {
    if (targetStep > step) {
      const fieldsToValidate = fieldsForStep[step] ?? [];
      let isValid = true;
      if (fieldsToValidate.length > 0) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        isValid = await methods.trigger(fieldsToValidate as any);
      }
      if (!isValid) {
        setNextStepTarget(targetStep);
        setShowWarningModal(true);
        return;
      }
    }
    setStep(targetStep);
    window.scrollTo(0, 0);
  };

  const renderStep = () => {
    switch (step) {
      case 1: return <Step1Basisdaten />;
      case 2: return <Step2MedizinischeDaten />;
      case 3: return <Step3Finanzen />;
      case 4: return <Step4Vertraege />;
      case 5: return <Step5DigitaleIdentitaet />;
      case 6: return <Step6Dokumente />;
      case 7: return <Step7Vollmachten />;
      case 8: return <Step8Hinweise />;
      case 9: return <Step9EigeneKapitel />;
      case 10: return <Step10Abschluss />;
      default: return null;
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200">
      <Sidebar
        currentStep={step}
        setStep={(s) => handleNextClick(s)}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col min-w-0">

        {/* Mobile Header */}
        <header className="lg:hidden bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 p-4 flex items-center justify-between sticky top-0 z-30 shadow-sm">
          <div className="flex items-center gap-2.5">
            <div className="bg-indigo-600 text-white p-1.5 rounded-lg shadow-sm">
              <ShieldCheck size={20} strokeWidth={2.5} />
            </div>
            <h1 className="text-xl font-serif text-slate-900 dark:text-slate-100 font-medium tracking-tight">{t('sidebar.title')}</h1>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <button
              type="button"
              aria-label={t('wizard.openMenu', 'Menü öffnen')}
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 -mr-2 text-indigo-600 dark:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
            >
              <Menu size={24} />
            </button>
          </div>
        </header>

        <main className="p-4 md:p-8 lg:p-12 max-w-360 mx-auto w-full h-full flex-1">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleNextClick(Math.min(10, step + 1));
            }}
            noValidate
            className="wizard-step-container"
          >
            <div className="bg-white dark:bg-slate-800 rounded-3xl p-5 md:p-8 shadow-sm border border-slate-200 dark:border-slate-700 min-h-[calc(100vh-8rem)] flex flex-col">

              <div className="flex-1">
                <Suspense fallback={<WizardLoading />}>
                  {renderStep()}
                </Suspense>
              </div>

              <div className="mt-10 pt-6 border-t border-slate-100 dark:border-slate-700 flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => handleNextClick(Math.max(1, step - 1))}
                  disabled={step === 1}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-colors
                    ${step === 1 ? 'text-slate-300 dark:text-slate-600 cursor-not-allowed' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-600 cursor-pointer'}`}
                >
                  <ArrowLeft size={18} />
                  {t('wizard.back')}
                </button>

                {step < 10 ? (
                  <button
                    type="button"
                    onClick={() => handleNextClick(Math.min(10, step + 1))}
                    className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors shadow-md shadow-indigo-600/10 dark:shadow-none cursor-pointer"
                  >
                    {t('wizard.next')}
                    <ArrowRight size={18} />
                  </button>
                ) : (
                  <div />
                )}
              </div>

            </div>
          </form>
        </main>
      </div>

      {showWarningModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in" role="presentation">
          <div ref={warningDialogRef} className="bg-white dark:bg-slate-800 rounded-3xl p-8 max-w-md w-full shadow-2xl border border-red-100 dark:border-red-900/50 animate-in zoom-in-95" role="dialog" aria-modal="true" aria-labelledby="wizard-warning-title" tabIndex={-1}>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full flex items-center justify-center mb-6">
                <AlertTriangle size={32} />
              </div>
              <h3 id="wizard-warning-title" className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-3">{t('wizard.warningTitle')}</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                {t('wizard.warningDesc')}
              </p>
              <div className="flex flex-col w-full gap-3">
                <button type="button" onClick={() => setShowWarningModal(false)} className="w-full py-3.5 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 font-medium rounded-xl hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors cursor-pointer">
                  {t('wizard.checkInputs')}
                </button>
                <button type="button" onClick={() => { setShowWarningModal(false); setStep(nextStepTarget); }} className="w-full py-3.5 text-slate-500 dark:text-slate-400 font-medium hover:text-slate-700 dark:hover:text-slate-200 transition-colors cursor-pointer">
                  {t('wizard.continueAnyway')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

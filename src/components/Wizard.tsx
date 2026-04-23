import { useState, useEffect } from 'react';
import { Sidebar } from './Sidebar';
import { ArrowRight, ArrowLeft, AlertTriangle, Menu, ShieldCheck } from 'lucide-react';
import { FormProvider, useFormContext } from '../FormContext';
import { useTranslation } from 'react-i18next';
import { 
  Step1Basisdaten, Step2MedizinischeDaten, Step3Finanzen, Step4Vertraege, 
  Step5DigitaleIdentitaet, Step6Dokumente, Step7Vollmachten, Step8Hinweise, 
  Step9EigeneKapitel, Step10Abschluss 
} from './WizardSteps';
import { ThemeToggle } from './ThemeToggle';

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
  const { formData, setErrors } = useFormContext();
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [nextStepTarget, setNextStepTarget] = useState(1);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    validateCurrentStep(step);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData, step]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step]);

  const validateCurrentStep = (currentStep: number) => {
    const errs: Record<string, string> = {};
    const isAlpha = (val: string) => /^[a-zA-ZäöüÄÖÜß\s-]*$/.test(val);
    const isNumeric = (val: string) => /^\d*$/.test(val);

    if (currentStep === 1) {
      if (!formData.firstName) {
        errs.firstName = 'Vorname ist ein Pflichtfeld.';
      } else if (!isAlpha(formData.firstName)) {
        errs.firstName = 'Darf nur Buchstaben enthalten.';
      }
      if (!formData.lastName) {
        errs.lastName = 'Nachname ist ein Pflichtfeld.';
      } else if (!isAlpha(formData.lastName)) {
        errs.lastName = 'Darf nur Buchstaben enthalten.';
      }
      if (formData.middleName && !isAlpha(formData.middleName)) errs.middleName = 'Darf nur Buchstaben enthalten.';
      if (formData.zipCode && !isNumeric(formData.zipCode)) errs.zipCode = 'Darf nur Zahlen enthalten.';
      if (formData.childrenCount && !isNumeric(formData.childrenCount)) errs.childrenCount = 'Darf nur Zahlen enthalten.';
    }

    setErrors(errs);
    return errs;
  };

  const handleNextClick = (targetStep: number) => {
    const currentErrs = validateCurrentStep(step);
    if (Object.keys(currentErrs).length > 0 && targetStep > step) {
      setNextStepTarget(targetStep);
      setShowWarningModal(true);
    } else {
      setStep(targetStep);
    }
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
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 -mr-2 text-indigo-600 dark:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
            >
              <Menu size={24} />
            </button>
          </div>
        </header>

        <main className="p-4 md:p-8 lg:p-12 max-w-[90rem] mx-auto w-full h-full flex-1">
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-5 md:p-8 shadow-sm border border-slate-200 dark:border-slate-700 min-h-[calc(100vh-8rem)] flex flex-col">
            
            <div className="flex-1">
              {renderStep()}
            </div>

            <div className="mt-10 pt-6 border-t border-slate-100 dark:border-slate-700 flex justify-between items-center">
              <button
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
        </main>
      </div>

      {showWarningModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in">
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 max-w-md w-full shadow-2xl border border-red-100 dark:border-red-900/50 animate-in zoom-in-95">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full flex items-center justify-center mb-6">
                <AlertTriangle size={32} />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-3">{t('wizard.warningTitle')}</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                {t('wizard.warningDesc')}
              </p>
              <div className="flex flex-col w-full gap-3">
                <button onClick={() => setShowWarningModal(false)} className="w-full py-3.5 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 font-medium rounded-xl hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors cursor-pointer">
                  {t('wizard.checkInputs')}
                </button>
                <button onClick={() => { setShowWarningModal(false); setStep(nextStepTarget); }} className="w-full py-3.5 text-slate-500 dark:text-slate-400 font-medium hover:text-slate-700 dark:hover:text-slate-200 transition-colors cursor-pointer">
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

import { useEffect } from 'react';
import { AlertTriangle, CheckCircle, X } from 'lucide-react';

export type ToastType = 'error' | 'success';

export interface ToastMessage {
  id: number;
  type: ToastType;
  message: string;
}

interface ToastItemProps {
  toast: ToastMessage;
  onDismiss: (id: number) => void;
}

function ToastItem({ toast, onDismiss }: ToastItemProps) {
  useEffect(() => {
    const timer = setTimeout(() => onDismiss(toast.id), 5000);
    return () => clearTimeout(timer);
  }, [toast.id, onDismiss]);

  const isError = toast.type === 'error';

  return (
    <div
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      className={`flex items-start gap-3 w-full max-w-sm px-4 py-3.5 rounded-2xl shadow-lg border text-sm font-medium
        ${isError
          ? 'bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200'
          : 'bg-emerald-50 dark:bg-emerald-950 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200'
        }`}
    >
      <span className="shrink-0 mt-0.5">
        {isError
          ? <AlertTriangle size={18} className="text-red-500 dark:text-red-400" />
          : <CheckCircle size={18} className="text-emerald-500 dark:text-emerald-400" />
        }
      </span>
      <span className="flex-1 leading-snug">{toast.message}</span>
      <button
        onClick={() => onDismiss(toast.id)}
        aria-label="Benachrichtigung schließen"
        className={`shrink-0 p-0.5 rounded-lg transition-colors cursor-pointer
          ${isError
            ? 'text-red-400 hover:text-red-700 hover:bg-red-100 dark:hover:bg-red-900'
            : 'text-emerald-400 hover:text-emerald-700 hover:bg-emerald-100 dark:hover:bg-emerald-900'
          }`}
      >
        <X size={15} />
      </button>
    </div>
  );
}

interface ToastContainerProps {
  toasts: ToastMessage[];
  onDismiss: (id: number) => void;
}

export function ToastContainer({ toasts, onDismiss }: ToastContainerProps) {
  if (toasts.length === 0) return null;
  return (
    <div
      aria-label="Benachrichtigungen"
      className="fixed top-4 right-4 z-[100] flex flex-col gap-2 pointer-events-none"
    >
      {toasts.map((t) => (
        <div key={t.id} className="pointer-events-auto animate-in slide-in-from-right-4 fade-in duration-200">
          <ToastItem toast={t} onDismiss={onDismiss} />
        </div>
      ))}
    </div>
  );
}

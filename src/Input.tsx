import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div>
        {label && <label className="block text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1.5">{label}</label>}
        <input 
          ref={ref}
          className={`w-full rounded-lg px-3 py-2.5 text-sm text-slate-900 dark:text-slate-100 border shadow-sm transition-colors focus:ring-2 focus:ring-indigo-600 dark:focus:ring-indigo-500 focus:border-indigo-600 dark:focus:border-indigo-500 focus:outline-none placeholder-slate-400 dark:placeholder-slate-500 ${error ? 'border-red-500 dark:border-red-600 bg-red-50 dark:bg-red-900/30 text-red-900 dark:text-red-200' : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 hover:border-slate-400 dark:hover:border-slate-500'} ${className}`} 
          {...props} 
        />
        {error && <p className="text-red-600 dark:text-red-400 text-xs mt-1.5 font-medium">{error}</p>}
      </div>
    );
  }
);
Input.displayName = 'Input';

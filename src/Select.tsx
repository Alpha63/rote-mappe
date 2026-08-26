import React, { forwardRef, useId } from 'react';
import { useTranslation } from 'react-i18next';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ id, label, error, options, className = '', ...props }, ref) => {
    const { t } = useTranslation();
    const generatedId = useId();
    const selectId = id || (props.name ? props.name.replace(/\./g, '-') : generatedId);
    const errorId = error ? `${selectId}-error` : undefined;

    return (
      <div>
        {label && (
          <label htmlFor={selectId} className="block text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1.5">
            {label}
          </label>
        )}
        <select 
          ref={ref}
          id={selectId}
          aria-invalid={Boolean(error)}
          aria-describedby={errorId}
          className={`w-full rounded-lg px-3 py-2.5 text-sm text-slate-900 dark:text-slate-100 border shadow-sm transition-colors focus:ring-2 focus:ring-indigo-600 dark:focus:ring-indigo-500 focus:border-indigo-600 dark:focus:border-indigo-500 focus:outline-none ${error ? 'border-red-500 dark:border-red-600 bg-red-50 dark:bg-red-900/30 text-red-900 dark:text-red-200' : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 hover:border-slate-400 dark:hover:border-slate-500'} ${className}`} 
          {...props}
        >
          {options.find(o => o.value === '') ? null : <option value="">{t('common.select')}</option>}
          {options.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
        </select>
        {error && (
          <p id={errorId} role="alert" className="text-red-600 dark:text-red-400 text-xs mt-1.5 font-medium">
            {error}
          </p>
        )}
      </div>
    );
  }
);
Select.displayName = 'Select';

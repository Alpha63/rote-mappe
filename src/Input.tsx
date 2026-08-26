import React, { forwardRef, useId } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  description?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ id, label, error, description, className = '', ...props }, ref) => {
    const generatedId = useId();
    const inputId = id || (props.name ? props.name.replace(/\./g, '-') : generatedId);
    const errorId = error ? `${inputId}-error` : undefined;
    const descId = description ? `${inputId}-desc` : undefined;
    const describedBy = [descId, errorId].filter(Boolean).join(' ') || undefined;

    return (
      <div>
        {label && (
          <label htmlFor={inputId} className="block text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1.5">
            {label}
          </label>
        )}
        <input 
          ref={ref}
          id={inputId}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          className={`w-full rounded-lg px-3 py-2.5 text-sm text-slate-900 dark:text-slate-100 border shadow-sm transition-colors focus:ring-2 focus:ring-indigo-600 dark:focus:ring-indigo-500 focus:border-indigo-600 dark:focus:border-indigo-500 focus:outline-none placeholder-slate-400 dark:placeholder-slate-500 ${error ? 'border-red-500 dark:border-red-600 bg-red-50 dark:bg-red-900/30 text-red-900 dark:text-red-200' : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 hover:border-slate-400 dark:hover:border-slate-500'} ${className}`} 
          {...props} 
        />
        {description && (
          <p id={descId} className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {description}
          </p>
        )}
        {error && (
          <p id={errorId} role="alert" className="text-red-600 dark:text-red-400 text-xs mt-1.5 font-medium">
            {error}
          </p>
        )}
      </div>
    );
  }
);
Input.displayName = 'Input';

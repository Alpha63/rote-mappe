import { useId } from 'react';
import MDEditor, { commands } from '@uiw/react-md-editor';

interface TextareaProps {
  id?: string;
  label?: string;
  description?: string;
  value?: string;
  onChange?: (e: { target: { value: string } }) => void;
  className?: string;
  placeholder?: string;
}

export function Textarea({ id, label, description, value, onChange, className = '', placeholder }: TextareaProps) {
  const generatedId = useId();
  const textareaId = id || generatedId;
  const descId = description ? `${textareaId}-desc` : undefined;

  return (
    <div className={className}>
      {label && (
        <label htmlFor={textareaId} className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
          {label}
        </label>
      )}
      {description && (
        <p id={descId} className="text-xs text-slate-500 dark:text-slate-400 mb-2">
          {description}
        </p>
      )}
      <div className="mt-1">
        <MDEditor
          value={value || ''}
          onChange={(val) => onChange && onChange({ target: { value: val || '' } })}
          preview="edit"
          hideToolbar={false}
          textareaProps={{
            id: textareaId,
            placeholder,
            'aria-describedby': descId
          }}
          height={200}
          commands={[
            commands.bold,
            commands.italic,
            commands.link
          ]}
          className="!rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-sm"
        />
      </div>
    </div>
  );
}
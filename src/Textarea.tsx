import MDEditor, { commands } from '@uiw/react-md-editor';

interface TextareaProps {
  label?: string;
  description?: string;
  value?: string;
  onChange?: (e: { target: { value: string } }) => void;
  className?: string;
  placeholder?: string;
}

export function Textarea({ label, description, value, onChange, className = '', placeholder }: TextareaProps) {
  return (
    <div className={className}>
      {label && <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{label}</label>}
      {description && <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">{description}</p>}
      <div className="mt-1">
        <MDEditor
          value={value || ''}
          onChange={(val) => onChange && onChange({ target: { value: val || '' } })}
          preview="edit"
          hideToolbar={false}
          textareaProps={{ placeholder }}
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
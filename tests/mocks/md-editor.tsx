import React from 'react';

interface EditorProps {
  value?: string;
  onChange?: (value?: string) => void;
  textareaProps?: React.TextareaHTMLAttributes<HTMLTextAreaElement>;
}

export default function MDEditor({ value = '', onChange, textareaProps }: EditorProps) {
  return (
    <textarea
      {...textareaProps}
      value={value}
      onChange={(event) => onChange?.(event.target.value)}
    />
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const commands = {
  bold: {},
  italic: {},
  link: {},
};

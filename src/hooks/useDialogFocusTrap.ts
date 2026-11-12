import { useEffect, useRef } from 'react';

const FOCUSABLE = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

export function useDialogFocusTrap(isOpen: boolean) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const dialog = dialogRef.current;
    if (!dialog) return;

    const focusable = () => Array.from(dialog.querySelectorAll<HTMLElement>(FOCUSABLE));
    const first = focusable()[0];
    first?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;
      const elements = focusable();
      if (!elements.length) return;
      const current = document.activeElement;
      const index = elements.indexOf(current as HTMLElement);
      if (event.shiftKey && (index <= 0 || current === dialog)) {
        event.preventDefault();
        elements[elements.length - 1].focus();
      } else if (!event.shiftKey && (index === elements.length - 1 || current === dialog)) {
        event.preventDefault();
        elements[0].focus();
      }
    };

    dialog.addEventListener('keydown', handleKeyDown);
    return () => dialog.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  return dialogRef;
}

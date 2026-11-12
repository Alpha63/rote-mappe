import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { useDialogFocusTrap } from '../src/hooks/useDialogFocusTrap';

function TestDialog() {
  const dialogRef = useDialogFocusTrap(true);
  return (
    <div ref={dialogRef} role="dialog" tabIndex={-1}>
      <button type="button">First</button>
      <button type="button">Last</button>
    </div>
  );
}

describe('dialog focus trap', () => {
  it('cycles forward and backward through dialog controls', async () => {
    const user = userEvent.setup();
    render(<TestDialog />);
    const first = screen.getByRole('button', { name: 'First' });
    const last = screen.getByRole('button', { name: 'Last' });

    expect(document.activeElement).toBe(first);
    await user.tab();
    expect(document.activeElement).toBe(last);
    await user.tab();
    expect(document.activeElement).toBe(first);
    await user.tab({ shift: true });
    expect(document.activeElement).toBe(last);
  });
});

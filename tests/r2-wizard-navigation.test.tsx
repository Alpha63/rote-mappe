import { describe, expect, it } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Wizard } from '../src/components/Wizard';

describe('Wizard navigation without animated transitions', () => {
  it('moves forward and backward directly', async () => {
    const user = userEvent.setup();
    render(<Wizard />);

    await user.type(await screen.findByPlaceholderText('Max'), 'Anna');
    await user.type(screen.getByPlaceholderText('Mustermann'), 'Schmidt');
    await user.click(screen.getByRole('button', { name: /weiter|next/i }));

    await waitFor(() => {
      expect(screen.getAllByText(/medizinische daten|medical/i).length).toBeGreaterThan(0);
    });
    expect(document.startViewTransition).toBeUndefined();

    const backButtons = screen.getAllByRole('button', { name: /zurück|back/i });
    await user.click(backButtons[backButtons.length - 1]);
    await waitFor(() => {
      expect(screen.getByPlaceholderText('Max')).toBeInTheDocument();
    });
    expect(document.startViewTransition).toBeUndefined();
  });

  it('does not use the removed transition dataset', () => {
    expect(document.documentElement.dataset.transitionDirection).toBeUndefined();
    expect(document.startViewTransition).toBeUndefined();
  });
});

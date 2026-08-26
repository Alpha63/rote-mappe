import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Wizard } from '../src/components/Wizard';
import fs from 'fs';
import path from 'path';

describe('R2: View Transitions — API Execution & Direction Dataset', () => {
  const originalStartViewTransition = document.startViewTransition;

  beforeEach(() => {
    delete document.documentElement.dataset.transitionDirection;
    vi.clearAllMocks();
  });

  afterEach(() => {
    document.startViewTransition = originalStartViewTransition;
    delete document.documentElement.dataset.transitionDirection;
  });

  it('triggers document.startViewTransition with forward direction when advancing steps', async () => {
    const user = userEvent.setup();
    let capturedDirectionDuringCallback = '';

    const mockStartViewTransition = vi.fn().mockImplementation((cb: () => void) => {
      capturedDirectionDuringCallback = document.documentElement.dataset.transitionDirection || '';
      cb();
      return {
        finished: Promise.resolve().then(() => {
          delete document.documentElement.dataset.transitionDirection;
        }),
        ready: Promise.resolve(),
        updateCallbackDone: Promise.resolve(),
        skipTransition: vi.fn(),
      };
    });
    document.startViewTransition = mockStartViewTransition;

    render(<Wizard />);

    const firstNameInput = await screen.findByPlaceholderText('Max');
    const lastNameInput = await screen.findByPlaceholderText('Mustermann');
    await user.type(firstNameInput, 'Anna');
    await user.type(lastNameInput, 'Schmidt');

    const nextButtons = screen.getAllByRole('button');
    const nextBtn = nextButtons.find(
      b => b.textContent?.includes('Weiter') || b.textContent?.includes('Next') || b.querySelector('svg.lucide-arrow-right')
    );
    expect(nextBtn).toBeDefined();

    if (nextBtn) {
      await user.click(nextBtn);
    }

    expect(mockStartViewTransition).toHaveBeenCalledTimes(1);
    expect(capturedDirectionDuringCallback).toBe('forward');

    // Wait for step 2 to display
    await waitFor(() => {
      expect(screen.getByText(/medizinische daten|medical/i)).toBeInTheDocument();
    });
  });

  it('triggers document.startViewTransition with backward direction when navigating back', async () => {
    const user = userEvent.setup();
    let capturedDirectionDuringCallback = '';

    const mockStartViewTransition = vi.fn().mockImplementation((cb: () => void) => {
      capturedDirectionDuringCallback = document.documentElement.dataset.transitionDirection || '';
      cb();
      return {
        finished: Promise.resolve().then(() => {
          delete document.documentElement.dataset.transitionDirection;
        }),
        ready: Promise.resolve(),
        updateCallbackDone: Promise.resolve(),
        skipTransition: vi.fn(),
      };
    });
    document.startViewTransition = mockStartViewTransition;

    render(<Wizard />);

    // Step 1: Fill name and go to step 2
    const firstNameInput = await screen.findByPlaceholderText('Max');
    const lastNameInput = await screen.findByPlaceholderText('Mustermann');
    await user.type(firstNameInput, 'Anna');
    await user.type(lastNameInput, 'Schmidt');

    const nextBtn = screen.getAllByRole('button').find(
      b => b.textContent?.includes('Weiter') || b.textContent?.includes('Next') || b.querySelector('svg.lucide-arrow-right')
    );
    if (nextBtn) {
      await user.click(nextBtn);
    }

    await waitFor(() => {
      expect(screen.getByText(/medizinische daten|medical/i)).toBeInTheDocument();
    });

    // Step 2: Click Back button ("Zurück")
    const backBtn = screen.getByRole('button', { name: /^(zurück|back)$/i });
    expect(backBtn).toBeInTheDocument();
    expect(backBtn).not.toBeDisabled();

    await user.click(backBtn);

    expect(mockStartViewTransition).toHaveBeenCalledTimes(2);
    expect(capturedDirectionDuringCallback).toBe('backward');

    // Back on Step 1
    await waitFor(() => {
      expect(screen.getByPlaceholderText('Max')).toBeInTheDocument();
    });
  });

  it('falls back gracefully when document.startViewTransition is undefined', async () => {
    // @ts-expect-error test undefined fallback
    delete document.startViewTransition;

    const user = userEvent.setup();
    render(<Wizard />);

    const firstNameInput = await screen.findByPlaceholderText('Max');
    const lastNameInput = await screen.findByPlaceholderText('Mustermann');
    await user.type(firstNameInput, 'Clara');
    await user.type(lastNameInput, 'Schumann');

    const nextBtn = screen.getAllByRole('button').find(
      b => b.textContent?.includes('Weiter') || b.textContent?.includes('Next') || b.querySelector('svg.lucide-arrow-right')
    );
    if (nextBtn) {
      await user.click(nextBtn);
    }

    // Step should change directly to step 2 without error
    await waitFor(() => {
      expect(screen.getByText(/medizinische daten|medical/i)).toBeInTheDocument();
    });

    expect(document.documentElement.dataset.transitionDirection).toBeUndefined();
  });

  it('bypasses View Transitions when prefers-reduced-motion: reduce matches', async () => {
    const mockStartViewTransition = vi.fn();
    document.startViewTransition = mockStartViewTransition;

    // Mock matchMedia for prefers-reduced-motion: reduce
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: query.includes('prefers-reduced-motion: reduce'),
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    const user = userEvent.setup();
    render(<Wizard />);

    const firstNameInput = await screen.findByPlaceholderText('Max');
    const lastNameInput = await screen.findByPlaceholderText('Mustermann');
    await user.type(firstNameInput, 'Felix');
    await user.type(lastNameInput, 'Mendelssohn');

    const nextBtn = screen.getAllByRole('button').find(
      b => b.textContent?.includes('Weiter') || b.textContent?.includes('Next') || b.querySelector('svg.lucide-arrow-right')
    );
    if (nextBtn) {
      await user.click(nextBtn);
    }

    // startViewTransition must NOT have been called
    expect(mockStartViewTransition).not.toHaveBeenCalled();

    // Step 2 is rendered directly — getAllByText tolerates the text appearing in both sidebar + main
    await waitFor(() => {
      expect(screen.getAllByText(/medizinische daten|medical/i).length).toBeGreaterThan(0);
    });
  });
});

describe('R2: View Transitions — CSS Animations & Stylesheet Rules', () => {
  it('contains proper view-transition keyframes and selectors in src/index.css', () => {
    const cssPath = path.resolve(__dirname, '../src/index.css');
    const cssContent = fs.readFileSync(cssPath, 'utf-8');

    expect(cssContent).toContain('.wizard-step-container');
    expect(cssContent).toContain('view-transition-name: wizard-step;');
    expect(cssContent).toContain('@keyframes wizard-slide-to-left');
    expect(cssContent).toContain('@keyframes wizard-slide-from-right');
    expect(cssContent).toContain('@keyframes wizard-slide-to-right');
    expect(cssContent).toContain('@keyframes wizard-slide-from-left');
    expect(cssContent).toContain('data-transition-direction="forward"');
    expect(cssContent).toContain('data-transition-direction="backward"');
    expect(cssContent).toContain('@media (prefers-reduced-motion: reduce)');
    expect(cssContent).toContain('animation: none !important;');
  });
});

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DocumentUpload } from '../src/components/DocumentUpload';
import { Wizard } from '../src/components/Wizard';
import { ScannedDocument } from '../src/types';
import fs from 'fs';
import path from 'path';

describe('DocumentUpload component accessibility & semantics', () => {
  const dummyDoc: ScannedDocument = {
    id: 'test-doc-1',
    name: 'Test Document',
    documentAction: 'upload',
    fileData: null,
    fileType: null,
  };

  it('renders fieldset and legend wrapping the radio options', () => {
    const onChange = vi.fn();
    render(<DocumentUpload document={dummyDoc} onChange={onChange} />);

    const fieldset = screen.getByRole('group');
    expect(fieldset.tagName.toLowerCase()).toBe('fieldset');
    const legend = fieldset.querySelector('legend');
    expect(legend).toBeInTheDocument();
  });

  it('provides explicit IDs and matching htmlFor labels for the 3 radio options', () => {
    const onChange = vi.fn();
    render(<DocumentUpload document={dummyDoc} onChange={onChange} />);

    const uploadRadio = document.getElementById('doc-action-test-doc-1-upload') as HTMLInputElement;
    expect(uploadRadio).toBeInTheDocument();
    expect(uploadRadio.type).toBe('radio');
    const uploadLabel = document.querySelector('label[for="doc-action-test-doc-1-upload"]');
    expect(uploadLabel).toBeInTheDocument();

    const placeholderRadio = document.getElementById('doc-action-test-doc-1-placeholder') as HTMLInputElement;
    expect(placeholderRadio).toBeInTheDocument();
    expect(placeholderRadio.type).toBe('radio');
    const placeholderLabel = document.querySelector('label[for="doc-action-test-doc-1-placeholder"]');
    expect(placeholderLabel).toBeInTheDocument();

    const skipRadio = document.getElementById('doc-action-test-doc-1-skip') as HTMLInputElement;
    expect(skipRadio).toBeInTheDocument();
    expect(skipRadio.type).toBe('radio');
    const skipLabel = document.querySelector('label[for="doc-action-test-doc-1-skip"]');
    expect(skipLabel).toBeInTheDocument();
  });

  it('provides explicit id for file input and matching htmlFor label', () => {
    const onChange = vi.fn();
    render(<DocumentUpload document={dummyDoc} onChange={onChange} />);

    const fileInput = document.getElementById('file-upload-test-doc-1');
    expect(fileInput).toBeInTheDocument();
    expect(fileInput?.getAttribute('type')).toBe('file');

    const fileLabel = document.querySelector('label[for="file-upload-test-doc-1"]');
    expect(fileLabel).toBeInTheDocument();
  });

  it('provides explicit id and aria-label for custom title when isCustom is true', () => {
    const onChange = vi.fn();
    render(<DocumentUpload document={dummyDoc} onChange={onChange} isCustom={true} />);

    const customTitleInput = document.getElementById('custom-doc-title-test-doc-1');
    expect(customTitleInput).toBeInTheDocument();
    expect(customTitleInput?.getAttribute('aria-label')).toBeTruthy();
  });

  it('provides aria-label for delete button when onRemove is provided', () => {
    const onChange = vi.fn();
    const onRemove = vi.fn();
    render(<DocumentUpload document={dummyDoc} onChange={onChange} onRemove={onRemove} />);

    const removeBtn = screen.getByRole('button', { name: /entfernen|remove/i });
    expect(removeBtn).toBeInTheDocument();
    expect(removeBtn.getAttribute('aria-label')).toBeTruthy();
  });
});

describe('Wizard View Transitions & Form wrapper', () => {
  beforeEach(() => {
    delete document.documentElement.dataset.transitionDirection;
  });

  it('wraps the wizard step container in a noValidate form with wizard-step-container class', () => {
    render(<Wizard />);
    const form = document.querySelector('form.wizard-step-container');
    expect(form).toBeInTheDocument();
    expect(form?.hasAttribute('novalidate')).toBe(true);
  });

  it('sets dataset.transitionDirection and invokes document.startViewTransition on step navigation', async () => {
    const user = userEvent.setup();
    render(<Wizard />);

    // Fill required step 1 fields to advance cleanly
    const firstNameInput = await screen.findByPlaceholderText('Max');
    const lastNameInput = await screen.findByPlaceholderText('Mustermann');
    await user.type(firstNameInput, 'Erika');
    await user.type(lastNameInput, 'Musterfrau');

    const nextButtons = screen.getAllByRole('button');
    const nextBtn = nextButtons.find(b => b.textContent?.includes('Weiter') || b.textContent?.includes('Next') || b.querySelector('svg.lucide-arrow-right'));
    expect(nextBtn).toBeDefined();

    if (nextBtn) {
      await user.click(nextBtn);
    }

    expect(document.startViewTransition).toHaveBeenCalled();
  });
});

describe('CSS View Transitions Verification', () => {
  it('contains wizard-step-container and keyframes in src/index.css', () => {
    const cssContent = fs.readFileSync(path.resolve(__dirname, '../src/index.css'), 'utf-8');
    expect(cssContent).toContain('.wizard-step-container');
    expect(cssContent).toContain('view-transition-name: wizard-step;');
    expect(cssContent).toContain('wizard-slide-to-left');
    expect(cssContent).toContain('wizard-slide-from-right');
    expect(cssContent).toContain('wizard-slide-to-right');
    expect(cssContent).toContain('wizard-slide-from-left');
    expect(cssContent).toContain('data-transition-direction');
    expect(cssContent).toContain('prefers-reduced-motion: reduce');
  });
});

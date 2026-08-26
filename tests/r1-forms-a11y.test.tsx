import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from '../src/Input';
import { Select } from '../src/Select';
import { Textarea } from '../src/Textarea';
import { DocumentUpload } from '../src/components/DocumentUpload';
import { Wizard } from '../src/components/Wizard';
import { ScannedDocument } from '../src/types';

describe('R1: Forms & Accessibility — Input Component', () => {
  it('renders label with htmlFor matching input id and supports custom id', () => {
    render(<Input id="custom-test-id" label="Vorname" />);
    const label = screen.getByText('Vorname');
    const input = screen.getByLabelText('Vorname');

    expect(label.getAttribute('for')).toBe('custom-test-id');
    expect(input.id).toBe('custom-test-id');
    expect(input.getAttribute('aria-invalid')).toBe('false');
  });

  it('generates deterministic id from name prop when id is omitted', () => {
    render(<Input name="user.firstName" label="Vorname" />);
    const label = screen.getByText('Vorname');
    const input = screen.getByLabelText('Vorname');

    expect(label.getAttribute('for')).toBe('user-firstName');
    expect(input.id).toBe('user-firstName');
  });

  it('renders error message with role="alert", sets aria-invalid="true" and links aria-describedby', () => {
    render(
      <Input
        id="email-input"
        label="E-Mail"
        error="Bitte gültige E-Mail eingeben"
      />
    );

    const input = screen.getByLabelText('E-Mail');
    expect(input.getAttribute('aria-invalid')).toBe('true');
    expect(input.getAttribute('aria-describedby')).toBe('email-input-error');

    const alertElement = screen.getByRole('alert');
    expect(alertElement).toBeInTheDocument();
    expect(alertElement.id).toBe('email-input-error');
    expect(alertElement).toHaveTextContent('Bitte gültige E-Mail eingeben');
  });

  it('renders description with linked aria-describedby', () => {
    render(
      <Input
        id="tax-id"
        label="Steuer-ID"
        description="11-stellige Nummer"
      />
    );

    const input = screen.getByLabelText('Steuer-ID');
    expect(input.getAttribute('aria-describedby')).toBe('tax-id-desc');
    const descElement = screen.getByText('11-stellige Nummer');
    expect(descElement.id).toBe('tax-id-desc');
  });

  it('combines description and error IDs in aria-describedby when both are present', () => {
    render(
      <Input
        id="full-input"
        label="Postleitzahl"
        description="5 Ziffern"
        error="PLZ ist ungültig"
      />
    );

    const input = screen.getByLabelText('Postleitzahl');
    expect(input.getAttribute('aria-invalid')).toBe('true');
    expect(input.getAttribute('aria-describedby')).toBe('full-input-desc full-input-error');
  });

  it('forwards autoComplete and inputMode attributes correctly', () => {
    render(
      <Input
        id="phone-input"
        label="Telefon"
        autoComplete="tel"
        inputMode="tel"
      />
    );

    const input = screen.getByLabelText('Telefon');
    expect(input.getAttribute('autocomplete')).toBe('tel');
    expect(input.getAttribute('inputmode')).toBe('tel');
  });
});

describe('R1: Forms & Accessibility — Select Component', () => {
  const sampleOptions = [
    { value: 'herr', label: 'Herr' },
    { value: 'frau', label: 'Frau' },
    { value: 'divers', label: 'Divers' },
  ];

  it('renders label with htmlFor matching select id', () => {
    render(
      <Select
        id="salutation-select"
        label="Anrede"
        options={sampleOptions}
      />
    );

    const label = screen.getByText('Anrede');
    const select = screen.getByLabelText('Anrede');

    expect(label.getAttribute('for')).toBe('salutation-select');
    expect(select.id).toBe('salutation-select');
    expect(select.getAttribute('aria-invalid')).toBe('false');
  });

  it('handles error state with aria-invalid="true", aria-describedby and role="alert"', () => {
    render(
      <Select
        id="salutation-select"
        label="Anrede"
        options={sampleOptions}
        error="Bitte wählen Sie eine Anrede aus."
      />
    );

    const select = screen.getByLabelText('Anrede');
    expect(select.getAttribute('aria-invalid')).toBe('true');
    expect(select.getAttribute('aria-describedby')).toBe('salutation-select-error');

    const alertElement = screen.getByRole('alert');
    expect(alertElement).toBeInTheDocument();
    expect(alertElement.id).toBe('salutation-select-error');
    expect(alertElement).toHaveTextContent('Bitte wählen Sie eine Anrede aus.');
  });

  it('renders all options and default selection placeholder', () => {
    render(
      <Select
        id="test-options-select"
        label="Auswahl"
        options={sampleOptions}
      />
    );

    const options = screen.getAllByRole('option');
    expect(options.length).toBe(4); // 1 default placeholder + 3 options
    expect(options[1]).toHaveValue('herr');
    expect(options[2]).toHaveValue('frau');
    expect(options[3]).toHaveValue('divers');
  });
});

describe('R1: Forms & Accessibility — Textarea Component', () => {
  it('renders label and description correctly linked to textarea', () => {
    const handleChange = vi.fn();
    render(
      <Textarea
        id="notes-area"
        label="Zusätzliche Notizen"
        description="Freitext für besondere Anmerkungen"
        value="Erste Zeile"
        onChange={handleChange}
        placeholder="Hinweise eintragen..."
      />
    );

    const label = screen.getByText('Zusätzliche Notizen');
    expect(label.getAttribute('for')).toBe('notes-area');

    const description = screen.getByText('Freitext für besondere Anmerkungen');
    expect(description.id).toBe('notes-area-desc');

    const textarea = document.getElementById('notes-area');
    expect(textarea).toBeInTheDocument();
    expect(textarea?.getAttribute('aria-describedby')).toBe('notes-area-desc');
  });
});

describe('R1: Forms & Accessibility — DocumentUpload Component', () => {
  const baseDocument: ScannedDocument = {
    id: 'passport-doc',
    name: 'Reisepass',
    documentAction: 'upload',
    fileData: null,
    fileType: null,
  };

  it('renders fieldset and legend wrapping radio options', () => {
    const onChange = vi.fn();
    render(<DocumentUpload document={baseDocument} onChange={onChange} />);

    const fieldset = screen.getByRole('group');
    expect(fieldset.tagName.toLowerCase()).toBe('fieldset');
    const legend = fieldset.querySelector('legend');
    expect(legend).toBeInTheDocument();
  });

  it('provides accessible radio buttons with matching id and label for each action', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<DocumentUpload document={baseDocument} onChange={onChange} />);

    const uploadRadio = document.getElementById('doc-action-passport-doc-upload') as HTMLInputElement;
    const placeholderRadio = document.getElementById('doc-action-passport-doc-placeholder') as HTMLInputElement;
    const skipRadio = document.getElementById('doc-action-passport-doc-skip') as HTMLInputElement;

    expect(uploadRadio).toBeInTheDocument();
    expect(uploadRadio.checked).toBe(true);
    expect(placeholderRadio.checked).toBe(false);
    expect(skipRadio.checked).toBe(false);

    expect(document.querySelector('label[for="doc-action-passport-doc-upload"]')).toBeInTheDocument();
    expect(document.querySelector('label[for="doc-action-passport-doc-placeholder"]')).toBeInTheDocument();
    expect(document.querySelector('label[for="doc-action-passport-doc-skip"]')).toBeInTheDocument();

    await user.click(placeholderRadio);
    expect(onChange).toHaveBeenCalledWith(expect.objectContaining({
      documentAction: 'placeholder',
      fileData: null,
      fileType: null
    }));
  });

  it('renders accessible file upload input and label in upload mode', () => {
    const onChange = vi.fn();
    render(<DocumentUpload document={baseDocument} onChange={onChange} />);

    const fileInput = document.getElementById('file-upload-passport-doc') as HTMLInputElement;
    expect(fileInput).toBeInTheDocument();
    expect(fileInput.type).toBe('file');
    expect(fileInput.accept).toContain('application/pdf');

    const fileLabel = document.querySelector('label[for="file-upload-passport-doc"]');
    expect(fileLabel).toBeInTheDocument();
  });

  it('supports custom document title with explicit id and aria-label', () => {
    const onChange = vi.fn();
    const customDoc: ScannedDocument = {
      id: 'custom-doc-99',
      name: 'Mein Zusatzzertifikat',
      documentAction: 'upload',
      fileData: null,
      fileType: null,
    };

    render(<DocumentUpload document={customDoc} onChange={onChange} isCustom={true} />);

    const customTitleInput = document.getElementById('custom-doc-title-custom-doc-99') as HTMLInputElement;
    expect(customTitleInput).toBeInTheDocument();
    expect(customTitleInput.value).toBe('Mein Zusatzzertifikat');
    expect(customTitleInput.getAttribute('aria-label')).toBeTruthy();
  });

  it('renders remove button with aria-label when onRemove is provided', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const onRemove = vi.fn();

    render(<DocumentUpload document={baseDocument} onChange={onChange} onRemove={onRemove} />);

    const removeButton = screen.getByRole('button', { name: /entfernen|remove/i });
    expect(removeButton).toBeInTheDocument();
    expect(removeButton.getAttribute('aria-label')).toBeTruthy();

    await user.click(removeButton);
    expect(onRemove).toHaveBeenCalledTimes(1);
  });
});

describe('R1: Forms & Accessibility — Wizard Validation & Warning Modal', () => {
  it('renders the wizard within a noValidate form with wizard-step-container class', () => {
    render(<Wizard />);
    const form = document.querySelector('form.wizard-step-container');
    expect(form).toBeInTheDocument();
    expect(form?.hasAttribute('novalidate')).toBe(true);
  });

  it('triggers warning modal on Step 1 when required fields are invalid/empty and allows user to check inputs', async () => {
    const user = userEvent.setup();
    render(<Wizard />);

    // Step 1 required fields (firstName & lastName) are initially empty
    const nextButtons = screen.getAllByRole('button');
    const nextBtn = nextButtons.find(
      b => b.textContent?.includes('Weiter') || b.textContent?.includes('Next') || b.querySelector('svg.lucide-arrow-right')
    );
    expect(nextBtn).toBeDefined();

    if (nextBtn) {
      await user.click(nextBtn);
    }

    // Warning modal should appear — use getAllByText to tolerate heading + description matching
    await waitFor(() => {
      expect(screen.getAllByText(/angaben unvollständig|unvollständig|warning|hinweis|notice|incomplete/i).length).toBeGreaterThan(0);
    });

    // Click "Angaben prüfen" to close modal and stay on Step 1
    const checkInputsBtn = screen.getByRole('button', { name: /angaben prüfen|eingaben überprüfen|check inputs|review inputs/i });
    await user.click(checkInputsBtn);

    await waitFor(() => {
      expect(screen.queryByText(/angaben unvollständig|unvollständig|warning|hinweis|notice|incomplete/i)).not.toBeInTheDocument();
    });

    // We should still be on Step 1 (e.g. Salutation / Name inputs visible)
    expect(screen.getByPlaceholderText('Max')).toBeInTheDocument();
  });

  it('allows user to bypass validation warning via "continue anyway" button', async () => {
    const user = userEvent.setup();
    render(<Wizard />);

    const nextButtons = screen.getAllByRole('button');
    const nextBtn = nextButtons.find(
      b => b.textContent?.includes('Weiter') || b.textContent?.includes('Next') || b.querySelector('svg.lucide-arrow-right')
    );
    expect(nextBtn).toBeDefined();

    if (nextBtn) {
      await user.click(nextBtn);
    }

    await waitFor(() => {
      expect(screen.getAllByText(/angaben unvollständig|unvollständig|warning|hinweis|notice|incomplete/i).length).toBeGreaterThan(0);
    });

    // Click "Trotzdem fortfahren"
    const continueBtn = screen.getByRole('button', { name: /trotzdem fortfahren|trotzdem weiter|continue anyway/i });
    await user.click(continueBtn);

    await waitFor(() => {
      expect(screen.queryByText(/angaben unvollständig|unvollständig|warning|hinweis|notice|incomplete/i)).not.toBeInTheDocument();
    });

    // Step 2 (Medizinische Daten) should now load
    await waitFor(() => {
      expect(screen.getByText(/medizinische daten|medical/i)).toBeInTheDocument();
    });
  });

  it('advances directly to Step 2 without modal when required fields are properly filled', async () => {
    const user = userEvent.setup();
    render(<Wizard />);

    const firstNameInput = await screen.findByPlaceholderText('Max');
    const lastNameInput = await screen.findByPlaceholderText('Mustermann');

    await user.type(firstNameInput, 'Johannes');
    await user.type(lastNameInput, 'Gutenberg');

    const nextButtons = screen.getAllByRole('button');
    const nextBtn = nextButtons.find(
      b => b.textContent?.includes('Weiter') || b.textContent?.includes('Next') || b.querySelector('svg.lucide-arrow-right')
    );
    expect(nextBtn).toBeDefined();

    if (nextBtn) {
      await user.click(nextBtn);
    }

    // Modal should NOT appear
    expect(screen.queryByText(/angaben unvollständig|unvollständig|warning|hinweis|notice|incomplete/i)).not.toBeInTheDocument();

    // Step 2 should load — use getAllByText since sidebar also contains this step title
    await waitFor(() => {
      expect(screen.getAllByText(/medizinische daten|medical/i).length).toBeGreaterThan(0);
    });
  });
});

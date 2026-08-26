import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../src/App';
import { Welcome } from '../src/components/Welcome';
import { encryptBackup, decryptBackup } from '../src/utils/crypto';
import { initialFormData } from '../src/types';

describe('E2E Workflow — User Journey: Welcome -> Wizard -> Form Input', () => {
  beforeEach(() => {
    sessionStorage.clear();
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('renders Welcome screen initially and transitions to Wizard on Start click', async () => {
    const user = userEvent.setup();
    render(<App />);

    // Welcome title & start button — use getAllByText since the title may appear in multiple places
    expect(screen.getAllByText(/vorsorge treffen|take precautions|notfallakte|emergency dossier/i).length).toBeGreaterThan(0);
    const startBtn = screen.getByRole('button', { name: /notfallakte anlegen|start|jetzt starten/i });
    expect(startBtn).toBeInTheDocument();

    // Click Start
    await user.click(startBtn);

    // Should transition to Wizard Step 1
    await waitFor(() => {
      expect(screen.getByPlaceholderText('Max')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Mustermann')).toBeInTheDocument();
    });

    // Form inputs can be entered and modified
    const firstNameInput = screen.getByPlaceholderText('Max');
    const lastNameInput = screen.getByPlaceholderText('Mustermann');
    await user.type(firstNameInput, 'Ludwig');
    await user.type(lastNameInput, 'Beethoven');

    expect(firstNameInput).toHaveValue('Ludwig');
    expect(lastNameInput).toHaveValue('Beethoven');
  });
});

describe('E2E Workflow — WebCrypto PBKDF2 + AES-GCM Backup Encryption', () => {
  const sampleData = {
    ...initialFormData,
    firstName: 'Maximilian',
    lastName: 'Mustermann',
    medicalData: {
      ...initialFormData.medicalData,
      bloodType: '0+',
      allergies: 'Penicillin, Pollen & Nüsse',
    },
    generalNotes: 'Wichtiger Tresorcode: 1234-ABCD §%&! äöüß',
  };

  it('performs full encrypt and decrypt round-trip with correct password', async () => {
    const password = 'StrongMasterPassword123!';
    const jsonString = JSON.stringify(sampleData);

    const encryptedBase64 = await encryptBackup(jsonString, password);
    expect(typeof encryptedBase64).toBe('string');
    expect(encryptedBase64.length).toBeGreaterThan(32);
    // Ciphertext should not contain plaintext
    expect(encryptedBase64).not.toContain('Maximilian');
    expect(encryptedBase64).not.toContain('Tresorcode');

    const decryptedString = await decryptBackup(encryptedBase64, password);
    expect(decryptedString).toBe(jsonString);

    const parsedData = JSON.parse(decryptedString);
    expect(parsedData.firstName).toBe('Maximilian');
    expect(parsedData.medicalData.allergies).toBe('Penicillin, Pollen & Nüsse');
    expect(parsedData.generalNotes).toBe('Wichtiger Tresorcode: 1234-ABCD §%&! äöüß');
  });

  it('fails decryption and throws when supplied with an invalid password', async () => {
    const correctPassword = 'CorrectPassword999!';
    const wrongPassword = 'WrongPassword000!';
    const jsonString = JSON.stringify(sampleData);

    const encryptedBase64 = await encryptBackup(jsonString, correctPassword);

    await expect(decryptBackup(encryptedBase64, wrongPassword)).rejects.toThrow();
  });
});

describe('E2E Workflow — Encrypted Backup Import on Welcome Screen', () => {
  beforeEach(() => {
    sessionStorage.clear();
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('prompts for password and decrypts .enc backup file into sessionStorage and launches Wizard', async () => {
    const user = userEvent.setup();
    const mockOnStart = vi.fn();

    const backupPayload = {
      ...initialFormData,
      firstName: 'Albrecht',
      lastName: 'Dürer',
      city: 'Nürnberg',
    };
    const password = 'SecretBackupPassword!';
    const encryptedContent = await encryptBackup(JSON.stringify(backupPayload), password);

    const encFile = new File([encryptedContent], 'Notfallakte_Backup.enc', { type: 'text/plain' });

    render(<Welcome onStart={mockOnStart} />);

    // Find file input on welcome screen
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    expect(fileInput).toBeInTheDocument();

    // Upload encrypted backup file
    await user.upload(fileInput, encFile);

    // Password modal should appear
    await waitFor(() => {
      expect(screen.getByText(/backup entschlüsseln|decrypt/i)).toBeInTheDocument();
    });

    // Enter password
    const passwordInput = screen.getByPlaceholderText(/passwort|password/i);
    await user.type(passwordInput, password);

    // Click decrypt button
    const decryptBtn = screen.getByRole('button', { name: /entschlüsseln|decrypt/i });
    await user.click(decryptBtn);

    // Should call onStart and save data into sessionStorage
    await waitFor(() => {
      expect(mockOnStart).toHaveBeenCalledTimes(1);
      const stored = sessionStorage.getItem('notfallakte_data');
      expect(stored).toBeTruthy();
      if (stored) {
        const parsed = JSON.parse(stored);
        expect(parsed.firstName).toBe('Albrecht');
        expect(parsed.lastName).toBe('Dürer');
        expect(parsed.city).toBe('Nürnberg');
      }
    });
  });

  it('shows error if password field is submitted empty', async () => {
    const user = userEvent.setup();
    const mockOnStart = vi.fn();
    const encryptedContent = await encryptBackup(JSON.stringify(initialFormData), 'somePassword');
    const encFile = new File([encryptedContent], 'Notfallakte_Backup.enc', { type: 'text/plain' });

    render(<Welcome onStart={mockOnStart} />);

    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    await user.upload(fileInput, encFile);

    await waitFor(() => {
      expect(screen.getByText(/backup entschlüsseln|decrypt/i)).toBeInTheDocument();
    });

    // Click decrypt without entering password
    const decryptBtn = screen.getByRole('button', { name: /entschlüsseln|decrypt/i });
    await user.click(decryptBtn);

    expect(screen.getAllByText(/bitte gib das passwort ein|enter password/i).length).toBeGreaterThan(0);
    expect(mockOnStart).not.toHaveBeenCalled();
  });
});

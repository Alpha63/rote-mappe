import { describe, expect, it } from 'vitest';
import { decryptBackup, encryptBackup } from '../src/utils/crypto';

describe('encrypted backups', () => {
  it('round-trips data with the correct password', async () => {
    const payload = JSON.stringify({ firstName: 'Erika', notes: 'lokal' });
    const encrypted = await encryptBackup(payload, 'sicheres-passwort');

    await expect(decryptBackup(encrypted, 'sicheres-passwort')).resolves.toBe(payload);
  });

  it('rejects malformed or too-short ciphertext before decrypting', async () => {
    await expect(decryptBackup('not-base64', 'password')).rejects.toThrow(
      'Ungültiges oder beschädigtes verschlüsseltes Backup.'
    );
    await expect(decryptBackup('AQ==', 'password')).rejects.toThrow(
      'Ungültiges oder beschädigtes verschlüsseltes Backup.'
    );
  });

  it('does not expose whether a wrong password or tampered data caused authentication failure', async () => {
    const encrypted = await encryptBackup('private data', 'correct-password');
    const bytes = Uint8Array.from(atob(encrypted), character => character.charCodeAt(0));
    bytes[bytes.length - 1] ^= 1;
    const tampered = btoa(String.fromCharCode(...bytes));

    await expect(decryptBackup(tampered, 'correct-password')).rejects.toThrow(
      'Das Backup konnte nicht entschlüsselt werden. Bitte prüfe das Passwort oder die Datei.'
    );
    await expect(decryptBackup(encrypted, 'wrong-password')).rejects.toThrow(
      'Das Backup konnte nicht entschlüsselt werden. Bitte prüfe das Passwort oder die Datei.'
    );
  });
});

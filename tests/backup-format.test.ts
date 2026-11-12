import { describe, expect, it } from 'vitest';
import { initialFormData } from '../src/types';
import { createBackupEnvelope } from '../src/utils/backupFormat';
import { migrateData } from '../src/utils/migrateData';

describe('backup format compatibility', () => {
  it('loads the versioned envelope and preserves its form data', () => {
    const envelope = createBackupEnvelope({ ...initialFormData, firstName: 'Erika' });

    expect(migrateData(envelope).firstName).toBe('Erika');
  });

  it('continues to load legacy unversioned backups', () => {
    expect(migrateData({ ...initialFormData, lastName: 'Musterfrau' }).lastName).toBe('Musterfrau');
  });

  it('rejects a future backup version explicitly', () => {
    expect(() => migrateData({
      formatVersion: 999,
      exportedAt: new Date().toISOString(),
      data: initialFormData,
    })).toThrow('Diese Backup-Version wird nicht unterstützt.');
  });
});

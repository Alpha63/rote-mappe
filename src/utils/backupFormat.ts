import { FormData } from '../types';

export const CURRENT_BACKUP_FORMAT_VERSION = 1;

export interface BackupEnvelope {
  formatVersion: number;
  exportedAt: string;
  data: FormData;
}

export class BackupFormatError extends Error {
  readonly code: 'invalid' | 'unsupported';

  constructor(code: 'invalid' | 'unsupported') {
    super(code === 'unsupported'
      ? 'Diese Backup-Version wird nicht unterstützt.'
      : 'Das Backup enthält keine gültigen Formulardaten.');
    this.name = 'BackupFormatError';
    this.code = code;
  }
}

export function createBackupEnvelope(data: FormData): BackupEnvelope {
  return {
    formatVersion: CURRENT_BACKUP_FORMAT_VERSION,
    exportedAt: new Date().toISOString(),
    data,
  };
}

export function serializeBackup(data: FormData): string {
  return JSON.stringify(createBackupEnvelope(data), null, 2);
}

export function unwrapBackupData(value: unknown): unknown {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    throw new BackupFormatError('invalid');
  }

  const record = value as Record<string, unknown>;
  if (!('formatVersion' in record) && !('data' in record)) {
    return value;
  }

  if (typeof record.formatVersion !== 'number' || !('data' in record)) {
    throw new BackupFormatError('invalid');
  }

  if (record.formatVersion > CURRENT_BACKUP_FORMAT_VERSION) {
    throw new BackupFormatError('unsupported');
  }

  if (!record.data || typeof record.data !== 'object' || Array.isArray(record.data)) {
    throw new BackupFormatError('invalid');
  }

  return record.data;
}

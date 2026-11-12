import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { FormProvider, useFormContext } from '../src/FormContext';

describe('backup button state', () => {
  it('rejects duplicate downloads while the first export is pending', async () => {
    let resolveExport!: () => void;
    const exportPending = new Promise<void>(resolve => { resolveExport = resolve; });
    vi.doMock('../src/utils/exportGenerator', () => ({
      generateAndDownloadZip: vi.fn(() => exportPending),
    }));

    const { result } = renderHook(() => useFormContext(), {
      wrapper: ({ children }) => <FormProvider>{children}</FormProvider>,
    });

    let first!: Promise<boolean>;
    await act(async () => {
      first = result.current.downloadBackup();
      await Promise.resolve();
    });
    expect(result.current.isDownloading).toBe(true);
    await expect(result.current.downloadBackup()).resolves.toBe(false);

    await act(async () => {
      resolveExport();
      await first;
    });
    expect(result.current.isDownloading).toBe(false);
  });
});

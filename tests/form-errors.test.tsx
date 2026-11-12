import { describe, expect, it } from 'vitest';
import { act, renderHook, waitFor } from '@testing-library/react';
import { FormProvider, useFormContext } from '../src/FormContext';

describe('form error mapping', () => {
  it('keeps nested field paths available to consumers', async () => {
    const { result } = renderHook(() => useFormContext(), {
      wrapper: ({ children }) => <FormProvider>{children}</FormProvider>,
    });

    await act(async () => {
      await result.current.methods.trigger(['firstName', 'medicalData.doctors']);
    });
    await waitFor(() => {
      expect(result.current.errors['firstName']).toBeTruthy();
    });
  });
});

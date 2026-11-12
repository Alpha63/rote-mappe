import { describe, expect, it } from 'vitest';
import { fieldsForStep } from '../src/components/wizardFields';
import { initialFormData } from '../src/types';

describe('wizard field inventory', () => {
  it('assigns every persisted form field to a validation step', () => {
    const assigned = new Set(Object.values(fieldsForStep).flat());
    const persistedFields = Object.keys(initialFormData);
    expect(persistedFields.filter(field => !assigned.has(field))).toEqual([]);
  });
});

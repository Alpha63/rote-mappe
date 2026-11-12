import { describe, expect, it } from 'vitest';
import { de } from '../src/locales/de';
import { en } from '../src/locales/en';

const flattenKeys = (value: unknown, prefix = ''): string[] => {
  if (!value || typeof value !== 'object') return prefix ? [prefix] : [];

  return Object.entries(value).flatMap(([key, child]) => {
    const path = prefix ? `${prefix}.${key}` : key;
    return flattenKeys(child, path);
  });
};

describe('locale resources', () => {
  it('keep German and English translation key trees in sync', () => {
    const germanKeys = flattenKeys(de).sort();
    const englishKeys = flattenKeys(en).sort();

    expect(germanKeys).toEqual(englishKeys);
  });
});

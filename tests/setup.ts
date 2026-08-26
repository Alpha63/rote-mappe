import '@testing-library/jest-dom/vitest';
import { afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import '../src/i18n'; // initialize i18n for tests

const createStorageMock = () => {
  let store: Record<string, string> = {};
  return {
    getItem: vi.fn((key: string) => store[key] ?? null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value.toString();
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key];
    }),
    clear: vi.fn(() => {
      store = {};
    }),
    key: vi.fn((index: number) => Object.keys(store)[index] || null),
    get length() {
      return Object.keys(store).length;
    },
  };
};

if (!window.localStorage || typeof window.localStorage.getItem !== 'function') {
  Object.defineProperty(window, 'localStorage', {
    value: createStorageMock(),
    writable: true,
  });
}
if (!window.sessionStorage || typeof window.sessionStorage.getItem !== 'function') {
  Object.defineProperty(window, 'sessionStorage', {
    value: createStorageMock(),
    writable: true,
  });
}

// Clean up DOM and storage after each test
afterEach(() => {
  cleanup();
  window.sessionStorage.clear();
  window.localStorage.clear();
  vi.clearAllMocks();
  delete document.documentElement.dataset.transitionDirection;
});

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock window.scrollTo
Object.defineProperty(window, 'scrollTo', {
  writable: true,
  value: vi.fn(),
});

// Mock document.startViewTransition
Object.defineProperty(document, 'startViewTransition', {
  writable: true,
  configurable: true,
  value: vi.fn().mockImplementation((cb?: unknown) => {
    if (typeof cb === 'function') {
      cb();
    } else if (cb && typeof cb === 'object' && 'update' in cb && typeof (cb as { update: unknown }).update === 'function') {
      (cb as { update: () => void }).update();
    }
    return {
      finished: Promise.resolve(),
      ready: Promise.resolve(),
      updateCallbackDone: Promise.resolve(),
      skipTransition: vi.fn(),
    };
  }),
});

// Ensure window.crypto has WebCrypto SubtleCrypto
if (!window.crypto || !window.crypto.subtle) {
  Object.defineProperty(window, 'crypto', {
    value: globalThis.crypto,
  });
}

// Mock URL.createObjectURL and URL.revokeObjectURL
if (!window.URL.createObjectURL) {
  window.URL.createObjectURL = vi.fn(() => 'blob:mock-url');
}
if (!window.URL.revokeObjectURL) {
  window.URL.revokeObjectURL = vi.fn();
}

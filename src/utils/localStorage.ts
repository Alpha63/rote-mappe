const DATABASE_NAME = 'rote-mappe';
const STORE_NAME = 'form-state';
const STATE_KEY = 'current';

function getIndexedDb(): IDBFactory | null {
  return typeof indexedDB === 'undefined' ? null : indexedDB;
}

export async function loadLocalFormState(): Promise<string | null> {
  const database = getIndexedDb();
  if (!database) return null;

  return new Promise((resolve) => {
    const request = database.open(DATABASE_NAME, 1);
    request.onerror = () => resolve(null);
    request.onupgradeneeded = () => {
      request.result.createObjectStore(STORE_NAME);
    };
    request.onsuccess = () => {
      const transaction = request.result.transaction(STORE_NAME, 'readonly');
      const getRequest = transaction.objectStore(STORE_NAME).get(STATE_KEY);
      getRequest.onerror = () => resolve(null);
      getRequest.onsuccess = () => resolve(typeof getRequest.result === 'string' ? getRequest.result : null);
    };
  });
}

export async function saveLocalFormState(value: string): Promise<void> {
  const database = getIndexedDb();
  if (!database) throw new Error('IndexedDB ist nicht verfügbar.');

  await new Promise<void>((resolve, reject) => {
    const request = database.open(DATABASE_NAME, 1);
    request.onerror = () => reject(request.error ?? new Error('IndexedDB konnte nicht geöffnet werden.'));
    request.onupgradeneeded = () => {
      request.result.createObjectStore(STORE_NAME);
    };
    request.onsuccess = () => {
      const transaction = request.result.transaction(STORE_NAME, 'readwrite');
      transaction.onerror = () => reject(transaction.error ?? new Error('IndexedDB konnte nicht beschrieben werden.'));
      transaction.oncomplete = () => resolve();
      transaction.objectStore(STORE_NAME).put(value, STATE_KEY);
    };
  });
}

export async function clearLocalFormState(): Promise<void> {
  const database = getIndexedDb();
  if (!database) return;

  await new Promise<void>((resolve, reject) => {
    const request = database.open(DATABASE_NAME, 1);
    request.onerror = () => reject(request.error ?? new Error('IndexedDB konnte nicht geöffnet werden.'));
    request.onsuccess = () => {
      const transaction = request.result.transaction(STORE_NAME, 'readwrite');
      transaction.onerror = () => reject(transaction.error ?? new Error('IndexedDB konnte nicht gelöscht werden.'));
      transaction.oncomplete = () => resolve();
      transaction.objectStore(STORE_NAME).delete(STATE_KEY);
    };
  });
}

export async function getLocalStorageEstimate(): Promise<StorageEstimate | null> {
  if (!navigator.storage?.estimate) return null;
  return navigator.storage.estimate();
}

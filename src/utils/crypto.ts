// AES-GCM Encryption using Web Crypto API
// We use a PBKDF2 derived key from the user's password.

const ITERATIONS = 100000;
const SALT_LENGTH = 16;
const IV_LENGTH = 12;

const getPasswordKey = async (password: string) => {
  const enc = new TextEncoder();
  return crypto.subtle.importKey(
    'raw',
    enc.encode(password),
    'PBKDF2',
    false,
    ['deriveKey']
  );
};

const deriveKey = async (passwordKey: CryptoKey, salt: Uint8Array, keyUsage: ['encrypt'] | ['decrypt']) => {
  return crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt,
      iterations: ITERATIONS,
      hash: 'SHA-256',
    },
    passwordKey,
    { name: 'AES-GCM', length: 256 },
    false,
    keyUsage
  );
};

export const encryptBackup = async (data: string, password: string): Promise<string> => {
  const salt = crypto.getRandomValues(new Uint8Array(SALT_LENGTH));
  const iv = crypto.getRandomValues(new Uint8Array(IV_LENGTH));
  const passwordKey = await getPasswordKey(password);
  const aesKey = await deriveKey(passwordKey, salt, ['encrypt']);

  const enc = new TextEncoder();
  const encryptedContent = await crypto.subtle.encrypt(
    {
      name: 'AES-GCM',
      iv,
    },
    aesKey,
    enc.encode(data)
  );

  const encryptedContentArr = new Uint8Array(encryptedContent);
  const buff = new Uint8Array(salt.length + iv.length + encryptedContentArr.length);
  buff.set(salt, 0);
  buff.set(iv, salt.length);
  buff.set(encryptedContentArr, salt.length + iv.length);

  // Convert to Base64
  let base64String = '';
  const chunkSize = 8192;
  for (let i = 0; i < buff.length; i += chunkSize) {
    base64String += String.fromCharCode.apply(null, Array.from(buff.subarray(i, i + chunkSize)));
  }
  return btoa(base64String);
};

export const decryptBackup = async (encryptedBase64: string, password: string): Promise<string> => {
  const binaryString = atob(encryptedBase64);
  const buff = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    buff[i] = binaryString.charCodeAt(i);
  }

  const salt = buff.subarray(0, SALT_LENGTH);
  const iv = buff.subarray(SALT_LENGTH, SALT_LENGTH + IV_LENGTH);
  const data = buff.subarray(SALT_LENGTH + IV_LENGTH);

  const passwordKey = await getPasswordKey(password);
  const aesKey = await deriveKey(passwordKey, salt, ['decrypt']);

  const decryptedContent = await crypto.subtle.decrypt(
    {
      name: 'AES-GCM',
      iv,
    },
    aesKey,
    data
  );

  const dec = new TextDecoder();
  return dec.decode(decryptedContent);
};

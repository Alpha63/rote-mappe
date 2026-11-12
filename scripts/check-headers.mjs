const url = process.env.HEADER_CHECK_URL ?? 'http://127.0.0.1:4173/';
const response = await fetch(url);
if (!response.ok) throw new Error(`Preview returned HTTP ${response.status}`);

const required = [
  'content-security-policy',
  'x-content-type-options',
  'x-frame-options',
  'referrer-policy',
  'permissions-policy',
];

const missing = required.filter((header) => !response.headers.get(header));
if (missing.length > 0) {
  throw new Error(`Missing security headers: ${missing.join(', ')}`);
}

console.log(`Security headers verified for ${url}`);

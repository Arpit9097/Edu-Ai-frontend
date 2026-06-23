const viteApiUrl = import.meta.env.VITE_API_URL;

export const API_BASE_URL = (viteApiUrl ?? '').trim().replace(/\/+$/, '');

// Temporary diagnostics: remove once the deployed API URL is verified.
console.log('[config] VITE_API_URL:', viteApiUrl);
console.log('[config] Resolved API_BASE_URL:', API_BASE_URL);

if (!API_BASE_URL) {
  console.error('[config] VITE_API_URL is missing. Chat/auth requests will not reach the backend until it is set and the Vite app is restarted/rebuilt.');
}

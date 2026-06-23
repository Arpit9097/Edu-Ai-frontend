const viteApiUrl = import.meta.env.VITE_API_URL;

export const API_BASE_URL = (viteApiUrl ?? '').trim().replace(/\/+$/, '');

// Temporary diagnostics: remove once the deployed API URL is verified.
console.log('[config] VITE_API_URL:', viteApiUrl);
console.log('[config] Resolved API_BASE_URL:', API_BASE_URL);

export const AUTH_TOKEN_KEY = 'ad_admin_token';

export function getStoredToken(): string | null {
  try {
    return localStorage.getItem(AUTH_TOKEN_KEY);
  } catch {
    return null;
  }
}

export function setStoredToken(token: string): void {
  try {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
  } catch (err) {
    console.error('Failed to save auth token to localStorage', err);
  }
}

export function removeStoredToken(): void {
  try {
    localStorage.removeItem(AUTH_TOKEN_KEY);
  } catch (err) {
    console.error('Failed to remove auth token from localStorage', err);
  }
}

export async function authFetch(url: string, options: RequestInit = {}): Promise<Response> {
  const token = getStoredToken();
  const headers = new Headers(options.headers || {});

  if (token && !headers.has('Authorization')) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  return fetch(url, {
    ...options,
    headers,
    credentials: 'include',
  });
}

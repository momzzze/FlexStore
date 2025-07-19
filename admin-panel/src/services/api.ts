const BASE_URL = import.meta.env.VITE_API_URL || '';
import { store } from '@/store';

type RequestOptions = RequestInit & {
  headers?: Record<string, string>;
};

async function request<T>(
  method: string,
  url: string,
  data?: unknown,
  options: RequestOptions = {}
): Promise<T> {
  const state = store.getState();
  const token = state.auth.token;

  const config: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...options,
  };

  if (data) {
    config.body = JSON.stringify(data);
  }

  const response = await fetch(`${BASE_URL}${url}`, config);

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || 'Request failed');
  }

  return response.json();
}

export const api = {
  get: <T>(url: string, options?: RequestOptions) =>
    request<T>('GET', url, undefined, options),
  post: <T>(url: string, data?: unknown, options?: RequestOptions) =>
    request<T>('POST', url, data, options),
  put: <T>(url: string, data?: unknown, options?: RequestOptions) =>
    request<T>('PUT', url, data, options),
  delete: <T>(url: string, options?: RequestOptions) =>
    request<T>('DELETE', url, undefined, options),
};

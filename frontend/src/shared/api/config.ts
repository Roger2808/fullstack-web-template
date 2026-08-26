export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";

// TEMPORAL: no existe todavía un contexto de Clínicas.
// Se usa una única clínica de demostración hasta que ese contexto se implemente.
export const DEMO_CLINIC_ID = "00000000-0000-0000-0000-000000000001";

export const AUTH_TOKEN_STORAGE_KEY = "medicore.auth.token";

export function getStoredAuthToken(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(AUTH_TOKEN_STORAGE_KEY);
}

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
  ) {
    super(message);
  }
}

export async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const token = getStoredAuthToken();

  const response = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...init?.headers,
    },
  });

  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new ApiError(body?.message ?? "Ocurrió un error inesperado.", response.status);
  }

  if (response.status === 204) return undefined as T;
  return response.json();
}

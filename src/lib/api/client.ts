/**
 * HTTP client stub — replace fetch implementation when backend is ready.
 */

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly body?: unknown,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export type ApiClientConfig = {
  baseUrl: string;
  getAccessToken?: () => string | null;
};

const defaultBaseUrl =
  typeof import.meta !== "undefined" && import.meta.env?.VITE_API_URL
    ? String(import.meta.env.VITE_API_URL)
    : "/api";

let clientConfig: ApiClientConfig = { baseUrl: defaultBaseUrl };

export function configureApiClient(config: Partial<ApiClientConfig>) {
  clientConfig = { ...clientConfig, ...config };
}

export function getApiClientConfig(): ApiClientConfig {
  return clientConfig;
}

async function parseResponse<T>(response: Response): Promise<T> {
  const contentType = response.headers.get("content-type") ?? "";
  const body = contentType.includes("application/json")
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    throw new ApiError(
      typeof body === "object" && body && "message" in body
        ? String((body as { message: unknown }).message)
        : response.statusText,
      response.status,
      body,
    );
  }

  return body as T;
}

export async function apiGet<T>(path: string, init?: RequestInit): Promise<T> {
  const token = clientConfig.getAccessToken?.();
  const response = await fetch(`${clientConfig.baseUrl}${path}`, {
    ...init,
    method: "GET",
    headers: {
      Accept: "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...init?.headers,
    },
  });
  return parseResponse<T>(response);
}

export async function apiPost<T>(
  path: string,
  data?: unknown,
  init?: RequestInit,
): Promise<T> {
  const token = clientConfig.getAccessToken?.();
  const response = await fetch(`${clientConfig.baseUrl}${path}`, {
    ...init,
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...init?.headers,
    },
    body: data !== undefined ? JSON.stringify(data) : undefined,
  });
  return parseResponse<T>(response);
}

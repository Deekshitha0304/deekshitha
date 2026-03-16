import { env } from "./env";

const API_BASE_URL = env.API_URL;
const BROWSER_INTERNAL_API_BASE_URL = "/api";

async function getServerCookieHeader(): Promise<string | null> {
  if (typeof window !== "undefined") {
    return null;
  }

  try {
    const { cookies } = await import("next/headers");
    const cookieStore = await cookies();
    const serializedCookies = cookieStore
      .getAll()
      .map((cookie) => `${encodeURIComponent(cookie.name)}=${encodeURIComponent(cookie.value)}`)
      .join("; ");

    return serializedCookies || null;
  } catch {
    return null;
  }
}

async function getServerApiBaseUrlFromRequestHeaders(): Promise<string | null> {
  if (typeof window !== "undefined") {
    return null;
  }

  try {
    const { headers } = await import("next/headers");
    const headerStore = await headers();
    const host = headerStore.get("x-forwarded-host") ?? headerStore.get("host");
    if (!host) {
      return null;
    }

    const proto =
      headerStore.get("x-forwarded-proto") ??
      (host.includes("localhost") || host.includes("127.0.0.1") ? "http" : "https");

    return `${proto}://${host}/api`;
  } catch {
    return null;
  }
}

function withApiPrefix(baseUrl: string | undefined): string | null {
  if (!baseUrl) {
    return null;
  }

  return baseUrl.endsWith("/api") ? baseUrl : `${baseUrl}/api`;
}

async function buildRequestUrls(
  endpoint: string,
  isServer: boolean,
  method: string
): Promise<string[]> {
  const normalizedEndpoint = endpoint.startsWith("/api/")
    ? endpoint.slice(4)
    : endpoint;
  const isReadRequest = method === "GET" || method === "HEAD";
  const externalApiBaseUrl = withApiPrefix(API_BASE_URL);

  if (!isServer) {
    const browserCandidates = isReadRequest
      ? [BROWSER_INTERNAL_API_BASE_URL, externalApiBaseUrl]
      : [BROWSER_INTERNAL_API_BASE_URL, externalApiBaseUrl];

    return browserCandidates
      .filter((baseUrl): baseUrl is string => Boolean(baseUrl))
      .map((baseUrl) => `${baseUrl}${normalizedEndpoint}`);
  }

  const requestApiBaseUrl = await getServerApiBaseUrlFromRequestHeaders();
  const serverCandidates = [
    requestApiBaseUrl,
    process.env.NEXT_INTERNAL_API_URL,
    externalApiBaseUrl,
  ].filter((baseUrl): baseUrl is string => Boolean(baseUrl));

  return [...new Set(serverCandidates)].map((baseUrl) => `${baseUrl}${normalizedEndpoint}`);
}

export interface Task {
  id: string | number;
  title: string;
  description?: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
  createdAt: string;
  updatedAt: string;
}

export interface CreateTaskPayload {
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  completed?: boolean;
}

export interface ApiError extends Error {
  status?: number;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  email: string;
  password: string;
}

export interface AuthUser {
  id?: string | number;
  email?: string;
  [key: string]: unknown;
}

export interface AuthLoginResponse {
  token: string;
  user?: AuthUser;
}

export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const headers = new Headers(options.headers);
  const isServer = typeof window === "undefined";
  const method = (options.method ?? "GET").toUpperCase();
  const requestUrls = await buildRequestUrls(endpoint, isServer, method);
  if (requestUrls.length === 0) {
    const error = new Error(
      "Unable to resolve API base URL. Set NEXT_INTERNAL_API_URL or NEXT_PUBLIC_API_URL."
    ) as ApiError;
    error.status = 500;
    throw error;
  }
  const serverCookieHeader = isServer ? await getServerCookieHeader() : null;

  if (!headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  if (serverCookieHeader && !headers.has("cookie")) {
    headers.set("cookie", serverCookieHeader);
  }

  let lastNetworkError: unknown = null;

  for (const requestUrl of requestUrls) {
    try {
      const response = await fetch(requestUrl, {
        ...options,
        headers,
        cache: "no-store",
      });

      if (!response.ok) {
        const shouldTryNextUrl =
          requestUrls.length > 1 &&
          response.status === 404 &&
          (method === "GET" || method === "HEAD");

        if (shouldTryNextUrl) {
          continue;
        }

        const errorPayload = await response
          .json()
          .catch(() => null) as { error?: unknown } | null;
        const errorMessage =
          typeof errorPayload?.error === "string" && errorPayload.error.trim()
            ? errorPayload.error
            : `API request failed: ${response.status} ${response.statusText}`;
        const error = new Error(errorMessage) as ApiError;
        error.status = response.status;
        throw error;
      }

      return (await response.json()) as T;
    } catch (error) {
      const isHttpError = error instanceof Error && "status" in error;

      if (isHttpError) {
        throw error;
      }

      lastNetworkError = error;

      const message = error instanceof Error ? error.message : String(error);
      console.error(`Network error while requesting ${requestUrl}: ${message}`);
    }
  }

  throw lastNetworkError;
}

export const api = {
  auth: {
    login(payload: LoginPayload): Promise<AuthLoginResponse> {
      return apiRequest<AuthLoginResponse>("/auth/login", {
        method: "POST",
        body: JSON.stringify(payload),
      });
    },

    register(payload: RegisterPayload): Promise<unknown> {
      return apiRequest<unknown>("/auth/register", {
        method: "POST",
        body: JSON.stringify(payload),
      });
    },
  },

  getTasks(): Promise<Task[]> {
    return apiRequest<Task[]>("/tasks");
  },

  getTask(id: string | number): Promise<Task> {
    return apiRequest<Task>(`/api/tasks/${id}`);
  },

  createTask(task: CreateTaskPayload): Promise<Task> {
    return apiRequest<Task>("/tasks", {
      method: "POST",
      body: JSON.stringify(task),
    });
  },

  updateTask(
    id: string | number,
    updates: Partial<Omit<Task, "id" | "createdAt" | "updatedAt">>
  ): Promise<Task> {
    return apiRequest<Task>(`/tasks/${id}`, {
      method: "PATCH",
      body: JSON.stringify(updates),
    });
  },

  deleteTask(id: string | number): Promise<unknown> {
    return apiRequest<unknown>(`/tasks/${id}`, {
      method: "DELETE",
    });
  },
};

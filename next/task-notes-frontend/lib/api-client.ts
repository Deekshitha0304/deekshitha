import "server-only";

import { cookies, headers as nextHeaders } from "next/headers";
import { env } from "./env";
import type { ApiError, CreateTaskPayload, Task } from "./api";

function withApiPrefix(baseUrl: string | undefined): string | null {
  if (!baseUrl) {
    return null;
  }

  return baseUrl.endsWith("/api") ? baseUrl : `${baseUrl}/api`;
}

function normalizeEndpoint(endpoint: string): string {
  if (endpoint.startsWith("/api/")) {
    return endpoint.slice(4);
  }

  if (endpoint.startsWith("/")) {
    return endpoint;
  }

  return `/${endpoint}`;
}

async function getServerApiBaseUrlFromRequestHeaders(): Promise<string | null> {
  try {
    const headerStore = await nextHeaders();
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

async function buildRequestUrls(endpoint: string): Promise<string[]> {
  const normalizedEndpoint = normalizeEndpoint(endpoint);
  const externalApiBaseUrl = withApiPrefix(env.API_URL);
  const requestApiBaseUrl = await getServerApiBaseUrlFromRequestHeaders();
  const serverCandidates = [
    requestApiBaseUrl,
    process.env.NEXT_INTERNAL_API_URL,
    externalApiBaseUrl,
  ].filter((baseUrl): baseUrl is string => Boolean(baseUrl));

  return [...new Set(serverCandidates)].map((baseUrl) => `${baseUrl}${normalizedEndpoint}`);
}

function buildApiError(message: string, status: number): ApiError {
  const error = new Error(message) as ApiError;
  error.status = status;
  return error;
}

function clearAuthCookiesIfPossible(cookieStore: Awaited<ReturnType<typeof cookies>>): void {
  try {
    cookieStore.delete("auth-token");
    cookieStore.delete("user");
  } catch {
    // cookies() is read-only in Server Components; cleanup is handled elsewhere.
  }
}

export async function authenticatedRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth-token")?.value;

  if (!token) {
    clearAuthCookiesIfPossible(cookieStore);
    throw buildApiError("Authentication required", 401);
  }

  const headers = new Headers(options.headers);
  headers.set("Content-Type", "application/json");
  headers.set("Authorization", `Bearer ${token}`);

  const requestUrls = await buildRequestUrls(endpoint);
  if (requestUrls.length === 0) {
    throw buildApiError(
      "Unable to resolve API base URL. Set NEXT_INTERNAL_API_URL or NEXT_PUBLIC_API_URL.",
      500
    );
  }
  let lastNetworkError: unknown = null;

  for (const requestUrl of requestUrls) {
    try {
      const response = await fetch(requestUrl, {
        ...options,
        headers,
        cache: "no-store",
      });

      if (response.status === 401) {
        clearAuthCookiesIfPossible(cookieStore);
        throw buildApiError("Authentication required", 401);
      }

      if (!response.ok) {
        const readableStatusText = response.statusText?.trim() || `Request failed (${response.status})`;
        throw buildApiError(readableStatusText, response.status);
      }

      if (response.status === 204) {
        return undefined as T;
      }

      const contentType = response.headers.get("content-type") ?? "";
      if (!contentType.includes("application/json")) {
        return undefined as T;
      }

      return (await response.json()) as T;
    } catch (error) {
      const isHttpError = error instanceof Error && "status" in error;
      if (isHttpError) {
        throw error;
      }

      lastNetworkError = error;
    }
  }

  throw lastNetworkError;
}

export const apiClient = {
  getTasks(): Promise<Task[]> {
    return authenticatedRequest<Task[]>("/tasks");
  },

  getTask(id: string | number): Promise<Task> {
    return authenticatedRequest<Task>(`/tasks/${id}`);
  },

  createTask(task: CreateTaskPayload): Promise<Task> {
    return authenticatedRequest<Task>("/tasks", {
      method: "POST",
      body: JSON.stringify(task),
    });
  },

  updateTask(
    id: string | number,
    updates: Partial<Omit<Task, "id" | "createdAt" | "updatedAt">>
  ): Promise<Task> {
    return authenticatedRequest<Task>(`/tasks/${id}`, {
      method: "PATCH",
      body: JSON.stringify(updates),
    });
  },

  deleteTask(id: string | number): Promise<unknown> {
    return authenticatedRequest<unknown>(`/tasks/${id}`, {
      method: "DELETE",
    });
  },
};

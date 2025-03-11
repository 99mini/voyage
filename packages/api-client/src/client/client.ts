import env from '../_config/env';
/**
 * 싱글톤 api client
 */
class ApiClient {
  private readonly baseUrl: string;
  public static instance: ApiClient;

  constructor(baseUrl?: string) {
    this.baseUrl = baseUrl ?? env.BASE_URL;

    if (!ApiClient.instance) {
      ApiClient.instance = this;
    }
    return ApiClient.instance;
  }

  static getInstance(baseUrl?: string) {
    if (!ApiClient.instance) {
      ApiClient.instance = new ApiClient(baseUrl);
    }
    return ApiClient.instance;
  }

  /**
   *
   * @example
   *
   * ```typescript
   * const res = await apiClient.get<string[]>('health', { key: 'value' });
   * -->
   * curl -X GET '${baseUrl}/health?key=value'
   * ```
   */
  public async get<T>(
    url: string,
    query?: string[][] | Record<string, string> | string | URLSearchParams,
    init?: Omit<RequestInit, 'method'>,
  ): Promise<T | null> {
    try {
      const q = new URLSearchParams(query);
      const uri = `${this.baseUrl}/${url}${q.size ? `?${q.toString()}` : ''}`;

      const res = await fetch(uri, {
        method: 'GET',
        ...init,
      });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return (await res.json()) as T;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public async post<T>(
    url: string,
    data?: BodyInit | null | undefined,
    init?: Omit<RequestInit, 'method' | 'body'>,
  ): Promise<T | null> {
    try {
      const res = await fetch(`${this.baseUrl}/${url}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...init?.headers,
        },
        body: data,
        ...init,
      });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return (await res.json()) as T;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public async delete<T>(
    url: string,
    query?: string[][] | Record<string, string> | string | URLSearchParams,
    init?: Omit<RequestInit, 'method'>,
  ): Promise<T | null> {
    try {
      const q = new URLSearchParams(query);
      const uri = `${this.baseUrl}/${url}${q.size ? `?${q.toString()}` : ''}`;

      const res = await fetch(uri, {
        method: 'DELETE',
        ...init,
      });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return (await res.json()) as T;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public async patch<T>(
    url: string,
    data?: BodyInit | null | undefined,
    init?: Omit<RequestInit, 'method' | 'body'>,
  ): Promise<T | null> {
    try {
      const body = data ? JSON.stringify(data) : undefined;

      const res = await fetch(`${this.baseUrl}/${url}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          ...init?.headers,
        },
        body,
        ...init,
      });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return (await res.json()) as T;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public async put<T>(
    url: string,
    data?: BodyInit | null | undefined,
    init?: Omit<RequestInit, 'method' | 'body'>,
  ): Promise<T | null> {
    try {
      const body = data ? JSON.stringify(data) : undefined;

      const res = await fetch(`${this.baseUrl}/${url}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...init?.headers,
        },
        body,
        ...init,
      });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return (await res.json()) as T;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}

const apiClient = ApiClient.getInstance();

export default apiClient;

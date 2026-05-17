import { redirect } from "next/navigation";
import { HTTP_STATUS } from "@/constants/http";

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL;

interface RequestOptions extends RequestInit {
  params?: Record<string, string>;
  _retry?: boolean;
}

const requestInstance = async <T>(endpoint: string, options: RequestOptions = {}): Promise<T> => {
  const { params, _retry, ...fetchOptions } = options;

  const headers = new Headers(fetchOptions.headers);
  if (!headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  if (typeof window === 'undefined' && !headers.has('cookie')) {
    const { cookies } = await import('next/headers');
    const cookieHeader = cookies()
      .getAll()
      .map(({ name, value }) => `${name}=${value}`)
      .join('; ');
    if (cookieHeader) {
      headers.set('cookie', cookieHeader);
    }
  }

  const url = new URL(`${BASE_URL}${endpoint}`);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });
  }

  try {
    const response = await fetch(url.toString(), {
      ...fetchOptions,
      headers,
      credentials: 'include',
    });
    console.log({ response });
    if (response.status === HTTP_STATUS.UNAUTHORIZED && !_retry) {
      try {
        const refreshResponse = await requestInstance('/auth/refresh');
        
        if (refreshResponse) {
          return requestInstance<T>(endpoint, {
            ...options,
            _retry: true,
            headers,
          });
        } else {
            console.log({ refreshResponse })
          redirect('/login');
        }
      } catch (refreshError) {
        console.log({ refreshError })
        redirect('/login');
      }
    }

    if (response.status === HTTP_STATUS.NOT_ACCEPTABLE) {
      redirect('/login');
    }

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || 'Something went wrong');
    }

    return response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Network error');
  }
};

export default requestInstance;
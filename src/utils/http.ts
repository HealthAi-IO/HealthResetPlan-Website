const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'https://api.jkcqplan.com/api/v1';

interface ApiResponse<T> {
  code: number;
  message?: string;
  msg?: string;
  data: T;
}

async function get<T>(path: string): Promise<T> {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 8000);
  let response: Response;
  try {
    response = await fetch(`${apiBaseUrl}${path}`, {
      headers: {
        Accept: 'application/json',
      },
      signal: controller.signal,
    });
  } finally {
    window.clearTimeout(timeout);
  }
  const body = (await response.json()) as ApiResponse<T>;
  if (!response.ok || body.code !== 0) {
    throw new Error(body.message || body.msg || '请求失败');
  }
  return body.data;
}

export const http = { get };

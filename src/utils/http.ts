const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'https://api.jkcqplan.com/api/v1';

interface ApiResponse<T> {
  code: number;
  message?: string;
  msg?: string;
  data: T;
}

async function get<T>(path: string): Promise<T> {
  const response = await fetch(`${apiBaseUrl}${path}`, {
    headers: {
      Accept: 'application/json',
    },
  });
  const body = (await response.json()) as ApiResponse<T>;
  if (!response.ok || body.code !== 0) {
    throw new Error(body.message || body.msg || '请求失败');
  }
  return body.data;
}

export const http = { get };

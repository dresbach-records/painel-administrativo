
// Configuration constants
export const BASE_URL = (process.env.VITE_API_URL || '').replace(/\/$/, '');
const DEFAULT_TIMEOUT = 30000; // 30 seconds

export interface ApiError {
  message: string;
  status: number;
  code?: string;
}

class ApiClient {
  private getHeaders(isFormData: boolean = false) {
    const token = localStorage.getItem('techlabs_token');
    const headers: Record<string, string> = {};
    
    if (!isFormData) {
      headers['Content-Type'] = 'application/json';
    }
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    return headers;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}, timeout = DEFAULT_TIMEOUT): Promise<T> {
    const controller = new AbortController();
    const timerId = setTimeout(() => controller.abort(), timeout);

    const isFormData = options.body instanceof FormData;
    
    const config: RequestInit = {
      ...options,
      headers: {
        ...this.getHeaders(isFormData),
        ...options.headers,
      },
      signal: controller.signal,
    };

    try {
      const response = await fetch(`${BASE_URL}${endpoint}`, config);
      clearTimeout(timerId);
      return await this.handleResponse<T>(response);
    } catch (error: any) {
      clearTimeout(timerId);
      
      // HARD FAIL: Se não houver resposta (status 0) ou timeout, o sistema deve parar
      if (error.name === 'AbortError') {
        throw { message: 'NODE_TIMEOUT_CRITICAL', status: 408 };
      }
      
      if (error.status) throw error;
      
      // Erro de rede puro (Backend Offline)
      throw { message: 'BACKEND_CLUSTER_UNREACHABLE', status: 0 };
    }
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    const status = response.status;

    if (status === 401) {
      localStorage.removeItem('techlabs_token');
      window.location.hash = '/admin/login';
      throw { message: 'SESSION_INVALIDATED', status: 401 };
    }

    if (status >= 500) {
      throw { message: 'INTERNAL_SERVER_CRITICAL_FAILURE', status: 500 };
    }

    let data: any;
    try {
      data = await response.json();
    } catch (e) {
      data = null;
    }

    if (!response.ok) {
      throw { 
        message: data?.message || `API_ERROR_${status}`, 
        status: status, 
        code: data?.code 
      };
    }

    return data as T;
  }

  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  async post<T>(endpoint: string, body: any): Promise<T> {
    const isFormData = body instanceof FormData;
    return this.request<T>(endpoint, {
      method: 'POST',
      body: isFormData ? body : JSON.stringify(body),
    });
  }

  async patch<T>(endpoint: string, body: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(body),
    });
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}

export const api = new ApiClient();

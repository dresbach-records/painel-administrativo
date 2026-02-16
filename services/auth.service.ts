
import { api } from './api';

export const authService = {
  login: (credentials: any) => api.post<{user: any, token: string}>('/auth/login', credentials),
  me: () => api.get<any>('/auth/me'),
  // O logout é uma ação de limpeza de estado, mas a chamada à API deve ser pura
  revokeToken: () => api.post('/auth/logout', {}),
};

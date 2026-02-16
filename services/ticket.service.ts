
import { api } from './api';

export const ticketService = {
  getAll: () => api.get<any[]>('/tickets'),
  getById: (id: string) => api.get<any>(`/tickets/${id}`),
  create: (data: any) => api.post('/tickets', data),
  addMessage: (id: string, message: string) => api.post(`/tickets/${id}/messages`, { message }),
};

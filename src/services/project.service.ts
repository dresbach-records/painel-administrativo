
import { api } from './api';
import { Project } from './clientDataService';

export const projectService = {
  getAll: () => api.get<Project[]>('/projects'),
  getById: (id: string) => api.get<Project>(`/projects/${id}`),
  create: (data: Partial<Project>) => api.post<Project>('/projects', data),
  update: (id: string, data: Partial<Project>) => api.patch<Project>(`/projects/${id}`, data),
  delete: (id: string) => api.delete(`/projects/${id}`),
  releaseInvoice: (id: string) => api.post(`/projects/${id}/release-invoice`, {}),
  // O frontend solicita a iniciação. O backend processa o sucesso via Webhook/Financeiro.
  initiatePayment: (id: string, details: any) => api.post(`/projects/${id}/initiate-payment`, details),
};

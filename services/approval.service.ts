
import { api } from './api';

export const approvalService = {
  getPending: () => api.get<any[]>('/approvals/pending'),
  approve: (id: string) => api.post(`/approvals/${id}/approve`, {}),
  reject: (id: string, reason: string) => api.post(`/approvals/${id}/reject`, { reason }),
};

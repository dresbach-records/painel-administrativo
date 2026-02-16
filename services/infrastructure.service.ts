
import { api } from './api';

export const infrastructureService = {
  getHealth: () => api.get<any>('/system/health'),
  getNodes: () => api.get<any[]>('/infrastructure/nodes'),
  getMetrics: () => api.get<any>('/infrastructure/metrics'),
};

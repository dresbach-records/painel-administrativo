
import { api } from './api';

export const repositoryService = {
  getFiles: () => api.get<any[]>('/repository/files'),
  upload: (formData: FormData) => api.post<any>('/repository/upload', formData),
  deleteFile: (id: string) => api.delete<any>(`/repository/files/${id}`),
};

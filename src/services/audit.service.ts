
import { api } from './api';

export interface TechnicalReport {
  id: string;
  projectName: string;
  healthScore: number;
  healthStatus: 'CRITICAL' | 'WARNING' | 'NOMINAL';
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  executiveSummary: string;
  isUnlocked: boolean;
  createdAt: string;
  // Detalhes financeiros providos apenas pelo backend
  pricing?: {
    setup: number;
    monthly: number;
    taxes: number;
    total: number;
    currency: string;
  };
  // Payload detalhado (liberado após unlock)
  fullReport?: {
     system: { os: string, uptime: string },
     ssl: { provider: string, expires: string },
     security: string[],
     recommendation: string
  } | null;
}

export interface AnalysisResponse {
  analysisId: string;
  status: string;
  initialPriceQuote?: number;
}

/**
 * AI & Audit Service
 * MAY ONLY call mandated endpoints for AI operations.
 * NO prompts, model choices or scoring logic allowed here.
 */
export const auditService = {
  // Dispara a análise/consulta sem expor prompts ou modelos
  analyze: (payload: { type: string, data: string, clientName: string }) => 
    api.post<AnalysisResponse>('/ai/consultation', payload),
    
  // Recupera o objeto de relatório (com ou sem detalhes bloqueados)
  getReportById: (id: string) => api.get<TechnicalReport>(`/ai/report/${id}`),
  
  // Endpoints operacionais (não relacionados à lógica de IA)
  getReports: () => api.get<TechnicalReport[]>('/audit/reports'),
  getLogs: (projectId: string) => api.get<any[]>(`/audit/${projectId}/logs`),
  unlockReport: (id: string) => api.post(`/ai/report/${id}/unlock`, {}),
};

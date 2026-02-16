
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, Unlock, Lock, ChevronRight, Search, Zap, Clock, AlertTriangle, RefreshCcw } from 'lucide-react';
import ClientSidebar from '../../components/client/ClientSidebar';
import { auditService, TechnicalReport } from '../../services/audit.service';

export default function DiagnosticHistory() {
  const navigate = useNavigate();
  const [reports, setReports] = useState<TechnicalReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await auditService.getReports();
      setReports(data);
    } catch (err: any) {
      setError(err.message || 'Erro ao sincronizar pipeline de auditoria.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const getSeverityColor = (sev: string) => {
    if (sev === 'Critical') return 'text-red-500';
    if (sev === 'High') return 'text-orange-500';
    return 'text-[#19C37D]';
  };

  return (
    <div className="min-h-screen bg-[#f6f8f7] flex font-display text-slate-800 antialiased">
      <ClientSidebar />
      <main className="flex-1 lg:ml-[260px] flex flex-col min-w-0">
        <div className="w-full max-w-[1280px] mx-auto px-6 py-6 space-y-6">
          <header className="flex flex-col md:flex-row justify-between items-end gap-4">
            <div>
              <h1 className="text-xl font-semibold text-slate-900 uppercase tracking-tight">Diagnóstico Técnico</h1>
              <p className="text-xs text-slate-400 font-medium uppercase tracking-widest mt-0.5">Análise em Tempo Real via Pipeline Backend</p>
            </div>
          </header>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-40 gap-4">
              <div className="w-10 h-10 border-2 border-[#19C37D]/20 border-t-[#19C37D] rounded-full animate-spin"></div>
              <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Polling_Audit_Logs...</span>
            </div>
          ) : error ? (
            <div className="bg-white border border-red-100 rounded-2xl p-20 flex flex-col items-center text-center space-y-6 shadow-sm">
               <AlertTriangle size={48} className="text-red-500" />
               <h3 className="text-lg font-bold text-slate-900 uppercase">Audit_Pipeline_Down</h3>
               <p className="text-sm text-slate-500 font-medium">{error}</p>
               <button onClick={load} className="px-8 py-3 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                 <RefreshCcw size={14} /> Retry_Bootstrap
               </button>
            </div>
          ) : (
            <section className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-50 flex justify-between items-center bg-slate-50/10">
                <h3 className="font-semibold text-sm uppercase">Relatórios Disponíveis</h3>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-slate-50/30">
                    <tr className="text-[9px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50">
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4">Projeto / Protocolo</th>
                      <th className="px-6 py-4 text-center">Score</th>
                      <th className="px-6 py-4">Severidade</th>
                      <th className="px-6 py-4 text-right">Ação</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {reports.map((report) => (
                      <tr key={report.id} className="hover:bg-slate-50/50 transition-colors group cursor-pointer" onClick={() => navigate(`/client/diagnostic/${report.id}`)}>
                        <td className="px-6 py-4">
                          {report.isUnlocked ? (
                            <div className="w-8 h-8 rounded-lg bg-[#19C37D]/10 text-[#19C37D] flex items-center justify-center"><Unlock size={14} /></div>
                          ) : (
                            <div className="w-8 h-8 rounded-lg bg-slate-50 text-slate-300 flex items-center justify-center"><Lock size={14} /></div>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col">
                             <span className="text-xs font-bold text-slate-800 uppercase tracking-tight">{report.projectName}</span>
                             <span className="text-[9px] text-slate-400 font-mono">{report.id}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-center font-black text-slate-900">{report.healthScore}</td>
                        <td className="px-6 py-4">
                           <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-md border ${getSeverityColor(report.severity).replace('text-', 'border-').replace('500', '200')} ${getSeverityColor(report.severity).replace('text-', 'bg-').replace('500', '50')}`}>
                              {report.severity}
                           </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                           <ChevronRight className="inline text-slate-200 group-hover:text-[#19C37D] transition-colors" size={18} />
                        </td>
                      </tr>
                    ))}
                    {reports.length === 0 && (
                      <tr>
                        <td colSpan={5} className="px-8 py-20 text-center text-[10px] font-black uppercase text-slate-300 italic">
                           Empty_Diagnostic_History
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
}

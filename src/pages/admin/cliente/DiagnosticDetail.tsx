
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Lock, ArrowLeft, Zap, Cpu, Signal, Server,
  ShieldCheck, AlertTriangle, Loader2, ShieldAlert,
  CheckCircle2, Download
} from 'lucide-react';
import ClientSidebar from '../../components/client/ClientSidebar';
import { auditService as diagnosticService, TechnicalReport as DiagnosticReport } from '../../services/audit.service';

export default function DiagnosticDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [report, setReport] = useState<DiagnosticReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    try {
      const data = await diagnosticService.getReportById(id!);
      setReport(data || null);
      setError(null);
    } catch (err: any) {
      setError("Falha ao sincronizar com o cluster de diagnóstico.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) load();
  }, [id]);

  const handleUnlock = async () => {
    setError(null);
    setIsUnlocking(true);
    try {
      // Nenhum setTimeout permitido. Requisição real de faturamento.
      await diagnosticService.unlockReport(id!);
      // Se sucesso, recarrega o relatório completo vindo do servidor
      await load();
    } catch (err: any) {
      setError(err.message || "Acesso negado pelo cluster de segurança.");
    } finally {
      setIsUnlocking(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-[#f6f8f7] flex flex-col items-center justify-center gap-4 font-mono">
       <div className="w-10 h-10 border-2 border-[#19C37D]/20 border-t-[#19C37D] rounded-full animate-spin"></div>
       <span className="text-[10px] text-slate-400 uppercase tracking-widest">Hydrating_Diagnostic_Node...</span>
    </div>
  );

  if (!report || error) return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-10 font-mono text-center">
       <AlertTriangle size={48} className="text-red-500 mb-8" />
       <h1 className="text-2xl font-black uppercase italic tracking-tighter">System_Halt: {error || '404_NODE_NOT_FOUND'}</h1>
       <button onClick={() => navigate('/client/diagnostic')} className="mt-12 px-10 py-4 bg-[#19C37D] text-black font-black uppercase text-[10px] rounded-xl tracking-widest">Back_to_Repository</button>
    </div>
  );

  const authorized = report.isUnlocked && report.fullReport;

  return (
    <div className="min-h-screen bg-[#f6f8f7] flex font-display text-slate-800 antialiased overflow-x-hidden">
      <ClientSidebar />

      <main className="flex-1 lg:ml-[260px] flex flex-col min-w-0">
        <header className="h-16 bg-white border-b border-slate-100 flex items-center justify-between px-6 sticky top-0 z-10 shadow-sm">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('/client/diagnostic')} className="p-2 hover:bg-slate-50 rounded-xl transition-colors">
              <ArrowLeft size={18} className="text-slate-400" />
            </button>
            <h1 className="text-sm font-semibold uppercase tracking-tight">{report.projectName}</h1>
          </div>
          <div className="flex items-center gap-3">
             <span className={`text-[9px] font-black uppercase px-2 py-1 rounded border ${report.isUnlocked ? 'border-[#19C37D]/20 text-[#19C37D] bg-[#19C37D]/5' : 'border-slate-200 text-slate-400 bg-slate-50'}`}>
               {report.isUnlocked ? 'Protocolo Liberado' : 'Relatório Bloqueado'}
             </span>
          </div>
        </header>

        <div className="w-full max-w-[1280px] mx-auto px-6 py-6 space-y-6">
           <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              <div className="xl:col-span-2 space-y-6">
                 <section className="bg-white border border-slate-100 rounded-xl p-8 shadow-sm relative overflow-hidden">
                    <div className="flex justify-between items-start mb-8 relative z-10">
                       <div className="space-y-1">
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Metadados de Ingestão</p>
                          <h2 className="text-2xl font-black text-slate-900 uppercase italic">Diagnóstico de Saúde</h2>
                       </div>
                       <div className="text-right">
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Health State</p>
                          <p className="text-2xl font-black uppercase text-[#19C37D]">{report.healthScore}% - {report.healthStatus}</p>
                       </div>
                    </div>
                 </section>

                 {!authorized ? (
                    <section className="bg-white border border-slate-100 rounded-xl p-10 text-center shadow-xl space-y-8">
                       <div className="w-16 h-16 bg-[#19C37D]/10 rounded-full flex items-center justify-center mx-auto text-[#19C37D] shadow-inner"><Lock size={32} /></div>
                       <div className="max-w-md mx-auto space-y-3">
                          <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">Conteúdo Restrito</h3>
                          <p className="text-sm text-slate-500 font-medium leading-relaxed italic">A análise técnica completa é um ativo protegido. Inicie o handshake financeiro para descriptografar o payload de engenharia.</p>
                       </div>
                       <div className="pt-6 border-t border-slate-50 flex flex-col items-center gap-4">
                          <button onClick={handleUnlock} disabled={isUnlocking} className="bg-[#19C37D] text-white px-10 py-5 rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl hover:scale-105 transition-all flex items-center gap-3 disabled:opacity-50">
                             {isUnlocking ? <Loader2 className="animate-spin" size={18} /> : <Zap size={18} />}
                             Ativar Protocolo Completo
                          </button>
                       </div>
                    </section>
                 ) : (
                    <div className="space-y-6 animate-in fade-in duration-700">
                       <section className="bg-white border border-slate-100 rounded-xl p-8 shadow-sm">
                          <h3 className="text-xs font-black uppercase tracking-widest text-[#19C37D] mb-6 flex items-center gap-2"><Server size={14} /> Infraestrutura Reconhecida</h3>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                             <div><p className="text-[10px] font-black text-slate-400 uppercase">OS</p><p className="text-sm font-bold">{report.fullReport?.system.os}</p></div>
                             <div><p className="text-[10px] font-black text-slate-400 uppercase">Uptime</p><p className="text-sm font-bold">{report.fullReport?.system.uptime}</p></div>
                          </div>
                       </section>
                    </div>
                 )}
              </div>
           </div>
        </div>
      </main>
    </div>
  );
}

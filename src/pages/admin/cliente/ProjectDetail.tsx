
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, ShieldCheck, Calendar, Users, 
  ChevronRight, FileText, CheckCircle2, Circle,
  Layers, Share2, Cpu, Info, BarChart3, Download, Lock, Zap,
  AlertTriangle, RefreshCcw
} from 'lucide-react';
import ClientSidebar from '../../components/client/ClientSidebar';
import { clientDataService, Project } from '../../services/clientDataService';

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    try {
      if (id) {
        setLoading(true);
        setError(null);
        const data = await clientDataService.getProjectById(id);
        setProject(data || null);
      }
    } catch (err: any) {
      setError(err.message || 'Falha ao recuperar metadados do projeto.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [id]);

  if (loading) return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-4">
       <div className="w-10 h-10 border-2 border-[#19C37D]/20 border-t-[#19C37D] rounded-full animate-spin"></div>
       <span className="text-[10px] font-black uppercase text-slate-400 tracking-[0.3em]">Pulling_Project_Object...</span>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-10 text-center">
       <AlertTriangle size={48} className="text-red-500 mb-6" />
       <h1 className="text-2xl font-black text-white uppercase italic">Project_Node_Offline</h1>
       <p className="text-slate-500 text-xs font-mono uppercase mt-4 mb-10 max-w-sm">{error}</p>
       <button onClick={load} className="px-10 py-4 bg-[#19C37D] text-black font-black uppercase text-xs tracking-widest hover:brightness-110">Retry_Handshake</button>
    </div>
  );

  if (!project) return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-10">
       <h1 className="text-3xl font-black uppercase italic">404_Node_Lost</h1>
       <button onClick={() => navigate('/client/projects')} className="mt-8 text-[10px] font-black uppercase text-[#19C37D] hover:underline">Back_to_Repository</button>
    </div>
  );

  const isLocked = !project.isPaid;

  return (
    <div className="min-h-screen bg-[#f6f8f7] flex font-display text-slate-800 antialiased overflow-x-hidden">
      <ClientSidebar />

      <main className="flex-1 lg:ml-[260px] flex flex-col min-w-0">
        <header className="h-16 bg-white border-b border-slate-100 flex items-center justify-between px-6 sticky top-0 z-10 shadow-sm">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('/client/projects')} className="p-2 hover:bg-slate-50 rounded-xl transition-colors">
              <ArrowLeft size={18} className="text-slate-400" />
            </button>
            <h1 className="text-sm font-semibold truncate max-w-[240px] uppercase">{project.title}</h1>
          </div>
          <div className="flex gap-2">
             {!isLocked ? (
               <button className="bg-slate-900 hover:bg-black text-white px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all">Download Report</button>
             ) : (
               <button onClick={() => navigate(`/client/consultation/checkout/${project.id}`)} className="bg-[#19C37D] text-white px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest shadow-md">Ativar Ativo</button>
             )}
          </div>
        </header>

        <div className="w-full max-w-[1280px] mx-auto px-6 py-6">
           <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">
              
              <div className="xl:col-span-2 space-y-6">
                 <section className="bg-white border border-slate-100 rounded-xl p-6 shadow-sm relative overflow-hidden min-h-[160px]">
                    <h2 className="text-xs font-semibold uppercase tracking-widest text-[#19C37D] mb-4 flex items-center gap-2">
                      <Cpu size={14} /> Resumo Executivo
                    </h2>
                    {isLocked ? (
                      <div className="bg-slate-50 border border-slate-100 rounded-xl p-8 text-center">
                         <Lock size={20} className="mx-auto text-slate-300 mb-2" />
                         <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Resumo Restrito até Ativação</p>
                      </div>
                    ) : (
                      <p className="text-sm text-slate-500 leading-relaxed italic border-l-2 border-slate-100 pl-4">
                        {project.aiAnalysis?.executiveSummary || project.description}
                      </p>
                    )}
                 </section>

                 <section className="bg-white border border-slate-100 rounded-xl p-6 shadow-sm space-y-6">
                    <div>
                       <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
                         <Info size={14} /> Diagnóstico Técnico
                       </h2>
                       {isLocked ? (
                         <div className="bg-slate-50/50 border border-dashed border-slate-200 rounded-xl p-12 text-center">
                            <ShieldCheck size={24} className="mx-auto text-slate-200 mb-3" />
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Auditoria em Cache. Aguardando Liberação de Faturamento.</p>
                         </div>
                       ) : (
                         <div className="text-sm text-slate-600 leading-relaxed bg-slate-50/50 p-4 rounded-lg border border-slate-100">
                            {project.aiAnalysis?.technicalReport || 'Auditoria em processamento...'}
                         </div>
                       )}
                    </div>

                    <div className="pt-6 border-t border-slate-50">
                       <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-4">Roadmap de Execução</h2>
                       <div className="space-y-4">
                          {project.steps?.map((step, i) => (
                             <div key={i} className="flex items-center gap-4">
                                <div className={`w-6 h-6 rounded-full border flex items-center justify-center shrink-0 ${
                                   i === 0 && !isLocked ? 'bg-[#19C37D] border-[#19C37D] text-white' : 'bg-white border-slate-100'
                                }`}>
                                   {i === 0 && !isLocked ? <CheckCircle2 size={14} /> : <div className="w-1.5 h-1.5 rounded-full bg-slate-100"></div>}
                                </div>
                                <p className="text-xs font-medium text-slate-500 uppercase">{step}</p>
                             </div>
                          ))}
                          {(!project.steps || project.steps.length === 0) && <p className="text-[10px] text-slate-300 italic uppercase">Workflow_Not_Defined</p>}
                       </div>
                    </div>
                 </section>
              </div>

              <aside className="space-y-6">
                 <div className={`bg-slate-900 text-white rounded-xl p-6 shadow-xl relative overflow-hidden h-[160px] flex flex-col justify-between ${isLocked ? 'opacity-40 grayscale' : ''}`}>
                    <div className="z-10">
                       <p className="text-[10px] font-bold uppercase tracking-widest text-[#19C37D] mb-1">Status Delivery</p>
                       <h3 className="text-3xl font-bold tracking-tighter">{project.progress}%</h3>
                    </div>
                    <div className="z-10">
                       <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-[#19C37D]" style={{ width: `${project.progress}%` }}></div>
                       </div>
                    </div>
                    <Zap size={100} className="absolute -right-8 -bottom-8 text-white/[0.03] rotate-12" />
                 </div>

                 <div className="bg-white border border-slate-100 rounded-xl p-6 shadow-sm">
                    <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-4">Equipe Alocada</h3>
                    <div className="space-y-3">
                       {project.team?.map((member, idx) => (
                          <div key={idx} className="flex items-center gap-3">
                             <div className="w-7 h-7 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-400 uppercase">{member.charAt(0)}</div>
                             <span className="text-xs font-semibold text-slate-700">{member}</span>
                          </div>
                       ))}
                       {(!project.team || project.team.length === 0) && <p className="text-[10px] text-slate-300 italic uppercase">No_Team_Assigned</p>}
                    </div>
                 </div>
              </aside>
           </div>
        </div>
      </main>
    </div>
  );
}

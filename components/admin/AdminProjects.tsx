
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Terminal, LayoutDashboard, Ticket, Workflow, Users, Network, Settings2, LogOut, Cpu, Zap, FileSearch, Banknote, AlertTriangle, RefreshCcw
} from 'lucide-react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import { projectService } from '../../services/project.service';
import { Project } from '../../services/clientDataService';

export default function AdminProjects() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await projectService.getAll();
      setProjects(data);
    } catch (err: any) {
      setError(err.message || 'Falha ao sincronizar cluster de projetos.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleReleaseInvoice = async (projectId: string) => {
    try {
      await projectService.releaseInvoice(projectId);
      loadData();
    } catch (err) {
      alert("Falha ao liberar fatura técnica.");
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center gap-4">
       <div className="w-12 h-12 border-4 border-[#19C37D]/20 border-t-[#19C37D] rounded-full animate-spin"></div>
       <span className="text-[#19C37D] font-mono text-[10px] uppercase tracking-widest">Hydrating_Root_Repository...</span>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center p-20 text-center">
       <AlertTriangle size={64} className="text-red-500 mb-8" />
       <h1 className="text-2xl font-black uppercase text-white italic">Master_Node_Disconnect</h1>
       <p className="text-slate-500 text-xs font-mono uppercase mb-10 max-w-sm">{error}</p>
       <button onClick={loadData} className="px-10 py-4 bg-[#19C37D] text-black font-black uppercase text-xs tracking-widest transition-all">Retry_Root_Sync</button>
    </div>
  );

  return (
    <div className="flex h-screen overflow-hidden bg-[#0A0A0A] text-slate-300 font-sans antialiased">
      <AdminSidebar />

      <main className="flex-1 flex flex-col min-w-0 bg-[#0A0A0A]">
        <header className="h-20 border-b border-white/5 bg-[#0A0A0A] flex items-center justify-between px-10 sticky top-0 z-20">
          <div>
            <h1 className="text-xl font-black text-white tracking-tighter uppercase italic">Monitoramento de Entregas</h1>
            <p className="text-[10px] text-slate-500 uppercase tracking-[0.3em] mt-1 font-bold">IA Analysis Pipeline Status</p>
          </div>
          <button 
            onClick={() => navigate('/admin/projects/new')}
            className="bg-[#19C37D] text-black px-6 py-2 rounded-lg text-xs font-black uppercase tracking-widest hover:brightness-110 shadow-xl shadow-[#19C37D]/20 flex items-center gap-2 transition-all"
          >
            <Cpu size={16} /> Nova Auditoria IA
          </button>
        </header>

        <div className="p-10 space-y-10 overflow-y-auto custom-scrollbar flex-1">
          <div className="bg-[#111111] border border-white/5 rounded-xl overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-black/40 text-[9px] uppercase tracking-[0.2em] text-slate-600 font-black border-b border-white/5">
                    <th className="px-8 py-5">Cliente / Projeto</th>
                    <th className="px-8 py-5">Audit IA</th>
                    <th className="px-8 py-5">Status Financeiro</th>
                    <th className="px-8 py-5">Ações Gestor</th>
                    <th className="px-8 py-5">Progresso</th>
                    <th className="px-8 py-5 text-right">Relatório</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {projects.map((project) => (
                    <tr key={project.id} className="hover:bg-white/2 transition-colors group cursor-default">
                      <td className="px-8 py-6">
                        <div className="flex flex-col">
                          <span className="text-[10px] text-[#19C37D] font-bold uppercase tracking-widest mb-1">{project.client}</span>
                          <span className="font-black text-xs text-white uppercase tracking-tight group-hover:text-[#19C37D] transition-colors">{project.title}</span>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        {project.aiAnalysis ? (
                          <div className="flex items-center gap-2 text-[#19C37D] bg-[#19C37D]/5 px-3 py-1.5 rounded-lg border border-[#19C37D]/20 w-fit">
                            <Zap size={12} fill="currentColor" />
                            <span className="text-[9px] font-black uppercase tracking-widest">Processado</span>
                          </div>
                        ) : (
                          <span className="text-[9px] font-black uppercase tracking-widest text-slate-700 italic">Pendente</span>
                        )}
                      </td>
                      <td className="px-8 py-6">
                         <span className={`text-[10px] font-black uppercase tracking-widest ${project.isPaid ? 'text-[#19C37D]' : project.status === 'Aguardando Pagamento' ? 'text-amber-500' : 'text-slate-600'}`}>
                           {project.isPaid ? 'FATURADO' : project.status === 'Aguardando Pagamento' ? 'EM COBRANÇA' : 'EM ANÁLISE'}
                         </span>
                      </td>
                      <td className="px-8 py-6">
                         {!project.isPaid && project.status !== 'Aguardando Pagamento' ? (
                           <button 
                             onClick={() => handleReleaseInvoice(project.id)}
                             className="flex items-center gap-2 text-[9px] font-black text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-all uppercase tracking-widest shadow-sm active:scale-95"
                           >
                             <Banknote size={14} /> Liberar Fatura
                           </button>
                         ) : (
                           <span className="text-[9px] font-bold text-slate-600 uppercase italic">Ativo Sincronizado</span>
                         )}
                      </td>
                      <td className="px-8 py-6 w-64">
                        <div className="flex items-center gap-4">
                          <div className="flex-1 h-1.5 bg-black rounded-full overflow-hidden border border-white/5">
                            <div className="bg-[#19C37D] h-full transition-all duration-1000" style={{ width: `${project.progress}%` }}></div>
                          </div>
                          <span className="text-[10px] font-mono font-black text-slate-600">{project.progress}%</span>
                        </div>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <button 
                          disabled={!project.aiAnalysis}
                          onClick={() => navigate(`/admin/diagnostic/report/${project.id}`)}
                          className="p-2 text-slate-600 hover:text-[#19C37D] disabled:opacity-20 transition-all"
                        >
                          <FileSearch size={20} />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {projects.length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-8 py-20 text-center text-[10px] font-black uppercase tracking-widest text-slate-600 italic">
                        No_Active_Repository_Detected
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <footer className="border-t border-white/5 bg-[#0D0D0D] px-10 py-4 flex items-center justify-between text-[9px] text-slate-600 uppercase tracking-[0.4em] font-black">
          <div className="flex items-center gap-10">
            <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-[#19C37D] rounded-full animate-pulse"></span> DB_MASTER_Nominal</div>
          </div>
          <div className="font-mono">Sync_Node: TL-ADM-V2.4</div>
        </footer>
      </main>
    </div>
  );
}

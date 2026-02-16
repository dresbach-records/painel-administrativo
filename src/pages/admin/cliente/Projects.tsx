
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, 
  Circle,
  Database,
  Cloud,
  Cpu,
  ShieldCheck,
  ChevronRight,
  Workflow,
  AlertTriangle,
  RefreshCcw
} from 'lucide-react';
import ClientSidebar from '../../components/client/ClientSidebar';
import { clientDataService, Project } from '../../services/clientDataService';

export default function Projects() {
  const navigate = useNavigate();
  const [projects, setProjectList] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await clientDataService.getProjects();
      setProjectList(data);
    } catch (err: any) {
      setError(err.message || 'Falha ao recuperar repositório de projetos.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
    window.addEventListener('storage', loadProjects);
    return () => window.removeEventListener('storage', loadProjects);
  }, []);

  const getIcon = (cat: string) => {
    if (cat.includes('Cloud')) return <Cloud size={20} />;
    if (cat.includes('AI')) return <Cpu size={20} />;
    if (cat.includes('Security')) return <ShieldCheck size={20} />;
    return <Database size={20} />;
  };

  return (
    <div className="min-h-screen bg-[#f6f8f7] flex font-display text-slate-800 antialiased">
      <ClientSidebar />

      <main className="flex-1 lg:ml-[260px] flex flex-col min-w-0">
        <div className="w-full max-w-[1280px] mx-auto px-6 py-6">
          <header className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <div>
              <h1 className="text-xl font-semibold text-slate-900">Meus Projetos</h1>
              <p className="text-xs text-slate-400 font-medium uppercase tracking-widest mt-0.5">Gestão de Ativos Técnicos</p>
            </div>
            <button 
              onClick={() => navigate('/client/projects/new')}
              className="bg-[#19C37D] hover:bg-[#15a86a] text-white px-5 py-2.5 rounded-lg font-bold flex items-center gap-2 transition-all shadow-md text-[11px] uppercase tracking-widest"
            >
              <Cpu size={16} /> Provisionar Ativo
            </button>
          </header>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-40 gap-4">
               <div className="w-10 h-10 border-2 border-[#19C37D]/20 border-t-[#19C37D] rounded-full animate-spin"></div>
               <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Syncing_Nodes...</span>
            </div>
          ) : error ? (
            <div className="bg-white border border-red-100 rounded-2xl p-20 flex flex-col items-center text-center space-y-6 shadow-sm">
               <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center text-red-500"><AlertTriangle size={32} /></div>
               <div>
                 <h3 className="text-lg font-bold text-slate-900 uppercase">Erro de Sincronização</h3>
                 <p className="text-sm text-slate-500 mt-2 font-medium">{error}</p>
               </div>
               <button onClick={loadProjects} className="px-8 py-3 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                 <RefreshCcw size={14} /> Retry_Bootstrap
               </button>
            </div>
          ) : projects.length === 0 ? (
            <div className="bg-white border border-dashed border-slate-200 rounded-xl p-20 flex flex-col items-center text-center space-y-6">
               <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-200"><Workflow size={32} /></div>
               <h3 className="text-lg font-bold text-slate-900">Nenhum projeto ativo</h3>
               <button onClick={() => navigate('/client/projects/new')} className="px-8 py-3 bg-slate-900 text-white rounded-xl text-xs font-bold uppercase tracking-widest">Novo Handshake</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {projects.map(project => (
                <div 
                  key={project.id} 
                  onClick={() => navigate(`/client/projects/${project.id}`)}
                  className="bg-white border border-slate-100 p-5 rounded-xl shadow-sm hover:shadow-md transition-all group cursor-pointer h-[160px] flex flex-col justify-between"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-4 overflow-hidden">
                      <div className="w-10 h-10 rounded-lg bg-[#19C37D]/10 text-[#19C37D] flex items-center justify-center shrink-0">
                        {getIcon(project.category)}
                      </div>
                      <div className="truncate">
                        <h3 className="font-bold text-sm text-slate-900 uppercase truncate">{project.title}</h3>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">{project.category}</p>
                      </div>
                    </div>
                    <ChevronRight className="text-slate-200 group-hover:text-[#19C37D]" size={18} />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-[10px] font-black uppercase">
                      <span className="text-slate-400">Entrega</span>
                      <span className="text-[#19C37D]">{project.progress}%</span>
                    </div>
                    <div className="w-full bg-slate-50 h-1 rounded-full overflow-hidden">
                      <div className="h-full bg-[#19C37D]" style={{ width: `${project.progress}%` }}></div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-3 border-t border-slate-50 text-[9px] font-bold text-slate-400 uppercase">
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#19C37D] animate-pulse"></div>
                      {project.status}
                    </div>
                    <span className="font-mono">ID: {project.id}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

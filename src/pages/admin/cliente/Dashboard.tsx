
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Activity, ArrowUpRight, AlertTriangle, RefreshCcw
} from 'lucide-react';
import ClientSidebar from '../../components/client/ClientSidebar';
import { api } from '../../services/api';
import { Project } from '../../services/clientDataService';

interface DashboardData {
  metrics: {
    qualityScore: number;
    vulnerabilitiesDelta: number;
    latencyAvg: number;
  };
  evolution: { month: string; value: number }[];
  incidences: { category: string; percentage: number }[];
  recentProjects: Project[];
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadDashboard = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get<DashboardData>('/dashboard/client-overview');
      setData(response);
    } catch (err: any) {
      setError(err.message || 'Falha ao sincronizar com o nó de dados.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  if (loading) return (
    <div className="min-h-screen bg-[#f6f8f7] flex flex-col items-center justify-center gap-4">
      <div className="w-12 h-12 border-4 border-[#19C37D]/20 border-t-[#19C37D] rounded-full animate-spin"></div>
      <div className="text-[#19C37D] font-black uppercase tracking-widest text-[10px]">Syncing_System_Nodes...</div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-10 text-center select-none animate-in fade-in duration-500">
       <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center text-red-500 mb-8 border border-red-500/20 shadow-[0_0_40px_rgba(239,68,68,0.1)]">
          <AlertTriangle size={40} />
       </div>
       <h1 className="text-2xl font-black text-white uppercase tracking-tighter mb-4 italic">Operational_Failure</h1>
       <p className="text-slate-500 text-xs font-mono uppercase max-w-sm leading-relaxed mb-10">
          O gateway de dados não respondeu ao handshake. A visualização de métricas foi suprimida para evitar divergência de integridade.
       </p>
       <button 
        onClick={loadDashboard} 
        className="px-12 py-5 bg-[#19C37D] text-black rounded-2xl font-black uppercase text-xs tracking-widest hover:scale-105 transition-all shadow-xl shadow-[#19C37D]/20"
       >
        <RefreshCcw size={18} className="inline mr-2" /> Retry_Handshake
       </button>
    </div>
  );

  if (!data) return null;

  return (
    <div className="min-h-screen bg-[#f6f8f7] flex font-display text-slate-800 antialiased overflow-x-hidden">
      <ClientSidebar />

      <main className="flex-1 lg:ml-[260px] flex flex-col min-w-0">
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 h-16 shrink-0 px-6 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-4">
              <div className="bg-[#19C37D] w-7 h-7 rounded flex items-center justify-center shadow-lg shadow-[#19C37D]/20">
                <Activity className="text-white" size={16} />
              </div>
              <h1 className="text-sm font-bold tracking-tight text-slate-900 uppercase">TechLabs <span className="text-[#19C37D]">Portal</span></h1>
          </div>
        </header>

        <div className="w-full max-w-[1280px] mx-auto px-6 py-6 space-y-6">
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm h-[160px] flex flex-col justify-between">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Qualidade Média</p>
              <h3 className="text-4xl font-black text-slate-900">{data.metrics.qualityScore}%</h3>
              <div className="h-1 w-full bg-slate-50 rounded-full overflow-hidden">
                <div className="h-full bg-[#19C37D]" style={{ width: `${data.metrics.qualityScore}%` }}></div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm h-[160px] flex flex-col justify-between">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Vulnerabilidades</p>
              <h3 className="text-4xl font-black text-red-500">{data.metrics.vulnerabilitiesDelta}%</h3>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm h-[160px] flex flex-col justify-between">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Latência API</p>
              <h3 className="text-4xl font-black text-[#19C37D]">{data.metrics.latencyAvg}ms</h3>
            </div>
          </section>

          <section className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="px-8 py-5 border-b border-slate-50 flex items-center justify-between">
               <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest">Ativos Otimizados</h3>
               <button onClick={() => navigate('/client/projects')} className="text-[#19C37D] text-[10px] font-black uppercase tracking-widest flex items-center gap-2">Explorar Todos <ArrowUpRight size={12} /></button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50/50">
                  <tr className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                    <th className="px-8 py-4">Projeto</th>
                    <th className="px-8 py-4">Maturidade</th>
                    <th className="px-8 py-4 text-center">Score</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {data.recentProjects.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50/50 transition-all cursor-pointer text-sm" onClick={() => navigate(`/client/projects/${p.id}`)}>
                      <td className="px-8 py-4 font-bold text-slate-900 uppercase truncate max-w-[200px]">{p.title}</td>
                      <td className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase">{p.aiAnalysis?.maturityLevel || 'System'}</td>
                      <td className="px-8 py-4 text-center font-black text-[#19C37D]">
                        {p.healthScore || '--'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

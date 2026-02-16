
import React, { useState, useEffect } from 'react';
import { 
  Bell, Search, Timer, AlertTriangle, Cloud, 
  Download, Zap, FileSearch, ChevronRight, 
  ArrowRight, Activity, Terminal, RefreshCcw
} from 'lucide-react';
import AdminSidebar from '@/@/components/admin/AdminSidebar';
import { useNavigate } from 'react-router-dom';
import { api } from '@/@/services/api';

interface AdminOverview {
  totalAudits: number;
  uptime: number;
  openTickets: number;
  newClients: number;
  activityLogs: any[];
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [data, setData] = useState<AdminOverview | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadOverview = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get<AdminOverview>('/dashboard/admin-overview');
      setData(response);
    } catch (err: any) {
      setError(err.message || 'Falha ao sincronizar painel root.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOverview();
  }, []);

  if (loading) return (
    <div className="min-h-screen bg-[#111111] flex flex-col items-center justify-center gap-4">
       <div className="w-12 h-12 border-4 border-[#19C37D]/20 border-t-[#19C37D] rounded-full animate-spin"></div>
       <div className="text-[#19C37D] font-mono text-[10px] uppercase tracking-widest">Bootstraping_Admin_Node...</div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center p-10 text-center">
       <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center text-red-500 mb-8">
          <AlertTriangle size={40} />
       </div>
       <h1 className="text-2xl font-black text-white uppercase tracking-tighter mb-4 italic">Critical_Connection_Failure</h1>
       <p className="text-slate-500 font-mono text-xs mb-10 max-w-sm uppercase leading-relaxed">
         {error}. O terminal administrativo requer conexão estável com o cluster principal.
       </p>
       <button 
         onClick={loadOverview}
         className="px-10 py-4 bg-[#19C37D] text-black rounded-xl font-black uppercase text-xs tracking-widest hover:brightness-110 transition-all"
       >
         Retry_Node_Handshake
       </button>
    </div>
  );

  return (
    <div className="flex h-screen overflow-hidden bg-[#111111] text-[#E2E8F0] font-sans antialiased">
      <AdminSidebar />

      <main className="flex-1 flex flex-col min-w-0 bg-[#111111] overflow-y-auto custom-scrollbar">
        <header className="h-20 border-b border-[#2A2A2A] bg-[#1A1A1A]/50 backdrop-blur-xl flex items-center justify-between px-10 sticky top-0 z-20">
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-black text-white uppercase tracking-tight flex items-center">
              Dashboard Admin <span className="text-[#19C37D] font-medium mx-3 opacity-50">/</span> Visão Geral
            </h1>
          </div>
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3 px-4 py-1.5 bg-black/30 border border-[#2A2A2A] rounded-full">
              <span className="w-2 h-2 rounded-full bg-[#19C37D] animate-pulse"></span>
              <span className="text-[10px] font-mono text-[#19C37D] uppercase font-bold">Sistema Nominal</span>
            </div>
            <button className="text-[#888888] hover:text-white transition-colors relative p-2">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-[#111111]"></span>
            </button>
          </div>
        </header>

        <div className="p-10 space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="bg-[#1A1A1A] border border-[#2A2A2A] p-8 rounded-2xl relative overflow-hidden group hover:border-[#19C37D]/30 transition-all shadow-xl">
              <p className="text-[#888888] text-[11px] font-black uppercase tracking-[0.2em] mb-4">Total de Auditorias</p>
              <h2 className="text-4xl font-black text-white tracking-tighter">{data?.totalAudits}</h2>
              <Zap size={60} className="absolute -right-4 -bottom-4 text-[#19C37D]/5 rotate-12" />
            </div>
            <div className="bg-[#1A1A1A] border border-[#2A2A2A] p-8 rounded-2xl">
              <p className="text-[#888888] text-[11px] font-black uppercase tracking-[0.2em] mb-4">Uptime Cluster</p>
              <h2 className="text-4xl font-black text-[#19C37D] tracking-tighter">{data?.uptime}%</h2>
            </div>
            <div className="bg-[#1A1A1A] border border-[#2A2A2A] p-8 rounded-2xl">
              <p className="text-[#888888] text-[11px] font-black uppercase tracking-[0.2em] mb-4">Tickets Abertos</p>
              <h2 className="text-4xl font-black text-white tracking-tighter">{data?.openTickets}</h2>
            </div>
            <div className="bg-[#1A1A1A] border border-[#2A2A2A] p-8 rounded-2xl">
              <p className="text-[#888888] text-[11px] font-black uppercase tracking-[0.2em] mb-4">Novos Clientes</p>
              <h2 className="text-4xl font-black text-white tracking-tighter">+{data?.newClients}</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center justify-between mb-2 px-2">
                <h3 className="text-sm font-black text-white flex items-center gap-3 uppercase tracking-[0.2em] italic">
                  <Terminal className="text-[#19C37D]" size={18} /> Live Activity Feed
                </h3>
              </div>
              <div className="space-y-2 font-mono text-xs overflow-hidden rounded-2xl border border-[#2A2A2A]">
                {data?.activityLogs.map((log: any, i: number) => (
                  <div key={i} className={`bg-[#1A1A1A] border-l-4 border-[#19C37D]/50 p-5 flex items-start gap-6 hover:bg-[#222222] transition-colors cursor-default group`}>
                    <span className="text-[#888888] shrink-0 font-bold opacity-60">[{new Date(log.timestamp).toLocaleTimeString()}]</span>
                    <span className={`text-[#19C37D] uppercase font-black shrink-0 tracking-widest`}>[{log.type}]</span>
                    <p className="text-slate-300 leading-relaxed">{log.message}</p>
                  </div>
                ))}
                {data?.activityLogs.length === 0 && (
                  <div className="p-20 text-center text-slate-700 uppercase font-black tracking-widest">No_Activity_Logged</div>
                )}
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-8 shadow-xl">
                <h4 className="text-[10px] font-black text-[#888888] uppercase tracking-[0.3em] mb-8 border-b border-[#2A2A2A] pb-4">Saúde do Sistema IA</h4>
                <div className="space-y-8">
                  {['Auditor Engine', 'SAST Analysis', 'Security Nodes'].map((label, i) => (
                    <div key={i}>
                      <div className="flex justify-between items-center text-[11px] mb-3">
                        <span className="text-slate-400 font-bold uppercase tracking-widest">{label}</span>
                        <span className="text-[#19C37D] font-black tracking-tighter text-sm">Nominal</span>
                      </div>
                      <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-[#19C37D] w-[95%]"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <button className="w-full py-5 bg-[#19C37D] text-black font-black text-[11px] uppercase tracking-[0.3em] rounded-xl hover:bg-[#15a86a] transition-all flex items-center justify-center gap-3 shadow-2xl shadow-[#19C37D]/20">
                <Download size={18} /> Relatório de Atividade Mensal
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

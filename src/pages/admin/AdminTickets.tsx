
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Terminal, LayoutDashboard, Ticket, Workflow, 
  Users, Network, Settings2, Bell, Search, 
  Plus, MoreVertical, ChevronLeft, ChevronRight,
  LogOut, ShieldCheck, AlertTriangle, RefreshCcw
} from 'lucide-react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import { ticketService } from '../../services/ticket.service';

export default function AdminTickets() {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadTickets = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await ticketService.getAll();
      setTickets(data);
    } catch (err: any) {
      setError(err.message || 'Falha ao sincronizar fila de chamados.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTickets();
  }, []);

  const getPriorityStyle = (priority: string) => {
    switch (priority?.toLowerCase()) {
      case 'crítica': return 'text-red-400 border-red-900/40 bg-red-900/20';
      case 'alta': return 'text-orange-400 border-orange-900/40 bg-orange-900/20';
      default: return 'text-slate-400 border-white/5 bg-white/5';
    }
  };

  if (loading) return (
    <div className="flex h-screen bg-[#111111] items-center justify-center gap-4">
       <div className="w-10 h-10 border-2 border-[#19C37D]/20 border-t-[#19C37D] rounded-full animate-spin"></div>
       <span className="text-[#19C37D] font-mono text-[10px] uppercase tracking-widest">Fetching_Ticket_Queue...</span>
    </div>
  );

  return (
    <div className="flex h-screen overflow-hidden bg-[#111111] text-[#E2E8F0] font-sans antialiased">
      <AdminSidebar />

      <main className="flex-1 flex flex-col min-w-0 bg-[#111111]">
        <header className="h-20 border-b border-[#2A2A2A] bg-[#1A1A1A]/50 backdrop-blur-xl flex items-center justify-between px-10 sticky top-0 z-20">
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-black text-white uppercase tracking-tight flex items-center">
              Operações Internas <span className="text-[#888888] font-medium mx-3 opacity-50">/</span> Tickets Ativos
            </h1>
          </div>
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3 px-4 py-2 bg-black/30 border border-[#2A2A2A] rounded-full">
              <span className="w-2 h-2 rounded-full bg-[#19C37D] animate-pulse"></span>
              <span className="text-[10px] font-mono text-[#888888] uppercase tracking-[0.2em] font-bold">Sistema Nominal</span>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-10 space-y-10 custom-scrollbar">
          {error ? (
            <div className="bg-[#1A1A1A] border border-red-500/20 rounded-2xl p-20 flex flex-col items-center text-center space-y-6 shadow-2xl">
               <AlertTriangle size={48} className="text-red-500" />
               <h3 className="text-xl font-black text-white uppercase italic tracking-tighter">Support_Service_Offline</h3>
               <p className="text-slate-500 font-mono text-xs uppercase max-w-sm">{error}</p>
               <button onClick={loadTickets} className="px-10 py-4 bg-[#19C37D] text-black rounded-xl font-black uppercase text-xs tracking-widest flex items-center gap-2">
                 <RefreshCcw size={16} /> RECONNECT_QUEUE
               </button>
            </div>
          ) : (
            <>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-[#1A1A1A] p-6 rounded-2xl border border-[#2A2A2A] shadow-xl">
                <div className="flex items-center gap-6 flex-1 max-w-3xl">
                  <div className="relative flex-1">
                    <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#888888]" />
                    <input className="w-full bg-[#111111] border border-[#2A2A2A] rounded-xl py-3 pl-12 pr-6 text-xs font-bold uppercase tracking-widest text-[#EDEDED] outline-none" placeholder="Buscar chamados..." />
                  </div>
                </div>
                <button className="bg-[#19C37D] text-black px-8 py-3.5 rounded-xl text-xs font-black uppercase tracking-[0.2em] hover:brightness-110 shadow-lg active:scale-95">
                  NOVO TICKET
                </button>
              </div>

              <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl overflow-hidden shadow-2xl">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-[#2A2A2A] bg-black/20 text-[9px] uppercase tracking-[0.2em] font-black text-[#888888]">
                      <th className="px-8 py-5">ID</th>
                      <th className="px-8 py-5">Empresa</th>
                      <th className="px-8 py-5">Assunto</th>
                      <th className="px-8 py-5">Prioridade</th>
                      <th className="px-8 py-5 text-right">Ação</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#2A2A2A]">
                    {tickets.map((ticket, i) => (
                      <tr key={i} className="hover:bg-white/2 transition-all cursor-default group">
                        <td className="px-8 py-6 font-mono text-[11px] font-bold text-[#888888]">#{ticket.id}</td>
                        <td className="px-8 py-6">
                           <span className="text-xs font-black text-[#EDEDED] uppercase tracking-tight">{ticket.clientName}</span>
                        </td>
                        <td className="px-8 py-6">
                          <p className="text-xs font-black text-[#EDEDED] uppercase tracking-tight group-hover:text-[#19C37D] transition-colors">{ticket.subject}</p>
                        </td>
                        <td className="px-8 py-6">
                          <span className={`px-3 py-1.5 rounded-lg border text-[9px] font-black uppercase tracking-widest ${getPriorityStyle(ticket.priority)}`}>
                            {ticket.priority}
                          </span>
                        </td>
                        <td className="px-8 py-6 text-right">
                          <button className="p-2 text-[#2A2A2A] hover:text-[#19C37D] transition-colors"><MoreVertical size={20} /></button>
                        </td>
                      </tr>
                    ))}
                    {tickets.length === 0 && (
                      <tr>
                        <td colSpan={5} className="px-8 py-20 text-center text-[10px] font-black uppercase text-slate-700 italic tracking-[0.2em]">
                          Queue_Empty_No_Tickets_Found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Terminal, LayoutDashboard, Ticket, Workflow, 
  Users, Network, Settings2, Bell, Search, 
  PlusCircle, MoreVertical, ChevronLeft, ChevronRight,
  LogOut, ShieldCheck, Filter, Download, Briefcase,
  CheckCircle2, Hourglass, TrendingUp, AlertTriangle, RefreshCcw
} from 'lucide-react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import { clientService } from '../../services/client.service';

export default function AdminClients() {
  const navigate = useNavigate();
  const [clients, setClients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadClients = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await clientService.getAll();
      setClients(data);
    } catch (err: any) {
      setError(err.message || 'Falha ao recuperar base de clientes.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadClients();
  }, []);

  if (loading) return (
    <div className="flex h-screen bg-[#111111] items-center justify-center">
       <div className="w-10 h-10 border-2 border-[#19C37D]/20 border-t-[#19C37D] rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="flex h-screen overflow-hidden bg-[#111111] text-[#E2E8F0] font-sans antialiased">
      <AdminSidebar />

      <main className="flex-1 flex flex-col min-w-0 bg-[#111111]">
        <header className="h-20 border-b border-[#2A2A2A] bg-[#1A1A1A]/50 backdrop-blur-xl flex items-center justify-between px-10 sticky top-0 z-20">
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-black text-white uppercase tracking-tight flex items-center">
              Gestão de Clientes <span className="text-[#888888] font-medium mx-3 opacity-50">/</span> Admin
            </h1>
          </div>
          <div className="flex items-center gap-8">
            <div className="relative group">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#888888]" />
              <input className="w-80 bg-black/40 border border-[#2A2A2A] rounded-xl py-2.5 pl-12 pr-6 text-xs font-bold uppercase tracking-widest text-white focus:outline-none focus:ring-1 focus:ring-[#19C37D]/30 transition-all" placeholder="Buscar clientes..." type="text" />
            </div>
            <button className="text-[#888888] hover:text-white transition-colors p-2"><Bell size={20} /></button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-10 space-y-10 custom-scrollbar">
          {error ? (
            <div className="bg-[#1A1A1A] border border-red-500/20 rounded-2xl p-20 flex flex-col items-center text-center space-y-6 shadow-2xl">
               <AlertTriangle size={48} className="text-red-500" />
               <h3 className="text-xl font-black text-white uppercase italic tracking-tighter">Client_Database_Offline</h3>
               <p className="text-slate-500 font-mono text-xs uppercase max-w-sm">{error}</p>
               <button onClick={loadClients} className="px-10 py-4 bg-[#19C37D] text-black rounded-xl font-black uppercase text-xs tracking-widest flex items-center gap-2">
                 <RefreshCcw size={16} /> RECONNECT_NODE
               </button>
            </div>
          ) : (
            <>
              <div className="flex justify-end">
                <button 
                  onClick={() => navigate('/admin/clients/new')}
                  className="bg-[#19C37D] hover:brightness-110 text-black font-black px-7 py-3.5 rounded-xl flex items-center gap-3 transition-all shadow-xl shadow-[#19C37D]/10 active:scale-95 uppercase tracking-widest text-xs"
                >
                  <PlusCircle size={20} strokeWidth={3} /> Cadastrar Novo Cliente
                </button>
              </div>

              <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl overflow-hidden shadow-2xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-black/20 border-b border-[#2A2A2A] text-[10px] font-black text-[#666] uppercase tracking-[0.2em]">
                        <th className="px-8 py-5">Empresa</th>
                        <th className="px-8 py-5">Contato Principal</th>
                        <th className="px-8 py-5">Status</th>
                        <th className="px-8 py-5 text-right">Ações</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#2A2A2A]">
                      {clients.map((client, i) => (
                        <tr key={i} className="hover:bg-white/[0.02] transition-colors group cursor-default">
                          <td className="px-8 py-6">
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-xl bg-[#111] border border-[#2A2A2A] flex items-center justify-center text-[#19C37D] font-black">
                                {client.id.substring(0, 2).toUpperCase()}
                              </div>
                              <div className="text-sm font-black text-[#EDEDED] uppercase tracking-tight">{client.name}</div>
                            </div>
                          </td>
                          <td className="px-8 py-6">
                            <div className="flex flex-col">
                              <span className="text-xs font-black text-[#EDEDED] uppercase tracking-tight">{client.contact}</span>
                              <span className="text-[10px] text-[#666] font-bold tracking-widest mt-1">{client.email}</span>
                            </div>
                          </td>
                          <td className="px-8 py-6">
                            <span className="px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest bg-[#19C37D]/10 text-[#19C37D] border border-[#19C37D]/20">Ativo</span>
                          </td>
                          <td className="px-8 py-6 text-right">
                            <button className="px-4 py-2 text-[10px] font-black uppercase tracking-widest bg-black/40 hover:bg-[#EDEDED] hover:text-black rounded-lg border border-[#2A2A2A] transition-all">Gerenciar</button>
                          </td>
                        </tr>
                      ))}
                      {clients.length === 0 && (
                        <tr>
                          <td colSpan={4} className="px-8 py-20 text-center text-[10px] font-black uppercase text-slate-700 italic tracking-[0.2em]">
                            Empty_Client_Directory
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

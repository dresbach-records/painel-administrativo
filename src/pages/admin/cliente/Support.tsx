
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  PlusCircle, MessageSquare, ShieldCheck, Send, 
  ChevronRight, X, AlertTriangle, RefreshCcw
} from 'lucide-react';
import ClientSidebar from '../../components/client/ClientSidebar';
import { clientDataService, Ticket } from '../../services/clientDataService';

export default function Support() {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTicket, setNewTicket] = useState({ title: '', description: '', status: 'Aberto' as any });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadTickets = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await clientDataService.getTickets();
      setTickets(data);
    } catch (err: any) {
      setError(err.message || 'Falha ao sincronizar com o nó de suporte.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTickets();
  }, []);

  const handleCreateTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTicket.title) return;
    try {
      await clientDataService.createTicket(newTicket);
      setIsModalOpen(false);
      setNewTicket({ title: '', description: '', status: 'Aberto' });
      loadTickets();
    } catch (err) {
      alert("Falha ao abrir chamado.");
    }
  };

  return (
    <div className="min-h-screen bg-[#f6f8f7] flex font-display text-slate-800 antialiased">
      <ClientSidebar />

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-xl w-full max-w-md shadow-2xl border border-slate-100">
            <div className="p-6 border-b border-slate-50 flex items-center justify-between">
              <h2 className="font-bold text-sm uppercase tracking-widest">Novo Chamado</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-300 hover:text-slate-900"><X size={20} /></button>
            </div>
            <form onSubmit={handleCreateTicket} className="p-6 space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase text-slate-400">Assunto</label>
                <input required className="w-full bg-slate-50 border border-slate-100 rounded-lg px-4 py-2.5 text-sm font-semibold outline-none focus:ring-1 focus:ring-[#19C37D]" value={newTicket.title} onChange={e => setNewTicket({...newTicket, title: e.target.value})} placeholder="Título técnico..." />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase text-slate-400">Descrição</label>
                <textarea className="w-full bg-slate-50 border border-slate-100 rounded-lg px-4 py-2.5 text-sm min-h-[100px] outline-none" placeholder="Detalhes da ocorrência..." value={newTicket.description} onChange={e => setNewTicket({...newTicket, description: e.target.value})}></textarea>
              </div>
              <button type="submit" className="w-full bg-[#19C37D] text-white py-3 rounded-lg font-bold uppercase text-[10px] tracking-widest shadow-md">Abrir Chamado</button>
            </form>
          </div>
        </div>
      )}

      <main className="flex-1 lg:ml-[260px] flex flex-col min-w-0">
        <div className="w-full max-w-[1280px] mx-auto px-6 py-6 space-y-6">
          <header className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h1 className="text-xl font-semibold text-slate-900">Suporte Técnico</h1>
              <p className="text-xs text-slate-400 font-medium uppercase tracking-widest mt-0.5">Gestão de Ocorrências</p>
            </div>
            <button onClick={() => setIsModalOpen(true)} className="bg-[#19C37D] text-white px-5 py-2.5 rounded-lg font-bold text-[10px] uppercase tracking-widest flex items-center gap-2 shadow-md">
              <PlusCircle size={16} /> Abrir Chamado
            </button>
          </header>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-40 gap-4">
              <div className="w-10 h-10 border-2 border-[#19C37D]/20 border-t-[#19C37D] rounded-full animate-spin"></div>
              <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Fetching_Support_Queue...</span>
            </div>
          ) : error ? (
            <div className="bg-white border border-red-100 rounded-2xl p-20 flex flex-col items-center text-center space-y-6 shadow-sm">
               <AlertTriangle size={48} className="text-red-500" />
               <h3 className="text-lg font-bold text-slate-900 uppercase">Support_Service_Offline</h3>
               <p className="text-sm text-slate-500 font-medium">{error}</p>
               <button onClick={loadTickets} className="px-8 py-3 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                 <RefreshCcw size={14} /> Retry_Sync
               </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              <div className="xl:col-span-2 bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-50 bg-slate-50/10">
                  <h2 className="text-xs font-semibold uppercase tracking-widest flex items-center gap-2"><MessageSquare size={14} className="text-slate-400" /> Histórico de Tickets</h2>
                </div>
                <div className="divide-y divide-slate-50">
                  {tickets.map(ticket => (
                    <div key={ticket.id} onClick={() => navigate(`/client/support/ticket/${ticket.id}`)} className="p-6 flex items-start justify-between hover:bg-slate-50/50 transition-all cursor-pointer group">
                      <div className="space-y-2">
                         <div className="flex items-center gap-3">
                            <span className="text-sm font-bold text-slate-900 truncate uppercase">#{ticket.id} - {ticket.title}</span>
                            <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase ${ticket.status === 'Urgente' ? 'bg-red-50 text-red-500' : 'bg-blue-50 text-blue-600'}`}>{ticket.status}</span>
                         </div>
                         <p className="text-xs text-slate-400 truncate max-w-md">{ticket.description}</p>
                         <p className="text-[9px] font-bold text-slate-300 uppercase">Responsável: {ticket.agent || 'Pendente'}</p>
                      </div>
                      <ChevronRight size={18} className="text-slate-200 group-hover:text-[#19C37D]" />
                    </div>
                  ))}
                  {tickets.length === 0 && <div className="p-20 text-center text-slate-300 text-[10px] font-bold uppercase tracking-widest italic">Queue_Empty_No_Tickets_Found</div>}
                </div>
              </div>

              <aside className="space-y-6">
                <div className="bg-white border border-slate-100 rounded-xl p-6 shadow-sm h-[160px] flex flex-col justify-between">
                  <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2"><ShieldCheck size={14} className="text-[#19C37D]" /> SLA de Resposta</h3>
                  <div className="space-y-3">
                     <div className="flex justify-between text-xs font-semibold"><span className="text-slate-400 uppercase">Urgente</span><span className="text-red-500">15 min</span></div>
                     <div className="flex justify-between text-xs font-semibold"><span className="text-slate-400 uppercase">Geral</span><span className="text-slate-700">12h</span></div>
                  </div>
                </div>
              </aside>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

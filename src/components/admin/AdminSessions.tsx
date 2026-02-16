
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, ChevronLeft, ChevronRight, Video, Link2, Edit2, Trash2 } from 'lucide-react';
import AdminSidebar from '@/@/components/admin/AdminSidebar';
import { clientDataService, Meeting } from '@/@/services/clientDataService';

export default function AdminSessions() {
  const navigate = useNavigate();
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMeetings();
    window.addEventListener('storage', loadMeetings);
    return () => window.removeEventListener('storage', loadMeetings);
  }, []);

  const loadMeetings = async () => {
    const data = await clientDataService.getMeetings();
    setMeetings(data);
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Deseja realmente cancelar esta reunião?")) {
      await clientDataService.deleteMeeting(id);
      loadMeetings();
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#111111] text-[#E2E8F0] font-sans antialiased">
      <AdminSidebar />

      <main className="flex-1 flex flex-col min-w-0 bg-[#111111] relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#19C37D]/5 blur-[150px] rounded-full pointer-events-none"></div>

        <header className="p-10 pb-4 flex items-center justify-between relative z-10">
          <div>
            <h1 className="text-3xl font-black text-white uppercase tracking-tighter">Sessões Técnicas</h1>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px] mt-2">Gestão de cronograma vindo do banco de dados.</p>
          </div>
          <button onClick={() => navigate('/admin/schedule')} className="bg-[#19C37D] hover:brightness-110 text-black font-black px-8 py-3 rounded-xl flex items-center gap-3 transition-all shadow-xl uppercase tracking-widest text-xs">
            <Plus size={18} strokeWidth={3} /> Agendar Nova
          </button>
        </header>

        <div className="flex-1 p-10 relative z-10 overflow-y-auto custom-scrollbar">
          <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-[2rem] overflow-hidden shadow-2xl">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-black/20 border-b border-[#2A2A2A] text-[10px] font-black text-slate-600 uppercase tracking-[0.2em]">
                  <th className="px-10 py-6">Data / Hora</th>
                  <th className="px-10 py-6">Título da Sessão</th>
                  <th className="px-10 py-6">Status</th>
                  <th className="px-10 py-6 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {meetings.map((m) => (
                  <tr key={m.id} className="hover:bg-white/[0.01] transition-colors group">
                    <td className="px-10 py-8">
                      <div className="flex flex-col">
                        <span className="text-sm font-black text-white uppercase tracking-tight">{m.date}</span>
                        <span className="text-[10px] font-bold text-[#19C37D] uppercase mt-1">{m.time}</span>
                      </div>
                    </td>
                    <td className="px-10 py-8">
                      <div className="flex flex-col">
                        <span className="text-sm font-black text-slate-200 uppercase tracking-tight">{m.title}</span>
                      </div>
                    </td>
                    <td className="px-10 py-8">
                       <span className={`px-2 py-1 rounded text-[9px] font-black uppercase ${
                         m.status === 'Em Andamento' ? 'bg-[#19C37D] text-black animate-pulse' : 'bg-white/5 text-slate-500'
                       }`}>{m.status}</span>
                    </td>
                    <td className="px-10 py-8 text-right">
                      <div className="flex items-center justify-end gap-3 opacity-30 group-hover:opacity-100 transition-all">
                        {m.status !== 'Concluído' && (
                          <button 
                            onClick={() => navigate('/admin/meeting')}
                            className="p-2.5 text-slate-400 hover:text-[#19C37D] hover:bg-[#19C37D]/5 rounded-xl"
                          >
                            <Video size={18} />
                          </button>
                        )}
                        <button onClick={() => handleDelete(m.id)} className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-500/5 rounded-xl"><Trash2 size={18} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
                {meetings.length === 0 && !loading && (
                   <tr><td colSpan={4} className="p-20 text-center text-slate-600 font-black uppercase text-xs">Nenhuma sessão encontrada.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

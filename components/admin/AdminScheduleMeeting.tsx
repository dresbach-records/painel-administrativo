
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Search, Video, ShieldCheck, Clock, CalendarCheck } from 'lucide-react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import { clientDataService } from '../../services/clientDataService';

export default function AdminScheduleMeeting() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    time: '',
    duration: '1 hora'
  });
  const [isSaving, setIsSaving] = useState(false);

  const participants = [
    { name: 'Ricardo Silva', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop' },
    { name: 'Ana Costa', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop' }
  ];

  const handleConfirmSchedule = async () => {
    if (!formData.title || !formData.date) return alert("Preencha o título e a data.");
    
    setIsSaving(true);
    await clientDataService.scheduleMeeting({
      title: formData.title,
      date: formData.date,
      time: formData.time,
      participants: participants.map(p => p.name)
    });
    
    setTimeout(() => {
      navigate('/admin/sessions');
    }, 500);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#111111] text-[#E2E8F0] font-sans antialiased">
      <AdminSidebar />

      <main className="flex-1 flex flex-col min-w-0 bg-[#111111] relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#19C37D]/5 blur-[150px] rounded-full pointer-events-none"></div>

        <header className="p-10 pb-4 flex items-center justify-between relative z-10">
          <div>
            <h1 className="text-3xl font-black text-white uppercase tracking-tighter">Agendar Reunião Técnica</h1>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px] mt-2">Sessão persistente para o ecossistema do cliente.</p>
          </div>
          <button onClick={() => navigate('/admin/sessions')} className="p-3 text-slate-600 hover:text-white transition-colors bg-white/5 rounded-2xl border border-white/5">
            <X size={24} />
          </button>
        </header>

        <div className="flex-1 p-10 flex justify-center overflow-y-auto custom-scrollbar relative z-10">
          <div className="w-full max-w-4xl space-y-10">
            <section className="bg-[#1A1A1A] border border-[#2A2A2A] p-12 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
              <div className="grid grid-cols-1 gap-10">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Título da Sessão</label>
                  <input 
                    value={formData.title}
                    onChange={e => setFormData({...formData, title: e.target.value})}
                    className="w-full h-16 bg-[#111] border border-[#2A2A2A] rounded-2xl px-8 text-sm font-bold text-white focus:outline-none focus:ring-1 focus:ring-[#19C37D]/30 transition-all placeholder:text-slate-800 uppercase tracking-widest" 
                    placeholder="Ex: Code Review - Módulo Auth" 
                    type="text" 
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Data</label>
                    <input 
                      value={formData.date}
                      onChange={e => setFormData({...formData, date: e.target.value})}
                      className="w-full h-16 bg-[#111] border border-[#2A2A2A] rounded-2xl px-8 text-sm font-bold text-white focus:outline-none focus:ring-1 focus:ring-[#19C37D]/30 transition-all [color-scheme:dark]" 
                      type="date" 
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Horário</label>
                    <input 
                      value={formData.time}
                      onChange={e => setFormData({...formData, time: e.target.value})}
                      className="w-full h-16 bg-[#111] border border-[#2A2A2A] rounded-2xl px-8 text-sm font-bold text-white focus:outline-none focus:ring-1 focus:ring-[#19C37D]/30 transition-all [color-scheme:dark]" 
                      type="time" 
                    />
                  </div>
                </div>
              </div>
            </section>

            <div className="flex items-center gap-6 pt-4">
              <button 
                onClick={handleConfirmSchedule}
                disabled={isSaving}
                className="flex-1 h-20 bg-[#19C37D] hover:brightness-110 text-black font-black rounded-[1.5rem] transition-all shadow-2xl flex items-center justify-center gap-4 text-xs uppercase tracking-[0.3em] active:scale-[0.98]"
              >
                <CalendarCheck size={24} strokeWidth={3} /> {isSaving ? "PROCESSANDO..." : "CONFIRMAR E SALVAR"}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

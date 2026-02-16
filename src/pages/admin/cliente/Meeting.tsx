
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Video, Mic, MicOff, VideoOff, Settings as SettingsIcon,
  Terminal, User, Lock, Activity, CalendarDays
} from 'lucide-react';
import ClientSidebar from '../../../components/client/ClientSidebar';
import { clientDataService, Meeting as MeetingType } from '../../../services/clientDataService';

export default function Meeting() {
  const navigate = useNavigate();
  const [micOn, setMicOn] = useState(true);
  const [videoOn, setVideoOn] = useState(true);
  const [nextMeeting, setNextMeeting] = useState<MeetingType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMeeting();
    window.addEventListener('storage', loadMeeting);
    return () => window.removeEventListener('storage', loadMeeting);
  }, []);

  const loadMeeting = async () => {
    const data = await clientDataService.getMeetings();
    // Pega a primeira reunião que não está concluída
    const active = data.find((m: MeetingType) => m.status === 'Agendado' || m.status === 'Em Andamento');
    setNextMeeting(active || null);
    setLoading(false);
  };

  const handleJoin = () => {
    if (nextMeeting?.status === 'Em Andamento') {
      navigate('/client/meeting/active');
    } else {
      alert("Aguardando o anfitrião iniciar a sala técnica.");
    }
  };

  return (
    <div className="min-h-screen bg-[#f6f8f7] flex font-display text-slate-800">
      <ClientSidebar />

      <main className="flex-1 lg:ml-72 p-10 min-w-0 flex items-center justify-center">
        {loading ? (
           <div className="text-[#19C37D] font-black uppercase animate-pulse">Sync_Node_State...</div>
        ) : !nextMeeting ? (
          <div className="text-center space-y-6 animate-in fade-in">
             <CalendarDays size={64} className="mx-auto text-slate-200" />
             <h2 className="text-2xl font-black text-slate-400 uppercase tracking-tighter">Nenhuma reunião agendada</h2>
             <p className="text-slate-400 text-sm font-bold uppercase">Consulte seu Account Manager para novos agendamentos.</p>
          </div>
        ) : (
          <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center animate-in fade-in duration-500">
            <div className="lg:col-span-7 flex flex-col gap-8">
              <div className="relative aspect-video bg-[#1a1a1a] rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-200 group">
                {videoOn ? (
                  <img 
                    alt="Camera Preview" 
                    className="absolute inset-0 w-full h-full object-cover opacity-80 blur-[1px] grayscale-[30%]" 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1200&auto=format&fit=crop" 
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-slate-900">
                    <VideoOff size={64} className="text-slate-700" />
                  </div>
                )}
                
                <div className="absolute inset-0 bg-black/20"></div>
                
                <div className="relative z-10 flex flex-col h-full items-center justify-center">
                  <div className="w-24 h-24 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 mb-6">
                    <User size={48} className="text-white" />
                  </div>
                  <span className="text-white font-black text-[10px] uppercase tracking-[0.2em] bg-black/30 px-6 py-2 rounded-full border border-white/10 backdrop-blur-sm">
                    {videoOn ? 'Câmera Ativa' : 'Câmera Off'}
                  </span>
                </div>
              </div>

              <div className="flex justify-center items-center gap-6">
                <button onClick={() => setMicOn(!micOn)} className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${micOn ? 'bg-[#19C37D] text-white shadow-lg' : 'bg-red-500 text-white shadow-lg'}`}>
                  {micOn ? <Mic size={28} /> : <MicOff size={28} />}
                </button>
                <button onClick={() => setVideoOn(!videoOn)} className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${videoOn ? 'bg-[#19C37D] text-white shadow-lg' : 'bg-red-500 text-white shadow-lg'}`}>
                  {videoOn ? <Video size={28} /> : <VideoOff size={28} />}
                </button>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="bg-white rounded-[2.5rem] border border-slate-100 p-10 shadow-xl space-y-10">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 bg-[#19C37D] rounded-lg flex items-center justify-center"><Terminal size={16} className="text-white" /></div>
                    <span className="text-[10px] font-black text-[#19C37D] tracking-[0.3em] uppercase">TechLabs Meeting</span>
                  </div>
                  <h1 className="text-3xl font-black text-slate-900 leading-tight uppercase tracking-tighter mb-4">{nextMeeting.title}</h1>
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                    {nextMeeting.date} <span className="opacity-30">•</span> {nextMeeting.time}
                  </p>
                </div>

                <div className="space-y-4">
                  {nextMeeting.status === 'Em Andamento' ? (
                    <div className="p-6 bg-[#19C37D]/10 rounded-2xl border border-[#19C37D]/20 flex items-center gap-4">
                       <div className="w-3 h-3 rounded-full bg-[#19C37D] animate-pulse"></div>
                       <span className="text-xs font-black uppercase text-[#19C37D] tracking-widest">Sessão iniciada pelo Host</span>
                    </div>
                  ) : (
                    <div className="p-6 bg-blue-50/50 rounded-2xl border border-dashed border-blue-100 flex items-center gap-4">
                       <Lock size={16} className="text-blue-500" />
                       <span className="text-xs font-bold uppercase text-blue-500 tracking-widest">Aguardando Host iniciar</span>
                    </div>
                  )}

                  <button 
                    onClick={handleJoin}
                    className={`w-full py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl transition-all ${
                      nextMeeting.status === 'Em Andamento' 
                      ? 'bg-[#19C37D] text-white shadow-[#19C37D]/30 hover:brightness-105 active:scale-95' 
                      : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    Entrar na Sala Técnica
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

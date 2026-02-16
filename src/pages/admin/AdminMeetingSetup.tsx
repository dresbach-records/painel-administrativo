
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Terminal, LayoutDashboard, Ticket, Workflow, 
  Users, Network, Settings2, Video, Mic, Settings,
  Check, Copy, PlayCircle, Shield, FolderArchive,
  FileCheck, History, ToggleLeft, ToggleRight,
  Camera, CameraOff, MicOff, LogOut
} from 'lucide-react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import { clientDataService, Meeting } from '../../services/clientDataService';

export default function AdminMeetingSetup() {
  const navigate = useNavigate();
  const [config, setConfig] = useState({
    record: false,
    mute: true,
    lobby: true
  });
  const [copied, setCopied] = useState(false);
  const [upcomingMeeting, setUpcomingMeeting] = useState<Meeting | null>(null);

  useEffect(() => {
    async function load() {
      const meetings = await clientDataService.getMeetings();
      const next = meetings.find(m => m.status === 'Agendado');
      setUpcomingMeeting(next || null);
    }
    load();
  }, []);

  const handleLogout = () => {
    navigate('/admin/login');
  };

  const copyLink = () => {
    navigator.clipboard.writeText('techlabs.io/join/active-session');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const startMeeting = async () => {
    if (upcomingMeeting) {
      await clientDataService.updateMeetingStatus(upcomingMeeting.id, 'Em Andamento');
    }
    navigate('/admin/meeting/active');
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#111111] text-[#E2E8F0] font-sans antialiased">
      <AdminSidebar />

      <main className="flex-1 flex flex-col min-w-0 bg-[#111111] items-center justify-center p-10 relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-[0.03] pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#19C37D]/5 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="w-full max-w-4xl relative z-10 animate-in fade-in zoom-in-95 duration-700">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 mb-4">
               <div className="w-8 h-8 bg-[#19C37D] rounded flex items-center justify-center shadow-lg shadow-[#19C37D]/20">
                 <Video size={18} className="text-black" />
               </div>
               <span className="text-sm font-black text-[#19C37D] uppercase tracking-[0.3em]">TechLabs Meeting</span>
            </div>
            <h1 className="text-4xl font-black text-white uppercase tracking-tighter">
              {upcomingMeeting ? upcomingMeeting.title : 'Iniciar Nova Sessão Técnica'}
            </h1>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px] mt-2">
              {upcomingMeeting ? `Agendada para ${upcomingMeeting.date} às ${upcomingMeeting.time}` : 'Preparação do ambiente virtual'}
            </p>
          </div>

          <div className="bg-[#1A1A1A] border border-white/5 rounded-[2.5rem] p-10 md:p-16 shadow-2xl flex flex-col md:flex-row gap-16 items-stretch">
            <div className="flex-1 flex flex-col">
              <div className="relative aspect-square bg-[#0D0D0D] rounded-3xl border border-white/5 flex flex-col items-center justify-center overflow-hidden group shadow-inner">
                <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] to-black opacity-60"></div>
                <Camera size={120} strokeWidth={0.5} className="text-white/5" />
                <div className="absolute bottom-6 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#19C37D]">
                  <Check size={12} strokeWidth={4} /> Câmera e microfone prontos
                </div>
              </div>
            </div>

            <div className="flex-1 flex flex-col justify-between py-2">
              <div className="space-y-10">
                <div>
                  <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-8">Configurações Rápidas</h3>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between group">
                      <span className="text-xs font-black uppercase text-slate-400 group-hover:text-white transition-colors">Gravar Sessão</span>
                      <button onClick={() => setConfig({...config, record: !config.record})} className={`w-12 h-6 rounded-full transition-all relative ${config.record ? 'bg-[#19C37D]' : 'bg-white/10'}`}>
                        <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${config.record ? 'left-7' : 'left-1'}`}></div>
                      </button>
                    </div>
                  </div>
                </div>

                <div>
                   <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4">Link para Sincronização</h3>
                   <div className="flex items-center gap-2 p-4 bg-black/40 border border-white/5 rounded-2xl">
                      <span className="flex-1 text-xs font-mono font-bold text-slate-400 tracking-tight">techlabs.io/meeting/active</span>
                      <button onClick={copyLink} className="p-2 text-slate-600 hover:text-[#19C37D]">
                        {copied ? <Check size={18} /> : <Copy size={18} />}
                      </button>
                   </div>
                </div>
              </div>

              <button 
                onClick={startMeeting}
                className="w-full mt-10 bg-[#19C37D] text-black py-6 rounded-2xl font-black text-xs uppercase tracking-[0.3em] shadow-xl hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-4"
              >
                <PlayCircle size={20} strokeWidth={3} />
                {upcomingMeeting ? 'ATIVAR SALA NO BANCO' : 'INICIAR REUNIÃO'}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

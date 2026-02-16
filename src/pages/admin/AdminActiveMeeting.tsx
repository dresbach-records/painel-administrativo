
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Mic, 
  MicOff, 
  Video, 
  VideoOff, 
  ScreenShare, 
  MessageSquare, 
  Users, 
  PhoneOff,
  ShieldCheck,
  Signal,
  MoreVertical,
  Settings,
  Info,
  ShieldAlert,
  ArrowRight,
  UserX,
  ToggleLeft,
  ToggleRight,
  Circle
} from 'lucide-react';

export default function AdminActiveMeeting() {
  const navigate = useNavigate();
  const [micOn, setMicOn] = useState(true);
  const [videoOn, setVideoOn] = useState(true);
  const [isRecording, setIsRecording] = useState(true);

  const participants = [
    { name: 'Você (Host)', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCitUU6vdrVGBjnOFBtGYYbcg5HbDxkbHS7X1Az_8SmxZK1I2F_dZ4R5HHo7C2u2OKWF10apLIPUp14TpI9ZWhh_LeM2ZdwaVzw8CnkhDSW1urUx1LW8jXls30cM5eYqPqK9kY6EKf7Y3Vgm6BjPPVAEabajSlYdf7XnVpWY714P4kX6H6of79-vJygjgVEspYm6FPQHcdOcoOt5TGWbpqCBTwqqRGUl3Kvsg7w-2odPz3_47jVIZIvkJeX65UDNN-miJEnjV3xFRpH', host: true, mic: true },
    { name: 'Ricardo O.', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop', mic: false, video: false },
    { name: 'Ana Costa', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop', mic: true, video: true, talking: true },
    { name: 'Marcos S.', initials: 'MS', mic: false, video: false }
  ];

  const handleEnd = () => {
    navigate('/admin/meeting');
  };

  return (
    <div className="h-screen w-full bg-black text-white font-display overflow-hidden flex flex-col relative animate-in fade-in duration-700">
      {/* Top Presenting Banner */}
      <div className="bg-[#19C37D]/10 border-b border-[#19C37D]/30 w-full py-2 flex items-center justify-center gap-4 z-[60] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#19C37D]/5 to-transparent animate-pulse"></div>
        <div className="flex items-center gap-3 relative z-10">
          <ScreenShare size={16} className="text-[#19C37D] animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#19C37D]">Você está apresentando sua tela</span>
          <button className="ml-6 px-4 py-1.5 bg-red-500/20 hover:bg-red-500 text-red-500 hover:text-white text-[9px] font-black uppercase tracking-widest rounded-lg border border-red-500/30 transition-all active:scale-95">
            Parar Compartilhamento
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden relative">
        {/* Main Presentation Area */}
        <main className="flex-1 p-6 flex flex-col items-center justify-center bg-[#050505] relative">
          <div className="w-full h-full max-w-6xl bg-[#0A0A0A] rounded-[2.5rem] border border-white/5 shadow-[0_0_100px_rgba(0,0,0,1)] relative overflow-hidden flex flex-col p-16">
            <div className="flex-1 flex flex-col justify-center opacity-60">
              <div className="flex justify-between items-center mb-20">
                <div className="h-24 w-40 border-2 border-[#19C37D]/40 rounded-3xl flex items-center justify-center text-[#19C37D]/60 text-[10px] font-black uppercase tracking-widest bg-[#19C37D]/5">Load Balancer</div>
                <div className="flex gap-8">
                  <div className="h-24 w-40 border-2 border-white/10 rounded-3xl flex items-center justify-center text-slate-600 text-[10px] font-black uppercase tracking-widest">Node API 01</div>
                  <div className="h-24 w-40 border-2 border-white/10 rounded-3xl flex items-center justify-center text-slate-600 text-[10px] font-black uppercase tracking-widest">Node API 02</div>
                </div>
                <div className="h-24 w-40 bg-[#19C37D]/10 border-2 border-[#19C37D] rounded-3xl flex items-center justify-center text-[#19C37D] font-black text-[10px] uppercase tracking-widest shadow-[0_0_30px_rgba(25,195,125,0.2)]">PostgreSQL Cluster</div>
              </div>
              <div className="flex-1 border-2 border-dashed border-white/5 rounded-[2rem] flex items-center justify-center relative bg-white/[0.01]">
                <span className="text-slate-700 text-xs font-mono font-bold uppercase tracking-[0.4em]">Diagrama de Infraestrutura v4.2</span>
              </div>
            </div>

            <div className="absolute bottom-8 left-8 flex items-center gap-4 bg-black/60 backdrop-blur-xl px-6 py-3 rounded-2xl border border-white/5 shadow-2xl">
              <div className="p-2 bg-[#19C37D]/10 rounded-lg text-[#19C37D]">
                <Signal size={20} strokeWidth={3} />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-black text-slate-100 uppercase tracking-tight">projeto_infra_v4.png</span>
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Apresentando para 5 pessoas</span>
              </div>
            </div>
          </div>

          <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-5">
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#19C37D] rounded-full blur-[150px]"></div>
          </div>
        </main>

        {/* Host Control Sidebar */}
        <aside className="w-80 border-l border-white/5 bg-[#0D0D0D] flex flex-col shadow-2xl z-50">
          <div className="p-6 border-b border-white/5 bg-black/20 flex items-center justify-between">
            <div>
               <h3 className="text-xs font-black text-white uppercase tracking-[0.2em]">Painel do Anfitrião</h3>
               <p className="text-[9px] text-slate-600 font-bold uppercase tracking-widest mt-1">Sessão: ADM_CORE_882</p>
            </div>
            <ShieldCheck size={20} className="text-[#19C37D]" />
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-10">
            <button className="w-full py-4 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white border border-red-500/20 rounded-2xl flex items-center justify-center gap-3 transition-all font-black text-[10px] uppercase tracking-[0.2em] active:scale-95">
              <MicOff size={16} />
              Silenciar Todos
            </button>

            <div className="space-y-6">
              <h4 className="text-[9px] font-black text-slate-500 uppercase tracking-[0.3em] mb-4">Gerenciar Permissões</h4>
              <div className="space-y-5">
                {[
                  { label: 'Compartilhar Tela', active: true },
                  { label: 'Enviar Mensagens', active: true },
                  { label: 'Ativar Microfone', active: false }
                ].map((perm, idx) => (
                  <div key={idx} className="flex items-center justify-between group">
                    <span className="text-xs font-bold text-slate-400 group-hover:text-white transition-colors uppercase tracking-tight">{perm.label}</span>
                    <button className={`w-10 h-5 rounded-full relative transition-all ${perm.active ? 'bg-[#19C37D]' : 'bg-white/5'}`}>
                      <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-all ${perm.active ? 'left-6' : 'left-1'}`}></div>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <h4 className="text-[9px] font-black text-slate-500 uppercase tracking-[0.3em] mb-4">Participantes (5)</h4>
              <div className="space-y-4">
                {participants.map((p, idx) => (
                  <div key={idx} className="flex items-center justify-between group p-2 hover:bg-white/2 rounded-xl transition-all">
                    <div className="flex items-center gap-3">
                      {p.avatar ? (
                        <div className="relative">
                           <img className="w-8 h-8 rounded-lg object-cover grayscale-[0.5] group-hover:grayscale-0 transition-all border border-white/10" src={p.avatar} alt={p.name} />
                           {p.talking && <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#19C37D] rounded-full border-2 border-[#0D0D0D] animate-pulse"></div>}
                        </div>
                      ) : (
                        <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[9px] font-black text-slate-500 uppercase">{p.initials}</div>
                      )}
                      <div>
                        <p className="text-[11px] font-black text-slate-200 uppercase tracking-tight">{p.name}</p>
                        {p.host && <p className="text-[8px] text-[#19C37D] font-black uppercase tracking-widest leading-none mt-0.5">Anfitrião</p>}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className={`p-1.5 rounded-lg transition-all ${p.mic ? 'text-[#19C37D] hover:bg-[#19C37D]/10' : 'text-slate-600 hover:bg-white/5'}`}>
                         {p.mic ? <Mic size={14} /> : <MicOff size={14} />}
                      </button>
                      {!p.host && (
                        <button className="p-1.5 rounded-lg text-slate-600 hover:text-red-500 hover:bg-red-500/10 transition-all">
                          <UserX size={14} />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-8 border-t border-white/5">
              <div className="flex items-center justify-between p-4 bg-white/[0.02] border border-white/5 rounded-2xl group hover:border-[#19C37D]/20 transition-all">
                <div className="flex flex-col">
                  <span className="text-[10px] font-black text-white uppercase tracking-widest">Gravação</span>
                  <span className="text-[8px] text-[#19C37D] font-black uppercase mt-0.5 tracking-widest animate-pulse">Em andamento</span>
                </div>
                <button 
                  onClick={() => setIsRecording(!isRecording)}
                  className={`w-12 h-6 rounded-full transition-all relative ${isRecording ? 'bg-[#19C37D]' : 'bg-white/5'}`}
                >
                  <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${isRecording ? 'left-7' : 'left-1'}`}></div>
                </button>
              </div>
            </div>
          </div>

          <div className="p-6 border-t border-white/5 bg-black/40">
            <button className="w-full flex items-center justify-between text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 hover:text-white transition-all group">
              <div className="flex items-center gap-3">
                <MessageSquare size={16} className="group-hover:text-[#19C37D] transition-colors" />
                <span>Ver Bate-papo</span>
              </div>
              <span className="bg-[#19C37D] text-black px-2 py-0.5 rounded font-black text-[9px]">2</span>
            </button>
          </div>
        </aside>
      </div>

      {/* Main Bottom Control Bar */}
      <footer className="h-24 bg-[#0A0A0A] border-t border-white/5 flex items-center justify-between px-10 z-[70] relative shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-black text-white uppercase tracking-tighter">Daily Sync - Cloud Infrastructure</span>
          <div className="flex items-center gap-3">
             <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.4)]"></span>
                <span className="text-[9px] text-slate-500 font-black uppercase tracking-widest">GRAVANDO • 12:45</span>
             </div>
             <div className="h-3 w-px bg-white/10"></div>
             <div className="flex items-center gap-2 text-[9px] text-[#19C37D] font-black uppercase tracking-widest">
                <ShieldCheck size={10} />
                Encrypted
             </div>
          </div>
        </div>

        <div className="flex items-center gap-5">
          <button 
            onClick={() => setMicOn(!micOn)}
            className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all border shadow-lg active:scale-90 ${
              micOn ? 'bg-white/5 border-white/10 text-white hover:bg-white/10' : 'bg-red-500 border-red-400 text-white'
            }`}
          >
            {micOn ? <Mic size={20} /> : <MicOff size={20} />}
          </button>
          <button 
            onClick={() => setVideoOn(!videoOn)}
            className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all border shadow-lg active:scale-90 ${
              videoOn ? 'bg-white/5 border-white/10 text-white hover:bg-white/10' : 'bg-red-500 border-red-400 text-white'
            }`}
          >
            {videoOn ? <Video size={20} /> : <VideoOff size={20} />}
          </button>
          
          <div className="w-px h-8 bg-white/10 mx-2"></div>

          <button className="w-16 h-12 rounded-2xl bg-[#19C37D] text-black flex items-center justify-center transition-all shadow-[0_0_20px_rgba(25,195,125,0.3)] hover:brightness-110 active:scale-95">
            <ScreenShare size={20} strokeWidth={3} />
          </button>
          
          <button className="w-12 h-12 rounded-2xl bg-[#19C37D]/10 border border-[#19C37D]/30 text-[#19C37D] flex items-center justify-center transition-all hover:bg-[#19C37D]/20">
            <Settings size={20} />
          </button>

          <div className="w-px h-8 bg-white/10 mx-2"></div>

          <button 
            onClick={handleEnd}
            className="h-12 px-10 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white border border-red-500/20 flex items-center justify-center gap-3 transition-all font-black text-[10px] uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-red-500/5 active:scale-95"
          >
            <PhoneOff size={18} />
            Encerrar
          </button>
        </div>

        <div className="flex items-center gap-6">
          <button className="text-slate-500 hover:text-white transition-colors p-2"><Info size={22} /></button>
          <button className="text-slate-500 hover:text-white transition-colors p-2"><MoreVertical size={22} /></button>
        </div>
      </footer>

      {/* Decorative Branding */}
      <div className="fixed top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#19C37D]/5 blur-[150px] rounded-full pointer-events-none z-0"></div>
    </div>
  );
}


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
  MoreHorizontal
} from 'lucide-react';

export default function ActiveMeeting() {
  const navigate = useNavigate();
  const [micOn, setMicOn] = useState(true);
  const [videoOn, setVideoOn] = useState(true);

  const participants = [
    { name: 'Ricardo Silva (Você)', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop', active: true, speaking: true },
    { name: 'Ana Costa', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop', active: false },
    { name: 'Marcos Silva', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop', active: false, muted: true },
    { name: 'Fabio Santos', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop', active: false },
    { name: 'Larissa Bezerra', initials: 'LB', active: false, videoOff: true },
    { name: 'Convidado Externo', placeholder: true, active: false }
  ];

  const handleEnd = () => {
    navigate('/client/meeting');
  };

  return (
    <div className="h-screen w-full bg-black text-white font-display overflow-hidden flex flex-col relative animate-in fade-in duration-700">
      {/* Header Info */}
      <header className="fixed top-0 left-0 right-0 p-6 flex justify-between items-center z-50 pointer-events-none">
        <div className="flex items-center gap-4 pointer-events-auto bg-black/40 backdrop-blur-xl px-5 py-2.5 rounded-2xl border border-white/5 shadow-2xl">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-[#19C37D] animate-pulse"></div>
            <span className="text-sm font-mono font-bold tracking-widest uppercase">01:24:05</span>
          </div>
          <div className="h-4 w-px bg-white/10 mx-2"></div>
          <div className="flex items-center gap-2 text-[#19C37D]">
            <Signal size={14} />
            <span className="text-[10px] font-black uppercase tracking-widest">HD STABLE</span>
          </div>
        </div>

        <div className="pointer-events-auto">
          <div className="flex items-center gap-3 bg-black/40 backdrop-blur-xl px-4 py-2 rounded-2xl border border-white/5">
            <ShieldCheck size={14} className="text-[#19C37D]" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Criptografia Ponta a Ponta</span>
          </div>
        </div>
      </header>

      {/* Video Grid */}
      <main className="flex-1 p-8 pt-24 pb-32 flex items-center justify-center overflow-hidden">
        <div className="h-full w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
          {participants.map((p, idx) => (
            <div 
              key={idx} 
              className={`relative rounded-[2rem] overflow-hidden bg-[#0A0A0A] border transition-all duration-500 ${
                p.speaking ? 'border-[#19C37D] shadow-[0_0_30px_rgba(25,195,125,0.15)] ring-2 ring-[#19C37D]/20' : 'border-white/5'
              }`}
            >
              {p.avatar && !p.videoOff ? (
                <img src={p.avatar} className="w-full h-full object-cover opacity-80" alt={p.name} />
              ) : p.initials ? (
                <div className="w-full h-full flex items-center justify-center bg-[#111]">
                  <div className="w-24 h-24 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-3xl font-black text-slate-400 uppercase tracking-tighter">
                    {p.initials}
                  </div>
                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#0D0D0D] to-black">
                  <div className="w-20 h-20 rounded-full bg-white/2 flex items-center justify-center text-slate-700">
                    <Users size={40} strokeWidth={1} />
                  </div>
                </div>
              )}

              {/* Muted Indicator */}
              {p.muted && (
                <div className="absolute top-4 right-4 bg-red-500 p-2 rounded-full shadow-lg border border-red-400/20">
                  <MicOff size={14} className="text-white" />
                </div>
              )}

              {/* Video Off Indicator */}
              {p.videoOff && (
                <div className="absolute top-4 right-4 bg-black/60 p-2 rounded-full border border-white/10 backdrop-blur-sm">
                  <VideoOff size={14} className="text-white" />
                </div>
              )}

              {/* Label */}
              <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-black/60 backdrop-blur-md px-4 py-2 rounded-xl border border-white/5">
                {p.speaking && (
                  <div className="flex gap-0.5 items-center">
                    <div className="w-0.5 h-2 bg-[#19C37D] animate-pulse"></div>
                    <div className="w-0.5 h-3 bg-[#19C37D] animate-pulse delay-75"></div>
                    <div className="w-0.5 h-1.5 bg-[#19C37D] animate-pulse delay-150"></div>
                  </div>
                )}
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-100">{p.name}</span>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Control Bar */}
      <footer className="fixed bottom-0 left-0 right-0 p-8 flex justify-center items-center z-50">
        <div className="bg-[#1A1A1A]/80 backdrop-blur-2xl border border-white/10 px-8 py-5 rounded-[2.5rem] flex items-center gap-6 shadow-2xl relative">
          <button 
            onClick={() => setMicOn(!micOn)}
            className={`w-14 h-14 rounded-full flex items-center justify-center transition-all active:scale-90 ${
              micOn ? 'bg-white/5 hover:bg-white/10 text-white' : 'bg-red-500 text-white'
            }`}
          >
            {micOn ? <Mic size={24} /> : <MicOff size={24} />}
          </button>
          
          <button 
            onClick={() => setVideoOn(!videoOn)}
            className={`w-14 h-14 rounded-full flex items-center justify-center transition-all active:scale-90 ${
              videoOn ? 'bg-white/5 hover:bg-white/10 text-white' : 'bg-red-500 text-white'
            }`}
          >
            {videoOn ? <Video size={24} /> : <VideoOff size={24} />}
          </button>

          <div className="w-px h-8 bg-white/10"></div>

          <button className="w-14 h-14 rounded-full bg-white/5 hover:bg-[#19C37D]/10 hover:text-[#19C37D] text-white flex items-center justify-center transition-all">
            <ScreenShare size={24} />
          </button>

          <button className="w-14 h-14 rounded-full bg-white/5 hover:bg-white/10 text-white flex items-center justify-center transition-all relative">
            <MessageSquare size={24} />
            <span className="absolute top-3 right-3 w-2 h-2 bg-[#19C37D] rounded-full ring-2 ring-[#1A1A1A]"></span>
          </button>

          <button className="w-14 h-14 rounded-full bg-white/5 hover:bg-white/10 text-white flex items-center justify-center transition-all">
            <Users size={24} />
          </button>

          <div className="w-px h-8 bg-white/10"></div>

          <button 
            onClick={handleEnd}
            className="h-14 px-8 bg-red-500 hover:bg-red-600 text-white rounded-2xl flex items-center gap-3 transition-all active:scale-95 group"
          >
            <PhoneOff size={20} className="group-hover:rotate-[-135deg] transition-transform" />
            <span className="text-[11px] font-black uppercase tracking-widest">Encerrar</span>
          </button>
        </div>
      </header>

      {/* Tech Background Detail */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-[#19C37D]/5 blur-[150px] rounded-full pointer-events-none z-0"></div>
    </div>
  );
}


import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, RefreshCcw, Eye, Signal, Users } from 'lucide-react';
import AdminSidebar from '../../components/admin/AdminSidebar';

export default function AdminActiveRooms() {
  const navigate = useNavigate();

  const activeRooms = [
    { title: 'Code Review: Core Engine', startTime: 'Iniciado às 14:30 (Há 45min)', participants: '05', bitrate: '2.4 Mbps', members: ['https://lh3.googleusercontent.com/aida-public/AB6AXuCitUU6vdrVGBjnOFBtGYYbcg5HbDxkbHS7X1Az_8SmxZK1I2F_dZ4R5HHo7C2u2OKWF10apLIPUp14TpI9ZWhh_LeM2ZdwaVzw8CnkhDSW1urUx1LW8jXls30cM5eYqPqK9kY6EKf7Y3Vgm6BjPPVAEabajSlYdf7XnVpWY714P4kX6H6of79-vJygjgVEspYm6FPQHcdOcoOt5TGWbpqCBTwqqRGUl3Kvsg7w-2odPz3_47jVIZIvkJeX65UDNN-miJEnjV3xFRpH'], extra: 3 },
    { title: 'Onboarding Cliente: FinTech Pro', startTime: 'Iniciado às 15:05 (Há 10min)', participants: '02', bitrate: '1.8 Mbps', members: ['https://lh3.googleusercontent.com/aida-public/AB6AXuCitUU6vdrVGBjnOFBtGYYbcg5HbDxkbHS7X1Az_8SmxZK1I2F_dZ4R5HHo7C2u2OKWF10apLIPUp14TpI9ZWhh_LeM2ZdwaVzw8CnkhDSW1urUx1LW8jXls30cM5eYqPqK9kY6EKf7Y3Vgm6BjPPVAEabajSlYdf7XnVpWY714P4kX6H6of79-vJygjgVEspYm6FPQHcdOcoOt5TGWbpqCBTwqqRGUl3Kvsg7w-2odPz3_47jVIZIvkJeX65UDNN-miJEnjV3xFRpH'], extra: 1 },
    { title: 'Workshop: Web3 Architecture', startTime: 'Iniciado às 14:00 (Há 1h 15min)', participants: '08', bitrate: '4.2 Mbps', members: ['https://lh3.googleusercontent.com/aida-public/AB6AXuCitUU6vdrVGBjnOFBtGYYbcg5HbDxkbHS7X1Az_8SmxZK1I2F_dZ4R5HHo7C2u2OKWF10apLIPUp14TpI9ZWhh_LeM2ZdwaVzw8CnkhDSW1urUx1LW8jXls30cM5eYqPqK9kY6EKf7Y3Vgm6BjPPVAEabajSlYdf7XnVpWY714P4kX6H6of79-vJygjgVEspYm6FPQHcdOcoOt5TGWbpqCBTwqqRGUl3Kvsg7w-2odPz3_47jVIZIvkJeX65UDNN-miJEnjV3xFRpH'], extra: 7 }
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-[#111111] text-[#E2E8F0] font-sans antialiased">
      <AdminSidebar />

      <main className="flex-1 flex flex-col min-w-0 bg-[#111111] relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#19C37D]/5 blur-[150px] rounded-full pointer-events-none"></div>

        <header className="p-10 pb-4 flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-4 mb-2">
               <h1 className="text-3xl font-black text-white uppercase tracking-tighter">Salas Ativas em Tempo Real</h1>
               <span className="px-3 py-1 bg-[#19C37D]/10 text-[#19C37D] border border-[#19C37D]/20 rounded-lg text-[9px] font-black uppercase tracking-widest">Monitoramento Admin</span>
            </div>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Acompanhamento de sessões técnicas em andamento na plataforma.</p>
          </div>
          <div className="flex items-center gap-4">
             <div className="px-4 py-2 bg-black/40 border border-white/5 rounded-xl flex items-center gap-3">
                <div className="w-2 h-2 bg-[#19C37D] rounded-full animate-pulse shadow-[0_0_8px_#19C37D]"></div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">8 Sessões Ativas</span>
             </div>
             <button className="p-3 bg-white/5 border border-white/5 rounded-xl text-slate-500 hover:text-white transition-all shadow-xl active:scale-95">
                <RefreshCcw size={18} />
             </button>
          </div>
        </header>

        <div className="flex-1 p-10 overflow-y-auto custom-scrollbar relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {activeRooms.map((room, i) => (
              <div key={i} className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-[2.5rem] p-8 shadow-2xl hover:border-[#19C37D]/30 transition-all group flex flex-col">
                <div className="flex justify-between items-start mb-8">
                   <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#19C37D] animate-pulse"></div>
                      <span className="text-[9px] font-black text-[#19C37D] uppercase tracking-[0.2em]">Live Now</span>
                   </div>
                   <div className="flex -space-x-3 items-center">
                      {room.members.map((m, idx) => (
                        <img key={idx} className="w-8 h-8 rounded-full border-2 border-[#1A1A1A] object-cover grayscale group-hover:grayscale-0 transition-all" src={m} alt="" />
                      ))}
                      {room.extra > 0 && <div className="w-8 h-8 rounded-full bg-[#222] border-2 border-[#1A1A1A] flex items-center justify-center text-[9px] font-black text-[#19C37D]">+{room.extra}</div>}
                   </div>
                </div>
                <div className="mb-10">
                   <h3 className="text-xl font-black text-white uppercase tracking-tight group-hover:text-[#19C37D] transition-colors mb-2 leading-tight">{room.title}</h3>
                   <div className="flex items-center gap-2 text-slate-600">
                      <Activity size={14} />
                      <span className="text-[10px] font-bold uppercase tracking-widest">{room.startTime}</span>
                   </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-10">
                   <div className="bg-black/30 p-5 rounded-2xl border border-white/5 space-y-2">
                      <p className="text-[9px] font-black text-slate-600 uppercase">Participantes</p>
                      <div className="flex items-center gap-2">
                         <Users size={16} className="text-[#19C37D]" />
                         <span className="text-xl font-black text-white">{room.participants}</span>
                      </div>
                   </div>
                   <div className="bg-black/30 p-5 rounded-2xl border border-white/5 space-y-2">
                      <p className="text-[9px] font-black text-slate-600 uppercase">Bitrate</p>
                      <div className="flex items-center gap-2">
                         <Signal size={16} className="text-[#19C37D]" />
                         <span className="text-xl font-black text-white">{room.bitrate.split(' ')[0]}</span>
                      </div>
                   </div>
                </div>
                <button onClick={() => navigate('/admin/meeting/active')} className="w-full py-4 bg-white/5 border border-white/5 text-slate-400 hover:bg-[#19C37D] hover:text-black rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3">
                  <Eye size={16} /> Entrar como Observador
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

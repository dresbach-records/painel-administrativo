
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Headset, Cpu, ArrowRight, ShieldCheck, Zap, Globe, Lock } from 'lucide-react';
import ClientSidebar from '../../components/client/ClientSidebar';

export default function ConsultationTypeSelection() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f6f8f7] flex font-display text-slate-800 antialiased">
      <ClientSidebar />

      <main className="flex-1 lg:ml-72 p-10 min-w-0 flex flex-col items-center justify-center">
        <div className="max-w-4xl w-full text-center mb-16">
           <div className="inline-flex items-center gap-3 mb-6 bg-white px-5 py-2 rounded-full border border-slate-100 shadow-sm">
              <ShieldCheck size={16} className="text-[#19C37D]" />
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Dresbach Architecture Hub</span>
           </div>
           <h1 className="text-4xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter leading-tight">Escolha seu Modelo de <br /><span className="text-[#19C37D]">Consultoria Técnica</span></h1>
        </div>

        <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-10">
           {/* HUMAN CONSULTATION */}
           <div className="bg-white border border-slate-100 rounded-[2.5rem] p-12 shadow-sm hover:shadow-xl transition-all group flex flex-col">
              <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center mb-10 group-hover:scale-110 transition-transform">
                <Headset size={32} />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter mb-4">Consultor Humano</h3>
                <p className="text-slate-400 text-sm leading-relaxed font-medium mb-8">Agende uma call de 45 minutos com um Arquiteto Sênior. Ideal para discussões estratégicas profundas e alinhamento de roadmap.</p>
                
                <ul className="space-y-4 mb-10">
                   {['Análise Personalizada', 'Discovery Presencial (Video)', 'Feedback Imediato'].map(item => (
                     <li key={item} className="flex items-center gap-3 text-xs font-bold text-slate-500 uppercase tracking-widest">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div> {item}
                     </li>
                   ))}
                </ul>
              </div>
              
              <div className="pt-8 border-t border-slate-50">
                 <div className="flex justify-between items-center mb-8">
                    <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">SLA: Sob Agendamento</span>
                    <span className="text-sm font-black text-slate-900">FREE / INCLUSO</span>
                 </div>
                 <button 
                  onClick={() => navigate('/client/schedule-call')}
                  className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-black transition-all flex items-center justify-center gap-3 active:scale-95 shadow-xl shadow-slate-900/10"
                 >
                    Agendar Call <ArrowRight size={18} />
                 </button>
              </div>
           </div>

           {/* AI CONSULTATION (PAID) */}
           <div className="bg-white border-2 border-[#19C37D] rounded-[2.5rem] p-12 shadow-2xl relative overflow-hidden group flex flex-col">
              <div className="absolute top-0 right-0 bg-[#19C37D] text-black font-black text-[10px] uppercase px-6 py-2 tracking-widest rounded-bl-2xl shadow-lg">Popular</div>
              
              <div className="w-16 h-16 bg-[#19C37D]/10 text-[#19C37D] rounded-2xl flex items-center justify-center mb-10 group-hover:scale-110 transition-transform">
                <Zap size={32} />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter mb-4">Dresbach IA Architect</h3>
                <p className="text-slate-400 text-sm leading-relaxed font-medium mb-8">Consultoria técnica imediata baseada em IA de alta fidelidade. Ingestão de repositórios, auditoria SAST e blueprint completo.</p>
                
                <ul className="space-y-4 mb-10">
                   {['Análise Real de Código', 'Auditoria de Vulnerabilidades', 'Blueprint de Implementação', 'Relatório para Download'].map(item => (
                     <li key={item} className="flex items-center gap-3 text-xs font-bold text-slate-500 uppercase tracking-widest">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#19C37D]"></div> {item}
                     </li>
                   ))}
                </ul>
              </div>
              
              <div className="pt-8 border-t border-slate-50">
                 <div className="flex justify-between items-center mb-8">
                    <span className="text-[10px] font-black text-[#19C37D] uppercase tracking-widest animate-pulse">SLA: Imediato</span>
                    <span className="text-sm font-black text-slate-900">A PARTIR DE $99.00</span>
                 </div>
                 <button 
                  onClick={() => navigate('/client/projects/new')}
                  className="w-full bg-[#19C37D] text-white py-5 rounded-2xl font-black uppercase text-xs tracking-widest hover:brightness-105 transition-all flex items-center justify-center gap-3 active:scale-95 shadow-xl shadow-[#19C37D]/20"
                 >
                    Iniciar Consultoria IA <Cpu size={18} />
                 </button>
              </div>
           </div>
        </div>

        <div className="mt-16 flex items-center gap-6 opacity-30">
           <div className="flex items-center gap-2"><Lock size={14} /><span className="text-[10px] font-black uppercase tracking-widest">Secure Checkout</span></div>
           <div className="flex items-center gap-2"><Globe size={14} /><span className="text-[10px] font-black uppercase tracking-widest">Global Support</span></div>
        </div>
      </main>
    </div>
  );
}

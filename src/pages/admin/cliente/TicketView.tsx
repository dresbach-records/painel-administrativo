
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  ChevronRight,
  X,
  FileText,
  FileImage,
  Download,
  Send,
  Bold,
  Italic,
  Code,
  Paperclip,
  Link2,
  Image as ImageIcon,
  Info,
  Star
} from 'lucide-react';
import ClientSidebar from '../../components/client/ClientSidebar';

export default function TicketView() {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <div className="flex h-screen overflow-hidden bg-[#f6f8f7] font-display text-slate-800">
      <ClientSidebar />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 lg:ml-72">
        <header className="h-24 border-b border-slate-100 bg-white/80 backdrop-blur-md flex items-center justify-between px-10 sticky top-0 z-10">
          <div className="flex flex-col">
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">
              <button onClick={() => navigate('/client/support')} className="hover:text-[#19C37D]">Suporte</button>
              <ChevronRight size={10} className="text-slate-300" />
              <span>Tickets</span>
              <ChevronRight size={10} className="text-slate-300" />
              <span className="text-[#19C37D]">#{id || '742'}</span>
            </div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Ticket #{id || '742'}</h1>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('/client/support')} className="flex items-center gap-2 px-6 py-3 border border-slate-100 rounded-xl text-xs font-black uppercase tracking-widest text-slate-500">
              <X size={16} />
              Fechar
            </button>
          </div>
        </header>

        <div className="flex-1 flex overflow-hidden">
          <div className="flex-1 flex flex-col bg-slate-50/30 overflow-y-auto">
            <div className="p-10 space-y-12 max-w-5xl mx-auto w-full">
              <div className="flex gap-6 items-start">
                <div className="flex-shrink-0">
                  <img className="w-12 h-12 rounded-2xl shadow-sm" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop" alt="User" />
                </div>
                <div className="space-y-3 flex-1">
                  <div className="flex items-baseline gap-3">
                    <span className="font-black text-sm text-slate-900 uppercase tracking-tight">Ricardo Silva</span>
                  </div>
                  <div className="bg-white p-6 rounded-[2rem] rounded-tl-none border border-slate-100 shadow-sm text-sm font-medium leading-relaxed text-slate-600">
                    <p>Olá time TechLabs, estou enfrentando um erro intermitente ao tentar autenticar na sandbox.</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-6 items-start flex-row-reverse text-right">
                <div className="flex-shrink-0">
                  <img className="w-12 h-12 rounded-2xl border-2 border-[#19C37D]" src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop" alt="Staff" />
                </div>
                <div className="space-y-3 flex-1">
                  <div className="flex items-baseline justify-end gap-3">
                    <span className="font-black text-sm text-[#19C37D] uppercase tracking-tight">Ricardo Almeida</span>
                  </div>
                  <div className="bg-[#19C37D] text-white p-8 rounded-[2rem] rounded-tr-none text-sm font-semibold text-left">
                    <p>Olá Ricardo! Analisei seus logs e identifiquei a causa. Já estamos corrigindo.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-auto p-8 bg-white border-t border-slate-100 sticky bottom-0">
              <div className="max-w-5xl mx-auto flex gap-4">
                <input className="flex-1 bg-slate-50 border-none rounded-xl px-6 py-4 text-sm font-medium outline-none" placeholder="Responder..." />
                <button className="bg-[#19C37D] text-white p-4 rounded-xl"><Send size={20} /></button>
              </div>
            </div>
          </div>

          <aside className="w-80 border-l border-slate-50 bg-white p-8 overflow-y-auto hidden xl:flex flex-col gap-10">
            <div className="space-y-6">
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-300">Informações</h3>
              <div className="space-y-4 bg-slate-50/50 p-6 rounded-[2rem] border border-slate-100 text-xs font-bold uppercase tracking-widest">
                <div className="flex justify-between"><span>Status</span><span className="text-[#19C37D]">Em Análise</span></div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}


import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { 
  ShieldAlert, AlertTriangle, CheckCircle2, Lock, 
  ArrowRight, FileText, Code, Headset, Zap,
  CreditCard, ShieldCheck, HelpCircle, ChevronRight,
  Monitor, Terminal
} from 'lucide-react';
import ClientSidebar from '../../components/client/ClientSidebar';
import { clientDataService, Project } from '../../services/clientDataService';

export default function AuditResult() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      if (id) {
        try {
           const data = await clientDataService.getProjectById(id);
           setProject(data || null);
        } catch (e) {
           console.error("Audit_Object_Fetch_Failed");
        }
      }
      setLoading(false);
    }
    load();
  }, [id]);

  if (loading) return (
    <div className="min-h-screen bg-[#f6f8f7] flex items-center justify-center">
      <div className="text-[#19C37D] font-black uppercase tracking-[0.3em] animate-pulse">Syncing_Audit_Payload...</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f6f8f7] font-display text-slate-800 antialiased flex">
      <ClientSidebar />

      <main className="flex-1 lg:ml-72 flex flex-col h-screen overflow-hidden">
        <header className="bg-white border-b border-slate-100 sticky top-0 z-50 px-10 h-20 shrink-0 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-[#19C37D] rounded-xl flex items-center justify-center text-white shadow-lg shadow-[#19C37D]/20">
              <Zap size={22} strokeWidth={2.5} />
            </div>
            <div>
               <span className="text-xl font-black tracking-tighter text-slate-900 uppercase">TechLabs <span className="text-[#19C37D]">IA Audit</span></span>
               <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-0.5">Dresbach Core v2.4</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="text-slate-400 hover:text-slate-900 transition-colors"><HelpCircle size={22} /></button>
            <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400">
               <Monitor size={20} />
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-10 custom-scrollbar bg-[#f6f8f7]">
          <div className="max-w-7xl mx-auto">
            <div className="mb-12 text-center lg:text-left">
              <h1 className="text-4xl font-black text-slate-900 uppercase tracking-tighter italic">Processamento Concluído</h1>
              <p className="text-slate-500 font-medium mt-2">Os dados brutos foram analisados pelo motor IA. Ative o relatório para acessar os blueprints de correção.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white p-8 rounded-[2rem] border-l-8 border-red-500 shadow-sm flex items-center justify-between group">
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Pontos Críticos</p>
                  <h3 className="text-5xl font-black text-slate-900 tracking-tighter">--</h3>
                </div>
                <div className="w-14 h-14 bg-red-50 rounded-xl flex items-center justify-center text-red-500">
                  <ShieldAlert size={28} />
                </div>
              </div>

              <div className="bg-white p-8 rounded-[2rem] border-l-8 border-amber-500 shadow-sm flex items-center justify-between group">
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Alertas</p>
                  <h3 className="text-5xl font-black text-slate-900 tracking-tighter">--</h3>
                </div>
                <div className="w-14 h-14 bg-amber-50 rounded-xl flex items-center justify-center text-amber-500">
                  <AlertTriangle size={28} />
                </div>
              </div>

              <div className="bg-white p-8 rounded-[2rem] border-l-8 border-[#19C37D] shadow-sm flex items-center justify-between group">
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Otimizados</p>
                  <h3 className="text-5xl font-black text-slate-900 tracking-tighter">--</h3>
                </div>
                <div className="w-14 h-14 bg-[#19C37D]/10 rounded-xl flex items-center justify-center text-[#19C37D]">
                  <CheckCircle2 size={28} />
                </div>
              </div>
            </div>

            {/* Restricted Content Notice */}
            <div className="relative overflow-hidden rounded-[3rem] border border-slate-200 bg-white shadow-2xl min-h-[500px] flex flex-col items-center justify-center">
              <div className="max-w-xl w-full text-center p-12 md:p-16 space-y-10">
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-[2rem] bg-[#19C37D]/10 text-[#19C37D] shadow-inner mb-6">
                  <Lock size={42} strokeWidth={2.5} />
                </div>
                
                <div className="space-y-4">
                  <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter italic">Relatório Bloqueado</h2>
                  <p className="text-slate-500 font-medium leading-relaxed">
                    A análise detalhada de segurança e os patches de código gerados pela IA são ativos de propriedade técnica da TechLabs. 
                    O acesso exige autorização de faturamento confirmada pelo nó central.
                  </p>
                </div>

                <div className="pt-6 space-y-8">
                  <button 
                    onClick={() => navigate(`/client/consultation/checkout/${id}`)}
                    className="w-full bg-[#19C37D] hover:bg-[#15a86a] text-white font-black py-6 rounded-2xl flex items-center justify-center gap-4 transition-all shadow-xl shadow-[#19C37D]/20 uppercase tracking-[0.2em] text-xs active:scale-[0.98]"
                  >
                    <Zap size={20} fill="currentColor" />
                    Ativar Download do Protocolo
                    <ArrowRight size={20} />
                  </button>

                  <div className="flex flex-col items-center gap-6">
                    <div className="flex items-center gap-6 text-slate-300 grayscale opacity-40">
                      <img alt="Visa" className="h-4" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD0SElqo4GtbzcnXEFeOz-X9XrcdTm0HcMM4deKwDWx2sbnk1N1itpHWEGcDthq5SNlKmww2TFaH-Hsj74vPPuBZY-JyWKwMWWzRkx9YyrDY0qPyTkDhThHGy5gbOwduDXIjD3gPLiq8UOH3b3_9iNId6cmhcULBbsDtAMjaOPXGMZUVnwYUu_Yp-6T2Hg9WkgNMDbvWKHs8DKDf0NiNjPpQ3IQZDmIMobUwK2abFujOTzy4GjmEovTJh8GtO_Rw-06JoBlNBA-FXv6"/>
                      <img alt="Mastercard" className="h-6" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBFtGn67dZbew5-vRgWgE23iXe5qZNJ2u_28rzBmDl3nFpPaQ_8ILVxBgCDa_Q8HDWcTaM9O4UPAa0GwBHhp3D818gxUSVeaaLUo0CprBY0wY0jk9psp8Bx5G230rveoMMBtNks5V9c12I_1jbQfahHhQ2Meji8h2xT5x1UwjLxsjbTcBC0b5Ir4Wh9JE2hq3Tj1UqCGE8Y8SQmqhqpAHuTb5dVSZiM4RbHY2ZndxKFrBhN04ndbEE6dEqfmWiizmyjj6GgDSXIgHdl"/>
                      <span className="text-[10px] font-black uppercase text-slate-400">PIX</span>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-slate-400 font-black uppercase tracking-widest border border-slate-100 px-4 py-1.5 rounded-full">
                      <ShieldCheck size={14} className="text-[#19C37D]" />
                      B2B_SECURE_HANDSHAKE
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="flex items-center gap-6 p-8 bg-white border border-slate-100 rounded-3xl group">
                <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-300 group-hover:text-[#19C37D] transition-colors">
                  <FileText size={24} />
                </div>
                <div>
                  <h4 className="font-black text-slate-900 uppercase tracking-tight text-sm">Documentação PDF</h4>
                  <p className="text-xs text-slate-500 mt-1 font-medium italic">Exportação nível Enterprise.</p>
                </div>
              </div>

              <div className="flex items-center gap-6 p-8 bg-white border border-slate-100 rounded-3xl group">
                <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-300 group-hover:text-[#19C37D] transition-colors">
                  <Code size={24} />
                </div>
                <div>
                  <h4 className="font-black text-slate-900 uppercase tracking-tight text-sm">Scripts de Patch</h4>
                  <p className="text-xs text-slate-500 mt-1 font-medium italic">Correções automáticas via IA.</p>
                </div>
              </div>

              <div className="flex items-center gap-6 p-8 bg-white border border-slate-100 rounded-3xl group">
                <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-300 group-hover:text-[#19C37D] transition-colors">
                  <Headset size={24} />
                </div>
                <div>
                  <h4 className="font-black text-slate-900 uppercase tracking-tight text-sm">Expert Support</h4>
                  <p className="text-xs text-slate-500 mt-1 font-medium italic">Discovery call inclusa.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <footer className="bg-white border-t border-slate-100 py-12 shrink-0">
          <div className="max-w-7xl mx-auto px-10 flex flex-col md:flex-row items-center justify-between opacity-50">
            <span className="text-[10px] font-black uppercase tracking-widest">© 2024 TechLabs IA. Protected Access Node.</span>
            <div className="flex gap-8 text-[9px] font-black uppercase tracking-widest">
               <ShieldCheck size={18} />
               <Terminal size={18} />
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

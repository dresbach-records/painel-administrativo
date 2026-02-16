
import React, { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { 
  Zap, CheckCircle2, Search, DraftingCompass, 
  Rocket, FileText, Globe, Headset, 
  ShieldCheck, ArrowRight, Calendar, MessageSquare,
  Download, FileType, History, Mail, LogOut,
  Circle, Info, Activity, Clock, Layout, FileOutput
} from 'lucide-react';

export default function WelcomeOnboarding() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoadingCalendar, setIsLoadingCalendar] = useState(true);

  const handleDownload = (fileName: string) => {
    alert(`Iniciando download seguro: ${fileName}`);
  };

  return (
    <div className="min-h-screen bg-[#fcfdfc] font-display text-slate-800 antialiased animate-in fade-in duration-700">
      {/* Header Corporativo */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50 px-8 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#19C37D] rounded flex items-center justify-center text-white shadow-lg shadow-[#19C37D]/20">
              <Zap size={18} strokeWidth={3} />
            </div>
            <span className="text-xl font-black tracking-tighter text-slate-900 uppercase">TechLabs <span className="text-[#19C37D]">AI</span></span>
          </div>
          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
              <span className="w-2 h-2 bg-[#19C37D] rounded-full animate-pulse"></span>
              Conta Ativada
            </div>
            <button 
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-slate-500 hover:text-[#19C37D] transition-colors text-[10px] font-black uppercase tracking-widest"
            >
              <LogOut size={16} /> Sair
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-8 py-16">
        {/* Banner de Sucesso */}
        <div className="text-center mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#19C37D]/10 text-[#19C37D] text-[10px] font-black uppercase tracking-[0.2em] border border-[#19C37D]/20">
            <CheckCircle2 size={14} /> Pagamento Confirmado
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter leading-tight uppercase italic">
            Bem-vindo à vanguarda da <span className="text-[#19C37D]">IA</span>.
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed">
            Sua jornada de transformação digital começou. O próximo passo é agendar sua Chamada de Diagnóstico com o seu consultor dedicado.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20 items-start">
          {/* Coluna Esquerda: Agendamento */}
          <div className="lg:col-span-8">
            <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm flex flex-col h-full min-h-[550px]">
              <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-slate-50/20">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-[#19C37D]/10 text-[#19C37D] rounded-xl"><Calendar size={22} /></div>
                  <h2 className="text-lg font-black text-slate-900 uppercase tracking-tight">Chamada de Diagnóstico Inicial</h2>
                </div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-4 py-1.5 border border-slate-100 rounded-full">Duração: 60 min</span>
              </div>
              
              <div className="flex-1 flex flex-col items-center justify-center p-12 relative bg-slate-50/30">
                {isLoadingCalendar && (
                  <div className="text-center space-y-6">
                    <div className="w-20 h-20 bg-white rounded-[2rem] shadow-xl flex items-center justify-center mx-auto relative group">
                       <Clock size={32} className="text-slate-200 animate-spin" />
                       <div className="absolute inset-0 bg-[#19C37D]/5 rounded-[2rem] animate-pulse"></div>
                    </div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Carregando disponibilidade em tempo real...</p>
                    
                    {/* Placeholder visual do calendário */}
                    <div className="w-full max-w-md mx-auto grid grid-cols-7 gap-3 opacity-10 grayscale pointer-events-none">
                       {Array.from({ length: 14 }).map((_, i) => (
                         <div key={i} className="aspect-square bg-slate-200 rounded-xl"></div>
                       ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Coluna Direita: Perfil e Próximos Passos */}
          <div className="lg:col-span-4 space-y-8 sticky top-24">
            {/* Account Manager Card */}
            <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-center">
                <div className="relative inline-block mb-6">
                  <img 
                    className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-2xl grayscale hover:grayscale-0 transition-all duration-700" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCIU9Rcq7yIybqNZ3MOP1ICcLS-ziOL6pa-OAsQ_02eKBD-q5QSF7dGmxBgBsk3dqqzoRXOOFO0SHLcnEJPZP3eoxBI736wtLihVi0utcNzTMiL_wX9iApcowWFXqorpjvc1JK8wvYgo4gEECLPbMapav0yngz4-VnD6NbburyTBvmcKjOKwKVUx_8AX1OdPU2TOFTFJo4tfWLJkHe2gbBfgRFUxVJRagQjO8Wu_tFi8dOhxUms3-lbhNzwaYth9GVl4Kd4d8T2LhZb" 
                    alt="Dr. Marcos Silva" 
                  />
                  <div className="absolute bottom-1 right-1 w-6 h-6 bg-[#19C37D] border-4 border-white rounded-full"></div>
                </div>
                <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Dr. Marcos Silva</h3>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mt-2 mb-8 italic">Seu Account Manager & Estrategista de IA</p>
                
                <div className="space-y-6 text-left">
                  <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <History size={18} className="text-[#19C37D] shrink-0 mt-0.5" />
                    <p className="text-[11px] text-slate-500 font-bold leading-relaxed uppercase">Especialista em LLMs e Automação B2B com +10 anos de experiência.</p>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <MessageSquare size={18} className="text-[#19C37D] shrink-0 mt-0.5" />
                    <p className="text-[11px] text-slate-500 font-bold leading-relaxed uppercase">Canal direto via Slack disponível após o agendamento.</p>
                  </div>
                </div>

                <div className="h-px bg-slate-100 my-8"></div>
                
                <button className="w-full py-4 rounded-2xl border border-slate-200 hover:border-[#19C37D]/50 text-slate-700 hover:text-[#19C37D] text-[10px] font-black uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-3 hover:bg-[#19C37D]/5 active:scale-95">
                  <Mail size={18} strokeWidth={3} /> Enviar Mensagem
                </button>
              </div>
            </div>

            {/* Checklist Sidebar */}
            <div className="p-8 bg-[#19C37D]/5 border border-[#19C37D]/20 rounded-3xl space-y-6 shadow-sm">
              <h4 className="text-[11px] font-black text-[#19C37D] uppercase tracking-[0.4em]">Próximos Passos</h4>
              <ul className="space-y-6">
                <li className="flex items-center gap-4 group">
                  <div className="w-7 h-7 rounded-full bg-[#19C37D] text-black flex items-center justify-center text-[10px] font-black shadow-lg shadow-[#19C37D]/20">1</div>
                  <span className="text-[11px] font-black uppercase tracking-widest text-slate-900">Agendar o Diagnóstico</span>
                </li>
                <li className="flex items-center gap-4 opacity-40 grayscale group">
                  <div className="w-7 h-7 rounded-full bg-slate-200 text-slate-400 flex items-center justify-center text-[10px] font-black">2</div>
                  <span className="text-[11px] font-black uppercase tracking-widest text-slate-500">Revisar Documentação</span>
                </li>
                <li className="flex items-center gap-4 opacity-40 grayscale group">
                  <div className="w-7 h-7 rounded-full bg-slate-200 text-slate-400 flex items-center justify-center text-[10px] font-black">3</div>
                  <span className="text-[11px] font-black uppercase tracking-widest text-slate-500">Chamada de Kickoff</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Seção de Recursos Iniciais */}
        <section className="pt-20 border-t border-slate-100">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
            <div>
              <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">Recursos e Documentos Iniciais</h2>
              <p className="text-slate-400 font-bold uppercase tracking-widest text-xs mt-2">Prepare-se para nossa primeira reunião consultando os materiais abaixo.</p>
            </div>
            <Link to={`/client/projects/${id}`} className="text-[10px] font-black text-slate-400 hover:text-[#19C37D] transition-colors flex items-center gap-2 uppercase tracking-widest group">
              Ver todos os arquivos
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Guia de Onboarding IA', type: 'PDF', icon: <FileType size={32} />, desc: 'Instruções passo-a-passo para integrar sua equipe ao nosso ecossistema.' },
              { title: 'Template de Briefing Técnico', type: 'DOCX', icon: <FileText size={32} />, desc: 'Estrutura recomendada para o levantamento de requisitos de dados.' },
              { title: 'Roadmap de Implementação', type: 'PDF', icon: <Activity size={32} />, desc: 'Cronograma macro das fases de arquitetura, treino e deploy.' }
            ].map((item, idx) => (
              <div key={idx} className="bg-white border border-slate-200 p-8 rounded-3xl hover:shadow-xl hover:border-[#19C37D]/20 transition-all group flex flex-col h-full">
                <div className="flex items-start justify-between mb-10">
                  <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300 transition-colors group-hover:text-[#19C37D] group-hover:bg-[#19C37D]/5 shadow-inner">
                    {item.icon}
                  </div>
                  <span className="text-[9px] font-black text-slate-400 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100 uppercase tracking-widest">{item.type}</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-black text-lg text-slate-900 uppercase tracking-tight mb-2 group-hover:text-[#19C37D] transition-colors">{item.title}</h3>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed mb-10">{item.desc}</p>
                </div>
                <button 
                  onClick={() => handleDownload(item.title)}
                  className="w-full py-4 bg-slate-50 hover:bg-[#19C37D] text-slate-600 hover:text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 active:scale-[0.98] border border-slate-100 shadow-sm"
                >
                  <Download size={16} strokeWidth={3} /> Download
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer Minimalista */}
      <footer className="mt-20 py-12 border-t border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-10 opacity-60">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-slate-400 rounded flex items-center justify-center text-white">
               <Zap size={14} strokeWidth={3} />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-600">TechLabs AI Consulting © 2024</span>
          </div>
          <div className="flex gap-8 text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">
            <button className="hover:text-[#19C37D] transition-colors">Segurança</button>
            <button className="hover:text-[#19C37D] transition-colors">Privacidade</button>
            <button className="hover:text-[#19C37D] transition-colors">Compliance</button>
            <button className="hover:text-[#19C37D] transition-colors">Suporte B2B</button>
          </div>
          <div className="flex items-center gap-2 text-slate-400 text-[9px] font-black uppercase tracking-widest">
            <Globe size={12} />
            Global Operations: SP | SF | LDN | TR
          </div>
        </div>
      </footer>
    </div>
  );
}

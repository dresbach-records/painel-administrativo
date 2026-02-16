
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Terminal, LayoutDashboard, Ticket, Workflow, 
  Users, Network, Settings2, Bell, Search, 
  LogOut, ShieldCheck, ChevronRight, ArrowRight,
  Building2, FileText, UserCheck, Globe, X, Check
} from 'lucide-react';

export default function AdminNewClient() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/admin/login');
  };

  const managers = [
    { name: 'Alex Rivers', role: 'Senior AM', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop' },
    { name: 'Sarah Connor', role: 'Global Accounts', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop' },
    { name: 'Marcus Vinicius', role: 'Tech Lead / AM', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop' }
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-[#111111] text-[#E2E8F0] font-sans antialiased">
      {/* Sidebar - Padrão Admin */}
      <aside className="w-72 border-r border-[#2A2A2A] bg-[#1A1A1A] flex flex-col shrink-0">
        <div className="p-8 border-b border-[#2A2A2A]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#19C37D] rounded flex items-center justify-center">
              <Terminal className="text-black" size={20} strokeWidth={3} />
            </div>
            <span className="font-black text-2xl tracking-tighter text-white uppercase italic">TechLabs</span>
          </div>
        </div>

        <nav className="flex-1 p-6 space-y-1.5 overflow-y-auto custom-scrollbar">
          <button onClick={() => navigate('/admin/dashboard')} className="w-full flex items-center gap-4 p-4 rounded-xl text-[#888888] hover:bg-white/5 hover:text-white transition-all text-sm font-semibold">
            <LayoutDashboard size={20} /> Visão Geral
          </button>
          <button onClick={() => navigate('/admin/tickets')} className="w-full flex items-center gap-4 p-4 rounded-xl text-[#888888] hover:bg-white/5 hover:text-white transition-all text-sm font-semibold">
            <Ticket size={20} className="rotate-45" /> Tickets Ativos
          </button>
          <button onClick={() => navigate('/admin/projects')} className="w-full flex items-center gap-4 p-4 rounded-xl text-[#888888] hover:bg-white/5 hover:text-white transition-all text-sm font-semibold">
            <Workflow size={20} /> Projetos
          </button>
          <button onClick={() => navigate('/admin/clients')} className="w-full flex items-center gap-4 p-4 rounded-xl bg-[#19C37D]/10 text-[#19C37D] border-l-4 border-[#19C37D] font-bold text-sm transition-all shadow-lg">
            <Users size={20} /> Gestão de Clientes
          </button>
          <button onClick={() => navigate('/admin/infrastructure')} className="w-full flex items-center gap-4 p-4 rounded-xl text-[#888888] hover:bg-white/5 hover:text-white transition-all text-sm font-semibold">
            <Network size={20} /> Infraestrutura
          </button>
          <div className="pt-6 mt-6 border-t border-[#2A2A2A]">
            <button className="w-full flex items-center gap-4 p-4 rounded-xl text-[#888888] hover:bg-white/5 hover:text-white transition-all text-sm font-semibold">
              <Settings2 size={20} /> Configurações
            </button>
          </div>
        </nav>

        <div className="p-6 border-t border-[#2A2A2A] bg-black/10">
          <div className="flex items-center gap-4 p-3 bg-white/2 rounded-2xl">
            <div className="relative">
              <img className="w-10 h-10 rounded-xl border border-[#19C37D]/30 object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop" alt="Admin" />
              <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-[#19C37D] border-2 border-[#1A1A1A] rounded-full"></div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-black text-white uppercase truncate">Admin Principal</p>
              <p className="text-[10px] text-[#19C37D] font-black uppercase">System Root</p>
            </div>
            <button onClick={handleLogout} className="p-2 text-[#2A2A2A] hover:text-red-500 transition-colors">
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area - Header Padrão Dashboard */}
      <main className="flex-1 flex flex-col min-w-0 bg-[#111111]">
        <header className="h-20 border-b border-[#2A2A2A] bg-[#1A1A1A]/50 backdrop-blur-xl flex items-center justify-between px-10 sticky top-0 z-20">
          <div className="flex flex-col">
            <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#666] mb-1">
              <button onClick={() => navigate('/admin/dashboard')} className="hover:text-[#19C37D]">Dashboard</button>
              <ChevronRight size={10} />
              <button onClick={() => navigate('/admin/clients')} className="hover:text-[#19C37D]">Clientes</button>
              <ChevronRight size={10} />
              <span className="text-[#19C37D]">Novo Cadastro</span>
            </nav>
            <h1 className="text-lg font-black text-white uppercase tracking-tight">Provisionamento de Cliente</h1>
          </div>
          <div className="flex items-center gap-6">
            <button onClick={() => navigate('/admin/clients')} className="text-[#666] hover:text-white text-xs font-black uppercase tracking-widest flex items-center gap-2">
               <X size={16} /> Cancelar
            </button>
            <button className="bg-[#19C37D] text-black px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:brightness-110 shadow-lg shadow-[#19C37D]/10 flex items-center gap-2">
               <Check size={18} /> SALVAR CADASTRO
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-10 space-y-10 custom-scrollbar">
          {/* Stepper Progress */}
          <div className="flex items-center gap-6 max-w-4xl mx-auto">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#19C37D] flex items-center justify-center text-black font-black text-xs">1</div>
              <span className="font-black text-[10px] uppercase text-[#19C37D]">Informações Jurídicas</span>
            </div>
            <div className="h-px flex-1 bg-[#19C37D]"></div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full border border-[#2A2A2A] bg-[#1A1A1A] flex items-center justify-center text-[#666] font-black text-xs">2</div>
              <span className="font-black text-[10px] uppercase text-[#666]">Contrato & Escopo</span>
            </div>
          </div>

          <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-10">
              <section className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl overflow-hidden shadow-2xl">
                <div className="px-8 py-6 border-b border-[#2A2A2A] bg-black/20 flex items-center gap-4">
                  <div className="p-2 bg-[#19C37D]/10 text-[#19C37D] rounded-lg"><Building2 size={20} /></div>
                  <h3 className="font-black text-sm text-white uppercase">Dados da Empresa</h3>
                </div>
                <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-[#666] uppercase tracking-widest">Razão Social</label>
                    <input className="w-full bg-[#111] border border-[#2A2A2A] rounded-xl px-4 py-3 text-xs font-bold focus:ring-1 focus:ring-[#19C37D]/30 outline-none" placeholder="Nome Jurídico" type="text" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-[#666] uppercase tracking-widest">Localização (HQ)</label>
                    <div className="relative">
                      <Globe size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#444]" />
                      <select className="w-full bg-[#111] border border-[#2A2A2A] rounded-xl pl-12 pr-4 py-3 text-xs font-bold outline-none appearance-none">
                        <option>Selecione um país</option>
                        <option>Brasil</option>
                        <option>Canadá</option>
                        <option>EUA</option>
                      </select>
                    </div>
                  </div>
                </div>
              </section>

              <section className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl overflow-hidden shadow-2xl">
                <div className="px-8 py-6 border-b border-[#2A2A2A] bg-black/20 flex items-center gap-4">
                  <div className="p-2 bg-[#19C37D]/10 text-[#19C37D] rounded-lg"><FileText size={20} /></div>
                  <h3 className="font-black text-sm text-white uppercase">Arquitetura & Contrato</h3>
                </div>
                <div className="p-8 space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-[#666] uppercase tracking-widest">Escopo Inicial</label>
                    <textarea className="w-full bg-[#111] border border-[#2A2A2A] rounded-xl px-4 py-3 text-xs font-bold min-h-[120px] outline-none" placeholder="Descreva os requisitos técnicos..."></textarea>
                  </div>
                </div>
              </section>
            </div>

            <div className="space-y-10">
              <section className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-8 shadow-2xl">
                <div className="flex items-center gap-4 mb-10">
                  <div className="p-2 bg-[#19C37D]/10 text-[#19C37D] rounded-lg"><UserCheck size={20} /></div>
                  <h3 className="font-black text-sm text-white uppercase">Account Manager</h3>
                </div>
                <div className="space-y-4">
                  {managers.map((m, idx) => (
                    <label key={idx} className="flex items-center gap-4 p-4 bg-[#111] border border-[#2A2A2A] rounded-xl cursor-pointer hover:border-[#19C37D]/30 transition-all group">
                      <input type="radio" name="manager" className="accent-[#19C37D]" />
                      <img src={m.avatar} alt={m.name} className="w-10 h-10 rounded-lg grayscale group-hover:grayscale-0" />
                      <div>
                        <p className="text-xs font-black text-white uppercase">{m.name}</p>
                        <p className="text-[9px] text-[#666] font-bold uppercase">{m.role}</p>
                      </div>
                    </label>
                  ))}
                </div>
                <div className="mt-10 pt-10 border-t border-[#2A2A2A]">
                   <button className="w-full py-4 bg-[#19C37D] text-black font-black uppercase text-[10px] rounded-xl hover:brightness-110 active:scale-95 flex items-center justify-center gap-3">
                      PRÓXIMA ETAPA <ArrowRight size={14} />
                   </button>
                </div>
              </section>
              
              <div className="bg-[#111] p-6 rounded-2xl border border-white/5 opacity-50">
                <h4 className="text-[9px] font-black text-[#19C37D] uppercase mb-2">Nota de Sistema</h4>
                <p className="text-[10px] text-[#666] font-bold leading-relaxed uppercase">O provisionamento criará automaticamente uma instância dedicada no cluster nominal.</p>
              </div>
            </div>
          </div>
        </div>

        <footer className="h-14 bg-black border-t border-[#2A2A2A] px-10 py-4 flex items-center justify-between text-[9px] text-[#666] uppercase font-black">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-[#19C37D] rounded-full animate-pulse"></span> SESSION_ACTIVE</div>
            <div>ID: PROV_882_ADM</div>
          </div>
          <div className="flex items-center gap-2"><ShieldCheck size={12} className="text-[#19C37D]" /> DRESBACH_SECURE_NODE</div>
        </footer>
      </main>
    </div>
  );
}


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Terminal, LayoutDashboard, Ticket, Workflow, 
  Users, Network, Settings2, Bell, Search, 
  LogOut, ShieldCheck, Globe, Key, History,
  Save, RotateCcw, Power, CheckCircle2, XCircle,
  Clock, Shield, Activity, Calendar, Download,
  UserPlus, UserCog, AlertTriangle
} from 'lucide-react';

export default function AdminSettings() {
  const navigate = useNavigate();
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  const handleLogout = () => {
    navigate('/admin/login');
  };

  const activityLog = [
    { type: 'KEY', title: 'API Key Regenerada', author: 'Erik Magnus', time: '14:22 PM', ip: '10.0.0.124', icon: <Key size={16} className="text-[#19C37D]" />, bg: 'bg-[#19C37D]/10' },
    { type: 'MAINT', title: 'Modo de Manutenção Ativado', author: 'Sistema Automatizado', time: '11:05 AM', ip: 'SERVER_CORE', icon: <AlertTriangle size={16} className="text-orange-500" />, bg: 'bg-orange-500/10' },
    { type: 'USER', title: 'Novo Manager Adicionado', author: 'Erik Magnus', time: 'Ontem', ip: '187.12.98.2', icon: <UserPlus size={16} className="text-blue-500" />, bg: 'bg-blue-500/10' }
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-[#111111] text-[#E2E8F0] font-sans antialiased">
      {/* Sidebar Navigation */}
      <aside className="w-72 border-r border-[#2A2A2A] bg-[#1A1A1A] flex flex-col shrink-0">
        <div className="p-8 border-b border-[#2A2A2A]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#19C37D] rounded flex items-center justify-center shadow-[0_0_20px_rgba(25,195,125,0.2)]">
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
          <button onClick={() => navigate('/admin/clients')} className="w-full flex items-center gap-4 p-4 rounded-xl text-[#888888] hover:bg-white/5 hover:text-white transition-all text-sm font-semibold">
            <Users size={20} /> Gestão de Clientes
          </button>
          <button onClick={() => navigate('/admin/infrastructure')} className="w-full flex items-center gap-4 p-4 rounded-xl text-[#888888] hover:bg-white/5 hover:text-white transition-all text-sm font-semibold">
            <Network size={20} /> Infraestrutura
          </button>

          <div className="pt-6 mt-6 border-t border-[#2A2A2A]">
            <button className="w-full flex items-center gap-4 p-4 rounded-xl bg-[#19C37D]/10 text-[#19C37D] border-l-4 border-[#19C37D] font-bold text-sm transition-all shadow-lg shadow-black/20">
              <Settings2 size={20} /> Configurações de Sistema
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
              <p className="text-xs font-black text-white uppercase truncate">Erik Magnus</p>
              <p className="text-[10px] text-[#19C37D] uppercase font-black tracking-widest mt-0.5">Root Admin</p>
            </div>
            <button onClick={handleLogout} className="p-2 text-[#2A2A2A] hover:text-red-500 transition-colors">
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Settings Console */}
      <main className="flex-1 flex flex-col min-w-0 bg-[#111111]">
        <header className="h-20 border-b border-[#2A2A2A] bg-[#1A1A1A]/50 backdrop-blur-xl flex items-center justify-between px-10 sticky top-0 z-20">
          <div>
            <h1 className="text-lg font-black text-white uppercase tracking-tight">Configurações de Sistema</h1>
            <p className="text-[10px] text-[#666] font-bold uppercase tracking-widest mt-0.5">Terminal Global Subsystem</p>
          </div>
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3 px-4 py-1.5 bg-[#19C37D]/10 border border-[#19C37D]/20 rounded-full">
              <div className="w-2 h-2 rounded-full bg-[#19C37D] animate-pulse"></div>
              <span className="text-[10px] font-mono text-[#19C37D] uppercase font-bold tracking-widest">Sistema Online</span>
            </div>
            <button className="bg-[#19C37D] text-black px-6 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest hover:brightness-110 transition-all flex items-center gap-2 shadow-lg shadow-[#19C37D]/10">
              <Save size={18} /> Salvar Alterações
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-10 space-y-10 custom-scrollbar">
          <div className="grid grid-cols-12 gap-10">
            {/* Left Column: General & Permissions */}
            <div className="col-span-12 lg:col-span-8 space-y-10">
              {/* Geral & Localização */}
              <section className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-8 shadow-2xl">
                <div className="flex items-center gap-4 mb-10">
                  <div className="p-3 bg-[#19C37D]/10 text-[#19C37D] rounded-xl"><Globe size={24} /></div>
                  <h2 className="text-xl font-black text-white uppercase tracking-tighter">Geral & Localização</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-[#666] uppercase tracking-widest ml-1">Nome da Plataforma</label>
                    <input className="w-full bg-[#111] border border-[#2A2A2A] rounded-xl px-5 py-4 text-sm font-bold text-white focus:outline-none focus:ring-1 focus:ring-[#19C37D]/30 transition-all" type="text" defaultValue="TechLabs Global Terminal" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-[#666] uppercase tracking-widest ml-1">Fuso Horário</label>
                    <select className="w-full bg-[#111] border border-[#2A2A2A] rounded-xl px-5 py-4 text-sm font-bold text-[#EDEDED] focus:outline-none focus:ring-1 focus:ring-[#19C37D]/30 transition-all appearance-none cursor-pointer">
                      <option>UTC -03:00 (São Paulo)</option>
                      <option>UTC +00:00 (Londres)</option>
                      <option>UTC -05:00 (Nova Iorque)</option>
                    </select>
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-[#666] uppercase tracking-widest ml-1 block">Ambiente</label>
                    <div className="flex gap-10 pt-2">
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <input type="radio" name="env" defaultChecked className="w-5 h-5 bg-black border-[#2A2A2A] text-[#19C37D] focus:ring-0" />
                        <span className="text-sm font-black uppercase text-[#888] group-hover:text-white transition-colors">Produção</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <input type="radio" name="env" className="w-5 h-5 bg-black border-[#2A2A2A] text-[#19C37D] focus:ring-0" />
                        <span className="text-sm font-black uppercase text-[#888] group-hover:text-white transition-colors">Staging</span>
                      </label>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-[#666] uppercase tracking-widest ml-1 block">Modo de Manutenção</label>
                    <div className="flex items-center gap-5 pt-1">
                      <button 
                        onClick={() => setMaintenanceMode(!maintenanceMode)}
                        className={`w-14 h-7 rounded-full transition-all relative ${maintenanceMode ? 'bg-[#19C37D]' : 'bg-[#2A2A2A]'}`}
                      >
                        <div className={`absolute top-1 w-5 h-5 rounded-full bg-white transition-all ${maintenanceMode ? 'left-8' : 'left-1'}`}></div>
                      </button>
                      <span className={`text-xs font-black uppercase tracking-widest italic ${maintenanceMode ? 'text-[#19C37D]' : 'text-[#666]'}`}>
                        {maintenanceMode ? 'Ativado' : 'Desativado'}
                      </span>
                    </div>
                  </div>
                </div>
              </section>

              {/* Permissions Matrix */}
              <section className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-8 shadow-2xl">
                <div className="flex items-center justify-between mb-10">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-[#19C37D]/10 text-[#19C37D] rounded-xl"><Users size={24} /></div>
                    <h2 className="text-xl font-black text-white uppercase tracking-tighter">Permissões de Usuário</h2>
                  </div>
                  <button className="text-[10px] font-black uppercase tracking-widest text-[#19C37D] hover:underline flex items-center gap-2">
                    <UserCog size={14} /> Personalizar Cargos
                  </button>
                </div>
                <div className="overflow-hidden border border-white/5 rounded-2xl">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="bg-black/40 border-b border-white/5 text-[9px] font-black uppercase tracking-[0.2em] text-[#666]">
                        <th className="px-8 py-5">Módulo</th>
                        <th className="px-8 py-5 text-center">Admin</th>
                        <th className="px-8 py-5 text-center">Manager</th>
                        <th className="px-8 py-5 text-center">Viewer</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {[
                        { name: 'Gestão Financeira', adm: true, mgr: true, view: false },
                        { name: 'Configuração de Hardware', adm: true, mgr: false, view: false },
                        { name: 'Relatórios Analíticos', adm: true, mgr: true, view: true }
                      ].map((row, i) => (
                        <tr key={i} className="hover:bg-white/2 transition-colors">
                          <td className="px-8 py-5 font-black uppercase tracking-tight text-[#EDEDED]">{row.name}</td>
                          <td className="px-8 py-5 text-center">{row.adm ? <CheckCircle2 size={18} className="text-[#19C37D] mx-auto" /> : <XCircle size={18} className="text-[#333] mx-auto" />}</td>
                          <td className="px-8 py-5 text-center">{row.mgr ? <CheckCircle2 size={18} className="text-[#19C37D] mx-auto" /> : <XCircle size={18} className="text-[#333] mx-auto" />}</td>
                          <td className="px-8 py-5 text-center">{row.view ? <CheckCircle2 size={18} className="text-[#19C37D] mx-auto" /> : <XCircle size={18} className="text-[#333] mx-auto" />}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            </div>

            {/* Right Column: Security & API Keys */}
            <div className="col-span-12 lg:col-span-4 space-y-10">
              {/* Segurança & Protocolos */}
              <section className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-8 shadow-2xl">
                <div className="flex items-center gap-4 mb-10">
                  <div className="p-3 bg-[#19C37D]/10 text-[#19C37D] rounded-xl"><Shield size={24} /></div>
                  <h2 className="text-xl font-black text-white uppercase tracking-tighter">Segurança & Protocolos</h2>
                </div>
                <div className="space-y-8">
                  {[
                    { title: 'Autenticação 2FA', desc: 'Exigir em todos logins', active: true },
                    { title: 'Expiração de Sessão', desc: 'Auto logout em 15m', active: true },
                    { title: 'Logs de Auditoria', desc: 'Retenção de 90 dias', active: true }
                  ].map((p, i) => (
                    <div key={i} className="flex items-center justify-between group">
                      <div>
                        <p className="text-sm font-black text-[#EDEDED] uppercase tracking-tight group-hover:text-[#19C37D] transition-colors">{p.title}</p>
                        <p className="text-[10px] text-[#666] font-bold uppercase tracking-widest mt-1">{p.desc}</p>
                      </div>
                      <button className={`w-10 h-5 rounded-full relative transition-all ${p.active ? 'bg-[#19C37D]' : 'bg-[#333]'}`}>
                         <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${p.active ? 'left-5.5' : 'left-0.5'}`}></div>
                      </button>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-10 bg-white/5 border border-white/5 py-4 rounded-xl text-[10px] font-black uppercase tracking-[0.3em] text-[#888] hover:text-white hover:bg-white/10 transition-all">
                  VER POLÍTICA COMPLETA
                </button>
              </section>

              {/* API Keys */}
              <section className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-8 shadow-2xl">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-[#19C37D]/10 text-[#19C37D] rounded-xl"><Key size={24} /></div>
                    <h2 className="text-xl font-black text-white uppercase tracking-tighter">API Keys</h2>
                  </div>
                  <button className="text-[#666] hover:text-[#19C37D] transition-colors"><UserPlus size={22} /></button>
                </div>
                <div className="space-y-5">
                  <div className="bg-[#111] border border-white/5 p-5 rounded-2xl space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-[9px] font-black uppercase tracking-widest text-[#666]">Main Production Key</span>
                      <span className="text-[8px] bg-[#19C37D]/10 text-[#19C37D] px-2 py-0.5 rounded-lg font-black uppercase">Ativa</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <code className="flex-1 text-[11px] font-mono text-[#444] truncate uppercase tracking-widest">tk_live_51M2K8fS90...</code>
                      <button className="text-[#333] hover:text-white transition-colors"><Download size={14} /></button>
                    </div>
                  </div>
                  <div className="bg-[#111] border border-white/5 p-5 rounded-2xl space-y-3 opacity-60">
                    <div className="flex justify-between items-center">
                      <span className="text-[9px] font-black uppercase tracking-widest text-[#666]">Staging Webhook</span>
                      <span className="text-[8px] bg-white/5 text-[#666] px-2 py-0.5 rounded-lg font-black uppercase">Inativa</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <code className="flex-1 text-[11px] font-mono text-[#444] truncate uppercase tracking-widest">tk_test_88Z2L9vQ...</code>
                      <button className="text-[#333] hover:text-white transition-colors"><Download size={14} /></button>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* Bottom Row: Maintenance & Activity */}
            <div className="col-span-12 space-y-10">
              {/* Manutenção Programada */}
              <section className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-3xl p-10 shadow-2xl">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
                  <div className="flex items-center gap-6">
                    <div className="p-4 bg-[#19C37D]/10 text-[#19C37D] rounded-2xl"><Calendar size={32} /></div>
                    <div>
                      <h2 className="text-2xl font-black text-white uppercase tracking-tighter">Manutenção Programada</h2>
                      <p className="text-sm font-bold text-[#666] uppercase tracking-widest mt-1">Janelas de downtime e atualizações críticas</p>
                    </div>
                  </div>
                  <button className="bg-white/5 border border-white/10 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white/10 transition-all active:scale-95">
                    AGENDAR NOVA JANELA
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                  <div className="bg-[#111] border border-[#2A2A2A] p-8 rounded-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 bg-[#19C37D]/20 text-[#19C37D] text-[9px] font-black px-4 py-1.5 rounded-bl-2xl uppercase tracking-widest">Próximo</div>
                    <p className="text-[10px] font-black text-[#19C37D] uppercase tracking-[0.2em] mb-2">Database Migration</p>
                    <h4 className="text-lg font-black text-white uppercase tracking-tight mb-8">Atualização de Cluster v4.2</h4>
                    <div className="space-y-3 text-[10px] font-black text-[#666] uppercase tracking-widest">
                       <div className="flex items-center gap-3"><Calendar size={14} /> 14 Jan, 2024</div>
                       <div className="flex items-center gap-3"><Clock size={14} /> 02:00 - 04:00 AM</div>
                    </div>
                  </div>
                  <div className="bg-[#111] border border-[#2A2A2A] p-8 rounded-2xl opacity-40">
                    <div className="absolute top-0 right-0 bg-white/5 text-[#666] text-[9px] font-black px-4 py-1.5 rounded-bl-2xl uppercase tracking-widest">Concluído</div>
                    <p className="text-[10px] font-black text-[#666] uppercase tracking-[0.2em] mb-2">Security Patch</p>
                    <h4 className="text-lg font-black text-white uppercase tracking-tight mb-8">Hotfix Firewall v1.9</h4>
                    <div className="text-[10px] font-black text-[#444] italic uppercase tracking-widest">Duração: 28min</div>
                  </div>
                  <div className="border border-dashed border-[#2A2A2A] rounded-2xl flex flex-col items-center justify-center p-10 text-center bg-white/[0.01]">
                    <Activity size={32} className="text-[#333] mb-4" />
                    <p className="text-[10px] font-black text-[#444] uppercase tracking-widest italic">Nenhuma outra janela agendada</p>
                  </div>
                </div>
              </section>

              {/* Atividade Recente do Sistema */}
              <section className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-3xl p-10 shadow-2xl">
                <div className="flex items-center justify-between mb-12">
                  <div className="flex items-center gap-6">
                    <div className="p-4 bg-[#19C37D]/10 text-[#19C37D] rounded-2xl"><History size={32} /></div>
                    <h2 className="text-2xl font-black text-white uppercase tracking-tighter">Atividade Recente</h2>
                  </div>
                  <button className="text-[10px] font-black text-[#666] hover:text-white uppercase tracking-widest flex items-center gap-3 transition-colors">
                    EXPORTAR RELATÓRIO <Download size={16} />
                  </button>
                </div>
                <div className="space-y-6">
                  {activityLog.map((log, idx) => (
                    <div key={idx} className="flex items-center justify-between py-6 border-b border-white/5 last:border-0 hover:bg-white/[0.01] transition-colors px-4 rounded-xl group">
                      <div className="flex items-center gap-8">
                        <div className={`w-12 h-12 rounded-2xl ${log.bg} flex items-center justify-center transition-transform group-hover:scale-110`}>{log.icon}</div>
                        <div>
                          <p className="text-sm font-black text-[#EDEDED] uppercase tracking-tight">{log.title}</p>
                          <p className="text-[10px] text-[#666] font-bold uppercase tracking-widest mt-1">por <span className="text-[#19C37D]">{log.author}</span> • {log.time}</p>
                        </div>
                      </div>
                      <span className="text-xs font-mono text-[#444] font-black group-hover:text-[#666] transition-colors">{log.ip}</span>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>

        {/* Sticky Footer Bar */}
        <footer className="h-20 border-t border-[#2A2A2A] bg-[#0A0A0A] px-10 flex items-center justify-between z-20 shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
           <div className="flex items-center gap-8">
              <div className="flex items-center gap-3 text-[10px] font-black text-[#666] uppercase tracking-[0.2em]">
                 <Shield size={16} className="text-[#19C37D]" />
                 Auditoria de Sessão Ativa
              </div>
           </div>
           <div className="flex items-center gap-6">
              <button className="text-[10px] font-black uppercase tracking-widest text-[#666] hover:text-white transition-colors px-6">
                 DESCARTAR ALTERAÇÕES
              </button>
              <button className="bg-[#19C37D] text-black px-12 py-3.5 rounded-xl font-black text-xs uppercase tracking-widest hover:brightness-110 shadow-xl shadow-[#19C37D]/10 active:scale-95 transition-all">
                 PUBLICAR ATUALIZAÇÕES
              </button>
           </div>
        </footer>
      </main>
    </div>
  );
}

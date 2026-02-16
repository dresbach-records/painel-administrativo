
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Terminal, LayoutDashboard, Ticket, Workflow, 
  Users, Network, Settings2, Bell, Search, 
  LogOut, ShieldCheck, ChevronRight, FileUp,
  Download, Eye, FileText, FolderArchive,
  Filter, ChevronLeft, Check, X, 
  Clock, User, History, MessageSquare,
  FileCheck, ShieldAlert, Verified
} from 'lucide-react';

export default function AdminApprovals() {
  const navigate = useNavigate();
  const [selectedDoc, setSelectedDoc] = useState<any>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleLogout = () => {
    navigate('/admin/login');
  };

  const pendingDocs = [
    {
      id: 'D-882',
      name: 'contrato_servicos_v2.pdf',
      version: 'V2.4',
      type: 'Contrato',
      author: 'Ricardo Oliveira',
      date: '12 Out 2023, 14:20',
      status: 'PENDENTE',
      size: '2.4 MB',
      icon: <FileText size={20} className="text-red-500" />,
      bg: 'bg-red-500/10',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop'
    },
    {
      id: 'D-881',
      name: 'blueprint_cloud_infra.zip',
      version: 'V1.1',
      type: 'Blueprint',
      author: 'Ana Costa',
      date: '10 Out 2023, 09:15',
      status: 'APROVADO',
      size: '45.8 MB',
      icon: <FolderArchive size={20} className="text-[#19C37D]" />,
      bg: 'bg-[#19C37D]/10',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop'
    },
    {
      id: 'D-880',
      name: 'especificacao_tecnica.docx',
      version: 'V3.0',
      type: 'Documentação',
      author: 'Marcos Silva',
      date: '08 Out 2023, 11:00',
      status: 'REVISÃO NECESSÁRIA',
      size: '1.1 MB',
      icon: <FileText size={20} className="text-blue-500" />,
      bg: 'bg-blue-500/10',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop'
    }
  ];

  const workflowSteps = [
    {
      user: 'Admin User (Tech Lead)',
      role: 'Tech Lead',
      action: 'APROVADO',
      comment: '"Versão 2.3 validada. Cláusula de SLA revisada conforme reunião técnica do dia 04/10."',
      date: '06 Out 2023, 10:45',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop'
    },
    {
      user: 'Fabio Santos (Legal)',
      role: 'Legal',
      action: 'ALTERAÇÃO',
      comment: '"Necessário ajustar parágrafo 4.2 sobre multas contratuais antes da aprovação final."',
      date: '02 Out 2023, 16:20',
      initials: 'FS'
    }
  ];

  const stats = [
    { label: 'Aguardando Aprovação', value: '12', sub: 'documentos', color: 'text-yellow-500' },
    { label: 'Aprovados (Mês)', value: '145', sub: 'VALIDATED', color: 'text-[#19C37D]' },
    { label: 'Tempo Médio Resposta', value: '4.2h', sub: 'SLA_CORE', color: 'text-white' },
    { label: 'Taxa de Rejeição', value: '8%', sub: 'QUALITY_RATE', color: 'text-red-400' }
  ];

  const openDrawer = (doc: any) => {
    setSelectedDoc(doc);
    setIsDrawerOpen(true);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#111111] text-[#E2E8F0] font-sans antialiased">
      {/* Detail Drawer */}
      <div className={`fixed inset-y-0 right-0 z-[110] w-[450px] bg-[#161616] border-l border-white/5 shadow-2xl transition-transform duration-500 transform ${isDrawerOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="p-8 border-b border-white/5 bg-black/20 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-black text-white uppercase tracking-tighter">Histórico & Detalhes</h3>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">{selectedDoc?.name || 'documento'}</p>
            </div>
            <button onClick={() => setIsDrawerOpen(false)} className="p-2 text-slate-500 hover:text-white transition-colors">
              <X size={24} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar">
            {/* Approval Workflow */}
            <div className="p-8 border-b border-white/5 space-y-6">
              <div className="flex items-center gap-3">
                <Verified className="text-[#19C37D]" size={18} />
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Workflow de Aprovação</h4>
              </div>
              
              <div className="space-y-4">
                {workflowSteps.map((step, idx) => (
                  <div key={idx} className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 space-y-4 hover:bg-white/[0.04] transition-all">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {step.avatar ? (
                          <img src={step.avatar} className="w-8 h-8 rounded-lg object-cover border border-white/10" alt="" />
                        ) : (
                          <div className="w-8 h-8 rounded-lg bg-[#2A2A2A] flex items-center justify-center text-[10px] font-black">{step.initials}</div>
                        )}
                        <div>
                          <p className="text-xs font-black text-white uppercase tracking-tight">{step.user}</p>
                          <p className="text-[9px] text-[#19C37D] font-bold uppercase tracking-widest">{step.role}</p>
                        </div>
                      </div>
                      <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest ${
                        step.action === 'APROVADO' ? 'bg-[#19C37D]/10 text-[#19C37D]' : 'bg-red-500/10 text-red-500'
                      }`}>
                        {step.action}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 font-medium italic leading-relaxed">
                      {step.comment}
                    </p>
                    <p className="text-[9px] text-slate-600 font-mono text-right">{step.date}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Version Timeline */}
            <div className="p-8 space-y-8">
              <div className="flex items-center gap-3">
                <History className="text-slate-500" size={18} />
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Linha do Tempo de Versões</h4>
              </div>
              
              <div className="space-y-10 relative">
                <div className="absolute left-[15px] top-2 bottom-4 w-px bg-white/5"></div>
                
                <div className="relative pl-12 group">
                   <div className="absolute left-0 top-1.5 w-8 h-8 rounded-full bg-yellow-500 border-2 border-yellow-500 flex items-center justify-center shadow-[0_0_15px_rgba(234,179,8,0.4)]">
                     <div className="w-1.5 h-1.5 rounded-full bg-black"></div>
                   </div>
                   <div className="space-y-2">
                     <div className="flex items-center justify-between">
                        <span className="text-sm font-black text-yellow-500 uppercase tracking-tight">Versão 2.4 (Atual)</span>
                        <span className="text-[9px] font-mono text-slate-600">Hoje, 14:20</span>
                     </div>
                     <p className="text-xs text-slate-400 font-medium">Ajuste de cláusula de rescisão técnica.</p>
                     <div className="flex items-center gap-3 pt-1">
                        <div className="w-5 h-5 rounded bg-white/5 flex items-center justify-center text-[8px] font-black">R</div>
                        <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">por Ricardo Oliveira</span>
                     </div>
                   </div>
                </div>

                <div className="relative pl-12 group">
                   <div className="absolute left-0 top-1.5 w-8 h-8 rounded-full bg-[#19C37D] border-2 border-[#19C37D] flex items-center justify-center shadow-[0_0_15px_rgba(25,195,125,0.4)]">
                     <Check size={14} className="text-black" strokeWidth={4} />
                   </div>
                   <div className="space-y-2 opacity-50 grayscale group-hover:opacity-100 group-hover:grayscale-0 transition-all">
                     <div className="flex items-center justify-between">
                        <span className="text-sm font-black text-[#EDEDED] uppercase tracking-tight">Versão 2.3</span>
                        <span className="text-[9px] font-mono text-slate-600">05 Out, 09:15</span>
                     </div>
                     <p className="text-xs text-slate-400 font-medium">Correção de valores de manutenção mensal.</p>
                   </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8 bg-black/40 border-t border-white/5 space-y-4">
            <button className="w-full py-4 bg-[#19C37D] text-black rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] transition-all hover:brightness-110 active:scale-95 flex items-center justify-center gap-3">
              <Check size={16} strokeWidth={3} /> Aprovar Versão Atual
            </button>
            <button className="w-full py-4 bg-white/5 hover:bg-white/10 text-white rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3">
              <History size={16} /> Comparar Alterações
            </button>
          </div>
        </div>
      </div>

      {/* Admin Sidebar Navigation */}
      <aside className="w-72 border-r border-white/5 bg-[#1A1A1A] flex flex-col shrink-0">
        <div className="p-8 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#19C37D] rounded flex items-center justify-center shadow-[0_0_20px_rgba(25,195,125,0.2)]">
              <Terminal className="text-black" size={20} strokeWidth={3} />
            </div>
            <span className="font-black text-2xl tracking-tighter text-white uppercase italic">TechLabs</span>
          </div>
        </div>

        <nav className="flex-1 p-6 space-y-1.5 overflow-y-auto custom-scrollbar">
          <button onClick={() => navigate('/admin/dashboard')} className="w-full flex items-center gap-4 p-4 rounded-xl text-slate-500 hover:bg-white/5 hover:text-white transition-all text-sm font-semibold">
            <LayoutDashboard size={20} /> Visão Geral
          </button>
          <button onClick={() => navigate('/admin/tickets')} className="w-full flex items-center gap-4 p-4 rounded-xl text-slate-500 hover:bg-white/5 hover:text-white transition-all text-sm font-semibold">
            <Ticket size={20} className="rotate-45" /> Tickets Ativos
          </button>
          <button onClick={() => navigate('/admin/projects')} className="w-full flex items-center gap-4 p-4 rounded-xl text-slate-500 hover:bg-white/5 hover:text-white transition-all text-sm font-semibold">
            <Workflow size={20} /> Projetos
          </button>
          <button onClick={() => navigate('/admin/repository')} className="w-full flex items-center gap-4 p-4 rounded-xl text-slate-500 hover:bg-white/5 hover:text-white transition-all text-sm font-semibold">
            <FolderArchive size={20} /> Repositório
          </button>
          <button onClick={() => navigate('/admin/approvals')} className="w-full flex items-center gap-4 p-4 rounded-xl bg-[#19C37D]/10 text-[#19C37D] border-l-4 border-[#19C37D] font-bold text-sm transition-all shadow-lg">
            <FileCheck size={20} /> Aprovações
          </button>
          <button onClick={() => navigate('/admin/clients')} className="w-full flex items-center gap-4 p-4 rounded-xl text-slate-500 hover:bg-white/5 hover:text-white transition-all text-sm font-semibold">
            <Users size={20} /> Gestão de Clientes
          </button>
          <button onClick={() => navigate('/admin/infrastructure')} className="w-full flex items-center gap-4 p-4 rounded-xl text-slate-500 hover:bg-white/5 hover:text-white transition-all text-sm font-semibold">
            <Network size={20} /> Infraestrutura
          </button>
          
          <div className="pt-6 mt-6 border-t border-white/5">
            <button className="w-full flex items-center gap-4 p-4 rounded-xl text-slate-500 hover:bg-white/5 hover:text-white transition-all text-sm font-semibold">
              <History size={20} /> Logs de Versão
            </button>
            <button onClick={() => navigate('/admin/settings')} className="w-full flex items-center gap-4 p-4 rounded-xl text-slate-500 hover:bg-white/5 hover:text-white transition-all text-sm font-semibold mt-1">
              <Settings2 size={20} /> Configurações
            </button>
          </div>
        </nav>

        <div className="p-6 border-t border-white/5 bg-black/10">
          <div className="flex items-center gap-4 p-3 bg-white/2 rounded-2xl">
            <div className="relative">
              <img className="w-10 h-10 rounded-xl border border-[#19C37D]/30 object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCitUU6vdrVGBjnOFBtGYYbcg5HbDxkbHS7X1Az_8SmxZK1I2F_dZ4R5HHo7C2u2OKWF10apLIPUp14TpI9ZWhh_LeM2ZdwaVzw8CnkhDSW1urUx1LW8jXls30cM5eYqPqK9kY6EKf7Y3Vgm6BjPPVAEabajSlYdf7XnVpWY714P4kX6H6of79-vJygjgVEspYm6FPQHcdOcoOt5TGWbpqCBTwqqRGUl3Kvsg7w-2odPz3_47jVIZIvkJeX65UDNN-miJEnjV3xFRpH" alt="Admin" />
              <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-[#19C37D] border-2 border-[#1A1A1A] rounded-full"></div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-black text-white uppercase truncate">Admin Principal</p>
              <p className="text-[10px] text-[#19C37D] uppercase font-black tracking-widest mt-0.5">Tech Lead</p>
            </div>
            <button onClick={handleLogout} className="p-2 text-[#2A2A2A] hover:text-red-500 transition-colors">
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Approval Workflow Terminal */}
      <main className="flex-1 flex flex-col min-w-0 bg-[#111111]">
        <header className="h-20 border-b border-white/5 bg-[#1A1A1A]/50 backdrop-blur-xl flex items-center justify-between px-10 sticky top-0 z-20">
          <div>
            <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">
              <span>Admin</span>
              <ChevronRight size={10} className="text-slate-700" />
              <span className="text-[#19C37D]">Aprovação de Documentos</span>
            </nav>
            <h1 className="text-lg font-black text-white uppercase tracking-tight">Workflow de Aprovação</h1>
          </div>
          <div className="flex items-center gap-6">
            <button className="bg-[#19C37D] text-black px-6 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest hover:brightness-110 transition-all flex items-center gap-3 shadow-lg shadow-[#19C37D]/10">
              <FileUp size={18} strokeWidth={3} /> Upload Nova Versão
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-10 space-y-10 custom-scrollbar">
          {/* Executive Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="bg-[#1A1A1A] border border-white/5 p-8 rounded-3xl hover:border-[#19C37D]/20 transition-all shadow-xl group">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">{stat.label}</p>
                <div className="flex items-baseline justify-between mb-2">
                  <h2 className={`text-3xl font-black tracking-tighter ${stat.color}`}>{stat.value}</h2>
                  <span className="text-[9px] font-mono font-bold text-slate-700 tracking-widest uppercase">{stat.sub}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Matrix Area */}
          <div className="bg-[#1A1A1A] border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
            <div className="px-8 py-6 border-b border-white/5 flex flex-wrap gap-6 items-center justify-between bg-white/[0.01]">
              <div className="relative flex-1 max-w-2xl">
                <Search size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-700" />
                <input 
                  className="w-full pl-14 pr-6 py-4 bg-black/40 border border-white/5 rounded-2xl text-xs font-bold uppercase tracking-widest text-white placeholder:text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#19C37D]/30 transition-all" 
                  placeholder="Buscar por nome, autor ou status..." 
                  type="text"
                />
              </div>
              <div className="flex gap-4">
                <select className="bg-black/40 border border-white/5 text-slate-500 rounded-2xl text-[10px] font-black uppercase tracking-widest px-6 py-4 outline-none focus:ring-1 focus:ring-[#19C37D]/30 cursor-pointer">
                  <option>Todos os Status</option>
                  <option>Pendente</option>
                  <option>Aprovado</option>
                  <option>Revisão Necessária</option>
                </select>
                <button className="p-4 text-slate-500 hover:text-white transition-all bg-black/40 border border-white/5 rounded-2xl shadow-inner">
                  <Filter size={20} />
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-black/20 text-[9px] uppercase tracking-[0.2em] text-slate-600 font-black border-b border-white/5">
                    <th className="px-10 py-5">Arquivo</th>
                    <th className="px-10 py-5">Autor & Data</th>
                    <th className="px-10 py-5 text-center">Status de Aprovação</th>
                    <th className="px-10 py-5 text-center">Ações Rápidas</th>
                    <th className="px-10 py-5 text-right">Gerenciar</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {pendingDocs.map((doc, i) => (
                    <tr key={i} className="hover:bg-white/[0.02] transition-colors group cursor-default">
                      <td className="px-10 py-8">
                        <div className="flex items-center gap-6">
                          <div className={`w-12 h-12 rounded-2xl ${doc.bg} flex items-center justify-center shrink-0`}>
                            {doc.icon}
                          </div>
                          <div>
                            <div className="flex items-center gap-3">
                               <p className="text-sm font-black text-white uppercase tracking-tight group-hover:text-[#19C37D] transition-colors">{doc.name}</p>
                               <span className="px-2 py-0.5 bg-[#19C37D]/10 text-[#19C37D] rounded border border-[#19C37D]/20 text-[9px] font-black uppercase tracking-tighter">{doc.version}</span>
                            </div>
                            <p className="text-[9px] text-slate-600 font-black tracking-widest mt-1 uppercase">{doc.type} • {doc.size}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-10 py-8">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-3">
                            <img src={doc.avatar} className="w-5 h-5 rounded-full grayscale group-hover:grayscale-0 transition-all border border-white/10" alt="" />
                            <span className="text-xs font-bold text-slate-400 group-hover:text-white transition-colors">{doc.author}</span>
                          </div>
                          <span className="text-[9px] font-mono text-slate-600 uppercase tracking-widest ml-8">{doc.date}</span>
                        </div>
                      </td>
                      <td className="px-10 py-8 text-center">
                        <span className={`px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                          doc.status === 'PENDENTE' ? 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20' : 
                          doc.status === 'APROVADO' ? 'text-[#19C37D] bg-[#19C37D]/10 border-[#19C37D]/20' : 
                          'text-red-500 bg-red-500/10 border-red-500/20'
                        }`}>
                          {doc.status}
                        </span>
                      </td>
                      <td className="px-10 py-8">
                        <div className="flex items-center justify-center gap-3">
                           <button className="p-2.5 bg-[#19C37D]/10 text-[#19C37D] rounded-xl hover:bg-[#19C37D] hover:text-black transition-all border border-[#19C37D]/20 shadow-sm" title="Aprovar">
                             <Check size={16} strokeWidth={3} />
                           </button>
                           <button className="p-2.5 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all border border-red-500/20 shadow-sm" title="Recusar">
                             <X size={16} strokeWidth={3} />
                           </button>
                        </div>
                      </td>
                      <td className="px-10 py-8 text-right">
                        <div className="flex items-center justify-end gap-3">
                          <button 
                            onClick={() => openDrawer(doc)}
                            className="p-3 bg-white/5 text-slate-500 hover:text-[#19C37D] hover:bg-white/10 rounded-2xl transition-all border border-white/5" 
                            title="Ver Histórico e Detalhes"
                          >
                            <History size={18} />
                          </button>
                          <button className="p-3 bg-white/5 text-slate-500 hover:text-[#EDEDED] hover:bg-white/10 rounded-2xl transition-all border border-white/5"><Download size={18} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="px-10 py-6 border-t border-white/5 flex items-center justify-between bg-black/20">
              <p className="text-[9px] font-black text-slate-700 uppercase tracking-[0.3em]">Mostrando 3 documentos pendentes de revisão em cache</p>
              <div className="flex gap-4">
                <button className="p-3 border border-white/5 text-slate-700 rounded-xl hover:text-white transition-all disabled:opacity-20" disabled><ChevronLeft size={18} /></button>
                <div className="flex gap-2">
                   <button className="w-10 h-10 bg-[#19C37D] text-black rounded-xl font-black text-[11px]">1</button>
                   <button className="w-10 h-10 bg-white/5 hover:bg-white/10 text-slate-500 rounded-xl font-black text-[11px] transition-all">2</button>
                </div>
                <button className="p-3 border border-white/5 text-slate-700 rounded-xl hover:text-white transition-all"><ChevronRight size={18} /></button>
              </div>
            </div>
          </div>
        </div>

        {/* Global Footer Console */}
        <footer className="h-14 bg-black border-t border-white/5 flex items-center justify-between px-10 relative overflow-hidden z-40">
           <div className="flex items-center gap-10">
              <div className="flex items-center gap-3">
                 <span className="w-1.5 h-1.5 bg-[#19C37D] rounded-full animate-pulse shadow-[0_0_8px_#19C37D]"></span>
                 <span className="text-[10px] font-mono text-slate-600 font-black uppercase tracking-widest">Auth Level: SYSTEM_ADMIN_LEAD</span>
              </div>
           </div>
           <div className="flex items-center gap-6">
              <ShieldCheck size={14} className="text-slate-800" />
              <span className="text-[9px] font-black uppercase tracking-widest text-slate-800 font-mono">DRESBACH_APPROVAL_v1.0.4</span>
           </div>
        </footer>
      </main>
    </div>
  );
}

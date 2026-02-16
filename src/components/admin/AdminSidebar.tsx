
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Terminal, LayoutDashboard, Ticket, Workflow, 
  Users, Network, Settings2, Activity, 
  FileSearch, ShieldCheck, LogOut, MessageSquare,
  Cpu, Database, FolderArchive, FileCheck, 
  MessagesSquare, Cloud, HardDrive
} from 'lucide-react';

export default function AdminSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/admin/dashboard') return location.pathname === path;
    return location.pathname.startsWith(path);
  };

  const navGroups = [
    {
      title: "Core Operations",
      items: [
        { label: "Dashboard", icon: <LayoutDashboard size={18} />, path: "/admin/dashboard" },
        { label: "Auditoria API", icon: <ShieldCheck size={18} />, path: "/admin/diagnostic" },
        { label: "Projetos Ativos", icon: <Workflow size={18} />, path: "/admin/projects" },
      ]
    },
    {
      title: "Management",
      items: [
        { label: "Clientes", icon: <Users size={18} />, path: "/admin/clients" },
        { label: "Suporte (Tickets)", icon: <Ticket size={18} />, path: "/admin/tickets" },
        { label: "Chat Operacional", icon: <MessagesSquare size={18} />, path: "/admin/chat" },
      ]
    },
    {
      title: "Governance & Assets",
      items: [
        { label: "Repositórios", icon: <FolderArchive size={18} />, path: "/admin/repository" },
        { label: "Aprovações", icon: <FileCheck size={18} />, path: "/admin/approvals" },
      ]
    },
    {
      title: "DevOps",
      items: [
        { label: "Infraestrutura", icon: <Cloud size={18} />, path: "/admin/infrastructure" },
        { label: "Servidores", icon: <HardDrive size={18} />, path: "/admin/servers" },
        { label: "Banco de dados", icon: <Database size={18} />, path: "/admin/databases" },
        { label: "Gestão de Acessos", icon: <Users size={18} />, path: "/admin/access-management" },
      ]
    }
  ];

  return (
    <aside className="w-64 border-r border-[#2A2A2A] bg-[#0D0D0D] flex flex-col shrink-0 h-screen sticky top-0 z-50 transition-all duration-300">
      <div className="p-6 border-b border-[#2A2A2A] flex items-center justify-between group cursor-pointer" onClick={() => navigate('/admin/dashboard')}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#19C37D] rounded flex items-center justify-center shadow-[0_0_15px_rgba(25,195,125,0.3)] group-hover:rotate-90 transition-transform duration-500">
            <Terminal className="text-black" size={18} strokeWidth={3} />
          </div>
          <span className="font-black text-xl tracking-tighter text-white uppercase italic">TechLabs</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-8">
        {navGroups.map((group, idx) => (
          <div key={idx} className="space-y-2">
            <h4 className="px-4 text-[9px] font-black uppercase tracking-[0.2em] text-slate-600 mb-4">{group.title}</h4>
            <div className="space-y-1">
              {group.items.map((item) => (
                <button 
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`w-full flex items-center gap-3.5 px-4 py-2.5 rounded-xl transition-all text-xs font-bold group ${
                    isActive(item.path) 
                      ? 'bg-[#19C37D]/10 text-[#19C37D] border-l-4 border-[#19C37D] shadow-lg shadow-black/20' 
                      : 'text-slate-500 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <span className={isActive(item.path) ? 'text-[#19C37D]' : 'text-slate-600 group-hover:text-[#19C37D] transition-colors'}>
                    {item.icon}
                  </span>
                  {item.label}
                  {item.path === '/admin/chat' && (
                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                  )}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-[#2A2A2A] bg-black/20 space-y-2">
        <button 
          onClick={() => navigate('/admin/settings')}
          className={`w-full flex items-center gap-3.5 px-4 py-2.5 rounded-xl transition-all text-xs font-bold ${
            isActive('/admin/settings') ? 'bg-[#19C37D]/10 text-[#19C37D]' : 'text-slate-500 hover:bg-white/5 hover:text-white'
          }`}
        >
          <Settings2 size={18} /> Configurações
        </button>

        <div className="flex items-center gap-3 p-3 bg-white/5 rounded-2xl border border-white/5">
          <div className="relative">
            <img 
              className="w-8 h-8 rounded-lg border border-[#19C37D]/30 object-cover" 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop" 
              alt="Admin" 
            />
            <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-[#19C37D] border-2 border-[#0D0D0D] rounded-full"></div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-black text-white uppercase truncate">Admin Root</p>
            <p className="text-[8px] text-[#19C37D] font-black uppercase tracking-widest leading-none">Status: Online</p>
          </div>
          <button onClick={() => navigate('/admin/login')} className="p-1.5 text-slate-600 hover:text-red-500 transition-colors">
            <LogOut size={14} />
          </button>
        </div>
      </div>
    </aside>
  );
}

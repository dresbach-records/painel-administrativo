
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Rocket, 
  ReceiptText, 
  Headset, 
  Settings, 
  Layers,
  Video,
  CalendarDays,
  ChevronDown,
  MessageCircle,
  Activity,
  FileText,
  ShieldCheck
} from 'lucide-react';

export default function ClientSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(path + '/');

  return (
    <aside className="w-[260px] bg-white border-r border-slate-200 flex flex-col fixed h-full z-20 hidden lg:flex">
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 bg-[#19C37D] rounded-lg flex items-center justify-center shadow-lg shadow-[#19C37D]/20">
          <Layers className="text-white w-4 h-4" />
        </div>
        <span className="font-bold text-xl tracking-tight text-slate-900">TechLabs</span>
      </div>

      <nav className="mt-4 flex-1 px-3 space-y-1">
        <button 
          onClick={() => navigate('/client/dashboard')}
          className={`w-full flex items-center px-4 py-2.5 text-sm font-medium rounded-xl transition-all ${
            location.pathname === '/client/dashboard' 
              ? 'bg-[#19C37D]/10 text-[#19C37D] font-semibold' 
              : 'text-slate-500 hover:bg-slate-50 hover:text-[#19C37D]'
          }`}
        >
          <LayoutDashboard className="mr-3 w-4 h-4" />
          Dashboard
        </button>

        <button 
          onClick={() => navigate('/client/diagnostic')}
          className={`w-full flex items-center px-4 py-2.5 text-sm font-medium rounded-xl transition-all ${
            isActive('/client/diagnostic')
              ? 'bg-[#19C37D]/10 text-[#19C37D] font-semibold' 
              : 'text-slate-500 hover:bg-slate-50 hover:text-[#19C37D]'
          }`}
        >
          <Activity className="mr-3 w-4 h-4" />
          Diagnóstico Técnico
        </button>

        <button 
          onClick={() => navigate('/client/proposals')}
          className={`w-full flex items-center px-4 py-2.5 text-sm font-medium rounded-xl transition-all ${
            isActive('/client/proposals')
              ? 'bg-[#19C37D]/10 text-[#19C37D] font-semibold' 
              : 'text-slate-500 hover:bg-slate-50 hover:text-[#19C37D]'
          }`}
        >
          <FileText className="mr-3 w-4 h-4" />
          Propostas
          <span className="ml-auto bg-[#19C37D] text-white text-[10px] font-black px-1.5 py-0.5 rounded-full">1</span>
        </button>

        <button 
          onClick={() => navigate('/client/support/chat')}
          className={`w-full flex items-center px-4 py-2.5 text-sm font-medium rounded-xl transition-all ${
            isActive('/client/support/chat') 
              ? 'bg-[#19C37D]/10 text-[#19C37D] font-semibold' 
              : 'text-slate-500 hover:bg-slate-50 hover:text-[#19C37D]'
          }`}
        >
          <MessageCircle className="mr-3 w-4 h-4" />
          Chat Direto
        </button>

        <button 
          onClick={() => navigate('/client/projects')}
          className={`w-full flex items-center px-4 py-2.5 text-sm font-medium rounded-xl transition-all ${
            isActive('/client/projects') 
              ? 'bg-[#19C37D]/10 text-[#19C37D] font-semibold' 
              : 'text-slate-500 hover:bg-slate-50 hover:text-[#19C37D]'
          }`}
        >
          <Rocket className="mr-3 w-4 h-4" />
          Meus Projetos
        </button>

        <button 
          onClick={() => navigate('/client/invoices')}
          className={`w-full flex items-center px-4 py-2.5 text-sm font-medium rounded-xl transition-all ${
            isActive('/client/invoices') 
              ? 'bg-[#19C37D]/10 text-[#19C37D] font-semibold' 
              : 'text-slate-500 hover:bg-slate-50 hover:text-[#19C37D]'
          }`}
        >
          <ReceiptText className="mr-3 w-4 h-4" />
          Financeiro
        </button>
      </nav>

      <div className="p-4 mt-auto border-t border-slate-100">
         <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl">
            <img className="w-8 h-8 rounded-full object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop" alt=""/>
            <div className="flex-1 truncate">
               <p className="text-xs font-bold text-slate-900 truncate">Ricardo Silva</p>
               <p className="text-[10px] text-slate-400 font-medium">InnovateX HQ</p>
            </div>
            <button onClick={() => navigate('/client/settings')} className="text-slate-300 hover:text-slate-900 transition-colors">
               <Settings size={14} />
            </button>
         </div>
      </div>
    </aside>
  );
}

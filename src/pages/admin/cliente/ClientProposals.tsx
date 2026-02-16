
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FileText, Search, Filter, ChevronRight, 
  Clock, CheckCircle2, ShieldAlert, Zap
} from 'lucide-react';
import ClientSidebar from '../../components/client/ClientSidebar';

export default function ClientProposals() {
  const navigate = useNavigate();

  const proposals = [
    {
      id: 'PR-2024-0892',
      title: 'Manutenção e Segurança Crítica',
      project: 'InnovateX Main Cluster',
      date: '24 Mai, 2024',
      value: 'R$ 23.210,00',
      status: 'Pendente',
      statusColor: 'text-amber-500 bg-amber-50 border-amber-100',
      isNew: true
    },
    {
      id: 'PR-2024-0750',
      title: 'Implementação de Core LLM',
      project: 'AI Support Module',
      date: '12 Abr, 2024',
      value: 'R$ 45.000,00',
      status: 'Aprovada',
      statusColor: 'text-[#19C37D] bg-[#19C37D]/5 border-[#19C37D]/10',
      isNew: false
    }
  ];

  return (
    <div className="min-h-screen bg-[#f6f8f7] flex font-display text-slate-800 antialiased">
      <ClientSidebar />

      <main className="flex-1 lg:ml-[260px] flex flex-col min-w-0">
        <header className="h-16 bg-white border-b border-slate-100 flex items-center justify-between px-8 sticky top-0 z-10 shadow-sm">
           <div>
             <h1 className="text-sm font-black text-slate-900 uppercase tracking-tight">Propostas Comerciais</h1>
             <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Gestão de Contratos e Serviços</p>
           </div>
           <div className="flex items-center gap-4">
              <div className="px-4 py-1.5 bg-slate-50 border border-slate-200 rounded-full flex items-center gap-2">
                 <div className="w-1.5 h-1.5 rounded-full bg-[#19C37D] animate-pulse"></div>
                 <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">1 Pendente</span>
              </div>
           </div>
        </header>

        <div className="w-full max-w-[1280px] mx-auto px-8 py-8 space-y-8">
           {/* Filtros */}
           <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative flex-1 w-full">
                 <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                 <input className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border-none rounded-xl text-xs font-bold focus:ring-1 focus:ring-[#19C37D]/30" placeholder="Buscar por ID ou título..." />
              </div>
              <div className="flex gap-3 w-full md:w-auto">
                 <button className="flex-1 md:flex-none px-6 py-2.5 bg-slate-50 hover:bg-slate-100 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-500 transition-all flex items-center justify-center gap-2">
                    <Filter size={14} /> Filtrar
                 </button>
              </div>
           </div>

           {/* Lista de Propostas */}
           <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                 <table className="w-full text-left">
                    <thead>
                       <tr className="bg-slate-50/50 border-b border-slate-100 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">
                          <th className="px-8 py-5">Identificação</th>
                          <th className="px-8 py-5">Serviço / Projeto</th>
                          <th className="px-8 py-5">Valor Proposto</th>
                          <th className="px-8 py-5">Status</th>
                          <th className="px-8 py-5 text-right">Ação</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                       {proposals.map((prop) => (
                          <tr 
                            key={prop.id} 
                            onClick={() => navigate(`/client/proposals/${prop.id}`)}
                            className="hover:bg-slate-50/50 transition-colors group cursor-pointer"
                          >
                             <td className="px-8 py-6">
                                <div className="flex items-center gap-4">
                                   <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${prop.isNew ? 'bg-[#19C37D]/10 text-[#19C37D]' : 'bg-slate-100 text-slate-400'}`}>
                                      <FileText size={20} />
                                   </div>
                                   <div>
                                      <span className="text-[10px] font-mono font-bold text-slate-400">{prop.id}</span>
                                      <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">{prop.date}</p>
                                   </div>
                                </div>
                             </td>
                             <td className="px-8 py-6">
                                <div className="flex flex-col">
                                   <span className="font-black text-xs text-slate-900 uppercase tracking-tight group-hover:text-[#19C37D] transition-colors">{prop.title}</span>
                                   <span className="text-[10px] text-slate-400 font-medium uppercase mt-0.5">{prop.project}</span>
                                </div>
                             </td>
                             <td className="px-8 py-6">
                                <span className="text-sm font-black text-slate-900">{prop.value}</span>
                             </td>
                             <td className="px-8 py-6">
                                <span className={`px-2.5 py-1 rounded-lg border text-[8px] font-black uppercase tracking-widest ${prop.statusColor}`}>
                                   {prop.status}
                                </span>
                             </td>
                             <td className="px-8 py-6 text-right">
                                <ChevronRight size={18} className="inline text-slate-200 group-hover:text-[#19C37D] transition-all group-hover:translate-x-1" />
                             </td>
                          </tr>
                       ))}
                    </tbody>
                 </table>
              </div>
           </div>

           {/* Metrics Summary */}
           <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { label: 'Total Acumulado', value: 'R$ 128.450', icon: <Zap size={16} /> },
                { label: 'Propostas Ativas', value: '01', icon: <Clock size={16} /> },
                { label: 'Aprovadas 2024', value: '12', icon: <CheckCircle2 size={16} /> },
                { label: 'SLA Comercial', value: '24h', icon: <ShieldAlert size={16} /> }
              ].map((stat, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3 group hover:border-[#19C37D]/30 transition-all">
                   <div className="flex items-center justify-between">
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</span>
                      <div className="text-slate-300 group-hover:text-[#19C37D] transition-colors">{stat.icon}</div>
                   </div>
                   <h3 className="text-xl font-black text-slate-900">{stat.value}</h3>
                </div>
              ))}
           </div>
        </div>
      </main>
    </div>
  );
}

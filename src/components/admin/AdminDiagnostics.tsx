import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Terminal, LayoutDashboard, Ticket, Workflow, 
  Users, Network, Settings2, Bell, Search, 
  ChevronRight, Filter, Download, Activity,
  ShieldAlert, Database, FileSearch, Save, DollarSign,
  User, CheckCircle2, AlertTriangle, Info, Clock, MessageSquare,
  ShieldCheck, Eye, Signal
} from 'lucide-react';
import AdminSidebar from '@/@/components/admin/AdminSidebar';
// Fix: Import from audit.service instead of deprecated diagnosticService
import { auditService as diagnosticService, TechnicalReport as DiagnosticReport } from '@/@/services/audit.service';

export default function AdminDiagnostics() {
  const navigate = useNavigate();
  const [reports, setReports] = useState<DiagnosticReport[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    load();
    window.addEventListener('storage', load);
    return () => window.removeEventListener('storage', load);
  }, []);

  const load = async () => {
    // Fix: Use diagnosticService (aliased auditService) getReports instead of getMyReports
    const data = await diagnosticService.getReports();
    setReports(data);
    setLoading(false);
  };

  const getSeverityStyle = (sev: string) => {
    if (sev === 'Critical') return 'bg-red-500/10 text-red-500 border-red-500/20';
    if (sev === 'High') return 'bg-orange-500/10 text-orange-500 border-orange-500/20';
    return 'bg-[#19C37D]/10 text-[#19C37D] border-[#19C37D]/20';
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#0A0A0A] text-[#E2E8F0] font-sans antialiased">
      <AdminSidebar />

      <main className="flex-1 flex flex-col min-w-0 bg-[#0A0A0A] relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#19C37D]/5 blur-[150px] rounded-full pointer-events-none"></div>

        <header className="h-20 border-b border-white/5 bg-[#0D0D0D]/50 backdrop-blur-xl flex items-center justify-between px-10 sticky top-0 z-20 shrink-0">
          <div>
             <h1 className="text-lg font-black text-white uppercase tracking-tight flex items-center">
                Auditoria de API <span className="text-[#333] font-medium mx-3 opacity-50">/</span> Clientes Solicitantes
             </h1>
             <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mt-1">Nó de Gestão Técnica de Diagnósticos</p>
          </div>
          <div className="flex items-center gap-6">
             <div className="px-4 py-1.5 bg-black/40 border border-white/5 rounded-full flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[#19C37D] animate-pulse shadow-[0_0_8px_#19C37D]"></div>
                <span className="text-[10px] font-mono text-slate-400 uppercase font-bold tracking-widest">Diagnostic Pipeline Active</span>
             </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-10 space-y-10 custom-scrollbar relative z-10">
           {/* Filtros da Tabela */}
           <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-[#111] p-6 rounded-2xl border border-white/5 shadow-xl">
             <div className="flex items-center gap-4 flex-1 max-w-2xl">
                <div className="relative flex-1">
                   <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" />
                   <input className="w-full bg-black/40 border border-white/5 rounded-xl py-2.5 pl-12 pr-6 text-xs font-bold text-white placeholder:text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#19C37D]/30" placeholder="Buscar por cliente ou ID..." />
                </div>
                <select className="bg-black/40 border border-white/5 rounded-xl py-2.5 px-4 text-[10px] font-black uppercase text-slate-500 outline-none focus:ring-1 focus:ring-[#19C37D]/30 cursor-pointer appearance-none pr-10">
                   <option>Severidade (Todas)</option>
                   <option>Critical</option>
                   <option>High</option>
                   <option>Medium</option>
                </select>
             </div>
             <button className="flex items-center gap-2 text-[10px] font-black text-slate-500 hover:text-white uppercase transition-colors">
                <Download size={16} /> Exportar Logs B2B
             </button>
           </div>

           {/* Tabela de Diagnósticos */}
           <div className="bg-[#111] border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
              <div className="overflow-x-auto">
                 <table className="w-full text-left border-collapse">
                    <thead>
                       <tr className="bg-black/40 text-[9px] uppercase tracking-[0.2em] text-slate-600 font-black border-b border-white/5">
                          <th className="px-8 py-5">Scan ID</th>
                          <th className="px-8 py-5">Cliente / Projeto</th>
                          <th className="px-8 py-5 text-center">Score Atual</th>
                          <th className="px-8 py-5">Severidade</th>
                          <th className="px-8 py-5">Status / Ação</th>
                          <th className="px-8 py-5 text-right">Abrir</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                       {reports.map((report) => (
                          <tr key={report.id} className="hover:bg-white/[0.02] transition-colors group cursor-default">
                             <td className="px-8 py-6">
                                <span className="font-mono text-[11px] font-bold text-slate-500 group-hover:text-[#19C37D] transition-colors">{report.id}</span>
                             </td>
                             <td className="px-8 py-6">
                                <div className="flex flex-col">
                                   <span className="text-[10px] text-[#19C37D] font-bold uppercase tracking-widest mb-1">InnovateX HQ</span>
                                   <span className="font-black text-xs text-white uppercase tracking-tight group-hover:text-[#19C37D] transition-colors">{report.projectName}</span>
                                </div>
                             </td>
                             <td className="px-8 py-6 text-center">
                                <span className={`text-sm font-black ${report.healthScore > 50 ? 'text-[#19C37D]' : 'text-red-500'}`}>{report.healthScore}</span>
                             </td>
                             <td className="px-8 py-6">
                                <span className={`px-2.5 py-1 rounded-lg border text-[9px] font-black uppercase tracking-widest ${getSeverityStyle(report.severity)}`}>
                                   {report.severity}
                                </span>
                             </td>
                             <td className="px-8 py-6">
                                <div className="flex items-center gap-2">
                                  <span className={`w-1.5 h-1.5 rounded-full ${report.isUnlocked ? 'bg-[#19C37D]' : 'bg-slate-700 animate-pulse'}`}></span>
                                  <span className={`text-[10px] font-black uppercase tracking-widest ${report.isUnlocked ? 'text-[#19C37D]' : 'text-slate-600'}`}>
                                     {report.isUnlocked ? 'PAID / ANALYZE' : 'WAITING CLIENT'}
                                  </span>
                                </div>
                             </td>
                             <td className="px-8 py-6 text-right">
                                <button 
                                  onClick={() => navigate(`/admin/diagnostic/report/${report.id}`)}
                                  className="p-3 bg-[#19C37D]/10 text-[#19C37D] rounded-xl hover:bg-[#19C37D] hover:text-black transition-all border border-[#19C37D]/20 shadow-xl group-hover:scale-105 active:scale-95"
                                >
                                   <FileSearch size={18} strokeWidth={3} />
                                </button>
                             </td>
                          </tr>
                       ))}
                       {reports.length === 0 && (
                         <tr>
                            <td colSpan={6} className="px-8 py-20 text-center">
                               <ShieldAlert size={40} className="mx-auto text-slate-800 mb-4" />
                               <p className="text-xs font-black text-slate-700 uppercase tracking-widest">Nenhuma auditoria pendente ou em execução.</p>
                            </td>
                         </tr>
                       )}
                    </tbody>
                 </table>
              </div>
           </div>

           {/* Metrics Grid */}
           <div className="grid grid-cols-1 md:grid-cols-4 gap-8 opacity-60">
              {[
                { label: 'Total Scans', value: '128', icon: <Activity size={18} /> },
                { label: 'Pending Review', value: '05', icon: <Clock size={18} /> },
                { label: 'Security Critical', value: '12', icon: <ShieldAlert size={18} /> },
                { label: 'Global Health', value: '84%', icon: <Signal size={18} /> }
              ].map((stat, i) => (
                <div key={i} className="bg-black border border-white/5 p-6 rounded-2xl space-y-3">
                   <div className="flex items-center justify-between">
                      <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{stat.label}</p>
                      <div className="text-slate-700">{stat.icon}</div>
                   </div>
                   <h3 className="text-xl font-black text-white">{stat.value}</h3>
                </div>
              ))}
           </div>
        </div>

        <footer className="h-14 bg-black border-t border-white/5 px-10 py-4 flex items-center justify-between text-[9px] text-slate-700 uppercase tracking-[0.4em] font-black shrink-0">
           <div className="flex items-center gap-10">
              <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-[#19C37D] rounded-full animate-pulse"></span> INGESTION_PIPE_ACTIVE</div>
           </div>
           <div className="font-mono flex items-center gap-3">
              <ShieldCheck size={12} />
              DRESBACH_ADMIN_DIAG_v1.2
           </div>
        </footer>
      </main>
    </div>
  );
}

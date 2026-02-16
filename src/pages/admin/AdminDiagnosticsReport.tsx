
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { 
  Terminal, ListFilter, History, Braces, Copy, Download, 
  FileText, AlertTriangle, RefreshCcw, Send, MessagesSquare, 
  X, ShieldCheck, ChevronDown, MessageSquare,
  Activity, Cpu, Signal, FileSearch, Trash2, ArrowLeft,
  Wand2, Zap, Monitor, Code, Paperclip, Circle
} from 'lucide-react';
import AdminSidebar from '../../components/admin/AdminSidebar';

export default function AdminDiagnosticsReport() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [logsExpanded, setLogsExpanded] = useState<number[]>([2]);

  const toggleLog = (index: number) => {
    setLogsExpanded(prev => 
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#0d1117] text-[#c9d1d9] font-sans antialiased">
      <AdminSidebar />

      {/* Side Drawer - Notas Internas e Colaboração */}
      <aside className={`fixed top-0 right-0 h-full w-[380px] bg-[#161b22] border-l border-[#30363d] shadow-2xl z-[100] transition-transform duration-300 flex flex-col ${drawerOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-5 border-b border-[#30363d] flex items-center justify-between bg-white/[0.02]">
          <div className="flex items-center gap-2 text-[#19C37D]">
            <MessageSquare size={18} strokeWidth={2.5} />
            <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-white">Notas Internas e Colaboração</h3>
          </div>
          <button onClick={() => setDrawerOpen(false)} className="cursor-pointer text-[#8b949e] hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
          <div className="space-y-6">
            {/* Mensagem do Admin */}
            <div className="flex gap-4">
              <img className="w-8 h-8 rounded border border-[#30363d] shrink-0 object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCxDZ0eS28tqlTRXmCxWltKbp9KamIIrKvlsqFZlU-WgrhxQoLETfOl3J3u-SY5sDO2gkEnS4io1-nB2oCIKMnggyZaCKG1kR7wXw0rnv8V9meMCEwOv1xAYLVvBqfCM6-OXydXChpbUjkvTkAwj0PH5B_hFF5-ouEnx5aG-rSgiIbLmeRCl7LT8-TqfKMALypquUOx_xaT9I1vDYFDfp_-IbvBh8murY646eAH8BB6hfwBfvQWWljGwuIUezzoVz31-DHAX8dStCWf" alt="Admin" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold text-[#19C37D]">Admin-Sênior</span>
                  <span className="text-[9px] font-mono text-[#8b949e]">10:42 AM</span>
                </div>
                <div className="bg-[#0d1117] border border-[#30363d] p-3 rounded-r-lg rounded-bl-lg">
                  <p className="text-xs leading-relaxed text-[#c9d1d9]">Verifiquei o SQL Injection no log 14:22:05, parece um falso positivo. O middleware de escape foi atualizado semana passada.</p>
                </div>
              </div>
            </div>

            {/* Mensagem do Bot */}
            <div className="flex gap-4 ml-10">
              <div className="w-8 h-8 rounded bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
                <div className="flex items-center justify-center h-full w-full">
                  <Cpu size={14} className="text-blue-400" />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold text-[#8b949e]">Security-Bot</span>
                  <span className="text-[9px] font-mono text-[#8b949e]">10:43 AM</span>
                </div>
                <div className="bg-[#0d1117] border border-[#30363d] p-3 rounded-r-lg rounded-bl-lg">
                  <p className="text-xs text-[#8b949e] italic">Contexto: <span className="text-[#19C37D]">@Admin-Sênior</span>, o hash do arquivo /auth/login.ts mudou. Re-scan sugerido.</p>
                </div>
              </div>
            </div>

            {/* Mensagem Lead */}
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shrink-0 text-[10px] font-black text-purple-400">JD</div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold text-white">Dev-Lead (John)</span>
                  <span className="text-[9px] font-mono text-[#8b949e]">11:15 AM</span>
                </div>
                <div className="bg-[#0d1117] border border-[#30363d] p-3 rounded-r-lg rounded-bl-lg">
                  <p className="text-xs leading-relaxed">Concordo. Já marquei a linha 12 no JSON para revisão de severidade na próxima sprint.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 bg-white/[0.02] border-t border-[#30363d]">
          <div className="relative">
            <textarea 
              className="w-full bg-[#0d1117] border border-[#30363d] rounded-lg p-3 text-xs text-[#c9d1d9] focus:ring-1 focus:ring-[#19C37D] focus:border-[#19C37D] placeholder-[#484f58] resize-none min-h-[80px]" 
              placeholder="Escreva uma nota... Use @ para mencionar"
            ></textarea>
            <div className="absolute bottom-3 right-3 flex items-center gap-2">
              <button className="text-[#8b949e] hover:text-white transition-colors"><Paperclip size={16} /></button>
              <button className="bg-[#19C37D] text-black p-1.5 rounded hover:bg-[#15a368] transition-all shadow-lg shadow-[#19C37D]/20">
                <Send size={16} strokeWidth={3} />
              </button>
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-[9px] text-[#8b949e] font-mono uppercase tracking-widest">Administradores Online: 3</span>
            <div className="flex -space-x-1.5 overflow-hidden">
              <img className="inline-block h-5 w-5 rounded-full ring-2 ring-[#161b22] object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCxDZ0eS28tqlTRXmCxWltKbp9KamIIrKvlsqFZlU-WgrhxQoLETfOl3J3u-SY5sDO2gkEnS4io1-nB2oCIKMnggyZaCKG1kR7wXw0rnv8V9meMCEwOv1xAYLVvBqfCM6-OXydXChpbUjkvTkAwj0PH5B_hFF5-ouEnx5aG-rSgiIbLmeRCl7LT8-TqfKMALypquUOx_xaT9I1vDYFDfp_-IbvBh8murY646eAH8BB6hfwBfvQWWljGwuIUezzoVz31-DHAX8dStCWf" alt=""/>
              <div className="inline-block h-5 w-5 rounded-full ring-2 ring-[#161b22] bg-purple-500 text-[7px] font-black flex items-center justify-center text-white">JD</div>
              <div className="inline-block h-5 w-5 rounded-full ring-2 ring-[#161b22] bg-[#333] flex items-center justify-center text-white text-[7px] font-black">+1</div>
            </div>
          </div>
        </div>
      </aside>

      <main className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${drawerOpen ? 'mr-[380px]' : ''}`}>
        <nav className="sticky top-0 z-40 bg-[#161b22]/95 backdrop-blur-xl border-b border-[#30363d] px-6 py-3 shrink-0 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-[#19C37D]/20 p-1.5 rounded border border-[#19C37D]/30">
              <Terminal size={24} className="text-[#19C37D]" />
            </div>
            <div>
              <h1 className="text-sm font-bold text-white uppercase tracking-widest flex items-center gap-2">
                TechLabs <span className="text-[#30363d]">|</span> <span className="text-[#19C37D]">Admin Diagnostics</span>
              </h1>
              <p className="text-[10px] text-[#8b949e] font-mono mt-0.5">Build 2.4.0-stable | Node: 18.x</p>
            </div>
          </div>

          <div className="flex items-center gap-8">
            <div className="hidden xl:flex items-center gap-10">
               <div className="flex flex-col items-end leading-none">
                  <span className="text-[10px] text-[#8b949e] uppercase font-bold tracking-tighter mb-1">Snapshot ID</span>
                  <span className="font-mono text-[11px] text-[#19C37D]">sn_84f92-2023-x9</span>
               </div>
               <div className="flex flex-col items-end leading-none">
                  <span className="text-[10px] text-[#8b949e] uppercase font-bold tracking-tighter mb-1">Rollback Status</span>
                  <span className="text-emerald-500 font-bold text-[11px] uppercase flex items-center gap-2">
                     <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div> Available
                  </span>
               </div>
            </div>
            <button 
              onClick={() => setDrawerOpen(!drawerOpen)}
              className={`flex items-center gap-2 transition-colors ${drawerOpen ? 'text-[#19C37D]' : 'text-[#8b949e] hover:text-white'}`}
            >
              <MessagesSquare size={20} />
              <span className="text-[10px] font-bold uppercase tracking-widest">Notas</span>
            </button>
            <img className="w-8 h-8 rounded border border-[#30363d]" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCxDZ0eS28tqlTRXmCxWltKbp9KamIIrKvlsqFZlU-WgrhxQoLETfOl3J3u-SY5sDO2gkEnS4io1-nB2oCIKMnggyZaCKG1kR7wXw0rnv8V9meMCEwOv1xAYLVvBqfCM6-OXydXChpbUjkvTkAwj0PH5B_hFF5-ouEnx5aG-rSgiIbLmeRCl7LT8-TqfKMALypquUOx_xaT9I1vDYFDfp_-IbvBh8murY646eAH8BB6hfwBfvQWWljGwuIUezzoVz31-DHAX8dStCWf" alt=""/>
          </div>
        </nav>

        <div className="flex-1 overflow-y-auto p-8 space-y-10 custom-scrollbar bg-[#0d1117] relative">
          {/* Breadcrumb e Título */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 relative z-10">
            <div>
              <div className="flex items-center gap-2 text-[10px] font-bold text-[#8b949e] mb-2 uppercase tracking-widest">
                 <Link to="/admin/projects" className="hover:text-[#19C37D] transition-colors">Projects</Link>
                 <span>/</span>
                 <span className="hover:text-[#19C37D] cursor-pointer">Core-Service-API</span>
                 <span>/</span>
                 <span className="text-white">Diagnostic Report #{id || '3421'}</span>
              </div>
              <h2 className="text-2xl font-black text-white uppercase tracking-tight">Relatório Técnico Completo</h2>
            </div>
            <div className="flex items-center gap-3">
               <span className="px-3 py-1 rounded bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-bold uppercase tracking-widest shadow-xl">
                 Severidade: Crítica
               </span>
               <span className="px-3 py-1 rounded bg-[#161b22] border border-[#30363d] text-[#8b949e] text-xs font-mono">
                 ID: 0x9f22...e81c
               </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10">
            {/* Coluna Esquerda: Logs e Histórico */}
            <div className="lg:col-span-7 space-y-6">
              <section className="bg-[#161b22] border border-[#30363d] rounded-lg overflow-hidden shadow-2xl">
                <div className="p-4 border-b border-[#30363d] flex items-center justify-between bg-white/[0.02]">
                  <div className="flex items-center gap-2">
                    <ListFilter size={18} className="text-[#8b949e]" />
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">Detailed System Logs</h3>
                  </div>
                  <span className="text-[10px] font-mono text-[#8b949e]">248 entries parsed</span>
                </div>
                <div className="divide-y divide-[#30363d]">
                  {/* Log Info */}
                  <div className="p-3 hover:bg-white/[0.02] cursor-pointer group transition-colors">
                    <div className="flex items-start gap-3 text-xs font-mono">
                      <span className="text-[#484f58] shrink-0 w-16">14:22:01.0</span>
                      <span className="text-[#19C37D] font-bold shrink-0">[INFO]</span>
                      <span className="text-[#8b949e]">Scanner initialization sequence started for module 'security-gate'</span>
                      <ChevronDown size={14} className="ml-auto text-[#484f58] group-hover:text-white transition-opacity" />
                    </div>
                  </div>
                  
                  {/* Log Fail - Ativo conforme screenshot */}
                  <div className="p-3 bg-red-500/5 border-l-2 border-l-red-500 group relative">
                    <div className="flex items-start gap-3 text-xs font-mono mb-2">
                      <span className="text-[#484f58] shrink-0 w-16">14:22:05.1</span>
                      <span className="text-red-500 font-bold shrink-0">[FAIL]</span>
                      <div className="flex flex-col gap-1">
                        <div className="text-white flex items-center gap-2">
                          Pattern match exception: SQL_INJECTION_RISK at /auth/login.ts:42
                          <div className="relative group/note cursor-help">
                            <MessageSquare size={14} className="text-[#19C37D] fill-[#19C37D] fill-opacity-20" />
                            <div className="absolute invisible group-hover/note:visible bg-[#161b22] border border-[#19C37D]/50 text-white p-3 rounded shadow-2xl z-50 w-64 text-[10px] left-8 top-0 animate-in fade-in duration-200">
                              <p className="font-sans font-bold text-[#19C37D] mb-1 uppercase">Admin-Sênior:</p>
                              <p className="font-sans leading-tight">Verifiquei o SQL Injection, parece um falso positivo devido ao sanitizador customizado.</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <ChevronDown size={14} className="ml-auto rotate-180 text-red-500" />
                    </div>
                    <div className="pl-24 pr-4 py-2 space-y-1">
                      <p className="text-[11px] text-[#8b949e] leading-relaxed font-mono">
                        Stacktrace: at TechLabsScanner.analyzeNode(ast.ts:882) <br/>
                        at TechLabsScanner.traverseTree(ast.ts:124) <br/>
                        at Main.executeAudit(core.ts:45)
                      </p>
                    </div>
                  </div>

                  {/* Log Warn */}
                  <div className="p-3 hover:bg-white/[0.02] cursor-pointer group transition-colors">
                    <div className="flex items-start gap-3 text-xs font-mono">
                      <span className="text-[#484f58] shrink-0 w-16">14:22:08.9</span>
                      <span className="text-amber-500 font-bold shrink-0">[WARN]</span>
                      <span className="text-[#8b949e]">Heuristic mismatch on performance threshold: actual=45ms target=40ms</span>
                      <ChevronDown size={14} className="ml-auto text-[#484f58] group-hover:text-white" />
                    </div>
                  </div>
                </div>
                <div className="p-3 text-center border-t border-[#30363d] bg-[#161b22]">
                  <button className="text-[10px] text-[#19C37D] font-bold uppercase tracking-widest hover:underline">CARREGAR MAIS LOGS (4.2MB)</button>
                </div>
              </section>

              <section className="bg-[#161b22] border border-[#30363d] rounded-lg p-6 shadow-2xl">
                <div className="flex items-center gap-3 mb-8">
                  <History size={18} className="text-[#8b949e]" />
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">Histórico de Correções</h3>
                </div>
                <div className="relative pl-6 border-l border-[#30363d] space-y-10">
                  <div className="relative">
                    <div className="absolute -left-[31px] top-1 w-[10px] h-[10px] rounded-full bg-[#19C37D] ring-4 ring-[#0d1117] shadow-[0_0_10px_#19C37D]"></div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-bold text-white">IA Patch v1.02 Applied</span>
                      <span className="text-[10px] font-mono text-[#8b949e]">12 OUT 2023 10:45</span>
                    </div>
                    <p className="text-xs text-[#8b949e] font-medium leading-relaxed">Autofix executed successfully. 12 vulnerabilities patched. Global score improved by +4.2.</p>
                  </div>
                  
                  <div className="relative">
                    <div className="absolute -left-[31px] top-1 w-[10px] h-[10px] rounded-full bg-[#30363d] ring-4 ring-[#0d1117]"></div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-bold text-[#8b949e]">Rollback Triggered</span>
                      <span className="text-[10px] font-mono text-[#8b949e]">11 OUT 2023 23:12</span>
                    </div>
                    <p className="text-xs text-[#484f58] italic font-medium">Manual rollback requested by admin_root. Reason: Performance regression in middleware.</p>
                  </div>
                </div>
              </section>
            </div>

            {/* Coluna Direita: Raw Data e Métricas */}
            <div className="lg:col-span-5 space-y-6">
              <section className="bg-[#010409] border border-[#30363d] rounded-lg flex flex-col min-h-[500px] overflow-hidden shadow-2xl">
                <div className="p-4 border-b border-[#30363d] flex items-center justify-between bg-[#161b22]">
                  <div className="flex items-center gap-2">
                    <Braces size={18} className="text-[#19C37D]" />
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">Raw Diagnostic Data</h3>
                  </div>
                  <div className="flex gap-1">
                    <button className="p-1 hover:bg-[#30363d] rounded transition-all text-[#8b949e] hover:text-white"><Copy size={16} /></button>
                    <button className="p-1 hover:bg-[#30363d] rounded transition-all text-[#8b949e] hover:text-white"><Download size={16} /></button>
                  </div>
                </div>
                
                <div className="flex-1 p-4 font-mono text-[11px] overflow-auto leading-relaxed relative bg-black/20">
                  <div className="absolute left-0 top-0 w-8 bg-[#161b22] h-full border-r border-[#30363d] flex flex-col text-[10px] text-[#484f58] text-center pt-4 font-bold select-none">
                    {Array.from({ length: 14 }).map((_, i) => (
                      <span key={i} className={i + 1 === 12 ? 'text-[#19C37D] font-black' : ''}>{i + 1}</span>
                    ))}
                  </div>
                  <pre className="pl-10 text-[#c9d1d9]">
                    <code>
{`{
  "`}<span className="text-[#79c0ff]">audit_metadata</span>{`": {
    "`}<span className="text-[#79c0ff]">id</span>{`": "`} <span className="text-[#a5d6ff]">"AUD-8422-X"</span>{`,
    "`}<span className="text-[#79c0ff]">timestamp</span>{`": `} <span className="text-[#d2a8ff]">1697112000</span>{`,
    "`}<span className="text-[#79c0ff]">engine_version</span>{`": `} <span className="text-[#a5d6ff]">"4.2.1-beta"</span>{`
  },
  "`}<span className="text-[#79c0ff]">analysis_target</span>{`": {
    "`}<span className="text-[#79c0ff]">repository</span>{`": `} <span className="text-[#a5d6ff]">"techlabs-core/api"</span>{`,
    "`}<span className="text-[#79c0ff]">branch</span>{`": `} <span className="text-[#a5d6ff]">"main"</span>{`,
    "`}<span className="text-[#79c0ff]">files_scanned</span>{`": `} <span className="text-[#d2a8ff]">1242</span>{`
  },
  "`}<span className="text-[#79c0ff]">findings</span>{`": [
    { `}<div className="inline-flex items-center gap-1 bg-[#19C37D]/10 px-1 rounded"><MessageSquare size={10} className="text-[#19C37D] fill-[#19C37D]" /><span className="text-[8px] text-[#19C37D]"> Severity override proposed here.</span></div>{`
      "`}<span className="text-[#79c0ff]">type</span>{`": `} <span className="text-[#a5d6ff]">"security"</span>{`,
      "`}<span className="text-[#79c0ff]">severity</span>{`": `} <span className="text-[#a5d6ff]">"critical"</span>{`,
      "`}<span className="text-[#79c0ff]">fixed</span>{`": `} <span className="text-[#ffab70]">true</span>{`,
      "`}<span className="text-[#79c0ff]">patch_id</span>{`": `} <span className="text-[#a5d6ff]">"p_9921_sec"</span>{`
    },
    {
      "`}<span className="text-[#79c0ff]">type</span>{`": `} <span className="text-[#a5d6ff]">"performance"</span>{`,
      "`}<span className="text-[#79c0ff]">latency_delta</span>{`": `} <span className="text-[#a5d6ff]">"-15ms"</span>{`,
      "`}<span className="text-[#79c0ff]">optimization_flags</span>{`": [
        `} <span className="text-[#a5d6ff]">"GC_TUNING"</span>{`,
        `} <span className="text-[#a5d6ff]">"MEM_LIMIT"</span>{`
      ]
    }
  ]
}`}
                    </code>
                  </pre>
                </div>
              </section>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#161b22] border border-[#30363d] p-4 rounded-lg shadow-xl group hover:border-[#19C37D]/30 transition-all">
                  <span className="text-[10px] text-[#8b949e] uppercase font-bold block mb-1">Heap Size</span>
                  <div className="flex items-center gap-2">
                     <span className="text-xl font-mono text-white font-black tracking-tighter">512 MB</span>
                     <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></div>
                  </div>
                </div>
                <div className="bg-[#161b22] border border-[#30363d] p-4 rounded-lg shadow-xl group hover:border-[#19C37D]/30 transition-all">
                  <span className="text-[10px] text-[#8b949e] uppercase font-bold block mb-1">Uptime</span>
                  <div className="flex items-center gap-2">
                     <span className="text-xl font-mono text-white font-black tracking-tighter">42d 12h</span>
                     <div className="w-1.5 h-1.5 rounded-full bg-[#19C37D] animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Console Footer Sticky */}
          <footer className="bg-[#161b22] border border-[#30363d] p-4 rounded-xl flex flex-wrap items-center justify-between gap-4 sticky bottom-0 z-40 shadow-[0_0_50px_rgba(0,0,0,1)] border-t-[#19C37D]/20">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#19C37D]/10 rounded flex items-center justify-center text-[#19C37D] shadow-inner">
                <ShieldCheck size={20} />
              </div>
              <div className="hidden sm:block">
                <span className="text-xs font-bold text-[#c9d1d9] uppercase tracking-tight">Admin Actions Console</span>
                <p className="text-[9px] text-[#8b949e] font-bold uppercase tracking-widest mt-0.5">Sessão Root Autenticada</p>
              </div>
            </div>

            <div className="flex items-center flex-wrap gap-3">
              <button className="px-4 py-2 bg-transparent border border-[#30363d] hover:bg-white/5 rounded text-[10px] font-black text-[#c9d1d9] uppercase tracking-widest flex items-center gap-2 transition-all active:scale-95 shadow-lg">
                <FileText size={14} /> Exportar PDF
              </button>
              <button className="px-4 py-2 bg-transparent border border-[#30363d] hover:bg-white/5 rounded text-[10px] font-black text-[#c9d1d9] uppercase tracking-widest flex items-center gap-2 transition-all active:scale-95">
                <AlertTriangle size={14} className="text-red-500" /> Alterar Severidade
              </button>
              <button className="px-4 py-2 bg-transparent border border-amber-500/50 text-amber-500 hover:bg-amber-500/10 rounded text-[10px] font-black uppercase tracking-widest flex items-center gap-2 transition-all active:scale-95">
                <RefreshCcw size={14} /> Forçar Nova Correção
              </button>
              <button 
                onClick={() => navigate(`/admin/diagnostic/proposal/${id || '3421'}`)}
                className="px-6 py-2 bg-[#19C37D] text-black hover:brightness-110 rounded text-[10px] font-black uppercase tracking-widest flex items-center gap-2 transition-all shadow-xl shadow-[#19C37D]/30 active:scale-95"
              >
                <Send size={16} strokeWidth={3} /> Gerar Proposta
              </button>
            </div>
          </footer>
        </div>

        {/* Decorative Binary Background Stream */}
        <div className="fixed top-0 right-0 w-1/4 h-full pointer-events-none opacity-[0.02] select-none font-mono text-[8px] overflow-hidden whitespace-pre z-0 text-[#19C37D]">
          01101111 01100111 01101001 01100011 
          TECHLABS_CORE_RECOVERY_PROTOCOL
          AUTHENTICATION_TOKEN_EXPIRED
          DEBUG_MODE_ENABLED_LOGGING
          01101111 01100111 01101001 01100011 
          PROCESS_MANAGER_ACTIVE_PID_8992
          MEMORY_DUMP_IN_PROGRESS_0%
          MEMORY_DUMP_IN_PROGRESS_25%
          MEMORY_DUMP_IN_PROGRESS_50%
          MEMORY_DUMP_IN_PROGRESS_100%
          SYSTEM_DIAGNOSTIC_STABLE_VERIFIED
        </div>
      </main>
    </div>
  );
}


import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  ShieldCheck, ShieldAlert, Zap, Download, 
  RefreshCcw, Maximize2, FileText, FolderArchive,
  Terminal, Monitor, ChevronRight, Lock, 
  CheckCircle2, Info, Activity, Search, AlertTriangle, 
  Wand2, Cpu, Globe, ArrowLeft, ExternalLink, Code,
  Signal
} from 'lucide-react';
import ClientSidebar from '../../components/client/ClientSidebar';
import { clientDataService, Project } from '../../services/clientDataService';

export default function DetailedReport() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      if (id) {
        const data = await clientDataService.getProjectById(id);
        setProject(data || null);
      }
      setLoading(false);
    }
    load();
  }, [id]);

  if (loading) return (
    <div className="min-h-screen bg-[#f6f8f7] flex items-center justify-center">
      <div className="text-[#19C37D] font-black uppercase tracking-[0.3em] animate-pulse">Descriptografando_Ativos...</div>
    </div>
  );

  if (!project) return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
       <ShieldAlert size={64} className="text-red-500 mb-8" />
       <h1 className="text-3xl font-black uppercase tracking-tighter italic">Relatório não encontrado</h1>
       <button onClick={() => navigate('/client/dashboard')} className="mt-8 px-8 py-4 bg-[#19C37D] text-black font-black uppercase text-xs rounded-xl">Voltar ao Portal</button>
    </div>
  );

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 font-display text-slate-800 dark:text-slate-100 flex flex-col overflow-hidden antialiased">
      {/* Header Corporativo Detalhado */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 h-20 shrink-0 z-50 flex items-center shadow-sm">
        <div className="w-full max-w-[1600px] mx-auto px-10 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-[#19C37D] rounded flex items-center justify-center text-white shadow-lg shadow-[#19C37D]/20">
                <Zap size={22} strokeWidth={2.5} />
              </div>
              <div className="hidden lg:block">
                 <span className="text-xl font-black tracking-tighter uppercase text-slate-900 dark:text-white">TechLabs <span className="text-[#19C37D] text-[10px] tracking-[0.2em] ml-1">IA AUDIT</span></span>
              </div>
            </div>
            <div className="h-8 w-px bg-slate-200 dark:bg-slate-700"></div>
            <div className="flex flex-col">
               <h1 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight">Relatório Técnico Detalhado: {project.title}</h1>
               <div className="flex items-center gap-2 mt-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#19C37D] animate-pulse"></div>
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Protocolo: {project.id} • Disponível para Download</span>
               </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate(`/client/projects/${id}`)}
              className="px-6 py-2.5 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2"
            >
               <ArrowLeft size={14} /> Voltar ao Projeto
            </button>
            <button className="px-6 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-[10px] font-black uppercase tracking-widest rounded-xl flex items-center gap-2 transition-all">
              <Download size={16} /> Baixar PDF Completo
            </button>
            <button className="px-6 py-2.5 bg-[#19C37D] hover:bg-[#15a368] text-white text-[10px] font-black uppercase tracking-widest rounded-xl flex items-center gap-2 transition-all shadow-xl shadow-[#19C37D]/20 active:scale-95">
              <RefreshCcw size={16} /> Sincronizar Correções no GitHub
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 flex overflow-hidden">
        {/* Sidebar de Achados e Diagnósticos */}
        <aside className="w-[450px] border-r border-slate-200 dark:border-slate-800 flex flex-col bg-slate-50/30 dark:bg-slate-900/30 overflow-hidden">
          <div className="p-8 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-2">Diagnóstico Geral</h2>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter uppercase italic">45 Achados</div>
              <div className="flex gap-3">
                <span className="px-3 py-1 bg-red-500/10 text-red-500 text-[9px] font-black rounded-lg uppercase tracking-widest border border-red-500/20 shadow-sm">12 Críticos</span>
                <span className="px-3 py-1 bg-orange-500/10 text-orange-500 text-[9px] font-black rounded-lg uppercase tracking-widest border border-orange-500/20 shadow-sm">05 Altos</span>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar p-8 space-y-12">
            {/* Vulnerabilidades Section */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-red-500/10 rounded-lg flex items-center justify-center text-red-500"><ShieldAlert size={20} /></div>
                <h3 className="font-black text-xs uppercase tracking-[0.2em] text-slate-900 dark:text-white italic">Vulnerabilidades de Segurança</h3>
              </div>
              <div className="space-y-6">
                <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-[#19C37D]/30 dark:border-[#19C37D]/10 shadow-sm hover:shadow-xl transition-all cursor-pointer group relative overflow-hidden">
                  <div className="absolute top-0 right-0 h-1 w-full bg-red-500/20"></div>
                  <div className="flex justify-between items-start mb-4">
                    <span className="px-2.5 py-1 bg-red-500/10 text-red-600 text-[8px] font-black rounded-lg uppercase tracking-widest border border-red-500/10">Crítico</span>
                    <span className="text-[10px] text-slate-400 font-mono font-bold">ID: SEC-042</span>
                  </div>
                  <h4 className="font-black text-sm mb-3 uppercase tracking-tight text-slate-900 dark:text-white group-hover:text-[#19C37D] transition-colors">Exposição de Secrets no Código Fonte</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">Detectada a presença de chaves de API estáticas no arquivo <code className="bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-[10px]">auth_provider.js</code>. Risco alto de comprometimento total de credenciais.</p>
                </div>

                <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm opacity-60 hover:opacity-100 transition-opacity cursor-pointer">
                  <div className="flex justify-between items-start mb-4">
                    <span className="px-2.5 py-1 bg-orange-500/10 text-orange-600 text-[8px] font-black rounded-lg uppercase tracking-widest">Alto</span>
                    <span className="text-[10px] text-slate-400 font-mono font-bold">ID: SEC-089</span>
                  </div>
                  <h4 className="font-black text-sm mb-3 uppercase tracking-tight">Injeção de Dependência Não Sanitizada</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">O endpoint de busca permite a execução de scripts arbitrários através de parâmetros de URL mal formatados.</p>
                </div>
              </div>
            </section>

            {/* Performance Section */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-amber-500/10 rounded-lg flex items-center justify-center text-amber-500"><Activity size={20} /></div>
                <h3 className="font-black text-xs uppercase tracking-[0.2em] text-slate-900 dark:text-white italic">Gargalos de Performance</h3>
              </div>
              <div className="space-y-6">
                <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm hover:border-amber-500/30 transition-all cursor-pointer">
                  <div className="flex justify-between items-start mb-4">
                    <span className="px-2.5 py-1 bg-amber-500/10 text-amber-600 text-[8px] font-black rounded-lg uppercase tracking-widest">Médio</span>
                    <span className="text-[10px] text-slate-400 font-mono font-bold">ID: PERF-012</span>
                  </div>
                  <h4 className="font-black text-sm mb-3 uppercase tracking-tight">Loop de Renderização Ineficiente</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">O componente <code className="bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-[10px]">DataGrid</code> está sendo renderizado 15 vezes por segundo devido a um hook desnecessário.</p>
                </div>
              </div>
            </section>

            {/* Refatoração Section */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-[#19C37D]/10 rounded-lg flex items-center justify-center text-[#19C37D]"><Wand2 size={20} /></div>
                <h3 className="font-black text-xs uppercase tracking-[0.2em] text-slate-900 dark:text-white italic">Sugestões de Refatoração</h3>
              </div>
              <div className="space-y-6 pb-12">
                <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm hover:border-[#19C37D]/30 transition-all cursor-pointer">
                  <div className="flex justify-between items-start mb-4">
                    <span className="px-2.5 py-1 bg-[#19C37D]/10 text-[#19C37D] text-[8px] font-black rounded-lg uppercase tracking-widest">Otimização</span>
                    <span className="text-[10px] text-slate-400 font-mono font-bold">ID: CODE-77</span>
                  </div>
                  <h4 className="font-black text-sm mb-3 uppercase tracking-tight">Clean Architecture Hub</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">Sugestão de mover a lógica de negócios para camadas de Use Cases independentes do Framework, seguindo padrões SOLID.</p>
                </div>
              </div>
            </section>
          </div>
        </aside>

        {/* Área Principal de Code Review / Diff Viewer */}
        <section className="flex-1 flex flex-col bg-slate-50 dark:bg-slate-950 overflow-hidden relative">
          <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-white dark:bg-slate-900 z-10 shrink-0">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-mono font-bold text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                <FileText size={16} />
                src/providers/auth_provider.js
              </div>
              <div className="flex items-center gap-2">
                 <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest px-2 py-0.5 border border-slate-200 dark:border-slate-800 rounded">Javascript / Node</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="p-2.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors text-slate-400 hover:text-slate-900 dark:hover:text-white border border-transparent hover:border-slate-200 dark:hover:border-slate-700 shadow-sm"><Maximize2 size={20} /></button>
            </div>
          </div>

          <div className="flex-1 flex divide-x divide-slate-200 dark:divide-slate-800 overflow-hidden">
            {/* Código Original */}
            <div className="flex-1 flex flex-col min-w-0 h-full">
              <div className="px-6 py-3 bg-slate-100 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between shrink-0">
                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-500 italic">Código Original</span>
                <span className="text-[9px] font-bold text-red-500/60 uppercase tracking-widest px-2 py-0.5 bg-red-500/5 rounded">LEGACY_STATE</span>
              </div>
              <div className="flex-1 overflow-auto bg-[#0d1117] p-8 font-mono text-sm leading-relaxed custom-scrollbar selection:bg-[#19C37D]/20">
                <div className="flex h-full">
                  <div className="w-12 text-slate-600 text-right pr-6 select-none text-[10px] font-bold leading-relaxed border-r border-white/5 mr-6 flex flex-col gap-0.5 opacity-40">
                    {Array.from({ length: 18 }).map((_, i) => <span key={i}>{i+1}</span>)}
                  </div>
                  <div className="text-slate-300 w-full">
                    <span className="text-purple-400">import</span> {'{'} API_URL {'}'} <span className="text-purple-400">from</span> <span className="text-yellow-400">'./config'</span>;<br/>
                    <br/>
                    <span className="text-blue-400">export const</span> <span className="text-[#19C37D]">fetchUserData</span> = <span className="text-purple-400">async</span> (userId) =&gt; {'{'}<br/>
                    &nbsp;&nbsp;<span className="text-slate-500">// CRITICAL: Secret key hardcoded below</span><br/>
                    <div className="bg-red-500/10 -mx-4 px-4 block border-l-4 border-red-500/40">
                    &nbsp;&nbsp;<span className="text-blue-400">const</span> <span className="text-red-400">API_KEY = "sk_live_51Mv456XYZ9923"</span>;<br/>
                    </div>
                    &nbsp;&nbsp;<br/>
                    <div className="bg-red-500/10 -mx-4 px-4 block border-l-4 border-red-500/40">
                    &nbsp;&nbsp;<span className="text-blue-400">const</span> response = <span className="text-purple-400">await</span> <span className="text-blue-400">fetch</span>(<span className="text-yellow-400">`</span>{'$'}{'{'}API_URL{'}'}<span className="text-yellow-400">/users/</span>{'$'}{'{'}userId{'}'}<span className="text-yellow-400">?key=</span>{'$'}{'{'}API_KEY{'}'}<span className="text-yellow-400">`</span>);<br/>
                    </div>
                    &nbsp;&nbsp;<span className="text-blue-400">const</span> data = <span className="text-purple-400">await</span> response.json();<br/>
                    &nbsp;&nbsp;<br/>
                    &nbsp;&nbsp;<span className="text-purple-400">return</span> data;<br/>
                    {'}'};
                  </div>
                </div>
              </div>
            </div>

            {/* Código Otimizado pela IA */}
            <div className="flex-1 flex flex-col min-w-0 h-full">
              <div className="px-6 py-3 bg-[#19C37D]/5 dark:bg-[#19C37D]/5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between shrink-0">
                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[#19C37D] italic flex items-center gap-2">
                  <Wand2 size={12} /> Código Otimizado pela IA
                </span>
                <span className="text-[9px] font-black text-[#19C37D] uppercase tracking-widest px-2 py-0.5 bg-[#19C37D]/10 rounded shadow-sm">AI_REFACTORED</span>
              </div>
              <div className="flex-1 overflow-auto bg-[#0d1117] p-8 font-mono text-sm leading-relaxed custom-scrollbar selection:bg-[#19C37D]/20">
                <div className="flex h-full">
                  <div className="w-12 text-slate-600 text-right pr-6 select-none text-[10px] font-bold leading-relaxed border-r border-white/5 mr-6 flex flex-col gap-0.5 opacity-40">
                    {Array.from({ length: 20 }).map((_, i) => <span key={i}>{i+1}</span>)}
                  </div>
                  <div className="text-slate-300 w-full">
                    <span className="text-purple-400">import</span> {'{'} API_URL {'}'} <span className="text-purple-400">from</span> <span className="text-yellow-400">'./config'</span>;<br/>
                    <br/>
                    <span className="text-blue-400">export const</span> <span className="text-[#19C37D]">fetchUserData</span> = <span className="text-purple-400">async</span> (userId) =&gt; {'{'}<br/>
                    <div className="bg-[#2ea44f20] -mx-4 px-4 block border-l-4 border-[#3fb950]">
                    &nbsp;&nbsp;<span className="text-slate-500">// IA: Utilizando variáveis de ambiente para segurança</span><br/>
                    &nbsp;&nbsp;<span className="text-blue-400">const</span> API_KEY = process.env.REACT_APP_TECHLABS_API_KEY;<br/>
                    </div>
                    &nbsp;&nbsp;<br/>
                    <div className="bg-[#2ea44f20] -mx-4 px-4 block border-l-4 border-[#3fb950]">
                    &nbsp;&nbsp;<span className="text-blue-400">const</span> response = <span className="text-purple-400">await</span> <span className="text-blue-400">fetch</span>(<span className="text-yellow-400">`</span>{'$'}{'{'}API_URL{'}'}<span className="text-yellow-400">/users/</span>{'$'}{'{'}userId{'}'}<span className="text-yellow-400">`</span>, {'{'}<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;headers: {'{'} <span className="text-yellow-400">'Authorization'</span>: <span className="text-yellow-400">`Bearer </span>{'$'}{'{'}API_KEY{'}'}<span className="text-yellow-400">`</span> {'}'}<br/>
                    &nbsp;&nbsp;{'}'});<br/>
                    </div>
                    &nbsp;&nbsp;<span className="text-blue-400">const</span> data = <span className="text-purple-400">await</span> response.json();<br/>
                    &nbsp;&nbsp;<br/>
                    &nbsp;&nbsp;<span className="text-purple-400">return</span> data;<br/>
                    {'}'};
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Overlay flutuante de status da auditoria */}
          <div className="absolute bottom-8 right-8 z-20 animate-in fade-in slide-in-from-bottom-4 duration-1000">
             <div className="bg-slate-900/90 backdrop-blur-xl border border-white/10 p-5 rounded-3xl shadow-2xl flex items-center gap-6">
                <div className="flex items-center gap-4">
                   <div className="w-10 h-10 rounded-full bg-[#19C37D]/20 flex items-center justify-center">
                      <Cpu className="text-[#19C37D]" size={20} />
                   </div>
                   <div>
                      <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Engine Status</p>
                      <p className="text-xs font-black text-white uppercase tracking-tighter italic">Auditoria Concluída_</p>
                   </div>
                </div>
                <div className="h-8 w-px bg-white/10"></div>
                <div className="flex items-center gap-3">
                   <div className="px-3 py-1.5 bg-black/40 border border-white/5 rounded-xl flex items-center gap-2">
                      {/* Fix: Added missing Signal icon to the display */}
                      <Signal size={14} className="text-[#19C37D]" />
                      <span className="text-[9px] font-mono text-[#19C37D] font-bold">128ms_LAT</span>
                   </div>
                </div>
             </div>
          </div>
        </section>
      </main>

      {/* Footer Minimalista de Status */}
      <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-6 shrink-0 h-16 flex items-center z-50">
        <div className="max-w-[1600px] mx-auto px-10 w-full flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all">
              <div className="w-6 h-6 bg-slate-400 rounded flex items-center justify-center text-white">
                <Globe size={14} strokeWidth={3} />
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Dresbach Group Holding</span>
            </div>
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">© 2024 TechLabs IA Consulting. Toronto, Canada.</p>
          </div>
          <div className="flex gap-10">
            <button className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-[#19C37D] transition-colors">Suporte Direto</button>
            <button className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-[#19C37D] transition-colors">Documentação Técnica</button>
            <button className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-[#19C37D] transition-colors">Protocolos de Segurança</button>
          </div>
        </div>
      </footer>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(200, 200, 200, 0.2);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(25, 195, 125, 0.4);
        }
      `}</style>
    </div>
  );
}

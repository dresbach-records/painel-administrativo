
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Globe, Cpu, AlertTriangle, RefreshCcw, ShieldCheck
} from 'lucide-react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import { useInfraSync } from '../../hooks/useInfraSync';

export default function AdminInfrastructure() {
  const { nodes, isLoading, error, refresh } = useInfraSync(5000);

  if (isLoading) return (
    <div className="flex h-screen bg-[#111111] items-center justify-center">
       <div className="w-12 h-12 border-4 border-[#19C37D]/20 border-t-[#19C37D] rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="flex h-screen overflow-hidden bg-[#111111] text-[#E2E8F0] font-sans antialiased">
      <AdminSidebar />

      <main className="flex-1 flex flex-col min-w-0 bg-[#111111] relative">
        <header className="h-20 border-b border-[#2A2A2A] bg-[#1A1A1A]/50 backdrop-blur-xl flex items-center justify-between px-10 sticky top-0 z-20">
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-black text-white uppercase tracking-tight">Infraestrutura <span className="text-[#19C37D]">Global</span></h1>
            <div className="flex items-center gap-3 px-4 py-1.5 bg-[#19C37D]/10 border border-[#19C37D]/20 rounded-full">
              <div className="w-2 h-2 rounded-full bg-[#19C37D] animate-pulse"></div>
              <span className="text-[10px] font-mono text-[#19C37D] uppercase font-bold">Realtime Telemetry</span>
            </div>
          </div>
          <button onClick={refresh} className="p-3 text-slate-500 hover:text-[#19C37D] transition-all"><RefreshCcw size={20} /></button>
        </header>

        <div className="flex-1 overflow-y-auto p-10 space-y-10 custom-scrollbar z-10">
          {error ? (
            <div className="bg-[#1A1A1A] border border-red-500/20 rounded-[2.5rem] p-20 flex flex-col items-center text-center space-y-8 shadow-2xl">
               <AlertTriangle size={64} className="text-red-500" />
               <div className="space-y-2">
                 <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter">Telemetry_Cluster_Offline</h3>
                 <p className="text-slate-500 font-mono text-xs uppercase max-w-md">{error}</p>
               </div>
               <button onClick={refresh} className="px-12 py-5 bg-[#19C37D] text-black rounded-2xl font-black uppercase text-xs tracking-widest flex items-center gap-3">
                 <RefreshCcw size={18} /> Reconnect_Nodes
               </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-12 gap-10">
                <div className="col-span-12 lg:col-span-8 bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-10 relative min-h-[450px] overflow-hidden shadow-2xl">
                   <div className="absolute inset-0 flex items-center justify-center opacity-[0.08] pointer-events-none">
                     <Globe size={600} className="text-[#19C37D]" strokeWidth={0.5} />
                   </div>
                   <div className="relative z-10">
                     <h3 className="text-xl font-black text-white uppercase tracking-tighter">Cluster Distribution Matrix</h3>
                     <p className="text-xs text-[#666] font-bold uppercase tracking-widest mt-1">Multi-Region Redundancy Active</p>
                   </div>
                </div>

                <div className="col-span-12 lg:col-span-4 bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-8">
                   <h3 className="text-lg font-black text-white uppercase tracking-tighter mb-8 flex items-center gap-3">
                     <Cpu className="text-[#19C37D]" size={20} /> Computing Capacity
                   </h3>
                   <div className="space-y-8">
                      {nodes.map((node, i) => (
                        <div key={i} className="space-y-3">
                           <div className="flex justify-between text-[10px] font-black uppercase text-slate-500">
                             <span>{node.name}</span>
                             <span className={node.cpu > 80 ? 'text-red-500' : 'text-[#19C37D]'}>{node.cpu}%</span>
                           </div>
                           <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                              <div className={`h-full transition-all duration-1000 ${node.cpu > 80 ? 'bg-red-500' : 'bg-[#19C37D]'}`} style={{ width: `${node.cpu}%` }}></div>
                           </div>
                        </div>
                      ))}
                      {nodes.length === 0 && <p className="text-[10px] font-bold text-slate-700 uppercase italic">No_Computing_Nodes_Detected</p>}
                   </div>
                </div>
              </div>
            </>
          )}
        </div>

        <footer className="h-14 bg-black border-t border-[#2A2A2A] px-10 py-4 flex items-center justify-between text-[9px] text-slate-600 uppercase tracking-[0.4em] font-black shrink-0">
          <div className="flex items-center gap-10">
            <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-[#19C37D] rounded-full animate-pulse"></span> DB_MASTER_Nominal</div>
          </div>
          <div className="font-mono flex items-center gap-2"><ShieldCheck size={12} /> Sync_Node: TL-ADM-V2.4</div>
        </footer>
      </main>
    </div>
  );
}

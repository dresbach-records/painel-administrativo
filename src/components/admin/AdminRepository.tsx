
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Terminal, LayoutDashboard, Ticket, Workflow, 
  Users, Network, Settings2, Bell, Search, 
  LogOut, ShieldCheck, ChevronRight, FileUp,
  Download, Trash2, Eye, FileText, FolderArchive,
  Filter, ChevronLeft, X, Check, Upload, RefreshCcw, AlertTriangle
} from 'lucide-react';
import AdminSidebar from '@/@/components/admin/AdminSidebar';
import { repositoryService } from '@/@/services/repository.service';

export default function AdminRepository() {
  const navigate = useNavigate();
  const [files, setFiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const loadFiles = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await repositoryService.getFiles();
      setFiles(data);
    } catch (err: any) {
      setError(err.message || 'Falha ao sincronizar repositório S3.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFiles();
  }, []);

  if (loading) return (
    <div className="flex h-screen bg-[#111111] items-center justify-center">
       <div className="w-10 h-10 border-2 border-[#19C37D]/20 border-t-[#19C37D] rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="flex h-screen overflow-hidden bg-[#111111] text-[#E2E8F0] font-sans antialiased">
      <AdminSidebar />

      <main className="flex-1 flex flex-col min-w-0 bg-[#111111]">
        <header className="h-20 border-b border-white/5 bg-[#1A1A1A]/50 backdrop-blur-xl flex items-center justify-between px-10 sticky top-0 z-20">
          <div>
            <h1 className="text-lg font-black text-white uppercase tracking-tight">Repositório de Ativos</h1>
          </div>
          <button 
            onClick={() => setIsUploadModalOpen(true)}
            className="bg-[#19C37D] text-black px-6 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest hover:brightness-110 shadow-lg shadow-[#19C37D]/10"
          >
            <FileUp size={18} /> Upload Nova Versão
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-10 custom-scrollbar">
          {error ? (
            <div className="bg-[#1A1A1A] border border-red-500/20 rounded-[2.5rem] p-20 flex flex-col items-center text-center space-y-6 shadow-2xl">
               <AlertTriangle size={48} className="text-red-500" />
               <h3 className="text-xl font-black text-white uppercase tracking-tighter italic">Storage_Node_Connection_Failed</h3>
               <p className="text-slate-500 font-mono text-xs uppercase">{error}</p>
               <button onClick={loadFiles} className="px-10 py-4 bg-[#19C37D] text-black rounded-xl font-black uppercase text-xs tracking-widest flex items-center gap-2">
                 <RefreshCcw size={16} /> Retry_Sync
               </button>
            </div>
          ) : (
            <div className="bg-[#1A1A1A] border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-black/20 text-[9px] uppercase tracking-[0.2em] text-slate-600 font-black border-b border-white/5">
                    <th className="px-10 py-5">Nome do Arquivo</th>
                    <th className="px-10 py-5">Data de Upload</th>
                    <th className="px-10 py-5 text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {files.map((file, i) => (
                    <tr key={i} className="hover:bg-white/[0.02] transition-colors group cursor-default">
                      <td className="px-10 py-6">
                        <div className="flex items-center gap-4">
                          <FileText size={20} className="text-[#19C37D]" />
                          <span className="text-sm font-black text-white uppercase">{file.name}</span>
                        </div>
                      </td>
                      <td className="px-10 py-6">
                        <span className="text-[10px] font-mono text-slate-500">{new Date(file.createdAt).toLocaleDateString()}</span>
                      </td>
                      <td className="px-10 py-6 text-right">
                         <button className="p-2 text-slate-600 hover:text-white"><Download size={18} /></button>
                      </td>
                    </tr>
                  ))}
                  {files.length === 0 && (
                    <tr>
                      <td colSpan={3} className="px-10 py-20 text-center text-[10px] font-black uppercase text-slate-700 italic">
                        No_Documents_Found_In_Safe
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

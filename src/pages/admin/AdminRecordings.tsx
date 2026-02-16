
import React from 'react';
import { Search, Filter, PlayCircle, Eye, Download, Share2, ChevronLeft, ChevronRight } from 'lucide-react';
import AdminSidebar from '../../components/admin/AdminSidebar';

export default function AdminRecordings() {
  const recordings = [
    { thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCitUU6vdrVGBjnOFBtGYYbcg5HbDxkbHS7X1Az_8SmxZK1I2F_dZ4R5HHo7C2u2OKWF10apLIPUp14TpI9ZWhh_LeM2ZdwaVzw8CnkhDSW1urUx1LW8jXls30cM5eYqPqK9kY6EKf7Y3Vgm6BjPPVAEabajSlYdf7XnVpWY714P4kX6H6of79-vJygjgVEspYm6FPQHcdOcoOt5TGWbpqCBTwqqRGUl3Kvsg7w-2odPz3_47jVIZIvkJeX65UDNN-miJEnjV3xFRpH', date: '12 Mai, 2024', time: '14:30 PM', title: 'Arquitetura de Microsserviços v2', project: 'Projeto Alpha', duration: '01:24:12', size: '842 MB' },
    { thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCitUU6vdrVGBjnOFBtGYYbcg5HbDxkbHS7X1Az_8SmxZK1I2F_dZ4R5HHo7C2u2OKWF10apLIPUp14TpI9ZWhh_LeM2ZdwaVzw8CnkhDSW1urUx1LW8jXls30cM5eYqPqK9kY6EKf7Y3Vgm6BjPPVAEabajSlYdf7XnVpWY714P4kX6H6of79-vJygjgVEspYm6FPQHcdOcoOt5TGWbpqCBTwqqRGUl3Kvsg7w-2odPz3_47jVIZIvkJeX65UDNN-miJEnjV3xFRpH', date: '10 Mai, 2024', time: '10:00 AM', title: 'Code Review: API de Pagamentos', project: 'Infraestrutura', duration: '00:45:00', size: '310 MB' }
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-[#111111] text-[#E2E8F0] font-sans antialiased">
      <AdminSidebar />

      <main className="flex-1 flex flex-col min-w-0 bg-[#111111] relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#19C37D]/5 blur-[150px] rounded-full pointer-events-none"></div>

        <header className="p-10 pb-4 flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div>
            <h1 className="text-3xl font-black text-white uppercase tracking-tighter">Repositório de Gravações</h1>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px] mt-2">Acesso e gerenciamento das sessões técnicas gravadas.</p>
          </div>
          <div className="flex items-center gap-4 w-full lg:w-auto">
            <div className="relative flex-1 lg:w-96 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-700 group-focus-within:text-[#19C37D] transition-colors" size={20} />
              <input className="w-full h-14 bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl pl-12 pr-6 text-sm font-bold text-white focus:outline-none focus:ring-1 focus:ring-[#19C37D]/30 transition-all placeholder:text-slate-800" placeholder="Buscar gravações..." type="text" />
            </div>
            <button className="p-4 bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl text-slate-500 hover:text-white transition-all"><Filter size={20} /></button>
          </div>
        </header>

        <div className="flex-1 p-10 overflow-y-auto custom-scrollbar relative z-10">
          <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-[2rem] overflow-hidden shadow-2xl">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-black/20 border-b border-[#2A2A2A] text-[10px] font-black text-slate-600 uppercase tracking-[0.2em]">
                  <th className="px-8 py-6">Gravação</th>
                  <th className="px-8 py-6">Data</th>
                  <th className="px-8 py-6">Título da Sessão</th>
                  <th className="px-8 py-6 text-center">Duração</th>
                  <th className="px-8 py-6 text-center">Tamanho</th>
                  <th className="px-8 py-6 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {recordings.map((rec, i) => (
                  <tr key={i} className="hover:bg-white/[0.01] transition-colors group">
                    <td className="px-8 py-6">
                      <div className="relative w-32 h-20 rounded-xl overflow-hidden border border-white/10 group-hover:border-[#19C37D]/50 transition-all">
                        <img alt="" className="w-full h-full object-cover opacity-60" src={rec.thumbnail} />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-transparent"><PlayCircle size={28} className="text-white/40 group-hover:text-[#19C37D]" /></div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex flex-col">
                        <span className="text-sm font-black text-white uppercase">{rec.date}</span>
                        <span className="text-[10px] font-bold text-slate-600 mt-1">{rec.time}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex flex-col">
                        <span className="text-sm font-black text-slate-200 uppercase group-hover:text-[#19C37D] transition-colors">{rec.title}</span>
                        <span className="text-[10px] font-black text-[#19C37D] uppercase mt-1 opacity-70">{rec.project}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-center"><span className="text-[10px] font-black font-mono text-slate-300 bg-white/5 px-3 py-1 rounded-lg">{rec.duration}</span></td>
                    <td className="px-8 py-6 text-center"><span className="text-[10px] font-black font-mono text-slate-600">{rec.size}</span></td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex items-center justify-end gap-3 opacity-30 group-hover:opacity-100 transition-all">
                        <button className="p-3 bg-white/5 text-slate-400 hover:text-white rounded-xl"><Eye size={18} /></button>
                        <button className="p-3 bg-white/5 text-slate-400 hover:text-[#19C37D] rounded-xl"><Download size={18} /></button>
                        <button className="p-3 bg-white/5 text-slate-400 hover:text-blue-400 rounded-xl"><Share2 size={18} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="px-10 py-6 border-t border-white/5 bg-black/20 flex items-center justify-between">
              <span className="text-[10px] font-black text-slate-700 uppercase tracking-[0.2em]">Exibindo {recordings.length} de 128 gravações</span>
              <div className="flex items-center gap-4">
                <button className="p-2.5 border border-white/5 rounded-xl text-slate-600 disabled:opacity-20" disabled><ChevronLeft size={16} /></button>
                <button className="w-10 h-10 bg-[#19C37D] text-black rounded-xl font-black text-[11px]">1</button>
                <button className="p-2.5 border border-white/5 rounded-xl text-slate-600"><ChevronRight size={16} /></button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

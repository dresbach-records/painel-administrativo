
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, Github, MessageSquare, Loader2, 
  ArrowRight, Lock, User, HelpCircle
} from 'lucide-react';
import ClientSidebar from '../../components/client/ClientSidebar';
import { projectService } from '../../services/project.service';
import { auditService } from '../../services/audit.service';

export default function ClientNewProject() {
  const navigate = useNavigate();
  const [step, setStep] = useState<'mode' | 'input' | 'analysis'>('mode');
  const [mode, setMode] = useState<'import' | 'scratch'>('scratch');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [formData, setFormData] = useState({ title: '', data: '', isPrivate: true });

  const handleStartAnalysis = async () => {
    setStep('analysis');
    setIsAnalyzing(true);
    
    try {
      const result = await auditService.analyze({
        type: mode,
        data: formData.data,
        clientName: 'InnovateX HQ'
      });
      
      const newProject = await projectService.create({
        title: formData.title,
        category: 'Sistemas Digitais',
        sourceType: mode,
        sourceUrl: formData.data,
        isPaid: false
      });
      
      navigate(`/client/audit/result/${newProject.id}`);
    } catch (error) {
      alert("Erro na comunicação com o servidor de auditoria.");
      setStep('input');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f6f8f7] flex font-display text-slate-800 antialiased">
      <ClientSidebar />
      <main className="flex-1 lg:ml-72 flex flex-col h-screen overflow-hidden">
        <nav className="border-b border-[#13c37d]/10 bg-white/80 backdrop-blur-md sticky top-0 z-40 h-16 shrink-0 flex items-center px-10 justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#13c37d] rounded-lg flex items-center justify-center text-white shadow-lg shadow-[#13c37d]/20">
              <ShieldCheck size={20} strokeWidth={2.5} />
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-800">TechLabs <span className="text-[#13c37d]">Audit Pipeline</span></span>
          </div>
        </nav>

        <div className="flex-1 overflow-y-auto p-12 custom-scrollbar">
          <div className="max-w-3xl mx-auto">
            {step === 'mode' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in">
                <button onClick={() => { setMode('import'); setStep('input'); }} className="p-10 bg-white border border-slate-200 rounded-2xl hover:border-[#13c37d]/40 transition-all text-left shadow-sm">
                  <div className="w-14 h-14 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center mb-8"><Github size={28} /></div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4 uppercase">GitHub Sync</h3>
                  <p className="text-slate-400 text-xs font-medium">Análise SAST de código-fonte de produção.</p>
                </button>
                <button onClick={() => { setMode('scratch'); setStep('input'); }} className="p-10 bg-white border border-slate-200 rounded-2xl hover:border-[#13c37d]/40 transition-all text-left shadow-sm">
                  <div className="w-14 h-14 bg-[#13c37d]/10 text-[#13c37d] rounded-2xl flex items-center justify-center mb-8"><MessageSquare size={28} /></div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4 uppercase">Novo Briefing</h3>
                  <p className="text-slate-400 text-xs font-medium">Desenho arquitetural a partir de requisitos.</p>
                </button>
              </div>
            )}

            {step === 'input' && (
              <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-2xl space-y-8 animate-in slide-in-from-bottom-4">
                 <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); handleStartAnalysis(); }}>
                    <div className="space-y-2">
                       <label className="text-sm font-semibold text-slate-700">Título do Projeto</label>
                       <input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold" placeholder="Ex: Backend Pro" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-sm font-semibold text-slate-700">Fonte (Git URL ou Texto)</label>
                       <textarea required value={formData.data} onChange={e => setFormData({...formData, data: e.target.value})} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium min-h-[120px]" />
                    </div>
                    <button type="submit" className="w-full bg-[#13c37d] text-white py-4 rounded-lg font-bold uppercase text-xs flex items-center justify-center gap-3">
                       Iniciar Análise em Servidor <ArrowRight size={18} />
                    </button>
                 </form>
              </div>
            )}

            {step === 'analysis' && (
              <div className="flex flex-col items-center py-20 text-center">
                 <Loader2 size={64} className="text-[#13c37d] animate-spin mb-10" />
                 <h2 className="text-2xl font-bold uppercase tracking-tight">Audit Pipeline Running</h2>
                 <p className="text-slate-500 mt-4 max-w-sm">O backend da TechLabs está processando seu projeto. Isso pode levar alguns segundos...</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

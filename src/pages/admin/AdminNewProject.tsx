
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, Github, MessageSquare, Loader2, 
  ArrowRight, ShieldAlert, Cpu, Zap, Info, 
  RefreshCcw, AlertCircle
} from 'lucide-react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import { projectService } from '../../services/project.service';
import { auditService } from '../../services/audit.service';
import { useAnalysisStream } from '../../hooks/useAnalysisStream';

type WizardStep = 'mode' | 'input' | 'analysis' | 'review';

export default function AdminNewProject() {
  const navigate = useNavigate();
  const [step, setStep] = useState<WizardStep>('mode');
  const [mode, setMode] = useState<'import' | 'scratch'>('scratch');
  const [analysisId, setAnalysisId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    client: '',
    category: 'Arquitetura de Sistemas',
    data: '', 
    isPrivate: true
  });

  const [aiResult, setAiResult] = useState<any>(null);

  const { logs, isCompleted, error: streamError } = useAnalysisStream(analysisId);

  useEffect(() => {
    if (isCompleted && analysisId) {
      auditService.getReportById(analysisId).then(res => {
        setAiResult(res);
        setStep('review');
      }).catch(() => {
        setTimeout(() => setStep('review'), 2000);
      });
    }
  }, [isCompleted, analysisId]);

  const handleStartHandshake = async () => {
    if (!formData.title || !formData.data) return alert("Preencha todos os campos.");
    setStep('analysis');
    
    try {
      // Endpoint Mandatório: /ai/consultation
      const response = await auditService.analyze({
        type: mode,
        data: formData.data,
        clientName: formData.client || 'Cliente Enterprise'
      });
      setAnalysisId(response.analysisId);
    } catch (error: any) {
      alert("Falha ao iniciar pipeline: " + error.message);
      setStep('input');
    }
  };

  const handleFinalSave = async () => {
    setIsSaving(true);
    try {
      await projectService.create({
        title: formData.title,
        client: formData.client || 'Cliente Enterprise',
        category: formData.category,
        sourceType: mode,
        sourceUrl: formData.data,
      });
      navigate('/admin/projects');
    } catch (error) {
      alert("Erro ao persistir ativo.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#f6f8f7] text-slate-800 font-sans antialiased">
      <AdminSidebar />
      <main className="flex-1 flex flex-col min-w-0 bg-[#f6f8f7] relative">
        <nav className="border-b border-[#19C37D]/10 bg-white/80 backdrop-blur-md sticky top-0 z-40 h-16 shrink-0 flex items-center px-8 justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#19C37D] rounded-lg flex items-center justify-center text-white shadow-lg shadow-[#19C37D]/20">
              <ShieldCheck size={20} strokeWidth={2.5} />
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-800">TechLabs <span className="text-[#19C37D]">AI Provisioning</span></span>
          </div>
        </nav>

        <div className="flex-1 overflow-y-auto p-12 custom-scrollbar">
          <div className="max-w-3xl mx-auto">
            {step === 'mode' && (
              <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4">
                <header className="text-center sm:text-left mb-10">
                  <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase italic mb-3">Provisionamento de Ativos</h1>
                  <p className="text-slate-500 text-lg font-medium">Selecione a origem para análise via Backend Engineering.</p>
                </header>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <button onClick={() => { setMode('import'); setStep('input'); }} className="p-10 bg-white border border-slate-200 rounded-[2rem] hover:border-[#19C37D]/40 transition-all text-left shadow-sm">
                    <div className="w-14 h-14 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center mb-8"><Github size={28} /></div>
                    <h3 className="text-xl font-black text-slate-900 uppercase mb-4">Repositório Externo</h3>
                    <p className="text-slate-400 text-xs font-medium">Clone e auditoria SAST via Nó de Segurança.</p>
                  </button>
                  <button onClick={() => { setMode('scratch'); setStep('input'); }} className="p-10 bg-white border border-slate-200 rounded-[2rem] hover:border-[#19C37D]/40 transition-all text-left shadow-sm">
                    <div className="w-14 h-14 bg-[#19C37D]/10 text-[#19C37D] rounded-2xl flex items-center justify-center mb-8"><MessageSquare size={28} /></div>
                    <h3 className="text-xl font-black text-slate-900 uppercase mb-4">Briefing Direto</h3>
                    <p className="text-slate-400 text-xs font-medium">Design e arquitetura orientada a dados.</p>
                  </button>
                </div>
              </div>
            )}

            {step === 'input' && (
              <div className="space-y-10 animate-in slide-in-from-bottom-2">
                <div className="bg-white border border-slate-200 rounded-2xl p-10 shadow-xl space-y-8">
                  <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); handleStartHandshake(); }}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Nome do Projeto</label>
                        <input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold shadow-inner" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Cliente</label>
                        <input required value={formData.client} onChange={e => setFormData({...formData, client: e.target.value})} className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold shadow-inner" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Fonte de Dados / URL</label>
                      <input required value={formData.data} onChange={e => setFormData({...formData, data: e.target.value})} className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-xl text-sm font-mono shadow-inner" />
                    </div>
                    <button type="submit" className="w-full bg-[#19C37D] text-white py-5 rounded-2xl font-black uppercase text-xs shadow-xl active:scale-95 transition-transform">Disparar Auditoria IA</button>
                  </form>
                </div>
              </div>
            )}

            {step === 'analysis' && (
              <div className="flex flex-col items-center py-20 text-center">
                {!streamError ? (
                  <>
                    <Loader2 size={80} className="text-[#19C37D] animate-spin mb-10" />
                    <h2 className="text-2xl font-black uppercase tracking-tighter italic">Processamento em Nó Servidor</h2>
                    <div className="w-full max-w-lg bg-slate-900 rounded-2xl p-8 mt-10 font-mono text-[10px] text-[#19C37D] text-left shadow-2xl min-h-[150px] custom-scrollbar">
                      {logs.map((log, i) => <p key={i} className="mb-1">{log}</p>)}
                      {logs.length === 0 && <p className="animate-pulse opacity-50 italic">Sincronizando stream de logs...</p>}
                    </div>
                  </>
                ) : (
                  <div className="bg-white border border-red-100 rounded-3xl p-16 shadow-2xl space-y-6">
                    <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto text-red-500">
                      <AlertCircle size={40} />
                    </div>
                    <h2 className="text-xl font-black text-slate-900 uppercase">Análise Interrompida</h2>
                    <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">{streamError}</p>
                    <button onClick={() => setStep('input')} className="px-10 py-4 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 mx-auto">
                      <RefreshCcw size={14} /> Retry_Input
                    </button>
                  </div>
                )}
              </div>
            )}

            {step === 'review' && aiResult && (
              <div className="space-y-8 animate-in fade-in zoom-in-95 duration-500">
                 <div className="bg-white border border-slate-200 rounded-[2.5rem] p-12 shadow-2xl">
                    <h3 className="text-xl font-black uppercase tracking-tighter italic mb-8">Resultado da Auditoria IA</h3>
                    <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 italic text-sm mb-10 text-slate-600 leading-relaxed shadow-inner">
                       {aiResult.executiveSummary}
                    </div>
                    <button onClick={handleFinalSave} disabled={isSaving} className="w-full py-6 bg-slate-900 text-white rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-black transition-all flex items-center justify-center gap-3 active:scale-[0.98] shadow-xl">
                       {isSaving ? <Loader2 className="animate-spin" size={18} /> : <ShieldCheck size={18} />}
                       Confirmar e Provisionar Ativo
                    </button>
                 </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}


import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  Briefcase, Send, Clock, CheckCircle2, 
  ArrowLeft, ShieldCheck, CreditCard, FileText, AlertTriangle, Loader2
} from 'lucide-react';
import AdminSidebar from '@/@/components/admin/AdminSidebar';
import { api } from '@/@/services/api';

export default function AdminProposalGenerator() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isSending, setIsSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [hours, setHours] = useState(24);
  const [rate, setRate] = useState(250);
  const [tier, setTier] = useState<'essential' | 'premium'>('essential');

  const total = hours * rate;

  const handleSend = async () => {
    setIsSending(true);
    setError(null);
    try {
      // Chamada real ao backend. Se falhar, a UI reflete o erro imediatamente.
      await api.post(`/ai/report/${id}/generate-proposal`, {
        hours,
        rate,
        tier,
        total
      });
      setSuccess(true);
      setTimeout(() => navigate('/admin/diagnostic/all'), 2000);
    } catch (err: any) {
      setError(err.message || "Falha ao persistir proposta no cluster.");
    } finally {
      setIsSending(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-[#f6f8f7] flex items-center justify-center p-6 font-mono">
        <div className="max-w-md w-full bg-white rounded-[2.5rem] p-12 text-center shadow-2xl border border-[#19C37D]/20">
           <CheckCircle2 size={56} className="text-[#19C37D] mx-auto mb-8" />
           <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter mb-4 italic">Proposta Sincronizada</h2>
           <p className="text-slate-500 text-xs uppercase">Notificação enviada ao nó do cliente com sucesso.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[#f6f8f7] text-slate-800 font-sans antialiased">
      <AdminSidebar />
      <main className="flex-1 flex flex-col min-w-0 bg-[#f6f8f7]">
        <header className="bg-white border-b border-[#19C37D]/10 px-10 py-5 sticky top-0 z-50 shadow-sm shrink-0">
          <div className="max-w-[1600px] mx-auto flex justify-between items-center">
            <div className="flex items-center gap-5">
              <div className="w-12 h-12 bg-[#19C37D] rounded-xl flex items-center justify-center text-white shadow-lg"><Briefcase size={24} /></div>
              <div><h1 className="text-xl font-black text-slate-900 uppercase tracking-tighter italic">Proposal Generator</h1></div>
            </div>
            <div className="flex items-center gap-6">
              <button onClick={() => navigate(-1)} className="text-[11px] font-black uppercase text-slate-400">Cancelar</button>
              <button 
                onClick={handleSend}
                disabled={isSending}
                className="bg-[#19C37D] text-white px-10 py-3.5 rounded-xl font-black text-[11px] uppercase tracking-[0.2em] flex items-center gap-3 shadow-xl disabled:opacity-50"
              >
                {isSending ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
                {isSending ? 'Sincronizando...' : 'Publicar Proposta'}
              </button>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-10 custom-scrollbar">
           <div className="max-w-3xl mx-auto space-y-10">
              {error && (
                <div className="p-6 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-4 text-red-500 font-mono text-[10px] uppercase">
                   <AlertTriangle size={20} />
                   <span>{error}</span>
                </div>
              )}
              
              <section className="bg-white rounded-3xl shadow-sm border border-slate-200 p-10 space-y-8">
                 <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase text-slate-400">Horas de Engenharia</label>
                       <input type="number" value={hours} onChange={e => setHours(Number(e.target.value))} className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl text-sm font-black" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase text-slate-400">Taxa Horária (R$)</label>
                       <input type="number" value={rate} onChange={e => setRate(Number(e.target.value))} className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl text-sm font-black" />
                    </div>
                 </div>
                 <div className="pt-6 border-t border-slate-50 flex justify-between items-center">
                    <span className="text-slate-400 font-black text-[10px] uppercase">Investimento Calculado</span>
                    <span className="text-2xl font-black text-[#19C37D]">R$ {total.toLocaleString('pt-BR')}</span>
                 </div>
              </section>
           </div>
        </div>
      </main>
    </div>
  );
}

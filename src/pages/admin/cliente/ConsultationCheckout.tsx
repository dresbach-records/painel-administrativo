
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  CreditCard, Lock, Loader2, Cpu, ArrowRight, Check, ArrowLeft,
  ShieldCheck, Globe2, AlertTriangle
} from 'lucide-react';
import ClientSidebar from '../../components/client/ClientSidebar';
import { auditService, TechnicalReport } from '../../services/audit.service';
import { projectService } from '../../services/project.service';

export default function ConsultationCheckout() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [report, setReport] = useState<TechnicalReport | null>(null);
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'wire'>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [agreed, setAgreed] = useState(false);
  const [duration, setDuration] = useState('12m');

  useEffect(() => {
    if (id) {
      auditService.getReportById(id)
        .then(res => setReport(res))
        .catch(() => setError("Falha ao recuperar cotação do servidor."));
    }
  }, [id]);

  const handlePayment = async () => {
    if (!agreed) return alert("Aceite os termos.");
    setError(null);
    setIsProcessing(true);
    
    try {
      // Nenhum setTimeout permitido. Espera real do backend.
      await projectService.initiatePayment(id!, {
        method: paymentMethod,
        duration,
        amount: report?.pricing?.total
      });
      // Só redireciona se o backend confirmar sucesso da intenção de pagamento
      navigate('/client/dashboard');
    } catch (err: any) {
      setError(err.message || "O provedor de pagamento não respondeu. Operação abortada.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center p-10 text-center font-mono">
        <AlertTriangle size={48} className="text-red-500 mb-6" />
        <h2 className="text-white text-xl font-black uppercase mb-4 tracking-tighter">Erro de Conformidade Financeira</h2>
        <p className="text-slate-500 text-xs uppercase mb-10">{error}</p>
        <button onClick={() => window.location.reload()} className="px-10 py-4 bg-[#19C37D] text-black font-black uppercase text-xs rounded-xl">Reiniciar Handshake</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f6f8f7] flex font-display text-slate-800 antialiased">
      <ClientSidebar />
      <main className="flex-1 lg:ml-72 flex flex-col h-screen overflow-hidden">
        <nav className="bg-white border-b border-[#19C37D]/10 py-4 px-10 shrink-0 flex justify-between items-center z-20 backdrop-blur-md sticky top-0">
          <div className="flex items-center gap-2 group cursor-pointer" onClick={() => navigate('/client/dashboard')}>
             <div className="w-8 h-8 bg-[#19C37D] rounded flex items-center justify-center text-white"><Cpu size={18} /></div>
             <span className="text-xl font-black tracking-tight text-slate-900">TechLabs <span className="text-[#19C37D]">AI</span></span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-500 font-bold text-[10px] uppercase tracking-widest"><Lock size={12} /> Gateway Seguro</div>
        </nav>

        <div className="flex-1 overflow-y-auto p-10 custom-scrollbar bg-[#f6f8f7]">
           <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              <div className="lg:col-span-8 space-y-10">
                 {step === 1 && (
                    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-2">
                       <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">Escolha do Plano</h1>
                       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {['3m', '6m', '12m'].map(t => (
                            <button key={t} onClick={() => setDuration(t)} className={`p-6 border-2 rounded-[1.5rem] text-left transition-all ${duration === t ? 'border-[#19C37D] bg-white shadow-xl' : 'border-slate-200 bg-white'}`}>
                               <span className="block text-xl font-black text-slate-900 uppercase">{t === '3m' ? 'Enterprise' : t === '6m' ? 'Accelerate' : 'Legacy'}</span>
                            </button>
                          ))}
                       </div>
                       <div className="pt-10 border-t border-slate-200 flex justify-end">
                          <button onClick={() => setStep(2)} className="bg-[#19C37D] text-white px-12 py-5 rounded-2xl font-black text-xs uppercase shadow-xl">Continuar para Faturamento</button>
                       </div>
                    </div>
                 )}

                 {step === 2 && (
                    <div className="space-y-10 animate-in fade-in">
                       <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">Pagamento em Nó Seguro</h1>
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <label onClick={() => setPaymentMethod('card')} className={`flex items-center p-6 border-2 rounded-2xl cursor-pointer ${paymentMethod === 'card' ? 'border-[#19C37D] bg-[#19C37D]/5' : 'border-slate-200 bg-white'}`}>
                             <div className="flex-1 font-black text-sm uppercase">Cartão B2B</div>
                             <CreditCard size={28} className={paymentMethod === 'card' ? 'text-[#19C37D]' : 'text-slate-200'} />
                          </label>
                          <label onClick={() => setPaymentMethod('wire')} className={`flex items-center p-6 border-2 rounded-2xl cursor-pointer ${paymentMethod === 'wire' ? 'border-[#19C37D] bg-[#19C37D]/5' : 'border-slate-200 bg-white'}`}>
                             <div className="flex-1 font-black text-sm uppercase">Wire Transfer</div>
                             <Globe2 size={28} className={paymentMethod === 'wire' ? 'text-[#19C37D]' : 'text-slate-200'} />
                          </label>
                       </div>
                       <div className="flex items-center gap-6 p-6 bg-white border border-slate-200 rounded-[2rem]">
                          <ShieldCheck size={28} className="text-[#19C37D]" />
                          <p className="text-sm font-black text-slate-900 uppercase italic">A transação será validada síncronamente pelo cluster financeiro.</p>
                       </div>
                       <div className="pt-10 border-t border-slate-200 flex justify-between">
                          <button onClick={() => setStep(1)} className="text-slate-500 font-black text-xs uppercase flex items-center gap-2"><ArrowLeft size={18} /> Voltar</button>
                       </div>
                    </div>
                 )}
              </div>

              <aside className="lg:col-span-4 sticky top-24 space-y-8 animate-in slide-in-from-right-2">
                 <div className="bg-white rounded-[2.5rem] border border-[#19C37D]/10 overflow-hidden shadow-2xl">
                    <div className="p-8 border-b border-slate-50 bg-slate-50/20">
                       <h3 className="text-lg font-black text-slate-900 uppercase tracking-tighter italic">Checkout Audit</h3>
                    </div>
                    <div className="p-8 space-y-8">
                       {report?.pricing ? (
                         <div className="pt-6 border-t border-dashed border-slate-200 space-y-4">
                            <div className="flex justify-between items-end">
                               <span className="text-slate-400 font-black text-[10px] uppercase">Investimento Único</span>
                               <span className="text-2xl font-black text-slate-900">R$ {report.pricing.total.toLocaleString('pt-BR')}</span>
                            </div>
                         </div>
                       ) : (
                         <div className="py-10 text-center space-y-4 opacity-50">
                            <Loader2 className="animate-spin mx-auto text-slate-300" size={24} />
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Consultando Cluster de Preços...</p>
                         </div>
                       )}
                       
                       <label className="flex items-start gap-4 cursor-pointer">
                          <input type="checkbox" checked={agreed} onChange={() => setAgreed(!agreed)} className="w-5 h-5 text-[#19C37D] border-slate-200 rounded-lg" />
                          <span className="text-[10px] text-slate-500 font-bold uppercase leading-relaxed">Confirmo que esta é uma transação B2B final para liberação de propriedade intelectual técnica.</span>
                       </label>

                       <button 
                         onClick={handlePayment} 
                         disabled={isProcessing || !report?.pricing || !agreed} 
                         className={`w-full h-20 rounded-2xl font-black text-xs uppercase tracking-[0.4em] transition-all flex items-center justify-center gap-4 ${isProcessing ? 'bg-slate-100 text-slate-300' : 'bg-[#19C37D] text-white hover:brightness-105 shadow-xl'}`}
                       >
                          {isProcessing ? 'VALIDATING_PAYMENT...' : 'Autorizar Faturamento'}
                       </button>
                    </div>
                 </div>
              </aside>
           </div>
        </div>
      </main>
    </div>
  );
}

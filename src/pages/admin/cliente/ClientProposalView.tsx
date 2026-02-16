
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  Shield, Printer, Download, ArrowLeft, BarChart3, 
  AlertTriangle, Verified, CheckCircle2, ChevronRight,
  TrendingDown, Info, Zap, Globe, Signature, Bolt,
  Lock, Activity, Scale, Box, ShieldCheck
} from 'lucide-react';

export default function ClientProposalView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [agreed, setAgreed] = useState(false);
  const [isApproving, setIsApproving] = useState(false);

  const handleApprove = () => {
    if (!agreed) {
      alert("Por favor, aceite os termos antes de prosseguir.");
      return;
    }
    setIsApproving(true);
    // Simulação de sincronização de nodes antes de levar para o checkout
    setTimeout(() => {
      setIsApproving(false);
      // Redireciona para o checkout padrão já existente
      // O Checkout por sua vez levará para a HOME após o pagamento
      navigate(`/client/consultation/checkout/${id || 'PR-2024-0892'}`);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#f6f8f7] font-sans text-slate-800 antialiased pb-20">
      {/* Header Fixo de Navegação */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 no-print">
        <div className="max-w-7xl mx-auto px-10 h-20 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <button 
              onClick={() => navigate('/client/proposals')}
              className="p-2.5 bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-900 rounded-xl transition-all"
            >
              <ArrowLeft size={20} />
            </button>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-[#19C37D] rounded-lg flex items-center justify-center text-white shadow-lg shadow-[#19C37D]/20">
                <Shield size={20} />
              </div>
              <div>
                <h1 className="text-lg font-bold tracking-tight text-slate-900 uppercase leading-none">Dresbach <span className="text-[#19C37D]">Group</span></h1>
                <p className="text-[9px] text-slate-500 uppercase tracking-widest mt-1 font-black">Canadá • Brasil</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-8">
            <div className="hidden lg:block text-right">
              <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">Documento ID</p>
              <p className="font-mono text-xs font-bold text-slate-900">#{id || 'PR-2024-0892'}</p>
            </div>
            <div className="flex gap-3">
               <button onClick={() => window.print()} className="p-3 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-[#19C37D] transition-all shadow-sm">
                 <Printer size={18} />
               </button>
               <button className="p-3 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-[#19C37D] transition-all shadow-sm">
                 <Download size={18} />
               </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-10 py-16">
        {/* Seção Hero da Proposta */}
        <div className="mb-16 text-center md:text-left">
          <span className="inline-block px-4 py-1.5 bg-[#19C37D]/10 text-[#19C37D] text-[10px] font-black rounded-full mb-6 uppercase tracking-[0.2em] border border-[#19C37D]/10">Proposta Técnica Oficial</span>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight mb-6 uppercase tracking-tighter italic">
            Proposta Estratégica de <br className="hidden md:block"/> Manutenção e Segurança
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl leading-relaxed font-medium">
            Baseado no diagnóstico técnico realizado em sua unidade, apresentamos o plano de intervenção estruturado para garantir a continuidade operacional e integridade dos ativos.
          </p>
        </div>

        {/* Technical Summary Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm group hover:shadow-xl transition-all">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 bg-[#19C37D]/10 text-[#19C37D] rounded-xl flex items-center justify-center"><BarChart3 size={20} /></div>
              <h3 className="font-black text-xs uppercase tracking-widest text-slate-400">Score de Eficiência</h3>
            </div>
            <div className="flex items-end gap-3">
              <span className="text-5xl font-black text-slate-900 tracking-tighter">64%</span>
              <span className="text-[10px] text-red-500 font-black pb-1.5 flex items-center gap-1 uppercase tracking-tighter">
                <TrendingDown size={14} strokeWidth={3} /> -12% vs ideal
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-6">Necessita intervenção imediata</p>
          </div>

          <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm group hover:shadow-xl transition-all">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 bg-amber-50 text-amber-500 rounded-xl flex items-center justify-center"><AlertTriangle size={20} /></div>
              <h3 className="font-black text-xs uppercase tracking-widest text-slate-400">Riscos Detectados</h3>
            </div>
            <div className="text-5xl font-black text-slate-900 tracking-tighter">08</div>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-6">Sendo 3 de alta criticidade</p>
          </div>

          <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm group hover:shadow-xl transition-all">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 bg-[#19C37D]/10 text-[#19C37D] rounded-xl flex items-center justify-center"><ShieldCheck size={20} /></div>
              <h3 className="font-black text-xs uppercase tracking-widest text-slate-400">Garantia Dresbach</h3>
            </div>
            <div className="text-5xl font-black text-slate-900 tracking-tighter">24</div>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-6">Meses de garantia pós-reparo</p>
          </div>
        </div>

        {/* Tabela Detalhada de Intervenção */}
        <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-2xl overflow-hidden mb-16">
          <div className="px-10 py-6 border-b border-slate-100 bg-slate-50/50 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <h3 className="text-lg font-black text-slate-900 uppercase tracking-tighter italic">Plano de Intervenção: Diagnostic & Repair</h3>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-1 bg-[#19C37D]/10 text-[#19C37D] border border-[#19C37D]/20 rounded-full text-[9px] font-black uppercase tracking-widest">
                 <div className="w-1.5 h-1.5 rounded-full bg-[#19C37D] animate-pulse"></div> Ativo
              </div>
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Prazo estimado: 15 dias úteis</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[10px] uppercase font-black tracking-widest text-slate-400 border-b border-slate-100 bg-slate-50/20">
                  <th className="px-10 py-6">Descrição do Serviço / Item</th>
                  <th className="px-10 py-6 text-center">Quant.</th>
                  <th className="px-10 py-6 text-right">Valor Unit.</th>
                  <th className="px-10 py-6 text-right">Subtotal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                <tr className="group">
                  <td className="px-10 py-8">
                    <p className="font-black text-sm text-slate-900 uppercase tracking-tight group-hover:text-[#19C37D] transition-colors">Recuperação Estrutural de Sistemas Críticos</p>
                    <p className="text-xs text-slate-400 font-medium mt-2 italic">Intervenção nível 3 nos módulos de segurança central.</p>
                  </td>
                  <td className="px-10 py-8 text-center font-bold text-slate-600">01</td>
                  <td className="px-10 py-8 text-right font-bold text-slate-600">R$ 12.450,00</td>
                  <td className="px-10 py-8 text-right font-black text-slate-900">R$ 12.450,00</td>
                </tr>
                <tr className="group">
                  <td className="px-10 py-8">
                    <p className="font-black text-sm text-slate-900 uppercase tracking-tight group-hover:text-[#19C37D] transition-colors">Sensores de Precisão Ultra-High (NIST Cert.)</p>
                    <p className="text-xs text-slate-400 font-medium mt-2 italic">Substituição de hardware obsoleto por sensores certificados.</p>
                  </td>
                  <td className="px-10 py-8 text-center font-bold text-slate-600">04</td>
                  <td className="px-10 py-8 text-right font-bold text-slate-600">R$ 1.890,00</td>
                  <td className="px-10 py-8 text-right font-black text-slate-900">R$ 7.560,00</td>
                </tr>
                <tr className="group">
                  <td className="px-10 py-8">
                    <p className="font-black text-sm text-slate-900 uppercase tracking-tight group-hover:text-[#19C37D] transition-colors">Calibração e Teste de Estresse Operacional</p>
                    <p className="text-xs text-slate-400 font-medium mt-2 italic">Protocolo internacional Dresbach de validação técnica.</p>
                  </td>
                  <td className="px-10 py-8 text-center font-bold text-slate-600">01</td>
                  <td className="px-10 py-8 text-right font-bold text-slate-600">R$ 3.200,00</td>
                  <td className="px-10 py-8 text-right font-black text-slate-900">R$ 3.200,00</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="px-10 py-10 bg-slate-50/50 flex flex-col md:flex-row justify-between gap-10">
            <div className="md:max-w-md">
              <div className="flex items-center gap-3 mb-4">
                 <Info size={16} className="text-slate-400" />
                 <h4 className="font-black text-[10px] uppercase tracking-widest text-slate-900">Observações Técnicas</h4>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed font-medium italic">
                Os valores incluem logística, mão de obra especializada e impostos. A validade desta proposta é de 7 dias corridos devido à flutuação de custos de componentes importados.
              </p>
            </div>
            <div className="flex flex-col items-end gap-2 shrink-0">
              <span className="text-slate-400 text-[10px] uppercase font-black tracking-widest">Investimento Total</span>
              <span className="text-4xl font-black text-slate-900 tracking-tighter">R$ 23.210,00</span>
              <div className="bg-[#19C37D]/10 px-4 py-1.5 rounded-lg border border-[#19C37D]/20 mt-2">
                 <span className="text-[#19C37D] text-[10px] font-black uppercase tracking-widest">10% Off à vista: R$ 20.889,00</span>
              </div>
            </div>
          </div>
        </div>

        {/* Proposição de Valor e Confiança */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20 items-stretch">
          <div className="space-y-10 py-6">
            <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter italic">Por que o Grupo Dresbach?</h3>
            <div className="flex gap-6 group">
              <div className="shrink-0 w-14 h-14 bg-[#19C37D]/5 border border-[#19C37D]/10 rounded-[1.2rem] flex items-center justify-center text-[#19C37D] group-hover:scale-110 transition-transform">
                <Globe size={24} />
              </div>
              <div>
                <h4 className="font-black text-sm text-slate-900 uppercase tracking-tight">Padronização Global</h4>
                <p className="text-sm text-slate-500 font-medium leading-relaxed mt-2">Metodologias aplicadas em Vancouver e Toronto, agora disponíveis para sua operação local com soberania técnica.</p>
              </div>
            </div>
            <div className="flex gap-6 group">
              <div className="shrink-0 w-14 h-14 bg-[#19C37D]/5 border border-[#19C37D]/10 rounded-[1.2rem] flex items-center justify-center text-[#19C37D] group-hover:scale-110 transition-transform">
                <Zap size={24} />
              </div>
              <div>
                <h4 className="font-black text-sm text-slate-900 uppercase tracking-tight">Mitigação de Downtime</h4>
                <p className="text-sm text-slate-500 font-medium leading-relaxed mt-2">Nossa intervenção estratégica reduz em até 94% as paradas não programadas no primeiro ciclo de 12 meses.</p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 p-10 rounded-[2.5rem] flex flex-col items-center justify-center text-center relative overflow-hidden group shadow-sm hover:shadow-xl transition-all">
            <div className="absolute -top-10 -right-10 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity rotate-12">
              <Shield size={240} strokeWidth={1} />
            </div>
            <div className="relative mb-8">
               <div className="absolute inset-0 bg-[#19C37D]/20 blur-2xl rounded-full"></div>
               <img 
                 alt="Certificado Dresbach" 
                 className="w-28 h-28 rounded-full border-4 border-white shadow-2xl relative z-10 object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
                 src="https://lh3.googleusercontent.com/aida-public/AB6AXuDMqN5fCh6nihVdf3RpW_BhH_TwZMOqbqIgkhWoyTk3D6dClf4kwK9DPTUrKDEnjsXAholl4ImGdJaI261Ctdv5z10zZrmxwwp7RihhAVdzf3xQxvtfzfxmylpIsJrgpJMuMYN9531yWhyeSFCd_wVkV7qSbD-2b0BJiNKBYeAePWPnumEFCC6TSs0m4bucD3W8ze6q8otKng0PZyFJiSZp6PSaUbBK_gj10AtEoVzrm7LY7SGeLj3ZlmaMWubzso4-Z7JDYHlLn_uD" 
               />
            </div>
            <p className="text-[#19C37D] font-black text-[10px] tracking-[0.4em] uppercase mb-2">Technical Badge</p>
            <h4 className="text-2xl font-black text-slate-900 uppercase tracking-tighter mb-4 italic leading-tight">Parte do Grupo <br /> Dresbach Canadá</h4>
            <p className="text-sm text-slate-500 font-medium max-w-[280px] leading-relaxed">
              Excelência técnica e suporte internacional garantido em todos os protocolos de manutenção.
            </p>
          </div>
        </div>

        {/* Painel de Aprovação com Assinatura */}
        <div className="bg-slate-900 rounded-[3rem] p-12 md:p-16 text-white shadow-2xl relative overflow-hidden group">
          <div className="absolute inset-0 opacity-[0.04] pointer-events-none grayscale group-hover:grayscale-0 transition-all duration-1000">
            <img alt="Pattern" className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-1000" src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2000" />
          </div>
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                 <div className="w-10 h-10 bg-[#19C37D]/10 rounded-xl flex items-center justify-center text-[#19C37D] border border-[#19C37D]/20 shadow-inner"><Bolt size={22} /></div>
                 <h3 className="text-3xl font-black uppercase tracking-tighter italic">Pronto para iniciar?</h3>
              </div>
              <p className="text-slate-400 font-medium leading-relaxed text-lg">
                Ao aprovar esta proposta, nossa equipe técnica sênior será mobilizada em até 24h para iniciar o protocolo de reparo. Garanta sua prioridade na agenda de manutenção global.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4 group/item">
                  <div className="w-6 h-6 rounded-full bg-[#19C37D]/20 flex items-center justify-center text-[#19C37D] group-hover/item:scale-110 transition-transform"><CheckCircle2 size={16} strokeWidth={3} /></div>
                  <span className="text-[11px] font-black uppercase tracking-widest text-slate-300">Assinatura digital válida juridicamente</span>
                </div>
                <div className="flex items-center gap-4 group/item">
                  <div className="w-6 h-6 rounded-full bg-[#19C37D]/20 flex items-center justify-center text-[#19C37D] group-hover/item:scale-110 transition-transform"><CheckCircle2 size={16} strokeWidth={3} /></div>
                  <span className="text-[11px] font-black uppercase tracking-widest text-slate-300">Início imediato via protocolo Sync</span>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-white rounded-3xl p-8 shadow-2xl">
                <div className="flex justify-between items-center mb-6">
                   <p className="text-slate-400 text-[9px] font-black uppercase tracking-[0.2em]">Assinatura Digital Tokenizada</p>
                   <Lock size={14} className="text-[#19C37D]" />
                </div>
                <div className="border-2 border-dashed border-slate-100 rounded-2xl h-40 flex flex-col items-center justify-center text-slate-300 cursor-pointer hover:bg-slate-50 transition-all group/draw">
                  <Signature size={48} strokeWidth={1} className="mb-4 text-slate-200 group-hover/draw:text-[#19C37D] transition-colors" />
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Clique para desenhar sua assinatura</p>
                </div>
                <div className="mt-6 flex items-start gap-4">
                  <div className="relative flex items-center h-5 mt-0.5">
                    <input 
                      id="terms" 
                      type="checkbox" 
                      checked={agreed}
                      onChange={() => setAgreed(!agreed)}
                      className="w-4 h-4 text-[#19C37D] border-slate-200 rounded focus:ring-[#19C37D]" 
                    />
                  </div>
                  <label htmlFor="terms" className="text-[10px] text-slate-500 font-bold uppercase leading-relaxed cursor-pointer hover:text-slate-900 transition-colors">
                    Aceito os <span className="text-[#19C37D] underline">termos de serviço</span> e condições comerciais Dresbach_Core_v2.
                  </label>
                </div>
              </div>

              <button 
                onClick={handleApprove}
                disabled={isApproving}
                className={`w-full h-20 rounded-2xl font-black text-xs uppercase tracking-[0.4em] transition-all flex items-center justify-center gap-4 shadow-2xl active:scale-95 ${
                   isApproving ? 'bg-slate-800 text-slate-600' : 'bg-[#19C37D] text-white shadow-[#19C37D]/20 hover:brightness-110 group/btn'
                }`}
              >
                {isApproving ? 'Sincronizando Nodes...' : 'Aprovar e Iniciar Reparo'}
                {!isApproving && <Bolt size={20} className="group-hover/btn:translate-x-1 group-hover/btn:scale-110 transition-all" strokeWidth={3} />}
              </button>
            </div>
          </div>
        </div>

        {/* Rodapé da Proposta */}
        <footer className="mt-20 pt-10 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-10">
           <div className="flex gap-12 opacity-30 grayscale filter group">
              <div className="flex items-center gap-3">
                 <Scale size={16} />
                 <span className="text-[9px] font-black uppercase tracking-widest">NIST CERTIFIED</span>
              </div>
              <div className="flex items-center gap-3">
                 <Activity size={16} />
                 <span className="text-[9px] font-black uppercase tracking-widest">ISO 27001 SECURE</span>
              </div>
              <div className="flex items-center gap-3">
                 <Box size={16} />
                 <span className="text-[9px] font-black uppercase tracking-widest">AES-256 ENCRYPTED</span>
              </div>
           </div>
           <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest text-center md:text-right">
              © 2024 TechLabs Technical Consulting | Dresbach Group Holdings. <br />
              Dresbach Tower, Toronto, ON, Canada | Hub SP, Brasil.
           </p>
        </footer>
      </main>

      {/* Barra Inferior Fixa Mobile (Floating Summary) */}
      <div className="fixed bottom-6 right-6 z-40 no-print hidden md:block animate-in slide-in-from-right-8 duration-700">
        <div className="bg-white/90 backdrop-blur-xl border border-slate-200 p-6 rounded-3xl shadow-2xl flex items-center gap-8">
          <div>
            <p className="text-[9px] text-slate-400 uppercase font-black tracking-widest mb-1">Investimento Vital</p>
            <p className="text-xl font-black text-slate-900 italic">R$ 23.210,00</p>
          </div>
          <button 
            onClick={handleApprove}
            className="bg-[#19C37D] hover:brightness-110 text-white font-black px-8 py-3.5 rounded-2xl text-[10px] uppercase tracking-widest transition-all shadow-xl shadow-[#19C37D]/10 active:scale-95"
          >
            Aprovar Protocolo
          </button>
        </div>
      </div>
    </div>
  );
}

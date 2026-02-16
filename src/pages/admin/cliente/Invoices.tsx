
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Download,
  TrendingUp,
  CreditCard,
  History,
  Clock,
  AlertTriangle,
  RefreshCcw
} from 'lucide-react';
import ClientSidebar from '../../components/client/ClientSidebar';
import { clientDataService, InvoiceResponse } from '../../services/clientDataService';

export default function Invoices() {
  const navigate = useNavigate();
  const [data, setData] = useState<InvoiceResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadInvoices = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await clientDataService.getInvoices();
      setData(response);
    } catch (err: any) {
      setError(err.message || 'Falha ao recuperar histórico financeiro.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInvoices();
  }, []);

  return (
    <div className="min-h-screen bg-[#f6f8f7] flex font-display text-slate-800 antialiased">
      <ClientSidebar />

      <main className="flex-1 lg:ml-[260px] flex flex-col min-w-0">
        <div className="w-full max-w-[1280px] mx-auto px-6 py-6 space-y-6">
          <header className="flex flex-col md:flex-row justify-between items-end gap-4">
            <div>
              <h1 className="text-xl font-semibold text-slate-900">Financeiro</h1>
              <p className="text-xs text-slate-400 font-medium uppercase tracking-widest mt-0.5">Gestão de Carteira</p>
            </div>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-[10px] font-black uppercase tracking-widest rounded-lg shadow-sm">
                <Download size={14} /> Relatório
              </button>
              <button className="flex items-center gap-2 px-5 py-2 bg-[#19C37D] text-white text-[10px] font-black uppercase tracking-widest rounded-lg shadow-md shadow-[#19C37D]/20">
                <CreditCard size={14} /> Pagamento
              </button>
            </div>
          </header>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-40 gap-4">
               <div className="w-10 h-10 border-2 border-[#19C37D]/20 border-t-[#19C37D] rounded-full animate-spin"></div>
               <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Billing_Node_Sync...</span>
            </div>
          ) : error ? (
            <div className="bg-white border border-red-100 rounded-2xl p-20 flex flex-col items-center text-center space-y-6 shadow-sm">
               <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center text-red-500"><AlertTriangle size={32} /></div>
               <div>
                 <h3 className="text-lg font-bold text-slate-900 uppercase">Falha na Conexão</h3>
                 <p className="text-sm text-slate-500 mt-2 font-medium">{error}</p>
               </div>
               <button onClick={loadInvoices} className="px-8 py-3 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                 <RefreshCcw size={14} /> Retry_Bootstrap
               </button>
            </div>
          ) : data ? (
            <>
              <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm h-[160px] flex flex-col justify-between group relative overflow-hidden">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Investido</p>
                    <h2 className="text-3xl font-bold text-slate-900 mt-2">
                      {data.summary.currency} {data.summary.totalInvested.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </h2>
                  </div>
                  <span className="text-[9px] font-bold text-[#19C37D] bg-[#19C37D]/10 px-2 py-1 rounded-md w-fit uppercase">
                    <TrendingUp size={10} className="inline mr-1" /> Nominal System
                  </span>
                  <History size={60} className="absolute -right-4 -bottom-4 text-slate-50 opacity-50" />
                </div>

                <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm h-[160px] flex flex-col justify-between group relative overflow-hidden">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Próximo Vencimento</p>
                    <h2 className="text-3xl font-bold text-slate-900 mt-2">--</h2>
                  </div>
                  <p className="text-xs font-bold text-slate-300">Nenhuma fatura pendente</p>
                  <Clock size={60} className="absolute -right-4 -bottom-4 text-slate-50 opacity-50" />
                </div>
              </section>

              <section className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-50 flex justify-between items-center bg-slate-50/10">
                  <h3 className="font-semibold text-sm uppercase">Histórico Recente</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50/30">
                      <tr className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                        <th className="px-6 py-4">ID</th>
                        <th className="px-6 py-4">Serviço</th>
                        <th className="px-6 py-4">Data</th>
                        <th className="px-6 py-4">Valor</th>
                        <th className="px-6 py-4">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {data.items.map((inv) => (
                        <tr key={inv.id} className="hover:bg-slate-50/50">
                          <td className="px-6 py-4 font-mono font-bold text-slate-400">{inv.id}</td>
                          <td className="px-6 py-4 font-semibold text-slate-700">{inv.service}</td>
                          <td className="px-6 py-4 text-slate-500">{inv.date}</td>
                          <td className="px-6 py-4 font-bold text-slate-900">{inv.amount}</td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${
                              inv.status === 'Pago' ? 'bg-[#19C37D]/10 text-[#19C37D]' : 'bg-amber-50 text-amber-500'
                            }`}>{inv.status}</span>
                          </td>
                        </tr>
                      ))}
                      {data.items.length === 0 && (
                        <tr>
                          <td colSpan={5} className="px-8 py-20 text-center text-[10px] font-black uppercase text-slate-300 italic">
                            No_Invoices_Found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </section>
            </>
          ) : null}
        </div>
      </main>
    </div>
  );
}

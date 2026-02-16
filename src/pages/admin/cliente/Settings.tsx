
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Mail,
  ToggleLeft,
  ToggleRight,
  ShieldCheck,
  Save,
  User
} from 'lucide-react';
import ClientSidebar from '../../components/client/ClientSidebar';

export default function Settings() {
  const navigate = useNavigate();
  const [twoFactor, setTwoFactor] = useState(true);

  return (
    <div className="min-h-screen bg-[#f6f8f7] flex font-display text-slate-800 antialiased overflow-x-hidden">
      <ClientSidebar />

      <main className="flex-1 lg:ml-[260px] flex flex-col min-w-0">
        <div className="w-full max-w-[1280px] mx-auto px-6 py-6 space-y-6">
          <header className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h1 className="text-xl font-semibold text-slate-900">Ajustes da Conta</h1>
              <p className="text-xs text-slate-400 font-medium uppercase tracking-widest mt-0.5">Segurança & Perfil</p>
            </div>
            <button className="bg-[#19C37D] hover:bg-[#15a86a] text-white px-5 py-2.5 rounded-lg font-bold flex items-center gap-2 shadow-md text-[10px] uppercase tracking-widest">
              <Save size={16} /> Salvar Alterações
            </button>
          </header>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <section className="bg-white border border-slate-100 rounded-xl shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-50 bg-slate-50/10">
                <h2 className="text-xs font-semibold uppercase tracking-widest flex items-center gap-2"><User size={14} className="text-slate-400" /> Perfil Corporativo</h2>
              </div>
              <div className="p-6 space-y-5">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Nome Completo</label>
                  <input className="w-full px-4 py-2 bg-slate-50 border border-slate-100 rounded-lg text-sm font-semibold" defaultValue="Ricardo Silva" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">E-mail de Trabalho</label>
                  <div className="relative">
                    <Mail size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                    <input className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-100 rounded-lg text-sm font-semibold" defaultValue="ricardo.silva@innovatex.com" />
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-white border border-slate-100 rounded-xl shadow-sm overflow-hidden h-fit">
              <div className="px-6 py-4 border-b border-slate-50 bg-slate-50/10">
                <h2 className="text-xs font-semibold uppercase tracking-widest flex items-center gap-2"><ShieldCheck size={14} className="text-slate-400" /> Segurança</h2>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between p-5 bg-slate-50 border border-slate-100 rounded-xl">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-[#19C37D]/10 text-[#19C37D] rounded-lg flex items-center justify-center"><ShieldCheck size={20} /></div>
                    <span className="text-xs font-bold uppercase text-slate-700">Autenticação 2FA</span>
                  </div>
                  <button onClick={() => setTwoFactor(!twoFactor)} className={twoFactor ? 'text-[#19C37D]' : 'text-slate-200'}>
                    {twoFactor ? <ToggleRight size={32} /> : <ToggleLeft size={32} />}
                  </button>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Terminal, Key, BadgeCheck, LogIn, ShieldAlert, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function AdminLogin() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      // O backend deve validar se o usuário tem a role 'ADMIN'
      await login(formData);
      navigate('/admin/dashboard');
    } catch (err: any) {
      setError(err.message || 'Falha de autorização no terminal root.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#111111] text-slate-300 font-mono flex items-center justify-center p-4 relative overflow-hidden antialiased">
      {/* Matrix Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] overflow-hidden select-none flex flex-wrap gap-x-8 gap-y-4 p-4 text-[10px]">
        {Array.from({ length: 20 }).map((_, i) => (
          <p key={i}>AUTH_SYS_LOG: ATTEMPT_ID_{Math.random().toString(36).substring(7).toUpperCase()}</p>
        ))}
      </div>

      <div className="w-full max-w-[420px] relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#2F2F2F] border border-[#19C37D]/20 rounded-lg mb-4">
            <Terminal size={32} className="text-[#19C37D]" />
          </div>
          <h1 className="text-xl font-bold tracking-tighter text-white uppercase italic">TechLabs</h1>
          <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-[0.2em]">Dresbach Group Canada • Admin Terminal</p>
        </div>

        <div className="bg-[#2F2F2F] border border-[#19C37D]/20 p-8 rounded-xl shadow-2xl relative overflow-hidden">
          <div className="relative z-10">
            {error && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-black uppercase flex items-center gap-3">
                <AlertCircle size={16} />
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Admin ID / Email</label>
                <div className="relative group">
                  <BadgeCheck size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-[#19C37D]" />
                  <input 
                    required
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-[#111111]/50 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-sm text-white placeholder:text-slate-600 outline-none font-mono" 
                    placeholder="admin@techlabs.ca" 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Security Token</label>
                <div className="relative group">
                  <Key size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-[#19C37D]" />
                  <input 
                    required
                    type="password"
                    value={formData.password}
                    onChange={e => setFormData({...formData, password: e.target.value})}
                    className="w-full bg-[#111111]/50 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-sm text-white outline-none font-mono" 
                    placeholder="••••••••" 
                  />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-[#19C37D] hover:bg-[#15a86a] text-[#111111] font-bold py-4 rounded-lg text-sm uppercase tracking-widest transition-all flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-[#111111]/30 border-t-[#111111] rounded-full animate-spin"></div>
                ) : (
                  <><span>Acessar Terminal Admin</span> <LogIn size={16} /></>
                )}
              </button>
            </form>
          </div>
        </div>

        <div className="mt-8 flex items-start gap-3 p-4 border border-white/5 rounded-lg bg-white/5">
          <ShieldAlert size={18} className="text-amber-500/70 shrink-0" />
          <p className="text-[9px] text-slate-500 leading-relaxed uppercase tracking-tight font-medium">
            Aviso: Este terminal monitora todas as sessões via IP corporativo. Acesso não autorizado é proibido sob protocolos Dresbach.
          </p>
        </div>
      </div>
    </div>
  );
}

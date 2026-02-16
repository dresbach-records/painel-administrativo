
import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/auth.service';
import { AlertCircle, RefreshCcw } from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'CLIENT';
  company?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isServerOffline: boolean;
  login: (credentials: any) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('techlabs_token'));
  const [isLoading, setIsLoading] = useState(true);
  const [isServerOffline, setIsServerOffline] = useState(false);

  useEffect(() => {
    async function validateSession() {
      if (!token) {
        setIsLoading(false);
        return;
      }
      try {
        const userData = await authService.me();
        setUser(userData);
        setIsServerOffline(false);
      } catch (error: any) {
        // Se for erro de rede (status 0) ou timeout, sinaliza falha do backend
        if (error.status === 0 || error.status === 408 || error.message?.includes('FAILED')) {
          setIsServerOffline(true);
        } else {
          // Se for 401/403, apenas limpa a sessão
          logout();
        }
      } finally {
        setIsLoading(false);
      }
    }
    validateSession();
  }, [token]);

  const login = async (credentials: any) => {
    try {
      const response = await authService.login(credentials);
      localStorage.setItem('techlabs_token', response.token);
      setToken(response.token);
      setUser(response.user);
      setIsServerOffline(false);
    } catch (error: any) {
      if (error.status === 0) setIsServerOffline(true);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('techlabs_token');
    setToken(null);
    setUser(null);
    window.location.hash = '/start-consultation';
  };

  // UI de Falha Crítica de Backend - Impede o carregamento de qualquer lógica de UI se o servidor estiver morto
  if (isServerOffline) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center p-10 text-center font-mono select-none">
        <div className="w-24 h-24 bg-red-500/10 rounded-full flex items-center justify-center text-red-500 mb-8 border border-red-500/20 shadow-[0_0_50px_rgba(239,68,68,0.2)]">
          <AlertCircle size={48} />
        </div>
        <div className="space-y-4 max-w-md">
          <h1 className="text-2xl font-black text-white uppercase italic tracking-tighter">BACKEND_CLUSTER_OFFLINE</h1>
          <p className="text-slate-500 text-xs font-bold uppercase leading-relaxed tracking-widest">
            Não foi possível estabelecer um handshake com o nó central da Dresbach Group. A aplicação foi interrompida para conformidade de dados.
          </p>
        </div>
        <button 
          onClick={() => window.location.reload()}
          className="mt-12 px-12 py-5 bg-[#19C37D] text-black rounded-2xl font-black uppercase text-xs tracking-widest hover:brightness-110 transition-all flex items-center gap-3 shadow-xl shadow-[#19C37D]/20"
        >
          <RefreshCcw size={18} /> Reconnect_Master_Node
        </button>
        <footer className="fixed bottom-10 text-[9px] text-slate-800 uppercase font-black tracking-[0.5em]">
          DRESBACH_SECURE_KERNEL v2.4.0
        </footer>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated: !!user, isLoading, isServerOffline, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

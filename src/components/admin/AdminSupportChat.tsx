
import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, MessageSquare, Send, Paperclip, 
  Code, Bell, AlertCircle, RefreshCcw
} from 'lucide-react';
import AdminSidebar from '@/@/components/admin/AdminSidebar';
import { chatService } from '@/@/services/chatService';
import { useChatSync } from '@/@/hooks/useChatSync';

export default function AdminSupportChat() {
  const { sessions, error, refresh } = useChatSync(3000);
  const [activeSessionId, setActiveSessionId] = useState('CLIENT-INNOVATEX');
  const [inputText, setInputText] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
    if (activeSessionId && sessions[activeSessionId]?.unreadCount > 0) {
      chatService.clearUnread(activeSessionId);
    }
  }, [sessions, activeSessionId]);

  const activeSession = sessions[activeSessionId];

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim()) return;
    
    const messageText = inputText;
    setInputText('');
    
    try {
      await chatService.sendMessage(activeSessionId, messageText, 'Admin Marcus', true);
    } catch (err) {
      // Falha visível: alert imediato em caso de falha de envio para evitar percepção de sucesso otimista
      alert("ERRO_OPERACIONAL: Falha ao persistir mensagem no servidor.");
      setInputText(messageText);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#0A0A0A] text-[#EDEDED] font-display antialiased">
      <AdminSidebar />

      <main className="flex-1 flex flex-col min-w-0 relative">
        <header className="h-16 border-b border-[#1A1A1A] bg-[#0D0D0D] flex items-center justify-between px-8 shrink-0">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-[#19C37D]/10 rounded flex items-center justify-center text-[#19C37D]">
              <MessageSquare size={18} strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="text-sm font-black uppercase tracking-tight text-white">Central de Atendimento</h1>
              <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">Operações em Tempo Real</p>
            </div>
          </div>
        </header>

        {error ? (
          <div className="flex-1 flex flex-col items-center justify-center p-20 text-center bg-[#080808] z-50">
             <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center text-red-500 mb-6 border border-red-500/20">
                <AlertCircle size={32} />
             </div>
             <h2 className="text-xl font-black text-white uppercase italic tracking-tighter">CHAT_SYNC_FAILURE</h2>
             <p className="text-slate-500 font-mono text-[10px] uppercase mt-4 mb-10 max-w-xs leading-relaxed">
               {error}. O canal de comunicação foi interrompido por perda de pacote ou queda do nó servidor.
             </p>
             <button onClick={() => refresh()} className="px-10 py-4 bg-[#19C37D] text-black rounded-xl font-black uppercase text-[10px] tracking-widest hover:brightness-110 flex items-center gap-2">
                <RefreshCcw size={14} /> Retry_Socket_Connection
             </button>
          </div>
        ) : (
          <div className="flex-1 flex overflow-hidden animate-in fade-in duration-500">
            <aside className="w-80 border-r border-[#1A1A1A] bg-[#0D0D0D] flex flex-col shrink-0 overflow-hidden">
              <div className="p-5 border-b border-[#1A1A1A]">
                <div className="relative">
                  <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-700" />
                  <input 
                    type="text" 
                    placeholder="Buscar sessões..."
                    className="w-full bg-black/40 border border-[#1A1A1A] rounded-xl py-2.5 pl-10 pr-4 text-[10px] font-bold focus:outline-none focus:ring-1 focus:ring-[#19C37D]/30 transition-all text-white placeholder:text-slate-800 uppercase tracking-widest"
                  />
                </div>
              </div>
              <div className="flex-1 overflow-y-auto custom-scrollbar">
                {Object.values(sessions).map((session) => (
                  <button 
                    key={session.id}
                    onClick={() => setActiveSessionId(session.id)}
                    className={`w-full p-6 text-left border-b border-[#1A1A1A] transition-all relative group ${
                      activeSessionId === session.id ? 'bg-white/[0.03] border-l-4 border-l-[#19C37D]' : 'hover:bg-white/[0.01]'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-[11px] font-black uppercase tracking-tight text-white truncate max-w-[120px]">{session.company}</span>
                      <span className="text-[9px] font-mono text-slate-700 font-bold">{session.lastActivity}</span>
                    </div>
                    <p className="text-[10px] text-slate-500 font-medium truncate mb-2">
                      {session.messages[session.messages.length - 1]?.text || 'Aguardando interação...'}
                    </p>
                  </button>
                ))}
              </div>
            </aside>

            <section className="flex-1 flex flex-col bg-[#080808] overflow-hidden relative">
              {activeSession ? (
                <>
                  <div className="h-20 px-8 border-b border-[#1A1A1A] bg-[#0D0D0D] flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-[#19C37D]/10 border border-[#19C37D]/20 flex items-center justify-center text-xs font-black text-[#19C37D] uppercase">
                        {activeSession.company.charAt(0)}
                      </div>
                      <div>
                        <h2 className="text-sm font-black text-white uppercase tracking-tight">{activeSession.company}</h2>
                        <p className="text-[9px] text-slate-500 font-black uppercase tracking-widest">
                          UUID: <span className="font-mono text-slate-600">{activeSession.id}</span>
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <button className="p-2.5 text-slate-600 hover:text-white transition-all"><Bell size={18} /></button>
                      <button className="px-5 py-2 border border-red-900/30 text-[10px] font-black uppercase tracking-widest text-red-500 hover:bg-red-500 hover:text-white transition-all rounded-lg bg-red-500/5">Encerrar</button>
                    </div>
                  </div>

                  <div ref={scrollRef} className="flex-1 overflow-y-auto p-10 space-y-10 custom-scrollbar flex flex-col">
                    {activeSession.messages.map((msg) => (
                      <div key={msg.id} className={`flex flex-col ${msg.isAdmin ? 'items-end' : 'items-start'} max-w-2xl ${msg.isAdmin ? 'ml-auto' : ''}`}>
                        <div className={`p-6 rounded-2xl text-sm leading-relaxed ${
                          msg.isAdmin 
                            ? 'bg-black/40 border border-[#19C37D]/30 text-slate-200' 
                            : 'bg-[#1A1A1A] border border-[#2A2A2A] text-slate-300'
                        }`}>
                          {msg.text}
                        </div>
                        <span className="mt-2 text-[9px] font-mono text-slate-600 font-bold uppercase tracking-widest px-2">
                          {msg.sender} • {msg.time}
                        </span>
                      </div>
                    ))}
                  </div>

                  <form onSubmit={handleSend} className="p-8 border-t border-[#1A1A1A] bg-[#0D0D0D]">
                    <div className="max-w-5xl mx-auto bg-[#080808] border border-[#1A1A1A] rounded-2xl overflow-hidden focus-within:border-[#19C37D]/40 transition-all shadow-2xl">
                      <textarea 
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
                        className="w-full bg-transparent border-none p-6 text-sm text-slate-300 placeholder:text-slate-800 resize-none outline-none min-h-[100px] font-medium"
                        placeholder="Resposta oficial TechLabs..."
                      ></textarea>
                      <div className="px-6 py-4 border-t border-[#1A1A1A] flex items-center justify-between bg-black/20">
                        <div className="flex items-center gap-6 text-slate-600">
                          <button type="button" className="hover:text-[#19C37D] transition-colors"><Paperclip size={20} /></button>
                          <button type="button" className="hover:text-[#19C37D] transition-colors"><Code size={20} /></button>
                        </div>
                        <button type="submit" className="bg-[#19C37D] text-black px-8 py-2.5 rounded-xl font-black text-[11px] uppercase tracking-widest hover:brightness-110 transition-all flex items-center gap-3">
                          Responder Cliente <Send size={16} strokeWidth={3} />
                        </button>
                      </div>
                    </div>
                  </form>
                </>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center p-20 text-center space-y-6">
                  <div className="w-20 h-20 bg-white/[0.02] border border-white/5 rounded-full flex items-center justify-center text-slate-800">
                    <MessageSquare size={40} />
                  </div>
                  <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest">Nenhuma sessão selecionada</h3>
                  <p className="text-xs text-slate-800 max-w-xs font-bold uppercase leading-relaxed">Selecione um canal na barra lateral para iniciar o atendimento.</p>
                </div>
              )}
            </section>
          </div>
        )}
      </main>
    </div>
  );
}

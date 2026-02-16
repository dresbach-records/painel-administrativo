
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Send, MessageSquare, ShieldCheck, History, 
  Terminal, ArrowLeft, MoreVertical, Paperclip, 
  Smile, Info, AlertCircle
} from 'lucide-react';
import ClientSidebar from '../../components/client/ClientSidebar';
import { chatService, Message } from '../../services/chatService';
import { useChatSync } from '../../hooks/useChatSync';

export default function ClientSupportChat() {
  const navigate = useNavigate();
  const clientId = 'CLIENT-INNOVATEX'; 
  const { sessions, error } = useChatSync(3000);
  const [inputText, setInputText] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  const messages = sessions[clientId]?.messages || [];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim()) return;
    
    const text = inputText;
    setInputText('');
    
    try {
      await chatService.sendMessage(clientId, text, 'Ricardo Silva', false);
    } catch (err) {
      alert("Erro ao enviar mensagem.");
      setInputText(text);
    }
  };

  return (
    <div className="min-h-screen bg-[#f6f8f7] flex font-display text-slate-800 antialiased">
      <ClientSidebar />

      <main className="flex-1 lg:ml-72 flex flex-col h-screen overflow-hidden">
        <header className="h-20 bg-white border-b border-slate-100 flex items-center justify-between px-10 shrink-0 z-10 shadow-sm">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('/client/dashboard')} className="p-2 hover:bg-slate-50 rounded-xl transition-colors">
              <ArrowLeft size={20} className="text-slate-400" />
            </button>
            <div className="w-10 h-10 bg-[#19C37D]/10 rounded-xl flex items-center justify-center text-[#19C37D]">
              <Terminal size={20} strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="text-sm font-black uppercase tracking-tight text-slate-900">Suporte Engenharia</h1>
              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest flex items-center gap-2">
                <span className={`w-1.5 h-1.5 rounded-full ${error ? 'bg-red-500' : 'bg-[#19C37D] animate-pulse'}`}></span>
                {error ? 'Sincronização Offline' : 'Conectado com TechLabs Core'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2.5 text-slate-300 hover:text-slate-600 transition-colors"><Info size={20} /></button>
            <div className="px-4 py-2 bg-slate-50 rounded-full border border-slate-100 text-[10px] font-black uppercase text-slate-400 tracking-widest">SLA: 14 min</div>
          </div>
        </header>

        <div ref={scrollRef} className="flex-1 overflow-y-auto p-10 space-y-8 bg-slate-50/30 custom-scrollbar">
          <div className="flex justify-center">
            <div className="flex items-center gap-3 bg-white px-5 py-2 rounded-full border border-slate-200 shadow-sm">
              <ShieldCheck size={14} className="text-[#19C37D]" />
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Conversa Criptografada (AES-256)</span>
            </div>
          </div>

          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.isAdmin ? 'justify-start' : 'justify-end'}`}>
              <div className={`max-w-xl flex flex-col ${msg.isAdmin ? 'items-start' : 'items-end'}`}>
                <div className={`p-6 rounded-[2rem] text-sm font-medium leading-relaxed shadow-sm border ${
                  msg.isAdmin 
                    ? 'bg-white border-slate-100 rounded-tl-none text-slate-700' 
                    : 'bg-[#19C37D] border-[#15a86a] rounded-tr-none text-white'
                }`}>
                  {msg.text}
                </div>
                <span className="mt-2 text-[9px] font-bold text-slate-400 uppercase tracking-widest px-2">
                  {msg.sender} • {msg.time}
                </span>
              </div>
            </div>
          ))}
          
          {messages.length === 0 && (
             <div className="py-20 text-center text-slate-300 font-black uppercase text-[10px] tracking-[0.3em] italic">
               Nenhuma interação registrada no nó local.
             </div>
          )}
        </div>

        <div className="p-8 bg-white border-t border-slate-100">
          <form onSubmit={handleSend} className="max-w-5xl mx-auto flex gap-4 items-end">
            <div className="flex-1 bg-slate-50 rounded-2xl border border-slate-100 focus-within:border-[#19C37D]/50 transition-all p-3">
              <textarea 
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
                className="w-full bg-transparent border-none p-3 text-sm text-slate-700 placeholder:text-slate-400 resize-none outline-none min-h-[50px] font-medium"
                placeholder="Descreva seu desafio técnico..."
              ></textarea>
              <div className="flex items-center justify-between mt-2 px-2 pb-1 border-t border-slate-200/50 pt-2">
                <div className="flex items-center gap-4 text-slate-400">
                  <button type="button" className="hover:text-[#19C37D] transition-colors"><Paperclip size={18} /></button>
                  <button type="button" className="hover:text-[#19C37D] transition-colors"><Smile size={18} /></button>
                </div>
                <button 
                  type="submit"
                  disabled={!inputText.trim()}
                  className="bg-[#19C37D] text-white p-3 rounded-xl shadow-lg shadow-[#19C37D]/20 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:scale-100 transition-all"
                >
                  <Send size={18} strokeWidth={2.5} />
                </button>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

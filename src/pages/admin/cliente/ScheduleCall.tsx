
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronRight,
  Clock,
  Video,
  CheckCircle2
} from 'lucide-react';
import ClientSidebar from '../../components/client/ClientSidebar';
import { clientDataService } from '../../services/clientDataService';

export default function ScheduleCall() {
  const navigate = useNavigate();
  const [selectedDay, setSelectedDay] = useState(14);
  const [selectedTime, setSelectedTime] = useState('11:00');
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);

  const days = [
    { day: 1, available: true }, { day: 2, available: true }, { day: 3, available: true }, { day: 4, available: true },
    { day: 5, available: false }, { day: 6, available: false }, { day: 14, available: true }, { day: 15, available: true }
  ];

  const times = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:30'];

  const handleConfirmSchedule = async () => {
    setIsConfirming(true);
    
    // Salvando reunião real no banco
    await clientDataService.scheduleMeeting({
      title: `Consultoria Técnica: Ricardo Silva`,
      date: `2024-10-${selectedDay.toString().padStart(2, '0')}`,
      time: selectedTime,
      participants: ['Ricardo Silva', 'Juliana Mendes']
    });

    setIsConfirming(false);
    setShowConfirmPopup(true);
    
    setTimeout(() => {
      setShowConfirmPopup(false);
      navigate('/client/dashboard');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#f6f8f7] flex font-display text-slate-800 relative">
      <ClientSidebar />

      {showConfirmPopup && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-[3rem] p-12 max-w-md w-full text-center shadow-2xl border border-slate-100">
            <div className="w-24 h-24 bg-[#19C37D]/10 rounded-full flex items-center justify-center mx-auto mb-8 text-[#19C37D] animate-bounce">
              <CheckCircle2 size={48} />
            </div>
            <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter mb-4">Agendamento Confirmado</h2>
            <p className="text-slate-400 font-bold text-sm uppercase tracking-widest">Sincronizado com o painel TechLabs</p>
          </div>
        </div>
      )}

      <main className="flex-1 lg:ml-72 p-10 min-w-0">
        <div className="max-w-6xl mx-auto">
          <header className="mb-12">
            <nav className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 mb-4">
              <button onClick={() => navigate('/client/dashboard')} className="hover:text-[#19C37D]">Dashboard</button>
              <ChevronRight size={10} className="text-slate-300" />
              <span className="text-[#19C37D]">Agendar Consultoria</span>
            </nav>
            <h1 className="text-4xl font-black text-slate-900 uppercase tracking-tighter">Falar com Consultor Sênior</h1>
          </header>

          <div className="bg-white border border-slate-100 rounded-3xl shadow-xl overflow-hidden flex flex-col lg:flex-row min-h-[600px]">
            <div className="w-full lg:w-96 border-r border-slate-50 p-10 flex flex-col bg-slate-50/20">
              <div className="mb-10">
                <img className="w-28 h-28 rounded-3xl object-cover mb-6 border-4 border-white shadow-lg" src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop" alt="Juliana Mendes" />
                <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Juliana Mendes</h2>
                <p className="text-[#19C37D] font-black text-[10px] uppercase tracking-widest mt-2">Senior Cloud Architect</p>
              </div>
              <div className="space-y-8 flex-1">
                <div className="flex items-start gap-4">
                  <Clock size={20} className="text-slate-400" />
                  <p className="text-sm font-bold text-slate-700">45 minutos</p>
                </div>
                <div className="flex items-start gap-4">
                  <Video size={20} className="text-slate-400" />
                  <p className="text-sm font-bold text-slate-700">TechLabs Virtual Room</p>
                </div>
              </div>
            </div>

            <div className="flex-1 p-10 bg-white">
              <div className="flex items-center justify-between mb-10">
                <h3 className="font-black text-slate-900 uppercase tracking-widest text-xs">Selecione uma data</h3>
              </div>
              <div className="grid grid-cols-7 gap-3">
                {days.map((d, idx) => (
                  <button 
                    key={idx}
                    disabled={!d.available}
                    onClick={() => setSelectedDay(d.day)}
                    className={`aspect-square flex items-center justify-center text-sm font-black rounded-2xl transition-all 
                      ${!d.available ? 'text-slate-200 cursor-not-allowed' : 
                        selectedDay === d.day ? 'bg-[#19C37D] text-white shadow-lg shadow-[#19C37D]/30' : 
                        'text-slate-600 hover:bg-slate-50'}`}
                  >
                    {d.day}
                  </button>
                ))}
              </div>
            </div>

            <div className="w-full lg:w-80 p-10 bg-slate-50/40 flex flex-col border-l border-slate-50">
              <h3 className="font-black text-slate-900 uppercase tracking-widest text-xs mb-10">Outubro, {selectedDay}</h3>
              <div className="space-y-4 flex-1">
                {times.map(t => (
                  <button 
                    key={t}
                    onClick={() => setSelectedTime(t)}
                    className={`w-full py-4 px-6 border rounded-2xl text-xs font-black uppercase tracking-widest transition-all 
                      ${selectedTime === t ? 'border-[#19C37D] bg-[#19C37D] text-white' : 
                      'border-slate-100 bg-white text-slate-500 hover:border-[#19C37D]'}`}
                  >
                    {t}
                  </button>
                ))}
              </div>
              <button 
                onClick={handleConfirmSchedule}
                disabled={isConfirming}
                className="w-full mt-10 bg-[#19C37D] text-white font-black uppercase tracking-widest py-5 rounded-2xl shadow-xl shadow-[#19C37D]/20 transition-all flex items-center justify-center gap-3 active:scale-95 group disabled:opacity-50"
              >
                {isConfirming ? 'Processando...' : 'Confirmar Horário'}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

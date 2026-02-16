
import React from 'react';

const tickets = [
  {
    id: 1,
    subject: 'Problema com a Fatura de Abril',
    status: 'Aberto',
    lastUpdate: '2024-07-22',
  },
  {
    id: 2,
    subject: 'Dúvida sobre a API de Pagamentos',
    status: 'Em Andamento',
    lastUpdate: '2024-07-21',
  },
  {
    id: 3,
    subject: 'Sugestão de Nova Funcionalidade',
    status: 'Fechado',
    lastUpdate: '2024-07-20',
  },
];

export default function TicketList() {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <table className="min-w-full leading-normal">
        <thead>
          <tr>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Assunto
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Status
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Última Atualização
            </th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket.id}>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">{ticket.subject}</p>
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <span
                  className={`relative inline-block px-3 py-1 font-semibold leading-tight ${
                    ticket.status === 'Aberto' ? 'text-green-900' : ticket.status === 'Em Andamento' ? 'text-yellow-900' : 'text-red-900'
                  }`}
                >
                  <span
                    aria-hidden
                    className={`absolute inset-0 ${
                      ticket.status === 'Aberto' ? 'bg-green-200' : ticket.status === 'Em Andamento' ? 'bg-yellow-200' : 'bg-red-200'
                    } opacity-50 rounded-full`}
                  ></span>
                  <span className="relative">{ticket.status}</span>
                </span>
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">{ticket.lastUpdate}</p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

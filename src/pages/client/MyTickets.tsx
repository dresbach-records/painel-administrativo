
import React from 'react';
import ClientLayout from '@/components/client/ClientLayout';
import TicketList from '@/components/client/TicketList';

export default function MyTickets() {
  return (
    <ClientLayout>
      <h2 className="text-xl font-semibold text-gray-800">Meus Chamados</h2>
      <div className="mt-4">
        <TicketList />
      </div>
    </ClientLayout>
  );
}

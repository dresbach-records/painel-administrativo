
import React from 'react';
import ClientLayout from '@/components/client/ClientLayout';

export default function ClientDashboard() {
  return (
    <ClientLayout>
      <h2 className="text-xl font-semibold text-gray-800">Bem-vindo ao seu painel!</h2>
      <p className="mt-2 text-gray-600">Aqui você pode gerenciar seus chamados e entrar em contato com nosso suporte.</p>
    </ClientLayout>
  );
}


import React from 'react';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-md">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-800">Painel do Cliente</h1>
        </div>
        <nav className="mt-6">
          <a href="/client/dashboard" className="block px-6 py-2 text-gray-600 hover:bg-gray-200">Início</a>
          <a href="/client/tickets" className="block px-6 py-2 text-gray-600 hover:bg-gray-200">Meus Chamados</a>
          <a href="#" className="block px-6 py-2 text-gray-600 hover:bg-gray-200">Abrir Ticket</a>
          <a href="#" className="block px-6 py-2 text-gray-600 hover:bg-gray-200">Chat</a>
        </nav>
      </aside>
      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  );
}

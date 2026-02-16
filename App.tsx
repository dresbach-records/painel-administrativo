import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider, useAuth } from '@/context/AuthContext';

// Admin Pages
import AdminLogin from '@/pages/admin/AdminLogin';
import AdminDashboard from '@/pages/admin/AdminDashboard';
import AdminProjects from '@/pages/admin/AdminProjects';
import AdminTickets from '@/pages/admin/AdminTickets';
import AdminClients from '@/pages/admin/AdminClients';
import AdminInfrastructure from '@/pages/admin/AdminInfrastructure';
import AdminRepository from '@/pages/admin/AdminRepository';
import AdminApprovals from '@/pages/admin/AdminApprovals';
import AdminSettings from '@/pages/admin/AdminSettings';
import AdminDiagnostics from '@/pages/admin/AdminDiagnostics';
import AdminDiagnosticsReport from '@/pages/admin/AdminDiagnosticsReport';
import AdminSupportChat from '@/pages/admin/AdminSupportChat';
import AdminProposalGenerator from '@/pages/admin/AdminProposalGenerator';

// Layout
import AdminSidebar from '@/components/admin/AdminSidebar';

function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-[#19C37D]/20 border-t-[#19C37D] rounded-full animate-spin" />
          <span className="text-[#19C37D] font-mono text-[10px] uppercase tracking-widest">
            Validating_Auth_Protocol...
          </span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
}

function AdminLayout() {
  return (
    <div className="flex w-full">
      <AdminSidebar />
      <div className="flex-grow p-8">
        <Outlet />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <div className="relative min-h-screen bg-black text-[#EDEDED] antialiased">
        <main className="relative z-10 flex">
          <Routes>

            {/* LOGIN */}
            <Route path="/admin/login" element={<AdminLogin />} />

            {/* ADMIN (PROTECTED) */}
            <Route element={<ProtectedRoute />}>
              <Route element={<AdminLayout />}>
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/projects" element={<AdminProjects />} />
                <Route path="/admin/tickets" element={<AdminTickets />} />
                <Route path="/admin/clients" element={<AdminClients />} />
                <Route path="/admin/chat" element={<AdminSupportChat />} />
                <Route path="/admin/infrastructure" element={<AdminInfrastructure />} />
                <Route path="/admin/repository" element={<AdminRepository />} />
                <Route path="/admin/approvals" element={<AdminApprovals />} />
                <Route path="/admin/settings" element={<AdminSettings />} />
                <Route path="/admin/diagnostic/all" element={<AdminDiagnostics />} />
                <Route path="/admin/diagnostic/report/:id" element={<AdminDiagnosticsReport />} />
                <Route path="/admin/diagnostic/proposal/:id" element={<AdminProposalGenerator />} />
              </Route>
            </Route>

            {/* FALLBACK */}
            <Route path="*" element={<Navigate to="/admin/login" replace />} />

          </Routes>
        </main>
      </div>
    </AuthProvider>
  );
}

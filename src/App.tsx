
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import AdminLayout from './components/layout/AdminLayout';
import ClientDashboard from './pages/client/Dashboard';
import MyTickets from './pages/client/MyTickets';

import AdminActiveMeeting from './pages/admin/AdminActiveMeeting';
import AdminActiveRooms from './pages/admin/AdminActiveRooms';
import AdminApprovals from './pages/admin/AdminApprovals';
import AdminClients from './pages/admin/AdminClients';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminDiagnostics from './pages/admin/AdminDiagnostics';
import AdminDiagnosticsReport from './pages/admin/AdminDiagnosticsReport';
import AdminInfrastructure from './pages/admin/AdminInfrastructure';
import AdminLogin from './pages/admin/AdminLogin';
import AdminMeetingSetup from './pages/admin/AdminMeetingSetup';
import AdminNewClient from './pages/admin/AdminNewClient';
import AdminNewProject from './pages/admin/AdminNewProject';
import AdminProjects from './pages/admin/AdminProjects';
import AdminProposalGenerator from './pages/admin/AdminProposalGenerator';
import AdminRecordings from './pages/admin/AdminRecordings';
import AdminRepository from './pages/admin/AdminRepository';
import AdminScheduleMeeting from './pages/admin/AdminScheduleMeeting';
import AdminSessions from './pages/admin/AdminSessions';
import AdminSettings from './pages/admin/AdminSettings';
import AdminSupportChat from './pages/admin/AdminSupportChat';
import AdminTickets from './pages/admin/AdminTickets';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<AdminLogin />} />
          <Route path="/client/dashboard" element={<ClientDashboard />} />
          <Route path="/client/tickets" element={<MyTickets />} />
          <Route
            path="/admin/*"
            element={
              <AdminLayout>
                <Routes>
                  <Route path="/active-meeting" element={<AdminActiveMeeting />} />
                  <Route path="/active-rooms" element={<AdminActiveRooms />} />
                  <Route path="/approvals" element={<AdminApprovals />} />
                  <Route path="/clients" element={<AdminClients />} />
                  <Route path="/dashboard" element={<AdminDashboard />} />
                  <Route path="/diagnostics" element={<AdminDiagnostics />} />
                  <Route path="/diagnostics-report" element={<AdminDiagnosticsReport />} />
                  <Route path="/infrastructure" element={<AdminInfrastructure />} />
                  <Route path="/meeting-setup" element={<AdminMeetingSetup />} />
                  <Route path="/new-client" element={<AdminNewClient />} />
                  <Route path="/new-project" element={<AdminNewProject />} />
                  <Route path="/projects" element={<AdminProjects />} />
                  <Route path="/proposal-generator" element={<AdminProposalGenerator />} />
                  <Route path="/recordings" element={<AdminRecordings />} />
                  <Route path="/repository" element={<AdminRepository />} />
                  <Route path="/schedule-meeting" element={<AdminScheduleMeeting />} />
                  <Route path="/sessions" element={<AdminSessions />} />
                  <Route path="/settings" element={<AdminSettings />} />
                  <Route path="/support-chat" element={<AdminSupportChat />} />
                  <Route path="/tickets" element={<AdminTickets />} />
                </Routes>
              </AdminLayout>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;

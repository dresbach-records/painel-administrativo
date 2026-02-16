import React from 'react';
import { Link } from 'react-router-dom';

type AdminLayoutProps = {
  children: React.ReactNode;
};

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const adminPages = [
    { name: 'Active Meeting', path: '/admin/active-meeting' },
    { name: 'Active Rooms', path: '/admin/active-rooms' },
    { name: 'Approvals', path: '/admin/approvals' },
    { name: 'Clients', path: '/admin/clients' },
    { name: 'Dashboard', path: '/admin/dashboard' },
    { name: 'Diagnostics', path: '/admin/diagnostics' },
    { name: 'Diagnostics Report', path: '/admin/diagnostics-report' },
    { name: 'Infrastructure', path: '/admin/infrastructure' },
    { name: 'Meeting Setup', path: '/admin/meeting-setup' },
    { name: 'New Client', path: '/admin/new-client' },
    { name: 'New Project', path: '/admin/new-project' },
    { name: 'Projects', path: '/admin/projects' },
    { name: 'Proposal Generator', path: '/admin/proposal-generator' },
    { name: 'Recordings', path: '/admin/recordings' },
    { name: 'Repository', path: '/admin/repository' },
    { name: 'Schedule Meeting', path: '/admin/schedule-meeting' },
    { name: 'Sessions', path: '/admin/sessions' },
    { name: 'Settings', path: '/admin/settings' },
    { name: 'Support Chat', path: '/admin/support-chat' },
    { name: 'Tickets', path: '/admin/tickets' },
  ];

  return (
    <div className="flex">
      <aside className="w-64 min-h-screen bg-gray-800 text-white p-4">
        <h1 className="text-2xl font-bold mb-4">Admin</h1>
        <nav>
          <ul>
            {adminPages.map((page) => (
              <li key={page.path}>
                <Link to={page.path} className="block py-2 px-4 hover:bg-gray-700 rounded">
                  {page.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      <main className="flex-grow p-8">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;

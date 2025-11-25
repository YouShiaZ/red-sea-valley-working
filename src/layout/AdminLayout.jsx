import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Home, List, LogOut, Settings as SettingsIcon, Inbox } from 'lucide-react';
import { useEffect } from 'react';

const AdminLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('rsv_admin_token')) navigate('/admin/login');
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem('rsv_admin_token');
    navigate('/admin/login');
  };

  const navClasses = ({ isActive }) =>
    `flex items-center gap-2 px-3 py-2 rounded-lg transition ${isActive ? 'bg-turquoise/10 text-turquoise' : 'text-gray-700 hover:bg-gray-50'}`;

  return (
    <div className="min-h-screen grid md:grid-cols-[240px_1fr]">
      <aside className="border-r border-gray-100 bg-white p-6 space-y-6">
        <div>
          <div className="text-xs uppercase text-gray-500">Admin</div>
          <div className="text-lg font-semibold text-turquoise">RSV</div>
        </div>
        <nav className="space-y-1">
          <NavLink to="/admin" className={navClasses} end>
            <LayoutDashboard size={18} /> Dashboard
          </NavLink>
          <NavLink to="/admin/properties" className={navClasses}>
            <List size={18} /> Properties
          </NavLink>
          <NavLink to="/admin/leads" className={navClasses}>
            <Inbox size={18} /> Leads
          </NavLink>
          <NavLink to="/admin/settings" className={navClasses}>
            <SettingsIcon size={18} /> Settings
          </NavLink>
        </nav>
        <button
          onClick={logout}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-turquoise"
        >
          <LogOut size={18} /> Logout
        </button>
      </aside>
      <main className="bg-mist min-h-screen p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;

import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useConfig } from '../contexts/ConfigContext';
import {
  LayoutDashboard,
  Database,
  FileText,
  Users,
  Settings,
  RefreshCw,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { refreshConfig, backendOnline, checkBackendStatus, loading } = useConfig();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex h-screen w-full bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      {/* Collapsible Sidebar */}
      <aside className={`flex-shrink-0 flex flex-col border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-lg transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'}`}>
        {/* Header with toggle button */}
        <div className="h-16 flex items-center justify-between px-3 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
          {!isCollapsed && (
            <div className="flex items-center gap-2.5 text-blue-900 dark:text-blue-400 group cursor-pointer">
              <div className="p-1.5 rounded-lg bg-gradient-to-br from-blue-700 to-blue-900 shadow-md group-hover:shadow-lg transition-all duration-200">
                <Database size={22} className="text-white" strokeWidth={2.5} />
              </div>
              <h1 className="text-xl font-bold tracking-tight text-blue-900 dark:text-white">Hệ Thống BMS</h1>
            </div>
          )}
          {isCollapsed && (
            <div className="mx-auto p-1.5 rounded-lg bg-gradient-to-br from-blue-700 to-blue-900 shadow-md">
              <Database size={22} className="text-white" strokeWidth={2.5} />
            </div>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={`p-2 rounded-lg border-2 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 hover:border-red-500 dark:hover:border-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 text-slate-700 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400 transition-all shadow-sm hover:shadow-md ${isCollapsed ? 'absolute right-2 top-4' : ''}`}
            title={isCollapsed ? "Mở sidebar" : "Đóng sidebar"}
          >
            {isCollapsed ? <ChevronRight size={20} strokeWidth={2.5} /> : <ChevronLeft size={20} strokeWidth={2.5} />}
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-6 px-3 flex flex-col gap-1.5">
          <NavItem to="/" icon={<LayoutDashboard size={20} />} label="Tổng quan" isCollapsed={isCollapsed} />
          <NavItem to="/scenarios" icon={<Database size={20} />} label="Xử lý thông tin (SQL)" isCollapsed={isCollapsed} />
          <NavItem to="/reports" icon={<FileText size={20} />} label="Trình bày thông tin" isCollapsed={isCollapsed} />
          <NavItem to="/logs" icon={<Users size={20} />} label="Thành Viên Nhóm" isCollapsed={isCollapsed} />
        </nav>

        {/* Reload Config + System Status */}
        <div className="p-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 space-y-2">
          {/* Reload Config Button */}
          <button
            onClick={() => refreshConfig()}
            disabled={loading}
            title="Tải lại file cấu hình JSON"
            className={`w-full group flex items-center ${isCollapsed ? 'justify-center' : 'justify-center gap-2'} px-3.5 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-red-500 dark:hover:border-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 text-slate-600 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400 text-xs font-semibold transition-all duration-200 disabled:opacity-50 shadow-sm`}
          >
            <RefreshCw size={15} className={`${loading ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-500'}`} />
            {!isCollapsed && <span>Reload Config</span>}
          </button>

          {/* Backend Status Indicator */}
          <div
            className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'justify-center gap-2.5'} px-4 py-2.5 rounded-lg border shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer ${backendOnline
              ? 'bg-emerald-50 border-emerald-300 text-emerald-700 dark:bg-emerald-900/30 dark:border-emerald-700 dark:text-emerald-400'
              : 'bg-red-50 border-red-300 text-red-700 dark:bg-red-900/30 dark:border-red-700 dark:text-red-400'
              }`}
            title={backendOnline ? "Kết nối Backend thành công" : "Không kết nối được Backend (Mock Mode)"}
            onClick={checkBackendStatus}
            role="button"
          >
            <div className="relative flex h-2.5 w-2.5">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${backendOnline ? 'bg-emerald-500' : 'bg-red-500'}`}></span>
              <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${backendOnline ? 'bg-emerald-600' : 'bg-red-600'}`}></span>
            </div>
            {!isCollapsed && (
              <span className="text-xs font-bold tracking-wider">
                {backendOnline ? 'SYSTEM ONLINE' : 'OFFLINE MODE'}
              </span>
            )}
          </div>
        </div>

        <div className="p-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
          <NavItem to="/settings" icon={<Settings size={20} />} label="Cài đặt" isCollapsed={isCollapsed} />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Page Content - No header, full height */}
        <div className="flex-1 overflow-hidden relative">
          {children}
        </div>
      </main>
    </div>
  );
};

const NavItem: React.FC<{ to: string; icon: React.ReactNode; label: string; isCollapsed?: boolean }> = ({ to, icon, label, isCollapsed = false }) => (
  <NavLink
    to={to}
    className={({ isActive }) => `group relative flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'} px-3.5 py-3 rounded-lg transition-all duration-200 overflow-hidden ${isActive
      ? 'bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold shadow-md'
      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200'
      }`}
    title={isCollapsed ? label : undefined}
  >
    {({ isActive }) => (
      <>
        {isActive && !isCollapsed && (
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-white rounded-r-full"></div>
        )}
        <div className={`transition-transform duration-200 ${isActive ? '' : 'group-hover:scale-105'}`}>
          {icon}
        </div>
        {!isCollapsed && <span className="text-sm">{label}</span>}
      </>
    )}
  </NavLink>
);

export default Layout;
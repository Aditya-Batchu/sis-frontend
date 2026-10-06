import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Sidebar() {
  const location = useLocation();
  const [systemSetupExpanded, setSystemSetupExpanded] = useState(true);

  const isActive = (path) => location.pathname === path;
  const isSystemSetupActive = location.pathname.startsWith('/system-setup');

  return (
    <aside className="fixed left-0 top-16 bottom-0 w-72 bg-surface-container-lowest border-r border-outline-variant/30 z-40 flex flex-col justify-between overflow-y-auto">
      <div className="py-space-md">
        <div className="px-space-md pb-space-sm">
          <p className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">
            Institutional Governance
          </p>
        </div>

        <nav className="px-space-sm space-y-0.5">
          {/* Dashboard */}
          <Link
            to="/"
            className={`flex items-center gap-space-sm px-space-md py-2.5 rounded-lg text-xs font-medium transition-colors ${
              isActive('/')
                ? 'bg-surface-container-high text-primary font-semibold'
                : 'text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">grid_view</span>
            <span>Dashboard</span>
          </Link>

          {/* System Setup Section */}
          <div className="space-y-0.5">
            <button
              onClick={() => setSystemSetupExpanded(!systemSetupExpanded)}
              className={`w-full flex items-center justify-between px-space-md py-2.5 rounded-lg text-xs font-semibold transition-colors ${
                isSystemSetupActive
                  ? 'bg-surface-container-low text-primary'
                  : 'text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface'
              }`}
              type="button"
            >
              <div className="flex items-center gap-space-sm">
                <span className="material-symbols-outlined text-[20px]">settings_suggest</span>
                <span>System Setup</span>
              </div>
              <span className="material-symbols-outlined text-[18px]">
                {systemSetupExpanded ? 'expand_less' : 'expand_more'}
              </span>
            </button>

            {systemSetupExpanded && (
              <div className="pl-8 pr-space-xs py-1 space-y-1">
                <Link
                  to="/system-setup/campuses"
                  className={`flex items-center justify-between px-space-sm py-1.5 rounded-lg text-xs transition-colors ${
                    isActive('/system-setup/campuses') || isActive('/')
                      ? 'bg-surface-container-high text-primary font-semibold'
                      : 'text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface'
                  }`}
                >
                  <span>Campuses</span>
                  {(isActive('/system-setup/campuses') || isActive('/')) && (
                    <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                  )}
                </Link>

                <Link
                  to="/system-setup/programs-and-batches"
                  className="flex items-center px-space-sm py-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface text-xs transition-colors"
                >
                  <span>Programs & Batches</span>
                </Link>

                <Link
                  to="/system-setup/departments-and-branches"
                  className="flex items-center px-space-sm py-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface text-xs transition-colors"
                >
                  <span>Departments & Branches</span>
                </Link>

                <Link
                  to="/system-setup/academic-calendar"
                  className="flex items-center px-space-sm py-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface text-xs transition-colors"
                >
                  <span>Academic Calendar</span>
                </Link>

                <Link
                  to="/system-setup/reservation-categories"
                  className="flex items-center px-space-sm py-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface text-xs transition-colors"
                >
                  <span>Reservation Categories</span>
                </Link>
              </div>
            )}
          </div>

          {/* Admissions */}
          <Link
            to="/admissions"
            className="flex items-center gap-space-sm px-space-md py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface text-xs font-medium transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">how_to_reg</span>
            <span>Admissions</span>
          </Link>

          {/* PUC Academics */}
          <Link
            to="/puc-academics"
            className="flex items-center gap-space-sm px-space-md py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface text-xs font-medium transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">menu_book</span>
            <span>PUC Academics</span>
          </Link>

          {/* B.Tech Academics & Branch Allocation */}
          <Link
            to="/btech-academics"
            className="flex items-center gap-space-sm px-space-md py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface text-xs font-medium transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">account_tree</span>
            <span>B.Tech & Branch Allocation</span>
          </Link>

          {/* Examinations & Grading */}
          <Link
            to="/examinations"
            className="flex items-center gap-space-sm px-space-md py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface text-xs font-medium transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">fact_check</span>
            <span>Examinations & Grading</span>
          </Link>

          {/* Faculty & Staff */}
          <Link
            to="/faculty-staff"
            className="flex items-center gap-space-sm px-space-md py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface text-xs font-medium transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">badge</span>
            <span>Faculty & Staff</span>
          </Link>

          {/* Reports & Settings */}
          <Link
            to="/reports-settings"
            className="flex items-center gap-space-sm px-space-md py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface text-xs font-medium transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">analytics</span>
            <span>Reports & Settings</span>
          </Link>
        </nav>
      </div>

      {/* System Status Footer */}
      <div className="p-space-md border-t border-outline-variant/30 bg-surface-container-low/50">
        <div className="flex items-center justify-between text-on-surface-variant">
          <div className="flex items-center gap-space-xs">
            <span className="w-2 h-2 rounded-full bg-tertiary-container animate-pulse"></span>
            <span className="text-[11px] font-semibold">System Status: Operational</span>
          </div>
          <span className="font-mono text-[11px] text-outline">v2.4.1</span>
        </div>
      </div>
    </aside>
  );
}

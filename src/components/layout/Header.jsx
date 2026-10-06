import React, { useState } from 'react';

export default function Header() {
  const [campusDropdownOpen, setCampusDropdownOpen] = useState(false);
  const [selectedCampusLabel, setSelectedCampusLabel] = useState('All Campuses');

  const campusOptions = [
    'All Campuses',
    'IIIT Nuzvid (NUZ)',
    'IIIT RK Valley (RKV)',
    'IIIT Ongole (ONG)',
    'IIIT Srikakulam (SKL)',
  ];

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-primary-container z-50 flex items-center justify-between px-space-lg shadow-[0_4px_12px_rgba(15,41,66,0.15)]">
      {/* Brand & Emblem */}
      <div className="flex items-center gap-space-lg">
        <div className="flex items-center gap-space-sm">
          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center font-bold text-white font-mono text-sm border border-white/20">
            🏛️
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-[15px] text-on-primary tracking-wide leading-tight">
              RGUKT SIS
            </span>
            <span className="text-[11px] text-on-primary/75 tracking-wider hidden sm:inline">
              Rajiv Gandhi University of Knowledge Technologies
            </span>
          </div>
        </div>

        <div className="h-6 w-px bg-white/20 hidden md:block"></div>

        {/* Multi-Campus Quick Switcher */}
        <div className="relative hidden md:flex items-center">
          <button
            onClick={() => setCampusDropdownOpen(!campusDropdownOpen)}
            className="flex items-center gap-space-xs bg-white/10 hover:bg-white/15 text-on-primary px-space-sm py-1.5 rounded-lg text-xs font-medium transition-colors"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px] text-tertiary-fixed">domain</span>
            <span>{selectedCampusLabel}</span>
            <span className="bg-tertiary-container/80 text-on-tertiary px-1.5 py-0.5 rounded text-[10px] font-mono">
              4 Sites
            </span>
            <span className="material-symbols-outlined text-[18px]">expand_more</span>
          </button>

          {campusDropdownOpen && (
            <div className="absolute top-10 left-0 mt-1 w-56 rounded-xl bg-white shadow-xl py-1 z-50 text-on-surface border border-outline-variant/30">
              {campusOptions.map((opt) => (
                <button
                  key={opt}
                  onClick={() => {
                    setSelectedCampusLabel(opt);
                    setCampusDropdownOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-xs hover:bg-surface-container-low transition-colors flex items-center justify-between ${
                    selectedCampusLabel === opt ? 'bg-surface-container-high text-primary font-semibold' : ''
                  }`}
                >
                  <span>{opt}</span>
                  {selectedCampusLabel === opt && (
                    <span className="material-symbols-outlined text-[16px] text-primary">check</span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Global Quick Search */}
      <div className="flex items-center gap-space-md flex-1 max-w-xl mx-space-lg justify-center hidden lg:flex">
        <div className="relative w-full max-w-md">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-primary/60 text-[18px]">
            search
          </span>
          <input
            className="w-full pl-9 pr-14 py-1.5 bg-white/10 text-on-primary placeholder:text-on-primary/50 rounded-lg text-xs focus:outline-none focus:bg-white/20 transition-all"
            placeholder="Search student UID, faculty, course code..."
            type="text"
          />
          <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 px-1.5 py-0.5 text-[10px] font-mono bg-white/10 text-on-primary/75 rounded">
            Ctrl+K
          </kbd>
        </div>
      </div>

      {/* Right Controls: Academic Indicator, Notification, User Profile */}
      <div className="flex items-center gap-space-md">
        <div className="hidden xl:flex items-center gap-space-xs px-2.5 py-1 bg-white/10 text-on-primary rounded-full text-xs border border-white/10">
          <span className="w-2 h-2 rounded-full bg-tertiary-fixed animate-pulse"></span>
          <span>AY 2024-2025 | Odd Semester</span>
        </div>

        <button
          aria-label="Notifications"
          className="relative p-2 text-on-primary/80 hover:text-on-primary hover:bg-white/10 rounded-lg transition-colors"
          type="button"
        >
          <span className="material-symbols-outlined text-[20px]">notifications</span>
          <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-error text-[10px] font-bold text-on-error">
            3
          </span>
        </button>

        <div className="h-6 w-px bg-white/20"></div>

        <div className="flex items-center gap-space-sm pl-space-xs cursor-pointer group">
          <div className="w-8 h-8 rounded-full bg-surface-container-highest text-primary flex items-center justify-center font-bold text-xs ring-2 ring-white/20 group-hover:ring-white/50 transition-all">
            KR
          </div>
          <div className="hidden sm:flex flex-col text-left">
            <span className="text-xs font-semibold text-on-primary leading-snug">Prof. K. Rama Rao</span>
            <span className="text-[10px] text-on-primary/70 leading-none">Super Admin / Controller of Academics</span>
          </div>
          <span className="material-symbols-outlined text-[18px] text-on-primary/70 group-hover:text-on-primary">
            expand_more
          </span>
        </div>
      </div>
    </header>
  );
}

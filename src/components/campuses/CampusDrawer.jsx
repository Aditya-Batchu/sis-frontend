import React from 'react';

export default function CampusDrawer({ isOpen, onClose, campus, onEdit }) {
  if (!isOpen || !campus) return null;

  return (
    <div className="fixed inset-0 top-16 bg-on-background/40 backdrop-blur-sm z-50 flex justify-end transition-opacity duration-300">
      <div
        className="w-full max-w-[640px] h-full bg-surface-container-lowest shadow-2xl flex flex-col justify-between overflow-hidden animate-in slide-in-from-right duration-300"
        role="dialog"
      >
        {/* Drawer Header */}
        <div className="p-space-lg bg-surface-container-low shadow-sm border-b border-outline-variant/30">
          <div className="flex items-center justify-between mb-space-sm">
            <div className="flex items-center gap-space-xs flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-fixed font-mono text-xs font-semibold">
                {campus.region === 'AU' ? 'AU Region (Andhra Univ)' : 'SVU Region (Sri Venkateswara)'}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-primary text-on-primary font-mono text-xs font-semibold">
                Code: {campus.code}
              </span>
              <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-tertiary-container/20 text-on-tertiary-fixed-variant text-xs font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-tertiary-container"></span>
                {campus.status || 'Active'}
              </span>
            </div>

            <div className="flex items-center gap-space-xs">
              <button
                onClick={() => {
                  onClose();
                  onEdit(campus);
                }}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-primary text-on-primary hover:bg-primary-container transition-all text-xs font-semibold shadow-sm"
                type="button"
              >
                <span className="material-symbols-outlined text-[16px]">edit</span>
                <span>Edit Campus</span>
              </button>
              <button
                onClick={onClose}
                aria-label="Close side drawer"
                className="p-1.5 text-secondary hover:text-on-surface hover:bg-surface-variant rounded-lg transition-colors"
                type="button"
              >
                <span className="material-symbols-outlined text-[22px]">close</span>
              </button>
            </div>
          </div>

          <div className="space-y-1">
            <h2 className="text-xl font-bold text-primary">{campus.name}</h2>
            <p className="text-xs text-secondary">
              Constituent Institute established under AP State Act 18 of 2008 • Residential Excellence
            </p>
          </div>

          {/* Quick Metrics Strip */}
          <div className="mt-space-md grid grid-cols-4 gap-2 pt-space-xs text-center font-mono">
            <div className="p-2 rounded-lg bg-surface-container-lowest border border-outline-variant/30">
              <div className="text-[10px] text-secondary uppercase tracking-tight">Est. Year</div>
              <div className="font-bold text-on-surface text-sm">{campus.establishedYear || 2008}</div>
            </div>
            <div className="p-2 rounded-lg bg-surface-container-lowest border border-outline-variant/30">
              <div className="text-[10px] text-secondary uppercase tracking-tight">Annual Intake</div>
              <div className="font-bold text-on-surface text-sm">{(campus.annualIntake || 1100).toLocaleString()}</div>
            </div>
            <div className="p-2 rounded-lg bg-surface-container-lowest border border-outline-variant/30">
              <div className="text-[10px] text-secondary uppercase tracking-tight">Active Capacity</div>
              <div className="font-bold text-on-surface text-sm">{(campus.currentStrength || 7200).toLocaleString()}</div>
            </div>
            <div className="p-2 rounded-lg bg-surface-container-lowest border border-outline-variant/30">
              <div className="text-[10px] text-secondary uppercase tracking-tight">Land Area</div>
              <div className="font-bold text-on-surface text-sm">{campus.landAreaAcres || 100} Ac</div>
            </div>
          </div>
        </div>

        {/* Drawer Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-space-lg space-y-space-lg">
          {/* Institutional Overview */}
          <div className="space-y-space-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-on-surface flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-primary text-[20px]">account_balance</span>
                <span>Institutional Overview</span>
              </h3>
              <span className="font-mono text-[11px] text-secondary">Campus ID #{campus.code}-01</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md p-space-md rounded-xl bg-surface-container-low border border-outline-variant/30">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-secondary uppercase">Annual Freshman Intake</span>
                <div className="text-sm text-on-surface flex items-baseline gap-1.5">
                  <span className="font-bold font-mono text-base">{(campus.annualIntake || 1100).toLocaleString()}</span>
                  <span className="text-secondary text-xs">students / yr (PUC-1)</span>
                </div>
                <p className="text-[11px] text-secondary">Direct SSC merit selection with +0.4 deprivation score</p>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-bold text-secondary uppercase">Current Campus Strength</span>
                <div className="text-sm text-on-surface flex items-baseline gap-1.5">
                  <span className="font-bold font-mono text-base">{(campus.currentStrength || 7200).toLocaleString()}</span>
                  <span className="text-secondary text-xs">active enrollments</span>
                </div>
                <p className="text-[11px] text-secondary">100% on-campus residential model</p>
              </div>

              <div className="space-y-1 md:col-span-2 pt-space-xs">
                <span className="text-[10px] font-bold text-secondary uppercase">Academic Structure & Pedagogy</span>
                <div className="p-3 bg-surface-container-lowest rounded-lg flex items-center gap-space-sm border border-outline-variant/30">
                  <span className="material-symbols-outlined text-primary text-[24px]">school</span>
                  <div>
                    <div className="text-xs font-bold text-on-surface">6-Year Integrated B.Tech Program</div>
                    <div className="text-[11px] text-secondary">
                      2-Year Pre-University Course (PUC) + 4-Year B.Tech Specialization
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-1 md:col-span-2">
                <span className="text-[10px] font-bold text-secondary uppercase">Estate & Physical Address</span>
                <div className="flex items-center gap-space-md p-3 bg-surface-container-lowest rounded-lg border border-outline-variant/30">
                  <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary font-bold font-mono text-sm shrink-0">
                    {campus.landAreaAcres || 100}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-on-surface">Sprawling {campus.landAreaAcres || 100} Acres Campus</div>
                    <div className="text-[11px] text-secondary">{campus.address || `${campus.district} District, Andhra Pradesh`}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Administrative Leadership & Key Contacts */}
          <div className="space-y-space-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-on-surface flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-primary text-[20px]">supervised_user_circle</span>
                <span>Administrative Leadership</span>
              </h3>
              <span className="text-[11px] text-secondary">Key Signatories</span>
            </div>

            <div className="space-y-space-sm">
              <div className="p-space-md rounded-xl bg-surface-container-low flex items-start gap-space-md border border-outline-variant/30">
                <div className="w-11 h-11 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-xs shrink-0">
                  {campus.code}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-on-surface">{campus.directorName || 'Director Office'}</h4>
                    <span className="px-2 py-0.5 rounded bg-surface-container-highest text-primary text-[10px] font-semibold">
                      Director
                    </span>
                  </div>
                  <div className="flex items-center gap-space-xs mt-1 text-secondary text-xs">
                    <span className="material-symbols-outlined text-[16px]">mail</span>
                    <a className="hover:text-primary underline truncate font-mono text-xs" href={`mailto:${campus.contactEmail}`}>
                      {campus.contactEmail}
                    </a>
                  </div>
                  {campus.contactPhone && (
                    <div className="flex items-center gap-space-xs mt-0.5 text-secondary text-[11px]">
                      <span className="material-symbols-outlined text-[16px]">call</span>
                      <span className="font-mono">{campus.contactPhone}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm">
                <div className="p-3 rounded-xl bg-surface-container-low space-y-1 border border-outline-variant/30">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-secondary uppercase">Admin Officer (AO)</span>
                    <span className="material-symbols-outlined text-secondary text-[16px]">verified_user</span>
                  </div>
                  <div className="text-xs font-semibold text-on-surface truncate">Administrative Office</div>
                  <div className="text-[11px] text-primary truncate font-mono">{campus.aoEmail || `ao@rgukt${campus.code.toLowerCase()}.ac.in`}</div>
                </div>

                <div className="p-3 rounded-xl bg-surface-container-low space-y-1 border border-outline-variant/30">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-secondary uppercase">Dean Academics</span>
                    <span className="material-symbols-outlined text-secondary text-[16px]">menu_book</span>
                  </div>
                  <div className="text-xs font-semibold text-on-surface truncate">Academic Affairs Cell</div>
                  <div className="text-[11px] text-primary truncate font-mono">{campus.deanAcademicsEmail || `dean.academics@rgukt${campus.code.toLowerCase()}.ac.in`}</div>
                </div>

                <div className="p-3 rounded-xl bg-surface-container-low space-y-1 sm:col-span-2 border border-outline-variant/30">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-secondary uppercase">Controller of Examinations (CoE)</span>
                    <span className="material-symbols-outlined text-secondary text-[16px]">fact_check</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-xs font-semibold text-on-surface">Campus Examination Cell</div>
                    <div className="text-[11px] text-primary font-mono">{campus.coeEmail || `exam.cell@rgukt${campus.code.toLowerCase()}.ac.in`}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Active Departments Breakdown */}
          <div className="space-y-space-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-on-surface flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-primary text-[20px]">hub</span>
                <span>Active Departments & Allocated Seats</span>
              </h3>
              <span className="font-mono text-xs text-secondary">8 Departments</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div className="p-2.5 rounded-lg bg-surface-container-low flex items-center justify-between border border-outline-variant/30">
                <div>
                  <div className="text-xs font-semibold text-on-surface">Computer Science (CSE)</div>
                  <div className="text-[10px] text-secondary">Engineering Branch</div>
                </div>
                <span className="px-2 py-0.5 rounded bg-primary text-on-primary font-mono text-xs font-semibold">360 Seats</span>
              </div>

              <div className="p-2.5 rounded-lg bg-surface-container-low flex items-center justify-between border border-outline-variant/30">
                <div>
                  <div className="text-xs font-semibold text-on-surface">Electronics & Comm. (ECE)</div>
                  <div className="text-[10px] text-secondary">Engineering Branch</div>
                </div>
                <span className="px-2 py-0.5 rounded bg-secondary-container text-on-secondary-fixed font-mono text-xs font-semibold">300 Seats</span>
              </div>

              <div className="p-2.5 rounded-lg bg-surface-container-low flex items-center justify-between border border-outline-variant/30">
                <div>
                  <div className="text-xs font-semibold text-on-surface">Mechanical Engg (MECH)</div>
                  <div className="text-[10px] text-secondary">Engineering Branch</div>
                </div>
                <span className="px-2 py-0.5 rounded bg-surface-container-high text-on-surface font-mono text-xs font-semibold">120 Seats</span>
              </div>

              <div className="p-2.5 rounded-lg bg-surface-container-low flex items-center justify-between border border-outline-variant/30">
                <div>
                  <div className="text-xs font-semibold text-on-surface">Electrical & Electronics (EEE)</div>
                  <div className="text-[10px] text-secondary">Engineering Branch</div>
                </div>
                <span className="px-2 py-0.5 rounded bg-surface-container-high text-on-surface font-mono text-xs font-semibold">120 Seats</span>
              </div>

              <div className="p-2.5 rounded-lg bg-surface-container-low flex items-center justify-between border border-outline-variant/30">
                <div>
                  <div className="text-xs font-semibold text-on-surface">Civil Engineering (CIVIL)</div>
                  <div className="text-[10px] text-secondary">Engineering Branch</div>
                </div>
                <span className="px-2 py-0.5 rounded bg-surface-container-high text-on-surface font-mono text-xs font-semibold">120 Seats</span>
              </div>

              <div className="p-2.5 rounded-lg bg-surface-container-low flex items-center justify-between border border-outline-variant/30">
                <div>
                  <div className="text-xs font-semibold text-on-surface">Chemical Engg (CHEM)</div>
                  <div className="text-[10px] text-secondary">Engineering Branch</div>
                </div>
                <span className="px-2 py-0.5 rounded bg-surface-container-high text-on-surface font-mono text-xs font-semibold">60 Seats</span>
              </div>

              <div className="p-2.5 rounded-lg bg-surface-container-low flex items-center justify-between border border-outline-variant/30">
                <div>
                  <div className="text-xs font-semibold text-on-surface">Metallurgical & Materials (MME)</div>
                  <div className="text-[10px] text-secondary">Engineering Branch</div>
                </div>
                <span className="px-2 py-0.5 rounded bg-surface-container-high text-on-surface font-mono text-xs font-semibold">60 Seats</span>
              </div>

              <div className="p-2.5 rounded-lg bg-tertiary-container/10 flex items-center justify-between sm:col-span-2 border border-tertiary-fixed/40">
                <div className="flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-tertiary text-[20px]">science</span>
                  <div>
                    <div className="text-xs font-bold text-on-surface">Dept. of Sciences & Humanities</div>
                    <div className="text-[10px] text-secondary">PUC-1 & PUC-2 Foundation (MPC & MBiPC)</div>
                  </div>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-white text-on-tertiary-fixed-variant font-mono text-xs font-bold border border-tertiary-fixed">
                  2,200 Cohort
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Drawer Footer */}
        <div className="p-space-md bg-surface-container-low flex items-center justify-between gap-space-md border-t border-outline-variant/30">
          <div className="text-[11px] text-secondary flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px] text-primary">sync</span>
            <span>APSHEC AISHE Code: U-0035</span>
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-secondary text-on-secondary hover:bg-on-secondary-container transition-colors text-xs font-semibold shadow-sm"
            type="button"
          >
            Close Panel
          </button>
        </div>
      </div>
    </div>
  );
}

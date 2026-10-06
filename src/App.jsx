import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import CampusesPage from './pages/system-setup/CampusesPage';

// Simple placeholder component for upcoming modules
function ComingSoonPage({ title, phase, description }) {
  return (
    <div className="p-space-lg max-w-4xl mx-auto space-y-4">
      <div className="p-8 bg-surface-container-lowest rounded-xl border border-outline-variant/30 text-center space-y-3">
        <div className="w-12 h-12 rounded-full bg-primary-container text-on-primary flex items-center justify-center mx-auto">
          <span className="material-symbols-outlined text-[24px]">construction</span>
        </div>
        <h2 className="text-xl font-bold text-on-surface">{title}</h2>
        <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-surface-container-high text-primary">
          {phase}
        </span>
        <p className="text-xs text-on-surface-variant max-w-md mx-auto">
          {description || 'This module will be activated in the next scheduled block according to the RGUKT SIS roadmap.'}
        </p>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<CampusesPage />} />
          <Route path="system-setup">
            <Route path="campuses" element={<CampusesPage />} />
            <Route
              path="programs-and-batches"
              element={
                <ComingSoonPage
                  title="Academic Programs & Batches"
                  phase="Phase 1 - Block 2"
                  description="Configure 6-Year Integrated B.Tech program structure, PUC1-E4 batches, and student progression cohorts."
                />
              }
            />
            <Route
              path="departments-and-branches"
              element={
                <ComingSoonPage
                  title="Departments & Engineering Branches"
                  phase="Phase 1 - Block 3"
                  description="Manage PUC Sciences & Humanities department, CSE, ECE, EEE, MECH, CIVIL, MME, CHEM branches."
                />
              }
            />
            <Route
              path="academic-calendar"
              element={
                <ComingSoonPage
                  title="Academic Calendar & Regulations"
                  phase="Phase 1 - Block 4"
                  description="Synchronized semester term dates, mid-exam schedules, and university holidays across all 4 campuses."
                />
              }
            />
            <Route
              path="reservation-categories"
              element={
                <ComingSoonPage
                  title="Statutory Reservation Categories"
                  phase="Phase 1 - Block 4"
                  description="AP State Act 18 reservation rules: 85% local AU/SVU quota, OC, EWS, BC-A/B/C/D/E, SC, ST, Sports, PH."
                />
              }
            />
          </Route>
          <Route
            path="admissions"
            element={
              <ComingSoonPage
                title="Admissions & Counseling Module"
                phase="Phase 2"
                description="10th class SSC merit ranking, deprivation score (+0.4), sports/PH quota allocation, and campus assignment."
              />
            }
          />
          <Route
            path="puc-academics"
            element={
              <ComingSoonPage
                title="PUC Academics & Remedials"
                phase="Phase 3"
                description="PUC-1 / PUC-2 MPC & MBiPC courses, aggregated attendance, and remedial exam management."
              />
            }
          />
          <Route
            path="btech-academics"
            element={
              <ComingSoonPage
                title="B.Tech Branch Allocation & Academics"
                phase="Phase 4 & 5"
                description="PUC CGPA merit-based branch allocation counseling, mandatory electives, and minors (Quantum Computing)."
              />
            }
          />
          <Route
            path="examinations"
            element={
              <ComingSoonPage
                title="Examinations & Grading System"
                phase="Phase 6"
                description="Best 2 of 3 Mids (30 marks) + 10 Internals + 60 End Semester = 100 marks grading scale (Ex, A, B, C, D, F)."
              />
            }
          />
          <Route
            path="*"
            element={<Navigate to="/system-setup/campuses" replace />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AgGridReact } from 'ag-grid-react';
import {
  fetchCampuses,
  fetchCampusStats,
  setSelectedCampus,
  clearCampusMessages,
} from '../../Redux/slices/campusSlice';
import CampusFormModal from '../../components/campuses/CampusFormModal';
import CampusDrawer from '../../components/campuses/CampusDrawer';
import DeleteConfirmModal from '../../components/campuses/DeleteConfirmModal';

export default function CampusesPage() {
  const dispatch = useDispatch();
  const { items: campuses, stats, loading, successMessage, error } = useSelector(
    (state) => state.campuses
  );

  // Filter & Search states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [exportMenuOpen, setExportMenuOpen] = useState(false);

  // Modal & Drawer states
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [editingCampus, setEditingCampus] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [viewingCampus, setViewingCampus] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deletingCampus, setDeletingCampus] = useState(null);

  // Toast state
  const [toastMessage, setToastMessage] = useState(null);

  // Fetch initial data
  const loadData = useCallback(() => {
    dispatch(fetchCampuses({ search: searchTerm, region: selectedRegion, status: selectedStatus }));
    dispatch(fetchCampusStats());
  }, [dispatch, searchTerm, selectedRegion, selectedStatus]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Handle toast notifications
  useEffect(() => {
    if (successMessage) {
      setToastMessage({ type: 'success', text: successMessage });
      const timer = setTimeout(() => {
        setToastMessage(null);
        dispatch(clearCampusMessages());
      }, 4000);
      return () => clearTimeout(timer);
    }
    if (error) {
      setToastMessage({ type: 'error', text: error });
      const timer = setTimeout(() => {
        setToastMessage(null);
        dispatch(clearCampusMessages());
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [successMessage, error, dispatch]);

  // Handlers
  const handleOpenAddModal = () => {
    setEditingCampus(null);
    setFormModalOpen(true);
  };

  const handleOpenEditModal = (campus) => {
    setEditingCampus(campus);
    setFormModalOpen(true);
  };

  const handleOpenDrawer = (campus) => {
    setViewingCampus(campus);
    setDrawerOpen(true);
    dispatch(setSelectedCampus(campus));
  };

  const handleOpenDeleteModal = (campus) => {
    setDeletingCampus(campus);
    setDeleteModalOpen(true);
  };

  // AG-Grid Column Definitions
  const columnDefs = useMemo(
    () => [
      {
        headerName: 'Campus Name & Code',
        field: 'name',
        flex: 2,
        minWidth: 260,
        cellRenderer: (params) => {
          const c = params.data;
          if (!c) return null;
          return (
            <div className="flex items-center gap-3 py-1">
              <div className="w-9 h-9 rounded-lg bg-primary-container text-on-primary flex items-center justify-center font-bold text-xs font-mono shrink-0 shadow-sm">
                {c.code}
              </div>
              <div className="leading-tight truncate">
                <div className="flex items-center gap-1.5">
                  <span className="font-semibold text-xs text-on-surface">{c.name}</span>
                  <span className="font-mono bg-surface-container-high text-primary px-1.5 py-0.2 rounded font-semibold text-[10px]">
                    {c.code}
                  </span>
                </div>
                <span className="text-[11px] text-on-surface-variant block mt-0.5">
                  Est. {c.establishedYear || 2008} • Campus #{c.campusNumber || '01'}
                </span>
              </div>
            </div>
          );
        },
      },
      {
        headerName: 'Regional Jurisdiction',
        field: 'region',
        flex: 1.2,
        minWidth: 180,
        cellRenderer: (params) => {
          const region = params.value;
          const isAU = region === 'AU';
          return (
            <div className="flex items-center h-full">
              <span
                className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                  isAU
                    ? 'bg-secondary-container text-on-secondary-fixed'
                    : 'bg-surface-variant text-on-secondary-fixed-variant'
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${isAU ? 'bg-primary' : 'bg-secondary'}`}></span>
                {isAU ? 'Andhra University (AU)' : 'Sri Venkateswara (SVU)'}
              </span>
            </div>
          );
        },
      },
      {
        headerName: 'District & Location Address',
        field: 'district',
        flex: 1.6,
        minWidth: 200,
        cellRenderer: (params) => {
          const c = params.data;
          if (!c) return null;
          return (
            <div className="py-1">
              <div className="font-semibold text-xs text-on-surface">{c.district} District</div>
              <div className="text-[11px] text-on-surface-variant truncate max-w-[220px]" title={c.address}>
                {c.address || `${c.district}, Andhra Pradesh`}
              </div>
            </div>
          );
        },
      },
      {
        headerName: 'Contact & Administrative Email',
        field: 'contactEmail',
        flex: 1.6,
        minWidth: 220,
        cellRenderer: (params) => {
          const c = params.data;
          if (!c) return null;
          return (
            <div className="py-1 space-y-0.5 text-xs">
              <a
                href={`mailto:${c.contactEmail}`}
                className="flex items-center gap-1 text-primary hover:underline font-mono text-[11px]"
              >
                <span className="material-symbols-outlined text-[14px]">mail</span>
                <span className="truncate">{c.contactEmail}</span>
              </a>
              {c.contactPhone && (
                <div className="flex items-center gap-1 text-on-surface-variant text-[11px] font-mono">
                  <span className="material-symbols-outlined text-[14px]">call</span>
                  <span>{c.contactPhone}</span>
                </div>
              )}
            </div>
          );
        },
      },
      {
        headerName: 'Status',
        field: 'status',
        width: 120,
        cellRenderer: (params) => {
          const status = params.value || 'Active';
          const isActive = status === 'Active';
          return (
            <div className="flex items-center justify-center h-full">
              <span
                className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                  isActive
                    ? 'bg-tertiary-fixed/30 text-on-tertiary-fixed-variant'
                    : 'bg-error-container text-on-error-container'
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-tertiary-container' : 'bg-error'}`}></span>
                {status}
              </span>
            </div>
          );
        },
      },
      {
        headerName: 'Actions',
        field: 'actions',
        width: 140,
        sortable: false,
        filter: false,
        cellRenderer: (params) => {
          const campus = params.data;
          if (!campus) return null;
          return (
            <div className="flex items-center justify-end gap-1 h-full pr-2">
              <button
                onClick={() => handleOpenDrawer(campus)}
                className="p-1.5 text-on-surface-variant hover:text-primary hover:bg-surface-container rounded-lg transition-colors"
                title="View Campus Details"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">visibility</span>
              </button>
              <button
                onClick={() => handleOpenEditModal(campus)}
                className="p-1.5 text-on-surface-variant hover:text-secondary hover:bg-surface-container rounded-lg transition-colors"
                title="Edit Master Record"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">edit</span>
              </button>
              <button
                onClick={() => handleOpenDeleteModal(campus)}
                className="p-1.5 text-on-surface-variant hover:text-error hover:bg-error-container/30 rounded-lg transition-colors"
                title="Archive / Inactivate"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">delete</span>
              </button>
            </div>
          );
        },
      },
    ],
    []
  );

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
      resizable: true,
    }),
    []
  );

  return (
    <div className="flex flex-col w-full">
      <div className="px-gutter sm:px-margin py-space-lg max-w-[1600px] w-full mx-auto space-y-space-lg">
        {/* Top Header & Breadcrumbs */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md">
          <div className="space-y-1">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-on-surface-variant">
              <span className="flex items-center gap-1 hover:text-primary transition-colors cursor-pointer">
                <span className="material-symbols-outlined text-[15px]">home</span>
                <span>Home</span>
              </span>
              <span className="text-outline-variant text-[11px]">/</span>
              <span className="hover:text-primary transition-colors cursor-pointer">System Setup</span>
              <span className="text-outline-variant text-[11px]">/</span>
              <span className="font-semibold text-primary">Campuses</span>
            </nav>

            <div className="flex items-baseline gap-3">
              <h1 className="text-2xl font-bold text-on-surface tracking-tight">Campus Management</h1>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-surface-container-high text-primary uppercase tracking-wider">
                Master Registry
              </span>
            </div>
            <p className="text-xs text-on-surface-variant max-w-3xl">
              Manage RGUKT constituent campuses, campus codes, regional jurisdiction (AU/SVU), and institutional contact details across Andhra Pradesh state.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-space-sm self-start md:self-auto">
            {/* Export Dropdown */}
            <div className="relative inline-block text-left">
              <button
                onClick={() => setExportMenuOpen(!exportMenuOpen)}
                className="flex items-center gap-2 px-space-md py-2 rounded-xl bg-surface-container-lowest text-on-surface shadow-sm hover:bg-surface-container-low transition-all text-xs font-semibold border border-outline-variant/30"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px] text-secondary">file_download</span>
                <span>Export Data</span>
                <span className="material-symbols-outlined text-[16px] text-on-surface-variant">arrow_drop_down</span>
              </button>

              {exportMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-xl bg-surface-container-lowest shadow-xl py-1 z-30 border border-outline-variant/30">
                  <button
                    onClick={() => setExportMenuOpen(false)}
                    className="w-full flex items-center gap-2 px-space-md py-2 text-xs text-on-surface hover:bg-surface-container-low transition-colors text-left"
                  >
                    <span className="material-symbols-outlined text-[16px] text-tertiary">table_chart</span>
                    <span>Export as Excel (.xlsx)</span>
                  </button>
                  <button
                    onClick={() => setExportMenuOpen(false)}
                    className="w-full flex items-center gap-2 px-space-md py-2 text-xs text-on-surface hover:bg-surface-container-low transition-colors text-left"
                  >
                    <span className="material-symbols-outlined text-[16px] text-secondary">description</span>
                    <span>Export as CSV (.csv)</span>
                  </button>
                  <button
                    onClick={() => setExportMenuOpen(false)}
                    className="w-full flex items-center gap-2 px-space-md py-2 text-xs text-on-surface hover:bg-surface-container-low transition-colors text-left"
                  >
                    <span className="material-symbols-outlined text-[16px] text-error">picture_as_pdf</span>
                    <span>Institutional PDF Report</span>
                  </button>
                </div>
              )}
            </div>

            {/* Add New Campus Button */}
            <button
              onClick={handleOpenAddModal}
              className="flex items-center gap-2 px-space-md py-2 rounded-xl bg-primary text-on-primary font-semibold text-xs shadow-md hover:bg-primary-container transition-all"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">add</span>
              <span>Add New Campus</span>
            </button>
          </div>
        </div>

        {/* Quick Stat Cards (4-Column Grid) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
          {/* Total Campuses */}
          <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm border border-outline-variant/30 flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-on-surface-variant">Total Campuses</span>
              <div className="w-10 h-10 rounded-xl bg-surface-container-high flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[20px]">account_balance</span>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-bold text-on-surface">{stats.totalCampuses || 4} Active</span>
              </div>
              <div className="flex items-center gap-1.5 mt-1 text-[11px] text-on-surface-variant">
                <span className="w-2 h-2 rounded-full bg-tertiary-container animate-pulse"></span>
                <span>Across Andhra Pradesh State</span>
              </div>
            </div>
          </div>

          {/* Enrolled Capacity */}
          <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm border border-outline-variant/30 flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-on-surface-variant">Total Enrolled Students</span>
              <div className="w-10 h-10 rounded-xl bg-secondary-container/50 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[20px]">groups</span>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-bold text-on-surface">{(stats.totalEnrolled || 28450).toLocaleString()}</span>
                <span className="text-[11px] text-tertiary font-semibold">+3.8% yoy</span>
              </div>
              <p className="text-[11px] text-on-surface-variant mt-1">PUC-1 to B.Tech E4 batches</p>
            </div>
          </div>

          {/* Academic Departments */}
          <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm border border-outline-variant/30 flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-on-surface-variant">Academic Departments</span>
              <div className="w-10 h-10 rounded-xl bg-surface-container-high flex items-center justify-center text-secondary">
                <span className="material-symbols-outlined text-[20px]">menu_book</span>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-bold text-on-surface">7 Engg + Sciences</span>
              </div>
              <p className="text-[11px] text-on-surface-variant mt-1 truncate" title="CSE, ECE, EEE, MECH, CIVIL, CHEM, MME">
                CSE, ECE, EEE, MECH, CIVIL, CHEM, MME
              </p>
            </div>
          </div>

          {/* Regional Jurisdiction */}
          <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm border border-outline-variant/30 flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-on-surface-variant">Regional Jurisdiction</span>
              <div className="w-10 h-10 rounded-xl bg-tertiary-fixed/20 flex items-center justify-center text-tertiary-container">
                <span className="material-symbols-outlined text-[20px]">map</span>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-bold text-on-surface">
                  AU: {stats.auCount || 3} | SVU: {stats.svuCount || 1}
                </span>
              </div>
              <p className="text-[11px] text-on-surface-variant mt-1">
                {stats.auCount || 3} AU Coastal Region • {stats.svuCount || 1} SVU Rayalaseema
              </p>
            </div>
          </div>
        </div>

        {/* State Centralized Directorate Verification Banner */}
        <div className="bg-surface-container-low rounded-xl p-space-md border border-outline-variant/30 flex flex-col lg:flex-row items-center justify-between gap-space-md">
          <div className="flex items-center gap-space-md">
            <div className="w-11 h-11 rounded-xl bg-primary text-on-primary flex items-center justify-center shrink-0 shadow-sm">
              <span className="material-symbols-outlined text-[24px]">verified</span>
            </div>
            <div>
              <h2 className="text-xs font-bold text-on-surface">State Centralized Directorate Verification</h2>
              <p className="text-[11px] text-on-surface-variant">
                All 4 constituent campuses operate under unified 6-Year Integrated B.Tech curricula with synchronized academic term schedules.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-space-sm shrink-0">
            <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Central Sync:</span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] bg-tertiary-fixed/30 text-on-tertiary-fixed-variant font-semibold border border-tertiary-fixed/50">
              <span className="w-2 h-2 rounded-full bg-tertiary-container animate-pulse"></span>
              Connected • 4/4 Online
            </span>
          </div>
        </div>

        {/* Table Card Section */}
        <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/30 overflow-hidden flex flex-col">
          {/* Table Search & Filter Bar */}
          <div className="p-space-md bg-surface-container-lowest border-b border-outline-variant/30 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-space-md">
            {/* Search Input */}
            <div className="relative flex-1 max-w-lg">
              <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-outline text-[18px]">
                search
              </span>
              <input
                className="w-full pl-10 pr-4 py-2 bg-surface-container-low text-on-surface placeholder:text-on-surface-variant/70 border border-outline-variant/30 rounded-xl text-xs focus:bg-surface-container-lowest focus:border-primary focus:outline-none transition-all"
                placeholder="Search campus name, code, district, or email..."
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Region and Status Filters */}
            <div className="flex flex-wrap items-center gap-space-sm">
              <div className="relative">
                <select
                  className="appearance-none bg-surface-container-low text-on-surface pl-3.5 pr-8 py-2 rounded-xl text-xs font-medium border border-outline-variant/30 cursor-pointer focus:outline-none"
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                >
                  <option value="all">All Regions (4)</option>
                  <option value="AU">Andhra University (AU)</option>
                  <option value="SVU">Sri Venkateswara (SVU)</option>
                </select>
                <span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none text-[18px]">
                  expand_more
                </span>
              </div>

              <div className="relative">
                <select
                  className="appearance-none bg-surface-container-low text-on-surface pl-3.5 pr-8 py-2 rounded-xl text-xs font-medium border border-outline-variant/30 cursor-pointer focus:outline-none"
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                >
                  <option value="all">Status: All</option>
                  <option value="active">Active Only</option>
                  <option value="inactive">Inactive</option>
                </select>
                <span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none text-[18px]">
                  expand_more
                </span>
              </div>

              {/* Action Toolbar */}
              <div className="flex items-center gap-1 bg-surface-container-low p-1 rounded-xl border border-outline-variant/30">
                <button
                  onClick={loadData}
                  className="p-1.5 hover:bg-surface-container-lowest rounded-lg text-on-surface-variant hover:text-on-surface transition-all"
                  title="Refresh Table"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px]">refresh</span>
                </button>
              </div>
            </div>
          </div>

          {/* AG Grid Table Container */}
          <div className="ag-theme-quartz w-full" style={{ height: '340px' }}>
            <AgGridReact
              rowData={campuses}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
              rowHeight={56}
              headerHeight={44}
              animateRows={true}
              pagination={true}
              paginationPageSize={10}
              overlayLoadingTemplate={
                '<div class="flex items-center gap-2 p-3"><span class="material-symbols-outlined animate-spin text-primary">autorenew</span><span>Loading RGUKT constituent campuses...</span></div>'
              }
              overlayNoRowsTemplate={
                '<div class="p-6 text-center text-xs text-on-surface-variant">No campuses match your search filter criteria.</div>'
              }
            />
          </div>

          {/* Footer Summary */}
          <div className="p-space-md bg-surface-container-low border-t border-outline-variant/30 flex items-center justify-between text-xs text-on-surface-variant">
            <span>
              Showing <strong className="text-on-surface font-mono">{campuses.length}</strong> of{' '}
              <strong className="text-on-surface font-mono">{stats.totalCampuses || 4}</strong> constituent campuses
            </span>
            <span className="font-mono text-[11px]">RGUKT Centralized Governance Node • AP Act 18 of 2008</span>
          </div>
        </div>

        {/* Campus Physical Geo Locations Visual Banner */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter pt-2">
          {/* Nuzvid */}
          <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm border border-outline-variant/30 space-y-3">
            <div className="relative w-full h-28 rounded-lg overflow-hidden bg-primary-container flex items-end p-2.5">
              <span className="text-white text-xs font-bold">🏛️ IIIT Nuzvid Campus (HQ Hub)</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-on-surface-variant">Campus Area</span>
              <span className="font-mono text-on-surface font-semibold">280 Acres</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-on-surface-variant">Annual Intake</span>
              <span className="font-mono text-on-surface font-semibold">1,100 / Yr</span>
            </div>
          </div>

          {/* RK Valley */}
          <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm border border-outline-variant/30 space-y-3">
            <div className="relative w-full h-28 rounded-lg overflow-hidden bg-secondary flex items-end p-2.5">
              <span className="text-white text-xs font-bold">🏛️ IIIT RK Valley (Idupulapaya)</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-on-surface-variant">Campus Area</span>
              <span className="font-mono text-on-surface font-semibold">330 Acres</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-on-surface-variant">Annual Intake</span>
              <span className="font-mono text-on-surface font-semibold">1,100 / Yr</span>
            </div>
          </div>

          {/* Ongole */}
          <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm border border-outline-variant/30 space-y-3">
            <div className="relative w-full h-28 rounded-lg overflow-hidden bg-secondary-fixed flex items-end p-2.5">
              <span className="text-primary text-xs font-bold">🏛️ IIIT Ongole Campus</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-on-surface-variant">Campus Area</span>
              <span className="font-mono text-on-surface font-semibold">85 Acres</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-on-surface-variant">Annual Intake</span>
              <span className="font-mono text-on-surface font-semibold">1,100 / Yr</span>
            </div>
          </div>

          {/* Srikakulam */}
          <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm border border-outline-variant/30 space-y-3">
            <div className="relative w-full h-28 rounded-lg overflow-hidden bg-surface-variant flex items-end p-2.5">
              <span className="text-primary text-xs font-bold">🏛️ IIIT Srikakulam (Etcherla)</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-on-surface-variant">Campus Area</span>
              <span className="font-mono text-on-surface font-semibold">120 Acres</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-on-surface-variant">Annual Intake</span>
              <span className="font-mono text-on-surface font-semibold">1,100 / Yr</span>
            </div>
          </div>
        </div>
      </div>

      {/* Add / Edit Campus Modal */}
      <CampusFormModal
        isOpen={formModalOpen}
        onClose={() => setFormModalOpen(false)}
        initialData={editingCampus}
      />

      {/* View Campus Side Drawer */}
      <CampusDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        campus={viewingCampus}
        onEdit={(campus) => handleOpenEditModal(campus)}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        campus={deletingCampus}
      />

      {/* Toast Notification Alert */}
      {toastMessage && (
        <div
          className={`fixed bottom-6 right-6 z-50 px-4 py-3 rounded-lg shadow-xl flex items-center gap-2 text-xs font-medium animate-in fade-in slide-in-from-bottom-3 duration-200 ${
            toastMessage.type === 'success'
              ? 'bg-inverse-surface text-inverse-on-surface'
              : 'bg-error text-on-error'
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">
            {toastMessage.type === 'success' ? 'check_circle' : 'error'}
          </span>
          <span>{toastMessage.text}</span>
        </div>
      )}
    </div>
  );
}

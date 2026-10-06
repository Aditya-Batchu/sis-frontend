import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCampus, updateCampus } from '../../Redux/slices/campusSlice';

export default function CampusFormModal({ isOpen, onClose, initialData = null }) {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.campuses);

  const [formData, setFormData] = useState({
    name: '',
    code: '',
    region: 'AU',
    district: 'Eluru',
    address: '',
    contactEmail: '',
    contactPhone: '',
    directorName: '',
    aoEmail: '',
    deanAcademicsEmail: '',
    coeEmail: '',
    establishedYear: 2008,
    annualIntake: 1100,
    currentStrength: 7200,
    landAreaAcres: 100,
    status: 'Active',
  });

  const [validationError, setValidationError] = useState('');

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        code: initialData.code || '',
        region: initialData.region || 'AU',
        district: initialData.district || 'Eluru',
        address: initialData.address || '',
        contactEmail: initialData.contactEmail || '',
        contactPhone: initialData.contactPhone || '',
        directorName: initialData.directorName || '',
        aoEmail: initialData.aoEmail || '',
        deanAcademicsEmail: initialData.deanAcademicsEmail || '',
        coeEmail: initialData.coeEmail || '',
        establishedYear: initialData.establishedYear || 2008,
        annualIntake: initialData.annualIntake || 1100,
        currentStrength: initialData.currentStrength || 7200,
        landAreaAcres: initialData.landAreaAcres || 100,
        status: initialData.status || 'Active',
      });
    } else {
      setFormData({
        name: '',
        code: '',
        region: 'AU',
        district: 'Eluru',
        address: '',
        contactEmail: '',
        contactPhone: '',
        directorName: '',
        aoEmail: '',
        deanAcademicsEmail: '',
        coeEmail: '',
        establishedYear: 2008,
        annualIntake: 1100,
        currentStrength: 7200,
        landAreaAcres: 100,
        status: 'Active',
      });
    }
    setValidationError('');
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'code' ? value.toUpperCase() : value,
    }));
  };

  const handleStatusToggle = (e) => {
    setFormData((prev) => ({
      ...prev,
      status: e.target.checked ? 'Active' : 'Inactive',
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationError('');

    if (!formData.name.trim() || !formData.code.trim() || !formData.contactEmail.trim() || !formData.district.trim()) {
      setValidationError('Please complete all mandatory fields (*)');
      return;
    }

    try {
      if (initialData?._id) {
        await dispatch(updateCampus({ id: initialData._id, data: formData })).unwrap();
      } else {
        await dispatch(addCampus(formData)).unwrap();
      }
      onClose();
    } catch (err) {
      setValidationError(err.message || 'Operation failed');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-space-md bg-inverse-surface/60 backdrop-blur-sm transition-all duration-200">
      <div
        role="dialog"
        aria-modal="true"
        className="bg-surface-container-lowest rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-150"
      >
        {/* Modal Header */}
        <div className="p-space-lg bg-surface-container-low flex items-start justify-between border-b border-outline-variant/30">
          <div className="flex items-start gap-space-md">
            <div className="w-11 h-11 rounded-xl bg-primary-container text-on-primary flex items-center justify-center shadow-sm shrink-0 mt-0.5">
              <span className="material-symbols-outlined text-[24px]">account_balance</span>
            </div>
            <div>
              <h2 className="text-lg font-bold text-on-surface tracking-tight leading-snug">
                {initialData ? 'Edit Constituent Campus' : 'Add New Constituent Campus'}
              </h2>
              <p className="text-xs text-on-surface-variant mt-0.5">
                Register or configure an RGUKT campus under AP State University Act (Act 18 of 2008).
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="p-1.5 text-secondary hover:text-on-surface rounded-lg bg-surface-container-highest/60 hover:bg-surface-container-highest transition-colors"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px] block">close</span>
          </button>
        </div>

        {/* Validation Alert */}
        {validationError && (
          <div className="mx-space-lg mt-space-md p-3 bg-error-container text-on-error-container text-xs rounded-lg flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px] text-error">error</span>
            <span>{validationError}</span>
          </div>
        )}

        {/* Modal Form Body */}
        <form onSubmit={handleSubmit} id="campusSetupForm" className="overflow-y-auto p-space-lg space-y-space-md flex-1">
          {/* Campus Name & Code */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-md">
            <div className="sm:col-span-2 space-y-1.5">
              <label className="block text-xs font-semibold text-on-surface" htmlFor="campusName">
                Campus Name <span className="text-error">*</span>
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-secondary text-[18px]">
                  domain
                </span>
                <input
                  id="campusName"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. IIIT Nuzvid"
                  required
                  type="text"
                  className="w-full pl-9 pr-3 h-10 bg-surface-container-low focus:bg-surface-container-lowest border border-outline-variant/30 focus:border-primary rounded-lg text-xs text-on-surface focus:outline-none transition-colors"
                />
              </div>
              <p className="text-[11px] text-on-surface-variant">Statutory name recognized by AP Higher Education Council.</p>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-on-surface" htmlFor="campusCode">
                Campus Code <span className="text-error">*</span>
              </label>
              <input
                id="campusCode"
                name="code"
                value={formData.code}
                onChange={handleChange}
                maxLength={4}
                placeholder="NUZ"
                required
                type="text"
                className="w-full px-3 h-10 bg-surface-container-low focus:bg-surface-container-lowest border border-outline-variant/30 focus:border-primary rounded-lg font-mono uppercase tracking-wider text-on-surface text-center text-xs focus:outline-none transition-colors"
              />
              <p className="text-[11px] text-on-surface-variant text-center">3-char code</p>
            </div>
          </div>

          {/* Regional Jurisdiction Selection Cards */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-on-surface">
              Regional Jurisdiction <span className="text-error">*</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm">
              <label
                onClick={() => setFormData((prev) => ({ ...prev, region: 'AU' }))}
                className={`cursor-pointer relative p-space-md rounded-xl transition-all flex flex-col gap-1.5 border ${
                  formData.region === 'AU'
                    ? 'bg-surface-container-high border-primary text-primary font-semibold'
                    : 'bg-surface-container-low border-outline-variant/30 opacity-80'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-semibold ${formData.region === 'AU' ? 'text-primary' : 'text-on-surface'}`}>
                    Andhra University (AU)
                  </span>
                  <input
                    type="radio"
                    name="region"
                    value="AU"
                    checked={formData.region === 'AU'}
                    onChange={handleChange}
                    className="accent-primary w-4 h-4"
                  />
                </div>
                <span className="inline-block self-start px-2 py-0.5 rounded-full text-[10px] font-semibold bg-secondary-container text-on-secondary-fixed">
                  85% AU Quota
                </span>
                <p className="text-[11px] text-on-surface-variant leading-snug">
                  Coastal & North Andhra districts reservation jurisdiction.
                </p>
              </label>

              <label
                onClick={() => setFormData((prev) => ({ ...prev, region: 'SVU' }))}
                className={`cursor-pointer relative p-space-md rounded-xl transition-all flex flex-col gap-1.5 border ${
                  formData.region === 'SVU'
                    ? 'bg-surface-container-high border-primary text-primary font-semibold'
                    : 'bg-surface-container-low border-outline-variant/30 opacity-80'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-semibold ${formData.region === 'SVU' ? 'text-primary' : 'text-on-surface'}`}>
                    Sri Venkateswara Univ (SVU)
                  </span>
                  <input
                    type="radio"
                    name="region"
                    value="SVU"
                    checked={formData.region === 'SVU'}
                    onChange={handleChange}
                    className="accent-primary w-4 h-4"
                  />
                </div>
                <span className="inline-block self-start px-2 py-0.5 rounded-full text-[10px] font-semibold bg-surface-container-highest text-on-surface-variant">
                  85% SVU Quota
                </span>
                <p className="text-[11px] text-on-surface-variant leading-snug">
                  Rayalaseema & South coastal districts reservation jurisdiction.
                </p>
              </label>
            </div>
          </div>

          {/* District & Admin Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-on-surface" htmlFor="district">
                District Location <span className="text-error">*</span>
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-secondary text-[18px]">
                  location_on
                </span>
                <select
                  id="district"
                  name="district"
                  value={formData.district}
                  onChange={handleChange}
                  required
                  className="w-full pl-9 pr-8 h-10 bg-surface-container-low focus:bg-surface-container-lowest border border-outline-variant/30 focus:border-primary rounded-lg text-xs text-on-surface focus:outline-none appearance-none cursor-pointer"
                >
                  <option value="Eluru">Eluru District</option>
                  <option value="YSR Kadapa">YSR Kadapa District</option>
                  <option value="Prakasam">Prakasam District</option>
                  <option value="Srikakulam">Srikakulam District</option>
                  <option value="Visakhapatnam">Visakhapatnam District</option>
                  <option value="Guntur">Guntur District</option>
                  <option value="Tirupati">Tirupati District</option>
                  <option value="Krishna">Krishna District</option>
                </select>
                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-secondary text-[18px] pointer-events-none">
                  expand_more
                </span>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-on-surface" htmlFor="contactEmail">
                Director / Admin Email <span className="text-error">*</span>
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-secondary text-[18px]">
                  mail
                </span>
                <input
                  id="contactEmail"
                  name="contactEmail"
                  value={formData.contactEmail}
                  onChange={handleChange}
                  placeholder="director@rgukt.ac.in"
                  required
                  type="email"
                  className="w-full pl-9 pr-3 h-10 bg-surface-container-low focus:bg-surface-container-lowest border border-outline-variant/30 focus:border-primary rounded-lg text-xs text-on-surface focus:outline-none transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Physical Address */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-on-surface" htmlFor="address">
              Campus Address / Postal Landmark
            </label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows={2}
              placeholder="Permanent campus premises, Mandal, Postal Code"
              className="w-full p-2.5 bg-surface-container-low focus:bg-surface-container-lowest border border-outline-variant/30 focus:border-primary rounded-lg text-xs text-on-surface focus:outline-none resize-none transition-colors"
            />
          </div>

          {/* Contact Phone & Status Toggle */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md items-center">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-on-surface" htmlFor="contactPhone">
                Landline / Phone Number
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-secondary text-[18px]">
                  call
                </span>
                <input
                  id="contactPhone"
                  name="contactPhone"
                  value={formData.contactPhone}
                  onChange={handleChange}
                  placeholder="+91 8656-235855"
                  type="tel"
                  className="w-full pl-9 pr-3 h-10 bg-surface-container-low focus:bg-surface-container-lowest border border-outline-variant/30 focus:border-primary rounded-lg text-xs text-on-surface focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div className="bg-surface-container-low p-2.5 rounded-lg border border-outline-variant/30 flex items-center justify-between mt-1 sm:mt-5">
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-on-surface">Campus Operational Status</span>
                <span className="text-[11px] text-on-surface-variant">Active for admissions & allocations</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.status === 'Active'}
                  onChange={handleStatusToggle}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          </div>

          {/* Informational banner */}
          <div className="p-space-sm bg-tertiary-fixed/30 rounded-lg flex items-center gap-space-sm text-tertiary-container border border-tertiary-fixed/50">
            <span className="material-symbols-outlined text-[20px] text-tertiary shrink-0">verified_user</span>
            <span className="text-[11px] text-on-surface">
              The centralized counseling engine will index this constituent node under the statewide allocation pipeline.
            </span>
          </div>
        </form>

        {/* Modal Footer */}
        <div className="p-space-md bg-surface-container-low flex flex-col sm:flex-row sm:items-center justify-between gap-space-md border-t border-outline-variant/30">
          <div className="flex items-center gap-space-xs text-secondary text-[11px]">
            <span className="material-symbols-outlined text-[16px] text-secondary">history</span>
            <span>Audited under RGUKT central governance registry.</span>
          </div>

          <div className="flex items-center justify-end gap-space-sm">
            <button
              onClick={onClose}
              className="px-space-md py-2 bg-surface-container-lowest text-on-surface hover:bg-surface-container-high rounded-lg text-xs font-semibold shadow-sm transition-colors border border-outline-variant/30"
              type="button"
            >
              Cancel
            </button>
            <button
              form="campusSetupForm"
              type="submit"
              disabled={loading}
              className="flex items-center gap-space-xs px-space-lg py-2 bg-primary hover:bg-primary-container text-on-primary rounded-lg text-xs font-semibold shadow-sm transition-colors disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-[18px]">save</span>
              <span>{loading ? 'Saving...' : initialData ? 'Update Campus' : 'Save Campus'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

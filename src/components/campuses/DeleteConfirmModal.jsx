import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCampus } from '../../Redux/slices/campusSlice';

export default function DeleteConfirmModal({ isOpen, onClose, campus }) {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.campuses);

  if (!isOpen || !campus) return null;

  const handleDelete = async () => {
    try {
      await dispatch(deleteCampus(campus._id)).unwrap();
      onClose();
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-inverse-surface/60 backdrop-blur-sm transition-all duration-200">
      <div
        role="alertdialog"
        aria-modal="true"
        className="bg-surface-container-lowest rounded-xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-150"
      >
        <div className="p-6 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-error-container text-error flex items-center justify-center mx-auto">
            <span className="material-symbols-outlined text-[26px]">delete_forever</span>
          </div>

          <div className="space-y-1">
            <h3 className="text-base font-bold text-on-surface">Archive Campus Node?</h3>
            <p className="text-xs text-on-surface-variant">
              Are you sure you want to soft-delete/inactivate <strong className="text-on-surface">{campus.name} ({campus.code})</strong>?
              Existing student records and academic historical cohorts will be preserved.
            </p>
          </div>

          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              onClick={onClose}
              type="button"
              className="px-4 py-2 bg-surface-container-low hover:bg-surface-container text-on-surface rounded-lg text-xs font-semibold transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              disabled={loading}
              type="button"
              className="px-4 py-2 bg-error hover:bg-error/90 text-on-error rounded-lg text-xs font-semibold shadow-sm transition-colors disabled:opacity-50"
            >
              {loading ? 'Archiving...' : 'Yes, Archive Campus'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useState, useCallback, Suspense } from 'react';
import api from '@/lib/axios';
import { useLeases, LeaseDetailModal } from '@/features/dashboard';
import Pagination from '@/components/Pagination';

function fmtDate(dateStr) {
  if (!dateStr) return '—';
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(dateStr));
}

function fmtMoney(n) {
  if (n == null) return '—';
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);
}

function getStatusBadge(status, isExpired) {
  if (status === 'active' && !isExpired) return { label: 'Active', bg: '#dcfce7', color: '#15803d' };
  if (status === 'terminated') return { label: 'Terminated', bg: '#fee2e2', color: '#b91c1c' };
  if (status === 'expired' || isExpired) return { label: 'Expired', bg: '#fef3c7', color: '#b45309' };
  if (status === 'renewed') return { label: 'Renewed', bg: '#ede9fe', color: '#7c3aed' };
  return { label: status ? status.charAt(0).toUpperCase() + status.slice(1) : 'Unknown', bg: '#f1f5f9', color: '#475569' };
}

function TenantLeasesContent() {
  const { leases, meta, loading, error, changePage } = useLeases();
  const [showModal, setShowModal] = useState(false);
  const [selectedLease, setSelectedLease] = useState(null);
  const [modalLoading, setModalLoading] = useState(false);
  const [modalError, setModalError] = useState('');

  const openLeaseDetail = useCallback(async (leaseId) => {
    setModalLoading(true);
    setModalError('');
    setShowModal(true);
    try {
      const res = await api.get(`tenant/leases/${leaseId}`);
      setSelectedLease(res?.data || null);
    } catch (e) {
      console.error('Failed to fetch lease details:', e);
      setModalError(e?.message || 'Failed to load lease details.');
    } finally {
      setModalLoading(false);
    }
  }, []);

  return (
    <div className="p-6 lg:p-8 space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold" style={{ color: '#0f172a' }}>My Leases</h1>
        <p className="text-sm mt-1" style={{ color: '#64748b' }}>
          View and manage all your past and current lease agreements.
        </p>
      </div>

      {/* Error State */}
      {error && (
        <div
          className="flex items-center gap-3 p-4 rounded-xl text-sm font-medium"
          style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626' }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>error</span>
          <span>{error}</span>
        </div>
      )}

      {/* Main Grid Content */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-64 rounded-2xl bg-slate-100 animate-pulse border border-slate-200" />
          ))}
        </div>
      ) : leases.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-100 shadow-sm">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl" style={{ background: '#eef2ff' }}>
            <span className="material-symbols-outlined text-2xl" style={{ color: '#4f46e5' }}>description</span>
          </div>
          <p className="font-semibold text-lg" style={{ color: '#0f172a' }}>No lease agreements found</p>
          <p className="mt-1 text-sm max-w-sm mx-auto" style={{ color: '#64748b' }}>
            You do not currently have any active or previous leases registered under your account.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {leases.map((lease) => {
              const statusCfg = getStatusBadge(lease.status, lease.is_expired);
              const propName = lease.unit?.property_name || lease.unit?.property?.name || lease.property_name || 'Property';
              const unitNum = lease.unit?.unit_number || lease.unit_number || '—';

              return (
                <div
                  key={lease.id}
                  className="rounded-2xl p-6 flex flex-col justify-between transition-all hover:shadow-md bg-white border border-slate-100"
                  style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}
                >
                  <div className="space-y-4">
                    {/* Header: Icon + Name + Badge */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: '#eef2ff' }}>
                          <span className="material-symbols-outlined" style={{ fontSize: '20px', color: '#4f46e5' }}>description</span>
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-bold text-base truncate" style={{ color: '#0f172a' }}>{propName}</h3>
                          <p className="text-xs" style={{ color: '#94a3b8' }}>Unit {unitNum}</p>
                        </div>
                      </div>
                      <span
                        className="text-xs font-semibold px-2.5 py-1 rounded-full flex-shrink-0"
                        style={{ background: statusCfg.bg, color: statusCfg.color }}
                      >
                        {statusCfg.label}
                      </span>
                    </div>

                    {/* Rent & Frequency */}
                    <div className="p-3.5 rounded-xl grid grid-cols-2 gap-2" style={{ background: '#f8fafc', border: '1px solid #f1f5f9' }}>
                      <div>
                        <p className="text-xs" style={{ color: '#94a3b8' }}>Rent Amount</p>
                        <p className="text-base font-bold" style={{ color: '#0f172a' }}>{fmtMoney(lease.rent_amount)}</p>
                      </div>
                      <div>
                        <p className="text-xs" style={{ color: '#94a3b8' }}>Frequency</p>
                        <p className="text-base font-semibold capitalize" style={{ color: '#0f172a' }}>
                          {lease.payment_frequency ? lease.payment_frequency.replace('_', '-') : 'Monthly'}
                        </p>
                      </div>
                    </div>

                    {/* Dates */}
                    <div className="space-y-1.5 text-xs" style={{ color: '#64748b' }}>
                      <div className="flex justify-between">
                        <span>Start Date:</span>
                        <span className="font-medium text-slate-800">{fmtDate(lease.start_date)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>End Date:</span>
                        <span className="font-medium text-slate-800">{fmtDate(lease.end_date)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-6 pt-4 border-t border-slate-100">
                    <button
                      onClick={() => openLeaseDetail(lease.id)}
                      className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold transition-all"
                      style={{ background: '#eef2ff', color: '#4f46e5' }}
                    >
                      <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>visibility</span>
                      View Lease Details
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination */}
          {meta && meta.last_page > 1 && (
            <div className="flex justify-center mt-6">
              <Pagination meta={meta} onPageChange={changePage} />
            </div>
          )}
        </div>
      )}

      {/* Lease Detail Modal */}
      {showModal && (
        <LeaseDetailModal
          lease={selectedLease}
          loading={modalLoading}
          error={modalError}
          onClose={() => {
            setShowModal(false);
            setSelectedLease(null);
            setModalError('');
          }}
        />
      )}
    </div>
  );
}

export default function TenantLeasesPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-500 animate-pulse">Loading lease agreements...</div>}>
      <TenantLeasesContent />
    </Suspense>
  );
}

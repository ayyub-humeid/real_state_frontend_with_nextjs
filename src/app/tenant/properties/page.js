'use client';

import { useState, useCallback, Suspense, useMemo } from 'react';
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

function TenantPropertiesContent() {
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

  // Group leases by property
  const propertiesGrouped = useMemo(() => {
    const map = {};
    leases.forEach((lease) => {
      const name = lease.unit?.property_name || lease.unit?.property?.name || lease.property_name || 'Property';
      if (!map[name]) {
        map[name] = {
          name,
          leases: [],
        };
      }
      map[name].leases.push(lease);
    });
    return Object.values(map);
  }, [leases]);

  return (
    <div className="p-6 lg:p-8 space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold" style={{ color: '#0f172a' }}>My Properties</h1>
        <p className="text-sm mt-1" style={{ color: '#64748b' }}>
          Overview of properties and units associated with your lease agreements.
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2].map((i) => (
            <div key={i} className="h-72 rounded-2xl bg-slate-100 animate-pulse border border-slate-200" />
          ))}
        </div>
      ) : propertiesGrouped.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-100 shadow-sm">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl" style={{ background: '#eef2ff' }}>
            <span className="material-symbols-outlined text-2xl" style={{ color: '#4f46e5' }}>apartment</span>
          </div>
          <p className="font-semibold text-lg" style={{ color: '#0f172a' }}>No properties found</p>
          <p className="mt-1 text-sm max-w-sm mx-auto" style={{ color: '#64748b' }}>
            You do not currently have any rented properties linked to your account.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {propertiesGrouped.map((prop) => (
              <div
                key={prop.name}
                className="rounded-2xl bg-white border border-slate-100 overflow-hidden flex flex-col justify-between"
                style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}
              >
                <div>
                  {/* Property Header */}
                  <div className="p-6 border-b border-slate-100 flex items-center justify-between" style={{ background: '#fafafa' }}>
                    <div className="flex items-center gap-3.5">
                      <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: '#eef2ff' }}>
                        <span className="material-symbols-outlined" style={{ fontSize: '24px', color: '#4f46e5' }}>apartment</span>
                      </div>
                      <div>
                        <h2 className="font-bold text-lg" style={{ color: '#0f172a' }}>{prop.name}</h2>
                        <p className="text-xs" style={{ color: '#64748b' }}>
                          {prop.leases.length} {prop.leases.length === 1 ? 'associated unit lease' : 'associated unit leases'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Units List */}
                  <div className="p-6 space-y-4">
                    {prop.leases.map((lease) => {
                      const statusCfg = getStatusBadge(lease.status, lease.is_expired);
                      const unitNum = lease.unit?.unit_number || lease.unit_number || '—';

                      return (
                        <div
                          key={lease.id}
                          className="p-4 rounded-xl border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                          style={{ background: '#f8fafc' }}
                        >
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-sm" style={{ color: '#0f172a' }}>Unit {unitNum}</span>
                              <span
                                className="text-[11px] font-semibold px-2 py-0.5 rounded-full"
                                style={{ background: statusCfg.bg, color: statusCfg.color }}
                              >
                                {statusCfg.label}
                              </span>
                            </div>
                            <p className="text-xs" style={{ color: '#64748b' }}>
                              Rent: <span className="font-semibold text-slate-800">{fmtMoney(lease.rent_amount)}</span> / month
                            </p>
                            <p className="text-[11px]" style={{ color: '#94a3b8' }}>
                              {fmtDate(lease.start_date)} → {fmtDate(lease.end_date)}
                            </p>
                          </div>

                          <button
                            onClick={() => openLeaseDetail(lease.id)}
                            className="px-3.5 py-2 rounded-lg text-xs font-semibold self-start sm:self-center transition-all hover:bg-indigo-100"
                            style={{ background: '#eef2ff', color: '#4f46e5' }}
                          >
                            Lease Info
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
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

export default function TenantPropertiesPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-500 animate-pulse">Loading property details...</div>}>
      <TenantPropertiesContent />
    </Suspense>
  );
}

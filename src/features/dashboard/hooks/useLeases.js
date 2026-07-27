import { useState, useEffect, useCallback } from 'react';
import { dashboardApi } from '../api';

export function useLeases() {
  const [leases, setLeases] = useState([]);
  const [meta, setMeta] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  const fetchLeases = useCallback(async (currentPage) => {
    setLoading(true);
    setError(null);
    try {
      const response = await dashboardApi.fetchTenantLeases(currentPage);
      setLeases(response.data || []);
      setMeta(response.meta || null);
    } catch (err) {
      setError(err?.message || 'Failed to fetch leases.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLeases(page);
  }, [fetchLeases, page]);

  const changePage = (newPage) => {
    if (newPage > 0 && (!meta || newPage <= meta.last_page)) {
      setPage(newPage);
    }
  };

  return { leases, meta, loading, error, page, changePage, refetch: () => fetchLeases(page) };
}

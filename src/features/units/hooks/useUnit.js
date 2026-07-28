import { useState, useEffect } from 'react';
import { UnitsApi } from '../api';

export const useUnit = (id) => {
    const [unit, setUnit] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!id || id === 'undefined' || id === 'null') {
            setLoading(false);
            setError('Invalid unit ID');
            return;
        }

        const fetchUnitData = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await UnitsApi.getById(id);
                
                let unitData = response;
                if (response && typeof response === 'object') {
                    if (response.data) {
                        unitData = response.data.data || response.data;
                    }
                }

                if (!unitData || typeof unitData !== 'object' || Array.isArray(unitData)) {
                    setError('Unit not found');
                    setUnit(null);
                } else {
                    setUnit(unitData);
                }
            } catch (err) {
                setError(err.message || 'Failed to fetch unit details');
            } finally {
                setLoading(false);
            }
        };

        fetchUnitData();
    }, [id]);

    return { unit, loading, error };
};


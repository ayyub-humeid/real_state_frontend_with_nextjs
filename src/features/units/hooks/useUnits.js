import { useState, useEffect } from 'react';
import { UnitsApi } from '../api';

export const useUnits = () => {
    const [units, setUnits] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUnitsData = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await UnitsApi.getFeatured();
                
                let fetchedUnits = [];
                if (Array.isArray(response)) {
                    fetchedUnits = response;
                } else if (Array.isArray(response?.data)) {
                    fetchedUnits = response.data;
                } else if (Array.isArray(response?.data?.data)) {
                    fetchedUnits = response.data.data;
                }
                
                setUnits(fetchedUnits);
            } catch (err) {
                setError(err.message || 'Failed to fetch units');
            } finally {
                setLoading(false);
            }
        };

        fetchUnitsData();
    }, []);

    return { units, loading, error };
};
import { useState, useEffect } from 'react';
import { UnitsApi } from '../api';

export const useUnits = () => {
    const [units, setUnits] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUnitsData = async() => {
            try {
                setLoading(true);
                setError(null);
                const response = await UnitsApi.getFeatured();
                setUnits(response.data || response);
                console.log(response);
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
import { useState, useEffect } from 'react';
import { fetchPlanDetails } from '../api';

const mapFeatures = (features) => {
    if (!features) return [];
    const list = [];
    if (features.max_units) list.push(`Up to ${features.max_units} Units`);
    if (features.max_properties) list.push(`Up to ${features.max_properties} Properties`);
    if (features.max_users) list.push(`Up to ${features.max_users} Users`);
    if (features.max_employees) list.push(`Up to ${features.max_employees} Employees`);
    if (features.accounting) list.push('Advanced Accounting');
    if (features.export_data) list.push('Data Exporting');
    if (features.rental_requests) list.push('Rental Requests Management');
    if (features.advanced_reports) list.push('Advanced Reporting');
    if (features.expense_tracking) list.push('Expense Tracking');
    if (features.document_management) list.push('Document Management');
    if (features.maintenance_tracking) list.push('Maintenance Tracking');
    return list;
};

export const usePlanDetails = (slug) => {
    const [plan, setPlan] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!slug) return;
        
        let isMounted = true;
        setLoading(true);

        fetchPlanDetails(slug)
            .then((response) => {
                if (isMounted) {
                    const data = response.data; // Handle unwrapped or wrapped axios responses
                    
                    // Map the backend payload to the frontend plan object structure expected by CheckoutView
                    const mappedPlan = {
                        ...data,
                        name: data.name,
                        billingCycle: data.billing_cycle === 'monthly' ? 'Billed monthly' : 'Billed annually',
                        price: parseFloat(data.price),
                        features: mapFeatures(data.features)
                    };
                    
                    setPlan(mappedPlan);
                    setError(null);
                }
            })
            .catch((err) => {
                if (isMounted) setError(err);
            })
            .finally(() => {
                if (isMounted) setLoading(false);
            });

        return () => {
            isMounted = false;
        };
    }, [slug]);

    return { plan, loading, error };
};

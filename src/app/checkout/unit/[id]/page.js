'use client';

import { use } from 'react';
import { UnitCheckoutView } from '../../../../features/checkout/components/UnitCheckoutView';
import { useUnit } from '../../../../features/units/hooks/useUnit';
import { Loading } from '@/components/Loading';
import { Error as ErrorComponent } from '@/components/Error';

export default function UnitCheckoutPage({ params }) {
    // In Next.js App Router (Next 15+), params is a Promise that must be unwrapped
    const resolvedParams = use(params);
    const unitId = resolvedParams.id;

    const { unit, loading, error } = useUnit(unitId);

    if (loading) {
        return <Loading message="Loading unit details…" />;
    }

    if (error || !unit) {
        return <ErrorComponent message="Unit not found or could not be loaded." />;
    }

    return <UnitCheckoutView unit={unit} />;
}

'use client';

import { use } from 'react';
import { CheckoutView } from '../../../features/checkout/components/CheckoutView';
import { usePlanDetails } from '../../../features/checkout/hooks/usePlanDetails';
import { Loading } from '@/components/Loading';
import { Error as ErrorComponent } from '@/components/Error';

export default function CheckoutPage({ params }) {
    // In Next.js App Router (Next 15+), params acts as a Promise that must be unwrapped
    const resolvedParams = use(params);
    const slug = resolvedParams.plan;
    console.log(`slug ::::::::::::::::::::: ${slug}`)
    
    const { plan, loading, error } = usePlanDetails(slug);

    if (loading) {
        return (
            <Loading message={'loading Plan'}/>
        );
    }

    if (error || !plan) {
        return (
          <ErrorComponent message={'Plan'}/>
        );
    }

    return <CheckoutView plan={plan} />;
}

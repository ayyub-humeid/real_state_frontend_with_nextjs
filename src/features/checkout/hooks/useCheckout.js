'use client';
import { useState } from 'react';
import { createCheckoutSession, createLeaseCheckoutSession } from '../api';

/**
 * useCheckout — handles calling the Laravel checkout API
 * and redirecting to Stripe's hosted checkout page.
 */
export const useCheckout = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const redirectToStripe = async (planId) => {
        setLoading(true);
        setError(null);
        try {
            const response = await createCheckoutSession(planId);
            if (response?.success && response?.url) {
                // Hard redirect to Stripe hosted checkout
                window.location.href = response.url;
            } else {
                setError(response?.message || 'Could not create checkout session. Please try again.');
            }
        } catch (err) {
            setError(err?.message || 'Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const redirectToLeaseStripe = async (unitId) => {
        setLoading(true);
        setError(null);
        try {
            const response = await createLeaseCheckoutSession(unitId);
            if (response?.success && response?.url) {
                window.location.href = response.url;
            } else {
                setError(response?.message || 'Could not create lease checkout session. Please try again.');
            }
        } catch (err) {
            setError(err?.message || 'Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return { redirectToStripe, redirectToLeaseStripe, loading, error };
};


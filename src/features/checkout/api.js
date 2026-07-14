import api from '@/lib/axios';

export const fetchPlanDetails = async (slug) => {
    return api.get(`plans/${slug}`);
};

/**
 * Creates a Stripe Checkout Session for the given plan.
 * Requires the user to be authenticated (Bearer token in localStorage).
 * Returns { success, url } on success.
 */
export const createCheckoutSession = async (planId) => {
    return api.post('checkout/session', { plan_id: planId });
};

/**
 * Creates a one-time Stripe Checkout Session for renting a unit.
 * Requires the user to be authenticated.
 * Returns { success, url } on success.
 */
export const createLeaseCheckoutSession = async (unitId) => {
    return api.post('checkout/lease-session', { unit_id: unitId });
};


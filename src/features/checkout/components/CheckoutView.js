'use client';
import React, { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { PlanDetails } from './PlanDetails';
import { StepIndicator } from './StepIndicator';
import { UnauthStep } from './UnauthStep';
import { CheckoutPaymentStep } from './CheckoutPaymentStep';
import { useCheckout } from '../hooks/useCheckout';

/**
 * CheckoutView — multi-step checkout wizard.
 *
 * Step logic:
 *  - Not authenticated → currentStep = 1 (UnauthStep: login/register redirect)
 *  - Authenticated     → currentStep = 2 (CheckoutPaymentStep: plan review + Stripe)
 *
 * The step indicator shows 3 steps: Account → Plan Review → Payment.
 * When authenticated, steps 1 & 2 are shown as "before current" (green) and
 * the user lands directly on step 2.
 */
export const CheckoutView = ({ plan }) => {
    const { isAuthenticated, loading: authLoading } = useAuth();
    const { redirectToStripe, loading: paying, error: payError } = useCheckout();

    // returnUrl for unauthenticated users to come back after login/register
    const returnUrl = typeof window !== 'undefined' ? window.location.pathname : '';

    if (!plan) {
        return (
            <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <p style={{ color: '#94a3b8', fontSize: '1.1rem' }}>No plan selected.</p>
            </div>
        );
    }

    // While auth is still being resolved, show a subtle loading state
    if (authLoading) {
        return (
            <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{
                    width: 40, height: 40,
                    border: '3px solid #e2e8f0',
                    borderTopColor: '#4f46e5',
                    borderRadius: '50%',
                    animation: 'spin 0.8s linear infinite',
                }} />
                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </div>
        );
    }

    // Determine current step for the progress indicator:
    //   - unauthenticated → step 1 (account)
    //   - authenticated   → step 2 (plan review / payment)
    const currentStep = isAuthenticated ? 2 : 1;

    return (
        <div style={{ background: '#f7f9fb', minHeight: 'calc(100vh - 64px)' }}>
            <main style={{
                maxWidth: 1200,
                margin: '0 auto',
                padding: '3rem 1.5rem 5rem',
            }}>
                {/* Page heading */}
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a', marginBottom: 8 }}>
                        {isAuthenticated ? 'Complete Your Subscription' : 'Get Started with ' + plan.name}
                    </h1>
                    <p style={{ color: '#64748b', fontSize: '1rem' }}>
                        {isAuthenticated
                            ? 'Review your plan and proceed to secure payment.'
                            : 'Sign in or create an account to subscribe.'}
                    </p>
                </div>

                {/* Step indicator */}
                <StepIndicator currentStep={currentStep} isAuthenticated={isAuthenticated} />

                {/* Two-column grid: left = plan details, right = step content */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '2rem',
                    alignItems: 'start',
                }}>
                    {/* Left: Plan details sidebar */}
                    <PlanDetails plan={plan} />

                    {/* Right: step-dependent content */}
                    <div>
                        {isAuthenticated ? (
                            <CheckoutPaymentStep
                                plan={plan}
                                onPay={redirectToStripe}
                                loading={paying}
                                error={payError}
                            />
                        ) : (
                            <UnauthStep returnUrl={returnUrl} />
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

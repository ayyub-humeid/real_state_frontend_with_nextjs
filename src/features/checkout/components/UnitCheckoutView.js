'use client';
import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { UnitDetailsSidebar } from './UnitDetailsSidebar';
import { StepIndicator } from './StepIndicator';
import { UnitCheckoutPaymentStep } from './UnitCheckoutPaymentStep';
import { useCheckout } from '../hooks/useCheckout';

/**
 * UnauthStep tailored for tenant lease checkout.
 * Directs user to login (as tenant) or register as tenant.
 */
const TenantUnauthStep = ({ returnUrl }) => {
    const saveReturnUrl = () => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('auth_return_url', returnUrl);
        }
    };

    return (
        <div style={{
            background: '#fff',
            borderRadius: 20,
            padding: '2.5rem',
            boxShadow: '0 8px 40px rgba(0,0,0,0.08)',
            border: '1px solid #e2e8f0',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
        }}>
            {/* Icon */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{
                    width: 72, height: 72, borderRadius: '50%',
                    background: 'linear-gradient(135deg, #f0fdf4, #dcfce7)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 4px 16px rgba(16,185,129,0.15)',
                }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 36, color: '#10b981', fontVariationSettings: "'FILL' 1" }}>
                        home_work
                    </span>
                </div>
            </div>

            {/* Text */}
            <div style={{ textAlign: 'center' }}>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#0f172a', marginBottom: 8 }}>
                    Sign in to continue
                </h3>
                <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: 1.6 }}>
                    You need a tenant account to apply for a lease.<br />
                    Already registered? Log in and come straight back here.
                </p>
            </div>

            <div style={{ height: 1, background: '#f1f5f9' }} />

            {/* Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <Link
                    href="/login"
                    onClick={saveReturnUrl}
                    id="lease-checkout-login-btn"
                    style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                        padding: '0.9rem 1.5rem',
                        borderRadius: 12,
                        background: 'linear-gradient(135deg, #16a34a, #10b981)',
                        color: '#fff',
                        fontWeight: 700, fontSize: '0.95rem',
                        textDecoration: 'none',
                        boxShadow: '0 4px 16px rgba(16,185,129,0.35)',
                        transition: 'opacity 0.2s',
                    }}
                >
                    <span className="material-symbols-outlined" style={{ fontSize: 20 }}>login</span>
                    Log In as Tenant
                </Link>

                <Link
                    href={`/register?role=tenant&returnUrl=${encodeURIComponent(returnUrl)}`}
                    onClick={saveReturnUrl}
                    id="lease-checkout-register-btn"
                    style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                        padding: '0.9rem 1.5rem',
                        borderRadius: 12,
                        background: '#f8fafc',
                        color: '#16a34a',
                        fontWeight: 700, fontSize: '0.95rem',
                        textDecoration: 'none',
                        border: '2px solid #bbf7d0',
                        transition: 'background 0.2s',
                    }}
                >
                    <span className="material-symbols-outlined" style={{ fontSize: 20 }}>person_add</span>
                    Create Tenant Account
                </Link>
            </div>

            {/* Security note */}
            <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                background: '#f8fafc', borderRadius: 10, padding: '0.75rem',
                border: '1px solid #e2e8f0',
            }}>
                <span className="material-symbols-outlined" style={{ fontSize: 16, color: '#10b981', fontVariationSettings: "'FILL' 1" }}>
                    verified_user
                </span>
                <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 500 }}>
                    Your data is encrypted and securely stored
                </span>
            </div>
        </div>
    );
};

/**
 * UnitCheckoutView — multi-step lease checkout wizard.
 *
 * Step logic:
 *  - Not authenticated → Step 1: Login / Register as tenant
 *  - Authenticated     → Step 2: Review unit details + pay rent via Stripe
 */
export const UnitCheckoutView = ({ unit }) => {
    const { isAuthenticated, loading: authLoading } = useAuth();
    const { redirectToLeaseStripe, loading: paying, error: payError } = useCheckout();

    const returnUrl = typeof window !== 'undefined' ? window.location.pathname : '';

    if (!unit) {
        return (
            <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <p style={{ color: '#94a3b8', fontSize: '1.1rem' }}>Unit not found.</p>
            </div>
        );
    }

    if (authLoading) {
        return (
            <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{
                    width: 40, height: 40,
                    border: '3px solid #e2e8f0',
                    borderTopColor: '#10b981',
                    borderRadius: '50%',
                    animation: 'spin 0.8s linear infinite',
                }} />
                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </div>
        );
    }

    const currentStep = isAuthenticated ? 2 : 1;

    return (
        <div style={{ background: '#f7f9fb', minHeight: 'calc(100vh - 64px)' }}>
            <main style={{ maxWidth: 1200, margin: '0 auto', padding: '3rem 1.5rem 5rem' }}>
                {/* Breadcrumb */}
                <div style={{ marginBottom: '1.5rem' }}>
                    <Link
                        href={`/units/${unit.id}`}
                        style={{ display: 'inline-flex', alignItems: 'center', gap: 4, color: '#64748b', fontSize: '0.875rem', textDecoration: 'none' }}
                    >
                        <span className="material-symbols-outlined" style={{ fontSize: 16 }}>arrow_back</span>
                        Back to Unit
                    </Link>
                </div>

                {/* Step indicator */}
                <StepIndicator currentStep={currentStep} isAuthenticated={isAuthenticated} />

                {/* Two-column grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '2rem',
                    alignItems: 'start',
                }}>
                    {/* Left: Unit details */}
                    <UnitDetailsSidebar unit={unit} />

                    {/* Right: step-dependent content */}
                    <div>
                        {isAuthenticated ? (
                            <UnitCheckoutPaymentStep
                                unit={unit}
                                onPay={redirectToLeaseStripe}
                                loading={paying}
                                error={payError}
                            />
                        ) : (
                            <TenantUnauthStep returnUrl={returnUrl} />
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

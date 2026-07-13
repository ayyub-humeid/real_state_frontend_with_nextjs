'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import api from '@/lib/axios';

export default function CheckoutSuccessPage() {
    const searchParams = useSearchParams();
    const sessionId = searchParams.get('session_id');
    const paymentType = searchParams.get('type'); // 'lease' or undefined (subscription)
    const isLease = paymentType === 'lease';

    const [count, setCount] = useState(8);
    const [isVerifying, setIsVerifying] = useState(true);

    // Verify session with the backend on page load
    useEffect(() => {
        if (!sessionId) {
            setIsVerifying(false);
            return;
        }

        const verifySession = async () => {
            try {
                const response = await api.post('checkout/verify-session', { session_id: sessionId });

                if (response?.success) {
                    console.log("Session verified successfully");
                } else {
                    console.error("Session verification failed", response?.message);
                }
            } catch (error) {
                console.error("Error verifying session", error);
            } finally {
                setIsVerifying(false);
            }
        };

        verifySession();
    }, [sessionId]);

    // Countdown auto-redirect (wait until verifying is done)
    useEffect(() => {
        if (isVerifying || count <= 0) return;
        const timer = setTimeout(() => setCount((c) => c - 1), 1000);
        return () => clearTimeout(timer);
    }, [count, isVerifying]);

    useEffect(() => {
        if (count === 0) {
            const adminUrl = process.env.NEXT_PUBLIC_ADMIN_PANEL_URL || 'http://127.0.0.1:8000/admin';
            window.location.href = isLease
                ? '/tenant/dashboard'
                : `${adminUrl}/dashboard`;
        }
    }, [count, isLease]);

    const title = isLease ? 'Lease Request Submitted!' : 'Payment Successful!';
    const subtitle = isLease
        ? "Your first month's rent has been paid. Your lease application is now pending review by the property manager."
        : 'Your subscription is now active. Welcome aboard! You now have full access to your plan features.';

    const nextSteps = isLease
        ? [
            { icon: 'mail', text: 'Confirmation email sent to your inbox' },
            { icon: 'home_work', text: 'Your lease request is now pending agency review' },
            { icon: 'support_agent', text: 'The agency will contact you to finalize the agreement' },
        ]
        : [
            { icon: 'mail', text: 'Confirmation email sent to your inbox' },
            { icon: 'dashboard', text: 'Your dashboard is now fully unlocked' },
            { icon: 'support_agent', text: 'Our team is available 24/7 for support' },
        ];

    const adminUrl = process.env.NEXT_PUBLIC_ADMIN_PANEL_URL || 'http://127.0.0.1:8000/admin';
    const dashboardHref = isLease ? '/tenant/dashboard' : `${adminUrl}/dashboard`;
    const dashboardLabel = isLease ? 'Go to Tenant Dashboard' : 'Go to My Dashboard';

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 50%, #f0fdfa 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '2rem',
        }}>
            <div style={{
                background: '#fff',
                borderRadius: 24,
                padding: '3rem 2.5rem',
                maxWidth: 520,
                width: '100%',
                textAlign: 'center',
                boxShadow: '0 20px 60px rgba(16,185,129,0.12)',
                border: '1px solid #d1fae5',
            }}>
                {/* Animated success icon */}
                <div style={{
                    width: 96, height: 96,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #10b981, #059669)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 1.5rem',
                    boxShadow: '0 8px 32px rgba(16,185,129,0.35)',
                    animation: 'successPop 0.5s cubic-bezier(0.34,1.56,0.64,1) both',
                }}>
                    <span className="material-symbols-outlined" style={{
                        fontSize: 52, color: '#fff', fontVariationSettings: "'FILL' 1"
                    }}>
                        {isLease ? 'home_work' : 'check_circle'}
                    </span>
                </div>

                <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#064e3b', marginBottom: 8 }}>
                    {title}
                </h1>
                <p style={{ color: '#065f46', fontSize: '1rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                    {subtitle}
                </p>

                {sessionId && (
                    <div style={{
                        background: '#f0fdf4', borderRadius: 12, padding: '0.75rem 1rem',
                        marginBottom: '1.5rem', border: '1px solid #bbf7d0',
                    }}>
                        <p style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: 2 }}>Stripe Session ID</p>
                        <p style={{ fontSize: '0.8rem', color: '#374151', fontFamily: 'monospace', wordBreak: 'break-all' }}>
                            {sessionId}
                        </p>
                    </div>
                )}

                {/* What happens next */}
                <div style={{
                    background: '#f8fafc', borderRadius: 16, padding: '1.25rem',
                    marginBottom: '2rem', textAlign: 'left',
                    border: '1px solid #e2e8f0',
                }}>
                    <p style={{ fontSize: '0.8rem', fontWeight: 700, color: '#374151', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                        What happens next
                    </p>
                    {nextSteps.map((item) => (
                        <div key={item.text} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                            <span className="material-symbols-outlined" style={{ fontSize: 18, color: '#10b981', fontVariationSettings: "'FILL' 1" }}>
                                {item.icon}
                            </span>
                            <span style={{ fontSize: '0.875rem', color: '#4b5563' }}>{item.text}</span>
                        </div>
                    ))}
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <a
                        href={dashboardHref}
                        id="success-dashboard-btn"
                        style={{
                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                            padding: '0.9rem',
                            borderRadius: 12,
                            background: 'linear-gradient(135deg, #10b981, #059669)',
                            color: '#fff', fontWeight: 700, textDecoration: 'none',
                            boxShadow: '0 4px 16px rgba(16,185,129,0.3)',
                        }}
                    >
                        <span className="material-symbols-outlined" style={{ fontSize: 20 }}>dashboard</span>
                        {dashboardLabel}
                    </a>
                    <Link href="/" style={{ fontSize: '0.875rem', color: '#6b7280', textDecoration: 'none' }}>
                        ← Back to Home
                    </Link>
                </div>

                {/* Auto-redirect countdown */}
                <p style={{ marginTop: '1.5rem', fontSize: '0.8rem', color: '#9ca3af' }}>
                    Redirecting to {isLease ? 'tenant dashboard' : 'dashboard'} in {count}s…
                </p>
            </div>

            <style>{`
                @keyframes successPop {
                    from { opacity: 0; transform: scale(0.4); }
                    to { opacity: 1; transform: scale(1); }
                }
            `}</style>
        </div>
    );
}

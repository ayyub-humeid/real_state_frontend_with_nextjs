'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function CheckoutCancelPage() {
    const searchParams = useSearchParams();
    // The plan slug can be passed as ?plan=starter so we can retry
    const planSlug = searchParams.get('plan');

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #fff7f7 0%, #fef2f2 50%, #fff5f5 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '2rem',
        }}>
            <div style={{
                background: '#fff',
                borderRadius: 24,
                padding: '3rem 2.5rem',
                maxWidth: 480,
                width: '100%',
                textAlign: 'center',
                boxShadow: '0 20px 60px rgba(220,38,38,0.08)',
                border: '1px solid #fecaca',
            }}>
                {/* Icon */}
                <div style={{
                    width: 88, height: 88,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #f87171, #dc2626)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 1.5rem',
                    boxShadow: '0 8px 32px rgba(220,38,38,0.25)',
                    animation: 'shake 0.5s ease both',
                }}>
                    <span className="material-symbols-outlined" style={{
                        fontSize: 46, color: '#fff', fontVariationSettings: "'FILL' 1"
                    }}>
                        cancel
                    </span>
                </div>

                <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#7f1d1d', marginBottom: 8 }}>
                    Payment Cancelled
                </h1>
                <p style={{ color: '#991b1b', fontSize: '1rem', lineHeight: 1.6, marginBottom: '2rem' }}>
                    No worries — your payment was not processed and you haven&apos;t been charged.
                    You can try again whenever you&apos;re ready.
                </p>

                {/* Info box */}
                <div style={{
                    background: '#fff7ed', borderRadius: 14, padding: '1rem 1.25rem',
                    marginBottom: '2rem', border: '1px solid #fed7aa', textAlign: 'left',
                }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                        <span className="material-symbols-outlined" style={{ fontSize: 20, color: '#f97316', fontVariationSettings: "'FILL' 1", flexShrink: 0 }}>
                            info
                        </span>
                        <p style={{ fontSize: '0.875rem', color: '#9a3412', lineHeight: 1.5 }}>
                            If you experienced an issue with the payment page, please contact our support team — we&apos;re happy to help.
                        </p>
                    </div>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {planSlug && (
                        <Link
                            href={`/checkout/${planSlug}`}
                            id="cancel-retry-btn"
                            style={{
                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                                padding: '0.9rem',
                                borderRadius: 12,
                                background: 'linear-gradient(135deg, #4f46e5, #6366f1)',
                                color: '#fff', fontWeight: 700, textDecoration: 'none',
                                boxShadow: '0 4px 16px rgba(79,70,229,0.3)',
                            }}
                        >
                            <span className="material-symbols-outlined" style={{ fontSize: 20 }}>refresh</span>
                            Try Again
                        </Link>
                    )}
                    <Link
                        href="/#pricing"
                        id="cancel-plans-btn"
                        style={{
                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                            padding: '0.9rem',
                            borderRadius: 12,
                            background: '#f8fafc',
                            color: '#4f46e5', fontWeight: 700, textDecoration: 'none',
                            border: '2px solid #e0e7ff',
                        }}
                    >
                        <span className="material-symbols-outlined" style={{ fontSize: 20 }}>view_list</span>
                        View All Plans
                    </Link>
                    <Link href="/" style={{ fontSize: '0.875rem', color: '#6b7280', textDecoration: 'none' }}>
                        ← Back to Home
                    </Link>
                </div>
            </div>

            <style>{`
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    20% { transform: translateX(-6px); }
                    40% { transform: translateX(6px); }
                    60% { transform: translateX(-4px); }
                    80% { transform: translateX(4px); }
                }
            `}</style>
        </div>
    );
}

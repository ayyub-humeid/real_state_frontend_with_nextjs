'use client';
import Link from 'next/link';

/**
 * UnauthStep — shown on the checkout page when the user is NOT authenticated.
 * Saves the returnUrl to localStorage so that after login/register they come back here.
 */
export const UnauthStep = ({ returnUrl }) => {
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
                    background: 'linear-gradient(135deg, #eef2ff, #e0e7ff)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 4px 16px rgba(99,102,241,0.15)',
                }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 36, color: '#4f46e5', fontVariationSettings: "'FILL' 1" }}>
                        account_circle
                    </span>
                </div>
            </div>

            {/* Text */}
            <div style={{ textAlign: 'center' }}>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#0f172a', marginBottom: 8 }}>
                    Sign in to continue
                </h3>
                <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: 1.6 }}>
                    You need an account to subscribe to a plan.<br />
                    Already registered? Log in and come straight back here.
                </p>
            </div>

            {/* Divider */}
            <div style={{ height: 1, background: '#f1f5f9' }} />

            {/* Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <Link
                    href="/login"
                    onClick={saveReturnUrl}
                    id="checkout-login-btn"
                    style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                        padding: '0.9rem 1.5rem',
                        borderRadius: 12,
                        background: 'linear-gradient(135deg, #4f46e5, #6366f1)',
                        color: '#fff',
                        fontWeight: 700, fontSize: '0.95rem',
                        textDecoration: 'none',
                        boxShadow: '0 4px 16px rgba(79,70,229,0.35)',
                        transition: 'opacity 0.2s',
                    }}
                >
                    <span className="material-symbols-outlined" style={{ fontSize: 20 }}>login</span>
                    Log In to My Account
                </Link>

                {/* Go directly to agency registration with the checkout URL embedded.
                    The form will auto-login after company creation and redirect back here. */}
                <Link
                    href={`/register/agency?returnUrl=${encodeURIComponent(returnUrl)}`}
                    id="checkout-register-btn"
                    style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                        padding: '0.9rem 1.5rem',
                        borderRadius: 12,
                        background: '#f8fafc',
                        color: '#4f46e5',
                        fontWeight: 700, fontSize: '0.95rem',
                        textDecoration: 'none',
                        border: '2px solid #e0e7ff',
                        transition: 'background 0.2s',
                    }}
                >
                    <span className="material-symbols-outlined" style={{ fontSize: 20 }}>person_add</span>
                    Register Your Agency
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

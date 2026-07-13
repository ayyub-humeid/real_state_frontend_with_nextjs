'use client';

/**
 * UnitCheckoutPaymentStep — shown to authenticated users on the lease checkout page.
 * Displays unit summary, one-time rent amount, and triggers Stripe redirect.
 */
export const UnitCheckoutPaymentStep = ({ unit, onPay, loading, error }) => {
    if (!unit) return null;

    const price = parseFloat(unit.rent_price || 0);
    const title = unit.property?.name ? `${unit.property.name} - ${unit.unit_number}` : `Unit ${unit.unit_number}`;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Lease Summary Card */}
            <div style={{
                background: '#fff',
                borderRadius: 20,
                padding: '2rem',
                border: '1px solid #e2e8f0',
                boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
                    <div>
                        <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.08em', color: '#10b981', textTransform: 'uppercase' }}>
                            Lease Request
                        </span>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginTop: 4 }}>{title}</h3>
                        <p style={{ fontSize: '0.875rem', color: '#64748b', marginTop: 2 }}>12 Month Lease • One-Time Deposit</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '2rem', fontWeight: 800, color: '#10b981', lineHeight: 1 }}>
                            ${price.toLocaleString()}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: 4 }}>first month</div>
                    </div>
                </div>

                {/* Breakdown */}
                <div style={{ height: 1, background: '#f1f5f9', marginBottom: '1rem' }} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {[
                        { label: 'First Month Rent', value: `$${price.toLocaleString()}` },
                        { label: 'Lease Duration', value: '12 Months' },
                        { label: 'Lease Type', value: 'Residential' },
                    ].map(item => (
                        <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                            <span style={{ color: '#64748b' }}>{item.label}</span>
                            <span style={{ fontWeight: 600, color: '#0f172a' }}>{item.value}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Total */}
            <div style={{
                background: 'linear-gradient(135deg, #f0fdf4, #dcfce7)',
                borderRadius: 16,
                padding: '1.25rem 1.5rem',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                border: '1px solid #bbf7d0',
            }}>
                <span style={{ fontWeight: 700, color: '#374151' }}>Total due today</span>
                <span style={{ fontWeight: 800, fontSize: '1.25rem', color: '#16a34a' }}>${price.toLocaleString()}</span>
            </div>

            {/* Error */}
            {error && (
                <div style={{
                    display: 'flex', alignItems: 'flex-start', gap: 10,
                    padding: '0.9rem 1rem', borderRadius: 12,
                    background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626',
                    fontSize: '0.875rem',
                }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 20, flexShrink: 0 }}>error</span>
                    <span>{error}</span>
                </div>
            )}

            {/* CTA */}
            <button
                id="lease-pay-btn"
                onClick={() => onPay(unit.id)}
                disabled={loading}
                style={{
                    width: '100%',
                    padding: '1rem',
                    borderRadius: 14,
                    border: 'none',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    background: loading
                        ? '#94a3b8'
                        : 'linear-gradient(135deg, #16a34a 0%, #10b981 100%)',
                    color: '#fff',
                    fontWeight: 700, fontSize: '1rem',
                    boxShadow: loading ? 'none' : '0 6px 24px rgba(16,185,129,0.4)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                    transition: 'all 0.25s',
                }}
            >
                {loading ? (
                    <>
                        <span style={{
                            width: 18, height: 18,
                            border: '2px solid rgba(255,255,255,0.4)',
                            borderTopColor: '#fff',
                            borderRadius: '50%',
                            animation: 'spin 0.7s linear infinite',
                            display: 'inline-block',
                        }} />
                        Connecting to Stripe…
                    </>
                ) : (
                    <>
                        <span className="material-symbols-outlined" style={{ fontSize: 22, fontVariationSettings: "'FILL' 1" }}>lock</span>
                        Confirm & Pay Rent
                        <span className="material-symbols-outlined" style={{ fontSize: 20 }}>arrow_forward</span>
                    </>
                )}
            </button>

            {/* Trust badges */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                {[
                    { icon: 'lock', label: 'SSL Encrypted' },
                    { icon: 'verified', label: 'Stripe Secure' },
                    { icon: 'receipt_long', label: 'One-Time Payment' },
                    { icon: 'support_agent', label: '24/7 Support' },
                ].map((b) => (
                    <div key={b.label} style={{
                        display: 'flex', alignItems: 'center', gap: 7,
                        background: '#f8fafc', borderRadius: 10, padding: '0.65rem 0.85rem',
                        border: '1px solid #e2e8f0',
                    }}>
                        <span className="material-symbols-outlined" style={{ fontSize: 16, color: '#10b981', fontVariationSettings: "'FILL' 1" }}>{b.icon}</span>
                        <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 500 }}>{b.label}</span>
                    </div>
                ))}
            </div>

            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
    );
};

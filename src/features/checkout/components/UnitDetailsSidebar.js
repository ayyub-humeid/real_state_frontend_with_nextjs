'use client';

/**
 * UnitDetailsSidebar — shows key unit info on the lease checkout screen.
 */
export const UnitDetailsSidebar = ({ unit }) => {
    if (!unit) return null;

    const property = unit.property || {};
    const title = property.name ? `${property.name} - ${unit.unit_number}` : `Unit ${unit.unit_number}`;
    const address = property.address || 'Address not available';
    const price = parseFloat(unit.rent_price || 0);
    const agencyName = property.company?.name || 'Property Manager';

    const specs = [
        { icon: 'bed', label: `${unit.bedrooms} Bedrooms` },
        { icon: 'shower', label: `${unit.bathrooms} Bathrooms` },
        ...(unit.sqft ? [{ icon: 'square_foot', label: `${unit.sqft} sqft` }] : []),
    ];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
                <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a', marginBottom: 8 }}>
                    Your Lease Application
                </h1>
                <p style={{ color: '#64748b', fontSize: '1rem' }}>
                    Review the unit details and proceed to secure payment.
                </p>
            </div>

            <div style={{
                background: '#fff',
                borderRadius: 20,
                padding: '2rem',
                border: '1px solid #e2e8f0',
                boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.25rem',
            }}>
                {/* Unit title and address */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                        <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.08em', color: '#10b981', textTransform: 'uppercase' }}>
                            Selected Unit
                        </span>
                        <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', marginTop: 4 }}>{title}</h2>
                        <p style={{ fontSize: '0.875rem', color: '#64748b', marginTop: 4, display: 'flex', alignItems: 'center', gap: 4 }}>
                            <span className="material-symbols-outlined" style={{ fontSize: 16 }}>location_on</span>
                            {address}
                        </p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '2rem', fontWeight: 800, color: '#10b981', lineHeight: 1 }}>
                            ${price.toLocaleString()}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: 4 }}>/ month</div>
                    </div>
                </div>

                <div style={{ height: 1, background: '#f1f5f9' }} />

                {/* Specs */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                    {specs.map((spec) => (
                        <div key={spec.label} style={{
                            display: 'flex', alignItems: 'center', gap: 6,
                            background: '#f8fafc', borderRadius: 10, padding: '0.5rem 0.9rem',
                            border: '1px solid #e2e8f0',
                        }}>
                            <span className="material-symbols-outlined" style={{ fontSize: 16, color: '#4f46e5' }}>{spec.icon}</span>
                            <span style={{ fontSize: '0.85rem', color: '#374151', fontWeight: 600 }}>{spec.label}</span>
                        </div>
                    ))}
                </div>

                <div style={{ height: 1, background: '#f1f5f9' }} />

                {/* Managed by */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{
                        width: 36, height: 36, borderRadius: '50%',
                        background: 'linear-gradient(135deg, #eef2ff, #e0e7ff)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                        <span className="material-symbols-outlined" style={{ fontSize: 18, color: '#4f46e5' }}>business</span>
                    </div>
                    <div>
                        <span style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Managed by</span>
                        <p style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0f172a' }}>{agencyName}</p>
                    </div>
                </div>
            </div>

            {/* Lease info note */}
            <div style={{
                display: 'flex', gap: 12, alignItems: 'flex-start',
                padding: '1rem', borderRadius: 12,
                background: '#f0fdf4', border: '1px solid #bbf7d0',
            }}>
                <span className="material-symbols-outlined" style={{ fontSize: 20, color: '#16a34a', fontVariationSettings: "'FILL' 1", flexShrink: 0 }}>
                    info
                </span>
                <p style={{ fontSize: '0.85rem', color: '#15803d', lineHeight: 1.5 }}>
                    This is a <strong>one-time first month payment</strong> to initiate your lease application.
                    The agency will review your request and contact you to finalize the agreement.
                </p>
            </div>
        </div>
    );
};

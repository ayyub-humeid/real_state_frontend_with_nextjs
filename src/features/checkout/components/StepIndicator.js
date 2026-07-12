'use client';

/**
 * StepIndicator — shows 3-step checkout progress:
 *   1. Account  →  2. Plan Review  →  3. Payment
 *
 * Steps before `currentStep` are shown as completed (green ✓).
 * `currentStep` is active (primary colour, pulsing ring).
 * Steps after are inactive (grey).
 *
 * @param {number} currentStep  1 | 2 | 3
 * @param {boolean} isAuthenticated  controls step-1 styling shortcut
 */
export const StepIndicator = ({ currentStep, isAuthenticated }) => {
    const steps = [
        { id: 1, label: 'Account', icon: 'person' },
        { id: 2, label: 'Plan Review', icon: 'fact_check' },
        { id: 3, label: 'Payment', icon: 'payment' },
    ];

    const getStepState = (stepId) => {
        if (stepId < currentStep) return 'completed';
        if (stepId === currentStep) return 'active';
        return 'upcoming';
    };

    const stateStyles = {
        completed: {
            circle: { background: 'linear-gradient(135deg, #10b981, #059669)', border: 'none', boxShadow: '0 4px 12px rgba(16,185,129,0.35)' },
            label: { color: '#10b981', fontWeight: '600' },
            icon: 'check',
            iconColor: '#fff',
        },
        active: {
            circle: { background: 'linear-gradient(135deg, #4f46e5, #6366f1)', border: 'none', boxShadow: '0 4px 16px rgba(79,70,229,0.4)' },
            label: { color: '#4f46e5', fontWeight: '700' },
            iconColor: '#fff',
        },
        upcoming: {
            circle: { background: '#f1f5f9', border: '2px solid #e2e8f0', boxShadow: 'none' },
            label: { color: '#94a3b8', fontWeight: '500' },
            iconColor: '#94a3b8',
        },
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0, marginBottom: '2.5rem', width: '100%', maxWidth: 480, marginInline: 'auto' }}>
            {steps.map((step, idx) => {
                const state = getStepState(step.id);
                const style = stateStyles[state];
                const displayIcon = state === 'completed' ? 'check' : step.icon;

                return (
                    <div key={step.id} style={{ display: 'flex', alignItems: 'center', flex: idx < steps.length - 1 ? 1 : 'none' }}>
                        {/* Step circle + label */}
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                            {/* Circle */}
                            <div
                                style={{
                                    width: 48, height: 48,
                                    borderRadius: '50%',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    position: 'relative',
                                    transition: 'all 0.4s ease',
                                    ...style.circle,
                                }}
                            >
                                {/* Pulsing ring for active step */}
                                {state === 'active' && (
                                    <div style={{
                                        position: 'absolute', inset: -4,
                                        borderRadius: '50%',
                                        border: '2px solid rgba(79,70,229,0.3)',
                                        animation: 'pulse 2s infinite',
                                    }} />
                                )}
                                <span
                                    className="material-symbols-outlined"
                                    style={{ fontSize: 22, color: style.iconColor, fontVariationSettings: "'FILL' 1" }}
                                >
                                    {displayIcon}
                                </span>
                            </div>
                            {/* Label */}
                            <span style={{ fontSize: 12, letterSpacing: '0.04em', whiteSpace: 'nowrap', ...style.label }}>
                                {step.label}
                            </span>
                        </div>

                        {/* Connector line */}
                        {idx < steps.length - 1 && (
                            <div style={{
                                flex: 1,
                                height: 3,
                                marginBottom: 18,
                                marginInline: 8,
                                borderRadius: 9999,
                                background: state === 'completed'
                                    ? 'linear-gradient(90deg, #10b981, #059669)'
                                    : '#e2e8f0',
                                transition: 'background 0.4s ease',
                            }} />
                        )}
                    </div>
                );
            })}

            <style>{`
                @keyframes pulse {
                    0%, 100% { opacity: 1; transform: scale(1); }
                    50% { opacity: 0.5; transform: scale(1.15); }
                }
            `}</style>
        </div>
    );
};

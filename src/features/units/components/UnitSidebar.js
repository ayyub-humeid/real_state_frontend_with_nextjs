import React from 'react';
import Link from 'next/link';

export default function UnitSidebar({ unit }) {
    if (!unit) return null;

    const agencyName = unit.property?.company?.name || 'Property Manager';
    const agencyLogo = unit.property?.company?.logo_url || null;

    return (
        <div className="lg:col-span-4 relative">
            <div className="sticky top-28 bg-surface/80 backdrop-blur-xl border border-outline-variant/30 rounded-xl p-6 shadow-sm flex flex-col gap-6">
                
                {/* Pricing */}
                <div>
                    <div className="flex items-baseline gap-2 mb-1">
                        <span className="text-[32px] font-bold text-[#10b981]">
                            ${parseFloat(unit.rent_price).toLocaleString()}
                        </span>
                        <span className="text-[16px] text-on-surface-variant">/ month</span>
                    </div>
                    <p className="text-[12px] font-semibold tracking-wider text-on-surface-variant">
                        Available Now • 12 Month Lease
                    </p>
                </div>

                {/* CTA */}
                <Link
                    href={`/checkout/unit/${unit.id}`}
                    id="apply-for-lease-btn"
                    className="w-full bg-surface-tint hover:bg-primary text-on-primary text-[14px] font-semibold py-3 px-4 rounded-lg transition-colors shadow-sm flex items-center justify-center gap-2"
                >
                    <span className="material-symbols-outlined text-[18px]">home_work</span>
                    Apply for Lease
                </Link>
                <button className="w-full bg-surface-container-low hover:bg-surface-container text-on-surface text-[14px] font-semibold py-3 px-4 rounded-lg transition-colors border border-outline-variant/30">
                    Contact Agent
                </button>
                
                <hr className="border-outline-variant/30 my-2" />
                
                {/* Agency Profile */}
                <div>
                    <h4 className="text-[12px] font-semibold text-on-surface-variant mb-4 uppercase tracking-wider">
                        Managed By
                    </h4>
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center overflow-hidden border border-outline-variant/30">
                            {agencyLogo ? (
                                <img alt="Agency Logo" className="w-full h-full object-cover" src={agencyLogo} />
                            ) : (
                                <span className="material-symbols-outlined text-outline text-[24px]">business</span>
                            )}
                        </div>
                        <div>
                            <h5 className="text-[16px] font-semibold text-on-surface">{agencyName}</h5>
                            <p className="text-[12px] font-semibold text-on-surface-variant flex items-center gap-1 mt-1">
                                <span className="material-symbols-outlined text-[14px]">star</span>
                                {unit.average_rating ? `${unit.average_rating} (${unit.reviews_count} Reviews)` : 'No ratings yet'}
                            </p>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    );
}


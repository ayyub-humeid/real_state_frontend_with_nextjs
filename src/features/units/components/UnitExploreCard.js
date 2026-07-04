import React from 'react';
import Link from 'next/link';

export default function UnitExploreCard({ unit }) {
    const mainImage = unit.main_image_url || "https://lh3.googleusercontent.com/aida-public/AB6AXuAT-Ut3WHxlvcJZYZveElqJjftUUnmwm_Fdh4HC2fdsSU8gnz2gmMygwGN_1-VGw04bqEE-KZDC0rWA65Q1S_NpYpiDPp0sGg3gtEcRN6ptP_pKVE_0g-u7wqZVZCEXpFdSwsoMfcv4c4dWwni4I3OQDMgHxI9nBVSR0iO3igetn9Y4Zl24-7Z5ZUnWf6BM7UcWa5nwa_9RUM4cu6oWfACu9RhX6FHxhcV5jEO7x1Qevtr8zMn5sLQ";

    return (
        <div className="bg-white rounded-[2rem] overflow-hidden border border-outline-variant/30 card-hover transition-all duration-300 group flex flex-col h-full hover:-translate-y-1 hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)]">
            <Link href={`/units/${unit.id}`} className="relative h-64 overflow-hidden block">
                <img 
                    alt={`Property image for ${unit.property?.name || 'Unit'}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                    src={mainImage}
                />
                <div className="absolute top-4 left-4 flex gap-2">
                    {unit.is_featured === 1 && (
                        <span className="bg-primary text-white text-label-caps font-label-caps px-3 py-1 rounded-full uppercase shadow-sm">
                            Featured
                        </span>
                    )}
                    <span className="bg-white/90 backdrop-blur-md text-on-surface text-label-caps font-label-caps px-3 py-1 rounded-full uppercase shadow-sm">
                        {unit.status === 'available' ? 'For Rent' : unit.status}
                    </span>
                </div>
                <button 
                    className="absolute top-4 right-4 h-10 w-10 flex items-center justify-center bg-white/20 backdrop-blur-md text-white rounded-full hover:bg-white hover:text-error transition-all shadow-sm z-10"
                    onClick={(e) => {
                        e.preventDefault(); // Prevent navigating when clicking heart
                    }}
                >
                    <span className="material-symbols-outlined">favorite</span>
                </button>
            </Link>
            
            <div className="p-8 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-4">
                    <div className="flex-1 pr-4">
                        <Link href={`/units/${unit.id}`}>
                            <h3 className="text-headline-md font-headline-md text-on-surface hover:text-primary transition-colors line-clamp-1">
                                {unit.property?.name || `Unit ${unit.unit_number}`}
                            </h3>
                        </Link>
                        <p className="flex items-center gap-1 text-on-surface-variant text-body-md mt-1">
                            <span className="material-symbols-outlined text-[18px]">location_on</span>
                            <span className="line-clamp-1">{unit.property?.address || 'Address not available'}</span>
                        </p>
                    </div>
                    <div className="text-right whitespace-nowrap">
                        <p className="text-headline-md font-headline-md text-[#10b981]">
                            ${parseFloat(unit.rent_price).toLocaleString()}
                            <span className="text-body-md text-on-surface-variant font-normal">/mo</span>
                        </p>
                    </div>
                </div>
                
                <div className="flex items-center justify-between border-y border-outline-variant/30 py-4 mb-6 mt-auto">
                    <div className="flex flex-col items-center gap-1">
                        <span className="material-symbols-outlined text-outline">bed</span>
                        <span className="text-body-md font-semibold">{unit.bedrooms} Beds</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                        <span className="material-symbols-outlined text-outline">bathtub</span>
                        <span className="text-body-md font-semibold">{unit.bathrooms} Baths</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                        <span className="material-symbols-outlined text-outline">square_foot</span>
                        <span className="text-body-md font-semibold">{unit.sqft > 0 ? unit.sqft : '--'} sqft</span>
                    </div>
                </div>
                
                <Link href={`/units/${unit.id}`} className="w-full bg-primary-container text-white py-4 rounded-2xl font-button hover:bg-primary transition-colors flex items-center justify-center gap-2">
                    View Details
                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </Link>
            </div>
        </div>
    );
}

"use client";

import React, { use } from 'react';
import Link from 'next/link';
import { useUnit } from '@/features/units/hooks/useUnit';
import UnitGallery from '@/features/units/components/UnitGallery';
import UnitDetails from '@/features/units/components/UnitDetails';
import UnitSidebar from '@/features/units/components/UnitSidebar';

export default function UnitDetailPage({ params }) {
    // Next.js 15 requires awaiting params or using `use(params)` for dynamic routes
    const unwrappedParams = (params && typeof params.then === 'function') ? use(params) : (params || {});
    const unitId = unwrappedParams?.id;
    
    const { unit, loading, error } = useUnit(unitId);

    if (loading) {
        return (
            <div className="min-h-[50vh] flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (error || !unit) {
        return (
            <div className="min-h-[50vh] flex items-center justify-center">
                <div className="text-center px-4">
                    <span className="material-symbols-outlined text-[48px] text-error mb-4">error</span>
                    <h2 className="text-2xl font-bold text-error mb-2">Unit Not Found</h2>
                    <p className="text-on-surface-variant mb-6">{error || "The requested unit could not be found."}</p>
                    <Link href="/units" className="bg-primary text-white px-6 py-3 rounded-xl font-button hover:bg-primary-container transition-colors inline-flex items-center gap-2">
                        <span className="material-symbols-outlined text-[20px]">arrow_back</span>
                        Back to Properties
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="pb-20 px-4 md:px-10 max-w-[1280px] w-full mx-auto pt-6">
            <UnitGallery images={unit.images || []} mainImage={unit.main_image_url} />
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <UnitDetails unit={unit} />
                <UnitSidebar unit={unit} />
            </div>
        </div>
    );
}


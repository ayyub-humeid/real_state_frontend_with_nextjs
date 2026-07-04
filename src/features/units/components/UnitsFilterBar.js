import React from 'react';

export default function UnitsFilterBar({ onOpenAdvancedFilter }) {
    return (
        <section className="sticky top-20 z-40 bg-surface/90 backdrop-blur-md border-b border-outline-variant/30 py-4">
            <div className="max-w-container-max mx-auto px-margin-desktop flex flex-wrap lg:flex-nowrap items-center gap-4">
                {/* Search Input */}
                <div className="flex-1 min-w-[300px] relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">search</span>
                    <input 
                        className="w-full bg-white border border-outline-variant rounded-xl pl-12 pr-4 py-3 focus:ring-primary focus:border-primary" 
                        placeholder="Search location, neighborhood, or ZIP" 
                        type="text"
                    />
                </div>
                
                {/* Dropdowns */}
                <div className="flex flex-wrap items-center gap-3">
                    <div className="relative group">
                        <button className="flex items-center gap-2 px-4 py-3 bg-white border border-outline-variant rounded-xl text-body-md hover:border-primary transition-all">
                            Property Type
                            <span className="material-symbols-outlined text-[18px]">expand_more</span>
                        </button>
                    </div>
                    
                    <div className="relative group">
                        <button className="flex items-center gap-2 px-4 py-3 bg-white border border-outline-variant rounded-xl text-body-md hover:border-primary transition-all">
                            Price Range
                            <span className="material-symbols-outlined text-[18px]">expand_more</span>
                        </button>
                    </div>
                    
                    <div className="relative group">
                        <button className="flex items-center gap-2 px-4 py-3 bg-white border border-outline-variant rounded-xl text-body-md hover:border-primary transition-all">
                            Bedrooms
                            <span className="material-symbols-outlined text-[18px]">expand_more</span>
                        </button>
                    </div>
                    
                    <button 
                        className="flex items-center gap-2 px-4 py-3 bg-white border border-outline-variant rounded-xl text-body-md hover:border-primary transition-all" 
                        onClick={onOpenAdvancedFilter}
                    >
                        <span className="material-symbols-outlined text-[18px]">tune</span>
                        More Filters
                    </button>
                </div>
                
                <div className="h-10 w-[1px] bg-outline-variant/30 mx-2 hidden lg:block"></div>
                
                {/* View Toggle & Sort */}
                <div className="flex items-center gap-4 ml-auto">
                    <div className="flex bg-surface-container rounded-xl p-1">
                        <button className="px-4 py-1.5 bg-white text-primary rounded-lg shadow-sm font-button flex items-center gap-2">
                            <span className="material-symbols-outlined text-[18px]">grid_view</span>
                            Grid
                        </button>
                        <button className="px-4 py-1.5 text-on-surface-variant font-button flex items-center gap-2 hover:bg-white/50 rounded-lg transition-all">
                            <span className="material-symbols-outlined text-[18px]">map</span>
                            Map
                        </button>
                    </div>
                    
                    <select className="bg-transparent border-none text-body-md font-semibold focus:ring-0 text-on-surface-variant cursor-pointer">
                        <option>Newest First</option>
                        <option>Price: Low to High</option>
                        <option>Price: High to Low</option>
                        <option>Top Rated</option>
                    </select>
                </div>
            </div>
        </section>
    );
}

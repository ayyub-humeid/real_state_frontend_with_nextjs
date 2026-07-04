import React from 'react';

export default function UnitsAdvancedFilter({ isOpen, onClose }) {
    return (
        <aside 
            className={`fixed inset-y-0 right-0 w-full md:w-[400px] bg-white z-[100] shadow-2xl transition-transform duration-300 flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
        >
            <div className="p-8 border-b border-outline-variant/30 flex items-center justify-between">
                <h2 className="text-headline-md font-headline-md">Advanced Filters</h2>
                <button 
                    className="h-10 w-10 flex items-center justify-center hover:bg-surface-container-high rounded-full transition-all" 
                    onClick={onClose}
                >
                    <span className="material-symbols-outlined">close</span>
                </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-8 space-y-8">
                {/* Amenities */}
                <div>
                    <h3 className="text-label-caps font-label-caps text-outline uppercase tracking-widest mb-4">Amenities</h3>
                    <div className="grid grid-cols-2 gap-4">
                        {['Parking', 'Gym', 'Swimming Pool', 'Pet Friendly', 'Security', 'Rooftop Garden'].map(amenity => (
                            <label key={amenity} className="flex items-center gap-3 cursor-pointer group">
                                <input className="h-5 w-5 rounded border-outline-variant text-primary focus:ring-primary" type="checkbox"/>
                                <span className="text-body-md group-hover:text-primary transition-colors">{amenity}</span>
                            </label>
                        ))}
                    </div>
                </div>
                
                {/* Property Features */}
                <div>
                    <h3 className="text-label-caps font-label-caps text-outline uppercase tracking-widest mb-4">Property Features</h3>
                    <div className="space-y-4">
                        {['Smart Home Integration', 'Solar Powered', 'Electric Charging'].map(feature => (
                            <label key={feature} className="flex items-center gap-3 cursor-pointer group">
                                <input className="h-5 w-5 rounded border-outline-variant text-primary focus:ring-primary" type="checkbox"/>
                                <span className="text-body-md group-hover:text-primary transition-colors">{feature}</span>
                            </label>
                        ))}
                    </div>
                </div>
                
                {/* Floor Level */}
                <div>
                    <h3 className="text-label-caps font-label-caps text-outline uppercase tracking-widest mb-4">Floor Level</h3>
                    <div className="flex gap-2">
                        {['Any', 'Low', 'Middle', 'High'].map(level => (
                            <button key={level} className="flex-1 py-2 border border-outline-variant rounded-lg text-body-md hover:bg-surface-container-high transition-all">
                                {level}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            
            <div className="p-8 border-t border-outline-variant/30 flex gap-4 bg-white">
                <button className="flex-1 py-4 border-2 border-primary text-primary rounded-2xl font-button hover:bg-primary/5 transition-all">
                    Reset All
                </button>
                <button className="flex-[2] py-4 bg-primary text-white rounded-2xl font-button hover:bg-primary/90 transition-all">
                    Apply Filters
                </button>
            </div>
        </aside>
    );
}

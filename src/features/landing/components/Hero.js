import Link from "next/link";

export const Hero = () => {
    return (
        <section className="relative min-h-[800px] flex items-center justify-center overflow-hidden px-margin-mobile md:px-margin-desktop py-20">
            <div className="absolute inset-0 z-0">
                <img alt="Luxury real estate background" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC1PlaDoki4yKfps0wZodk4Cn9fdtVjt1s0C687VckGpFIOzmpJv2I9tL7ujYO1dpiStiZeQ4lEM0ovBoP92hDZdcAUSgnNJNDKKJHaX0Zms9cLvwtW1-50F_Jl9husyVXp1wYC9EIV3Jk8rcUvn7Aa_99CLhcj4os8E5-XE_l8WK6I8cVRXJQXF3Lshxulz0qLCMIJMW35KePCN1anP8M42hiqySU4NgXCXdv00D3z6NAnxfRciCA8TFAAplHBbbF3n0HKJ1l1vQ" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-surface/40"></div>
            </div>
            <div className="relative z-10 w-full max-w-4xl">
                <div className="glass-card p-8 md:p-12 rounded-3xl shadow-xl flex flex-col items-center text-center gap-8 border border-white/40">
                    <div className="space-y-4">
                        <h1 className="font-headline-xl text-headline-xl-mobile md:text-headline-xl text-on-surface tracking-tight">Manage Better. <span className="text-primary">Live Better.</span></h1>
                        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">The unified platform for property managers and residents. Streamline operations and enhance living experiences through intelligent automation.</p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                        <Link className="hover:cursor-pointer bg-primary text-on-primary px-10 py-4 rounded-xl font-button text-button shadow-lg shadow-primary/20 hover:translate-y-[-2px] transition-all" href={'units'} >Explore Properties</Link>
                        <button className="hover:cursor-pointer border-2 border-outline-variant text-on-surface px-10 py-4 rounded-xl font-button text-button hover:bg-surface-container-low transition-all">Software for Managers</button>
                    </div>
                    {/* Integrated Search Bar */}
                    <div className="w-full mt-4 glass-dark p-2 rounded-2xl flex flex-col md:flex-row gap-2">
                        <div className="flex-1 flex items-center bg-white/5 rounded-xl px-4 py-3 gap-3">
                            <span className="material-symbols-outlined text-outline" data-icon="location_on">location_on</span>
                            <input className="bg-transparent border-none text-white focus:ring-0 w-full font-body-md placeholder:text-outline-variant" placeholder="Location" type="text" />
                        </div>
                        <div className="flex-1 flex items-center bg-white/5 rounded-xl px-4 py-3 gap-3">
                            <span className="material-symbols-outlined text-outline" data-icon="payments">payments</span>
                            <input className="bg-transparent border-none text-white focus:ring-0 w-full font-body-md placeholder:text-outline-variant" placeholder="Max Price" type="text" />
                        </div>
                        <div className="flex-1 flex items-center bg-white/5 rounded-xl px-4 py-3 gap-3">
                            <span className="material-symbols-outlined text-outline" data-icon="bed">bed</span>
                            <input className="bg-transparent border-none text-white focus:ring-0 w-full font-body-md placeholder:text-outline-variant" placeholder="Beds" type="text" />
                        </div>
                        <button className="bg-primary-container text-on-primary-container px-8 py-3 rounded-xl font-button flex items-center justify-center gap-2 hover:opacity-90 transition-all">
                            <span className="material-symbols-outlined" data-icon="search">search</span> Search
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}

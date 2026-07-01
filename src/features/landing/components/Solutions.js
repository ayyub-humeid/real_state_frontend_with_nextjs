export const  Solutions = ()=>{
return (
<section className="max-w-container-max mx-auto px-margin-desktop -mt-16 relative z-20">
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
<div className="glass-card p-6 rounded-3xl shadow-lg border border-white/60 hover:translate-y-[-4px] transition-all group">
<div className="w-12 h-12 rounded-2xl bg-electric-indigo/10 flex items-center justify-center text-electric-indigo mb-4 group-hover:scale-110 transition-transform">
<span className="material-symbols-outlined text-2xl" data-icon="payments">payments</span>
</div>
<h3 className="font-headline-md text-body-lg font-bold mb-2">Automated Ledgers</h3>
<p className="text-on-surface-variant text-body-md">Seamless financial tracking with automated balance updates.</p>
</div>
<div className="glass-card p-6 rounded-3xl shadow-lg border border-white/60 hover:translate-y-[-4px] transition-all group">
<div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary mb-4 group-hover:scale-110 transition-transform">
<span className="material-symbols-outlined text-2xl" data-icon="handyman">handyman</span>
</div>
<h3 className="font-headline-md text-body-lg font-bold mb-2">Smart Maintenance</h3>
<p className="text-on-surface-variant text-body-md">Request tracking and vendor management in one place.</p>
</div>
<div className="glass-card p-6 rounded-3xl shadow-lg border border-white/60 hover:translate-y-[-4px] transition-all group">
<div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
<span className="material-symbols-outlined text-2xl" data-icon="public">public</span>
</div>
<h3 className="font-headline-md text-body-lg font-bold mb-2">Global Marketplace</h3>
<p className="text-on-surface-variant text-body-md">Reach thousands of tenants and buyers worldwide.</p>
</div>
<div className="glass-card p-6 rounded-3xl shadow-lg border border-white/60 hover:translate-y-[-4px] transition-all group">
<div className="w-12 h-12 rounded-2xl bg-tertiary/10 flex items-center justify-center text-tertiary mb-4 group-hover:scale-110 transition-transform">
<span className="material-symbols-outlined text-2xl" data-icon="shield">shield</span>
</div>
<h3 className="font-headline-md text-body-lg font-bold mb-2">Verified Tenant Portals</h3>
<p className="text-on-surface-variant text-body-md">Secure, encrypted access for all residential needs.</p>
</div>
</div>
</section>
);

}
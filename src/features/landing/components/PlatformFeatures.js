export const   PlatformFeatures = ()=>{
    return (
<section className="bg-deep-slate py-24 text-inverse-on-surface overflow-hidden">
<div className="max-w-container-max mx-auto px-margin-desktop">
<div className="text-center mb-16 space-y-4">
<span className="text-label-caps font-label-caps text-secondary-fixed-dim tracking-widest uppercase">Enterprise Solution</span>
<h2 className="text-headline-lg font-headline-lg text-white">Software for Managers</h2>
</div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-12">
<div className="p-10 bg-white/5 rounded-3xl border border-white/10 flex flex-col items-center text-center gap-6 group hover:bg-white/[0.08] transition-all">
<div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center text-primary-fixed-dim border border-primary/30 group-hover:scale-110 transition-transform">
<span className="material-symbols-outlined text-[32px]" data-icon="account_balance">account_balance</span>
</div>
<h3 className="text-headline-md font-headline-md text-white">Smart Accounting &amp; Ledgers</h3>
<p className="text-surface-variant font-body-md">Automate rent collection, security deposit handling, and real-time financial reporting with bank-grade precision.</p>
</div>
<div className="p-10 bg-white/5 rounded-3xl border border-white/10 flex flex-col items-center text-center gap-6 group hover:bg-white/[0.08] transition-all">
<div className="w-16 h-16 rounded-2xl bg-secondary/20 flex items-center justify-center text-secondary-fixed-dim border border-secondary/30 group-hover:scale-110 transition-transform">
<span className="material-symbols-outlined text-[32px]" data-icon="person_pin">person_pin</span>
</div>
<h3 className="text-headline-md font-headline-md text-white">Automated Tenant Portals</h3>
<p className="text-surface-variant font-body-md">Provide residents with a modern interface for digital payments, document storage, and direct communication.</p>
</div>
<div className="p-10 bg-white/5 rounded-3xl border border-white/10 flex flex-col items-center text-center gap-6 group hover:bg-white/[0.08] transition-all">
<div className="w-16 h-16 rounded-2xl bg-tertiary-container/20 flex items-center justify-center text-tertiary-fixed-dim border border-tertiary-container/30 group-hover:scale-110 transition-transform">
<span className="material-symbols-outlined text-[32px]" data-icon="handyman">handyman</span>
</div>
<h3 className="text-headline-md font-headline-md text-white">Maintenance Ticketing</h3>
<p className="text-surface-variant font-body-md">Seamless workflow for request submission, vendor assignment, and transparent tracking for all stakeholders.</p>
</div>
</div>
</div>
</section>
    );
}
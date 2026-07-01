export const  Plans = ()=>{
    return (
     <section className="max-w-container-max mx-auto px-margin-desktop py-24" id="pricing">
<div className="text-center mb-16 space-y-4">
<h2 className="text-headline-lg font-headline-lg text-on-surface">Flexible Plans for Every Portfolio</h2>
<p className="text-on-surface-variant font-body-lg max-w-2xl mx-auto">Scale your property management business with predictable pricing and premium support.</p>
</div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
<div className="p-10 bg-surface-container-low rounded-3xl border border-outline-variant/30 flex flex-col gap-8 transition-all hover:shadow-lg">
<div className="space-y-2">
<h3 className="text-headline-md font-headline-md">Starter</h3>
<div className="flex items-baseline gap-1">
<span className="text-headline-xl font-headline-xl">$99</span>
<span className="text-on-surface-variant font-body-md">/mo</span>
</div>
<p className="text-on-surface-variant font-body-md">Up to 20 units</p>
</div>
<ul className="space-y-4 flex-1">
<li className="flex items-center gap-3 text-on-surface-variant"><span className="material-symbols-outlined text-primary text-sm" data-icon="check_circle">check_circle</span> Basic Accounting</li>
<li className="flex items-center gap-3 text-on-surface-variant"><span className="material-symbols-outlined text-primary text-sm" data-icon="check_circle">check_circle</span> Tenant Portal Access</li>
<li className="flex items-center gap-3 text-on-surface-variant"><span className="material-symbols-outlined text-primary text-sm" data-icon="check_circle">check_circle</span> Email Support</li>
</ul>
<button className="w-full border-2 border-primary text-primary py-4 rounded-xl font-button hover:bg-primary/5 transition-all">Select Starter</button>
</div>
<div className="relative p-10 glass-card rounded-3xl border-2 border-primary flex flex-col gap-8 transition-all shadow-2xl scale-105 z-10 overflow-hidden">
<div className="absolute top-0 right-0 bg-primary text-on-primary px-6 py-1 rounded-bl-2xl text-label-caps font-label-caps">MOST POPULAR</div>
<div className="space-y-2">
<h3 className="text-headline-md font-headline-md">Professional</h3>
<div className="flex items-baseline gap-1">
<span className="text-headline-xl font-headline-xl">$249</span>
<span className="text-on-surface-variant font-body-md">/mo</span>
</div>
<p className="text-on-surface-variant font-body-md">Up to 100 units</p>
</div>
<ul className="space-y-4 flex-1">
<li className="flex items-center gap-3 text-on-surface"><span className="material-symbols-outlined text-secondary text-sm" data-icon="check_circle" 
style={{fontFeatureSettings: "'FILL' 1"}}>check_circle</span> Unlimited Units</li>
<li className="flex items-center gap-3 text-on-surface"><span className="material-symbols-outlined text-secondary text-sm" data-icon="check_circle" 
style={{fontFeatureSettings: "'FILL' 1"}}>check_circle</span> Custom Domain</li>
<li className="flex items-center gap-3 text-on-surface"><span className="material-symbols-outlined text-secondary text-sm" data-icon="check_circle" 
style={{fontFeatureSettings: "'FILL' 1"}}>check_circle</span> Premium Support</li>
<li className="flex items-center gap-3 text-on-surface"><span className="material-symbols-outlined text-secondary text-sm" data-icon="check_circle" 
style={{fontFeatureSettings: "'FILL' 1"}}>check_circle</span> Automated Marketing</li>
</ul>
<button className="w-full bg-primary text-on-primary py-4 rounded-xl font-button shadow-lg shadow-primary/30 hover:opacity-90 transition-all">Start 14-Day Free Trial</button>
</div>
<div className="p-10 bg-surface-container-low rounded-3xl border border-outline-variant/30 flex flex-col gap-8 transition-all hover:shadow-lg">
<div className="space-y-2">
<h3 className="text-headline-md font-headline-md">Enterprise</h3>
<div className="flex items-baseline gap-1">
<span className="text-headline-xl font-headline-xl">$599</span>
<span className="text-on-surface-variant font-body-md">/mo</span>
</div>
<p className="text-on-surface-variant font-body-md">Unlimited units</p>
</div>
<ul className="space-y-4 flex-1">
<li className="flex items-center gap-3 text-on-surface-variant"><span className="material-symbols-outlined text-primary text-sm" data-icon="check_circle">check_circle</span> API Integration</li>
<li className="flex items-center gap-3 text-on-surface-variant"><span className="material-symbols-outlined text-primary text-sm" data-icon="check_circle">check_circle</span> Multi-Entity Reporting</li>
<li className="flex items-center gap-3 text-on-surface-variant"><span className="material-symbols-outlined text-primary text-sm" data-icon="check_circle">check_circle</span> Dedicated Manager</li>
</ul>
<button className="w-full border-2 border-outline text-on-surface py-4 rounded-xl font-button hover:bg-surface-container-high transition-all">Contact Sales</button>
</div>
</div>
</section>
    );
}
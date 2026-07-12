'use client';
import Image from 'next/image';

export const PlanDetails = ({ plan }) => {
    
    const total = plan.price ;

    return (
        <section className="md:col-span-5 flex flex-col gap-8">
            <div>
                <h1 className="font-headline-lg text-headline-lg mb-2">Review your order</h1>
                <p className="text-on-surface-variant">Complete your subscription to unlock premium real estate insights.</p>
            </div>
            
            <div className="glass-panel p-8 rounded-xl shadow-sm flex flex-col gap-6" style={{ background: "rgba(255, 255, 255, 0.8)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", border: "1px solid rgba(255, 255, 255, 0.5)" }}>
                <div className="flex justify-between items-start">
                    <div>
                        <span className="font-label-caps text-label-caps text-primary uppercase">Current Selection</span>
                        <h2 className="font-headline-md text-headline-md mt-1">{plan.name}</h2>
                        <p className="text-on-surface-variant text-body-md">{plan.billingCycle}</p>
                    </div>
                    <div className="text-right">
                        <span className="font-headline-md text-headline-md text-[#10b981]">${plan.price.toFixed(2)}</span>
                        <p className="text-on-surface-variant text-label-caps">/ MONTH</p>
                    </div>
                </div>
                
                <hr className="border-outline-variant/30"/>
                
                <ul className="flex flex-col gap-4">
                    {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-secondary text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                            <span className="text-body-md">{feature}</span>
                        </li>
                    ))}
                </ul>
                
                <hr className="border-outline-variant/30"/>
                
                <div className="flex flex-col gap-2">
                   
                    
                    
                </div>
            </div>

            {/* Testimonial / Visual Anchor */}
            <div className="relative rounded-xl overflow-hidden h-48 flex items-end p-6 group">
                <Image 
                    alt="Modern office interior" 
                    className="transition-transform duration-700 group-hover:scale-105 object-cover" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuD0pUqHC9Z-vqLFPXAufsuBjBDP5Q_ysc8pKFNGzPKbq_qE4nxq2PNIVQ1ZQXNoy9WY7kUG4EwCVKFzMTJfyo6yJT3yIsf_CBBrPWElKrHyrrGOq99irXyyVgOQF2FSF2IKHxK7MUoPx06_oc-nz3mO758zyrIlDp1f_FBkwfb1Pl0_0lUFqBK33XrjGJvMc-YoReG1YGDekCHNKwARABcsHho4Up4k2nz5Cexfve0wNi8Y2KIgPGxxmMMwpDcd9Ijutr8PO1iNyg"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    unoptimized // using unoptimized for external URL to avoid needing immediate next.config.js changes for domains
                />
                <div className="absolute inset-0 bg-gradient-to-t from-on-surface/80 to-transparent z-10"></div>
                <div className="relative z-20">
                    <p className="text-white italic font-body-md">"EstateSync Pro transformed how we manage our luxury portfolio. The ROI was immediate."</p>
                    <p className="text-primary-fixed-dim font-label-caps mt-2">— SARAH JENKINS, DIRECTOR AT VANTAGE REALTY</p>
                </div>
            </div>
        </section>
    );
};

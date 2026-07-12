'use client';
import Link from 'next/link';

export const CheckoutForm = ({ totalAmount }) => {
    return (
        <section className="md:col-span-7">
            <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-8 md:p-12 shadow-sm">
                <div className="flex flex-col gap-8">
                    <div>
                        <h2 className="font-headline-md text-headline-md mb-2">Secure Payment</h2>
                        <div className="flex gap-4">
                            <div className="flex items-center gap-1 px-3 py-1 bg-surface-container rounded-full border border-outline-variant/20">
                                <span className="material-symbols-outlined text-[16px] text-secondary">lock</span>
                                <span className="font-label-caps text-label-caps">SSL ENCRYPTED</span>
                            </div>
                            <div className="flex items-center gap-1 px-3 py-1 bg-surface-container rounded-full border border-outline-variant/20">
                                <span className="material-symbols-outlined text-[16px] text-primary">verified</span>
                                <span className="font-label-caps text-label-caps">STRIPE SECURE</span>
                            </div>
                        </div>
                    </div>
                    
                    <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
                        {/* Cardholder Name */}
                        <div className="flex flex-col gap-2">
                            <label className="font-label-caps text-label-caps text-on-surface-variant" htmlFor="cardholder">CARDHOLDER NAME</label>
                            <input 
                                className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all font-body-md placeholder:text-outline" 
                                id="cardholder" 
                                placeholder="Enter name on card" 
                                type="text"
                            />
                        </div>
                        
                        {/* Card Details */}
                        <div className="flex flex-col gap-2">
                            <label className="font-label-caps text-label-caps text-on-surface-variant">CARD DETAILS</label>
                            <div className="relative">
                                <input 
                                    className="w-full bg-surface-container-low border border-outline-variant rounded-lg pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all font-body-md placeholder:text-outline" 
                                    placeholder="0000 0000 0000 0000" 
                                    type="text"
                                />
                                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">credit_card</span>
                            </div>
                            <div className="grid grid-cols-2 gap-4 mt-2">
                                <input 
                                    className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all font-body-md placeholder:text-outline" 
                                    placeholder="MM/YY" 
                                    type="text"
                                />
                                <input 
                                    className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all font-body-md placeholder:text-outline" 
                                    placeholder="CVC" 
                                    type="text"
                                />
                            </div>
                        </div>
                        
                        {/* Billing Address */}
                        <div className="flex flex-col gap-4">
                            <label className="font-label-caps text-label-caps text-on-surface-variant">BILLING ADDRESS</label>
                            <div className="grid grid-cols-1 gap-4">
                                <input 
                                    className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all font-body-md placeholder:text-outline" 
                                    placeholder="Street Address" 
                                    type="text"
                                />
                                <div className="grid grid-cols-2 gap-4">
                                    <input 
                                        className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all font-body-md placeholder:text-outline" 
                                        placeholder="City" 
                                        type="text"
                                    />
                                    <input 
                                        className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all font-body-md placeholder:text-outline" 
                                        placeholder="ZIP / Postal Code" 
                                        type="text"
                                    />
                                </div>
                                <select className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all font-body-md appearance-none">
                                    <option>United States</option>
                                    <option>Canada</option>
                                    <option>United Kingdom</option>
                                    <option>Australia</option>
                                </select>
                            </div>
                        </div>
                        
                        <div className="mt-4 flex flex-col gap-4">
                            <button 
                                className="w-full bg-primary text-on-primary font-button text-body-lg py-4 rounded-xl shadow-lift hover:opacity-90 active:scale-95 transition-all" 
                                type="submit"
                            >
                                Subscribe for ${totalAmount.toFixed(2)}
                            </button>
                            <p className="text-center text-on-surface-variant font-label-caps">
                                By clicking subscribe, you agree to our <Link className="text-primary hover:underline" href="#">Terms of Service</Link>.
                            </p>
                        </div>
                    </form>
                    
                    <div className="flex justify-center items-center gap-8 pt-8 border-t border-outline-variant/30 opacity-50 grayscale hover:grayscale-0 transition-all">
                        <span className="material-symbols-outlined text-[32px]">payments</span>
                        <span className="material-symbols-outlined text-[32px]">account_balance_wallet</span>
                        <span className="material-symbols-outlined text-[32px]">card_membership</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

import Link from 'next/link';

export const CTA = () => {
        return (
                <section className="max-w-[1200px] mx-auto px-margin-mobile md:px-margin-desktop py-24">
                        <div className="bg-primary-container rounded-[40px] p-12 md:p-20 text-center space-y-8 relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent"></div>
                                <div className="relative z-10 space-y-6">
                                        <h2 className="text-headline-lg font-headline-lg text-on-primary-container max-w-2xl mx-auto">Ready to transform your real estate business? Start your 14-day free trial.</h2>
                                        <p className="text-on-primary-container/80 font-body-lg">No credit card required. Join 2,500+ property managers today.</p>
                                        <div className="pt-4">
                                                <Link href="/register/agency?trial=true">
                                                        <div
                                                                className={` text-[white] bg-[#FF8C00] text-center w-full py-4 rounded-xl font-button transition-all`}
                                                        >
                                                                Get Started
                                                        </div>
                                                </Link>
                                        </div>
                                </div>
                        </div>
                </section>
        );
}
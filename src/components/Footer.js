import React  from "react"; 
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="w-full border-t border-outline-variant/30 dark:border-outline/20 bg-surface-container-lowest dark:bg-inverse-surface">
        <div className="w-full py-12 px-margin-desktop flex flex-col md:flex-row justify-between items-center max-w-container-max mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="text-headline-md font-headline-md font-bold text-primary dark:text-inverse-primary">EstateSync SaaS</div>
        <div className="text-on-surface-variant dark:text-surface-variant font-body-md">© 2024 EstateSync SaaS. All rights reserved.</div>
        </div>
        <nav className="flex flex-wrap justify-center gap-6 mt-8 md:mt-0">
        <a className="text-on-surface-variant dark:text-surface-variant font-label-caps hover:text-primary hover:underline transition-all" href="#">Privacy Policy</a>
        <a className="text-on-surface-variant dark:text-surface-variant font-label-caps hover:text-primary hover:underline transition-all" href="#">Terms of Service</a>
        <a className="text-on-surface-variant dark:text-surface-variant font-label-caps hover:text-primary hover:underline transition-all" href="#">Cookie Policy</a>
        <Link className="text-on-surface-variant dark:text-surface-variant font-label-caps hover:text-primary hover:underline transition-all" href="/contact">Contact Support</Link>
        </nav>
        </div>
        </footer>
    );
}
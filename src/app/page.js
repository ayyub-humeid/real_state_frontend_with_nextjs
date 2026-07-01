'use client';

// import FeaturedProperties from '@/features/landing/components/FeaturedProperties';
// import Hero from '@/features/landing/components/Hero';
// import PlatformFeatures from '@/features/landing/components/PlatformFeatures';
// import Preview from '@/features/landing/components/Preview';
// import Solutions from '@/features/landing/components/Solutions';
// import TrustBar from '@/features/landing/components/TrustBar';
import { useState, useEffect } from 'react';
// import Plans from '@/features/landing/components/Plans';
// import CTA from '@/features/landing/components/CTA';
import {
  Hero,CTA,Agencies,
  FeaturedProperties,
  Plans,PlatformFeatures,
  Preview,Solutions,
  TrustBar
} from '@/features/landing'; 

export default function Home() {
  // const [darkMode, setDarkMode] = useState(false);

  // useEffect(() => {
  //   if (darkMode) {
  //     document.documentElement.classList.add('dark');
  //   } else {
  //     document.documentElement.classList.remove('dark');
  //   }
  // }, [darkMode]);

  return (
    <div className="min-h-screen bg-surface text-on-surface transition-colors duration-300">
      {/* TopAppBar */}
    {/* main here */}
        {/* Hero Section */}
        <Hero/>
        {/* Solutions Grid */}
        <Solutions/>
        {/* Trust Bar */}
        <TrustBar/>
        {/*  Featured Properties  */}
        <FeaturedProperties/>
        {/* System Preview Section */}
        <Preview/>
        {/* <!-- 2. Premium Agency Directory --> */}
        <Agencies/>
        
        {/* <!-- 3. Platform Features --> */}
        <PlatformFeatures/>
         {/* plans */}
        <Plans/>
        {/*  CTA Footer Section  */}
       <CTA/>
      
    </div>
  );
}
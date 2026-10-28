'use client';

import React from 'react';
import { LenisProvider, useLenis } from '@/lib/lenis';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import BetterFoodSection from '@/components/BetterFoodSection';
import AppFeaturesSection from '@/components/AppFeaturesSection';
import EliteSection from '@/components/EliteSection';
import EcosystemSection from '@/components/EcosystemSection';
import DownloadSection from '@/components/DownloadSection';
import FooterSection from '@/components/FooterSection';

function MainContent() {
  const { scrollTo } = useLenis();

  return (
    <div className="relative min-h-screen bg-[#0B0B0C] text-[#0B0B0C] selection:bg-[#FF5B2E] selection:text-white">
      {/* Floating Glass Pill Navbar */}
      <Navbar />

      <main className="relative w-full overflow-hidden">
        {/* Section 1: Hero */}
        <HeroSection onScrollClick={() => scrollTo('#better-food')} />

        {/* Section 2: Better Food for More People */}
        <BetterFoodSection />

        {/* Section 3: App Features with Pinned Phone */}
        <AppFeaturesSection />

        {/* Section 4: Zozoto Elite VIP Membership */}
        <EliteSection />

        {/* Section 5: Connected Orbitly Ecosystem */}
        <EcosystemSection />

        {/* Section 6: Instant Download & QR */}
        <DownloadSection />
      </main>

      {/* Section 7: Footer */}
      <FooterSection />
    </div>
  );
}

export default function HomePage() {
  return (
    <LenisProvider>
      <MainContent />
    </LenisProvider>
  );
}

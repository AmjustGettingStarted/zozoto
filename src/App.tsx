/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { LenisProvider, useLenis } from './lib/lenis.tsx';
import Navbar from './components/Navbar.tsx';
import HeroSection from './components/HeroSection.tsx';
import BetterFoodSection from './components/BetterFoodSection.tsx';
import AppFeaturesSection from './components/AppFeaturesSection.tsx';
import EliteSection from './components/EliteSection.tsx';
import EcosystemSection from './components/EcosystemSection.tsx';
import DownloadSection from './components/DownloadSection.tsx';
import FooterSection from './components/FooterSection.tsx';

function MainContent() {
  const { scrollTo } = useLenis();

  return (
    <div className="relative min-h-screen bg-[#0B0B0C] text-[#0B0B0C] selection:bg-[#FF5B2E] selection:text-white">
      {/* Floating Glass Navbar */}
      <Navbar />

      <main className="relative w-full overflow-hidden">
        {/* Section 1: Hero (100vh, pinned, video background, parallax) */}
        <HeroSection onScrollClick={() => scrollTo('#better-food')} />

        {/* Section 2: Better Food For More People (Curved white curtain overlap) */}
        <BetterFoodSection />

        {/* Section 3: What's Waiting For You On The App (Pinned phone & chips) */}
        <AppFeaturesSection />

        {/* Section 4: Premium Membership Zozoto Elite (Curved top/bottom, gold coins) */}
        <EliteSection />

        {/* Section 5: Ecosystem Orbitly (Pastel tilt cards, staggered parallax) */}
        <EcosystemSection />

        {/* Section 6: Download The App Now (Wide rounded blush card & QR phone) */}
        <DownloadSection />
      </main>

      {/* Section 7: Footer (Black, 5 columns, social links & legal) */}
      <FooterSection />
    </div>
  );
}

export default function App() {
  return (
    <LenisProvider>
      <MainContent />
    </LenisProvider>
  );
}

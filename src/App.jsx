import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import LogoMarquee from './components/LogoMarquee/LogoMarquee';
import BentoFeatures from './components/Features/BentoFeatures';
import Pricing from './components/Pricing/Pricing';
import Testimonials from './components/Testimonials/Testimonials';
import CTABanner from './components/CTABanner/CTABanner';
import Footer from './components/Footer/Footer';
import { useScrollReveal } from './hooks/useScrollReveal';
import { use3dEffects } from './hooks/use3dEffects';
import CursorSprinkles from './components/CursorSprinkles/CursorSprinkles';
import BackgroundParticles from './components/BackgroundParticles/BackgroundParticles';

export default function App() {
  // Bind IntersectionObserver triggers for scroll animations
  useScrollReveal();
  use3dEffects();

  return (
    <>
      <CursorSprinkles />
      <BackgroundParticles />
      <Navbar />
      <main>
        <Hero />
        <LogoMarquee />
        <BentoFeatures />
        <Pricing />
        <Testimonials />
        <CTABanner />
      </main>
      <Footer />
    </>
  );
}

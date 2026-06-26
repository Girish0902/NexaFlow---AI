import React, { useEffect, useRef } from 'react';
import { init } from './hero3d';
import './Hero.css';

export default function Hero() {
  const canvasRef = useRef(null);
  const heroRef = useRef(null);

  useEffect(() => {
    let cleanup = () => {};
    
    const HERO_CONFIG = {
      particleCount: 120,
      particleSize: 1.8,
      connectionDist: 120,
      colorPrimary: 0xFFC801, // Forsythia
      colorSecondary: 0xFF9932, // Deep Saffron
      bgColor: 0x080c0f, // Pitch Black
      cameraZ: 350,
      driftSpeed: 0.0003,
      mouseParallax: 0.05,
      connectOpacity: 0.25,
    };

    const handleLoad = () => {
      init(canvasRef.current, HERO_CONFIG).then(clean => {
        cleanup = clean;
      });
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
    }

    // Scroll listener for zoom effect
    const handleScroll = () => {
      if (!heroRef.current) return;
      const scrolled = window.scrollY;
      const height = heroRef.current.offsetHeight || 800;
      const factor = Math.min(scrolled / height, 1);
      heroRef.current.style.setProperty('--hero-scroll-zoom', factor);
    };

    // Mouse listener for glow parallax
    const handleMouseMove = (e) => {
      if (!heroRef.current) return;
      const mx = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
      const my = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
      heroRef.current.style.setProperty('--hero-mx', mx);
      heroRef.current.style.setProperty('--hero-my', my);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('load', handleLoad);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      cleanup();
    };
  }, []);

  return (
    <section id="hero" ref={heroRef} aria-label="Hero Section" className="hero-section">
      <canvas ref={canvasRef} className="hero-canvas" aria-hidden="true" />
      
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-eyebrow-wrapper">
            <span className="hero-eyebrow">AI-POWERED DATA AUTOMATION</span>
          </div>
          <h1 className="hero-title"><span className="text-shimmer-white">Automate Complexity.</span><br /><span className="text-gradient">Scale Intelligence.</span></h1>
          <p className="hero-sub">
            The high-performance platform for enterprise data teams. Sub-second normalization, SOC2-compliant governance, and observability at petabyte scale.
          </p>
          <div className="hero-cta-row">
            <a href="#pricing" className="hero-cta-primary">Get Started Free &rarr;</a>
            <a href="#features" className="hero-cta-ghost">Book Demo</a>
          </div>
        </div>
        
        <div className="hero-visual-offset" aria-hidden="true"></div>
      </div>

      <div className="hero-stats">
        <div className="stats-container">
          <div className="stat-item">
            <span className="stat-value">99.9%</span>
            <span className="stat-label">Uptime SLA</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">10M+</span>
            <span className="stat-label">API Calls</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">&lt;50ms</span>
            <span className="stat-label">Latency</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">SOC2</span>
            <span className="stat-label">Certified</span>
          </div>
        </div>
      </div>
    </section>
  );
}

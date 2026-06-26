import React, { useState, useEffect } from 'react';
import './Navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header role="banner" className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <nav className="nav-container" aria-label="Primary navigation">
        <a href="#" className="nav-logo">NexaFlow</a>

        <div className="nav-links-desktop">
          <a href="#features">Features</a>
          <a href="#pricing">Pricing</a>
          <a href="#testimonials">Testimonials</a>
          <a href="#about">About</a>
        </div>

        <div className="nav-actions">
          <button className="search-btn" aria-label="Search" title="Search">
            <img src="/icons/search.svg" alt="" aria-hidden="true" width="20" height="20" />
          </button>
          <a href="#pricing" className="nav-cta">Get Started</a>
          <button 
            className="mobile-toggle" 
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div className={`mobile-drawer ${mobileMenuOpen ? 'open' : ''}`} aria-hidden={!mobileMenuOpen}>
        <div className="drawer-header">
          <span className="nav-logo">NexaFlow</span>
          <button 
            className="close-btn" 
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close navigation menu"
          >
            <img src="/icons/x-mark.svg" alt="" aria-hidden="true" width="24" height="24" />
          </button>
        </div>
        <div className="drawer-links">
          <a href="#features" onClick={() => setMobileMenuOpen(false)}>Features</a>
          <a href="#pricing" onClick={() => setMobileMenuOpen(false)}>Pricing</a>
          <a href="#testimonials" onClick={() => setMobileMenuOpen(false)}>Testimonials</a>
          <a href="#about" onClick={() => setMobileMenuOpen(false)}>About</a>
          <a href="#pricing" className="drawer-cta" onClick={() => setMobileMenuOpen(false)}>Get Started</a>
        </div>
      </div>
      {mobileMenuOpen && <div className="drawer-backdrop" onClick={() => setMobileMenuOpen(false)}></div>}
    </header>
  );
}

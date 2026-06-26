import React, { useEffect, useRef } from 'react';
import { usePricingController } from './usePricingController';
import { PRICING_MATRIX } from './pricingMatrix';
import './Pricing.css';

export default function Pricing() {
  const { registerRef, updatePrices } = usePricingController();
  
  const currencyRef = useRef('INR');
  const isAnnualRef = useRef(false);
  const dropdownRef = useRef(null);
  const dropdownBtnRef = useRef(null);
  const monthlyLabelRef = useRef(null);
  const annualLabelRef = useRef(null);
  const toggleBtnRef = useRef(null);

  useEffect(() => {
    // Perform initial price updates on load
    updatePrices(currencyRef.current, isAnnualRef.current);

    // Dismiss dropdown on outside clicks
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target) && 
          dropdownBtnRef.current && !dropdownBtnRef.current.contains(e.target)) {
        dropdownRef.current.classList.remove('open');
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [updatePrices]);

  const toggleDropdown = () => {
    if (dropdownRef.current) {
      dropdownRef.current.classList.toggle('open');
    }
  };

  const handleCurrencySelect = (cur) => {
    currencyRef.current = cur;
    if (dropdownBtnRef.current) {
      const span = dropdownBtnRef.current.querySelector('.currency-code');
      if (span) span.textContent = cur;
    }
    if (dropdownRef.current) {
      dropdownRef.current.classList.remove('open');
      const items = dropdownRef.current.querySelectorAll('.currency-item');
      items.forEach(item => {
        item.classList.toggle('selected', item.getAttribute('data-value') === cur);
      });
    }
    updatePrices(currencyRef.current, isAnnualRef.current);
  };

  const handleToggle = () => {
    isAnnualRef.current = !isAnnualRef.current;
    
    if (toggleBtnRef.current) {
      toggleBtnRef.current.classList.toggle('annual', isAnnualRef.current);
    }
    if (monthlyLabelRef.current) {
      monthlyLabelRef.current.classList.toggle('active', !isAnnualRef.current);
    }
    if (annualLabelRef.current) {
      annualLabelRef.current.classList.toggle('active', isAnnualRef.current);
    }
    
    updatePrices(currencyRef.current, isAnnualRef.current);
  };

  return (
    <section id="pricing" aria-label="Pricing Matrix" className="pricing-section reveal">
      <div className="pricing-header">
        <span className="pricing-eyebrow">PRICING PLANS</span>
        <h2 className="pricing-title">Technical Tiers</h2>
        <p className="pricing-sub">
          Scalable compute options for teams of all sizes.
        </p>
      </div>

      <div className="pricing-controls">
        {/* Billing Toggle */}
        <div className="billing-toggle-wrapper">
          <span ref={monthlyLabelRef} className="toggle-label active">Monthly</span>
          <button 
            ref={toggleBtnRef}
            className="billing-toggle"
            onClick={handleToggle}
            aria-label="Toggle annual billing discount"
          >
            <span className="toggle-thumb"></span>
          </button>
          <span ref={annualLabelRef} className="toggle-label">
            Annual <span className="discount-badge">20% OFF</span>
          </span>
        </div>

        {/* Currency Dropdown */}
        <div className="currency-dropdown-wrapper">
          <button 
            ref={dropdownBtnRef}
            className="currency-dropdown-btn"
            onClick={toggleDropdown}
            aria-haspopup="listbox"
          >
            <span className="currency-code">INR</span>
            <img 
              src="/icons/chevron-down.svg" 
              alt="" 
              aria-hidden="true" 
              width="16" 
              height="16" 
              className="dropdown-chevron" 
            />
          </button>
          
          <ul ref={dropdownRef} className="currency-list" role="listbox">
            {Object.keys(PRICING_MATRIX.tariffs).map((cur) => (
              <li 
                key={cur}
                data-value={cur}
                className={`currency-item ${cur === 'INR' ? 'selected' : ''}`}
                onClick={() => handleCurrencySelect(cur)}
                role="option"
              >
                {cur} ({PRICING_MATRIX.tariffs[cur].symbol})
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="pricing-grid reveal-stagger">
        {/* Starter Card */}
        <div className="pricing-card">
          <div className="card-header">
            <h3 className="tier-name">Starter</h3>
            <p className="tier-desc">For developers and small prototypes.</p>
          </div>
          <div className="price-container">
            <span className="original-price" ref={el => registerRef('starter-original', el)}></span>
            <span className="price-display">
              <span className="current-price" ref={el => registerRef('starter-current', el)}>Free</span>
              <span className="billing-cycle" ref={el => registerRef('starter-billing', el)}>/mo</span>
            </span>
            <div className="price-billing-detail" ref={el => registerRef('starter-detail', el)}></div>
          </div>
          <ul className="tier-features">
            <li>1 workspace</li>
            <li>5 pipelines</li>
            <li>1K runs/mo</li>
            <li>Community support</li>
          </ul>
          <a href="#" className="pricing-cta">INITIATE BASELINE</a>
        </div>

        {/* Pro Card */}
        <div className="pricing-card popular">
          <span className="popular-badge">RECOMMENDED</span>
          <div className="card-header">
            <h3 className="tier-name">Pro</h3>
            <p className="tier-desc">For growing startups and production workflows.</p>
          </div>
          <div className="price-container">
            <span className="original-price" ref={el => registerRef('pro-original', el)}></span>
            <span className="price-display">
              <span className="current-price" ref={el => registerRef('pro-current', el)}>Rs.1,999</span>
              <span className="billing-cycle" ref={el => registerRef('pro-billing', el)}>/mo</span>
            </span>
            <div className="price-billing-detail" ref={el => registerRef('pro-detail', el)}></div>
          </div>
          <ul className="tier-features">
            <li>5 workspaces</li>
            <li>Unlimited pipelines</li>
            <li>100K runs/mo</li>
            <li>Priority email support</li>
            <li>Custom API integrations</li>
          </ul>
          <a href="#" className="pricing-cta">UPGRADE TO PRO</a>
        </div>

        {/* Scale Card */}
        <div className="pricing-card">
          <div className="card-header">
            <h3 className="tier-name">Scale</h3>
            <p className="tier-desc">For enterprises needing scale and compliance.</p>
          </div>
          <div className="price-container">
            <span className="original-price" ref={el => registerRef('scale-original', el)}></span>
            <span className="price-display">
              <span className="current-price" ref={el => registerRef('scale-current', el)}>Rs.5,999</span>
              <span className="billing-cycle" ref={el => registerRef('scale-billing', el)}>/mo</span>
            </span>
            <div className="price-billing-detail" ref={el => registerRef('scale-detail', el)}></div>
          </div>
          <ul className="tier-features">
            <li>Unlimited workspaces</li>
            <li>Unlimited pipelines</li>
            <li>SSO / SAML authentication</li>
            <li>Audit logs & Compliance</li>
            <li>SLA 99.9% guarantee</li>
            <li>24/7 dedicated support</li>
          </ul>
          <a href="#" className="pricing-cta">CONTACT ARCHITECT</a>
        </div>
      </div>
    </section>
  );
}

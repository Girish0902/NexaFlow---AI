import React from 'react';
import './LogoMarquee.css';

export default function LogoMarquee() {
  const partners = [
    'AWS', 'GCP', 'Azure', 'Stripe', 'Salesforce', 'HubSpot', 'Snowflake', 'BigQuery'
  ];

  // Double the array to make the infinite scroll continuous without visual jumps
  const doubledPartners = [...partners, ...partners];

  return (
    <section id="logos" className="logo-marquee-section" aria-label="Partner Integrations">
      <div className="marquee-wrapper">
        <div className="marquee-content">
          {doubledPartners.map((partner, idx) => (
            <div key={idx} className="partner-logo">
              {partner}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

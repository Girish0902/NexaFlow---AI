import React, { useState, useEffect, useRef, useCallback } from 'react';
import AccordionList from './AccordionList';
import './Features.css';

const MOBILE_BREAKPOINT = 768;

export const FEATURES_DATA = [
  {
    id: 'F1',
    icon: 'cube-16-solid.svg',
    title: 'Automated Normalization',
    description: 'Instantly map disparate data schemas into a unified, high-integrity canonical format using adaptive AI models. [MAPPER_v2.0 ACTIVE]',
    spanClass: 'f1'
  },
  {
    id: 'F2',
    icon: 'arrow-trending-up.svg',
    title: 'SOC2 Governance',
    description: 'Built-in audit trails, row-level security, and PII masking as standard. Certified industrial safety. [CERTIFIED] [ENCRYPTED]',
    spanClass: 'f2'
  },
  {
    id: 'F3',
    icon: 'cog-8-tooth.svg',
    title: 'Sub-Second Latency',
    description: 'Proprietary edge-compute engine processes streams in near real-time without buffering. [84ms]',
    spanClass: 'f3'
  },
  {
    id: 'F4',
    icon: 'chart-pie.svg',
    title: 'Real-time Observability',
    description: 'Live telemetry and health monitoring for every node in your global automation mesh. [TELEMETRY ACTIVE]',
    spanClass: 'f4'
  },
  {
    id: 'F5',
    icon: 'arrow-path.svg',
    title: 'Smart Data Sync',
    description: 'Bidirectional sync across warehouse & BI tools in <50ms. [SYNC COMPLETED]',
    spanClass: 'f5'
  },
  {
    id: 'F6',
    icon: 'link.svg',
    title: 'Enterprise Integrations',
    description: 'Native connectors: Salesforce, Snowflake, BigQuery + 150. [INTEGRATIONS ESTABLISHED]',
    spanClass: 'f6'
  }
];

export default function BentoFeatures() {
  const [activeIdx, setActiveIdx] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < MOBILE_BREAKPOINT);
  const prevMobile = useRef(window.innerWidth < MOBILE_BREAKPOINT);

  const handleResize = useCallback(() => {
    const nowMobile = window.innerWidth < MOBILE_BREAKPOINT;
    if (prevMobile.current !== nowMobile) {
      prevMobile.current = nowMobile;
      setIsMobile(nowMobile);
    }
  }, []);

  useEffect(() => {
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    const ro = new ResizeObserver(handleResize);
    ro.observe(document.documentElement);
    return () => ro.disconnect();
  }, [handleResize]);

  return (
    <section id="features" aria-label="Feature Showcase" className="features-section reveal">
      <div className="features-bg-animation" aria-hidden="true">
        <div className="features-glow-orb orb-1"></div>
        <div className="features-glow-orb orb-2"></div>
        <div className="features-glow-orb orb-3"></div>
      </div>
      <div className="features-header">
        <span className="features-eyebrow">CORE FEATURES</span>
        <h2 className="features-title">Engineered for Velocity</h2>
        <p className="features-sub">
          A modular, high-performance data operations suite designed to orchestrate and scale.
        </p>
      </div>

      <div className="features-container">
        {isMobile ? (
          <AccordionList 
            features={FEATURES_DATA} 
            active={activeIdx} 
            setActive={setActiveIdx} 
          />
        ) : (
          <div className="bento-grid reveal-stagger">
            {FEATURES_DATA.map((feat, idx) => (
              <div 
                key={feat.id} 
                className={`bento-card ${feat.spanClass} ${activeIdx === idx ? 'active' : ''}`}
                onMouseEnter={() => setActiveIdx(idx)}
                onMouseLeave={() => setActiveIdx(null)}
              >
                <div className="bento-icon-wrapper">
                  <img src={`/icons/${feat.icon}`} alt="" aria-hidden="true" width="24" height="24" />
                </div>
                <h3 className="bento-card-title">{feat.title}</h3>
                <p className="bento-card-desc">{feat.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

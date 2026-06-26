import React from 'react';
import './Features.css';

export default function AccordionList({ features, active, setActive }) {
  const toggleAccordion = (idx) => {
    if (active === idx) {
      setActive(null);
    } else {
      setActive(idx);
    }
  };

  return (
    <div className="accordion-list">
      {features.map((feat, idx) => {
        const isOpen = active === idx;
        return (
          <div 
            key={feat.id} 
            className={`accordion-item ${isOpen ? 'open' : ''}`}
          >
            <button 
              className="accordion-header" 
              onClick={() => toggleAccordion(idx)}
              aria-expanded={isOpen}
              aria-controls={`panel-${feat.id}`}
            >
              <div className="accordion-title-wrapper">
                <img 
                  src={`/icons/${feat.icon}`} 
                  alt="" 
                  aria-hidden="true" 
                  width="20" 
                  height="20" 
                  className="accordion-icon" 
                />
                <span className="accordion-title">{feat.title}</span>
              </div>
              <img 
                src={isOpen ? "/icons/chevron-up.svg" : "/icons/chevron-down.svg"} 
                alt="" 
                aria-hidden="true" 
                width="16" 
                height="16" 
                className="chevron" 
              />
            </button>
            
            <div 
              id={`panel-${feat.id}`} 
              className={`accordion-panel ${isOpen ? 'open' : ''}`}
              role="region"
            >
              <div>
                <p className="accordion-desc">{feat.description}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

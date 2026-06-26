import React, { useState, useEffect, useRef } from 'react';
import './Testimonials.css';

const TESTIMONIALS_DATA = [
  {
    id: 1,
    quote: "NexaFlow transformed our data engineering workflow. Pipelines that used to take days to write are now built in minutes with zero friction.",
    author: "Alex Cristache",
    role: "VP of Engineering at Datasoft",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100&q=80"
  },
  {
    id: 2,
    quote: "The re-render optimization and direct DOM injection is next level. Our dashboards load instantly, and we haven't seen a single layout shift.",
    author: "Sarah Jenkins",
    role: "Lead Platform Architect at CloudBase",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80"
  },
  {
    id: 3,
    quote: "Incredibly premium design system. It felt cohesive right out of the box, and the responsive bento-to-accordion layout is extremely slick.",
    author: "David Chen",
    role: "CTO at FlowState AI",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80"
  }
];

export default function Testimonials() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const autoPlayRef = useRef(null);

  const nextSlide = () => {
    setActiveIdx((prev) => (prev + 1) % TESTIMONIALS_DATA.length);
  };

  const prevSlide = () => {
    setActiveIdx((prev) => (prev - 1 + TESTIMONIALS_DATA.length) % TESTIMONIALS_DATA.length);
  };

  useEffect(() => {
    if (!isPaused) {
      autoPlayRef.current = setInterval(nextSlide, 4000);
    }
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isPaused]);

  return (
    <section id="testimonials" aria-label="Customer Testimonials" className="testimonials-section reveal">
      <div className="testimonials-header">
        <span className="testimonials-eyebrow">TESTIMONIALS</span>
        <h2 className="testimonials-title">What Architects Say</h2>
      </div>

      <div 
        className="testimonials-carousel"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="testimonial-track">
          {TESTIMONIALS_DATA.map((t, idx) => {
            const isActive = activeIdx === idx;
            return (
              <article 
                key={t.id} 
                className={`testimonial-card ${isActive ? 'active' : ''}`}
                aria-hidden={!isActive}
              >
                <p className="testimonial-quote">"{t.quote}"</p>
                <div className="testimonial-author-info">
                  <img src={t.avatar} alt={t.author} className="author-avatar" width="48" height="48" />
                  <div>
                    <h3 className="author-name">{t.author}</h3>
                    <p className="author-role">{t.role}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Carousel Navigation */}
        <div className="carousel-nav">
          <button 
            className="carousel-control prev" 
            onClick={prevSlide}
            aria-label="Previous testimonial"
          >
            <img src="/icons/chevron-left.svg" alt="" aria-hidden="true" width="20" height="20" />
          </button>
          <div className="carousel-indicators">
            {TESTIMONIALS_DATA.map((_, idx) => (
              <button
                key={idx}
                className={`indicator-dot ${activeIdx === idx ? 'active' : ''}`}
                onClick={() => setActiveIdx(idx)}
                aria-label={`Go to testimonial ${idx + 1}`}
                aria-selected={activeIdx === idx}
              ></button>
            ))}
          </div>
          <button 
            className="carousel-control next" 
            onClick={nextSlide}
            aria-label="Next testimonial"
          >
            <img src="/icons/chevron-right.svg" alt="" aria-hidden="true" width="20" height="20" />
          </button>
        </div>
      </div>
    </section>
  );
}

import { useEffect } from 'react';

export function useScrollReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll('.reveal, .reveal-stagger');
    if (elements.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        } else {
          // Detect if the element exited the observer box at the bottom of the viewport
          // When exiting at the bottom, rect.top is near viewportHeight (> 100px)
          // When exiting at the top, rect.top is negative (above viewport)
          const rect = entry.boundingClientRect;
          if (rect.top > 100) {
            entry.target.classList.remove('visible');
          }
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

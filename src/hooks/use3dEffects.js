import { useEffect } from 'react';

export function use3dEffects() {
  useEffect(() => {
    // Spotlight glow interaction mapping for bento cards and pricing cards
    const handleMouseMove = (e) => {
      const card = e.target.closest('.bento-card, .pricing-card');
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Update custom properties for the mouse-following spotlight border and inner glow
      card.style.setProperty('--shimmer-x', `${x}px`);
      card.style.setProperty('--shimmer-y', `${y}px`);
      card.style.setProperty('--shimmer-opacity', '1');
    };

    const handleMouseLeave = (e) => {
      const card = e.target.closest('.bento-card, .pricing-card');
      if (!card) return;

      // Avoid resetting transform/opacity if we are just moving between child elements of the same card
      const related = e.relatedTarget;
      if (related && card.contains(related)) return;

      // Fade out spotlight smoothly
      card.style.setProperty('--shimmer-opacity', '0');
    };

    // Use event delegation on document for robust performance and dynamic rendering support
    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseout', handleMouseLeave, { passive: true });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseout', handleMouseLeave);
    };
  }, []);
}

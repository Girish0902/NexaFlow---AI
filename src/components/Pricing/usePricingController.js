import { useRef, useCallback } from 'react';
import { computePrice, PRICING_MATRIX } from './pricingMatrix';

export function usePricingController() {
  const priceRefs = useRef({}); // refs to price elements

  const registerRef = useCallback((key, el) => {
    if (el) {
      priceRefs.current[key] = el;
    }
  }, []);

  // Direct DOM text-node mutation — zero React re-render
  const updatePrices = useCallback((currency, isAnnual) => {
    Object.keys(PRICING_MATRIX.tiers).forEach(tierKey => {
      const currentEl = priceRefs.current[tierKey + '-current'];
      const originalEl = priceRefs.current[tierKey + '-original'];
      const billingEl = priceRefs.current[tierKey + '-billing'];
      const detailEl = priceRefs.current[tierKey + '-detail'];

      const prices = computePrice(tierKey, currency, isAnnual);

      // 1. Update current price display
      if (currentEl) {
        if (prices.monthly === 0) {
          currentEl.textContent = 'Free';
        } else {
          currentEl.textContent = prices.symbol + prices.monthly.toLocaleString();
        }
      }

      // 2. Update original price display (strikethrough when annual is selected)
      if (originalEl) {
        if (prices.monthly === 0 || !isAnnual) {
          originalEl.textContent = '';
          originalEl.style.display = 'none';
        } else {
          originalEl.textContent = prices.symbol + prices.originalMonthly.toLocaleString();
          originalEl.style.display = 'inline';
        }
      }

      // 3. Update billing details (e.g. show annual total)
      if (billingEl) {
        billingEl.textContent = prices.monthly === 0 ? '' : '/mo';
      }
      if (detailEl) {
        if (prices.monthly === 0) {
          detailEl.textContent = '';
        } else if (isAnnual) {
          detailEl.textContent = `Billed annually (${prices.symbol}${prices.annual.toLocaleString()}/yr)`;
        } else {
          detailEl.textContent = 'Billed monthly';
        }
      }
    });
  }, []);

  return { registerRef, updatePrices };
}

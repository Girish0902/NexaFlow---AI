// pricingMatrix.js — single source of truth for ALL price values
export const PRICING_MATRIX = {
  tiers: {
    starter: { base_inr: 0, label: 'Starter', popular: false },
    pro: { base_inr: 1999, label: 'Pro', popular: true },
    scale: { base_inr: 5999, label: 'Scale', popular: false },
  },
  tariffs: {
    INR: { symbol: 'Rs.', multiplier: 1.000 },
    USD: { symbol: '$', multiplier: 0.012 },
    EUR: { symbol: 'EUR', multiplier: 0.011 },
  },
  annual_discount: 0.20, // flat 20% off
};

export function computePrice(tierKey, currency, isAnnual) {
  const { base_inr } = PRICING_MATRIX.tiers[tierKey];
  const { symbol, multiplier } = PRICING_MATRIX.tariffs[currency];
  
  // Calculate the base monthly rate in the selected currency
  const base = Math.floor(base_inr * multiplier);
  
  const originalMonthly = base;
  const originalAnnual = base * 12;
  
  const discountedMonthly = Math.round(base * (1 - PRICING_MATRIX.annual_discount));
  const discountedAnnual = discountedMonthly * 12;
  
  return {
    symbol,
    originalMonthly,
    originalAnnual,
    discountedMonthly,
    discountedAnnual,
    monthly: isAnnual ? discountedMonthly : originalMonthly,
    annual: isAnnual ? discountedAnnual : originalAnnual,
  };
}

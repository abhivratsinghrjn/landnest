/**
 * LandNest Property Value Prediction Engine
 *
 * Algorithm: Weighted Multi-Factor Scoring Model
 *
 * This uses a rule-based regression approach combining:
 * 1. Base growth rate for Chhattisgarh tier-2/3 cities (RBI data: ~6-9% CAGR)
 * 2. Category multiplier (farm land appreciates faster due to RERA & highway projects)
 * 3. Price-per-sqft efficiency score (underpriced = higher upside)
 * 4. Location premium scoring (keyword-based NLP on location string)
 * 5. Area size factor (mid-size plots have best liquidity)
 * 6. Compound Annual Growth Rate (CAGR) formula for projections
 * 7. ROI recovery using simple payback period formula
 */

export interface PropertyForecast {
  annualGrowthRate: number;      // % per year
  fiveYearGrowth: number;        // % total over 5 years
  tenYearGrowth: number;         // % total over 10 years
  roiRecoveryYears: number;      // years to 100% ROI
  confidenceLevel: "High" | "Medium" | "Low";
  projectedValues: {             // year-by-year projected values
    year: number;
    value: number;
    label: string;
  }[];
  factors: {                     // what drove the score
    label: string;
    impact: "positive" | "neutral" | "negative";
    description: string;
  }[];
}

// ── Base rates (sourced from RBI Housing Price Index & CG state data) ──
const BASE_RATE_BY_CATEGORY: Record<string, number> = {
  farm: 9.5,        // Agricultural land in CG: high demand due to highway projects
  residential: 7.2, // Tier-2/3 residential: steady urbanisation
  commercial: 8.1,  // Commercial: growing with digital economy
};

// ── Location premium keywords (Rajnandgaon & CG context) ──
const PREMIUM_KEYWORDS = [
  { words: ["civil lines", "civil"], bonus: 2.5 },
  { words: ["nh", "national highway", "bypass", "highway"], bonus: 3.0 },
  { words: ["station", "railway", "bus stand"], bonus: 1.8 },
  { words: ["market", "main road", "chowk"], bonus: 1.5 },
  { words: ["school", "college", "hospital"], bonus: 1.2 },
  { words: ["rajnandgaon"], bonus: 0.8 },
  { words: ["raipur", "bhilai", "durg"], bonus: 1.5 },
  { words: ["village", "gram", "gaon"], bonus: -1.0 },
  { words: ["remote", "jungle", "forest"], bonus: -2.0 },
];

// ── Price efficiency scoring ──
// Compares price/sqft against Rajnandgaon market averages
const MARKET_AVG_PRICE_PER_SQFT: Record<string, number> = {
  farm: 150,        // ₹150/sqft avg for agricultural land
  residential: 1800, // ₹1800/sqft avg for residential
  commercial: 2500,  // ₹2500/sqft avg for commercial
};

function getLocationBonus(location: string): number {
  const loc = location.toLowerCase();
  let bonus = 0;
  for (const { words, bonus: b } of PREMIUM_KEYWORDS) {
    if (words.some(w => loc.includes(w))) {
      bonus += b;
    }
  }
  return Math.max(-3, Math.min(4, bonus)); // clamp between -3 and +4
}

function getPriceEfficiencyBonus(price: number, area: number, category: string): number {
  if (area <= 0) return 0;
  const pricePerSqft = price / area;
  const marketAvg = MARKET_AVG_PRICE_PER_SQFT[category] || 1800;
  const ratio = pricePerSqft / marketAvg;

  // Underpriced (ratio < 0.8) = higher growth potential
  // Overpriced (ratio > 1.3) = lower growth potential
  if (ratio < 0.6) return 2.5;
  if (ratio < 0.8) return 1.5;
  if (ratio < 1.0) return 0.8;
  if (ratio < 1.2) return 0.0;
  if (ratio < 1.5) return -0.8;
  return -1.5;
}

function getAreaSizeBonus(area: number, category: string): number {
  // Mid-size plots have best liquidity and appreciation
  if (category === "farm") {
    if (area < 4047) return -0.5;   // < 1 acre: small, limited
    if (area < 20235) return 1.0;   // 1-5 acres: sweet spot
    if (area < 80940) return 0.5;   // 5-20 acres: good
    return -0.5;                     // > 20 acres: harder to sell
  } else {
    if (area < 50) return -0.5;     // < 50 sqm: small flat
    if (area < 200) return 1.0;     // 50-200 sqm: sweet spot
    if (area < 500) return 0.5;     // 200-500 sqm: good
    return 0.0;                      // large plots: stable
  }
}

function getConfidence(totalBonus: number): "High" | "Medium" | "Low" {
  if (totalBonus >= 3) return "High";
  if (totalBonus >= 0) return "Medium";
  return "Low";
}

// ── CAGR formula: FV = PV × (1 + r)^n ──
function projectValue(presentValue: number, annualRate: number, years: number): number {
  return presentValue * Math.pow(1 + annualRate / 100, years);
}

// ── ROI Recovery: years to double investment ──
// Using Rule of 72 approximation: years = 72 / rate
function roiRecoveryYears(annualRate: number): number {
  if (annualRate <= 0) return 99;
  return Math.round(72 / annualRate);
}

export function predictPropertyGrowth(property: {
  price: number;
  area: number;
  category: string;
  type: string;
  location: string;
}): PropertyForecast {
  const { price, area, category, location } = property;

  // ── Step 1: Base rate from category ──
  const baseRate = BASE_RATE_BY_CATEGORY[category] || 7.0;

  // ── Step 2: Location premium ──
  const locationBonus = getLocationBonus(location);

  // ── Step 3: Price efficiency ──
  const priceBonus = getPriceEfficiencyBonus(price, area, category);

  // ── Step 4: Area size factor ──
  const areaBonus = getAreaSizeBonus(area, category);

  // ── Step 5: Macro factor (CG infrastructure boom 2024-2030) ──
  const macroBonus = category === "farm" ? 1.2 : 0.8;

  // ── Step 6: Final annual growth rate ──
  const totalBonus = locationBonus + priceBonus + areaBonus + macroBonus;
  const annualRate = Math.max(3, Math.min(18, baseRate + totalBonus));
  const annualRateRounded = Math.round(annualRate * 10) / 10;

  // ── Step 7: Compound projections ──
  const fiveYearGrowth = Math.round(((projectValue(price, annualRateRounded, 5) - price) / price) * 100 * 10) / 10;
  const tenYearGrowth = Math.round(((projectValue(price, annualRateRounded, 10) - price) / price) * 100 * 10) / 10;

  // ── Step 8: Year-by-year projected values for chart ──
  const projectedValues = Array.from({ length: 11 }, (_, i) => ({
    year: new Date().getFullYear() + i,
    value: Math.round(projectValue(price, annualRateRounded, i)),
    label: i === 0 ? "Today" : `${i}Y`,
  }));

  // ── Step 9: ROI recovery ──
  const roi = roiRecoveryYears(annualRateRounded);

  // ── Step 10: Confidence ──
  const confidence = getConfidence(totalBonus);

  // ── Step 11: Human-readable factors ──
  const factors = [];

  if (locationBonus >= 2) {
    factors.push({ label: "Premium Location", impact: "positive" as const, description: "Near key infrastructure or commercial hub" });
  } else if (locationBonus >= 0.5) {
    factors.push({ label: "Good Location", impact: "positive" as const, description: "Established residential/commercial area" });
  } else if (locationBonus < 0) {
    factors.push({ label: "Remote Location", impact: "negative" as const, description: "Distance from urban centre may slow appreciation" });
  }

  if (priceBonus > 0) {
    factors.push({ label: "Undervalued Asset", impact: "positive" as const, description: "Priced below market average — higher upside potential" });
  } else if (priceBonus < -0.5) {
    factors.push({ label: "Premium Priced", impact: "neutral" as const, description: "Priced above market average — steady but moderate growth" });
  }

  if (category === "farm") {
    factors.push({ label: "Agricultural Land", impact: "positive" as const, description: "CG farm land demand rising due to highway & industrial projects" });
  } else if (category === "commercial") {
    factors.push({ label: "Commercial Property", impact: "positive" as const, description: "Digital economy driving commercial real estate demand" });
  }

  if (macroBonus > 0) {
    factors.push({ label: "CG Infrastructure Boom", impact: "positive" as const, description: "State-level development projects boosting tier-2/3 city values" });
  }

  return {
    annualGrowthRate: annualRateRounded,
    fiveYearGrowth,
    tenYearGrowth,
    roiRecoveryYears: roi,
    confidenceLevel: confidence,
    projectedValues,
    factors,
  };
}

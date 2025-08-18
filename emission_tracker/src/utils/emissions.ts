export type VehicleType = 'light' | 'heavy';

// L/100km
const FUEL_ECONOMY: Record<VehicleType, number> = { 
  light: 7.0,
  heavy: 35.0, 
};

// g/L, diesel
const EMISSION_FACTORS_LIGHT: Record<string, number> = {
  CO: 15,
  CO2: 2640,
  HC: 1.3,
  NOx: 0.4,
  PM: 0.02,
};

// g/L, diesel
const EMISSION_FACTORS_HEAVY: Record<string, number> = {
  CO: 15,
  CO2: 2640,
  HC: 1.1,
  CH4: 0.05,
  NOx: 8.0,
  NH3: 0.01,
  N2O: 0.06,
  PM: 0.25,
  PN: 2e12,
  Smoke: 0.5,
  NMHC: 0.6,
  NMOG: 0.8,
};

// grams
export interface Emissions {
  CO: number;
  CO2: number;
  HC: number;
  NOx: number;
  PM: number;
}

export function estimateFuelUsed(distanceKm: number, type: VehicleType): number {
  const litersPer100 = FUEL_ECONOMY[type];
  return (distanceKm * litersPer100) / 100;
}

export function estimateEmissions(
  distanceKm: number,
  type: VehicleType
): Emissions {
  const fuelUsed = estimateFuelUsed(distanceKm, type);

  if (type === 'light') {
    return {
      CO: fuelUsed * EMISSION_FACTORS_LIGHT.CO,
      CO2: fuelUsed * EMISSION_FACTORS_LIGHT.CO2,
      HC: fuelUsed * EMISSION_FACTORS_LIGHT.HC,
      NOx: fuelUsed * EMISSION_FACTORS_LIGHT.NOx,
      PM: fuelUsed * EMISSION_FACTORS_LIGHT.PM,
    };
  } else {
    const hcTotal = fuelUsed * (EMISSION_FACTORS_HEAVY.HC + EMISSION_FACTORS_HEAVY.CH4);
    return {
      CO: fuelUsed * EMISSION_FACTORS_HEAVY.CO,
      CO2: fuelUsed * EMISSION_FACTORS_HEAVY.CO2,
      HC: hcTotal,
      NOx: fuelUsed * EMISSION_FACTORS_HEAVY.NOx,
      PM: fuelUsed * EMISSION_FACTORS_HEAVY.PM,
    };
  }
}

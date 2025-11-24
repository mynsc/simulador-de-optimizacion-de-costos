/**
 * Custom Hook: useEnergy
 * 
 * Maneja toda la lógica de estado y cálculos relacionados con
 * el consumo energético y su acumulación mediante integrales.
 * 
 * CONCEPTO MATEMÁTICO: Integrales definidas
 * Calcula ∫₀²⁴ E(t) dt donde E(t) = A + B·sin(2πt/24)
 */

import { useState, useMemo } from 'react';
import { calculateTotalEnergy, calculateEnergyCost } from '../utils/mathCalculations';
import { ENERGY_DEFAULTS } from '../constants';

export const useEnergy = () => {
  // Estado de parámetros
  const [baseA, setBaseA] = useState(ENERGY_DEFAULTS.BASE_INITIAL);
  const [ampB, setAmpB] = useState(ENERGY_DEFAULTS.AMPLITUDE_INITIAL);

  // Cálculos memoizados
  const totalEnergy = useMemo(
    () => calculateTotalEnergy(baseA, ampB),
    [baseA, ampB]
  );

  const energyCost = useMemo(
    () => calculateEnergyCost(totalEnergy, ENERGY_DEFAULTS.PRICE_PER_KWH),
    [totalEnergy]
  );

  return {
    // Estado
    baseA,
    ampB,
    
    // Setters
    setBaseA,
    setAmpB,
    
    // Valores calculados
    totalEnergy,
    energyCost,
  };
};

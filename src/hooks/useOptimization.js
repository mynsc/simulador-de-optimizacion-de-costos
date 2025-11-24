/**
 * Custom Hook: useOptimization
 * 
 * Maneja toda la lógica de estado y cálculos relacionados con
 * la optimización de costos mediante derivadas.
 * 
 * CONCEPTO MATEMÁTICO: Optimización usando derivadas
 * Encuentra el mínimo de C(x) = k₁x² + k₂/x
 */

import { useState, useMemo } from 'react';
import { calculateOptimalRAM, calculateSavings } from '../utils/mathCalculations';
import { OPTIMIZATION_DEFAULTS } from '../constants';

export const useOptimization = () => {
  // Estado de parámetros
  const [k1, setK1] = useState(OPTIMIZATION_DEFAULTS.K1_INITIAL);
  const [k2, setK2] = useState(OPTIMIZATION_DEFAULTS.K2_INITIAL);
  const [userX, setUserX] = useState(OPTIMIZATION_DEFAULTS.USER_RAM_INITIAL);

  // Cálculos memoizados
  const optimalX = useMemo(
    () => calculateOptimalRAM(k1, k2),
    [k1, k2]
  );

  const savingsData = useMemo(
    () => calculateSavings(userX, optimalX, k1, k2),
    [userX, optimalX, k1, k2]
  );

  return {
    // Estado
    k1,
    k2,
    userX,
    
    // Setters
    setK1,
    setK2,
    setUserX,
    
    // Valores calculados
    optimalX,
    savingsData,
  };
};

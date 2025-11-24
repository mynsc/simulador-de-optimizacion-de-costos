/**
 * OptimizationPage
 * Vista de optimización de costos mediante derivadas
 * 
 * CONCEPTO MATEMÁTICO: Derivadas y Optimización
 * Encuentra el mínimo de C(x) = k₁x² + k₂/x
 */

import { useOptimization } from '../hooks';
import {
  OptimizationControls,
  OptimizationExplanation,
  OptimizationResults
} from '../components/sections';

export const OptimizationPage = () => {
  const {
    k1,
    k2,
    userX,
    setK1,
    setK2,
    setUserX,
    optimalX,
    savingsData,
  } = useOptimization();

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid md:grid-cols-12 gap-6">
        
        {/* Columna de Controles */}
        <div className="md:col-span-4 space-y-6">
          <OptimizationControls
            k1={k1}
            k2={k2}
            userX={userX}
            onK1Change={setK1}
            onK2Change={setK2}
            onUserXChange={setUserX}
          />

          <OptimizationExplanation k1={k1} k2={k2} />
        </div>

        {/* Columna de Resultados */}
        <div className="md:col-span-8 space-y-6">
          <OptimizationResults
            k1={k1}
            k2={k2}
            optimalX={optimalX}
            userX={userX}
            savingsData={savingsData}
          />
        </div>
      </div>
    </div>
  );
};

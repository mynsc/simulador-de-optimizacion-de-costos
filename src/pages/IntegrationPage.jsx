/**
 * IntegrationPage
 * Vista de acumulación energética mediante integrales
 * 
 * CONCEPTO MATEMÁTICO: Integrales Definidas
 * Calcula ∫₀²⁴ E(t) dt donde E(t) = A + B·sin(2πt/24)
 */

import { useEnergy } from '../hooks';
import {
  EnergyControls,
  EnergyExplanation,
  EnergyResults
} from '../components/sections';

export const IntegrationPage = () => {
  const {
    baseA,
    ampB,
    setBaseA,
    setAmpB,
    totalEnergy,
    energyCost,
  } = useEnergy();

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid md:grid-cols-12 gap-6">
        
        {/* Columna de Controles */}
        <div className="md:col-span-4 space-y-6">
          <EnergyControls
            baseA={baseA}
            ampB={ampB}
            onBaseChange={setBaseA}
            onAmpChange={setAmpB}
          />
          
          <EnergyExplanation totalEnergy={totalEnergy} />
        </div>

        {/* Columna de Gráfica y Resultados */}
        <div className="md:col-span-8 space-y-6">
          <EnergyResults
            baseA={baseA}
            ampB={ampB}
            totalEnergy={totalEnergy}
            energyCost={energyCost}
          />
        </div>
      </div>
    </div>
  );
};

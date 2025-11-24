/**
 * EnergyExplanation Component
 * Panel de explicación del Teorema Fundamental del Cálculo
 */

import { Info } from 'lucide-react';
import { Card } from '../ui';

export const EnergyExplanation = ({ totalEnergy }) => {
  return (
    <Card className="p-6 bg-white text-slate-800 border-slate-200 shadow-md">
      <h3 className="font-bold mb-4 flex items-center gap-2 text-slate-800">
        <Info size={18} className="text-blue-600" /> 
        Teorema Fundamental
      </h3>
      <div className="space-y-4 text-sm text-slate-600">
        <div>
          <p className="font-semibold text-slate-800 mb-1">
            La energía total es el área bajo la curva de potencia:
          </p>
          <code className="block bg-slate-900 p-2 rounded-lg border border-slate-700 font-mono text-xs text-purple-400 shadow-sm">
            ∫₀²⁴ (A + Bsin(ωt)) dt
          </code>
        </div>
        
        <div>
          <p className="font-semibold text-slate-800 mb-1">
            Resolvemos la integral definida:
          </p>
          <code className="block bg-slate-900 p-2 rounded-lg border border-slate-700 font-mono text-xs text-purple-400 shadow-sm">
            = [At - (B/ω)cos(ωt)]₀²⁴
          </code>
        </div>
        
        <div>
          <p className="font-semibold text-slate-800 mb-1">
            Con ω = 2π/24, el término oscilatorio se cancela en un ciclo completo:
          </p>
          <code className="block bg-slate-900 p-2 rounded-lg border border-slate-700 font-mono text-xs text-purple-400 shadow-sm">
            Total = 24 · A = {totalEnergy.toFixed(2)} kWh
          </code>
        </div>
      </div>
    </Card>
  );
};

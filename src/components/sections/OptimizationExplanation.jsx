/**
 * OptimizationExplanation Component
 * Panel de explicación matemática para optimización
 */

import { Info } from 'lucide-react';
import { Card } from '../ui';

export const OptimizationExplanation = ({ k1, k2 }) => {
  return (
    <Card className="p-6 bg-white text-slate-800 border-slate-200 shadow-md">
      <h3 className="font-bold mb-4 flex items-center gap-2 text-slate-800">
        <Info size={18} className="text-blue-600" /> 
        Explicación Matemática
      </h3>
      <div className="space-y-4 text-sm text-slate-600">
        <div>
          <p className="font-semibold text-slate-800 mb-1">
            1. Derivamos la función de costo:
          </p>
          <code className="block bg-slate-900 p-2 rounded-lg border border-slate-700 font-mono text-xs text-green-400 shadow-sm">
            C'(x) = 2k₁x - k₂/x²
          </code>
        </div>
        
        <div>
          <p className="font-semibold text-slate-800 mb-1">
            2. Igualamos a cero para optimizar:
          </p>
          <code className="block bg-slate-900 p-2 rounded-lg border border-slate-700 font-mono text-xs text-green-400 shadow-sm">
            2({k1})x = {k2}/x²
          </code>
        </div>

        <div>
          <p className="font-semibold text-slate-800 mb-1">
            3. Despejamos x (punto crítico):
          </p>
          <code className="block bg-slate-900 p-2 rounded-lg border border-slate-700 font-mono text-xs text-green-400 shadow-sm">
            x = ∛({k2} / {2 * k1})
          </code>
        </div>

        <div>
          <p className="font-semibold text-slate-800 mb-1">
            4. Verificamos que es un mínimo:
          </p>
          <code className="block bg-slate-900 p-2 rounded-lg border border-slate-700 font-mono text-xs text-green-400 shadow-sm">
            C''(x) = 2k₁ + 2k₂/x³ &gt; 0 ✓
          </code>
        </div>
      </div>
    </Card>
  );
};

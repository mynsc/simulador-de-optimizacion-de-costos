/**
 * EnergyResults Component
 * Muestra la gráfica y métricas de consumo energético
 */

import { Zap, Activity, DollarSign } from 'lucide-react';
import { Card } from '../ui';
import { IntegralGraph } from '../graphs';
import { LABELS, ENERGY_DEFAULTS } from '../../constants';

export const EnergyResults = ({ baseA, ampB, totalEnergy, energyCost }) => {
  return (
    <>
      {/* Gráfica de consumo energético */}
      <Card className="p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Zap size={120} />
        </div>
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-lg text-slate-700">
            Perfil de Consumo (24 Horas)
          </h3>
        </div>
        
        <div className="h-64 w-full">
          <IntegralGraph A={baseA} B={ampB} />
        </div>
      </Card>

      {/* Tarjetas de resultados energéticos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-6 bg-gradient-to-br from-purple-600 to-blue-600 text-white border-none">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
              <Activity size={24} />
            </div>
            <span className="font-medium text-purple-100">
              Energía Total (Integral)
            </span>
          </div>
          <div className="text-4xl font-bold mt-2 tracking-tight">
            {totalEnergy.toFixed(2)} <span className="text-xl font-normal opacity-80">{LABELS.UNIT_KWH}</span>
          </div>
          <p className="text-xs mt-2 text-purple-100 opacity-70">
            Área total bajo la curva azul
          </p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-green-100 text-green-600 rounded-lg">
              <DollarSign size={24} />
            </div>
            <span className="font-medium text-slate-500">
              Costo Estimado del Día
            </span>
          </div>
          <div className="text-4xl font-bold mt-2 tracking-tight text-slate-800">
            ${energyCost.toFixed(2)}
          </div>
          <p className="text-xs mt-2 text-slate-400">
            Tarifa: ${ENERGY_DEFAULTS.PRICE_PER_KWH}/kWh
          </p>
        </Card>
      </div>
    </>
  );
};

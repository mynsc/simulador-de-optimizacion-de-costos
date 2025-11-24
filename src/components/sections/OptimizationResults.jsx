/**
 * OptimizationResults Component
 * Muestra la gráfica y métricas de optimización
 */

import { Card } from '../ui';
import { OptimizationGraph } from '../graphs';
import { LABELS } from '../../constants';

export const OptimizationResults = ({ k1, k2, optimalX, userX, savingsData }) => {
  return (
    <>
      {/* Gráfica de optimización */}
      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-lg text-slate-700">
            Análisis de Costos
          </h3>
          <div className="flex gap-4 text-sm">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-blue-600"></div>
              <span>Costo Total</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span>Óptimo</span>
            </div>
          </div>
        </div>
        
        <div className="h-64 w-full">
          <OptimizationGraph 
            k1={k1} 
            k2={k2} 
            optimalX={optimalX} 
            currentX={userX} 
          />
        </div>
      </Card>

      {/* Tarjetas de métricas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-5 border-l-4 border-l-green-500">
          <div className="text-slate-500 text-sm font-medium mb-1">
            RAM Óptima
          </div>
          <div className="text-3xl font-bold text-slate-800">
            {optimalX.toFixed(2)} <span className="text-sm font-normal text-slate-400">{LABELS.UNIT_GB}</span>
          </div>
          <div className="text-xs text-green-600 mt-2 font-medium bg-green-50 inline-block px-2 py-1 rounded">
            Punto de Mínimo Global
          </div>
        </Card>

        <Card className="p-5 border-l-4 border-l-red-500">
          <div className="text-slate-500 text-sm font-medium mb-1">
            Costo Actual
          </div>
          <div className="text-3xl font-bold text-slate-800">
            ${savingsData.currentCost.toFixed(2)} <span className="text-sm font-normal text-slate-400">/h</span>
          </div>
          <div className="text-xs text-red-600 mt-2 font-medium">
            Usando {userX} GB
          </div>
        </Card>

        <Card className={`p-5 border-l-4 transition-colors ${
          savingsData.savings > 0 ? 'border-l-blue-500 bg-blue-50' : 'border-l-slate-300'
        }`}>
          <div className="text-slate-500 text-sm font-medium mb-1">
            Ahorro Potencial
          </div>
          <div className={`text-3xl font-bold ${
            savingsData.savings > 0 ? 'text-blue-700' : 'text-slate-400'
          }`}>
            ${savingsData.savings.toFixed(2)}
          </div>
          {savingsData.savings > 0 && (
            <div className="text-xs text-blue-700 mt-2 font-bold">
              ¡{savingsData.percentSavings.toFixed(1)}% de reducción!
            </div>
          )}
        </Card>
      </div>
    </>
  );
};

/**
 * OptimizationControls Component
 * Panel de controles para la sección de optimización
 */

import { Calculator } from 'lucide-react';
import { Card, Slider, SectionTitle } from '../ui';
import { LABELS, OPTIMIZATION_DEFAULTS } from '../../constants';

export const OptimizationControls = ({ k1, k2, userX, onK1Change, onK2Change, onUserXChange }) => {
  return (
    <Card className="p-6">
      <SectionTitle 
        icon={Calculator} 
        title={LABELS.OPTIMIZATION_TITLE}
        subtitle={LABELS.OPTIMIZATION_SUBTITLE}
      />
      
      <div className="space-y-6">
        {/* Fórmula de la función de costo */}
        <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
          <p className="text-xs font-mono text-slate-500 mb-2 text-center">
            FUNCIÓN DE COSTO TOTAL
          </p>
          <div className="text-center text-lg font-serif italic">
            C(x) = <span className="text-blue-600">{k1}</span>x² + <span className="text-blue-600">{k2}</span>/x
          </div>
        </div>

        {/* Sliders de parámetros */}
        <Slider 
          label={LABELS.SLIDER_K1}
          value={k1} 
          min={OPTIMIZATION_DEFAULTS.K1_MIN}
          max={OPTIMIZATION_DEFAULTS.K1_MAX}
          step={OPTIMIZATION_DEFAULTS.K1_STEP}
          onChange={onK1Change} 
        />
        <Slider 
          label={LABELS.SLIDER_K2}
          value={k2} 
          min={OPTIMIZATION_DEFAULTS.K2_MIN}
          max={OPTIMIZATION_DEFAULTS.K2_MAX}
          step={OPTIMIZATION_DEFAULTS.K2_STEP}
          onChange={onK2Change} 
        />
        
        <hr className="border-slate-100 my-4"/>
        
        {/* Slider de configuración del usuario */}
        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
          <Slider 
            label={LABELS.SLIDER_USER_RAM}
            value={userX} 
            min={OPTIMIZATION_DEFAULTS.USER_RAM_MIN}
            max={OPTIMIZATION_DEFAULTS.USER_RAM_MAX}
            step={OPTIMIZATION_DEFAULTS.USER_RAM_STEP}
            unit={LABELS.UNIT_GB}
            onChange={onUserXChange} 
          />
        </div>
      </div>
    </Card>
  );
};

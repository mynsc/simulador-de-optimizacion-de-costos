/**
 * EnergyControls Component
 * Panel de controles para la sección de energía
 */

import { Zap } from 'lucide-react';
import { Card, Slider, SectionTitle } from '../ui';
import { LABELS, ENERGY_DEFAULTS } from '../../constants';

export const EnergyControls = ({ baseA, ampB, onBaseChange, onAmpChange }) => {
  return (
    <Card className="p-6">
      <SectionTitle 
        icon={Zap} 
        title={LABELS.ENERGY_TITLE}
        subtitle={LABELS.ENERGY_SUBTITLE}
      />
      
      <div className="space-y-6">
        {/* Fórmula de consumo */}
        <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
          <p className="text-xs font-mono text-slate-500 mb-2 text-center">
            FUNCIÓN DE TASA DE CONSUMO
          </p>
          <div className="text-center text-lg font-serif italic">
            E(t) = <span className="text-blue-600">{baseA}</span> + <span className="text-purple-600">{ampB}</span>sin(<span className="text-xs">2π/24</span> t)
          </div>
        </div>

        {/* Sliders de parámetros energéticos */}
        <Slider 
          label={LABELS.SLIDER_BASE}
          value={baseA} 
          min={ENERGY_DEFAULTS.BASE_MIN}
          max={ENERGY_DEFAULTS.BASE_MAX}
          step={ENERGY_DEFAULTS.BASE_STEP}
          unit={LABELS.UNIT_KW}
          onChange={onBaseChange} 
        />
        <Slider 
          label={LABELS.SLIDER_AMPLITUDE}
          value={ampB} 
          min={ENERGY_DEFAULTS.AMPLITUDE_MIN}
          max={ENERGY_DEFAULTS.AMPLITUDE_MAX}
          step={ENERGY_DEFAULTS.AMPLITUDE_STEP}
          unit={LABELS.UNIT_KW}
          onChange={onAmpChange} 
        />
      </div>
    </Card>
  );
};

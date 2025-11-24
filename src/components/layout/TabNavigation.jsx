/**
 * TabNavigation Component
 * Navegación entre pestañas de la aplicación
 */

import { TrendingDown, Activity } from 'lucide-react';
import { LABELS } from '../../constants';

export const TabNavigation = ({ activeTab, onTabChange }) => {
  return (
    <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
      <button
        onClick={() => onTabChange('optimization')}
        className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all shadow-sm ${
          activeTab === 'optimization' 
            ? 'bg-white text-blue-600 ring-2 ring-blue-600' 
            : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'
        }`}
      >
        <TrendingDown size={18} />
        {LABELS.TAB_OPTIMIZATION}
      </button>
      <button
        onClick={() => onTabChange('integration')}
        className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all shadow-sm ${
          activeTab === 'integration' 
            ? 'bg-white text-purple-600 ring-2 ring-purple-600' 
            : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'
        }`}
      >
        <Activity size={18} />
        {LABELS.TAB_INTEGRATION}
      </button>
    </div>
  );
};

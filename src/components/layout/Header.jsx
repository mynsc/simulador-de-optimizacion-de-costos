/**
 * Header Component
 * Encabezado principal de la aplicación con título y descripción
 */

import { Server } from 'lucide-react';
import { LABELS } from '../../constants';

export const Header = () => {
  return (
    <header className="bg-slate-900 text-white pt-10 pb-24 px-6 shadow-lg">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-blue-600 rounded-xl shadow-lg shadow-blue-600/20">
            <Server size={32} className="text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            {LABELS.APP_TITLE}
          </h1>
        </div>
        <p className="text-slate-300 text-lg max-w-2xl leading-relaxed">
          {LABELS.APP_DESCRIPTION}
        </p>
      </div>
    </header>
  );
};

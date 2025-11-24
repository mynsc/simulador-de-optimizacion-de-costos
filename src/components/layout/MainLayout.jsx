/**
 * MainLayout Component
 * Layout principal que envuelve el contenido de la aplicación
 */

import { Header } from './Header';

export const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 pb-12">
      <Header />
      <main className="max-w-5xl mx-auto px-6 -mt-16">
        {children}
      </main>
    </div>
  );
};

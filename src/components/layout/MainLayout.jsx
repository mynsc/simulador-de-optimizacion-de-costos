/**
 * MainLayout Component
 * Layout principal que envuelve el contenido de la aplicación
 */

import { Header } from './Header';
import { Footer } from './Footer';

export const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col">
      <Header />
      <main className="max-w-5xl mx-auto px-6 -mt-16 flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
};

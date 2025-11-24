/**
 * SIMULADOR DE OPTIMIZACIÓN DE COSTOS EN LA NUBE
 * Proyecto de Cálculo 2
 * 
 * Arquitectura Moderna de React con:
 * - Separación de responsabilidades (Layout, Pages, Components, Hooks)
 * - Custom Hooks para lógica de estado
 * - Componentes reutilizables y modulares
 * 
 * CONCEPTOS MATEMÁTICOS APLICADOS:
 * - Derivadas: Optimización de funciones, puntos críticos, mínimos
 * - Integrales: Acumulación, área bajo curvas, funciones periódicas
 */

import { useState } from 'react';
import { MainLayout, TabNavigation } from './components/layout';
import { OptimizationPage, IntegrationPage } from './pages';

export default function CloudOptimizationSim() {
  const [activeTab, setActiveTab] = useState('optimization');

  return (
    <MainLayout>
      <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Vista de Optimización (Derivadas) */}
      {activeTab === 'optimization' && <OptimizationPage />}

      {/* Vista de Acumulación (Integrales) */}
      {activeTab === 'integration' && <IntegrationPage />}
    </MainLayout>
  );
}

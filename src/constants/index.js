/**
 * CONSTANTES DE LA APLICACIÓN
 * 
 * Centraliza todos los valores constantes utilizados en el simulador
 * para facilitar el mantenimiento y la configuración.
 */

// ============================================================================
// PARÁMETROS INICIALES DE OPTIMIZACIÓN (DERIVADAS)
// ============================================================================

export const OPTIMIZATION_DEFAULTS = {
  // Coeficiente de costo de hardware (k₁)
  K1_INITIAL: 2,
  K1_MIN: 0.5,
  K1_MAX: 10,
  K1_STEP: 0.1,
  
  // Coeficiente de ineficiencia (k₂)
  K2_INITIAL: 128,
  K2_MIN: 10,
  K2_MAX: 500,
  K2_STEP: 10,
  
  // Asignación de RAM del usuario
  USER_RAM_INITIAL: 2,
  USER_RAM_MIN: 1,
  USER_RAM_MAX: 10,
  USER_RAM_STEP: 0.1,
};

// ============================================================================
// PARÁMETROS DE CONSUMO ENERGÉTICO (INTEGRALES)
// ============================================================================

export const ENERGY_DEFAULTS = {
  // Consumo base (A)
  BASE_INITIAL: 10,
  BASE_MIN: 1,
  BASE_MAX: 50,
  BASE_STEP: 1,
  
  // Amplitud de variación (B)
  AMPLITUDE_INITIAL: 5,
  AMPLITUDE_MIN: 0,
  AMPLITUDE_MAX: 20,
  AMPLITUDE_STEP: 0.5,
  
  // Tarifa de energía
  PRICE_PER_KWH: 0.15, // $/kWh
};

// ============================================================================
// CONFIGURACIÓN DE GRÁFICAS
// ============================================================================

export const GRAPH_CONFIG = {
  WIDTH: 500,
  HEIGHT: 300,
  PADDING: 50,
  
  // Colores
  COLORS: {
    PRIMARY: '#2563eb',      // Azul para líneas principales
    SUCCESS: '#22c55e',      // Verde para óptimo
    WARNING: '#f59e0b',      // Amarillo para advertencias
    DANGER: '#ef4444',       // Rojo para valores actuales subóptimos
    SECONDARY: '#94a3b8',    // Gris para componentes secundarios
    PURPLE: '#8b5cf6',       // Púrpura para energía
    GRID: '#e2e8f0',         // Gris claro para grid
    AXIS: '#475569',         // Gris oscuro para ejes
    TEXT: '#64748b',         // Gris medio para texto
  },
  
  // Estilos
  STROKE_WIDTH: {
    THIN: 1,
    NORMAL: 2,
    THICK: 3,
  },
};

// ============================================================================
// TEXTOS Y ETIQUETAS
// ============================================================================

export const LABELS = {
  APP_TITLE: 'Simulador Cloud FinOps',
  APP_DESCRIPTION: 'Plataforma interactiva para la optimización de recursos utilizando cálculo diferencial e integral. Analiza costos marginales y consumo energético acumulado.',
  
  // Tabs
  TAB_OPTIMIZATION: 'Optimización (Derivadas)',
  TAB_INTEGRATION: 'Acumulación (Integrales)',
  
  // Secciones de Optimización
  OPTIMIZATION_TITLE: 'Parámetros del Modelo',
  OPTIMIZATION_SUBTITLE: 'Define las constantes de la función de costo.',
  
  // Secciones de Energía
  ENERGY_TITLE: 'Consumo Energético',
  ENERGY_SUBTITLE: 'Calcula el total acumulado en un ciclo de 24h.',
  
  // Etiquetas de sliders
  SLIDER_K1: 'Costo Hardware (k₁)',
  SLIDER_K2: 'Ineficiencia (k₂)',
  SLIDER_USER_RAM: 'Tu Asignación de RAM Actual',
  SLIDER_BASE: 'Consumo Base (A)',
  SLIDER_AMPLITUDE: 'Variabilidad Diaria (B)',
  
  // Unidades
  UNIT_GB: 'GB',
  UNIT_KW: 'kW',
  UNIT_KWH: 'kWh',
  UNIT_DOLLAR_HOUR: '$/h',
  UNIT_DOLLAR: '$',
};

// ============================================================================
// FÓRMULAS MATEMÁTICAS (para visualización)
// ============================================================================

export const FORMULAS = {
  COST_FUNCTION: 'C(x) = k₁x² + k₂/x',
  COST_DERIVATIVE: "C'(x) = 2k₁x - k₂/x²",
  OPTIMAL_FORMULA: 'x = ∛(k₂ / 2k₁)',
  
  ENERGY_FUNCTION: 'E(t) = A + B·sin(2πt/24)',
  ENERGY_INTEGRAL: '∫₀²⁴ (A + B·sin(ωt)) dt',
  ENERGY_SOLUTION: 'Total = 24 · A',
};

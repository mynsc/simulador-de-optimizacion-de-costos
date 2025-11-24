/**
 * MÓDULO DE CÁLCULOS MATEMÁTICOS - CÁLCULO 2
 * 
 * Este módulo contiene las funciones matemáticas fundamentales utilizadas
 * en el simulador de optimización de costos en la nube.
 * 
 * CONCEPTOS DE CÁLCULO DIFERENCIAL E INTEGRAL APLICADOS:
 * 
 * 1. DERIVADAS Y OPTIMIZACIÓN:
 *    - Encontrar mínimos/máximos de funciones
 *    - Análisis de costos marginales
 *    - Puntos críticos mediante la primera derivada
 * 
 * 2. INTEGRALES Y ACUMULACIÓN:
 *    - Cálculo de cantidades acumuladas en el tiempo
 *    - Área bajo curvas (energía total consumida)
 *    - Integración de funciones periódicas
 */

// ============================================================================
// SECCIÓN 1: OPTIMIZACIÓN DE COSTOS (APLICACIÓN DE DERIVADAS)
// ============================================================================

/**
 * Calcula el costo de hardware (componente cuadrática)
 * 
 * Función: H(x) = k₁ · x²
 * 
 * Representa el costo que aumenta cuadráticamente con la asignación de recursos.
 * A mayor RAM asignada, mayor es el costo del hardware de forma acelerada.
 * 
 * @param {number} x - Cantidad de RAM asignada (GB)
 * @param {number} k1 - Coeficiente de costo de hardware
 * @returns {number} Costo de hardware en $/hora
 */
export const calculateHardwareCost = (x, k1) => {
  return k1 * x * x;
};

/**
 * Calcula el costo de ineficiencia (componente hiperbólica)
 * 
 * Función: I(x) = k₂ / x
 * 
 * Representa el costo por ineficiencia que disminuye al asignar más recursos.
 * Con poca RAM, el sistema es ineficiente y genera costos adicionales
 * (tiempo de proceso, uso de CPU extra, etc.)
 * 
 * @param {number} x - Cantidad de RAM asignada (GB)
 * @param {number} k2 - Coeficiente de ineficiencia
 * @returns {number} Costo de ineficiencia en $/hora
 */
export const calculateInefficiencyCost = (x, k2) => {
  return k2 / x;
};

/**
 * Calcula el costo total combinado
 * 
 * Función: C(x) = k₁x² + k₂/x
 * 
 * Esta función combina dos efectos opuestos:
 * - El costo de hardware aumenta con más recursos (x²)
 * - El costo de ineficiencia disminuye con más recursos (1/x)
 * 
 * El balance óptimo se encuentra en el mínimo de esta función.
 * 
 * @param {number} x - Cantidad de RAM asignada (GB)
 * @param {number} k1 - Coeficiente de costo de hardware
 * @param {number} k2 - Coeficiente de ineficiencia
 * @returns {number} Costo total en $/hora
 */
export const calculateTotalCost = (x, k1, k2) => {
  return calculateHardwareCost(x, k1) + calculateInefficiencyCost(x, k2);
};

/**
 * Encuentra el valor óptimo de RAM mediante OPTIMIZACIÓN CON DERIVADAS
 * 
 * PROCESO MATEMÁTICO:
 * 
 * 1. Función de costo: C(x) = k₁x² + k₂/x
 * 
 * 2. Primera derivada: C'(x) = 2k₁x - k₂/x²
 * 
 * 3. Igualamos a cero para encontrar puntos críticos:
 *    2k₁x - k₂/x² = 0
 * 
 * 4. Despejamos:
 *    2k₁x = k₂/x²
 *    2k₁x³ = k₂
 *    x³ = k₂/(2k₁)
 *    x = ∛(k₂/(2k₁))
 * 
 * 5. Segunda derivada: C''(x) = 2k₁ + 2k₂/x³
 *    Como k₁, k₂, x > 0, entonces C''(x) > 0
 *    Por lo tanto, este punto crítico es un MÍNIMO
 * 
 * @param {number} k1 - Coeficiente de costo de hardware
 * @param {number} k2 - Coeficiente de ineficiencia
 * @returns {number} Valor óptimo de RAM en GB
 */
export const calculateOptimalRAM = (k1, k2) => {
  return Math.cbrt(k2 / (2 * k1));
};

/**
 * Calcula el ahorro al usar la configuración óptima
 * 
 * @param {number} currentX - RAM actual asignada (GB)
 * @param {number} optimalX - RAM óptima calculada (GB)
 * @param {number} k1 - Coeficiente de costo de hardware
 * @param {number} k2 - Coeficiente de ineficiencia
 * @returns {Object} Objeto con costo actual, óptimo, ahorro y porcentaje
 */
export const calculateSavings = (currentX, optimalX, k1, k2) => {
  const currentCost = calculateTotalCost(currentX, k1, k2);
  const optimalCost = calculateTotalCost(optimalX, k1, k2);
  const savings = Math.max(0, currentCost - optimalCost);
  const percentSavings = currentCost > 0 ? (savings / currentCost) * 100 : 0;

  return {
    currentCost,
    optimalCost,
    savings,
    percentSavings
  };
};

// ============================================================================
// SECCIÓN 2: CONSUMO ENERGÉTICO (APLICACIÓN DE INTEGRALES)
// ============================================================================

/**
 * Función de consumo energético instantáneo
 * 
 * Función: E(t) = A + B·sin(2πt/24)
 * 
 * Modela el consumo de energía que varía sinusoidalmente a lo largo del día:
 * - A: Consumo base constante (kW)
 * - B·sin(2πt/24): Variación periódica con periodo de 24 horas
 * 
 * La frecuencia angular ω = 2π/24 asegura un ciclo completo en 24 horas.
 * 
 * @param {number} t - Tiempo en horas (0 a 24)
 * @param {number} A - Consumo base en kW
 * @param {number} B - Amplitud de variación en kW
 * @returns {number} Consumo instantáneo en kW
 */
export const calculateInstantaneousPower = (t, A, B) => {
  const omega = (2 * Math.PI) / 24; // Frecuencia angular para periodo de 24h
  return A + B * Math.sin(omega * t);
};

/**
 * Calcula la energía total consumida mediante INTEGRACIÓN
 * 
 * PROCESO MATEMÁTICO:
 * 
 * La energía total es la integral del consumo instantáneo en el tiempo:
 * 
 * E_total = ∫₀²⁴ (A + B·sin(2πt/24)) dt
 * 
 * Resolvemos la integral:
 * 
 * ∫ A dt = A·t
 * ∫ B·sin(2πt/24) dt = -B·(24/2π)·cos(2πt/24) = -(12B/π)·cos(2πt/24)
 * 
 * Evaluamos en los límites [0, 24]:
 * 
 * E_total = [A·t - (12B/π)·cos(2πt/24)]₀²⁴
 *         = [24A - (12B/π)·cos(2π)] - [0 - (12B/π)·cos(0)]
 *         = [24A - (12B/π)·1] - [0 - (12B/π)·1]
 *         = 24A - (12B/π) + (12B/π)
 *         = 24A
 * 
 * CONCLUSIÓN: La integral de una función sinusoidal completa (un periodo)
 * se cancela, dejando solo el término constante multiplicado por el intervalo.
 * 
 * Interpretación física:
 * - La potencia es la derivada de la energía: P = dE/dt
 * - La energía es la integral de la potencia: E = ∫ P dt
 * 
 * @param {number} A - Consumo base en kW
 * @param {number} B - Amplitud de variación en kW (no afecta el total en un ciclo completo)
 * @returns {number} Energía total en kWh
 */
export const calculateTotalEnergy = (A, B) => {
  // Solución analítica de la integral definida
  return 24 * A;
};

/**
 * Calcula el costo de la energía consumida
 * 
 * @param {number} totalEnergy - Energía total en kWh
 * @param {number} pricePerKWh - Precio por kWh (default: $0.15)
 * @returns {number} Costo total en dólares
 */
export const calculateEnergyCost = (totalEnergy, pricePerKWh = 0.15) => {
  return totalEnergy * pricePerKWh;
};

/**
 * Integración numérica (método del trapecio) para visualización
 * 
 * Aunque tenemos la solución analítica, esta función permite calcular
 * integrales numéricamente para rangos parciales o funciones más complejas.
 * 
 * MÉTODO DEL TRAPECIO:
 * Aproxima el área bajo la curva usando trapecios:
 * ∫ₐᵇ f(x)dx ≈ (b-a)/n · [f(x₀)/2 + f(x₁) + f(x₂) + ... + f(xₙ₋₁) + f(xₙ)/2]
 * 
 * @param {Function} func - Función a integrar
 * @param {number} a - Límite inferior
 * @param {number} b - Límite superior
 * @param {number} n - Número de subdivisiones (mayor = más preciso)
 * @returns {number} Aproximación de la integral
 */
export const numericalIntegration = (func, a, b, n = 1000) => {
  const h = (b - a) / n;
  let sum = (func(a) + func(b)) / 2;
  
  for (let i = 1; i < n; i++) {
    const x = a + i * h;
    sum += func(x);
  }
  
  return sum * h;
};

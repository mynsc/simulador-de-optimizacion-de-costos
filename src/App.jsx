import React, { useState, useMemo, useEffect } from 'react';
import { Calculator, Server, Zap, TrendingDown, Info, DollarSign, Activity } from 'lucide-react';

// --- Componentes Auxiliares de UI ---

const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden ${className}`}>
    {children}
  </div>
);

const Slider = ({ label, value, min, max, step, onChange, unit = "" }) => (
  <div className="mb-4">
    <div className="flex justify-between items-center mb-1">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      <span className="text-sm font-bold text-blue-600">{value} {unit}</span>
    </div>
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange(parseFloat(e.target.value))}
      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
    />
  </div>
);

const SectionTitle = ({ icon: Icon, title, subtitle }) => (
  <div className="mb-6">
    <div className="flex items-center gap-2 mb-1">
      <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
        <Icon size={20} />
      </div>
      <h2 className="text-xl font-bold text-slate-800">{title}</h2>
    </div>
    <p className="text-slate-500 text-sm ml-11">{subtitle}</p>
  </div>
);

// --- Gráficos SVG Personalizados (para evitar dependencias pesadas) ---

const OptimizationGraph = ({ k1, k2, optimalX, currentX }) => {
  const width = 500;
  const height = 300;
  const padding = 40;
  
  // Rango de graficación
  const minX = 1;
  const maxX = Math.max(optimalX * 2, 10); // Dinámico
  
  // Funciones de costo
  const getH = (x) => k1 * x * x; // Hardware
  const getI = (x) => k2 / x;     // Ineficiencia
  const getTotal = (x) => getH(x) + getI(x);
  
  // Calcular escala Y máxima para que quepa todo
  const maxY = getTotal(maxX) * 1.1; 
  
  // Escalas
  const xScale = (x) => padding + ((x - minX) / (maxX - minX)) * (width - 2 * padding);
  const yScale = (y) => height - padding - (y / maxY) * (height - 2 * padding);

  // Generar paths
  const generatePath = (func, steps = 50) => {
    let path = `M ${xScale(minX)} ${yScale(func(minX))}`;
    for (let i = 1; i <= steps; i++) {
      const x = minX + (i / steps) * (maxX - minX);
      path += ` L ${xScale(x)} ${yScale(func(x))}`;
    }
    return path;
  };

  const optimalY = getTotal(optimalX);
  const currentY = getTotal(currentX);

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full bg-slate-50 rounded-lg border border-slate-200">
      {/* Grid lines */}
      <line x1={padding} y1={height-padding} x2={width-padding} y2={height-padding} stroke="#cbd5e1" strokeWidth="2" />
      <line x1={padding} y1={height-padding} x2={padding} y2={padding} stroke="#cbd5e1" strokeWidth="2" />
      
      {/* Labels */}
      <text x={width/2} y={height-10} textAnchor="middle" fontSize="12" fill="#64748b">Asignación de RAM (x)</text>
      <text x={15} y={height/2} textAnchor="middle" fontSize="12" fill="#64748b" transform={`rotate(-90, 15, ${height/2})`}>Costo ($)</text>

      {/* Curvas */}
      <path d={generatePath(getH)} fill="none" stroke="#94a3b8" strokeWidth="2" strokeDasharray="4" />
      <path d={generatePath(getI)} fill="none" stroke="#94a3b8" strokeWidth="2" strokeDasharray="4" />
      <path d={generatePath(getTotal)} fill="none" stroke="#2563eb" strokeWidth="3" />

      {/* Leyenda rápida */}
      <text x={width-padding} y={padding} textAnchor="end" fontSize="10" fill="#94a3b8">--- Componentes</text>
      <text x={width-padding} y={padding+15} textAnchor="end" fontSize="10" fill="#2563eb" fontWeight="bold">Total</text>

      {/* Punto Óptimo */}
      <circle cx={xScale(optimalX)} cy={yScale(optimalY)} r="5" fill="#22c55e" />
      <line x1={xScale(optimalX)} y1={yScale(optimalY)} x2={xScale(optimalX)} y2={height-padding} stroke="#22c55e" strokeDasharray="4" />
      <text x={xScale(optimalX)} y={yScale(optimalY) - 10} textAnchor="middle" fontSize="12" fontWeight="bold" fill="#16a34a">Mínimo</text>

      {/* Punto Actual (Usuario) */}
      {currentX && currentX !== optimalX && (
        <>
          <circle cx={xScale(currentX)} cy={yScale(currentY)} r="5" fill="#ef4444" />
          <line x1={xScale(currentX)} y1={yScale(currentY)} x2={xScale(currentX)} y2={height-padding} stroke="#ef4444" strokeDasharray="4" />
        </>
      )}
    </svg>
  );
};

const IntegralGraph = ({ A, B }) => {
  const width = 500;
  const height = 300;
  const padding = 40;
  
  const maxX = 24; // 24 horas
  const maxY = A + B + 2; // Un poco de margen arriba
  const minY = 0;

  const xScale = (x) => padding + (x / maxX) * (width - 2 * padding);
  const yScale = (y) => height - padding - (y / maxY) * (height - 2 * padding);

  const getE = (t) => A + B * Math.sin((2 * Math.PI / 24) * t);

  // Generar path para el área sombreada
  let areaPath = `M ${xScale(0)} ${yScale(0)}`; // Empezar abajo a la izquierda
  let linePath = `M ${xScale(0)} ${yScale(getE(0))}`; // Empezar en el valor de la función

  const steps = 100;
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * maxX;
    const y = getE(t);
    const px = xScale(t);
    const py = yScale(y);
    areaPath += ` L ${px} ${py}`;
    linePath += ` L ${px} ${py}`;
  }

  areaPath += ` L ${xScale(maxX)} ${yScale(0)} Z`; // Cerrar el loop abajo a la derecha

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full bg-slate-50 rounded-lg border border-slate-200">
      {/* Grid */}
      <line x1={padding} y1={height-padding} x2={width-padding} y2={height-padding} stroke="#cbd5e1" strokeWidth="2" />
      <line x1={padding} y1={height-padding} x2={padding} y2={padding} stroke="#cbd5e1" strokeWidth="2" />
      
      {/* Labels */}
      <text x={width/2} y={height-10} textAnchor="middle" fontSize="12" fill="#64748b">Tiempo (horas)</text>
      <text x={15} y={height/2} textAnchor="middle" fontSize="12" fill="#64748b" transform={`rotate(-90, 15, ${height/2})`}>Consumo (kW)</text>

      {/* Área sombreada (Integral) */}
      <path d={areaPath} fill="rgba(59, 130, 246, 0.2)" />
      
      {/* Línea de función */}
      <path d={linePath} fill="none" stroke="#2563eb" strokeWidth="3" />

      {/* Marcadores de tiempo */}
      <text x={xScale(0)} y={height-25} textAnchor="middle" fontSize="10" fill="#64748b">0h</text>
      <text x={xScale(12)} y={height-25} textAnchor="middle" fontSize="10" fill="#64748b">12h</text>
      <text x={xScale(24)} y={height-25} textAnchor="middle" fontSize="10" fill="#64748b">24h</text>
    </svg>
  );
};


// --- Componente Principal ---

export default function CloudOptimizationSim() {
  const [activeTab, setActiveTab] = useState('optimization');

  // Estado para Optimización (Derivadas)
  const [k1, setK1] = useState(2); // Costo hardware coeff
  const [k2, setK2] = useState(128); // Ineficiencia coeff
  const [userX, setUserX] = useState(2); // Valor elegido por el usuario (subóptimo)

  // Estado para Acumulación (Integrales)
  const [baseA, setBaseA] = useState(10); // Consumo base kW
  const [ampB, setAmpB] = useState(5); // Amplitud variación kW

  // --- Cálculos Matemáticos ---

  // 1. Derivadas: x óptimo = raiz_cubica(k2 / 2k1)
  const optimalX = useMemo(() => Math.cbrt(k2 / (2 * k1)), [k1, k2]);
  
  const calcCost = (x) => (k1 * x * x) + (k2 / x);
  const minCost = calcCost(optimalX);
  const userCost = calcCost(userX);
  const savings = userCost - minCost;
  const percentSavings = (savings / userCost) * 100;

  // 2. Integrales: Integral de 0 a 24 de (A + B sin(wt))
  // La integral de un seno completo en un periodo (0 a 24h) es 0, por lo que el total es simplemente A * 24.
  // Sin embargo, calculamos numéricamente para propósitos de visualización si quisiéramos rangos parciales, 
  // pero analíticamente para exactitud: E_total = 24 * A.
  const totalEnergy = useMemo(() => baseA * 24, [baseA]);
  // Costo hipotético de energía ($0.15 por kWh)
  const energyCost = totalEnergy * 0.15;

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 pb-12">
      
      {/* Header */}
      <header className="bg-slate-900 text-white pt-10 pb-24 px-6 shadow-lg">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-blue-600 rounded-xl shadow-lg shadow-blue-600/20">
              <Server size={32} className="text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Simulador Cloud FinOps</h1>
          </div>
          <p className="text-slate-300 text-lg max-w-2xl leading-relaxed">
            Plataforma interactiva para la optimización de recursos utilizando cálculo diferencial e integral.
            Analiza costos marginales y consumo energético acumulado.
          </p>
        </div>
      </header>

      {/* Main Content Container (overlaps header) */}
      <main className="max-w-5xl mx-auto px-6 -mt-16">
        
        {/* Tabs Navigation */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          <button
            onClick={() => setActiveTab('optimization')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all shadow-sm ${
              activeTab === 'optimization' 
                ? 'bg-white text-blue-600 ring-2 ring-blue-600' 
                : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <TrendingDown size={18} />
            Optimización (Derivadas)
          </button>
          <button
            onClick={() => setActiveTab('integration')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all shadow-sm ${
              activeTab === 'integration' 
                ? 'bg-white text-purple-600 ring-2 ring-purple-600' 
                : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <Activity size={18} />
            Acumulación (Integrales)
          </button>
        </div>

        {/* Tab: Optimization */}
        {activeTab === 'optimization' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid md:grid-cols-12 gap-6">
              
              {/* Controls Column */}
              <div className="md:col-span-4 space-y-6">
                <Card className="p-6">
                  <SectionTitle 
                    icon={Calculator} 
                    title="Parámetros del Modelo" 
                    subtitle="Define las constantes de la función de costo." 
                  />
                  
                  <div className="space-y-6">
                    <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                      <p className="text-xs font-mono text-slate-500 mb-2 text-center">FUNCIÓN DE COSTO TOTAL</p>
                      <div className="text-center text-lg font-serif italic">
                        C(x) = <span className="text-blue-600">{k1}</span>x² + <span className="text-blue-600">{k2}</span>/x
                      </div>
                    </div>

                    <Slider 
                      label="Costo Hardware (k₁)" 
                      value={k1} 
                      min={0.5} max={10} step={0.1} 
                      onChange={setK1} 
                    />
                    <Slider 
                      label="Ineficiencia (k₂)" 
                      value={k2} 
                      min={10} max={500} step={10} 
                      onChange={setK2} 
                    />
                    
                    <hr className="border-slate-100 my-4"/>
                    
                    <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
                      <Slider 
                        label="Tu Asignación de RAM Actual" 
                        value={userX} 
                        min={1} max={10} step={0.1} 
                        unit="GB"
                        onChange={setUserX} 
                      />
                    </div>
                  </div>
                </Card>

                {/* CAMBIO AQUÍ: Se modificó el estilo para usar fondo blanco y texto oscuro para mayor contraste */}
                <Card className="p-6 bg-white text-slate-800 border-slate-200 shadow-md">
                  <h3 className="font-bold mb-4 flex items-center gap-2 text-slate-800">
                    <Info size={18} className="text-blue-600" /> Explicación Matemática
                  </h3>
                  <div className="space-y-4 text-sm text-slate-600">
                    <div>
                      <p className="font-semibold text-slate-800 mb-1">1. Derivamos la función de costo:</p>
                      <code className="block bg-slate-900 p-2 rounded-lg border border-slate-700 font-mono text-xs text-green-400 shadow-sm">
                        C'(x) = 2k₁x - k₂/x²
                      </code>
                    </div>
                    
                    <div>
                      <p className="font-semibold text-slate-800 mb-1">2. Igualamos a cero para optimizar:</p>
                      <code className="block bg-slate-900 p-2 rounded-lg border border-slate-700 font-mono text-xs text-green-400 shadow-sm">
                        2({k1})x = {k2}/x²
                      </code>
                    </div>

                    <div>
                      <p className="font-semibold text-slate-800 mb-1">3. Despejamos x:</p>
                      <code className="block bg-slate-900 p-2 rounded-lg border border-slate-700 font-mono text-xs text-green-400 shadow-sm">
                        x = ∛({k2} / 2*{k1})
                      </code>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Results Column */}
              <div className="md:col-span-8 space-y-6">
                <Card className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold text-lg text-slate-700">Análisis de Costos</h3>
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
                    <OptimizationGraph k1={k1} k2={k2} optimalX={optimalX} currentX={userX} />
                  </div>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="p-5 border-l-4 border-l-green-500">
                    <div className="text-slate-500 text-sm font-medium mb-1">RAM Óptima</div>
                    <div className="text-3xl font-bold text-slate-800">{optimalX.toFixed(2)} <span className="text-sm font-normal text-slate-400">GB</span></div>
                    <div className="text-xs text-green-600 mt-2 font-medium bg-green-50 inline-block px-2 py-1 rounded">
                      Punto de Mínimo Global
                    </div>
                  </Card>

                  <Card className="p-5 border-l-4 border-l-red-500">
                    <div className="text-slate-500 text-sm font-medium mb-1">Costo Actual</div>
                    <div className="text-3xl font-bold text-slate-800">${userCost.toFixed(2)} <span className="text-sm font-normal text-slate-400">/h</span></div>
                    <div className="text-xs text-red-600 mt-2 font-medium">
                      Usando {userX} GB
                    </div>
                  </Card>

                  <Card className={`p-5 border-l-4 transition-colors ${savings > 0 ? 'border-l-blue-500 bg-blue-50' : 'border-l-slate-300'}`}>
                    <div className="text-slate-500 text-sm font-medium mb-1">Ahorro Potencial</div>
                    <div className={`text-3xl font-bold ${savings > 0 ? 'text-blue-700' : 'text-slate-400'}`}>
                      ${Math.max(0, savings).toFixed(2)}
                    </div>
                    {savings > 0 && (
                      <div className="text-xs text-blue-700 mt-2 font-bold">
                        ¡{percentSavings.toFixed(1)}% de reducción!
                      </div>
                    )}
                  </Card>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab: Integration */}
        {activeTab === 'integration' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid md:grid-cols-12 gap-6">
              
              {/* Controls */}
              <div className="md:col-span-4 space-y-6">
                <Card className="p-6">
                  <SectionTitle 
                    icon={Zap} 
                    title="Consumo Energético" 
                    subtitle="Calcula el total acumulado en un ciclo de 24h." 
                  />
                  
                  <div className="space-y-6">
                    <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                      <p className="text-xs font-mono text-slate-500 mb-2 text-center">FUNCIÓN DE TASA DE CONSUMO</p>
                      <div className="text-center text-lg font-serif italic">
                        E(t) = <span className="text-blue-600">{baseA}</span> + <span className="text-purple-600">{ampB}</span>sin(<span className="text-xs">2π/24</span> t)
                      </div>
                    </div>

                    <Slider 
                      label="Consumo Base (A)" 
                      value={baseA} 
                      min={1} max={50} step={1} 
                      unit="kW"
                      onChange={setBaseA} 
                    />
                    <Slider 
                      label="Variabilidad Diaria (B)" 
                      value={ampB} 
                      min={0} max={20} step={0.5} 
                      unit="kW"
                      onChange={setAmpB} 
                    />
                  </div>
                </Card>
                
                {/* CAMBIO AQUÍ: Se actualizó el estilo a fondo blanco y texto oscuro para mejorar la legibilidad */}
                <Card className="p-6 bg-white text-slate-800 border-slate-200 shadow-md">
                  <h3 className="font-bold mb-4 flex items-center gap-2 text-slate-800">
                    <Info size={18} className="text-blue-600" /> Teorema Fundamental
                  </h3>
                  <div className="space-y-4 text-sm text-slate-600">
                    <div>
                      <p className="font-semibold text-slate-800 mb-1">La energía total es el área bajo la curva de potencia:</p>
                      <code className="block bg-slate-900 p-2 rounded-lg border border-slate-700 font-mono text-xs text-purple-400 shadow-sm">
                        ∫₀²⁴ (A + Bsin(wt)) dt
                      </code>
                    </div>
                    
                    <div>
                      <p className="font-semibold text-slate-800 mb-1">Resolvemos la integral definida:</p>
                      <code className="block bg-slate-900 p-2 rounded-lg border border-slate-700 font-mono text-xs text-purple-400 shadow-sm">
                        = [At - (B/w)cos(wt)]₀²⁴
                      </code>
                    </div>
                    
                    <div>
                      <p className="font-semibold text-slate-800 mb-1">Debido a la periodicidad del seno en 24h, el término oscilatorio se cancela:</p>
                      <code className="block bg-slate-900 p-2 rounded-lg border border-slate-700 font-mono text-xs text-purple-400 shadow-sm">
                        Total = 24 * A
                      </code>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Graph & Results */}
              <div className="md:col-span-8 space-y-6">
                <Card className="p-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Zap size={120} />
                  </div>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold text-lg text-slate-700">Perfil de Consumo (24 Horas)</h3>
                  </div>
                  
                  <div className="h-64 w-full">
                    <IntegralGraph A={baseA} B={ampB} />
                  </div>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <Card className="p-6 bg-gradient-to-br from-purple-600 to-blue-600 text-white border-none">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                        <Activity size={24} />
                      </div>
                      <span className="font-medium text-purple-100">Energía Total (Integral)</span>
                    </div>
                    <div className="text-4xl font-bold mt-2 tracking-tight">
                      {totalEnergy.toFixed(2)} <span className="text-xl font-normal opacity-80">kWh</span>
                    </div>
                    <p className="text-xs mt-2 text-purple-100 opacity-70">
                      Área total bajo la curva azul
                    </p>
                   </Card>

                   <Card className="p-6">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-green-100 text-green-600 rounded-lg">
                        <DollarSign size={24} />
                      </div>
                      <span className="font-medium text-slate-500">Costo Estimado del Día</span>
                    </div>
                    <div className="text-4xl font-bold mt-2 tracking-tight text-slate-800">
                      ${energyCost.toFixed(2)}
                    </div>
                    <p className="text-xs mt-2 text-slate-400">
                      Calculado a una tarifa promedio de $0.15/kWh
                    </p>
                   </Card>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
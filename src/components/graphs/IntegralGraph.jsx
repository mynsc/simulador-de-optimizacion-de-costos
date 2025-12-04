/**
 * IntegralGraph - Gráfica del consumo energético y su integral
 * 
 * CONCEPTO MATEMÁTICO: INTEGRALES Y ACUMULACIÓN
 * 
 * Este componente visualiza:
 * 1. La función de consumo instantáneo: E(t) = A + B·sin(2πt/24)
 * 2. El área bajo la curva (integral definida) que representa la energía total
 * 
 * Interpretación física:
 * - E(t) es la potencia instantánea en kilovatios (kW)
 * - La integral ∫₀²⁴ E(t)dt es la energía total en kilovatios-hora (kWh)
 * 
 * Cálculo de la integral:
 * ∫₀²⁴ (A + B·sin(2πt/24)) dt = [A·t - (B·24/2π)·cos(2πt/24)]₀²⁴
 * 
 * Debido a que la función seno completa un ciclo en 24 horas:
 * cos(2π·24/24) - cos(0) = 1 - 1 = 0
 * 
 * Por lo tanto: Energía Total = 24·A kWh
 * 
 * @param {number} A - Consumo base constante (kW)
 * @param {number} B - Amplitud de la variación sinusoidal (kW)
 */
export const IntegralGraph = ({ A, B }) => {
  const width = 500;
  const height = 300;
  const padding = 50;
  
  const maxX = 24; // 24 horas (un día completo)
  const maxY = A + B + 2; // Valor máximo con margen
  const minY = Math.max(0, A - B - 1); // Valor mínimo (no negativo)

  // Funciones de escalado
  const xScale = (x) => padding + (x / maxX) * (width - 2 * padding);
  const yScale = (y) => height - padding - ((y - minY) / (maxY - minY)) * (height - 2 * padding);

  // Función de consumo energético
  const getE = (t) => A + B * Math.sin((2 * Math.PI / 24) * t);

  // Generar path para el área sombreada (representa la integral)
  let areaPath = `M ${xScale(0)} ${yScale(minY)}`; // Empezar desde el eje X
  let linePath = `M ${xScale(0)} ${yScale(getE(0))}`; // Línea de la función

  const steps = 150;
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * maxX;
    const y = getE(t);
    const px = xScale(t);
    const py = yScale(y);
    areaPath += ` L ${px} ${py}`;
    linePath += ` L ${px} ${py}`;
  }

  areaPath += ` L ${xScale(maxX)} ${yScale(minY)} Z`; // Cerrar el área

  // Marcadores del eje X (horas)
  const xTicks = [0, 6, 12, 18, 24];
  // Marcadores del eje Y (kW)
  const yTicks = [
    minY,
    Math.round((minY + maxY) / 2),
    Math.round(maxY)
  ];

  return (
    <div className="w-full h-full flex flex-col">
      {/* Leyenda */}
      <div className="flex justify-end items-center gap-2 mb-2 px-2">
        <div className="w-4 h-3 bg-blue-200 border border-blue-600 rounded-sm"></div>
        <span className="text-xs text-slate-500">Área = Energía Total (kWh)</span>
      </div>
      
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full flex-1 bg-slate-50 rounded-lg border border-slate-200">
      {/* Grid horizontal */}
      {yTicks.map((tick, i) => (
        <g key={`y-grid-${i}`}>
          <line 
            x1={padding} 
            y1={yScale(tick)} 
            x2={width - padding} 
            y2={yScale(tick)} 
            stroke="#e2e8f0" 
            strokeWidth="1" 
            strokeDasharray="2,2"
          />
          <text 
            x={padding - 10} 
            y={yScale(tick) + 4} 
            textAnchor="end" 
            fontSize="11" 
            fill="#64748b"
          >
            {Math.round(tick)}
          </text>
        </g>
      ))}

      {/* Grid vertical */}
      {xTicks.map((tick, i) => (
        <g key={`x-grid-${i}`}>
          <line 
            x1={xScale(tick)} 
            y1={height - padding} 
            x2={xScale(tick)} 
            y2={padding} 
            stroke="#e2e8f0" 
            strokeWidth="1" 
            strokeDasharray="2,2"
          />
          <text 
            x={xScale(tick)} 
            y={height - padding + 20} 
            textAnchor="middle" 
            fontSize="11" 
            fill="#64748b"
          >
            {tick}h
          </text>
        </g>
      ))}
      
      {/* Ejes principales */}
      <line 
        x1={padding} 
        y1={height - padding} 
        x2={width - padding} 
        y2={height - padding} 
        stroke="#475569" 
        strokeWidth="2" 
      />
      <line 
        x1={padding} 
        y1={height - padding} 
        x2={padding} 
        y2={padding} 
        stroke="#475569" 
        strokeWidth="2" 
      />
      
      {/* Etiquetas de los ejes */}
      <text 
        x={width / 2} 
        y={height - 10} 
        textAnchor="middle" 
        fontSize="13" 
        fill="#1e293b" 
        fontWeight="600"
      >
        Tiempo (horas del día)
      </text>
      <text 
        x={10} 
        y={height / 2} 
        textAnchor="middle" 
        fontSize="13" 
        fill="#1e293b" 
        fontWeight="600" 
        transform={`rotate(-90, 10, ${height / 2})`}
      >
        Consumo (kW)
      </text>

      {/* Área sombreada (representa la INTEGRAL - energía total acumulada) */}
      <path 
        d={areaPath} 
        fill="rgba(59, 130, 246, 0.25)" 
        stroke="none"
      />
      
      {/* Línea de la función de consumo */}
      <path 
        d={linePath} 
        fill="none" 
        stroke="#2563eb" 
        strokeWidth="3" 
      />

      {/* Indicadores de valores máximo y mínimo */}
      <circle 
        cx={xScale(6)} 
        cy={yScale(A + B)} 
        r="4" 
        fill="#8b5cf6" 
        opacity="0.7"
      />
      <circle 
        cx={xScale(18)} 
        cy={yScale(A - B)} 
        r="4" 
        fill="#8b5cf6" 
        opacity="0.7"
      />
    </svg>
    </div>
  );
};

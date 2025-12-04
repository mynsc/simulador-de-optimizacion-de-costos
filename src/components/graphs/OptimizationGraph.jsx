/**
 * OptimizationGraph - Gráfica de la función de costo y su optimización
 * 
 * CONCEPTO MATEMÁTICO: DERIVADAS Y OPTIMIZACIÓN
 * 
 * Este componente visualiza:
 * 1. La función de costo total: C(x) = k₁x² + k₂/x
 * 2. Sus componentes: Hardware (k₁x²) e Ineficiencia (k₂/x)
 * 3. El punto óptimo encontrado mediante la derivada primera
 * 
 * Para encontrar el mínimo:
 * - Derivamos: C'(x) = 2k₁x - k₂/x²
 * - Igualamos a cero: 2k₁x - k₂/x² = 0
 * - Resolvemos: x_óptimo = ∛(k₂ / 2k₁)
 * 
 * @param {number} k1 - Coeficiente de costo de hardware
 * @param {number} k2 - Coeficiente de ineficiencia
 * @param {number} optimalX - Valor óptimo de x calculado
 * @param {number} currentX - Valor actual seleccionado por el usuario
 */
export const OptimizationGraph = ({ k1, k2, optimalX, currentX }) => {
  const width = 500;
  const height = 300;
  const padding = 50;
  
  // Rango de graficación dinámico
  const minX = 1;
  const maxX = Math.max(optimalX * 2.5, 10);
  
  // Funciones de costo
  const getH = (x) => k1 * x * x; // Hardware: función cuadrática
  const getI = (x) => k2 / x;     // Ineficiencia: función hiperbólica
  const getTotal = (x) => getH(x) + getI(x); // Costo total
  
  // Calcular escala Y para que todo quepa
  const maxY = getTotal(minX) * 1.1;
  const minY = 0;
  
  // Funciones de escalado (transforman coordenadas matemáticas a píxeles)
  const xScale = (x) => padding + ((x - minX) / (maxX - minX)) * (width - 2 * padding);
  const yScale = (y) => height - padding - ((y - minY) / (maxY - minY)) * (height - 2 * padding);

  // Generar paths SVG para las curvas
  const generatePath = (func, steps = 100) => {
    let path = `M ${xScale(minX)} ${yScale(func(minX))}`;
    for (let i = 1; i <= steps; i++) {
      const x = minX + (i / steps) * (maxX - minX);
      path += ` L ${xScale(x)} ${yScale(func(x))}`;
    }
    return path;
  };

  // Calcular coordenadas de puntos importantes
  const optimalY = getTotal(optimalX);
  const currentY = getTotal(currentX);

  // Marcadores del eje X
  const xTicks = [minX, Math.round(maxX / 2), Math.round(maxX)];
  // Marcadores del eje Y
  const yTicks = [0, Math.round(maxY / 2), Math.round(maxY)];

  return (
    <div className="w-full h-full flex flex-col">
      {/* Leyenda */}
      <div className="flex justify-end items-center gap-4 mb-2 px-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-0.5 border-t-2 border-dashed border-slate-400"></div>
          <span className="text-xs text-slate-500">Componentes individuales</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-0.5 bg-blue-600"></div>
          <span className="text-xs font-semibold text-blue-600">Costo Total</span>
        </div>
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
            ${Math.round(tick)}
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
            {tick.toFixed(1)}
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
        Asignación de RAM (GB)
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
        Costo ($/hora)
      </text>

      {/* Curvas de las funciones componentes (punteadas) */}
      <path 
        d={generatePath(getH)} 
        fill="none" 
        stroke="#94a3b8" 
        strokeWidth="2" 
        strokeDasharray="5,3" 
      />
      <path 
        d={generatePath(getI)} 
        fill="none" 
        stroke="#94a3b8" 
        strokeWidth="2" 
        strokeDasharray="5,3" 
      />
      
      {/* Curva de costo total (línea sólida) */}
      <path 
        d={generatePath(getTotal)} 
        fill="none" 
        stroke="#2563eb" 
        strokeWidth="3" 
      />

      {/* Punto Óptimo (mínimo de la función) */}
      <circle cx={xScale(optimalX)} cy={yScale(optimalY)} r="6" fill="#22c55e" stroke="#16a34a" strokeWidth="2" />
      <line 
        x1={xScale(optimalX)} 
        y1={yScale(optimalY)} 
        x2={xScale(optimalX)} 
        y2={height - padding} 
        stroke="#22c55e" 
        strokeWidth="2"
        strokeDasharray="4,2" 
      />
      <text 
        x={xScale(optimalX)} 
        y={yScale(optimalY) - 15} 
        textAnchor="middle" 
        fontSize="12" 
        fontWeight="bold" 
        fill="#16a34a"
      >
        Mínimo
      </text>

      {/* Punto Actual del Usuario */}
      {currentX && currentX !== optimalX && (
        <>
          <circle cx={xScale(currentX)} cy={yScale(currentY)} r="6" fill="#ef4444" stroke="#dc2626" strokeWidth="2" />
          <line 
            x1={xScale(currentX)} 
            y1={yScale(currentY)} 
            x2={xScale(currentX)} 
            y2={height - padding} 
            stroke="#ef4444" 
            strokeWidth="2"
            strokeDasharray="4,2" 
          />
          <text 
            x={xScale(currentX)} 
            y={yScale(currentY) - 15} 
            textAnchor="middle" 
            fontSize="12" 
            fontWeight="bold" 
            fill="#dc2626"
          >
            Actual
          </text>
        </>
      )}
    </svg>
    </div>
  );
};

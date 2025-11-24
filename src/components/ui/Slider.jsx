/**
 * Componente Slider - Control deslizante para ajustar valores numéricos
 * Permite al usuario modificar parámetros dentro de un rango definido
 * 
 * @param {string} label - Etiqueta descriptiva del parámetro
 * @param {number} value - Valor actual del slider
 * @param {number} min - Valor mínimo permitido
 * @param {number} max - Valor máximo permitido
 * @param {number} step - Incremento entre valores
 * @param {function} onChange - Callback al cambiar el valor
 * @param {string} unit - Unidad de medida (opcional)
 */
export const Slider = ({ label, value, min, max, step, onChange, unit = "" }) => (
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

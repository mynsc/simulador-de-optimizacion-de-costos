/**
 * Componente Card - Contenedor visual con bordes y sombras
 * Proporciona un contenedor consistente para agrupar contenido relacionado
 */
export const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden ${className}`}>
    {children}
  </div>
);

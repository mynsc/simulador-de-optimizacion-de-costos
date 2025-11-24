/**
 * Componente SectionTitle - Título de sección con icono
 * Proporciona un encabezado visual consistente para diferentes secciones
 * 
 * @param {Component} icon - Componente de icono de lucide-react
 * @param {string} title - Título principal de la sección
 * @param {string} subtitle - Descripción breve de la sección
 */
export const SectionTitle = ({ icon: Icon, title, subtitle }) => (
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

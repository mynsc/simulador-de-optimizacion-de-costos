/**
 * Footer Component
 * Footer con información del proyecto y equipo
 */

export const Footer = () => {
  return (
    <footer className="bg-slate-800 text-slate-300 py-8 mt-16">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Sobre Nosotros */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Sobre Nosotros</h3>
            <div className="space-y-2 text-sm">
              <p className="text-slate-100 font-semibold">PROYECTO FINAL</p>
              <p><span className="font-medium">Curso:</span> Cálculo II</p>
              <p><span className="font-medium">Tema:</span> Simulador de Optimización de Costos en la Nube</p>
              <p><span className="font-medium">Docente:</span> Terreros Navarro, Hellen Gloria</p>
            </div>
          </div>

          {/* Integrantes */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Integrantes</h3>
            <ul className="space-y-1.5 text-sm">
              <li>Alache Chunga, Juan Jesús</li>
              <li>Anaya Rojas, Antonio Gerardo Saul</li>
              <li>Barrientos Soto, Cristhian Alexander</li>
              <li>Cerquin Agurto, Matias Amir</li>
              <li>Méndez Serrepe, Sofía Carolina</li>
              <li>Melgar Matos, Jeick Carlos Emilio</li>
              <li>Pardave Jara, Asthri Joanne</li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-slate-700 text-center text-sm text-slate-400">
          <p>Lima, 2025 • Universidad Nacional Mayor de San Marcos</p>
        </div>
      </div>
    </footer>
  );
};

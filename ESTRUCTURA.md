# 📂 Estructura del Proyecto (Arquitectura Moderna)

## Vista General

```
simulador-de-optimizacion-de-costos/
├── public/                          # Archivos estáticos
├── src/                             # Código fuente
│   ├── pages/                       # 📄 Vistas principales (páginas)
│   ├── components/                  # Componentes React
│   │   ├── ui/                     # Componentes de interfaz
│   │   ├── graphs/                 # Componentes de gráficas
│   │   ├── layout/                 # Componentes de estructura
│   │   └── sections/               # Secciones de páginas
│   ├── hooks/                      # 🪝 Custom Hooks
│   ├── utils/                      # Utilidades y funciones
│   ├── constants/                  # Constantes de configuración
│   ├── App.jsx                     # Componente raíz (¡solo 30 líneas!)
│   ├── main.jsx                    # Punto de entrada
│   └── index.css                   # Estilos globales
├── README.md                       # Documentación principal
├── CONCEPTOS_MATEMATICOS.md        # Guía de conceptos matemáticos
├── ESTRUCTURA.md                   # Este archivo
├── GUIA_DESPLIEGUE.md             # Guía de despliegue y actualización
├── package.json                    # Dependencias del proyecto
├── vite.config.js                  # Configuración de Vite
└── eslint.config.js                # Configuración de ESLint
```

---

## Descripción Detallada

### 📄 `/src/pages/`
**Vistas principales de la aplicación (Smart Components).**

#### `OptimizationPage.jsx`
**Vista de optimización mediante derivadas.**

```jsx
// Composición de la página
<OptimizationPage>
  ├── <OptimizationControls />     // Sliders para k₁, k₂, x
  ├── <OptimizationExplanation />  // Explicación paso a paso
  └── <OptimizationResults />      // Gráfica + métricas
</OptimizationPage>
```

**Responsabilidades**:
- Usa el hook `useOptimization()` para manejar estado
- Orquesta los componentes de sección
- NO contiene lógica de negocio (está en el hook)

#### `IntegrationPage.jsx`
**Vista de integración y acumulación.**

```jsx
// Composición de la página
<IntegrationPage>
  ├── <EnergyControls />          // Sliders para A, B
  ├── <EnergyExplanation />       // Teorema fundamental
  └── <EnergyResults />           // Gráfica + energía total
</IntegrationPage>
```

**Responsabilidades**:
- Usa el hook `useEnergy()` para manejar estado
- Orquesta los componentes de sección
- NO contiene lógica de negocio

---

### 🪝 `/src/hooks/`
**Custom Hooks para lógica de estado reutilizable.**

#### `useOptimization.js`
**Hook que encapsula toda la lógica de optimización.**

```javascript
const {
  k1, k2, userX,           // Estado
  setK1, setK2, setUserX,  // Setters
  optimalX,                // Punto óptimo calculado
  savingsData,             // { currentCost, optimalCost, savings, % }
} = useOptimization();
```

**Ventajas**:
- ✅ Lógica reutilizable en múltiples componentes
- ✅ Cálculos memoizados con `useMemo`
- ✅ Fácil de testear independientemente
- ✅ Separa UI de lógica de negocio

#### `useEnergy.js`
**Hook que encapsula toda la lógica de energía.**

```javascript
const {
  baseA, ampB,              // Estado
  setBaseA, setAmpB,        // Setters
  totalEnergy,              // Integral calculada
  energyCost,               // Costo estimado
} = useEnergy();
```

---

### 🏗️ `/src/components/layout/`
**Componentes de estructura de la aplicación.**

#### `Header.jsx`
```jsx
// Encabezado con título e icono
<Header />
```
- Título de la aplicación
- Descripción breve
- Usa constantes de LABELS

#### `TabNavigation.jsx`
```jsx
// Navegación entre pestañas
<TabNavigation 
  activeTab="optimization" 
  onTabChange={setActiveTab} 
/>
```
- Tabs de Optimización e Integración
- Maneja el estado activo visualmente
- Props: `activeTab`, `onTabChange`

#### `MainLayout.jsx`
```jsx
// Layout principal que envuelve todo
<MainLayout>
  {children}
</MainLayout>
```
- Estructura común: Header + main container
- Aplica estilos globales de layout
- Maneja el spacing del header overlap

---

### 📦 `/src/components/sections/`
**Secciones reutilizables de páginas (Dumb Components).**

#### Secciones de Optimización:

**`OptimizationControls.jsx`**
- Panel con sliders para k₁, k₂, y x del usuario
- Muestra la fórmula C(x) = k₁x² + k₂/x
- Props: valores + funciones onChange

**`OptimizationExplanation.jsx`**
- Explicación matemática paso a paso
- Muestra proceso de derivación
- Props: k1, k2 (para mostrar en fórmulas)

**`OptimizationResults.jsx`**
- Gráfica de OptimizationGraph
- 3 tarjetas de métricas (RAM óptima, costo actual, ahorro)
- Props: todos los valores calculados

#### Secciones de Energía:

**`EnergyControls.jsx`**
- Panel con sliders para A y B
- Muestra la fórmula E(t) = A + B·sin(2πt/24)
- Props: valores + funciones onChange

**`EnergyExplanation.jsx`**
- Teorema Fundamental del Cálculo
- Resolución de la integral paso a paso
- Props: totalEnergy (para mostrar resultado)

**`EnergyResults.jsx`**
- Gráfica de IntegralGraph
- 2 tarjetas (energía total, costo estimado)
- Props: todos los valores calculados

### 📁 `/src/components/ui/`
Componentes de interfaz reutilizables.

#### `Card.jsx`
```jsx
// Contenedor visual con bordes y sombras
<Card className="p-6">
  {/* Contenido */}
</Card>
```
**Uso**: Agrupar contenido relacionado con estilo consistente.

#### `Slider.jsx`
```jsx
// Control deslizante para ajustar valores
<Slider 
  label="Etiqueta"
  value={valor}
  min={0}
  max={100}
  step={1}
  onChange={setValor}
  unit="unidad"
/>
```
**Uso**: Permitir al usuario modificar parámetros numéricos.

#### `SectionTitle.jsx`
```jsx
// Título de sección con icono
<SectionTitle 
  icon={IconComponent}
  title="Título"
  subtitle="Descripción"
/>
```
**Uso**: Encabezados visuales para diferentes secciones.

---

### 📁 `/src/components/graphs/`
Componentes de visualización matemática.

#### `OptimizationGraph.jsx`
**Propósito**: Visualizar la función de costo y su optimización.

**Props**:
- `k1`: Coeficiente de hardware
- `k2`: Coeficiente de ineficiencia
- `optimalX`: Punto óptimo calculado
- `currentX`: Valor actual del usuario

**Conceptos Matemáticos**:
- Función cuadrática: `k₁x²`
- Función hiperbólica: `k₂/x`
- Punto de mínimo encontrado por derivadas
- Visualización de componentes y total

**Características**:
- Ejes con marcadores y labels
- Grid de referencia
- Punto óptimo (verde) y punto actual (rojo)
- Líneas guía verticales

#### `IntegralGraph.jsx`
**Propósito**: Visualizar consumo energético y su integral.

**Props**:
- `A`: Consumo base constante
- `B`: Amplitud de variación

**Conceptos Matemáticos**:
- Función sinusoidal: `A + B·sin(2πt/24)`
- Área bajo la curva (integral definida)
- Periodo de 24 horas

**Características**:
- Área sombreada (representa la integral)
- Ciclo completo de 24 horas
- Marcadores de tiempo
- Puntos máximo y mínimo destacados

---

### 📁 `/src/utils/`

#### `mathCalculations.js`
Funciones matemáticas documentadas.

**Sección 1: Optimización (Derivadas)**
```javascript
calculateOptimalRAM(k1, k2)
// Retorna: x_óptimo = ∛(k₂/(2k₁))

calculateTotalCost(x, k1, k2)
// Retorna: C(x) = k₁x² + k₂/x

calculateSavings(currentX, optimalX, k1, k2)
// Retorna: { currentCost, optimalCost, savings, percentSavings }
```

**Sección 2: Acumulación (Integrales)**
```javascript
calculateTotalEnergy(A, B)
// Retorna: E_total = 24A

calculateEnergyCost(totalEnergy, pricePerKWh)
// Retorna: Costo en dólares

numericalIntegration(func, a, b, n)
// Método del trapecio para integrales numéricas
```

**Documentación**: Cada función incluye:
- Explicación del concepto matemático
- Fórmulas utilizadas
- Proceso paso a paso
- Parámetros y valores de retorno

---

### 📁 `/src/constants/`

#### `index.js`
Configuración centralizada.

**Secciones**:
1. `OPTIMIZATION_DEFAULTS`: Valores iniciales para optimización
2. `ENERGY_DEFAULTS`: Valores iniciales para energía
3. `GRAPH_CONFIG`: Configuración de gráficas (tamaños, colores)
4. `LABELS`: Textos de la interfaz
5. `FORMULAS`: Fórmulas matemáticas para visualización

**Ventajas**:
- Fácil modificación de valores
- Consistencia en toda la aplicación
- Documentación clara de opciones

---

### 📄 `App.jsx`
Componente principal de la aplicación.

**Estructura**:
```javascript
// 1. Imports
import { componentes, utilidades, constantes }

// 2. Estado
const [k1, setK1] = useState(...)
const [k2, setK2] = useState(...)
// ... más estado

// 3. Cálculos memoizados
const optimalX = useMemo(() => calculateOptimalRAM(k1, k2), [k1, k2])
const savingsData = useMemo(() => calculateSavings(...), [...])

// 4. Renderizado
return (
  <Header />
  <Tabs />
  {activeTab === 'optimization' && <OptimizationSection />}
  {activeTab === 'integration' && <IntegrationSection />}
)
```

**Pestañas**:
1. **Optimización (Derivadas)**: Ajustar parámetros y ver punto óptimo
2. **Acumulación (Integrales)**: Calcular energía total acumulada

---

## 🔄 Flujo de Datos

```
Usuario ajusta slider
       ↓
Estado se actualiza (useState)
       ↓
Cálculos se recomputan (useMemo)
       ↓
Componentes reciben nuevos props
       ↓
Gráficas se redibujan
       ↓
Métricas se actualizan
```

---

## 🎨 Estilos

El proyecto usa **Tailwind CSS** con clases utilitarias:

**Colores principales**:
- `slate-*`: Grises para texto y fondos
- `blue-*`: Azul para elementos principales
- `green-*`: Verde para valores óptimos
- `red-*`: Rojo para valores actuales subóptimos
- `purple-*`: Púrpura para energía

**Patrones comunes**:
```jsx
// Cards con bordes
className="p-6 border-l-4 border-l-green-500"

// Botones de tabs
className="px-6 py-3 rounded-lg font-semibold transition-all"

// Texto en código
className="font-mono text-xs text-green-400"
```

---

## 🚀 Comandos Útiles

```bash
# Desarrollo
npm run dev          # Inicia servidor en localhost:5173

# Producción
npm run build        # Compila para producción en /dist
npm run preview      # Vista previa del build

# Calidad de código
npm run lint         # Ejecuta ESLint
```

---

## 📝 Convenciones de Código

### Nombres de Archivos
- Componentes: `PascalCase.jsx` (ej: `Card.jsx`)
- Utilidades: `camelCase.js` (ej: `mathCalculations.js`)
- Constantes: `UPPER_SNAKE_CASE` en el contenido

### Estructura de Componentes
```jsx
/**
 * Documentación JSDoc
 */
export const ComponentName = ({ props }) => {
  // 1. Lógica
  // 2. Return con JSX
  return (
    <div>
      {/* Comentarios claros */}
    </div>
  );
};
```

### Comentarios
- Secciones: `// =====`
- Subsecciones: `/* ----- */`
- Explicaciones: `// Descripción clara`

---

## 🔍 Puntos de Extensión

### Añadir Nuevos Cálculos
1. Agregar función en `/utils/mathCalculations.js`
2. Documentar con JSDoc y explicación matemática
3. Exportar y usar en `App.jsx`

### Añadir Nueva Gráfica
1. Crear componente en `/components/graphs/`
2. Documentar props y conceptos matemáticos
3. Exportar en `index.js`
4. Importar en `App.jsx`

### Modificar Estilos
1. Ajustar clases de Tailwind en componentes
2. O modificar colores en `/constants/index.js` (GRAPH_CONFIG)

---

## 🎓 Recursos para Aprender

### En el Proyecto
- `CONCEPTOS_MATEMATICOS.md`: Guía de matemáticas
- `README.md`: Documentación general
- Comentarios en código: Explicaciones detalladas

### Conceptos de React
- `useState`: Manejo de estado
- `useMemo`: Optimización de cálculos
- Componentes funcionales
- Props y composición

### Conceptos de Cálculo
- Derivadas y optimización
- Integrales y acumulación
- Funciones compuestas
- Análisis de gráficas

---

**Última actualización**: Noviembre 2025

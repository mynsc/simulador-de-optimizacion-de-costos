# 🏗️ Arquitectura Moderna de React

## Diagrama de Flujo de Datos

```
┌─────────────────────────────────────────────────────────────────┐
│                          App.jsx                                 │
│                    (30 líneas - Routing)                        │
│                                                                  │
│   ┌──────────────┐           ┌──────────────┐                  │
│   │   Pestaña:   │           │   Pestaña:   │                  │
│   │ Optimización │           │  Integración │                  │
│   └──────────────┘           └──────────────┘                  │
└─────────────────────────────────────────────────────────────────┘
           │                              │
           ▼                              ▼
┌─────────────────────┐      ┌─────────────────────┐
│ OptimizationPage    │      │  IntegrationPage    │
│ ┌─────────────────┐ │      │ ┌─────────────────┐ │
│ │ useOptimization │ │      │ │   useEnergy     │ │
│ │    (hook)       │ │      │ │    (hook)       │ │
│ │                 │ │      │ │                 │ │
│ │ • k1, k2, userX │ │      │ │ • baseA, ampB   │ │
│ │ • optimalX      │ │      │ │ • totalEnergy   │ │
│ │ • savingsData   │ │      │ │ • energyCost    │ │
│ └─────────────────┘ │      │ └─────────────────┘ │
└─────────────────────┘      └─────────────────────┘
           │                              │
           ├──────────────────────────────┤
           │                              │
           ▼                              ▼
┌──────────────────────────────────────────────────┐
│            Componentes de Sección                │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐│
│  │  Controls  │  │Explanation │  │  Results   ││
│  │  (Sliders) │  │ (Math)     │  │  (Graph +  ││
│  │            │  │            │  │   Metrics) ││
│  └────────────┘  └────────────┘  └────────────┘│
└──────────────────────────────────────────────────┘
           │                              │
           ├──────────────────────────────┤
           │                              │
           ▼                              ▼
┌──────────────────────────────────────────────────┐
│         Componentes Reutilizables                │
│  ┌────────┐  ┌────────┐  ┌────────────────────┐│
│  │  Card  │  │ Slider │  │ OptimizationGraph  ││
│  │        │  │        │  │  IntegralGraph     ││
│  └────────┘  └────────┘  └────────────────────┘│
└──────────────────────────────────────────────────┘
           │                              │
           └──────────────┬───────────────┘
                          ▼
           ┌──────────────────────────┐
           │   utils/mathCalculations │
           │  • calculateOptimalRAM   │
           │  • calculateTotalEnergy  │
           │  • calculateSavings      │
           │  • calculateEnergyCost   │
           └──────────────────────────┘
```

---

## 🔄 Patrón de Diseño

### 1. **Container/Presentational Pattern**

#### Containers (Smart Components):
- `OptimizationPage`
- `IntegrationPage`

**Responsabilidades**:
- ✅ Manejar estado (via hooks)
- ✅ Lógica de negocio
- ✅ Orquestar componentes
- ❌ NO tienen estilos complejos
- ❌ NO tienen lógica de UI

#### Presentational (Dumb Components):
- Todos los componentes en `/sections`
- Todos los componentes en `/ui`

**Responsabilidades**:
- ✅ Renderizar UI
- ✅ Recibir datos via props
- ✅ Emitir eventos
- ❌ NO manejan estado global
- ❌ NO hacen cálculos complejos

---

### 2. **Custom Hooks Pattern**

```javascript
// ❌ ANTES: Todo en el componente
function OptimizationPage() {
  const [k1, setK1] = useState(2);
  const [k2, setK2] = useState(128);
  const [userX, setUserX] = useState(2);
  const optimalX = useMemo(() => Math.cbrt(k2 / (2 * k1)), [k1, k2]);
  // ... 100 líneas más ...
}

// ✅ AHORA: Hook reutilizable
function OptimizationPage() {
  const optimization = useOptimization();
  // Solo 10-20 líneas de orquestación
}
```

**Ventajas**:
- Lógica reutilizable
- Más fácil de testear
- Código más limpio
- Separación de responsabilidades

---

### 3. **Composition Pattern**

```javascript
// Composición jerárquica
<MainLayout>
  <TabNavigation />
  <OptimizationPage>
    <OptimizationControls />
    <OptimizationExplanation />
    <OptimizationResults>
      <OptimizationGraph />
      <MetricsCards />
    </OptimizationResults>
  </OptimizationPage>
</MainLayout>
```

**Ventajas**:
- Componentes pequeños y enfocados
- Fácil de entender
- Reutilización máxima
- Testing individual

---

## 📊 Comparación: Antes vs Ahora

### Antes (Monolítico):
```
App.jsx
├── 506 líneas
├── Todo el estado mezclado
├── Toda la UI en un archivo
├── Difícil de mantener
└── Imposible de reutilizar
```

### Ahora (Modular):
```
App.jsx (30 líneas)
├── pages/ (2 archivos, ~50 líneas c/u)
├── hooks/ (2 archivos, ~40 líneas c/u)
├── layout/ (3 archivos, ~30 líneas c/u)
├── sections/ (6 archivos, ~60 líneas c/u)
├── ui/ (3 archivos, ~30 líneas c/u)
└── graphs/ (2 archivos, ~150 líneas c/u)

Total: ~15 archivos organizados
Cada archivo: <200 líneas
Reutilización: 100%
```

---

## 🎯 Beneficios de la Nueva Arquitectura

### 1. **Escalabilidad**
```javascript
// Agregar nueva página es trivial:

// 1. Crear hook
export const useNewFeature = () => { /* ... */ };

// 2. Crear página
export const NewFeaturePage = () => {
  const data = useNewFeature();
  return <div>{/* componentes */}</div>;
};

// 3. Añadir al App.jsx
{activeTab === 'newfeature' && <NewFeaturePage />}
```

### 2. **Mantenibilidad**
- ¿Error en la gráfica? → `src/components/graphs/`
- ¿Cambiar cálculos? → `src/utils/mathCalculations.js`
- ¿Ajustar UI? → `src/components/sections/`
- ¿Bug en estado? → `src/hooks/`

### 3. **Reutilización**
```javascript
// Usar el mismo slider en múltiples lugares
<Slider label="Parámetro" value={x} onChange={setX} />

// Mismo hook en diferentes contextos
const optimization = useOptimization();
```

### 4. **Testing**
```javascript
// Test aislado de cada pieza
test('useOptimization calculates optimal RAM', () => {
  const { result } = renderHook(() => useOptimization());
  expect(result.current.optimalX).toBeCloseTo(4);
});

test('OptimizationGraph renders correctly', () => {
  render(<OptimizationGraph k1={2} k2={128} />);
  // assertions...
});
```

---

## 🚀 Próximos Pasos Posibles

### Mejoras Adicionales (Opcionales):

1. **React Router** (si creces más)
```bash
npm install react-router-dom
```
```javascript
// URLs separadas: /optimization y /integration
<Route path="/optimization" element={<OptimizationPage />} />
<Route path="/integration" element={<IntegrationPage />} />
```

2. **Context API** (si necesitas estado global)
```javascript
// src/context/AppContext.jsx
export const useAppContext = () => {
  // estado global compartido
};
```

3. **TypeScript** (para type safety)
```bash
npm install -D typescript @types/react
```

4. **Testing** (para garantizar calidad)
```bash
npm install -D vitest @testing-library/react
```

5. **Storybook** (para documentar componentes)
```bash
npx storybook init
```

---

## 💡 Lecciones de Arquitectura

### Principios Aplicados:

1. **Single Responsibility Principle**
   - Cada componente hace UNA cosa bien

2. **Don't Repeat Yourself (DRY)**
   - Hooks reutilizables
   - Componentes compartidos

3. **Separation of Concerns**
   - UI separada de lógica
   - Estado separado de presentación

4. **Composition over Inheritance**
   - Pequeños componentes que se combinan
   - No clases, solo funciones

5. **Open/Closed Principle**
   - Fácil extender (agregar features)
   - No necesitas modificar lo existente

---

**Esta es una arquitectura profesional y moderna que puedes usar como base para futuros proyectos React! 🎉**

# 🚀 Simulador de Optimización de Costos en la Nube

Proyecto interactivo de **Cálculo 2** que aplica conceptos de cálculo diferencial e integral para optimizar costos de recursos en la nube y calcular consumo energético acumulado.

## 📚 Conceptos Matemáticos Aplicados

### 1. DERIVADAS Y OPTIMIZACIÓN

#### Función de Costo Total
```
C(x) = k₁x² + k₂/x
```

Donde:
- **x**: Cantidad de RAM asignada (GB)
- **k₁**: Coeficiente de costo de hardware ($/GB²·h)
- **k₂**: Coeficiente de ineficiencia ($·GB/h)

#### Componentes de la Función
1. **Costo de Hardware**: `H(x) = k₁x²`
   - Función cuadrática que crece rápidamente
   - Representa el costo de asignar más recursos físicos

2. **Costo de Ineficiencia**: `I(x) = k₂/x`
   - Función hiperbólica que decrece
   - Representa costos por rendimiento deficiente con pocos recursos

#### Proceso de Optimización

**Paso 1**: Calcular la primera derivada
```
C'(x) = 2k₁x - k₂/x²
```

**Paso 2**: Igualar a cero para encontrar puntos críticos
```
2k₁x - k₂/x² = 0
2k₁x = k₂/x²
2k₁x³ = k₂
x³ = k₂/(2k₁)
```

**Paso 3**: Despejar x (punto óptimo)
```
x_óptimo = ∛(k₂/(2k₁))
```

**Paso 4**: Verificar que es un mínimo con la segunda derivada
```
C''(x) = 2k₁ + 2k₂/x³
```

Como k₁ > 0, k₂ > 0 y x > 0, entonces `C''(x) > 0` ✓

Por lo tanto, **x_óptimo es un punto de mínimo global**.

### 2. INTEGRALES Y ACUMULACIÓN

#### Función de Consumo Energético
```
E(t) = A + B·sin(2πt/24)
```

Donde:
- **t**: Tiempo en horas (0 ≤ t ≤ 24)
- **A**: Consumo base constante (kW)
- **B**: Amplitud de la variación sinusoidal (kW)
- **ω = 2π/24**: Frecuencia angular para un periodo de 24 horas

#### Cálculo de Energía Total (Integral Definida)

La energía total consumida en 24 horas es el **área bajo la curva** de potencia:

```
E_total = ∫₀²⁴ E(t) dt = ∫₀²⁴ (A + B·sin(ωt)) dt
```

**Resolviendo la integral**:

```
∫₀²⁴ A dt = [A·t]₀²⁴ = 24A

∫₀²⁴ B·sin(ωt) dt = [-B/ω · cos(ωt)]₀²⁴
                  = -B/ω · [cos(2π) - cos(0)]
                  = -B/ω · [1 - 1]
                  = 0
```

**Resultado**:
```
E_total = 24A kWh
```

#### Interpretación Física

El término sinusoidal se cancela en un ciclo completo porque:
- La función seno oscila simétricamente entre valores positivos y negativos
- En un periodo completo (24h), el área neta del seno es cero
- Solo queda el término constante A multiplicado por el tiempo

**Costo energético**:
```
Costo = E_total × Tarifa ($/kWh)
```

## 🗂️ Estructura del Proyecto (Arquitectura Moderna)

```
src/
├── App.jsx                      # Componente principal (solo routing)
├── main.jsx                     # Punto de entrada
├── index.css                    # Estilos globales
│
├── pages/                       # 📄 Vistas principales
│   ├── OptimizationPage.jsx    # Vista de optimización (derivadas)
│   ├── IntegrationPage.jsx     # Vista de integración (integrales)
│   └── index.js                # Barrel export
│
├── components/
│   ├── ui/                      # 🎨 Componentes de interfaz reutilizables
│   │   ├── Card.jsx            # Contenedor con bordes y sombras
│   │   ├── Slider.jsx          # Control deslizante para parámetros
│   │   ├── SectionTitle.jsx    # Títulos de sección con iconos
│   │   └── index.js            # Barrel export
│   │
│   ├── graphs/                  # 📊 Componentes de visualización
│   │   ├── OptimizationGraph.jsx   # Gráfica de función de costo
│   │   ├── IntegralGraph.jsx       # Gráfica de consumo energético
│   │   └── index.js                # Barrel export
│   │
│   ├── layout/                  # 🏗️ Componentes de estructura
│   │   ├── Header.jsx          # Encabezado de la app
│   │   ├── TabNavigation.jsx   # Navegación entre pestañas
│   │   ├── MainLayout.jsx      # Layout principal
│   │   └── index.js            # Barrel export
│   │
│   └── sections/                # 📦 Secciones de páginas
│       ├── OptimizationControls.jsx     # Panel de controles
│       ├── OptimizationExplanation.jsx  # Explicación matemática
│       ├── OptimizationResults.jsx      # Gráfica y métricas
│       ├── EnergyControls.jsx           # Panel de energía
│       ├── EnergyExplanation.jsx        # Teorema fundamental
│       ├── EnergyResults.jsx            # Resultados energéticos
│       └── index.js                     # Barrel export
│
├── hooks/                       # 🪝 Custom Hooks
│   ├── useOptimization.js      # Lógica de optimización
│   ├── useEnergy.js            # Lógica de energía
│   └── index.js                # Barrel export
│
├── utils/
│   └── mathCalculations.js     # 🧮 Funciones matemáticas
│
└── constants/
    └── index.js                 # ⚙️ Constantes de configuración
```

### Ventajas de esta Arquitectura:

✅ **Separación de Responsabilidades**: Cada archivo tiene un propósito claro
✅ **Reutilización**: Componentes UI y lógica compartida
✅ **Mantenibilidad**: Fácil encontrar y modificar código
✅ **Escalabilidad**: Agregar features sin romper lo existente
✅ **Testeable**: Cada pieza se puede probar independientemente
✅ **Profesional**: Sigue patrones modernos de React

## 🎯 Características Principales

### Sección 1: Optimización (Derivadas)
- ✅ Visualización de la función de costo y sus componentes
- ✅ Cálculo automático del punto óptimo mediante derivadas
- ✅ Comparación entre configuración actual y óptima
- ✅ Cálculo de ahorro potencial
- ✅ Gráfica interactiva con ejes, grid y puntos críticos
- ✅ Explicación paso a paso del proceso matemático

### Sección 2: Acumulación (Integrales)
- ✅ Modelado de consumo energético con función periódica
- ✅ Visualización del área bajo la curva (integral)
- ✅ Cálculo de energía total acumulada
- ✅ Estimación de costos energéticos
- ✅ Gráfica con ciclo completo de 24 horas
- ✅ Explicación del Teorema Fundamental del Cálculo

## 🚀 Instalación y Uso

### Requisitos Previos
- Node.js (v16 o superior)
- npm o pnpm

### Instalación

```bash
# Clonar el repositorio
git clone <url-del-repositorio>
cd simulador-de-optimizacion-de-costos

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

### Build para Producción

```bash
# Crear build optimizado
npm run build

# Vista previa del build
npm run preview
```

### 📤 Despliegue

Consulta la [**GUÍA_DESPLIEGUE.md**](./GUIA_DESPLIEGUE.md) para opciones de despliegue:
- Actualizar en Gemini
- Desplegar en Vercel (recomendado)
- Desplegar en Netlify
- Solo correr localmente

## 📦 Dependencias

- **React 19.2.0**: Biblioteca de UI
- **Vite 7.2.2**: Herramienta de build y desarrollo
- **lucide-react**: Iconos modernos
- **Tailwind CSS** (vía CDN en index.css): Estilos utilitarios

## 🎨 Mejoras Implementadas

### Organización del Código
- ✅ Separación en módulos reutilizables
- ✅ Componentes documentados con JSDoc
- ✅ Constantes centralizadas para fácil configuración
- ✅ Funciones matemáticas con explicaciones detalladas

### Visualización
- ✅ Ejes completos con marcadores y labels
- ✅ Grid de referencia en ambas gráficas
- ✅ Leyendas claras y descriptivas
- ✅ Puntos críticos marcados visualmente
- ✅ Responsive design para diferentes tamaños

### Experiencia de Usuario
- ✅ Transiciones suaves entre pestañas
- ✅ Feedback visual inmediato al ajustar parámetros
- ✅ Explicaciones matemáticas paso a paso
- ✅ Métricas clave destacadas
- ✅ Interfaz intuitiva y profesional

## 📖 Cómo Usar la Aplicación

### Pestaña de Optimización

1. **Ajusta los parámetros del modelo**:
   - `k₁`: Costo de hardware (controla qué tan caro es añadir RAM)
   - `k₂`: Penalización por ineficiencia (controla el costo de tener poca RAM)

2. **Configura tu asignación actual**:
   - Mueve el slider "Tu Asignación de RAM Actual"
   - Observa cómo cambia tu costo vs. el óptimo

3. **Analiza los resultados**:
   - Punto verde: Configuración óptima (mínimo costo)
   - Punto rojo: Tu configuración actual
   - Revisa el ahorro potencial en porcentaje

### Pestaña de Acumulación

1. **Ajusta el perfil de consumo**:
   - `A`: Consumo base constante
   - `B`: Amplitud de la variación diaria

2. **Observa la gráfica**:
   - Línea azul: Consumo instantáneo a lo largo del día
   - Área sombreada: Energía total acumulada (integral)

3. **Revisa los totales**:
   - Energía total en kWh
   - Costo estimado del día

## 🧮 Casos de Uso Educativos

Este proyecto es ideal para:
- Entender aplicaciones prácticas del cálculo diferencial e integral
- Visualizar conceptos abstractos de derivadas e integrales
- Aprender optimización de funciones en contextos reales
- Practicar resolución de integrales definidas
- Comprender la relación entre tasa instantánea y acumulación

## 👨‍💻 Desarrollo

El proyecto fue desarrollado con enfoque en:
- Código limpio y mantenible
- Documentación exhaustiva
- Separación de responsabilidades
- Reutilización de componentes
- Buenas prácticas de React

## 📝 Licencia

Este es un proyecto educativo para el curso de Cálculo 2.

---

**Nota**: Este simulador utiliza funciones matemáticas simplificadas con propósitos educativos. Los valores y modelos no necesariamente reflejan costos reales de servicios en la nube.


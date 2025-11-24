# 📐 Guía de Conceptos Matemáticos

## Índice
1. [Derivadas y Optimización](#derivadas-y-optimización)
2. [Integrales y Acumulación](#integrales-y-acumulación)
3. [Conexión entre Conceptos](#conexión-entre-conceptos)
4. [Aplicaciones Prácticas](#aplicaciones-prácticas)

---

## Derivadas y Optimización

### ¿Qué es una derivada?

La **derivada** de una función representa su **tasa de cambio instantánea**. Geométricamente, es la pendiente de la recta tangente a la curva en un punto.

**Notación**: Si `f(x)` es una función, su derivada se denota como `f'(x)` o `df/dx`.

### ¿Por qué usamos derivadas para optimizar?

En un **punto óptimo** (mínimo o máximo), la pendiente de la función es **cero**, es decir:
```
f'(x) = 0
```

Este es el **criterio de la primera derivada** para encontrar puntos críticos.

### Ejemplo del Proyecto: Función de Costo

```
C(x) = k₁x² + k₂/x
```

Esta función combina dos efectos opuestos:
- **Término cuadrático** (k₁x²): Crece rápido → más recursos = más costo
- **Término hiperbólico** (k₂/x): Decrece → pocos recursos = ineficiencia costosa

**Paso 1**: Derivamos usando las reglas:
- Regla de la potencia: `d/dx(xⁿ) = n·xⁿ⁻¹`
- Regla de la división: `d/dx(1/x) = -1/x²`

```
C'(x) = d/dx(k₁x²) + d/dx(k₂/x)
      = 2k₁x + k₂·(-1/x²)
      = 2k₁x - k₂/x²
```

**Paso 2**: Igualamos a cero y despejamos:
```
2k₁x - k₂/x² = 0
2k₁x = k₂/x²
2k₁x³ = k₂
x³ = k₂/(2k₁)
x = ∛(k₂/(2k₁))
```

**Paso 3**: Verificamos que es un mínimo con la segunda derivada:
```
C''(x) = d/dx(2k₁x - k₂/x²)
       = 2k₁ + 2k₂/x³
```

Como todos los términos son positivos (k₁, k₂, x > 0):
```
C''(x) > 0  →  Es un MÍNIMO ✓
```

### Interpretación Práctica

- Cuando `x < x_óptimo`: Poca RAM → la ineficiencia domina → costos altos
- Cuando `x > x_óptimo`: Mucha RAM → el costo de hardware domina → costos altos
- En `x = x_óptimo`: **Balance perfecto** → costo mínimo

---

## Integrales y Acumulación

### ¿Qué es una integral?

La **integral definida** de una función representa el **área bajo su curva** en un intervalo dado.

**Notación**: 
```
∫ₐᵇ f(x) dx
```

Significa: "el área bajo f(x) desde x=a hasta x=b"

### Teorema Fundamental del Cálculo

Conecta derivadas e integrales:

```
∫ₐᵇ f'(x) dx = f(b) - f(a)
```

En palabras: **La integral de una tasa de cambio nos da el cambio total**.

### Ejemplo del Proyecto: Consumo Energético

```
E(t) = A + B·sin(2πt/24)
```

**Interpretación física**:
- `E(t)` es la **potencia instantánea** (kW) en el momento `t`
- La **energía total** es la integral de la potencia en el tiempo

```
Energía = ∫₀²⁴ E(t) dt
```

### Resolviendo la Integral

**Componente constante**:
```
∫₀²⁴ A dt = [A·t]₀²⁴ = 24A - 0 = 24A
```

**Componente sinusoidal**:
```
∫₀²⁴ B·sin(ωt) dt   donde ω = 2π/24

= [-B/ω · cos(ωt)]₀²⁴
= -B/ω · [cos(ωt)|₂₄ - cos(ωt)|₀]
= -B/ω · [cos(2π) - cos(0)]
= -B/ω · [1 - 1]
= 0
```

**¿Por qué el seno se cancela?**

Porque en un **periodo completo** (24 horas):
- La función seno oscila simétricamente
- Áreas positivas = Áreas negativas
- El **área neta es cero**

**Resultado final**:
```
Energía Total = 24A kWh
```

Solo el término constante contribuye al total en un ciclo completo.

### Interpretación Práctica

- La **variabilidad diaria** (término B) no afecta el consumo total en 24h
- Solo importa el **consumo base promedio** (A)
- Multiplicado por 24 horas = energía total del día

---

## Conexión entre Conceptos

### Relación Fundamental

```
Derivada ←→ Integral
  (inversos)
```

- **Derivada**: De acumulación → tasa instantánea
- **Integral**: De tasa instantánea → acumulación total

### En el Proyecto

**Optimización (Derivadas)**:
```
Costo(x) → C'(x) = 0 → Punto óptimo
```
Encontramos el **mínimo** donde el costo deja de decrecer y empieza a crecer.

**Acumulación (Integrales)**:
```
Potencia(t) → ∫ Potencia dt → Energía total
```
Sumamos la potencia instantánea a lo largo del tiempo para obtener energía acumulada.

---

## Aplicaciones Prácticas

### 1. Optimización de Recursos en la Nube

**Problema**: ¿Cuánta RAM asignar a un servidor?
- Muy poca → Sistema lento, costos de ineficiencia
- Demasiada → Desperdicio, costos de hardware

**Solución con Cálculo**:
- Modelar función de costo total
- Derivar y encontrar el punto óptimo
- Minimizar gastos manteniendo rendimiento

### 2. Análisis de Consumo Energético

**Problema**: Calcular el consumo total diario de un data center
- El consumo varía a lo largo del día
- Necesitamos el total para facturación y planificación

**Solución con Cálculo**:
- Modelar el consumo instantáneo como función del tiempo
- Integrar sobre 24 horas para obtener el total
- Calcular costos basados en tarifa

### 3. Otras Aplicaciones de Estos Conceptos

**Derivadas**:
- Maximizar beneficios en negocios
- Minimizar materiales en construcción
- Optimizar rutas de transporte
- Análisis de velocidad y aceleración

**Integrales**:
- Calcular distancias a partir de velocidades
- Determinar volúmenes de sólidos irregulares
- Análisis de señales y probabilidades
- Cálculo de trabajo y energía en física

---

## Formulas Clave de Referencia

### Derivadas Comunes
```
d/dx(xⁿ) = n·xⁿ⁻¹
d/dx(1/x) = -1/x²
d/dx(sin x) = cos x
d/dx(cos x) = -sin x
d/dx(eˣ) = eˣ
d/dx(ln x) = 1/x
```

### Integrales Comunes
```
∫ xⁿ dx = xⁿ⁺¹/(n+1) + C   (n ≠ -1)
∫ 1/x dx = ln|x| + C
∫ sin x dx = -cos x + C
∫ cos x dx = sin x + C
∫ eˣ dx = eˣ + C
```

### Criterios de Optimización
```
f'(x) = 0    →  Punto crítico
f''(x) > 0   →  Mínimo local
f''(x) < 0   →  Máximo local
f''(x) = 0   →  Punto de inflexión (necesita más análisis)
```

---

**Nota**: Esta guía complementa el simulador interactivo. Experimenta con diferentes valores para visualizar estos conceptos en acción.

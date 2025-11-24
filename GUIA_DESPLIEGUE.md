# 📤 Guía de Despliegue y Actualización

## 🤔 ¿Cómo actualizaré mi despliegue en Gemini?

Tienes **3 opciones** para manejar tu proyecto desplegado:

---

## Opción 1: Actualizar el Despliegue Existente en Gemini ⭐ (RECOMENDADO)

### ¿Mis cambios se verán en el despliegue actual?

**SÍ**, pero necesitas **actualizar el proyecto** en Gemini. Aquí te explico cómo:

### Pasos para Actualizar:

#### 1️⃣ Crear un Build de Producción

```bash
# Desde la raíz del proyecto
npm run build
```

Esto creará una carpeta `/dist` con los archivos optimizados.

#### 2️⃣ Opciones para Actualizar en Gemini:

**Opción A: Reemplazar archivos en Google Cloud Storage (si Gemini usa GCS)**

```bash
# Si tienes acceso a la carpeta de despliegue, simplemente:
# 1. Borra los archivos viejos en el bucket
# 2. Sube los nuevos archivos de /dist
```

**Opción B: Re-desplegar desde cero**

Si Gemini te proporcionó un comando de despliegue:
```bash
# Usa el comando original que te dio Gemini
# Por ejemplo, algo como:
gemini deploy
# o
gcloud app deploy
```

**Opción C: Si usaste Google AI Studio / IDX**

1. Abre tu proyecto en Google IDX
2. Ejecuta `npm run build`
3. Despliega la carpeta `/dist`

#### 3️⃣ Verificar Cambios

- Limpia la caché del navegador (Ctrl + Shift + R)
- Abre tu URL de despliegue
- ¡Verifica que los cambios estén aplicados!

### ✅ Ventajas de esta Opción:
- ✅ Mantiene la misma URL
- ✅ No pierdes el historial
- ✅ Es gratis (mismo servicio)
- ✅ Fácil de mantener

### ❌ Desventajas:
- ❌ Necesitas acceso al método de despliegue original
- ❌ Puede requerir credenciales de Google Cloud

---

## Opción 2: Desplegar a Vercel 🚀 (MÁS FÁCIL)

### ¿Por qué Vercel?
- ✅ **100% GRATIS** para proyectos personales
- ✅ **Despliegue automático** desde GitHub
- ✅ **HTTPS gratuito**
- ✅ **Actualizaciones automáticas** al hacer push

### Pasos:

#### 1️⃣ Subir a GitHub (si no lo has hecho)

```bash
# En la raíz del proyecto
git add .
git commit -m "Arquitectura moderna de React implementada"
git push origin main
```

#### 2️⃣ Desplegar en Vercel

**Método 1: Dashboard Web (más fácil)**
1. Ve a [vercel.com](https://vercel.com)
2. Click en "Sign Up" (usa tu cuenta de GitHub)
3. Click en "New Project"
4. Selecciona tu repositorio `simulador-de-optimizacion-de-costos`
5. Vercel detecta automáticamente que es Vite
6. Click en "Deploy" 
7. ¡Listo! Te dará una URL como: `tu-proyecto.vercel.app`

**Método 2: CLI (si prefieres terminal)**

```bash
# Instalar Vercel CLI
npm install -g vercel

# Desplegar
cd c:\Practicas\simulador-de-optimizacion-de-costos
vercel

# Seguir las instrucciones en pantalla
```

#### 3️⃣ Actualizaciones Futuras

¡Es AUTOMÁTICO! Solo haz:
```bash
git add .
git commit -m "Nuevos cambios"
git push origin main
```

Vercel detecta el push y **redespliega automáticamente** 🎉

### ✅ Ventajas:
- ✅ **MUY FÁCIL** de configurar
- ✅ Actualizaciones automáticas
- ✅ Dominio gratis (.vercel.app)
- ✅ Puedes añadir dominio personalizado
- ✅ SSL/HTTPS incluido
- ✅ CDN global (carga rápida en todo el mundo)

---

## Opción 3: Desplegar a Netlify 🌐 (ALTERNATIVA)

Similar a Vercel, también muy buena opción.

### Pasos Rápidos:

```bash
# Instalar Netlify CLI
npm install -g netlify-cli

# Desplegar
cd c:\Practicas\simulador-de-optimizacion-de-costos
netlify deploy --prod

# O usa el dashboard web en netlify.com
```

### ✅ Ventajas:
- ✅ Gratis para proyectos personales
- ✅ Fácil configuración
- ✅ Buenos analytics
- ✅ Formularios y funciones serverless incluidos

---

## Opción 4: Solo Correr Localmente 💻

Si solo quieres **demostrar el proyecto en clase**:

```bash
# Desarrollo (con hot reload)
npm run dev
# Abre: http://localhost:5173

# O producción local
npm run build
npm run preview
# Abre: http://localhost:4173
```

### ✅ Ventajas:
- ✅ No necesitas internet para mostrarlo
- ✅ Control total
- ✅ Perfecto para presentaciones en clase

### ❌ Desventajas:
- ❌ No puedes compartir URL
- ❌ Solo funciona en tu computadora

---

## 🎯 Recomendación Personal

### Para tu Curso de Cálculo 2:

**Usa Vercel** por estas razones:

1. **Es gratis** y siempre lo será para proyectos académicos
2. **URL pública** que puedes compartir con tu profesor
3. **Actualizaciones automáticas**: Solo haces `git push` y listo
4. **Profesional**: Demuestra que sabes usar herramientas modernas
5. **Certificado**: Vercel te da analytics que puedes mostrar

### Configuración Recomendada:

```bash
# 1. Asegúrate de que tu código esté en GitHub
git add .
git commit -m "Proyecto final de Cálculo 2"
git push origin main

# 2. Ve a vercel.com
# 3. Conecta tu repo
# 4. Deploy automático
# 5. Obtén URL: simulador-calculo2.vercel.app
```

---

## 📝 Checklist Antes de Desplegar

- [ ] `npm run build` funciona sin errores
- [ ] `npm run preview` muestra la app correctamente
- [ ] Todos los archivos están en Git
- [ ] README.md está actualizado
- [ ] Has probado en modo producción local

---

## 🆘 Troubleshooting Común

### Error: "Module not found"
```bash
# Reinstala dependencias
rm -rf node_modules package-lock.json
npm install
```

### El build falla
```bash
# Verifica que no haya errores de ESLint
npm run lint

# Si hay errores, corrígelos o:
# Desactiva temporalmente ESLint en vite.config.js
```

### Los cambios no se ven en Vercel
```bash
# Limpia caché del navegador: Ctrl + Shift + R
# O ve a Vercel Dashboard > Deployments > Redeploy
```

---

## 🔗 Enlaces Útiles

- **Vercel**: https://vercel.com
- **Netlify**: https://netlify.com
- **Vite Docs**: https://vitejs.dev/guide/static-deploy.html
- **GitHub Pages** (otra opción): https://pages.github.com

---

## 💡 Consejo Final

**Para tu curso**: Despliega en Vercel y añade la URL en tu README.md

Ejemplo:
```markdown
## 🌐 Demo en Vivo

Visita la aplicación: https://simulador-calculo2.vercel.app
```

Esto impresionará a tu profesor y demuestra profesionalismo 🎓

---

## 🎓 Estructura del Proyecto (Actualizada)

Tu nuevo proyecto ahora tiene esta estructura moderna:

```
src/
├── components/
│   ├── ui/              # Componentes reutilizables
│   ├── graphs/          # Gráficas matemáticas
│   ├── layout/          # Header, Navigation, Layout
│   └── sections/        # Secciones de páginas
├── pages/               # Vistas principales
│   ├── OptimizationPage.jsx
│   └── IntegrationPage.jsx
├── hooks/               # Custom Hooks
│   ├── useOptimization.js
│   └── useEnergy.js
├── utils/               # Utilidades matemáticas
├── constants/           # Configuración
└── App.jsx              # ¡Solo 30 líneas! 🎉
```

Esta estructura es:
- ✅ **Escalable**: Fácil añadir nuevas features
- ✅ **Mantenible**: Código organizado y claro
- ✅ **Profesional**: Sigue mejores prácticas de React
- ✅ **Testeable**: Cada pieza se puede probar independientemente

---

**¿Necesitas ayuda con el despliegue?** Déjame saber qué método quieres usar y te guío paso a paso. 🚀

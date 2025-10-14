# 🌱 AgriManage
### *Guía de Instalación Completa para Usuarios*

<div align="center">

![AgriManage Banner](https://via.placeholder.com/800x200/4ade80/ffffff?text=AgriManage+🌾)

**Una aplicación completa para la gestión agrícola moderna**

[![Licencia](https://img.shields.io/badge/licencia-MIT-green.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/node-%3E%3D%2016.0.0-brightgreen.svg)](https://nodejs.org/)
[![pnpm](https://img.shields.io/badge/pnpm-recommended-orange.svg)](https://pnpm.io/)

</div>

---

## 🎯 **¿Qué vas a instalar?**

> **¡Transparencia ante todo!** Queremos que te sientas 100% seguro con lo que estás instalando.

<table>
<tr>
<td width="50%">

### 💡 **¿Qué es AgriManage?**
Una aplicación de software para gestión agrícola. El código fuente está almacenado en este repositorio de GitHub que estás viendo ahora mismo.

</td>
<td width="50%">

### 🔒 **¿Es seguro?**
**¡Absolutamente!** Solo descargarás archivos de texto y carpetas. No hay archivos ejecutables (.exe) y el tamaño es muy pequeño.

</td>
</tr>
</table>

### 🛠️ **Herramientas que instalaremos**

| Herramienta | ¿Para qué sirve? | ¿Es segura? |
|-------------|------------------|-------------|
| **Node.js** | El "motor" que ejecuta la aplicación | ✅ Usada por millones de desarrolladores mundialmente |
| **pnpm** | Gestor de componentes de la aplicación | ✅ Herramienta estándar de la industria |

### 🔄 **CI/CD Workflows**

Este proyecto utiliza GitHub Actions para la Integración Continua y el Despliegue Continuo (CI/CD). Los flujos de trabajo se definen en los siguientes archivos:

- `.github/workflows/lint-test.yml`: Realiza el linting y las pruebas unitarias.
- `.github/workflows/build-artifacts.yml`: Construye los artefactos de la aplicación.
- `.github/workflows/deploy-production.yml`: Despliega la aplicación a producción.
- `.github/workflows/e2e-tests.yml`: Ejecuta las pruebas end-to-end.
- `.github/workflows/post-deploy.yml`: Realiza la verificación post-despliegue.
- `.github/workflows/scheduled-maintenance.yml`: Ejecuta tareas de mantenimiento programadas.

---

## 🚀 **Instalación en 5 Pasos**

### **Paso 1️⃣** - Obtener el Código Fuente

**📥 Descargar los archivos de la aplicación**

1. **Descarga el ZIP**
   - Busca el botón verde **`< > Code`** en esta página
   - Selecciona **`Download ZIP`**

2. **Extrae los archivos**
   - Ve a tu carpeta `Descargas`
   - Busca `viveroApp-main.zip`
   - Click derecho → **`Extraer todo...`**

3. **¡Listo!** 
   - Tendrás una carpeta `viveroApp-main` con todo el código
   
> 📁 **¿Qué hay dentro?** Verás carpetas como `apps`, `docs`, `packages` y archivos como `package.json`. ¡Todo normal!

---

### **Paso 2️⃣** - Instalar Node.js (El Motor de la Aplicación)

**⚡ ¿Qué es Node.js?**

Imagina que el código de la aplicación es una **receta escrita en un idioma especial**. Node.js es el **"chef traductor"** que tu computadora necesita para entender y ejecutar esa receta.

> 📊 **Datos que te darán confianza:**
> - Creado en **2009** por Ryan Dahl
> - Usado por **Netflix, Uber, PayPal, LinkedIn, Walmart**
> - **Millones** de desarrolladores lo usan diariamente

**🔗 Proceso de instalación:**

1. **[👉 Ir a la página oficial de Node.js](https://nodejs.org/es/download)**
2. **Descargar** → Busca el logo de Windows → **"Instalador de Windows (.msi)"**
3. **Instalar** → Doble click → Siguiente en todo → ¡Terminado!

> 💡 **Tip:** Elige la versión **LTS** (Soporte a Largo Plazo) - es la más estable.

---

### **Paso 3️⃣** - Instalar pnpm (Gestor de Componentes)

**🧩 ¿Qué es un gestor de paquetes?**

Piénsalo como **construir con Legos**:
- En lugar de fabricar cada pieza, tomas las que ya existen
- Los "paquetes" son esas piezas prefabricadas
- **pnpm** es la herramienta que las organiza automáticamente

**¿Por qué pnpm y no otros?**

| Gestor | Características |
|--------|----------------|
| `npm` | 📦 El original (viene con Node.js) |
| `yarn` | 🚀 Creado por Facebook para ser más rápido |
| `pnpm` | ⚡ **Nuestra elección** - Ultra eficiente con el espacio |

**💻 Instalación:**

1. **Abrir terminal:**
   - Presiona `Windows` → escribe `cmd` → Enter

2. **Ejecutar comando:**
   ```bash
   npm install -g pnpm
   ```
   
> 🔍 **¿Qué hace este comando?**
> - `npm` = Node Package Manager
> - `install` = Instalar algo
> - `-g` = Global (en toda la computadora)
> - `pnpm` = La herramienta que queremos

---

### **Paso 4️⃣** - Instalar Componentes de AgriManage

**🎯 Objetivo:** Descargar todas las "piezas" que la aplicación necesita.

1. **Navegar a la carpeta:**
   ```bash
   cd %USERPROFILE%\Documents\viveroApp-main
   ```

2. **Instalar dependencias:**
   ```bash
   pnpm install
   ```

> 📋 **¿Qué pasa aquí?** pnpm lee la "lista de compras" (`package.json`) y descarga todo lo necesario de internet.

---

### **Paso 5️⃣** - ¡Ejecutar AgriManage!

<div align="center">

### 🎉 **¡El momento que esperabas!**

</div>

1. **Iniciar la aplicación:**
   ```bash
   pnpm dev
   ```

2. **Abrir en el navegador:**
   - Espera a ver: `✓ Compiled successfully`
   - **Ctrl + Click** en el enlace `http://localhost:XXXX`
   - ¡La aplicación se abrirá automáticamente!

> ⚠️ **Importante:** No cierres la terminal mientras uses la aplicación - ¡es su motor!

---

## 🎊 **¡Felicidades!**

<div align="center">

### Has instalado AgriManage correctamente

**🌱 Tu aplicación está lista para usar 🌱**

---

### 📞 **¿Necesitas ayuda?**

Si tienes algún problema, no dudes en:
- 🐛 [Reportar un bug](https://github.com/tu-usuario/agrimanage/issues)
- 💬 [Hacer una pregunta](https://github.com/tu-usuario/agrimanage/discussions)
- 📧 Contactarnos directamente

---

**Hecho con 💚 para la comunidad agrícola**

</div>
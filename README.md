# Pulso Abierto

Aplicación web desarrollada con React y TypeScript para la consulta en tiempo real de precios de criptomonedas (Bitcoin, Ethereum y Solana) mediante la API pública de CoinGecko. Permite filtrar y buscar resultados mediante un formulario controlado con validación, navegar hacia vistas de detalle y gestionar criptomonedas favoritas de forma persistente.

## Tecnologías principales

- **React** y **TypeScript**
- **Vite** (entorno de desarrollo y empaquetado productivo)
- **React Router** (navegación entre listado y páginas de detalle)
- **Zustand** (gestión de estado global y persistencia de favoritos en `localStorage`)
- **Zod** (validación del formulario de filtrado)
- **Vitest** y **Testing Library** (pruebas automatizadas)
- **Vercel** (despliegue en producción)

## URL de la aplicación publicada

- **Producción (Vercel):** https://pulso-abierto-react-blond.vercel.app

## Instalación y comandos

### 1. Instalar dependencias
El proyecto incluye un archivo `.npmrc` configurado con `legacy-peer-deps=true` para evitar conflictos de dependencias entre `vite` y `vitest`. Para instalar las dependencias ejecuta:

```bash
npm install
```

### 2. Ejecutar en modo desarrollo
```bash
npm run dev
```

### 3. Ejecutar pruebas automatizadas
```bash
npm run test
```

### 4. Generar el build productivo
```bash
npm run build
```

### 5. Comprobar el build productivo localmente (preview)
```bash
npm run preview
```

## Variables de entorno

Este proyecto no requiere variables de entorno, ya que consume el endpoint público de la API de CoinGecko sin clave privada.

## Mejora de mantenibilidad realizada

- **Problema identificado:** En el componente `src/pages/HomePage.tsx`, el mensaje pasado al componente `StatusMessage` se resolvía mediante operadores ternarios anidados directamente dentro del JSX, dificultando su lectura, y el tipo de estado incluía el valor `'empty'` que no se utilizaba.
- **Cambio realizado:** Se eliminó el estado `'empty'` sin uso y se extrajo la lógica de selección del texto a una función auxiliar dedicada (`getStatusMessage()`), manteniendo intacto el comportamiento de la interfaz.
- **Verificación sin regresiones:** Se ejecutaron las pruebas automatizadas con `npm run test` (4/4 pruebas aprobadas), se generó el compilado de producción con `npm run build` sin errores y se comprobó el funcionamiento completo de la aplicación mediante `npm run preview`.

## Verificación final

- **Pruebas ejecutadas:** Sí (`npm run test` — 2 archivos de prueba, 4 pruebas aprobadas).
- **Build generado correctamente:** Sí (`npm run build` sin errores).
- **Preview comprobado:** Sí (`npm run preview` verificado en navegador: carga de precios, detalle, favoritos y formulario).
- **Despliegue realizado:** Sí (publicado en Vercel con `vercel.json` configurado para soporte de rutas SPA en recargas).
- **Fecha de verificación:** 23/11/2026.

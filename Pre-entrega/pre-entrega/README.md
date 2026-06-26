# Pre-entrega React

Proyecto React creado con Vite.

## Descripción

Esta aplicación es una base para una tienda o demo de carrito de compras usando React y contexto global. Incluye rutas, componentes reutilizables, layout y manejo de autenticación y carrito.

## Estructura principal

- `src/`
  - `components/` - componentes reutilizables organizados por secciones (`auth`, `detail`, `layouts`, `products`).
  - `context/` - providers globales de estado (`AuthContext.jsx`, `CartContext.jsx`).
  - `pages/` - páginas principales de la app (`Cart.jsx`).
  - `assets/` - recursos estáticos (imágenes, íconos, datos, etc.).
  - `App.jsx` - componente raíz.
  - `main.jsx` - punto de entrada de Vite.

## Instalación

```bash
npm install
```

## Scripts disponibles

```bash
npm run dev
npm run build
npm run preview
```

## Notas

- El proyecto usa React Router para navegación.
- El layout está dividido en `Nav`, `Footer` y `Layout`.
- El carrito y la autenticación se gestionan con contextos React.

## Dependencias principales

- `react`
- `react-dom`
- `react-router-dom`
- `vite`

## Uso

Ejecuta `npm run dev` y abre la URL local que muestre Vite.

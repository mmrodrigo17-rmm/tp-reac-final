# Juancho Store — E-commerce

Proyecto final de React — e-commerce completo con Firebase Auth, Firestore, carrito de compras, panel de administración y más.

## Funcionalidades

- **Autenticación**: Registro y login con Firebase Auth. Roles: `admin` y `usuario`.
- **Catálogo de productos**: Lista paginada con búsqueda por nombre.
- **Detalle de producto**: Imagen, precio, stock, categoría, descripción y opiniones en tiempo real.
- **Carrito de compras**: Agregar, incrementar/decrementar cantidad, eliminar items, vaciar carrito.
- **Panel de administración** (solo admin): CRUD completo de productos con subida de imágenes a ImgBB.
- **Búsqueda**: Filtrado client-side por nombre de producto.
- **SEO**: React Helmet para títulos y meta tags por página.
- **Diseño responsive**: CSS Modules con tema oscuro.

## Stack

| Tecnología | Versión |
|-----------|---------|
| React | 19 |
| Vite | 8 |
| React Router | 7 |
| Firebase | 12 |
| React Helmet Async | 3 |
| React Icons | — |

## Requisitos

- Node.js 18+
- Cuenta de Firebase (gratuita)
- Cuenta de ImgBB (gratuita) — para subir imágenes de productos

## Instalación

```bash
# 1. Clonar el repositorio
git clone https://github.com/mmrodrigo17-rmm/tp-reac-final.git
cd tp-reac-final

# 2. Instalar dependencias
npm install

# 3. Configurar Firebase
# Crear un proyecto en https://console.firebase.google.com
# Habilitar Authentication (Email/Password) y Firestore Database
# Copiar la configuración a src/firebase/config.js

# 4. Iniciar en desarrollo
npm run dev
```

## Configuración de Firebase

1. Crear un proyecto en [Firebase Console](https://console.firebase.google.com).
2. Ir a **Authentication** → **Sign-in method** → Habilitar **Email/Password**.
3. Ir a **Firestore Database** → Crear base de datos en modo de pruebas.
4. Ir a **Project Settings** → Copiar la configuración de Firebase.
5. Reemplazar los valores en `src/firebase/config.js`.

### Estructura de Firestore

```
cliente/{uid}           → { nombre, email, rol: "usuario"|"admin" }
productos-nacionales/{id} → { nombre, precio, descripcion, stock, categoria, imagen }
opiniones/{id}          → { productoId, clienteNombre, comentario, rating }
```

### Usuario Admin

Para dar permisos de administrador, cambiar el campo `rol` a `"admin"` en el documento del usuario dentro de la colección `cliente` de Firestore.

## Scripts

```bash
npm run dev      # Desarrollo
npm run build    # Producción
npm run preview  # Vista previa del build
npm run lint     # ESLint
```

## Deploy

### Vercel

1. Ir a [vercel.com](https://vercel.com) e importar el repositorio de GitHub.
2. Vercel detecta automáticamente Vite como framework.
3. El build command y output directory se configuran solos.
4. Hacer click en **Deploy**.

### Netlify

1. Ir a [netlify.com](https://netlify.com) e importar el repositorio.
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Agregar redirect para SPA en `public/_redirects`:
   ```
   /*    /index.html   200
   ```

## Estructura del proyecto

```
src/
├── assets/icons/        # Iconos SVG
├── components/
│   ├── forms/           # Dashboard, FormContainer, FormProducto
│   ├── items/           # Item, ItemList, ItemListContainer
│   ├── layouts/         # Header, Nav, Footer, Layout
│   └── search/          # BarraBusqueda, ResultadoBusqueda
├── context/             # AuthContext, CartContext, ProductosContext, BusquedaContext
├── firebase/            # Configuración de Firebase
├── hooks/               # usePaginacion
└── pages/               # Inicio, Productos, DetalleProducto, Carrito, Login, Registro, Contacto
├── App.jsx              # Rutas
├── App.css              # Estilos globales
├── index.css            # Tema oscuro
└── main.jsx             # Provider chain
```

## Licencia

Proyecto académico — Educación React.

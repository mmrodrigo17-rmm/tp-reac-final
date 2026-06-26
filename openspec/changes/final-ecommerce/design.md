# Design: final-ecommerce

## Technical Approach

Reescribir `src/` completo siguiendo la arquitectura exacta del profesor (provider chain, naming español en carrito, CSS Modules con tema oscuro, cursor-based pagination). Se reemplazan los SVG inline del profesor por `react-icons` (lucide-react equivalencia) y se agrega `react-helmet-async` para SEO. Firestore como única fuente de verdad con colecciones `cliente`, `productos-nacionales`, `opiniones`.

## Architecture Decisions

### Decision: Provider Chain Order

| Opción | Tradeoff | Decisión |
|--------|----------|----------|
| Auth > Products > Cart > Search | Search debe estar fuera de Auth para búsqueda pública | **BrowserRouter > BusquedaProvider > AuthProvider > ProductosProvider > CarritoProvider** — idéntico al profesor |
| HelmetProvider en main.jsx | Debe envolver todo el árbol para que `<Helmet>` funcione en cualquier ruta | HelmetProvider envuelve BrowserRouter (o dentro, da igual — el profe no lo usaba) |

### Decision: React Icons en vez de SVG inline

| Opción | Tradeoff | Decisión |
|--------|----------|----------|
| SVG inline (como el profe) | +0 dependencias, exactamente igual a la referencia | **`react-icons` (FiShoppingCart, FiSettings, FiTrash2, FiEdit, FiHome, FiUser)** — especificado por el usuario; reduce el código de 6 archivos SVG a imports directos |
| `lucide-react` | Íconos idénticos al profe (usaba lucide) | El usuario pidió `react-icons` explícitamente |

### Decision: Paginación cursor-based

| Opción | Tradeoff | Decisión |
|--------|----------|----------|
| Paginación offset (página * limit) | Inconsistente si hay escrituras concurrentes; Firestore no recomienda offset | **Cursor-based con `startAfter`** — exactamente como el hook `usePaginacion` del profesor. Usa `getCountFromServer` para total de páginas |
| Load more infinito | UX moderna pero se aleja de la referencia | El profe usa paginación numérica con `<Paginacion>` componente |

### Decision: Imágenes via ImgBB

| Opción | Tradeoff | Decisión |
|--------|----------|----------|
| Almacenar en Firebase Storage | Más seguro, pero requiere configurar bucket + reglas | **ImgBB con API key hardcodeada** — exactamente como el profe (`FormContainer.jsx`). Las URLs van a Firestore en el campo `imagen` |
| URLs externas directas | Sin dependencia de subida, pero sin control de imágenes | Se soportan URLs existentes; para nuevas imágenes se usa ImgBB |

### Decision: Colecciones Firestore

El profesor usa: `cliente` (usuarios), `productos-nacionales` (productos), `opiniones` (reviews). Se mantienen exactamente esas.

### Decision: React Helmet

Se agrega `react-helmet-async`. HelmetProvider envuelve todo el árbol en main.jsx. Cada página usa `<Helmet>` para título + meta description. El profe no lo usaba — es adición del spec.

## Data Flow

```
Flujo de inicio:
  main.jsx
    ├── HelmetProvider
    │   └── BrowserRouter
    │       └── BusquedaProvider (busqueda, setBusqueda)
    │           └── AuthProvider (user, signup, login, logout ← Firebase Auth)
    │               └── ProductosProvider (CRUD + usePaginacion ← Firestore)
    │                   └── CarritoProvider (carrito, agregarACarrito ← estado local)
    │                       └── App.jsx (Routes)
    │                           └── Layout (Header + Outlet + Footer)

Flujo de auth:
  Registro → AuthContext.signup() → Firebase Auth
          → setDoc(cliente/{uid}, {nombre, email, rol: "usuario"}) → Firestore
  Login → AuthContext.login() → Firebase Auth
        → onAuthStateChanged → getDoc(cliente/{uid}) → user con rol
  Logout → signOut(auth) → user = null

Flujo de compra:
  Item → agregarACarrito(producto, cantidad) → CarritoProvider state
       → CartContext.obtenerCantidadTotal → Header.badge
  Carrito page → carrito[] → incrementarCantidad/decrementarCantidad/vaciarCarrito

Flujo de admin (CRUD):
  Dashboard → FormContainer (modal)
    ├── Agregar: upload ImgBB → addDoc(productos-nacionales) → refrescarPagina
    ├── Editar: upload ImgBB (opcional) → updateDoc → refrescarPagina
    └── Eliminar: confirm → deleteDoc → refrescarPagina

Flujo de búsqueda:
  BarraBusqueda → setBusqueda(valor) → navigate(/busqueda)
  ResultadoBusqueda → filtro client-side de productos[] por nombre.toLowerCase()

Flujo de detalle:
  /producto/:id → productos.find(id) del context
               → onSnapshot(opiniones, where productoId == id) en tiempo real
```

## File Changes

### Nuevos archivos (se crean todos — reescritura completa de `src/`)

| File | Description |
|------|-------------|
| `src/firebase/config.js` | `initializeApp` + `getFirestore` exportando `db` |
| `src/context/AuthContext.jsx` | `onAuthStateChanged` + fetch rol desde `cliente/{uid}` |
| `src/context/CartContext.jsx` | Naming español: `agregarACarrito`, `precio`, `cantidad`, `vaciarCarrito` |
| `src/context/ProductosContext.jsx` | CRUD + `usePaginacion("productos-nacionales")` |
| `src/context/BusquedaContext.jsx` | `busqueda` + `setBusqueda` |
| `src/hooks/usePaginacion.jsx` | Cursor-based con `getCountFromServer`, `startAfter`, `limit` |
| `src/components/layouts/Layout.jsx` | Header + Outlet + Footer |
| `src/components/layouts/Header.jsx` | Sticky, brand, Nav, search, auth, cart badge |
| `src/components/layouts/Nav.jsx` | Inicio, Productos, Contacto |
| `src/components/layouts/Footer.jsx` | Links + copyright |
| `src/components/layouts/*.module.css` | 4 archivos CSS Module |
| `src/components/items/Item.jsx` | Card con feedback al agregar, favorito |
| `src/components/items/ItemList.jsx` | Grid de Items |
| `src/components/items/ItemListContainer.jsx` | Consume productos + Paginacion + spinner |
| `src/components/items/*.module.css` | 3 archivos CSS Module |
| `src/components/search/BarraBusqueda.jsx` | Input con icono de lupa |
| `src/components/search/ResultadoBusqueda.jsx` | Filtro client-side + grid |
| `src/components/search/*.module.css` | 2 archivos CSS Module |
| `src/components/forms/Dashboard.jsx` | Lista admin + modal ABM |
| `src/components/forms/FormContainer.jsx` | Lógica form + ImgBB upload |
| `src/components/forms/FormProducto.jsx` | UI form controlado con categorías |
| `src/components/forms/*.module.css` | 2 archivos CSS Module |
| `src/components/Paginacion.jsx` | Botones anterior/siguiente + números |
| `src/components/Paginacion.module.css` | 1 archivo CSS Module |
| `src/components/RutasProtegidas.jsx` | Guard por `rolesPermitidos` |
| `src/components/Contador.jsx` | (se mantiene, aunque no se usa mayormente) |
| `src/pages/Login.jsx` | Form con manejo de errores Firebase |
| `src/pages/Registro.jsx` | Form + creación de documento en Firestore |
| `src/pages/DetalleProducto.jsx` | Stock, categoría, opiniones `onSnapshot`, Helmet |
| `src/pages/Carrito.jsx` | Lista carrito + controles cantidad + total |
| `src/pages/Contacto.jsx` | Página simple |
| `src/App.jsx` | Routes exactas del profesor |
| `src/App.css` | Reset global del profesor |
| `src/index.css` | Tema oscuro con variables `--clr-*` |
| `src/main.jsx` | Provider chain + HelmetProvider |

### Archivos modificados (fuera de src/)

| File | Description |
|------|-------------|
| `package.json` | Agregar `firebase`, `react-icons`, `react-helmet-async` |
| `index.html` | Actualizar title, lang="es", favicon |
| `.gitignore` | Agregar `.env` si es necesario |
| `README.md` | Nuevo con instrucciones de setup, Firebase, deploy |

### Archivos eliminados / no migrados

| File | Reason |
|------|--------|
| `src/` existente completa | Reescritura total |
| `Pre-entrega/` | Código legacy de referencia |

## Interfaces / Contracts

### Firebase Config
```js
// src/firebase/config.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const app = initializeApp({/* .env vars */});
export const db = getFirestore(app);
```

### AuthContext API
```js
{ user, loading, signup(email, password), login(email, password), logout() }
// user = { email, uid, nombre, rol: "usuario"|"admin" } | null
```

### CartContext API
```js
{
  carrito: [{ id, nombre, precio, imagen, cantidad, stock }],
  agregarACarrito(producto, cantidad),
  vaciarCarrito(),
  obtenerCantidadTotal(),       // número
  obtenerTotalPrecio(),          // número
  incrementarCantidad(id),
  decrementarCantidad(id)
}
```

### ProductosContext API
```js
{
  productos, cargando, paginaActual, totalPaginas,
  cargarPagina(numero),
  agregarProducto(obj),
  editarProducto(id, obj),
  eliminarProducto(id),
  refrescarPagina()
}
```

### Firestore Document Schemas

**cliente/{uid}**
```js
{ nombre: string, email: string, rol: "usuario"|"admin" }
```

**productos-nacionales/{id}**
```js
{ nombre, precio, descripcion, stock, categoria, imagen, slug, fechaCreacion? }
```

**opiniones/{id}**
```js
{ productoId, clienteNombre, comentario, rating }
```

## Testing Strategy

| Layer | What to Test | Approach |
|-------|-------------|----------|
| Unit | usePaginacion hook | No hay test runner configurado. Verificar manual con `console.log` |
| Integration | Flujo auth (registro → login → logout) | Prueba manual en navegador con Firebase emulator o proyecto real |
| E2E | CRUD completo + carrito | El usuario verifica contra success criteria del proposal |
| Build | `npm run build` exitoso | CI guard en verify |

## Migration / Rollout

1. Trabajar en rama `feature/final-ecommerce`
2. Crear proyecto Firebase desde la consola
3. Configurar Authentication (email/password) y Firestore
4. Copiar Firebase config a `src/firebase/config.js`
5. Configurar Security Rules de Firestore (lectura pública, escritura solo admin)
6. Seed manual: crear un admin en Firestore con `rol: "admin"`
7. Correr `npm run dev` y probar cada flujo
8. `npm run build` → deploy a Vercel
9. Rollback: borrar rama feature y volver a `main`

## Open Questions

- [ ] **Navegación hamburguesa responsiva**: el profe no implementa menú hamburguesa en mobile. Usa flex-column en media query. ¿Queremos un menú hamburguesa con toggle de estado?
- [ ] **Colección `slug` en productos**: el profe la incluye en el form pero no la usa. ¿La mantenemos o la omitimos?
- [ ] **Favoritos**: el profe tiene toggle de favorito local (estado en Item). ¿Lo mantenemos como UI placeholder sin persistencia?
- [ ] **DetalleProducto**: el profe usa `productos.find()` del context pero si recarga directo en `/producto/:id` el context está vacío y muestra "cargando". ¿Agregamos fetch directo por `doc()` como fallback?
- [ ] **React Icons**: ¿todos los SVG del profe se reemplazan? El profe tiene: Cart (carrito), Config (admin panel), EditIcon, TrashIcon, HomeIcon, UserIcon. El usuario pidió FiShoppingCart, FiSettings, FiTrash2, FiEdit, FiHome, FiUser. La lupa en BarraBusqueda también va con react-icons?

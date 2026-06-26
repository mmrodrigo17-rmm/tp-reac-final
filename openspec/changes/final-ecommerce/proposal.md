# Proposal: final-ecommerce

## Intent

Reemplazar la pre-entrega actual (Auth simulado + FakeStore API + CSS disperso) por una SPA con Firebase real (Auth + Firestore), CRUD de productos, roles (user/admin), búsqueda, paginación, y carrito funcional — siguiendo la arquitectura del profesor.

## Scope

### In Scope
- Firebase Auth real con login/registro/logout + onAuthStateChanged
- Firestore: colecciones `cliente`, `productos-nacionales`, `opiniones`
- CRUD completo de productos (Dashboard con modal, solo admin)
- Carrito migrado a naming del profesor (precio, cantidad, español)
- Paginación cursor-based + búsqueda client-side por nombre
- Detalle de producto con stock, categoría, opiniones en tiempo real
- Menú hamburguesa responsivo (CSS Modules, como el profe)
- React Helmet para SEO + React Icons para iconos
- Rutas protegidas por auth y por rol
- Deploy a Vercel + README.md

### Out of Scope
- Pasarela de pagos
- Wishlist / favoritos real (solo UI como el profe)
- Búsqueda server-side avanzada (solo client-side sobre página actual)
- Tests automatizados
- SEO avanzado (solo React Helmet básico)
- Migración automática de datos (seed script manual)

## Capabilities

### New Capabilities
- `user-auth`: Registro, login, logout con Firebase Auth + roles desde Firestore
- `product-crud`: Crear, leer, actualizar, eliminar productos en Firestore (admin)
- `product-catalog`: Lista paginada con búsqueda client-side + detalle con opiniones
- `shopping-cart`: Carrito con controles de cantidad, total, vaciar (en español)
- `role-guard`: Protección de rutas por autenticación y rol
- `seo-basics`: React Helmet para títulos y meta tags por página

### Modified Capabilities
None (primera especificación del proyecto).

## Approach

Reescribir la app desde cero en `src/` usando la arquitectura exacta del profesor:
- Provider chain: BrowserRouter > BusquedaProvider > AuthProvider > ProductosProvider > CarritoProvider
- Contextos con naming español y API idéntica a la referencia
- Firebase config en `src/firebase/config.js`
- Hook `usePaginacion` genérico para cursor-based pagination
- Componentes reutilizables: Paginacion, RutasProtegidas, BarraBusqueda, FormContainer
- CSS Modules exclusivamente + tema oscuro con variables CSS
- Seed de productos desde JSON local sin depender de FakeStore API externa
- React Helmet por página, React Icons reemplazando SVG inline del profe

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `src/` completa | Reemplazo total | Nueva arquitectura del profesor |
| `package.json` | Modificado | Agregar firebase, react-helmet-async, react-icons |
| `vite.config.js` | Modificado | Sin cambios mayores (Vite ya funciona) |
| `index.html` | Modificado | Title, lang, meta tags |
| `README.md` | Nuevo | Instrucciones de instalación, deploy, Firebase setup |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Firebase Security Rules sin configurar | Medium | Documentar reglas en README, configurar antes del deploy |
| Imágenes rotas tras migración de datos | Medium | Usar URLs de imágenes reales/subidas. Fallback genérico en Item |
| React Router 7 + Vercel 404 en rutas hijas | Low | Vercel maneja SPA redirects automáticamente |
| API key de Firebase expuesta en cliente | Low | Es esperable en Firebase (reglas de seguridad protegen datos, no keys) |

## Rollback Plan

Git: mantener rama `main` con pre-entrega original. Trabajar en rama `feature/final-ecommerce`. Si algo falla, borrar rama y volver a `main`. No hay migración de datos destructiva.

## Dependencies

- Proyecto Firebase (Auth + Firestore) creado desde Firebase Console
- Cuenta Vercel (gratuita) conectada al repo de GitHub

## Success Criteria

- [ ] Usuario puede registrarse, loguearse, y ver su nombre en el header
- [ ] Productos se cargan desde Firestore con paginación funcional
- [ ] Admin puede crear, editar y eliminar productos desde /dashboard
- [ ] Carrito persiste en contexto con cantidades y total en español
- [ ] Búsqueda filtra productos por nombre client-side
- [ ] Detalle de producto muestra stock y opiniones en tiempo real
- [ ] Build de producción exitoso (`npm run build`)
- [ ] Deploy funcional en Vercel sin 404 en rutas

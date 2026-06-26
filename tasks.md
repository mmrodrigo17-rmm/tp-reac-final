# Tasks: final-ecommerce

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | 2500–3500 |
| 400-line budget risk | High |
| Chained PRs recommended | Yes |
| Suggested split | PR 1 (Foundation+Contexts) → PR 2 (Layout+Hooks+Prod) → PR 3 (Auth+Search+Cart) → PR 4 (Dashboard+Routing+Deploy) |
| Delivery strategy | ask-on-risk |
| Chain strategy | pending |

Decision needed before apply: Yes
Chained PRs recommended: Yes
Chain strategy: pending
400-line budget risk: High

### Suggested Work Units

| Unit | Goal | Likely PR | Base |
|------|------|-----------|------|
| 1 | Foundation + Contexts + Hooks | PR 1 | main |
| 2 | Layout + Product Catalog + Detalle | PR 2 | main |
| 3 | Auth UI + Search + Cart | PR 3 | main |
| 4 | Dashboard (admin) + Routing + SEO | PR 4 | main |
| 5 | Docs + Deploy config | PR 5 | main |

## Phase 1 — Foundation

- [x] 1.1 `package.json`: add `firebase`, `react-icons`, `react-helmet-async`; run `npm install`
- [x] 1.2 `src/firebase/config.js`: `initializeApp` + `getFirestore` export `db`
- [x] 1.3 `src/index.css`: dark theme with `--clr-*` CSS vars (teacher's exact vars)
- [x] 1.4 `src/main.jsx`: provider chain `HelmetProvider > BrowserRouter > BusquedaProvider > AuthProvider > ProductosProvider > CarritoProvider`
- [x] 1.5 `src/App.css`: reset global + `.app` wrapper

## Phase 2 — Contextos

- [x] 2.1 `src/context/BusquedaContext.jsx`: `busqueda` + `setBusqueda` state
- [x] 2.2 `src/context/AuthContext.jsx`: `onAuthStateChanged` → `getDoc(cliente/{uid})` for rol; expose `user`, `loading`, `signup`, `login`, `logout`
- [x] 2.3 `src/context/ProductosContext.jsx`: CRUD on `productos-nacionales`; wire `usePaginacion`; expose `productos`, `cargando`, pagination methods
- [x] 2.4 `src/context/CartContext.jsx`: naming español (`agregarACarrito`, `precio`, `cantidad`, `vaciarCarrito`, `incrementarCantidad`, `decrementarCantidad`)

## Phase 3 — Hooks + Layout

- [ ] 3.1 `src/hooks/usePaginacion.jsx`: cursor-based with `getCountFromServer`, `startAfter`, `limit`, page numbers
- [ ] 3.2 `src/components/Paginacion.jsx` + `.module.css`: prev/next + page number buttons
- [ ] 3.3 `src/components/RutasProtegidas.jsx`: guard by `rolesPermitidos` array; redirect to `/login` if unauthenticated
- [ ] 3.4 `src/components/Contador.jsx`: reusable count badge
- [ ] 3.5 Layout files: `Layout.jsx`, `Header.jsx`, `Nav.jsx`, `Footer.jsx` + 4 CSS Modules

## Phase 4 — Productos

- [x] 4.1 `src/components/items/Item.jsx` + `.module.css`: card with image, name, price, fav toggle, "Agregar" feedback
- [x] 4.2 `src/components/items/ItemList.jsx` + `.module.css`: responsive grid
- [x] 4.3 `src/components/items/ItemListContainer.jsx` + `.module.css`: consumes ProductosContext + Paginacion + spinner
- [x] 4.4 `src/pages/DetalleProducto.jsx` + `.module.css`: stock, categoria, opiniones via `onSnapshot(opiniones)`, Helmet

## Phase 5 — Auth UI + Búsqueda

- [x] 5.1 `src/pages/Login.jsx`: email/password form, Firebase error mapping, Helmet
- [x] 5.2 `src/pages/Registro.jsx`: form + `setDoc(cliente/{uid})` with rol `usuario`, Helmet
- [x] 5.3 `src/components/search/BarraBusqueda.jsx` + `.module.css`: input + search icon, `setBusqueda` + `navigate(/busqueda)` — already created in Phase 3, matches professor's version
- [x] 5.4 `src/components/search/ResultadoBusqueda.jsx` + `.module.css`: client-side filter on `productos[]`, "No hay productos que coincidan"
- [x] 5.5 `src/pages/AuthForm.module.css`: form styles matching professor's exact CSS
- [x] 5.6 `src/components/search/ResultadoBusqueda.module.css`: grid layout matching professor's styles

## Phase 6 — Dashboard (admin)

- [ ] 6.1 `src/components/forms/Dashboard.jsx` + `.module.css`: product table + modal toggle + delete confirm
- [ ] 6.2 `src/components/forms/FormContainer.jsx`: modal wrapper, ImgBB upload, form state logic
- [ ] 6.3 `src/components/forms/FormProducto.jsx` + `.module.css`: controlled form with categoria select, nombre/precio/stock/imagen/descripcion

## Phase 7 — Carrito

- [ ] 7.1 `src/pages/Carrito.jsx` + `.module.css`: consume CartContext, product rows, increment/decrement, total, "Vaciar carrito" with confirm

## Phase 8 — Routing + SEO

- [ ] 8.1 `src/App.jsx`: all routes (`/`, `/producto/:id`, `/login`, `/registro`, `/carrito`, `/dashboard`, `/contacto`, `/busqueda`) with RutasProtegidas, Layout
- [ ] 8.2 `<Helmet>` in every page component: unique title `"{Page} — Tienda Nacional"` + meta description

## Phase 9 — Docs + Deploy

- [x] 9.1 `index.html`: `lang="es"`, title "Juancho Store", favicon
- [ ] 9.2 `.gitignore`: add `.env`
- [ ] 9.3 `README.md`: install, Firebase setup (project + Auth + Firestore + security rules), seed admin user, deploy to Vercel

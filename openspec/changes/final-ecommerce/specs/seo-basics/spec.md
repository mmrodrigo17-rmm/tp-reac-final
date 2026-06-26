# SEO Basics — Especificación

## Propósito

Definir títulos de página y meta tags descriptivos por ruta usando React Helmet, mejorando la accesibilidad y el SEO básico.

## Requerimientos

### Requerimiento: Título por página

El sistema DEBE mostrar un título de página único en la pestaña del navegador para cada ruta principal, usando `<Helmet>`.

#### Escenario: Título en inicio

- DADO que el usuario navega a `/`
- CUANDO el componente `Inicio` se monta
- ENTONCES el título del documento DEBE ser "Inicio — Tienda Nacional"

#### Escenario: Título en login

- DADO que el usuario navega a `/login`
- CUANDO el componente `Login` se monta
- ENTONCES el título DEBE ser "Iniciar sesión — Tienda Nacional"

#### Escenario: Título en detalle

- DADO que el usuario navega a `/producto/{id}`
- CUANDO el detalle se monta
- ENTONCES el título DEBE incluir el nombre del producto, ej: "Zapatilla Nike — Tienda Nacional"

### Requerimiento: Meta description

El sistema DEBE incluir una meta description relevante en cada página.

#### Escenario: Meta en inicio

- DADO que el usuario visita `/`
- CUANDO el `Helmet` se renderiza
- ENTONCES existe un `<meta name="description">` con un resumen del catálogo

### Requerimiento: Actualización dinámica

El sistema DEBE actualizar el título cuando el usuario navega entre rutas sin recargar la página.

#### Escenario: Navegación SPA

- DADO que el usuario está en `/` (título: "Inicio — Tienda Nacional")
- CUANDO navega a `/login` mediante un Link de React Router
- ENTONCES el título cambia a "Iniciar sesión — Tienda Nacional" sin recargar

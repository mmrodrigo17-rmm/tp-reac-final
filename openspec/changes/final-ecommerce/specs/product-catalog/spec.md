# Product Catalog — Especificación

## Propósito

Mostrar un catálogo de productos paginado con búsqueda client-side y detalle de producto con opiniones en tiempo real.

## Requerimientos

### Requerimiento: Listado paginado

El sistema DEBE mostrar productos paginados usando un hook `usePaginacion` genérico con cursor-based pagination.

#### Escenario: Carga inicial

- DADO que el usuario ingresa a la página principal
- CUANDO el catálogo se monta
- ENTONCES se muestran los primeros N productos desde Firestore
- Y se habilita el botón "Siguiente" si hay más productos

#### Escenario: Paginación siguiente

- DADO que el usuario está viendo la primera página
- CUANDO hace clic en "Siguiente"
- ENTONCES se cargan los siguientes N productos usando el último documento como cursor

### Requerimiento: Búsqueda client-side

El sistema DEBE filtrar los productos visibles por nombre en tiempo real mientras el usuario escribe.

#### Escenario: Búsqueda con resultados

- DADO que hay productos con nombres que contienen "zapatilla"
- CUANDO el usuario escribe "zapa" en la barra de búsqueda
- ENTONCES se muestran solo los productos cuyo nombre contenga "zapa" (case-insensitive)

#### Escenario: Búsqueda sin resultados

- DADO que no hay productos cuyo nombre coincida
- CUANDO el usuario busca "xyz123"
- ENTONCES se muestra el mensaje "No se encontraron productos"

### Requerimiento: Detalle de producto

El sistema DEBE mostrar la información completa de un producto y sus opiniones desde la colección `opiniones`.

#### Escenario: Vista de detalle

- DADO que el usuario hace clic en un producto
- CUANDO navega a `/producto/{id}`
- ENTONCES se muestra nombre, precio, stock, categoria, descripcion, imagen
- Y se listan las opiniones asociadas en tiempo real

#### Escenario: Producto sin stock

- DADO un producto con stock 0
- CUANDO se carga su detalle
- ENTONCES se muestra "Sin stock" (deshabilitado el botón de agregar al carrito)

# Shopping Cart — Especificación

## Propósito

Mantener un carrito de compras en contexto React con naming en español (precio, cantidad) y controles de cantidad, total y vaciado.

## Requerimientos

### Requerimiento: Agregar al carrito

El sistema DEBE permitir agregar productos al carrito desde el catálogo o el detalle.

#### Escenario: Agregar producto con stock

- DADO un producto con stock 10
- CUANDO el usuario hace clic en "Agregar al carrito"
- ENTONCES el producto se agrega al carrito con cantidad 1
- Y el contador del header se incrementa

#### Escenario: Producto ya en carrito

- DADO que el producto ya está en el carrito con cantidad 2
- CUANDO el usuario vuelve a agregarlo
- ENTONCES la cantidad aumenta a 3 en vez de duplicar el item

### Requerimiento: Control de cantidad

El sistema DEBE permitir incrementar y disminuir la cantidad de cada item, con mínimo 1.

#### Escenario: Incrementar cantidad

- DADO un item en el carrito con cantidad 1
- CUANDO el usuario hace clic en "+"
- ENTONCES la cantidad pasa a 2 y el total se actualiza

#### Escenario: Disminuir a cero

- DADO un item con cantidad 1
- CUANDO el usuario hace clic en "−"
- ENTONCES el item se elimina del carrito

### Requerimiento: Total del carrito

El sistema DEBE calcular y mostrar el precio total (cantidad × precio de cada item, sumados).

#### Escenario: Cálculo correcto

- DADO un carrito con item A (precio 100, cant 2) e item B (precio 50, cant 1)
- CUANDO se consulta el total
- ENTONCES el total DEBE ser 250

### Requerimiento: Vaciar carrito

El sistema DEBE permitir vaciar el carrito completo con un solo clic, previa confirmación.

#### Escenario: Vaciar confirmado

- DADO un carrito con 3 items
- CUANDO el usuario hace clic en "Vaciar carrito" y confirma
- ENTONCES el carrito queda vacío
- Y el contador del header muestra 0

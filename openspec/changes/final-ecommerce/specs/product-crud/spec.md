# Product CRUD — Especificación

## Propósito

Permitir al administrador crear, leer, actualizar y eliminar productos en la colección `productos-nacionales` de Firestore, a través de un Dashboard con modal.

## Requerimientos

### Requerimiento: Listar productos (admin)

El sistema DEBE mostrar todos los productos en el Dashboard del administrador con paginación cursor-based.

#### Escenario: Dashboard carga productos

- DADO que un admin accede a `/dashboard`
- CUANDO el componente se monta
- ENTONCES se cargan los productos desde `productos-nacionales` ordenados por `fechaCreacion`

### Requerimiento: Crear producto

El sistema DEBE permitir al admin crear un producto mediante un modal con campos: nombre, precio, categoria, stock, imagenURL, descripcion.

#### Escenario: Creación exitosa

- DADO el admin completa el modal con nombre "Zapatilla", precio 15000, stock 10
- CUANDO envía el formulario
- ENTONCES se crea el documento en `productos-nacionales`
- Y el producto aparece en la lista sin recargar la página

#### Escenario: Campos obligatorios vacíos

- DADO el modal abierto con nombre vacío
- CUANDO el admin intenta guardar
- ENTONCES el sistema MUESTRA "Completá todos los campos obligatorios"

### Requerimiento: Editar producto

El sistema DEBE permitir al admin modificar cualquier campo de un producto existente.

#### Escenario: Edición exitosa

- DADO un producto existente con precio 10000
- CUANDO el admin lo edita a precio 12000 desde el modal
- ENTONCES se actualiza el documento en Firestore
- Y la lista refleja el nuevo precio

### Requerimiento: Eliminar producto

El sistema DEBE permitir al admin eliminar un producto con confirmación previa.

#### Escenario: Eliminación confirmada

- DADO un producto existente en la lista
- CUANDO el admin hace clic en eliminar y confirma
- ENTONCES se borra el documento de Firestore
- Y el producto desaparece de la lista

#### Escenario: Eliminación cancelada

- DADO que el admin hace clic en eliminar
- CUANDO cancela en el diálogo de confirmación
- ENTONCES el producto NO se elimina
- Y la lista permanece sin cambios

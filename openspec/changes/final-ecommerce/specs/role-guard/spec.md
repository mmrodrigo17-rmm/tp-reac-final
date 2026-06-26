# Role Guard — Especificación

## Propósito

Proteger rutas según autenticación y rol del usuario, redirigiendo al login o al inicio según corresponda.

## Requerimientos

### Requerimiento: Protección por autenticación

El sistema DEBE redirigir al login si un usuario no autenticado intenta acceder a rutas protegidas.

#### Escenario: Usuario no autenticado

- DADO que el usuario NO tiene sesión activa
- CUANDO intenta acceder a `/dashboard` o `/carrito`
- ENTONCES es redirigido a `/login`
- Y se conserva la ruta intentada para redirigir tras login (opcional)

#### Escenario: Usuario autenticado

- DADO que el usuario tiene sesión activa
- CUANDO intenta acceder a `/dashboard` o `/carrito`
- ENTONCES puede ver el contenido normalmente

### Requerimiento: Protección por rol

El sistema DEBE restringir rutas de administración solo a usuarios con rol `admin`.

#### Escenario: Admin accede a Dashboard

- DADO un usuario con rol "admin" y sesión activa
- CUANDO navega a `/dashboard`
- ENTONCES puede ver el Dashboard con CRUD de productos

#### Escenario: User intenta acceder a Dashboard

- DADO un usuario con rol "user" y sesión activa
- CUANDO navega a `/dashboard`
- ENTONCES es redirigido a `/` (inicio)
- O se muestra "No tenés permisos para acceder a esta página"

### Requerimiento: Redirección de login

El sistema DEBE redirigir al inicio si un usuario ya autenticado visita `/login` o `/registro`.

#### Escenario: Usuario logueado en login

- DADO que el usuario tiene sesión activa
- CUANDO visita `/login`
- ENTONCES es redirigido automáticamente a `/`

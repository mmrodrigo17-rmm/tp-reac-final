# User Auth — Especificación

## Propósito

Gestionar registro, inicio de sesión y cierre de sesión de usuarios mediante Firebase Authentication, almacenando el rol (user/admin) en Firestore.

## Requerimientos

### Requerimiento: Registro de usuario

El sistema DEBE permitir registro con email y contraseña mediante Firebase Auth. Tras registrarse, DEBE crear un documento en la colección `cliente` con el rol `user` por defecto.

#### Escenario: Registro exitoso

- DADO que el usuario completa el formulario de registro con email "test@mail.com" y contraseña válida
- CUANDO envía el formulario
- ENTONCES se crea el usuario en Firebase Auth
- Y se crea el documento `cliente/{uid}` con `displayName`, `email`, `rol: "user"` y `fechaCreacion`

#### Escenario: Email duplicado

- DADO que existe un usuario con email "test@mail.com"
- CUANDO otro usuario intenta registrarse con el mismo email
- ENTONCES el sistema MUESTRA un error legible: "El email ya está registrado"

### Requerimiento: Inicio de sesión

El sistema DEBE autenticar usuarios con email y contraseña contra Firebase Auth, y cargar su documento de `cliente` para obtener el rol.

#### Escenario: Login exitoso

- DADO un usuario registrado con email "admin@mail.com" y rol "admin" en Firestore
- CUANDO ingresa credenciales correctas
- ENTONCES el sistema inicia sesión en Firebase Auth
- Y expone `user.rol === "admin"` en el contexto de autenticación

#### Escenario: Credenciales inválidas

- DADO un email no registrado
- CUANDO se intenta iniciar sesión
- ENTONCES el sistema MUESTRA: "Email o contraseña incorrectos"

### Requerimiento: Cierre de sesión

El sistema DEBE permitir cerrar sesión mediante `signOut` de Firebase Auth.

#### Escenario: Logout exitoso

- DADO un usuario con sesión activa
- CUANDO hace clic en "Cerrar sesión"
- ENTONCES Firebase Auth cierra la sesión
- Y el contexto de auth queda con `user === null`

// Importo Outlet de react-router-dom. Esta es la pieza clave (el comodín) 
// que me permite armar layouts con rutas anidadas.
import { Outlet } from 'react-router-dom';
// Importo mis componentes visuales que quiero mantener constantes en toda la navegación
import Nav from './Nav';
import Footer from './Footer';

const Layout = () => {
  return (
    // Envuelvo toda la estructura en un div contenedor maestro.
    // Uso Flexbox en columna y le doy una altura mínima del 100% del alto de la ventana gráfica (100vh).
    // Este es el truco clásico (y más efectivo) en CSS para garantizar que el Footer 
    // siempre se quede pegado abajo de la pantalla, incluso si la página tiene muy poco contenido.
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      
      {/* Defino el encabezado de mi sitio. 
          Este bloque se mantendrá estático y visible sin importar por qué ruta navegue el usuario. */}
      <header style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
        <h1>Mi Tienda Monumental</h1>
        {/* Renderizo mi barra de navegación */}
        <Nav />
      </header>
      
      {/* Etiqueta semántica <main> para el contenido principal. 
          La propiedad "flex: 1" le dice a este contenedor que crezca y ocupe todo el espacio 
          vertical disponible, empujando de forma automática al Footer hacia el fondo. */}
      <main style={{ flex: 1, padding: '2rem' }}>
        
        {/* Aquí es donde ocurre la magia del Layout anidado de React Router. 
            El componente <Outlet /> actúa como un "marcador de posición" (un agujero).
            Dependiendo de la URL en la que esté el usuario (ej: "/productos" o "/carrito"), 
            React Router tomará el componente hijo correspondiente y lo inyectará exactamente aquí. */}
        <Outlet />
        
      </main>

      {/* Finalmente, agrego el Footer al fondo de la estructura. 
          Al igual que el header, estará presente en todas las vistas de la app. */}
      <Footer />
      
    </div>
  );
};

export default Layout;
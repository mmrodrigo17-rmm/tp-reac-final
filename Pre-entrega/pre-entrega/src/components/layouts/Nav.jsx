// Importo NavLink de react-router-dom. A diferencia del Link normal, NavLink me permite 
// saber si la ruta actual está activa (si el usuario está en esa página) para aplicarle estilos.
import { NavLink } from 'react-router-dom';
// Importo mis custom hooks para poder leer el estado global del carrito y de la sesión del usuario.
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
// Importo los estilos usando CSS Modules. Esto asegura que estas clases 
// solo afecten a este componente y no rompan los estilos en otras partes de la app.
import styles from './Nav.module.css';

const Nav = () => {
  // Extraigo el array de productos del contexto del carrito
  const { cart } = useCart();
  
  // Extraigo el estado booleano de autenticación y las funciones para simular el inicio y cierre de sesión
  const { isAuthenticated, login, logout } = useAuth(); 

  // Calculo la cantidad total de artículos en el carrito para mostrar en la burbuja/contador.
  // Es importante sumar la propiedad "quantity" de cada ítem (no solo el largo del array),
  // por si el usuario tiene, por ejemplo, 3 unidades de un mismo producto.
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    // Aplico la clase contenedora principal que viene de mi archivo CSS Module
    <nav className={styles.navContainer}>
      <ul className={styles.navList}>
        
        {/* Link a la página de Inicio */}
        <li>
          {/* Aquí uso la magia de NavLink. En la prop "className" paso una función de flecha que recibe "isActive".
              Si isActive es true (estoy en "/"), aplico el estilo resaltado (activeLink).
              Si es false, aplico el estilo por defecto (navLink). */}
          <NavLink to="/" className={({ isActive }) => isActive ? styles.activeLink : styles.navLink}>
            Inicio
          </NavLink>
        </li>
        
        {/* Link al catálogo de productos */}
        <li>
          <NavLink to="/productos" className={({ isActive }) => isActive ? styles.activeLink : styles.navLink}>
            Productos
          </NavLink>
        </li>
        
        {/* Link a la vista del carrito */}
        <li>
          <NavLink to="/carrito" className={({ isActive }) => isActive ? styles.activeLink : styles.navLink}>
            Carrito 
            {/* Renderizado condicional (Cortocircuito lógico):
                Solo si totalItems es mayor a 0, dibujo este elemento <span> con el número.
                Si el carrito está vacío (totalItems es 0), esto simplemente no se dibuja,
                dejando la interfaz mucho más limpia. */}
            {totalItems > 0 && <span style={{ fontWeight: 'bold', color: 'blue' }}>({totalItems})</span>}
          </NavLink>
        </li>
        
        {/* Sección del botón de simulación de sesión */}
        <li>
          {/* Uso un operador ternario (?) para tomar una decisión basada en si estoy autenticado o no.
              - Si isAuthenticated es TRUE: Muestro el botón que ejecuta mi función "logout".
              - Si isAuthenticated es FALSE: Muestro el botón azul que ejecuta mi función "login". */}
          {isAuthenticated ? (
            <button onClick={logout} style={{ cursor: 'pointer', padding: '5px' }}>Cerrar Sesión</button>
          ) : (
            <button onClick={login} style={{ cursor: 'pointer', padding: '5px', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px' }}>Iniciar Sesión</button>
          )}
        </li>
        
      </ul>
    </nav>
  );
}

export default Nav;
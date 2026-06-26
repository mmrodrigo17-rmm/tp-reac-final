// Importo el componente Navigate de React Router. 
// A diferencia de Link o NavLink (que esperan un clic del usuario), 
// Navigate me permite forzar una redirección automática directamente desde la lógica del componente.
import { Navigate } from 'react-router-dom';

// Importo mi custom hook para poder consultar el estado global de la sesión.
import { useAuth } from '../../context/AuthContext';

// Creo el componente ProtectedRoute. 
// Recibe "children" por props, que básicamente representa a cualquier componente o vista 
// que yo decida envolver con este "escudo" protector (en nuestro caso, el componente <Cart /> en App.jsx).
const ProtectedRoute = ({ children }) => {
  // Extraigo el valor booleano que me indica si el usuario actual ha iniciado sesión o no.
  const { isAuthenticated } = useAuth();

  // Verifico si el usuario NO está autenticado.
  if (!isAuthenticated) {
    // Si entró como invitado (sin sesión), no lo dejo ver el contenido.
    // Inmediatamente retorno el componente Navigate que lo redirige a la ruta principal ("/").
    // El atributo "replace" es un detalle muy importante: reemplaza la entrada actual en el historial del navegador.
    // Así evito que el usuario use el botón de "Atrás" del navegador para intentar volver a la ruta prohibida.
    return <Navigate to="/" replace />;
  }

  // Si la validación anterior fue exitosa (es decir, el usuario sí está autenticado),
  // el código sigue de largo y llega hasta aquí.
  // En ese caso, simplemente devuelvo y renderizo los "children" (la vista protegida) 
  // para que el usuario pueda verla sin problemas.
  return children;
};

export default ProtectedRoute;
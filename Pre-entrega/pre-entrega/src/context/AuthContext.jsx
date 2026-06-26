/* eslint-disable react-refresh/only-export-components */
// Deshabilito temporalmente esta regla de Vite. Al igual que en CartContext, esto me permite 
// exportar mi Provider y mi custom hook desde el mismo archivo sin que falle el Fast Refresh.

// Importo las herramientas necesarias de React para crear y consumir el contexto
import { createContext, useState, useContext } from 'react';

// 1. Creo el contexto de autenticación. Este será el "canal de comunicación"
// para saber en toda la app si el usuario ha iniciado sesión o no.
const AuthContext = createContext();

// 2. Creo el componente AuthProvider que envolverá mi aplicación (o parte de ella)
export const AuthProvider = ({ children }) => {
  // Inicializo el estado global de autenticación en false (el usuario entra como invitado por defecto)
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Creo una función muy simple para iniciar sesión
  // Al llamarla, actualizo el estado a true
  const login = () => setIsAuthenticated(true);
  
  // Creo la función inversa para cerrar sesión
  // Al llamarla, devuelvo el estado a false
  const logout = () => setIsAuthenticated(false);

  return (
    // Proveo a los componentes hijos (children) el estado actual y las dos funciones.
    // Cualquier componente que consuma este contexto podrá leer si el usuario está logueado
    // y podrá ejecutar login() o logout().
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// 3. Creo y exporto mi Custom Hook llamado useAuth.
// Esto me facilita la vida: en lugar de importar useContext y AuthContext en cada vista,
// simplemente llamaré a const { isAuthenticated } = useAuth() de forma limpia.
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  // Validación de seguridad para otros desarrolladores (o para mi yo del futuro): 
  // si se intenta usar este hook fuera del árbol envuelto por <AuthProvider>, 
  // lanzo un error explicativo en consola en lugar de un fallo silencioso.
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  
  return context;
};
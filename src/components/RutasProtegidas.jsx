import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const RutasProtegidas = ({ children, rolesPermitidos }) => {
  
  const { user, loading } = useAuth();
  // Si no hay usuario, mandamos a loguear
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  // Si se exigen roles especificos (ej: admin) y el usuario no lo tiene, lo rebotamos
  if (rolesPermitidos && !rolesPermitidos.includes(user.rol)) {
    return <Navigate to="/" replace />;
  }
  // Si paso todos los filtros, lo dejamos ver la pantalla protegida
  return <>{children}</>;
};

export default RutasProtegidas;

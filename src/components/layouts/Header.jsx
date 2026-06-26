import Nav from "./Nav";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import styles from "./Header.module.css"; 
import Config from "../../assets/icons/Config";
import Cart from "../../assets/icons/Cart";
import BarraBusqueda from "../search/BarraBusqueda"

const Header = () => {
  const { obtenerCantidadTotal } = useCart();
  const { user, logout } = useAuth();
  const totalItems = obtenerCantidadTotal();

  // Función para capitalizar la primera letra del nombre
  const capitalizarNombre = (string) => {
    if (!string) return "";
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  const obtenerNombreMostrado = () => {
    if (user?.nombre) {
      // 1. Cortamos el string en el primer espacio en blanco para quedarnos solo con el primer nombre
      const primerNombre = user.nombre.split(" ")[0];
      return capitalizarNombre(primerNombre);
    }

    if (user?.email) {
      // Si no hay nombre y usamos el email, también cortamos por si el email tiene puntos o guiones (ej: jose.navarro)
      const usuarioEmail = user.email.split("@")[0].split(".")[0].split("-")[0];
      return capitalizarNombre(usuarioEmail);
    }

    return "Usuario";
  };

  return (
    <div className={styles.headerWrapper}>
      <header className={styles.headerContainer}>
        <div className={styles.brandSection}>
          <Link to="/" className={styles.brandLogo}>
            Juancho Store
          </Link>
        </div>

        <div className={styles.centerSection}>
          <Nav />
        </div>
         
        <div className={styles.rightSection}>
          {/* Barra de Busqueda */}
          <BarraBusqueda />
          <ul className={styles.authList}>
            {user ? (
              <>
                {/* Saludo al usuario */}
                <li>
                  <span className={styles.saludoRegular}>
                   Hola, {obtenerNombreMostrado()}
                  </span>
                </li>

                {/* Boton exclusivo del admin */}
                {user.rol === "admin" && (
                  <li>
                    <Link to="/dashboard" className={styles.btnPanelAdmin}>
                      <Config />
                    </Link>
                  </li>
                )}

                {/* Boton de cerrar sesion */}
                <li>
                  <button onClick={logout} className={styles.btnLogout}>
                    Desloguearse
                  </button>
                </li>
              </>
            ) : (
              <li>
                <Link to="/login" className={styles.loginLink}>
                  Ingresar
                </Link>
              </li>
            )}
          </ul>

          {/* Botón del Carrito con el contador flotando arriba */}
          <Link to="/carrito" className={styles.carritoLink}>
            <div className={styles.carritoIconWrapper}>
              <span className={styles.iconEmoji}> <Cart /> </span>
              {totalItems > 0 && (
                <span className={styles.badge}>{totalItems}</span>
              )}
            </div>
          </Link>
        </div>
      </header>
    </div>
  );
};;

export default Header;

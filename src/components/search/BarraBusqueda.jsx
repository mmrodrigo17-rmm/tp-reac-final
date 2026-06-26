import { useBusqueda } from "../../context/BusquedaContext";
import { useNavigate } from "react-router-dom";
import styles from "./BarraBusqueda.module.css";

const BarraBusqueda = () => {
  const { busqueda, setBusqueda } = useBusqueda();
  const navigate = useNavigate();

  const manejarBusqueda = (evento) => {
    const valor = evento.target.value;
    setBusqueda(valor);

    if (valor.trim()) {
      navigate("/busqueda");
    }
  };

  return (
    <form className={styles.formContainer} onSubmit={(e) => e.preventDefault()}>
      <div className={styles.relativeWrapper}>
        <div className={styles.iconWrapper}>
          <svg
            className={styles.searchIcon}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="2"
              d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="search"
          id="search"
          className={styles.searchInput}
          placeholder="Buscar Productos..."
          value={busqueda}
          onChange={manejarBusqueda}
        />
      </div>
    </form>
  );
};

export default BarraBusqueda;

import styles from './Paginacion.module.css';

const Paginacion = ({ paginaActual, totalPaginas, cargarPagina, cargando }) => {
  return (
    <div className={styles.paginacion}>
      <button 
        className={styles.btnNav} 
        disabled={paginaActual === 1 || cargando}
        onClick={() => cargarPagina(paginaActual - 1)}
      >
        ←
      </button>

      <div className={styles.numeros}>
        {[...Array(totalPaginas)].map((_, index) => (
          <button
            key={index + 1}
            className={`${styles.btnNumero} ${paginaActual === index + 1 ? styles.activo : ''}`}
            onClick={() => cargarPagina(index + 1)}
            disabled={cargando}
          >
            {index + 1}
          </button>
        ))}
      </div>

      <button 
        className={styles.btnNav} 
        disabled={paginaActual === totalPaginas || cargando}
        onClick={() => cargarPagina(paginaActual + 1)}
      >
        →
      </button>
    </div>
  );
};

export default Paginacion;

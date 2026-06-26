import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useBusqueda } from "../../context/BusquedaContext";
import { useProductos } from "../../context/ProductosContext";
import styles from "./ResultadoBusqueda.module.css";
import estilosCard from "../items/Item.module.css";

const ResultadoBusqueda = () => {
  const { busqueda } = useBusqueda();
  const { productos } = useProductos();
  const navigate = useNavigate();

  // Efecto para redirigir al inicio si la búsqueda se vacía
  useEffect(() => {
    if (!busqueda || busqueda.trim() === "")
      navigate("/");

  }, [busqueda, navigate]);

  // Aseguramos que 'productos' exista antes de filtrar
  const productosFiltrados = productos ? productos.filter(producto =>
    producto.nombre.toLowerCase().includes(busqueda.toLowerCase())
  ) : [];

  return (
    <div className={styles.container}>
      <Helmet>
        <title>Búsqueda: {busqueda} — Tienda Nacional</title>
        <meta name="description" content={`Resultados de búsqueda para "${busqueda}" en Tienda Nacional.`} />
      </Helmet>

      <h2 className={styles.titulo}>Productos Encontrados</h2>
      <div className={styles.grid}>
        {productosFiltrados.length > 0 ? (
          productosFiltrados.map((producto) => (
            <article key={producto.id} className={estilosCard.card}>
              <Link to={`/producto/${producto.id}`} className={estilosCard.imageWrapper}>
                <img
                  src={producto.imagen}
                  alt={producto.nombre}
                  className={estilosCard.imagen}
                />
                <div className={estilosCard.imagenOverlay} />
              </Link>

              <div className={estilosCard.body}>
                <div className={estilosCard.header}>
                  <Link to={`/producto/${producto.id}`} className={estilosCard.nombreLink}>
                    <h2 className={estilosCard.nombre}>{producto.nombre}</h2>
                  </Link>
                </div>

                <p className={estilosCard.precio}>
                  <span className={estilosCard.moneda}>ARS</span>
                  {Number(producto.precio).toLocaleString("es-AR")}
                </p>

                <Link to={`/producto/${producto.id}`} className={estilosCard.btnDetalle}>
                  Ver Detalle
                </Link>
              </div>
            </article>
          ))
        ) : (
          <p className={styles.noResultados}>
            No hay productos que coincidan con la búsqueda.
          </p>
        )}
      </div>
    </div>
  );
};

export default ResultadoBusqueda;

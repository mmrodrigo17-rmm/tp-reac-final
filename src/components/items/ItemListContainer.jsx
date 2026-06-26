import { Helmet } from "react-helmet-async";
import ItemList from './ItemList';
import estilos from './ItemListContainer.module.css';
import { useProductos } from '../../context/ProductosContext'; 
import Paginacion from '../Paginacion';

const ItemListContainer = () => {
  const { productos, cargando, paginaActual, totalPaginas, cargarPagina } = useProductos();

  if (cargando && productos.length === 0) {
    return (
      <div className={estilos.estadoWrapper}>
        <div className={estilos.spinner} aria-label="Cargando" />
        <p className={estilos.estadoTexto}>Cargando productos...</p>
      </div>
    );
  }

  return (
    <main className={estilos.contenedor}>
      <Helmet>
        <title>Productos — Tienda Nacional</title>
        <meta name="description" content="Explorá nuestro catálogo de productos nacionales." />
      </Helmet>
      <header className={estilos.encabezado}>
        <h1 className={estilos.titulo}>Nuestros Productos</h1>
      </header>

      <ItemList productos={productos} />

      <Paginacion 
        paginaActual={paginaActual}
        totalPaginas={totalPaginas}
        cargarPagina={cargarPagina}
        cargando={cargando}
      />
    </main>
  );
};

export default ItemListContainer;

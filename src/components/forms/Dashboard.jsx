import { useState } from "react";
import FormContainer from "./FormContainer";
import { useProductos } from "../../context/ProductosContext";
import styles from "./Dashboard.module.css";
import TrashIcon from "../../assets/icons/TrashIcon";
import EditIcon from "../../assets/icons/EditIcon";
import Paginacion from "../Paginacion";

const Dashboard = () => {
  const {
    productos,
    eliminarProducto,
    paginaActual,
    totalPaginas,
    cargarPagina,
    cargando,
  } = useProductos();

  // null   → modal cerrado
  // false  → modal abierto en modo "agregar"
  // obj    → modal abierto en modo "editar" con ese producto
  const [productoEditando, setProductoEditando] = useState(null);
  const [modalAbierto, setModalAbierto] = useState(false);

  const abrirAgregar = () => {
    setProductoEditando(null);
    setModalAbierto(true);
  };

  const abrirEditar = (producto) => {
    setProductoEditando(producto);
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setProductoEditando(null);
  };

  const manejarEliminar = async (id) => {
    const ok = window.confirm("¿Eliminar este producto permanentemente?");
    if (ok) await eliminarProducto(id);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Inventario</h1>
        <button className={styles.btnNuevo} onClick={abrirAgregar}>
          + Agregar Producto
        </button>
      </header>

      {modalAbierto && (
        <div className={styles.overlay}>
          <div className={styles.modal}>
            <button className={styles.btnClose} onClick={cerrarModal}>
              &times;
            </button>
            <FormContainer
              cerrarModal={cerrarModal}
              productoEditar={productoEditando}
            />
          </div>
        </div>
      )}

      {/* Render condicional por si está cargando los productos */}
      {cargando && productos.length === 0 ? (
        <div className={styles.estadoWrapper}>
          <p className={styles.estadoTexto}>Cargando inventario...</p>
        </div>
      ) : (
        <>
          <div className={styles.cuerpo}>
            <ul className={styles.lista}>
              {productos.map((prod) => (
                <li key={prod.id} className={styles.item}>
                  {prod.imagen && (
                    <img
                      src={prod.imagen}
                      alt={prod.nombre}
                      className={styles.itemImg}
                    />
                  )}

                  <div className={styles.itemInfo}>
                    <h4>{prod.nombre}</h4>
                    <div className={styles.itemMeta}>
                      <span className={styles.precio}>${prod.precio}</span>
                      {prod.categoria && (
                        <span className={styles.categoria}>
                          {prod.categoria}
                        </span>
                      )}
                      <span className={styles.stock}>Stock: {prod.stock}</span>
                    </div>
                  </div>

                  <div className={styles.itemAcciones}>
                    <button
                      className={styles.btnEditar}
                      onClick={() => abrirEditar(prod)}
                      aria-label="Editar producto"
                    >
                      <EditIcon />
                    </button>
                    <button
                      className={styles.btnBorrar}
                      onClick={() => manejarEliminar(prod.id)}
                      aria-label="Eliminar producto"
                    >
                      <TrashIcon />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <Paginacion
            paginaActual={paginaActual}
            totalPaginas={totalPaginas}
            cargarPagina={cargarPagina}
            cargando={cargando}
          />
        </>
      )}
    </div>
  );
};

export default Dashboard;

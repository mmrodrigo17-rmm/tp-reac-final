import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useProductos } from "../context/ProductosContext";
import styles from './DetalleProducto.module.css'; 

const ProductoDetalle = () => {
  const { id } = useParams(); 
  const { productos } = useProductos();
  const [listaOpiniones, setListaOpiniones] = useState([]);
  // Este cargando solo cargara las opiniones
  const [cargandoOpiniones, setCargandoOpiniones] = useState(true);
  // Buscamos directamente el producto en el context de forma instantanea
  const datosProducto = productos.find(p => p.id === id);

  const agregarAlCarrito = () => {
    alert(`¡${datosProducto.nombre} agregado al carrito!`);
  };

  useEffect(() => {
    const consultaOpiniones = query(
      collection(db, "opiniones"),
      where("productoId", "==", id)
    );

    const desvincular = onSnapshot(consultaOpiniones, captura => {
      const opinionesFirebase = captura.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setListaOpiniones(opinionesFirebase);
      setCargandoOpiniones(false); // Solo apagamos la carga de opiniones
    });

    return () => desvincular();
  }, [id]); 

  // Si el producto no está en el contexto (por ejemplo, si el usuario recarga la página directamente acá 
  // y el contexto aún está vacío), mostramos un cargando general solo para el producto.
  if (!datosProducto) {
    return <div className={styles.container}><h2>Cargando información del producto...</h2></div>;
  }

  return (
    <div className={styles.container}>
      <main className={styles.mainContent}>
        <div className={styles.imageWrapper}>
          {datosProducto.imagen && (
            <img 
              src={datosProducto.imagen} 
              alt={datosProducto.nombre} 
              className={styles.imagen}
            />
          )}
        </div>
        
        <div className={styles.infoBox}>
          {/* Categoria del producto */}
          {datosProducto.categoria && (
            <span className={styles.categoriaBadge}>{datosProducto.categoria}</span>
          )}

          <h1 className={styles.nombre}>{datosProducto.nombre}</h1>
          <p className={styles.descripcion}>{datosProducto.descripcion}</p>
          
          <div className={styles.precio}>
            <span className={styles.moneda}>ARS</span>
            ${datosProducto.precio}
          </div>

          {/* Informacion de Stock dinamico */}
          <div className={styles.stockWrapper}>
            {datosProducto.stock > 0 ? (
              <p className={styles.stockDisponible}>
               <strong>Stock</strong>  {datosProducto.stock} Unidades
              </p>
            ) : (
              <p className={styles.stockAgotado}>Sin stock disponible</p>
            )}
          </div>
          
          <button 
            onClick={agregarAlCarrito} 
            className={styles.btnCarrito}
            disabled={datosProducto.stock <= 0}
          >
            {datosProducto.stock > 0 ? "Añadir al Carrito" : "Agotado"}
          </button>
        </div>
      </main>

      <section className={styles.opinionesSection}>
        <h2 className={styles.opinionesTitle}>Opiniones de la comunidad</h2>
        
        {/* El cargando ahora solo afecta a esta caja de comentarios */}
        {cargandoOpiniones ? (
          <div className={styles.cargandoOpinionesBox}>
            <p>Cargando Opiniones...</p>
          </div>
        ) : listaOpiniones.length === 0 ? (
          <p style={{color: 'var(--clr-muted)'}}>Aún no hay reseñas para este artículo.</p>
        ) : (
          listaOpiniones.map(op => (
            <div key={op.id} className={styles.opinionCard}>
              <strong className={styles.clienteNombre}>{op.clienteNombre}</strong>
              <p>{op.comentario}</p> 
              <span className={styles.rating}>Calificación: {op.rating} ★</span>
            </div>
          ))
        )}
      </section>
    </div>
  );
};

export default ProductoDetalle;
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useProductos } from "../context/ProductosContext";
import { useCart } from "../context/CartContext";
import { Helmet } from "react-helmet-async";
import styles from './DetalleProducto.module.css'; 

const ProductoDetalle = () => {
  const { id } = useParams(); 
  const { productos } = useProductos();
  const { agregarACarrito } = useCart();
  const [listaOpiniones, setListaOpiniones] = useState([]);
  const [cargandoOpiniones, setCargandoOpiniones] = useState(true);
  const datosProducto = productos.find(p => p.id === id);

  const manejarAgregarAlCarrito = () => {
    if (!datosProducto || datosProducto.stock <= 0) return;
    agregarACarrito(
      { id: datosProducto.id, nombre: datosProducto.nombre, precio: datosProducto.precio, imagen: datosProducto.imagen },
      1
    );
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
      setCargandoOpiniones(false);
    });

    return () => desvincular();
  }, [id]);

  if (!datosProducto) {
    return (
      <div className={styles.container}>
        <Helmet>
          <title>Cargando producto — Tienda Nacional</title>
        </Helmet>
        <h2>Cargando información del producto...</h2>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Helmet>
        <title>{datosProducto.nombre} — Tienda Nacional</title>
        <meta name="description" content={datosProducto.descripcion?.substring(0, 160) || `Comprá ${datosProducto.nombre} al mejor precio`} />
      </Helmet>

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
          {datosProducto.categoria && (
            <span className={styles.categoriaBadge}>{datosProducto.categoria}</span>
          )}

          <h1 className={styles.nombre}>{datosProducto.nombre}</h1>
          <p className={styles.descripcion}>{datosProducto.descripcion}</p>
          
          <div className={styles.precio}>
            <span className={styles.moneda}>ARS</span>
            ${datosProducto.precio}
          </div>

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
            onClick={manejarAgregarAlCarrito} 
            className={styles.btnCarrito}
            disabled={datosProducto.stock <= 0}
          >
            {datosProducto.stock > 0 ? "Añadir al Carrito" : "Agotado"}
          </button>
        </div>
      </main>

      <section className={styles.opinionesSection}>
        <h2 className={styles.opinionesTitle}>Opiniones de la comunidad</h2>
        
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

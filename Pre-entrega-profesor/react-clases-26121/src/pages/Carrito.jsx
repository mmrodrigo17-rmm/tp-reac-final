import React from "react";
import { useCart } from "../context/CartContext";
import styles from "./Carrito.module.css";

const Carrito = () => {
  // Traemos las funciones para modificar cantidades desde el contexto
  const { carrito, vaciarCarrito, obtenerTotalPrecio, incrementarCantidad, decrementarCantidad } = useCart();

  if (carrito.length === 0) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.empty}>
          <span className={styles.emptyIcon}>🛒</span>
          <h1 className={styles.emptyTitle}>El carrito está vacío</h1>
          <p className={styles.emptyText}>
            Agrega productos para continuar la compra.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Carrito de Compras</h1>

      <ul className={styles.list}>
        {carrito.map(item => (
          <li key={item.id} className={styles.item}>
            <div>
              <img src={item.imagen} className={styles.image}/>
              <h4 className={styles.itemName}>{item.nombre}</h4>
              <div className={styles.itemMeta}>
                <div className={styles.quantityControls}>
                  <button 
                    className={styles.btnQty} 
                    onClick={() => decrementarCantidad(item.id)}
                  >
                    -
                  </button>
                     <strong className={styles.qty}>{item.cantidad}</strong>
                  <button 
                    className={styles.btnQty} 
                    onClick={() => incrementarCantidad(item.id)}
                    disabled={item.cantidad >= item.stock}
                  >
                    +
                  </button>
                </div>
                <span>Precio unitario: ${item.precio}</span>
              </div>
            </div>
            <p className={styles.itemSubtotal}>
              ${item.precio * item.cantidad}
            </p>
          </li>
        ))}
      </ul>

      <hr className={styles.divider} />

      <div className={styles.footer}>
        <h3 className={styles.total}>
          <span>Total a pagar</span>${obtenerTotalPrecio()}
        </h3>
        <button className={styles.btnClear} onClick={vaciarCarrito}>
          Vaciar carrito
        </button>
      </div>
    </div>
  );
};

export default Carrito;

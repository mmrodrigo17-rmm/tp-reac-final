import React, { useState, useContext, createContext } from "react";

export const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) 
    throw new Error('useCart debe ser usado dentro de un CartProvider');
  return context;
};

export const CarritoProvider = ({ children }) => {

  const [carrito, setCarrito] = useState([]);
  // Funcion para agregar productos
  const agregarACarrito = (producto, cantidad) => {
    const itemEnCarrito = carrito.find(item => item.id === producto.id);
    
    if (itemEnCarrito) {
      const carritoActualizado = carrito.map(item =>
        item.id === producto.id
          ? { ...item, cantidad: item.cantidad + cantidad }
          : item
      );
      setCarrito(carritoActualizado);
      
    } else {
      setCarrito(previo => [...previo, { ...producto, cantidad }]);
    }
  };

  const vaciarCarrito = () => setCarrito([]);
  
  // Obtener cantidad total de unidades en el carrito
  const obtenerCantidadTotal = () => {
    return carrito.reduce((acum, item) => acum + item.cantidad, 0);
  };

  // Obtener el precio total de la compra
  const obtenerTotalPrecio = () => {
    return carrito.reduce((acum, item) => acum + item.precio * item.cantidad, 0);
  };
 
  const incrementarCantidad = (productoId) => {
    setCarrito(prev => prev.map(item =>
        item.id === productoId 
          ? { ...item, cantidad: item.cantidad + 1 } 
          : item
      )
    );
  };
 
  const decrementarCantidad = (productId) => {
    setCarrito(previo => previo.map(item =>
          item.id === productId
            ? { ...item, cantidad: item.cantidad - 1 }
            : item
        )
        .filter(item => item.cantidad > 0)
    );
  };

  return (
    <CartContext.Provider
      value={{ 
        carrito, 
        agregarACarrito, 
        vaciarCarrito, 
        obtenerCantidadTotal, 
        obtenerTotalPrecio, 
        incrementarCantidad,
        decrementarCantidad
      }}
    >
      {children} 
    </CartContext.Provider>
  );
};

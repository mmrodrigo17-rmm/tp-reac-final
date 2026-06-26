import React, { useState, useEffect } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";

const ProductosNacionales = () => {
  // Estado para guardar los productos que traigamos de la DB
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const productosDB = collection(db, "productos-nacionales");
    getDocs(productosDB).then(resp => {
      setProductos(
        resp.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        }),
      );
    });
  }, []); // El array vacío asegura que este efecto se ejecute solo una vez
  return (
    <div>
      <h1>Productos Nacionales</h1>

      <div className="lista-productos">
        {/* 5. Mapeamos el estado `productos` para renderizar cada
uno */}
        {productos.map((prod) => (
          <div key={prod.id}>
            <img
              src={prod.imagen}
              alt={prod.nombre}
              style={{
                width: "100px",
              }}
            />
            <h3>{prod.nombre}</h3>
            <p>Categoría: {prod.categoria}</p>
            <p>Precio: ${prod.precio}</p>
            <p>Stock: {prod.stock} unidades</p>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};
export default ProductosNacionales;

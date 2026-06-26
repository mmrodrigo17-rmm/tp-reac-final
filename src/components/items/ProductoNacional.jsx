import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";

const ProductosNacionales = () => {
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
  }, []);

  return (
    <div>
      <h1>Productos Nacionales</h1>

      <div className="lista-productos">
        {productos.map((prod) => (
          <div key={prod.id}>
            <img
              src={prod.imagen}
              alt={prod.nombre}
              style={{ width: "100px" }}
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

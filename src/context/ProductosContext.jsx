import { createContext, useContext } from "react";
import { collection, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { usePagination } from "../hooks/usePaginacion";

export const ProductosContext = createContext();

export const ProductosProvider = ({ children }) => {
  const {
    data: productos,
    cargando,
    paginaActual,
    totalPaginas,
    cargarPagina,
    refrescarPagina
  } = usePagination("productos-nacionales", "nombre", 4);

  const agregarProducto = async (nuevoProd) => {
    await addDoc(collection(db, "productos-nacionales"), nuevoProd);
    refrescarPagina();
  };

  const eliminarProducto = async (id) => {
    await deleteDoc(doc(db, "productos-nacionales", id));
    refrescarPagina();
  };

  const editarProducto = async (id, datosActualizados) => {
    const ref = doc(db, "productos-nacionales", id);
    await updateDoc(ref, datosActualizados);
    refrescarPagina();
  };

  return (
    <ProductosContext.Provider value={{
      productos, cargando, paginaActual, totalPaginas,
      cargarPagina, eliminarProducto, agregarProducto, editarProducto
    }}>
      {children}
    </ProductosContext.Provider>
  );
};

export const useProductos = () => useContext(ProductosContext);

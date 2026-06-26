import { createContext, useContext } from "react";
import { collection, doc, updateDoc, deleteDoc, addDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { usePagination } from "../hooks/usePaginacion"

export const ProductosContext = createContext();

export const ProductosProvider = ({ children }) => {
  // Consumimos el hook generico pasandole la coleccion especifica de este contexto
  const { 
    data: productos, 
    cargando, 
    paginaActual, 
    totalPaginas, 
    cargarPagina, 
    refrescarPagina 
  } = usePagination("productos-nacionales", "nombre", 4);

  // Operaciones CRUD
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
import { useState, useEffect } from "react";
import { collection, query, orderBy, limit, getDocs, startAfter, getCountFromServer } from "firebase/firestore";
import { db } from "../firebase/config";

export const usePagination = (nombreColeccion, campoOrden = "nombre", itemsPorPagina = 8) => {
  const [data, setData] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [historialDocs, setHistorialDocs] = useState([null]);
  const [totalPaginas, setTotalPaginas] = useState(0);
  const [cargando, setCargando] = useState(false);

  const obtenerTotal = async () => {
    try {
      const snapshot = await getCountFromServer(collection(db, nombreColeccion));
      setTotalPaginas(Math.ceil(snapshot.data().count / itemsPorPagina));
    } catch (error) {
      console.error("Error al obtener total:", error);
    }
  };

  const cargarPagina = async (numeroPagina) => {
    setCargando(true);

    try {
      let consulta;

      if (numeroPagina === 1) {
        consulta = query(
          collection(db, nombreColeccion),
          orderBy(campoOrden),
          limit(itemsPorPagina)
        );
      } else {
        const documentoAnterior = historialDocs[numeroPagina - 1];

        consulta = query(
          collection(db, nombreColeccion),
          orderBy(campoOrden),
          startAfter(documentoAnterior),
          limit(itemsPorPagina)
        );
      }

      const snapshot = await getDocs(consulta);

      const items = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setData(items);
      setPaginaActual(numeroPagina);

      if (!historialDocs[numeroPagina] && snapshot.docs.length > 0) {
        const ultimoDocumento = snapshot.docs[snapshot.docs.length - 1];
        const nuevoHistorial = [...historialDocs];
        nuevoHistorial[numeroPagina] = ultimoDocumento;
        setHistorialDocs(nuevoHistorial);
      }
    } catch (error) {
      console.error("Error al cargar página:", error);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    setHistorialDocs([null]);
    obtenerTotal();
    cargarPagina(1);
  }, [nombreColeccion]);

  const refrescarPagina = () => {
    obtenerTotal();
    cargarPagina(paginaActual);
  };

  return {
    data,
    cargando,
    paginaActual,
    totalPaginas,
    cargarPagina,
    refrescarPagina
  };
};

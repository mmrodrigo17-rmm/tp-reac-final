import { useState, useEffect } from "react";
import { collection, query, orderBy, limit, getDocs, startAfter, getCountFromServer } from "firebase/firestore";
import { db } from "../firebase/config";

export const usePagination = (nombreColeccion, campoOrden = "nombre", itemsPorPagina = 8) => {
  const [data, setData] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [historialDocs, setHistorialDocs] = useState([null]);
  const [totalPaginas, setTotalPaginas] = useState(0);
  const [cargando, setCargando] = useState(false);

  // Función común para obtener el total de páginas
  const obtenerTotal = async () => {
    try {
      const snapshot = await getCountFromServer(collection(db, nombreColeccion));
      setTotalPaginas(Math.ceil(snapshot.data().count / itemsPorPagina));
    } catch (error) {
      console.error("Error al obtener total:", error);
    }
  };

  // Función común para cargar una página específica
 const cargarPagina = async (numeroPagina) => {
  setCargando(true);
  
  try {
    let consulta;

    //  Crear la consulta según la página
    if (numeroPagina === 1) {
      // Si es la página 1, traemos los primeros elementos directamente
      consulta = query(
        collection(db, nombreColeccion),
        orderBy(campoOrden),
        limit(itemsPorPagina)
      );
    } else {
      // Si es cualquier otra página, buscamos el "marcador" de la página anterior
      const documentoAnterior = historialDocs[numeroPagina - 1];
      
      consulta = query(
        collection(db, nombreColeccion),
        orderBy(campoOrden),
        startAfter(documentoAnterior), // Le decimos que empiece a leer después de ese marcador
        limit(itemsPorPagina)
      );
    }

    // Pedirle los datos a Firebase
    const snapshot = await getDocs(consulta);
    
    // Convertimos los documentos raros de Firebase en objetos JSON normales
    const items = snapshot.docs.map(doc => ({ 
      id: doc.id, 
      ...doc.data() 
    }));

    // Guardar los datos en el estado para que se muestren en pantalla
    setData(items);
    setPaginaActual(numeroPagina);

    // Guardar el "marcador" para el futuro
    // Si no tenemos guardado el marcador para la página que acabamos de cargar, lo guardamos
    if (!historialDocs[numeroPagina] && snapshot.docs.length > 0) {
      // Agarramos el último documento de la lista que nos devolvió Firebase
      const ultimoDocumento = snapshot.docs[snapshot.docs.length - 1];
      
      // Creamos una copia del historial actual, le agregamos el marcador y lo guardamos
      const nuevoHistorial = [...historialDocs];
      nuevoHistorial[numeroPagina] = ultimoDocumento;
      setHistorialDocs(nuevoHistorial);
    }

  } catch (error) {
    console.error("Error al cargar página:", error);
  } finally {
    // Esto se ejecuta SIEMPRE (si sale bien o si sale mal) para apagar el cargando
    setCargando(false);
  }
};

  //  Este useEffect se ejecuta al iniciar o si cambia la colección
  useEffect(() => {
    setHistorialDocs([null]);
    obtenerTotal();
    cargarPagina(1);
  }, [nombreColeccion]);

  // Funcion auxiliar para refrescar la pagina actual tras un CRUD
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
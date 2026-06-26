import { createContext, useState, useContext } from "react";

const BusquedaContext = createContext();

export const BusquedaProvider = ({ children }) => {
  const [busqueda, setBusqueda] = useState("");

  return (
    <BusquedaContext.Provider value={{ busqueda, setBusqueda }}>
      {children}
    </BusquedaContext.Provider>
  );
};

export const useBusqueda = () => useContext(BusquedaContext);

import { Routes, Route } from 'react-router-dom';
import Layout from './components/layouts/Layout';
import Inicio from './pages/Inicio';
import Contacto from './pages/Contacto';
import ItemListContainer from './components/items/ItemListContainer';
import DetalleProducto from './pages/DetalleProducto';
import Carrito from './pages/Carrito';
import Dashboard from './components/forms/Dashboard';
import Login from './pages/Login';
import Registro from './pages/Registro';
import RutasProtegidas from './components/RutasProtegidas';
import ResultadoBusqueda from './components/search/ResultadoBusqueda';
import "./App.css";

function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<Inicio />} />
          <Route path='/contacto' element={<Contacto />} />
          <Route path='/productos' element={<ItemListContainer />} />
          <Route path="/producto/:id" element={<DetalleProducto />} />
          <Route path="/carrito" element={<Carrito />} />

          {/* Ruta Protegida ÚNICA para el Dashboard */}
          <Route 
            path="/dashboard" 
            element={
              <RutasProtegidas rolesPermitidos={["admin"]}>
                <Dashboard />
              </RutasProtegidas>
            } 
          />
          <Route path="/busqueda" element={<ResultadoBusqueda />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
        </Route>
      </Routes>
    </>   
  );
}

export default App;

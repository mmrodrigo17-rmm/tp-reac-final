import { Routes, Route } from 'react-router-dom';
import Layout from './components/layouts/Layout';
import DetalleProducto from './pages/DetalleProducto';
import ItemListContainer from './components/items/ItemListContainer';
import Contacto from './pages/Contacto';
import Carrito from './pages/Carrito';
import Dashboard from './components/forms/Dashboard';
import Login from './pages/Login';
import Registro from './pages/Registro';
import RutasProtegidas from './components/RutasProtegidas';
import ResultadosBusqueda from './components/search/ResultadoBusqueda'
import './App.css';

function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<h1>Inicio</h1>}/>
          <Route path='/contacto' element={<Contacto/>}/>
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
           <Route path="/busqueda" element={<ResultadosBusqueda />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
        </Route>
      </Routes>
    </>   
  );
}

export default App;
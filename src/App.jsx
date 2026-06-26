import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Registro from './pages/Registro';
import ResultadoBusqueda from './components/search/ResultadoBusqueda';
import "./App.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<h1>Inicio</h1>} />
        <Route path="/contacto" element={<h1>Contacto</h1>} />
        <Route path="/productos" element={<h1>Productos</h1>} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/busqueda" element={<ResultadoBusqueda />} />
      </Routes>
    </>
  );
}

export default App;
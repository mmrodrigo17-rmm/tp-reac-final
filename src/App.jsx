import { Routes, Route } from 'react-router-dom';
import "./App.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<h1>Inicio</h1>} />
        <Route path="/contacto" element={<h1>Contacto</h1>} />
        <Route path="/productos" element={<h1>Productos</h1>} />
        <Route path="/login" element={<h1>Login</h1>} />
        <Route path="/registro" element={<h1>Registro</h1>} />
      </Routes>
    </>
  );
}

export default App;
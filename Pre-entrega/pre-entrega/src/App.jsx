import { BrowserRouter, Routes, Route } from 'react-router-dom';
// Importo mis proveedores de contexto para manejar el estado global de la app
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
// Importo mis componentes y páginas
import Layout from './components/layouts/Layout';
import ItemListContainer from './components/products/ItemListContainer';
import ItemDetailContainer from './components/detail/ItemDetailContainer';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Cart from './pages/Cart';

function App() {
  return (
    // Envuelvo toda la aplicación con AuthProvider para que cualquier componente pueda saber si el usuario está logueado
    <AuthProvider>
      {/* Envuelvo también con CartProvider para que el carrito esté disponible en cualquier parte (ej: navbar, botones de compra) */}
      <CartProvider>
        {/* Inicio la configuración del ruteo usando BrowserRouter */}
        <BrowserRouter>
          <Routes>
            {/* Defino una ruta padre "/" que renderiza el Layout. 
                Esto me permite mantener el Header (con el Nav) y el Footer siempre visibles, 
                mientras el contenido cambia en el medio (gracias al componente <Outlet /> dentro de Layout). */}
            <Route path="/" element={<Layout />}>
              
              {/* Esta es la ruta por defecto (index) que carga cuando entro a la raíz de la web */}
              <Route index element={<ItemListContainer />} />
              
              {/* Ruta específica para ver todo el catálogo de productos */}
              <Route path="productos" element={<ItemListContainer />} />
              
              {/* Ruta dinámica para ver el detalle de un solo producto. 
                  Uso ":id" para capturar el identificador del producto en la URL */}
              <Route path="producto/:id" element={<ItemDetailContainer />} />
              
              {/* Defino la ruta del carrito, pero la protejo. 
                  Envuelvo el componente <Cart /> con mi <ProtectedRoute />.
                  De esta manera, si intento entrar aquí sin estar autenticado, seré redirigido al inicio. */}
              <Route path="carrito" element={
                <ProtectedRoute>
                  <Cart />
                </ProtectedRoute>
              } />
              
            </Route>
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
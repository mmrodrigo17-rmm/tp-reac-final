// Importo mi hook personalizado para acceder al estado global del carrito
import { useCart } from '../context/CartContext';
// Importo Link de React Router para poder navegar entre páginas sin recargar el navegador
import { Link } from 'react-router-dom';

const Cart = () => {
  // Extraigo del contexto el array con los productos y todas las funciones que creé para manipularlos
  const { cart, increaseQuantity, decreaseQuantity, removeItem, clearCart } = useCart();

  // Calculo el precio total acumulado de todo el carrito. 
  // Uso el método reduce() para iterar sobre cada ítem, multiplicando su precio por la cantidad, 
  // y lo voy sumando al acumulador (acc) que arranca en 0.
  const totalPrice = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  // Verifico si el carrito está vacío. 
  // Si es así, corto la ejecución (early return) y devuelvo una vista amigable 
  // invitando al usuario a volver al catálogo para seguir comprando.
  if (cart.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem' }}>
        <h2>Tu carrito está vacío 🛒</h2>
        <p>¡Date una vuelta por el catálogo para agregar tus productos favoritos!</p>
        <Link to="/productos">
          <button style={{ padding: '10px 20px', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginTop: '1rem' }}>
            Ir a la tienda
          </button>
        </Link>
      </div>
    );
  }

  // Si el carrito tiene al menos un producto, renderizo la vista principal
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '1rem' }}>
      <h2>Tu Carrito (Ruta Protegida)</h2>
      
      {/* Contenedor de la lista de productos */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1.5rem' }}>
        
        {/* Itero sobre el array del carrito usando map() para renderizar una tarjeta por cada producto.
            Es obligatorio pasarle la prop "key" (uso el id del ítem) para que React pueda rastrear los cambios de forma eficiente. */}
        {cart.map(item => (
          <div 
            key={item.id} 
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: '1px solid #ddd', padding: '1rem', borderRadius: '8px', background: '#fff' }}
          >
            {/* Imagen miniatura del producto */}
            <img src={item.image} alt={item.title} style={{ width: '70px', height: '70px', objectFit: 'contain' }} />
            
            {/* Sección de información: Título cortado para no desarmar el diseño, precio unitario y el subtotal de ese ítem en particular */}
            <div style={{ flex: 1, marginLeft: '1.5rem' }}>
              <h4 style={{ margin: '0 0 5px 0', fontSize: '1.1rem' }}>{item.title.substring(0, 45)}...</h4>
              <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>Precio unitario: ${item.price}</p>
              <p style={{ margin: '5px 0 0 0', fontWeight: 'bold', color: '#333' }}>
                Subtotal: ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>

            {/* Controles interactivos para modificar la cantidad que me llevo de este producto */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              {/* Botón de restar: Le agrego la propiedad "disabled" si la cantidad es 1 o menos, 
                  para evitar que el usuario descuente a 0 o números negativos directamente desde aquí. */}
              <button 
                onClick={() => decreaseQuantity(item.id)} 
                disabled={item.quantity <= 1}
                style={{ padding: '5px 12px', fontSize: '1.1rem', cursor: item.quantity <= 1 ? 'not-allowed' : 'pointer' }}
              >
                -
              </button>
              
              {/* Muestro la cantidad actual del ítem */}
              <span style={{ minWidth: '25px', textAlign: 'center', fontWeight: 'bold', fontSize: '1.1rem' }}>
                {item.quantity}
              </span>
              
              {/* Botón de sumar: Dispara la función increaseQuantity pasándole el ID del producto */}
              <button 
                onClick={() => increaseQuantity(item.id)} 
                style={{ padding: '5px 12px', fontSize: '1.1rem', cursor: 'pointer' }}
              >
                +
              </button>
            </div>

            {/* Botón para eliminar definitivamente este producto del array del carrito */}
            <button 
              onClick={() => removeItem(item.id)} 
              style={{ marginLeft: '1.5rem', padding: '8px 12px', background: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
              Eliminar
            </button>
          </div>
        ))}
      </div>

      {/* Footer del Carrito: Zona de acciones generales y totales */}
      <div style={{ borderTop: '2px solid #222', marginTop: '2.5rem', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        
        {/* Botón de pánico para limpiar todo el estado del carrito de una sola vez */}
        <button 
          onClick={clearCart} 
          style={{ padding: '10px 20px', background: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Vaciar Carrito
        </button>
        
        {/* Resumen del total y botón de pago (checkout) */}
        <div style={{ textAlign: 'right' }}>
          {/* Muestro el totalPrice calculado arriba y uso toFixed(2) para forzar siempre 2 decimales */}
          <h3 style={{ fontSize: '1.5rem', margin: '0 0 10px 0' }}>
            Total a Pagar: <span style={{ color: '#28a745' }}>${totalPrice.toFixed(2)}</span>
          </h3>
          <button style={{ padding: '12px 25px', background: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '1.2rem', fontWeight: 'bold' }}>
            Finalizar Compra
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
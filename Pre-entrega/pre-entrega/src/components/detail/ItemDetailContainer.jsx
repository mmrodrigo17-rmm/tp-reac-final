// Importo los hooks de React para manejar el estado y el ciclo de vida del componente
import { useState, useEffect } from 'react';
// Importo useParams de React Router. Esto me permite leer los parámetros dinámicos de la URL 
// (en este caso, el :id del producto que configuré en App.jsx)
import { useParams } from 'react-router-dom';
// Importo mi custom hook para poder interactuar con el carrito global
import { useCart } from '../../context/CartContext'; 

const ItemDetailContainer = () => {
  // Extraigo el "id" directamente de la URL. Si la ruta es "/producto/3", id valdrá "3".
  const { id } = useParams();
  
  // Estado para guardar la información detallada del producto (arranca en null porque aún no hay datos)
  const [product, setProduct] = useState(null);
  
  // Estado para manejar la pantalla de carga, arranca en true
  const [loading, setLoading] = useState(true);
  
  // Extraigo la función addToCart de mi contexto para poder usarla en el botón de compra
  const { addToCart } = useCart(); 

  // Uso useEffect para hacer la petición a la API.
  // Es clave que en el array de dependencias (al final) ponga [id]. 
  // Así le digo a React: "Si el usuario cambia de producto y el ID de la URL cambia, 
  // vuelve a ejecutar este efecto para traer los datos del nuevo producto".
  useEffect(() => {
    // Defino una función asíncrona dentro del efecto. 
    // Hago esto porque el callback principal de useEffect no puede ser async directamente.
    const fetchProduct = async () => {
      setLoading(true); // Enciendo el estado de carga por si vengo de ver otro producto
      
      try {
        // Hago la petición a la FakeStore API pidiendo un producto en específico usando el id de la URL
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        const data = await response.json();
        
        // Guardo el producto en mi estado
        setProduct(data);
      } catch (error) {
        // Si algo falla (ej. sin internet), lo capturo aquí y lo muestro en consola
        console.error("Error al obtener el producto:", error);
      } finally {
        // El bloque finally se ejecuta SIEMPRE, ya sea que la petición haya sido un éxito o un fracaso.
        // Es el lugar perfecto para apagar el estado de carga.
        setLoading(false);
      }
    };

    // Llamo a la función que acabo de crear para que arranque la petición
    fetchProduct();
  }, [id]);

  // Cláusulas de guarda (Early returns) para manejar la experiencia de usuario:
  
  // Si estoy esperando los datos, muestro un mensaje de carga
  if (loading) return <h2>Cargando detalle...</h2>;
  
  // Si terminó de cargar pero no encontró nada (product es null), aviso que no existe
  if (!product) return <h2>Producto no encontrado</h2>;

  // Si pasé las validaciones anteriores, renderizo la vista detallada del producto
  return (
    // Contenedor principal usando Flexbox para poner la imagen y el texto lado a lado
    <div style={{ display: 'flex', gap: '2rem' }}>
      
      {/* Imagen del producto */}
      <img src={product.image} alt={product.title} style={{ width: '300px' }} />
      
      {/* Contenedor de la información del producto */}
      <div>
        <h2>{product.title}</h2>
        <p>{product.description}</p>
        <h3>${product.price}</h3>
        
        {/* Botón de compra */}
        <button 
          onClick={() => {
            // Cuando hacen clic, llamo a la función global para agregar 1 unidad de este producto
            addToCart(product, 1);
            
            // Muestro un feedback visual rápido para que el usuario sepa que la acción funcionó
            alert(`¡Agregaste 1 "${product.title}" al carrito!`); 
          }}
          style={{ padding: '10px 20px', background: 'blue', color: 'white', cursor: 'pointer', marginTop: '10px' }}
        >
          Agregar al Carrito
        </button>
      </div>
      
    </div>
  );
};

export default ItemDetailContainer;
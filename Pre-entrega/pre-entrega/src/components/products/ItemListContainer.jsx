// Importo los hooks de React necesarios para manejar el estado interno y el ciclo de vida
import { useState, useEffect } from 'react';
// Importo el componente "hijo" que se encargará de darle estilo y estructura a cada tarjeta de producto
import Item from './Item';

const ItemListContainer = () => {
  // Defino mis tres estados fundamentales para manejar peticiones asíncronas (fetch):
  
  // 1. products: Aquí guardaré el array con la lista de productos que me devuelva la API.
  const [products, setProducts] = useState([]);
  
  // 2. loading: Arranca en true porque, apenas se monta el componente, todavía no tengo los datos.
  // Esto me sirve para mostrarle un feedback visual al usuario (un texto de "Cargando...").
  const [loading, setLoading] = useState(true);
  
  // 3. error: Inicia en null. Si la petición falla, guardaré el mensaje de error aquí.
  const [error, setError] = useState(null);

  // Uso useEffect para disparar la llamada a la API.
  // Al pasarle un array de dependencias vacío [], le digo a React que ejecute este código 
  // una única vez: justo cuando el componente "nace" (se monta en la pantalla).
  useEffect(() => {
    // Hago la petición HTTP a la FakeStore API
    fetch('https://fakestoreapi.com/products')
      .then(res => {
        // Valido la respuesta: si el status HTTP no es un éxito (ej: 404 o 500), 
        // lanzo un error intencionalmente para que caiga en el bloque .catch()
        if (!res.ok) throw new Error('Error al cargar los productos');
        
        // Si todo fue bien, convierto la respuesta de texto a un objeto JSON
        return res.json();
      })
      .then(data => {
        // Ya tengo la información lista. La guardo en mi estado "products"
        setProducts(data);
        // Como ya terminé, apago el estado de carga
        setLoading(false);
      })
      .catch(err => {
        // Si ocurre cualquier problema (falla de internet, API caída, etc.), lo atrapo aquí.
        // Guardo el mensaje para mostrarlo en pantalla.
        setError(err.message);
        // Es fundamental apagar el loading también aquí, sino la pantalla quedaría cargando eternamente.
        setLoading(false);
      });
  }, []);

  // Cláusulas de guarda (Early returns):
  // Si el estado "loading" es true, corto la ejecución del componente y renderizo este mensaje.
  // El usuario verá esto mientras el fetch está en proceso.
  if (loading) return <h2>Cargando productos...</h2>;
  
  // Si ocurrió un error, corto la ejecución y le aviso al usuario qué pasó.
  if (error) return <h2>Error: {error}</h2>;

  // Si llegué hasta esta línea, significa que "loading" es false, "error" es null, 
  // y por lo tanto, ¡tengo mis productos listos para mostrar!
  
  return (
    // Creo un contenedor principal. 
    // Uso CSS en línea para armar una grilla responsiva: 'auto-fit' y 'minmax(250px, 1fr)' 
    // hacen que las tarjetas se acomoden solas dependiendo del tamaño de la pantalla, sin necesidad de media queries.
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
      
      {/* Itero sobre el array "products" usando el método map(). */}
      {products.map(product => (
        // Por cada producto encontrado en el array, renderizo un componente <Item />.
        // Es obligatorio pasar la prop "key" usando un valor único (como el id) para que React renderice de forma eficiente.
        // Además, le inyecto por props toda la información del producto (product={product}).
        <Item key={product.id} product={product} />
      ))}
      
    </div>
  );
};

export default ItemListContainer;
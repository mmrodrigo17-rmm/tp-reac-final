import Item from './Item';
import estilos from './ItemList.module.css';

const ItemList = ({ productos }) => {
  return (
    <section className={estilos.grilla}>
      {productos.map(prod =>
        <Item key={prod.id} {...prod} />
      )}
    </section>
  );
};

export default ItemList;

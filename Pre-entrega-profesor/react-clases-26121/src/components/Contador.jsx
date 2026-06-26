import { useState, useEffect } from 'react';

function Contador() {
    const [contador, setContador] = useState(0);

    useEffect(() =>{
      document.title = `Contador ${contador}`
    },[contador])

// Funciones para incrementar y decrementar
    return (
      <div>
        <p>Hoola: {contador}</p>
        <button onClick={() => setContador(contador + 1)}>+</button>
        <button onClick={() => setContador(contador - 1)}>-</button>
      </div>
    );
}
export default Contador;
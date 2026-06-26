const Footer = () => {
  // Defino un arreglo estático con la información de mi equipo de trabajo.
  // Al tener los datos estructurados en este arreglo de objetos, me resulta mucho más fácil
  // agregar, quitar o modificar miembros en el futuro sin tener que tocar el código HTML (JSX) de abajo.
  const team = [
    { name: "Rodrigo Morel", role: "Frontend Dev" },
    { name: "Marcelo Gallardo", role: "UX/UI Designer" },
    { name: "Enzo Pérez", role: "Backend Dev" }
  ];

  return (
    // Etiqueta semántica <footer> para el pie de página.
    // Le aplico estilos en línea para darle un fondo oscuro, texto blanco y un margen superior
    // para separarlo del contenido principal de la página.
    <footer style={{ background: '#333', color: '#fff', padding: '2rem', marginTop: '2rem' }}>
      
      {/* Sección de información corporativa */}
      <div>
        <h3>eCommerce Monumental S.A.</h3>
        <p>Dirección: Av. Pres. Figueroa Alcorta 7597, Buenos Aires</p>
      </div>
      
      {/* Contenedor de las tarjetas del equipo.
          Uso Flexbox con "justifyContent: 'center'" para que las tarjetas queden bien alineadas al medio, 
          y "gap: '1rem'" para darles un respiro y que no estén pegadas entre sí. */}
      <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', justifyContent: 'center' }}>
        
        {/* Recorro mi arreglo "team" usando el método map() de JavaScript.
            Por cada persona en el arreglo, devuelvo (renderizo) un div con su información. */}
        {team.map((person, index) => (
          // Es obligatorio en React pasar la prop "key" al iterar elementos.
          // Como esta es una lista estática (no voy a reordenar ni borrar elementos dinámicamente), 
          // usar el parámetro "index" (0, 1, 2...) como key es perfectamente válido y seguro.
          <div key={index} style={{ border: '1px solid #555', padding: '1rem', borderRadius: '8px' }}>
            {/* Imprimo el nombre y el rol extrayéndolos del objeto "person" */}
            <h4>{person.name}</h4>
            <p>{person.role}</p>
          </div>
        ))}
        
      </div>
    </footer>
  );
};

export default Footer;
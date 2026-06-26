import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Usamos tu contexto central
import { doc, setDoc } from "firebase/firestore"; // Importamos para grabar en Firestore
import { db } from "../firebase/config"; // Tu configuración de Firebase
import styles from "./AuthForm.module.css";

const Registro = () => {
  const [nombre, setNombre] = useState(""); // Agregamos campo de nombre
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  
  const { signup } = useAuth(); // Traemos la función de registro del contexto
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      // Creamos el usuario en Firebase Auth usando tu contexto
      const userCredential = await signup(email, password);
      const usuarioCreado = userCredential.user;

      // CREAMOS EL DOCUMENTO EN FIRESTORE EN LA COLECCIÓN 'CLIENTE'
      // Forzamos que el ID del documento sea el UID de autenticación
      await setDoc(doc(db, "cliente", usuarioCreado.uid), {
        nombre: nombre,
        email: email,
        rol: "usuario", // Todo usuario que se registra por la web es cliente común por defecto
      });

      console.log("Usuario registrado y creado en la colección 'cliente' con éxito.");
      navigate("/");

    } catch (error) {
      console.error("Error en el registro:", error.code);
      if (error.code === "auth/email-already-in-use") {
        const quiereLoguearse = window.confirm(
          "Este correo ya está registrado. ¿Desea ir al inicio de sesión?"
        );
        if (quiereLoguearse) navigate("/login");
      } else if (error.code === "auth/weak-password") {
        setError("La contraseña debe tener al menos 6 caracteres.");
      } else {
        setError("Ocurrió un error al registrarse. Intente nuevamente.");
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h2 className={styles.titulo}>Crear Cuenta</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          
          <div className={styles.campo}>
            <label className={styles.label}>Nombre Completo</label>
            <input
              className={styles.input}
              type="text"
              placeholder="Juan Pérez"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>

          <div className={styles.campo}>
            <label className={styles.label}>Correo Electrónico</label>
            <input
              className={styles.input}
              type="email"
              placeholder="ejemplo@correo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className={styles.campo}>
            <label className={styles.label}>Contraseña</label>
            <input
              className={styles.input}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Mínimo 6 caracteres"
            />
          </div>

          {error && <p className={styles.errorMessage}>{error}</p>}

          <button type="submit" className={styles.btnAccion}>
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
};

export default Registro;
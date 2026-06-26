import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; 
import { Link } from "react-router-dom";
import styles from "./AuthForm.module.css"; 

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorLocal, setErrorLocal] = useState(null);
  
  const { login } = useAuth(); 
  const navigate = useNavigate();

  const manejarLogin = async (evento) => {
    evento.preventDefault();
    setErrorLocal(null);
    
    try {
      //  Usamos la funcion centralizada de tu contexto
      const userCredential = await login(email, password);
      console.log("Usuario logueado con éxito:", userCredential.user);
      navigate("/"); 
    } catch (error) {
      console.error("CÓDIGO DE ERROR REAL DE FIREBASE:", error.code);
      
      if (
        error.code === "auth/invalid-credential" || 
        error.code === "auth/user-not-found" || 
        error.code === "auth/wrong-password"
      ) {
        setErrorLocal("Las credenciales ingresadas son incorrectas.");
      } else if (error.code === "auth/invalid-email") {
        setErrorLocal("El Email no es válido.");
      } else {
        // Si te sigue saliendo este, mirá el console.log de arriba para ver el código real
        setErrorLocal(`Error inesperado: ${error.code || "Comprobar consola"}`);
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h2 className={styles.titulo}>Iniciar Sesión</h2>
        <form onSubmit={manejarLogin} className={styles.form}>
          <div className={styles.campo}>
            <label className={styles.label}>Correo Electrónico</label>
            <input
              className={styles.input}
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(evento) => setEmail(evento.target.value)}
              required
            />
          </div>

          <div className={styles.campo}>
            <label className={styles.label}>Contraseña</label>
            <input
              className={styles.input}
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(evento) => setPassword(evento.target.value)}
              required
            />
          </div>

          {errorLocal && <p className={styles.errorMessage}>{errorLocal}</p>}

          <button type="submit" className={styles.btnAccion}>
            Ingresar
          </button>
          <div>
            No estas Registrado? 
            <Link to="/registro" className={styles.navLink}>
              Registrate
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
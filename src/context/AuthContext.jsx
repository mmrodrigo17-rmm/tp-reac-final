import { createContext, useState, useContext, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();

  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    signOut(auth);
  };

  useEffect(() => {
    const cancelarEscucha = onAuthStateChanged(auth, async (currentUser) => {
      try {
        if (currentUser) {
          // Busca el documento del usuario en la coleccion "cliente" usando su UID
          const userDocRef = doc(db, "cliente", currentUser.uid);
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            const datosUsuario = userDocSnap.data();
            if (datosUsuario.rol === "admin") {
              setUser({ ...currentUser, nombre: datosUsuario.nombre, rol: "admin" });
            } else {
              setUser({ ...currentUser, nombre: datosUsuario.nombre, rol: "usuario" });
            }
          } else {
            setUser({ ...currentUser, nombre: "Invitado", rol: "usuario" });
          }
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Error al obtener el rol del usuario:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    });

    return () => cancelarEscucha();
  }, [auth]);

  const informacion = { user, loading, signup, login, logout };

  return (
    <AuthContext.Provider value={informacion}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

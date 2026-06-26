import { useState, useEffect } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useProductos } from "../../context/ProductosContext";
import FormProducto from "./FormProducto";

const IMGBB_KEY = "4bc89d90e5ba2ca799b0f1339650ce18";

const ESTADO_INICIAL = {
  nombre: "",
  precio: "",
  descripcion: "",
  stock: "",
  categoria: "",
  slug: "",
};

// productoEditar: si viene con datos → modo editar, si es null/false → modo agregar
const FormContainer = ({ cerrarModal, productoEditar = null }) => {
  const { editarProducto } = useProductos();

  const [imagenFile, setImagenFile] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [datosForm, setDatosForm] = useState(ESTADO_INICIAL);

  const modo = productoEditar ? "editar" : "agregar";

  // aca pre-llenamos el formulario si venimos en modo editar
  useEffect(() => {
    if (productoEditar) {
      setDatosForm({
        nombre: productoEditar.nombre ?? "",
        precio: productoEditar.precio ?? "",
        descripcion: productoEditar.descripcion ?? "",
        stock: productoEditar.stock ?? "",
        categoria: productoEditar.categoria ?? "",
        slug: productoEditar.slug ?? "",
      });
    }
  }, [productoEditar]);

  const manejarCambio = (e) => {
    setDatosForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const manejarCambioImagen = (e) => {
    const archivo = e.target.files[0];
    setImagenFile(archivo ?? null);
    // Actualiza el nombre visible en el file input
    const label = document.getElementById("file-name");
    if (label) label.textContent = archivo ? archivo.name : "Sin archivo seleccionado";
  };

  // Sube la imagen a ImgBB y devuelve la URL, o null si falla
  const subirImagen = async (archivo) => {
    const form = new FormData();
    form.append("image", archivo);

    const res = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_KEY}`, {
      method: "POST",
      body: form,
    });

    const json = await res.json();
    return json.success ? json.data.url : null;
  };

  const manejarEnvio = async (e) => {
    e.preventDefault();
    setCargando(true);

    try {
      // Esta parte es cuando el modo esta en agregar producto
      if (modo === "agregar") {
        if (!imagenFile) {
          alert("Por favor, sube una imagen");
          setCargando(false);
          return;
        }

        const urlImagen = await subirImagen(imagenFile);
        if (!urlImagen) throw new Error("Error al subir imagen");

        const productoNuevo = {
          ...datosForm,
          imagen: urlImagen,
          precio: Number(datosForm.precio),
          stock: Number(datosForm.stock),
        };

        await addDoc(collection(db, "productos-nacionales"), productoNuevo);
        alert("¡Producto agregado!");
        setDatosForm(ESTADO_INICIAL);
        setImagenFile(null);

        // si no entramos aca en modo editar
      } else {
        let urlImagen = productoEditar.imagen; // mantiene la imagen actual por defecto

        if (imagenFile) {
          const nueva = await subirImagen(imagenFile);
          if (!nueva) throw new Error("Error al subir imagen");
          urlImagen = nueva;
        }

        const datosActualizados = {
          ...datosForm,
          imagen: urlImagen,
          precio: Number(datosForm.precio),
          stock: Number(datosForm.stock),
        };

        await editarProducto(productoEditar.id, datosActualizados);
        alert("¡Producto actualizado!");
      }

      cerrarModal?.();
    } catch (error) {
      console.error("Error:", error);
      alert("Ocurrió un error. Revisá la consola.");
    } finally {
      setCargando(false);
    }
  };

  return (
    <FormProducto
      datosForm={datosForm}
      manejarCambio={manejarCambio}
      manejarEnvio={manejarEnvio}
      manejarCambioImagen={manejarCambioImagen}
      modo={modo}
      cargando={cargando}
    />
  );
};

export default FormContainer;

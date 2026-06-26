import styles from "./FormProducto.module.css";

const CATEGORIAS = [
  "Fotografía",
  "Electrónica",
  "Computación",
  "Accesorios",
  "Video",
  "Otros",
];

const FormProducto = ({
  datosForm,
  manejarCambio,
  manejarEnvio,
  manejarCambioImagen,
  modo = "agregar",
  cargando,
}) => {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.titulo}>
        {modo === "editar" ? "Editar Producto" : "Agregar Producto"}
      </h2>

      <form onSubmit={manejarEnvio} className={styles.form}>
        {/* Nombre */}
        <div className={styles.campo}>
          <label className={styles.label}>Nombre</label>
          <input
            className={styles.input}
            type="text"
            name="nombre"
            value={datosForm.nombre}
            onChange={manejarCambio}
            placeholder="Ej. Cámara Nikon Z6"
            required
          />
        </div>

        {/* Descripcion */}
        <div className={styles.campo}>
          <label className={styles.label}>Descripción</label>
          <textarea
            className={`${styles.input} ${styles.textarea}`}
            name="descripcion"
            value={datosForm.descripcion}
            onChange={manejarCambio}
            placeholder="Descripción del producto..."
            rows={3}
          />
        </div>

        {/* Precio + Stock */}
        <div className={styles.fila}>
          <div className={styles.campo}>
            <label className={styles.label}>Precio</label>
            <div className={styles.inputConPrefijo}>
              <span className={styles.prefijo}>$</span>
              <input
                className={`${styles.input} ${styles.inputConEspacio}`}
                type="number"
                name="precio"
                value={datosForm.precio}
                onChange={manejarCambio}
                placeholder="0"
                min="0"
                required
              />
            </div>
          </div>

          <div className={styles.campo}>
            <label className={styles.label}>Stock</label>
            <input
              className={styles.input}
              type="number"
              name="stock"
              value={datosForm.stock}
              onChange={manejarCambio}
              placeholder="0"
              min="0"
              required
            />
          </div>
        </div>

        {/* Categoría */}
        <div className={styles.campo}>
          <label className={styles.label}>Categoría</label>
          <select
            className={`${styles.input} ${styles.select}`}
            name="categoria"
            value={datosForm.categoria}
            onChange={manejarCambio}
            required
          >
            <option value="" disabled>
              Seleccionar categoría...
            </option>
            {CATEGORIAS.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Imagen */}
        <div className={styles.campo}>
          <label className={styles.label}>
            {modo === "editar" ? "Nueva imagen (opcional)" : "Imagen"}
          </label>
          <label className={styles.fileLabel}>
            <span className={styles.fileBtn}>Elegir archivo</span>
            <input
              className={styles.fileInput}
              type="file"
              accept="image/*"
              onChange={manejarCambioImagen}
            />
            <span className={styles.fileName} id="file-name">
              Sin archivo seleccionado
            </span>
          </label>
        </div>

        <button
          type="submit"
          className={styles.btnGuardar}
          disabled={cargando}
        >
          {cargando
            ? "Guardando..."
            : modo === "editar"
              ? "Guardar cambios"
              : "Agregar producto"}
        </button>
      </form>
    </div>
  );
};

export default FormProducto;

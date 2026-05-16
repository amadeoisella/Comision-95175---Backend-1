// ══════════════════════════════════════════════════
// 02_multer.js
// 🗣️ "Vamos a aprender a recibir archivos (imágenes, PDFs) desde el Frontend"
// ✍️ Instalar antes: npm install multer
// ══════════════════════════════════════════════════

const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();

// Crear carpeta uploads si no existe
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

// 1. Configuración de Almacenamiento (Storage)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Carpeta donde se guardarán los archivos
  },
  filename: (req, file, cb) => {
    // Aca le cambiamos el nombre para que no haya colisiones (ej: avatar-123456.jpg)
    const nombreUnico = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extension = path.extname(file.originalname); // Extraemos la extensión del archivo original
    cb(null, nombreUnico + extension);
  },
});

// 2. Filtro de Archivos (MIME Type)
const fileFilter = (req, file, cb) => {
  // Solo aceptamos imágenes JPEG y PNG. Si no es una imagen, rechazamos el archivo. (Virus)
  const permitidos = ["image/jpeg", "image/png"];
  if (permitidos.includes(file.mimetype)) {
    cb(null, true); // Aceptar el archivo
  } else {
    cb(new Error("Archivo no permitido. Solo se aceptan JPEG y PNG."), false); // Rechazar el archivo
  }
};

// 3. Crear el Middleware de Multer
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limite de tamaño: 5MB, para no saturar el servidor con archivos pesados
});

// 4. Ruta POST con el Middleware
// 🗣️ ".single('avatar') significa que esperamos un archivo que venga en el campo llamado 'avatar'"
app.post("/subir", upload.single("avatar"), (req, res) => {
  // Si Multer procesó el archivo correctamente, estará disponible en req.file
  res.json({
    message: "Archivo subido exitosamente",
    archivo: req.file, // Aquí podemos ver la información del archivo subido (nombre, ruta, etc.)
  });
});

// 5. Manejo de Errores Global para Multer
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    // Manejo específico para errores de Multer (Ej: archivo demasiado grande)
    res.status(400).json({ error: `Error de carga: ${err.message}` });
  } else {
    // Otros errores. (Ej: archivo no permitido por el filtro)
    res
      .status(500)
      .json({ error: `Error interno del servidor: ${err.message}` });
  }
  next();
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor Multer en http://localhost:${PORT}`);
  console.log(
    '   Probar con POST /subir-avatar (form-data: llave "avatar" tipo File)',
  );
});

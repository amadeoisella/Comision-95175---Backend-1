// ══════════════════════════════════════════════════
// 01_handlebars.js
// 🗣️ "Vamos a conectar Express con Handlebars para generar HTML dinámico"
// ✍️ Instalar antes: npm install express express-handlebars
// ══════════════════════════════════════════════════

const express = require("express");
const { engine } = require("express-handlebars");
const path = require("path");

const app = express();

// 1. Configuración del motor de plantillas
app.engine(
  "handlebars",
  engine({
    defaultLayout: "main", // Layout por defecto o esqueleto principal
    layoutsDir: path.join(__dirname, "views/layouts"), // Carpeta de layouts
    partialsDir: path.join(__dirname, "views/partials"), // Carpeta de partials
    helpers: {
      eq: (a, b) => a === b, // Helper para comparar igualdad
    },
  }),
);

app.set("view engine", "handlebars"); // Establecemos Handlebars como motor de vistas
app.set("views", path.join(__dirname, "views")); // Carpeta de vistas y templates (principal)

// 2. Ruta principal para mostrar la vista de inicio
app.get("/", (req, res) => {
  // Estos datos simulan venir de una base de datos o una API
  const datos = {
    titulo: "Tienda de Backend",
    usuario: { nombre: "Juan", rol: "admin" },
    esAdmin: true,
    productos: [
      { id: 1, nombre: "Laptop", precio: 1200 },
      { id: 2, nombre: "Smartphone", precio: 800 },
    ],
    hayProductos: true,
  };

  // En vez de res.json(), usamos res.render() para enviar los datos a la plantilla Handlebars
  res.render("home", datos);
});

// Renderizamos la vista 'home.handlebars' pasándole los datos

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor Handlebars en http://localhost:${PORT}`);
});

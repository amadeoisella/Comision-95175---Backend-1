// ══════════════════════════════════════════════════
// 03_express_crud.js
// ✍️ Correr con: node 03_express_crud.js
// 💼 LABORAL: Esta es la base de todo Microservicio.
// ══════════════════════════════════════════════════

const express = require("express");
const app = express();

app.use(express.json());

// Nuestra "base de datos" simulada en la memoria RAM
let items = [];
let nextId = 1;

// ─── CREATE (Crear) ───
// 🗣️ "Usamos POST para crear. El cliente manda datos, nosotros creamos el recurso
//     y devolvemos un código 201 (Created)."
app.post("/items", (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: "El campo name es requerido" });
  }

  const newItem = { id: nextId++, name };
  items.push(newItem);

  // Código 201: Created
  res.status(201).json(newItem);
});

// ─── READ (Leer todos) ───
// 🗣️ "GET sin ID devuelve la colección completa. 200 OK por defecto."
app.get("/items", (req, res) => {
  res.status(200).json(items);
});

// ─── READ (Leer uno solo por ID) ───
// 🗣️ "GET con el ID en la URL para pedir uno específico.
//     Si no existe, mandamos 404 (Not Found)."
app.get("/items/:id", (req, res) => {
  const itemId = parseInt(req.params.id);
  const item = items.find((i) => i.id === itemId);

  if (!item) {
    return res.status(404).json({ error: "Item no encontrado" });
  }

  res.status(200).json(item);
});

// ─── UPDATE (Actualizar) ───
// 🗣️ "PUT o PATCH para actualizar. Buscamos por ID, si existe lo pisamos."
app.put("/items/:id", (req, res) => {
  const itemId = parseInt(req.params.id);
  const { name } = req.body;

  const itemIndex = items.findIndex((i) => i.id === itemId);

  if (itemIndex === -1) {
    return res
      .status(404)
      .json({ error: "Item no encontrado para actualizar" });
  }

  if (!name) {
    return res.status(400).json({ error: "El campo name es requerido" });
  }

  // Actualizamos
  items[itemIndex].name = name;
  res.status(200).json(items[itemIndex]);
});

// ─── DELETE (Eliminar) ───
// 🗣️ "DELETE por ID. Lo borramos del array."
app.delete("/items/:id", (req, res) => {
  const itemId = parseInt(req.params.id);
  const itemIndex = items.findIndex((i) => i.id === itemId);

  if (itemIndex === -1) {
    return res.status(404).json({ error: "Item no encontrado para eliminar" });
  }

  items.splice(itemIndex, 1);
  res.status(200).json({ message: `Item ${itemId} eliminado con éxito` });
});

// Levantar el servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 CRUD en memoria corriendo en http://localhost:${PORT}`);
  console.log("   Rutas:");
  console.log("   - POST   /items");
  console.log("   - GET    /items");
  console.log("   - GET    /items/:id");
  console.log("   - PUT    /items/:id");
  console.log("   - DELETE /items/:id");
});

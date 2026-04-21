// test.js — Entregable Clase 1

class ProductManager {
  constructor() {
    this.products = [];
    this.nextId = 1;
  }

  addProduct(product) {
    if (!product.nombre || !product.precio) {
      throw new Error("Nombre y precio son obligatorios.");
    }
    const nuevo = { id: this.nextId++, ...product };
    this.products.push(nuevo);
    return nuevo;
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const p = this.products.find((p) => p.id === id);
    if (!p) throw new Error(`Producto con ID ${id} no encontrado.`);
    return p;
  }

  // TODO: Implementar deleteProduct(id)
  // Debe eliminar el producto con ese ID del array.
  // Si no existe, debe lanzar un error con mensaje claro.
}

// --- PRUEBAS ---
const pm = new ProductManager();

pm.addProduct({ nombre: "Remera", precio: 5000, stock: 10 });
pm.addProduct({ nombre: "Zapatilla", precio: 15000, stock: 5 });
pm.addProduct({ nombre: "Campera", precio: 20000, stock: 3 });

console.log("Todos los productos:", pm.getProducts());
console.log("Producto ID 2:", pm.getProductById(2));

try {
  pm.getProductById(99);
} catch (e) {
  console.error("Error esperado:", e.message);
}

try {
  pm.addProduct({ nombre: "SinPrecio" });
} catch (e) {
  console.error("Error esperado:", e.message);
}

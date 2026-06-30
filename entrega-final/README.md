## 🏆 Evaluación Final: Proyecto Integrador Completo

Llegamos a la instancia final del curso, donde vas a integrar todo lo aprendido en el desarrollo de un proyecto backend completo.
A lo largo de la cursada trabajaste sobre la construcción progresiva de una aplicación, incorporando desde lógica de programación hasta persistencia de datos y comunicación en tiempo real.
En esta evaluación, deberás llevar ese proyecto a una versión más robusta y profesional, aplicando buenas prácticas de desarrollo backend.

### 💡 Conceptos Clave a Evaluar

- Desarrollo de servidores con Node.js y Express en el puerto 8080.
- Organización de rutas mediante Express Router (`/api/products` y `/api/carts`).
- Manejo de asincronía con async/await.
- Persistencia de datos híbrida con FileSystem y MongoDB (Mongoose) bajo patrón DAO, sin eliminar la implementación previa con FileSystem.
- Modelado de datos y relaciones de base de datos (`ecommerce` con colecciones `products` y `carts`).
- Implementación de CRUD completo en ambas colecciones.
- Uso de WebSockets para actualización en tiempo real de productos.
- Optimización de consultas en listados con paginación, filtros y ordenamiento.

---

### 📋 Requisitos Técnicos Detallados

#### 1. Gestión de Productos (`/api/products`)

- **GET `/api/products`**: Debe soportar los siguientes parámetros por query:
  - `limit` (por defecto 10)
  - `page` (por defecto 1)
  - `query` (filtro por categoría o disponibilidad)
  - `sort` (orden ascendente o descendente por precio: `asc`/`desc`)
  - **Formato de Respuesta obligatorio:**
    ```json
    {
      "status": "success",
      "payload": [],
      "totalPages": 0,
      "prevPage": null,
      "nextPage": null,
      "page": 1,
      "hasPrevPage": false,
      "hasNextPage": false,
      "prevLink": null,
      "nextLink": null
    }
    ```
- **GET `/api/products/:pid`**: Obtener un producto por su ID.
- **POST `/api/products`**: Crear un producto. Campos obligatorios: `title`, `description`, `code`, `price`, `status`, `stock`, `category`, `thumbnails`. El ID debe ser autogenerado.
- **PUT `/api/products/:pid`**: Actualizar un producto existente (sin modificar el ID).
- **DELETE `/api/products/:pid`**: Eliminar el producto.

#### 2. Gestión de Carritos (`/api/carts`)

- **POST `/api/carts`**: Crea un carrito vacío con ID autogenerado.
- **GET `/api/carts/:cid`**: Lista los productos que pertenecen al carrito. Debes usar `.populate()` para traer la información completa del producto.
- **POST `/api/carts/:cid/products/:pid`**: Agrega el producto al carrito. Si ya existe, incrementa la cantidad en +1.
- **DELETE `/api/carts/:cid/products/:pid`**: Elimina un producto específico del carrito.
- **PUT `/api/carts/:cid`**: Actualiza el carrito con un array completo de productos.
- **PUT `/api/carts/:cid/products/:pid`**: Actualiza únicamente la cantidad del producto específico.
- **DELETE `/api/carts/:cid`**: Vacía el carrito completo (elimina todos sus productos).

#### 3. Frontend & Tiempo Real

- **Vistas de Plantillas (Handlebars u otro motor):**
  - `/products`: Lista los productos de forma paginada.
  - `/products/:pid`: Detalle del producto con botón para agregarlo al carrito actual.
  - `/carts/:cid`: Detalle de un carrito con sus productos resueltos por populate.
- **WebSockets:** Integrar WebSockets para que, cuando se agregue o elimine un producto, la vista `/products` se actualice en tiempo real para todos los clientes conectados.

---

### 📂 Formato de Entrega del Proyecto

El proyecto debe estar desarrollado y en pleno funcionamiento. Sin embargo, para agilizar y estandarizar la evaluación, la entrega se realizará mediante una **presentación estructurada**:

- **Formato:** Un Google Slides (con URL pública y compartida).
- **Contenido obligatorio del Slides:**
  1. **Definición del proyecto:** Nombre, problema que resuelve, público objetivo y alcance de funcionalidades.
  2. **Estructura del proyecto:** Captura de la arquitectura de carpetas (`dao`, `models`, `routes`, etc.) explicando la separación de responsabilidades.
  3. **Evidencia técnica de código:** Captura de pantalla de los archivos más importantes (conector de base de datos, hooks pre-populate, controllers principales) con explicaciones breves.
  4. **Funcionamiento de endpoints:** Capturas de pantalla realizando requests en Postman/Thunder Client mostrando las respuestas (especialmente el formato de respuesta del listado y el populate del carrito).
  5. **Persistencia:** Capturas de la base de datos (MongoDB Atlas / Compass) demostrando la correcta creación de colecciones y registros.
  6. **Tiempo Real:** Captura, GIF o video mostrando el uso completo de la vista y actualizaciones por WebSockets.
  7. **Repositorio de Respaldo:** Enlace al repositorio público de GitHub con el código fuente.
  8. **Cierre de proyecto:** Reflexión sobre las dificultades encontradas, soluciones implementadas y futuras mejoras propuestas.

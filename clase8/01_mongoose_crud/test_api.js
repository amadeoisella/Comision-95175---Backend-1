// Usamos fetch nativo global disponible en Node.js v18+


const API_URL = 'http://localhost:8080/api/productos';

async function runTests() {
  console.log('\n🧪 INICIANDO PRUEBAS AUTOMATIZADAS DE API REST (MONGOOSE CRUD)...');
  console.log('==================================================================');

  let testProductId = null;

  // 1. Verificar Health Check del Servidor
  try {
    const healthRes = await fetch('http://localhost:8080/health');
    const healthData = await healthRes.json();
    console.log('✅ 1. Health Check exitoso:', healthData);
  } catch (error) {
    console.error('❌ El servidor no está corriendo. Asegúrate de iniciar el servidor con `npm run dev` antes de correr el test.');
    process.exit(1);
  }

  // 2. Intentar crear un producto con validación errónea (Precio negativo)
  try {
    console.log('\n⏳ 2. Intentando crear producto con precio inválido (negativo)...');
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Producto Inválido',
        price: -100,
        category: 'Electronica',
        code: 'PROD-0000'
      })
    });
    const data = await res.json();
    console.log(`📡 Status: ${res.status}`);
    console.log('📝 Respuesta del Servidor (Esperado Error):', JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('❌ Error en test 2:', error.message);
  }

  // 3. Intentar crear un producto con validación errónea (Código mal formateado)
  try {
    console.log('\n⏳ 3. Intentando crear producto con código inválido (no coincide con PROD-XXXX)...');
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Teclado Gamer',
        price: 4500,
        category: 'Hardware',
        code: 'CODIGO-INCORRECTO'
      })
    });
    const data = await res.json();
    console.log(`📡 Status: ${res.status}`);
    console.log('📝 Respuesta del Servidor (Esperado Error):', JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('❌ Error en test 3:', error.message);
  }

  // 4. Crear un producto válido
  try {
    console.log('\n⏳ 4. Creando un producto válido...');
    const randomCode = `PROD-${Math.floor(1000 + Math.random() * 9000)}`;
    const newProduct = {
      name: 'Mouse Optico Inalambrico',
      price: 2500,
      category: 'Perifericos',
      code: randomCode,
      description: 'Mouse inalámbrico de 1600 DPI con batería de larga duración.'
    };
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProduct)
    });
    const data = await res.json();
    console.log(`📡 Status: ${res.status}`);
    console.log('📝 Respuesta del Servidor (Exitoso):', JSON.stringify(data, null, 2));
    if (res.status === 201) {
      testProductId = data.data._id;
      console.log(`🎯 ID del Producto Guardado para siguientes pruebas: ${testProductId}`);
    }
  } catch (error) {
    console.error('❌ Error en test 4:', error.message);
  }

  // 5. Intentar crear un producto duplicado (Mismo código de barra)
  if (testProductId) {
    try {
      console.log('\n⏳ 5. Intentando crear un producto con código duplicado para testear Unique Index...');
      // Obtenemos el producto recién creado para usar su mismo código
      const getRes = await fetch(`${API_URL}/${testProductId}`);
      const getData = await getRes.json();
      const duplicateCode = getData.data.code;

      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Otro Producto',
          price: 5000,
          category: 'Hardware',
          code: duplicateCode
        })
      });
      const data = await res.json();
      console.log(`📡 Status: ${res.status}`);
      console.log('📝 Respuesta del Servidor (Esperado 409 DuplicateKeyError):', JSON.stringify(data, null, 2));
    } catch (error) {
      console.error('❌ Error en test 5:', error.message);
    }
  }

  // 6. Obtener lista paginada de productos
  try {
    console.log('\n⏳ 6. Obteniendo productos paginados (Página 1, Límite 2)...');
    const res = await fetch(`${API_URL}?page=1&limit=2`);
    const data = await res.json();
    console.log(`📡 Status: ${res.status}`);
    console.log('📝 Paginación recibida:', data.pagination);
    console.log('📝 Cantidad de elementos en esta página:', data.data.length);
  } catch (error) {
    console.error('❌ Error en test 6:', error.message);
  }

  // 7. Modificar producto por ID
  if (testProductId) {
    try {
      console.log(`\n⏳ 7. Actualizando el precio y descripción del producto ID: ${testProductId}...`);
      const res = await fetch(`${API_URL}/${testProductId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Mouse Optico Inalambrico V2',
          price: 2999.99,
          description: 'Mouse inalámbrico de 1600 DPI - Versión mejorada'
        })
      });
      const data = await res.json();
      console.log(`📡 Status: ${res.status}`);
      console.log('📝 Producto modificado retornado:', JSON.stringify(data.data, null, 2));
    } catch (error) {
      console.error('❌ Error en test 7:', error.message);
    }
  }

  // 8. Eliminar producto por ID
  if (testProductId) {
    try {
      console.log(`\n⏳ 8. Eliminando físicamente el producto ID: ${testProductId}...`);
      const res = await fetch(`${API_URL}/${testProductId}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      console.log(`📡 Status: ${res.status}`);
      console.log('📝 Respuesta del Servidor:', JSON.stringify(data, null, 2));
    } catch (error) {
      console.error('❌ Error en test 8:', error.message);
    }
  }

  console.log('\n==================================================================');
  console.log('🧪 FIN DE LAS PRUEBAS DE API REST.');
}

runTests();

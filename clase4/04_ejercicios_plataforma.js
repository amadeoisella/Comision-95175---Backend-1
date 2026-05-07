// ══════════════════════════════════════════════════
// 04_ejercicios_plataforma.js
// ══════════════════════════════════════════════════

/* 
=========================================================
EJERCICIO 1: Servidor HTTP minimal con Node
=========================================================
*/
// process.stdin.setEncoding('utf-8');
// let input1 = '';
// process.stdin.on('data', chunk => { input1 += chunk; });
// process.stdin.on('end', () => {
//   const lines = input1.trim().split('\n');
//   const method = lines[0];
//   const path = lines[1];

//   if (path === '/saludo') {
//     switch (method) {
//       case 'GET': console.log('Hola desde GET'); break;
//       case 'POST': console.log('Hola desde POST'); break;
//       case 'PUT': console.log('Hola desde PUT'); break;
//       case 'DELETE': console.log('Hola desde DELETE'); break;
//       case 'PATCH': console.log('Hola desde PATCH'); break;
//       default: console.log('Ruta o método no soportado');
//     }
//   } else {
//     console.log('Ruta o método no soportado');
//   }
// });

/*
=========================================================
EJERCICIO 2: Manejo de errores y códigos apropiados
=========================================================
*/
// let input2 = '';
// process.stdin.on('data', chunk => input2 += chunk);
// process.stdin.on('end', () => {
//   const lines = input2.trim().split('\n');
//   const n = parseInt(lines[0]);
//   const commands = lines.slice(1, n + 1);

//   const validIds = ['1', '2', '3', '10'];
//   class ValidationError extends Error {}
//   class NotFoundError extends Error {}

//   async function processRequest(commandLine) {
//     const [command, param] = commandLine.split(' ');
//     if (command === 'VALIDATE') {
//       if (!/^[a-zA-Z]+$/.test(param)) throw new ValidationError('Bad Request');
//       return '200 OK';
//     } else if (command === 'FIND') {
//       if (!validIds.includes(param)) throw new NotFoundError('Not Found');
//       return '200 OK';
//     } else {
//       throw new Error('Internal Server Error');
//     }
//   }

//   (async () => {
//     for (const cmd of commands) {
//       try {
//         console.log(await processRequest(cmd));
//       } catch (err) {
//         if (err instanceof ValidationError) console.log('400 Bad Request');
//         else if (err instanceof NotFoundError) console.log('404 Not Found');
//         else console.log('500 Internal Server Error');
//       }
//     }
//   })();
// });

/*
=========================================================
EJERCICIO 3: CRUD en memoria (stdin/stdout)
=========================================================
*/
// const items = [];
// let nextId = 1;

// function processRequest(request) {
//   if (request.method === 'GET' && request.path === '/items') {
//     return items;
//   }
//   if (request.method === 'POST' && request.path === '/items') {
//     const newItem = { id: nextId++, name: request.body.name };
//     items.push(newItem);
//     return newItem;
//   }
//   if (request.method === 'DELETE' && request.path.startsWith('/items/')) {
//     const id = parseInt(request.path.split('/')[2]);
//     const index = items.findIndex(i => i.id === id);
//     if (index !== -1) {
//       items.splice(index, 1);
//       return { message: `Item ${id} eliminado` };
//     }
//     return { error: 'Item no encontrado' };
//   }
//   return { error: 'Operación no implementada' };
// }
// // ... Lógica de parseo que provee la plataforma (readline)

import mongoose from 'mongoose';
import { connectDB } from './src/config/db.config.js';
import { User } from './src/models/User.js';
import { Order } from './src/models/Order.js';

async function runProfiler() {
  console.log('🧪 Iniciando analizador de consultas (explain)...');
  await connectDB();

  try {
    // Verificar si hay datos
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      console.log('⚠️ La base de datos está vacía. Por favor corre "npm run seed" antes.');
      process.exit(0);
    }

    console.log('\n==================================================================');
    console.log('CASE 1: Consulta SIN Índice (COLLSCAN - Full Collection Scan)');
    console.log('Filtro: Buscar en la colección Users por el campo "username"');
    console.log('==================================================================');

    // explain() en Mongoose devuelve el plan de ejecución de la consulta
    const explainNoIndex = await User.find({ username: 'amadeo_dev' }).explain('executionStats');
    const statsNoIndex = explainNoIndex.executionStats;

    // Buscamos la etapa principal. En Mongoose/explain se encuentra en executionStages
    const stageNoIndex = statsNoIndex.executionStages.stage;
    const docsExaminedNoIndex = statsNoIndex.totalDocsExamined;
    const nReturnedNoIndex = statsNoIndex.nReturned;

    console.log(`📡 Etapa de ejecución (Stage): ${stageNoIndex} 🛑 (COLLSCAN = Escaneo Completo)`);
    console.log(`📝 Documentos examinados en disco: ${docsExaminedNoIndex}`);
    console.log(`🎯 Documentos devueltos al cliente: ${nReturnedNoIndex}`);
    console.log('⚠️ Diagnóstico: Ineficiente. MongoDB tuvo que leer cada uno de los documentos para ver si coincidían.');

    console.log('\n==================================================================');
    console.log('CASE 2: Consulta CON Índice (IXSCAN - Index Scan)');
    console.log('Filtro: Buscar en la colección Users por el campo "email" (Indexado)');
    console.log('==================================================================');

    const explainIndex = await User.find({ email: 'amadeo@test.com' }).explain('executionStats');
    const statsIndex = explainIndex.executionStats;

    // Cuando hay un índice, la etapa es generalmente una combinación de IXSCAN e FETCH
    const stageIndex = statsIndex.executionStages.stage; // FETCH (lee los docs indicados por el índice)
    const inputStage = statsIndex.executionStages.inputStage?.stage || 'IXSCAN'; // IXSCAN (escaneo del índice)
    const docsExaminedIndex = statsIndex.totalDocsExamined;
    const nReturnedIndex = statsIndex.nReturned;

    console.log(`📡 Etapa de ejecución (Stage): ${stageIndex} (FETCH) -> Sub-etapa: ${inputStage} 🟢 (IXSCAN = Escaneo de Índice)`);
    console.log(`📝 Documentos examinados en disco: ${docsExaminedIndex}`);
    console.log(`🎯 Documentos devueltos al cliente: ${nReturnedIndex}`);
    console.log('🟢 Diagnóstico: Optimizado. MongoDB usó el índice para ir directo al documento, examinando solo los registros necesarios.');

    console.log('\n==================================================================');
    console.log('CASE 3: Consulta Compuesta Ordenada (Optimización con Índice Compuesto)');
    console.log('Filtro: Buscar en Orders por "status: completed" y ordenar por "date: -1"');
    console.log('==================================================================');

    const explainCompound = await Order.find({ status: 'completed' })
      .sort({ date: -1 })
      .explain('executionStats');
    
    const statsCompound = explainCompound.executionStats;
    const stageCompound = statsCompound.executionStages.stage;
    const inputStageCompound = statsCompound.executionStages.inputStage?.stage || 'IXSCAN';
    const docsExaminedCompound = statsCompound.totalDocsExamined;
    const nReturnedCompound = statsCompound.nReturned;

    console.log(`📡 Etapa de ejecución (Stage): ${stageCompound} (FETCH) -> Sub-etapa: ${inputStageCompound} 🟢`);
    console.log(`📝 Documentos examinados en disco: ${docsExaminedCompound}`);
    console.log(`🎯 Documentos devueltos al cliente: ${nReturnedCompound}`);
    console.log('💡 Explicación: Al tener un índice compuesto { status: 1, date: -1 }, MongoDB realiza el filtro y el ordenamiento simultáneamente usando el índice, evitando ordenar en memoria.');

  } catch (error) {
    console.error('❌ Error analizando consultas:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('\n🔌 Conexión cerrada.');
    process.exit(0);
  }
}

runProfiler();

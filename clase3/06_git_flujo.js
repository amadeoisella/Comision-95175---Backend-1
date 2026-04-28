// 06_git_flujo.js
// ══════════════════════════════════════════════════
// DEMO — Git y GitHub: Flujo de trabajo profesional
// ══════════════════════════════════════════════════
// 🗣️ "Git es el seguro de vida de su código. Permite volver en el tiempo,
//     trabajar en equipo sin pisarse, y mostrar su historial a reclutadores."
//
// ✍️ HACER EN TERMINAL (son comandos de Git, no de Node):
//
// ══════════════════════════════════════════════════
// FLUJO COMPLETO: DEL CERO A GITHUB EN 6 PASOS
// ══════════════════════════════════════════════════
//
// PASO 1: Inicializar el repositorio
// ─────────────────────────────────
//   $ git init
//   🗣️ "Esto crea la carpeta oculta .git. De ahora en más, Git registra TODO lo que pase acá."
//
// PASO 2: Ver el estado de los archivos
// ─────────────────────────────────────
//   $ git status
//   🗣️ "Rojo = archivos sin trackear. Verde = listos para commit. Ustedes siempre deben
//       correr git status antes de hacer cualquier cosa. Es como mirar antes de cruzar."
//
// PASO 3: Preparar archivos para el commit (Staging)
// ────────────────────────────────────────────────────
//   $ git add .           (agrega todo)
//   $ git add index.js    (agrega solo ese archivo)
//   🗣️ "git add es como poner tus cosas en una caja antes de enviarla.
//       Todavía no enviaste nada, solo estás seleccionando qué va adentro."
//
// PASO 4: Hacer el commit (Guardar el estado)
// ────────────────────────────────────────────
//   $ git commit -m "feat: crear servidor HTTP básico con módulo http"
//   🗣️ "El mensaje es CRUCIAL. En el trabajo, los mensajes vagos como 'update' o 'fix'
//       te van a hacer quedar muy mal. La convención 'feat:', 'fix:', 'docs:' es estándar."
//
//   CONVENCIÓN DE MENSAJES:
//   feat:  → nueva funcionalidad
//   fix:   → corrección de bug
//   docs:  → documentación
//   refactor: → mejora de código sin cambiar funcionalidad
//   chore: → tareas de mantenimiento (actualizar dependencias, configs)
//
// PASO 5: Conectar con GitHub
// ──────────────────────────
//   $ git remote add origin https://github.com/tu-usuario/mi-proyecto.git
//   $ git branch -M main
//   🗣️ "origin es el 'apodo' del servidor remoto. Por convención, el primer remoto
//       siempre se llama origin. Y main es la rama principal en el estándar moderno."
//
// PASO 6: Subir el código
// ───────────────────────
//   $ git push -u origin main
//   🗣️ "El -u es solo la primera vez. Desde ahí en adelante solo $ git push.
//       Después de esto, entren a GitHub y van a ver su código en la nube."
//
// ══════════════════════════════════════════════════
// FLUJO DIARIO EN UN TRABAJO REAL
// ══════════════════════════════════════════════════
//
//   $ git pull               ← Primero siempre bajar cambios del equipo
//   (... trabajás ...)
//   $ git status             ← Ver qué cambió
//   $ git add .
//   $ git commit -m "feat: agregar validación de email en registro"
//   $ git push               ← Subir al remoto
//
// ══════════════════════════════════════════════════
// COMANDOS ÚTILES
// ══════════════════════════════════════════════════
//
//   $ git log --oneline      ← Ver historial compacto de commits
//   $ git diff               ← Ver qué cambió desde el último commit
//   $ git checkout -b feature/login  ← Crear rama nueva para trabajar aislado
//   $ git stash              ← Guardar cambios temporalmente sin commitear
//
// 🗣️ "Regla de oro: NUNCA commiteen directamente a main en un proyecto de equipo.
//     Creen una rama, trabajen ahí, y abren un Pull Request para que alguien revise."

console.log('📚 Este archivo es tu guía de referencia de Git.');
console.log('   Léelo cada vez que te olvides un comando.');
console.log('   Correlo con: node 06_git_flujo.js');

const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 Iniciando Backend y Frontend simultáneamente...\n');

// Configuración de colores para la consola
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

// Función para colorear el output
function colorize(text, color) {
  return `${colors[color]}${text}${colors.reset}`;
}

// Iniciar Backend
console.log(colorize('🔧 Iniciando Backend...', 'blue'));
const backend = spawn('npm', ['run', 'dev'], {
  cwd: path.join(__dirname, 'backend'),
  stdio: 'pipe',
  shell: true
});

// Iniciar Frontend
console.log(colorize('🎨 Iniciando Frontend...', 'green'));
const frontend = spawn('npm', ['run', 'dev'], {
  cwd: __dirname,
  stdio: 'pipe',
  shell: true
});

// Manejar output del Backend
backend.stdout.on('data', (data) => {
  const output = data.toString();
  if (output.includes('Servidor iniciado exitosamente') || output.includes('listening')) {
    console.log(colorize('✅ Backend iniciado correctamente', 'green'));
  }
  console.log(colorize(`[BACKEND] ${output}`, 'blue'));
});

backend.stderr.on('data', (data) => {
  console.log(colorize(`[BACKEND ERROR] ${data}`, 'red'));
});

// Manejar output del Frontend
frontend.stdout.on('data', (data) => {
  const output = data.toString();
  if (output.includes('ready') || output.includes('started')) {
    console.log(colorize('✅ Frontend iniciado correctamente', 'green'));
  }
  console.log(colorize(`[FRONTEND] ${output}`, 'cyan'));
});

frontend.stderr.on('data', (data) => {
  console.log(colorize(`[FRONTEND ERROR] ${data}`, 'red'));
});

// Manejar cierre de procesos
process.on('SIGINT', () => {
  console.log(colorize('\n🛑 Cerrando servicios...', 'yellow'));
  backend.kill();
  frontend.kill();
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log(colorize('\n🛑 Cerrando servicios...', 'yellow'));
  backend.kill();
  frontend.kill();
  process.exit(0);
});

// Mostrar información de conexión
setTimeout(() => {
  console.log(colorize('\n📋 Servicios disponibles:', 'bright'));
  console.log(colorize('   🔧 Backend:  http://localhost:3001', 'blue'));
  console.log(colorize('   🎨 Frontend: http://localhost:3000', 'green'));
  console.log(colorize('   📊 Health:   http://localhost:3001/api/health', 'yellow'));
  console.log(colorize('\n💡 Presiona Ctrl+C para detener ambos servicios', 'magenta'));
}, 3000);

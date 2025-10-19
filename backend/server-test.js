const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Middleware de logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Ruta de salud del servidor
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Servidor funcionando correctamente',
    timestamp: new Date().toISOString(),
    environment: 'development',
    database: 'simulada'
  });
});

// Ruta de prueba para usuarios (sin base de datos)
app.post('/api/usuarios', (req, res) => {
  console.log('📝 Datos recibidos:', req.body);
  
  // Simular validación básica
  const { nombre1, apellido1, usuario, email, password } = req.body;
  
  if (!nombre1 || !apellido1 || !usuario || !email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Faltan campos obligatorios'
    });
  }

  // Simular usuario existente (para pruebas)
  if (usuario === 'admin' || email === 'admin@test.com') {
    return res.status(409).json({
      success: false,
      message: 'El usuario ya existe',
      code: 'USER_EXISTS'
    });
  }

  // Simular registro exitoso
  res.status(201).json({
    success: true,
    message: 'Usuario registrado exitosamente (modo simulación)',
    data: {
      id: Math.floor(Math.random() * 1000),
      usuario,
      email,
      nombre1,
      apellido1,
      rol: req.body.rol || 'student',
      semestre: req.body.semestre || 1
    }
  });
});

// Ruta raíz
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'API de Gestión de Usuarios (Modo Simulación)',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      usuarios: '/api/usuarios'
    },
    note: 'Este es un servidor de prueba sin base de datos'
  });
});

// Middleware de manejo de errores
app.use((err, req, res, next) => {
  console.error('Error no manejado:', err);
  
  res.status(500).json({
    success: false,
    message: 'Error interno del servidor',
    error: err.message
  });
});

// Middleware para rutas no encontradas
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Ruta no encontrada',
    path: req.originalUrl
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log('\n🚀 Servidor de prueba iniciado!');
  console.log(`📡 Puerto: ${PORT}`);
  console.log(`🔗 URL: http://localhost:${PORT}`);
  console.log(`📊 Modo: Simulación (sin base de datos)`);
  console.log('\n📋 Endpoints disponibles:');
  console.log(`   GET  http://localhost:${PORT}/api/health`);
  console.log(`   POST http://localhost:${PORT}/api/usuarios`);
  console.log('\n✨ ¡API lista para recibir peticiones!');
  console.log('💡 Nota: Este servidor simula el registro sin base de datos');
});

// Manejo de señales para cierre graceful
process.on('SIGTERM', () => {
  console.log('\n🛑 Recibida señal SIGTERM. Cerrando servidor...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('\n🛑 Recibida señal SIGINT. Cerrando servidor...');
  process.exit(0);
});

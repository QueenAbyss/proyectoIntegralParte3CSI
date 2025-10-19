const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001;

// Configurar CORS
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true
}));

app.use(express.json());

// Ruta de salud
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Servidor funcionando correctamente',
    timestamp: new Date().toISOString()
  });
});

// Ruta de registro (simulada)
app.post('/api/usuarios', (req, res) => {
  console.log('📝 Datos recibidos:', req.body);
  
  const { nombre1, apellido1, usuario, email, password } = req.body;
  
  if (!nombre1 || !apellido1 || !usuario || !email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Faltan campos obligatorios'
    });
  }

  // Simular usuario existente
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
    message: 'Usuario registrado exitosamente',
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
    message: 'API de Gestión de Usuarios',
    version: '1.0.0'
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
  console.log('📋 Endpoints disponibles:');
  console.log(`   GET  http://localhost:${PORT}/api/health`);
  console.log(`   POST http://localhost:${PORT}/api/usuarios`);
});

// Manejo de errores
process.on('uncaughtException', (err) => {
  console.error('Error no capturado:', err);
});

process.on('unhandledRejection', (err) => {
  console.error('Promesa rechazada:', err);
});

const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');

const app = express();
const PORT = 3001;

// Configuración de la base de datos
const dbConfig = {
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'root', // Cambia esto por tu contraseña de MySQL
  database: 'gestion_usuarios',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

// Crear pool de conexiones
const pool = mysql.createPool(dbConfig);

// Configurar CORS
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true
}));

app.use(express.json());

// Middleware de logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Ruta de salud
app.get('/api/health', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    await connection.ping();
    connection.release();
    
    res.json({
      success: true,
      message: 'Servidor y base de datos funcionando correctamente',
      timestamp: new Date().toISOString(),
      database: 'MySQL conectado'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error de conexión a la base de datos',
      error: error.message
    });
  }
});

// Ruta de registro con base de datos real
app.post('/api/usuarios', async (req, res) => {
  const connection = await pool.getConnection();
  
  try {
    const {
      nombre1,
      nombre2,
      apellido1,
      apellido2,
      semestre,
      usuario,
      email,
      password,
      rol
    } = req.body;

    console.log('📝 Datos recibidos:', req.body);

    // Validación básica
    if (!nombre1 || !apellido1 || !usuario || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Faltan campos obligatorios'
      });
    }

    // Verificar si el usuario ya existe
    const [existingUser] = await connection.execute(
      'SELECT id FROM usuarios WHERE usuario = ? OR email = ?',
      [usuario, email]
    );

    if (existingUser.length > 0) {
      // Verificar cuál campo específico ya existe
      const [userCheck] = await connection.execute(
        'SELECT usuario FROM usuarios WHERE usuario = ?',
        [usuario]
      );
      
      const [emailCheck] = await connection.execute(
        'SELECT email FROM usuarios WHERE email = ?',
        [email]
      );

      let errorMessage = 'Usuario ya existe';
      if (userCheck.length > 0 && emailCheck.length > 0) {
        errorMessage = 'El nombre de usuario y el correo electrónico ya están registrados';
      } else if (userCheck.length > 0) {
        errorMessage = 'El nombre de usuario ya está registrado';
      } else if (emailCheck.length > 0) {
        errorMessage = 'El correo electrónico ya está registrado';
      }

      return res.status(409).json({
        success: false,
        message: errorMessage,
        code: 'USER_EXISTS'
      });
    }

    // Hash de la contraseña
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insertar nuevo usuario
    const [result] = await connection.execute(
      `INSERT INTO usuarios (
        nombre1, nombre2, apellido1, apellido2, 
        semestre, usuario, email, password, rol
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        nombre1,
        nombre2 || null,
        apellido1,
        apellido2 || null,
        semestre,
        usuario,
        email,
        hashedPassword,
        rol || 'student'
      ]
    );

    console.log('✅ Usuario registrado exitosamente en la base de datos');

    // Respuesta exitosa
    res.status(201).json({
      success: true,
      message: 'Usuario registrado exitosamente',
      data: {
        id: result.insertId,
        usuario,
        email,
        nombre1,
        apellido1,
        rol: rol || 'student',
        semestre
      }
    });

  } catch (error) {
    console.error('❌ Error al registrar usuario:', error);
    
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error.message
    });
  } finally {
    connection.release();
  }
});

// Ruta para obtener todos los usuarios
app.get('/api/usuarios', async (req, res) => {
  const connection = await pool.getConnection();
  
  try {
    const [users] = await connection.execute(
      `SELECT 
        id, nombre1, nombre2, apellido1, apellido2, 
        semestre, usuario, email, rol, fecha_registro, activo
      FROM usuarios 
      WHERE activo = true 
      ORDER BY fecha_registro DESC`
    );

    res.json({
      success: true,
      data: users,
      count: users.length
    });

  } catch (error) {
    console.error('❌ Error al obtener usuarios:', error);
    
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error.message
    });
  } finally {
    connection.release();
  }
});

// Ruta raíz
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'API de Gestión de Usuarios con MySQL',
    version: '1.0.0',
    database: 'MySQL'
  });
});

// Iniciar servidor
app.listen(PORT, async () => {
  try {
    // Probar conexión a la base de datos
    const connection = await pool.getConnection();
    console.log('✅ Conexión a MySQL establecida correctamente');
    connection.release();
    
    console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
    console.log('📋 Endpoints disponibles:');
    console.log(`   GET  http://localhost:${PORT}/api/health`);
    console.log(`   POST http://localhost:${PORT}/api/usuarios`);
    console.log(`   GET  http://localhost:${PORT}/api/usuarios`);
    console.log('🗄️ Base de datos: MySQL (gestion_usuarios)');
  } catch (error) {
    console.error('❌ Error al conectar con MySQL:', error.message);
    console.log('💡 Verifica que MySQL esté ejecutándose y las credenciales sean correctas');
  }
});

// Manejo de errores
process.on('uncaughtException', (err) => {
  console.error('Error no capturado:', err);
});

process.on('unhandledRejection', (err) => {
  console.error('Promesa rechazada:', err);
});

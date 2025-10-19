const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
const Joi = require('joi');

const app = express();
const PORT = 3001;

// Configuración de la base de datos
const dbConfig = {
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '', // Configura tu contraseña aquí
  database: 'gestion_usuarios',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  acquireTimeout: 60000,
  timeout: 60000
};

// Crear pool de conexiones
const pool = mysql.createPool(dbConfig);

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Middleware de logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path} - IP: ${req.ip}`);
  next();
});

// Esquema de validación para usuarios (ajustado a tu estructura)
const userSchema = Joi.object({
  primer_nombre: Joi.string().min(2).max(50).required(),
  segundo_nombre: Joi.string().max(50).allow('').optional(),
  primer_apellido: Joi.string().min(2).max(50).required(),
  segundo_apellido: Joi.string().max(50).allow('').optional(),
  semestre_actual: Joi.string().max(10).required(),
  tipo_usuario: Joi.string().valid('estudiante', 'docente').required(),
  nombre_usuario: Joi.string().min(3).max(30).required(),
  correo_electronico: Joi.string().email().max(100).required(),
  contraseña: Joi.string().min(6).max(50).required()
});

// Middleware de validación
const validateUser = (req, res, next) => {
  const { error, value } = userSchema.validate(req.body, { abortEarly: false });
  
  if (error) {
    const errors = error.details.map(detail => ({
      field: detail.path[0],
      message: detail.message
    }));
    
    return res.status(400).json({
      success: false,
      message: 'Datos de validación incorrectos',
      errors
    });
  }
  
  req.validatedData = value;
  next();
};

// ==================== RUTAS DE LA API REST ====================

// GET /api/health - Estado del servidor
app.get('/api/health', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    await connection.ping();
    connection.release();
    
    res.json({
      success: true,
      message: 'API REST funcionando correctamente',
      timestamp: new Date().toISOString(),
      database: 'MySQL conectado',
      version: '1.0.0'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error de conexión a la base de datos',
      error: error.message
    });
  }
});

// GET /api/usuarios - Obtener todos los usuarios
app.get('/api/usuarios', async (req, res) => {
  const connection = await pool.getConnection();
  
  try {
    const { page = 1, limit = 10, search = '' } = req.query;
    const offset = (page - 1) * limit;
    
    let whereClause = '';
    let params = [];
    
    if (search) {
      whereClause = `WHERE primer_nombre LIKE ? OR primer_apellido LIKE ? OR nombre_usuario LIKE ? OR correo_electronico LIKE ?`;
      const searchTerm = `%${search}%`;
      params = [searchTerm, searchTerm, searchTerm, searchTerm];
    }
    
    // Obtener usuarios con paginación
    const [users] = await connection.execute(
      `SELECT 
        id, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido,
        semestre_actual, tipo_usuario, nombre_usuario, correo_electronico,
        DATE_FORMAT(fecha_registro, '%Y-%m-%d %H:%i:%s') as fecha_registro
      FROM usuarios 
      ${whereClause}
      ORDER BY id DESC 
      LIMIT ? OFFSET ?`,
      [...params, parseInt(limit), parseInt(offset)]
    );
    
    // Contar total de usuarios
    const [countResult] = await connection.execute(
      `SELECT COUNT(*) as total FROM usuarios ${whereClause}`,
      params
    );
    
    const total = countResult[0].total;
    const totalPages = Math.ceil(total / limit);
    
    res.json({
      success: true,
      data: users,
      pagination: {
        current_page: parseInt(page),
        total_pages: totalPages,
        total_items: total,
        items_per_page: parseInt(limit)
      }
    });
    
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error.message
    });
  } finally {
    connection.release();
  }
});

// GET /api/usuarios/:id - Obtener usuario por ID
app.get('/api/usuarios/:id', async (req, res) => {
  const connection = await pool.getConnection();
  const { id } = req.params;
  
  try {
    const [users] = await connection.execute(
      `SELECT 
        id, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido,
        semestre_actual, tipo_usuario, nombre_usuario, correo_electronico,
        DATE_FORMAT(fecha_registro, '%Y-%m-%d %H:%i:%s') as fecha_registro
      FROM usuarios 
      WHERE id = ?`,
      [id]
    );
    
    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado'
      });
    }
    
    res.json({
      success: true,
      data: users[0]
    });
    
  } catch (error) {
    console.error('Error al obtener usuario:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error.message
    });
  } finally {
    connection.release();
  }
});

// POST /api/usuarios - Crear nuevo usuario
app.post('/api/usuarios', validateUser, async (req, res) => {
  const connection = await pool.getConnection();
  
  try {
    const {
      primer_nombre,
      segundo_nombre,
      primer_apellido,
      segundo_apellido,
      semestre_actual,
      tipo_usuario,
      nombre_usuario,
      correo_electronico,
      contraseña
    } = req.validatedData;

    console.log('📝 Creando nuevo usuario:', { nombre_usuario, correo_electronico });

    // Verificar si el usuario ya existe
    const [existingUser] = await connection.execute(
      'SELECT id FROM usuarios WHERE nombre_usuario = ? OR correo_electronico = ?',
      [nombre_usuario, correo_electronico]
    );

    if (existingUser.length > 0) {
      // Verificar cuál campo específico ya existe
      const [userCheck] = await connection.execute(
        'SELECT nombre_usuario FROM usuarios WHERE nombre_usuario = ?',
        [nombre_usuario]
      );
      
      const [emailCheck] = await connection.execute(
        'SELECT correo_electronico FROM usuarios WHERE correo_electronico = ?',
        [correo_electronico]
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
    const hashedPassword = await bcrypt.hash(contraseña, saltRounds);

    // Insertar nuevo usuario
    const [result] = await connection.execute(
      `INSERT INTO usuarios (
        primer_nombre, segundo_nombre, primer_apellido, segundo_apellido,
        semestre_actual, tipo_usuario, nombre_usuario, correo_electronico, contraseña
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        primer_nombre,
        segundo_nombre || null,
        primer_apellido,
        segundo_apellido || null,
        semestre_actual,
        tipo_usuario,
        nombre_usuario,
        correo_electronico,
        hashedPassword
      ]
    );

    console.log('✅ Usuario creado exitosamente con ID:', result.insertId);

    // Respuesta exitosa
    res.status(201).json({
      success: true,
      message: 'Usuario creado exitosamente',
      data: {
        id: result.insertId,
        nombre_usuario,
        correo_electronico,
        primer_nombre,
        primer_apellido,
        tipo_usuario,
        semestre_actual
      }
    });

  } catch (error) {
    console.error('❌ Error al crear usuario:', error);
    
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error.message
    });
  } finally {
    connection.release();
  }
});

// PUT /api/usuarios/:id - Actualizar usuario
app.put('/api/usuarios/:id', validateUser, async (req, res) => {
  const connection = await pool.getConnection();
  const { id } = req.params;
  
  try {
    const {
      primer_nombre,
      segundo_nombre,
      primer_apellido,
      segundo_apellido,
      semestre_actual,
      tipo_usuario,
      nombre_usuario,
      correo_electronico
    } = req.validatedData;

    // Verificar si el usuario existe
    const [existingUser] = await connection.execute(
      'SELECT id FROM usuarios WHERE id = ?',
      [id]
    );

    if (existingUser.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado'
      });
    }

    // Verificar si el nombre de usuario o email ya existen en otros registros
    const [duplicateCheck] = await connection.execute(
      'SELECT id FROM usuarios WHERE (nombre_usuario = ? OR correo_electronico = ?) AND id != ?',
      [nombre_usuario, correo_electronico, id]
    );

    if (duplicateCheck.length > 0) {
      return res.status(409).json({
        success: false,
        message: 'El nombre de usuario o correo electrónico ya están en uso por otro usuario'
      });
    }

    // Actualizar usuario
    const [result] = await connection.execute(
      `UPDATE usuarios SET 
        primer_nombre = ?, segundo_nombre = ?, primer_apellido = ?, segundo_apellido = ?,
        semestre_actual = ?, tipo_usuario = ?, nombre_usuario = ?, correo_electronico = ?
      WHERE id = ?`,
      [
        primer_nombre,
        segundo_nombre || null,
        primer_apellido,
        segundo_apellido || null,
        semestre_actual,
        tipo_usuario,
        nombre_usuario,
        correo_electronico,
        id
      ]
    );

    console.log('✅ Usuario actualizado exitosamente');

    res.json({
      success: true,
      message: 'Usuario actualizado exitosamente',
      data: {
        id: parseInt(id),
        nombre_usuario,
        correo_electronico,
        primer_nombre,
        primer_apellido,
        tipo_usuario,
        semestre_actual
      }
    });

  } catch (error) {
    console.error('❌ Error al actualizar usuario:', error);
    
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error.message
    });
  } finally {
    connection.release();
  }
});

// DELETE /api/usuarios/:id - Eliminar usuario
app.delete('/api/usuarios/:id', async (req, res) => {
  const connection = await pool.getConnection();
  const { id } = req.params;
  
  try {
    // Verificar si el usuario existe
    const [existingUser] = await connection.execute(
      'SELECT id FROM usuarios WHERE id = ?',
      [id]
    );

    if (existingUser.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado'
      });
    }

    // Eliminar usuario
    await connection.execute('DELETE FROM usuarios WHERE id = ?', [id]);

    console.log('✅ Usuario eliminado exitosamente');

    res.json({
      success: true,
      message: 'Usuario eliminado exitosamente'
    });

  } catch (error) {
    console.error('❌ Error al eliminar usuario:', error);
    
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error.message
    });
  } finally {
    connection.release();
  }
});

// ==================== RUTAS ADICIONALES ====================

// GET /api/stats - Estadísticas de la API
app.get('/api/stats', async (req, res) => {
  const connection = await pool.getConnection();
  
  try {
    const [totalUsers] = await connection.execute('SELECT COUNT(*) as total FROM usuarios');
    const [students] = await connection.execute('SELECT COUNT(*) as total FROM usuarios WHERE tipo_usuario = "estudiante"');
    const [teachers] = await connection.execute('SELECT COUNT(*) as total FROM usuarios WHERE tipo_usuario = "docente"');
    
    res.json({
      success: true,
      data: {
        total_usuarios: totalUsers[0].total,
        estudiantes: students[0].total,
        docentes: teachers[0].total
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener estadísticas',
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
    message: 'API REST - Gestión de Usuarios',
    version: '1.0.0',
    endpoints: {
      health: 'GET /api/health',
      usuarios: 'GET /api/usuarios',
      usuario: 'GET /api/usuarios/:id',
      crear: 'POST /api/usuarios',
      actualizar: 'PUT /api/usuarios/:id',
      eliminar: 'DELETE /api/usuarios/:id',
      estadisticas: 'GET /api/stats'
    },
    documentation: 'https://github.com/tu-repo/api-docs'
  });
});

// Middleware de manejo de errores
app.use((err, req, res, next) => {
  console.error('Error no manejado:', err);
  
  res.status(500).json({
    success: false,
    message: 'Error interno del servidor',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Middleware para rutas no encontradas
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint no encontrado',
    path: req.originalUrl,
    method: req.method
  });
});

// Iniciar servidor
app.listen(PORT, async () => {
  try {
    // Probar conexión a la base de datos
    const connection = await pool.getConnection();
    console.log('✅ Conexión a MySQL establecida correctamente');
    console.log('📊 Base de datos: gestion_usuarios');
    connection.release();
    
    console.log('\n🚀 API REST iniciada exitosamente!');
    console.log(`📡 Puerto: ${PORT}`);
    console.log(`🔗 URL: http://localhost:${PORT}`);
    console.log('\n📋 Endpoints disponibles:');
    console.log(`   GET    http://localhost:${PORT}/api/health`);
    console.log(`   GET    http://localhost:${PORT}/api/usuarios`);
    console.log(`   GET    http://localhost:${PORT}/api/usuarios/:id`);
    console.log(`   POST   http://localhost:${PORT}/api/usuarios`);
    console.log(`   PUT    http://localhost:${PORT}/api/usuarios/:id`);
    console.log(`   DELETE http://localhost:${PORT}/api/usuarios/:id`);
    console.log(`   GET    http://localhost:${PORT}/api/stats`);
    console.log('\n✨ ¡API REST lista para recibir peticiones!');
  } catch (error) {
    console.error('❌ Error al conectar con MySQL:', error.message);
    console.log('💡 Verifica que MySQL esté ejecutándose y las credenciales sean correctas');
  }
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

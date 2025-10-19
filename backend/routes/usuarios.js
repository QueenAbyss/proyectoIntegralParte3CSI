const express = require('express');
const bcrypt = require('bcryptjs');
const { pool } = require('../config/database');
const { validateUserRegistration } = require('../middleware/validation');

const router = express.Router();

// POST /api/usuarios - Registrar nuevo usuario
router.post('/', validateUserRegistration, async (req, res) => {
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
    } = req.validatedData;

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
        rol
      ]
    );

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
        rol,
        semestre
      }
    });

  } catch (error) {
    console.error('Error al registrar usuario:', error);
    
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  } finally {
    connection.release();
  }
});

// GET /api/usuarios - Obtener lista de usuarios (para administración)
router.get('/', async (req, res) => {
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
    console.error('Error al obtener usuarios:', error);
    
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  } finally {
    connection.release();
  }
});

// GET /api/usuarios/:id - Obtener usuario específico
router.get('/:id', async (req, res) => {
  const connection = await pool.getConnection();
  const { id } = req.params;
  
  try {
    const [users] = await connection.execute(
      `SELECT 
        id, nombre1, nombre2, apellido1, apellido2, 
        semestre, usuario, email, rol, fecha_registro, activo
      FROM usuarios 
      WHERE id = ? AND activo = true`,
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
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  } finally {
    connection.release();
  }
});

module.exports = router;

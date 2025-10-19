const mysql = require('mysql2/promise');
require('dotenv').config();

async function setupDatabase() {
  console.log('🔄 Configurando base de datos...\n');

  try {
    // Conectar sin especificar base de datos para crearla
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 3306,
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || ''
    });

    console.log('✅ Conexión a MySQL establecida');

    // Crear base de datos si no existe
    const dbName = process.env.DB_NAME || 'gestion_usuarios';
    await connection.execute(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``);
    console.log(`✅ Base de datos '${dbName}' creada/verificada`);

    // Usar la base de datos
    await connection.execute(`USE \`${dbName}\``);

    // Crear tabla usuarios
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS usuarios (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nombre1 VARCHAR(50) NOT NULL,
        nombre2 VARCHAR(50),
        apellido1 VARCHAR(50) NOT NULL,
        apellido2 VARCHAR(50),
        semestre INT NOT NULL,
        usuario VARCHAR(20) UNIQUE NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        rol ENUM('student', 'teacher') NOT NULL DEFAULT 'student',
        fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        activo BOOLEAN DEFAULT TRUE,
        INDEX idx_usuario (usuario),
        INDEX idx_email (email),
        INDEX idx_rol (rol)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `;

    await connection.execute(createTableQuery);
    console.log('✅ Tabla usuarios creada/verificada');

    await connection.end();
    console.log('\n🎉 Configuración completada exitosamente!');
    console.log('📋 Próximos pasos:');
    console.log('   1. Ejecuta: npm install');
    console.log('   2. Ejecuta: npm run dev');
    console.log('   3. El servidor estará disponible en http://localhost:3001');

  } catch (error) {
    console.error('❌ Error durante la configuración:', error.message);
    console.log('\n🔧 Soluciones posibles:');
    console.log('   - Verifica que MySQL esté ejecutándose');
    console.log('   - Confirma las credenciales en el archivo .env');
    console.log('   - Asegúrate de tener permisos para crear bases de datos');
    process.exit(1);
  }
}

setupDatabase();

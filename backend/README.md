# Backend API - Gestión de Usuarios

Backend desarrollado con Node.js, Express y MySQL para la gestión de usuarios del sistema educativo.

## 🚀 Características

- ✅ API REST con Express.js
- ✅ Conexión a MySQL con pool de conexiones
- ✅ Validación de datos con Joi
- ✅ Hash seguro de contraseñas con bcryptjs
- ✅ CORS configurado para desarrollo
- ✅ Manejo de errores robusto
- ✅ Logging de peticiones

## 📋 Requisitos

- Node.js (v14 o superior)
- MySQL (v5.7 o superior)
- npm o yarn

## 🛠️ Instalación

1. **Instalar dependencias:**
   ```bash
   cd backend
   npm install
   ```

2. **Configurar variables de entorno:**
   - Copia el archivo `.env.example` a `.env`
   - Configura las variables según tu entorno:
   ```env
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=root
   DB_PASSWORD=tu_password
   DB_NAME=gestion_usuarios
   PORT=3001
   NODE_ENV=development
   ```

3. **Configurar base de datos:**
   - Asegúrate de que MySQL esté ejecutándose
   - Crea la base de datos `gestion_usuarios`:
   ```sql
   CREATE DATABASE gestion_usuarios;
   ```

## 🚀 Uso

### Desarrollo
```bash
npm run dev
```

### Producción
```bash
npm start
```

El servidor se ejecutará en `http://localhost:3001`

## 📡 Endpoints

### POST /api/usuarios
Registrar nuevo usuario

**Body:**
```json
{
  "nombre1": "María",
  "nombre2": "Elena",
  "apellido1": "García",
  "apellido2": "López",
  "semestre": 5,
  "usuario": "maria.garcia",
  "email": "maria@universidad.edu.co",
  "password": "miPassword123",
  "rol": "student"
}
```

**Respuesta exitosa (201):**
```json
{
  "success": true,
  "message": "Usuario registrado exitosamente",
  "data": {
    "id": 1,
    "usuario": "maria.garcia",
    "email": "maria@universidad.edu.co",
    "nombre1": "María",
    "apellido1": "García",
    "rol": "student",
    "semestre": 5
  }
}
```

**Error usuario existente (409):**
```json
{
  "success": false,
  "message": "El nombre de usuario ya está registrado",
  "code": "USER_EXISTS"
}
```

### GET /api/usuarios
Obtener lista de usuarios

### GET /api/usuarios/:id
Obtener usuario específico

### GET /api/health
Verificar estado del servidor

## 🔒 Seguridad

- Contraseñas hasheadas con bcryptjs (12 salt rounds)
- Validación estricta de datos de entrada
- Sanitización de consultas SQL con prepared statements
- CORS configurado para dominios específicos

## 🗄️ Estructura de la Base de Datos

La tabla `usuarios` se crea automáticamente con la siguiente estructura:

```sql
CREATE TABLE usuarios (
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
  activo BOOLEAN DEFAULT TRUE
);
```

## 🐛 Solución de Problemas

### Error de conexión a MySQL
1. Verifica que MySQL esté ejecutándose
2. Confirma las credenciales en `.env`
3. Asegúrate de que la base de datos `gestion_usuarios` exista

### Error de puerto en uso
- Cambia el puerto en la variable `PORT` del archivo `.env`

### Error de validación
- Revisa que todos los campos requeridos estén presentes
- Verifica el formato de email y contraseña

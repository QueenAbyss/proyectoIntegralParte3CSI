# 🔗 Conexión Frontend-Backend - Guía Completa

Esta guía te ayudará a conectar tu frontend Next.js con el backend Node.js para el registro de usuarios.

## 📋 Requisitos Previos

- ✅ Node.js (v14 o superior)
- ✅ MySQL (v5.7 o superior)
- ✅ npm o yarn

## 🚀 Configuración del Backend

### 1. Instalar Dependencias del Backend

```bash
cd backend
npm install
```

### 2. Configurar Variables de Entorno

Crea un archivo `.env` en la carpeta `backend` con el siguiente contenido:

```env
# Configuración de la base de datos
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=tu_password_de_mysql
DB_NAME=gestion_usuarios

# Configuración del servidor
PORT=3001
NODE_ENV=development

# JWT Secret (para futuras implementaciones)
JWT_SECRET=tu_jwt_secret_muy_seguro_aqui
```

**⚠️ Importante:** Reemplaza `tu_password_de_mysql` con tu contraseña real de MySQL.

### 3. Configurar Base de Datos

Ejecuta el script de configuración:

```bash
npm run setup
```

Este script:
- ✅ Verifica la conexión a MySQL
- ✅ Crea la base de datos `gestion_usuarios`
- ✅ Crea la tabla `usuarios` con todos los campos necesarios

### 4. Iniciar el Servidor Backend

```bash
npm run dev
```

El servidor estará disponible en `http://localhost:3001`

## 🎯 Configuración del Frontend

### 1. Verificar la Conexión

El frontend ya está configurado para conectarse al backend. El formulario de registro enviará los datos a:
```
POST http://localhost:3001/api/usuarios
```

### 2. Iniciar el Frontend

En una nueva terminal, desde la raíz del proyecto:

```bash
npm run dev
```

El frontend estará disponible en `http://localhost:3000`

## 🧪 Probar la Conexión

### 1. Verificar que el Backend esté funcionando

Visita: `http://localhost:3001/api/health`

Deberías ver:
```json
{
  "success": true,
  "message": "Servidor funcionando correctamente",
  "timestamp": "2024-01-01T12:00:00.000Z",
  "environment": "development"
}
```

### 2. Probar el Registro de Usuarios

1. Ve a `http://localhost:3000`
2. Abre el formulario de registro
3. Completa todos los campos obligatorios:
   - Primer Nombre: María
   - Primer Apellido: García
   - Semestre: 5
   - Usuario: maria.garcia
   - Email: maria@universidad.edu.co
   - Contraseña: miPassword123
   - Confirmar Contraseña: miPassword123
4. Haz clic en "Crear Cuenta"

### 3. Verificar en la Base de Datos

Puedes verificar que el usuario se registró correctamente ejecutando esta consulta en MySQL:

```sql
USE gestion_usuarios;
SELECT * FROM usuarios;
```

## 🔧 Solución de Problemas

### Error: "Error de conexión"
- ✅ Verifica que el backend esté ejecutándose en el puerto 3001
- ✅ Confirma que no hay otros servicios usando el puerto 3001

### Error: "Usuario ya existe"
- ✅ El sistema está funcionando correctamente
- ✅ Intenta con un usuario y email diferentes

### Error de base de datos
- ✅ Verifica que MySQL esté ejecutándose
- ✅ Confirma las credenciales en el archivo `.env`
- ✅ Asegúrate de que la base de datos `gestion_usuarios` exista

### Error de CORS
- ✅ El backend ya tiene CORS configurado para `localhost:3000`
- ✅ Si usas otro puerto, modifica la configuración en `backend/server.js`

## 📡 Endpoints Disponibles

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/health` | Estado del servidor |
| POST | `/api/usuarios` | Registrar nuevo usuario |
| GET | `/api/usuarios` | Listar usuarios |
| GET | `/api/usuarios/:id` | Obtener usuario específico |

## 🔒 Seguridad Implementada

- ✅ Contraseñas hasheadas con bcryptjs (12 salt rounds)
- ✅ Validación estricta de datos de entrada
- ✅ Sanitización de consultas SQL con prepared statements
- ✅ Verificación de usuarios duplicados
- ✅ CORS configurado para dominios específicos

## 📊 Estructura de Datos

### Datos que envía el Frontend:
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

### Respuesta del Backend (éxito):
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

## 🎉 ¡Listo!

Tu sistema frontend-backend está completamente configurado y funcionando. Los usuarios pueden registrarse a través del formulario y los datos se guardan de forma segura en la base de datos MySQL.

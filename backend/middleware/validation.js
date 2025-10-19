const Joi = require('joi');

// Esquema de validación para registro de usuarios
const userRegistrationSchema = Joi.object({
  nombre1: Joi.string()
    .min(2)
    .max(50)
    .pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
    .required()
    .messages({
      'string.min': 'El primer nombre debe tener al menos 2 caracteres',
      'string.max': 'El primer nombre no puede tener más de 50 caracteres',
      'string.pattern.base': 'El primer nombre solo puede contener letras',
      'any.required': 'El primer nombre es obligatorio'
    }),
  
  nombre2: Joi.string()
    .min(2)
    .max(50)
    .pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
    .allow('')
    .optional()
    .messages({
      'string.min': 'El segundo nombre debe tener al menos 2 caracteres',
      'string.max': 'El segundo nombre no puede tener más de 50 caracteres',
      'string.pattern.base': 'El segundo nombre solo puede contener letras'
    }),
  
  apellido1: Joi.string()
    .min(2)
    .max(50)
    .pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
    .required()
    .messages({
      'string.min': 'El primer apellido debe tener al menos 2 caracteres',
      'string.max': 'El primer apellido no puede tener más de 50 caracteres',
      'string.pattern.base': 'El primer apellido solo puede contener letras',
      'any.required': 'El primer apellido es obligatorio'
    }),
  
  apellido2: Joi.string()
    .min(2)
    .max(50)
    .pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
    .allow('')
    .optional()
    .messages({
      'string.min': 'El segundo apellido debe tener al menos 2 caracteres',
      'string.max': 'El segundo apellido no puede tener más de 50 caracteres',
      'string.pattern.base': 'El segundo apellido solo puede contener letras'
    }),
  
  semestre: Joi.number()
    .integer()
    .min(1)
    .max(10)
    .required()
    .messages({
      'number.base': 'El semestre debe ser un número',
      'number.integer': 'El semestre debe ser un número entero',
      'number.min': 'El semestre debe ser al menos 1',
      'number.max': 'El semestre no puede ser mayor a 10',
      'any.required': 'El semestre es obligatorio'
    }),
  
  usuario: Joi.string()
    .min(3)
    .max(20)
    .pattern(/^[a-zA-Z0-9._-]+$/)
    .required()
    .messages({
      'string.min': 'El usuario debe tener al menos 3 caracteres',
      'string.max': 'El usuario no puede tener más de 20 caracteres',
      'string.pattern.base': 'El usuario solo puede contener letras, números, puntos, guiones y guiones bajos',
      'any.required': 'El usuario es obligatorio'
    }),
  
  email: Joi.string()
    .email()
    .max(100)
    .required()
    .messages({
      'string.email': 'El email debe tener un formato válido',
      'string.max': 'El email no puede tener más de 100 caracteres',
      'any.required': 'El email es obligatorio'
    }),
  
  password: Joi.string()
    .min(6)
    .max(50)
    .pattern(/^(?=.*[a-zA-Z])(?=.*\d)/)
    .required()
    .messages({
      'string.min': 'La contraseña debe tener al menos 6 caracteres',
      'string.max': 'La contraseña no puede tener más de 50 caracteres',
      'string.pattern.base': 'La contraseña debe contener al menos una letra y un número',
      'any.required': 'La contraseña es obligatoria'
    }),
  
  rol: Joi.string()
    .valid('student', 'teacher')
    .default('student')
    .messages({
      'any.only': 'El rol debe ser "student" o "teacher"'
    })
});

// Middleware de validación
const validateUserRegistration = (req, res, next) => {
  const { error, value } = userRegistrationSchema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true
  });

  if (error) {
    const errorMessages = error.details.map(detail => ({
      field: detail.path[0],
      message: detail.message
    }));

    return res.status(400).json({
      success: false,
      message: 'Datos de validación incorrectos',
      errors: errorMessages
    });
  }

  // Asignar los datos validados al request
  req.validatedData = value;
  next();
};

module.exports = {
  validateUserRegistration,
  userRegistrationSchema
};

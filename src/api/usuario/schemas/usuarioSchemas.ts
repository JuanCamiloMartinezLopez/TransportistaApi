import { ValidatedRequestSchema, ContainerTypes } from 'express-joi-validation';
import Joi from 'joi';

const creacionUsuarioSchema = Joi.object({
  nombres: Joi.string().required().messages({ 'any.required': 'nombres requerido' }),
  apellidos: Joi.string().required().messages({ 'any.required': 'apellidos requerido' }),
  email: Joi.string().email().required().messages({ 'any.required': 'email requerido' }),
  password: Joi.string()
    .required()
    //.pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$'))
    .messages({ /*'string.pattern.base': 'contraseña invalida', */ 'any.required': 'contraseña requerida' }),
  telefono: Joi.string()
    .regex(/^[0-9]{10}$/)
    .required()
    .messages({ 'string.pattern.base': 'telefono invalido', 'any.required': 'telefono requerido' }),
  direccion: Joi.string().required().messages({ 'any.required': 'direccion requerida' })
});

interface registroUsuarioRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Query]: {
    nombres: string;
    apellidos: string;
    email: string;
    password: string;
    telefono: string;
    direccion: string;
  };
}

export { creacionUsuarioSchema, registroUsuarioRequestSchema };

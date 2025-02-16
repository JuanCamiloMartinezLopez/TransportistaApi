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
  roles: Joi.string()
    .pattern(new RegExp(/^[a-zA-Z]+(,[a-zA-Z]+)*$/))
    .required()
    .messages({ 'string.pattern.base': 'role(s) invalido(s)', 'any.required': 'role(s) requerido(s)' })
});

interface registroUsuarioRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Query]: {
    nombres: string;
    apellidos: string;
    email: string;
    password: string;
    telefono: string;
    roles: string;
  };
}

export { creacionUsuarioSchema, registroUsuarioRequestSchema };

import { ValidatedRequestSchema, ContainerTypes } from 'express-joi-validation';
import Joi from 'joi';

const creacionTransportistaSchema = Joi.object({
  nombre: Joi.string().required().messages({ 'any.required': 'nombre requerido' }),
  telefono: Joi.string()
    .regex(/^[0-9]{10}$/)
    .required()
    .messages({ 'string.pattern.base': 'telefono invalido', 'any.required': 'telefono requerido' }),
  correo: Joi.string().email().required().messages({ 'any.required': 'email requerido' })
});

interface registroTransportistaRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Query]: {
    nombre: string;
    telefrono: string;
    correo: string;
  };
}

export { creacionTransportistaSchema, registroTransportistaRequestSchema };

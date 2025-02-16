import { ValidatedRequestSchema, ContainerTypes } from 'express-joi-validation';
import { creacionDireccionSchema, registroDireccionRequestSchema } from './direccionSchemas';
import Joi from 'joi';
import { Ciudades } from '@constants/ciudades';
import { Departamentos } from '@constants/departamentos';

const creacionEnvioSchema = Joi.object({
  usuario: Joi.number().required().messages({ 'any.required': 'usuario requerido' }),
  peso: Joi.number().precision(2).greater(0).less(10000).required().messages({ 'any.required': 'usuario requerido' }),
  direccion: Joi.object({
    direccion: Joi.string()
      .required()
      .pattern(
        new RegExp(
          /^\s*(?:(?:calle|carrera|avenida|av|diagonal|transversal|circular|manzana|mz|autopista|cl|kr)\s+\d+[a-zA-Z]?)\s*#?\s*\d+[a-zA-Z]?(?:-\d+)?\s*(?:este|oeste|sur|norte)?\s*$/i
        )
      )
      .messages({
        'string.pattern.base': 'direccion invalida',
        'any.required': 'direccion requerida'
      }),
    barrio: Joi.string().required().messages({ 'any.required': 'barrio requerida' }),
    codigoPostal: Joi.string(),
    ciudad: Joi.string()
      .required()
      .valid(...Object.values(Ciudades))
      .messages({ 'any.required': 'ciudad requerida' }),
    departamento: Joi.string()
      .required()
      .valid(...Object.values(Departamentos))
      .messages({ 'any.required': 'departamento requerido' })
  }),
  tipoProducto: Joi.string().required().messages({ 'any.required': 'tipo producto requerido' }),
  alto: Joi.number().precision(2).greater(0).less(100).required().messages({ 'any.required': 'alto requerido' }),
  ancho: Joi.number().precision(2).greater(0).less(100).required().messages({ 'any.required': 'ancho requerido' }),
  profundidad: Joi.number().precision(2).greater(0).less(100).required().messages({ 'any.required': 'profundidad requerido' })
});

interface registroEnvioRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Query]: {
    peso: number;
    usuario: number;
    direccion: registroDireccionRequestSchema;
    tipoProducto: string;
    alto: number;
    ancho: number;
    profundidad: number;
  };
}

export { creacionEnvioSchema, registroEnvioRequestSchema };

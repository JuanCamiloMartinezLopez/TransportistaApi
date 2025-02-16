import { ValidatedRequestSchema, ContainerTypes } from 'express-joi-validation';
import Joi from 'joi';
import { Ciudades } from '@constants/ciudades';

const creacionRutaSchema = Joi.object({
  nombre: Joi.string().required().messages({ 'any.required': 'nombre requrido' }),
  origen: Joi.string()
    .required()
    .valid(...Object.values(Ciudades))
    .messages({ 'any.required': 'ciudad origen requerida' }),
  destino: Joi.string()
    .required()
    .valid(...Object.values(Ciudades))
    .messages({ 'any.required': 'ciudad destino requerida' })
});

interface registroRutaRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Query]: {
    nombre: string;
    origen: Ciudades;
    destino: Ciudades;
  };
}

const asignarEnviosRutaSchema = Joi.object({
  ruta_id: Joi.number().integer().required().messages({ 'any.required': 'ruta_id requrido' }),
  transportista_id: Joi.number().integer().required().messages({ 'any.required': 'transportista_id requrido' }),
  envios: Joi.array().items(Joi.number().integer()).min(1).required()
});

interface registroEnviosRutaRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Query]: {
    ruta_id: number;
    transportista_id: number;
    envios: number[];
  };
}

export { creacionRutaSchema, registroRutaRequestSchema, asignarEnviosRutaSchema, registroEnviosRutaRequestSchema };

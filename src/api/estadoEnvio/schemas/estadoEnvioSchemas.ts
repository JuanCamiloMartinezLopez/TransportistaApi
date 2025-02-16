import { ValidatedRequestSchema, ContainerTypes } from 'express-joi-validation';
import Joi from 'joi';
import { EstadosEnvio } from '@constants/estadosEnvio';

const creacionEstadoEnvioSchema = Joi.object({
  estado: Joi.string()
    .required()
    .valid(...Object.values(EstadosEnvio))
    .messages({ 'any.required': 'estado requerida' }),
  envio_id: Joi.number().integer().required().messages({ 'any.required': 'profundidad requerido' })
});

interface registroEstadoEnvioRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Query]: {
    estado: string;
    envio_id: number;
  };
}

export { creacionEstadoEnvioSchema, registroEstadoEnvioRequestSchema };

import { ValidatedRequestSchema, ContainerTypes } from 'express-joi-validation';
import Joi from 'joi';

const creacionVehiculoSchema = Joi.object({
  placa: Joi.string().required().messages({ 'any.required': 'placa requerida' }),
  capacidad_volumen: Joi.number().precision(2).greater(0).less(1000000).required(),
  capacidad_peso: Joi.number().precision(2).greater(0).less(1000000).required()
});

interface registroVehiculoRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Query]: {
    placa: string;
    capacidad_volumen: number;
    capacidad_peso: number;
  };
}

export { creacionVehiculoSchema, registroVehiculoRequestSchema };

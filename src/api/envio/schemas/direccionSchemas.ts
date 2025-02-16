import { Ciudades } from '@constants/ciudades';
import { Departamentos } from '@constants/departamentos';
import { ValidatedRequestSchema, ContainerTypes } from 'express-joi-validation';
import Joi from 'joi';

const creacionDireccionSchema = Joi.object({
  direccion: Joi.string()
    .required()
    .pattern(
      new RegExp(
        /^(Calle|Carrera|Avenida|Av|Diagonal|Transversal|Circular|Manzana|Mz|Autopista|Cl|Kr)\s\d+(\s?[A-Za-z]?)\s?#?\d+(-\d+)?(\s?(Este|Oeste|Sur|Norte))?$/
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
  departamentos: Joi.string()
    .required()
    .valid(...Object.values(Departamentos))
    .messages({ 'any.required': 'departamento requerido' })
});

interface registroDireccionRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Query]: {
    direccion: string;
    barrio: string;
    codigoPostal: string | null;
    ciudad: Ciudades;
    departamento: Departamentos;
  };
}

export { creacionDireccionSchema, registroDireccionRequestSchema };

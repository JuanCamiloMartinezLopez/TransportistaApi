import { ValidatedRequestSchema, ContainerTypes } from 'express-joi-validation';
import Joi from 'joi';

const loginAuthSchema = Joi.object({
  email: Joi.string().email().required().messages({ 'any.required': 'email requerido' }),
  password: Joi.string()
    .required()
    //.pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$'))
    .messages({ /*'string.pattern.base': 'contraseña invalida', */ 'any.required': 'contraseña requerida' })
});

interface loginRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Query]: {
    email: string;
    password: string;
  };
}

export { loginAuthSchema, loginRequestSchema };

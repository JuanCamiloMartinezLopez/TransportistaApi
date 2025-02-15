import schemaValidator from '@middleware/schemaValidator';
import { inject } from 'inversify';
import { interfaces, controller, httpPost, request, response } from 'inversify-express-utils';
import { Response } from 'express';
import { ValidatedRequest } from 'express-joi-validation';
import { loginAuthSchema, loginRequestSchema } from './schemas/autenticacionSchemas';
import { TYPES } from '@constants/types';
import { AutenticacionUsuarioUseCase } from '@application/usesCases/autenticacionUsuario';
import { AutenticacionUsuarioInterface } from '@domain/interfaces/autenticacionUsuario.interface';
import Logger from '@middleware/logger';

@controller('/auth')
class AuthController implements interfaces.Controller {
  constructor(@inject(TYPES.AutenticacionUsuarioUseCase) private autenticacionUsuario: AutenticacionUsuarioInterface) {}

  @httpPost('/login', schemaValidator.body(loginAuthSchema))
  async create(@request() req: ValidatedRequest<loginRequestSchema>, @response() res: Response) {
    console.log('request', req.body);
    const { email, password } = req.body;
    try {
      const token = await this.autenticacionUsuario.login(email, password);
      res.cookie('access_token', token, { httpOnly: true }).send({ message: 'login correcto' });
    } catch (err) {
      Logger.error(err);
      res.status(400).send({ message: 'Error al realizar el login' });
    }
  }
}

export default AuthController;

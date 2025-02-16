import schemaValidator from '@middleware/schemaValidator';
import { inject } from 'inversify';
import { interfaces, controller, httpPost, request, response, httpGet } from 'inversify-express-utils';
import { creacionUsuarioSchema, registroUsuarioRequestSchema } from './schemas/usuarioSchemas';
import { Request, Response } from 'express';
import { ValidatedRequest } from 'express-joi-validation';
import { TYPES } from '@constants/types';
import { RegistroUsuarioInterface } from '@domain/interfaces/IUseCases/registroUsuario.interface';

@controller('/usuario')
class UsuarioController implements interfaces.Controller {
  constructor(@inject(TYPES.RegistroUsuarioUseCase) private registroUsuarioUseCase: RegistroUsuarioInterface) {}

  @httpPost('/registro', schemaValidator.body(creacionUsuarioSchema))
  async create(@request() req: ValidatedRequest<registroUsuarioRequestSchema>, @response() res: Response) {
    await this.registroUsuarioUseCase.execute(req.body);
    res.status(200).send('Usuario creado');
  }
}

export default UsuarioController;

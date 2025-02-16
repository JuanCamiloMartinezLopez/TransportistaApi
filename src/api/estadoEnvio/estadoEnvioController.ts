import schemaValidator from '@middleware/schemaValidator';
import { inject } from 'inversify';
import { interfaces, controller, httpPost, request, response, httpGet } from 'inversify-express-utils';
import { creacionEstadoEnvioSchema, registroEstadoEnvioRequestSchema } from './schemas/estadoEnvioSchemas';
import { Response } from 'express';
import { ValidatedRequest } from 'express-joi-validation';
import { TYPES } from '@constants/types';
import authentication from '@middleware/authentication';
import { RegistroEnvioInterface } from '@domain/interfaces/IUseCases/registroEnvio.interface';

@controller('/estado_envio')
class EstadoEnvioController implements interfaces.Controller {
  constructor(/*@inject(TYPES.RegistroEnvioUseCase) private registroEnvioUseCase: RegistroEnvioInterface*/) {}

  @httpPost('/registro', authentication, schemaValidator.body(creacionEstadoEnvioSchema))
  async create(@request() req: ValidatedRequest<registroEstadoEnvioRequestSchema>, @response() res: Response) {
    // const envio = await this.registroEnvioUseCase.execute(req.body);
    res.status(200).send({});
  }
}

export default EstadoEnvioController;

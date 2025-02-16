import schemaValidator from '@middleware/schemaValidator';
import { inject } from 'inversify';
import { interfaces, controller, httpPost, request, response, httpGet } from 'inversify-express-utils';
import { creacionEnvioSchema, registroEnvioRequestSchema } from './schemas/envioSchemas';
import { Response } from 'express';
import { ValidatedRequest } from 'express-joi-validation';
import { TYPES } from '@constants/types';
import authentication from '@middleware/authentication';
import { RegistroEnvioInterface } from '@domain/interfaces/IUseCases/registroEnvio.interface';

@controller('/envio')
class EnvioController implements interfaces.Controller {
  constructor(@inject(TYPES.RegistroEnvioUseCase) private registroEnvioUseCase: RegistroEnvioInterface) {}

  @httpPost('/registro', authentication, schemaValidator.body(creacionEnvioSchema))
  async create(@request() req: ValidatedRequest<registroEnvioRequestSchema>, @response() res: Response) {
    const envio = await this.registroEnvioUseCase.execute(req.body);
    console.log(envio);
    res.status(200).send({ envio: envio });
  }
}

export default EnvioController;

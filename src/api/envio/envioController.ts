import schemaValidator from '@middleware/schemaValidator';
import { inject } from 'inversify';
import { interfaces, controller, httpPost, request, response, httpGet } from 'inversify-express-utils';
import { creacionEnvioSchema, registroEnvioRequestSchema } from './schemas/envioSchemas';
import { Response } from 'express';
import { ValidatedRequest } from 'express-joi-validation';
import { TYPES } from '@constants/types';
import authentication from '@middleware/authentication';
import { RegistroEnvioInterface } from '@domain/interfaces/IUseCases/registroEnvio.interface';
import { ObtenerEnviosInterface } from '@domain/interfaces/IUseCases/obtenerEnvios.interface';

@controller('/envio')
class EnvioController implements interfaces.Controller {
  constructor(
    @inject(TYPES.RegistroEnvioUseCase) private registroEnvioUseCase: RegistroEnvioInterface,
    @inject(TYPES.ObtenerEnvioUseCase) private obtnerEnvioUseCase: ObtenerEnviosInterface
  ) {}

  @httpPost('/registro', authentication, schemaValidator.body(creacionEnvioSchema))
  async create(@request() req: ValidatedRequest<registroEnvioRequestSchema>, @response() res: Response) {
    const envio = await this.registroEnvioUseCase.execute(req.body);
    console.log(envio);
    res.status(200).send({ envio: envio });
  }

  @httpGet('/', authentication)
  async get(@request() req: ValidatedRequest<registroEnvioRequestSchema>, @response() res: Response) {
    const envios = await this.obtnerEnvioUseCase.execute();
    console.log(envios);
    res.status(200).send({ envios: envios });
  }
}

export default EnvioController;
